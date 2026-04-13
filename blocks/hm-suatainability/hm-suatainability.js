import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  // Extract content from each row using content detection
  const backgroundImageRow = rows[0];
  const subTitleRow = rows[1];
  const headingRow = rows[2];
  const descriptionRow = rows[3];
  const ctaLinkRow = rows[4];
  const ctaLinkLabelRow = rows[5]; // This row's content is used for the label, but the link itself comes from ctaLinkRow

  // Background Image
  const figure = document.createElement('figure');
  const picture = backgroundImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
      figure.querySelector('img').classList.add('bg-cover');
    }
  }

  // Section Details
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Sub Title
  const subTitleDiv = document.createElement('div');
  const subTitleContent = subTitleRow.querySelector('div');
  if (subTitleContent) {
    moveInstrumentation(subTitleContent, subTitleDiv);
    subTitleDiv.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    subTitleDiv.textContent = subTitleContent.textContent.trim();
    sectDet.append(subTitleDiv);
  }

  // Heading
  const headingH2 = document.createElement('h2');
  const headingContent = headingRow.querySelector('div');
  if (headingContent) {
    moveInstrumentation(headingContent, headingH2);
    headingH2.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    headingH2.textContent = headingContent.textContent.trim();
    sectDet.append(headingH2);
  }

  // Description
  const descriptionP = document.createElement('p');
  const descriptionContent = descriptionRow.querySelector('div');
  if (descriptionContent) {
    moveInstrumentation(descriptionContent, descriptionP);
    descriptionP.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
    while (descriptionContent.firstChild) descriptionP.append(descriptionContent.firstChild);
    sectDet.append(descriptionP);
  }

  // CTA Link
  const ctaAnchor = document.createElement('a');
  const foundCtaLink = ctaLinkRow.querySelector('a');
  const ctaLinkLabelContent = ctaLinkLabelRow.querySelector('div');

  if (foundCtaLink) {
    ctaAnchor.href = foundCtaLink.href;
    moveInstrumentation(foundCtaLink, ctaAnchor); // Instrument the actual link element
  } else {
    // Fallback instrumentation if no <a> is found in ctaLinkRow
    moveInstrumentation(ctaLinkRow, ctaAnchor);
  }

  ctaAnchor.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  // Use the text from ctaLinkLabelRow for the button text
  if (ctaLinkLabelContent) {
    ctaAnchor.textContent = ctaLinkLabelContent.textContent.trim();
  } else if (foundCtaLink) {
    // Fallback to the link text if ctaLinkLabelRow is empty or malformed
    ctaAnchor.textContent = foundCtaLink.textContent.trim();
  }
  sectDet.append(ctaAnchor);

  block.textContent = '';
  block.append(figure, sectDet);
}
