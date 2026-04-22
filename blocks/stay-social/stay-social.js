import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [
    titleRow,
    subtextRow,
    // The BlockJson model defines ctaLink and ctaLabel AFTER the 'cards' container.
    // However, the provided EDS Block Structure shows them BEFORE the 'cards' item rows.
    // We will follow the EDS Block Structure for destructuring order, but ensure
    // the correct content is pulled from the respective rows.
    ctaLinkRow, // This is block.children[2] per EDS Block Structure
    ctaLabelRow, // This is block.children[3] per EDS Block Structure
    ...cardRows
  ] = children;

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
  title.textContent = titleRow.children[0].textContent.trim(); // Access the cell content
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
  subtext.textContent = subtextRow.children[0].textContent.trim(); // Access the cell content
  container.append(subtext);

  // Main content wrapper for cards
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
    // Destructuring is safe here as per model, all item rows have 3 cells.
    const [imageDesktopCell, imageMobileCell, linkCell] = [...row.children];

    const listItem = document.createElement('li');
    listItem.classList.add('stay-social__card', 'overflow-hidden', 'ratio-1x1', 'ratio');
    moveInstrumentation(row, listItem);

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
      cardLink.target = '_blank'; // Assuming external links from original HTML
    }

    const pictureDesktop = imageDesktopCell.querySelector('picture');
    const pictureMobile = imageMobileCell.querySelector('picture');

    if (pictureDesktop || pictureMobile) {
      const picture = document.createElement('picture');
      if (pictureMobile) {
        const mobileImg = pictureMobile.querySelector('img');
        const sourceMobile = document.createElement('source');
        sourceMobile.srcset = mobileImg.src;
        sourceMobile.media = '(max-width:600px)';
        picture.append(sourceMobile);
      }
      if (pictureDesktop) {
        const desktopImg = pictureDesktop.querySelector('img');
        // createOptimizedPicture expects a path, not an img element.
        // It also returns a picture element, so we need to append its children.
        const optimizedPicture = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
        const optimizedImg = optimizedPicture.querySelector('img');
        moveInstrumentation(desktopImg, optimizedImg);
        optimizedImg.classList.add('stay-social__card--image', 'w-100', 'h-100', 'object-fit-cover');
        // Append all children (source and img) from the optimized picture
        while (optimizedPicture.firstChild) {
          picture.append(optimizedPicture.firstChild);
        }
      }
      cardLink.append(picture);
    }

    const screenReaderSpan = document.createElement('span');
    screenReaderSpan.classList.add('cmp-link__screen-reader-only');
    screenReaderSpan.textContent = 'opens in a new tab'; // From original HTML
    cardLink.append(screenReaderSpan);

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

  // The ctaLinkRow contains a single cell with an <a> tag.
  const foundCtaLink = ctaLinkRow.children[0].querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
    ctaLink.target = '_blank'; // Assuming external links from original HTML
  }

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  // The ctaLabelRow contains a single cell with plain text.
  ctaLabelSpan.textContent = ctaLabelRow.children[0].textContent.trim();
  ctaLink.append(ctaLabelSpan);

  const ctaScreenReaderSpan = document.createElement('span');
  ctaScreenReaderSpan.classList.add('cmp-link__screen-reader-only');
  ctaScreenReaderSpan.textContent = 'opens in a new tab'; // From original HTML
  ctaLink.append(ctaScreenReaderSpan);

  ctaWrapper.append(ctaLink);

  block.replaceChildren(section);
}
