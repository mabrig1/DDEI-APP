/**
 * Destiny Skills Bridge — read-only failover to the Appwrite backup backend.
 *
 * Project: "destiny-skills-bridge" (Frankfurt), ID 6a686f78003e74fe1826 —
 * https://cloud.appwrite.io/console/project-fra-6a686f78003e74fe1826
 *
 * When the primary API (Express + MongoDB) is unreachable or returning 5xx,
 * `apiRequest` hands the failed GET to `DSB_BACKUP.resolve()`. If the path is
 * one the backup can answer, it reads the mirrored row straight from Appwrite's
 * REST API and returns the same JSON shape the primary would have. The visitor
 * keeps browsing skills, courses, blog posts and pages instead of hitting a
 * dead page.
 *
 * Deliberate limits — this is a failover, not a second copy of the app:
 *   • GET only. Signup, login, payments, applications and course progress all
 *     need the primary; they surface the real error rather than a fake success.
 *   • Public data only. The Appwrite tables this script can reach hold nothing
 *     personal — the mirrored user, application and subscription tables are not
 *     world-readable and cannot be read with the public project ID below.
 *   • Only *published* content is ever mirrored, so drafts can't leak here.
 *
 * The project ID is a public identifier (like a Firebase web config). The
 * Appwrite API key lives only on the server and never reaches this file.
 */
