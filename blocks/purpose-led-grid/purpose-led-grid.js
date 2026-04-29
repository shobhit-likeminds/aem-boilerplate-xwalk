import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cards = [...block.children];

  const gridContainer = document.createElement('div');
  gridContainer.classList.add('row', 'g-4', 'purpose-led-grid', 'pt-3');

  cards.forEach((cardRow) => {
    const [cardLinkCell, imageDesktopCell, imageMobileCell, imageAltCell, descriptionCell] = [...cardRow.children];

    const colDiv = document.createElement('div');
    colDiv.classList.add('col-md-6', 'aos-init', 'aos-animate');
    colDiv.setAttribute('data-aos-easing', 'ease-in-out');
    colDiv.setAttribute('data-aos', 'fade-up');
    colDiv.setAttribute('data-aos-delay', '700');

    const cardLink = cardLinkCell.querySelector('a');
    const anchor = document.createElement('a');
    if (cardLink) {
      anchor.href = cardLink.href;
      anchor.target = '_blank'; // From original HTML
    }
    anchor.classList.add('card-wrap');
    moveInstrumentation(cardLinkCell, anchor);

    const cardImageDiv = document.createElement('div');
    cardImageDiv.classList.add('card-image');

    const picture = document.createElement('picture');
    const desktopImg = imageDesktopCell.querySelector('img');
    const mobileImg = imageMobileCell.querySelector('img');
    const altText = imageAltCell.textContent.trim();

    if (mobileImg) {
      const sourceMobile = document.createElement('source');
      sourceMobile.media = '(max-width: 576px)';
      sourceMobile.srcset = mobileImg.src;
      picture.append(sourceMobile);
    }

    if (desktopImg) {
      const img = createOptimizedPicture(desktopImg.src, altText, false, [{ width: '750' }]);
      img.querySelector('img').classList.add('img-fluid');
      picture.append(img.querySelector('img'));
      moveInstrumentation(imageDesktopCell, img.querySelector('img'));
    } else if (mobileImg) {
      // If only mobile image is provided, use it as fallback for desktop
      const img = createOptimizedPicture(mobileImg.src, altText, false, [{ width: '750' }]);
      img.querySelector('img').classList.add('img-fluid');
      picture.append(img.querySelector('img'));
      moveInstrumentation(imageMobileCell, img.querySelector('img'));
    }

    cardImageDiv.append(picture);
    anchor.append(cardImageDiv);

    const cardTextDiv = document.createElement('div');
    cardTextDiv.classList.add('card-text');

    const descriptionP = document.createElement('p');
    descriptionP.classList.add('desc');
    descriptionP.innerHTML = descriptionCell.innerHTML;
    moveInstrumentation(descriptionCell, descriptionP);
    cardTextDiv.append(descriptionP);
    anchor.append(cardTextDiv);

    colDiv.append(anchor);
    moveInstrumentation(cardRow, colDiv);
    gridContainer.append(colDiv);
  });

  block.replaceChildren(gridContainer);
}
