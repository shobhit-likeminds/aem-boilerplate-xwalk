import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('text-align-center', 'text-koi-theme');
  wrapper.setAttribute('id', 'text-ac7d0b8693');

  [...block.children].forEach((row) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);

    const cells = [...row.children];

    // Cell 0: richtext
    const cell0 = cells[0];
    if (cell0) {
      const cell0Wrapper = document.createElement('div');
      while (cell0.firstChild) {
        cell0Wrapper.append(cell0.firstChild);
      }
      item.append(cell0Wrapper);
    }

    wrapper.append(item);
  });

  block.textContent = '';
  block.append(wrapper);
}
