import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [paddingRow] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('space-adder-verticalPadding_section'); // Corrected class name prefix
  moveInstrumentation(paddingRow, section);

  const paddingCell = paddingRow.firstElementChild;
  const paddingValue = paddingCell ? parseInt(paddingCell.textContent.trim(), 10) : 0;

  if (!isNaN(paddingValue) && paddingValue > 0) {
    section.classList.add(`space-adder-padding-${paddingValue}`); // Corrected class name prefix
  }

  block.textContent = '';
  block.append(section);
}
