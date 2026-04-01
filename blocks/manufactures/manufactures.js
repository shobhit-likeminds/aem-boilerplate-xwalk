import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    headingRow,
    heroImageDesktopRow,
    heroImageMobileRow,
    imageRow,
    descriptionRow,
  ] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('container');

  // Heading
  const headingEl = document.createElement('h3');
  moveInstrumentation(headingRow.firstElementChild, headingEl);
  headingEl.classList.add('hd4', 'CTR', 'os-animation', 'animated', 'fadeInUp');
  // Ensure we append the actual content of the heading cell, not the cell itself
  while (headingRow.firstElementChild.firstChild) {
    headingEl.append(headingRow.firstElementChild.firstChild);
  }
  container.append(headingEl);

  // Hero Image
  const heroImgDiv = document.createElement('div');
  heroImgDiv.classList.add('hero-img', 'os-animation', 'animated', 'fadeInUp');

  // Hero Image Desktop
  const heroImageDesktopPicture = heroImageDesktopRow.firstElementChild.querySelector('picture');
  if (heroImageDesktopPicture) {
    const imgDesktop = heroImageDesktopPicture.querySelector('img');
    const optimizedPicDesktop = createOptimizedPicture(imgDesktop.src, imgDesktop.alt, false, [{ width: '1145' }]);
    optimizedPicDesktop.querySelector('img').classList.add('img-responsive', 'hidden-xs', 'lazyloaded');
    moveInstrumentation(heroImageDesktopRow.firstElementChild, optimizedPicDesktop);
    heroImgDiv.append(optimizedPicDesktop);
  }

  // Hero Image Mobile
  const heroImageMobilePicture = heroImageMobileRow.firstElementChild.querySelector('picture');
  if (heroImageMobilePicture) {
    const imgMobile = heroImageMobilePicture.querySelector('img');
    const optimizedPicMobile = createOptimizedPicture(imgMobile.src, imgMobile.alt, false, [{ width: '332' }]);
    optimizedPicMobile.querySelector('img').classList.add('img-responsive', 'visible-xs', 'lazyload');
    moveInstrumentation(heroImageMobileRow.firstElementChild, optimizedPicMobile);
    heroImgDiv.append(optimizedPicMobile);
  }
  container.append(heroImgDiv);

  // Row for image and description
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Image column
  const colSm4 = document.createElement('div');
  colSm4.classList.add('col-sm-4', 'col-sm-push-8');
  const imgBox = document.createElement('div');
  imgBox.classList.add('img-box', 'os-animation', 'animated', 'fadeInUp');

  const imagePicture = imageRow.firstElementChild.querySelector('picture');
  if (imagePicture) {
    const img = imagePicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '280' }]);
    optimizedPic.querySelector('img').classList.add('lazyloaded');
    moveInstrumentation(imageRow.firstElementChild, optimizedPic);
    imgBox.append(optimizedPic);
  }
  colSm4.append(imgBox);
  rowDiv.append(colSm4);

  // Description column
  const colSm8 = document.createElement('div');
  colSm8.classList.add('col-sm-8', 'col-sm-pull-4');
  const manufacInfo = document.createElement('div');
  manufacInfo.classList.add('manufac-info', 'os-animation', 'animated', 'fadeInUp');
  moveInstrumentation(descriptionRow.firstElementChild, manufacInfo);
  while (descriptionRow.firstElementChild.firstChild) {
    manufacInfo.append(descriptionRow.firstElementChild.firstChild);
  }
  colSm8.append(manufacInfo);
  rowDiv.append(colSm8);

  container.append(rowDiv);

  block.textContent = '';
  block.append(container);
}
