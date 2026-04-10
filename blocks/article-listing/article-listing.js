import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const sectionWrapper = document.createElement('section');
  sectionWrapper.classList.add('article_listing--wrapper');

  const articleListing = document.createElement('div');
  articleListing.classList.add('article_listing', 'position-relative');
  sectionWrapper.append(articleListing);

  // First section: Title, Description, CTA
  const firstSection = document.createElement('div');
  firstSection.classList.add('article_listing_section--first', 'text-white', 'text-center');
  articleListing.append(firstSection);

  const [titleRow, descriptionRow, ctaLinkRow, ctaLinkLabelRow, ...articleRows] = children;

  // Title
  const title = document.createElement('h2');
  title.classList.add('article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
  moveInstrumentation(titleRow, title);
  title.append(titleRow.firstElementChild.textContent.trim());
  firstSection.append(title);

  // Description
  const description = document.createElement('p');
  description.classList.add('article_listing--desc', 'boing--text__body-2', 'pb-4');
  moveInstrumentation(descriptionRow, description);
  // Description is richtext, so append its children directly
  while (descriptionRow.firstElementChild.firstChild) {
    description.append(descriptionRow.firstElementChild.firstChild);
  }
  firstSection.append(description);

  // CTA Link and Label
  const ctaBtnWrapper = document.createElement('div');
  ctaBtnWrapper.classList.add('article_listing--btnWrapper');
  firstSection.append(ctaBtnWrapper);

  const ctaLinkAnchor = document.createElement('a');
  ctaLinkAnchor.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
  moveInstrumentation(ctaLinkRow, ctaLinkAnchor);

  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLinkAnchor.href = foundCtaLink.href;
    // The ctaLinkLabelRow contains the text directly, not nested in another element
    ctaLinkAnchor.title = ctaLinkLabelRow.textContent.trim();
    ctaLinkAnchor.textContent = ctaLinkLabelRow.textContent.trim();
  }
  ctaBtnWrapper.append(ctaLinkAnchor);

  // Second section: Article Cards
  const secondSection = document.createElement('div');
  secondSection.classList.add('article_listing_section--second', 'd-flex');
  articleListing.append(secondSection);

  articleRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection for cells, though destructuring works here due to fixed order
    const cardLinkCell = cells[0];
    const cardLinkLabelCell = cells[1];
    const imageCell = cells[2];
    const dateCell = cells[3];
    const cardTextCell = cells[4];

    const cardLinkAnchor = document.createElement('a');
    cardLinkAnchor.classList.add('article_listing--cardWrapper', 'analytics_cta_click');
    moveInstrumentation(row, cardLinkAnchor); // Move instrumentation from the row to the new anchor

    const foundCardLink = cardLinkCell.querySelector('a');
    if (foundCardLink) {
      cardLinkAnchor.href = foundCardLink.href;
      cardLinkAnchor.setAttribute('data-cta-label', cardLinkLabelCell.textContent.trim());
    }

    const articleCard = document.createElement('div');
    articleCard.classList.add('article_listing--cards');
    cardLinkAnchor.append(articleCard);

    // Image
    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('article_listing--cardImageWrapper');
    articleCard.append(cardImageWrapper);

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('article_listing--cardImage', 'w-100', 'h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);
      }
    }

    // Content Wrapper
    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('cards_content--wrapper');
    articleCard.append(cardsContentWrapper);

    // Date
    const dateP = document.createElement('p');
    dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
    moveInstrumentation(dateCell, dateP);
    dateP.textContent = dateCell.textContent.trim();
    cardsContentWrapper.append(dateP);

    // Card Text
    const cardTextP = document.createElement('p');
    cardTextP.classList.add('boing--text__body-2', 'boing--text__body');
    moveInstrumentation(cardTextCell, cardTextP);
    // CardText is richtext, so append its children directly
    while (cardTextCell.firstElementChild.firstChild) {
      cardTextP.append(cardTextCell.firstElementChild.firstChild);
    }
    cardsContentWrapper.append(cardTextP);

    secondSection.append(cardLinkAnchor);
  });

  block.textContent = '';
  block.append(sectionWrapper);
}
