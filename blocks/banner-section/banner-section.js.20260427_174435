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

  // Background Image (Desktop)
  const desktopPictureCell = backgroundImageDesktopRow.children[0];
  const desktopPicture = desktopPictureCell.querySelector('picture');
  if (desktopPicture) {
    const img = desktopPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { media: '(min-width: 601px)', width: '1920' },
      { width: '1920' },
    ]);
    moveInstrumentation(desktopPictureCell, optimizedPic); // Move instrumentation from the cell
    optimizedPic.classList.add('d-block', 'w-100', 'h-100', 'object-fit-cover', 'banner-media'); // Apply classes from original HTML
    wrapper.append(optimizedPic);
  }

  // Background Image (Mobile)
  const mobilePictureCell = backgroundImageMobileRow.children[0];
  const mobilePicture = mobilePictureCell.querySelector('picture');
  if (mobilePicture) {
    const img = mobilePicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { media: '(max-width: 600px)', width: '768' },
      { width: '768' },
    ]);
    moveInstrumentation(mobilePictureCell, optimizedPic); // Move instrumentation from the cell
    optimizedPic.classList.add('d-block', 'w-100', 'h-100', 'object-fit-cover', 'banner-media'); // Apply classes from original HTML
    // Insert mobile picture as a source for the desktop picture if it exists, otherwise append
    const existingPicture = wrapper.querySelector('picture');
    if (existingPicture) {
      const mobileSource = optimizedPic.querySelector('source');
      if (mobileSource) {
        existingPicture.prepend(mobileSource);
      }
    } else {
      wrapper.append(optimizedPic);
    }
  }

  // Add the overlay div
  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapper.append(overlayDiv);

  // Create banner content div
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

  const span = document.createElement('span');
  span.classList.add(
    'text-capitalize',
    'mt-6',
    'mt-md-3',
    'mt-lg-9',
    'mb-7',
  );

  // CTA Link and Label
  const ctaLinkCell = ctaLinkRow.children[0];
  const ctaLinkElement = ctaLinkCell.querySelector('a');
  const ctaLabelCell = ctaLabelRow.children[0];
  const ctaLabelText = ctaLabelCell.textContent.trim();

  if (ctaLinkElement && ctaLabelText) {
    const ctaAnchor = document.createElement('a');
    ctaAnchor.href = ctaLinkElement.href;
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
    moveInstrumentation(ctaLinkCell, ctaAnchor); // Move instrumentation from ctaLinkCell

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    ctaLabelSpan.textContent = ctaLabelText;
    moveInstrumentation(ctaLabelCell, ctaLabelSpan); // Move instrumentation from ctaLabelCell

    ctaAnchor.append(ctaLabelSpan);
    span.append(ctaAnchor);
  }

  container.append(span);
  bannerContent.append(container);
  wrapper.append(bannerContent);

  block.replaceChildren(wrapper);
}
