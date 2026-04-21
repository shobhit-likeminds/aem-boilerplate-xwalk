import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    subtextRow,
    ctaLabelRow,
    ctaLinkRow,
    ...socialCardRows
  ] = [...block.children];

  // Create main container
  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  moveInstrumentation(block, container); // Move block instrumentation to the new container

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

  // Social cards section
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('stay-social__main', 'mt-8');
  container.append(mainWrapper);

  const cardsList = document.createElement('ul');
  cardsList.classList.add(
    'stay-social__cards',
    'd-grid',
    'gap-5',
    'gap-sm-8',
    'w-fit',
    'mx-auto',
  );
  mainWrapper.append(cardsList);

  socialCardRows.forEach((row) => {
    const [imageCell, linkCell] = [...row.children];

    const listItem = document.createElement('li');
    listItem.classList.add('stay-social__card', 'overflow-hidden', 'ratio-1x1', 'ratio'); // ratio-1x1 is default, will be overridden by original HTML if needed

    const linkEl = document.createElement('a');
    linkEl.classList.add(
      'stay-social__card--link',
      'd-block',
      'w-100',
      'h-100',
    );
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank'; // Add target="_blank" as per original HTML
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      linkEl.append(screenReaderSpan);
    }
    moveInstrumentation(row, listItem); // Move instrumentation from row to listItem

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        linkEl.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add(
          'stay-social__card--image',
          'w-100',
          'h-100',
          'object-fit-cover',
        );
      }
    }

    listItem.append(linkEl);
    cardsList.append(listItem);
  });

  // CTA button section
  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add(
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'mt-8',
    'mt-lg-10',
  );
  container.append(ctaWrapper);

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
    ctaLink.target = '_blank'; // Add target="_blank" as per original HTML
  }
  moveInstrumentation(ctaLinkRow, ctaLink);

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  ctaLink.append(ctaLabelSpan);

  const screenReaderSpan = document.createElement('span');
  screenReaderSpan.classList.add('cmp-link__screen-reader-only');
  screenReaderSpan.textContent = 'opens in a new tab';
  ctaLink.append(screenReaderSpan);

  ctaWrapper.append(ctaLink);

  // Replace the original block content with the new structure
  block.replaceChildren(container);

  block.classList.add('pt-14', 'py-lg-11', 'bg-cream-300');
}
