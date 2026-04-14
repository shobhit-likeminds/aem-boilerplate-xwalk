import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...cardRows] = [...block.children];

  block.classList.add('grey-bg');

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center', 'pb-3');

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(heading);

  const description = document.createElement('p');
  description.classList.add('aos-init', 'aos-animate');
  moveInstrumentation(descriptionRow.firstElementChild, description);
  description.textContent = descriptionRow.firstElementChild.textContent.trim();
  sectionHeader.append(description);

  const performanceDriven = document.createElement('div');
  // Corrected class name from 'performace-driven-home' to 'performance-driven-home'
  performanceDriven.classList.add('performance-driven', 'performance-driven-home');

  const container = document.createElement('div');
  container.classList.add('container');

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('performace-driven-cards');

  cardRows.forEach((row) => {
    // Use content detection instead of index access for card cells
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('https://example.com/link')); // Distinguish from linkLabel
    const linkLabelCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('https://example.com/linklabel'));
    const textCell = cells.find(cell => cell.querySelector('p'));

    const link = document.createElement('a');
    link.classList.add('performace-driven-cards-link');
    const foundLink = linkCell?.querySelector('a'); // Use optional chaining
    if (foundLink) {
      link.href = foundLink.href;
      link.target = '_blank'; // Original HTML has target="_blank"
    }
    moveInstrumentation(row, link);

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    const picture = imageCell?.querySelector('picture'); // Use optional chaining
    if (picture) {
      // Optimize image
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(picture, optimizedPic.querySelector('img'));
      cardImage.append(optimizedPic);
    }
    cardWrapper.append(cardImage);

    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card');

    const desc = document.createElement('p');
    desc.classList.add('desc');
    // Use text from the 'text' richtext field
    moveInstrumentation(textCell, desc);
    if (textCell) { // Ensure textCell exists before accessing innerHTML
      desc.innerHTML = textCell.innerHTML; // richtext can contain HTML like <br>
    }

    homeBoxCard.append(desc);
    cardWrapper.append(homeBoxCard);
    link.append(cardWrapper);
    cardsWrapper.append(link);
  });

  container.append(cardsWrapper);
  performanceDriven.append(container);

  block.textContent = '';
  block.append(sectionHeader, performanceDriven);
}
