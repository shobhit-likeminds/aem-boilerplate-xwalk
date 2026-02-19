import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const titlePostTitle = block.querySelector('.title-post-title');
  if (titlePostTitle) {
    const h1 = document.createElement('h1');
    moveInstrumentation(titlePostTitle, h1);
    h1.classList.add('title-post-title');
    h1.textContent = titlePostTitle.textContent;
    block.replaceChildren(h1);
  }
}