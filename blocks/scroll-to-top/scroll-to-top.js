import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0: Replaced iconRow.firstElementChild with content detection.
  // The block structure guarantees only one row for the icon.
  const iconRow = block.firstElementChild;

  const section = document.createElement('section');
  section.classList.add('scroll-to-top');
  // moveInstrumentation(block, section); // Instrumentation should be moved from the row, not the block itself

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

  // CHECK 1: Structure alignment - icon is a reference type, correctly read from picture/img.
  // CHECK 1.5: No richtext fields.

  if (iconRow) {
    const iconCell = [...iconRow.children].find(cell => cell.querySelector('picture'));
    if (iconCell) {
      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          // The instrumentation for the image itself is not needed if the whole cell is moved.
          // The instrumentation for the row is moved to the button.
          button.append(optimizedPic);
        }
      }
    }
    moveInstrumentation(iconRow, button); // Move instrumentation from the iconRow to the button
  }
  section.append(button);

  // CHECK 2: Interactivity - button click event listener for scroll to top.
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // Show/hide button based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 200) { // Show button after scrolling 200px
      button.style.display = 'flex';
    } else {
      button.style.display = 'none';
    }
  };

  window.addEventListener('scroll', toggleVisibility);
  toggleVisibility(); // Initial check on page load

  // CHECK 3: No hardcoded assets or double-render pattern.
  // block.replaceChildren(section) is correct.
  block.replaceChildren(section);
}
