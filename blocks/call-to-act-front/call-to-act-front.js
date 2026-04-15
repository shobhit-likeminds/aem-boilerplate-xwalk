import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const containerFluid = document.createElement('div');
  containerFluid.classList.add('container-fluid', 'advanced-widget-row-no-pad', 'advanced-widget-vertical-center');

  const fieldLayout = document.createElement('div');
  fieldLayout.classList.add('field', 'field--name-field-content-layout', 'field--type-entity-reference-revisions', 'field--label-hidden', 'field__item');

  const row = document.createElement('div');
  row.classList.add('row', 'row-pad');
  row.id = 'call-to-action';
  row.style.padding = '0px 0 0px 0';

  [...block.children].forEach((itemRow, index) => {
    // Destructuring is appropriate here as the model defines a fixed number of cells per item row.
    const [imageCell, valueCell, labelCell, linkCell, linkLabelCell, descriptionCell] = [...itemRow.children];

    const col = document.createElement('div');
    col.classList.add('col-md-4');

    const fieldWidgets = document.createElement('div');
    // The class name 'field--name-field-column-${index + 1}-widgets' is dynamically generated
    // but matches the pattern seen in the original HTML for column-1, column-2, column-3.
    fieldWidgets.classList.add('field', `field--name-field-column-${index + 1}-widgets`, 'field--type-entity-reference-revisions', 'field--label-visually_hidden');

    const fieldLabel = document.createElement('div');
    fieldLabel.classList.add('field__label', 'visually-hidden');
    fieldLabel.textContent = `Column ${index + 1}:`;
    fieldWidgets.append(fieldLabel);

    const fieldItem = document.createElement('div');
    fieldItem.classList.add('field__item');

    const paragraphColumnContent = document.createElement('div');
    paragraphColumnContent.classList.add('paragraph', 'paragraph--type--column-content', 'paragraph--view-mode--default');

    const fieldColumnContent = document.createElement('div');
    fieldColumnContent.classList.add('field', 'field--name-field-column-content', 'field--type-entity-reference-revisions', 'field--label-hidden', 'field__items');

    const fieldItemContent = document.createElement('div');
    fieldItemContent.classList.add('field__item');

    const paragraphText = document.createElement('div');
    paragraphText.classList.add('paragraph', 'paragraph--type--text', 'paragraph--view-mode--default');

    const clearfixText = document.createElement('div');
    clearfixText.classList.add('clearfix', 'text-formatted', 'field', 'field--name-field-longtext', 'field--type-text-long', 'field--label-hidden', 'field__item');

    const h3 = document.createElement('h3');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href; // Correctly read href from the aem-content link cell
    } else {
      anchor.href = '#'; // Fallback if no link is found
    }

    const img = imageCell.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      h3.append(optimizedPic);
    }

    const spanValue = document.createElement('span');
    spanValue.id = `call-to-act-value-${index + 1}`;
    spanValue.textContent = valueCell.textContent.trim();
    h3.append(spanValue);

    const labelText = labelCell.textContent.trim();
    if (labelText) {
      h3.append(` ${labelText}`);
    }

    anchor.append(h3);
    clearfixText.append(anchor);

    const descriptionP = document.createElement('p');
    descriptionP.innerHTML = descriptionCell.innerHTML;
    // The description should be part of the anchor, as seen in the original HTML structure
    anchor.append(descriptionP);

    paragraphText.append(clearfixText);
    fieldItemContent.append(paragraphText);
    fieldColumnContent.append(fieldItemContent);
    paragraphColumnContent.append(fieldColumnContent);
    fieldItem.append(paragraphColumnContent);
    fieldWidgets.append(fieldItem);
    col.append(fieldWidgets);
    row.append(col);

    moveInstrumentation(itemRow, col); // Move instrumentation from original item row to the new column
  });

  fieldLayout.append(row);
  containerFluid.append(fieldLayout);

  block.textContent = '';
  block.append(containerFluid);
}
