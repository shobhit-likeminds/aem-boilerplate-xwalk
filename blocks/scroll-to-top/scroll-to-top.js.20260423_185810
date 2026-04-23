import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Replaced direct index access with content detection
  // The block structure indicates a single row with a single cell containing a picture.
  const buttonIconRow = [...block.children][0];
  const buttonIconCell = [...buttonIconRow.children].find(cell => cell.querySelector('picture'));

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

  const picture = buttonIconCell?.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      // CHECK 3: createOptimizedPicture is used, but the original HTML shows an SVG.
      // For SVG, we should just append the picture element directly or its innerHTML if it's an SVG tag.
      // Assuming createOptimizedPicture handles SVG correctly, but if it's a direct SVG tag,
      // it might be better to just append the picture or the SVG itself.
      // Given the original HTML has <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776943773565.svg+xml"/>
      // it suggests it's an <img> tag pointing to an SVG, so createOptimizedPicture is appropriate.
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      button.append(optimizedPic);
    }
  }

  // CHECK 2: Interactivity - addEventListener for scroll-to-top button
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

  // Initial check and add event listener
  handleScroll();
  window.addEventListener('scroll', handleScroll);

  // CHECK 3: moveInstrumentation and replaceChildren for Universal Editor compatibility
  // Ensure instrumentation is moved from the original row to the new button element.
  if (buttonIconRow) { // Ensure buttonIconRow exists before moving instrumentation
    moveInstrumentation(buttonIconRow, button);
  }
  block.replaceChildren(button);
}
