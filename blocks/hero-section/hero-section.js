import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    decorStar1Row,
    decorStar2Row,
    headlineRow,
    descriptionRow,
    ctaLabelRow,
    ctaLinkRow,
    heroImageRow,
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('hero-section');

  const container = document.createElement('div');
  container.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row', 'align-items-center');

  const heroDescription = document.createElement('div');
  heroDescription.classList.add('hero-description', 'col-lg-6', 'col-12');
  moveInstrumentation(decorStar1Row, heroDescription);
  moveInstrumentation(decorStar2Row, heroDescription);
  moveInstrumentation(headlineRow, heroDescription);
  moveInstrumentation(descriptionRow, heroDescription);
  moveInstrumentation(ctaLabelRow, heroDescription);
  moveInstrumentation(ctaLinkRow, heroDescription);

  const decorStar1 = decorStar1Row.querySelector('picture');
  if (decorStar1) {
    const img = decorStar1.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    const optimizedImg = optimizedPic.querySelector('img');
    optimizedImg.classList.add('star-1');
    heroDescription.append(optimizedImg);
  }

  const decorStar2 = decorStar2Row.querySelector('picture');
  if (decorStar2) {
    const img = decorStar2.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    const optimizedImg = optimizedPic.querySelector('img');
    optimizedImg.classList.add('star-2');
    heroDescription.append(optimizedImg);
  }

  const headline = document.createElement('h1');
  headline.innerHTML = headlineRow.children[0]?.innerHTML || '';
  heroDescription.append(headline);

  const description = document.createElement('p');
  description.innerHTML = descriptionRow.children[0]?.innerHTML || '';
  heroDescription.append(description);

  const ctaLink = ctaLinkRow.querySelector('a');
  if (ctaLink) {
    const ctaButton = document.createElement('a');
    ctaButton.classList.add('btn', 'btn-primary', 'shadow');
    ctaButton.href = ctaLink.href;
    ctaButton.textContent = ctaLabelRow.textContent.trim();
    heroDescription.append(ctaButton);
  }

  const heroImageDiv = document.createElement('div');
  heroImageDiv.classList.add('hero-image', 'col-lg-6', 'col-12');
  moveInstrumentation(heroImageRow, heroImageDiv);

  const heroPicture = heroImageRow.querySelector('picture');
  if (heroPicture) {
    const img = heroPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    const optimizedImg = optimizedPic.querySelector('img');
    optimizedImg.classList.add('img-fluid');
    heroImageDiv.append(optimizedImg);
  }

  row.append(heroDescription, heroImageDiv);
  container.append(row);
  section.append(container);

  block.replaceChildren(section);
}
