import { CATEGORIES } from '../data/categories.js';

export function categoryCardsHtml() {
  return `<div class="categories">${CATEGORIES.map((c, i) => `
    <button type="button" class="category" data-category="${c.id}" aria-label="${c.title}: mysaly aç">
      <span class="category-top"><span class="category-symbol">${c.symbol}</span><small>0${i + 1}</small></span>
      <strong class="category-title">${c.title}</strong>
      <span class="category-description">${c.description}</span>
      <span class="category-action">Mysaly synap gör</span>
    </button>`).join('')}</div>`;
}
