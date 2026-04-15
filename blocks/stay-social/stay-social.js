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
  title.textContent = titleRow.firstElementChild.textContent.trim();
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
  subtext.textContent = subtextRow.firstElementChild.textContent.trim();
  container.append(subtext);

  // Main content wrapper for cards
  const main = document.createElement('div');
  main.classList.add('stay-social__main', 'mt-8');
  container.append(main);

  // Social Cards
  const cardsList = document.createElement('ul');
  cardsList.classList.add(
    'stay-social__cards',
    'd-grid',
    'gap-5',
    'gap-sm-8',
    'w-fit',
    'mx-auto',
  );

  cardRows.forEach((row) => {
    const [imageCell, linkCell, linkLabelCell] = [...row.children];

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    // The original HTML has 'ratio' class, which was missing in the generated JS.
    li.classList.add('stay-social__card', 'overflow-hidden', 'ratio');

    const cardLink = document.createElement('a');
    cardLink.classList.add('stay-social__card--link', 'd-block', 'w-100', 'h-100');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.target = '_blank'; // Assuming target="_blank" from original HTML
    }

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '600' }]); // Using 600px for source srcset media="(max-width:600px)"
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      cardLink.append(optimizedPic);
    }

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    cardLink.append(screenReaderSpan);

    li.append(cardLink);
    cardsList.append(li);
  });

  main.append(cardsList);

  // CTA button
  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add(
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'mt-8',
    'mt-lg-10',
  );

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
    ctaLink.target = '_blank'; // Assuming target="_blank" from original HTML
  }

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
  container.append(ctaWrapper);

  block.textContent = '';
  block.append(container);

  // Optimize images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
