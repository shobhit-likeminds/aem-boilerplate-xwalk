import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const breadcrumbContainer = document.createElement('div');
  breadcrumbContainer.classList.add('breadcrumb-breadCrumb-sp4');

  [...block.children].forEach((row) => {
    const cells = [...row.children];

    // According to the BlockJson and EDS Block Structure, each row has 3 cells:
    // cell[0]: link
    // cell[1]: text
    // cell[2]: separator
    const linkCell = cells[0];
    const textCell = cells[1];
    const separatorCell = cells[2];

    let linkElement = null;
    let textElement = null;
    let separatorElement = null;

    // Process link cell
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkElement = document.createElement('a');
        linkElement.classList.add('breadcrumb-breadCrumbLink-HWo');
        linkElement.href = foundLink.href;
        moveInstrumentation(linkCell, linkElement);
        while (linkCell.firstChild) linkElement.append(linkCell.firstChild);
      }
    }

    // Process text cell
    if (textCell) {
      textElement = document.createElement('span');
      textElement.classList.add('breadcrumb-breadCrumbText-xuk');
      moveInstrumentation(textCell, textElement);
      while (textCell.firstChild) textElement.append(textCell.firstChild);
    }

    // Process separator cell
    if (separatorCell) {
      separatorElement = document.createElement('span');
      separatorElement.classList.add('breadcrumb-breadCrumbSeparator-xlX');
      moveInstrumentation(separatorCell, separatorElement);
      while (separatorCell.firstChild) separatorElement.append(separatorCell.firstChild);
    }

    if (linkElement) {
      breadcrumbContainer.append(linkElement);
    }
    if (separatorElement) { // Separator should come after the link
      breadcrumbContainer.append(separatorElement);
    }
    if (textElement) { // Text should come after the separator
      breadcrumbContainer.append(textElement);
    }
  });

  block.textContent = '';
  block.append(breadcrumbContainer);
}
