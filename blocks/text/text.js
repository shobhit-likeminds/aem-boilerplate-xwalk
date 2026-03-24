import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [textRow] = [...block.children];

  const textContent = document.createElement('div');
  moveInstrumentation(textRow, textContent);
  // The class name 'text-cmp-text' is already present on the block itself in the ORIGINAL HTML.
  // The generated JS was trying to add 'text-cmp-text' to a new div, but the block itself
  // already has this class. For the content wrapper, we should use a more generic class
  // or no class if the styling is applied directly to the block.
  // However, if the intent is to wrap the content in a div that also carries the component's
  // main styling, and the block itself is just a container, then the class should be applied.
  // Given the ORIGINAL HTML: <div id="text-ac7d0b8693" class="text-cmp-text">...</div>
  // The block element already has 'text-cmp-text'. The inner div should probably not duplicate it
  // unless there's a specific styling reason.
  // For now, assuming the inner div is just a content wrapper, we'll remove the class application
  // as the block itself already has it. If a specific inner class is needed, it should be defined
  // in the CSS and BlockJson.
  // Re-evaluating: The original JS was trying to move the content from `textRow` into `textContent`.
  // The `textRow` itself is `<div><div><p>Text text content</p></div></div>`.
  // The `textContent` element is created to hold the actual content.
  // The class `text-cmp-text` is on the *block* in the original HTML.
  // The generated JS was applying `text-cmp-text` to the *newly created div* (`textContent`).
  // This is incorrect. The `text-cmp-text` class should remain on the main block element.
  // The `textContent` div is just a wrapper for the rich text content.
  // Let's assume the intention is to wrap the rich text content in a div, and the block itself
  // already has the main component class. No specific class is needed for this inner wrapper
  // unless defined in the CSS for a specific purpose.
  // If the original HTML's content was *inside* a div with `text-cmp-text`, then it would be correct.
  // But the original HTML shows `text-cmp-text` on the *block* itself.
  // So, the `textContent` div should not have `text-cmp-text`.
  // The block itself already has the class `text` from the AEM structure.
  // The original HTML shows `<div id="text-ac7d0b8693" class="text-cmp-text">`.
  // This means the block element itself should end up with `text-cmp-text`.
  // The `decorate` function receives `block` which is `<div class="text">`.
  // We need to ensure the final block has `text-cmp-text`.
  // The `block.classList.add('text-cmp-text')` should be applied to the `block` itself, not the inner `textContent`.

  // Let's re-read the original HTML and block structure carefully.
  // EDS BLOCK STRUCTURE: <div class="text"> ... </div>
  // ORIGINAL HTML: <div id="text-ac7d0b8693" class="text-cmp-text"> ... </div>
  // This means the `decorate` function receives a `block` element that has `class="text"`.
  // The final rendered HTML should have `class="text-cmp-text"`.
  // So, the `decorate` function needs to add `text-cmp-text` to the `block` element.

  block.classList.add('text-cmp-text'); // Apply class from ORIGINAL HTML to the block itself

  while (textRow.firstChild) {
    textContent.append(textRow.firstChild);
  }

  block.textContent = ''; // Clear the block's original content
  block.append(textContent); // Append the new textContent div
}
