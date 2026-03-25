import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  // Skip the first row which is the container title, start from the actual item rows
  const itemRows = [...block.children].slice(1);

  itemRows.forEach((row) => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'koi-rscard-padding');
    moveInstrumentation(row, colDiv);

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'rs-card');

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.classList.add('card-body');

    [...row.children].forEach((cell, index) => {
      if (index === 0) { // Image cell
        const picture = cell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
            const newImg = optimizedPic.querySelector('img');
            newImg.classList.add('w-100', 'kitchens-image'); // Apply class from original HTML
            newImg.style.display = 'block'; // Apply style from original HTML
            moveInstrumentation(img, newImg);
            cardDiv.append(optimizedPic);
          }
        }
      } else if (index === 1) { // Blog Card Title cell
        const h5BlogTitle = document.createElement('h5');
        h5BlogTitle.classList.add('blog-card-title');
        h5BlogTitle.style.display = 'block'; // Apply style from original HTML
        moveInstrumentation(cell, h5BlogTitle);
        while (cell.firstChild) h5BlogTitle.append(cell.firstChild);
        cardBodyDiv.append(h5BlogTitle);
      } else if (index === 2) { // Card Title cell (richtext)
        const h5CardTitle = document.createElement('h5');
        h5CardTitle.classList.add('card-title');
        moveInstrumentation(cell, h5CardTitle);
        // The original HTML has a <p> inside the <h5>, so we append the cell's content directly
        while (cell.firstChild) h5CardTitle.append(cell.firstChild);
        cardBodyDiv.append(h5CardTitle);
      }
    });

    // Check for the 'explore-btn-hide-id' link from the original HTML
    const exploreLink = row.querySelector('a[id="explore-btn-hide-id"]');
    if (exploreLink) {
      // If the link exists in the original row, append it to cardBodyDiv
      // We need to clone it to avoid moving it from the original row before instrumentation
      const clonedLink = exploreLink.cloneNode(true);
      cardBodyDiv.prepend(clonedLink); // Prepend as it appears before h5 in original HTML
    }

    cardDiv.append(cardBodyDiv);
    colDiv.append(cardDiv);
    rowDiv.append(colDiv);
  });

  // The 'tab-para' div is part of the original HTML structure but not a model field.
  // It should be appended once at the end of the rowDiv, if it exists in the original block.
  // The current JS creates it unconditionally, which is fine if it's always expected.
  // However, based on the original HTML, it's a sibling to the colDivs within the row.
  // Let's ensure it's only added if it was part of the original structure or if it's a static element.
  // For now, keeping the creation as it's a static element in the original HTML.
  // The original HTML shows it as a direct child of the 'row' div, after all 'col' divs.
  // The generated JS places it correctly after all colDivs.

  const tabParaDiv = document.createElement('div');
  tabParaDiv.classList.add('tab-para');
  rowDiv.append(tabParaDiv);

  block.textContent = '';
  block.append(rowDiv);
}
