import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // block.children[0]: sectionTitleRow
  // block.children[1]: pointerImageRow
  // block.children[2...N]: serviceCardRows
  const [sectionTitleRow, pointerImageRow, ...serviceCardRows] = [...block.children];

  const section = document.createElement('section');
  // section.classList.add('service-section'); // Removed: outer block div already has this class
  section.id = 'services';

  const containerPositionRelative = document.createElement('div');
  containerPositionRelative.classList.add('container', 'position-relative');
  section.append(containerPositionRelative);

  // sectionTitleRow is a row, its content is directly in its first child (the cell)
  const h2 = document.createElement('h2');
  moveInstrumentation(sectionTitleRow, h2);
  h2.textContent = sectionTitleRow.children[0]?.textContent.trim() || ''; // Read from cell, not row.querySelector('div')
  containerPositionRelative.append(h2);

  // pointerImageRow is a row, its content is directly in its first child (the cell)
  const pointerImageCell = pointerImageRow.children[0];
  const pointerPicture = pointerImageCell?.querySelector('picture');
  if (pointerPicture) {
    const pointerImg = pointerPicture.querySelector('img');
    const optimizedPointerPic = createOptimizedPicture(pointerImg.src, pointerImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(pointerImageRow, optimizedPointerPic.querySelector('img'));
    optimizedPointerPic.querySelector('img').classList.add('pointer');
    containerPositionRelative.append(optimizedPointerPic);
  }

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('container');
  section.append(cardsContainer);

  const row = document.createElement('div');
  row.classList.add('row', 'justify-content-around');
  cardsContainer.append(row);

  serviceCardRows.forEach((cardRow) => {
    // Fixed schema for service-card item rows, use destructuring
    const [cardLinkCell, cardImageCell, cardTitleCell, cardDescriptionCell, buttonLabelCell] = [...cardRow.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('d-block', 'col-lg-4', 'col-md-6', 'col-12', 'service-card');
    const foundCardLink = cardLinkCell.querySelector('a');
    if (foundCardLink) {
      cardLink.href = foundCardLink.href;
    }
    moveInstrumentation(cardRow, cardLink);

    const cardPicture = cardImageCell.querySelector('picture');
    if (cardPicture) {
      const cardImg = cardPicture.querySelector('img');
      const optimizedCardPic = createOptimizedPicture(cardImg.src, cardImg.alt, false, [{ width: '750' }]);
      optimizedCardPic.querySelector('img').classList.add('img-fluid', 'service-img');
      cardLink.append(optimizedCardPic);
    }

    const h3 = document.createElement('h3');
    h3.textContent = cardTitleCell?.textContent.trim() || '';
    cardLink.append(h3);

    const p = document.createElement('p');
    p.innerHTML = cardDescriptionCell?.innerHTML || ''; // cardDescription is richtext, use innerHTML
    cardLink.append(p);

    const button = document.createElement('button');
    button.textContent = buttonLabelCell?.textContent.trim() || '';
    cardLink.append(button);

    row.append(cardLink);
  });

  block.replaceChildren(section);
}
