import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [
    titleRow,
    subtextRow,
    ctaLabelRow,
    ctaLinkRow,
    ...cardRows
  ] = children;

  const section = document.createElement('section');
  section.classList.add('stay-social', 'pt-14', 'py-lg-11', 'bg-cream-300');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(container);

  // Section Title
  const title = document.createElement('h2');
  title.classList.add(
    'stay-social__title',
    'font-24',
    'leading-34',
    'text-dark-gray-100',
    'font-baskerville',
    'font-sm-40',
    'text-center',
    'fw-bold',
  );
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.textContent.trim();
  container.append(title);

  // Section Subtext
  const subtext = document.createElement('h3');
  subtext.classList.add(
    'stay-social__subtext',
    'font-16',
    'leading-24',
    'text-dark-gray-100',
    'font-sm-18',
    'text-center',
    'fw-medium',
    'mt-4',
  );
  moveInstrumentation(subtextRow, subtext);
  subtext.textContent = subtextRow.textContent.trim();
  container.append(subtext);

  // Social Cards
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('stay-social__main', 'mt-8');
  container.append(mainDiv);

  const cardsList = document.createElement('ul');
  cardsList.classList.add(
    'stay-social__cards',
    'd-grid',
    'gap-5',
    'gap-sm-8',
    'w-fit',
    'mx-auto',
  );
  mainDiv.append(cardsList);

  cardRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection for images and links
    const desktopImageCell = cells.find((cell) => cell.querySelector('picture') && !cell.querySelector('source[media="(max-width:600px)"]'));
    const mobileImageCell = cells.find((cell) => cell.querySelector('picture') && cell.querySelector('source[media="(max-width:600px)"]'));
    const linkCell = cells.find((cell) => cell.querySelector('a'));

    const listItem = document.createElement('li');
    listItem.classList.add(
      'stay-social__card',
      'overflow-hidden',
      'ratio-1x1', // Default ratio, will be overridden by CSS if needed
      'ratio',
    );
    moveInstrumentation(row, listItem);

    const cardLink = document.createElement('a');
    cardLink.classList.add(
      'stay-social__card--link',
      'd-block',
      'w-100',
      'h-100',
    );
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.target = '_blank'; // Original HTML has target="_blank"
    }

    const picture = document.createElement('picture');
    const desktopImg = desktopImageCell?.querySelector('img');
    const mobileImg = mobileImageCell?.querySelector('img');

    if (mobileImg) {
      const source = document.createElement('source');
      source.srcset = mobileImg.src;
      source.media = '(max-width:600px)';
      picture.append(source);
    }

    if (desktopImg) {
      const img = createOptimizedPicture(
        desktopImg.src,
        desktopImg.alt,
        false,
        [{ width: '750' }],
      ).querySelector('img');
      img.classList.add(
        'stay-social__card--image',
        'w-100',
        'h-100',
        'object-fit-cover',
      );
      img.loading = 'lazy';
      picture.append(img);
      moveInstrumentation(desktopImageCell, img); // Move instrumentation from desktop image cell to the new img
    }

    cardLink.append(picture);

    // Add screen reader text for external links
    if (cardLink.target === '_blank') {
      const srOnlySpan = document.createElement('span');
      srOnlySpan.classList.add('cmp-link__screen-reader-only');
      srOnlySpan.textContent = 'opens in a new tab';
      cardLink.append(srOnlySpan);
    }

    listItem.append(cardLink);
    cardsList.append(listItem);
  });

  // CTA Button
  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add(
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'mt-8',
    'mt-lg-10',
  );
  section.append(ctaWrapper);

  const ctaLink = document.createElement('a');
  ctaLink.classList.add(
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
    ctaLink.href = foundCtaLink.href;
    ctaLink.target = '_blank'; // Original HTML has target="_blank"
  }
  moveInstrumentation(ctaLinkRow, ctaLink);

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add(
    'svasti-cta__label',
    'fw-semibold',
    'fs-default',
    'leading-26',
  );
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  ctaLink.append(ctaLabelSpan);

  // Add screen reader text for external links
  if (ctaLink.target === '_blank') {
    const srOnlySpan = document.createElement('span');
    srOnlySpan.classList.add('cmp-link__screen-reader-only');
    srOnlySpan.textContent = 'opens in a new tab';
    ctaLink.append(srOnlySpan);
  }

  ctaWrapper.append(ctaLink);

  block.replaceChildren(section);
}
