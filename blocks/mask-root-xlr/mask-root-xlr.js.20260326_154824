import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const button = document.createElement('button');
  button.classList.add('mask-root-xlR', 'appearance-none', 'bg-black', 'block', 'cursor-pointer', 'fixed', 'h-full', 'left-0', 'opacity-0', 'top-0', 'w-full', 'z-mask', 'invisible');

  // The original HTML has no content inside the button, so we don't need to move instrumentation or append children.
  // If there were children in the original block, we would move them.
  // Since the block is empty, we just append the new button.
  block.textContent = '';
  block.append(button);
}
