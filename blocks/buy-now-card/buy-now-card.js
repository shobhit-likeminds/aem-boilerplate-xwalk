import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The buy-now-card block has no defined fields in its model.
  // This means it's an empty block that serves as a container
  // for other components or is intended to be styled directly
  // without content from the block itself.

  // According to the original HTML, the block itself has classes.
  // We should ensure these classes are applied to the block element.
  // Since the block is empty, we just apply the classes to the block div.

  // The original HTML shows:
  // <div class="buyNowCard aem-GridColumn aem-GridColumn--default--12">
  // The block element itself is the <div> with class "buy-now-card".
  // We need to add the classes from the original HTML to this block element.

  block.classList.add('buyNowCard', 'aem-GridColumn', 'aem-GridColumn--default--12');

  // Since there are no fields defined in the block's model,
  // there are no children to process or transform.
  // The block remains an empty container with the specified classes.
}
