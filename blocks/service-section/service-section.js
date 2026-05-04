import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const section = document.createElement('section');
  section.classList.add('service-section');
  section.id = 'services';

  const containerOne = document.createElement('div');
  containerOne.classList.add('container', 'position-relative');

  const headingRow = children[0];
  const heading = document.createElement('h2');
  moveInstrumentation(headingRow, heading); // Corrected instrumentation source and target
  heading.textContent = headingRow.textContent.trim();
  containerOne.append(heading);

  const pointerImageRow = children[1];
  const pointerImage = pointerImageRow.querySelector('picture');
  if (pointerImage) {
    const img = pointerImage.querySelector('img');
    const optimizedPointerPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(pointerImageRow, optimizedPointerPic); // Move instrumentation to the picture element
    optimizedPointerPic.querySelector('img').classList.add('pointer');
    containerOne.append(optimizedPointerPic);
  }

  section.append(containerOne);

  const containerTwo = document.createElement('div');
  containerTwo.classList.add('container');
  const row = document.createElement('div');
  row.classList.add('row', 'justify-content-around');
  containerTwo.append(row);

  const serviceCardRows = children.slice(2); // All remaining rows are service cards

  serviceCardRows.forEach((cardRow) => {
    const [cardLinkCell, cardImageCell, cardTitleCell, cardDescriptionCell, buttonLabelCell] = [...cardRow.children];

    const cardLink = cardLinkCell.querySelector('a');
    const anchor = document.createElement('a');
    anchor.classList.add('d-block', 'col-lg-4', 'col-md-6', 'col-12', 'service-card');
    if (cardLink) {
      anchor.href = cardLink.href;
    }
    moveInstrumentation(cardRow, anchor);

    const cardImage = cardImageCell.querySelector('picture');
    if (cardImage) {
      const img = cardImage.querySelector('img');
      const optimizedCardPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(cardImageCell, optimizedCardPic); // Move instrumentation to the picture element
      optimizedCardPic.querySelector('img').classList.add('img-fluid', 'service-img');
      anchor.append(optimizedCardPic);
    }

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = cardTitleCell.textContent.trim();
    anchor.append(cardTitle);

    const cardDescription = document.createElement('div'); // Changed to div to avoid <p> inside <p>
    cardDescription.innerHTML = cardDescriptionCell.innerHTML;
    anchor.append(cardDescription);

    const button = document.createElement('button');
    button.textContent = buttonLabelCell.textContent.trim();
    anchor.append(button);

    row.append(anchor);
  });

  section.append(containerTwo);

  block.replaceChildren(section);
}
