import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('rs-cards-row');

  [...block.children].forEach((row) => {
    const cardWrapper = document.createElement('div');
    moveInstrumentation(row, cardWrapper);
    cardWrapper.classList.add('rs-cards-col-xl-4', 'rs-cards-col-lg-6', 'rs-cards-pb-md-0', 'rs-cards-pb-4', 'rs-cards-row-gap-4', 'rs-cards-koi-rscard-padding');

    const card = document.createElement('div');
    card.classList.add('rs-cards-card', 'rs-cards-rs-card');

    const cardBody = document.createElement('div');
    cardBody.classList.add('rs-cards-card-body');

    // Model fields: image, title, description, icon, cta
    const cells = [...row.children];
    const imageCell = cells[0];
    const titleCell = cells[1];
    const descriptionCell = cells[2];
    const iconCell = cells[3];
    const ctaCell = cells[4];

    let imageEl = null;
    let titleEl = null;
    let descriptionEl = null;
    let iconLinkEl = null;
    let ctaEl = null;

    // Process image
    if (imageCell && imageCell.querySelector('picture')) {
      imageEl = imageCell.querySelector('picture');
    }

    // Process title
    if (titleCell && titleCell.querySelector('h1, h2, h3, h4, h5, h6')) {
      titleEl = titleCell.querySelector('h1, h2, h3, h4, h5, h6');
    } else if (titleCell) { // If it's not a heading, treat it as a paragraph
      titleEl = titleCell;
    }

    // Process description
    if (descriptionCell) {
      descriptionEl = descriptionCell;
    }

    // Process icon (which is a link containing an image)
    if (iconCell && iconCell.querySelector('a') && (iconCell.querySelector('a picture') || iconCell.querySelector('a img'))) {
      iconLinkEl = iconCell.querySelector('a');
    }

    // Process CTA (which is a link)
    if (ctaCell && ctaCell.querySelector('a')) {
      ctaEl = ctaCell.querySelector('a');
    }

    if (imageEl) {
      const img = imageEl.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      card.append(optimizedPic);
      optimizedPic.classList.add('rs-cards-w-100', 'rs-cards-kitchens-image');
    }

    if (iconLinkEl) {
      moveInstrumentation(iconLinkEl, iconLinkEl);
      iconLinkEl.classList.add('rs-cards-explore-btn-hide-id');
      cardBody.append(iconLinkEl);
    }

    if (titleEl) {
      moveInstrumentation(titleEl, titleEl);
      // If titleEl is a heading, add class directly. If it's a cell with text, wrap in h5.
      if (titleEl.tagName && titleEl.tagName.startsWith('H')) {
        titleEl.classList.add('rs-cards-blog-card-title');
        cardBody.append(titleEl);
      } else {
        const titleH5 = document.createElement('h5');
        titleH5.classList.add('rs-cards-blog-card-title');
        while (titleEl.firstChild) titleH5.append(titleEl.firstChild);
        cardBody.append(titleH5);
      }
    }

    if (descriptionEl) {
      const descriptionH5 = document.createElement('h5');
      descriptionH5.classList.add('rs-cards-card-title');
      const descriptionP = document.createElement('p');
      moveInstrumentation(descriptionEl, descriptionP);
      while (descriptionEl.firstChild) descriptionP.append(descriptionEl.firstChild);
      descriptionH5.append(descriptionP);
      cardBody.append(descriptionH5);
    }

    if (ctaEl) {
      moveInstrumentation(ctaEl, ctaEl);
      cardBody.append(ctaEl);
    }

    card.append(cardBody);
    cardWrapper.append(card);
    cardsContainer.append(cardWrapper);
  });

  block.textContent = '';
  block.append(cardsContainer);
}
