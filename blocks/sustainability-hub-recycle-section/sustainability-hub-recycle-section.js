import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundDesktopCell,
    backgroundMobileCell,
    titleCell,
    descriptionCell,
    ctaLinkCell,
    ctaLabelCell,
  ] = [...block.children];

  const section = document.createElement('section');
  // Removed 'sustainability-hub-recycle-section' as the outer block already has it.
  section.classList.add(
    'grid-container',
    'bg--paper-white',
    'homepage-recommended-article',
    'padding',
    'animate-enter',
    'in-view',
  );
  // Do NOT add style="padding-bottom: 141px;" — this is a layout style, not structural.

  const gridX = document.createElement('div');
  gridX.classList.add('grid-x', 'pos-rel');

  const bgContainerCell = document.createElement('div');
  bgContainerCell.classList.add('cell', 'bg-container', 'animate-enter-fade', 'animate-delay-3');

  const desktopPicture = backgroundDesktopCell?.querySelector('picture');
  const mobilePicture = backgroundMobileCell?.querySelector('picture');

  if (desktopPicture && mobilePicture) {
    const desktopImg = desktopPicture.querySelector('img');
    const mobileImg = mobilePicture.querySelector('img');

    if (desktopImg && mobileImg) {
      // Create a new picture element to combine sources and optimize
      const combinedPicture = document.createElement('picture');

      // Desktop source (min-width: 768px or 1024px or 1440px from original)
      const desktopSource = document.createElement('source');
      desktopSource.media = '(min-width: 768px)';
      desktopSource.srcset = desktopImg.src; // Use desktopImg.src as srcset
      combinedPicture.append(desktopSource);

      // Mobile source (min-width: 0px from original)
      const mobileSource = document.createElement('source');
      mobileSource.media = '(min-width: 0px)';
      mobileSource.srcset = mobileImg.src; // Use mobileImg.src as srcset
      combinedPicture.append(mobileSource);

      const img = document.createElement('img');
      img.src = desktopImg.src; // Default src for browsers that don't support <picture>
      img.alt = desktopImg.alt || '';
      img.classList.add('animate-enter-fade', 'animate-delay-3', 'ls-is-cached', 'lazyloaded');
      combinedPicture.append(img);

      // Optimize the image by replacing the img element inside the combined picture
      // createOptimizedPicture returns a new <picture> element, so we need to
      // append its children to our combinedPicture.
      const optimizedPic = createOptimizedPicture(
        img.src,
        img.alt,
        false,
        [{ media: '(min-width: 768px)', width: '1440' }, { width: '750' }],
      );

      // Move instrumentation from the original desktop picture to the new combined picture
      moveInstrumentation(desktopPicture, combinedPicture);
      // Replace the content of combinedPicture with the optimized sources and img
      combinedPicture.innerHTML = optimizedPic.innerHTML;
      bgContainerCell.append(combinedPicture);
    }
  }

  gridX.append(bgContainerCell);

  const contentCell = document.createElement('div');
  contentCell.classList.add('cell');

  const whiteBgPatch = document.createElement('div');
  whiteBgPatch.classList.add('grid-x', 'white-bg-patch');

  const textContainer = document.createElement('div');
  textContainer.classList.add('text-container', 'text-center');

  const title = document.createElement('h2');
  title.classList.add('title', 'headline-h2', 'animate-enter-fade-up-short', 'animate-delay-3');
  moveInstrumentation(titleCell, title);
  title.textContent = titleCell?.textContent.trim() || '';
  textContainer.append(title);

  const description = document.createElement('div'); // Use div for richtext
  description.classList.add('description', 'bodyMediumRegular', 'animate-enter-fade-up-short', 'animate-delay-5');
  moveInstrumentation(descriptionCell, description);
  description.innerHTML = descriptionCell?.innerHTML || '';
  textContainer.append(description);

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('button', 'transparent-black', 'see-all-products', 'animate-enter-fade-up-short', 'animate-delay-7');
  const foundCtaLink = ctaLinkCell?.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
    // Copy rel and aria-label if they exist in the original link
    if (foundCtaLink.hasAttribute('rel')) ctaLink.setAttribute('rel', foundCtaLink.getAttribute('rel'));
    if (foundCtaLink.hasAttribute('aria-label')) ctaLink.setAttribute('aria-label', foundCtaLink.getAttribute('aria-label'));
    if (foundCtaLink.hasAttribute('title')) ctaLink.setAttribute('title', foundCtaLink.getAttribute('title')); // Added title attribute
  }
  const ctaLabel = document.createElement('span');
  ctaLabel.classList.add('button-text');
  moveInstrumentation(ctaLabelCell, ctaLabel);
  ctaLabel.textContent = ctaLabelCell?.textContent.trim() || '';
  ctaLink.append(ctaLabel);
  moveInstrumentation(ctaLinkCell, ctaLink); // Move instrumentation from ctaLinkCell to the new <a>
  textContainer.append(ctaLink);

  whiteBgPatch.append(textContainer);
  contentCell.append(whiteBgPatch);
  gridX.append(contentCell);
  section.append(gridX);

  block.replaceChildren(section);
}
