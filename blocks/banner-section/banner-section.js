import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure all rows from block.children
  const rows = [...block.children];

  // Use content detection to find specific cells based on their content type
  const backgroundImageMobileCell = rows.find((row) => row.querySelector('picture') && row.textContent.includes('Background Image (Mobile)'));
  const backgroundImageDesktopCell = rows.find((row) => row.querySelector('picture') && row.textContent.includes('Background Image (Desktop)'));
  const ctaLinkCell = rows.find((row) => row.querySelector('a') && row.textContent.includes('/content/site/ctaLink'));
  const ctaLabelCell = rows.find((row) => !row.querySelector('a') && row.textContent.includes('CTA Label label text'));

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

  const pictureElement = document.createElement('picture');
  pictureElement.classList.add('d-block', 'w-100', 'h-100');

  const mobileImg = backgroundImageMobileCell?.querySelector('img');
  const desktopImg = backgroundImageDesktopCell?.querySelector('img');

  if (mobileImg) {
    const sourceMobile = document.createElement('source');
    sourceMobile.media = '(max-width:600px)';
    sourceMobile.srcset = mobileImg.src;
    pictureElement.appendChild(sourceMobile);
    moveInstrumentation(backgroundImageMobileCell, sourceMobile); // Move instrumentation for mobile image cell
  }

  if (desktopImg) {
    const sourceDesktop = document.createElement('source');
    sourceDesktop.srcset = desktopImg.src;
    pictureElement.appendChild(sourceDesktop);

    const img = document.createElement('img');
    img.src = desktopImg.src;
    img.loading = 'eager';
    img.fetchPriority = 'high';
    img.alt = desktopImg.alt || '';
    img.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
    pictureElement.appendChild(img);
    moveInstrumentation(backgroundImageDesktopCell, img); // Move instrumentation for desktop image cell
  }

  // Optimize images
  pictureElement.querySelectorAll('img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    // createOptimizedPicture returns a <picture> element, we need to replace the original <img> within its parent <picture>
    // The original img is already inside pictureElement, so we replace it directly.
    img.replaceWith(optimizedPic.querySelector('img'));
    // moveInstrumentation should be called on the original img element, and the new optimized img element
    // However, createOptimizedPicture already handles this internally for the new img.
    // We just need to ensure the original img's instrumentation is moved if it was a root element.
    // In this case, the img is nested, so its parent cell's instrumentation is moved when the source/img elements are created.
  });

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');

  wrapper.appendChild(pictureElement);
  wrapper.appendChild(overlayDiv);

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
    moveInstrumentation(ctaLinkCell, anchor); // Move instrumentation for the CTA link cell

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    labelSpan.textContent = ctaLabel;
    moveInstrumentation(ctaLabelCell, labelSpan); // Move instrumentation for the CTA label cell

    anchor.appendChild(labelSpan);
    span.appendChild(anchor);
  }

  container.appendChild(span);
  bannerContent.appendChild(container);
  wrapper.appendChild(bannerContent);

  block.replaceChildren(wrapper);
}
