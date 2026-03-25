import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The original HTML already contains the <section class="verticalPadding_section padding-80"></section>
  // The block itself is just a container for this section.
  // No need to create and append a new section, as it's already part of the block's content.
  // The block is essentially a wrapper for the section.
  // The decorate function should not modify the block's content if it's already structured correctly.
  // In this case, the block is just a div with the class "space-adder" (from the block name)
  // and it contains the section.
  // Since the BlockJson has no fields, there's no dynamic content to render.
  // The block's purpose is likely just to provide the wrapper for the section.
  // Therefore, no action is needed in the decorate function.
}
