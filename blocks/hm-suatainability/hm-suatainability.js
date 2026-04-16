import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageRow,
    subTitleRow,
    headingRow,
    descriptionRow,
    ctaLinkRow,
    ctaLinkLabelRow,
  ] = [...block.children];

  // Image
  const figure = document.createElement('figure');
  const imageCell = imageRow.firstElementChild;
  const picture = imageCell?.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      // Copy classes from original img to the new optimized img
      optimizedPic.querySelector('img').classList.add('bg-cover');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
    }
  }
  moveInstrumentation(imageRow, figure);

  // Section details
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Sub Title
  const subTtle = document.createElement('div');
  subTtle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(subTitleRow, subTtle);
  subTtle.textContent = subTitleRow?.firstElementChild?.textContent.trim() || '';

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow?.firstElementChild?.textContent.trim() || '';

  // Description
  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionRow?.firstElementChild?.innerHTML || '';

  // CTA Link
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const foundCtaLink = ctaLinkRow?.firstElementChild?.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
  }
  ctaLink.textContent = ctaLinkLabelRow?.firstElementChild?.textContent.trim() || '';
  moveInstrumentation(ctaLinkRow, ctaLink);

  sectDet.append(subTtle, heading, description, ctaLink);

  block.textContent = '';
  block.append(figure, sectDet);
}
