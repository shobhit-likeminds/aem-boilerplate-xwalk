import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Use content detection instead of fixed index access for rows that might vary
  const rows = [...block.children];

  // Dot Right Image
  const dotRightImageRow = rows.find((row) => row.querySelector('picture') && row.textContent.includes('Dot Right Image'));
  const dotRightDiv = document.createElement('div');
  dotRightDiv.classList.add('dot-right');
  if (dotRightImageRow) {
    const dotRightPicture = dotRightImageRow.querySelector('picture');
    if (dotRightPicture) {
      const img = dotRightPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      dotRightDiv.append(optimizedPic);
    }
    moveInstrumentation(dotRightImageRow, dotRightDiv);
  }

  // Dot Left Image
  const dotLeftImageRow = rows.find((row) => row.querySelector('picture') && row.textContent.includes('Dot Left Image'));
  const dotLeftDiv = document.createElement('div');
  dotLeftDiv.classList.add('dot-left');
  if (dotLeftImageRow) {
    const dotLeftPicture = dotLeftImageRow.querySelector('picture');
    if (dotLeftPicture) {
      const img = dotLeftPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      dotLeftDiv.append(optimizedPic);
    }
    moveInstrumentation(dotLeftImageRow, dotLeftDiv);
  }

  // Heading and Description rows can be safely accessed by index if they are guaranteed to be in order
  // after the image rows are potentially filtered out, or better, use content detection for all.
  // For this specific block, the model implies a fixed order after the images, so we can use a more robust approach:
  const headingRow = rows.find((row) => !row.querySelector('picture') && row.textContent.trim() === 'Heading label text');
  const descriptionRow = rows.find((row) => !row.querySelector('picture') && row.innerHTML.includes('Description text content'));


  // Content container
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('container-1600-wrp', 'intro-para', 'wow', 'animate__', 'animate__fadeInUp', 'animated');

  const hmWelcomeCon = document.createElement('div');
  hmWelcomeCon.classList.add('hm-welcome-con');

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle');
  if (headingRow) {
    heading.textContent = headingRow.textContent.trim();
    moveInstrumentation(headingRow, heading);
  }
  hmWelcomeCon.append(heading);

  // Description
  const description = document.createElement('p');
  if (descriptionRow) {
    description.innerHTML = descriptionRow.innerHTML;
    moveInstrumentation(descriptionRow, description);
  }
  hmWelcomeCon.append(description);

  contentContainer.append(hmWelcomeCon);

  block.textContent = '';
  block.classList.add('hm-welcome');
  block.append(dotRightDiv, dotLeftDiv, contentContainer);
}
