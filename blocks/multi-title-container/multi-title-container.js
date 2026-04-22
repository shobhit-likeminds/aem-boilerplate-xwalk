import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    ariaLabelRow,
    backgroundImageDesktopRow,
    backgroundImageMobileRow,
    descriptionRow,
    ...titleItemRows
  ] = [...block.children];

  const rootContainer = document.createElement('div');
  rootContainer.classList.add('container', 'responsivegrid', 'cmp-container--multiTitle');

  const cmpContainer = document.createElement('div');
  cmpContainer.classList.add('cmp-container');
  moveInstrumentation(ariaLabelRow, cmpContainer);

  const ariaLabel = ariaLabelRow.firstElementChild?.textContent.trim();
  if (ariaLabel) {
    cmpContainer.setAttribute('aria-label', ariaLabel);
  }

  const desktopPicture = backgroundImageDesktopRow.querySelector('picture');
  if (desktopPicture) {
    const img = desktopPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      cmpContainer.style.backgroundImage = `url(${optimizedPic.querySelector('img').src})`;
      cmpContainer.style.backgroundSize = 'cover';
      cmpContainer.style.backgroundRepeat = 'no-repeat';
      cmpContainer.setAttribute('data-attribute-desktop', optimizedPic.querySelector('img').src);
    }
  }

  const mobilePicture = backgroundImageMobileRow.querySelector('picture');
  if (mobilePicture) {
    const img = mobilePicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      cmpContainer.setAttribute('data-attribute-mobile', optimizedPic.querySelector('img').src);
    }
  }

  const aemGrid = document.createElement('div');
  aemGrid.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');

  const titleContainerGridColumn = document.createElement('div');
  titleContainerGridColumn.classList.add('container', 'responsivegrid', 'aem-GridColumn', 'aem-GridColumn--default--12');

  const innerCmpContainer = document.createElement('div');
  innerCmpContainer.classList.add('cmp-container');

  titleItemRows.forEach((row) => {
    // Use content detection instead of fixed index access for robustness
    const cells = [...row.children];
    const titleTextCell = cells.find(cell => !cell.textContent.trim().startsWith('color-text-primary-')); // Assuming title text won't start with color class
    const titleColorClassCell = cells.find(cell => cell.textContent.trim().startsWith('color-text-primary-'));

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    moveInstrumentation(row, titleDiv); // Move instrumentation from the item row to the titleDiv

    const titleColorClass = titleColorClassCell?.textContent.trim();
    if (titleColorClass) {
      titleDiv.classList.add(titleColorClass);
    }

    const cmpTitle = document.createElement('div');
    cmpTitle.classList.add('cmp-title');

    const h1 = document.createElement('h1');
    h1.classList.add('cmp-title__text');
    h1.textContent = titleTextCell?.textContent.trim();

    cmpTitle.append(h1);
    titleDiv.append(cmpTitle);
    innerCmpContainer.append(titleDiv);
  });

  titleContainerGridColumn.append(innerCmpContainer);
  aemGrid.append(titleContainerGridColumn);

  const textGridColumn = document.createElement('div');
  textGridColumn.classList.add('text', 'aem-GridColumn', 'aem-GridColumn--default--12');
  moveInstrumentation(descriptionRow, textGridColumn);

  const cmpText = document.createElement('div');
  cmpText.classList.add('cmp-text');
  cmpText.innerHTML = descriptionRow.firstElementChild?.innerHTML || '';
  textGridColumn.append(cmpText);
  aemGrid.append(textGridColumn);

  cmpContainer.append(aemGrid);
  rootContainer.append(cmpContainer);

  block.replaceChildren(rootContainer);
}
