import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    bannerImageRow,
    bannerAltRow,
    headingRow,
    subheadingRow,
    descriptionRow,
    categoriesRow, // This row itself is just a placeholder for the container, its content is not used directly
    ctaLinkRow,
    ctaLabelRow,
    ...categoryItemRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('make-right-shift-itc-how-shift');

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('make-right-shift-left-image-div');
  leftImageDiv.id = 'leftDivId';

  const bannerPicture = bannerImageRow.querySelector('picture');
  if (bannerPicture) {
    const bannerImg = bannerPicture.querySelector('img');
    if (bannerImg) {
      // bannerAltRow contains the alt text directly
      const altText = bannerAltRow.firstElementChild?.textContent.trim() || '';
      const optimizedPic = createOptimizedPicture(bannerImg.src, altText, false, [{ width: '750' }]);
      moveInstrumentation(bannerImg, optimizedPic.querySelector('img'));
      leftImageDiv.append(optimizedPic);
    }
  }
  moveInstrumentation(bannerImageRow, leftImageDiv);
  moveInstrumentation(bannerAltRow, leftImageDiv);
  section.append(leftImageDiv);

  // Right Content Container
  const container = document.createElement('div');
  container.classList.add('make-right-shift-container', 'make-right-shift-read-more');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('make-right-shift-text-center', 'make-right-shift-pb-4', 'make-right-shift-rs-heading');
  moveInstrumentation(headingRow, heading);
  while (headingRow.firstElementChild?.firstChild) heading.append(headingRow.firstElementChild.firstChild);
  container.append(heading);

  // Subheading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('make-right-shift-read-more-text');

  const subheading = document.createElement('h2');
  moveInstrumentation(subheadingRow, subheading);
  while (subheadingRow.firstElementChild?.firstChild) subheading.append(subheadingRow.firstElementChild.firstChild);
  readMoreTextDiv.append(subheading);

  moveInstrumentation(descriptionRow, readMoreTextDiv);
  while (descriptionRow.firstElementChild?.firstChild) readMoreTextDiv.append(descriptionRow.firstElementChild.firstChild);
  container.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('make-right-shift-readMore');
  container.append(readMoreSpan);

  // Categories Wrapper
  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('make-right-shift-d-flex', 'make-right-shift-justify-content-evenly', 'make-right-shift-flex-wrap', 'make-right-shift-why-shift-wrapper');
  moveInstrumentation(categoriesRow, whyShiftWrapper); // categoriesRow is the container placeholder

  categoryItemRows.forEach((row) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('make-right-shift-mb-md-0', 'make-right-shift-mb-3', 'make-right-shift-text-center');
    moveInstrumentation(row, categoryDiv);

    const healthGoalWrapper = document.createElement('div');
    healthGoalWrapper.classList.add('make-right-shift-itc-health-goal-wrapper');

    const cells = [...row.children];
    // Based on BlockJson model 'category': image, alt, link, label
    const imageCell = cells[0];
    const altTextCell = cells[1];
    const linkCell = cells[2];
    const labelCell = cells[3];

    const imageEl = imageCell?.querySelector('picture');
    const linkEl = linkCell?.querySelector('a');
    const labelEl = labelCell?.querySelector('p'); // Label is richtext, so it's inside a <p>

    if (imageEl) {
      const img = imageEl.querySelector('img');
      const alt = altTextCell?.textContent.trim() || (img ? img.alt : '');
      const optimizedPic = createOptimizedPicture(img.src, alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      healthGoalWrapper.append(optimizedPic);
    }
    categoryDiv.append(healthGoalWrapper);

    const anchor = document.createElement('a');
    anchor.classList.add('make-right-shift-text-center', 'make-right-shift-d-block', 'make-right-shift-text-capitalize', 'make-right-shift-pt-2', 'make-right-shift-image-label');
    if (linkEl) {
      anchor.href = linkEl.href;
      anchor.alt = linkEl.alt || '';
      moveInstrumentation(linkCell, anchor); // Instrument the cell, not the inner <a>
    }
    if (labelEl) {
      moveInstrumentation(labelCell, anchor); // Instrument the cell, not the inner <p>
      while (labelEl.firstChild) anchor.append(labelEl.firstChild);
    }
    categoryDiv.append(anchor);
    whyShiftWrapper.append(categoryDiv);
  });
  container.append(whyShiftWrapper);

  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('make-right-shift-d-md-none', 'make-right-shift-d-block');
  container.append(emptyDiv);

  // CTA Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('make-right-shift-button', 'make-right-shift-how-shift-button');

  const ctaAnchor = document.createElement('a');
  ctaAnchor.classList.add('make-right-shift-cmp-button');
  ctaAnchor.target = '_blank'; // Assuming target blank from original HTML
  ctaAnchor.id = 'button-e83cd77db8'; // Hardcoded ID from original HTML, if needed, otherwise remove

  const ctaLink = ctaLinkRow.querySelector('a');
  if (ctaLink) {
    ctaAnchor.href = ctaLink.href;
    ctaAnchor.alt = ctaLink.alt || '';
  }
  moveInstrumentation(ctaLinkRow, ctaAnchor);

  const ctaSpanText = document.createElement('span');
  ctaSpanText.classList.add('make-right-shift-cmp-button__text');
  moveInstrumentation(ctaLabelRow, ctaSpanText);
  while (ctaLabelRow.firstElementChild?.firstChild) ctaSpanText.append(ctaLabelRow.firstElementChild.firstChild);
  ctaAnchor.append(ctaSpanText);

  const ctaSpanScreenReader = document.createElement('span');
  ctaSpanScreenReader.classList.add('make-right-shift-cmp-link__screen-reader-only');
  ctaSpanScreenReader.textContent = 'opens in a new tab'; // Hardcoded from original HTML
  ctaAnchor.append(ctaSpanScreenReader);

  buttonDiv.append(ctaAnchor);
  container.append(buttonDiv);

  section.append(container);

  block.textContent = '';
  block.append(section);

  // Interactivity: Read More/Read Less functionality
  const readMoreButton = container.querySelector('.make-right-shift-readMore');
  const readMoreContent = container.querySelector('.make-right-shift-read-more-text');

  if (readMoreButton && readMoreContent) {
    const descriptionParagraph = descriptionRow.querySelector('p');
    if (descriptionParagraph && descriptionParagraph.textContent.trim().length > 150) { // Example threshold
      readMoreContent.classList.add('make-right-shift-collapsed');
      readMoreButton.textContent = 'Read More';
      readMoreButton.style.display = 'block'; // Show button only if content is long

      readMoreButton.addEventListener('click', () => {
        readMoreContent.classList.toggle('make-right-shift-collapsed');
        if (readMoreContent.classList.contains('make-right-shift-collapsed')) {
          readMoreButton.textContent = 'Read More';
        } else {
          readMoreButton.textContent = 'Read Less';
        }
      });
    } else {
      readMoreButton.style.display = 'none'; // Hide button if content is short
    }
  }
}
