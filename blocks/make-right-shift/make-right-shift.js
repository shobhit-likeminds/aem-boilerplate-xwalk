import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blockName = 'make-right-shift';

  // Destructure root rows based on BlockJson model
  const [
    bannerImageRow,
    headingRow,
    subheadingRow,
    descriptionRow,
    whyShiftItemsContainerRow, // This row contains the "Why Shift Items" container text
    ctaLinkRow,
    ctaLabelRow,
    ...whyShiftItemRows // Remaining rows are the actual 'whyShiftItem' items
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add(`${blockName}-itc-how-shift`);

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add(`${blockName}-left-image-div`);
  leftImageDiv.id = 'leftDivId';

  const bannerImagePicture = bannerImageRow.querySelector('picture');
  if (bannerImagePicture) {
    const img = bannerImagePicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      leftImageDiv.append(optimizedPic);
    }
  }
  moveInstrumentation(bannerImageRow, leftImageDiv);

  // Right Content Container
  const rightContentContainer = document.createElement('div');
  rightContentContainer.classList.add(`${blockName}-container`, `${blockName}-read-more`);

  // Heading
  const headingEl = document.createElement('h1');
  headingEl.classList.add(`${blockName}-text-center`, `${blockName}-pb-4`, `${blockName}-rs-heading`);
  moveInstrumentation(headingRow.firstElementChild, headingEl);
  headingEl.append(...headingRow.firstElementChild.childNodes);

  // Subheading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add(`${blockName}-read-more-text`);

  const subheadingEl = document.createElement('h2');
  moveInstrumentation(subheadingRow.firstElementChild, subheadingEl);
  subheadingEl.append(...subheadingRow.firstElementChild.childNodes);

  const descriptionEl = document.createElement('p');
  moveInstrumentation(descriptionRow.firstElementChild, descriptionEl);
  descriptionEl.append(...descriptionRow.firstElementChild.childNodes);

  readMoreTextDiv.append(subheadingEl, descriptionEl);

  // Read More Span (interactive element)
  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add(`${blockName}-readMore`);
  readMoreSpan.textContent = 'Read More'; // Default text, can be customized
  readMoreSpan.addEventListener('click', () => {
    rightContentContainer.classList.toggle(`${blockName}-read-more-expanded`);
    if (rightContentContainer.classList.contains(`${blockName}-read-more-expanded`)) {
      readMoreSpan.textContent = 'Read Less';
    } else {
      readMoreSpan.textContent = 'Read More';
    }
  });

  // Why Shift Items Wrapper
  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add(
    `${blockName}-d-flex`,
    `${blockName}-justify-content-evenly`,
    `${blockName}-flex-wrap`,
    `${blockName}-why-shift-wrapper`,
  );

  whyShiftItemRows.forEach((row) => {
    // Each item row has 3 cells: Image, Link, Label
    const [imageCell, linkCell, labelCell] = [...row.children];

    const itemDiv = document.createElement('div');
    moveInstrumentation(row, itemDiv);
    itemDiv.classList.add(`${blockName}-mb-md-0`, `${blockName}-mb-3`, `${blockName}-text-center`);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add(`${blockName}-itc-health-goal-wrapper`);

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          imageWrapper.append(optimizedPic);
        }
      }
    }

    const linkEl = document.createElement('a');
    linkEl.classList.add(
      `${blockName}-text-center`,
      `${blockName}-d-block`,
      `${blockName}-text-capitalize`,
      `${blockName}-pt-2`,
      `${blockName}-image-label`,
    );

    let linkTextContent = '';
    if (labelCell && labelCell.textContent.trim()) {
      linkTextContent = labelCell.textContent.trim();
      moveInstrumentation(labelCell, linkEl);
    }

    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.alt = foundLink.alt || '';
        if (!linkTextContent) { // If label cell didn't provide text, use link text
          linkTextContent = foundLink.textContent.trim();
        }
        moveInstrumentation(foundLink, linkEl);
      } else if (linkCell.textContent.trim()) {
        // If link cell contains text but no <a>, assume it's a URL and use its text as label
        linkEl.href = linkCell.textContent.trim();
        if (!linkTextContent) {
          linkTextContent = linkCell.textContent.trim();
        }
        moveInstrumentation(linkCell, linkEl);
      }
    }
    linkEl.textContent = linkTextContent;

    itemDiv.append(imageWrapper, linkEl);
    whyShiftWrapper.append(itemDiv);
  });

  // CTA Button
  const ctaButtonDiv = document.createElement('div');
  ctaButtonDiv.classList.add(`${blockName}-button`, `${blockName}-how-shift-button`);

  const ctaLinkEl = document.createElement('a');
  ctaLinkEl.classList.add(`${blockName}-cmp-button`);

  const ctaLinkContent = ctaLinkRow.querySelector('div');
  const ctaLabelContent = ctaLabelRow.querySelector('div');

  if (ctaLinkContent && ctaLinkContent.querySelector('a')) {
    const foundLink = ctaLinkContent.querySelector('a');
    ctaLinkEl.href = foundLink.href;
    ctaLinkEl.alt = foundLink.alt || '';
    if (foundLink.target) ctaLinkEl.target = foundLink.target;
    if (foundLink.id) ctaLinkEl.id = foundLink.id;
    moveInstrumentation(foundLink, ctaLinkEl);
  } else if (ctaLinkContent && ctaLinkContent.textContent.trim()) {
    // If it's just text, assume it's a URL
    ctaLinkEl.href = ctaLinkContent.textContent.trim();
    moveInstrumentation(ctaLinkContent, ctaLinkEl);
  }

  const ctaSpanText = document.createElement('span');
  ctaSpanText.classList.add(`${blockName}-cmp-button__text`);
  if (ctaLabelContent && ctaLabelContent.textContent.trim()) {
    moveInstrumentation(ctaLabelContent, ctaSpanText);
    ctaSpanText.textContent = ctaLabelContent.textContent.trim();
  } else {
    ctaSpanText.textContent = 'View All'; // Default label if not provided
  }
  ctaLinkEl.append(ctaSpanText);

  const ctaSpanScreenReader = document.createElement('span');
  ctaSpanScreenReader.classList.add(`${blockName}-cmp-link__screen-reader-only`);
  ctaSpanScreenReader.textContent = 'opens in a new tab';
  if (ctaLinkEl.target === '_blank') {
    ctaLinkEl.append(ctaSpanScreenReader);
  }

  ctaButtonDiv.append(ctaLinkEl);

  rightContentContainer.append(
    headingEl,
    readMoreTextDiv,
    readMoreSpan, // Append the interactive span
    whyShiftWrapper,
    document.createElement('div').classList.add(`${blockName}-d-md-none`, `${blockName}-d-block`),
    ctaButtonDiv,
  );

  section.append(leftImageDiv, rightContentContainer);

  block.textContent = '';
  block.append(section);

  // Image optimization for all images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
