import './styles/main.css';
import './styles/pages/home.css';
import './styles/pages/test.css';
import './styles/pages/result.css';

import { closeDialog, confirmDialog, initDialog, openDialog } from './components/dialog.js';
import { openPractice } from './components/practice.js';
import { TEXTS } from './data/texts.js';
import { $ } from './lib/dom.js';
import { renderHome } from './screens/home.js';
import { renderResult } from './screens/result.js';
import { renderTest, updateTimer } from './screens/test.js';
import { resetSession, state, timeLeft, unansweredCount } from './state.js';

const app = $('#app');
let ticker = null;

/* ---------- navigation ---------- */

function goHome() {
  stopTimer();
  state.mode = 'home';
  renderHome(app, { onStart: startTest });
}

function startTest() {
  resetSession();
  showTest({ animate: 'screen' });
  ticker = setInterval(tick, 250);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showTest(options) {
  if (timeLeft() <= 0) return finish(true);
  renderTest(app, testActions, options);
}

function finish(timedOut) {
  if (state.mode !== 'test') return;
  stopTimer();
  state.finishedAt = Math.min(Date.now(), state.deadline);
  state.timedOut = timedOut;
  state.mode = 'result';
  closeDialog();
  renderResult(app, { onRestart: startTest });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const testActions = {
  onAnswer(i) {
    state.answers[state.index] = i;
    showTest({ focus: 'answer' });
  },
  onGo(index) {
    state.index = index;
    showTest({ focus: 'title', animate: 'question' });
  },
  async onFinish() {
    const missing = unansweredCount();
    if (missing === 0) return finish(false);
    const ok = await confirmDialog({
      title: 'Testi tamamlamalymy?',
      body: `${missing} sorag jogapsyz galdy. Jogapsyz soraglar nädogry hasaplanar. Wagt heniz dowam edýär.`,
      cancelLabel: 'Dowam et',
      confirmLabel: 'Tamamla',
    });
    if (ok) finish(false);
  },
};

/* ---------- timer ---------- */

function tick() {
  if (state.mode !== 'test') return;
  if (timeLeft() <= 0) return finish(true);
  updateTimer(app);
}

function stopTimer() {
  clearInterval(ticker);
  ticker = null;
}

/* ---------- global UI: header, footer, dialogs ---------- */

async function requestHome() {
  if (state.mode !== 'test') {
    goHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const leave = await confirmDialog({
    title: 'Testden çykmalymy?',
    body: 'Çyksaňyz, häzirki jogaplaryňyz ýiter. Wagt garaşýan wagtyňyzda hem dowam edýär.',
    cancelLabel: 'Dowam et',
    confirmLabel: 'Çyk',
  });
  if (leave) goHome();
}

document.addEventListener('click', (e) => {
  const home = e.target.closest('[data-nav="home"]');
  if (home) {
    e.preventDefault();
    requestHome();
    return;
  }
  const info = e.target.closest('[data-info]');
  if (info) {
    openDialog(TEXTS[info.dataset.info]);
    return;
  }
  const category = e.target.closest('[data-category]');
  if (category) {
    openPractice(Number(category.dataset.category), {
      onStart: state.mode === 'test' ? undefined : startTest,
    });
  }
});

window.addEventListener('beforeunload', (e) => {
  if (state.mode === 'test') e.preventDefault();
});
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) tick();
});

initDialog();
goHome();
