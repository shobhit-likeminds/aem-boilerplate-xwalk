import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const sectionTitleRow = children[0];
  const pointerImageRow = children[1];
  const serviceCardRows = children.slice(2);

  const section = document.createElement('section');
  section.classList.add('service-section');
  section.id = 'services';

  // Section Title and Pointer Image
  const containerTop = document.createElement('div');
  containerTop.classList.add('container', 'position-relative');
  moveInstrumentation(sectionTitleRow, containerTop);
  moveInstrumentation(pointerImageRow, containerTop);

  const sectionTitle = document.createElement('h2');
  // FIX: Access the text content from the first child (the cell) of the row
  sectionTitle.textContent = sectionTitleRow.children[0]?.textContent.trim() || '';
  containerTop.append(sectionTitle);

  // FIX: Access the picture from the first child (the cell) of the row
  const pointerImagePicture = pointerImageRow.children[0]?.querySelector('picture');
  if (pointerImagePicture) {
    const img = pointerImagePicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('pointer');
      containerTop.append(optimizedPic);
    }
  }
  section.append(containerTop);

  // Service Cards
  const containerBottom = document.createElement('div');
  containerBottom.classList.add('container');

  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row', 'justify-content-around');

  serviceCardRows.forEach((cardRow) => {
    const [cardLinkCell, cardImageCell, cardTitleCell, cardDescriptionCell, cardButtonLabelCell] = [...cardRow.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('d-block', 'col-lg-4', 'col-md-6', 'col-12', 'service-card');
    const foundLink = cardLinkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
    } else {
      cardLink.href = '#';
    }

    const cardImagePicture = cardImageCell.querySelector('picture');
    if (cardImagePicture) {
      const img = cardImagePicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('img-fluid', 'service-img');
        cardLink.append(optimizedPic);
      }
    }

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = cardTitleCell.textContent.trim();
    cardLink.append(cardTitle);

    const cardDescription = document.createElement('p');
    cardDescription.innerHTML = cardDescriptionCell.innerHTML;
    cardLink.append(cardDescription);

    const cardButton = document.createElement('button');
    cardButton.textContent = cardButtonLabelCell.textContent.trim();
    cardLink.append(cardButton);

    moveInstrumentation(cardRow, cardLink);
    rowDiv.append(cardLink);
  });

  containerBottom.append(rowDiv);
  section.append(containerBottom);

  block.replaceChildren(section);
}
