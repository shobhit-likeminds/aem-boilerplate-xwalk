import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ctaLinkRow, ctaLinkLabelRow] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('text-banner--wrapper', 'position-relative', 'bg-maroon-700');
  moveInstrumentation(block, section);

  // Background circles and curves
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

  // Heading
  if (headingRow) {
    const headingDiv = document.createElement('div');
    const heading = document.createElement('h2');
    heading.classList.add('font-baskerville', 'font-md-40', 'font-24', 'text-banner--title');
    heading.textContent = headingRow.firstElementChild?.textContent.trim() || '';
    moveInstrumentation(headingRow, heading);
    headingDiv.append(heading);
    contentWrapper.append(headingDiv);
  }

  // Description
  if (descriptionRow) {
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('mt-sm-8', 'mt-5', 'text-banner--description');
    const descriptionTextWrapper = document.createElement('div');
    descriptionTextWrapper.classList.add('font-md-18', 'font-default', 'leading-24', 'text-center', 'promise-text-padding');
    descriptionTextWrapper.innerHTML = descriptionRow.firstElementChild?.innerHTML || '';
    moveInstrumentation(descriptionRow, descriptionTextWrapper);
    descriptionDiv.append(descriptionTextWrapper);
    contentWrapper.append(descriptionDiv);
  }

  // CTA Link
  if (ctaLinkRow && ctaLinkLabelRow) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('text-banner--cta', 'mt-12', 'mt-lg-16');

    const ctaLink = document.createElement('a');
    const originalLink = ctaLinkRow.firstElementChild?.querySelector('a');
    if (originalLink) {
      ctaLink.href = originalLink.href;
    }
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

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    ctaLabelSpan.textContent = ctaLinkLabelRow.firstElementChild?.textContent.trim() || '';
    moveInstrumentation(ctaLinkLabelRow, ctaLabelSpan);
    ctaLink.append(ctaLabelSpan);

    moveInstrumentation(ctaLinkRow, ctaLink);
    ctaWrapper.append(ctaLink);
    textBannerContainer.append(ctaWrapper);
  }

  block.textContent = '';
  block.append(section);
}