(function () {
  'use strict';

  var cfg = window.DSB_APPWRITE || {};
  var ENDPOINT = (cfg.endpoint || 'https://fra.cloud.appwrite.io/v1').replace(/\/+$/, '');
  var PROJECT = cfg.projectId || '6a686f78003e74fe1826';
  var DATABASE = cfg.databaseId || 'dsb-backup';
  var ENABLED = cfg.enabled !== false;

  var TABLE = { catalog: 'catalog', content: 'content', serviceUpdates: 'service_updates' };

  // Appwrite queries are JSON strings passed as queries[0], queries[1], …
  var Q = {
    equal: function (attribute, value) {
      return JSON.stringify({ method: 'equal', attribute: attribute, values: [value] });
    },
    orderAsc: function (attribute) {
      return JSON.stringify({ method: 'orderAsc', attribute: attribute });
    },
    orderDesc: function (attribute) {
      return JSON.stringify({ method: 'orderDesc', attribute: attribute });
    },
    limit: function (n) {
      return JSON.stringify({ method: 'limit', values: [n] });
    },
  };

  var REQUEST_TIMEOUT_MS = 8000;

  function listRows(tableId, queries) {
    var url = ENDPOINT + '/tablesdb/' + encodeURIComponent(DATABASE) +
      '/tables/' + encodeURIComponent(tableId) + '/rows';
    var parts = [];
    for (var i = 0; i < (queries || []).length; i++) {
      parts.push('queries[' + i + ']=' + encodeURIComponent(queries[i]));
    }
    if (parts.length) url += '?' + parts.join('&');

    // The backup is the last thing standing between the visitor and a blank
    // page — but it must not hang there either.
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = controller ? setTimeout(function () { controller.abort(); }, REQUEST_TIMEOUT_MS) : null;

    return fetch(url, {
      method: 'GET',
      headers: { 'X-Appwrite-Project': PROJECT },
      signal: controller ? controller.signal : undefined,
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Appwrite responded ' + response.status);
        return response.json();
      })
      .then(function (data) { return data.rows || []; })
      .finally(function () { if (timer) clearTimeout(timer); });
  }

  // ── Catalog ────────────────────────────────────────────────────────────────
  // Skills, opportunities, course summaries and the tools vault are static, so
  // one fetch per kind serves the whole session.
  var catalogCache = {};

  function catalog(kind) {
    if (catalogCache[kind]) return catalogCache[kind];
    var promise = listRows(TABLE.catalog, [Q.equal('kind', kind), Q.orderAsc('position'), Q.limit(500)])
      .then(function (rows) {
        var items = [];
        for (var i = 0; i < rows.length; i++) {
          try {
            items.push(JSON.parse(rows[i].payload));
          } catch (err) {
            // One corrupt payload shouldn't blank the whole section.
          }
        }
        return items;
      })
      .catch(function (err) {
        delete catalogCache[kind]; // allow a retry on the next call
        throw err;
      });
    catalogCache[kind] = promise;
    return promise;
  }

  // ── Content mapping ────────────────────────────────────────────────────────
  // Rows come back with Appwrite's `$id`; the frontend expects Mongo's `_id`.
  function contentSummary(row) {
    return {
      _id: row.$id,
      title: row.title,
      slug: row.slug,
      type: row.type,
      excerpt: row.excerpt || '',
      featuredImageUrl: row.featuredImageUrl || '',
      publishedAt: row.publishedAt,
    };
  }

  function contentFull(row) {
    var item = contentSummary(row);
    item.body = row.body || '';
    item.status = row.status;
    item.createdAt = row.createdAt;
    item.updatedAt = row.updatedAt;
    return item;
  }

  function notFound(message) {
    var err = new Error(message);
    err.status = 404;
    return err;
  }

  // ── Routes the backup can answer ───────────────────────────────────────────
  var ROUTES = [
    {
      match: /^\/api\/skills\/?$/,
      handle: function () {
        return catalog('skills').then(function (skills) { return { skills: skills }; });
      },
    },
    {
      match: /^\/api\/opportunities\/?$/,
      handle: function (m, params) {
        return catalog('opportunities').then(function (opportunities) {
          var skillId = params.get('skillId');
          return {
            opportunities: skillId
              ? opportunities.filter(function (o) { return o.skillId === skillId; })
              : opportunities,
          };
        });
      },
    },
    {
      match: /^\/api\/courses\/?$/,
      handle: function () {
        return catalog('courses').then(function (courses) { return { courses: courses }; });
      },
    },
    {
      match: /^\/api\/content\/?$/,
      handle: function (m, params) {
        var queries = [Q.equal('status', 'published'), Q.orderDesc('publishedAt'), Q.limit(100)];
        var type = params.get('type');
        if (type) queries.unshift(Q.equal('type', type));
        return listRows(TABLE.content, queries).then(function (rows) {
          return { content: rows.map(contentSummary) };
        });
      },
    },
    {
      match: /^\/api\/content\/([^/?]+)\/?$/,
      handle: function (m) {
        var slug = decodeURIComponent(m[1]);
        return listRows(TABLE.content, [
          Q.equal('slug', slug),
          Q.equal('status', 'published'),
          Q.limit(1),
        ]).then(function (rows) {
          if (rows.length === 0) throw notFound('Page or post not found');
          return { content: contentFull(rows[0]) };
        });
      },
    },
    {
      match: /^\/api\/service-update\/?$/,
      handle: function () {
        return listRows(TABLE.serviceUpdates, [Q.orderDesc('updatedAt'), Q.limit(1)])
          .then(function (rows) {
            if (rows.length === 0) return { update: null };
            var row = rows[0];
            return {
              update: {
                _id: row.$id,
                message: row.message,
                createdAt: row.createdAt,
                updatedAt: row.updatedAt,
              },
            };
          });
      },
    },
  ];

  // ── Degraded-mode banner ───────────────────────────────────────────────────
  // Visitors deserve to know they are looking at a mirror that may be a few
  // minutes stale, and that sign-in and payments are temporarily unavailable.
  var bannerShown = false;

  function showDegradedBanner() {
    if (bannerShown || typeof document === 'undefined' || !document.body) return;
    bannerShown = true;

    var banner = document.createElement('div');
    banner.id = 'dsbBackupBanner';
    banner.setAttribute('role', 'status');
    banner.style.cssText = [
      'position:fixed', 'left:0', 'right:0', 'bottom:0', 'z-index:9999',
      'background:#7c2d12', 'color:#fff', 'padding:10px 44px 10px 16px',
      'font:500 13px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif',
      'text-align:center', 'box-shadow:0 -2px 12px rgba(0,0,0,.25)',
    ].join(';');
    banner.textContent = "We're having trouble reaching our servers, so you're seeing a recently saved copy of the site. "
      + 'Browsing works — signing in, enrolling and payments will be back shortly.';

    var close = document.createElement('button');
    close.type = 'button';
    close.setAttribute('aria-label', 'Dismiss');
    close.textContent = '×';
    close.style.cssText = 'position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:0;color:#fff;font-size:20px;line-height:1;cursor:pointer';
    close.onclick = function () { banner.remove(); };
    banner.appendChild(close);

    document.body.appendChild(banner);
  }

  function hideDegradedBanner() {
    var banner = document.getElementById('dsbBackupBanner');
    if (banner) banner.remove();
    bannerShown = false;
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  /**
   * Try to answer a failed primary request from the backup.
   *
   * @param {string} path    e.g. "/api/content?type=post"
   * @param {object} options the same options object passed to apiRequest
   * @returns {Promise<object|null>} the response body, or null when the backup
   *          cannot serve this request (caller should rethrow the real error).
   */
  function resolve(path, options) {
    if (!ENABLED) return Promise.resolve(null);

    var method = ((options && options.method) || 'GET').toUpperCase();
    if (method !== 'GET') return Promise.resolve(null);

    var split = String(path).split('?');
    var pathname = split[0];
    var params = new URLSearchParams(split[1] || '');

    for (var i = 0; i < ROUTES.length; i++) {
      var m = ROUTES[i].match.exec(pathname);
      if (!m) continue;
      return ROUTES[i].handle(m, params).then(function (data) {
        showDegradedBanner();
        return data;
      });
    }
    return Promise.resolve(null);
  }

  window.DSB_BACKUP = {
    enabled: ENABLED,
    endpoint: ENDPOINT,
    projectId: PROJECT,
    databaseId: DATABASE,
    resolve: resolve,
    showDegradedBanner: showDegradedBanner,
    hideDegradedBanner: hideDegradedBanner,
  };
})();
