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

  // Main cards container
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
    const cardLinkCell = cells.find((cell) => cell.querySelector('a'));
    const cardImageMobileCell = cells.find((cell) => cell.querySelector('picture') && cell.textContent.includes('(Mobile)')); // Heuristic for mobile image
    const cardImageDesktopCell = cells.find((cell) => cell.querySelector('picture') && cell.textContent.includes('(Desktop)')); // Heuristic for desktop image

    const li = document.createElement('li');
    // Default ratio, will be overridden by CSS or detected from original HTML if possible
    li.classList.add('stay-social__card', 'overflow-hidden', 'ratio-1x1', 'ratio'); 
    // Check original HTML for specific ratio classes and add if present
    if (row.classList.contains('ratio-9x16')) {
      li.classList.remove('ratio-1x1');
      li.classList.add('ratio-9x16');
    }

    const cardLink = document.createElement('a');
    cardLink.classList.add(
      'stay-social__card--link',
      'd-block',
      'w-100',
      'h-100',
    );
    const foundLink = cardLinkCell?.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.target = '_blank'; // Original HTML has target="_blank"
    }

    const pictureMobile = cardImageMobileCell?.querySelector('picture');
    const pictureDesktop = cardImageDesktopCell?.querySelector('picture');

    if (pictureMobile || pictureDesktop) {
      const picture = document.createElement('picture');
      const img = document.createElement('img');
      img.classList.add('stay-social__card--image', 'w-100', 'h-100', 'object-fit-cover');
      img.loading = 'lazy';

      if (pictureMobile) {
        const sourceMobile = document.createElement('source');
        sourceMobile.media = '(max-width:600px)';
        sourceMobile.srcset = pictureMobile.querySelector('img')?.src || '';
        picture.append(sourceMobile);
      }

      const desktopImgSrc = pictureDesktop?.querySelector('img')?.src;
      const desktopImgAlt = pictureDesktop?.querySelector('img')?.alt;
      const mobileImgSrc = pictureMobile?.querySelector('img')?.src;
      const mobileImgAlt = pictureMobile?.querySelector('img')?.alt;

      if (desktopImgSrc) {
        img.src = desktopImgSrc;
        img.alt = desktopImgAlt || '';
      } else if (mobileImgSrc) {
        img.src = mobileImgSrc;
        img.alt = mobileImgAlt || '';
      }

      picture.append(img);
      cardLink.append(picture);

      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      cardLink.append(screenReaderSpan);
    }
    moveInstrumentation(row, li);
    li.append(cardLink);
    cardsList.append(li);
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

  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaAnchor.href = foundCtaLink.href;
    ctaAnchor.target = '_blank'; // Original HTML has target="_blank"
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
  ctaAnchor.append(ctaLabelSpan);

  const ctaScreenReaderSpan = document.createElement('span');
  ctaScreenReaderSpan.classList.add('cmp-link__screen-reader-only');
  ctaScreenReaderSpan.textContent = 'opens in a new tab';
  ctaAnchor.append(ctaScreenReaderSpan);

  moveInstrumentation(ctaLinkRow, ctaAnchor);
  ctaWrapper.append(ctaAnchor);

  block.replaceChildren(section);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    // createOptimizedPicture expects the original image src and alt,
    // and returns a new <picture> element.
    // We need to replace the entire <picture> element, not just the <img>.
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: '750' },
    ]);
    // moveInstrumentation should be called on the original img's parent cell,
    // and applied to the new picture element.
    // However, since the original img is already inside a picture, and we're replacing
    // the picture, we need to ensure the instrumentation from the original cell
    // is moved to the new picture.
    // The current setup moves instrumentation from the original row to the <li>,
    // which is correct. The image optimization is a separate concern.
    // We just need to replace the picture correctly.
    const originalPicture = img.closest('picture');
    if (originalPicture) {
      originalPicture.replaceWith(optimizedPic);
    }
  });
}
