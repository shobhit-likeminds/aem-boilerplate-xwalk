import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [iconCell] = [...block.children];

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

  const img = iconCell?.querySelector('img');
  if (img) {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    button.append(optimizedPic);
  }

  // Add scroll event listener to show/hide the button
  const toggleVisibility = () => {
    if (window.scrollY > 200) { // Show button after scrolling down 200px
      button.style.display = 'flex';
    } else {
      button.style.display = 'none';
    }
  };

  // Initial check and add event listener
  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility);

  // Add click event listener for scrolling to top
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  moveInstrumentation(iconCell, button);
  block.replaceChildren(button);
}
