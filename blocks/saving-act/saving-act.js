import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children directly as per BlockJson model
  const [imageRow, heading1Row, heading2Row, ctaLinkRow, ctaLinkLabelRow] = [...block.children];

  // Create the main container div
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('d-flex', 'justify-content-between', 'flex-wrap');

  // Image section
  const imageDiv = document.createElement('div');
  // The imageRow itself contains the div with the picture
  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      picture.replaceWith(optimizedPic);
      optimizedPic.querySelector('img').classList.add('img-fluid');
    }
    // Instrumentation should be moved from the first child of the row (the div containing the picture)
    moveInstrumentation(imageRow.firstElementChild, imageDiv);
    imageDiv.append(picture); // Append the (potentially optimized) picture element
  }
  mainContainer.append(imageDiv);

  // Headings section
  const headingsDiv = document.createElement('div');
  headingsDiv.classList.add('align-self-center');

  const h3_1 = document.createElement('h3');
  h3_1.classList.add('mb-1', 'h3-1');
  const b = document.createElement('b');
  // heading1Row.firstElementChild is the div containing the text
  moveInstrumentation(heading1Row.firstElementChild, b);
  b.textContent = heading1Row.textContent.trim();
  h3_1.append(b);
  headingsDiv.append(h3_1);

  const h3_2 = document.createElement('h3');
  h3_2.classList.add('heading', 'mt-0', 'mb-0', 'h3-2');
  const strong = document.createElement('strong');
  // heading2Row.firstElementChild is the div containing the text
  moveInstrumentation(heading2Row.firstElementChild, strong);
  strong.innerHTML = heading2Row.textContent.trim(); // Use innerHTML to preserve <br> if any
  h3_2.append(strong);
  headingsDiv.append(h3_2);

  mainContainer.append(headingsDiv);

  // CTA Link section
  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('align-self-center');

  // ctaLinkRow contains a div, which contains the <a>
  const ctaLink = ctaLinkRow.querySelector('a');
  if (ctaLink) {
    const anchor = document.createElement('a');
    anchor.href = ctaLink.href;
    anchor.classList.add('btn', 'btn-primary');
    anchor.setAttribute('target', '_blank'); // From original HTML

    // Use CTA Label for anchor text
    if (ctaLinkLabelRow) { // Check if ctaLinkLabelRow exists
      anchor.textContent = ctaLinkLabelRow.textContent.trim();
    } else {
      anchor.textContent = ctaLink.textContent.trim();
    }
    // Instrumentation should be moved from the first child of the row (the div containing the anchor)
    moveInstrumentation(ctaLinkRow.firstElementChild, anchor);
    ctaDiv.append(anchor);
  }
  mainContainer.append(ctaDiv);

  // Append main container to block
  block.textContent = '';
  block.append(mainContainer);

  // Add saving-t-c div as in original HTML, even if empty
  const savingTC = document.createElement('div');
  savingTC.classList.add('saving-t-c', 'text-right');
  block.append(savingTC);
}
