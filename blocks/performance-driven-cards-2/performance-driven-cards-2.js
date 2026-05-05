import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0.5: The block's own class 'performance-driven-cards-2' should not be added to an inner wrapper.
  // The outer block div already has it. The original HTML uses 'performace-driven-cards' for the inner wrapper.
  const performaceDrivenCards = document.createElement('div');
  performaceDrivenCards.classList.add('performace-driven-cards'); // Correct class from ORIGINAL HTML

  const cardRows = [...block.children];

  cardRows.forEach((row) => {
    // CHECK 0: Array destructuring is correct for fixed-schema rows. No direct bracket access violations.
    // CHECK 1: Structure alignment - 4 cells per item row, matching BlockJson.
    const [imageDesktopCell, imageMobileCell, descriptionCell, cardLinkCell] = [...row.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('performace-driven-cards-link');
    const foundLink = cardLinkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      // CHECK 2.6 C: Data attribute values - target="_blank" is present in original HTML.
      cardLink.target = '_blank';
    }
    moveInstrumentation(row, cardLink); // CHECK 3: moveInstrumentation for the row

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');

    const picture = document.createElement('picture');

    // Mobile image source
    const mobilePicture = imageMobileCell.querySelector('picture');
    const mobileImg = mobilePicture ? mobilePicture.querySelector('img') : null;
    if (mobileImg) {
      const sourceMobile = document.createElement('source');
      sourceMobile.media = '(max-width: 576px)';
      sourceMobile.srcset = mobileImg.src;
      picture.append(sourceMobile);
    }

    // Desktop image
    const desktopPicture = imageDesktopCell.querySelector('picture');
    const desktopImg = desktopPicture ? desktopPicture.querySelector('img') : null;
    if (desktopImg) {
      // CHECK 3: moveInstrumentation for the desktop image element
      const img = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(desktopImg, img.querySelector('img'));
      picture.append(img.querySelector('img'));
    }

    cardImage.append(picture);

    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card');

    const description = document.createElement('p');
    description.classList.add('desc');
    // CHECK 0.7 B: description is a 'text' type field, not 'richtext'.
    // It contains plain text, not HTML like <p> or <ul>.
    // Using innerHTML on a text cell that contains <p> will create <p><p>...</p></p>.
    // Use textContent.trim() for 'text' fields.
    description.textContent = descriptionCell.textContent.trim();

    homeBoxCard.append(description);
    cardWrapper.append(cardImage, homeBoxCard);
    cardLink.append(cardWrapper);
    performaceDrivenCards.append(cardLink);
  });

  block.replaceChildren(performaceDrivenCards);
}
