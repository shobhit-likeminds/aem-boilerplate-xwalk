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

  // Get image sources and alts
  const desktopImgElement = backgroundImageDesktopCell?.querySelector('picture img');
  const mobileImgElement = backgroundImageMobileCell?.querySelector('picture img');

  // Create optimized pictures for each source
  let optimizedDesktopPic;
  if (desktopImgElement) {
    optimizedDesktopPic = createOptimizedPicture(
      desktopImgElement.src,
      desktopImgElement.alt,
      false,
      [{ width: '1920' }],
    );
  }

  let optimizedMobilePic;
  if (mobileImgElement) {
    optimizedMobilePic = createOptimizedPicture(
      mobileImgElement.src,
      mobileImgElement.alt,
      false,
      [{ media: '(max-width:600px)', width: '600' }],
      [{ width: '1920' }], // Fallback for larger screens if mobile is primary
    );
  }

  // Combine desktop and mobile pictures into one <picture> element
  const combinedPicture = document.createElement('picture');
  combinedPicture.classList.add('d-block', 'w-100', 'h-100');

  // Add mobile source first for responsive loading
  if (optimizedMobilePic) {
    const mobileSource = optimizedMobilePic.querySelector('source[media="(max-width:600px)"]');
    if (mobileSource) {
      combinedPicture.append(mobileSource);
    }
  }

  // Add desktop source and img
  if (optimizedDesktopPic) {
    const desktopSource = optimizedDesktopPic.querySelector('source:not([media])');
    if (desktopSource) {
      combinedPicture.append(desktopSource);
    }
    const desktopImg = optimizedDesktopPic.querySelector('img');
    if (desktopImg) {
      desktopImg.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
      desktopImg.loading = 'eager';
      desktopImg.fetchPriority = 'high';
      combinedPicture.append(desktopImg);
    }
  } else if (optimizedMobilePic) { // Fallback if only mobile is provided, use its img
    const mobileImg = optimizedMobilePic.querySelector('img');
    if (mobileImg) {
      mobileImg.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
      mobileImg.loading = 'eager';
      mobileImg.fetchPriority = 'high';
      combinedPicture.append(mobileImg);
    }
  }

  // Move instrumentation from the original picture elements to the combined picture
  // This ensures the combined picture is tracked by the editor.
  if (backgroundImageDesktopCell) {
    moveInstrumentation(backgroundImageDesktopCell, combinedPicture);
  } else if (backgroundImageMobileCell) {
    moveInstrumentation(backgroundImageMobileCell, combinedPicture);
  }

  wrapper.append(combinedPicture);

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

  const spanWrapper = document.createElement('span');
  spanWrapper.classList.add(
    'text-capitalize',
    'mt-6',
    'mt-md-3',
    'mt-lg-9',
    'mb-7',
  );

  const ctaLink = ctaLinkCell?.querySelector('a');
  const ctaLabel = ctaLabelCell?.textContent.trim();

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

    moveInstrumentation(ctaLinkCell, anchor);
    moveInstrumentation(ctaLabelCell, labelSpan);
    spanWrapper.append(anchor);
  }

  container.append(spanWrapper);
  bannerContent.append(container);
  wrapper.append(bannerContent);

  // No need to moveInstrumentation from individual image cells to combinedPicture twice,
  // or from the original picture elements themselves after they've been processed.
  // The moveInstrumentation from backgroundImageDesktopCell (or MobileCell) to combinedPicture
  // already covers the entire image component.

  block.replaceChildren(wrapper);
}
