import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The first row is the "Products value" placeholder, which we skip.
  // Subsequent rows are the actual product items.
  const [, ...productRows] = [...block.children];

  const viewsElementContainer = document.createElement('div');
  viewsElementContainer.classList.add('views-element-container', 'form-group');

  const view = document.createElement('div');
  view.classList.add('view', 'view-ingredients-slideshow-brand-page');
  viewsElementContainer.append(view);

  const viewContent = document.createElement('div');
  viewContent.classList.add('view-content');
  view.append(viewContent);

  productRows.forEach((row) => {
    const viewsRow = document.createElement('div');
    moveInstrumentation(row, viewsRow);
    viewsRow.classList.add('views-row');

    // EDS Block Structure:
    // <div>
    //   <!-- cell[0]: field="image" label="Image" type=reference -->
    //   <div><picture><img src="example.jpg" alt="Image"></picture></div>
    //   <!-- cell[1]: field="link" label="Buy Now Link" type=aem-content -->
    //   <div><a href="https://example.com/link">Buy Now Link link</a></div>
    // </div>
    const [imageCell, linkCell] = row.children;

    // Add empty divs for 'views-field-edit-node' and 'views-field-field-price' first,
    // as per the original HTML structure.
    const viewsFieldEditNode = document.createElement('div');
    viewsFieldEditNode.classList.add('views-field', 'views-field-edit-node');
    const fieldContentEditNode = document.createElement('span');
    fieldContentEditNode.classList.add('field-content');
    viewsFieldEditNode.append(fieldContentEditNode);
    viewsRow.append(viewsFieldEditNode);

    if (imageCell) {
      const viewsFieldProductImage = document.createElement('div');
      viewsFieldProductImage.classList.add('views-field', 'views-field-field-product-image');
      const fieldContentImage = document.createElement('div');
      fieldContentImage.classList.add('field-content');

      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        fieldContentImage.append(optimizedPic);
        fieldContentImage.querySelector('img').classList.add('img-responsive');
      }
      viewsFieldProductImage.append(fieldContentImage);
      viewsRow.append(viewsFieldProductImage);
    }

    const viewsFieldPrice = document.createElement('div');
    viewsFieldPrice.classList.add('views-field', 'views-field-field-price');
    const fieldContentPrice = document.createElement('div');
    fieldContentPrice.classList.add('field-content');
    viewsFieldPrice.append(fieldContentPrice);
    viewsRow.append(viewsFieldPrice);

    if (linkCell) {
      const viewsFieldReadMore = document.createElement('div');
      viewsFieldReadMore.classList.add('views-field', 'views-field-field-read-more');
      const fieldContentLink = document.createElement('div');
      fieldContentLink.classList.add('field-content');

      const link = linkCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        newLink.target = '_blank'; // As per original HTML example
        moveInstrumentation(link, newLink);
        fieldContentLink.append(newLink);
      }
      viewsFieldReadMore.append(fieldContentLink);
      viewsRow.append(viewsFieldReadMore);
    }

    viewContent.append(viewsRow);
  });

  block.textContent = '';
  block.append(viewsElementContainer);
}
