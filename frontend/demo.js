/* Public, browser-only illustration of the DDEI learning journey.
   It never fetches lessons, grants entitlements, stores personal inputs,
   sends AI requests or creates real certificates. */
(() => {
  'use strict';
  const COURSES = {
    ai: {
      label: 'AI Tools & Automation', icon: 'fa-wand-magic-sparkles',
      lesson: 'Turn an idea into a useful AI prompt',
      explanation: 'A strong prompt tells an AI what to do, who it is for, the context, and what a good answer looks like. Begin with a clear task and an output format.',
      example: 'Example: "Act as a marketing coach. Create three short, friendly headlines for a Nigerian bakery. Put them in a numbered list."',
      quiz: 'Which prompt is most likely to produce a useful answer?',
      options: ['Do some marketing.', 'Write 3 friendly Facebook captions for a bakery in Nigeria, each under 30 words.', 'Tell me everything about business.'],
      correct: 1, why: 'The second prompt provides a task, audience, channel, quantity, and limit.',
      idea: 'A bakery selling fresh bread in Nsukka',
      output: (idea) => 'Act as a helpful digital marketing assistant. Create three clear Facebook captions for ' + idea + '. Write in friendly Nigerian English, include a practical benefit, and end with an honest call to action. Keep each caption under 30 words.',
      skills: 'Prompt design · Communication · AI workflow',
      badge: 'A reusable prompt for a real business'
    },
    web: {
      label: 'Web Development', icon: 'fa-code',
      lesson: 'Design a useful webpage before writing code',
      explanation: 'An effective website answers three questions quickly: What do you offer? Who is it for? What should the visitor do next? You build the page around that journey.',
      example: 'Example: a simple shop page needs a headline, a product benefit, and a clear “Contact us” action.',
      quiz: 'What should a small business homepage make clear?',
      options: ['Only the developer’s favourite colours.', 'What the business offers and the next action for visitors.', 'A long list of programming languages.'],
      correct: 1, why: 'Clarity and a visible next step help visitors use a website.',
      idea: 'A small phone repair store in Enugu',
      output: (idea) => 'PAGE OUTLINE — ' + idea + '\nHeadline: A clear promise for your customers\nHero: Explain the service in one sentence\nTrust: Show real photos, hours and contact details\nCall to action: Ask for a quote\nNext build step: Create HTML sections and make them mobile responsive.',
      skills: 'UI planning · HTML structure · Mobile-first design',
      badge: 'Your first website blueprint'
    },
    marketing: {
      label: 'Digital Marketing', icon: 'fa-bullhorn',
      lesson: 'Build a message that earns attention',
      explanation: 'Start with the customer’s problem, explain a real benefit, and give one simple next step. Strong marketing is clear, credible, and useful.',
      example: 'Example: "Busy morning? Fresh bread ready by 7 AM. Message us for today’s menu."',
      quiz: 'Which message gives the clearest reason to respond?',
      options: ['Best company ever.', 'Fresh bread available every morning. Message us for the menu.', 'Buy anything quickly.'],
      correct: 1, why: 'It presents a benefit and a direct, realistic call to action.',
      idea: 'A campus laundry service in Nsukka',
      output: (idea) => 'CAMPAIGN PLAN — ' + idea + '\nHook: Speak to one customer problem\nValue: Explain how your service makes life easier\nFormat: A short before-and-after video\nCTA: Send a message for prices and availability\nMeasure: Track enquiries, not just views.',
      skills: 'Audience research · Copywriting · Campaign planning',
      badge: 'A practical marketing campaign outline'
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    const host = document.getElementById('demo');
    if (!host) return;

    const byId = (id) => document.getElementById(id);
    const state = { track: 'ai', step: 0, answer: null, quizPassed: false, idea: '', built: false };
    const trackButtons = [...host.querySelectorAll('[data-demo-track]')];
    const stepButtons = [...host.querySelectorAll('[data-demo-step]')];
    const panels = [...host.querySelectorAll('[data-demo-panel]')];

    function status(message) { byId('demoStatus').textContent = message || ''; }
    function render() {
      const course = COURSES[state.track];
      byId('demoTrackName').textContent = course.label;
      byId('demoLessonTitle').textContent = course.lesson;
      byId('demoLessonText').textContent = course.explanation;
      byId('demoLessonExample').textContent = course.example;
      byId('demoQuizQuestion').textContent = course.quiz;
      byId('demoQuizWhy').textContent = state.quizPassed ? course.why : '';
      byId('demoProjectBrief').textContent = 'Use your new skill to create something useful for a local business.';
      byId('demoProjectIdea').value = state.idea;
      byId('demoProjectResult').textContent = state.built ? course.output(state.idea) : '';
      byId('demoPortfolioProject').textContent = state.built ? state.idea : course.idea;
      byId('demoPortfolioSkills').textContent = course.skills;
      byId('demoPortfolioBadge').textContent = course.badge;
      byId('demoStageLabel').textContent = ['Watch a sample lesson','Answer a practice quiz','Build a sample project','Preview your result'][state.step];
      byId('demoProgressBar').style.width = (25 * (state.step + 1)) + '%';
      byId('demoProgressText').textContent = 'Step ' + (state.step + 1) + ' of 4';
      trackButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.demoTrack === state.track)));
      stepButtons.forEach((b) => b.setAttribute('aria-current', Number(b.dataset.demoStep) === state.step ? 'step' : 'false'));
      panels.forEach((p) => { p.hidden = Number(p.dataset.demoPanel) !== state.step; });
      const answers = byId('demoQuizAnswers');
      answers.replaceChildren();
      course.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'demo-option';
        button.setAttribute('aria-pressed', String(index === state.answer));
        button.textContent = String.fromCharCode(65 + index) + '. ' + option;
        button.addEventListener('click', () => {
          state.answer = index; state.quizPassed = false;
          byId('demoQuizWhy').textContent = '';
          host.querySelectorAll('.demo-option').forEach((el, idx) => el.setAttribute('aria-pressed', String(idx === index)));
          status('');
        });
        answers.appendChild(button);
      });
      byId('demoQuizNext').disabled = !state.quizPassed;
      byId('demoProjectNext').disabled = !state.built;
      status('');
    }
    function go(step) {
      const target = Number(step);
      if (!Number.isInteger(target) || target < 0 || target > 3) return;
      if (target > 1 && !state.quizPassed) { state.step = 1; render(); status('Complete the quiz to unlock the next step.'); return; }
      if (target > 2 && !state.built) { state.step = 2; render(); status('Generate your sample project first.'); return; }
      state.step = target; render();
    }

    trackButtons.forEach((b) => b.addEventListener('click', () => {
      const key = b.dataset.demoTrack;
      if (!Object.prototype.hasOwnProperty.call(COURSES,key)) return;
      state.track = key; state.step = 0; state.answer = null; state.quizPassed = false;
      state.idea = COURSES[key].idea; state.built = false; render();
    }));
    stepButtons.forEach((b) => b.addEventListener('click', () => go(b.dataset.demoStep)));
    byId('demoLessonNext').addEventListener('click', () => go(1));
    byId('demoQuizCheck').addEventListener('click', () => {
      if (state.answer === null) { status('Choose an answer first.'); return; }
      state.quizPassed = state.answer === COURSES[state.track].correct;
      byId('demoQuizWhy').textContent = (state.quizPassed ? 'Correct! ' : 'Not quite. ') + COURSES[state.track].why;
      byId('demoQuizNext').disabled = !state.quizPassed;
      status(state.quizPassed ? 'Well done — your project studio is ready!' : 'Try another answer to continue.');
    });
    byId('demoQuizNext').addEventListener('click', () => go(2));
    byId('demoBuildProject').addEventListener('click', () => {
      const idea = byId('demoProjectIdea').value.trim().replace(/[\u0000-\u001F\u007F]/g, ' ').slice(0,100);
      if (idea.length < 5) { status('Describe a business or project in at least five characters.'); return; }
      state.idea = idea; state.built = true;
      byId('demoProjectResult').textContent = COURSES[state.track].output(idea);
      byId('demoProjectNext').disabled = false;
      status('Your example project is ready. This is a guided sample, not a live AI generation.');
    });
    byId('demoProjectNext').addEventListener('click', () => go(3));
    byId('demoRestart').addEventListener('click', () => {
      state.step=0; state.answer=null; state.quizPassed=false; state.built=false;
      state.idea=COURSES[state.track].idea; render();
      host.scrollIntoView({behavior: 'smooth', block:'start'});
    });
    state.idea=COURSES[state.track].idea;
    render();
  });
})();
