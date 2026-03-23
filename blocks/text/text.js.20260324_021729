import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block itself already has the class 'text-cmp-text' from the original HTML.
  // The generated JS should not create a new div with this class, but rather
  // move the content directly into the block.

  // The EDS block structure shows:
  // <div class="text">
  //   <div>
  //     <div><p>Content text content</p></div>
  //   </div>
  // </div>
  // The block.children[0] is the outer div, and block.children[0].children[0] is the inner div containing the content.

  const contentWrapper = block.children[0]; // This is the div containing the actual content div
  const contentCell = contentWrapper.children[0]; // This is the div containing the content itself

  // Move instrumentation from the contentCell to the block itself, as the block
  // will now directly contain the content.
  moveInstrumentation(contentCell, block);

  // Move all children from the contentCell directly into the block.
  // The block already has the class 'text-cmp-text' from the original HTML.
  // We are effectively flattening the structure:
  // From: <div class="text-cmp-text"><div><div><p>...</p></div></div></div>
  // To:   <div class="text-cmp-text"><p>...</p></div>
  while (contentCell.firstChild) {
    block.append(contentCell.firstChild);
  }

  // Remove the now empty contentWrapper (and its child contentCell)
  contentWrapper.remove();
}
