import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    mainImageRow,
    headingRow,
    subHeadingRow,
    descriptionRow,
    categoriesRow, // This row is empty according to BlockJson, but present in block.children
    ctaLinkRow,
    ctaLabelRow,
    ...categoryItemRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('makerightshift-makeRightShift-itc-how-shift');

  // Main Image
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('makerightshift-makeRightShift-left-image-div');
  leftImageDiv.id = 'leftDivId';
  const mainImageCell = mainImageRow.querySelector('div');
  if (mainImageCell) {
    const picture = mainImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        leftImageDiv.append(optimizedPic);
      }
    }
  }
  moveInstrumentation(mainImageRow, leftImageDiv);
  section.append(leftImageDiv);

  const container = document.createElement('div');
  container.classList.add('makerightshift-makeRightShift-container', 'makerightshift-read-more');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('makerightshift-text-center', 'makerightshift-pb-4', 'makerightshift-makeRightShift-rs-heading');
  moveInstrumentation(headingRow, heading);
  while (headingRow.firstChild) heading.append(headingRow.firstChild);
  container.append(heading);

  // Sub Heading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('makerightshift-read-more-text');
  moveInstrumentation(subHeadingRow, readMoreTextDiv);
  while (subHeadingRow.firstChild) readMoreTextDiv.append(subHeadingRow.firstChild);
  moveInstrumentation(descriptionRow, readMoreTextDiv);
  while (descriptionRow.firstChild) readMoreTextDiv.append(descriptionRow.firstChild);
  container.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('makerightshift-readMore');
  readMoreSpan.textContent = 'Read More'; // Add text for the span
  container.append(readMoreSpan);

  // Categories
  if (categoryItemRows.length > 0) {
    const categoriesWrapper = document.createElement('div');
    categoriesWrapper.classList.add('makerightshift-d-flex', 'makerightshift-justify-content-evenly', 'makerightshift-flex-wrap', 'makerightshift-makeRightShift-why-shift-wrapper');

    categoryItemRows.forEach((row) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('makerightshift-mb-md-0', 'makerightshift-mb-3', 'makerightshift-text-center');
      moveInstrumentation(row, itemDiv);

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('makerightshift-makeRightShift-itc-health-goal-wrapper');

      // According to BlockJson, category items have 3 cells: image, link, label
      const cells = [...row.children];
      const imageCell = cells[0]; // field="image"
      const linkCell = cells[1]; // field="link"
      const labelCell = cells[2]; // field="label"

      let imageEl = null;
      if (imageCell) {
        imageEl = imageCell.querySelector('picture');
      }

      let linkEl = null;
      if (linkCell) {
        linkEl = linkCell.querySelector('a');
      }

      if (imageEl) {
        const img = imageEl.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          imageWrapper.append(optimizedPic);
        }
      }
      itemDiv.append(imageWrapper);

      if (linkEl && labelCell) {
        const a = document.createElement('a');
        a.href = linkEl.href;
        a.alt = linkEl.alt || '';
        a.classList.add('makerightshift-text-center', 'makerightshift-d-block', 'makerightshift-text-capitalize', 'makerightshift-pt-2', 'makerightshift-makeRightShift-image-label');
        moveInstrumentation(labelCell, a);
        while (labelCell.firstChild) a.append(labelCell.firstChild);
        itemDiv.append(a);
      }
      categoriesWrapper.append(itemDiv);
    });
    container.append(categoriesWrapper);
  }

  const mobileSpacer = document.createElement('div');
  mobileSpacer.classList.add('makerightshift-d-md-none', 'makerightshift-d-block');
  container.append(mobileSpacer);

  // CTA Link and Label
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('makerightshift-makeRightShift-button', 'makerightshift-how-shift-button');

  const ctaLink = ctaLinkRow.querySelector('a');
  const ctaLabel = ctaLabelRow.querySelector('div');

  if (ctaLink && ctaLabel) {
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.alt = ctaLink.alt || '';
    a.classList.add('makerightshift-cmp-button');
    a.target = '_blank'; // Assuming from original HTML, if not specified, remove.

    const spanText = document.createElement('span');
    spanText.classList.add('makerightshift-cmp-button__text');
    moveInstrumentation(ctaLabel, spanText);
    while (ctaLabel.firstChild) spanText.append(ctaLabel.firstChild);
    a.append(spanText);

    const spanScreenReader = document.createElement('span');
    spanScreenReader.classList.add('makerightshift-cmp-link__screen-reader-only');
    spanScreenReader.textContent = 'opens in a new tab';
    a.append(spanScreenReader);

    buttonDiv.append(a);
  }
  moveInstrumentation(ctaLinkRow, buttonDiv);
  moveInstrumentation(ctaLabelRow, buttonDiv);
  container.append(buttonDiv);

  section.append(container);

  block.textContent = '';
  block.append(section);

  // Interactivity: Read More functionality
  readMoreSpan.addEventListener('click', () => {
    container.classList.toggle('makerightshift-expanded');
    if (container.classList.contains('makerightshift-expanded')) {
      readMoreSpan.textContent = 'Read Less';
    } else {
      readMoreSpan.textContent = 'Read More';
    }
  });
}
