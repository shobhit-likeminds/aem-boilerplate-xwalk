import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [mainImageRow, headingRow, subheadingRow, descriptionRow, categoriesRow, buttonUrlRow, buttonLabelRow, ...categoryItemRows] = [...block.children];

  block.classList.add('makerightshift-itc-how-shift');

  // Main Image
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('makerightshift-left-image-div');
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

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('makerightshift-container', 'makerightshift-read-more');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('makerightshift-text-center', 'makerightshift-pb-4', 'makerightshift-rs-heading');
  moveInstrumentation(headingRow, heading);
  heading.append(...headingRow.querySelector('div').children);
  containerDiv.append(heading);

  // Subheading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('makerightshift-read-more-text');
  moveInstrumentation(subheadingRow, readMoreTextDiv);
  moveInstrumentation(descriptionRow, readMoreTextDiv);
  if (subheadingRow.querySelector('div')) {
    const h2 = document.createElement('h2');
    h2.style.textAlign = 'center';
    h2.append(...subheadingRow.querySelector('div').children);
    readMoreTextDiv.append(h2);
  }
  if (descriptionRow.querySelector('div')) {
    const p = document.createElement('p');
    p.style.textAlign = 'center';
    p.append(...descriptionRow.querySelector('div').children);
    readMoreTextDiv.append(p);
  }
  containerDiv.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('makerightshift-readMore');
  containerDiv.append(readMoreSpan);

  // Categories
  const categoriesWrapper = document.createElement('div');
  categoriesWrapper.classList.add('makerightshift-d-flex', 'makerightshift-justify-content-evenly', 'makerightshift-flex-wrap', 'makerightshift-why-shift-wrapper');
  moveInstrumentation(categoriesRow, categoriesWrapper);

  categoryItemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('makerightshift-mb-md-0', 'makerightshift-mb-3', 'makerightshift-text-center');
    moveInstrumentation(row, itemDiv);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('makerightshift-itc-health-goal-wrapper');
    const picture = row.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrapper.append(optimizedPic);
      }
    }
    itemDiv.append(imageWrapper);

    const linkEl = document.createElement('a');
    linkEl.classList.add('makerightshift-text-center', 'makerightshift-d-block', 'makerightshift-text-capitalize', 'makerightshift-pt-2', 'makerightshift-image-label');

    const foundLink = row.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.alt = foundLink.textContent;
    }

    const labelCell = row.querySelector('div:last-child'); // Assuming label is the last cell
    if (labelCell) {
      moveInstrumentation(labelCell, linkEl);
      while (labelCell.firstChild) linkEl.append(labelCell.firstChild);
    }
    itemDiv.append(linkEl);
    categoriesWrapper.append(itemDiv);
  });
  containerDiv.append(categoriesWrapper);

  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('makerightshift-d-md-none', 'makerightshift-d-block');
  containerDiv.append(emptyDiv);

  // Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('makerightshift-button', 'makerightshift-how-shift-button');

  const buttonLink = document.createElement('a');
  buttonLink.classList.add('makerightshift-cmp-button');
  moveInstrumentation(buttonUrlRow, buttonLink);
  moveInstrumentation(buttonLabelRow, buttonLink);

  const foundButtonUrl = buttonUrlRow.querySelector('picture') ? buttonUrlRow.querySelector('picture').nextElementSibling : null;
  if (foundButtonUrl && foundButtonUrl.tagName === 'A') {
    buttonLink.href = foundButtonUrl.href;
    buttonLink.alt = buttonLabelRow.textContent.trim();
  } else {
    // Fallback if buttonUrl is not a link wrapped in a cell next to picture
    const buttonUrlText = buttonUrlRow.querySelector('div').textContent.trim();
    if (buttonUrlText) {
      buttonLink.href = buttonUrlText;
      buttonLink.alt = buttonLabelRow.textContent.trim();
    }
  }

  const buttonSpan = document.createElement('span');
  buttonSpan.classList.add('makerightshift-cmp-button__text');
  buttonSpan.textContent = buttonLabelRow.textContent.trim();
  buttonLink.append(buttonSpan);

  const screenReaderSpan = document.createElement('span');
  screenReaderSpan.classList.add('makerightshift-cmp-link__screen-reader-only');
  screenReaderSpan.textContent = 'opens in a new tab';
  buttonLink.append(screenReaderSpan);

  buttonDiv.append(buttonLink);
  containerDiv.append(buttonDiv);

  block.textContent = '';
  block.append(containerDiv);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
