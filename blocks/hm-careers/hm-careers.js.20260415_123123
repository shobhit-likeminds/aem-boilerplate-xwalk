import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Use content detection for rows, as array destructuring is prone to errors if content order changes.
  // The BlockJson model has 5 fields, so we expect 5 rows.
  const rows = [...block.children];

  const hmCareersCon = document.createElement('div');
  hmCareersCon.classList.add('hm-careers-con');

  // Image (expected in the first row)
  const imageRow = rows[0];
  const figure = document.createElement('figure');
  const imageCell = imageRow?.firstElementChild;
  const picture = imageCell?.querySelector('picture');
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

  // Section Details
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Sub Title (expected in the second row)
  const subTitleRow = rows[1];
  const subTtle = document.createElement('div');
  subTtle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(subTitleRow, subTtle);
  subTtle.textContent = subTitleRow?.firstElementChild?.textContent.trim() || '';
  sectDet.append(subTtle);

  // Heading (expected in the third row)
  const headingRow = rows[2];
  const commonTtle = document.createElement('h2');
  commonTtle.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headingRow, commonTtle);
  commonTtle.innerHTML = headingRow?.firstElementChild?.innerHTML || '';
  sectDet.append(commonTtle);

  // CTA Link (expected in the fourth row for href, fifth for label)
  const ctaLinkRow = rows[3]; // This row contains the actual <a> tag for the href
  const ctaLinkLabelRow = rows[4]; // This row contains the text content for the label

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');

  const foundCtaLink = ctaLinkRow?.firstElementChild?.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
  }
  // The label comes from the ctaLinkLabelRow
  const ctaLinkLabel = ctaLinkLabelRow?.firstElementChild?.textContent.trim();
  ctaLink.textContent = ctaLinkLabel || '';
  moveInstrumentation(ctaLinkRow, ctaLink); // Instrument the link row
  sectDet.append(ctaLink);

  hmCareersCon.append(sectDet);

  block.textContent = '';
  block.classList.add('hm-careers');
  block.append(hmCareersCon);
}
