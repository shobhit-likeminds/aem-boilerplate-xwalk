import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, subheadingRow, ...cardRows] = [...block.children];

  // Create section element and add classes
  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'spirit-of-rise');
  moveInstrumentation(block, section);

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center', 'pb-3');

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-delay', '200');
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  sectionHeader.append(heading);

  const subheading = document.createElement('p');
  subheading.classList.add('aos-init', 'aos-animate');
  subheading.setAttribute('data-aos', 'fade-up');
  subheading.setAttribute('data-aos-offset', '100');
  subheading.setAttribute('data-aos-duration', '650');
  subheading.setAttribute('data-aos-easing', 'ease-in-out');
  moveInstrumentation(subheadingRow.firstElementChild, subheading);
  subheading.textContent = subheadingRow.firstElementChild.textContent.trim();
  sectionHeader.append(subheading);

  section.append(sectionHeader);

  // Performance Driven section
  const performanceDriven = document.createElement('div');
  performanceDriven.classList.add('performance-driven', 'performace-driven-home');

  const container = document.createElement('div');
  container.classList.add('container');

  const cardsWrapper = document.createElement('div');
  cardsWrapper.classList.add('performace-driven-cards');

  cardRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection instead of index access
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const cardLinkCell = cells.find(cell => cell.querySelector('a') && cell.textContent.trim() !== '' && !cell.querySelector('picture'));
    const cardLinkLabelCell = cells.find(cell => cell.textContent.trim().startsWith('https://') || cell.textContent.trim().startsWith('http://')); // Assuming cardLinkLabel is just a URL string
    const descriptionCell = cells.find(cell => cell.querySelector('p') && !cell.querySelector('a'));

    const cardLink = document.createElement('a');
    cardLink.classList.add('performace-driven-cards-link');
    const foundLink = cardLinkCell?.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
      cardLink.target = '_blank'; // Assuming target blank from original HTML
    } else if (cardLinkLabelCell) { // Fallback if cardLinkCell is not found but cardLinkLabelCell has a URL
      const url = cardLinkLabelCell.textContent.trim();
      if (url.startsWith('http')) {
        cardLink.href = url;
        cardLink.target = '_blank';
      }
    }
    moveInstrumentation(cardLinkCell || cardLinkLabelCell, cardLink); // Move instrumentation from the cell that provided the link

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('performace-driven-card-wrapper');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card-image');
    if (imageCell) {
      moveInstrumentation(imageCell, cardImage);
      while (imageCell.firstChild) cardImage.append(imageCell.firstChild);
    }
    cardWrapper.append(cardImage);

    const cardBox = document.createElement('div');
    cardBox.classList.add('performace-driven-home-box-card');

    const description = document.createElement('p');
    description.classList.add('desc');
    if (descriptionCell) {
      moveInstrumentation(descriptionCell, description);
      while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    }
    cardBox.append(description);
    cardWrapper.append(cardBox);
    cardLink.append(cardWrapper);
    cardsWrapper.append(cardLink);
  });

  container.append(cardsWrapper);
  performanceDriven.append(container);
  section.append(performanceDriven);

  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(section);
}
