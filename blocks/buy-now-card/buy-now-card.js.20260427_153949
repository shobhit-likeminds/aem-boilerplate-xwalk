import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The buy-now-card block has no defined fields in its model.
  // This means it's an empty block that serves as a container or placeholder
  // and does not render any specific content from authored rows.
  //
  // According to the problem description, if a block has no fields,
  // it should be treated as a simple container, and any existing content
  // in the block will be removed or replaced.
  //
  // Since there are no fields, there are no authored rows to process.
  // We simply create the main container div with the appropriate classes.

  const buyNowCardDiv = document.createElement('div');
  buyNowCardDiv.classList.add('buyNowCard', 'aem-GridColumn', 'aem-GridColumn--default--12');

  // Since there are no authored rows to move instrumentation from,
  // and no content to move, we can safely replace the block's children.
  // If the block ever gets authored content, this decorate function would need
  // to be updated to handle those fields and move instrumentation.

  block.replaceChildren(buyNowCardDiv);
}
