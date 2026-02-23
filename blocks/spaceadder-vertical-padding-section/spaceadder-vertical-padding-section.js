import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('spaceadder-vertical-padding-section', 'spaceadder-padding-80');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);


    section.append(item);
  });

  block.textContent = '';
  block.append(section);
}
