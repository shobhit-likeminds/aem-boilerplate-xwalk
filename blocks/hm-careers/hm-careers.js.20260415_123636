import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageRow,
    imageAltRow, // This row is read but its content is not used in the current JS logic.
    subtitleRow,
    headingRow,
    ctaLinkRow,
    ctaLinkLabelRow,
  ] = [...block.children];

  block.classList.add('hm-careers');

  const hmCareersCon = document.createElement('div');
  hmCareersCon.classList.add('hm-careers-con');

  // Image
  const figure = document.createElement('figure');
  const [imageCell] = [...imageRow.children]; // Destructuring for consistency
  const picture = imageCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      optimizedPic.querySelector('img').classList.add('bg-cover');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
    }
  }
  moveInstrumentation(imageRow, figure);
  hmCareersCon.append(figure);

  // Section details
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Subtitle
  const subtitleDiv = document.createElement('div');
  subtitleDiv.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const [subtitleCell] = [...subtitleRow.children]; // Destructuring for consistency
  moveInstrumentation(subtitleRow, subtitleDiv);
  subtitleDiv.textContent = subtitleCell.textContent.trim();
  sectDet.append(subtitleDiv);

  // Heading
  const headingH2 = document.createElement('h2');
  headingH2.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const [headingCell] = [...headingRow.children]; // Destructuring for consistency
  moveInstrumentation(headingRow, headingH2);
  headingH2.textContent = headingCell.textContent.trim();
  sectDet.append(headingH2);

  // CTA Link
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const [ctaLinkCell] = [...ctaLinkRow.children]; // Destructuring for consistency
  const foundLink = ctaLinkCell.querySelector('a');
  if (foundLink) {
    ctaLink.href = foundLink.href; // Read href for type=aem-content
  }
  moveInstrumentation(ctaLinkRow, ctaLink);
  const [ctaLinkLabelCell] = [...ctaLinkLabelRow.children]; // Destructuring for consistency
  ctaLink.textContent = ctaLinkLabelCell.textContent.trim(); // Read textContent for type=text
  sectDet.append(ctaLink);

  hmCareersCon.append(sectDet);

  block.textContent = '';
  block.append(hmCareersCon);
}
