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

  const section = document.createElement('section');
  section.classList.add('stay-social', 'pt-14', 'py-lg-11', 'bg-cream-300');
  moveInstrumentation(block, section);

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
  title.textContent = titleRow.firstElementChild.textContent.trim();
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
  subtext.textContent = subtextRow.firstElementChild.textContent.trim();
  container.append(subtext);

  // Social Cards
  if (cardRows.length > 0) {
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
      // Use content detection for cells as per EDS block structure guide
      const imageDesktopCell = cells.find((cell) => cell.querySelector('picture') && cell.textContent.includes('Card Image (Desktop)'));
      const imageMobileCell = cells.find((cell) => cell.querySelector('picture') && cell.textContent.includes('Card Image (Mobile)'));
      const linkCell = cells.find((cell) => cell.querySelector('a'));

      const li = document.createElement('li');
      li.classList.add('stay-social__card', 'overflow-hidden', 'ratio-1x1', 'ratio'); // ratio-1x1 is default, will be overridden by ratio-9x16 if present in original HTML
      moveInstrumentation(row, li);

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
        cardLink.target = '_blank'; // Assuming target blank from original HTML
      }

      const picture = document.createElement('picture');
      const imgDesktop = imageDesktopCell?.querySelector('img');
      const imgMobile = imageMobileCell?.querySelector('img');

      if (imgMobile) {
        const sourceMobile = document.createElement('source');
        sourceMobile.srcset = imgMobile.src;
        sourceMobile.media = '(max-width:600px)';
        picture.append(sourceMobile);
      }

      if (imgDesktop) {
        const optimizedPic = createOptimizedPicture(imgDesktop.src, imgDesktop.alt, false, [{ width: '750' }]);
        const optimizedImg = optimizedPic.querySelector('img');
        optimizedImg.classList.add(
          'stay-social__card--image',
          'w-100',
          'h-100',
          'object-fit-cover',
        );
        picture.append(optimizedImg);
      }

      cardLink.append(picture);

      const screenReaderOnly = document.createElement('span');
      screenReaderOnly.classList.add('cmp-link__screen-reader-only');
      screenReaderOnly.textContent = 'opens in a new tab';
      cardLink.append(screenReaderOnly);

      li.append(cardLink);
      cardsList.append(li);
    });
  }

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
    ctaLink.target = '_blank'; // Assuming target blank from original HTML
  }
  moveInstrumentation(ctaLinkRow, ctaLink);

  const ctaLabel = document.createElement('span');
  ctaLabel.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  moveInstrumentation(ctaLabelRow, ctaLabel);
  ctaLabel.textContent = ctaLabelRow.firstElementChild.textContent.trim();
  ctaLink.append(ctaLabel);

  const ctaScreenReaderOnly = document.createElement('span');
  ctaScreenReaderOnly.classList.add('cmp-link__screen-reader-only');
  ctaScreenReaderOnly.textContent = 'opens in a new tab';
  ctaLink.append(ctaScreenReaderOnly);

  ctaWrapper.append(ctaLink);

  block.replaceChildren(section);
}
