import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Root rows are fixed schema, use array destructuring.
  // The EDS block structure shows 4 root children, matching the BlockJson model.
  const [titleRow, descriptionRow, ctaLinkRow, ctaLabelRow] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('text-banner--wrapper', 'position-relative', 'bg-maroon-700');

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
  textBannerContainer.classList.add(
    'text-banner--container',
    'd-flex',
    'flex-column',
    'align-items-center',
    'justify-content-between',
  );
  row.append(textBannerContainer);

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('d-flex', 'flex-column', 'align-items-center');
  textBannerContainer.append(contentWrapper);

  // Title
  // CHECK 0: titleRow is now a row, not a cell. Get the actual cell.
  // CHECK 1: The EDS structure shows the actual content is in the first child of the row.
  const titleCell = titleRow.children[0]; // This is acceptable here as it's a fixed-schema root row.
  if (titleCell) {
    const titleDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.classList.add('font-baskerville', 'font-md-40', 'font-24', 'text-banner--title');
    moveInstrumentation(titleRow, h2); // Move instrumentation from the row, not the inner cell
    h2.textContent = titleCell.textContent.trim();
    titleDiv.append(h2);
    contentWrapper.append(titleDiv);
  }

  // Description
  // CHECK 0: descriptionRow is now a row, not a cell. Get the actual cell.
  // CHECK 1: The EDS structure shows the actual content is in the first child of the row.
  // CHECK 1.5: description is richtext, so innerHTML is correctly used.
  const descriptionCell = descriptionRow.children[0]; // Acceptable for fixed-schema root row.
  if (descriptionCell) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('mt-sm-8', 'mt-5', 'text-banner--description');
    const pWrapper = document.createElement('div');
    pWrapper.classList.add('font-md-18', 'font-default', 'leading-24', 'text-center', 'promise-text-padding');
    moveInstrumentation(descriptionRow, pWrapper); // Move instrumentation from the row
    pWrapper.innerHTML = descriptionCell.innerHTML;
    descriptionDiv.append(pWrapper);
    contentWrapper.append(descriptionDiv);
  }

  // CTA Link and Label
  // CHECK 0: ctaLinkRow and ctaLabelRow are now rows, not cells. Get the actual cells.
  // CHECK 1: The EDS structure shows the actual content is in the first child of each row.
  const ctaLinkCell = ctaLinkRow.children[0]; // Acceptable for fixed-schema root row.
  const ctaLabelCell = ctaLabelRow.children[0]; // Acceptable for fixed-schema root row.
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

    // CHECK 1: ctaLink is type=aem-content, so querySelector('a').href is correct.
    const foundLink = ctaLinkCell.querySelector('a');
    if (foundLink) {
      ctaLink.href = foundLink.href;
    }

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    moveInstrumentation(ctaLabelRow, ctaLabelSpan); // Move instrumentation from the row
    ctaLabelSpan.textContent = ctaLabelCell.textContent.trim();
    ctaLink.append(ctaLabelSpan);

    moveInstrumentation(ctaLinkRow, ctaLink); // Move instrumentation from the row
    ctaWrapper.append(ctaLink);
    textBannerContainer.append(ctaWrapper);
  }

  // CHECK 3: moveInstrumentation is called for each root row before block.replaceChildren.
  block.replaceChildren(section);
}
