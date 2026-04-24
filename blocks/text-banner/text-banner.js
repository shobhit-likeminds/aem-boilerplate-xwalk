import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleCell, descriptionCell, ctaLinkCell, ctaLabelCell] = [...block.children];

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
    moveInstrumentation(titleCell, title);
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
    moveInstrumentation(descriptionCell, descriptionContent);
    descriptionContent.innerHTML = descriptionCell.innerHTML;
    descriptionDiv.append(descriptionContent);
    contentWrapper.append(descriptionDiv);
  }

  // CTA
  if (ctaLinkCell && ctaLabelCell) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('text-banner--cta', 'mt-12', 'mt-lg-16');

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('svasti-cta', 'cta-analytics', 'w-fit', 'text-decoration-none', 'd-flex', 'align-items-center', 'primary', 'px-8', 'pb-3', 'text-black', 'border', 'border-2', 'border-cream-100', 'border-cream-500-hover', 'border-cream-500-active', 'bg-cream-100', 'bg-cream-500-hover', 'bg-cream-100-active');

    const foundLink = ctaLinkCell.querySelector('a');
    if (foundLink) {
      ctaLink.href = foundLink.href;
    }

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    moveInstrumentation(ctaLabelCell, ctaLabelSpan);
    ctaLabelSpan.textContent = ctaLabelCell.textContent.trim();
    ctaLink.append(ctaLabelSpan);

    moveInstrumentation(ctaLinkCell, ctaLink); // Move instrumentation from link cell to the new anchor
    ctaWrapper.append(ctaLink);
    textBannerContainer.append(ctaWrapper);
  }

  // Replace the block with the new section
  block.replaceChildren(section);

  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
