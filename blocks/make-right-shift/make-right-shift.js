import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    leftImageRow,
    headingRow,
    subheadingRow,
    descriptionRow,
    viewAllLinkRow,
    ...whyShiftItemRows
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('aem-GridColumn', 'aem-GridColumn--default--12');

  const section = document.createElement('section');
  section.classList.add('itc-how-shift');

  // Left Image
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('left-image-div');
  moveInstrumentation(leftImageRow, leftImageDiv);
  const picture = leftImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      leftImageDiv.append(optimizedPic);
    }
  }
  section.append(leftImageDiv);

  const container = document.createElement('div');
  container.classList.add('container', 'read-more');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('text-center', 'pb-4', 'rs-heading');
  moveInstrumentation(headingRow, heading);
  heading.append(headingRow.firstElementChild);
  container.append(heading);

  // Subheading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('read-more-text');
  moveInstrumentation(subheadingRow, readMoreTextDiv);
  const subheading = document.createElement('h2');
  while (subheadingRow.firstElementChild) subheading.append(subheadingRow.firstElementChild);
  readMoreTextDiv.append(subheading);

  moveInstrumentation(descriptionRow, readMoreTextDiv);
  const description = document.createElement('p');
  while (descriptionRow.firstElementChild) description.append(descriptionRow.firstElementChild);
  readMoreTextDiv.append(description);
  container.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('readMore');
  container.append(readMoreSpan);

  // Why Shift Items
  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('d-flex', 'justify-content-evenly', 'flex-wrap', 'why-shift-wrapper');

  whyShiftItemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('mb-md-0', 'mb-3', 'text-center');
    moveInstrumentation(row, itemDiv);

    const itcHealthGoalWrapper = document.createElement('div');
    itcHealthGoalWrapper.classList.add('itc-health-goal-wrapper');

    let itemImage;
    let itemLink;

    // Content detection for item cells
    const cells = [...row.children];
    itemImage = cells.find(cell => cell.querySelector('picture'))?.querySelector('picture');
    itemLink = cells.find(cell => cell.querySelector('a'))?.querySelector('a');

    if (itemImage) {
      const img = itemImage.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        itcHealthGoalWrapper.append(optimizedPic);
      }
    }
    itemDiv.append(itcHealthGoalWrapper);

    if (itemLink) {
      const linkEl = document.createElement('a');
      linkEl.classList.add('text-center', 'd-block', 'text-capitalize', 'pt-2', 'image-label');
      linkEl.href = itemLink.href;
      linkEl.alt = itemLink.textContent;
      moveInstrumentation(itemLink, linkEl);
      while (itemLink.firstChild) linkEl.append(itemLink.firstChild);
      itemDiv.append(linkEl);
    }
    whyShiftWrapper.append(itemDiv);
  });
  container.append(whyShiftWrapper);

  const dMdNoneDiv = document.createElement('div');
  dMdNoneDiv.classList.add('d-md-none', 'd-block');
  container.append(dMdNoneDiv);

  // View All Link
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button', 'how-shift-button');
  moveInstrumentation(viewAllLinkRow, buttonDiv);

  const viewAllAnchor = viewAllLinkRow.querySelector('a');
  if (viewAllAnchor) {
    const cmpButton = document.createElement('a');
    cmpButton.classList.add('cmp-button');
    cmpButton.href = viewAllAnchor.href;
    cmpButton.alt = viewAllAnchor.textContent;
    cmpButton.target = '_blank'; // Original HTML has target="_blank"

    const spanText = document.createElement('span');
    spanText.classList.add('cmp-button__text');
    spanText.textContent = viewAllAnchor.textContent;
    cmpButton.append(spanText);

    const spanScreenReader = document.createElement('span');
    spanScreenReader.classList.add('cmp-link__screen-reader-only');
    spanScreenReader.textContent = 'opens in a new tab';
    cmpButton.append(spanScreenReader);

    buttonDiv.append(cmpButton);
  }
  container.append(buttonDiv);
  section.append(container);
  block.append(section);

  // Interactivity: Read More toggle
  const readMoreToggle = container.querySelector('.readMore');
  const readMoreContent = container.querySelector('.read-more-text');

  if (readMoreToggle && readMoreContent) {
    readMoreToggle.addEventListener('click', () => {
      readMoreContent.classList.toggle('expanded');
      readMoreToggle.classList.toggle('expanded');
    });
  }
}
