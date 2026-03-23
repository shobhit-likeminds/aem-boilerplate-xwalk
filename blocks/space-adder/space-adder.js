import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 1: STRUCTURE ALIGNMENT
  // BlockJson has one root field "verticalPadding".
  // The JS correctly reads one root row from block.children.
  const [verticalPaddingRow] = [...block.children];

  const section = document.createElement('section');
  // CHECK 2: INTERACTIVITY - No interactive elements in this block.
  // CHECK 3: CSS CLASS NAMES
  // The original HTML shows the section has class "spaceAdder-spaceAdder".
  // The generated JS used "spaceAdder-verticalPadding_section", which is incorrect.
  // Corrected to "spaceAdder-spaceAdder".
  section.classList.add('spaceAdder-spaceAdder');
  moveInstrumentation(verticalPaddingRow, section);

  // The content of the first cell of the first row contains the padding value.
  const paddingValue = parseInt(verticalPaddingRow.firstElementChild.textContent.trim(), 10);
  if (!isNaN(paddingValue)) {
    section.classList.add(`padding-${paddingValue}`);
  }

  block.textContent = '';
  block.append(section);
}
