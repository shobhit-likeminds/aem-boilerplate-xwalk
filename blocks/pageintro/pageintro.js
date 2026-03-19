import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('pageintro-container');

  const [imageRow, titleRow, descriptionRow] = [...block.children];

  // Image
  const imageDiv = document.createElement('div');
  imageDiv.classList.add('pageintro-image');
  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageDiv.append(optimizedPic);
    }
  }
  moveInstrumentation(imageRow, imageDiv); // Move instrumentation from the row to the new imageDiv
  section.append(imageDiv);

  // Content
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('pageintro-content', 'pageintro-content-with-image');

  const innerDiv = document.createElement('div');
  innerDiv.classList.add('pageintro-inner');

  // Title
  const titleEl = document.createElement('h1');
  titleEl.classList.add('pageintro-title');
  moveInstrumentation(titleRow, titleEl);
  while (titleRow.firstChild) titleEl.append(titleRow.firstChild);
  innerDiv.append(titleEl);

  // Description
  const descriptionEl = document.createElement('div');
  descriptionEl.classList.add('pageintro-description');
  moveInstrumentation(descriptionRow, descriptionEl);
  while (descriptionRow.firstChild) descriptionEl.append(descriptionRow.firstChild);
  innerDiv.append(descriptionEl);

  contentDiv.append(innerDiv);
  section.append(contentDiv);

  block.textContent = '';
  block.append(section);
}
