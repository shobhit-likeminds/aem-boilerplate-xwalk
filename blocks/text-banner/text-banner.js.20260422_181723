import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, descriptionRow, ctaLinkRow, ctaLabelRow] = [...block.children];

  const wrapper = document.createElement('section');
  wrapper.classList.add('text-banner--wrapper', 'position-relative', 'bg-maroon-700');

  const bgCircleLeft = document.createElement('div');
  bgCircleLeft.classList.add('position-absolute', 'opacity-60', 'bg-circle-left');
  wrapper.append(bgCircleLeft);

  const bgCircleRight = document.createElement('div');
  bgCircleRight.classList.add('position-absolute', 'opacity-20', 'bg-circle-right');
  wrapper.append(bgCircleRight);

  const bgCurveTop = document.createElement('div');
  bgCurveTop.classList.add('position-absolute', 'start-0', 'end-0', 'bg-curve-top');
  wrapper.append(bgCurveTop);

  const bgCurveBottom = document.createElement('div');
  bgCurveBottom.classList.add('position-absolute', 'start-0', 'end-0', 'bg-curve-bottom');
  wrapper.append(bgCurveBottom);

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  wrapper.append(container);

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
  const titleDiv = document.createElement('div');
  const title = document.createElement('h2');
  title.classList.add('font-baskerville', 'font-md-40', 'font-24', 'text-banner--title');
  const titleCell = [...titleRow.children].find(c => c.textContent.trim() !== ''); // Find the cell with text content
  if (titleCell) {
    moveInstrumentation(titleRow, title);
    title.textContent = titleCell.textContent.trim();
  }
  titleDiv.append(title);
  contentWrapper.append(titleDiv);

  // Description
  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('mt-sm-8', 'mt-5', 'text-banner--description');
  const descriptionText = document.createElement('div');
  descriptionText.classList.add('font-md-18', 'font-default', 'leading-24', 'text-center', 'promise-text-padding');
  const descriptionCell = [...descriptionRow.children].find(c => c.innerHTML.trim() !== ''); // Find the cell with rich text content
  if (descriptionCell) {
    moveInstrumentation(descriptionRow, descriptionText);
    descriptionText.innerHTML = descriptionCell.innerHTML;
  }
  descriptionDiv.append(descriptionText);
  contentWrapper.append(descriptionDiv);

  // CTA
  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('text-banner--cta', 'mt-12', 'mt-lg-16');
  textBannerContainer.append(ctaWrapper);

  const ctaLink = ctaLinkRow.querySelector('a');
  const ctaLabelCell = [...ctaLabelRow.children].find(c => c.textContent.trim() !== ''); // Find the cell with text content
  const ctaLabel = ctaLabelCell ? ctaLabelCell.textContent.trim() : '';

  if (ctaLink && ctaLabel) {
    const anchor = document.createElement('a');
    anchor.classList.add(
      'svasti-cta', 'cta-analytics', 'w-fit', 'text-decoration-none', 'd-flex',
      'align-items-center', 'primary', 'px-8', 'pb-3', 'text-black', 'border',
      'border-2', 'border-cream-100', 'border-cream-500-hover', 'border-cream-500-active',
      'bg-cream-100', 'bg-cream-500-hover', 'bg-cream-100-active'
    );
    anchor.href = ctaLink.href;
    moveInstrumentation(ctaLinkRow, anchor); // Move instrumentation from ctaLinkRow
    moveInstrumentation(ctaLabelRow, anchor); // Move instrumentation from ctaLabelRow

    const span = document.createElement('span');
    span.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    span.textContent = ctaLabel;
    anchor.append(span);
    ctaWrapper.append(anchor);
  }

  block.replaceChildren(wrapper);
}
