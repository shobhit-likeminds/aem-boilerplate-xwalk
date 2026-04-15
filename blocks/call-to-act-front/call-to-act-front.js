import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('container-fluid', 'advanced-widget-row-no-pad', 'advanced-widget-vertical-center');
  block.id = 'call-to-act-front';

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'row-pad');
  rowDiv.id = 'call-to-action';
  rowDiv.style.padding = '0px 0 0px 0'; // Match inline style from original HTML

  [...block.children].forEach((row, index) => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-md-4');

    const fieldItemDiv = document.createElement('div');
    // The original HTML uses field--name-field-column-1-widgets, field--name-field-column-2-widgets, etc.
    // This dynamic class name is acceptable as it matches the pattern.
    fieldItemDiv.classList.add('field', `field--name-field-column-${index + 1}-widgets`, 'field--type-entity-reference-revisions', 'field--label-visually_hidden');

    const fieldLabelDiv = document.createElement('div');
    fieldLabelDiv.classList.add('field__label', 'visually-hidden');
    fieldLabelDiv.textContent = `Column ${index + 1}:`;
    fieldItemDiv.append(fieldLabelDiv);

    const fieldItemContent = document.createElement('div');
    fieldItemContent.classList.add('field__item');

    const paragraphDiv = document.createElement('div');
    paragraphDiv.classList.add('paragraph', 'paragraph--type--column-content', 'paragraph--view-mode--default');

    const fieldContentDiv = document.createElement('div');
    fieldContentDiv.classList.add('field', 'field--name-field-column-content', 'field--type-entity-reference-revisions', 'field--label-hidden', 'field__items');

    const fieldItemInner = document.createElement('div');
    fieldItemInner.classList.add('field__item');

    const paragraphTextDiv = document.createElement('div');
    paragraphTextDiv.classList.add('paragraph', 'paragraph--type--text', 'paragraph--view-mode--default');

    const clearfixDiv = document.createElement('div');
    clearfixDiv.classList.add('clearfix', 'text-formatted', 'field', 'field--name-field-longtext', 'field--type-text-long', 'field--label-hidden', 'field__item');

    // Use destructuring for fixed-field item models as per guide
    const [iconCell, statCell, labelCell, ctaLinkCell, ctaLinkLabelCell, descriptionCell] = [...row.children];

    // Create the anchor element
    const anchor = document.createElement('a');
    const ctaLinkElement = ctaLinkCell.querySelector('a');
    if (ctaLinkElement && ctaLinkElement.href) {
      anchor.href = ctaLinkElement.href;
    } else {
      anchor.href = '#'; // Fallback if no link is found
    }

    // Create the heading element and append icon and stat/label
    const h3 = document.createElement('h3');
    anchor.append(h3);

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        h3.append(optimizedPic);
      }
    }

    const statSpan = document.createElement('span');
    statSpan.id = `call-to-act-value-${index + 1}`; // Match original ID pattern
    statSpan.textContent = statCell.textContent.trim();
    h3.append(statSpan);

    const labelText = labelCell.textContent.trim();
    if (labelText) {
      h3.append(` ${labelText}`);
    }

    // Append the CTA Link Label if it exists and is not empty
    const ctaLinkLabelText = ctaLinkLabelCell.textContent.trim();
    if (ctaLinkLabelText) {
      // The original HTML structure has the CTA Link Label as part of the <h3> text,
      // but the model defines it as a separate field.
      // We will append it to the h3 as per the original HTML's rendered output.
      h3.append(` ${ctaLinkLabelText}`);
    }


    // Append the description
    const p = document.createElement('p');
    p.innerHTML = descriptionCell.innerHTML; // Use innerHTML for richtext
    anchor.append(p);

    // Move instrumentation from the original row to the new anchor
    moveInstrumentation(row, anchor);

    // Append the constructed content to clearfixDiv
    clearfixDiv.append(anchor);

    paragraphTextDiv.append(clearfixDiv);
    fieldItemInner.append(paragraphTextDiv);
    fieldContentDiv.append(fieldItemInner);
    paragraphDiv.append(fieldContentDiv);
    fieldItemContent.append(paragraphDiv);
    fieldItemDiv.append(fieldItemContent);
    colDiv.append(fieldItemDiv);
    rowDiv.append(colDiv);
  });

  block.textContent = '';
  block.append(rowDiv);
}
