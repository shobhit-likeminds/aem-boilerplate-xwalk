import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [bodyRow] = [...block.children];

  const toastDiv = document.createElement('div');
  toastDiv.classList.add('toast', 'align-items-center');
  toastDiv.setAttribute('role', 'alert');
  toastDiv.setAttribute('aria-live', 'assertive');
  toastDiv.setAttribute('aria-atomic', 'true');

  const dFlexDiv = document.createElement('div');
  dFlexDiv.classList.add('d-flex');

  const toastBodyDiv = document.createElement('div');
  toastBodyDiv.classList.add('toast-body');
  if (bodyRow) {
    const [bodyCell] = [...bodyRow.children]; // Fixed: Use array destructuring for fixed schema
    moveInstrumentation(bodyRow, toastBodyDiv);
    toastBodyDiv.innerHTML = bodyCell?.innerHTML || ''; // Fixed: Read from the cell, not the row
  }

  const closeButton = document.createElement('button');
  closeButton.setAttribute('type', 'button');
  closeButton.classList.add('btn-close', 'me-2', 'm-auto');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.addEventListener('click', () => {
    toastDiv.classList.remove('show'); // Simulate Bootstrap's data-bs-dismiss="toast"
  });

  dFlexDiv.append(toastBodyDiv, closeButton);
  toastDiv.append(dFlexDiv);

  block.replaceChildren(toastDiv);
}
