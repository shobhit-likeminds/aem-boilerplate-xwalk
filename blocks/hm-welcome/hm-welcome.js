import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    dotRightImageRow,
    dotLeftImageRow,
    headingRow,
    descriptionRow,
  ] = [...block.children];

  block.classList.add('hm-welcome');

  // Dot Right Image
  const dotRightDiv = document.createElement('div');
  dotRightDiv.classList.add('dot-right');
  const dotRightPicture = dotRightImageRow.querySelector('picture');
  if (dotRightPicture) {
    const img = dotRightPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotRightDiv.append(optimizedPic);
  }
  moveInstrumentation(dotRightImageRow, dotRightDiv);
  block.append(dotRightDiv);

  // Dot Left Image
  const dotLeftDiv = document.createElement('div');
  dotLeftDiv.classList.add('dot-left');
  const dotLeftPicture = dotLeftImageRow.querySelector('picture');
  if (dotLeftPicture) {
    const img = dotLeftPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotLeftDiv.append(optimizedPic);
  }
  moveInstrumentation(dotLeftImageRow, dotLeftDiv);
  block.append(dotLeftDiv);

  // Content Wrapper
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp', 'intro-para', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  containerWrapper.style.visibility = 'visible'; // This is from original HTML, but for animation, it's usually handled by JS. Keep it for exact replication.
  containerWrapper.style.animationName = 'fadeInUp';

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('hm-welcome-con');

  // Heading
  const headingCell = headingRow.firstElementChild;
  if (headingCell && headingCell.textContent.trim()) {
    const heading = document.createElement('h2');
    heading.classList.add('common-ttle');
    heading.textContent = headingCell.textContent.trim();
    moveInstrumentation(headingRow, heading);
    contentDiv.append(heading);
  }

  // Description
  const descriptionCell = descriptionRow.firstElementChild;
  if (descriptionCell && descriptionCell.innerHTML.trim()) {
    const description = document.createElement('p');
    description.innerHTML = descriptionCell.innerHTML;
    moveInstrumentation(descriptionRow, description);
    contentDiv.append(description);
  }

  containerWrapper.append(contentDiv);
  block.append(containerWrapper);

  // Remove original rows as they've been processed
  dotRightImageRow.remove();
  dotLeftImageRow.remove();
  headingRow.remove();
  descriptionRow.remove();
}
