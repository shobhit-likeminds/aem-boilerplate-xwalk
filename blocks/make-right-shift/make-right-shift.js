import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    mainImageRow,
    headingRow,
    subheadingRow,
    descriptionRow,
    itemsRowPlaceholder, // This row is just a placeholder for the container, its content is not used
    buttonLinkRow,
    buttonLabelRow,
    ...itemRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('makeRightShift-itc-how-shift');

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('makeRightShift-left-image-div');
  leftImageDiv.id = 'leftDivId';
  moveInstrumentation(mainImageRow, leftImageDiv);
  const mainImagePicture = mainImageRow.querySelector('picture');
  if (mainImagePicture) {
    const mainImg = mainImagePicture.querySelector('img');
    const optimizedMainPic = createOptimizedPicture(mainImg.src, mainImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(mainImg, optimizedMainPic.querySelector('img'));
    leftImageDiv.append(optimizedMainPic);
  }
  section.append(leftImageDiv);

  // Main Content Container
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('makeRightShift-container', 'read-more');

  // Heading
  const headingH1 = document.createElement('h1');
  headingH1.classList.add('makeRightShift-text-center', 'makeRightShift-pb-4', 'makeRightShift-rs-heading');
  moveInstrumentation(headingRow, headingH1);
  headingH1.append(...headingRow.children);
  containerDiv.append(headingH1);

  // Subheading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('makeRightShift-read-more-text');
  moveInstrumentation(subheadingRow, readMoreTextDiv);
  const subheadingH2 = document.createElement('h2');
  subheadingH2.style.textAlign = 'center';
  subheadingH2.append(...subheadingRow.children);
  readMoreTextDiv.append(subheadingH2);

  moveInstrumentation(descriptionRow, readMoreTextDiv);
  const descriptionP = document.createElement('p');
  descriptionP.style.textAlign = 'center';
  descriptionP.append(...descriptionRow.children);
  readMoreTextDiv.append(descriptionP);
  containerDiv.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('makeRightShift-readMore');
  containerDiv.append(readMoreSpan);

  // Items Wrapper
  const itemsWrapper = document.createElement('div');
  itemsWrapper.classList.add('makeRightShift-d-flex', 'makeRightShift-justify-content-evenly', 'makeRightShift-flex-wrap', 'makeRightShift-why-shift-wrapper');

  itemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('makeRightShift-mb-md-0', 'makeRightShift-mb-3', 'makeRightShift-text-center');
    moveInstrumentation(row, itemDiv);

    const [itemImageCell, itemLinkCell, itemLabelCell] = row.children;

    const itemImageWrapper = document.createElement('div');
    itemImageWrapper.classList.add('makeRightShift-itc-health-goal-wrapper');

    if (itemImageCell) {
      const itemPicture = itemImageCell.querySelector('picture');
      if (itemPicture) {
        const itemImg = itemPicture.querySelector('img');
        const optimizedItemPic = createOptimizedPicture(itemImg.src, itemImg.alt, false, [{ width: '750' }]);
        moveInstrumentation(itemImg, optimizedItemPic.querySelector('img'));
        itemImageWrapper.append(optimizedItemPic);
      }
    }
    itemDiv.append(itemImageWrapper);

    const itemLink = document.createElement('a');
    itemLink.classList.add('makeRightShift-text-center', 'makeRightShift-d-block', 'makeRightShift-text-capitalize', 'makeRightShift-pt-2', 'makeRightShift-image-label');

    if (itemLinkCell) {
      const foundLink = itemLinkCell.querySelector('a');
      if (foundLink) {
        itemLink.href = foundLink.href;
        itemLink.alt = foundLink.alt;
        while (foundLink.firstChild) itemLink.append(foundLink.firstChild);
        moveInstrumentation(itemLinkCell, itemLink);
      } else {
        // If the cell contains text for a link but not an <a> tag, use it as href
        itemLink.href = itemLinkCell.textContent.trim();
        if (itemLabelCell) {
          itemLink.textContent = itemLabelCell.textContent.trim();
        }
      }
    } else if (itemLabelCell) {
      itemLink.textContent = itemLabelCell.textContent.trim();
    }

    itemDiv.append(itemLink);
    itemsWrapper.append(itemDiv);
  });

  containerDiv.append(itemsWrapper);

  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('makeRightShift-d-md-none', 'makeRightShift-d-block');
  containerDiv.append(emptyDiv);

  // Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('makeRightShift-button', 'makeRightShift-how-shift-button');

  const buttonAnchor = document.createElement('a');
  buttonAnchor.classList.add('makeRightShift-cmp-button');
  moveInstrumentation(buttonLinkRow, buttonAnchor);
  const foundButtonLink = buttonLinkRow.querySelector('a');
  if (foundButtonLink) {
    buttonAnchor.href = foundButtonLink.href;
    buttonAnchor.alt = foundButtonLink.alt;
    buttonAnchor.target = foundButtonLink.target || '_self'; // Default target
  } else {
    buttonAnchor.href = buttonLinkRow.textContent.trim();
  }

  const buttonSpanText = document.createElement('span');
  buttonSpanText.classList.add('makeRightShift-cmp-button__text');
  moveInstrumentation(buttonLabelRow, buttonSpanText);
  buttonSpanText.append(...buttonLabelRow.children);
  buttonAnchor.append(buttonSpanText);

  if (buttonAnchor.target === '_blank') {
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('makeRightShift-cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    buttonAnchor.append(screenReaderSpan);
  }

  buttonDiv.append(buttonAnchor);
  containerDiv.append(buttonDiv);

  section.append(containerDiv);

  block.textContent = '';
  block.append(section);

  // Image optimization for all images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Interactivity: "Read More" functionality
  const readMoreToggle = containerDiv.querySelector('.makeRightShift-readMore');
  if (readMoreToggle) {
    readMoreToggle.addEventListener('click', () => {
      containerDiv.classList.toggle('expanded');
      if (containerDiv.classList.contains('expanded')) {
        readMoreToggle.textContent = 'Read Less';
      } else {
        readMoreToggle.textContent = 'Read More';
      }
    });
    // Set initial text based on content state (if it's initially collapsed)
    // Assuming it starts collapsed, or you can add logic to check content height
    readMoreToggle.textContent = 'Read More';
  }
}
