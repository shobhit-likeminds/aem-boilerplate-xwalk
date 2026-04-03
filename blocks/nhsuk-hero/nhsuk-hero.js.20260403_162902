import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [backgroundImageRow, headingRow, descriptionRow] = [...block.children];

  block.classList.add('nhsuk-hero', 'nhsuk-hero--image', 'nhsuk-hero--image-description');

  // Background Image
  const picture = backgroundImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img && img.src) {
      block.style.backgroundImage = `url("${img.src}")`;
    }
    // Remove the row as its content is used for background-image style
    moveInstrumentation(backgroundImageRow, block);
    backgroundImageRow.remove();
  }

  const overlay = document.createElement('div');
  overlay.classList.add('nhsuk-hero__overlay');

  const container = document.createElement('div');
  container.classList.add('container');
  overlay.append(container);

  const heroContent = document.createElement('div');
  heroContent.classList.add('nhsuk-hero-content', 'nhsuk-hero-content--blue', 'text-left');
  container.append(heroContent);

  // Heading
  const h1 = document.createElement('h1');
  moveInstrumentation(headingRow, h1);
  while (headingRow.firstChild) h1.append(headingRow.firstChild);
  heroContent.append(h1);
  headingRow.remove();

  // Description
  const descriptionP = descriptionRow.querySelector('p');
  if (descriptionP) {
    const p = document.createElement('p');
    moveInstrumentation(descriptionRow, p);
    while (descriptionRow.firstChild) p.append(descriptionRow.firstChild);
    heroContent.append(p);
  }
  descriptionRow.remove();

  const arrowSpan = document.createElement('span');
  arrowSpan.classList.add('nhsuk-hero__arrow', 'nhsuk-hero-content--blue', 'Yes');
  arrowSpan.setAttribute('aria-hidden', 'true');
  heroContent.append(arrowSpan);

  block.append(overlay);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
