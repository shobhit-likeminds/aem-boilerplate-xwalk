import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // BlockJson has 5 root model fields, so destructure exactly 5 rows
  const [
    bannerImageRow,
    headingRow,
    subheadingRow,
    whyShiftItemsContainerRow, // This row is a container for the items, not an item itself
    ctaLinkRow,
  ] = children;

  block.textContent = '';

  const section = document.createElement('section');
  section.classList.add('make-right-shift-itc-how-shift');

  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('make-right-shift-left-image-div');
  leftImageDiv.id = 'leftDivId';
  moveInstrumentation(bannerImageRow, leftImageDiv);
  const bannerPicture = bannerImageRow.querySelector('picture');
  if (bannerPicture) {
    const img = bannerPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      leftImageDiv.append(optimizedPic);
    }
  }
  section.append(leftImageDiv);

  const container = document.createElement('div');
  container.classList.add('make-right-shift-container', 'make-right-shift-read-more');

  const h1 = document.createElement('h1');
  h1.classList.add('make-right-shift-text-center', 'make-right-shift-pb-4', 'make-right-shift-rs-heading');
  moveInstrumentation(headingRow, h1);
  h1.innerHTML = headingRow.textContent.trim();
  container.append(h1);

  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('make-right-shift-read-more-text');
  moveInstrumentation(subheadingRow, readMoreTextDiv);
  // The subheading can contain rich text, so append its children directly
  while (subheadingRow.firstElementChild) readMoreTextDiv.append(subheadingRow.firstElementChild);
  container.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('make-right-shift-readMore');
  readMoreSpan.textContent = 'Read More'; // Add text content for the button
  container.append(readMoreSpan);

  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('make-right-shift-d-flex', 'make-right-shift-justify-content-evenly', 'make-right-shift-flex-wrap', 'make-right-shift-why-shift-wrapper');
  moveInstrumentation(whyShiftItemsContainerRow, whyShiftWrapper); // Instrument the container row

  // The actual item rows start after the 5 main rows
  const whyShiftItemRows = children.slice(5);

  whyShiftItemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('make-right-shift-mb-md-0', 'make-right-shift-mb-3', 'make-right-shift-text-center');
    moveInstrumentation(row, itemDiv);

    const itcHealthGoalWrapper = document.createElement('div');
    itcHealthGoalWrapper.classList.add('make-right-shift-itc-health-goal-wrapper');

    // Each item row has 3 cells: Image, Label, Link
    const cells = [...row.children];
    const imageCell = cells[0];
    const labelCell = cells[1];
    const linkCell = cells[2];

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          itcHealthGoalWrapper.append(optimizedPic);
        }
      }
    }
    itemDiv.append(itcHealthGoalWrapper);

    const anchor = document.createElement('a');
    anchor.classList.add('make-right-shift-text-center', 'make-right-shift-d-block', 'make-right-shift-text-capitalize', 'make-right-shift-pt-2', 'make-right-shift-image-label');

    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
        anchor.alt = foundLink.textContent.trim();
      }
    }
    if (labelCell) {
      moveInstrumentation(labelCell, anchor);
      anchor.innerHTML = labelCell.textContent.trim();
    }
    itemDiv.append(anchor);
    whyShiftWrapper.append(itemDiv);
  });

  container.append(whyShiftWrapper);

  const dMdNoneDiv = document.createElement('div');
  dMdNoneDiv.classList.add('make-right-shift-d-md-none', 'make-right-shift-d-block');
  container.append(dMdNoneDiv);

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('make-right-shift-button', 'make-right-shift-how-shift-button');
  moveInstrumentation(ctaLinkRow, buttonDiv);

  const ctaLink = ctaLinkRow.querySelector('a');
  if (ctaLink) {
    const newCtaLink = document.createElement('a');
    newCtaLink.classList.add('make-right-shift-cmp-button');
    newCtaLink.href = ctaLink.href;
    newCtaLink.alt = ctaLink.textContent.trim();
    newCtaLink.target = '_blank'; // Assuming target="_blank" from original HTML

    const spanText = document.createElement('span');
    spanText.classList.add('make-right-shift-cmp-button__text');
    spanText.textContent = ctaLink.textContent.trim();
    newCtaLink.append(spanText);

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('make-right-shift-cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    newCtaLink.append(screenReaderSpan);

    buttonDiv.append(newCtaLink);
  }
  container.append(buttonDiv);
  section.append(container);
  block.append(section);

  // Add event listener for the "Read More" functionality
  const readMoreButton = container.querySelector('.make-right-shift-readMore');
  const readMoreContent = container.querySelector('.make-right-shift-read-more-text');

  if (readMoreButton && readMoreContent) {
    // Initially hide content if it's longer than a certain height (e.g., 2 lines)
    // This logic would typically involve checking scrollHeight vs clientHeight
    // For simplicity, we'll just toggle a class.
    // The CSS for .make-right-shift-read-more-text.expanded and .make-right-shift-readMore.expanded
    // would control the height and button text.
    readMoreContent.classList.add('collapsed'); // Assume initially collapsed
    readMoreButton.textContent = 'Read More';

    readMoreButton.addEventListener('click', () => {
      readMoreContent.classList.toggle('collapsed');
      readMoreContent.classList.toggle('expanded');
      if (readMoreContent.classList.contains('expanded')) {
        readMoreButton.textContent = 'Read Less';
      } else {
        readMoreButton.textContent = 'Read More';
      }
    });
  }

  // This part seems to be a generic image optimization, not specific to this block's structure
  // It should probably be handled by a global script or removed if not needed.
  // Keeping it for now as it was in the original generated JS.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
