import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('space-adder-section'); // Corrected class prefix

  const [paddingRow] = [...block.children];

  if (paddingRow) {
    const paddingCell = paddingRow.firstElementChild;
    if (paddingCell) {
      const paddingValue = parseInt(paddingCell.textContent.trim(), 10);
      if (!isNaN(paddingValue)) {
        section.classList.add(`space-adder-padding-${paddingValue}`); // Corrected class prefix
      }
    }
    moveInstrumentation(paddingRow, section);
  }

  block.textContent = '';
  block.append(section);
}
