import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    bannerImageRow,
    headingRow,
    subHeadingRow,
    descriptionRow,
    categoriesRow, // This row is just a container label, its content is not used
    ctaLinkRow,
    ctaTextRow,
    ...itemRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('makeRightShift-itc-how-shift');

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('makeRightShift-left-image-div');
  leftImageDiv.id = 'leftDivId';
  moveInstrumentation(bannerImageRow, leftImageDiv);
  const bannerPicture = bannerImageRow.querySelector('picture');
  if (bannerPicture) {
    const bannerImg = bannerPicture.querySelector('img');
    const optimizedBannerPic = createOptimizedPicture(bannerImg.src, bannerImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(bannerImg, optimizedBannerPic.querySelector('img'));
    leftImageDiv.append(optimizedBannerPic);
  }
  section.append(leftImageDiv);

  // Container for text and categories
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('makeRightShift-container', 'makeRightShift-read-more');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('makeRightShift-text-center', 'makeRightShift-pb-4', 'makeRightShift-rs-heading');
  moveInstrumentation(headingRow, heading);
  heading.append(headingRow.firstElementChild.textContent);
  containerDiv.append(heading);

  // Sub Heading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('makeRightShift-read-more-text');

  const subHeading = document.createElement('h2');
  moveInstrumentation(subHeadingRow, subHeading);
  subHeading.append(subHeadingRow.firstElementChild.textContent);
  // Apply inline style from original HTML if present, though EDS typically avoids this
  // The original HTML has inline style, so we keep it for fidelity.
  subHeading.style.textAlign = 'center';
  readMoreTextDiv.append(subHeading);

  const descriptionP = document.createElement('p');
  moveInstrumentation(descriptionRow, descriptionP);
  while (descriptionRow.firstElementChild.firstChild) {
    descriptionP.append(descriptionRow.firstElementChild.firstChild);
  }
  // Apply inline style from original HTML if present, though EDS typically avoids this
  // The original HTML has inline style, so we keep it for fidelity.
  descriptionP.style.textAlign = 'center';
  readMoreTextDiv.append(descriptionP);
  containerDiv.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('makeRightShift-readMore');
  containerDiv.append(readMoreSpan);

  // Categories wrapper
  const categoriesWrapper = document.createElement('div');
  categoriesWrapper.classList.add('makeRightShift-d-flex', 'makeRightShift-justify-content-evenly', 'makeRightShift-flex-wrap', 'makeRightShift-why-shift-wrapper');

  itemRows.forEach((row) => {
    const categoryDiv = document.createElement('div');
    moveInstrumentation(row, categoryDiv);
    categoryDiv.classList.add('makeRightShift-mb-md-0', 'makeRightShift-mb-3', 'makeRightShift-text-center');

    const healthGoalWrapper = document.createElement('div');
    healthGoalWrapper.classList.add('makeRightShift-itc-health-goal-wrapper');

    // According to BlockJson, item rows have 3 cells: image, link, label
    const [imageCell, linkCell, labelCell] = [...row.children];

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        healthGoalWrapper.append(optimizedPic);
      }
    }
    categoryDiv.append(healthGoalWrapper);

    if (linkCell && labelCell) {
      const link = document.createElement('a');
      const foundLink = linkCell.querySelector('a'); // Check if the link cell itself contains an <a> tag
      if (foundLink) {
        link.href = foundLink.href;
        link.alt = foundLink.alt || '';
        // Copy data attributes if any, though EDS typically avoids Bootstrap data-attributes
        [...foundLink.attributes].forEach(attr => {
          if (attr.name.startsWith('data-')) {
            link.setAttribute(attr.name, attr.value);
          }
        });
      } else {
        // Fallback if no <a> in cell, use text content as href.
        // The original HTML shows the link text is the label, and the link itself is in the href.
        // The BlockJson indicates 'link' is aem-content, which implies it might contain the <a> tag directly.
        // The EDS structure shows "Link value" in the cell, which means the link text is in the cell, not an <a> tag.
        // Let's assume the 'link' cell contains the URL and the 'label' cell contains the display text.
        link.href = linkCell.textContent.trim();
      }
      link.classList.add('makeRightShift-text-center', 'makeRightShift-d-block', 'makeRightShift-text-capitalize', 'makeRightShift-pt-2', 'makeRightShift-image-label');
      moveInstrumentation(labelCell, link);
      // Append content from labelCell to the link
      while (labelCell.firstChild) link.append(labelCell.firstChild);
      categoryDiv.append(link);
    }
    categoriesWrapper.append(categoryDiv);
  });
  containerDiv.append(categoriesWrapper);

  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('makeRightShift-d-md-none', 'makeRightShift-d-block');
  containerDiv.append(emptyDiv);

  // CTA Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('makeRightShift-button', 'makeRightShift-how-shift-button');

  const ctaLinkEl = document.createElement('a');
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLinkEl.href = foundCtaLink.href;
    ctaLinkEl.alt = foundCtaLink.alt || '';
    if (foundCtaLink.target) ctaLinkEl.target = foundCtaLink.target;
    // Copy data attributes if any, though EDS typically avoids Bootstrap data-attributes
    [...foundCtaLink.attributes].forEach(attr => {
      if (attr.name.startsWith('data-')) {
        ctaLinkEl.setAttribute(attr.name, attr.value);
      }
    });
  } else {
    // Fallback for CTA Link
    ctaLinkEl.href = ctaLinkRow.firstElementChild.textContent.trim();
  }

  ctaLinkEl.classList.add('makeRightShift-cmp-button');
  moveInstrumentation(ctaTextRow, ctaLinkEl);

  const ctaSpanText = document.createElement('span');
  ctaSpanText.classList.add('makeRightShift-cmp-button__text');
  ctaSpanText.textContent = ctaTextRow.firstElementChild.textContent.trim();
  ctaLinkEl.append(ctaSpanText);

  if (ctaLinkEl.target === '_blank') {
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('makeRightShift-cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    ctaLinkEl.append(screenReaderSpan);
  }

  buttonDiv.append(ctaLinkEl);
  containerDiv.append(buttonDiv);

  section.append(containerDiv);
  block.textContent = '';
  block.append(section);

  // Interactivity: "Read More" functionality
  // The original HTML has a span with class "makeRightShift-readMore"
  // and a div with class "makeRightShift-read-more-text" that likely needs to be toggled.
  // The parent containerDiv also has "makeRightShift-read-more" class.
  const readMoreButton = block.querySelector('.makeRightShift-readMore');
  const readMoreContent = block.querySelector('.makeRightShift-read-more-text');
  const readMoreContainer = block.querySelector('.makeRightShift-container.makeRightShift-read-more');

  if (readMoreButton && readMoreContent && readMoreContainer) {
    // Initialize state: content is collapsed, button text is "Read More"
    readMoreContent.style.maxHeight = '150px'; // Or some initial collapsed height
    readMoreContent.style.overflow = 'hidden';
    readMoreContent.style.transition = 'max-height 0.3s ease-out';
    readMoreButton.textContent = 'Read More';
    readMoreContainer.classList.add('collapsed'); // Add a class to indicate collapsed state

    readMoreButton.addEventListener('click', () => {
      if (readMoreContainer.classList.contains('collapsed')) {
        // Expand content
        readMoreContent.style.maxHeight = `${readMoreContent.scrollHeight}px`;
        readMoreButton.textContent = 'Read Less';
        readMoreContainer.classList.remove('collapsed');
        readMoreContainer.classList.add('expanded');
      } else {
        // Collapse content
        readMoreContent.style.maxHeight = '150px'; // Collapse back to initial height
        readMoreButton.textContent = 'Read More';
        readMoreContainer.classList.remove('expanded');
        readMoreContainer.classList.add('collapsed');
      }
    });
  }
}
