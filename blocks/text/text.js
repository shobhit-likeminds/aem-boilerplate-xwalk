import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textContentWrapper = document.createElement('div');
  textContentWrapper.classList.add('text-text'); // Corrected class name prefix

  const [textRow] = [...block.children];

  if (textRow) {
    const textCell = textRow.firstElementChild;
    if (textCell) {
      moveInstrumentation(textCell, textContentWrapper);
      while (textCell.firstChild) {
        textContentWrapper.append(textCell.firstChild);
      }
    }
  }

  block.textContent = '';
  block.append(textContentWrapper);
}

