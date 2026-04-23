import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The buy-now-card block has an empty model, meaning it doesn't contain any authored content.
  // It only exists as a container for other components or for styling purposes.
  // Therefore, we only need to apply the class names from the original HTML.
  block.classList.add('buyNowCard', 'aem-GridColumn', 'aem-GridColumn--default--12');

  // Since there are no authored rows or cells to process, there's no need to
  // create new elements or move instrumentation. The block itself is the final element.
}
