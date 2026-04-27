import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The buy-now-card block has no defined fields in its model.
  // This implies it's an empty block that might be used as a container
  // or for dynamic content injected by other means (e.g., client-side JS).
  //
  // Based on the provided ORIGINAL HTML and BlockJson, this block
  // appears to be a simple container with specific grid column classes.
  // We should transfer these classes to the block itself.

  // Create a new root element for the block.
  const root = document.createElement('div');
  root.classList.add('buyNowCard', 'aem-GridColumn', 'aem-GridColumn--default--12');

  // Move instrumentation from the original block to the new root element.
  // Since the block itself is the only authored element at the root,
  // we move its instrumentation to the new root.
  moveInstrumentation(block, root);

  // Append any existing children of the block to the new root.
  // This handles cases where authors might have added content directly
  // into the block in the editor, even if the model is empty.
  while (block.firstChild) {
    root.append(block.firstChild);
  }

  // Replace the original block's children with the new root.
  block.replaceChildren(root);

  // If there are any pictures inside the block (e.g., if authors
  // drag-and-dropped images into this empty container block),
  // optimize them.
  root.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    // Move instrumentation from the original img to the optimized img
    // within the new picture element.
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
