import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block has no content, just applies a class for vertical padding.
  // The original HTML shows 'spaceadder-vertical-padding-section spaceadder-padding-80'.
  // We'll apply these classes to the block itself.
  block.classList.add('spaceadder-vertical-padding-section', 'spaceadder-padding-80');
}
