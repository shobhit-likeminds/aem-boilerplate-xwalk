import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
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

  const iconCell = iconRow.firstElementChild;
  const picture = iconCell?.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '48' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      button.append(optimizedPic);
    }
  }

  // Add scroll event listener to show/hide the button
  const showButton = () => {
    if (window.scrollY > 200) { // Adjust scroll threshold as needed
      button.style.display = 'flex';
    } else {
      button.style.display = 'none';
    }
  };

  window.addEventListener('scroll', showButton);
  showButton(); // Call on load to set initial state

  // Add click event listener to scroll to top
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  block.textContent = '';
  moveInstrumentation(iconRow, button);
  block.append(button);
}
