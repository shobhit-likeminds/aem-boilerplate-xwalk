import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('spaceAdder-verticalPadding_section', 'spaceAdder-padding-80');

  block.textContent = '';
  block.append(section);
}
