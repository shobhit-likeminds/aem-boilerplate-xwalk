import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow] = [...block.children];

  const h1 = document.createElement('h1');
  h1.classList.add('elementor-heading-title', 'elementor-size-default');

  // Assuming the heading value is directly inside the first cell of the headingRow
  const headingCell = headingRow.querySelector('div');
  if (headingCell) {
    moveInstrumentation(headingCell, h1);
    while (headingCell.firstChild) {
      h1.append(headingCell.firstChild);
    }
  }

  const elementorWidgetContainer = document.createElement('div');
  elementorWidgetContainer.classList.add('elementor-widget-container');
  elementorWidgetContainer.append(h1);

  block.textContent = '';
  block.classList.add('elementor-element', 'elementor-element-cbf9496', 'elementor-widget', 'elementor-widget-theme-archive-title', 'elementor-page-title', 'elementor-widget-heading');
  block.append(elementorWidgetContainer);
}
