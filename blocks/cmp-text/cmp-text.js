import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const textRow = block.children[0];
  if (textRow) {
    moveInstrumentation(textRow, block);
    while (textRow.firstChild) {
      block.append(textRow.firstChild);
    }
  }
}
