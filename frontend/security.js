/* Shared browser defenses. Session storage limits token persistence, not XSS access. */
(function () {
  'use strict';
  // Remove legacy persistent sessions; users sign in again in this tab.
  for (const key of ['dsb_token', 'dsb_user', 'dsb_admin_token']) {
    try { localStorage.removeItem(key); } catch (_) { /* storage can be unavailable */ }
  }
  function renderContent(target, markup) {
    const doc = new DOMParser().parseFromString(String(markup || ''), 'text/html');
    const allowed = new Set(['P','BR','H1','H2','H3','H4','H5','H6','UL','OL','LI','STRONG','B','EM','I','U','BLOCKQUOTE','PRE','CODE','A','IMG','TABLE','THEAD','TBODY','TR','TH','TD','HR','DIV','SPAN']);
    const drop = new Set(['SCRIPT','STYLE','IFRAME','OBJECT','EMBED','SVG','MATH','FORM','INPUT','BUTTON','TEMPLATE']);
    function copy(node) {
      if (node.nodeType === 3) return document.createTextNode(node.textContent);
      if (node.nodeType !== 1 || drop.has(node.tagName)) return document.createDocumentFragment();
      const result = allowed.has(node.tagName) ? document.createElement(node.tagName.toLowerCase()) : document.createDocumentFragment();
      if (node.tagName === 'A' || node.tagName === 'IMG') {
        const attribute = node.tagName === 'A' ? 'href' : 'src';
        try {
          const url = new URL(node.getAttribute(attribute) || '', location.origin);
          if (url.protocol === 'https:' && !url.username && !url.password) result.setAttribute(attribute, url.href);
        } catch (_) { /* invalid URLs stay unset */ }
        if (node.tagName === 'A') result.setAttribute('rel', 'noopener noreferrer');
        if (node.tagName === 'IMG') { result.setAttribute('alt', node.getAttribute('alt') || ''); result.setAttribute('loading', 'lazy'); }
      }
      for (const child of node.childNodes) result.appendChild(copy(child));
      return result;
    }
    const fragment = document.createDocumentFragment();
    for (const child of doc.body.childNodes) fragment.appendChild(copy(child));
    target.replaceChildren(fragment);
  }
  window.DSB_SECURITY = Object.freeze({ renderContent });
}());
