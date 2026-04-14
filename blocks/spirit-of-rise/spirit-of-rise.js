import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...cardRows] = [...block.children];

  // The block itself is the 'spirit-of-rise' section.
  // The 'section' and 'grey-bg' classes are already on the outer <section> in the original HTML.
  // We should not add them to the block element itself, as the block is nested inside.
  // The block's outer div already has 'spirit-of-rise' from the block name.
  // block.classList.add('section', 'grey-bg'); // REMOVED - these classes are on the outer <section>

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center', 'pb-3');

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  moveInstrumentation(descriptionRow, description);
  description.textContent = descriptionRow.firstElementChild.textContent.trim();
  sectionHeader.append(description);

  block.append(sectionHeader);

  const performanceDriven = document.createElement('div');
  performanceDriven.classList.add('performance-driven', 'performace-driven-home');

  const container = document.createElement('div');
  container.classList.add('container');

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('performace-driven-cards');

  cardRows.forEach((row) => {
    // CRITICAL FIX: Replaced row.children[n] with content detection.
    // The order of cells might not always be guaranteed, or their presence.
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('http')); // Link cell contains an actual link
    const linkLabelCell = cells.find(cell => cell !== imageCell && cell !== linkCell && cell.textContent.trim().length > 0 && !cell.querySelector('p')); // Link Label cell might just be text or a redundant link
    const textCell = cells.find(cell => cell.querySelector('p')); // Text cell contains a paragraph

    const linkAnchor = document.createElement('a');
    linkAnchor.classList.add('performace-driven-cards-link');
    if (linkCell && linkCell.querySelector('a')) {
      const foundLink = linkCell.querySelector('a');
      linkAnchor.href = foundLink.href;
      linkAnchor.target = '_blank'; // Assuming target="_blank" from original HTML
    } else if (linkLabelCell && linkLabelCell.querySelector('a')) { // Fallback if link is in linkLabelCell
      const foundLink = linkLabelCell.querySelector('a');
      linkAnchor.href = foundLink.href;
      linkAnchor.target = '_blank';
    }
    moveInstrumentation(row, linkAnchor);

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    if (imageCell && imageCell.querySelector('picture')) {
      moveInstrumentation(imageCell, cardImage);
      cardImage.append(imageCell.querySelector('picture'));
    }

    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card');

    const descP = document.createElement('p');
    descP.classList.add('desc');
    if (textCell) {
      moveInstrumentation(textCell, descP);
      descP.innerHTML = textCell.innerHTML;
    }

    homeBoxCard.append(descP);
    cardWrapper.append(cardImage, homeBoxCard);
    linkAnchor.append(cardWrapper);
    cardsContainer.append(linkAnchor);
  });

  container.append(cardsContainer);
  performanceDriven.append(container);
  block.append(performanceDriven);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
