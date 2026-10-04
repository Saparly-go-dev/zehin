import './styles/main.css';
import './styles/pages/design.css';

import { answersHtml, selectAnswer, visualHtml } from './components/answers.js';
import { categoryCardsHtml } from './components/categories.js';
import { confirmDialog, initDialog, openDialog } from './components/dialog.js';
import { openPractice } from './components/practice.js';
import { toast } from './components/toast.js';
import { QUESTIONS } from './data/questions.js';
import { TEXTS } from './data/texts.js';
import { $, $$ } from './lib/dom.js';
import { iqFromCorrect } from './lib/scoring.js';
import { formatTime } from './lib/time.js';
import { URGENT_THRESHOLD_MS } from './state.js';

initDialog();

/* Palette */
const COLORS = [
  ['Фон', '--bg'], ['Панель', '--panel'], ['Линии', '--line'],
  ['Акцент', '--lime'], ['Текст', '--text'], ['Приглушённый', '--muted'],
];
const css = getComputedStyle(document.documentElement);
$('[data-swatches]').innerHTML = COLORS.map(([name, token]) => {
  const hex = css.getPropertyValue(token).trim();
  return `<button class="swatch" data-hex="${hex}">
    <div class="swatch-chip" style="background:var(${token})"></div>
    <div class="swatch-meta"><strong>${name}</strong><code>${token} · ${hex}</code></div>
  </button>`;
}).join('');
$$('.swatch').forEach((b) => b.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(b.dataset.hex); } catch { /* clipboard may be blocked */ }
  toast(`Скопировано ${b.dataset.hex}`);
}));

/* Timer */
const TIMER_START = 130_000;
let left = TIMER_START;
let timerId = null;
const timerBtn = $('[data-demo-timer-btn]');
function drawTimer() {
  $('[data-demo-timer]').textContent = formatTime(left);
  $('[data-demo-timer-wrap]').classList.toggle('is-urgent', left < URGENT_THRESHOLD_MS);
}
timerBtn.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
    timerBtn.textContent = 'Запустить';
    return;
  }
  if (left <= 0) left = TIMER_START;
  timerBtn.textContent = 'Пауза';
  timerId = setInterval(() => {
    left -= 1000;
    drawTimer();
    if (left <= 0) {
      clearInterval(timerId);
      timerId = null;
      timerBtn.textContent = 'Сначала';
    }
  }, 1000);
});
drawTimer();

/* Question */
const sample = QUESTIONS[4];
const questionRoot = $('[data-demo-question]');
questionRoot.innerHTML = visualHtml(sample) + answersHtml(sample.a);
const group = $('.answers', questionRoot);
group.addEventListener('click', (e) => {
  const button = e.target.closest('[data-answer]');
  if (!button) return;
  selectAnswer(group, button);
  const ok = Number(button.dataset.answer) === sample.key;
  const fb = $('[data-demo-feedback]');
  fb.textContent = ok ? 'Dogry! Tapawut 3, 5, 7, 9 bolup artýar: 18 + 9 = 27.' : 'Bu jogap dogry däl. Ýene synanyşyň.';
  fb.classList.toggle('is-correct', ok);
});

/* Progress */
let answered = 7;
function drawProgress() {
  $('[data-pg-bar]').style.width = `${(answered / 20) * 100}%`;
  $('[data-pg-count]').textContent = `${answered} / 20 jogaplandy`;
  $('[data-pg-label]').textContent = `${Math.min(answered + 1, 20)}-nji sorag / 20`;
}
$$('[data-pg]').forEach((b) => b.addEventListener('click', () => {
  answered = Math.min(20, Math.max(0, answered + Number(b.dataset.pg)));
  drawProgress();
}));
drawProgress();

/* Question numbers: click to move, click current again to toggle answered */
const done = new Set([0, 1, 2, 4, 5, 7]);
let current = 8;
const nums = $('[data-demo-nums]');
function drawNums() {
  nums.innerHTML = Array.from({ length: 20 }, (_, i) =>
    `<button data-n="${i}" class="${done.has(i) ? 'is-answered' : ''} ${i === current ? 'is-current' : ''}" aria-label="${i + 1}-nji sorag">${i + 1}</button>`,
  ).join('');
}
nums.addEventListener('click', (e) => {
  const b = e.target.closest('[data-n]');
  if (!b) return;
  const n = Number(b.dataset.n);
  if (n === current) done.has(n) ? done.delete(n) : done.add(n);
  current = n;
  drawNums();
});
drawNums();

/* Score ring */
const range = $('#ring-range');
function drawRing() {
  const n = Number(range.value);
  $('[data-ring]').style.setProperty('--pct', `${(n / 20) * 100}%`);
  $('[data-ring-iq]').textContent = iqFromCorrect(n);
  $('[data-ring-n]').textContent = n;
}
range.addEventListener('input', drawRing);
drawRing();

/* Categories → practice dialog */
$('[data-demo-categories]').innerHTML = categoryCardsHtml();
document.addEventListener('click', (e) => {
  const card = e.target.closest('[data-category]');
  if (card) openPractice(Number(card.dataset.category), { onStart: () => { location.href = '/'; } });
});

/* Dialogs */
$('[data-demo-confirm]').addEventListener('click', async () => {
  const leave = await confirmDialog({
    title: 'Testden çykmalymy?',
    body: 'Çyksaňyz, häzirki jogaplaryňyz ýiter. Wagt garaşýan wagtyňyzda hem dowam edýär.',
    cancelLabel: 'Dowam et',
    confirmLabel: 'Çyk',
  });
  toast(leave ? 'Выбрано: Çyk' : 'Выбрано: Dowam et');
});
$$('[data-demo-info]').forEach((b) => b.addEventListener('click', () => openDialog(TEXTS[b.dataset.demoInfo])));
