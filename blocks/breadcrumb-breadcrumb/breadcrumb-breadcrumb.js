import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const breadcrumbContainer = document.createElement('div');
  breadcrumbContainer.classList.add('breadcrumb-breadCrumb-sp4');

  // Skip the first row which is just the container label.
  // All subsequent rows are breadcrumb items.
  const itemRows = [...block.children].slice(1);

  itemRows.forEach((row) => {
    // According to BlockJson for 'breadcrumb-item':
    // cell[0]: field="link" label="Link" type=aem-content
    // cell[1]: field="text" label="Text" type=text
    // cell[2]: field="separator" label="Separator" type=text
    const [linkCell, textCell, separatorCell] = row.children;

    if (linkCell) {
      const link = linkCell.querySelector('a');
      if (link) {
        const breadcrumbLink = document.createElement('a');
        breadcrumbLink.classList.add('breadcrumb-breadCrumbLink-HWo');
        breadcrumbLink.href = link.href;
        moveInstrumentation(linkCell, breadcrumbLink);
        while (linkCell.firstChild) breadcrumbLink.append(linkCell.firstChild);
        breadcrumbContainer.append(breadcrumbLink);
      }
    }

    if (textCell) {
      const breadcrumbText = document.createElement('span');
      breadcrumbText.classList.add('breadcrumb-breadCrumbText-xuk');
      moveInstrumentation(textCell, breadcrumbText);
      while (textCell.firstChild) breadcrumbText.append(textCell.firstChild);
      breadcrumbContainer.append(breadcrumbText);
    }

    if (separatorCell) {
      const breadcrumbSeparator = document.createElement('span');
      breadcrumbSeparator.classList.add('breadcrumb-breadCrumbSeparator-xlX');
      moveInstrumentation(separatorCell, breadcrumbSeparator);
      while (separatorCell.firstChild) breadcrumbSeparator.append(separatorCell.firstChild);
      breadcrumbContainer.append(breadcrumbSeparator);
    }
  });

  block.textContent = '';
  block.append(breadcrumbContainer);
}
