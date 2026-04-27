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
  moveInstrumentation(block, section);

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

  // Subtitle
  const subtitle = document.createElement('h3');
  subtitle.classList.add(
    'stay-social__subtext',
    'font-16',
    'leading-24',
    'text-dark-gray-100',
    'font-sm-18',
    'text-center',
    'fw-medium',
    'mt-4',
  );
  moveInstrumentation(subtitleRow, subtitle);
  subtitle.textContent = subtitleRow.textContent.trim();
  container.append(subtitle);

  // Main content area for cards
  const main = document.createElement('div');
  main.classList.add('stay-social__main', 'mt-8');
  container.append(main);

  // Cards list
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
    // Use content detection instead of index access for robustness
    const cardLinkCell = cells.find((cell) => cell.querySelector('a'));
    const imageDesktopCell = cells.find((cell) => cell.querySelector('picture') && !cell.querySelector('picture source[media="(max-width: 600px)"]'));
    const imageMobileCell = cells.find((cell) => cell.querySelector('picture source[media="(max-width: 600px)"]'));

    const li = document.createElement('li');
    li.classList.add(
      'stay-social__card',
      'overflow-hidden',
      'ratio-1x1', // Default, might be overridden by content
      'ratio',
    );
    moveInstrumentation(row, li);

    const cardLink = document.createElement('a');
    cardLink.classList.add(
      'stay-social__card--link',
      'd-block',
      'w-100',
      'h-100',
    );
    if (cardLinkCell) {
      const foundLink = cardLinkCell.querySelector('a');
      if (foundLink) {
        cardLink.href = foundLink.href;
        cardLink.target = '_blank'; // Assuming all social links open in new tab
      }
    }

    const pictureDesktop = imageDesktopCell ? imageDesktopCell.querySelector('picture') : null;
    const pictureMobile = imageMobileCell ? imageMobileCell.querySelector('picture') : null;

    if (pictureDesktop && pictureMobile) {
      const imgDesktop = pictureDesktop.querySelector('img');
      const imgMobileSource = pictureMobile.querySelector('source[media="(max-width: 600px)"]');

      if (imgDesktop && imgMobileSource) {
        const optimizedPicture = createOptimizedPicture(
          imgDesktop.src,
          imgDesktop.alt,
          false,
          [
            { media: '(max-width: 600px)', width: '600', src: imgMobileSource.srcset },
            { width: '750' },
          ],
        );
        optimizedPicture.querySelector('img').classList.add(
          'stay-social__card--image',
          'w-100',
          'h-100',
          'object-fit-cover',
        );
        cardLink.append(optimizedPicture);
      }
    } else if (pictureDesktop) {
      const imgDesktop = pictureDesktop.querySelector('img');
      if (imgDesktop) {
        const optimizedPicture = createOptimizedPicture(
          imgDesktop.src,
          imgDesktop.alt,
          false,
          [{ width: '750' }],
        );
        optimizedPicture.querySelector('img').classList.add(
          'stay-social__card--image',
          'w-100',
          'h-100',
          'object-fit-cover',
        );
        cardLink.append(optimizedPicture);
      }
    }

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    cardLink.append(screenReaderSpan);

    li.append(cardLink);
    cardsList.append(li);
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
  moveInstrumentation(ctaLinkRow, ctaLink);

  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
    ctaLink.target = '_blank'; // Assuming CTA also opens in new tab
  }

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  ctaLink.append(ctaLabelSpan);

  const ctaScreenReaderSpan = document.createElement('span');
  ctaScreenReaderSpan.classList.add('cmp-link__screen-reader-only');
  ctaScreenReaderSpan.textContent = 'opens in a new tab';
  ctaLink.append(ctaScreenReaderSpan);

  ctaWrapper.append(ctaLink);

  block.replaceChildren(section);
}
