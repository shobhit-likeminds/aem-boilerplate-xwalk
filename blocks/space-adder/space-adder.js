import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The Space Adder block is an empty block used for spacing.
  // It does not have any fields in its model, so there are no rows to process.
  // We simply apply the class names from the original HTML to the block itself.
  block.classList.add('spaceAdder', 'aem-GridColumn', 'aem-GridColumn--default--12');
}
