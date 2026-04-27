import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageDesktopCell,
    backgroundImageMobileCell,
    ctaLinkCell,
    ctaLabelCell,
  ] = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.classList.add(
    'position-relative',
    'banner-section__wrapper',
    'asp-ratio-9x16',
    'asp-ratio-sm-16x9',
    'd-flex',
    'justify-content-center',
  );
  moveInstrumentation(backgroundImageDesktopCell, wrapper); // Move instrumentation from first row

  // Background Image (Desktop)
  const desktopPicture = backgroundImageDesktopCell.querySelector('picture');
  if (desktopPicture) {
    const optimizedDesktopPic = createOptimizedPicture(
      desktopPicture.querySelector('img').src,
      desktopPicture.querySelector('img').alt,
      false,
      [{ width: '1600' }],
    );
    optimizedDesktopPic.classList.add('d-block', 'w-100', 'h-100');
    moveInstrumentation(desktopPicture, optimizedDesktopPic);
    wrapper.append(optimizedDesktopPic);
  }

  // Background Image (Mobile) - Used for source media query
  const mobilePicture = backgroundImageMobileCell.querySelector('picture');
  if (mobilePicture) {
    const mobileSource = document.createElement('source');
    mobileSource.media = '(max-width:600px)';
    mobileSource.srcset = createOptimizedPicture(
      mobilePicture.querySelector('img').src,
      mobilePicture.querySelector('img').alt,
      false,
      [{ width: '600' }],
    ).querySelector('source').srcset;
    wrapper.querySelector('picture')?.prepend(mobileSource);
    moveInstrumentation(backgroundImageMobileCell, mobileSource); // Move instrumentation from mobile row
  }

  const img = wrapper.querySelector('img');
  if (img) {
    img.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
    img.setAttribute('loading', 'eager');
    img.setAttribute('fetchpriority', 'high');
  }

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapper.append(overlayDiv);

  const bannerContent = document.createElement('div');
  bannerContent.classList.add('position-absolute', 'banner-content');

  const container = document.createElement('div');
  container.classList.add(
    'container',
    'sticky-element',
    'gx-8',
    'gx-lg-0',
    'd-flex',
    'justify-content-center',
    'align-items-center',
    'flex-column',
    'start-0',
    'end-0',
    'bottom-0',
  );
  bannerContent.append(container);

  const spanWrapper = document.createElement('span');
  spanWrapper.classList.add(
    'text-capitalize',
    'mt-6',
    'mt-md-3',
    'mt-lg-9',
    'mb-7',
  );
  container.append(spanWrapper);

  const ctaLink = ctaLinkCell.querySelector('a');
  const ctaLabel = ctaLabelCell.textContent.trim();

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
    moveInstrumentation(ctaLinkCell, anchor);

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    labelSpan.textContent = ctaLabel;
    moveInstrumentation(ctaLabelCell, labelSpan);

    anchor.append(labelSpan);
    spanWrapper.append(anchor);
  }

  block.replaceChildren(wrapper, bannerContent);
}
