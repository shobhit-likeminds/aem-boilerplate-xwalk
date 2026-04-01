import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children to access rows by their semantic meaning
  const [headingRow, imageDesktopRow, imageMobileRow, imageSideRow, descriptionRow] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('container');

  // Heading
  const headingEl = document.createElement('h3');
  headingEl.classList.add('hd4', 'CTR', 'os-animation', 'animated', 'fadeInUp');
  moveInstrumentation(headingRow, headingEl);
  // Append content from the headingRow's first child (the div containing the text)
  const headingContentDiv = headingRow.querySelector('div');
  if (headingContentDiv) {
    while (headingContentDiv.firstChild) headingEl.append(headingContentDiv.firstChild);
  }
  container.append(headingEl);

  // Hero Image (Desktop and Mobile)
  const heroImgDiv = document.createElement('div');
  heroImgDiv.classList.add('hero-img', 'os-animation', 'animated', 'fadeInUp');

  // Desktop Image
  const desktopPicture = imageDesktopRow.querySelector('picture');
  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1145' }]);
    optimizedDesktopPic.querySelector('img').classList.add('img-responsive', 'hidden-xs', 'lazyloaded');
    moveInstrumentation(imageDesktopRow, optimizedDesktopPic);
    heroImgDiv.append(optimizedDesktopPic);
  }

  // Mobile Image
  const mobilePicture = imageMobileRow.querySelector('picture');
  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '332' }]);
    optimizedMobilePic.querySelector('img').classList.add('img-responsive', 'visible-xs', 'lazyload');
    moveInstrumentation(imageMobileRow, optimizedMobilePic);
    heroImgDiv.append(optimizedMobilePic);
  }

  container.append(heroImgDiv);

  // Row for Side Image and Description
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Side Image
  const colSm4 = document.createElement('div');
  colSm4.classList.add('col-sm-4', 'col-sm-push-8');
  const imgBoxDiv = document.createElement('div');
  imgBoxDiv.classList.add('img-box', 'os-animation', 'animated', 'fadeInUp');
  const sidePicture = imageSideRow.querySelector('picture');
  if (sidePicture) {
    const sideImg = sidePicture.querySelector('img');
    const optimizedSidePic = createOptimizedPicture(sideImg.src, sideImg.alt, false, [{ width: '280' }]);
    optimizedSidePic.querySelector('img').classList.add('lazyloaded'); // Class from original HTML
    moveInstrumentation(imageSideRow, optimizedSidePic);
    imgBoxDiv.append(optimizedSidePic);
  }
  colSm4.append(imgBoxDiv);
  rowDiv.append(colSm4);

  // Description
  const colSm8 = document.createElement('div');
  colSm8.classList.add('col-sm-8', 'col-sm-pull-4');
  const manufacInfoDiv = document.createElement('div');
  manufacInfoDiv.classList.add('manufac-info', 'os-animation', 'animated', 'fadeInUp');
  moveInstrumentation(descriptionRow, manufacInfoDiv);
  // Append content from the descriptionRow's first child (the div containing the richtext)
  const descriptionContentDiv = descriptionRow.querySelector('div');
  if (descriptionContentDiv) {
    while (descriptionContentDiv.firstChild) manufacInfoDiv.append(descriptionContentDiv.firstChild);
  }
  colSm8.append(manufacInfoDiv);
  rowDiv.append(colSm8);

  container.append(rowDiv);

  block.textContent = '';
  block.append(container);
}
