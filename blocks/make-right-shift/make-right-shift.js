import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    mainImageRow,
    headingRow,
    subheadingRow,
    descriptionRow,
    ctaLinkRow,
    ...itemRows
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('aem-GridColumn', 'aem-GridColumn--default--12');

  const healthgoalBanner = document.createElement('div');
  healthgoalBanner.classList.add('healthgoal', 'banner', 'aem-GridColumn', 'aem-GridColumn--default--12');
  block.append(healthgoalBanner);

  const section = document.createElement('section');
  section.classList.add('itc-how-shift');
  healthgoalBanner.append(section);

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('left-image-div');
  moveInstrumentation(mainImageRow, leftImageDiv);
  const mainImagePicture = mainImageRow.querySelector('picture');
  if (mainImagePicture) {
    const img = mainImagePicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    leftImageDiv.append(optimizedPic);
  }
  section.append(leftImageDiv);

  // Container Read More
  const containerReadMore = document.createElement('div');
  containerReadMore.classList.add('container', 'read-more');
  section.append(containerReadMore);

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('text-center', 'pb-4', 'rs-heading');
  moveInstrumentation(headingRow, heading);
  heading.append(headingRow.firstElementChild);
  containerReadMore.append(heading);

  // Subheading and Description
  const readMoreText = document.createElement('div');
  readMoreText.classList.add('read-more-text');
  moveInstrumentation(subheadingRow, readMoreText);
  while (subheadingRow.firstChild) readMoreText.append(subheadingRow.firstChild);
  moveInstrumentation(descriptionRow, readMoreText);
  while (descriptionRow.firstChild) readMoreText.append(descriptionRow.firstChild);
  containerReadMore.append(readMoreText);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('readMore');
  readMoreSpan.textContent = 'Read More'; // Initial text
  containerReadMore.append(readMoreSpan);

  // Add event listener for readMoreSpan
  readMoreSpan.addEventListener('click', () => {
    readMoreText.classList.toggle('expanded'); // Toggle a class to show/hide content
    if (readMoreText.classList.contains('expanded')) {
      readMoreSpan.textContent = 'Read Less';
    } else {
      readMoreSpan.textContent = 'Read More';
    }
  });

  // Why Shift Items
  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('d-flex', 'justify-content-evenly', 'flex-wrap', 'why-shift-wrapper');
  containerReadMore.append(whyShiftWrapper);

  itemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('mb-md-0', 'mb-3', 'text-center');
    moveInstrumentation(row, itemDiv);

    const itcHealthGoalWrapper = document.createElement('div');
    itcHealthGoalWrapper.classList.add('itc-health-goal-wrapper');
    itemDiv.append(itcHealthGoalWrapper);

    let itemImageCell;
    let itemLinkCell;

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        itemImageCell = cell;
      } else if (cell.querySelector('a')) {
        itemLinkCell = cell;
      }
    });

    if (itemImageCell) {
      const picture = itemImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        itcHealthGoalWrapper.append(optimizedPic);
      }
    }

    if (itemLinkCell) {
      const foundLink = itemLinkCell.querySelector('a');
      const link = document.createElement('a');
      link.classList.add('text-center', 'd-block', 'text-capitalize', 'pt-2', 'image-label');
      if (foundLink) {
        link.href = foundLink.href;
        link.alt = foundLink.textContent; // Assuming alt from link text
        moveInstrumentation(foundLink, link);
        link.append(foundLink.textContent);
      }
      itemDiv.append(link);
    }

    whyShiftWrapper.append(itemDiv);
  });

  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('d-md-none', 'd-block');
  containerReadMore.append(emptyDiv);

  // CTA Link
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button', 'how-shift-button');
  containerReadMore.append(buttonDiv);

  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('cmp-button');
    ctaLink.href = foundCtaLink.href;
    ctaLink.alt = foundCtaLink.textContent;
    moveInstrumentation(foundCtaLink, ctaLink);

    const spanText = document.createElement('span');
    spanText.classList.add('cmp-button__text');
    spanText.textContent = foundCtaLink.textContent;
    ctaLink.append(spanText);

    // Assuming target="_blank" and screen reader text from original HTML
    if (foundCtaLink.getAttribute('target') === '_blank') {
      ctaLink.setAttribute('target', '_blank');
      const srOnlySpan = document.createElement('span');
      srOnlySpan.classList.add('cmp-link__screen-reader-only');
      srOnlySpan.textContent = 'opens in a new tab';
      ctaLink.append(srOnlySpan);
    }
    buttonDiv.append(ctaLink);
  }
}
