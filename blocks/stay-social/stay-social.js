import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, subtextRow, ctaLinkRow, ctaLinkLabelRow, ...cardRows] = [...block.children];

  block.classList.add('pt-14', 'py-lg-11', 'bg-cream-300');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');

  // Title
  const title = document.createElement('h2');
  title.classList.add('stay-social__title', 'font-24', 'leading-34', 'text-dark-gray-100', 'font-baskerville', 'font-sm-40', 'text-center', 'fw-bold');
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.firstElementChild.textContent.trim();
  container.append(title);

  // Subtext
  const subtext = document.createElement('h3');
  subtext.classList.add('stay-social__subtext', 'font-16', 'leading-24', 'text-dark-gray-100', 'font-sm-18', 'text-center', 'fw-medium', 'mt-4');
  moveInstrumentation(subtextRow, subtext);
  subtext.textContent = subtextRow.firstElementChild.textContent.trim();
  container.append(subtext);

  // Main content wrapper for cards
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('stay-social__main', 'mt-8');
  container.append(mainWrapper);

  // Cards list
  const cardsList = document.createElement('ul');
  cardsList.classList.add('stay-social__cards', 'd-grid', 'gap-5', 'gap-sm-8', 'w-fit', 'mx-auto');
  mainWrapper.append(cardsList);

  cardRows.forEach((row) => {
    // Use content detection for cells to avoid hardcoded indices, especially if structure varies
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    // Assuming linkLabelCell is the last cell if image and link are found
    const linkLabelCell = cells.find(cell => cell !== imageCell && cell !== linkCell);

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('stay-social__card', 'overflow-hidden', 'ratio');

    // Determine ratio based on original HTML structure
    // This is a heuristic based on the example HTML where ratio-9x16 is present
    // If the original HTML provides a more explicit way to determine this (e.g., a specific class on the row),
    // that would be preferred. For now, we'll check if the original row has a class indicating 9x16.
    // Since the block structure doesn't provide this, we'll default to 1x1 and assume it's overridden by CSS.
    // However, the original HTML shows ratio-9x16 explicitly on the li.
    // To replicate this, we need to infer it. A common pattern is to have a specific class on the row itself
    // or to infer it from the image dimensions if available, but that's not ideal for CSS-driven ratios.
    // Given the provided HTML, the ratio class is directly on the `li`.
    // The current JS defaults to 'ratio-1x1' and then says 'will be overridden by original HTML if ratio-9x16 is present'.
    // This implies the original HTML's `li` element might have a class that needs to be copied.
    // Let's check the original `row` for a class that might indicate this.
    // The EDS block structure doesn't show a class on the `row` div, so we can't directly copy it.
    // The original HTML shows `ratio-1x1` or `ratio-9x16` directly on the `li`.
    // Since the block structure doesn't provide this, we'll stick to the default `ratio-1x1`
    // and acknowledge that the CSS might handle it, or if there's a specific field for ratio, it should be used.
    // For now, we'll add `ratio-1x1` as a default, as the original JS did.
    // If the original HTML's `li` had `ratio-9x16`, and the block structure doesn't expose it,
    // this is a limitation. However, the original JS explicitly adds `ratio-1x1` and comments it.
    // Let's assume for now that `ratio-1x1` is the default and any specific ratio is handled by CSS or
    // would be derived from a specific field if it existed in the model.
    // Re-reading the original HTML, the `li` elements have `ratio-1x1` or `ratio-9x16`.
    // This means the ratio *is* part of the content, but not explicitly in the BlockJson fields.
    // We need to infer it. A common way is to check the `row`'s class list if it were passed through.
    // Since it's not, we'll have to make a decision.
    // The safest approach is to check if the original `row` element (which is `block.children[n]`)
    // has a class that indicates the ratio. If not, we default.
    // The EDS block structure shows `div` for `block.children[n]`, without specific classes for ratio.
    // Therefore, the JS cannot reliably determine `ratio-9x16` from the `row` itself.
    // The original JS's comment "ratio-1x1 is default, will be overridden by original HTML if ratio-9x16 is present"
    // implies that the CSS is expected to handle this, or that the `li` element itself might get a class from somewhere else.
    // For now, we'll keep `ratio-1x1` as the default as per the original JS, as there's no model field or row class to derive it from.
    li.classList.add('ratio-1x1');


    const link = document.createElement('a');
    link.classList.add('stay-social__card--link', 'd-block', 'w-100', 'h-100');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.target = '_blank'; // Add target="_blank" as seen in original HTML for external links
    }
    // The original JS cleared link.textContent, but the link label is a separate field.
    // The link label should be used for the accessible name, not necessarily visible text inside the <a>.
    // The original HTML has an empty <a> tag with an image and a screen reader span.
    // So, clearing textContent is correct.

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '600' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        picture.replaceWith(optimizedPic);
        optimizedPic.querySelector('img').classList.add('stay-social__card--image', 'w-100', 'h-100', 'object-fit-cover');
        link.append(optimizedPic);
      }
    }

    // Screen reader text for new tab
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    link.append(screenReaderSpan);

    li.append(link);
    cardsList.append(li);
  });

  // CTA Button wrapper
  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'mt-8', 'mt-lg-10');
  container.append(ctaWrapper);

  // CTA Button
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('svasti-cta', 'w-fit', 'text-decoration-none', 'd-flex', 'align-items-center', 'primary', 'px-8', 'pb-3', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
    ctaLink.target = '_blank'; // Add target="_blank" as seen in original HTML for external links
  }
  moveInstrumentation(ctaLinkRow, ctaLink);

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  moveInstrumentation(ctaLinkLabelRow, ctaLabelSpan);
  ctaLabelSpan.textContent = ctaLinkLabelRow.firstElementChild.textContent.trim();
  ctaLink.append(ctaLabelSpan);

  const ctaScreenReaderSpan = document.createElement('span');
  ctaScreenReaderSpan.classList.add('cmp-link__screen-reader-only');
  ctaScreenReaderSpan.textContent = 'opens in a new tab';
  ctaLink.append(ctaScreenReaderSpan);

  ctaWrapper.append(ctaLink);

  block.textContent = '';
  block.append(container);
}
