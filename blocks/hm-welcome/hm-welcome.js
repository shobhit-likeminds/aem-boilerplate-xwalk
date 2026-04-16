import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [dotRightImageRow, dotLeftImageRow, headingRow, descriptionRow] = [...block.children];

  block.textContent = '';
  block.classList.add('hm-welcome');

  // Dot Right Image
  const dotRightDiv = document.createElement('div');
  dotRightDiv.classList.add('dot-right');
  const [dotRightImageCell] = [...dotRightImageRow.children]; // Access the single cell
  const dotRightPicture = dotRightImageCell.querySelector('picture');
  if (dotRightPicture) {
    const img = dotRightPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotRightDiv.append(optimizedPic);
  }
  block.append(dotRightDiv);
  moveInstrumentation(dotRightImageRow, dotRightDiv);

  // Dot Left Image
  const dotLeftDiv = document.createElement('div');
  dotLeftDiv.classList.add('dot-left');
  const [dotLeftImageCell] = [...dotLeftImageRow.children]; // Access the single cell
  const dotLeftPicture = dotLeftImageCell.querySelector('picture');
  if (dotLeftPicture) {
    const img = dotLeftPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotLeftDiv.append(optimizedPic);
  }
  block.append(dotLeftDiv);
  moveInstrumentation(dotLeftImageRow, dotLeftDiv);

  // Content container
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp', 'intro-para');
  // Add animation classes from original HTML, but without 'wow' and 'animated' as they are JS-driven
  // and 'animate__' is a utility class for the animation library.
  // The actual animation is 'animate__fadeInUp'.
  containerWrapper.classList.add('animate__', 'animate__fadeInUp');

  const hmWelcomeCon = document.createElement('div');
  hmWelcomeCon.classList.add('hm-welcome-con');

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle');
  heading.textContent = headingRow.textContent.trim();
  hmWelcomeCon.append(heading);
  moveInstrumentation(headingRow, heading);

  // Description
  const description = document.createElement('p');
  description.innerHTML = descriptionRow.innerHTML;
  hmWelcomeCon.append(description);
  moveInstrumentation(descriptionRow, description);

  containerWrapper.append(hmWelcomeCon);
  block.append(containerWrapper);
}
