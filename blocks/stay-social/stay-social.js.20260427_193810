import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, subtextRow, ctaLabelRow, ctaLinkRow, ...cardRows] = [
    ...block.children,
  ];

  const section = document.createElement('section');
  section.classList.add('stay-social', 'pt-14', 'py-lg-11', 'bg-cream-300');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(container);

  // Title
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

  // Subtext
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

  // Main cards container
  const main = document.createElement('div');
  main.classList.add('stay-social__main', 'mt-8');
  container.append(main);

  const cardsList = document.createElement('ul');
  cardsList.classList.add(
    'stay-social__cards',
    'd-grid',
    'gap-5',
    'gap-sm-8',
    'w-fit',
    'mx-auto',
  );
  main.append(cardsList);

  cardRows.forEach((row) => {
    const cells = [...row.children];
    const imageDesktopCell = cells.find(cell => cell.querySelector('picture') && !cell.querySelector('source[media="(max-width:600px)"]'));
    const imageMobileCell = cells.find(cell => cell.querySelector('picture') && cell.querySelector('source[media="(max-width:600px)"]'));
    const cardLinkCell = cells.find(cell => cell.querySelector('a'));

    const cardLi = document.createElement('li');
    cardLi.classList.add('stay-social__card', 'overflow-hidden', 'ratio-1x1', 'ratio'); // Default ratio, will be overridden by CSS if needed

    const cardLink = document.createElement('a');
    cardLink.classList.add(
      'stay-social__card--link',
      'd-block',
      'w-100',
      'h-100',
    );
    const foundCardLink = cardLinkCell?.querySelector('a');
    if (foundCardLink) {
      cardLink.href = foundCardLink.href;
      cardLink.target = '_blank'; // Assuming external links open in new tab
      const screenReaderOnly = document.createElement('span');
      screenReaderOnly.classList.add('cmp-link__screen-reader-only');
      screenReaderOnly.textContent = 'opens in a new tab';
      cardLink.append(screenReaderOnly);
    }
    moveInstrumentation(row, cardLi); // Move instrumentation from row to li
    cardLi.append(cardLink);

    const picture = document.createElement('picture');
    const desktopImg = imageDesktopCell?.querySelector('img');
    const mobileImg = imageMobileCell?.querySelector('img');

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
    }
    cardLink.prepend(picture);
    cardsList.append(cardLi);
  });

  // CTA button
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
    ctaLink.target = '_blank'; // Assuming external links open in new tab
    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    ctaLink.append(screenReaderOnly);
  }

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add(
    'svasti-cta__label',
    'fw-semibold',
    'fs-default',
    'leading-26',
  );
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  ctaLink.prepend(ctaLabelSpan);
  ctaWrapper.append(ctaLink);

  block.replaceChildren(section);
}
