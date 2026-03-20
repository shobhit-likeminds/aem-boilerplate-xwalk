import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [paddingTopBottomRow] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('spaceadder-verticalPadding_section'); // Corrected class prefix

  if (paddingTopBottomRow) {
    const paddingValue = parseInt(paddingTopBottomRow.firstElementChild.textContent.trim(), 10);
    if (!Number.isNaN(paddingValue)) {
      section.classList.add(`spaceadder-padding-${paddingValue}`); // Corrected class prefix
    }
    moveInstrumentation(paddingTopBottomRow, section);
  }

  block.textContent = '';
  block.classList.add('spaceadder-spaceAdder', 'spaceadder-aem-GridColumn', 'spaceadder-aem-GridColumn--default--12');
  block.append(section);
}
