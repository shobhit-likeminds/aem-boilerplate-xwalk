import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('verticalPadding_section', 'padding-80'); // Copied from ORIGINAL HTML

  // Since the block model has no fields, the block.children will be empty.
  // We simply replace the block content with the new section.
  block.textContent = '';
  block.append(section);
}
