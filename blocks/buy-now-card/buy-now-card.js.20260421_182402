import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The buy-now-card block has no fields defined in its model.
  // This means it's an empty block that serves as a container or a placeholder,
  // or its content is entirely managed by its parent component in the original HTML.
  // Based on the provided original HTML, it only has container classes.

  // Create a new div element to act as the root of the decorated block.
  const buyNowCardDiv = document.createElement('div');

  // Apply the class names from the ORIGINAL HTML.
  // The original HTML shows: <div class="buyNowCard aem-GridColumn aem-GridColumn--default--12">
  buyNowCardDiv.classList.add('buyNowCard', 'aem-GridColumn', 'aem-GridColumn--default--12');

  // Since the block has no fields, there are no authored rows to move instrumentation from.
  // The block itself is the authored element, so we replace its children.
  // If there were any default content in the block, it would be removed.
  block.replaceChildren(buyNowCardDiv);
}
