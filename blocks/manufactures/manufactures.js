import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    headingRow,
    heroImageDesktopRow,
    heroImageMobileRow,
    sideImageRow,
    descriptionRow,
  ] = [...block.children];

  // Create the main container
  const section = document.createElement('section');
  section.classList.add('manufactures');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container');

  // Heading
  const headingCell = headingRow.firstElementChild;
  if (headingCell) {
    const heading = document.createElement('h3');
    heading.classList.add('hd4', 'CTR', 'os-animation', 'animated', 'fadeInUp');
    heading.textContent = headingCell.textContent.trim();
    moveInstrumentation(headingRow, heading);
    container.append(heading);
  }

  // Hero Image
  const heroImageDesktopCell = heroImageDesktopRow.firstElementChild;
  const heroImageMobileCell = heroImageMobileRow.firstElementChild;

  const heroImgDiv = document.createElement('div');
  heroImgDiv.classList.add('hero-img', 'os-animation', 'animated', 'fadeInUp');

  if (heroImageDesktopCell) {
    const picture = heroImageDesktopCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1145' }]);
      optimizedPic.querySelector('img').classList.add('img-responsive', 'hidden-xs');
      moveInstrumentation(heroImageDesktopRow, optimizedPic.querySelector('img'));
      heroImgDiv.append(optimizedPic);
    }
  }

  if (heroImageMobileCell) {
    const picture = heroImageMobileCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '332' }]);
      optimizedPic.querySelector('img').classList.add('img-responsive', 'visible-xs');
      moveInstrumentation(heroImageMobileRow, optimizedPic.querySelector('img'));
      heroImgDiv.append(optimizedPic);
    }
  }

  if (heroImgDiv.children.length > 0) {
    container.append(heroImgDiv);
  }

  // Row for Side Image and Description
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Side Image
  const sideImageCell = sideImageRow.firstElementChild;
  if (sideImageCell) {
    const colSm4 = document.createElement('div');
    colSm4.classList.add('col-sm-4', 'col-sm-push-8');
    moveInstrumentation(sideImageRow, colSm4);

    const imgBox = document.createElement('div');
    imgBox.classList.add('img-box', 'os-animation', 'animated', 'fadeInUp');

    const picture = sideImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '280' }]);
      optimizedPic.querySelector('img').classList.add('lazyloaded'); // Original HTML has this class
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imgBox.append(optimizedPic);
    }
    colSm4.append(imgBox);
    rowDiv.append(colSm4);
  }

  // Description
  const descriptionCell = descriptionRow.firstElementChild;
  if (descriptionCell) {
    const colSm8 = document.createElement('div');
    colSm8.classList.add('col-sm-8', 'col-sm-pull-4');
    moveInstrumentation(descriptionRow, colSm8);

    const manufacInfo = document.createElement('div');
    manufacInfo.classList.add('manufac-info', 'os-animation', 'animated', 'fadeInUp');
    manufacInfo.innerHTML = descriptionCell.innerHTML;
    colSm8.append(manufacInfo);
    rowDiv.append(colSm8);
  }

  if (rowDiv.children.length > 0) {
    container.append(rowDiv);
  }

  section.append(container);

  block.textContent = '';
  block.append(section);
}
