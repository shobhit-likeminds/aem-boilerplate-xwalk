import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block itself is the button element based on the original HTML.
  // The EDS block structure shows a div, but the original HTML is a button.
  // We need to ensure the block element itself has the correct classes and behavior.
  // Since the block is already a div, we will create a button and move its children.

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

  // Move any existing children (instrumentation) from the block to the new button
  moveInstrumentation(block, button);

  // Clear the block and append the new button
  block.textContent = '';
  block.append(button);

  // Add event listener for the button (mask functionality)
  button.addEventListener('click', () => {
    // This button acts as a mask. When clicked, it should likely hide itself
    // or trigger an action to hide the content it's masking.
    // For now, we'll just toggle its visibility.
    button.classList.toggle('invisible');
    button.classList.toggle('opacity-0'); // Assuming it should also toggle opacity
  });
}
