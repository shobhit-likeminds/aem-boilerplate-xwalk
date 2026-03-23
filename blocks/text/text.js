import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [textRow] = [...block.children];

  const textDiv = document.createElement('div');
  textDiv.classList.add('text'); // Corrected class name to 'text'
  moveInstrumentation(textRow, textDiv);

  const textCell = textRow.querySelector('div');
  if (textCell) {
    while (textCell.firstChild) {
      textDiv.append(textCell.firstChild);
    }
  }

  block.textContent = '';
  block.append(textDiv);
}
