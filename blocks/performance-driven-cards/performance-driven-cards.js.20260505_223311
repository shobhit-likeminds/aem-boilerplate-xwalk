import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cards = [...block.children];
  const root = document.createElement('div');
  root.classList.add('performace-driven-cards');

  cards.forEach((cardRow) => {
    const [linkCell, imageDesktopCell, imageMobileCell, descriptionCell] = [...cardRow.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('performace-driven-cards-link');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.target = '_blank'; // From original HTML
    }
    moveInstrumentation(cardRow, cardLink);

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');

    const picture = document.createElement('picture');
    const mobileImg = imageMobileCell.querySelector('img');
    const desktopImg = imageDesktopCell.querySelector('img');

    if (mobileImg) {
      const sourceMobile = document.createElement('source');
      sourceMobile.media = '(max-width: 576px)';
      sourceMobile.srcset = mobileImg.src;
      picture.append(sourceMobile);
    }

    if (desktopImg) {
      const img = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
      picture.append(img.querySelector('img'));
    }

    cardImage.append(picture);

    const cardContent = document.createElement('div');
    cardContent.classList.add('performace-driven-home-box-card');

    const description = document.createElement('p');
    description.classList.add('desc');
    description.innerHTML = descriptionCell.innerHTML;

    cardContent.append(description);
    cardWrapper.append(cardImage, cardContent);
    cardLink.append(cardWrapper);
    root.append(cardLink);
  });

  block.replaceChildren(root);
}
