import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [
    titleRow,
    subtextRow,
    ctaLinkRow,
    ctaLabelRow,
    ...cardRows
  ] = children;

  block.classList.add('pt-14', 'py-lg-11', 'bg-cream-300');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');

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
    const [desktopImageCell, mobileImageCell, linkCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('stay-social__card', 'overflow-hidden');

    const link = document.createElement('a');
    link.classList.add('stay-social__card--link', 'd-block', 'w-100', 'h-100');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.target = '_blank'; // Assuming all social links open in new tab
    }
    moveInstrumentation(row, link);

    const picture = document.createElement('picture');
    const desktopImg = desktopImageCell.querySelector('img');
    const mobileImg = mobileImageCell.querySelector('img');

    if (mobileImg) {
      const source = document.createElement('source');
      source.srcset = mobileImg.src;
      source.media = '(max-width:600px)';
      picture.append(source);
    }

    if (desktopImg) {
      const img = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
      const optimizedImg = img.querySelector('img');
      optimizedImg.classList.add('stay-social__card--image', 'w-100', 'h-100', 'object-fit-cover');
      optimizedImg.loading = 'lazy';
      picture.append(optimizedImg);
    }

    link.append(picture);

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    link.append(screenReaderSpan);

    li.append(link);
    cardsList.append(li);

    // Determine ratio based on original HTML for the specific card
    const originalLi = row.parentElement.querySelector(`li:nth-child(${Array.from(cardsList.children).indexOf(li) + 1})`);
    if (originalLi) {
      if (originalLi.classList.contains('ratio-1x1')) {
        li.classList.add('ratio-1x1', 'ratio');
      } else if (originalLi.classList.contains('ratio-9x16')) {
        li.classList.add('ratio-9x16', 'ratio');
      }
    } else {
      // Fallback to default if original HTML structure is not found or ratio is missing
      li.classList.add('ratio-1x1', 'ratio');
    }
  });

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
    ctaLink.target = '_blank'; // Assuming CTA link also opens in new tab
  }
  moveInstrumentation(ctaLinkRow, ctaLink);

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaLink.append(ctaLabelSpan);

  const ctaScreenReaderSpan = document.createElement('span');
  ctaScreenReaderSpan.classList.add('cmp-link__screen-reader-only');
  ctaScreenReaderSpan.textContent = 'opens in a new tab';
  ctaLink.append(ctaScreenReaderSpan);

  ctaWrapper.append(ctaLink);

  block.replaceChildren(container);
}
