import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    mainImageRow,
    mainHeadingRow,
    subheadingRow,
    descriptionRow,
    ctaLinkRow,
    itemsContainerRow, // This row is just a container, its content is not used directly
    ...itemRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('makeRightShift-itc-how-shift');

  // Main Image
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('makeRightShift-left-image-div');
  leftImageDiv.id = 'leftDivId';
  const mainPicture = mainImageRow.querySelector('picture');
  if (mainPicture) {
    moveInstrumentation(mainImageRow.firstElementChild, mainPicture);
    leftImageDiv.append(mainPicture);
  }
  section.append(leftImageDiv);

  // Content Container
  const container = document.createElement('div');
  container.classList.add('makeRightShift-container', 'makeRightShift-read-more');

  // Main Heading
  const mainHeading = document.createElement('h1');
  mainHeading.classList.add('makeRightShift-text-center', 'makeRightShift-pb-4', 'makeRightShift-rs-heading');
  moveInstrumentation(mainHeadingRow.firstElementChild, mainHeading);
  while (mainHeadingRow.firstElementChild.firstChild) {
    mainHeading.append(mainHeadingRow.firstElementChild.firstChild);
  }
  container.append(mainHeading);

  // Subheading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('makeRightShift-read-more-text');

  const subheading = document.createElement('h2');
  moveInstrumentation(subheadingRow.firstElementChild, subheading);
  while (subheadingRow.firstElementChild.firstChild) {
    subheading.append(subheadingRow.firstElementChild.firstChild);
  }
  readMoreTextDiv.append(subheading);

  const description = document.createElement('p');
  moveInstrumentation(descriptionRow.firstElementChild, description);
  while (descriptionRow.firstElementChild.firstChild) {
    description.append(descriptionRow.firstElementChild.firstChild);
  }
  readMoreTextDiv.append(description);
  container.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('makeRightShift-readMore');
  container.append(readMoreSpan);

  // Items
  const itemsWrapper = document.createElement('div');
  itemsWrapper.classList.add('makeRightShift-d-flex', 'makeRightShift-justify-content-evenly', 'makeRightShift-flex-wrap', 'makeRightShift-why-shift-wrapper');

  itemRows.forEach((row) => {
    // Each item row has two cells: image and link
    const [imageCell, linkCell] = [...row.children];

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('makeRightShift-mb-md-0', 'makeRightShift-mb-3', 'makeRightShift-text-center');
    moveInstrumentation(row, itemDiv);

    const healthGoalWrapper = document.createElement('div');
    healthGoalWrapper.classList.add('makeRightShift-itc-health-goal-wrapper');

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        moveInstrumentation(imageCell, picture);
        healthGoalWrapper.append(picture);
      }
    }
    itemDiv.append(healthGoalWrapper);

    if (linkCell) {
      const originalLink = linkCell.querySelector('a');
      if (originalLink) {
        const link = document.createElement('a');
        link.href = originalLink.href;
        link.alt = originalLink.alt || '';
        link.classList.add('makeRightShift-text-center', 'makeRightShift-d-block', 'makeRightShift-text-capitalize', 'makeRightShift-pt-2', 'makeRightShift-image-label');
        moveInstrumentation(linkCell, link);
        while (originalLink.firstChild) {
          link.append(originalLink.firstChild);
        }
        itemDiv.append(link);
      }
    }
    itemsWrapper.append(itemDiv);
  });
  container.append(itemsWrapper);

  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('makeRightShift-d-md-none', 'makeRightShift-d-block');
  container.append(emptyDiv);

  // CTA Link
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('makeRightShift-button', 'makeRightShift-how-shift-button');
  const ctaLink = ctaLinkRow.querySelector('a');
  if (ctaLink) {
    const newCtaLink = document.createElement('a');
    newCtaLink.href = ctaLink.href;
    newCtaLink.alt = ctaLink.alt || '';
    newCtaLink.classList.add('makeRightShift-cmp-button');
    newCtaLink.target = '_blank'; // Assuming target blank from original HTML
    newCtaLink.id = `button-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID

    const spanText = document.createElement('span');
    spanText.classList.add('makeRightShift-cmp-button__text');
    moveInstrumentation(ctaLinkRow.firstElementChild, spanText);
    while (ctaLink.firstChild) {
      spanText.append(ctaLink.firstChild);
    }
    newCtaLink.append(spanText);

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('makeRightShift-cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    newCtaLink.append(screenReaderSpan);

    buttonDiv.append(newCtaLink);
  }
  container.append(buttonDiv);

  section.append(container);

  // Optimize images
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Add event listener for 'readMore' functionality
  readMoreSpan.addEventListener('click', () => {
    container.classList.toggle('makeRightShift-read-more');
  });

  block.textContent = '';
  block.append(section);
}
