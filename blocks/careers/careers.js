import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    sectionLabelRow,
    headlineRow,
    ctaLinkRow,
    ctaLabelRow,
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('hm-careers');
  moveInstrumentation(block, section); // Move instrumentation from block to section

  const careersContainer = document.createElement('div');
  careersContainer.classList.add('hm-careers-con');
  section.append(careersContainer);

  // Background Image
  const figure = document.createElement('figure');
  const picture = backgroundImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('bg-cover');
      moveInstrumentation(img, optimizedImg);
      figure.append(optimizedPic);
    }
  }
  moveInstrumentation(backgroundImageRow, figure);
  careersContainer.append(figure);

  // Section Details
  const sectionDetails = document.createElement('div');
  sectionDetails.classList.add('sect-det');
  careersContainer.append(sectionDetails);

  // Section Label
  const subTitle = document.createElement('div');
  subTitle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  subTitle.textContent = sectionLabelRow.textContent.trim();
  moveInstrumentation(sectionLabelRow, subTitle);
  sectionDetails.append(subTitle);

  // Headline
  const headline = document.createElement('h2');
  headline.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  // FIX: headlineRow is a richtext cell, so read its innerHTML directly.
  // The original code used headlineRow.children[0]?.innerHTML which would be correct if
  // the richtext content was wrapped in an additional div inside the cell, but it's not.
  // It's directly inside the cell div.
  headline.innerHTML = headlineRow.innerHTML;
  moveInstrumentation(headlineRow, headline);
  sectionDetails.append(headline);

  // CTA Link and Label
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const foundLink = ctaLinkRow.querySelector('a');
  if (foundLink) {
    ctaLink.href = foundLink.href;
  }
  ctaLink.textContent = ctaLabelRow.textContent.trim();
  moveInstrumentation(ctaLinkRow, ctaLink);
  // FIX: Removed redundant moveInstrumentation for ctaLabelRow.
  // The ctaLink element already has instrumentation from ctaLinkRow.
  // moveInstrumentation(ctaLabelRow, ctaLink);
  sectionDetails.append(ctaLink);

  block.replaceChildren(section);
}
