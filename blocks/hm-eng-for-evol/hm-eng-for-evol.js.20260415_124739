import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...blurbRows] = [...block.children];

  block.textContent = '';
  block.classList.add('hm-eng-for-evol');

  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');
  block.append(containerWrapper);

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    if (headingCell && headingCell.textContent.trim()) {
      const h2 = document.createElement('h2');
      h2.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
      h2.textContent = headingCell.textContent.trim();
      moveInstrumentation(headingRow, h2);
      containerWrapper.append(h2);
    }
  }

  // Description
  if (descriptionRow) {
    const descriptionCell = descriptionRow.firstElementChild;
    if (descriptionCell && descriptionCell.innerHTML.trim()) {
      const p = document.createElement('p');
      p.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
      p.innerHTML = descriptionCell.innerHTML.trim();
      moveInstrumentation(descriptionRow, p);
      containerWrapper.append(p);
    }
  }

  // Blurbs
  if (blurbRows.length > 0) {
    const evolutionBlurbHld = document.createElement('div');
    evolutionBlurbHld.classList.add('evolution-blurb-hld');
    containerWrapper.append(evolutionBlurbHld);

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    evolutionBlurbHld.append(rowDiv);

    blurbRows.forEach((blurbRow) => {
      // Use content detection for cells that are not strictly ordered or have different types
      const cells = [...blurbRow.children];
      const imageCell = cells.find(cell => cell.querySelector('picture'));
      const titleCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim() && !cell.querySelector('a'));
      const textCell = cells.find(cell => cell.innerHTML.includes('<p>') || cell.innerHTML.includes('<ul>')); // More robust for richtext
      const ctaLinkWrapper = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('/content/site/')); // aem-content type
      const ctaLinkLabelCell = cells.find(cell => cell.textContent.trim() && !cell.querySelector('picture') && !cell.querySelector('a') && cell !== titleCell); // text type for label

      const colLg4 = document.createElement('div');
      colLg4.classList.add('col-lg-4');
      moveInstrumentation(blurbRow, colLg4);
      rowDiv.append(colLg4);

      const evolutionBlurb = document.createElement('div');
      evolutionBlurb.classList.add('evolution-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
      colLg4.append(evolutionBlurb);

      const blurb = document.createElement('div');
      blurb.classList.add('blurb');
      evolutionBlurb.append(blurb);

      const blurbContentDiv = document.createElement('div');
      blurb.append(blurbContentDiv);

      if (imageCell) {
        const figure = document.createElement('figure');
        const picture = imageCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
            optimizedPic.querySelector('img').classList.add('bg-cover');
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            figure.append(optimizedPic);
            blurbContentDiv.append(figure);
          }
        }
      }

      const blurbDet = document.createElement('div');
      blurbDet.classList.add('blurb-det');
      blurbContentDiv.append(blurbDet);

      if (titleCell && titleCell.textContent.trim()) {
        const h4 = document.createElement('h4');
        h4.textContent = titleCell.textContent.trim();
        blurbDet.append(h4);
      }

      if (textCell && textCell.innerHTML.trim()) {
        const p = document.createElement('p');
        p.innerHTML = textCell.innerHTML.trim();
        blurbDet.append(p);
      }

      if (ctaLinkWrapper && ctaLinkLabelCell) {
        const ctaLink = ctaLinkWrapper.querySelector('a');
        const ctaLinkLabel = ctaLinkLabelCell.textContent.trim();

        if (ctaLink && ctaLinkLabel) {
          const anchor = document.createElement('a');
          anchor.classList.add('btn-box');
          anchor.href = ctaLink.href;
          anchor.textContent = ctaLinkLabel;
          blurb.append(anchor);
        }
      }
    });
  }
}
