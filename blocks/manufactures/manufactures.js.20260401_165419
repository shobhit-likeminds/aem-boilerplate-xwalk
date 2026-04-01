import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    headingRow,
    mainImageDesktopRow,
    mainImageMobileRow,
    sideImageRow,
    descriptionRow,
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('manufactures');

  const container = document.createElement('div');
  container.classList.add('container');

  // Heading
  const heading = document.createElement('h3');
  // The heading content is expected to be in the first child of headingRow
  const headingContent = headingRow.querySelector('div');
  if (headingContent) {
    moveInstrumentation(headingContent, heading);
    heading.classList.add('hd4', 'CTR', 'os-animation', 'animated', 'fadeInUp');
    heading.innerHTML = headingContent.innerHTML;
    container.append(heading);
  }


  // Hero Image
  const heroImgDiv = document.createElement('div');
  heroImgDiv.classList.add('hero-img', 'os-animation', 'animated', 'fadeInUp');

  // Main Image Desktop
  const desktopPicture = mainImageDesktopRow.querySelector('picture');
  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1145' }]);
    moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
    optimizedDesktopPic.querySelector('img').classList.add('img-responsive', 'hidden-xs', 'lazyloaded');
    heroImgDiv.append(optimizedDesktopPic);
  }

  // Main Image Mobile
  const mobilePicture = mainImageMobileRow.querySelector('picture');
  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '332' }]);
    moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
    optimizedMobilePic.querySelector('img').classList.add('img-responsive', 'visible-xs', 'lazyload');
    heroImgDiv.append(optimizedMobilePic);
  }
  container.append(heroImgDiv);

  // Row for side image and description
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Side Image
  const colSm4 = document.createElement('div');
  colSm4.classList.add('col-sm-4', 'col-sm-push-8');
  const imgBox = document.createElement('div');
  imgBox.classList.add('img-box', 'os-animation', 'animated', 'fadeInUp');
  const sidePicture = sideImageRow.querySelector('picture');
  if (sidePicture) {
    const sideImg = sidePicture.querySelector('img');
    const optimizedSidePic = createOptimizedPicture(sideImg.src, sideImg.alt, false, [{ width: '280' }]);
    moveInstrumentation(sideImg, optimizedSidePic.querySelector('img'));
    optimizedSidePic.querySelector('img').classList.add('lazyloaded');
    imgBox.append(optimizedSidePic);
  }
  colSm4.append(imgBox);
  rowDiv.append(colSm4);

  // Description
  const colSm8 = document.createElement('div');
  colSm8.classList.add('col-sm-8', 'col-sm-pull-4');
  const manufacInfo = document.createElement('div');
  // The description content is expected to be in the first child of descriptionRow
  const descriptionContent = descriptionRow.querySelector('div');
  if (descriptionContent) {
    moveInstrumentation(descriptionContent, manufacInfo);
    manufacInfo.classList.add('manufac-info', 'os-animation', 'animated', 'fadeInUp');
    // Move all child nodes from the description content div to manufacInfo
    while (descriptionContent.firstChild) {
      manufacInfo.append(descriptionContent.firstChild);
    }
  }
  colSm8.append(manufacInfo);
  rowDiv.append(colSm8);

  container.append(rowDiv);
  block.append(container);
}
