import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block has no fields, so it's just an empty div that needs a class.
  // The original HTML shows a <section> with classes 'verticalPadding_section' and 'padding-80'.
  // We'll create a section and apply these classes, along with the block-specific prefix class.
  const section = document.createElement('section');
  section.classList.add('space-adder-section', 'space-adder-verticalPadding_section', 'space-adder-padding-80');

  // Move any instrumentation from the original block div to the new section element.
  // Although the block is empty, this is good practice in case it ever contains something.
  moveInstrumentation(block, section);

  // Clear the original block content and append the new section.
  block.textContent = '';
  block.append(section);
}
