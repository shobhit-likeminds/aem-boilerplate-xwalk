import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, descriptionRow, ctaLinkRow, ctaLinkLabelRow, ...cardRows] = [...block.children];

  const wrapper = document.createElement('section');
  wrapper.classList.add('article_listing--wrapper');
  moveInstrumentation(block, wrapper);

  const articleListing = document.createElement('div');
  articleListing.classList.add('article_listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('article_listing_section--first', 'text-white', 'text-center');

  const heading = document.createElement('h2');
  heading.classList.add('article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  firstSection.append(heading);

  const description = document.createElement('p');
  description.classList.add('article_listing--desc', 'boing--text__body-2', 'pb-4');
  moveInstrumentation(descriptionRow, description);
  description.textContent = descriptionRow.firstElementChild.textContent.trim();
  firstSection.append(description);

  const ctaBtnWrapper = document.createElement('div');
  ctaBtnWrapper.classList.add('article_listing--btnWrapper');

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
  moveInstrumentation(ctaLinkRow, ctaLink);
  const originalCtaLink = ctaLinkRow.querySelector('a');
  if (originalCtaLink) {
    ctaLink.href = originalCtaLink.href;
    ctaLink.title = ctaLinkLabelRow.firstElementChild.textContent.trim();
  }
  ctaLink.textContent = ctaLinkLabelRow.firstElementChild.textContent.trim();
  moveInstrumentation(ctaLinkLabelRow, ctaLink);
  ctaBtnWrapper.append(ctaLink);
  firstSection.append(ctaBtnWrapper);

  articleListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('article_listing_section--second', 'd-flex');

  cardRows.forEach((row) => {
    const [imageCell, dateCell, titleCell, cardLinkCell, cardLinkLabelCell] = [...row.children];

    const cardLink = document.createElement('a');
    cardLink.classList.add('article_listing--cardWrapper', 'analytics_cta_click');
    moveInstrumentation(row, cardLink);

    const originalCardLink = cardLinkCell.querySelector('a');
    if (originalCardLink) {
      cardLink.href = originalCardLink.href;
      cardLink.setAttribute('data-cta-label', cardLinkLabelCell.textContent.trim());
    }

    const cardsDiv = document.createElement('div');
    cardsDiv.classList.add('article_listing--cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('article_listing--cardImageWrapper');

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('article_listing--cardImage', 'w-100', 'h-100');
        moveInstrumentation(picture, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);
      }
    }
    cardsDiv.append(cardImageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('cards_content--wrapper');

    const dateP = document.createElement('p');
    dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
    moveInstrumentation(dateCell, dateP);
    const dateValue = dateCell.textContent.trim();
    if (dateValue) {
      const dateObj = new Date(dateValue);
      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      dateP.textContent = dateObj.toLocaleDateString('en-GB', options);
      dateP.setAttribute('data-date', dateValue);
    }
    contentWrapper.append(dateP);

    const titleP = document.createElement('p');
    titleP.classList.add('boing--text__body-2', 'boing--text__body');
    moveInstrumentation(titleCell, titleP);
    titleP.textContent = titleCell.textContent.trim();
    contentWrapper.append(titleP);

    cardsDiv.append(contentWrapper);
    cardLink.append(cardsDiv);
    secondSection.append(cardLink);
  });

  articleListing.append(secondSection);
  wrapper.append(articleListing);

  block.textContent = '';
  block.append(wrapper);
}
