import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...blurbRows] = [...block.children];

  // Main container
  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  moveInstrumentation(block, container);

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    const h2 = document.createElement('h2');
    h2.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    h2.textContent = headingCell.textContent.trim();
    moveInstrumentation(headingRow, h2);
    container.append(h2);
  }

  // Description
  if (descriptionRow) {
    const descriptionCell = descriptionRow.firstElementChild;
    const p = document.createElement('p');
    p.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
    p.innerHTML = descriptionCell.innerHTML;
    moveInstrumentation(descriptionRow, p);
    container.append(p);
  }

  // Blurbs container
  if (blurbRows.length > 0) {
    const evolutionBlurbHld = document.createElement('div');
    evolutionBlurbHld.classList.add('evolution-blurb-hld');
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    blurbRows.forEach((row) => {
      const [imageCell, titleCell, textCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

      const colLg4 = document.createElement('div');
      colLg4.classList.add('col-lg-4');

      const evolutionBlurb = document.createElement('div');
      evolutionBlurb.classList.add('evolution-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');

      const blurb = document.createElement('div');
      blurb.classList.add('blurb');

      const blurbContentDiv = document.createElement('div');

      // Image
      if (imageCell) {
        const figure = document.createElement('figure');
        const picture = imageCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
            optimizedPic.querySelector('img').classList.add('bg-cover'); // Add class to the img inside picture
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            figure.append(optimizedPic);
          }
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
        const p = document.createElement('p');
        p.innerHTML = textCell.innerHTML;
        blurbDet.append(p);
      }

      blurbContentDiv.append(blurbDet);
      blurb.append(blurbContentDiv);

      // CTA Link
      if (ctaLinkCell && ctaLinkLabelCell) {
        const ctaLink = ctaLinkCell.querySelector('a');
        if (ctaLink) {
          const anchor = document.createElement('a');
          anchor.href = ctaLink.href; // Use href from the <a> tag
          anchor.textContent = ctaLinkLabelCell.textContent.trim(); // Use text from ctaLinkLabelCell
          anchor.classList.add('btn-box');
          moveInstrumentation(ctaLinkCell, anchor);
          blurb.append(anchor);
        }
      }
      evolutionBlurb.append(blurb);
      moveInstrumentation(row, evolutionBlurb);
      colLg4.append(evolutionBlurb);
      rowDiv.append(colLg4);
    });
    evolutionBlurbHld.append(rowDiv);
    container.append(evolutionBlurbHld);
  }

  block.textContent = '';
  block.append(container);
}
