import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('makerightshift-itc-how-shift');

  const [
    leftImageRow,
    leftImageAltRow,
    headingRow,
    subheadingRow,
    descriptionRow,
    itemsRow, // This row is just a placeholder for the container, its content is not used
    buttonTextRow,
    buttonLinkRow,
    ...itemRows
  ] = [...block.children];

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('makerightshift-left-image-div');
  moveInstrumentation(leftImageRow, leftImageDiv);
  const leftPicture = leftImageRow.querySelector('picture');
  if (leftPicture) {
    const leftImg = leftPicture.querySelector('img');
    const optimizedLeftPic = createOptimizedPicture(leftImg.src, leftImageAltRow.textContent.trim(), false, [{ width: '750' }]);
    moveInstrumentation(leftImg, optimizedLeftPic.querySelector('img'));
    leftImageDiv.append(optimizedLeftPic);
  }

  // Main Container
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('makerightshift-container', 'makerightshift-read-more');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('text-center', 'pb-4', 'makerightshift-rs-heading');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  mainContainer.append(heading);

  // Subheading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('makerightshift-read-more-text');
  moveInstrumentation(subheadingRow, readMoreTextDiv);
  while (subheadingRow.firstChild) readMoreTextDiv.append(subheadingRow.firstChild);
  moveInstrumentation(descriptionRow, readMoreTextDiv);
  while (descriptionRow.firstChild) readMoreTextDiv.append(descriptionRow.firstChild);
  mainContainer.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('makerightshift-readMore');
  mainContainer.append(readMoreSpan);

  // Items Wrapper
  const itemsWrapper = document.createElement('div');
  itemsWrapper.classList.add('d-flex', 'justify-content-evenly', 'flex-wrap', 'makerightshift-why-shift-wrapper');

  itemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    moveInstrumentation(row, itemDiv);
    itemDiv.classList.add('mb-md-0', 'mb-3', 'text-center');

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('makerightshift-itc-health-goal-wrapper');

    let itemImage;
    let itemAltText;
    let itemLink;
    let itemLabel;

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        itemImage = cell.querySelector('picture');
      } else if (cell.querySelector('a')) {
        itemLink = cell.querySelector('a');
      } else if (cell.textContent.trim() !== '' && !itemAltText) {
        // Assuming the first text content after image is alt text
        itemAltText = cell.textContent.trim();
      } else if (cell.querySelector('p')) {
        itemLabel = cell.querySelector('p');
      }
    });

    if (itemImage) {
      const img = itemImage.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, itemAltText || img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageWrapper.append(optimizedPic);
    }
    itemDiv.append(imageWrapper);

    if (itemLink && itemLabel) {
      const linkElement = document.createElement('a');
      linkElement.href = itemLink.href;
      linkElement.alt = itemAltText || '';
      linkElement.classList.add('text-center', 'd-block', 'text-capitalize', 'pt-2', 'makerightshift-image-label');
      moveInstrumentation(itemLabel, linkElement);
      while (itemLabel.firstChild) linkElement.append(itemLabel.firstChild);
      itemDiv.append(linkElement);
    } else if (itemLabel) {
      const labelDiv = document.createElement('div');
      labelDiv.classList.add('text-center', 'd-block', 'text-capitalize', 'pt-2', 'makerightshift-image-label');
      moveInstrumentation(itemLabel, labelDiv);
      while (itemLabel.firstChild) labelDiv.append(itemLabel.firstChild);
      itemDiv.append(labelDiv);
    }

    itemsWrapper.append(itemDiv);
  });
  mainContainer.append(itemsWrapper);

  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('d-md-none', 'd-block');
  mainContainer.append(emptyDiv);

  // Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('makerightshift-button', 'makerightshift-how-shift-button');
  const buttonLink = document.createElement('a');
  buttonLink.classList.add('cmp-button');
  moveInstrumentation(buttonLinkRow, buttonLink);
  buttonLink.href = buttonLinkRow.querySelector('a').href;
  buttonLink.alt = buttonTextRow.textContent.trim();
  buttonLink.target = '_blank'; // Based on original HTML

  const buttonSpan = document.createElement('span');
  buttonSpan.classList.add('cmp-button__text');
  moveInstrumentation(buttonTextRow, buttonSpan);
  buttonSpan.textContent = buttonTextRow.textContent.trim();
  buttonLink.append(buttonSpan);

  const screenReaderSpan = document.createElement('span');
  screenReaderSpan.classList.add('cmp-link__screen-reader-only');
  screenReaderSpan.textContent = 'opens in a new tab';
  buttonLink.append(screenReaderSpan);

  buttonDiv.append(buttonLink);
  mainContainer.append(buttonDiv);

  block.textContent = '';
  block.append(leftImageDiv, mainContainer);
}
