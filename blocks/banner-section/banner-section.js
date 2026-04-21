import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const [bannerImageRow, ...ctaRows] = children;

  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative', 'banner-section__wrapper', 'asp-ratio-9x16', 'asp-ratio-sm-16x9', 'd-flex', 'justify-content-center');

  // Banner Image
  const pictureCell = bannerImageRow.firstElementChild;
  const picture = pictureCell?.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '600', media: '(max-width:600px)' }, { width: '1920' }]);
      // Move instrumentation from the original img to the new optimized img
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      picture.replaceWith(optimizedPic);
      optimizedPic.classList.add('d-block', 'w-100', 'h-100');
      optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
      wrapper.append(optimizedPic);
    }
  }

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapper.append(overlayDiv);

  const bannerContent = document.createElement('div');
  bannerContent.classList.add('position-absolute', 'banner-content');

  const container = document.createElement('div');
  container.classList.add('container', 'sticky-element', 'gx-8', 'gx-lg-0', 'd-flex', 'justify-content-center', 'align-items-center', 'flex-column', 'start-0', 'end-0', 'bottom-0');

  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add('text-capitalize', 'mt-6', 'mt-md-3', 'mt-lg-9', 'mb-7');

  ctaRows.forEach((row) => {
    // Use content detection instead of fixed indices
    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('a')); // Label cell contains plain text
    const linkCell = cells.find(cell => cell.querySelector('a'));   // Link cell contains an <a> tag

    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
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

    const labelSpan = document.createElement('span');
    labelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    labelSpan.textContent = labelCell?.textContent.trim() || '';
    anchor.append(labelSpan);

    moveInstrumentation(row, anchor); // Move instrumentation from the original row to the new anchor
    ctaSpan.append(anchor);
  });

  container.append(ctaSpan);
  bannerContent.append(container);
  wrapper.append(bannerContent);

  // Replace the block content with the new structure
  block.replaceChildren(wrapper);
  block.classList.add('banner-section');
}
