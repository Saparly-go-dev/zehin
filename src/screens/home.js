import { categoryCardsHtml } from '../components/categories.js';
import { $, $$ } from '../lib/dom.js';

const MATRIX = [1, 2, 3, 2, 3, 4, 3, 4, 0]; // 0 = missing cell
const PREVIEW_OPTIONS = [3, 4, 5, 6];
const PREVIEW_KEY = 5;

const cellHtml = (n) => n
  ? `<div class="matrix-cell"><span class="dot-pattern">${'<i></i>'.repeat(n)}</span></div>`
  : '<div class="matrix-cell is-missing">?</div>';

/** @param {HTMLElement} root @param {{ onStart: () => void }} actions */
export function renderHome(root, { onStart }) {
  document.title = 'Zehin — Pikirlenişiňi syna';
  root.innerHTML = `
    <section class="home">
      <div class="hero">
        <div>
          <div class="eyebrow"><i></i> Pikirlenişiň täze ölçegi</div>
          <h1>Öz zehiniňe<br><span>täze <em class="accent">garaýyş.</em></span></h1>
          <p class="intro">Baglanyşyklary tap. Kanunalaýyklygy gör.<br>20 sorag bilen pikirleniş ukybyňy syna we özüňi täze tarapdan tana.</p>
          <div class="facts"><span><b>20</b> sorag</span><i></i><span><b>15</b> minut</span><i></i><span><b>4</b> ugur</span></div>
          <div class="hero-cta">
            <button class="btn btn-primary" data-action="start">Testi başla</button>
            <span>Hasaba alynmak gerek däl.<br>Netije testiň soňunda.</span>
          </div>
        </div>
        <section class="preview" aria-label="Nusga sorag">
          <div class="preview-top"><span>KIÇI SYNAG</span><span>01 / NUSGA</span></div>
          <h2>Boş öýjükde näçe nokat bolmaly?</h2>
          <div class="matrix">${MATRIX.map(cellHtml).join('')}</div>
          <div class="preview-options">${PREVIEW_OPTIONS.map((n) => `<button data-preview="${n}" aria-label="${n} nokat">${n}</button>`).join('')}</div>
          <div class="preview-bottom"><span>Her ädimde bir nokat artýar.</span><span data-preview-feedback role="status">Özüňi syna</span></div>
        </section>
      </div>
      <div class="section-heading"><h2>Bir test. Dört pikirleniş ugry.</h2><span>ZEHINIŇ MÜMKINÇILIKLERI</span></div>
      ${categoryCardsHtml()}
      <p class="disclaimer">Bu okuw maksatly testdir. Netijedäki IQ görkezijisi şertli bolup, standartlaşdyrylan IQ barlagynyň ornuny tutmaýar.</p>
    </section>`;

  $('[data-action="start"]', root).onclick = onStart;

  const buttons = $$('[data-preview]', root);
  buttons.forEach((button) => button.addEventListener('click', () => {
    buttons.forEach((b) => b.classList.toggle('is-chosen', b === button));
    $('[data-preview-feedback]', root).textContent =
      Number(button.dataset.preview) === PREVIEW_KEY ? `Dogry! ${PREVIEW_KEY} nokat.` : 'Ýene synanyş.';
  }));
}
