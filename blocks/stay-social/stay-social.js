import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  section.classList.add('stay-social', 'pt-14', 'py-lg-11', 'bg-cream-300');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(container);

  // Fixed fields: title, subtext, ctaLabel, ctaLink
  // The model has title, subtext, cards (container), ctaLabel, ctaLink.
  // So the first 4 rows are fixed fields, and the rest are card rows.
  const titleRow = children[0];
  const subtextRow = children[1];
  const ctaLabelRow = children[2]; // This is actually the 4th field in the model, but 3rd row in block.children
  const ctaLinkRow = children[3]; // This is actually the 5th field in the model, but 4th row in block.children
  const cardRows = children.slice(4); // All remaining rows are card items

  // Title
  const title = document.createElement('h2');
  title.classList.add('stay-social__title', 'font-24', 'leading-34', 'text-dark-gray-100', 'font-baskerville', 'font-sm-40', 'text-center', 'fw-bold');
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.textContent.trim();
  container.append(title);

  // Subtext
  const subtext = document.createElement('h3');
  subtext.classList.add('stay-social__subtext', 'font-16', 'leading-24', 'text-dark-gray-100', 'font-sm-18', 'text-center', 'fw-medium', 'mt-4');
  moveInstrumentation(subtextRow, subtext);
  subtext.textContent = subtextRow.textContent.trim();
  container.append(subtext);

  // Main content wrapper for cards
  const staySocialMain = document.createElement('div');
  staySocialMain.classList.add('stay-social__main', 'mt-8');
  container.append(staySocialMain);

  // Cards list
  const cardsList = document.createElement('ul');
  cardsList.classList.add('stay-social__cards', 'd-grid', 'gap-5', 'gap-sm-8', 'w-fit', 'mx-auto');
  staySocialMain.append(cardsList);

  cardRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection for cells to avoid fragile index access
    const desktopImageCell = cells.find(cell => cell.querySelector('picture') && !cell.querySelector('source[media="(max-width:600px)"]'));
    const mobileImageCell = cells.find(cell => cell.querySelector('picture') && cell.querySelector('source[media="(max-width:600px)"]'));
    const cardLinkCell = cells.find(cell => cell.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add('stay-social__card', 'overflow-hidden', 'ratio-1x1', 'ratio'); // ratio-1x1 is default, will be overridden by JS if needed

    const cardLink = document.createElement('a');
    cardLink.classList.add('stay-social__card--link', 'd-block', 'w-100', 'h-100');
    const foundLink = cardLinkCell?.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.target = '_blank'; // Assuming all social links open in new tab
    }
    moveInstrumentation(cardLinkCell, cardLink); // Move instrumentation from original cardLinkCell to the new cardLink

    const picture = document.createElement('picture');
    const desktopImg = desktopImageCell?.querySelector('img');
    const mobileImg = mobileImageCell?.querySelector('img');

    if (mobileImg) {
      const sourceMobile = document.createElement('source');
      sourceMobile.srcset = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '600' }]).querySelector('img').src;
      sourceMobile.media = '(max-width:600px)';
      picture.append(sourceMobile);
    }

    let imgElement;
    if (desktopImg) {
      imgElement = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]).querySelector('img');
      imgElement.classList.add('stay-social__card--image', 'w-100', 'h-100', 'object-fit-cover');
      picture.append(imgElement);
      // No need to move instrumentation from desktopImageCell to imgElement, as cardLinkCell already covers the row's instrumentation.
      // moveInstrumentation(desktopImageCell, imgElement); // Removed: instrumentation is moved at the row level to li, and then to cardLink
    }

    // Determine aspect ratio based on image dimensions (if available) or default
    // The original HTML has both ratio-1x1 and ratio-9x16, so we should respect that.
    // The generated JS was removing ratio-9x16 if aspectRatio was not exactly 1.
    // We should only add/remove if we detect a specific ratio.
    if (imgElement && imgElement.naturalWidth && imgElement.naturalHeight) {
      const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;
      if (aspectRatio > 1.1) { // Landscape (more than 1:1)
        li.classList.remove('ratio-9x16'); // Ensure portrait is removed if it was there
        li.classList.add('ratio-1x1'); // Default to 1x1 for landscape
      } else if (aspectRatio < 0.9) { // Portrait (less than 1:1)
        li.classList.remove('ratio-1x1'); // Ensure square is removed if it was there
        li.classList.add('ratio-9x16');
      } else { // Close to square (between 0.9 and 1.1)
        li.classList.remove('ratio-9x16');
        li.classList.add('ratio-1x1');
      }
    }

    cardLink.append(picture);

    const screenReaderOnlySpan = document.createElement('span');
    screenReaderOnlySpan.classList.add('cmp-link__screen-reader-only');
    screenReaderOnlySpan.textContent = 'opens in a new tab';
    cardLink.append(screenReaderOnlySpan);

    li.append(cardLink);
    cardsList.append(li);
    moveInstrumentation(row, li); // Move instrumentation from original item row to the new li
  });

  // CTA button
  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'mt-8', 'mt-lg-10');
  section.append(ctaWrapper);

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('svasti-cta', 'w-fit', 'text-decoration-none', 'd-flex', 'align-items-center', 'primary', 'px-8', 'pb-3', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
  const foundCtaLink = ctaLinkRow?.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
    ctaLink.target = '_blank'; // Assuming CTA link also opens in new tab
  }
  moveInstrumentation(ctaLinkRow, ctaLink);

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  ctaLink.append(ctaLabelSpan);

  const ctaScreenReaderOnlySpan = document.createElement('span');
  ctaScreenReaderOnlySpan.classList.add('cmp-link__screen-reader-only');
  ctaScreenReaderOnlySpan.textContent = 'opens in a new tab';
  ctaLink.append(ctaScreenReaderOnlySpan);

  ctaWrapper.append(ctaLink);

  block.replaceChildren(section);
}
