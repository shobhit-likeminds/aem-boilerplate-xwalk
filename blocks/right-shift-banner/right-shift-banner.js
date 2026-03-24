import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    bannerImageRow,
    headingRow,
    subheadingRow,
    buttonLinkRow,
    whyShiftItemsTitleRow, // This row contains the title for the why-shift-items container
    ...whyShiftItemRows
  ] = [...block.children];

  const section = document.createElement('section');
  // Corrected class name from original HTML
  section.classList.add('makeRightShift-itc-how-shift');

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('makeRightShift-left-image-div');
  leftImageDiv.id = 'leftDivId';
  const bannerPicture = bannerImageRow.querySelector('picture');
  if (bannerPicture) {
    const img = bannerPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    bannerPicture.replaceWith(optimizedPic);
    moveInstrumentation(bannerImageRow.firstElementChild, leftImageDiv);
    leftImageDiv.append(bannerImageRow.firstElementChild);
  }
  section.append(leftImageDiv);

  // Right Content Container
  const container = document.createElement('div');
  container.classList.add('makeRightShift-container', 'makeRightShift-read-more');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('makeRightShift-text-center', 'makeRightShift-pb-4', 'makeRightShift-rs-heading');
  moveInstrumentation(headingRow.firstElementChild, heading);
  while (headingRow.firstElementChild) heading.append(headingRow.firstElementChild);
  container.append(heading);

  // Subheading
  const subheadingDiv = document.createElement('div');
  subheadingDiv.classList.add('makeRightShift-read-more-text');
  moveInstrumentation(subheadingRow.firstElementChild, subheadingDiv);
  while (subheadingRow.firstElementChild) subheadingDiv.append(subheadingRow.firstElementChild);
  container.append(subheadingDiv);

  // Read More span (empty in original, for styling)
  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('makeRightShift-readMore');
  readMoreSpan.textContent = 'Read More'; // Added text for visibility, though original is empty for styling
  container.append(readMoreSpan);

  // Why Shift Items Wrapper
  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('makeRightShift-d-flex', 'makeRightShift-justify-content-evenly', 'makeRightShift-flex-wrap', 'makeRightShift-why-shift-wrapper');

  whyShiftItemRows.forEach((row) => {
    // Each whyShiftItemRow has two cells: [image, link]
    const [imageCellContent, linkCellContent] = [...row.children];

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('makeRightShift-mb-md-0', 'makeRightShift-mb-3', 'makeRightShift-text-center');
    moveInstrumentation(row, itemDiv);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('makeRightShift-itc-health-goal-wrapper');

    const imagePicture = imageCellContent.querySelector('picture');
    if (imagePicture) {
      const img = imagePicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imagePicture.replaceWith(optimizedPic);
      imageWrapper.append(optimizedPic);
    }
    itemDiv.append(imageWrapper);

    const originalLink = linkCellContent.querySelector('a');
    if (originalLink) {
      const link = document.createElement('a');
      link.href = originalLink.href;
      link.alt = originalLink.textContent;
      link.classList.add('makeRightShift-text-center', 'makeRightShift-d-block', 'makeRightShift-text-capitalize', 'makeRightShift-pt-2', 'makeRightShift-image-label');
      moveInstrumentation(originalLink, link);
      while (originalLink.firstChild) link.append(originalLink.firstChild);
      itemDiv.append(link);
    }
    whyShiftWrapper.append(itemDiv);
  });
  container.append(whyShiftWrapper);

  // Spacer div (empty in original)
  const spacerDiv = document.createElement('div');
  spacerDiv.classList.add('makeRightShift-d-md-none', 'makeRightShift-d-block');
  container.append(spacerDiv);

  // Button Link
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('makeRightShift-button', 'makeRightShift-how-shift-button');
  const buttonLink = buttonLinkRow.querySelector('a');
  if (buttonLink) {
    const newButtonLink = document.createElement('a');
    newButtonLink.href = buttonLink.href;
    newButtonLink.alt = buttonLink.textContent;
    newButtonLink.classList.add('makeRightShift-cmp-button');
    newButtonLink.target = '_blank'; // From original HTML
    moveInstrumentation(buttonLink, newButtonLink);

    const buttonTextSpan = document.createElement('span');
    buttonTextSpan.classList.add('makeRightShift-cmp-button__text');
    buttonTextSpan.textContent = buttonLink.textContent;
    newButtonLink.append(buttonTextSpan);

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('makeRightShift-cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    newButtonLink.append(screenReaderSpan);

    buttonDiv.append(newButtonLink);
  }
  container.append(buttonDiv);

  section.append(container);

  block.textContent = '';
  block.append(section);

  // Add event listener for "Read More" functionality
  readMoreSpan.addEventListener('click', () => {
    container.classList.toggle('makeRightShift-read-more');
    if (container.classList.contains('makeRightShift-read-more')) {
      readMoreSpan.textContent = 'Read More';
    } else {
      readMoreSpan.textContent = 'Read Less';
    }
  });
}
