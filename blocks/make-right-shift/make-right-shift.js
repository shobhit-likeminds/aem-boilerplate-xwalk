import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = 'make-right-shift'; // Define block name for consistent class prefixing

  const [
    bannerImageRow,
    headingRow,
    subheadingRow,
    descriptionRow,
    categoriesContainerRow, // This row is for the 'Categories' container field, which is type=container
    buttonLinkRow,
    buttonLabelRow,
    ...categoryItemRows
  ] = [...block.children];

  // Create the main section container
  const section = document.createElement('section');
  section.classList.add(`${blockName}-itc-how-shift`);

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add(`${blockName}-left-image-div`);
  leftImageDiv.id = 'leftDivId';
  moveInstrumentation(bannerImageRow, leftImageDiv);
  const bannerPicture = bannerImageRow.querySelector('picture');
  if (bannerPicture) {
    leftImageDiv.append(bannerPicture);
  }
  section.append(leftImageDiv);

  // Main content container
  const container = document.createElement('div');
  container.classList.add(`${blockName}-container`, 'read-more');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add(`${blockName}-text-center`, `${blockName}-pb-4`, `${blockName}-rs-heading`);
  moveInstrumentation(headingRow, heading);
  while (headingRow.firstChild) heading.append(headingRow.firstChild);
  container.append(heading);

  // Read More Text (Subheading and Description)
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add(`${blockName}-read-more-text`);

  const subheading = document.createElement('h2`);
  moveInstrumentation(subheadingRow, subheading);
  while (subheadingRow.firstChild) subheading.append(subheadingRow.firstChild);
  readMoreTextDiv.append(subheading);

  const description = document.createElement('p');
  moveInstrumentation(descriptionRow, description);
  while (descriptionRow.firstChild) description.append(descriptionRow.firstChild);
  readMoreTextDiv.append(description);

  container.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add(`${blockName}-readMore`);
  container.append(readMoreSpan);

  // Categories Wrapper
  const categoriesWrapper = document.createElement('div');
  categoriesWrapper.classList.add(
    `${blockName}-d-flex`,
    `${blockName}-justify-content-evenly`,
    `${blockName}-flex-wrap`,
    `${blockName}-why-shift-wrapper`,
  );
  // The categoriesContainerRow itself is just a placeholder, its content is not directly used,
  // but its instrumentation should be moved if it has any.
  moveInstrumentation(categoriesContainerRow, categoriesWrapper);

  categoryItemRows.forEach((row) => {
    // Each category item row has 3 cells: Image, Link, Label
    const [imageCell, linkCell, labelCell] = row.children;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add(`${blockName}-mb-md-0`, `${blockName}-mb-3`, `${blockName}-text-center`);
    moveInstrumentation(row, itemDiv);

    const itcHealthGoalWrapper = document.createElement('div');
    itcHealthGoalWrapper.classList.add(`${blockName}-itc-health-goal-wrapper`);
    itemDiv.append(itcHealthGoalWrapper);

    // Image
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        itcHealthGoalWrapper.append(picture);
      }
    }

    // Link and Label
    const linkEl = document.createElement('a');
    linkEl.classList.add(
      `${blockName}-text-center`,
      `${blockName}-d-block`,
      `${blockName}-text-capitalize`,
      `${blockName}-pt-2`,
      `${blockName}-image-label`,
    );

    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.alt = foundLink.alt || ''; // Ensure alt attribute is set
        moveInstrumentation(foundLink, linkEl);
        while (foundLink.firstChild) linkEl.append(foundLink.firstChild);
      } else {
        // If there's no <a> in the link cell, just take its content
        moveInstrumentation(linkCell, linkEl);
        while (linkCell.firstChild) linkEl.append(linkCell.firstChild);
      }
    }

    // If link text is still empty, try to get it from the label cell
    if (labelCell && !linkEl.textContent.trim()) {
      moveInstrumentation(labelCell, linkEl);
      while (labelCell.firstChild) linkEl.append(labelCell.firstChild);
    }

    itemDiv.append(linkEl);
    categoriesWrapper.append(itemDiv);
  });

  container.append(categoriesWrapper);

  const mobileSpacerDiv = document.createElement('div');
  mobileSpacerDiv.classList.add(`${blockName}-d-md-none`, `${blockName}-d-block`);
  container.append(mobileSpacerDiv);

  // Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add(`${blockName}-button`, `${blockName}-how-shift-button`);

  const buttonLink = document.createElement('a');
  buttonLink.classList.add(`${blockName}-cmp-button`);
  moveInstrumentation(buttonLinkRow, buttonLink); // Move instrumentation from buttonLinkRow

  const foundButtonLink = buttonLinkRow.querySelector('a');
  if (foundButtonLink) {
    buttonLink.href = foundButtonLink.href;
    buttonLink.target = foundButtonLink.target || '_self';
    buttonLink.alt = foundButtonLink.alt || '';
  } else {
    // If no <a>, just take the text content
    buttonLink.href = buttonLinkRow.textContent.trim();
  }

  const buttonSpanText = document.createElement('span');
  buttonSpanText.classList.add(`${blockName}-cmp-button__text`);
  moveInstrumentation(buttonLabelRow, buttonSpanText); // Move instrumentation from buttonLabelRow
  while (buttonLabelRow.firstChild) buttonSpanText.append(buttonLabelRow.firstChild);
  buttonLink.append(buttonSpanText);

  // Add screen reader span if target is _blank
  if (buttonLink.target === '_blank') {
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add(`${blockName}-cmp-link__screen-reader-only`);
    screenReaderSpan.textContent = 'opens in a new tab';
    buttonLink.append(screenReaderSpan);
  }

  buttonDiv.append(buttonLink);
  container.append(buttonDiv);
  section.append(container);

  // Image optimization
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(section);

  // INTERACTIVITY: Read More functionality
  const readMoreButton = block.querySelector(`.${blockName}-readMore`);
  const readMoreContent = block.querySelector(`.${blockName}-read-more-text`);
  if (readMoreButton && readMoreContent) {
    // Initial state: content might be collapsed by default CSS
    // Add a class to manage the state (e.g., 'expanded' or 'collapsed')
    readMoreContent.classList.add(`${blockName}-collapsed`);
    readMoreButton.textContent = 'Read More'; // Default text

    readMoreButton.addEventListener('click', () => {
      readMoreContent.classList.toggle(`${blockName}-collapsed`);
      readMoreContent.classList.toggle(`${blockName}-expanded`);
      if (readMoreContent.classList.contains(`${blockName}-expanded`)) {
        readMoreButton.textContent = 'Read Less';
      } else {
        readMoreButton.textContent = 'Read More';
      }
    });
  }
}
