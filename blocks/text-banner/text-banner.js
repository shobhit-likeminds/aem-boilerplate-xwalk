import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Structure Alignment - Using destructuring for root rows as per BlockJson model
  const [titleRow, descriptionRow, ctaLinkRow, ctaLinkLabelRow] = [...block.children];

  // Create the main section wrapper
  const section = document.createElement('section');
  section.classList.add('text-banner--wrapper', 'position-relative', 'bg-maroon-700');

  // Add decorative background elements
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

  // Create container and row
  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(container);

  const row = document.createElement('div');
  row.classList.add('row', 'gx-8', 'gx-sm-0', 'text-cream-100');
  container.append(row);

  // Create the main content container
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
  if (titleRow) {
    const titleDiv = document.createElement('div');
    const h2 = document.createElement('h2');
    h2.classList.add('font-baskerville', 'font-md-40', 'font-24', 'text-banner--title');
    // As per EDS BLOCK STRUCTURE, title is type=text, read .textContent.trim()
    h2.textContent = titleRow.firstElementChild.textContent.trim();
    moveInstrumentation(titleRow, h2);
    titleDiv.append(h2);
    contentWrapper.append(titleDiv);
  }

  // Description
  if (descriptionRow) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('mt-sm-8', 'mt-5', 'text-banner--description');
    const pWrapper = document.createElement('div');
    pWrapper.classList.add('font-md-18', 'font-default', 'leading-24', 'text-center', 'promise-text-padding');
    // As per EDS BLOCK STRUCTURE, description is type=richtext, read .innerHTML
    pWrapper.innerHTML = descriptionRow.firstElementChild.innerHTML;
    moveInstrumentation(descriptionRow, pWrapper);
    descriptionDiv.append(pWrapper);
    contentWrapper.append(descriptionDiv);
  }

  // CTA Link
  if (ctaLinkRow && ctaLinkLabelRow) {
    const ctaDiv = document.createElement('div');
    ctaDiv.classList.add('text-banner--cta', 'mt-12', 'mt-lg-16');

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

    // As per EDS BLOCK STRUCTURE, ctaLink is type=aem-content, read cell.querySelector('a').href
    const foundLink = ctaLinkRow.firstElementChild.querySelector('a');
    if (foundLink) {
      ctaLink.href = foundLink.href;
    }

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    // As per EDS BLOCK STRUCTURE, ctaLinkLabel is type=text, read .textContent.trim()
    ctaLabelSpan.textContent = ctaLinkLabelRow.firstElementChild.textContent.trim();
    moveInstrumentation(ctaLinkLabelRow, ctaLabelSpan);
    ctaLink.append(ctaLabelSpan);
    moveInstrumentation(ctaLinkRow, ctaLink);
    ctaDiv.append(ctaLink);
    textBannerContainer.append(ctaDiv);
  }

  // CHECK 2: Interactivity - No interactive elements (buttons, toggles, modals, etc.) found in original HTML
  // that require additional event listeners beyond the CTA link's default behavior.

  block.textContent = '';
  block.append(section);
}
