import { ANSWER_LETTERS } from '../data/categories.js';
import { escapeHtml } from '../lib/dom.js';

/** Markup for a group of A/B/Ç/D answer buttons. */
export function answersHtml(options, { selected = null, attr = 'data-answer', labelledBy = '' } = {}) {
  const buttons = options.map((text, i) => `
    <button type="button" class="answer ${selected === i ? 'is-selected' : ''}" ${attr}="${i}" aria-pressed="${selected === i}">
      <span class="answer-letter">${ANSWER_LETTERS[i]}</span><span>${escapeHtml(text)}</span>
    </button>`).join('');
  const label = labelledBy ? ` aria-labelledby="${labelledBy}"` : '';
  return `<div class="answers" role="group"${label}>${buttons}</div>`;
}

/** Mark one answer button in a group as selected. */
export function selectAnswer(group, button) {
  group.querySelectorAll('.answer').forEach((b) => {
    b.classList.toggle('is-selected', b === button);
    b.setAttribute('aria-pressed', String(b === button));
  });
}

export function visualHtml(question) {
  let html = '';
  if (question.visual) html += `<div class="sequence">${escapeHtml(question.visual)}</div>`;
  if (question.figure) html += `<div class="figure">${question.figure.map(escapeHtml).join('<br>')}</div>`;
  return html;
}
