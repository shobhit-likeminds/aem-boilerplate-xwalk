import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const button = document.createElement('button');
  button.classList.add(
    'mask-root-xlR',
    'appearance-none',
    'bg-black',
    'block',
    'cursor-pointer',
    'fixed',
    'h-full',
    'left-0',
    'opacity-0',
    'top-0',
    'w-full',
    'z-mask',
    'invisible',
  );

  moveInstrumentation(block, button);
  block.textContent = '';
  block.append(button);

  // Interactivity: Add event listener for the button
  button.addEventListener('click', () => {
    button.classList.toggle('invisible');
  });
}
