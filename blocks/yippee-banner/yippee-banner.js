import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('cmp-yippee-banner');
  
  // Move instrumentation from the original block element to the new container
  moveInstrumentation(block, container);

  // The yippee-banner block has no fields in its model, meaning it's a structural block
  // that only provides the wrapper for other content.
  // All original content from the block should be moved into this new container.
  // This assumes the children of the yippee-banner block are the actual content
  // (e.g., another block like a carousel block).
  while (block.firstElementChild) {
    container.append(block.firstElementChild);
  }

  // If there are any images directly within the content moved into the container,
  // optimize them. This is a general safeguard, but typically images would be
  // handled by the decorate function of the nested block (e.g., a carousel item).
  container.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    // moveInstrumentation for the image itself is not strictly needed here
    // as the picture element is replaced, but it's good practice for direct content.
    // However, if the image is part of a nested block, that block's decorate
    // function should handle its own instrumentation.
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Replace the original block element with the new container
  block.replaceChildren(container);
}
