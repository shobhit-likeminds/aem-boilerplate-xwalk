import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  [...block.children].forEach((cardRow) => {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'koi-rscard-padding');
    moveInstrumentation(cardRow, colDiv);

    const card = document.createElement('div');
    card.classList.add('card', 'rs-card');

    let imageEl = null;
    let altText = '';
    let titleText = '';
    let descriptionHtml = null;

    const cells = [...cardRow.children];

    // Content detection for cells
    const imageCell = cells.find((cell) => cell.querySelector('picture'));
    const descriptionCell = cells.find((cell) => cell.querySelector('p'));
    // Filter out image and description cells to find title and alt text
    const textCells = cells.filter((cell) => !cell.querySelector('picture') && !cell.querySelector('p'));

    // Assuming order for alt and title among remaining text cells, or more robust detection if needed
    // Based on BlockJson: Image, Alt Text, Title, Description
    // So, textCells[0] would be Alt Text, textCells[1] would be Title
    // This assumes the order is consistent after filtering out image and description
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        imageEl = picture.querySelector('img');
      }
    }

    if (textCells.length > 0) {
      // Find alt text - it's the text content of the cell that is not the title
      // This is a bit fragile if alt text and title can be empty or have similar content.
      // A more robust solution might involve checking the original HTML structure for clues,
      // or if the alt text is consistently shorter/longer than the title.
      // For now, assuming the order from BlockJson (Alt Text then Title)
      altText = textCells[0]?.textContent.trim() || '';
      titleText = textCells[1]?.textContent.trim() || '';
    }

    if (descriptionCell) {
      descriptionHtml = descriptionCell.querySelector('p');
    }

    if (imageEl) {
      const optimizedPic = createOptimizedPicture(imageEl.src, altText, false, [{ width: '750' }]);
      moveInstrumentation(imageEl, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('w-100', 'kitchens-image');
      card.append(optimizedPic);
    }

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('blog-card-title');
    title.textContent = titleText;
    cardBody.append(title);

    if (descriptionHtml) {
      const description = document.createElement('h5');
      description.classList.add('card-title'); // This class is from original HTML
      moveInstrumentation(descriptionHtml, description);
      description.append(descriptionHtml);
      cardBody.append(description);
    }

    card.append(cardBody);
    colDiv.append(card);
    rowDiv.append(colDiv);
  });

  const tabPara = document.createElement('div');
  tabPara.classList.add('tab-para');
  rowDiv.append(tabPara);

  block.textContent = '';
  block.append(rowDiv);
}
