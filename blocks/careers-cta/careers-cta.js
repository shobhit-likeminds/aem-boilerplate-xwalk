import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageRow,
    headingSmallRow,
    headingRow,
    descriptionRow,
    ctaLinkRow,
    ctaLinkLabelRow,
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('row-thar', 'm-0-thar', 'w-100-thar', 'section_#000');
  // NOTE: The original HTML has a style attribute for background-color, color, and font-family.
  // EDS blocks should not set inline styles. These should be handled by CSS.

  // Image Section
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('px-0-thar', 'col-md-6-mp', 'col-sm-12-mp', 'max-hw-mp', 'max-h-col');
  moveInstrumentation(imageRow, imageWrapper);

  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageWrapper.append(optimizedPic);
    }
  }
  block.append(imageWrapper);

  // Text Section
  const textWrapper = document.createElement('div');
  textWrapper.classList.add('px-0-thar', 'col-md-6-mp', 'col-sm-12-mp', 'max-h-col');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('m-auto-thar', 'w-66-thar', 'h-100-thar', 'y-pad-md-mp', 'min-p-mp', 'd-flex-thar', 'flex-column-thar', 'align-items-start-thar', 'justify-content-center-md-mp');

  const mpContentWrapper = document.createElement('div');
  mpContentWrapper.classList.add('mp-content-wrapper');

  // Heading Small
  if (headingSmallRow) {
    const h5 = document.createElement('h5');
    moveInstrumentation(headingSmallRow, h5);
    h5.textContent = headingSmallRow.textContent.trim();
    mpContentWrapper.append(h5);
  }

  // Heading
  if (headingRow) {
    const h2 = document.createElement('h2');
    moveInstrumentation(headingRow, h2);
    h2.textContent = headingRow.textContent.trim();
    mpContentWrapper.append(h2);
  }

  // Description
  if (descriptionRow) {
    const p = document.createElement('p');
    moveInstrumentation(descriptionRow, p);
    p.textContent = descriptionRow.textContent.trim();
    mpContentWrapper.append(p);
  }

  contentDiv.append(mpContentWrapper);

  // CTA Link
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('mp-link-lg', 'mp-link-md', 'mp-link-sm', 'm-0-thar');
  moveInstrumentation(ctaLinkRow, ctaLink);

  // For type=aem-content, read the href from the <a> tag within the cell
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
  }

  // For type=text, read the textContent from the cell
  if (ctaLinkLabelRow) {
    ctaLink.textContent = ctaLinkLabelRow.textContent.trim();
    // Instrumentation for the link should come from the ctaLinkLabelRow as it provides the visible text
    moveInstrumentation(ctaLinkLabelRow, ctaLink);
  }

  // The original HTML has an SVG icon within the CTA link.
  // Since the block model does not have a dedicated field for this icon,
  // we cannot add it dynamically without hardcoding, which is not allowed.
  // If the model were updated to include an icon field, it would be added here.

  contentDiv.append(ctaLink);
  textWrapper.append(contentDiv);
  block.append(textWrapper);
}
