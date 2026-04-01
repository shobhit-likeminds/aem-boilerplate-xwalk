import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children directly as per BlockJson model
  const [
    headingRow,
    imageDesktopRow,
    imageMobileRow,
    imageBoxRow,
    manufacInfoRow,
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('manufactures');

  const container = document.createElement('div');
  container.classList.add('container');

  // Heading
  const headingEl = document.createElement('h3');
  moveInstrumentation(headingRow.firstElementChild, headingEl);
  headingEl.classList.add('hd4', 'CTR', 'os-animation', 'animated', 'fadeInUp');
  headingEl.innerHTML = headingRow.firstElementChild.innerHTML;
  container.append(headingEl);

  // Hero Image (Desktop and Mobile)
  const heroImgDiv = document.createElement('div');
  heroImgDiv.classList.add('hero-img', 'os-animation', 'animated', 'fadeInUp');

  const desktopPicture = imageDesktopRow.querySelector('picture');
  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1145' }]);
    optimizedDesktopPic.querySelector('img').classList.add('img-responsive', 'hidden-xs');
    moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
    heroImgDiv.append(optimizedDesktopPic);
  }

  const mobilePicture = imageMobileRow.querySelector('picture');
  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '332' }]);
    optimizedMobilePic.querySelector('img').classList.add('img-responsive', 'visible-xs');
    moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
    heroImgDiv.append(optimizedMobilePic);
  }
  container.append(heroImgDiv);

  // Row for Image Box and Manufac Info
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Image Box
  const colSm4Push8 = document.createElement('div');
  colSm4Push8.classList.add('col-sm-4', 'col-sm-push-8');
  const imgBoxDiv = document.createElement('div');
  imgBoxDiv.classList.add('img-box', 'os-animation', 'animated', 'fadeInUp');

  const imageBoxPicture = imageBoxRow.querySelector('picture');
  if (imageBoxPicture) {
    const imageBoxImg = imageBoxPicture.querySelector('img');
    const optimizedImageBoxPic = createOptimizedPicture(imageBoxImg.src, imageBoxImg.alt, false, [{ width: '280' }]);
    moveInstrumentation(imageBoxImg, optimizedImageBoxPic.querySelector('img'));
    imgBoxDiv.append(optimizedImageBoxPic);
  }
  colSm4Push8.append(imgBoxDiv);
  rowDiv.append(colSm4Push8);

  // Manufac Info
  const colSm8Pull4 = document.createElement('div');
  colSm8Pull4.classList.add('col-sm-8', 'col-sm-pull-4');
  const manufacInfoDiv = document.createElement('div');
  manufacInfoDiv.classList.add('manufac-info', 'os-animation', 'animated', 'fadeInUp');
  moveInstrumentation(manufacInfoRow.firstElementChild, manufacInfoDiv);
  manufacInfoDiv.innerHTML = manufacInfoRow.firstElementChild.innerHTML;
  colSm8Pull4.append(manufacInfoDiv);
  rowDiv.append(colSm8Pull4);

  container.append(rowDiv);
  block.append(container);
}
