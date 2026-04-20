import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...cardRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'spirit-of-rise');
  moveInstrumentation(block, section);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center', 'pb-3');

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = headingRow ? headingRow.firstElementChild.textContent.trim() : '';
  sectionHeader.appendChild(heading);
  moveInstrumentation(headingRow, heading);

  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  description.textContent = descriptionRow ? descriptionRow.firstElementChild.textContent.trim() : '';
  sectionHeader.appendChild(description);
  moveInstrumentation(descriptionRow, description);

  section.appendChild(sectionHeader);

  const performanceDriven = document.createElement('div');
  performanceDriven.classList.add('performance-driven', 'performace-driven-home');

  const container = document.createElement('div');
  container.classList.add('container');

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('performace-driven-cards');

  cardRows.forEach((row) => {
    // Corrected: Using index destructuring as per EDS Block Structure for fixed-field item model
    const [imageCell, linkCell, descriptionCell] = [...row.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('performace-driven-cards-link');
    if (linkCell && linkCell.querySelector('a')) { // Ensure there's an anchor tag
      cardLink.href = linkCell.querySelector('a').href;
    }
    moveInstrumentation(row, cardLink);

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    if (imageCell) {
      const cardImage = document.createElement('div');
      cardImage.classList.add('card-image');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          cardImage.appendChild(optimizedPic);
        }
      }
      cardWrapper.appendChild(cardImage);
    }

    const textBox = document.createElement('div');
    textBox.classList.add('performace-driven-home-box-card');

    const desc = document.createElement('p');
    desc.classList.add('desc');
    if (descriptionCell) {
      desc.textContent = descriptionCell.textContent.trim();
    }
    textBox.appendChild(desc);
    cardWrapper.appendChild(textBox);
    cardLink.appendChild(cardWrapper);
    cardsWrapper.appendChild(cardLink);
  });

  container.appendChild(cardsWrapper);
  performanceDriven.appendChild(container);
  section.appendChild(performanceDriven);

  block.replaceWith(section);
}
