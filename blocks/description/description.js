import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [pageHeadRow, bodyRow] = [...block.children];

  const pageHeadElement = document.createElement('h1');
  pageHeadElement.classList.add('pageHead');
  moveInstrumentation(pageHeadRow, pageHeadElement);
  while (pageHeadRow.firstChild) {
    pageHeadElement.append(pageHeadRow.firstChild);
  }

  const bodyContent = document.createElement('div');
  moveInstrumentation(bodyRow, bodyContent);
  while (bodyRow.firstChild) {
    bodyContent.append(bodyRow.firstChild);
  }

  block.textContent = '';
  block.append(pageHeadElement);
  block.append(bodyContent);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
