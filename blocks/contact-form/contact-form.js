import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block already contains the full form structure from the source HTML.
  // This decorate function's primary role is to ensure all classes are applied
  // and the structure remains as intended, potentially re-wrapping or adjusting
  // elements if the pre-rendered HTML structure differs from the final desired one.

  // In this specific case, the provided HTML *is* the desired final structure for the form.
  // The block itself is the 'contactform-container' div.
  // We need to ensure that the form and its internal elements retain their classes and attributes.

  // Get the form element, which is the first child of the block.
  const form = block.querySelector('form');

  if (form) {
    // No need to moveInstrumentation for the form itself if it's already the direct child
    // and we're not replacing it with a new element.

    // The current structure of the block is already the desired output.
    // The `decorate` function here acts more as a validation/preservation step.
    // If there were dynamic parts based on block.children (e.g., if the block was a table
    // defining form fields), we would construct the form here.
    // Given the input HTML is the complete form, we just ensure its integrity.

    // Example: If we wanted to wrap the form in another div, we would do:
    // const formWrapper = document.createElement('div');
    // formWrapper.classList.add('form-wrapper-custom');
    // moveInstrumentation(form, formWrapper); // If replacing 'form' with 'formWrapper'
    // formWrapper.append(form);
    // block.replaceChildren(formWrapper);

    // For this specific block, the HTML provided is already the target structure.
    // The block itself is the `contactform-container` div.
    // The form is its direct child.
    // No further structural changes are needed based on the provided HTML and Block JSON.
    // All classes are already present in the source HTML and will be preserved.

    // If the block.children were rows of data to *build* the form, the logic would be different.
    // But here, the block *is* the pre-rendered form.
    // So, we simply ensure the block and its content are correctly represented.

    // The provided HTML already has all the necessary classes applied.
    // The decorate function will effectively do nothing if the pre-rendered HTML is already perfect.
    // This is a valid scenario if the block's content is static HTML.
  }
}
