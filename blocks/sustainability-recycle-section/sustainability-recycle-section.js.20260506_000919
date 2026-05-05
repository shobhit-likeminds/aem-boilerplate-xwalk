import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    desktopImageRow,
    mobileImageRow,
    headlineRow,
    descriptionRow,
    ctaLinkRow,
    ctaLabelRow,
  ] = [...block.children];

  const section = document.createElement('section');
  // Removed 'sustainability-hub-recycle-section' as the outer block div already has it.
  section.classList.add(
    'grid-container',
    'bg--paper-white',
    'homepage-recommended-article',
    'padding',
    'animate-enter',
    'in-view',
  );
  section.style.paddingBottom = '141px'; // From original HTML

  const gridX = document.createElement('div');
  gridX.classList.add('grid-x', 'pos-rel');

  const imageCell = document.createElement('div');
  imageCell.classList.add('cell', 'bg-container', 'animate-enter-fade', 'animate-delay-3');

  const desktopPicture = desktopImageRow.querySelector('picture');
  const mobilePicture = mobileImageRow.querySelector('picture');

  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    const optimizedDesktopPic = createOptimizedPicture(
      desktopImg.src,
      desktopImg.alt,
      false,
      [{ media: '(min-width: 1440px)', width: '2880' }, { media: '(min-width: 1024px)', width: '2880' }, { media: '(min-width: 768px)', width: '2880' }],
    );
    // Add mobile source if available
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const mobileSource = document.createElement('source');
      mobileSource.setAttribute('media', '(min-width: 0px)');
      mobileSource.setAttribute('data-srcset', mobileImg.src);
      mobileSource.setAttribute('srcset', mobileImg.src);
      optimizedDesktopPic.prepend(mobileSource);
    }
    const imgElement = optimizedDesktopPic.querySelector('img');
    imgElement.classList.add('animate-enter-fade', 'animate-delay-3', 'ls-is-cached', 'lazyloaded');
    moveInstrumentation(desktopImageRow, optimizedDesktopPic.querySelector('img'));
    imageCell.append(optimizedDesktopPic);
  }

  const contentCell = document.createElement('div');
  contentCell.classList.add('cell');

  const whiteBgPatch = document.createElement('div');
  whiteBgPatch.classList.add('grid-x', 'white-bg-patch');

  const textContainer = document.createElement('div');
  textContainer.classList.add('text-container', 'text-center');

  const headline = document.createElement('h2');
  headline.classList.add('title', 'headline-h2', 'animate-enter-fade-up-short', 'animate-delay-3');
  moveInstrumentation(headlineRow, headline);
  headline.textContent = headlineRow.textContent.trim();

  const description = document.createElement('div'); // Changed to div for richtext
  description.classList.add('description', 'bodyMediumRegular', 'animate-enter-fade-up-short', 'animate-delay-5');
  moveInstrumentation(descriptionRow, description);
  // Read innerHTML directly from the cell for richtext
  description.innerHTML = descriptionRow.children[0]?.innerHTML || '';

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('button', 'transparent-black', 'see-all-products', 'animate-enter-fade-up-short', 'animate-delay-7');
  const foundLink = ctaLinkRow.querySelector('a');
  if (foundLink) {
    ctaLink.href = foundLink.href;
    // Use ctaLabelRow.textContent.trim() for the title attribute as per original HTML
    ctaLink.setAttribute('title', ctaLabelRow.textContent.trim());
    ctaLink.setAttribute('aria-label', ''); // From original HTML
    ctaLink.setAttribute('rel', 'follow'); // From original HTML
  }

  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add('button-text');
  ctaSpan.textContent = ctaLabelRow.textContent.trim();
  ctaLink.append(ctaSpan);
  moveInstrumentation(ctaLinkRow, ctaLink);

  textContainer.append(headline, description, ctaLink);
  whiteBgPatch.append(textContainer);
  contentCell.append(whiteBgPatch);
  gridX.append(imageCell, contentCell);
  section.append(gridX);

  block.replaceChildren(section);
}
