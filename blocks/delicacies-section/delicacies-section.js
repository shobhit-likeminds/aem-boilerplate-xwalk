import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('makerightshift-itc-how-shift');

  const leftDiv = document.createElement('div');
  leftDiv.classList.add('makerightshift-left-image-div');
  leftDiv.id = 'leftDivId';

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('makerightshift-container', 'makerightshift-read-more');

  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('makerightshift-d-flex', 'makerightshift-justify-content-evenly', 'makerightshift-flex-wrap', 'makerightshift-why-shift-wrapper');

  let mainImageCell;
  let headingCell;
  let subheadingCell;
  let descriptionCell;
  let buttonLinkCell;
  let buttonLabelCell;
  const delicacyItems = [];

  [...block.children].forEach((row, rowIndex) => {
    if (rowIndex === 0) {
      // First row contains main image, heading, subheading, description, button link, button label
      [...row.children].forEach((cell, cellIndex) => {
        if (cellIndex === 0) mainImageCell = cell;
        else if (cellIndex === 1) headingCell = cell;
        else if (cellIndex === 2) subheadingCell = cell;
        else if (cellIndex === 3) descriptionCell = cell;
        else if (cellIndex === 4) buttonLinkCell = cell;
        else if (cellIndex === 5) buttonLabelCell = cell;
      });
    } else {
      // Subsequent rows are delicacy items
      const item = {};
      [...row.children].forEach((cell, cellIndex) => {
        if (cellIndex === 0) item.image = cell.querySelector('picture') || cell.querySelector('img');
        else if (cellIndex === 1) item.alt = cell.textContent.trim();
        else if (cellIndex === 2) item.link = cell.querySelector('a');
        else if (cellIndex === 3) item.label = cell;
      });
      delicacyItems.push(item);
    }
    moveInstrumentation(row, rowIndex === 0 ? leftDiv : whyShiftWrapper); // Instrumentation for rows
  });

  // Main Image
  if (mainImageCell) {
    const mainPicture = mainImageCell.querySelector('picture');
    if (mainPicture) {
      leftDiv.append(mainPicture);
    } else {
      const mainImg = mainImageCell.querySelector('img');
      if (mainImg) {
        leftDiv.append(mainImg);
      }
    }
  }

  // Heading
  if (headingCell) {
    const h1 = document.createElement('h1');
    h1.classList.add('makerightshift-text-center', 'makerightshift-pb-4', 'makerightshift-rs-heading');
    moveInstrumentation(headingCell, h1);
    while (headingCell.firstChild) h1.append(headingCell.firstChild);
    containerDiv.append(h1);
  }

  // Read More Text (Subheading and Description)
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('makerightshift-read-more-text');
  if (subheadingCell) {
    const h2 = document.createElement('h2');
    h2.style.textAlign = 'center';
    moveInstrumentation(subheadingCell, h2);
    while (subheadingCell.firstChild) h2.append(subheadingCell.firstChild);
    readMoreTextDiv.append(h2);
  }
  if (descriptionCell) {
    const p = document.createElement('p');
    p.style.textAlign = 'center';
    moveInstrumentation(descriptionCell, p);
    while (descriptionCell.firstChild) p.append(descriptionCell.firstChild);
    readMoreTextDiv.append(p);
  }
  containerDiv.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('makerightshift-readMore');
  containerDiv.append(readMoreSpan);

  // Delicacy Items
  delicacyItems.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('makerightshift-mb-md-0', 'makerightshift-mb-3', 'makerightshift-text-center');

    const itcHealthGoalWrapper = document.createElement('div');
    itcHealthGoalWrapper.classList.add('makerightshift-itc-health-goal-wrapper');
    if (item.image) {
      itcHealthGoalWrapper.append(item.image);
    }
    itemDiv.append(itcHealthGoalWrapper);

    const linkEl = item.link || document.createElement('a');
    linkEl.classList.add('makerightshift-text-center', 'makerightshift-d-block', 'makerightshift-text-capitalize', 'makerightshift-pt-2', 'makerightshift-image-label');
    if (item.link) {
      // If link already exists, move its children
      moveInstrumentation(item.link, linkEl);
      while (item.link.firstChild) linkEl.append(item.link.firstChild);
    } else if (item.label) {
      // If no link, but label exists, append label content
      moveInstrumentation(item.label, linkEl);
      while (item.label.firstChild) linkEl.append(item.label.firstChild);
    }
    if (item.alt) linkEl.alt = item.alt;

    itemDiv.append(linkEl);
    whyShiftWrapper.append(itemDiv);
  });
  containerDiv.append(whyShiftWrapper);

  const dMdNoneDiv = document.createElement('div');
  dMdNoneDiv.classList.add('makerightshift-d-md-none', 'makerightshift-d-block');
  containerDiv.append(dMdNoneDiv);

  // Button
  if (buttonLinkCell && buttonLabelCell) {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('makerightshift-button', 'makerightshift-how-shift-button');

    const buttonLink = buttonLinkCell.querySelector('a') || document.createElement('a');
    buttonLink.classList.add('makerightshift-cmp-button');
    buttonLink.target = '_blank'; // Default target
    buttonLink.alt = buttonLabelCell.textContent.trim(); // Use label as alt

    // Move instrumentation and content from original link if it exists
    if (buttonLinkCell.querySelector('a')) {
      moveInstrumentation(buttonLinkCell.querySelector('a'), buttonLink);
      buttonLink.href = buttonLinkCell.querySelector('a').href;
    } else {
      buttonLink.href = buttonLinkCell.textContent.trim();
    }

    const spanText = document.createElement('span');
    spanText.classList.add('makerightshift-cmp-button__text');
    moveInstrumentation(buttonLabelCell, spanText);
    while (buttonLabelCell.firstChild) spanText.append(buttonLabelCell.firstChild);
    buttonLink.append(spanText);

    const spanSrOnly = document.createElement('span');
    spanSrOnly.classList.add('makerightshift-cmp-link__screen-reader-only');
    spanSrOnly.textContent = 'opens in a new tab';
    buttonLink.append(spanSrOnly);

    buttonDiv.append(buttonLink);
    containerDiv.append(buttonDiv);
  }

  block.textContent = '';
  block.append(leftDiv, containerDiv);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
