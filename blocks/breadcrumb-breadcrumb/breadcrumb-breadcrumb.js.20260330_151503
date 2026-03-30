import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const breadcrumbContainer = document.createElement('div');
  breadcrumbContainer.classList.add('breadcrumb-breadCrumb-sp4');
  moveInstrumentation(block, breadcrumbContainer);

  [...block.children].forEach((row) => {
    const [linkCell, labelCell, separatorCell] = [...row.children];

    const linkEl = linkCell.querySelector('a');
    if (linkEl) {
      const newLink = document.createElement('a');
      newLink.classList.add('breadcrumb-breadCrumbLink-HWo'); // Corrected class name
      newLink.href = linkEl.href;
      moveInstrumentation(linkCell, newLink);
      while (linkCell.firstChild) newLink.append(linkCell.firstChild);
      breadcrumbContainer.append(newLink);
    }

    const labelText = labelCell.textContent.trim();
    if (labelText) {
      const labelSpan = document.createElement('span');
      labelSpan.classList.add('breadcrumb-breadCrumbText-xuk'); // Corrected class name
      labelSpan.textContent = labelText;
      breadcrumbContainer.append(labelSpan);
    }

    const separatorText = separatorCell.textContent.trim();
    if (separatorText) {
      const separatorSpan = document.createElement('span');
      separatorSpan.classList.add('breadcrumb-breadCrumbSeparator-xlX'); // Corrected class name
      separatorSpan.textContent = separatorText;
      breadcrumbContainer.append(separatorSpan);
    }
  });

  block.textContent = '';
  block.append(breadcrumbContainer);
}
