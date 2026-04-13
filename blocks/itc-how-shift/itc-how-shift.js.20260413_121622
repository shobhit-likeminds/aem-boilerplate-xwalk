import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    mainImageRow,
    headingRow,
    subheadingRow,
    descriptionRow,
    ctaLinkRow,
    ctaLinkLabelRow,
    ...whyShiftItemRows
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('itc-how-shift');

  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('left-image-div');
  moveInstrumentation(mainImageRow, leftImageDiv);
  const mainPicture = mainImageRow.querySelector('picture');
  if (mainPicture) {
    const mainImg = mainPicture.querySelector('img');
    if (mainImg) {
      const optimizedPic = createOptimizedPicture(mainImg.src, mainImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(mainImg, optimizedPic.querySelector('img'));
      leftImageDiv.append(optimizedPic);
    }
  }
  block.append(leftImageDiv);

  const container = document.createElement('div');
  container.classList.add('container', 'read-more');

  const heading = document.createElement('h1');
  heading.classList.add('text-center', 'pb-4', 'rs-heading');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.querySelector('div').textContent.trim();
  container.append(heading);

  const readMoreText = document.createElement('div');
  readMoreText.classList.add('read-more-text');
  moveInstrumentation(subheadingRow, readMoreText);
  while (subheadingRow.firstChild) readMoreText.append(subheadingRow.firstChild);
  moveInstrumentation(descriptionRow, readMoreText);
  while (descriptionRow.firstChild) readMoreText.append(descriptionRow.firstChild);
  container.append(readMoreText);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('readMore');
  container.append(readMoreSpan);

  // Add event listener for the readMore span
  readMoreSpan.addEventListener('click', () => {
    readMoreText.classList.toggle('expanded'); // Toggle a class to show/hide content
    readMoreSpan.classList.toggle('expanded'); // Toggle a class for the span itself (e.g., change text/icon)
  });

  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('d-flex', 'justify-content-evenly', 'flex-wrap', 'why-shift-wrapper');

  whyShiftItemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    moveInstrumentation(row, itemDiv);
    itemDiv.classList.add('mb-md-0', 'mb-3', 'text-center');

    const healthGoalWrapper = document.createElement('div');
    healthGoalWrapper.classList.add('itc-health-goal-wrapper');

    let itemImageEl;
    let itemLinkHref;
    let itemLinkLabelText;

    // Use content detection for item cells
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const linkLabelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));

    if (imageCell) {
      itemImageEl = imageCell.querySelector('picture');
    }
    if (linkCell) {
      const link = linkCell.querySelector('a');
      itemLinkHref = link.href;
      // Prioritize linkLabelCell for text, fallback to link text if linkLabelCell is missing or empty
      itemLinkLabelText = linkLabelCell ? linkLabelCell.textContent.trim() : link.textContent.trim();
    } else if (linkLabelCell) {
      // If there's no link, but there's a label cell, use it for label text
      itemLinkLabelText = linkLabelCell.textContent.trim();
    }


    if (itemImageEl) {
      const img = itemImageEl.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        healthGoalWrapper.append(optimizedPic);
      }
    }
    itemDiv.append(healthGoalWrapper);

    const linkEl = document.createElement('a');
    linkEl.classList.add('text-center', 'd-block', 'text-capitalize', 'pt-2', 'image-label');
    if (itemLinkHref) {
      linkEl.href = itemLinkHref;
    }
    if (itemLinkLabelText) {
      linkEl.textContent = itemLinkLabelText;
      linkEl.alt = itemLinkLabelText; // Use label for alt text
    }
    itemDiv.append(linkEl);
    whyShiftWrapper.append(itemDiv);
  });
  container.append(whyShiftWrapper);

  const spacerDiv = document.createElement('div');
  spacerDiv.classList.add('d-md-none', 'd-block');
  container.append(spacerDiv);

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button', 'how-shift-button');

  const ctaLink = ctaLinkRow.querySelector('a');
  // The ctaLinkLabelRow contains a div, which contains the text.
  // The original HTML shows the ctaLinkLabelRow as a div containing a div with a link.
  // We need to extract the text content from the inner div.
  const ctaLinkLabelText = ctaLinkLabelRow.querySelector('div').textContent.trim();

  if (ctaLink) {
    const ctaButton = document.createElement('a');
    ctaButton.classList.add('cmp-button');
    ctaButton.href = ctaLink.href;
    ctaButton.alt = ctaLinkLabelText; // Use label for alt text

    const ctaButtonText = document.createElement('span');
    ctaButtonText.classList.add('cmp-button__text');
    ctaButtonText.textContent = ctaLinkLabelText;
    ctaButton.append(ctaButtonText);

    // The original HTML has target="_blank", so we add it.
    ctaButton.target = '_blank';
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    ctaButton.append(screenReaderSpan);

    buttonDiv.append(ctaButton);
  }
  container.append(buttonDiv);

  block.append(container);
}
