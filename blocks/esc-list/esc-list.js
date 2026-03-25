import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // block.children[0] is headingRow
  // block.children[1] is the "ESC Items" container row, which we skip as it's just a placeholder
  // block.children[2...] are the actual item rows
  const [headingRow, , ...itemRows] = [...block.children];

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('elementor-element', 'elementor-element-5b05bcd', 'e-flex', 'e-con-boxed', 'e-con', 'e-parent', 'e-lazyloaded');
  block.append(mainContainer);

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('e-con-inner');
  mainContainer.append(innerContainer);

  // Heading
  if (headingRow) {
    const headingWrapper = document.createElement('div');
    headingWrapper.classList.add('elementor-element', 'elementor-element-248ce2d', 'e-con-full', 'e-flex', 'e-con', 'e-child');
    moveInstrumentation(headingRow, headingWrapper);

    const headingWidget = document.createElement('div');
    headingWidget.classList.add('elementor-element', 'elementor-element-d767435', 'elementor-widget', 'elementor-widget-heading');
    headingWrapper.append(headingWidget);

    const h2 = document.createElement('h2');
    h2.classList.add('elementor-heading-title', 'elementor-size-default');
    // The headingRow itself contains the div with the text, so we take its firstChild's content
    while (headingRow.firstElementChild.firstChild) h2.append(headingRow.firstElementChild.firstChild);
    headingWidget.append(h2);
    innerContainer.append(headingWrapper);
  }

  // Items
  itemRows.forEach((row) => {
    // Each item row has 3 cells: Title, Description, Image
    const [titleCell, descriptionCell, imageCell] = [...row.children];

    const itemContainer = document.createElement('div');
    // The specific elementor-element-ID for item containers varies in the original HTML
    // (e.g., af08c2b, c169ed5, 59e358f). We use a generic class here.
    itemContainer.classList.add('elementor-element', 'e-con-full', 'e-flex', 'e-con', 'e-child');
    moveInstrumentation(row, itemContainer);

    // Icon Box (Title and Description)
    const iconBoxWrapper = document.createElement('div');
    // The specific elementor-element-ID for icon box wrappers varies
    iconBoxWrapper.classList.add('elementor-element', 'elementor-widget', 'elementor-widget-icon-box');
    itemContainer.append(iconBoxWrapper);

    const iconBox = document.createElement('div');
    iconBox.classList.add('elementor-icon-box-wrapper');
    iconBoxWrapper.append(iconBox);

    const iconBoxContent = document.createElement('div');
    iconBoxContent.classList.add('elementor-icon-box-content');
    iconBox.append(iconBoxContent);

    // Title
    if (titleCell) {
      const h3 = document.createElement('h3');
      h3.classList.add('elementor-icon-box-title');
      const span = document.createElement('span');
      moveInstrumentation(titleCell, span);
      while (titleCell.firstChild) span.append(titleCell.firstChild);
      h3.append(span);
      iconBoxContent.append(h3);
    }

    // Description
    if (descriptionCell) {
      const p = document.createElement('p');
      p.classList.add('elementor-icon-box-description');
      moveInstrumentation(descriptionCell, p);
      while (descriptionCell.firstChild) p.append(descriptionCell.firstChild);
      iconBoxContent.append(p);
    }

    // Image
    if (imageCell && imageCell.querySelector('picture')) {
      const imageWrapper = document.createElement('div');
      // The specific elementor-element-ID for image wrappers varies
      imageWrapper.classList.add('elementor-element', 'elementor-widget', 'elementor-widget-image');
      itemContainer.append(imageWrapper);

      moveInstrumentation(imageCell, imageWrapper);
      while (imageCell.firstChild) imageWrapper.append(imageCell.firstChild);
      const img = imageWrapper.querySelector('img');
      if (img) {
        // The original HTML uses 'attachment-full size-full' or 'attachment-large size-large'
        // and specific wp-image-IDs. We use the generic ones.
        img.classList.add('attachment-full', 'size-full');
      }
    }

    innerContainer.append(itemContainer);
  });

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(mainContainer);
}
