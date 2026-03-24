import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    mainImageRow,
    headingRow,
    subheadingRow,
    descriptionRow,
    ctaLinkRow,
    itemsContainerRow, // This row is for the 'Items' container, not an item itself.
    ...itemRows
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('make-right-shift-healthgoal', 'make-right-shift-banner');

  const section = document.createElement('section');
  section.classList.add('make-right-shift-itc-how-shift');
  block.append(section);

  // Main Image
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('make-right-shift-left-image-div');
  moveInstrumentation(mainImageRow, leftImageDiv);
  const mainPicture = mainImageRow.querySelector('picture');
  if (mainPicture) {
    const mainImg = mainPicture.querySelector('img');
    const optimizedMainPic = createOptimizedPicture(mainImg.src, mainImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(mainImg, optimizedMainPic.querySelector('img'));
    leftImageDiv.append(optimizedMainPic);
  }
  section.append(leftImageDiv);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('make-right-shift-container', 'make-right-shift-read-more');
  section.append(containerDiv);

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('make-right-shift-text-center', 'make-right-shift-pb-4', 'make-right-shift-rs-heading');
  moveInstrumentation(headingRow, heading);
  heading.append(...headingRow.children[0].childNodes);
  containerDiv.append(heading);

  // Subheading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('make-right-shift-read-more-text');
  moveInstrumentation(subheadingRow, readMoreTextDiv);
  while (subheadingRow.firstChild) readMoreTextDiv.append(subheadingRow.firstChild);
  moveInstrumentation(descriptionRow, readMoreTextDiv);
  while (descriptionRow.firstChild) readMoreTextDiv.append(descriptionRow.firstChild);
  containerDiv.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('make-right-shift-readMore');
  readMoreSpan.textContent = 'Read More'; // Add text content for the span
  containerDiv.append(readMoreSpan);

  // Add event listener for "Read More" functionality
  readMoreSpan.addEventListener('click', () => {
    readMoreTextDiv.classList.toggle('expanded'); // Toggle a class to expand/collapse
    if (readMoreTextDiv.classList.contains('expanded')) {
      readMoreSpan.textContent = 'Read Less';
    } else {
      readMoreSpan.textContent = 'Read More';
    }
  });

  // Items
  const itemsWrapper = document.createElement('div');
  itemsWrapper.classList.add('make-right-shift-d-flex', 'make-right-shift-justify-content-evenly', 'make-right-shift-flex-wrap', 'make-right-shift-why-shift-wrapper');
  moveInstrumentation(itemsContainerRow, itemsWrapper); // Move instrumentation for the container row
  containerDiv.append(itemsWrapper);

  itemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('make-right-shift-mb-md-0', 'make-right-shift-mb-3', 'make-right-shift-text-center');
    moveInstrumentation(row, itemDiv);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('make-right-shift-itc-health-goal-wrapper');
    itemDiv.append(imageWrapper);

    const linkEl = document.createElement('a');
    linkEl.classList.add('make-right-shift-text-center', 'make-right-shift-d-block', 'make-right-shift-text-capitalize', 'make-right-shift-pt-2', 'make-right-shift-image-label');
    itemDiv.append(linkEl);

    // Assuming the item row has 3 cells: Image, Link, Label
    const [imageCell, linkCell, labelCell] = [...row.children];

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageWrapper.append(optimizedPic);
    }

    // Link
    const anchor = linkCell.querySelector('a');
    if (anchor) {
      linkEl.href = anchor.href;
      linkEl.alt = anchor.textContent; // Assuming alt text comes from link text
      moveInstrumentation(linkCell, linkEl);
      // Append the content of the link cell (which is the anchor itself) to linkEl
      while (anchor.firstChild) linkEl.append(anchor.firstChild);
    }

    // Label (if it's a separate cell and not already part of the link text)
    // Based on the EDS structure, the label is a separate rich text paragraph.
    const labelParagraph = labelCell.querySelector('p');
    if (labelParagraph) {
      // If the link text is already the label, we don't need to append it again.
      // However, if the label is meant to be separate or enhance the link,
      // we can append it or set it as text content for the link.
      // For now, let's assume the link text is the primary label.
      // If the label content is distinct, it might need its own element.
      // For this block, the label is intended to be the text of the <a> tag.
      // The original HTML shows the label content directly inside the <a> tag.
      // So, the `linkEl.append(anchor.firstChild)` above already handles it.
      // If there was a separate requirement for a <p> label, it would need a new element.
    }
    itemsWrapper.append(itemDiv);
  });

  const dMdNoneDiv = document.createElement('div');
  dMdNoneDiv.classList.add('make-right-shift-d-md-none', 'make-right-shift-d-block');
  containerDiv.append(dMdNoneDiv);

  // CTA Link
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('make-right-shift-button', 'make-right-shift-how-shift-button');
  moveInstrumentation(ctaLinkRow, buttonDiv);
  const ctaLink = ctaLinkRow.querySelector('a');
  if (ctaLink) {
    const newCtaLink = document.createElement('a');
    newCtaLink.href = ctaLink.href;
    newCtaLink.alt = ctaLink.textContent;
    newCtaLink.classList.add('cmp-button'); // Corrected class name from original HTML
    newCtaLink.target = '_blank';
    moveInstrumentation(ctaLink, newCtaLink);

    const spanText = document.createElement('span');
    spanText.classList.add('cmp-button__text');
    spanText.textContent = ctaLink.textContent;
    newCtaLink.append(spanText);

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    newCtaLink.append(screenReaderSpan);

    buttonDiv.append(newCtaLink);
  }
  containerDiv.append(buttonDiv);
}
