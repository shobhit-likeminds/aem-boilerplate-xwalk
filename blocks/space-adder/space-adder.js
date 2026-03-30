import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The space-adder block is an empty block used for spacing.
  // It does not have any content to process or render.
  // The original HTML shows it's just a div with a section inside,
  // but the section itself is empty and likely just for styling.
  // The decorate function should therefore do nothing.
}
