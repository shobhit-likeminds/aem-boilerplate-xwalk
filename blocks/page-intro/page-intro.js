import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  const section = document.createElement('section');
  section.classList.add('page-intro');

  // Image
  const imageRow = rows.find(row => row.querySelector('picture'));
  const imageDiv = document.createElement('div');
  imageDiv.classList.add('image');
  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageDiv.append(optimizedPic);
      }
    }
    moveInstrumentation(imageRow, imageDiv);
  }
  section.append(imageDiv);

  // Content
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content', 'with-image');
  const innerDiv = document.createElement('div');
  innerDiv.classList.add('inner');

  // Heading
  const headingRow = rows.find(row => row.querySelector('h1') || (row.textContent.trim() && !row.querySelector('picture') && !row.querySelector('p')));
  if (headingRow) {
    const h1 = document.createElement('h1');
    moveInstrumentation(headingRow, h1);
    while (headingRow.firstChild) h1.append(headingRow.firstChild);
    innerDiv.append(h1);
  }

  // Description
  const descriptionRow = rows.find(row => row.querySelector('p'));
  if (descriptionRow) {
    const descriptionContent = document.createElement('div');
    moveInstrumentation(descriptionRow, descriptionContent);
    while (descriptionRow.firstChild) descriptionContent.append(descriptionRow.firstChild);
    innerDiv.append(descriptionContent);
  }

  contentDiv.append(innerDiv);
  section.append(contentDiv);

  block.textContent = '';
  block.append(section);
}
