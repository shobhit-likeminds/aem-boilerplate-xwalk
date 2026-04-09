import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The Space Adder block has no fields in its model, so it renders as an empty div.
  // The original HTML shows it as a div with specific classes.
  // We need to apply these classes to the block element itself.
  block.classList.add('spaceAdder', 'aem-GridColumn', 'aem-GridColumn--default--12');

  // Since there are no children/rows in the block's model,
  // there's no content to process or move.
  // The block is essentially a placeholder for spacing,
  // controlled by its CSS classes.
}
