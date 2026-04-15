import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...blurbRows] = [...block.children];

  block.classList.add('hm-eng-for-evol');

  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    const h2 = document.createElement('h2');
    h2.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(headingRow, h2);
    h2.textContent = headingCell.textContent.trim();
    containerWrapper.append(h2);
  }

  // Description
  if (descriptionRow) {
    const descriptionCell = descriptionRow.firstElementChild;
    const p = document.createElement('p');
    p.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(descriptionRow, p);
    p.innerHTML = descriptionCell.innerHTML;
    containerWrapper.append(p);
  }

  // Blurbs
  if (blurbRows.length > 0) {
    const evolutionBlurbHld = document.createElement('div');
    evolutionBlurbHld.classList.add('evolution-blurb-hld');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    blurbRows.forEach((row) => {
      // Use destructuring for fixed-field item models as per guide
      const [imageCell, titleCell, textCell, ctaLinkCell, ctaLinkLabelCell] = [...row.children];

      const colLg4 = document.createElement('div');
      colLg4.classList.add('col-lg-4');

      const evolutionBlurb = document.createElement('div');
      evolutionBlurb.classList.add('evolution-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
      moveInstrumentation(row, evolutionBlurb);

      const blurbDiv = document.createElement('div');
      blurbDiv.classList.add('blurb');

      const contentDiv = document.createElement('div');

      const figureDiv = document.createElement('div');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const figure = document.createElement('figure');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          figure.append(optimizedPic);
          figureDiv.append(figure);
          optimizedPic.querySelector('img').classList.add('bg-cover'); // Add bg-cover to the optimized img
        }
      }
      contentDiv.append(figureDiv);

      const blurbDet = document.createElement('div');
      blurbDet.classList.add('blurb-det');

      const h4 = document.createElement('h4');
      h4.textContent = titleCell ? titleCell.textContent.trim() : '';
      blurbDet.append(h4);

      const pText = document.createElement('p');
      pText.innerHTML = textCell ? textCell.innerHTML : '';
      blurbDet.append(pText);

      contentDiv.append(blurbDet);
      blurbDiv.append(contentDiv);

      // Correctly read aem-content type for ctaLinkCell
      const ctaLinkAnchor = ctaLinkCell.querySelector('a');
      if (ctaLinkAnchor) {
        const anchor = document.createElement('a');
        anchor.href = ctaLinkAnchor.href; // Read href from the <a> tag
        anchor.textContent = ctaLinkLabelCell ? ctaLinkLabelCell.textContent.trim() : '';
        anchor.classList.add('btn-box');
        moveInstrumentation(ctaLinkCell, anchor);
        blurbDiv.append(anchor);
      }

      evolutionBlurb.append(blurbDiv);
      colLg4.append(evolutionBlurb);
      rowDiv.append(colLg4);
    });

    evolutionBlurbHld.append(rowDiv);
    containerWrapper.append(evolutionBlurbHld);
  }

  block.textContent = '';
  block.append(containerWrapper);
}
