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
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const row = document.createElement('div');
  row.classList.add('row', 'align-items-center');
  container.append(row);

  const heroDescription = document.createElement('div');
  heroDescription.classList.add('hero-description', 'col-lg-6', 'col-12');
  row.append(heroDescription);

  // Decor Star 1
  const decorStar1Img = decorStar1Row.querySelector('img');
  if (decorStar1Img) {
    const star1 = createOptimizedPicture(decorStar1Img.src, decorStar1Img.alt, false, [{ width: '750' }]);
    star1.querySelector('img').classList.add('star-1');
    moveInstrumentation(decorStar1Row, star1.querySelector('img'));
    heroDescription.append(star1);
  }

  // Decor Star 2
  const decorStar2Img = decorStar2Row.querySelector('img');
  if (decorStar2Img) {
    const star2 = createOptimizedPicture(decorStar2Img.src, decorStar2Img.alt, false, [{ width: '750' }]);
    star2.querySelector('img').classList.add('star-2');
    moveInstrumentation(decorStar2Row, star2.querySelector('img'));
    heroDescription.append(star2);
  }

  // Headline
  const headline = document.createElement('h1');
  headline.innerHTML = headlineRow.children[0]?.innerHTML || '';
  moveInstrumentation(headlineRow, headline);
  heroDescription.append(headline);

  // Description
  const description = document.createElement('p');
  description.textContent = descriptionRow.children[0]?.textContent.trim() || '';
  moveInstrumentation(descriptionRow, description);
  heroDescription.append(description);

  // CTA
  const ctaLink = document.createElement('a');
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
  }
  ctaLink.textContent = ctaLabelRow.children[0]?.textContent.trim() || '';
  ctaLink.classList.add('btn', 'btn-primary', 'shadow');
  moveInstrumentation(ctaLinkRow, ctaLink);
  moveInstrumentation(ctaLabelRow, ctaLink); // Move instrumentation for label as well
  heroDescription.append(ctaLink);

  const heroImageDiv = document.createElement('div');
  heroImageDiv.classList.add('hero-image', 'col-lg-6', 'col-12');
  row.append(heroImageDiv);

  // Hero Main Image
  const heroMainImg = heroImageRow.querySelector('img');
  if (heroMainImg) {
    const heroPicture = createOptimizedPicture(heroMainImg.src, heroMainImg.alt, true, [{ width: '750' }]);
    heroPicture.querySelector('img').classList.add('img-fluid');
    moveInstrumentation(heroImageRow, heroPicture.querySelector('img'));
    heroImageDiv.append(heroPicture);
  }

  block.replaceChildren(section);
}
