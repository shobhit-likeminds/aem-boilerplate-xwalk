import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure all rows from block.children
  const rows = [...block.children];

  // Use content detection to find the correct rows
  const backgroundImageDesktopRow = rows.find(row => row.querySelector('picture') && !row.textContent.includes('Mobile'));
  const backgroundImageMobileRow = rows.find(row => row.querySelector('picture') && row.textContent.includes('Mobile'));
  const ctaLinkRow = rows.find(row => row.querySelector('a') && row.textContent.includes('/content/site/ctaLink'));
  const ctaLabelRow = rows.find(row => !row.querySelector('a') && row.textContent.trim() === 'CTA Label label text'); // Assuming a unique text for label

  // Main wrapper
  const wrapper = document.createElement('div');
  wrapper.classList.add(
    'position-relative',
    'banner-section__wrapper',
    'asp-ratio-9x16',
    'asp-ratio-sm-16x9',
    'd-flex',
    'justify-content-center',
  );
  moveInstrumentation(block, wrapper); // Move instrumentation from the block to the main wrapper

  // Background Picture
  let finalPictureElement = null;
  const desktopPictureCell = backgroundImageDesktopRow?.querySelector('div');
  const mobilePictureCell = backgroundImageMobileRow?.querySelector('div');

  if (desktopPictureCell) {
    // Create optimized picture from the desktop image cell
    const desktopImg = desktopPictureCell.querySelector('img');
    if (desktopImg) {
      const sources = [];
      if (mobilePictureCell) {
        const mobileImg = mobilePictureCell.querySelector('img');
        if (mobileImg) {
          sources.push({ media: '(max-width:600px)', srcset: mobileImg.src });
        }
      }
      sources.push({ srcset: desktopImg.src });

      finalPictureElement = createOptimizedPicture(desktopImg.src, desktopImg.alt || '', false, [
        { media: '(max-width:600px)', width: '600' },
        { width: '1200' },
      ]);
      finalPictureElement.classList.add('d-block', 'w-100', 'h-100');
      finalPictureElement.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
      finalPictureElement.querySelector('img').loading = 'eager';
      finalPictureElement.querySelector('img').fetchPriority = 'high';

      // Move instrumentation from original picture cells to the optimized picture
      if (backgroundImageDesktopRow) {
        moveInstrumentation(backgroundImageDesktopRow, finalPictureElement);
      }
      if (backgroundImageMobileRow) {
        moveInstrumentation(backgroundImageMobileRow, finalPictureElement);
      }
    }
  }

  if (finalPictureElement) {
    wrapper.appendChild(finalPictureElement);
  }

  // Overlay div
  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapper.appendChild(overlayDiv);

  // Banner Content
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
  span.classList.add('text-capitalize', 'mt-6', 'mt-md-3', 'mt-lg-9', 'mb-7');

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
    anchor.appendChild(labelSpan);

    moveInstrumentation(ctaLinkRow, anchor);
    moveInstrumentation(ctaLabelRow, labelSpan);

    span.appendChild(anchor);
  }

  container.appendChild(span);
  bannerContent.appendChild(container);
  wrapper.appendChild(bannerContent);

  block.replaceChildren(wrapper);
}
