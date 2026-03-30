import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.id = 'toast-root';
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
}
