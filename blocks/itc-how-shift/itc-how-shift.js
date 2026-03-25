import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    leftImageRow,
    headingRow,
    introTextRow,
    whyShiftItemsContainerRow, // This is the container row for "Why Shift Items"
    ctaLinkRow,
    ...whyShiftItemRows // These are the actual item rows
  ] = [...block.children];

  // Left Image
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('left-image-div');
  moveInstrumentation(leftImageRow, leftImageDiv);
  while (leftImageRow.firstChild) leftImageDiv.append(leftImageRow.firstChild);
  const leftImage = leftImageDiv.querySelector('picture > img');
  if (leftImage) {
    const optimizedPic = createOptimizedPicture(leftImage.src, leftImage.alt, false, [{ width: '750' }]);
    moveInstrumentation(leftImage, optimizedPic.querySelector('img'));
    leftImage.closest('picture').replaceWith(optimizedPic);
  }

  // Content container
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'read-more');

  // Heading
  const headingEl = document.createElement('h1');
  headingEl.classList.add('text-center', 'pb-4', 'rs-heading');
  moveInstrumentation(headingRow, headingEl);
  while (headingRow.firstChild) headingEl.append(headingRow.firstChild);
  containerDiv.append(headingEl);

  // Intro Text
  const introTextDiv = document.createElement('div');
  introTextDiv.classList.add('read-more-text');
  moveInstrumentation(introTextRow, introTextDiv);
  while (introTextRow.firstChild) introTextDiv.append(introTextRow.firstChild);
  containerDiv.append(introTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('readMore');
  containerDiv.append(readMoreSpan);

  // Interactivity: Toggle read-more-text visibility
  readMoreSpan.addEventListener('click', () => {
    introTextDiv.classList.toggle('read-more-text');
  });

  // Why Shift Items
  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('d-flex', 'justify-content-evenly', 'flex-wrap', 'why-shift-wrapper');
  moveInstrumentation(whyShiftItemsContainerRow, whyShiftWrapper); // Instrumentation for the container field

  whyShiftItemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('mb-md-0', 'mb-3', 'text-center');
    moveInstrumentation(row, itemDiv);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('itc-health-goal-wrapper');

    // Each item row has two cells: image and link
    const [imageCell, linkCell] = [...row.children];

    if (imageCell) {
      moveInstrumentation(imageCell, imageWrapper);
      while (imageCell.firstChild) imageWrapper.append(imageCell.firstChild);
      const img = imageWrapper.querySelector('picture > img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        img.closest('picture').replaceWith(optimizedPic);
      }
      itemDiv.append(imageWrapper);
    }

    if (linkCell) {
      const linkEl = document.createElement('a');
      linkEl.classList.add('text-center', 'd-block', 'text-capitalize', 'pt-2', 'image-label');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.alt = foundLink.alt || '';
        moveInstrumentation(linkCell, linkEl);
        while (linkCell.firstChild) linkEl.append(linkCell.firstChild);
      }
      itemDiv.append(linkEl);
    }
    whyShiftWrapper.append(itemDiv);
  });
  containerDiv.append(whyShiftWrapper);

  const dMdNoneDiv = document.createElement('div');
  dMdNoneDiv.classList.add('d-md-none', 'd-block');
  containerDiv.append(dMdNoneDiv);

  // CTA Link
  const ctaButtonDiv = document.createElement('div');
  ctaButtonDiv.classList.add('button', 'how-shift-button');
  moveInstrumentation(ctaLinkRow, ctaButtonDiv);
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    const ctaLink = document.createElement('a');
    ctaLink.classList.add('cmp-button');
    ctaLink.href = foundCtaLink.href;
    ctaLink.alt = foundCtaLink.alt || '';
    if (foundCtaLink.target) ctaLink.target = foundCtaLink.target;

    const spanText = document.createElement('span');
    spanText.classList.add('cmp-button__text');
    spanText.textContent = foundCtaLink.textContent;
    ctaLink.append(spanText);

    if (ctaLink.target === '_blank') {
      const screenReaderOnlySpan = document.createElement('span');
      screenReaderOnlySpan.classList.add('cmp-link__screen-reader-only');
      screenReaderOnlySpan.textContent = 'opens in a new tab';
      ctaLink.append(screenReaderOnlySpan);
    }
    ctaButtonDiv.append(ctaLink);
  }
  containerDiv.append(ctaButtonDiv);

  block.textContent = '';
  block.append(leftImageDiv, containerDiv);
}
