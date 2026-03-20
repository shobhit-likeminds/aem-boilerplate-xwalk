import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rscardsContainer = document.createElement('div');
  rscardsContainer.classList.add('rscards-container');

  const rscardsRow = document.createElement('div');
  rscardsRow.classList.add('rscards-row');
  rscardsContainer.append(rscardsRow);

  [...block.children].forEach((row) => {
    const col = document.createElement('div');
    moveInstrumentation(row, col);
    col.classList.add('rscards-col-xl-4', 'rscards-col-lg-6', 'rscards-pb-md-0', 'rscards-pb-4', 'rscards-row-gap-4', 'rscards-koi-rscard-padding');

    const card = document.createElement('div');
    card.classList.add('rscards-card');
    col.append(card);

    const cardBody = document.createElement('div');
    cardBody.classList.add('rscards-card-body');

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        const picture = cell.querySelector('picture');
        const img = picture ? picture.querySelector('img') : null;
        if (img) {
          img.classList.add('rscards-w-100', 'rscards-kitchens-image');
          card.append(picture);
        }
      } else {
        const h5Title = document.createElement('h5');
        h5Title.classList.add('rscards-blog-card-title');
        const h5Description = document.createElement('h5');
        h5Description.classList.add('rscards-card-title');

        const paragraphs = [...cell.querySelectorAll('p')];
        if (paragraphs.length > 0) {
          // First paragraph is title, rest is description
          h5Title.append(paragraphs[0]);
          paragraphs.shift(); // Remove the first paragraph
          paragraphs.forEach((p) => h5Description.append(p));
        } else {
          // If no paragraphs, treat cell content as title
          h5Title.append(...cell.childNodes);
        }
        cardBody.append(h5Title, h5Description);
      }
    });

    card.append(cardBody);
    rscardsRow.append(col);
  });

  rscardsContainer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(rscardsContainer);
}
