import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    starImage1Row,
    starImage2Row,
    headlineRow,
    descriptionRow,
    ctaLinkRow,
    ctaLabelRow,
    heroImageRow,
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('hero-section');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row', 'align-items-center');

  const heroDescription = document.createElement('div');
  heroDescription.classList.add('hero-description', 'col-lg-6', 'col-12');

  // Star Image 1
  const star1Picture = starImage1Row.querySelector('picture');
  if (star1Picture) {
    const star1Img = star1Picture.querySelector('img');
    const optimizedStar1 = createOptimizedPicture(star1Img.src, star1Img.alt, false, [{ width: '750' }]);
    optimizedStar1.classList.add('star-1');
    moveInstrumentation(starImage1Row, optimizedStar1.querySelector('img'));
    heroDescription.append(optimizedStar1);
  }

  // Star Image 2
  const star2Picture = starImage2Row.querySelector('picture');
  if (star2Picture) {
    const star2Img = star2Picture.querySelector('img');
    const optimizedStar2 = createOptimizedPicture(star2Img.src, star2Img.alt, false, [{ width: '750' }]);
    optimizedStar2.classList.add('star-2');
    moveInstrumentation(starImage2Row, optimizedStar2.querySelector('img'));
    heroDescription.append(optimizedStar2);
  }

  // Headline
  const headline = document.createElement('h1');
  moveInstrumentation(headlineRow, headline);
  headline.innerHTML = headlineRow.children[0]?.innerHTML || ''; // Corrected: richtext field, use innerHTML
  heroDescription.append(headline);

  // Description
  const description = document.createElement('p');
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionRow.children[0]?.innerHTML || ''; // Corrected: richtext field, use innerHTML
  heroDescription.append(description);

  // CTA Link and Label
  const ctaLink = document.createElement('a');
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
  }
  // Corrected: ctaLabelRow is a text field, read its cell's textContent
  ctaLink.textContent = ctaLabelRow.children[0]?.textContent.trim() || '';
  ctaLink.classList.add('btn', 'btn-primary', 'shadow');
  moveInstrumentation(ctaLinkRow, ctaLink);
  moveInstrumentation(ctaLabelRow, ctaLink);
  heroDescription.append(ctaLink);

  row.append(heroDescription);

  const heroImageDiv = document.createElement('div');
  heroImageDiv.classList.add('hero-image', 'col-lg-6', 'col-12');

  // Hero Main Image
  const heroPicture = heroImageRow.querySelector('picture');
  if (heroPicture) {
    const heroImg = heroPicture.querySelector('img');
    const optimizedHeroImg = createOptimizedPicture(heroImg.src, heroImg.alt, false, [{ width: '750' }]);
    optimizedHeroImg.classList.add('img-fluid');
    moveInstrumentation(heroImageRow, optimizedHeroImg.querySelector('img'));
    heroImageDiv.append(optimizedHeroImg);
  }

  row.append(heroImageDiv);
  container.append(row);
  section.append(container);

  block.replaceChildren(section);
}
