import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('delightful-delicacies-section');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('mb-md-0', 'mb-3', 'text-center');
    while (row.firstElementChild) item.append(row.firstElementChild);
    [...item.children].forEach((div) => {
      if (div.querySelector('img')) {
        div.className = 'delightful-delicacies-left-image-div';
      } else if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'delightful-delicacies-health-goal-wrapper';
      } else if (div.querySelector('a')) {
        div.className = 'delightful-delicacies-image-label';
      } else {
        div.classList.add('delightful-delicacies-container', 'read-more');
      }
    });
    section.append(item);
  });

  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(section);
}
