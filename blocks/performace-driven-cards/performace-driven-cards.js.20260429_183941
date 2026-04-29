import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cardItems = [...block.children];
  const newBlockContent = document.createElement('div');
  newBlockContent.classList.add('performace-driven-cards');

  cardItems.forEach((row) => {
    const [cardLinkCell, imageDesktopCell, imageMobileCell, descriptionCell] = [...row.children];

    const cardLink = cardLinkCell.querySelector('a');
    const linkElement = document.createElement('a');
    linkElement.classList.add('performace-driven-cards-link');
    if (cardLink) {
      linkElement.href = cardLink.href;
      linkElement.target = '_blank'; // Assuming target blank from original HTML
    }
    moveInstrumentation(cardLinkCell, linkElement);

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');

    // Handle desktop image
    const desktopPicture = imageDesktopCell.querySelector('picture');
    let optimizedDesktopPic;
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      if (desktopImg) {
        // Desktop image is likely LCP, so set loading to eager (true)
        optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, true, [{ width: '750' }]);
        cardImage.append(optimizedDesktopPic);
      }
    }

    // Handle mobile image (create a source element for it)
    const mobilePicture = imageMobileCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      if (mobileImg) {
        const sourceElement = document.createElement('source');
        sourceElement.media = '(max-width: 576px)';
        sourceElement.srcset = mobileImg.src;

        // Prepend the source to the picture element
        const existingPicture = cardImage.querySelector('picture');
        if (existingPicture) {
          existingPicture.prepend(sourceElement);
        } else {
          // Fallback if no desktop picture, though model implies desktop always exists
          // This case should ideally not happen if desktop image is always present per model
          const newPicture = document.createElement('picture');
          newPicture.append(sourceElement);
          const imgEl = document.createElement('img');
          imgEl.src = mobileImg.src; // Use mobile image as fallback img src if no desktop
          imgEl.alt = mobileImg.alt;
          newPicture.append(imgEl);
          cardImage.append(newPicture);
        }
      }
    }
    // Instrumentation for the image cells should be moved to the cardImage container
    // The original instrumentation was on desktopImg, which is not the final element.
    // We move instrumentation from the desktop image cell, as it's the primary image source.
    moveInstrumentation(imageDesktopCell, cardImage);

    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card');

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.classList.add('desc');
    if (descriptionCell) {
      descriptionParagraph.innerHTML = descriptionCell.innerHTML;
    }
    moveInstrumentation(descriptionCell, descriptionParagraph);

    homeBoxCard.append(descriptionParagraph);
    cardWrapper.append(cardImage, homeBoxCard);
    linkElement.append(cardWrapper);
    newBlockContent.append(linkElement);
  });

  block.replaceChildren(newBlockContent);
}
