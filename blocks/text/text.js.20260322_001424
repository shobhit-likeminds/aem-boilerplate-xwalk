import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const contentRow = block.children[0];
  const contentCell = contentRow.children[0];

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('text-content-wrapper'); // Corrected class prefix
  moveInstrumentation(contentCell, contentWrapper);

  while (contentCell.firstChild) {
    contentWrapper.append(contentCell.firstChild);
  }

  block.textContent = '';
  block.classList.add('text-cmp-text'); // Already correct
  block.append(contentWrapper);
}

