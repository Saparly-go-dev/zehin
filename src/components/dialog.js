import { $ } from '../lib/dom.js';

const dialog = () => $('#dialog');

/**
 * Open the shared <dialog>.
 * @param {{ title: string, body: string, extra?: string }} content  `extra` is trusted HTML.
 * @returns {HTMLDialogElement}
 */
export function openDialog({ title, body, extra = '' }) {
  const el = dialog();
  $('#dialog-content', el).innerHTML = `<h2>${title}</h2><p>${body}</p>${extra}`;
  if (!el.open) el.showModal();
  return el;
}

export function closeDialog() {
  const el = dialog();
  if (el.open) el.close();
}

/** Two-button confirmation. Resolves true when the primary action is chosen. */
export function confirmDialog({ title, body, cancelLabel, confirmLabel }) {
  return new Promise((resolve) => {
    const el = openDialog({
      title,
      body,
      extra: `<div class="dialog-actions">
        <button class="btn btn-secondary" data-dialog="cancel">${cancelLabel}</button>
        <button class="btn btn-primary" data-dialog="confirm">${confirmLabel}</button>
      </div>`,
    });
    const done = (value) => { el.removeEventListener('close', onClose); closeDialog(); resolve(value); };
    const onClose = () => resolve(false);
    $('[data-dialog="cancel"]', el).onclick = () => done(false);
    $('[data-dialog="confirm"]', el).onclick = () => done(true);
    el.addEventListener('close', onClose, { once: true });
  });
}

export function initDialog() {
  $('.dialog-close', dialog()).addEventListener('click', closeDialog);
}
