import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('verticalPadding_section', 'padding-80');

  // The space-adder block has no fields, so the block div is empty.
  // We just create the section element with the appropriate classes.
  block.textContent = '';
  block.append(section);
}
