import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root rows based on BlockJson model
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

  // Title (type=text)
  const titleDiv = document.createElement('div');
  const title = document.createElement('h2');
  title.classList.add('font-baskerville', 'font-md-40', 'font-24', 'text-banner--title');
  moveInstrumentation(titleRow, title);
  // Read textContent for type=text
  title.textContent = titleRow.firstElementChild?.textContent.trim() || '';
  titleDiv.append(title);
  contentWrapper.append(titleDiv);

  // Description (type=richtext)
  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('mt-sm-8', 'mt-5', 'text-banner--description');
  const descriptionTextDiv = document.createElement('div');
  descriptionTextDiv.classList.add('font-md-18', 'font-default', 'leading-24', 'text-center', 'promise-text-padding');
  moveInstrumentation(descriptionRow, descriptionTextDiv);
  // Read innerHTML for type=richtext
  descriptionTextDiv.innerHTML = descriptionRow.firstElementChild?.innerHTML || '';
  descriptionDiv.append(descriptionTextDiv);
  contentWrapper.append(descriptionDiv);

  // CTA
  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('text-banner--cta', 'mt-12', 'mt-lg-16');

  // CTA Link (type=aem-content) - read href
  const ctaLink = ctaLinkRow.firstElementChild?.querySelector('a');
  // CTA Label (type=text) - read textContent
  const ctaLabel = ctaLabelRow.firstElementChild?.textContent.trim();

  if (ctaLink && ctaLabel) {
    const anchor = document.createElement('a');
    anchor.classList.add(
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
    anchor.href = ctaLink.href;
    const span = document.createElement('span');
    span.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    span.textContent = ctaLabel;
    anchor.append(span);
    moveInstrumentation(ctaLinkRow, anchor);
    moveInstrumentation(ctaLabelRow, anchor);
    ctaDiv.append(anchor);
  }
  textBannerContainer.append(ctaDiv);

  block.replaceChildren(wrapper);
}
