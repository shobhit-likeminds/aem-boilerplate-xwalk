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

  // Main content wrapper for cards
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

  cardRows.forEach((row) => {
    const [imageDesktopCell, imageMobileCell, linkCell] = [...row.children];

    const listItem = document.createElement('li');
    listItem.classList.add(
      'stay-social__card',
      'overflow-hidden',
      'ratio-1x1', // Default ratio, adjust based on content if needed
      'ratio',
    );

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
      link.target = '_blank'; // Assuming external links open in new tab
    }
    moveInstrumentation(row, link); // Move instrumentation from row to the link

    const pictureDesktop = imageDesktopCell.querySelector('picture');
    const pictureMobile = imageMobileCell.querySelector('picture');

    if (pictureDesktop || pictureMobile) {
      const imgDesktop = pictureDesktop ? pictureDesktop.querySelector('img') : null;
      const imgMobile = pictureMobile ? pictureMobile.querySelector('img') : null;

      // Create optimized picture using createOptimizedPicture
      const sources = [];
      if (imgMobile) {
        sources.push({ media: '(max-width:600px)', src: imgMobile.src });
      }
      const defaultSrc = imgDesktop ? imgDesktop.src : (imgMobile ? imgMobile.src : '');
      const defaultAlt = imgDesktop ? imgDesktop.alt : (imgMobile ? imgMobile.alt : '');

      const optimizedPicture = createOptimizedPicture(
        defaultSrc,
        defaultAlt,
        false,
        [{ width: '750' }],
        sources,
      );

      // Add classes to the img element within the optimized picture
      const imgElement = optimizedPicture.querySelector('img');
      if (imgElement) {
        imgElement.classList.add('stay-social__card--image', 'w-100', 'h-100', 'object-fit-cover');
      }

      // Move instrumentation from the original picture/img to the new optimized picture
      if (pictureDesktop) {
        moveInstrumentation(pictureDesktop, optimizedPicture);
      } else if (pictureMobile) {
        moveInstrumentation(pictureMobile, optimizedPicture);
      }
      
      link.append(optimizedPicture);
    }

    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.classList.add('cmp-link__screen-reader-only');
    screenReaderOnly.textContent = 'opens in a new tab';
    link.append(screenReaderOnly);

    listItem.append(link);
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

  const originalCtaLink = ctaLinkRow.querySelector('a');
  if (originalCtaLink) {
    ctaLink.href = originalCtaLink.href;
    ctaLink.target = '_blank'; // Assuming external links open in new tab
  }

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  ctaLink.append(ctaLabelSpan);

  const ctaScreenReaderOnly = document.createElement('span');
  ctaScreenReaderOnly.classList.add('cmp-link__screen-reader-only');
  ctaScreenReaderOnly.textContent = 'opens in a new tab';
  ctaLink.append(ctaScreenReaderOnly);

  moveInstrumentation(ctaLinkRow, ctaLink); // Move instrumentation from ctaLinkRow to the ctaLink
  ctaWrapper.append(ctaLink);

  block.replaceChildren(section);
}
