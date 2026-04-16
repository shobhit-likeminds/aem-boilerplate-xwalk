import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [dotRightImageRow, dotLeftImageRow, headingRow, descriptionRow] = [...block.children];

  block.classList.add('hm-welcome');

  // Dot Right Image
  const dotRightDiv = document.createElement('div');
  dotRightDiv.classList.add('dot-right');
  const [dotRightImageCell] = [...dotRightImageRow.children]; // Destructure cell
  const dotRightPicture = dotRightImageCell.querySelector('picture');
  if (dotRightPicture) {
    const img = dotRightPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotRightDiv.append(optimizedPic);
  }
  moveInstrumentation(dotRightImageRow, dotRightDiv);

  // Dot Left Image
  const dotLeftDiv = document.createElement('div');
  dotLeftDiv.classList.add('dot-left');
  const [dotLeftImageCell] = [...dotLeftImageRow.children]; // Destructure cell
  const dotLeftPicture = dotLeftImageCell.querySelector('picture');
  if (dotLeftPicture) {
    const img = dotLeftPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotLeftDiv.append(optimizedPic);
  }
  moveInstrumentation(dotLeftImageRow, dotLeftDiv);

  // Content container
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('container-1600-wrp', 'intro-para', 'wow', 'animate__', 'animate__fadeInUp', 'animated');

  const hmWelcomeCon = document.createElement('div');
  hmWelcomeCon.classList.add('hm-welcome-con');

  // Heading
  const [headingCell] = [...headingRow.children]; // Destructure cell
  const headingElement = document.createElement('h2');
  headingElement.classList.add('common-ttle');
  headingElement.textContent = headingCell.textContent.trim();
  moveInstrumentation(headingRow, headingElement);
  hmWelcomeCon.append(headingElement);

  // Description
  const [descriptionCell] = [...descriptionRow.children]; // Destructure cell
  const descriptionElement = document.createElement('p');
  descriptionElement.innerHTML = descriptionCell.innerHTML;
  moveInstrumentation(descriptionRow, descriptionElement);
  hmWelcomeCon.append(descriptionElement);

  contentContainer.append(hmWelcomeCon);

  // Clear block and append new elements
  block.textContent = '';
  block.append(dotRightDiv, dotLeftDiv, contentContainer);
}
