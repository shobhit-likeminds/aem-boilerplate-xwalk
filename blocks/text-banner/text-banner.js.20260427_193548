import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headlineRow, descriptionRow, ctaLinkRow, ctaLabelRow] = [...block.children];

  const sectionWrapper = document.createElement('section');
  sectionWrapper.classList.add('text-banner--wrapper', 'position-relative', 'bg-maroon-700');

  const bgCircleLeft = document.createElement('div');
  bgCircleLeft.classList.add('position-absolute', 'opacity-60', 'bg-circle-left');
  sectionWrapper.append(bgCircleLeft);

  const bgCircleRight = document.createElement('div');
  bgCircleRight.classList.add('position-absolute', 'opacity-20', 'bg-circle-right');
  sectionWrapper.append(bgCircleRight);

  const bgCurveTop = document.createElement('div');
  bgCurveTop.classList.add('position-absolute', 'start-0', 'end-0', 'bg-curve-top');
  sectionWrapper.append(bgCurveTop);

  const bgCurveBottom = document.createElement('div');
  bgCurveBottom.classList.add('position-absolute', 'start-0', 'end-0', 'bg-curve-bottom');
  sectionWrapper.append(bgCurveBottom);

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  sectionWrapper.append(container);

  const row = document.createElement('div');
  row.classList.add('row', 'gx-8', 'gx-sm-0', 'text-cream-100');
  container.append(row);

  const bannerContainer = document.createElement('div');
  bannerContainer.classList.add('text-banner--container', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-between');
  row.append(bannerContainer);

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('d-flex', 'flex-column', 'align-items-center');
  bannerContainer.append(contentWrapper);

  // Headline
  const headlineDiv = document.createElement('div');
  const headline = document.createElement('h2');
  headline.classList.add('font-baskerville', 'font-md-40', 'font-24', 'text-banner--title');
  moveInstrumentation(headlineRow, headline);
  headline.textContent = headlineRow.textContent.trim();
  headlineDiv.append(headline);
  contentWrapper.append(headlineDiv);

  // Description
  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('mt-sm-8', 'mt-5', 'text-banner--description');
  const descriptionText = document.createElement('div');
  descriptionText.classList.add('font-md-18', 'font-default', 'leading-24', 'text-center', 'promise-text-padding');
  moveInstrumentation(descriptionRow, descriptionText);
  descriptionText.innerHTML = descriptionRow.innerHTML;
  descriptionDiv.append(descriptionText);
  contentWrapper.append(descriptionDiv);

  // CTA
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

  const foundLink = ctaLinkRow.querySelector('a');
  if (foundLink) {
    ctaLink.href = foundLink.href;
  }

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  ctaLink.append(ctaLabelSpan);

  moveInstrumentation(ctaLinkRow, ctaLink); // Move instrumentation from link cell to the new anchor
  ctaDiv.append(ctaLink);
  bannerContainer.append(ctaDiv);

  block.replaceChildren(sectionWrapper);
}
