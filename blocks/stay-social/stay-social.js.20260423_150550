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

  // Main content for cards
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
    const [imageMobileCell, imageDesktopCell, linkCell] = [...row.children];

    const listItem = document.createElement('li');
    listItem.classList.add(
      'stay-social__card',
      'overflow-hidden',
      'ratio',
    );
    // Check for ratio-9x16 class from original HTML
    if (row.classList.contains('ratio-9x16')) {
      listItem.classList.add('ratio-9x16');
    } else {
      listItem.classList.add('ratio-1x1');
    }

    const cardLink = document.createElement('a');
    cardLink.classList.add(
      'stay-social__card--link',
      'd-block',
      'w-100',
      'h-100',
    );
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.target = '_blank'; // Assuming all social links open in new tab
    }
    moveInstrumentation(row, cardLink); // Move instrumentation from the item row to the link

    const pictureMobile = imageMobileCell.querySelector('picture');
    const pictureDesktop = imageDesktopCell.querySelector('picture');

    if (pictureMobile && pictureDesktop) {
      const imgMobile = pictureMobile.querySelector('img');
      const imgDesktop = pictureDesktop.querySelector('img');

      if (imgMobile && imgDesktop) {
        // Create optimized picture for mobile
        const optimizedPicMobile = createOptimizedPicture(imgMobile.src, imgMobile.alt, false, [{ width: '600' }]);
        const sourceMobile = optimizedPicMobile.querySelector('source');
        if (sourceMobile) {
          sourceMobile.media = '(max-width:600px)';
        }

        // Create optimized picture for desktop
        const optimizedPicDesktop = createOptimizedPicture(imgDesktop.src, imgDesktop.alt, false, [{ width: '750' }]);
        const imgDesktopElement = optimizedPicDesktop.querySelector('img');
        if (imgDesktopElement) {
          imgDesktopElement.classList.add('stay-social__card--image', 'w-100', 'h-100', 'object-fit-cover');
          imgDesktopElement.loading = 'lazy';
        }

        // Append mobile source to desktop picture for responsive image
        if (sourceMobile) {
          optimizedPicDesktop.prepend(sourceMobile);
        }
        cardLink.append(optimizedPicDesktop);
      }
    }

    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    cardLink.append(screenReaderOnly);

    listItem.append(cardLink);
    cardsList.append(listItem);
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

  const ctaLink = ctaLinkRow.querySelector('a');
  if (ctaLink) {
    ctaAnchor.href = ctaLink.href;
    ctaAnchor.target = '_blank'; // Assuming CTA also opens in new tab
  }
  moveInstrumentation(ctaLinkRow, ctaAnchor);

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add(
    'svasti-cta__label',
    'fw-semibold',
    'fs-default',
    'leading-26',
  );
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  ctaAnchor.append(ctaLabelSpan);

  const ctaScreenReaderOnly = document.createElement('span');
  ctaScreenReaderOnly.classList.add('cmp-link__screen-reader-only');
  ctaScreenReaderOnly.textContent = 'opens in a new tab';
  ctaAnchor.append(ctaScreenReaderOnly);

  ctaWrapper.append(ctaAnchor);

  block.replaceChildren(section);
}
