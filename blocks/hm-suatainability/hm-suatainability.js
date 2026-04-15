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
  const [backgroundImageCell] = [...backgroundImageRow.children];
  const picture = backgroundImageCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      optimizedPic.querySelector('img').classList.add('bg-cover');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
    }
  }

  // Section details container
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Sub Title
  const subTitle = document.createElement('div');
  subTitle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const [subTitleCell] = [...subTitleRow.children];
  moveInstrumentation(subTitleRow, subTitle);
  subTitle.textContent = subTitleCell.textContent.trim();
  sectDet.append(subTitle);

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const [headingCell] = [...headingRow.children];
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingCell.textContent.trim();
  sectDet.append(heading);

  // Description
  const description = document.createElement('p');
  description.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  const [descriptionCell] = [...descriptionRow.children];
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionCell.innerHTML;
  sectDet.append(description);

  // CTA Link
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const [ctaLinkCell] = [...ctaLinkRow.children];
  const foundCtaLink = ctaLinkCell.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
  }
  const [ctaLinkLabelCell] = [...ctaLinkLabelRow.children];
  moveInstrumentation(ctaLinkRow, ctaLink);
  ctaLink.textContent = ctaLinkLabelCell.textContent.trim();
  sectDet.append(ctaLink);

  // Clear block content and append new structure
  block.textContent = '';
  block.append(figure, sectDet);
}
