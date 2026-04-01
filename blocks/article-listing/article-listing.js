import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const sectionWrapper = document.createElement('section');
  sectionWrapper.classList.add('article_listing--wrapper');

  const articleListingDiv = document.createElement('div');
  articleListingDiv.classList.add('article_listing', 'position-relative');
  sectionWrapper.append(articleListingDiv);

  const [titleRow, descriptionRow, buttonLinkRow, ...articleCardRows] = [...block.children];

  // First section
  const firstSection = document.createElement('div');
  firstSection.classList.add('article_listing_section--first', 'text-white', 'text-center');

  const titleEl = document.createElement('h2');
  titleEl.classList.add('article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
  moveInstrumentation(titleRow, titleEl);
  // Corrected: Use textContent.trim() directly from the row, as per block structure
  titleEl.append(titleRow.textContent.trim());
  firstSection.append(titleEl);

  const descriptionEl = document.createElement('p');
  descriptionEl.classList.add('article_listing--desc', 'boing--text__body-2', 'pb-4');
  moveInstrumentation(descriptionRow, descriptionEl);
  // Corrected: Append all child nodes from the description row's first element
  if (descriptionRow.firstElementChild) {
    while (descriptionRow.firstElementChild.firstChild) {
      descriptionEl.append(descriptionRow.firstElementChild.firstChild);
    }
  }
  firstSection.append(descriptionEl);

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('article_listing--btnWrapper');
  const buttonLink = buttonLinkRow.querySelector('a');
  if (buttonLink) {
    const buttonEl = document.createElement('a');
    buttonEl.href = buttonLink.href;
    buttonEl.title = buttonLink.textContent.trim();
    buttonEl.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
    moveInstrumentation(buttonLinkRow, buttonEl);
    buttonEl.append(buttonLink.textContent.trim());

    // Check for an image inside the button link cell
    const svgImg = buttonLinkRow.querySelector('img');
    if (svgImg) {
      const imgEl = document.createElement('img');
      imgEl.alt = svgImg.alt;
      imgEl.src = svgImg.src;
      buttonEl.append(imgEl);
    }
    buttonWrapper.append(buttonEl);
  }
  firstSection.append(buttonWrapper);
  articleListingDiv.append(firstSection);

  // Second section (article cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('article_listing_section--second', 'd-flex');

  articleCardRows.forEach((row) => {
    // No row.children[n] violations found here, content detection is used.
    const linkEl = row.querySelector('a');
    const imageEl = row.querySelector('picture');
    const dateCell = [...row.children].find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim() !== '');
    const textCell = [...row.children].find(cell => cell.querySelector('p'));

    if (linkEl) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = linkEl.href;
      cardWrapper.classList.add('article_listing--cardWrapper', 'analytics_cta_click');
      cardWrapper.setAttribute('data-cta-label', linkEl.textContent.trim());
      moveInstrumentation(row, cardWrapper);

      const cardsDiv = document.createElement('div');
      cardsDiv.classList.add('article_listing--cards');

      if (imageEl) {
        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('article_listing--cardImageWrapper');

        const img = imageEl.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          optimizedPic.querySelector('img').classList.add('article_listing--cardImage', 'w-100', 'h-100');
          moveInstrumentation(imageEl, optimizedPic.querySelector('img'));
          cardImageWrapper.append(optimizedPic);
        }
        cardsDiv.append(cardImageWrapper);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('cards_content--wrapper');

      if (dateCell) {
        const dateP = document.createElement('p');
        dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
        dateP.textContent = dateCell.textContent.trim();
        contentWrapper.append(dateP);
      }

      if (textCell) {
        const textP = document.createElement('p');
        textP.classList.add('boing--text__body-2', 'boing--text__body');
        // Corrected: Append all child nodes from the text cell's first element
        if (textCell.firstElementChild) {
          while (textCell.firstElementChild.firstChild) {
            textP.append(textCell.firstElementChild.firstChild);
          }
        }
        contentWrapper.append(textP);
      }

      cardsDiv.append(contentWrapper);
      cardWrapper.append(cardsDiv);
      secondSection.append(cardWrapper);
    }
  });

  articleListingDiv.append(secondSection);

  block.textContent = '';
  block.append(sectionWrapper);
}
