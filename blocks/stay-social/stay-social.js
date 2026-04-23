import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    subtitleRow,
    ctaLinkRow,
    ctaLabelRow,
    ...cardRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('stay-social', 'pt-14', 'py-lg-11', 'bg-cream-300');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');

  // Title
  const title = document.createElement('h2');
  title.classList.add('stay-social__title', 'font-24', 'leading-34', 'text-dark-gray-100', 'font-baskerville', 'font-sm-40', 'text-center', 'fw-bold');
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.textContent.trim();
  container.append(title);

  // Subtitle
  const subtitle = document.createElement('h3');
  subtitle.classList.add('stay-social__subtext', 'font-16', 'leading-24', 'text-dark-gray-100', 'font-sm-18', 'text-center', 'fw-medium', 'mt-4');
  moveInstrumentation(subtitleRow, subtitle);
  subtitle.textContent = subtitleRow.textContent.trim();
  container.append(subtitle);

  // Main content wrapper for cards
  const main = document.createElement('div');
  main.classList.add('stay-social__main', 'mt-8');

  const cardsList = document.createElement('ul');
  cardsList.classList.add('stay-social__cards', 'd-grid', 'gap-5', 'gap-sm-8', 'w-fit', 'mx-auto');

  cardRows.forEach((row) => {
    const cells = [...row.children];
    const imageMobileCell = cells.find(cell => cell.querySelector('picture') && cell.dataset.aueProp === 'imageMobile');
    const imageDesktopCell = cells.find(cell => cell.querySelector('picture') && cell.dataset.aueProp === 'imageDesktop');
    const linkCell = cells.find(cell => cell.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add('stay-social__card', 'overflow-hidden', 'ratio-1x1', 'ratio'); // Default ratio, adjust based on content

    const cardLink = document.createElement('a');
    cardLink.classList.add('stay-social__card--link', 'd-block', 'w-100', 'h-100');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.target = '_blank'; // Assuming external links open in new tab
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      cardLink.append(screenReaderSpan);
    }

    const picture = document.createElement('picture');
    const mobileImg = imageMobileCell?.querySelector('img');
    const desktopImg = imageDesktopCell?.querySelector('img');

    if (mobileImg) {
      const sourceMobile = document.createElement('source');
      sourceMobile.srcset = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '600' }]).querySelector('img').src;
      sourceMobile.media = '(max-width:600px)';
      picture.append(sourceMobile);
    }

    if (desktopImg) {
      const img = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]).querySelector('img');
      img.classList.add('stay-social__card--image', 'w-100', 'h-100', 'object-fit-cover');
      img.loading = 'lazy';
      picture.append(img);
      // Move instrumentation from one of the image cells, preferably the desktop one
      if (imageDesktopCell) {
        moveInstrumentation(imageDesktopCell, img);
      } else if (imageMobileCell) {
        moveInstrumentation(imageMobileCell, img);
      }
    }

    cardLink.prepend(picture);
    moveInstrumentation(row, li); // Move instrumentation from the row to the list item
    li.append(cardLink);
    cardsList.append(li);
  });

  main.append(cardsList);
  container.append(main);
  section.append(container);

  // CTA Link
  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'mt-8', 'mt-lg-10');

  const ctaAnchor = document.createElement('a');
  ctaAnchor.classList.add(
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
    ctaAnchor.href = foundCtaLink.href;
    ctaAnchor.target = '_blank'; // Assuming external links open in new tab
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    ctaAnchor.append(screenReaderSpan);
  }

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  ctaAnchor.prepend(ctaLabelSpan);

  moveInstrumentation(ctaLinkRow, ctaAnchor); // Move instrumentation from ctaLinkRow
  // No need to move instrumentation from ctaLabelRow to the same anchor again, it's already covered by ctaLinkRow
  // moveInstrumentation(ctaLabelRow, ctaAnchor); 

  ctaWrapper.append(ctaAnchor);
  section.append(ctaWrapper);

  block.replaceChildren(section);
}
