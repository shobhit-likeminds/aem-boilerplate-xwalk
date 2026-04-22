import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The buy-now-card block has no fields in its model,
  // so it will be rendered as an empty div by default in AEM.
  // The original HTML shows it as a container with specific grid classes.
  // We will create a div and apply those classes.

  const buyNowCardDiv = document.createElement('div');
  buyNowCardDiv.classList.add('buyNowCard', 'aem-GridColumn', 'aem-GridColumn--default--12');

  // Since the block has no content rows, we just replace the block with the new div.
  // No instrumentation needs to be moved as there are no authored rows to begin with.
  block.replaceChildren(buyNowCardDiv);
}
