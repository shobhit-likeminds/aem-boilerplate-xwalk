import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    subtitleRow,
    headlineRow,
    descriptionRow,
    ctaLinkRow,
    ctaLabelRow,
  ] = [...block.children];

  const sustainabilityDiv = document.createElement('div');
  // The block's own class 'sustainability' is already on the outer div.
  // The original HTML shows 'hm-suatainability' as the inner wrapper class.
  sustainabilityDiv.classList.add('hm-suatainability');
  moveInstrumentation(block, sustainabilityDiv);

  // Background Image
  const figure = document.createElement('figure');
  const backgroundImageCell = backgroundImageRow.children[0];
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
  sustainabilityDiv.append(figure);

  // Section Details
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Subtitle
  const subTtle = document.createElement('div');
  subTtle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(subtitleRow, subTtle);
  // Subtitle is a text field, content is directly in the cell's first child (which is the cell itself)
  subTtle.textContent = subtitleRow.children[0]?.textContent.trim() || '';
  sectDet.append(subTtle);

  // Headline
  const commonTtle = document.createElement('h2');
  commonTtle.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headlineRow, commonTtle);
  // Headline is a text field, content is directly in the cell's first child (which is the cell itself)
  commonTtle.textContent = headlineRow.children[0]?.textContent.trim() || '';
  sectDet.append(commonTtle);

  // Description
  const descriptionP = document.createElement('p');
  descriptionP.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(descriptionRow, descriptionP);
  // Description is a richtext field, content is directly in the cell's first child (which is the cell itself)
  descriptionP.innerHTML = descriptionRow.children[0]?.innerHTML || '';
  sectDet.append(descriptionP);

  // CTA Link and Label
  const ctaLinkCell = ctaLinkRow.children[0];
  const ctaLink = ctaLinkCell.querySelector('a');
  if (ctaLink) {
    const btnBox = document.createElement('a');
    btnBox.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    btnBox.href = ctaLink.href;
    moveInstrumentation(ctaLinkRow, btnBox);
    // CTA Label is a text field, content is directly in the cell's first child (which is the cell itself)
    btnBox.textContent = ctaLabelRow.children[0]?.textContent.trim() || '';
    sectDet.append(btnBox);
  }

  sustainabilityDiv.append(sectDet);
  block.replaceChildren(sustainabilityDiv);
}
