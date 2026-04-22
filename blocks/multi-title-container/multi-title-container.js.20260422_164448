import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    ariaLabelRow,
    backgroundImageDesktopRow,
    backgroundImageMobileRow,
    ...restRows
  ] = [...block.children];

  // The last row is the description, the preceding ones are title items.
  // The BlockJson model shows: ariaLabel, backgroundImageDesktop, backgroundImageMobile, titles (container), description.
  // So, restRows contains all title-item rows followed by the description row.
  const descriptionRow = restRows[restRows.length - 1];
  const titleItemRows = restRows.slice(0, restRows.length - 1);

  const container = document.createElement('div');
  container.classList.add('cmp-container'); // From ORIGINAL HTML
  moveInstrumentation(block, container);

  const ariaLabel = ariaLabelRow.textContent.trim();
  if (ariaLabel) {
    container.setAttribute('aria-label', ariaLabel);
  }

  const desktopPicture = backgroundImageDesktopRow.querySelector('picture');
  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    if (desktopImg) {
      container.style.backgroundImage = `url(${desktopImg.src})`;
      container.style.backgroundSize = 'cover';
      container.style.backgroundRepeat = 'no-repeat';
      // Move instrumentation from the img to the container for the background image
      // as the image itself is not rendered as a separate element.
      moveInstrumentation(desktopImg, container);
    }
  }

  const mobilePicture = backgroundImageMobileRow.querySelector('picture');
  // mobile background image is handled by CSS media queries,
  // so we add it as a data attribute for the CSS to pick up.
  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    if (mobileImg) {
      container.setAttribute('data-attribute-mobile', mobileImg.src);
      moveInstrumentation(mobileImg, container);
    }
  }

  const grid = document.createElement('div');
  grid.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12'); // From ORIGINAL HTML
  container.append(grid);

  const titleContainerColumn = document.createElement('div');
  titleContainerColumn.classList.add('container', 'responsivegrid', 'aem-GridColumn', 'aem-GridColumn--default--12'); // From ORIGINAL HTML
  grid.append(titleContainerColumn);

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('cmp-container'); // From ORIGINAL HTML
  titleContainerColumn.append(titleWrapper);

  titleItemRows.forEach((row, index) => {
    // The title-item model has only one field: "titleText" of type text.
    // So, we expect exactly one child cell.
    const cells = [...row.children];
    const titleTextCell = cells[0]; // This is safe as per model definition for title-item

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('title'); // From ORIGINAL HTML

    // Apply color classes based on index, matching the original HTML pattern
    if (index === 1) {
      titleDiv.classList.add('color-text-primary-2'); // From ORIGINAL HTML
    } else if (index === 2) {
      titleDiv.classList.add('color-text-primary-3'); // From ORIGINAL HTML
    } else if (index === 3) {
      titleDiv.classList.add('color-text-primary-5'); // From ORIGINAL HTML
    }

    const cmpTitleDiv = document.createElement('div');
    cmpTitleDiv.classList.add('cmp-title'); // From ORIGINAL HTML
    titleDiv.append(cmpTitleDiv);

    const h1 = document.createElement('h1');
    h1.classList.add('cmp-title__text'); // From ORIGINAL HTML
    h1.textContent = titleTextCell.textContent.trim();
    cmpTitleDiv.append(h1);

    moveInstrumentation(row, titleDiv);
    titleWrapper.append(titleDiv);
  });

  const textColumn = document.createElement('div');
  textColumn.classList.add('text', 'aem-GridColumn', 'aem-GridColumn--default--12'); // From ORIGINAL HTML
  grid.append(textColumn);

  const cmpTextDiv = document.createElement('div');
  cmpTextDiv.classList.add('cmp-text'); // From ORIGINAL HTML
  if (descriptionRow) {
    // Description is a richtext field, so innerHTML is correct.
    cmpTextDiv.innerHTML = descriptionRow.innerHTML;
    moveInstrumentation(descriptionRow, cmpTextDiv);
  }
  textColumn.append(cmpTextDiv);

  block.replaceChildren(container);

  // Optimize images
  container.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
