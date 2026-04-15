import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The buy-now-card block has no fields defined in its model.
  // This means it's an empty block that serves as a container or marker,
  // and its styling is applied directly to the block element itself.
  // Therefore, we only need to apply the class names from the original HTML
  // to the block element.

  // The original HTML shows the block div with specific classes.
  // We need to ensure these classes are present on the block element.
  block.classList.add('buyNowCard', 'aem-GridColumn', 'aem-GridColumn--default--12');

  // Since there are no fields, there's no content to process or transform.
  // The block remains an empty container with the correct styling classes.
}
