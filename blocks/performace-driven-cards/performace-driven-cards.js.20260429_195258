import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardItems = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.classList.add('performace-driven-cards');

  cardItems.forEach((row) => {
    const [cardLinkCell, imageDesktopCell, imageMobileCell, descriptionCell] = [...row.children];

    const linkEl = document.createElement('a');
    linkEl.classList.add('performace-driven-cards-link');
    const foundLink = cardLinkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank'; // From original HTML
    }
    moveInstrumentation(cardLinkCell, linkEl);

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');

    const picture = document.createElement('picture');
    const source = document.createElement('source');
    source.media = '(max-width: 576px)';

    const mobileImg = imageMobileCell.querySelector('img');
    if (mobileImg) {
      source.srcset = mobileImg.src;
    }
    picture.appendChild(source);

    const desktopImg = imageDesktopCell.querySelector('img');
    if (desktopImg) {
      const img = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(desktopImg, img.querySelector('img'));
      picture.appendChild(img.querySelector('img'));
    }

    cardImage.appendChild(picture);

    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card');

    const descP = document.createElement('p');
    descP.classList.add('desc');
    if (descriptionCell) {
      descP.innerHTML = descriptionCell.innerHTML;
    }
    moveInstrumentation(descriptionCell, descP);

    homeBoxCard.appendChild(descP);
    cardWrapper.appendChild(cardImage);
    cardWrapper.appendChild(homeBoxCard);
    linkEl.appendChild(cardWrapper);
    wrapper.appendChild(linkEl);
  });

  block.replaceChildren(wrapper);
}
