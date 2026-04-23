import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The buy-now-card block has no fields in its model,
  // so it's an empty container with only CSS classes.
  // We apply the classes from the original HTML to the block itself.
  block.classList.add('buyNowCard', 'aem-GridColumn', 'aem-GridColumn--default--12');

  // Since there are no fields, there's no content to move or transform.
  // If the block had content, we would iterate through block.children
  // and move instrumentation to newly created elements.
}
