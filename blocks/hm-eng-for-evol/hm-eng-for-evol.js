import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...blurbRows] = [...block.children];

  // Main container
  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    const h2 = document.createElement('h2');
    h2.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(headingRow, h2);
    h2.textContent = headingCell?.textContent.trim() || '';
    container.append(h2);
  }

  // Description
  if (descriptionRow) {
    const descriptionCell = descriptionRow.firstElementChild;
    const p = document.createElement('p');
    p.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(descriptionRow, p);
    p.innerHTML = descriptionCell?.innerHTML || '';
    container.append(p);
  }

  // Blurbs container
  if (blurbRows.length > 0) {
    const blurbHld = document.createElement('div');
    blurbHld.classList.add('evolution-blurb-hld');
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    blurbRows.forEach((blurbRow) => {
      // This pattern is correct for fixed-field item models where all cells are present and in order.
      const [imageCell, titleCell, textCell, ctaLinkCell, ctaLinkLabelCell] = [...blurbRow.children];

      const colLg4 = document.createElement('div');
      colLg4.classList.add('col-lg-4');

      const evolutionBlurb = document.createElement('div');
      evolutionBlurb.classList.add('evolution-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
      moveInstrumentation(blurbRow, evolutionBlurb);

      const blurb = document.createElement('div');
      blurb.classList.add('blurb');

      const blurbContentDiv = document.createElement('div');

      // Image
      if (imageCell) {
        const figure = document.createElement('figure');
        const img = imageCell.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
          optimizedPic.querySelector('img').classList.add('bg-cover');
          moveInstrumentation(img.closest('picture'), optimizedPic.querySelector('img'));
          figure.append(optimizedPic);
        }
        blurbContentDiv.append(figure);
      }

      const blurbDet = document.createElement('div');
      blurbDet.classList.add('blurb-det');

      // Title
      if (titleCell) {
        const h4 = document.createElement('h4');
        h4.textContent = titleCell.textContent.trim();
        blurbDet.append(h4);
      }

      // Text
      if (textCell) {
        const pText = document.createElement('p');
        pText.innerHTML = textCell.innerHTML;
        blurbDet.append(pText);
      }
      blurbContentDiv.append(blurbDet);
      blurb.append(blurbContentDiv);

      // CTA Link
      if (ctaLinkCell && ctaLinkLabelCell) {
        // For type=aem-content, the anchor is typically the first child of the cell.
        // The decorateButtons() script wraps it in a <p> tag, so .firstElementChild is more robust than .querySelector('a').
        const ctaLink = ctaLinkCell.firstElementChild;
        if (ctaLink && ctaLink.tagName === 'A') { // Ensure it's an anchor tag
          const btnBox = document.createElement('a');
          btnBox.classList.add('btn-box');
          btnBox.href = ctaLink.href;
          btnBox.textContent = ctaLinkLabelCell.textContent.trim();
          blurb.append(btnBox);
        }
      }

      evolutionBlurb.append(blurb);
      colLg4.append(evolutionBlurb);
      rowDiv.append(colLg4);
    });
    blurbHld.append(rowDiv);
    container.append(blurbHld);
  }

  block.textContent = '';
  block.append(container);
}
