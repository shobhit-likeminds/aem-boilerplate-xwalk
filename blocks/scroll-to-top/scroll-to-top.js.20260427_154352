import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Replaced block.children[0] with content detection
  const iconRow = [...block.children].find((row) => row.querySelector('picture'));
  const iconCell = iconRow ? [...iconRow.children].find((cell) => cell.querySelector('picture')) : null;

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
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        // Move instrumentation from the original img to the new optimized img
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        button.append(optimizedPic);
      }
    }
    // CHECK 3: Move instrumentation from the iconCell itself to the button,
    // as the button is the new container for the icon.
    moveInstrumentation(iconCell, button);
  }

  // CHECK 2: Interactivity - click event listener for scrolling
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  // CHECK 2: Interactivity - scroll event listener for showing/hiding the button
  const showButtonThreshold = 200; // Pixels scrolled before button appears
  const handleScroll = () => {
    if (window.scrollY > showButtonThreshold) {
      button.style.display = 'flex'; // Use flex to maintain d-flex styling
    } else {
      button.style.display = 'none';
    }
  };

  // Initial check and add event listener
  handleScroll();
  window.addEventListener('scroll', handleScroll);

  // CHECK 3: Replace the block content with the new button
  // The original iconRow's instrumentation is now on the button.
  block.replaceChildren(button);
}
