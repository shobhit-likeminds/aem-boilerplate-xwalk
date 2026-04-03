import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [backgroundImageRow, headingRow, descriptionRow] = [...block.children];

  block.classList.add('nhsuk-hero', 'nhsuk-hero--image', 'nhsuk-hero--image-description');

  const backgroundImageCell = backgroundImageRow.firstElementChild;
  const picture = backgroundImageCell.querySelector('picture');
  const img = picture ? picture.querySelector('img') : null;

  if (img) {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    block.style.backgroundImage = `url(${optimizedPic.querySelector('img').src})`;
  }

  const overlay = document.createElement('div');
  overlay.classList.add('nhsuk-hero__overlay');

  const container = document.createElement('div');
  container.classList.add('container');

  const heroContent = document.createElement('div');
  heroContent.classList.add('nhsuk-hero-content', 'nhsuk-hero-content--blue', 'text-left');

  const h1 = document.createElement('h1');
  moveInstrumentation(headingRow.firstElementChild, h1);
  while (headingRow.firstElementChild.firstChild) {
    h1.append(headingRow.firstElementChild.firstChild);
  }

  const p = document.createElement('p');
  moveInstrumentation(descriptionRow.firstElementChild, p);
  while (descriptionRow.firstElementChild.firstChild) {
    p.append(descriptionRow.firstElementChild.firstChild);
  }

  const arrowSpan = document.createElement('span');
  arrowSpan.classList.add('nhsuk-hero__arrow', 'nhsuk-hero-content--blue', 'Yes');
  arrowSpan.setAttribute('aria-hidden', 'true');

  heroContent.append(h1, p, arrowSpan);
  container.append(heroContent);
  overlay.append(container);

  block.textContent = '';
  block.append(overlay);
}
