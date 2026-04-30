import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    sectionSubtitleRow,
    sectionTitleRow,
    ctaLinkRow,
    ctaLabelRow,
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('hm-careers'); // This is the outer block div, already has the class from AEM.

  const container = document.createElement('div');
  container.classList.add('hm-careers-con');
  section.append(container);

  // Background Image
  const figure = document.createElement('figure');
  const picture = backgroundImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    figure.append(optimizedPic);
    figure.querySelector('img').classList.add('bg-cover');
  }
  moveInstrumentation(backgroundImageRow, figure);
  container.append(figure);

  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');
  container.append(sectDet);

  // Section Subtitle
  const subTitle = document.createElement('div');
  subTitle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  subTitle.textContent = sectionSubtitleRow.children[0]?.textContent.trim() || ''; // Read from cell, not row
  moveInstrumentation(sectionSubtitleRow, subTitle);
  sectDet.append(subTitle);

  // Section Title
  const commonTitle = document.createElement('h2');
  commonTitle.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  commonTitle.innerHTML = sectionTitleRow.children[0]?.innerHTML || ''; // Richtext content from cell, not row
  moveInstrumentation(sectionTitleRow, commonTitle);
  sectDet.append(commonTitle);

  // CTA Link and Label
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');

  const foundLink = ctaLinkRow.children[0]?.querySelector('a'); // Read from cell
  if (foundLink) {
    ctaLink.href = foundLink.href;
  }
  ctaLink.textContent = ctaLabelRow.children[0]?.textContent.trim() || ''; // Read from cell

  moveInstrumentation(ctaLinkRow, ctaLink);
  moveInstrumentation(ctaLabelRow, ctaLink); // Added instrumentation for CTA label row
  sectDet.append(ctaLink);

  block.replaceChildren(section);
}
