import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Using destructuring for root rows as per BlockJson model
  const [dotRightImageRow, dotLeftImageRow, headingRow, descriptionRow] = [...block.children];

  block.textContent = '';
  // CHECK 1: Class name 'hm-welcome' is from original HTML
  block.classList.add('hm-welcome');

  // Dot Right Image
  if (dotRightImageRow) {
    const dotRightDiv = document.createElement('div');
    // CHECK 1: Class name 'dot-right' is from original HTML
    dotRightDiv.classList.add('dot-right');
    const picture = dotRightImageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        dotRightDiv.append(optimizedPic);
      }
    }
    moveInstrumentation(dotRightImageRow, dotRightDiv);
    block.append(dotRightDiv);
  }

  // Dot Left Image
  if (dotLeftImageRow) {
    const dotLeftDiv = document.createElement('div');
    // CHECK 1: Class name 'dot-left' is from original HTML
    dotLeftDiv.classList.add('dot-left');
    const picture = dotLeftImageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        dotLeftDiv.append(optimizedPic);
      }
    }
    moveInstrumentation(dotLeftImageRow, dotLeftDiv);
    block.append(dotLeftDiv);
  }

  // Content Wrapper
  const containerWrapper = document.createElement('div');
  // CHECK 1: All class names are from original HTML
  containerWrapper.classList.add('container-1600-wrp', 'intro-para', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  containerWrapper.style.visibility = 'visible';
  containerWrapper.style.animationName = 'fadeInUp';

  const hmWelcomeCon = document.createElement('div');
  // CHECK 1: Class name 'hm-welcome-con' is from original HTML
  hmWelcomeCon.classList.add('hm-welcome-con');

  // Heading
  if (headingRow) {
    // CHECK 1: Accessing the first child for a single-cell row
    const headingCell = headingRow.firstElementChild;
    if (headingCell) {
      const h2 = document.createElement('h2');
      // CHECK 1: Class name 'common-ttle' is from original HTML
      h2.classList.add('common-ttle');
      h2.textContent = headingCell.textContent.trim();
      moveInstrumentation(headingRow, h2);
      hmWelcomeCon.append(h2);
    }
  }

  // Description
  if (descriptionRow) {
    // CHECK 1: Accessing the first child for a single-cell row
    const descriptionCell = descriptionRow.firstElementChild;
    if (descriptionCell) {
      const p = document.createElement('p');
      // CHECK 1: Reading as richtext via innerHTML
      p.innerHTML = descriptionCell.innerHTML;
      moveInstrumentation(descriptionRow, p);
      hmWelcomeCon.append(p);
    }
  }

  containerWrapper.append(hmWelcomeCon);
  block.append(containerWrapper);

  // CHECK 2: No interactive elements (buttons, toggles, etc.) found in original HTML, so no addEventListener needed.
}
