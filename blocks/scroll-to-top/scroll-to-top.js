import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Correctly destructure the row and find the icon cell
  const [iconRow] = [...block.children];
  const iconCell = [...iconRow.children].find((cell) => cell.querySelector('picture'));

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

  if (iconCell) {
    const picture = iconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        // CHECK 3: Ensure createOptimizedPicture is used correctly and instrumentation is moved
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img')); // Move instrumentation from original img to new img
        button.append(optimizedPic);
      }
    }
    // CHECK 3: Move instrumentation from the original iconRow to the new button element
    moveInstrumentation(iconRow, button);
  }

  // CHECK 2: Interactivity - event listeners for scroll and click
  const handleScroll = () => {
    if (window.scrollY > 100) {
      button.style.display = 'flex';
    } else {
      button.style.display = 'none';
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  button.addEventListener('click', scrollToTop);
  window.addEventListener('scroll', handleScroll);

  // Initial check on load
  handleScroll();

  // CHECK 3: Atomically replace children after all elements are built and instrumentation moved
  block.replaceChildren(button);
}
