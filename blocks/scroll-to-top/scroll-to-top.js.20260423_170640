import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Correctly destructuring the single row as per BlockJson and EDS structure.
  // The block has only one child row, which contains the icon.
  const [iconRow] = [...block.children];
  const iconCell = iconRow?.firstElementChild; // Get the actual cell containing the picture

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

  // CHECK 1.5: Not applicable as no richtext fields.

  // CHECK 3: Ensure instrumentation is moved for the picture and its img.
  const picture = iconCell?.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      // createOptimizedPicture expects the img element itself, not its src.
      // The third argument is eager, which should be false for lazy loading.
      // The fourth argument is an array of widths.
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      // Move instrumentation from the original img to the new optimized img
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      button.append(optimizedPic);
    }
  }

  // Move instrumentation from the original icon cell to the new button element
  // This ensures the button itself is editable in UE if needed.
  moveInstrumentation(iconRow, button);

  // CHECK 2: Interactivity - Adding event listener for scroll-to-top functionality.
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  const handleScroll = () => {
    if (window.scrollY > 200) { // Show button after scrolling down 200px
      button.style.display = 'flex';
    } else {
      button.style.display = 'none';
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check to set button visibility on page load

  // CHECK 3: Replacing children atomically after all instrumentation is moved.
  block.replaceChildren(button);
}
