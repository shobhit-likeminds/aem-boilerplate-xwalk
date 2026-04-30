import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  // section.classList.add('movement-matters'); // Block's own class is already on the outer div

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  section.append(container);

  // Section Title
  const titleRow = children[0];
  const titleCell = titleRow.children[0]; // Fixed: direct cell access
  if (titleCell) {
    const h2 = document.createElement('h2');
    h2.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(titleRow, h2);
    h2.textContent = titleCell.textContent.trim();
    container.append(h2);
  }

  const movementHld = document.createElement('div');
  movementHld.classList.add('movement-hld');
  container.append(movementHld);

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'align-items-lg-center', 'justify-content-lg-between');
  movementHld.append(rowDiv);

  // Section Description
  const descriptionRow = children[1];
  const descriptionCell = descriptionRow.children[0]; // Fixed: direct cell access
  if (descriptionCell) {
    const colLg7 = document.createElement('div');
    colLg7.classList.add('col-lg-7', 'pb-lg-0', 'pb-4', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(descriptionRow, colLg7);
    colLg7.innerHTML = descriptionCell.innerHTML;
    rowDiv.append(colLg7);
  }

  // Card Blurbs
  const cardBlurbRows = children.slice(2);
  if (cardBlurbRows.length > 0) {
    const colLg4 = document.createElement('div');
    colLg4.classList.add('col-lg-4');
    rowDiv.append(colLg4);

    cardBlurbRows.forEach((row) => {
      const [cardTitleCell, cardDescriptionCell, cardLinkCell, cardLinkLabelCell] = [...row.children];

      const mCardBlurb = document.createElement('div');
      mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
      moveInstrumentation(row, mCardBlurb);

      const textWrapper = document.createElement('div');
      mCardBlurb.append(textWrapper);

      if (cardTitleCell) {
        const h4 = document.createElement('h4');
        h4.textContent = cardTitleCell.textContent.trim();
        textWrapper.append(h4);
      }

      if (cardDescriptionCell) {
        const div = document.createElement('div'); // Fixed: Use div for richtext content to avoid <p> inside <p>
        div.innerHTML = cardDescriptionCell.innerHTML;
        textWrapper.append(div);
      }

      if (cardLinkCell && cardLinkLabelCell) {
        const foundLink = cardLinkCell.querySelector('a');
        if (foundLink) {
          const a = document.createElement('a');
          a.href = foundLink.href;
          a.classList.add('btn-box');
          a.textContent = cardLinkLabelCell.textContent.trim();
          mCardBlurb.append(a);
        }
      }
      colLg4.append(mCardBlurb);
    });
  }

  block.replaceChildren(section);

  // Image optimization (if any images were present)
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
