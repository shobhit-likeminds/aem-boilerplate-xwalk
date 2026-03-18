import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The text component directly uses the content of the block.
  // The block itself is the container for the text.
  // We need to apply the class 'text-component' to the block element.
  block.classList.add('text-component');

  // No complex DOM restructuring is needed for a simple text block.
  // The content (h1 tags in this case) is already directly inside the block.
  // We just ensure any existing instrumentation is moved if we were to replace
  // the block's content, but in this case, we are just decorating the block itself.

  // If there were specific cells, we would iterate through them.
  // For a simple text block, the content is usually just directly within the block.
  // The provided HTML shows h1 tags directly under the div.
  // No further processing of children or cells is explicitly needed based on the HTML.

  // If there were images within the text, we would optimize them.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
