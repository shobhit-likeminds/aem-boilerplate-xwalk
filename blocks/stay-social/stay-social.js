import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    subtextRow,
    ctaLinkRow,
    ctaLabelRow,
    ...cardRows
  ] = [...block.children];

  block.classList.add('pt-14', 'py-lg-11', 'bg-cream-300');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  moveInstrumentation(block, container);

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
    const [imageDesktopCell, imageMobileCell, cardLinkCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('stay-social__card', 'overflow-hidden', 'ratio-1x1', 'ratio');
    moveInstrumentation(row, li);

    const cardLink = document.createElement('a');
    cardLink.classList.add('stay-social__card--link', 'd-block', 'w-100', 'h-100');
    const foundLink = cardLinkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.target = '_blank'; // Original HTML has target="_blank"
    }

    const pictureDesktop = imageDesktopCell.querySelector('picture');
    const pictureMobile = imageMobileCell.querySelector('picture');

    if (pictureDesktop || pictureMobile) {
      const imgDesktop = pictureDesktop ? pictureDesktop.querySelector('img') : null;
      const imgMobile = pictureMobile ? pictureMobile.querySelector('img') : null;

      const picture = document.createElement('picture');

      if (imgMobile) {
        const sourceMobile = document.createElement('source');
        sourceMobile.srcset = imgMobile.src;
        sourceMobile.media = '(max-width:600px)';
        picture.append(sourceMobile);
      }

      if (imgDesktop) {
        const img = document.createElement('img');
        img.loading = 'lazy';
        img.classList.add('stay-social__card--image', 'w-100', 'h-100', 'object-fit-cover');
        img.src = imgDesktop.src;
        img.alt = imgDesktop.alt;
        picture.append(img);
      }
      cardLink.append(picture);
    }

    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    cardLink.append(screenReaderOnly);

    li.append(cardLink);
    cardsList.append(li);
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
    ctaLink.target = '_blank'; // Original HTML has target="_blank"
  }
  moveInstrumentation(ctaLinkRow, ctaLink);

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  ctaLink.append(ctaLabelSpan);

  const ctaScreenReaderOnly = document.createElement('span');
  ctaScreenReaderOnly.classList.add('cmp-link__screen-reader-only');
  ctaScreenReaderOnly.textContent = 'opens in a new tab';
  ctaLink.append(ctaScreenReaderOnly);

  ctaWrapper.append(ctaLink);

  block.replaceChildren(container);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
