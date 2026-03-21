import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The spaceadder block in the EDS structure is empty, as per the provided EDS BLOCK STRUCTURE.
  // The original HTML shows a <section> element with specific classes.
  // We need to create this section and apply the classes.

  const section = document.createElement('section');
  section.classList.add('spaceadder-spaceAdder-verticalPadding_section', 'spaceadder-padding-80');

  // Since the block has no children to move, we just append the new section.
  block.textContent = ''; // Clear any potential default content if any
  block.append(section);
}
