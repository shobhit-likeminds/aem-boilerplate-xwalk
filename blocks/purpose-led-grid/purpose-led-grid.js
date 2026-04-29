import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const cards = [...block.children];

  const gridContainer = document.createElement('div');
  gridContainer.classList.add('row', 'g-4', 'purpose-led-grid', 'pt-3');

  cards.forEach((cardRow) => {
    const [cardLinkCell, imageMobileCell, imageDesktopCell, imageAltCell, descriptionCell] = [...cardRow.children];

    const colDiv = document.createElement('div');
    colDiv.classList.add('col-md-6', 'aos-init', 'aos-animate');
    colDiv.setAttribute('data-aos-easing', 'ease-in-out');
    colDiv.setAttribute('data-aos', 'fade-up');
    colDiv.setAttribute('data-aos-delay', '700');
    moveInstrumentation(cardRow, colDiv); // Move instrumentation for the entire row to the colDiv

    const cardLink = cardLinkCell.querySelector('a');
    const anchor = document.createElement('a');
    if (cardLink) {
      anchor.href = cardLink.href;
      anchor.target = '_blank'; // From original HTML
    }
    anchor.classList.add('card-wrap');
    moveInstrumentation(cardLinkCell, anchor); // Move instrumentation for the link cell to the anchor

    const cardImageDiv = document.createElement('div');
    cardImageDiv.classList.add('card-image');

    const pictureMobile = imageMobileCell.querySelector('picture');
    const pictureDesktop = imageDesktopCell.querySelector('picture');
    const imageAltText = imageAltCell.textContent.trim();

    if (pictureMobile && pictureDesktop) {
      const sourceMobile = document.createElement('source');
      sourceMobile.media = '(max-width: 576px)';
      sourceMobile.srcset = pictureMobile.querySelector('img').src;

      const imgDesktop = pictureDesktop.querySelector('img');
      const optimizedPic = createOptimizedPicture(imgDesktop.src, imageAltText, false, [{ width: '750' }]);
      const img = optimizedPic.querySelector('img');
      img.classList.add('img-fluid'); // From original HTML

      const pictureElement = document.createElement('picture');
      pictureElement.append(sourceMobile, img); // Append mobile source and desktop img directly
      // If optimizedPic has a source for desktop, it will be handled by createOptimizedPicture
      // No need to append optimizedPic.querySelector('source') explicitly if img is already from optimizedPic

      cardImageDiv.append(pictureElement);
      // moveInstrumentation(imageMobileCell, pictureElement); // Redundant, instrumentation for row is on colDiv
      // moveInstrumentation(imageDesktopCell, pictureElement); // Redundant, instrumentation for row is on colDiv
    }

    const cardTextDiv = document.createElement('div');
    cardTextDiv.classList.add('card-text');

    const descP = document.createElement('p');
    descP.classList.add('desc');
    descP.innerHTML = descriptionCell.innerHTML;
    moveInstrumentation(descriptionCell, descP); // Move instrumentation for the description cell to the paragraph
    cardTextDiv.append(descP);

    anchor.append(cardImageDiv, cardTextDiv);
    colDiv.append(anchor);
    gridContainer.append(colDiv);
  });

  block.replaceChildren(gridContainer);
}
