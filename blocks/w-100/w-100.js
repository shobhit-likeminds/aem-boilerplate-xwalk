import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block model is empty, meaning the block itself is just a container.
  // The original HTML shows it only has styling and no content.
  // Therefore, we just apply the classes and style from the original HTML.

  // Apply classes from ORIGINAL HTML
  block.classList.add('pt-14', 'pt-sm-16');

  // Apply inline style from ORIGINAL HTML
  block.style.background = '#FFF6E3';

  // Since there are no authored rows or content fields in the EDS block structure,
  // there's no need to create new elements or move instrumentation.
  // The block element itself is the final desired structure.
}
