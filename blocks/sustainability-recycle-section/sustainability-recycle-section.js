import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageDesktopCell,
    backgroundImageMobileCell,
    titleCell,
    descriptionCell,
    ctaLinkCell,
    ctaLabelCell,
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add(
    'sustainability-hub-recycle-section',
    'grid-container',
    'bg--paper-white',
    'homepage-recommended-article',
    'padding',
    'animate-enter',
    'in-view',
  );
  moveInstrumentation(block, section);

  const gridX = document.createElement('div');
  gridX.classList.add('grid-x', 'pos-rel');

  const bgContainerCell = document.createElement('div');
  bgContainerCell.classList.add('cell', 'bg-container', 'animate-enter-fade', 'animate-delay-3');

  const desktopPicture = backgroundImageDesktopCell.querySelector('picture');
  const mobilePicture = backgroundImageMobileCell.querySelector('picture');

  if (desktopPicture && mobilePicture) {
    const imgDesktop = desktopPicture.querySelector('img');
    const imgMobile = mobilePicture.querySelector('img');

    const optimizedPicture = createOptimizedPicture(
      imgDesktop.src,
      imgDesktop.alt,
      false,
      [
        { media: '(min-width: 1440px)', width: '1440' },
        { media: '(min-width: 1024px)', width: '1024' },
        { media: '(min-width: 768px)', width: '768' },
        { media: '(min-width: 0px)', width: '750', src: imgMobile.src },
      ],
    );
    optimizedPicture.querySelector('img').classList.add('animate-enter-fade', 'animate-delay-3', 'ls-is-cached', 'lazyloaded');
    moveInstrumentation(backgroundImageDesktopCell, optimizedPicture.querySelector('img'));
    bgContainerCell.append(optimizedPicture);
  }

  const contentCell = document.createElement('div');
  contentCell.classList.add('cell');

  const whiteBgPatch = document.createElement('div');
  whiteBgPatch.classList.add('grid-x', 'white-bg-patch');

  const textContainer = document.createElement('div');
  textContainer.classList.add('text-container', 'text-center');

  const title = document.createElement('h2');
  title.classList.add('title', 'headline-h2', 'animate-enter-fade-up-short', 'animate-delay-3');
  title.textContent = titleCell.textContent.trim();
  moveInstrumentation(titleCell, title);

  const description = document.createElement('div');
  description.classList.add('description', 'bodyMediumRegular', 'animate-enter-fade-up-short', 'animate-delay-5');
  description.innerHTML = descriptionCell.innerHTML;
  moveInstrumentation(descriptionCell, description);

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('button', 'transparent-black', 'see-all-products', 'animate-enter-fade-up-short', 'animate-delay-7');
  const foundCtaLink = ctaLinkCell.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
  }
  ctaLink.title = ctaLabelCell.textContent.trim();
  ctaLink.setAttribute('aria-label', '');
  ctaLink.setAttribute('rel', 'follow');

  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add('button-text');
  ctaSpan.textContent = ctaLabelCell.textContent.trim();
  ctaLink.append(ctaSpan);
  moveInstrumentation(ctaLinkCell, ctaLink);
  moveInstrumentation(ctaLabelCell, ctaLink);

  textContainer.append(title, description, ctaLink);
  whiteBgPatch.append(textContainer);
  contentCell.append(whiteBgPatch);
  gridX.append(bgContainerCell, contentCell);
  section.append(gridX);

  block.replaceChildren(section);
}
