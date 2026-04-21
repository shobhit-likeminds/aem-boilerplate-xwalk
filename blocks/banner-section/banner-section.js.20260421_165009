import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [imageRow, mobileImageRow, ctaLinkRow, ctaLinkLabelRow] = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative', 'banner-section__wrapper', 'asp-ratio-9x16', 'asp-ratio-sm-16x9', 'd-flex', 'justify-content-center');

  // Image
  const [imageCell] = [...imageRow.children];
  const [mobileImageCell] = [...mobileImageRow.children];

  const picture = document.createElement('picture');
  picture.classList.add('d-block', 'w-100', 'h-100');

  const mobileImg = mobileImageCell.querySelector('img');
  if (mobileImg) {
    const sourceMobile = document.createElement('source');
    sourceMobile.setAttribute('media', '(max-width:600px)');
    sourceMobile.setAttribute('srcset', createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '600' }]).querySelector('img').src);
    picture.appendChild(sourceMobile);
  }

  const desktopImg = imageCell.querySelector('img');
  if (desktopImg) {
    const sourceDesktop = document.createElement('source');
    sourceDesktop.setAttribute('srcset', createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1600' }]).querySelector('img').src);
    picture.appendChild(sourceDesktop);

    const img = document.createElement('img');
    img.src = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1600' }]).querySelector('img').src;
    img.alt = desktopImg.alt;
    img.setAttribute('loading', 'eager');
    img.setAttribute('fetchpriority', 'high');
    img.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
    picture.appendChild(img);
  }

  moveInstrumentation(imageRow, picture);
  moveInstrumentation(mobileImageRow, picture);
  wrapper.appendChild(picture);

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapper.appendChild(overlayDiv);

  const bannerContent = document.createElement('div');
  bannerContent.classList.add('position-absolute', 'banner-content');

  const container = document.createElement('div');
  container.classList.add('container', 'sticky-element', 'gx-8', 'gx-lg-0', 'd-flex', 'justify-content-center', 'align-items-center', 'flex-column', 'start-0', 'end-0', 'bottom-0');

  const span = document.createElement('span');
  span.classList.add('text-capitalize', 'mt-6', 'mt-md-3', 'mt-lg-9', 'mb-7');

  const [ctaLinkCell] = [...ctaLinkRow.children];
  const ctaLink = ctaLinkCell.querySelector('a');

  const [ctaLinkLabelCell] = [...ctaLinkLabelRow.children];
  const ctaLinkLabel = ctaLinkLabelCell.textContent.trim();

  if (ctaLink && ctaLinkLabel) {
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
    anchor.href = ctaLink.href;

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    labelSpan.textContent = ctaLinkLabel;
    anchor.appendChild(labelSpan);

    moveInstrumentation(ctaLinkRow, anchor);
    moveInstrumentation(ctaLinkLabelRow, anchor);
    span.appendChild(anchor);
  }

  container.appendChild(span);
  bannerContent.appendChild(container);
  wrapper.appendChild(bannerContent);

  block.textContent = '';
  block.classList.add('banner-section');
  block.appendChild(wrapper);
}
