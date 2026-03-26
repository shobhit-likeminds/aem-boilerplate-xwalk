import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    leftImageRow,
    headingRow,
    subheadingRow,
    whyShiftItemsContainerRow,
    buttonLinkRow,
    buttonTextRow,
    ...whyShiftItemRows
  ] = [...block.children];

  // Left Image
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('left-image-div');
  moveInstrumentation(leftImageRow, leftImageDiv);
  const leftPicture = leftImageRow.querySelector('picture');
  if (leftPicture) {
    leftImageDiv.append(leftPicture);
  }

  // Container for text and items
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'read-more');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('text-center', 'pb-4', 'rs-heading');
  moveInstrumentation(headingRow, heading);
  heading.append(headingRow.firstElementChild.textContent);

  // Subheading
  const subheadingDiv = document.createElement('div');
  subheadingDiv.classList.add('read-more-text');
  moveInstrumentation(subheadingRow, subheadingDiv);
  // Append all children of the subheadingRow's first element (the div containing the richtext)
  while (subheadingRow.firstElementChild.firstElementChild) {
    subheadingDiv.append(subheadingRow.firstElementChild.firstElementChild);
  }

  // Read More Span (for interactivity)
  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('readMore');
  containerDiv.append(readMoreSpan); // Append it before the whyShiftWrapper

  // Why Shift Items Wrapper
  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('d-flex', 'justify-content-evenly', 'flex-wrap', 'why-shift-wrapper');
  moveInstrumentation(whyShiftItemsContainerRow, whyShiftWrapper);

  whyShiftItemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('mb-md-0', 'mb-3', 'text-center');
    moveInstrumentation(row, itemDiv);

    const healthGoalWrapper = document.createElement('div');
    healthGoalWrapper.classList.add('itc-health-goal-wrapper');

    // Assuming first cell is image, second is link based on BlockJson
    const imageCell = row.children[0].querySelector('picture');
    const linkCell = row.children[1].querySelector('a');

    if (imageCell) {
      healthGoalWrapper.append(imageCell);
    }
    itemDiv.append(healthGoalWrapper);

    if (linkCell) {
      const link = document.createElement('a');
      link.classList.add('text-center', 'd-block', 'text-capitalize', 'pt-2', 'image-label');
      link.href = linkCell.href;
      link.alt = linkCell.textContent;
      link.innerHTML = linkCell.innerHTML; // Use innerHTML to preserve potential <br> tags
      itemDiv.append(link);
    }
    whyShiftWrapper.append(itemDiv);
  });

  // Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button', 'how-shift-button');
  moveInstrumentation(buttonLinkRow, buttonDiv);

  const buttonLink = document.createElement('a');
  buttonLink.classList.add('cmp-button');
  buttonLink.href = buttonLinkRow.querySelector('a')?.href || '#';
  buttonLink.alt = buttonTextRow.firstElementChild.textContent;

  const buttonSpanText = document.createElement('span');
  buttonSpanText.classList.add('cmp-button__text');
  buttonSpanText.textContent = buttonTextRow.firstElementChild.textContent;
  moveInstrumentation(buttonTextRow, buttonSpanText);

  buttonLink.append(buttonSpanText);
  buttonDiv.append(buttonLink);

  containerDiv.append(heading, subheadingDiv, whyShiftWrapper, buttonDiv);

  block.textContent = '';
  block.append(leftImageDiv, containerDiv);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Interactivity: "read-more" toggle
  const readMoreElement = block.querySelector('.readMore');
  if (readMoreElement) {
    readMoreElement.addEventListener('click', () => {
      containerDiv.classList.toggle('read-more');
    });
  }
}
