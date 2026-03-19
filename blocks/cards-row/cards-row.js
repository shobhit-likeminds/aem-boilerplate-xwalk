import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('rs-cards-row');

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('rs-cards-row'); // Adding this class to mimic the original structure's row-like behavior for cards

  [...block.children].forEach((row) => {
    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('rs-cards-col-xl-4', 'rs-cards-col-lg-6', 'rs-cards-pb-md-0', 'rs-cards-pb-4', 'rs-cards-row-gap-4', 'rs-cards-koi-rscard-padding');
    moveInstrumentation(row, cardWrapper);

    const card = document.createElement('div');
    card.classList.add('rs-cards-card');

    let imageEl = null;
    let headlineEl = null;
    let descriptionEl = null;

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        imageEl = cell.querySelector('picture');
      } else if (cell.querySelector('h1, h2, h3, h4, h5, h6')) {
        headlineEl = cell.querySelector('h1, h2, h3, h4, h5, h6');
      } else if (cell.querySelector('p')) {
        descriptionEl = cell.querySelector('p');
      }
    });

    if (imageEl) {
      const img = imageEl.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.classList.add('rs-cards-w-100', 'rs-cards-kitchens-image');
        card.append(optimizedPic);
      }
    }

    const cardBody = document.createElement('div');
    cardBody.classList.add('rs-cards-card-body');

    // Create an empty anchor tag as per original HTML
    const emptyLink = document.createElement('a');
    emptyLink.setAttribute('aria-label', `Read more about '${headlineEl ? headlineEl.textContent.trim() : ''}'`);
    emptyLink.setAttribute('target', '_self');
    emptyLink.setAttribute('id', 'rs-cards-explore-btn-hide-id');
    cardBody.append(emptyLink);

    if (headlineEl) {
      const h5Headline = document.createElement('h5');
      h5Headline.classList.add('rs-cards-blog-card-title');
      moveInstrumentation(headlineEl, h5Headline);
      while (headlineEl.firstChild) h5Headline.append(headlineEl.firstChild);
      cardBody.append(h5Headline);
    }

    if (descriptionEl) {
      const h5Description = document.createElement('h5');
      h5Description.classList.add('rs-cards-card-title');
      moveInstrumentation(descriptionEl, h5Description);
      while (descriptionEl.firstChild) h5Description.append(descriptionEl.firstChild);
      cardBody.append(h5Description);
    }

    card.append(cardBody);
    cardWrapper.append(card);
    cardContainer.append(cardWrapper);
  });

  block.textContent = '';
  block.append(cardContainer);

  // Add the empty div at the end if it existed in the original structure
  const tabParaDiv = document.createElement('div');
  tabParaDiv.classList.add('rs-cards-tab-para');
  block.append(tabParaDiv);
}
