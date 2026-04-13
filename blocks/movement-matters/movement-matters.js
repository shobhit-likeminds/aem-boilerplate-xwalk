import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, textRow, ...cardBlurbRows] = [...block.children];

  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  containerWrapper.append(heading);

  const movementHld = document.createElement('div');
  movementHld.classList.add('movement-hld');

  const row = document.createElement('div');
  row.classList.add('row', 'align-items-lg-center', 'justify-content-lg-between');

  // Text content
  const textCol = document.createElement('div');
  textCol.classList.add('col-lg-7', 'pb-lg-0', 'pb-4', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
  moveInstrumentation(textRow, textCol);
  while (textRow.firstElementChild) {
    textCol.append(textRow.firstElementChild);
  }
  row.append(textCol);

  // Card Blurbs
  const cardBlurbsCol = document.createElement('div');
  cardBlurbsCol.classList.add('col-lg-4');

  cardBlurbRows.forEach((rowEl) => {
    const cells = [...rowEl.children];
    // Find cells based on content, not index
    const titleCell = cells.find(cell => cell.querySelector('h1, h2, h3, h4, h5, h6') || (cell.textContent.trim() && !cell.querySelector('p') && !cell.querySelector('a')));
    const descriptionCell = cells.find(cell => cell.querySelector('p'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a')); // This cell contains the actual link
    const ctaLinkLabelCell = cells.find(cell => cell !== titleCell && cell !== descriptionCell && cell !== ctaLinkCell); // The remaining cell should be the label

    const cardBlurb = document.createElement('div');
    cardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(rowEl, cardBlurb);

    const contentDiv = document.createElement('div');

    if (titleCell) {
      const title = document.createElement('h4');
      title.textContent = titleCell.textContent.trim();
      contentDiv.append(title);
    }

    if (descriptionCell) {
      moveInstrumentation(descriptionCell, contentDiv);
      while (descriptionCell.firstElementChild) {
        contentDiv.append(descriptionCell.firstElementChild);
      }
    }

    cardBlurb.append(contentDiv);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn-box');
    if (ctaLinkCell) {
      const originalCtaLink = ctaLinkCell.querySelector('a');
      if (originalCtaLink) {
        ctaLink.href = originalCtaLink.href;
      }
    }
    if (ctaLinkLabelCell) {
      ctaLink.textContent = ctaLinkLabelCell.textContent.trim();
      moveInstrumentation(ctaLinkLabelCell, ctaLink);
    } else if (ctaLinkCell) { // Fallback if no separate label cell, use the link text itself
      ctaLink.textContent = ctaLinkCell.textContent.trim();
      moveInstrumentation(ctaLinkCell, ctaLink);
    }
    cardBlurb.append(ctaLink);

    cardBlurbsCol.append(cardBlurb);
  });

  row.append(cardBlurbsCol);
  movementHld.append(row);
  containerWrapper.append(movementHld);

  block.textContent = '';
  block.append(containerWrapper);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
