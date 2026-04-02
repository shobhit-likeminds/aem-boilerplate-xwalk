import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('wp-block-uagb-container', 'block-bg-grey', 'uagb-block-a4fa65f2', 'alignfull', 'uagb-is-root-container');

  const innerWrap = document.createElement('div');
  innerWrap.classList.add('uagb-container-inner-blocks-wrap');
  container.append(innerWrap);

  const columns = document.createElement('div');
  columns.classList.add('wp-block-columns', 'is-layout-flex', 'wp-container-core-columns-is-layout-9d6595d7', 'wp-block-columns-is-layout-flex');
  innerWrap.append(columns);

  [...block.children].forEach((row) => {
    const column = document.createElement('div');
    column.classList.add('wp-block-column', 'is-layout-flow', 'wp-block-column-is-layout-flow');
    moveInstrumentation(row, column);

    const linkEl = document.createElement('a');
    linkEl.classList.add('mind-module');
    column.append(linkEl);

    const cells = [...row.children];
    const foundLinkCell = cells.find(cell => cell.querySelector('a'));
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const titleCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim());
    const descriptionCell = cells.find(cell => cell !== foundLinkCell && cell !== imageCell && cell !== titleCell && cell.textContent.trim());

    if (foundLinkCell && foundLinkCell.querySelector('a')) {
      linkEl.href = foundLinkCell.querySelector('a').href;
    }

    if (imageCell) {
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('mind-module-image');
      moveInstrumentation(imageCell, imageDiv);
      while (imageCell.firstChild) imageDiv.append(imageCell.firstChild);
      linkEl.append(imageDiv);
    }

    if (titleCell) {
      const titleH3 = document.createElement('h3');
      titleH3.classList.add('mind-module-title');
      moveInstrumentation(titleCell, titleH3);
      while (titleCell.firstChild) titleH3.append(titleH3.firstChild); // Corrected: append to titleH3, not titleCell
      linkEl.append(titleH3);
    }

    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('mind-module-description', 'block_mob_desc');
      moveInstrumentation(descriptionCell, descriptionDiv);
      while (descriptionCell.firstChild) descriptionDiv.append(descriptionDiv.firstChild); // Corrected: append to descriptionDiv, not descriptionCell
      linkEl.append(descriptionDiv);
    }

    columns.append(column);
  });

  columns.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(container);
}
