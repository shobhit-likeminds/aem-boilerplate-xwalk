import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageDesktopRow,
    backgroundImageMobileRow,
    ctaLinkRow,
    ctaLabelRow,
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
  moveInstrumentation(block, wrapper);

  // Background Image (Mobile)
  const mobilePicture = backgroundImageMobileRow.querySelector('picture');
  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    const optimizedMobilePic = createOptimizedPicture(
      mobileImg.src,
      mobileImg.alt,
      false,
      [{ media: '(max-width:600px)', width: '750' }],
    );
    optimizedMobilePic.classList.add('d-block', 'w-100', 'h-100');
    moveInstrumentation(backgroundImageMobileRow, optimizedMobilePic);
    wrapper.append(optimizedMobilePic);
  }

  // Background Image (Desktop)
  const desktopPicture = backgroundImageDesktopRow.querySelector('picture');
  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    const optimizedDesktopPic = createOptimizedPicture(
      desktopImg.src,
      desktopImg.alt,
      true,
      [{ width: '1920' }],
    );
    optimizedDesktopPic.classList.add(
      'w-100',
      'h-100',
      'object-fit-cover',
      'banner-media',
      'd-block',
    );
    moveInstrumentation(backgroundImageDesktopRow, optimizedDesktopPic);
    wrapper.append(optimizedDesktopPic);
  }

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add(
    'position-absolute',
    'start-0',
    'bottom-0',
    'w-100',
    'h-100',
  );
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

  const spanWrapper = document.createElement('span');
  spanWrapper.classList.add(
    'text-capitalize',
    'mt-6',
    'mt-md-3',
    'mt-lg-9',
    'mb-7',
  );

  const ctaLink = ctaLinkRow.querySelector('a');
  const ctaLabel = ctaLabelRow.textContent.trim();

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
    moveInstrumentation(ctaLinkRow, anchor);

    const labelSpan = document.createElement('span');
    labelSpan.classList.add(
      'svasti-cta__label',
      'fw-semibold',
      'fs-default',
      'leading-26',
    );
    labelSpan.textContent = ctaLabel;
    moveInstrumentation(ctaLabelRow, labelSpan);
    anchor.append(labelSpan);
    spanWrapper.append(anchor);
  }

  container.append(spanWrapper);
  bannerContent.append(container);
  wrapper.append(bannerContent);

  block.replaceChildren(wrapper);
}
