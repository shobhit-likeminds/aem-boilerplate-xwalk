import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [paddingRow] = [...block.children];

  const paddingValue = parseInt(paddingRow.firstElementChild.textContent.trim(), 10);

  const section = document.createElement('section');
  section.classList.add('spaceadder-spaceAdder-verticalPadding_section');

  if (!isNaN(paddingValue)) {
    section.classList.add(`spaceadder-spaceAdder-padding-${paddingValue}`);
  }

  moveInstrumentation(paddingRow, section);

  block.textContent = '';
  block.append(section);
}
