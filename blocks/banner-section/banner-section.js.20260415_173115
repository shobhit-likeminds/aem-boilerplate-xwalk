import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
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
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(max-width:600px)', width: '600' }, { width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      picture.replaceWith(optimizedPic);
      optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
    }
    wrapper.append(picture);
  }
  moveInstrumentation(imageRow, picture);
  imageRow.remove();

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapper.append(overlayDiv);

  // Content
  const bannerContent = document.createElement('div');
  bannerContent.classList.add('position-absolute', 'banner-content');

  const container = document.createElement('div');
  container.classList.add('container', 'sticky-element', 'gx-8', 'gx-lg-0', 'd-flex', 'justify-content-center', 'align-items-center', 'flex-column', 'start-0', 'end-0', 'bottom-0');

  const span = document.createElement('span');
  span.classList.add('text-capitalize', 'mt-6', 'mt-md-3', 'mt-lg-9', 'mb-7');

  // CTA Link and Label
  const ctaLinkCell = ctaLinkRow.firstElementChild;
  const ctaLinkLabelCell = ctaLinkLabelRow.firstElementChild;

  const ctaAnchor = document.createElement('a');
  const originalCtaLink = ctaLinkCell.querySelector('a');
  if (originalCtaLink) {
    ctaAnchor.href = originalCtaLink.href;
  }
  ctaAnchor.classList.add(
    'svasti-cta',
    'cta-analytics',
    'w-fit',
    'text-decoration-none',
    'd-flex',
    'align-items-center',
    'primary',
    'px-8',
    'pb-3',
    'text-cream-100',
    'border',
    'border-2',
    'border-red-100',
    'border-maroon-100-hover',
    'border-red-300-active',
    'bg-red-100',
    'bg-maroon-100-hover',
    'bg-red-300-active',
  );

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaLabelSpan.textContent = ctaLinkLabelCell.textContent.trim();
  ctaAnchor.append(ctaLabelSpan);

  moveInstrumentation(ctaLinkRow, ctaAnchor);
  moveInstrumentation(ctaLinkLabelRow, ctaLabelSpan);
  ctaLinkRow.remove();
  ctaLinkLabelRow.remove();

  span.append(ctaAnchor);
  container.append(span);
  bannerContent.append(container);
  wrapper.append(bannerContent);

  block.textContent = '';
  block.append(wrapper);
  block.classList.add('banner-section');
}
