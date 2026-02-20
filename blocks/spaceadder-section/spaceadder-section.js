import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // This block is a purely structural block. It does not contain any content
  // from the CMS (as indicated by the empty 'fields' array in the Block JSON).
  // The block element itself is the <section> and already has the desired classes
  // 'spaceadder-section' and 'padding-80' from the source HTML.
  // Therefore, no further DOM manipulation or class additions are required within
  // the decorate function for this specific block.
}
