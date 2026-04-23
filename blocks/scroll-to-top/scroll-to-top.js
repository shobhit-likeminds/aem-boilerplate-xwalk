import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Replaced block.children[0] with destructuring for the single root row
  const [iconRow] = [...block.children];

  const button = document.createElement('button');
  button.classList.add(
    'scroll-to-top__btn',
    'position-fixed',
    'end-0',
    'bottom-0',
    'mb-6',
    'me-6',
    'z-10',
    'cursor-pointer',
    'rounded-circle',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'bg-red-100',
  );

  // CHECK 1: Access the cell containing the picture from the iconRow
  const iconCell = iconRow.children[0]; // This is safe because iconRow is a single row with a single cell for the icon field

  const picture = iconCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      // CHECK 3: Ensure createOptimizedPicture is used correctly and instrumentation is moved
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      // moveInstrumentation should be called on the original element and the new element that replaces it
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      button.append(optimizedPic);
    }
  }

  // CHECK 2: Interactivity - click listener for scroll to top
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // Initially hide the button
  button.style.display = 'none';

  // CHECK 2: Interactivity - scroll listener for showing/hiding button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) { // Adjust scroll threshold as needed
      button.style.display = 'flex';
    } else {
      button.style.display = 'none';
    }
  });

  // CHECK 3: moveInstrumentation for the root row
  // The instrumentation from the original iconRow should be moved to the new button element
  moveInstrumentation(iconRow, button);
  block.replaceChildren(button);
}
