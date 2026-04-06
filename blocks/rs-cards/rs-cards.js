import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('row'); // From original HTML

  [...block.children].forEach((row) => {
    const col = document.createElement('div');
    moveInstrumentation(row, col);
    col.classList.add('col-xl-4', 'col-lg-6', 'pb-md-0', 'pb-4', 'row-gap-4', 'koi-rscard-padding'); // From original HTML

    const card = document.createElement('div');
    card.classList.add('card', 'rs-card'); // From original HTML

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body'); // From original HTML

    let imageCell = null;
    let blogCardTitleCell = null;
    let cardTitleCell = null;

    // Use content detection to identify cells based on BlockJson structure
    const cells = [...row.children];
    imageCell = cells.find(cell => cell.querySelector('picture'));
    blogCardTitleCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim() !== '' && !cell.querySelector('p'));
    cardTitleCell = cells.find(cell => cell.querySelector('p'));

    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(imageCell, optimizedPic.querySelector('img'));
        card.append(optimizedPic);
        optimizedPic.classList.add('w-100', 'kitchens-image'); // From original HTML
      }
    }

    if (blogCardTitleCell) {
      const h5 = document.createElement('h5');
      h5.classList.add('blog-card-title'); // From original HTML
      moveInstrumentation(blogCardTitleCell, h5);
      while (blogCardTitleCell.firstChild) h5.append(blogCardTitleCell.firstChild);
      cardBody.append(h5);
    }

    if (cardTitleCell) {
      const h5 = document.createElement('h5');
      h5.classList.add('card-title'); // From original HTML
      moveInstrumentation(cardTitleCell, h5);
      while (cardTitleCell.firstChild) h5.append(cardTitleCell.firstChild);
      cardBody.append(h5);
    }

    card.append(cardBody);
    col.append(card);
    wrapper.append(col);
  });

  block.textContent = '';
  block.append(wrapper);
}
