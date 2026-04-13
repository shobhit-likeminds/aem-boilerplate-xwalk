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
    ...itemRows
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('itc-how-shift');

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('left-image-div');
  moveInstrumentation(mainImageRow, leftImageDiv);
  const mainImagePicture = mainImageRow.querySelector('picture');
  if (mainImagePicture) {
    const img = mainImagePicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    leftImageDiv.append(optimizedPic);
  }
  block.append(leftImageDiv);

  // Container Read More
  const containerReadMore = document.createElement('div');
  containerReadMore.classList.add('container', 'read-more');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('text-center', 'pb-4', 'rs-heading');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  containerReadMore.append(heading);

  // Subheading and Description
  const readMoreText = document.createElement('div');
  readMoreText.classList.add('read-more-text');
  moveInstrumentation(subheadingRow, readMoreText);
  while (subheadingRow.firstChild) readMoreText.append(subheadingRow.firstChild);
  moveInstrumentation(descriptionRow, readMoreText);
  while (descriptionRow.firstChild) readMoreText.append(descriptionRow.firstChild);
  containerReadMore.append(readMoreText);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('readMore');
  containerReadMore.append(readMoreSpan);

  // Interactivity: Read More toggle
  readMoreSpan.addEventListener('click', () => {
    containerReadMore.classList.toggle('expanded');
  });

  // Items Wrapper
  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('d-flex', 'justify-content-evenly', 'flex-wrap', 'why-shift-wrapper');

  itemRows.forEach((row) => {
    const cells = [...row.children];
    // Content detection for item cells
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a') && cell.textContent.trim() !== '');
    const linkLabelCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim() !== '' && cell !== linkCell);

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('mb-md-0', 'mb-3', 'text-center');
    moveInstrumentation(row, itemDiv);

    const itcHealthGoalWrapper = document.createElement('div');
    itcHealthGoalWrapper.classList.add('itc-health-goal-wrapper');
    if (imageCell) {
      moveInstrumentation(imageCell, itcHealthGoalWrapper);
      const itemPicture = imageCell.querySelector('picture');
      if (itemPicture) {
        const img = itemPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        itcHealthGoalWrapper.append(optimizedPic);
      }
    }
    itemDiv.append(itcHealthGoalWrapper);

    const anchor = document.createElement('a');
    anchor.classList.add('text-center', 'd-block', 'text-capitalize', 'pt-2', 'image-label');
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
        anchor.alt = linkLabelCell ? linkLabelCell.textContent.trim() : ''; // Use linkLabelCell for alt
        anchor.textContent = linkLabelCell ? linkLabelCell.textContent.trim() : ''; // Use linkLabelCell for text content
      }
      moveInstrumentation(linkCell, anchor);
    }
    if (linkLabelCell) {
      moveInstrumentation(linkLabelCell, anchor);
    }
    itemDiv.append(anchor);

    whyShiftWrapper.append(itemDiv);
  });

  containerReadMore.append(whyShiftWrapper);

  const dMdNoneDiv = document.createElement('div');
  dMdNoneDiv.classList.add('d-md-none', 'd-block');
  containerReadMore.append(dMdNoneDiv);

  // CTA Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button', 'how-shift-button');

  const ctaAnchor = document.createElement('a');
  ctaAnchor.classList.add('cmp-button');
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaAnchor.href = foundCtaLink.href;
    // The alt attribute for the CTA button should come from the ctaLinkLabelRow's text content,
    // not from the href. The original HTML shows "View All" as alt.
    ctaAnchor.alt = ctaLinkLabelRow.textContent.trim();
  }
  moveInstrumentation(ctaLinkRow, ctaAnchor);

  const ctaSpanText = document.createElement('span');
  ctaSpanText.classList.add('cmp-button__text');
  ctaSpanText.textContent = ctaLinkLabelRow.textContent.trim();
  moveInstrumentation(ctaLinkLabelRow, ctaSpanText);
  ctaAnchor.append(ctaSpanText);

  // Add screen reader only text if present in original HTML
  const screenReaderOnlySpan = document.createElement('span');
  screenReaderOnlySpan.classList.add('cmp-link__screen-reader-only');
  screenReaderOnlySpan.textContent = 'opens in a new tab'; // Hardcoded based on original HTML
  ctaAnchor.append(screenReaderOnlySpan);

  buttonDiv.append(ctaAnchor);
  containerReadMore.append(buttonDiv);

  block.append(containerReadMore);

  // Optimize all images within the block
  // This part is redundant if createOptimizedPicture is used directly when appending images.
  // Keeping it for now as it's in the original generated code, but ideally should be removed
  // if all images are handled by createOptimizedPicture during their initial creation.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
