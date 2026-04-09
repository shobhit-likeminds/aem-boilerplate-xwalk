import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const gridContainer = document.createElement('div');
  gridContainer.classList.add('row', 'g-4', 'purpose-led-grid', 'pt-3');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    // Based on BlockJson and EDS Block Structure:
    // cell[0]: field="image"
    // cell[1]: field="altText"
    // cell[2]: field="description"
    // cell[3]: field="cardLink"
    // cell[4]: field="cardLinkLabel" (this field is not used in the original HTML structure, so we can ignore it)

    const imageCell = cells[0];
    const altTextCell = cells[1];
    const descriptionCell = cells[2];
    const cardLinkCell = cells[3];

    const colDiv = document.createElement('div');
    moveInstrumentation(row, colDiv);
    colDiv.classList.add('col-md-6', 'aos-init', 'aos-animate');
    // Add AOS attributes from original HTML
    colDiv.setAttribute('data-aos-easing', 'ease-in-out');
    colDiv.setAttribute('data-aos', 'fade-up');
    colDiv.setAttribute('data-aos-delay', '700');

    const cardLink = cardLinkCell.querySelector('a');
    const cardWrap = document.createElement('a');
    cardWrap.classList.add('card-wrap');
    if (cardLink) {
      cardWrap.href = cardLink.href;
      // Original HTML explicitly sets target="_blank"
      cardWrap.target = '_blank';
    }

    const cardImageDiv = document.createElement('div');
    cardImageDiv.classList.add('card-image');

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        // Copy img-fluid class from original HTML's img element
        optimizedPic.querySelector('img').classList.add('img-fluid');
        cardImageDiv.append(optimizedPic);
      }
    }

    const cardTextDiv = document.createElement('div');
    cardTextDiv.classList.add('card-text');

    const descP = document.createElement('p');
    descP.classList.add('desc');
    // The description is richtext, so we append its children directly.
    moveInstrumentation(descriptionCell, descP);
    while (descriptionCell.firstChild) {
      descP.append(descriptionCell.firstChild);
    }

    cardTextDiv.append(descP);
    cardWrap.append(cardImageDiv, cardTextDiv);
    colDiv.append(cardWrap);
    gridContainer.append(colDiv);
  });

  block.textContent = '';
  block.append(gridContainer);
}
