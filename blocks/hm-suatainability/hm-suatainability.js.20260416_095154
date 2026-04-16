import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    subTitleRow,
    headingRow,
    descriptionRow,
    ctaLinkRow,
    ctaLinkLabelRow,
  ] = [...block.children];

  // Background Image
  const figure = document.createElement('figure');
  const picture = backgroundImageRow.children[0].querySelector('picture'); // Access the cell first
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      optimizedPic.querySelector('img').classList.add('bg-cover');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
    }
  }
  moveInstrumentation(backgroundImageRow, figure);

  // Section Details
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Sub Title
  const subTitle = document.createElement('div');
  subTitle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  subTitle.textContent = subTitleRow.children[0].textContent.trim(); // Access the cell first
  moveInstrumentation(subTitleRow, subTitle);
  sectDet.append(subTitle);

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  heading.textContent = headingRow.children[0].textContent.trim(); // Access the cell first
  moveInstrumentation(headingRow, heading);
  sectDet.append(heading);

  // Description
  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  description.innerHTML = descriptionRow.children[0].innerHTML; // Access the cell first
  moveInstrumentation(descriptionRow, description);
  sectDet.append(description);

  // CTA Link
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const foundLink = ctaLinkRow.children[0].querySelector('a'); // Access the cell first and then the link
  if (foundLink) {
    ctaLink.href = foundLink.href;
  }
  ctaLink.textContent = ctaLinkLabelRow.children[0].textContent.trim(); // Access the cell first
  moveInstrumentation(ctaLinkRow, ctaLink);
  sectDet.append(ctaLink);

  // Clear block and append new structure
  block.textContent = '';
  block.append(figure, sectDet);
}
