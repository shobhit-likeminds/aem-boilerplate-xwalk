import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageRow,
    subTitleRow,
    headingRow,
    ctaLinkRow,
    ctaLinkLabelRow,
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('hm-careers');

  const hmCareersCon = document.createElement('div');
  hmCareersCon.classList.add('hm-careers-con');

  const figure = document.createElement('figure');
  const imageCell = imageRow.firstElementChild;
  const picture = imageCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('bg-cover');
      figure.append(optimizedPic);
    }
  }
  moveInstrumentation(imageRow, figure);
  hmCareersCon.append(figure);

  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  const subTitle = document.createElement('div');
  subTitle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(subTitleRow, subTitle);
  subTitle.textContent = subTitleRow.firstElementChild.textContent.trim();
  sectDet.append(subTitle);

  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headingRow, heading);
  heading.innerHTML = headingRow.firstElementChild.innerHTML; // Use innerHTML to preserve <br>
  sectDet.append(heading);

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const foundCtaLink = ctaLinkRow.firstElementChild.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
  }
  moveInstrumentation(ctaLinkRow, ctaLink);
  // ctaLinkLabelRow.firstElementChild.textContent.trim() is correct as per BlockJson and EDS structure
  ctaLink.textContent = ctaLinkLabelRow.firstElementChild.textContent.trim();
  sectDet.append(ctaLink);

  hmCareersCon.append(sectDet);
  block.append(hmCareersCon);
}
