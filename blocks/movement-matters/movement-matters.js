import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children based on the EDS Block Structure and BlockJson model
  // The first two rows are fixed fields: heading and description.
  // The remaining rows are 'cardBlurbs' item rows.
  const allRows = [...block.children];

  // Find heading and description rows using content detection, not index access
  let headingRow = null;
  let descriptionRow = null;
  const cardBlurbRows = [];

  allRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 1) {
      const cellContent = cells[0].textContent.trim();
      // Heuristic: Heading is usually shorter and simpler text, description is richer HTML
      // This is a common pattern for blocks with a single text/richtext cell at the start.
      // If the cell contains only text and no other tags, it's likely the heading.
      // If it contains <p> or other HTML, it's likely the description.
      if (!headingRow && cells[0].children.length === 0 && cellContent.length < 100) { // Assuming heading is short plain text
        headingRow = row;
      } else if (!descriptionRow && cells[0].children.length > 0) { // Assuming description has rich text (e.g., <p>)
        descriptionRow = row;
      } else if (!descriptionRow && cells[0].children.length === 0 && cellContent.length >= 100) { // Fallback for long plain text description
        descriptionRow = row;
      } else {
        cardBlurbRows.push(row);
      }
    } else if (cells.length === 4) { // Card Blurb rows have 4 cells
      cardBlurbRows.push(row);
    }
  });

  block.classList.add('movement-matters');

  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  // Heading
  if (headingRow) {
    const headingCell = headingRow.firstElementChild; // Assuming heading is the first cell of its row
    const heading = document.createElement('h2');
    heading.classList.add('common-ttle', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(headingCell, heading); // Pass the cell for instrumentation
    heading.textContent = headingCell?.textContent.trim() || '';
    containerWrapper.append(heading);
  }

  const movementHld = document.createElement('div');
  movementHld.classList.add('movement-hld');

  const row = document.createElement('div');
  row.classList.add('row', 'align-items-lg-center', 'justify-content-lg-between');

  // Description
  if (descriptionRow) {
    const descriptionCell = descriptionRow.firstElementChild; // Assuming description is the first cell of its row
    const colLg7 = document.createElement('div');
    colLg7.classList.add('col-lg-7', 'pb-lg-0', 'pb-4', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
    moveInstrumentation(descriptionCell, colLg7); // Pass the cell for instrumentation
    colLg7.innerHTML = descriptionCell?.innerHTML || '';
    row.append(colLg7);
  }

  // Card Blurbs
  if (cardBlurbRows.length > 0) {
    const colLg4 = document.createElement('div');
    colLg4.classList.add('col-lg-4');

    cardBlurbRows.forEach((cardBlurbRow) => {
      // For item rows, direct destructuring is acceptable as per EDS guide
      const [titleCell, textCell, ctaLinkCell, ctaLinkLabelCell] = [...cardBlurbRow.children];

      const mCardBlurb = document.createElement('div');
      mCardBlurb.classList.add('m-card-blurb', 'wow', 'animate__', 'animate__fadeInUp', 'animated');
      moveInstrumentation(cardBlurbRow, mCardBlurb);

      const contentWrapper = document.createElement('div');

      if (titleCell) {
        const title = document.createElement('h4');
        title.textContent = titleCell.textContent.trim();
        contentWrapper.append(title);
      }

      if (textCell) {
        const text = document.createElement('p');
        text.innerHTML = textCell.innerHTML;
        contentWrapper.append(text);
      }

      mCardBlurb.append(contentWrapper);

      if (ctaLinkCell && ctaLinkLabelCell) {
        const ctaLink = ctaLinkCell.querySelector('a');
        if (ctaLink) {
          const button = document.createElement('a');
          button.classList.add('btn-box');
          button.href = ctaLink.href;
          button.textContent = ctaLinkLabelCell.textContent.trim();
          mCardBlurb.append(button);
        }
      }
      colLg4.append(mCardBlurb);
    });
    row.append(colLg4);
  }

  movementHld.append(row);
  containerWrapper.append(movementHld);
  block.textContent = '';
  block.append(containerWrapper);

  // Image optimization (if any images were present, though none in this specific model)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
