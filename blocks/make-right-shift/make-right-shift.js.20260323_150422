import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    bannerImageRow,
    headingRow,
    subheadingRow,
    goalsPlaceholderRow, // This row is for the 'goals' block field, but its content is the item rows that follow
    buttonLinkRow,
    buttonLabelRow,
    ...goalItemRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('make-right-shift-itc-how-shift');

  // Banner Image
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('make-right-shift-left-image-div');
  leftImageDiv.id = 'leftDivId';
  const bannerPicture = bannerImageRow.querySelector('picture');
  if (bannerPicture) {
    moveInstrumentation(bannerImageRow, leftImageDiv);
    leftImageDiv.append(bannerPicture);
  }
  section.append(leftImageDiv);

  const container = document.createElement('div');
  container.classList.add('make-right-shift-container', 'make-right-shift-read-more');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('make-right-shift-text-center', 'make-right-shift-pb-4', 'make-right-shift-rs-heading');
  moveInstrumentation(headingRow, heading);
  heading.append(...headingRow.children[0].childNodes);
  container.append(heading);

  // Subheading
  const subheadingDiv = document.createElement('div');
  subheadingDiv.classList.add('make-right-shift-read-more-text');
  moveInstrumentation(subheadingRow, subheadingDiv);
  // The subheadingRow.children[0] contains the actual content
  while (subheadingRow.children[0].firstChild) subheadingDiv.append(subheadingRow.children[0].firstChild);
  container.append(subheadingDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('make-right-shift-readMore');
  readMoreSpan.textContent = 'Read More'; // Add default text
  container.append(readMoreSpan);

  // Goals
  const goalsWrapper = document.createElement('div');
  goalsWrapper.classList.add('make-right-shift-d-flex', 'make-right-shift-justify-content-evenly', 'make-right-shift-flex-wrap', 'make-right-shift-why-shift-wrapper');

  goalItemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('make-right-shift-mb-md-0', 'make-right-shift-mb-3', 'make-right-shift-text-center');
    moveInstrumentation(row, itemDiv);

    const goalImageWrapper = document.createElement('div');
    goalImageWrapper.classList.add('make-right-shift-itc-health-goal-wrapper');

    // Each goal item row has 3 cells: Image, Link, Label
    const imageCell = row.children[0];
    const linkCell = row.children[1];
    const labelCell = row.children[2];

    const pictureEl = imageCell.querySelector('picture');
    if (pictureEl) {
      goalImageWrapper.append(pictureEl);
    }
    itemDiv.append(goalImageWrapper);

    const linkEl = document.createElement('a');
    linkEl.classList.add('make-right-shift-text-center', 'make-right-shift-d-block', 'make-right-shift-text-capitalize', 'make-right-shift-pt-2', 'make-right-shift-image-label');
    const anchorInLinkCell = linkCell.querySelector('a');
    if (anchorInLinkCell) {
      linkEl.href = anchorInLinkCell.href;
      linkEl.alt = anchorInLinkCell.textContent.trim();
    }
    if (labelCell) {
      linkEl.append(...labelCell.childNodes);
    }
    itemDiv.append(linkEl);
    goalsWrapper.append(itemDiv);
  });
  container.append(goalsWrapper);

  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('make-right-shift-d-md-none', 'make-right-shift-d-block');
  container.append(emptyDiv);

  // Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('make-right-shift-button', 'make-right-shift-how-shift-button');
  const buttonLink = document.createElement('a');
  buttonLink.classList.add('make-right-shift-cmp-button');
  const buttonLinkAnchor = buttonLinkRow.querySelector('a');
  if (buttonLinkAnchor) {
    buttonLink.href = buttonLinkAnchor.href;
    buttonLink.alt = buttonLinkAnchor.textContent.trim();
    buttonLink.target = '_blank';
  }
  moveInstrumentation(buttonLinkRow, buttonLink);

  const buttonSpan = document.createElement('span');
  buttonSpan.classList.add('make-right-shift-cmp-button__text');
  moveInstrumentation(buttonLabelRow, buttonSpan);
  buttonSpan.append(...buttonLabelRow.children[0].childNodes);
  buttonLink.append(buttonSpan);

  const screenReaderSpan = document.createElement('span');
  screenReaderSpan.classList.add('make-right-shift-cmp-link__screen-reader-only');
  screenReaderSpan.textContent = 'opens in a new tab';
  buttonLink.append(screenReaderSpan);

  buttonDiv.append(buttonLink);
  container.append(buttonDiv);

  section.append(container);

  block.textContent = '';
  block.append(section);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Interactivity for "Read More"
  const readMoreButton = block.querySelector('.make-right-shift-readMore');
  const readMoreText = block.querySelector('.make-right-shift-read-more-text');

  if (readMoreButton && readMoreText) {
    readMoreButton.addEventListener('click', () => {
      readMoreText.classList.toggle('make-right-shift-expanded');
      if (readMoreText.classList.contains('make-right-shift-expanded')) {
        readMoreButton.textContent = 'Read Less';
      } else {
        readMoreButton.textContent = 'Read More';
      }
    });
  }
}
