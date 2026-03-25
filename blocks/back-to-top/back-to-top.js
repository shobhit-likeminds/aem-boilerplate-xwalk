import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const backToTopLink = document.createElement('a');
  moveInstrumentation(block, backToTopLink); // Move instrumentation from block to the new link
  backToTopLink.id = 'back-to-top';
  backToTopLink.href = '#';
  backToTopLink.classList.add('btn', 'btn-primary', 'btn-lg', 'back-to-top');
  backToTopLink.setAttribute('role', 'button');
  backToTopLink.setAttribute('title', 'Click to return on the top');

  const iconSpan = document.createElement('span');
  iconSpan.classList.add('fa', 'fa-arrow-up');
  backToTopLink.append(iconSpan);

  backToTopLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  block.textContent = '';
  block.append(backToTopLink);
}
