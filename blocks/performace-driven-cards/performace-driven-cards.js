import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardItems = [...block.children];
  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('performace-driven-cards');

  cardItems.forEach((row) => {
    const [cardLinkCell, imageDesktopCell, imageMobileCell, descriptionCell] = [...row.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('performace-driven-cards-link');
    const foundLink = cardLinkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.target = '_blank'; // Assuming target="_blank" from original HTML
    }

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');

    const picture = document.createElement('picture');

    // Mobile image source
    const mobileImg = imageMobileCell.querySelector('img');
    if (mobileImg) {
      const sourceMobile = document.createElement('source');
      sourceMobile.media = '(max-width: 576px)';
      sourceMobile.srcset = mobileImg.src;
      picture.append(sourceMobile);
    }

    // Desktop image
    const desktopImg = imageDesktopCell.querySelector('img');
    if (desktopImg) {
      const optimizedPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
      const imgElement = optimizedPic.querySelector('img');
      moveInstrumentation(desktopImg, imgElement); // Move instrumentation from original img to new img
      picture.append(imgElement);
    }

    cardImage.append(picture);

    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card');

    const description = document.createElement('p');
    description.classList.add('desc');
    description.innerHTML = descriptionCell.innerHTML;

    homeBoxCard.append(description);
    cardWrapper.append(cardImage, homeBoxCard);
    moveInstrumentation(row, cardLink); // Move instrumentation from original row to the new link element
    cardLink.append(cardWrapper);
    cardsContainer.append(cardLink);
  });

  block.replaceChildren(cardsContainer);
}
