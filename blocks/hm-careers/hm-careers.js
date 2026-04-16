import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageRow,
    subTitleRow,
    commonTitleRow,
    btnBoxRow,
    btnBoxLabelRow,
  ] = [...block.children];

  // Create the main container div
  const hmCareersCon = document.createElement('div');
  hmCareersCon.classList.add('hm-careers-con');

  // Image section
  const figure = document.createElement('figure');
  const picture = imageRow.querySelector('picture');
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

  // Text and button section
  const sectDet = document.createElement('div');
  sectDet.classList.add('sect-det');

  // Sub Title
  const subTtle = document.createElement('div');
  subTtle.classList.add('sub-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const subTitleCell = [...subTitleRow.children].find((cell) => cell.textContent.trim());
  moveInstrumentation(subTitleRow, subTtle);
  subTtle.textContent = subTitleCell?.textContent.trim() || '';
  sectDet.append(subTtle);

  // Common Title
  const commonTtle = document.createElement('h2');
  commonTtle.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const commonTitleCell = [...commonTitleRow.children].find((cell) => cell.textContent.trim());
  moveInstrumentation(commonTitleRow, commonTtle);
  commonTtle.innerHTML = commonTitleCell?.innerHTML || '';
  sectDet.append(commonTtle);

  // Button Link
  const btnBox = document.createElement('a');
  btnBox.classList.add('btn-box', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  const btnBoxLinkCell = [...btnBoxRow.children].find((cell) => cell.querySelector('a'));
  const foundLink = btnBoxLinkCell?.querySelector('a');
  if (foundLink) {
    btnBox.href = foundLink.href;
  }
  const btnBoxLabelCell = [...btnBoxLabelRow.children].find((cell) => cell.textContent.trim());
  moveInstrumentation(btnBoxRow, btnBox);
  btnBox.textContent = btnBoxLabelCell?.textContent.trim() || '';
  sectDet.append(btnBox);

  hmCareersCon.append(sectDet);

  block.textContent = '';
  block.append(hmCareersCon);
  block.classList.add('hm-careers');
}
