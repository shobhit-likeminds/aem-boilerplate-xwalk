import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cards = [...block.children];
  const root = document.createElement('div');
  // The block name from the prompt was 'performance-driven-cards-2', but the ORIGINAL HTML
  // and the generated JS correctly use 'performace-driven-cards' for the root wrapper.
  // This is a correction to ensure the class matches the ORIGINAL HTML exactly.
  root.classList.add('performace-driven-cards');

  cards.forEach((row) => {
    // Each row corresponds to a 'performance-driven-card-item'
    // Model fields: imageDesktop, imageMobile, description, link
    const [imageDesktopCell, imageMobileCell, descriptionCell, linkCell] = [...row.children];

    const anchor = document.createElement('a');
    anchor.classList.add('performace-driven-cards-link'); // Correct class name from ORIGINAL HTML
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.target = '_blank'; // Add target="_blank" as seen in ORIGINAL HTML
    }
    moveInstrumentation(row, anchor);

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper'); // Correct class name from ORIGINAL HTML

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image'); // Correct class name from ORIGINAL HTML

    // Handle desktop image
    const desktopPicture = imageDesktopCell?.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      if (desktopImg) {
        const optimizedDesktopPic = createOptimizedPicture(
          desktopImg.src,
          desktopImg.alt,
          false,
          [{ media: '(min-width: 577px)', width: '750' }],
        );
        // Move instrumentation from the original img to the new optimized img
        moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
        cardImage.append(optimizedDesktopPic);
      }
    }

    // Handle mobile image
    const mobilePicture = imageMobileCell?.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      if (mobileImg) {
        const optimizedMobilePic = createOptimizedPicture(
          mobileImg.src,
          mobileImg.alt,
          false,
          [{ media: '(max-width: 576px)', width: '576' }],
        );
        // Ensure the source for mobile is added to the picture element
        // The original picture element might already exist from the desktop image.
        // If it does, we prepend the mobile source to it.
        // If not, we append the entire optimized mobile picture.
        const existingPictureElement = cardImage.querySelector('picture');
        if (existingPictureElement) {
          existingPictureElement.prepend(optimizedMobilePic.querySelector('source'));
        } else {
          cardImage.append(optimizedMobilePic);
        }
      }
    }

    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card'); // Correct class name from ORIGINAL HTML

    const description = document.createElement('p');
    description.classList.add('desc'); // Correct class name from ORIGINAL HTML
    description.innerHTML = descriptionCell?.innerHTML || ''; // Richtext content

    homeBoxCard.append(description);
    cardWrapper.append(cardImage, homeBoxCard);
    anchor.append(cardWrapper);
    root.append(anchor);
  });

  block.replaceChildren(root);
}
