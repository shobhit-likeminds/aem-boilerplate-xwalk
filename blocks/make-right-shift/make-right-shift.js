import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [bannerImageRow, headingRow, subheadingRow, ctaLinkRow, ...itemRows] = [...block.children];

  block.textContent = '';
  block.classList.add('aem-GridColumn', 'aem-GridColumn--default--12');

  const healthgoalDiv = document.createElement('div');
  healthgoalDiv.classList.add('healthgoal', 'banner', 'aem-GridColumn', 'aem-GridColumn--default--12');
  block.append(healthgoalDiv);

  const section = document.createElement('section');
  section.classList.add('itc-how-shift');
  healthgoalDiv.append(section);

  // Banner Image
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('left-image-div');
  moveInstrumentation(bannerImageRow, leftImageDiv);
  const bannerPicture = bannerImageRow.querySelector('picture');
  if (bannerPicture) {
    const bannerImg = bannerPicture.querySelector('img');
    const optimizedBannerPic = createOptimizedPicture(bannerImg.src, bannerImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(bannerImg, optimizedBannerPic.querySelector('img'));
    leftImageDiv.append(optimizedBannerPic);
  }
  section.append(leftImageDiv);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'read-more');
  section.append(containerDiv);

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('text-center', 'pb-4', 'rs-heading');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.textContent.trim();
  containerDiv.append(heading);

  // Subheading
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('read-more-text');
  moveInstrumentation(subheadingRow, readMoreTextDiv);
  while (subheadingRow.firstChild) readMoreTextDiv.append(subheadingRow.firstChild);
  containerDiv.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('readMore');
  containerDiv.append(readMoreSpan);

  // Add event listener for readMoreSpan
  readMoreSpan.addEventListener('click', () => {
    readMoreTextDiv.classList.toggle('expanded'); // Toggle a class to show/hide content
    readMoreSpan.textContent = readMoreTextDiv.classList.contains('expanded') ? 'Read Less' : 'Read More';
  });

  // Why Shift Items
  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('d-flex', 'justify-content-evenly', 'flex-wrap', 'why-shift-wrapper');
  containerDiv.append(whyShiftWrapper);

  itemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('mb-md-0', 'mb-3', 'text-center');
    moveInstrumentation(row, itemDiv);

    const itcHealthGoalWrapper = document.createElement('div');
    itcHealthGoalWrapper.classList.add('itc-health-goal-wrapper');
    itemDiv.append(itcHealthGoalWrapper);

    let imageCell;
    let linkCell;

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        imageCell = cell;
      } else if (cell.querySelector('a')) {
        linkCell = cell;
      }
    });

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        itcHealthGoalWrapper.append(optimizedPic);
      }
    }

    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      const link = document.createElement('a');
      link.classList.add('text-center', 'd-block', 'text-capitalize', 'pt-2', 'image-label');
      if (foundLink) {
        link.href = foundLink.href;
        link.alt = foundLink.textContent; // Assuming alt text is the link text
        moveInstrumentation(foundLink, link);
        link.textContent = foundLink.textContent;
      }
      itemDiv.append(link);
    }

    whyShiftWrapper.append(itemDiv);
  });

  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('d-md-none', 'd-block');
  containerDiv.append(emptyDiv);

  // CTA Link
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button', 'how-shift-button');
  moveInstrumentation(ctaLinkRow, buttonDiv);
  const ctaLink = ctaLinkRow.querySelector('a');
  if (ctaLink) {
    const newCtaLink = document.createElement('a');
    newCtaLink.classList.add('cmp-button');
    newCtaLink.href = ctaLink.href;
    newCtaLink.alt = ctaLink.textContent;
    newCtaLink.target = '_blank'; // Assuming target blank from original HTML
    moveInstrumentation(ctaLink, newCtaLink);

    const spanText = document.createElement('span');
    spanText.classList.add('cmp-button__text');
    spanText.textContent = ctaLink.textContent;
    newCtaLink.append(spanText);

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    newCtaLink.append(screenReaderSpan);

    buttonDiv.append(newCtaLink);
  }
  containerDiv.append(buttonDiv);
}
