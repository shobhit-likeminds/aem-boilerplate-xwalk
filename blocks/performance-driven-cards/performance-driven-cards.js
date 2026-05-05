import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardItems = [...block.children];
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('performace-driven-cards'); // Use the block's own class as the root wrapper

  cardItems.forEach((row) => {
    const [cardLinkCell, cardImageDesktopCell, cardImageMobileCell, cardDescriptionCell] = [...row.children];

    const cardLink = cardLinkCell.querySelector('a');
    const linkEl = document.createElement('a');
    linkEl.classList.add('performace-driven-cards-link');
    if (cardLink) {
      linkEl.href = cardLink.href;
      linkEl.target = '_blank'; // Assuming target="_blank" from original HTML
    }
    moveInstrumentation(cardLinkCell, linkEl);

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    const cardImageDiv = document.createElement('div');
    cardImageDiv.classList.add('card-image');

    const pictureEl = document.createElement('picture');
    const desktopImg = cardImageDesktopCell.querySelector('img');
    const mobileImg = cardImageMobileCell.querySelector('img');

    if (mobileImg) {
      const sourceMobile = document.createElement('source');
      sourceMobile.media = '(max-width: 576px)';
      sourceMobile.srcset = mobileImg.src;
      pictureEl.append(sourceMobile);
    }

    if (desktopImg) {
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
      const imgEl = optimizedDesktopPic.querySelector('img');
      moveInstrumentation(desktopImg, imgEl);
      pictureEl.append(optimizedDesktopPic.querySelector('source'), imgEl);
    }
    cardImageDiv.append(pictureEl);

    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card');

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.classList.add('desc');
    descriptionParagraph.innerHTML = cardDescriptionCell?.innerHTML || ''; // Richtext content can have <br/>
    moveInstrumentation(cardDescriptionCell, descriptionParagraph);

    homeBoxCard.append(descriptionParagraph);
    cardWrapper.append(cardImageDiv, homeBoxCard);
    linkEl.append(cardWrapper);
    wrapperDiv.append(linkEl);

    // Ensure instrumentation is moved from the row itself if it's not explicitly moved from individual cells
    // In this case, we've moved instrumentation from cardLinkCell and cardDescriptionCell.
    // The row itself doesn't need instrumentation moved to a direct child of the block,
    // as its content is distributed into the new structure.
  });

  block.replaceChildren(wrapperDiv);
}
