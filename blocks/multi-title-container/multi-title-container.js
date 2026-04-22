import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    ariaLabelRow,
    backgroundDesktopRow,
    backgroundMobileRow,
    descriptionRow,
    ...titleItemRows
  ] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('cmp-container', 'cmp-container--multiTitle');

  // Aria Label
  const ariaLabel = ariaLabelRow?.textContent?.trim() || '';
  if (ariaLabel) {
    container.setAttribute('aria-label', ariaLabel);
  }
  moveInstrumentation(ariaLabelRow, container);

  // Background Images
  const backgroundDesktopPicture = backgroundDesktopRow?.querySelector('picture');
  const backgroundMobilePicture = backgroundMobileRow?.querySelector('picture');

  if (backgroundDesktopPicture) {
    const desktopImg = backgroundDesktopPicture.querySelector('img');
    const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1200' }]);
    moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
    container.style.backgroundImage = `url(${optimizedDesktopPic.querySelector('img').src})`;
    container.style.backgroundSize = 'cover';
    container.style.backgroundRepeat = 'no-repeat';
    container.setAttribute('data-attribute-desktop', optimizedDesktopPic.querySelector('img').src);
  }
  moveInstrumentation(backgroundDesktopRow, container);

  if (backgroundMobilePicture) {
    const mobileImg = backgroundMobilePicture.querySelector('img');
    const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
    container.setAttribute('data-attribute-mobile', optimizedMobilePic.querySelector('img').src);
  }
  moveInstrumentation(backgroundMobileRow, container);

  const grid = document.createElement('div');
  grid.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');

  const titleContainerColumn = document.createElement('div');
  titleContainerColumn.classList.add('container', 'responsivegrid', 'aem-GridColumn', 'aem-GridColumn--default--12');

  const innerTitleContainer = document.createElement('div');
  innerTitleContainer.classList.add('cmp-container');
  titleContainerColumn.append(innerTitleContainer);

  // Titles
  titleItemRows.forEach((row, index) => {
    // Correctly identify the title cell based on its content type (text)
    const titleCell = [...row.children].find(cell => cell.textContent.trim() !== '');
    const titleText = titleCell?.textContent?.trim() || '';

    if (titleText) {
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('title');
      if (index === 1) {
        titleDiv.classList.add('color-text-primary-2');
      } else if (index === 2) {
        titleDiv.classList.add('color-text-primary-3');
      } else if (index === 3) {
        titleDiv.classList.add('color-text-primary-5');
      }

      const cmpTitleDiv = document.createElement('div');
      cmpTitleDiv.classList.add('cmp-title');

      const h1 = document.createElement('h1');
      h1.classList.add('cmp-title__text');
      h1.textContent = titleText;

      moveInstrumentation(row, cmpTitleDiv); // Move instrumentation from original item row to cmpTitleDiv
      cmpTitleDiv.append(h1);
      titleDiv.append(cmpTitleDiv);
      innerTitleContainer.append(titleDiv);
    }
  });

  grid.append(titleContainerColumn);

  // Description
  const descriptionColumn = document.createElement('div');
  descriptionColumn.classList.add('text', 'aem-GridColumn', 'aem-GridColumn--default--12');

  const cmpTextDiv = document.createElement('div');
  cmpTextDiv.classList.add('cmp-text');
  if (descriptionRow) {
    moveInstrumentation(descriptionRow, cmpTextDiv);
    cmpTextDiv.innerHTML = descriptionRow.innerHTML;
  }
  descriptionColumn.append(cmpTextDiv);
  grid.append(descriptionColumn);

  container.append(grid);
  block.replaceChildren(container);
}
