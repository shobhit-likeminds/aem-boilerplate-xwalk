import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundDesktopImageRow,
    backgroundMobileImageRow,
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

  const gridX = document.createElement('div');
  gridX.classList.add('grid-x', 'pos-rel');
  section.append(gridX);

  const bgContainerCell = document.createElement('div');
  bgContainerCell.classList.add(
    'cell',
    'bg-container',
    'animate-enter-fade',
    'animate-delay-3',
  );
  gridX.append(bgContainerCell);

  const desktopPicture = backgroundDesktopImageRow.querySelector('picture');
  const mobilePicture = backgroundMobileImageRow.querySelector('picture');

  if (desktopPicture) {
    const img = desktopPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(
      img.src,
      img.alt,
      false,
      [{ media: '(min-width: 1440px)', width: '2880' }, { media: '(min-width: 1024px)', width: '2880' }, { media: '(min-width: 768px)', width: '2880' }, { width: '750' }],
    );
    moveInstrumentation(backgroundDesktopImageRow, optimizedPic.querySelector('img'));
    bgContainerCell.append(optimizedPic);
  } else if (mobilePicture) { // Fallback to mobile if desktop is missing
    const img = mobilePicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(
      img.src,
      img.alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(backgroundMobileImageRow, optimizedPic.querySelector('img'));
    bgContainerCell.append(optimizedPic);
  }

  const contentCell = document.createElement('div');
  contentCell.classList.add('cell');
  gridX.append(contentCell);

  const whiteBgPatch = document.createElement('div');
  whiteBgPatch.classList.add('grid-x', 'white-bg-patch');
  contentCell.append(whiteBgPatch);

  const textContainer = document.createElement('div');
  textContainer.classList.add(
    'text-container',
    'text-center',
  );
  whiteBgPatch.append(textContainer);

  const headline = document.createElement('h2');
  headline.classList.add(
    'title',
    'headline-h2',
    'animate-enter-fade-up-short',
    'animate-delay-3',
  );
  moveInstrumentation(headlineRow, headline);
  headline.textContent = headlineRow.textContent.trim();
  textContainer.append(headline);

  const description = document.createElement('div'); // Changed to div for richtext content
  description.classList.add(
    'description',
    'bodyMediumRegular',
    'animate-enter-fade-up-short',
    'animate-delay-5',
  );
  moveInstrumentation(descriptionRow, description);
  // Read innerHTML directly from the cell for richtext content
  description.innerHTML = descriptionRow.children[0]?.innerHTML || '';
  textContainer.append(description);

  const ctaLink = document.createElement('a');
  ctaLink.classList.add(
    'button',
    'transparent-black',
    'see-all-products',
    'animate-enter-fade-up-short',
    'animate-delay-7',
  );
  moveInstrumentation(ctaLinkRow, ctaLink);
  // Read href from the <a> tag within the ctaLinkRow's cell
  const foundLink = ctaLinkRow.children[0]?.querySelector('a');
  if (foundLink) {
    ctaLink.href = foundLink.href;
  }

  // Read ctaLabel from the ctaLabelRow's cell
  const ctaLabelText = ctaLabelRow.children[0]?.textContent.trim();
  if (ctaLabelText) {
    const span = document.createElement('span');
    span.classList.add('button-text');
    span.textContent = ctaLabelText;
    ctaLink.append(span);
  }
  textContainer.append(ctaLink);

  block.replaceChildren(section);

  // This part of the code seems to be a generic optimization that might not be needed
  // if createOptimizedPicture is already used for specific images.
  // However, it's outside the main block logic and might be for other images within the block.
  // Keeping it as is for now, assuming it's intended for other images not explicitly handled above.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
