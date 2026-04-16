import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure the fixed fields from block.children
  const [imageRow, subtitleRow, headingRow, ctaLinkRow, ctaLinkLabelRow] = [...block.children];

  // Create the main container div
  const hmCareersCon = document.createElement('div');
  hmCareersCon.classList.add('hm-careers-con');

  // Image section
  const figure = document.createElement('figure');
  const imageCell = [...imageRow.children][0]; // Access the first cell of the imageRow
  const picture = imageCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('bg-cover'); // Add class to the img inside picture
    }
  }
  hmCareersCon.append(figure);

  // Section details div
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Subtitle
  const subTtle = document.createElement('div');
  subTtle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const subtitleCell = [...subtitleRow.children][0]; // Access the first cell of the subtitleRow
  moveInstrumentation(subtitleCell, subTtle);
  subTtle.textContent = subtitleCell.textContent.trim();
  sectDet.append(subTtle);

  // Heading
  const commonTtle = document.createElement('h2');
  commonTtle.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const headingCell = [...headingRow.children][0]; // Access the first cell of the headingRow
  moveInstrumentation(headingCell, commonTtle);
  commonTtle.innerHTML = headingCell.innerHTML; // Use innerHTML to preserve potential <br> tags
  sectDet.append(commonTtle);

  // CTA Link
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const ctaLinkCell = [...ctaLinkRow.children][0]; // Access the first cell of the ctaLinkRow
  const foundCtaLink = ctaLinkCell.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href; // Read href from the anchor
  }
  const ctaLinkLabelCell = [...ctaLinkLabelRow.children][0]; // Access the first cell of the ctaLinkLabelRow
  moveInstrumentation(ctaLinkLabelCell, ctaLink); // Instrument the label cell, not the link cell
  ctaLink.textContent = ctaLinkLabelCell.textContent.trim(); // Use the label text for the anchor
  sectDet.append(ctaLink);

  hmCareersCon.append(sectDet);

  // Clear the block and append the new structure
  block.textContent = '';
  block.classList.add('hm-careers'); // Add the block's own class
  block.append(hmCareersCon);
}
