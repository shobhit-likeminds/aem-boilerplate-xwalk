import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSwitchersContainer = document.createElement('div');
  headerSwitchersContainer.classList.add('header-switchersContainer-CN6', 'bg-gray-100', 'hidden', 'px-8', 'w-full', 'sm_block');
  moveInstrumentation(block, headerSwitchersContainer); // Move instrumentation from block to the new container

  const headerSwitchers = document.createElement('div');
  headerSwitchers.classList.add('header-switchers-WuM', 'auto-cols-max', 'grid', 'grid-flow-col', 'justify-end', 'max-w-site', 'mx-auto', 'relative', 'w-full', 'z-menu');
  // Since the block itself is empty and we're replacing its content with a new structure,
  // we don't need to move instrumentation from block to headerSwitchers directly,
  // as headerSwitchersContainer is the direct replacement for the block's content.

  // The original block has no children (fields), so we just append the new structure.
  headerSwitchersContainer.append(headerSwitchers);
  block.textContent = '';
  block.append(headerSwitchersContainer);
}
