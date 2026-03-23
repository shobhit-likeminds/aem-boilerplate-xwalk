import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    bannerImageRow,
    headingRow,
    subheadingRow,
    descriptionRow,
    categoriesRow,
    ctaLinkRow,
    ctaLabelRow,
    ...categoryItemRows
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('makeRightShift', 'aem-GridColumn', 'aem-GridColumn--default--12');

  const healthGoalDiv = document.createElement('div');
  healthGoalDiv.classList.add('healthgoal', 'banner', 'aem-GridColumn', 'aem-GridColumn--default--12');
  block.append(healthGoalDiv);

  const section = document.createElement('section');
  section.classList.add('makeRightShift-itc-how-shift');
  healthGoalDiv.append(section);

  // Banner Image
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('makeRightShift-left-image-div');
  leftImageDiv.id = 'leftDivId';
  moveInstrumentation(bannerImageRow, leftImageDiv);
  const bannerPicture = bannerImageRow.querySelector('picture');
  if (bannerPicture) {
    const bannerImg = bannerPicture.querySelector('img');
    if (bannerImg) {
      const optimizedPic = createOptimizedPicture(bannerImg.src, bannerImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(bannerImg, optimizedPic.querySelector('img'));
      leftImageDiv.append(optimizedPic);
    }
  }
  section.append(leftImageDiv);

  const container = document.createElement('div');
  container.classList.add('makeRightShift-container', 'read-more');
  section.append(container);

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('makeRightShift-text-center', 'makeRightShift-pb-4', 'makeRightShift-rs-heading');
  moveInstrumentation(headingRow, heading);
  while (headingRow.firstChild) heading.append(headingRow.firstChild);
  container.append(heading);

  // Subheading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('makeRightShift-read-more-text');
  moveInstrumentation(subheadingRow, readMoreTextDiv);
  while (subheadingRow.firstChild) readMoreTextDiv.append(subheadingRow.firstChild);
  moveInstrumentation(descriptionRow, readMoreTextDiv);
  while (descriptionRow.firstChild) readMoreTextDiv.append(descriptionRow.firstChild);
  container.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('makeRightShift-readMore');
  readMoreSpan.textContent = 'Read More'; // Add default text
  container.append(readMoreSpan);

  // Read More functionality
  readMoreSpan.addEventListener('click', () => {
    container.classList.toggle('expanded');
    if (container.classList.contains('expanded')) {
      readMoreSpan.textContent = 'Read Less';
    } else {
      readMoreSpan.textContent = 'Read More';
    }
  });

  // Categories
  const categoriesWrapper = document.createElement('div');
  categoriesWrapper.classList.add('makeRightShift-d-flex', 'makeRightShift-justify-content-evenly', 'makeRightShift-flex-wrap', 'makeRightShift-why-shift-wrapper');
  moveInstrumentation(categoriesRow, categoriesWrapper);
  // Categories row content is just "Categories value", not needed visually, but instrumentation moved.

  categoryItemRows.forEach((row) => {
    // Each category item row has 3 cells: Image, Link, Label
    const [imageCell, linkCell, labelCell] = row.children;

    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('makeRightShift-mb-md-0', 'makeRightShift-mb-3', 'makeRightShift-text-center');
    moveInstrumentation(row, categoryDiv);

    const itcHealthGoalWrapper = document.createElement('div');
    itcHealthGoalWrapper.classList.add('makeRightShift-itc-health-goal-wrapper');
    categoryDiv.append(itcHealthGoalWrapper);

    // Image
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          itcHealthGoalWrapper.append(optimizedPic);
        }
      }
    }

    // Link and Label
    const linkEl = document.createElement('a');
    linkEl.classList.add('makeRightShift-text-center', 'makeRightShift-d-block', 'makeRightShift-text-capitalize', 'makeRightShift-pt-2', 'makeRightShift-image-label');

    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.alt = foundLink.alt; // Copy alt from original link if available
      }
    }
    if (labelCell) {
      moveInstrumentation(labelCell, linkEl);
      while (labelCell.firstChild) linkEl.append(labelCell.firstChild);
    }
    categoryDiv.append(linkEl);
    categoriesWrapper.append(categoryDiv);
  });
  container.append(categoriesWrapper);

  const dMdNoneDiv = document.createElement('div');
  dMdNoneDiv.classList.add('makeRightShift-d-md-none', 'makeRightShift-d-block');
  container.append(dMdNoneDiv);

  // CTA Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('makeRightShift-button', 'makeRightShift-how-shift-button');
  container.append(buttonDiv);

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('makeRightShift-cmp-button');
  moveInstrumentation(ctaLinkRow, ctaLink);
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
    ctaLink.alt = foundCtaLink.alt;
    if (foundCtaLink.target) ctaLink.target = foundCtaLink.target;
  }

  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add('makeRightShift-cmp-button__text');
  moveInstrumentation(ctaLabelRow, ctaSpan);
  while (ctaLabelRow.firstChild) ctaSpan.append(ctaLabelRow.firstChild);
  ctaLink.append(ctaSpan);

  if (ctaLink.target === '_blank') {
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('makeRightShift-cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    ctaLink.append(screenReaderSpan);
  }

  buttonDiv.append(ctaLink);
}
