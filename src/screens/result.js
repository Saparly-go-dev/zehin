import { CATEGORIES } from '../data/categories.js';
import { QUESTIONS } from '../data/questions.js';
import { $ } from '../lib/dom.js';
import { calculate, verdict } from '../lib/scoring.js';
import { formatTime } from '../lib/time.js';
import { state } from '../state.js';

/** @param {HTMLElement} root @param {{ onRestart: () => void }} actions */
export function renderResult(root, { onRestart }) {
  document.title = 'Netije — Zehin';
  const r = calculate(QUESTIONS, state.answers);
  const v = verdict(r.correct);

  root.innerHTML = `
    <section class="result-page">
      <div class="result-heading">
        <div class="eyebrow">Siziň netijäňiz</div>
        <h1>Pikirlenişiňize <em class="accent">täze garaýyş.</em></h1>
        <p>${state.timedOut ? 'Wagt tamamlandy. Jogaplaryňyz awtomatik hasaplandy.' : 'Test tamamlandy. Ine, şu synanyşykdaky netijäňiz.'}</p>
      </div>
      <div class="result-grid">
        <section class="score-panel">
          <div class="score-ring" style="--pct:${(r.correct / r.total) * 100}%">
            <div class="score-value"><strong>${r.iq}</strong><small>ŞERTLI IQ GÖRKEZIJISI</small></div>
          </div>
          <h2>${v.label}</h2>
          <p>${v.description}</p>
        </section>
        <section class="result-info">
          <div class="result-stats">
            <div><strong>${r.correct} / ${r.total}</strong><small>Dogry jogaplar</small></div>
            <div><strong>${formatTime(state.finishedAt - state.startedAt)}</strong><small>Sarp edilen wagt</small></div>
          </div>
          <h3>Ugurlar boýunça netije</h3>
          ${CATEGORIES.map((c, i) => {
            const { correct, total } = r.byCategory[i];
            return `<div class="category-result">
              <div><span>${c.title}</span><span>${correct} / ${total}</span></div>
              <div class="progress"><span style="width:${(correct / total) * 100}%"></span></div>
            </div>`;
          }).join('')}
        </section>
      </div>
      <div class="result-actions"><button class="btn btn-primary" data-action="restart">Täzeden başla</button></div>
      <p class="result-note">Şertli IQ görkezijisi: 70 + her dogry jogap üçin 3 bal. Tegelegiň dolulygy dogry jogaplaryň paýyny görkezýär. Bu baha ilat bilen deňeşdirilmedik okuw görkezijisidir we hakyky IQ ölçegi däldir.</p>
    </section>`;

  $('[data-action="restart"]', root).onclick = onRestart;
}
