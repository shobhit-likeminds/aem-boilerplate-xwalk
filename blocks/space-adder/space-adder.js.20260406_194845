import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Check 0 & 1: The block structure is empty according to EDS Block Structure and Block JSON.
  // However, the ORIGINAL HTML shows a <section> element with specific classes.
  // The generated JS was clearing the block and then appending an empty section.
  // The intent seems to be to replicate the original HTML structure.
  // Since the block.children is empty based on the EDS Block Structure,
  // we should create the section element as it appears in the original HTML.

  // The original HTML has: <section class="verticalPadding_section padding-80"></section>
  // The generated JS was trying to create this, but the block.textContent = ''; was problematic
  // if the block was supposed to contain this section directly.
  // Given the EDS Block Structure is empty, the block itself is the container.
  // We need to ensure the section is created and added to the block.

  // The original HTML shows the section *inside* the div.spaceAdder.
  // The decorate function receives the div.spaceAdder as 'block'.
  // So, we should ensure 'block' contains the section.

  // If the block is empty, we create the section.
  // If the block already contains the section (e.g., from AEM rendering), we might not need to create it.
  // However, the generated JS was clearing it, implying it needs to be generated.
  // Let's assume the block is empty and we need to create the section as per the original HTML.

  // The generated JS was:
  // const section = document.createElement('section');
  // section.classList.add('verticalPadding_section', 'padding-80');
  // block.textContent = ''; // This clears any existing content
  // block.append(section); // This adds the new section

  // This seems correct for an empty block that needs to be populated with the section from the original HTML.
  // The BlockJson and EDS Block Structure indicate an empty block, so the JS should create the content.
  // The generated JS already does this.

  // Check 0: No .children[n] usage, as the block is empty and content is being generated.
  // Check 1: Structure alignment. BlockJson and EDS Block Structure show an empty block.
  // The original HTML shows a section inside the block. The JS creates this section. This aligns.
  // Check 2: Interactivity. The original HTML has no interactive elements. No event listeners needed.

  // The provided JS is already doing what's expected given the inputs.
  // The `block.textContent = '';` is crucial if the block might contain other elements
  // from the AEM rendering that should be replaced by this specific section.
  // If the block is truly empty as per EDS Block Structure, then `block.textContent = '';`
  // is redundant but harmless.

  // The class names `verticalPadding_section` and `padding-80` are from the ALLOWLIST.
  // The `spaceAdder` class is on the block itself, not added by the JS.

  const section = document.createElement('section');
  section.classList.add('verticalPadding_section', 'padding-80');
  block.textContent = ''; // Clear any existing content within the block
  block.append(section); // Add the new section
}
