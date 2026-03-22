import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const contentRow = block.children[0];
  const contentCell = contentRow.children[0];

  const div = document.createElement('div');
  div.classList.add('text-cmp-text'); // Corrected class name prefix
  moveInstrumentation(contentCell, div);

  while (contentCell.firstChild) {
    div.append(contentCell.firstChild);
  }

  block.textContent = '';
  block.append(div);
}

