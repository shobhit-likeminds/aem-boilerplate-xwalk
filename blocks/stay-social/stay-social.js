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

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(container);

  // Title
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

  // Subtitle
  if (subtitleRow) {
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
  }

  // Cards
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
      const cells = [...row.children];
      const imageDesktopCell = cells.find(cell => cell.querySelector('picture') && cell.querySelector('img[alt*="Desktop"]'));
      const imageMobileCell = cells.find(cell => cell.querySelector('picture') && cell.querySelector('img[alt*="Mobile"]'));
      const linkCell = cells.find(cell => cell.querySelector('a'));

      const cardItem = document.createElement('li');
      cardItem.classList.add('stay-social__card', 'overflow-hidden', 'ratio');
      // Determine ratio based on content or default to 1x1 if not explicitly found in original HTML
      // For simplicity, defaulting to 1x1, but could be enhanced with more specific detection
      const originalRatioClass = [...row.classList].find(cls => cls.startsWith('ratio-'));
      if (originalRatioClass) {
        cardItem.classList.add(originalRatioClass);
      } else {
        cardItem.classList.add('ratio-1x1'); // Default if not found
      }
      moveInstrumentation(row, cardItem);

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
        cardLink.setAttribute('target', '_blank'); // Assuming all social links open in new tab
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        cardLink.append(screenReaderSpan);
      }

      const picture = document.createElement('picture');
      const desktopImg = imageDesktopCell?.querySelector('img');
      const mobileImg = imageMobileCell?.querySelector('img');

      if (mobileImg) {
        const sourceMobile = document.createElement('source');
        sourceMobile.srcset = mobileImg.src;
        sourceMobile.media = '(max-width:600px)';
        picture.append(sourceMobile);
      }

      if (desktopImg) {
        // createOptimizedPicture returns a <picture> element, not just an <img>
        const optimizedPicture = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
        // We need to append the img from the optimized picture to our new picture element
        const imgElement = optimizedPicture.querySelector('img');
        if (imgElement) {
          imgElement.classList.add('stay-social__card--image', 'w-100', 'h-100', 'object-fit-cover');
          picture.append(imgElement);
        }
      }

      cardLink.prepend(picture);
      cardItem.append(cardLink);
      cardsList.append(cardItem);
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

  const ctaLink = ctaLinkRow?.querySelector('a');
  if (ctaLink) {
    ctaAnchor.href = ctaLink.href;
    ctaAnchor.setAttribute('target', '_blank'); // Assuming CTA also opens in new tab
    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab';
    ctaAnchor.append(screenReaderSpan);
  }

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add(
    'svasti-cta__label',
    'fw-semibold',
    'fs-default',
    'leading-26',
  );
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaLabelSpan.textContent = ctaLabelRow?.textContent.trim() || '';
  ctaAnchor.prepend(ctaLabelSpan);

  moveInstrumentation(ctaLinkRow, ctaAnchor); // Move instrumentation from ctaLinkRow to the new anchor
  ctaWrapper.append(ctaAnchor);

  block.replaceChildren(section);
}
