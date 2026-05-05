import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [messageRow] = [...block.children];

  const root = document.createElement('div');
  root.classList.add('toast', 'align-items-center');
  root.setAttribute('role', 'alert');
  root.setAttribute('aria-live', 'assertive');
  root.setAttribute('aria-atomic', 'true');

  const dFlexDiv = document.createElement('div');
  dFlexDiv.classList.add('d-flex');

  const toastBody = document.createElement('div');
  toastBody.classList.add('toast-body');
  // Rule 17b: Read innerHTML from the cell, not the row.
  // Rule 17c: Richtext cells have no inner div, read innerHTML directly.
  const [messageCell] = [...messageRow.children]; // FIX: Use array destructuring for fixed schema
  toastBody.innerHTML = messageCell?.innerHTML || '';
  moveInstrumentation(messageRow, toastBody);

  const closeButton = document.createElement('button');
  closeButton.setAttribute('type', 'button');
  closeButton.classList.add('btn-close', 'me-2', 'm-auto');
  closeButton.setAttribute('aria-label', 'Close');

  // Rule 9: Implement interactive behavior with addEventListener, not data attributes.
  closeButton.addEventListener('click', () => {
    root.classList.remove('show'); // Assuming 'show' class controls visibility
    root.style.display = 'none'; // Also explicitly hide it
  });

  dFlexDiv.append(toastBody, closeButton);
  root.append(dFlexDiv);

  block.replaceChildren(root);
}
