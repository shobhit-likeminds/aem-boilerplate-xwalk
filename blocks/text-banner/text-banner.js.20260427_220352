import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, descriptionRow, ctaLinkRow, ctaLabelRow] = [...block.children];

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
  const titleDiv = document.createElement('div');
  const title = document.createElement('h2');
  title.classList.add('font-baskerville', 'font-md-40', 'font-24', 'text-banner--title');
  if (titleRow) {
    const titleCell = [...titleRow.children].find((c) => c.textContent.trim());
    if (titleCell) {
      moveInstrumentation(titleRow, title);
      title.textContent = titleCell.textContent.trim();
    }
  }
  titleDiv.append(title);
  contentWrapper.append(titleDiv);

  // Description
  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('mt-sm-8', 'mt-5', 'text-banner--description');
  const descriptionTextDiv = document.createElement('div');
  descriptionTextDiv.classList.add('font-md-18', 'font-default', 'leading-24', 'text-center', 'promise-text-padding');
  if (descriptionRow) {
    const descriptionCell = [...descriptionRow.children].find((c) => c.innerHTML.trim());
    if (descriptionCell) {
      moveInstrumentation(descriptionRow, descriptionTextDiv);
      descriptionTextDiv.innerHTML = descriptionCell.innerHTML;
    }
  }
  descriptionDiv.append(descriptionTextDiv);
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

  if (ctaLinkRow) {
    const ctaLinkCell = [...ctaLinkRow.children].find((c) => c.querySelector('a'));
    if (ctaLinkCell) {
      const foundLink = ctaLinkCell.querySelector('a');
      if (foundLink) {
        ctaLink.href = foundLink.href;
      }
      moveInstrumentation(ctaLinkRow, ctaLink);
    }
  }

  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  if (ctaLabelRow) {
    const ctaLabelCell = [...ctaLabelRow.children].find((c) => c.textContent.trim());
    if (ctaLabelCell) {
      moveInstrumentation(ctaLabelRow, ctaSpan);
      ctaSpan.textContent = ctaLabelCell.textContent.trim();
    }
  }
  ctaLink.append(ctaSpan);
  ctaDiv.append(ctaLink);
  textBannerContainer.append(ctaDiv);

  block.replaceChildren(section);
}
