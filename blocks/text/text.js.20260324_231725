import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [textRow] = [...block.children];

  const textWrapper = document.createElement('div');
  // Use the class name exactly as it appears in the ORIGINAL HTML
  textWrapper.classList.add('text-cmp-text');
  moveInstrumentation(textRow, textWrapper);

  const textCell = textRow.querySelector('div');
  if (textCell) {
    while (textCell.firstChild) {
      textWrapper.append(textCell.firstChild);
    }
  }

  block.textContent = '';
  block.append(textWrapper);
}
