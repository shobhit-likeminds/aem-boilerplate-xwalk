import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children directly as per the fixed-field model
  const [imageRow, ctaLinkRow, ctaLinkLabelRow] = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative', 'banner-section__wrapper', 'asp-ratio-9x16', 'asp-ratio-sm-16x9', 'd-flex', 'justify-content-center');

  // Image
  const imageCell = imageRow.firstElementChild;
  const picture = imageCell.querySelector('picture');
  if (picture) {
    picture.classList.add('d-block', 'w-100', 'h-100');
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '600', media: '(max-width:600px)' }, { width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      picture.replaceWith(optimizedPic);
      optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
    }
    moveInstrumentation(imageRow, picture);
    wrapper.append(picture);
  }

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapper.append(overlayDiv);

  // Content
  const bannerContent = document.createElement('div');
  bannerContent.classList.add('position-absolute', 'banner-content');

  const container = document.createElement('div');
  container.classList.add('container', 'sticky-element', 'gx-8', 'gx-lg-0', 'd-flex', 'justify-content-center', 'align-items-center', 'flex-column', 'start-0', 'end-0', 'bottom-0');

  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add('text-capitalize', 'mt-6', 'mt-md-3', 'mt-lg-9', 'mb-7');

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('svasti-cta', 'cta-analytics', 'w-fit', 'text-decoration-none', 'd-flex', 'align-items-center', 'primary', 'px-8', 'pb-3', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');

  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
  }

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaLabelSpan.textContent = ctaLinkLabelRow.textContent.trim();
  moveInstrumentation(ctaLinkLabelRow, ctaLabelSpan);

  ctaLink.append(ctaLabelSpan);
  moveInstrumentation(ctaLinkRow, ctaLink);
  ctaSpan.append(ctaLink);
  container.append(ctaSpan);
  bannerContent.append(container);
  wrapper.append(bannerContent);

  block.textContent = '';
  block.append(wrapper);
}
