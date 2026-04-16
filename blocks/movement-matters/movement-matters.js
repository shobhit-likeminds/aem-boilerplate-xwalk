import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...blurbRows] = [...block.children];

  block.classList.add('movement-matters');

  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');
  block.append(containerWrapper);

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    const h2 = document.createElement('h2');
    h2.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(headingRow, h2);
    h2.textContent = headingCell.textContent.trim();
    containerWrapper.append(h2);
  }

  const movementHld = document.createElement('div');
  movementHld.classList.add('movement-hld');
  containerWrapper.append(movementHld);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'align-items-lg-center', 'justify-content-lg-between');
  movementHld.append(rowDiv);

  // Description
  if (descriptionRow) {
    const descriptionCell = descriptionRow.firstElementChild;
    const colLg7 = document.createElement('div');
    colLg7.classList.add('col-lg-7', 'pb-lg-0', 'pb-4', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(descriptionRow, colLg7);
    colLg7.innerHTML = descriptionCell.innerHTML;
    rowDiv.append(colLg7);
  }

  // Blurbs
  if (blurbRows.length > 0) {
    const colLg4 = document.createElement('div');
    colLg4.classList.add('col-lg-4');
    rowDiv.append(colLg4);

    blurbRows.forEach((row) => {
      // Corrected: Using destructuring for direct cell access as per BlockJson model
      const [titleCell, textCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

      const mCardBlurb = document.createElement('div');
      mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
      moveInstrumentation(row, mCardBlurb);

      const contentDiv = document.createElement('div');
      mCardBlurb.append(contentDiv);

      if (titleCell) {
        const h4 = document.createElement('h4');
        h4.textContent = titleCell.textContent.trim();
        contentDiv.append(h4);
      }

      if (textCell) {
        const p = document.createElement('p');
        p.innerHTML = textCell.innerHTML;
        contentDiv.append(p);
      }

      if (ctaLinkCell && ctaLinkLabelCell) {
        const ctaLink = ctaLinkCell.querySelector('a');
        if (ctaLink) {
          const anchor = document.createElement('a');
          anchor.href = ctaLink.href;
          anchor.classList.add('btn-box');
          anchor.textContent = ctaLinkLabelCell.textContent.trim();
          mCardBlurb.append(anchor);
        }
      }
      colLg4.append(mCardBlurb);
    });
  }

  // Clear original block content
  block.textContent = '';
  block.append(containerWrapper);
}
