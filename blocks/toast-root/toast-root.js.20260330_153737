import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The toast-root block is just an empty container div in the original HTML.
  // It serves as a mount point for dynamic toasts.
  // We need to apply its specific class names to the block itself.
  block.classList.add(
    'toastContainer-root-JDW',
    'top-lg',
    'fixed',
    'gap-y-xs',
    'grid',
    'mb-xs',
    'min-w-full',
    'z-toast',
    'lg_min-w-auto',
    'lg_right-md',
  );

  // The original HTML also has an id="toast-root".
  // Since the block itself is the root, we can set its id.
  block.id = 'toast-root';

  // The block is empty and will be populated dynamically by other scripts.
  // No children to process or move.
}
