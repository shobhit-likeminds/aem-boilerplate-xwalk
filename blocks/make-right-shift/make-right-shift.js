import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = 'make-right-shift';
  const [
    mainImageRow,
    headingRow,
    subheadingRow,
    descriptionRow,
    healthGoalsContainerRow, // This is the container row for health goals, not the goals themselves
    buttonLinkRow,
    buttonLabelRow,
    ...itemRows // These are the actual health goal item rows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add(`${blockName}-itc-how-shift`);

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add(`${blockName}-left-image-div`);
  leftImageDiv.id = 'leftDivId';

  const mainImagePicture = mainImageRow.querySelector('picture');
  if (mainImagePicture) {
    moveInstrumentation(mainImageRow.firstElementChild, leftImageDiv);
    leftImageDiv.append(mainImagePicture);
  }
  section.append(leftImageDiv);

  // Container Div
  const containerDiv = document.createElement('div');
  containerDiv.classList.add(`${blockName}-container`, `${blockName}-read-more`);

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add(`${blockName}-text-center`, `${blockName}-pb-4`, `${blockName}-rs-heading`);
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.append(...headingRow.firstElementChild.childNodes);
  containerDiv.append(heading);

  // Subheading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add(`${blockName}-read-more-text`);

  const subheadingEl = document.createElement('h2');
  moveInstrumentation(subheadingRow.firstElementChild, subheadingEl);
  subheadingEl.append(...subheadingRow.firstElementChild.childNodes);
  readMoreTextDiv.append(subheadingEl);

  const descriptionEl = document.createElement('div');
  moveInstrumentation(descriptionRow.firstElementChild, descriptionEl);
  descriptionEl.append(...descriptionRow.firstElementChild.childNodes);
  readMoreTextDiv.append(descriptionEl);

  containerDiv.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add(`${blockName}-readMore`);
  containerDiv.append(readMoreSpan);

  // Health Goals Wrapper
  const healthGoalsWrapper = document.createElement('div');
  healthGoalsWrapper.classList.add(
    `${blockName}-d-flex`,
    `${blockName}-justify-content-evenly`,
    `${blockName}-flex-wrap`,
    `${blockName}-why-shift-wrapper`,
  );

  itemRows.forEach((row) => {
    const healthGoalItem = document.createElement('div');
    healthGoalItem.classList.add(
      `${blockName}-mb-md-0`,
      `${blockName}-mb-3`,
      `${blockName}-text-center`,
    );
    moveInstrumentation(row, healthGoalItem);

    const healthGoalImageWrapper = document.createElement('div');
    healthGoalImageWrapper.classList.add(`${blockName}-itc-health-goal-wrapper`);

    // According to BlockJson, each item row has 3 cells: image, link, label
    const [imageCell, linkCell, labelCell] = [...row.children];

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        healthGoalImageWrapper.append(picture);
      }
    }
    healthGoalItem.append(healthGoalImageWrapper);

    const linkEl = document.createElement('a');
    linkEl.classList.add(
      `${blockName}-text-center`,
      `${blockName}-d-block`,
      `${blockName}-text-capitalize`,
      `${blockName}-pt-2`,
      `${blockName}-image-label`,
    );

    if (linkCell) {
      const originalLink = linkCell.querySelector('a');
      if (originalLink) {
        linkEl.href = originalLink.href;
        linkEl.alt = originalLink.alt;
        moveInstrumentation(originalLink, linkEl);
        while (originalLink.firstChild) linkEl.append(originalLink.firstChild);
      } else {
        // If the link cell contains text but not an <a>, use it as label
        moveInstrumentation(linkCell, linkEl);
        linkEl.textContent = linkCell.textContent.trim();
      }
    }

    if (labelCell) {
      if (!linkEl.textContent) { // Only append if linkEl doesn't already have content from linkCell
        moveInstrumentation(labelCell, linkEl);
        linkEl.textContent = labelCell.textContent.trim();
      }
    }
    healthGoalItem.append(linkEl);
    healthGoalsWrapper.append(healthGoalItem);
  });

  containerDiv.append(healthGoalsWrapper);

  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add(`${blockName}-d-md-none`, `${blockName}-d-block`);
  containerDiv.append(emptyDiv);

  // Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add(`${blockName}-button`, `${blockName}-how-shift-button`);

  const buttonLink = buttonLinkRow.querySelector('a');
  const buttonLabel = buttonLabelRow.firstElementChild;

  if (buttonLink && buttonLabel) {
    const newButtonLink = document.createElement('a');
    newButtonLink.classList.add(`${blockName}-cmp-button`);
    newButtonLink.href = buttonLink.href;
    newButtonLink.target = buttonLink.target;
    newButtonLink.alt = buttonLink.alt;
    moveInstrumentation(buttonLink, newButtonLink);

    const buttonSpan = document.createElement('span');
    buttonSpan.classList.add(`${blockName}-cmp-button__text`);
    buttonSpan.textContent = buttonLabel.textContent.trim();
    newButtonLink.append(buttonSpan);

    if (buttonLink.target === '_blank') {
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add(`${blockName}-cmp-link__screen-reader-only`);
      screenReaderSpan.textContent = 'opens in a new tab';
      newButtonLink.append(screenReaderSpan);
    }
    buttonDiv.append(newButtonLink);
  }
  containerDiv.append(buttonDiv);

  section.append(containerDiv);

  block.textContent = '';
  block.append(section);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Interactivity: Read More functionality
  const readMoreContainer = block.querySelector(`.${blockName}-read-more`);
  const readMoreText = readMoreContainer.querySelector(`.${blockName}-read-more-text`);
  const readMoreButton = readMoreContainer.querySelector(`.${blockName}-readMore`);

  if (readMoreText && readMoreButton) {
    const initialHeight = readMoreText.offsetHeight;
    if (initialHeight > 100) { // Arbitrary threshold to determine if content is truncated
      readMoreContainer.classList.add(`${blockName}-truncated`);
      readMoreButton.textContent = 'Read More';
    } else {
      readMoreButton.style.display = 'none'; // Hide button if content is short
    }

    readMoreButton.addEventListener('click', () => {
      readMoreContainer.classList.toggle(`${blockName}-expanded`);
      if (readMoreContainer.classList.contains(`${blockName}-expanded`)) {
        readMoreButton.textContent = 'Read Less';
      } else {
        readMoreButton.textContent = 'Read More';
      }
    });
  }
}
