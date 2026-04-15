import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The buy-now-card block has no defined fields in its model.
  // It appears to be an empty container block.
  // We will simply add the necessary class names to the block itself.

  block.classList.add('buyNowCard', 'aem-GridColumn', 'aem-GridColumn--default--12');

  // Since there are no fields or children, no further processing is needed.
  // If there were images, links, or other content, we would process them here.
}
