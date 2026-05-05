import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    decorStar1Row,
    decorStar2Row,
    headlineRow,
    descriptionRow,
    ctaLinkRow,
    ctaLabelRow,
    heroImageRow,
  ] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row', 'align-items-center');

  const heroDescription = document.createElement('div');
  heroDescription.classList.add('hero-description', 'col-lg-6', 'col-12');

  // Decorative Star 1
  const decorStar1Img = decorStar1Row?.querySelector('img');
  if (decorStar1Img) {
    const star1 = document.createElement('img');
    star1.src = decorStar1Img.src;
    star1.alt = decorStar1Img.alt;
    star1.classList.add('star-1');
    moveInstrumentation(decorStar1Row, star1);
    heroDescription.append(star1);
  }

  // Decorative Star 2
  const decorStar2Img = decorStar2Row?.querySelector('img');
  if (decorStar2Img) {
    const star2 = document.createElement('img');
    star2.src = decorStar2Img.src;
    star2.alt = decorStar2Img.alt;
    star2.classList.add('star-2');
    moveInstrumentation(decorStar2Row, star2);
    heroDescription.append(star2);
  }

  // Headline
  const headline = document.createElement('h1');
  // FIX: Use innerHTML directly from the cell for richtext, not children[0]
  headline.innerHTML = headlineRow?.children[0]?.innerHTML || '';
  moveInstrumentation(headlineRow, headline);
  heroDescription.append(headline);

  // Description
  const description = document.createElement('p');
  // FIX: Use innerHTML directly from the cell for richtext, not children[0]
  description.innerHTML = descriptionRow?.children[0]?.innerHTML || '';
  moveInstrumentation(descriptionRow, description);
  heroDescription.append(description);

  // CTA Link and Label
  const ctaLinkAnchor = ctaLinkRow?.querySelector('a');
  // FIX: Read ctaLabel from its cell's textContent.trim() as per model
  const ctaLabelText = ctaLabelRow?.children[0]?.textContent.trim();
  if (ctaLinkAnchor && ctaLabelText) {
    const cta = document.createElement('a');
    cta.href = ctaLinkAnchor.href;
    cta.textContent = ctaLabelText;
    cta.classList.add('btn', 'btn-primary', 'shadow');
    moveInstrumentation(ctaLinkRow, cta);
    moveInstrumentation(ctaLabelRow, cta);
    heroDescription.append(cta);
  }

  row.append(heroDescription);

  const heroImageDiv = document.createElement('div');
  heroImageDiv.classList.add('hero-image', 'col-lg-6', 'col-12');

  // Hero Image
  const heroImagePicture = heroImageRow?.querySelector('picture');
  if (heroImagePicture) {
    const img = heroImagePicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('img-fluid');
      moveInstrumentation(heroImageRow, optimizedPic.querySelector('img'));
      heroImageDiv.append(optimizedPic);
    }
  }

  row.append(heroImageDiv);
  container.append(row);
  block.replaceChildren(container);
}
