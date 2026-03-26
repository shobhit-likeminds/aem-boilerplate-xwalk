import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('breadcrumb-breadCrumb-sp4');

  [...block.children].forEach((row) => {
    // Each row represents a 'breadcrumb-item' with three cells: link, text, separator
    const cells = row.children;

    // Cell 0: Link
    if (cells[0]) {
      const linkElement = cells[0].querySelector('a');
      if (linkElement) {
        const breadcrumbLink = document.createElement('a');
        breadcrumbLink.classList.add('breadcrumb-breadCrumbLink-HWo');
        breadcrumbLink.href = linkElement.href;
        moveInstrumentation(cells[0], breadcrumbLink);
        while (cells[0].firstChild) breadcrumbLink.append(cells[0].firstChild);
        container.append(breadcrumbLink);
      }
    }

    // Cell 1: Text
    if (cells[1]) {
      // Only append text if it's not part of a link (i.e., if the link cell was empty or not present)
      // Based on the BlockJson, text is a separate field, so it should always be appended if present.
      const text = document.createElement('span');
      text.classList.add('breadcrumb-breadCrumbText-xuk');
      moveInstrumentation(cells[1], text);
      while (cells[1].firstChild) text.append(cells[1].firstChild);
      container.append(text);
    }

    // Cell 2: Separator
    if (cells[2]) {
      const separator = document.createElement('span');
      separator.classList.add('breadcrumb-breadCrumbSeparator-xlX');
      moveInstrumentation(cells[2], separator);
      while (cells[2].firstChild) separator.append(cells[2].firstChild);
      container.append(separator);
    }
  });

  block.textContent = '';
  block.append(container);
}
