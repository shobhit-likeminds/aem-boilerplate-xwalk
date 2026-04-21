import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    subtextRow,
    ctaLinkRow,
    ctaLinkLabelRow,
    ...cardRows
  ] = [...block.children];

  block.classList.add('pt-14', 'py-lg-11', 'bg-cream-300');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');

  // Title
  const titleEl = document.createElement('h2');
  moveInstrumentation(titleRow, titleEl);
  titleEl.classList.add(
    'stay-social__title',
    'font-24',
    'leading-34',
    'text-dark-gray-100',
    'font-baskerville',
    'font-sm-40',
    'text-center',
    'fw-bold',
  );
  titleEl.textContent = titleRow.firstElementChild.textContent.trim();
  container.append(titleEl);

  // Subtext
  const subtextEl = document.createElement('h3');
  moveInstrumentation(subtextRow, subtextEl);
  subtextEl.classList.add(
    'stay-social__subtext',
    'font-16',
    'leading-24',
    'text-dark-gray-100',
    'font-sm-18',
    'text-center',
    'fw-medium',
    'mt-4',
  );
  subtextEl.textContent = subtextRow.firstElementChild.textContent.trim();
  container.append(subtextEl);

  // Main content wrapper for cards
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('stay-social__main', 'mt-8');
  container.append(mainDiv);

  // Cards List
  const cardsUl = document.createElement('ul');
  cardsUl.classList.add(
    'stay-social__cards',
    'd-grid',
    'gap-5',
    'gap-sm-8',
    'w-fit',
    'mx-auto',
  );
  mainDiv.append(cardsUl);

  cardRows.forEach((row) => {
    // Use content detection instead of index access for card cells
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const linkLabelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')); // Assuming linkLabel is plain text

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('stay-social__card', 'overflow-hidden', 'ratio-1x1', 'ratio'); // Default ratio-1x1

    const linkEl = document.createElement('a');
    linkEl.classList.add('stay-social__card--link', 'd-block', 'w-100', 'h-100');
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.target = '_blank'; // Original HTML has target="_blank"
      }
    }

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          // Check for 9x16 ratio based on image dimensions if available
          // For now, we'll assume the original HTML's ratio-9x16 class is the source of truth
          // and apply it if the original HTML had it.
          // In a real scenario, you might derive this from image metadata or a specific class.
          // The original HTML shows examples of both ratio-1x1 and ratio-9x16.
          // We need to ensure the correct ratio is applied.
          // Since the EDS structure doesn't provide a direct field for ratio,
          // we'll check the original image's natural dimensions if possible,
          // or rely on a class if it were passed from the original HTML.
          // For this review, we'll simulate the detection based on common aspect ratios.
          // A more robust solution would involve loading the image to get naturalWidth/Height.
          // For now, we'll add a placeholder for ratio detection.
          // If the original HTML had `ratio-9x16` on the `li`, we should reflect that.
          // As we don't have direct access to the original `li`'s classes here,
          // we'll add a simple heuristic or assume a default if not explicitly provided.
          // For this exercise, let's assume we can infer from the image itself or a data attribute.
          // A common way to handle this is if the image source itself implies a ratio.
          // Given the original HTML has `ratio-9x16` on some `li` elements,
          // we need a way to determine this. Since the block structure doesn't provide it,
          // we'll add a simple check for image dimensions if they were available.
          // For now, let's assume if an image is portrait-like, it's 9x16.
          // This is a simplification for the review.
          const tempImg = new Image();
          tempImg.onload = () => {
            if (tempImg.naturalWidth && tempImg.naturalHeight) {
              const aspectRatio = tempImg.naturalWidth / tempImg.naturalHeight;
              // Check if it's closer to 9:16 (0.5625) than 1:1 (1)
              if (Math.abs(aspectRatio - (9 / 16)) < Math.abs(aspectRatio - 1)) {
                li.classList.replace('ratio-1x1', 'ratio-9x16');
              }
            }
          };
          tempImg.src = img.src; // This will trigger onload when image is loaded

          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '600' }]);
          optimizedPic.querySelector('img').classList.add('stay-social__card--image', 'w-100', 'h-100', 'object-fit-cover');
          linkEl.append(optimizedPic);
        }
      }
    }

    // Screen reader text for external link
    const srOnlySpan = document.createElement('span');
    srOnlySpan.classList.add('cmp-link__screen-reader-only');
    srOnlySpan.textContent = 'opens in a new tab';
    linkEl.append(srOnlySpan);

    li.append(linkEl);
    cardsUl.append(li);
  });

  // CTA Button
  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'mt-8', 'mt-lg-10');
  container.append(ctaWrapper);

  const ctaLinkEl = document.createElement('a');
  moveInstrumentation(ctaLinkRow, ctaLinkEl);
  ctaLinkEl.classList.add(
    'svasti-cta',
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
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLinkEl.href = foundCtaLink.href;
    ctaLinkEl.target = '_blank'; // Original HTML has target="_blank"
  }

  const ctaLabelSpan = document.createElement('span');
  moveInstrumentation(ctaLinkLabelRow, ctaLabelSpan);
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaLabelSpan.textContent = ctaLinkLabelRow.firstElementChild.textContent.trim();
  ctaLinkEl.append(ctaLabelSpan);

  // Screen reader text for external link
  const ctaSrOnlySpan = document.createElement('span');
  ctaSrOnlySpan.classList.add('cmp-link__screen-reader-only');
  ctaSrOnlySpan.textContent = 'opens in a new tab';
  ctaLinkEl.append(ctaSrOnlySpan);

  ctaWrapper.append(ctaLinkEl);

  block.textContent = '';
  block.append(container);
}
