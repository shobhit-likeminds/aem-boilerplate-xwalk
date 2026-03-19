import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards-row');

  [...block.children].forEach((row) => {
    const cardWrapper = document.createElement('div');
    moveInstrumentation(row, cardWrapper);
    cardWrapper.classList.add('cards-col-xl-4', 'cards-col-lg-6', 'cards-pb-md-0', 'cards-pb-4', 'cards-row-gap-4', 'cards-koi-rscard-padding');

    const card = document.createElement('div');
    card.classList.add('cards-card', 'cards-rs-card');

    let imageElement = null;
    let titleElement = null;
    let descriptionElement = null;

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        imageElement = cell.querySelector('picture');
      } else if (cell.querySelector('h1, h2, h3, h4, h5, h6')) {
        titleElement = cell.querySelector('h1, h2, h3, h4, h5, h6');
      } else if (cell.querySelector('p')) {
        descriptionElement = cell.querySelector('p');
      }
    });

    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageElement.replaceWith(optimizedPic);
        optimizedPic.classList.add('cards-w-100', 'cards-kitchens-image'); // Apply classes to the picture element
        card.append(optimizedPic);
      }
    }

    const cardBody = document.createElement('div');
    cardBody.classList.add('cards-card-body');

    if (titleElement) {
      const h5Title = document.createElement('h5');
      h5Title.classList.add('cards-blog-card-title');
      moveInstrumentation(titleElement, h5Title);
      h5Title.append(titleElement.textContent);
      cardBody.append(h5Title);
    }

    if (descriptionElement) {
      const h5Description = document.createElement('h5');
      h5Description.classList.add('cards-card-title');
      moveInstrumentation(descriptionElement, h5Description);
      h5Description.append(descriptionElement);
      cardBody.append(h5Description);
    }

    card.append(cardBody);
    cardWrapper.append(card);
    cardsContainer.append(cardWrapper);
  });

  block.textContent = '';
  block.classList.add('cards-rs-cards');
  block.append(cardsContainer);

  const tabPara = document.createElement('div');
  tabPara.classList.add('cards-tab-para');
  block.append(tabPara);
}
