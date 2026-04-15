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

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0');

  // Title
  const title = document.createElement('h2');
  title.classList.add('stay-social__title', 'font-24', 'leading-34', 'text-dark-gray-100', 'font-baskerville', 'font-sm-40', 'text-center', 'fw-bold');
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.firstElementChild.textContent.trim();
  containerDiv.append(title);

  // Subtext
  const subtext = document.createElement('h3');
  subtext.classList.add('stay-social__subtext', 'font-16', 'leading-24', 'text-dark-gray-100', 'font-sm-18', 'text-center', 'fw-medium', 'mt-4');
  moveInstrumentation(subtextRow, subtext);
  subtext.textContent = subtextRow.firstElementChild.textContent.trim();
  containerDiv.append(subtext);

  // Main content div for cards
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('stay-social__main', 'mt-8');

  // Cards list
  const ul = document.createElement('ul');
  ul.classList.add('stay-social__cards', 'd-grid', 'gap-5', 'gap-sm-8', 'w-fit', 'mx-auto');

  cardRows.forEach((row) => {
    const [imageCell, linkCell, linkLabelCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('stay-social__card', 'overflow-hidden', 'ratio-1x1', 'ratio'); // ratio-1x1 is default, will be overridden by JS if 9x16

    const cardLink = document.createElement('a');
    cardLink.classList.add('stay-social__card--link', 'd-block', 'w-100', 'h-100');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.target = '_blank'; // Assuming all social links open in new tab
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      cardLink.append(screenReaderSpan);
    }
    // Prepend label to link
    const cardLabelSpan = document.createElement('span');
    cardLabelSpan.textContent = linkLabelCell.textContent.trim();
    cardLink.prepend(cardLabelSpan);


    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '600' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        picture.replaceWith(optimizedPic);
        optimizedPic.querySelector('img').classList.add('stay-social__card--image', 'w-100', 'h-100', 'object-fit-cover');

        // Determine aspect ratio from image dimensions or src (if available)
        // This is a simplified approach, actual ratio detection might be more complex
        const imgWidth = img.width || 1; // Default to 1 to avoid division by zero
        const imgHeight = img.height || 1;
        if (imgWidth && imgHeight) {
          const aspectRatio = imgWidth / imgHeight;
          if (aspectRatio < 1) { // Portrait, e.g., 9x16
            li.classList.remove('ratio-1x1');
            li.classList.add('ratio-9x16');
          }
        }
      }
      cardLink.prepend(picture); // Prepend optimized picture
    }

    moveInstrumentation(row, li);
    li.append(cardLink);
    ul.append(li);
  });
  mainDiv.append(ul);
  containerDiv.append(mainDiv);

  // CTA button
  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'mt-8', 'mt-lg-10');

  const ctaLink = document.createElement('a');
  ctaLink.classList.add(
    'svasti-cta', 'w-fit', 'text-decoration-none', 'd-flex', 'align-items-center',
    'primary', 'px-8', 'pb-3', 'text-cream-100', 'border', 'border-2', 'border-red-100',
    'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover',
    'bg-red-300-active',
  );
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
    ctaLink.target = '_blank'; // Assuming CTA also opens in new tab
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    ctaLink.append(screenReaderSpan);
  }

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaLabelSpan.textContent = ctaLinkLabelRow.firstElementChild.textContent.trim();
  ctaLink.prepend(ctaLabelSpan); // Prepend label to link

  moveInstrumentation(ctaLinkRow, ctaLink);
  ctaWrapper.append(ctaLink);

  block.textContent = '';
  block.classList.add('pt-14', 'py-lg-11', 'bg-cream-300'); // Add block-level classes
  block.append(containerDiv, ctaWrapper);
}
