import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The buy-now-card block has no fields defined in its model.
  // This means it's an empty block, likely used as a container for other components
  // or its content is dynamically loaded by client-side JS.
  // As per the provided HTML, it only has structural classes.
  // We simply apply the classes from the original HTML to the block itself.

  // Clear existing content if any, as the block model is empty.
  block.textContent = '';

  // Apply the classes from the ORIGINAL HTML to the block element.
  // The original HTML shows these classes on the outer div.
  block.classList.add('buyNowCard', 'aem-GridColumn', 'aem-GridColumn--default--12');

  // No fields means no rows to process, no images to optimize, no elements to create.
  // The block itself is the final decorated element.
}
