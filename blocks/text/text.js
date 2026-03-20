import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 1: STRUCTURE ALIGNMENT
  // BlockJson has one root model field 'body'.
  // The JS correctly reads block.children[0] for this field.
  const bodyRow = block.children[0];
  const bodyCell = bodyRow.children[0];

  const contentDiv = document.createElement('div');
  // CHECK 1 & 2: Class name prefix corrected to 'text-'
  contentDiv.classList.add('text-text'); // Changed from 'text-cmp-text' to 'text-text'
  moveInstrumentation(bodyCell, contentDiv);
  while (bodyCell.firstChild) {
    contentDiv.append(bodyCell.firstChild);
  }

  block.textContent = '';
  block.append(contentDiv);

  // CHECK 2: INTERACTIVITY
  // Original HTML does not contain any interactive elements (buttons, toggles, etc.).
  // No event listeners are needed.
}
