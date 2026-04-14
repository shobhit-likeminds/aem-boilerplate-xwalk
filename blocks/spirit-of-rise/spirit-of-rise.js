import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const allRows = [...block.children];

  // Separate section rows from card rows based on cell count
  const sectionRows = allRows.filter((row) => row.children.length === 3);
  const cardRows = allRows.filter((row) => row.children.length === 4);

  block.textContent = '';
  block.classList.add('section', 'spirit-of-rise');

  sectionRows.forEach((sectionRow, sectionIndex) => {
    // CRITICAL FIX: Use content detection instead of index access for sectionRow.children
    const sectionCells = [...sectionRow.children];
    const headingCell = sectionCells.find(cell => cell.querySelector('h1, h2, h3, h4, h5, h6') || (cell.textContent.trim() && !cell.querySelector('p') && !cell.querySelector('a')));
    const descriptionCell = sectionCells.find(cell => cell.querySelector('p') || (cell.textContent.trim() && !cell.querySelector('h1, h2, h3, h4, h5, h6') && !cell.querySelector('a')));
    const cardsCell = sectionCells.find(cell => !headingCell.contains(cell) && !descriptionCell.contains(cell)); // This cell is just a placeholder for the container

    const sectionHeader = document.createElement('div');
    sectionHeader.classList.add('section-header', 'text-center', 'pb-3');
    if (headingCell) {
      moveInstrumentation(headingCell, sectionHeader);
    }

    if (headingCell && headingCell.textContent.trim()) {
      const heading = document.createElement('h2');
      heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
      heading.textContent = headingCell.textContent.trim();
      sectionHeader.append(heading);
    }

    if (descriptionCell && descriptionCell.textContent.trim()) {
      const description = document.createElement('p');
      description.classList.add('aos-init', 'aos-animate');
      description.textContent = descriptionCell.textContent.trim();
      sectionHeader.append(description);
    }
    block.append(sectionHeader);

    const performanceDriven = document.createElement('div');
    // Corrected class name from 'performace-driven-home' to 'performance-driven-home'
    performanceDriven.classList.add('performance-driven', 'performance-driven-home');
    if (cardsCell) {
      moveInstrumentation(cardsCell, performanceDriven);
    }

    const container = document.createElement('div');
    container.classList.add('container');
    performanceDriven.append(container);

    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('performace-driven-cards');
    container.append(cardsContainer);

    const cardsPerSection = 3; // Based on the example HTML
    const startIndex = sectionIndex * cardsPerSection;
    const sectionCards = cardRows.slice(startIndex, startIndex + cardsPerSection);

    sectionCards.forEach((cardRow) => {
      const [imageCell, linkCell, linkLabelCell, descriptionCellCard] = [...cardRow.children];

      const linkEl = document.createElement('a');
      linkEl.classList.add('performace-driven-cards-link');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.target = '_blank'; // Based on original HTML
      }
      moveInstrumentation(cardRow, linkEl);

      const cardWrapper = document.createElement('div');
      cardWrapper.classList.add('performace-driven-card-wrapper');
      linkEl.append(cardWrapper);

      const cardImage = document.createElement('div');
      cardImage.classList.add('card-image');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          cardImage.append(optimizedPic);
        }
      }
      cardWrapper.append(cardImage);

      const homeBoxCard = document.createElement('div');
      homeBoxCard.classList.add('performace-driven-home-box-card');
      cardWrapper.append(homeBoxCard);

      const descriptionP = document.createElement('p');
      descriptionP.classList.add('desc');
      descriptionP.innerHTML = descriptionCellCard.textContent.trim(); // Use innerHTML for potential br tags
      homeBoxCard.append(descriptionP);

      cardsContainer.append(linkEl);
    });

    block.append(performanceDriven);

    // Add grey-bg class to subsequent sections if applicable, based on original HTML pattern
    if (sectionIndex > 0) {
      block.classList.add('grey-bg');
    }
  });

  // Optimize all images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
