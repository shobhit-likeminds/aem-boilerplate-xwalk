import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ...cardRows] = [...block.children];

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
  performanceDriven.classList.add('performance-driven', 'performace-driven-home');

  const container = document.createElement('div');
  container.classList.add('container');

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('performace-driven-cards');

  cardRows.forEach((row) => {
    // CRITICAL FIX: Replaced array destructuring with content detection
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    // Assuming linkLabelCell is the cell containing a link that is not the primary link
    // and descriptionCell is the cell containing a <p> tag.
    // Based on the EDS structure, linkLabel is just a text field, but the generated JS
    // was trying to find a link in it. The original HTML shows the link label is not rendered.
    // The description cell contains a <p>.
    const descriptionCell = cells.find(cell => cell.querySelector('p'));

    const linkEl = document.createElement('a');
    linkEl.classList.add('performace-driven-cards-link');
    const foundLink = linkCell?.querySelector('a'); // Use optional chaining for safety
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank'; // Assuming target blank from original HTML
    }
    moveInstrumentation(row, linkEl);

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    const picture = imageCell?.querySelector('picture'); // Use optional chaining for safety
    if (picture) {
      cardImage.append(picture);
    }
    cardWrapper.append(cardImage);

    const homeBoxCard = document.createElement('div');
    homeBoxCard.classList.add('performace-driven-home-box-card');

    const descP = document.createElement('p');
    descP.classList.add('desc');
    // Ensure descriptionCell and its firstElementChild exist before accessing
    if (descriptionCell?.firstElementChild) {
      moveInstrumentation(descriptionCell.firstElementChild, descP);
      descP.innerHTML = descriptionCell.firstElementChild.innerHTML;
    }
    homeBoxCard.append(descP);

    cardWrapper.append(homeBoxCard);
    linkEl.append(cardWrapper);
    cardsContainer.append(linkEl);
  });

  container.append(cardsContainer);
  performanceDriven.append(container);

  block.textContent = '';
  block.classList.add('grey-bg'); // Add grey-bg to the block itself as per original HTML
  block.append(sectionHeader);
  block.append(performanceDriven);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
