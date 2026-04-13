import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Check 0 & 1: Structure Alignment - The 'text' block has a single field, 'text', which is a richtext.
  // This means the block.children will contain one row corresponding to this field.
  // We need to find this row and then extract its content.

  // Find the row that contains the text content.
  // Based on the EDS Block Structure, the text content is directly in the first child div of the block.
  // The BlockJson confirms a single 'text' field.
  const textRow = [...block.children].find(row => row.children.length > 0 && (row.querySelector('h1') || row.querySelector('p')));

  const textDiv = document.createElement('div');
  textDiv.classList.add('cmp-text'); // Copied class from ORIGINAL HTML

  if (textRow) {
    // The 'text' field is a richtext, so its content is directly within its cell.
    // We need to move the content from the original cell into the new div.
    // The content is expected to be in the first child of the textRow.
    const textCell = textRow.children[0]; // This is safe because the EDS structure for 'text' block ensures a single cell for the richtext field.
    if (textCell) {
      moveInstrumentation(textCell, textDiv);
      while (textCell.firstChild) {
        textDiv.append(textCell.firstChild);
      }
    }
  }

  // Apply classes from the block itself, as per ORIGINAL HTML
  // These classes are on the outer div of the component, not the inner text div.
  block.classList.add('text-align-center', 'koi-theme', 'pm-left-right', 'aem-GridColumn--default--none', 'aem-GridColumn--phone--none', 'aem-GridColumn--phone--7', 'aem-GridColumn', 'aem-GridColumn--default--8', 'aem-GridColumn--offset--phone--2', 'aem-GridColumn--offset--default--2');

  block.textContent = '';
  block.append(textDiv);

  // Check 2: Interactivity - No interactive elements found in ORIGINAL HTML.
  // Check 3: Class Names - All class names are copied verbatim from ORIGINAL HTML.

  // Image optimization (if any images were present, though not in this specific model)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
