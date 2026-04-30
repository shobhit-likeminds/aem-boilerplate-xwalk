import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [rightDotImageRow, leftDotImageRow, headlineRow, descriptionRow] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('hm-welcome'); // This is the block's own class, but it's the root element, so it's fine.

  // Right Dot Image
  const rightDotDiv = document.createElement('div');
  rightDotDiv.classList.add('dot-right');
  const rightPictureCell = rightDotImageRow.children[0]; // Access cell by index
  const rightPicture = rightPictureCell.querySelector('picture');
  if (rightPicture) {
    const img = rightPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    rightDotDiv.append(optimizedPic);
  }
  moveInstrumentation(rightDotImageRow, rightDotDiv);
  section.append(rightDotDiv);

  // Left Dot Image
  const leftDotDiv = document.createElement('div');
  leftDotDiv.classList.add('dot-left');
  const leftPictureCell = leftDotImageRow.children[0]; // Access cell by index
  const leftPicture = leftPictureCell.querySelector('picture');
  if (leftPicture) {
    const img = leftPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    leftDotDiv.append(optimizedPic);
  }
  moveInstrumentation(leftDotImageRow, leftDotDiv);
  section.append(leftDotDiv);

  // Content Wrapper
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp', 'intro-para', 'wow', 'animate__', 'animate__fadeInUp', 'animated');

  const welcomeContentDiv = document.createElement('div');
  welcomeContentDiv.classList.add('hm-welcome-con');

  // Headline
  const headline = document.createElement('h2');
  headline.classList.add('common-ttle');
  const headlineCell = headlineRow.children[0]; // Access cell by index
  headline.textContent = headlineCell.textContent.trim();
  moveInstrumentation(headlineRow, headline);
  welcomeContentDiv.append(headline);

  // Description
  const description = document.createElement('div'); // Changed to div to safely contain richtext
  const descriptionCell = descriptionRow.children[0]; // Access cell by index
  description.innerHTML = descriptionCell?.innerHTML || ''; // Use innerHTML directly from the cell
  moveInstrumentation(descriptionRow, description);
  welcomeContentDiv.append(description);

  containerWrapper.append(welcomeContentDiv);
  section.append(containerWrapper);

  block.replaceChildren(section);
}
