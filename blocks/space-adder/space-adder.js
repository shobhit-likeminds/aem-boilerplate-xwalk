import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The Space-Adder block is empty and serves as a placeholder for spacing.
  // It doesn't have any content to render, so we just ensure it has the correct classes.
  block.classList.add('spaceAdder', 'aem-GridColumn', 'aem-GridColumn--default--12');
}
