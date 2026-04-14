import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...cardRows] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('container');

  // Header section
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center', 'pb-3');
  moveInstrumentation(headingRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  description.textContent = descriptionRow.firstElementChild.textContent.trim();
  sectionHeader.append(description);

  container.append(sectionHeader);

  // Cards grid
  const rowGrid = document.createElement('div');
  rowGrid.classList.add('row', 'g-4', 'purpose-led-grid', 'pt-3');

  cardRows.forEach((row) => {
    // Use content detection instead of index access for robustness
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const imageAltCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() !== '' && cell.textContent.trim().length < 50); // Heuristic for alt text
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const textCell = cells.find(cell => cell.querySelector('p')); // Rich text cell

    const col = document.createElement('div');
    col.classList.add('col-md-6', 'aos-init', 'aos-animate');
    moveInstrumentation(row, col);

    const anchor = document.createElement('a');
    anchor.classList.add('card-wrap');
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
        anchor.target = '_blank'; // From original HTML
      }
    }

    const cardImageDiv = document.createElement('div');
    cardImageDiv.classList.add('card-image');
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          img.classList.add('img-fluid'); // From original HTML
          if (imageAltCell) {
            img.alt = imageAltCell.textContent.trim(); // Use authored alt text
          }
          cardImageDiv.append(picture);
        }
      }
    }
    anchor.append(cardImageDiv);

    const cardTextDiv = document.createElement('div');
    cardTextDiv.classList.add('card-text');
    if (textCell) {
      const pDesc = document.createElement('p');
      pDesc.classList.add('desc');
      pDesc.innerHTML = textCell.innerHTML; // Use innerHTML to preserve rich text
      cardTextDiv.append(pDesc);
    }
    anchor.append(cardTextDiv);

    col.append(anchor);
    rowGrid.append(col);
  });

  container.append(rowGrid);

  block.textContent = '';
  block.append(container);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
