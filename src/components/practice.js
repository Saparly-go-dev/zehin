import { CATEGORIES } from '../data/categories.js';
import { PRACTICE } from '../data/practice.js';
import { $ } from '../lib/dom.js';
import { answersHtml, selectAnswer, visualHtml } from './answers.js';
import { closeDialog, openDialog } from './dialog.js';

/**
 * Open the sample question for a category.
 * @param {number} id
 * @param {{ onStart?: () => void }} [options] When onStart is given, a "start test" button is shown.
 */
export function openPractice(id, { onStart } = {}) {
  const p = PRACTICE[id];
  const el = openDialog({
    title: CATEGORIES[id].title,
    body: p.intro,
    extra: `
      <section class="practice">
        <span class="practice-label">NUSGA SORAG · NETIJÄ GOŞULMAÝAR</span>
        <h3>${p.q}</h3>
        ${visualHtml(p)}
        ${answersHtml(p.a, { attr: 'data-practice' })}
        <p class="feedback" role="status">Bir jogaby saýlaň.</p>
      </section>
      <div class="dialog-actions">
        <button class="btn btn-secondary" data-dialog="close">Ýap</button>
        ${onStart ? '<button class="btn btn-primary" data-dialog="start">Doly testi başla</button>' : ''}
      </div>`,
  });

  const group = $('.practice .answers', el);
  const feedback = $('.practice .feedback', el);
  group.addEventListener('click', (e) => {
    const button = e.target.closest('[data-practice]');
    if (!button) return;
    selectAnswer(group, button);
    const correct = Number(button.dataset.practice) === p.key;
    feedback.textContent = correct ? `Dogry! ${p.why}` : 'Bu jogap dogry däl. Ýene synanyşyň.';
    feedback.classList.toggle('is-correct', correct);
  });

  $('[data-dialog="close"]', el).onclick = closeDialog;
  const start = $('[data-dialog="start"]', el);
  if (start) start.onclick = () => { closeDialog(); onStart(); };
}
