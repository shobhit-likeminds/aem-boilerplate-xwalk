import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main container div
  const hmCareersCon = document.createElement('div');
  hmCareersCon.classList.add('hm-careers-con');

  // Process rows based on their content type
  const rows = [...block.children];

  // Image section (first row)
  const imageRow = rows[0];
  const figure = document.createElement('figure');
  const imageCell = imageRow.firstElementChild;
  const picture = imageCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      // Optimize the image and replace the picture element
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('bg-cover'); // Add class to the img inside the optimized picture
    }
  }
  moveInstrumentation(imageRow, figure); // Move instrumentation from the original image row to the figure
  hmCareersCon.append(figure);

  // Text details section
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Subtitle (second row)
  const subtitleRow = rows[1];
  const subtitleDiv = document.createElement('div');
  subtitleDiv.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(subtitleRow, subtitleDiv);
  subtitleDiv.textContent = subtitleRow.firstElementChild?.textContent.trim() || '';
  sectDet.append(subtitleDiv);

  // Heading (third row)
  const headingRow = rows[2];
  const headingH2 = document.createElement('h2');
  headingH2.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headingRow, headingH2);
  headingH2.textContent = headingRow.firstElementChild?.textContent.trim() || '';
  sectDet.append(headingH2);

  // CTA Link and CTA Label (fourth and fifth rows)
  const ctaLinkRow = rows[3];
  const ctaLinkLabelRow = rows[4];

  const ctaLinkAnchor = document.createElement('a');
  ctaLinkAnchor.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');

  // Get the actual link from the ctaLinkRow
  const foundCtaLink = ctaLinkRow.firstElementChild?.querySelector('a');
  if (foundCtaLink) {
    ctaLinkAnchor.href = foundCtaLink.href;
  }

  // Get the label from the ctaLinkLabelRow
  const ctaLabelText = ctaLinkLabelRow.firstElementChild?.textContent.trim() || '';
  ctaLinkAnchor.textContent = ctaLabelText;

  moveInstrumentation(ctaLinkRow, ctaLinkAnchor); // Move instrumentation from the original CTA link row
  sectDet.append(ctaLinkAnchor);

  hmCareersCon.append(sectDet);

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(hmCareersCon);
}
