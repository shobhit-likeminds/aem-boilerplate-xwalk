import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children to get rows based on BlockJson model
  const [imageRow, ctaLinkRow, ctaLinkLabelRow] = [...block.children];

  // Main wrapper
  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative', 'banner-section__wrapper', 'asp-ratio-9x16', 'asp-ratio-sm-16x9', 'd-flex', 'justify-content-center');

  // Image section
  // Access the first cell of the imageRow
  const [imageCell] = [...imageRow.children];
  const picture = imageCell.querySelector('picture');
  if (picture) {
    picture.classList.add('d-block', 'w-100', 'h-100');
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(max-width:600px)', width: '600' }, { width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      picture.replaceWith(optimizedPic);
      optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
    }
  }
  moveInstrumentation(imageRow, picture);
  wrapper.append(picture);

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapper.append(overlayDiv);

  // Content section
  const bannerContent = document.createElement('div');
  bannerContent.classList.add('position-absolute', 'banner-content');

  const container = document.createElement('div');
  container.classList.add('container', 'sticky-element', 'gx-8', 'gx-lg-0', 'd-flex', 'justify-content-center', 'align-items-center', 'flex-column', 'start-0', 'end-0', 'bottom-0');

  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add('text-capitalize', 'mt-6', 'mt-md-3', 'mt-lg-9', 'mb-7');

  const ctaLinkEl = document.createElement('a');
  ctaLinkEl.classList.add('svasti-cta', 'cta-analytics', 'w-fit', 'text-decoration-none', 'd-flex', 'align-items-center', 'primary', 'px-8', 'pb-3', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');

  // Access the first cell of the ctaLinkRow
  const [ctaLinkCell] = [...ctaLinkRow.children];
  const foundCtaLink = ctaLinkCell?.querySelector('a');
  if (foundCtaLink) {
    ctaLinkEl.href = foundCtaLink.href;
  }

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  // Access the first cell of the ctaLinkLabelRow
  const [ctaLinkLabelCell] = [...ctaLinkLabelRow.children];
  ctaLabelSpan.textContent = ctaLinkLabelCell?.textContent.trim() || '';
  ctaLinkEl.append(ctaLabelSpan);

  moveInstrumentation(ctaLinkRow, ctaLinkEl);
  moveInstrumentation(ctaLinkLabelRow, ctaLinkEl);

  ctaSpan.append(ctaLinkEl);
  container.append(ctaSpan);
  bannerContent.append(container);
  wrapper.append(bannerContent);

  block.textContent = '';
  block.classList.add('banner-section');
  block.append(wrapper);
}
