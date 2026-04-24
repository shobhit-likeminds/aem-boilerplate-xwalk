import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageDesktopRow,
    backgroundImageMobileRow,
    ...ctaItemRows
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

  // Background Image (Desktop)
  const desktopPicture = backgroundImageDesktopRow.querySelector('picture');
  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    const optimizedDesktopPic = createOptimizedPicture(
      desktopImg.src,
      desktopImg.alt,
      false,
      [{ media: '(min-width: 600px)', width: '1600' }],
    );
    moveInstrumentation(desktopPicture, optimizedDesktopPic.querySelector('img'));
    optimizedDesktopPic.classList.add(
      'd-block',
      'w-100',
      'h-100',
      'object-fit-cover',
      'banner-media',
    );
    wrapper.append(optimizedDesktopPic);
  }

  // Background Image (Mobile)
  const mobilePicture = backgroundImageMobileRow.querySelector('picture');
  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    const optimizedMobilePic = createOptimizedPicture(
      mobileImg.src,
      mobileImg.alt,
      false,
      [{ media: '(max-width: 599px)', width: '750' }],
    );
    moveInstrumentation(mobilePicture, optimizedMobilePic.querySelector('img'));
    optimizedMobilePic.classList.add(
      'd-block',
      'w-100',
      'h-100',
      'object-fit-cover',
      'banner-media',
    );
    // Insert mobile picture as the first child if both exist, so it can be picked by media query
    wrapper.prepend(optimizedMobilePic);
  }

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapper.append(overlayDiv);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('position-absolute', 'banner-content');

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

  const spanWrapper = document.createElement('span');
  spanWrapper.classList.add(
    'text-capitalize',
    'mt-6',
    'mt-md-3',
    'mt-lg-9',
    'mb-7',
  );

  ctaItemRows.forEach((row) => {
    // Use content detection instead of index access for CTA items
    const cells = [...row.children];
    const ctaLinkCell = cells.find(cell => cell.querySelector('a'));
    const ctaLabelCell = cells.find(cell => !cell.querySelector('a')); // Assuming the other cell is the label

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
      moveInstrumentation(row, anchor);
      spanWrapper.append(anchor);
    }
  });

  containerDiv.append(spanWrapper);
  contentDiv.append(containerDiv);
  wrapper.append(contentDiv);

  block.replaceChildren(wrapper);
}
