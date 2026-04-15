import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    backgroundImageAltRow,
    subtitleRow,
    headingRow,
    descriptionRow,
    ctaLinkRow,
    ctaLinkLabelRow,
  ] = [...block.children];

  // Create figure for background image
  const figure = document.createElement('figure');
  const picture = backgroundImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, backgroundImageAltRow.textContent.trim(), false, [{ width: '1920' }]);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('bg-cover');
      moveInstrumentation(img, optimizedImg);
      figure.append(optimizedPic);
    }
  }

  // Create content section
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Subtitle
  const subTtle = document.createElement('div');
  subTtle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(subtitleRow, subTtle);
  subTtle.textContent = subtitleRow.textContent.trim();
  sectDet.append(subTtle);

  // Heading
  const commonTtle = document.createElement('h2');
  commonTtle.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headingRow, commonTtle);
  commonTtle.textContent = headingRow.textContent.trim();
  sectDet.append(commonTtle);

  // Description
  const descriptionP = document.createElement('p');
  descriptionP.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(descriptionRow, descriptionP);
  descriptionP.innerHTML = descriptionRow.innerHTML;
  sectDet.append(descriptionP);

  // CTA Link
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href; // Use the href from the original anchor tag
  }
  ctaLink.textContent = ctaLinkLabelRow.textContent.trim();
  moveInstrumentation(ctaLinkRow, ctaLink);
  sectDet.append(ctaLink);

  block.textContent = '';
  block.append(figure, sectDet);
}
