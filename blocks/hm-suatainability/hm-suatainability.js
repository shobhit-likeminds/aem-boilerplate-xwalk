import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    backgroundImageAltRow,
    subTitleRow,
    titleRow,
    descriptionRow,
    ctaLinkRow,
    ctaLinkLabelRow,
  ] = [...block.children];

  block.textContent = '';

  // Background Image
  const figure = document.createElement('figure');
  const backgroundImageCell = backgroundImageRow.firstElementChild;
  const img = backgroundImageCell.querySelector('img');
  if (img) {
    const altText = backgroundImageAltRow.firstElementChild?.textContent.trim() || img.alt;
    const optimizedPic = createOptimizedPicture(img.src, altText, false, [{ width: '1920' }]);
    optimizedPic.querySelector('img').classList.add('bg-cover');
    moveInstrumentation(backgroundImageCell, optimizedPic.querySelector('img'));
    figure.append(optimizedPic);
  }
  block.append(figure);

  // Section Details
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Sub Title
  const subTtle = document.createElement('div');
  subTtle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(subTitleRow.firstElementChild, subTtle);
  subTtle.textContent = subTitleRow.firstElementChild?.textContent.trim() || '';
  sectDet.append(subTtle);

  // Title
  const commonTtle = document.createElement('h2');
  commonTtle.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(titleRow.firstElementChild, commonTtle);
  commonTtle.textContent = titleRow.firstElementChild?.textContent.trim() || '';
  sectDet.append(commonTtle);

  // Description
  const descriptionP = document.createElement('p');
  descriptionP.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(descriptionRow.firstElementChild, descriptionP);
  descriptionP.innerHTML = descriptionRow.firstElementChild?.innerHTML || '';
  sectDet.append(descriptionP);

  // CTA Link
  const ctaLinkAnchor = document.createElement('a');
  ctaLinkAnchor.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const foundCtaLink = ctaLinkRow.firstElementChild?.querySelector('a');
  if (foundCtaLink) {
    ctaLinkAnchor.href = foundCtaLink.href;
  }
  ctaLinkAnchor.textContent = ctaLinkLabelRow.firstElementChild?.textContent.trim() || '';
  moveInstrumentation(ctaLinkRow.firstElementChild, ctaLinkAnchor);
  sectDet.append(ctaLinkAnchor);

  block.append(sectDet);
}
