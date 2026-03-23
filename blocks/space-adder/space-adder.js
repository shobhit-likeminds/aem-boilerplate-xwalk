import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('space-adder-verticalPadding_section'); // Corrected class prefix

  // BlockJson indicates one root field: "padding"
  // This corresponds to block.children[0]
  const [paddingRow] = [...block.children];

  if (paddingRow) {
    // The "padding" field is a number, stored in the first div of the row
    const paddingCell = paddingRow.querySelector('div');
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
