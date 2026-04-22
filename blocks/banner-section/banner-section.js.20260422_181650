import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure all rows from the block
  const [
    backgroundImageDesktopRow,
    backgroundImageMobileRow,
    ctaLinkRow,
    ctaLabelRow,
  ] = [...block.children];

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
  moveInstrumentation(block, wrapper); // Move instrumentation from the block itself to the main wrapper

  // Background Picture
  const picture = document.createElement('picture');
  picture.classList.add('d-block', 'w-100', 'h-100');

  // Use content detection for image cells
  const desktopImageCell = [...backgroundImageDesktopRow.children].find(cell => cell.querySelector('img'));
  const mobileImageCell = [...backgroundImageMobileRow.children].find(cell => cell.querySelector('img'));

  const desktopImage = desktopImageCell ? desktopImageCell.querySelector('img') : null;
  const mobileImage = mobileImageCell ? mobileImageCell.querySelector('img') : null;

  if (mobileImage) {
    const sourceMobile = document.createElement('source');
    sourceMobile.media = '(max-width:600px)';
    sourceMobile.srcset = mobileImage.src;
    picture.appendChild(sourceMobile);
    moveInstrumentation(mobileImageCell, sourceMobile); // Move instrumentation for mobile image cell
  }

  if (desktopImage) {
    const sourceDesktop = document.createElement('source');
    sourceDesktop.srcset = desktopImage.src;
    picture.appendChild(sourceDesktop);

    const img = document.createElement('img');
    img.src = desktopImage.src;
    img.loading = 'eager';
    img.fetchPriority = 'high';
    img.alt = desktopImage.alt;
    img.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
    picture.appendChild(img);

    // Optimize the image
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { media: '(max-width:600px)', width: '600' },
      { width: '1200' },
    ]);
    // The optimizedPic replaces the original picture element, so instrumentation should be moved to the new img
    moveInstrumentation(desktopImageCell, optimizedPic.querySelector('img'));
    picture.replaceWith(optimizedPic);
  }

  wrapper.appendChild(picture);

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

  // Use content detection for CTA link and label cells
  const ctaLinkCell = [...ctaLinkRow.children].find(cell => cell.querySelector('a'));
  const ctaLabelCell = [...ctaLabelRow.children].find(cell => !cell.querySelector('a')); // Assuming label is plain text

  const ctaLink = ctaLinkCell ? ctaLinkCell.querySelector('a') : null;
  const ctaLabel = ctaLabelCell ? ctaLabelCell.textContent.trim() : '';

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
    moveInstrumentation(ctaLinkCell, anchor); // Move instrumentation for CTA link cell

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    labelSpan.textContent = ctaLabel;
    moveInstrumentation(ctaLabelCell, labelSpan); // Move instrumentation for CTA label cell

    anchor.appendChild(labelSpan);
    span.appendChild(anchor);
  }

  container.appendChild(span);
  bannerContent.appendChild(container);
  wrapper.appendChild(bannerContent);

  block.replaceChildren(wrapper);
}
