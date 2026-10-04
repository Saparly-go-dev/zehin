import { answersHtml, visualHtml } from '../components/answers.js';
import { CATEGORIES } from '../data/categories.js';
import { QUESTIONS } from '../data/questions.js';
import { $, $$, escapeHtml } from '../lib/dom.js';
import { formatTime } from '../lib/time.js';
import { answeredCount, state, timeLeft, URGENT_THRESHOLD_MS } from '../state.js';

/**
 * @param {HTMLElement} root
 * @param {{ onAnswer: (i: number) => void, onGo: (index: number) => void, onFinish: () => void }} actions
 * @param {{ focus?: 'title' | 'answer', animate?: 'screen' | 'question' }} [options]
 *   `animate` plays the entry animation only on screen entry or question change,
 *   so picking an answer re-renders without flicker.
 */
export function renderTest(root, actions, { focus, animate } = {}) {
  document.title = 'Test — Zehin';
  const total = QUESTIONS.length;
  const q = QUESTIONS[state.index];
  const answered = answeredCount();
  const isLast = state.index === total - 1;

  root.innerHTML = `
    <section class="test-shell ${animate === 'screen' ? 'is-entering' : ''}">
      <div class="test-top">
        <span class="eyebrow">ZEHIN / PIKIRLENIŞ TESTI</span>
        <div class="timer"><small>Galan wagt</small><span data-timer>${formatTime(timeLeft())}</span></div>
      </div>
      <div class="progress-info"><span>${state.index + 1}-nji sorag / ${total}</span><span>${answered} / ${total} jogaplandy</span></div>
      <div class="progress" role="progressbar" aria-label="Jogaplanan soraglar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${answered}">
        <span style="width:${(answered / total) * 100}%"></span>
      </div>
      <div class="question-layout">
        <section class="question-panel ${animate ? 'is-entering' : ''}">
          <span class="question-label">0${q.cat + 1} / ${CATEGORIES[q.cat].title.toLocaleUpperCase('tk')}</span>
          <h2 id="question-title" tabindex="-1">${escapeHtml(q.q)}</h2>
          ${visualHtml(q)}
          ${answersHtml(q.a, { selected: state.answers[state.index], labelledBy: 'question-title' })}
          <div class="question-actions">
            <button class="btn btn-secondary btn-sm-mobile" data-action="prev" ${state.index === 0 ? 'disabled' : ''}>Öňki sorag</button>
            <button class="btn btn-primary btn-sm-mobile" data-action="next">${isLast ? 'Testi tamamla' : 'Indiki sorag'}</button>
          </div>
        </section>
        <aside class="question-nav">
          <h3>Soraglar</h3>
          <div class="question-numbers">${QUESTIONS.map((_, i) => {
            const done = state.answers[i] !== null;
            const current = i === state.index;
            return `<button data-jump="${i}" class="${done ? 'is-answered' : ''} ${current ? 'is-current' : ''}"
              aria-label="${i + 1}-nji sorag${done ? ', jogaplandy' : ''}" ${current ? 'aria-current="step"' : ''}>${i + 1}</button>`;
          }).join('')}</div>
          <p class="nav-legend">Ýaşyl öýjük — jogaplanan sorag.<br>Çarçuwaly öýjük — häzirki sorag.</p>
          <p class="nav-note">Bir dogry jogaby saýlaň. Öňki soraglara gaýdyp, jogabyňyzy üýtgedip bilersiňiz.</p>
        </aside>
      </div>
    </section>`;

  updateTimer(root);

  $$('[data-answer]', root).forEach((b) => b.addEventListener('click', () => actions.onAnswer(Number(b.dataset.answer))));
  $$('[data-jump]', root).forEach((b) => b.addEventListener('click', () => actions.onGo(Number(b.dataset.jump))));
  $('[data-action="prev"]', root).onclick = () => actions.onGo(state.index - 1);
  $('[data-action="next"]', root).onclick = () => (isLast ? actions.onFinish() : actions.onGo(state.index + 1));

  if (focus === 'title') $('#question-title', root)?.focus();
  if (focus === 'answer') $(`[data-answer="${state.answers[state.index]}"]`, root)?.focus();
}

/** Cheap per-tick update — avoids re-rendering the whole screen. */
export function updateTimer(root) {
  const el = $('[data-timer]', root);
  if (!el) return;
  const left = timeLeft();
  el.textContent = formatTime(left);
  el.parentElement.classList.toggle('is-urgent', left < URGENT_THRESHOLD_MS);
}
