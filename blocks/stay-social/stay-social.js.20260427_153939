import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    subtextRow,
    ctaLabelRow,
    ctaLinkRow,
    ...cardRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('stay-social', 'pt-14', 'py-lg-11', 'bg-cream-300');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(container);

  if (titleRow) {
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
  }

  if (subtextRow) {
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
  }

  if (cardRows.length > 0) {
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
      const [imageDesktopCell, imageMobileCell, linkCell] = [...row.children];

      const li = document.createElement('li');
      li.classList.add('stay-social__card', 'overflow-hidden', 'ratio-1x1', 'ratio');
      moveInstrumentation(row, li);

      const link = document.createElement('a');
      link.classList.add(
        'stay-social__card--link',
        'd-block',
        'w-100',
        'h-100',
      );
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
        link.target = '_blank';
      }

      const pictureDesktop = imageDesktopCell.querySelector('picture');
      const pictureMobile = imageMobileCell.querySelector('picture');

      if (pictureDesktop && pictureMobile) {
        const imgDesktop = pictureDesktop.querySelector('img');
        const imgMobile = pictureMobile.querySelector('img');

        const optimizedPic = createOptimizedPicture(
          imgDesktop.src,
          imgDesktop.alt,
          false,
          [
            { media: '(max-width: 600px)', width: '600', src: imgMobile.src },
            { width: '750' },
          ],
        );

        optimizedPic.querySelector('img').classList.add(
          'stay-social__card--image',
          'w-100',
          'h-100',
          'object-fit-cover',
        );
        link.append(optimizedPic);
      } else if (pictureDesktop) {
        const imgDesktop = pictureDesktop.querySelector('img');
        const optimizedPic = createOptimizedPicture(
          imgDesktop.src,
          imgDesktop.alt,
          false,
          [{ width: '750' }],
        );
        optimizedPic.querySelector('img').classList.add(
          'stay-social__card--image',
          'w-100',
          'h-100',
          'object-fit-cover',
        );
        link.append(optimizedPic);
      }

      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      link.append(screenReaderSpan);

      li.append(link);
      cardsList.append(li);
    });
  }

  if (ctaLabelRow && ctaLinkRow) {
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
      ctaLink.target = '_blank';
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
    ctaLink.append(ctaLabelSpan);

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    ctaLink.append(screenReaderSpan);

    ctaWrapper.append(ctaLink);
  }

  block.replaceChildren(section);
}
