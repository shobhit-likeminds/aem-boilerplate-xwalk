import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children based on the BlockJson model order
  const [
    backgroundDesktopRow,
    backgroundMobileRow,
    ariaLabelRow,
    descriptionRow, // Description is a root field, not an item row
    ...titleItemRows // Remaining rows are title-item item rows
  ] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('container', 'responsivegrid', 'cmp-container--multiTitle');

  const cmpContainer = document.createElement('div');
  cmpContainer.classList.add('cmp-container');
  moveInstrumentation(block, cmpContainer);

  const desktopPicture = backgroundDesktopRow.querySelector('picture');
  const mobilePicture = backgroundMobileRow.querySelector('picture');
  const ariaLabelText = ariaLabelRow.textContent.trim();

  if (ariaLabelText) {
    cmpContainer.setAttribute('aria-label', ariaLabelText);
  }

  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    if (desktopImg) {
      cmpContainer.style.backgroundImage = `url(${desktopImg.src})`;
      cmpContainer.style.backgroundSize = 'cover';
      cmpContainer.style.backgroundRepeat = 'no-repeat';
      cmpContainer.setAttribute('data-attribute-desktop', desktopImg.src);
      moveInstrumentation(backgroundDesktopRow, cmpContainer);
    }
  }

  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    if (mobileImg) {
      cmpContainer.setAttribute('data-attribute-mobile', mobileImg.src);
      moveInstrumentation(backgroundMobileRow, cmpContainer);
    }
  }

  const aemGrid = document.createElement('div');
  aemGrid.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');

  const titleContainerGridColumn = document.createElement('div');
  titleContainerGridColumn.classList.add('container', 'responsivegrid', 'aem-GridColumn', 'aem-GridColumn--default--12');

  const innerCmpContainer = document.createElement('div');
  innerCmpContainer.classList.add('cmp-container');

  titleItemRows.forEach((row, index) => {
    // Each title-item row has a single cell containing the title text
    const titleTextCell = row.querySelector('div'); 
    if (titleTextCell) {
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('title');

      // Apply specific color classes based on index, matching original HTML pattern
      if (index === 1) {
        titleDiv.classList.add('color-text-primary-2');
      } else if (index === 2) {
        titleDiv.classList.add('color-text-primary-3');
      } else if (index === 3) {
        titleDiv.classList.add('color-text-primary-5');
      }

      const cmpTitle = document.createElement('div');
      cmpTitle.classList.add('cmp-title');

      const titleElement = document.createElement('h1');
      titleElement.classList.add('cmp-title__text');
      titleElement.textContent = titleTextCell.textContent.trim();

      moveInstrumentation(row, titleElement); // Move instrumentation from the row to the title element

      cmpTitle.append(titleElement);
      titleDiv.append(cmpTitle);
      innerCmpContainer.append(titleDiv);
    }
  });

  titleContainerGridColumn.append(innerCmpContainer);
  aemGrid.append(titleContainerGridColumn);

  const descriptionGridColumn = document.createElement('div');
  descriptionGridColumn.classList.add('text', 'aem-GridColumn', 'aem-GridColumn--default--12');

  const cmpText = document.createElement('div');
  cmpText.classList.add('cmp-text');
  if (descriptionRow) {
    // Description is a richtext field, so use innerHTML
    cmpText.innerHTML = descriptionRow.innerHTML;
    moveInstrumentation(descriptionRow, cmpText);
  }

  descriptionGridColumn.append(cmpText);
  aemGrid.append(descriptionGridColumn);

  cmpContainer.append(aemGrid);
  container.append(cmpContainer);

  block.replaceChildren(container);

  // Optimize images
  container.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
