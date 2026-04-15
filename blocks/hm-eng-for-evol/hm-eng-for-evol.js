import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...blurbRows] = [...block.children];

  // Create container-1600-wrp
  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild;
    if (headingCell) {
      const h2 = document.createElement('h2');
      h2.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp');
      moveInstrumentation(headingRow, h2);
      h2.textContent = headingCell.textContent.trim();
      container.append(h2);
    }
  }

  // Description
  if (descriptionRow) {
    const descriptionCell = descriptionRow.firstElementChild;
    if (descriptionCell) {
      const p = document.createElement('p');
      p.classList.add('wow', 'animate__', 'animate__fadeInUp');
      moveInstrumentation(descriptionRow, p);
      p.innerHTML = descriptionCell.innerHTML;
      container.append(p);
    }
  }

  // Blurbs container
  const evolutionBlurbHld = document.createElement('div');
  evolutionBlurbHld.classList.add('evolution-blurb-hld');
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');
  evolutionBlurbHld.append(rowDiv);

  blurbRows.forEach((row) => {
    // Use content detection for blurb item cells
    const cells = [...row.children];
    const imageCell = cells.find((cell) => cell.querySelector('picture'));
    const ctaLinkCell = cells.find((cell) => cell.querySelector('a'));
    const ctaLinkLabelCell = cells.find((cell) => cell.textContent.trim() && cell !== ctaLinkCell); // Find a text cell that is not the CTA link path
    const titleCell = cells.find((cell) => cell.textContent.trim() && cell !== ctaLinkLabelCell && cell !== ctaLinkCell);
    const textCell = cells.find((cell) => cell.innerHTML.includes('<p>') && cell !== titleCell && cell !== ctaLinkLabelCell && cell !== ctaLinkCell);

    const colLg4 = document.createElement('div');
    colLg4.classList.add('col-lg-4');

    const evolutionBlurb = document.createElement('div');
    evolutionBlurb.classList.add('evolution-blurb', 'wow', 'animate__', 'animate__fadeInUp');
    moveInstrumentation(row, evolutionBlurb);

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
          optimizedPic.querySelector('img').classList.add('bg-cover');
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
      const anchor = document.createElement('a');
      const foundLink = ctaLinkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }
      anchor.textContent = ctaLinkLabelCell.textContent.trim();
      anchor.classList.add('btn-box');
      moveInstrumentation(ctaLinkCell, anchor);
      blurb.append(anchor);
    }

    evolutionBlurb.append(blurb);
    colLg4.append(evolutionBlurb);
    rowDiv.append(colLg4);
  });

  container.append(evolutionBlurbHld);

  block.textContent = '';
  block.append(container);
}
