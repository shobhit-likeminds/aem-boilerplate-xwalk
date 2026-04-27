import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageDesktopRow,
    backgroundImageMobileRow,
    ctaLinkRow,
    ctaLabelRow,
  ] = [...block.children];

  // Create the main wrapper div
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add(
    'position-relative',
    'banner-section__wrapper',
    'asp-ratio-9x16',
    'asp-ratio-sm-16x9',
    'd-flex',
    'justify-content-center',
  );

  // Background Images
  const desktopPicture = backgroundImageDesktopRow?.querySelector('picture');
  const mobilePicture = backgroundImageMobileRow?.querySelector('picture');

  if (desktopPicture || mobilePicture) {
    const pictureEl = document.createElement('picture');
    pictureEl.classList.add('d-block', 'w-100', 'h-100');

    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      if (mobileImg) {
        const sourceMobile = document.createElement('source');
        sourceMobile.media = '(max-width:600px)';
        sourceMobile.srcset = mobileImg.src;
        pictureEl.append(sourceMobile);
      }
    }

    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      if (desktopImg) {
        const sourceDesktop = document.createElement('source');
        sourceDesktop.srcset = desktopImg.src;
        pictureEl.append(sourceDesktop);

        const imgEl = createOptimizedPicture(
          desktopImg.src,
          desktopImg.alt,
          true,
          [{ width: '750' }],
        ).querySelector('img');
        imgEl.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
        imgEl.loading = 'eager';
        imgEl.fetchPriority = 'high';
        pictureEl.append(imgEl);
      }
    }
    moveInstrumentation(backgroundImageDesktopRow, pictureEl); // Move instrumentation from one of the image rows
    wrapperDiv.append(pictureEl);
  }

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapperDiv.append(overlayDiv);

  // Banner Content
  const bannerContentDiv = document.createElement('div');
  bannerContentDiv.classList.add('position-absolute', 'banner-content');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add(
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

  const spanEl = document.createElement('span');
  spanEl.classList.add(
    'text-capitalize',
    'mt-6',
    'mt-md-3',
    'mt-lg-9',
    'mb-7',
  );

  const ctaLink = ctaLinkRow?.querySelector('a');
  const ctaLabel = ctaLabelRow?.textContent.trim();

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

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    labelSpan.textContent = ctaLabel;
    anchor.append(labelSpan);

    moveInstrumentation(ctaLinkRow, anchor);
    spanEl.append(anchor);
  }

  containerDiv.append(spanEl);
  bannerContentDiv.append(containerDiv);
  wrapperDiv.append(bannerContentDiv);

  block.replaceChildren(wrapperDiv);
  block.classList.add('banner-section');
}
