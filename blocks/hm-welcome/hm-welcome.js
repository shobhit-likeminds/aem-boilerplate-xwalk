import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block.children here are the rows from the EDS structure.
  // Each row contains a single cell (div) which holds the actual content.
  const rows = [...block.children];

  block.textContent = '';
  block.classList.add('hm-welcome');

  // Dot Right Image
  // Find the row that contains a picture element for the dot-right image
  const dotRightImageRow = rows.find(row => row.querySelector('picture') && row.textContent.includes('Dot Right Image'));
  if (dotRightImageRow) {
    const dotRightDiv = document.createElement('div');
    dotRightDiv.classList.add('dot-right');
    const dotRightPicture = dotRightImageRow.querySelector('picture');
    if (dotRightPicture) {
      const img = dotRightPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      dotRightDiv.append(optimizedPic);
    }
    block.append(dotRightDiv);
    moveInstrumentation(dotRightImageRow, dotRightDiv);
  }


  // Dot Left Image
  // Find the row that contains a picture element for the dot-left image
  const dotLeftImageRow = rows.find(row => row.querySelector('picture') && row.textContent.includes('Dot Left Image'));
  if (dotLeftImageRow) {
    const dotLeftDiv = document.createElement('div');
    dotLeftDiv.classList.add('dot-left');
    const dotLeftPicture = dotLeftImageRow.querySelector('picture');
    if (dotLeftPicture) {
      const img = dotLeftPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      dotLeftDiv.append(optimizedPic);
    }
    block.append(dotLeftDiv);
    moveInstrumentation(dotLeftImageRow, dotLeftDiv);
  }

  // Content Container
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp', 'intro-para', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  containerWrapper.style.visibility = 'visible';
  containerWrapper.style.animationName = 'fadeInUp';

  const welcomeContent = document.createElement('div');
  welcomeContent.classList.add('hm-welcome-con');

  // Heading
  // Find the row that contains the heading text
  const headingRow = rows.find(row => row.textContent.trim().length > 0 && !row.querySelector('picture') && !row.querySelector('p'));
  if (headingRow) {
    const headingEl = document.createElement('h2');
    headingEl.classList.add('common-ttle');
    moveInstrumentation(headingRow, headingEl);
    headingEl.textContent = headingRow.textContent.trim();
    welcomeContent.append(headingEl);
  }

  // Description
  // Find the row that contains the description paragraph
  const descriptionRow = rows.find(row => row.querySelector('p'));
  if (descriptionRow) {
    const descriptionEl = document.createElement('p');
    moveInstrumentation(descriptionRow, descriptionEl);
    // Append all child elements (like <br>) from the description row's cell to the new <p>
    const descriptionCell = descriptionRow.querySelector('div');
    if (descriptionCell) {
      while (descriptionCell.firstElementChild) {
        descriptionEl.append(descriptionCell.firstElementChild);
      }
      // Also append any direct text nodes if present
      if (descriptionCell.textContent.trim().length > 0) {
        descriptionEl.prepend(document.createTextNode(descriptionCell.textContent.trim()));
      }
    }
    welcomeContent.append(descriptionEl);
  }

  containerWrapper.append(welcomeContent);
  block.append(containerWrapper);
}
