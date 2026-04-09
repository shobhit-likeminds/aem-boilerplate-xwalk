import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, descriptionRow, ctaLinkRow, ctaLinkLabelRow, ...articleRows] = [...block.children];

  const sectionWrapper = document.createElement('section');
  sectionWrapper.classList.add('article_listing--wrapper');

  const articleListing = document.createElement('div');
  articleListing.classList.add('article_listing', 'position-relative');
  moveInstrumentation(block, articleListing);

  const firstSection = document.createElement('div');
  firstSection.classList.add('article_listing_section--first', 'text-white', 'text-center');

  // Title
  const title = document.createElement('h2');
  title.classList.add('article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
  moveInstrumentation(titleRow, title);
  while (titleRow.firstChild) title.append(titleRow.firstChild);
  firstSection.append(title);

  // Description
  const description = document.createElement('p');
  description.classList.add('article_listing--desc', 'boing--text__body-2', 'pb-4');
  moveInstrumentation(descriptionRow, description);
  while (descriptionRow.firstChild) description.append(descriptionRow.firstChild);
  firstSection.append(description);

  // CTA
  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('article_listing--btnWrapper');
  const ctaLink = document.createElement('a');
  const originalCtaLink = ctaLinkRow.querySelector('a');
  if (originalCtaLink) {
    ctaLink.href = originalCtaLink.href;
  }
  // The ctaLinkLabelRow contains the text directly within its div, not a nested div.
  // The original HTML also shows the text directly in the <a> tag.
  ctaLink.textContent = ctaLinkLabelRow.textContent.trim();
  
  ctaLink.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
  moveInstrumentation(ctaLinkRow, ctaLink);
  moveInstrumentation(ctaLinkLabelRow, ctaLink);

  // Add SVG image from original HTML
  const ctaImage = document.createElement('img');
  ctaImage.alt = 'svg file';
  ctaImage.src = '/content/dam/aemigrate/uploaded-folder/image/1775730059444.svg+xml';
  ctaLink.append(ctaImage);

  ctaWrapper.append(ctaLink);
  firstSection.append(ctaWrapper);
  articleListing.append(firstSection);

  // Article Cards
  const secondSection = document.createElement('div');
  secondSection.classList.add('article_listing_section--second', 'd-flex');

  articleRows.forEach((row) => {
    const cardLink = document.createElement('a');
    cardLink.classList.add('article_listing--cardWrapper', 'analytics_cta_click');
    moveInstrumentation(row, cardLink);

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('article_listing--cards');
    cardLink.append(cardDiv);

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('article_listing--cardImageWrapper');
    cardDiv.append(cardImageWrapper);

    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('cards_content--wrapper');
    cardDiv.append(cardsContentWrapper);

    // Use content detection for cells based on BlockJson and original HTML
    const cells = [...row.children];
    const cardLinkCell = cells.find(cell => cell.querySelector('a'));
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const dateCell = cells.find(cell => cell.textContent.trim().match(/\d{2} \w+ \d{4}/));
    const headlineCell = cells.find(cell => cell.querySelector('p') && !cell.textContent.trim().match(/\d{2} \w+ \d{4}/));

    if (cardLinkCell) { // Card Link
      const originalCardLink = cardLinkCell.querySelector('a');
      if (originalCardLink) {
        cardLink.href = originalCardLink.href;
        cardLink.setAttribute('data-cta-label', originalCardLink.textContent.trim());
      }
    }

    if (imageCell) { // Image
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt;
        newImg.classList.add('article_listing--cardImage', 'w-100', 'h-100');
        moveInstrumentation(imageCell, newImg);
        cardImageWrapper.append(newImg);
      }
    }

    if (dateCell) { // Date
      const dateP = document.createElement('p');
      dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
      moveInstrumentation(dateCell, dateP);
      while (dateCell.firstChild) dateP.append(dateCell.firstChild);
      cardsContentWrapper.append(dateP);
    }

    if (headlineCell) { // Headline
      const headlineP = document.createElement('p');
      headlineP.classList.add('boing--text__body-2', 'boing--text__body');
      moveInstrumentation(headlineCell, headlineP);
      while (headlineCell.firstChild) headlineP.append(headlineCell.firstChild);
      cardsContentWrapper.append(headlineP);
    }
    
    secondSection.append(cardLink);
  });

  articleListing.append(secondSection);
  sectionWrapper.append(articleListing);

  sectionWrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(sectionWrapper);
}
