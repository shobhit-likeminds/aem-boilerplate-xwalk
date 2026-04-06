import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    leftImageRow,
    headingRow,
    subheadingRow,
    descriptionRow,
    buttonLinkRow,
    buttonLabelRow,
    ...whyShiftItemRows
  ] = [...block.children];

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('left-image-div');
  moveInstrumentation(leftImageRow, leftImageDiv);
  const leftImagePicture = leftImageRow.querySelector('picture');
  if (leftImagePicture) {
    leftImageDiv.append(leftImagePicture);
  }

  // Container Read More
  const containerReadMore = document.createElement('div');
  containerReadMore.classList.add('container', 'read-more');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('text-center', 'pb-4', 'rs-heading');
  moveInstrumentation(headingRow, heading);
  heading.innerHTML = headingRow.firstElementChild?.innerHTML || '';

  // Subheading and Description
  const readMoreText = document.createElement('div');
  readMoreText.classList.add('read-more-text');
  moveInstrumentation(subheadingRow, readMoreText);
  readMoreText.innerHTML = subheadingRow.firstElementChild?.innerHTML || '';
  moveInstrumentation(descriptionRow, readMoreText);
  readMoreText.innerHTML += descriptionRow.firstElementChild?.innerHTML || '';

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('readMore');

  // Why Shift Items Wrapper
  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('d-flex', 'justify-content-evenly', 'flex-wrap', 'why-shift-wrapper');

  whyShiftItemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('mb-md-0', 'mb-3', 'text-center');
    moveInstrumentation(row, itemDiv);

    const itcHealthGoalWrapper = document.createElement('div');
    itcHealthGoalWrapper.classList.add('itc-health-goal-wrapper');

    let imageEl;
    let linkEl;
    let labelEl;

    [...row.children].forEach((cell) => {
      const picture = cell.querySelector('picture');
      const link = cell.querySelector('a');
      const paragraph = cell.querySelector('p');

      if (picture) {
        imageEl = picture;
      } else if (link) {
        linkEl = link;
      } else if (paragraph) {
        labelEl = paragraph;
      }
    });

    if (imageEl) {
      itcHealthGoalWrapper.append(imageEl);
    }
    itemDiv.append(itcHealthGoalWrapper);

    if (linkEl) {
      const anchor = document.createElement('a');
      anchor.classList.add('text-center', 'd-block', 'text-capitalize', 'pt-2', 'image-label');
      anchor.href = linkEl.href;
      anchor.alt = linkEl.textContent;
      if (labelEl) {
        anchor.innerHTML = labelEl.innerHTML;
      } else {
        anchor.textContent = linkEl.textContent;
      }
      itemDiv.append(anchor);
    } else if (labelEl) {
      const span = document.createElement('span');
      span.classList.add('text-center', 'd-block', 'text-capitalize', 'pt-2', 'image-label');
      span.innerHTML = labelEl.innerHTML;
      itemDiv.append(span);
    }

    whyShiftWrapper.append(itemDiv);
  });

  const dMdNoneDiv = document.createElement('div');
  dMdNoneDiv.classList.add('d-md-none', 'd-block');

  // Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button', 'how-shift-button');
  moveInstrumentation(buttonLinkRow, buttonDiv);

  const buttonAnchor = document.createElement('a');
  buttonAnchor.classList.add('cmp-button');
  const foundLink = buttonLinkRow.querySelector('a');
  if (foundLink) {
    buttonAnchor.href = foundLink.href;
    buttonAnchor.alt = foundLink.textContent;
  }
  buttonAnchor.target = '_blank'; // Assuming target blank from original HTML

  const buttonSpanText = document.createElement('span');
  buttonSpanText.classList.add('cmp-button__text');
  moveInstrumentation(buttonLabelRow, buttonSpanText);
  buttonSpanText.innerHTML = buttonLabelRow.firstElementChild?.innerHTML || '';

  const screenReaderSpan = document.createElement('span');
  screenReaderSpan.classList.add('cmp-link__screen-reader-only');
  screenReaderSpan.textContent = 'opens in a new tab';

  buttonAnchor.append(buttonSpanText, screenReaderSpan);
  buttonDiv.append(buttonAnchor);

  containerReadMore.append(
    heading,
    readMoreText,
    readMoreSpan,
    whyShiftWrapper,
    dMdNoneDiv,
    buttonDiv,
  );

  block.textContent = '';
  block.append(leftImageDiv, containerReadMore);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
