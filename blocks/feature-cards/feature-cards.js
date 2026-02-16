import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-container');

  // Process the title section
  const titleRow = block.children[0];
  if (titleRow) {
    const featurecardsText = document.createElement('div');
    featurecardsText.classList.add('featurecards-text');
    moveInstrumentation(titleRow, featurecardsText);

    const h1 = titleRow.querySelector('h1');
    if (h1) {
      const newH1 = document.createElement('h1');
      newH1.classList.add('featurecards-text-title');
      newH1.innerHTML = h1.innerHTML;
      featurecardsText.append(newH1);
    }
    featureCardsContainer.append(featurecardsText);
  }

  const sectionWrapper = document.createElement('div');
  sectionWrapper.classList.add('featurecards-section-wrapper');

  // Process the feature cards (sections)
  // Start from the second child of the block, as the first is the title
  const cardRows = [...block.children].slice(1);

  cardRows.forEach((row) => {
    // Check if the row is a 'section' type card or a 'bolte-sitare-card-section' type
    const isBolteSitareCard = row.classList.contains('featurecards-bolte-sitare-card-section');

    if (!isBolteSitareCard) {
      const section = document.createElement('section');
      section.classList.add('featurecards-section');
      moveInstrumentation(row, section);

      const link = row.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.classList.add('featurecards-link');
        newLink.href = link.href;
        if (link.title) newLink.title = link.title;
        if (link.target) newLink.target = link.target;
        if (link.dataset.ctaLabel) newLink.dataset.ctaLabel = link.dataset.ctaLabel;

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('featurecards-image-wrapper');
        const img = link.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('featurecards-image');
          imageWrapper.append(optimizedPic);
        }
        newLink.append(imageWrapper);

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('featurecards-content-wrapper');

        const title = link.querySelector('h2');
        if (title) {
          const newTitle = document.createElement('h2');
          newTitle.classList.add('featurecards-title');
          newTitle.textContent = title.textContent;
          contentWrapper.append(newTitle);
        }

        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('featurecards-description-wrapper');
        const description = link.querySelector('.featurecards-description');
        if (description) {
          const newDescription = document.createElement('p');
          newDescription.classList.add('featurecards-description');
          newDescription.textContent = description.textContent;
          descriptionWrapper.append(newDescription);
        }
        contentWrapper.append(descriptionWrapper);

        const redirectButton = document.createElement('div');
        redirectButton.classList.add('featurecards-redirect-button');
        const button = link.querySelector('button');
        if (button) {
          const newButton = document.createElement('button');
          newButton.type = 'button';
          newButton.role = 'button';
          newButton.classList.add('featurecards-arrow-icon-button');
          redirectButton.append(newButton);
        }
        contentWrapper.append(redirectButton);
        newLink.append(contentWrapper);
        section.append(newLink);
      }
      sectionWrapper.append(section);
    }
  });

  featureCardsContainer.append(sectionWrapper);

  const bolteSitareCardsWrapper = document.createElement('div');
  bolteSitareCardsWrapper.classList.add('featurecards-bolte-sitare-cards-wrapper');

  cardRows.forEach((row) => {
    const isBolteSitareCard = row.classList.contains('featurecards-bolte-sitare-card-section');

    if (isBolteSitareCard) {
      const link = row.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-link');
        newLink.href = link.href;
        if (link.title) newLink.title = link.title;
        if (link.target) newLink.target = link.target;
        if (link.dataset.title) newLink.dataset.title = link.dataset.title;
        moveInstrumentation(row, newLink);

        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('featurecards-bolte-sitare-card-wrapper');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('featurecards-bolte-sitare-card-image');
        const img = link.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('featurecards-bolte-sitare-card-image-img');
          imageDiv.append(optimizedPic);
        }
        cardWrapper.append(imageDiv);

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('featurecards-content-wrapper');

        const title = link.querySelector('h2');
        if (title) {
          const newTitle = document.createElement('h2');
          newTitle.classList.add('featurecards-bolte-sitare-card-title');
          newTitle.textContent = title.textContent;
          contentWrapper.append(newTitle);
        }

        const description = link.querySelector('p.featurecards-bolte-sitare-card-text');
        if (description) {
          const newDescription = document.createElement('p');
          newDescription.classList.add('featurecards-bolte-sitare-card-text');
          newDescription.textContent = description.textContent;
          contentWrapper.append(newDescription);
        }
        cardWrapper.append(contentWrapper);

        const buttonDiv = document.createElement('div');
        const button = link.querySelector('button');
        if (button) {
          const newButton = document.createElement('button');
          newButton.classList.add('featurecards-bolte-sitare-card-button');
          newButton.textContent = button.textContent;
          buttonDiv.append(newButton);
        }
        cardWrapper.append(buttonDiv);
        newLink.append(cardWrapper);
        bolteSitareCardsWrapper.append(newLink);
      }
    }
  });

  featureCardsContainer.append(bolteSitareCardsWrapper);

  // Process the curve container
  const curveContainerRow = [...block.children].find(row => row.classList.contains('featurecards-curve-container'));
  if (curveContainerRow) {
    const curveContainer = document.createElement('div');
    curveContainer.classList.add('featurecards-curve-container');
    moveInstrumentation(curveContainerRow, curveContainer);
    featureCardsContainer.append(curveContainer);
  }

  block.textContent = '';
  block.append(featureCardsContainer);
}
