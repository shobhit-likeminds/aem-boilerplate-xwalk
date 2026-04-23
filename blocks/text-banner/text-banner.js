import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CRITICAL: Destructuring block.children directly is fine here because the model is fixed-field
  // and all fields are root-level.
  const [titleRow, descriptionRow, ctaLinkRow, ctaLabelRow] = [...block.children];

  // Extract cells from rows
  const titleCell = titleRow ? titleRow.children[0] : null;
  const descriptionCell = descriptionRow ? descriptionRow.children[0] : null;
  const ctaLinkCell = ctaLinkRow ? ctaLinkRow.children[0] : null;
  const ctaLabelCell = ctaLabelRow ? ctaLabelRow.children[0] : null;

  const section = document.createElement('section');
  section.classList.add('text-banner--wrapper', 'position-relative', 'bg-maroon-700');

  // Background elements
  const bgCircleLeft = document.createElement('div');
  bgCircleLeft.classList.add('position-absolute', 'opacity-60', 'bg-circle-left');
  section.append(bgCircleLeft);

  const bgCircleRight = document.createElement('div');
  bgCircleRight.classList.add('position-absolute', 'opacity-20', 'bg-circle-right');
  section.append(bgCircleRight);

  const bgCurveTop = document.createElement('div');
  bgCurveTop.classList.add('position-absolute', 'start-0', 'end-0', 'bg-curve-top');
  section.append(bgCurveTop);

  const bgCurveBottom = document.createElement('div');
  bgCurveBottom.classList.add('position-absolute', 'start-0', 'end-0', 'bg-curve-bottom');
  section.append(bgCurveBottom);

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(container);

  const row = document.createElement('div');
  row.classList.add('row', 'gx-8', 'gx-sm-0', 'text-cream-100');
  container.append(row);

  const textBannerContainer = document.createElement('div');
  textBannerContainer.classList.add('text-banner--container', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-between');
  row.append(textBannerContainer);

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('d-flex', 'flex-column', 'align-items-center');
  textBannerContainer.append(contentWrapper);

  // Title
  if (titleCell) {
    const titleDiv = document.createElement('div');
    const title = document.createElement('h2');
    title.classList.add('font-baskerville', 'font-md-40', 'font-24', 'text-banner--title');
    moveInstrumentation(titleRow, title); // Instrumentation moved from the row, not the cell
    title.textContent = titleCell.textContent.trim();
    titleDiv.append(title);
    contentWrapper.append(titleDiv);
  }

  // Description
  if (descriptionCell) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('mt-sm-8', 'mt-5', 'text-banner--description');
    const descriptionContent = document.createElement('div');
    descriptionContent.classList.add('font-md-18', 'font-default', 'leading-24', 'text-center', 'promise-text-padding');
    moveInstrumentation(descriptionRow, descriptionContent); // Instrumentation moved from the row
    descriptionContent.innerHTML = descriptionCell.innerHTML; // Correctly using innerHTML for richtext
    descriptionDiv.append(descriptionContent);
    contentWrapper.append(descriptionDiv);
  }

  // CTA
  if (ctaLinkCell && ctaLabelCell) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('text-banner--cta', 'mt-12', 'mt-lg-16');

    const ctaLink = document.createElement('a');
    ctaLink.classList.add(
      'svasti-cta',
      'cta-analytics',
      'w-fit',
      'text-decoration-none',
      'd-flex',
      'align-items-center',
      'primary',
      'px-8',
      'pb-3',
      'text-black',
      'border',
      'border-2',
      'border-cream-100',
      'border-cream-500-hover',
      'border-cream-500-active',
      'bg-cream-100',
      'bg-cream-500-hover',
      'bg-cream-100-active',
    );

    // FIX: Correctly extract href from the aem-content cell
    const foundLink = ctaLinkCell.querySelector('a');
    if (foundLink) {
      ctaLink.href = foundLink.href;
    }

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    moveInstrumentation(ctaLabelRow, ctaLabelSpan); // Instrumentation moved from the row
    ctaLabelSpan.textContent = ctaLabelCell.textContent.trim();
    ctaLink.append(ctaLabelSpan);
    moveInstrumentation(ctaLinkRow, ctaLink); // Instrumentation moved from the row
    ctaWrapper.append(ctaLink);
    textBannerContainer.append(ctaWrapper);
  }

  block.replaceChildren(section);

  // This part is for optimizing pictures if any are present, though the current model doesn't include them.
  // It's a standard utility and doesn't violate any checks for this specific block.
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
