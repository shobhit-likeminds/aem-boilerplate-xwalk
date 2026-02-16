import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featureCards-container');

  // Process the main title
  const titleRow = block.children[0];
  if (titleRow) {
    const mainTitleCell = titleRow.children[0];
    if (mainTitleCell) {
      const mainTitleWrapper = document.createElement('div');
      mainTitleWrapper.id = 'text-68763da680'; // Static ID from HTML
      mainTitleWrapper.classList.add('featureCards-text-wrapper');
      const h1 = document.createElement('h1');
      h1.classList.add('featureCards-main-title');
      // Assuming the rich text for mainTitle might contain a span for highlight
      h1.innerHTML = mainTitleCell.innerHTML;
      mainTitleWrapper.append(h1);
      featureCardsContainer.append(mainTitleWrapper);
      moveInstrumentation(titleRow, mainTitleWrapper);
    }
  }

  // Process card sections
  const cardSections = [...block.children].slice(1);

  cardSections.forEach((row) => {
    const linkElement = row.querySelector('a');
    if (!linkElement) return; // Skip if no link is found in the row

    const isBolteSitareCard = linkElement.classList.contains('featureCards-bolte-sitare-card-section');

    if (isBolteSitareCard) {
      const anchor = document.createElement('a');
      moveInstrumentation(row, anchor);
      anchor.classList.add('featureCards-bolte-sitare-card-section', 'analytics_cta_click');
      anchor.href = linkElement.href;
      anchor.title = linkElement.title;
      if (linkElement.target) anchor.target = linkElement.target;
      if (linkElement.dataset.title) anchor.dataset.title = linkElement.dataset.title;

      const cardWrapper = document.createElement('div');
      cardWrapper.classList.add('featureCards-bolte-sitare-card-wrapper');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featureCards-bolte-sitare-card-image');
      const img = linkElement.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('featureCards-bolte-sitare-card-image-img');
        imageWrapper.append(optimizedPic);
      }
      cardWrapper.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featureCards-bolte-sitare-content-wrapper');

      const textContentDiv = document.createElement('div');
      const h2 = document.createElement('h2');
      h2.classList.add('featureCards-bolte-sitare-title');
      h2.textContent = linkElement.querySelector('.featureCards-bolte-sitare-title')?.textContent || '';
      textContentDiv.append(h2);

      const p = document.createElement('p');
      p.classList.add('featureCards-bolte-sitare-text');
      p.innerHTML = linkElement.querySelector('.featureCards-bolte-sitare-text')?.innerHTML || '';
      textContentDiv.append(p);
      contentWrapper.append(textContentDiv);

      const buttonDiv = document.createElement('div');
      const button = document.createElement('button');
      button.classList.add('featureCards-bolte-sitare-button');
      button.textContent = linkElement.querySelector('.featureCards-bolte-sitare-button')?.textContent || 'Explore';
      buttonDiv.append(button);
      contentWrapper.append(buttonDiv);

      cardWrapper.append(contentWrapper);
      anchor.append(cardWrapper);
      featureCardsContainer.append(anchor);
    } else {
      const section = document.createElement('section');
      moveInstrumentation(row, section);
      section.classList.add('featureCards-section');

      const anchor = document.createElement('a');
      anchor.classList.add('featureCards-link', 'analytics_cta_click');
      anchor.href = linkElement.href;
      anchor.title = linkElement.title;
      if (linkElement.target) anchor.target = linkElement.target;
      if (linkElement.dataset.ctaLabel) anchor.dataset.ctaLabel = linkElement.dataset.ctaLabel;

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featureCards-image-wrapper');
      const img = linkElement.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('featureCards-image');
        imageWrapper.append(optimizedPic);
      }
      anchor.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featureCards-content-wrapper');

      const h2 = document.createElement('h2');
      h2.classList.add('featureCards-title');
      h2.textContent = linkElement.querySelector('.featureCards-title')?.textContent || '';
      contentWrapper.append(h2);

      const descriptionWrapper = document.createElement('div');
      descriptionWrapper.classList.add('featureCards-description-wrapper');
      const p = document.createElement('p');
      p.classList.add('featureCards-description');
      p.innerHTML = linkElement.querySelector('.featureCards-description')?.innerHTML || '';
      descriptionWrapper.append(p);
      contentWrapper.append(descriptionWrapper);

      const redirectButtonWrapper = document.createElement('div');
      redirectButtonWrapper.classList.add('featureCards-redirect-button-wrapper');
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'button';
      button.classList.add('featureCards-arrow-icon-btn');
      // Assuming the content of the button is the SVG path, or it's an empty button for styling
      button.innerHTML = linkElement.querySelector('.featureCards-arrow-icon-btn')?.innerHTML || '';
      redirectButtonWrapper.append(button);
      contentWrapper.append(redirectButtonWrapper);

      anchor.append(contentWrapper);
      section.append(anchor);
      featureCardsContainer.append(section);
    }
  });

  // Add the curve container
  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featureCards-curve-container');
  featureCardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsContainer);
}
