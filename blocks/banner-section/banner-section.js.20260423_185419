import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children directly as per EDS BLOCK STRUCTURE
  const [
    desktopImageRow, // block.children[0]
    mobileImageRow,  // block.children[1]
    ctaLinkRow,      // block.children[2]
    ctaLabelRow,     // block.children[3]
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
  // moveInstrumentation for the block itself, as it's the root element being replaced
  moveInstrumentation(block, wrapper);

  // Picture element
  const picture = document.createElement('picture');
  picture.classList.add('d-block', 'w-100', 'h-100');

  // Access the img element within the cell
  const desktopImg = desktopImageRow?.querySelector('img');
  const mobileImg = mobileImageRow?.querySelector('img');

  if (mobileImg) {
    const sourceMobile = document.createElement('source');
    sourceMobile.media = '(max-width:600px)';
    sourceMobile.srcset = mobileImg.src;
    picture.append(sourceMobile);
    // moveInstrumentation for the row that contained the mobile image
    moveInstrumentation(mobileImageRow, sourceMobile);
  }

  if (desktopImg) {
    const sourceDesktop = document.createElement('source');
    sourceDesktop.srcset = desktopImg.src;
    picture.append(sourceDesktop);
    // moveInstrumentation for the row that contained the desktop image
    moveInstrumentation(desktopImageRow, sourceDesktop);

    const img = document.createElement('img');
    img.src = desktopImg.src;
    img.alt = desktopImg.alt || '';
    img.loading = 'eager';
    img.fetchPriority = 'high';
    img.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
    picture.append(img);
  }

  // Optimize images
  picture.querySelectorAll('img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    // moveInstrumentation for the original img element to the new optimized img
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  wrapper.append(picture);

  // Overlay div
  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapper.append(overlayDiv);

  // Banner content
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

  // Access the a element within the ctaLinkRow
  const ctaLink = ctaLinkRow?.querySelector('a');
  // Access the text content from the ctaLabelRow
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
    // moveInstrumentation for the row that contained the CTA link
    moveInstrumentation(ctaLinkRow, anchor);

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    labelSpan.textContent = ctaLabel;
    // moveInstrumentation for the row that contained the CTA label
    moveInstrumentation(ctaLabelRow, labelSpan);

    anchor.append(labelSpan);
    span.append(anchor);
  }

  container.append(span);
  bannerContent.append(container);
  wrapper.append(bannerContent);

  block.replaceChildren(wrapper);
  block.classList.add('banner-section');
}
