import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('section');
  wrapper.classList.add('article_listing--wrapper');

  const articleListing = document.createElement('div');
  articleListing.classList.add('article_listing', 'position-relative');
  wrapper.append(articleListing);

  const [
    titleRow,
    descriptionRow,
    ctaLinkRow,
    ctaLinkLabelRow,
    ctaIconRow,
    ...articleCardRows
  ] = [...block.children];

  // Section First
  const sectionFirst = document.createElement('div');
  sectionFirst.classList.add('article_listing_section--first', 'text-white', 'text-center');
  articleListing.append(sectionFirst);

  // Title
  const title = document.createElement('h2');
  title.classList.add('article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.firstElementChild?.textContent.trim() || '';
  sectionFirst.append(title);

  // Description
  const description = document.createElement('p');
  description.classList.add('article_listing--desc', 'boing--text__body-2', 'pb-4');
  moveInstrumentation(descriptionRow, description);
  description.textContent = descriptionRow.firstElementChild?.textContent.trim() || '';
  sectionFirst.append(description);

  // CTA Button Wrapper
  const ctaBtnWrapper = document.createElement('div');
  ctaBtnWrapper.classList.add('article_listing--btnWrapper');
  sectionFirst.append(ctaBtnWrapper);

  // CTA Link
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaLink.href = foundCtaLink.href;
    ctaLink.title = ctaLinkLabelRow.firstElementChild?.textContent.trim() || foundCtaLink.textContent.trim();
    ctaLink.textContent = ctaLinkLabelRow.firstElementChild?.textContent.trim() || foundCtaLink.textContent.trim();
  }
  moveInstrumentation(ctaLinkRow, ctaLink);
  moveInstrumentation(ctaLinkLabelRow, ctaLink);
  ctaBtnWrapper.append(ctaLink);

  // CTA Icon
  const ctaIconPicture = ctaIconRow.querySelector('picture');
  if (ctaIconPicture) {
    const ctaIconImg = ctaIconPicture.querySelector('img');
    if (ctaIconImg) {
      const optimizedPic = createOptimizedPicture(ctaIconImg.src, ctaIconImg.alt, false, [{ width: '40' }]);
      moveInstrumentation(ctaIconImg, optimizedPic.querySelector('img'));
      ctaLink.append(optimizedPic);
    }
  }
  moveInstrumentation(ctaIconRow, ctaLink);

  // Section Second (Article Cards)
  const sectionSecond = document.createElement('div');
  sectionSecond.classList.add('article_listing_section--second', 'd-flex');
  articleListing.append(sectionSecond);

  articleCardRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection instead of index access for robustness
    const cardLinkCell = cells.find(cell => cell.querySelector('a'));
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const dateCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim().match(/\d{1,2}\s\w+\s\d{4}/)); // Basic date format detection
    const titleCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell !== dateCell);
    const cardLinkLabelCell = cells.find(cell => cell !== cardLinkCell && cell !== imageCell && cell !== dateCell && cell !== titleCell);


    const cardWrapper = document.createElement('a');
    cardWrapper.classList.add('article_listing--cardWrapper', 'analytics_cta_click');
    moveInstrumentation(row, cardWrapper);

    const foundCardLink = cardLinkCell?.querySelector('a');
    if (foundCardLink) {
      cardWrapper.href = foundCardLink.href;
      cardWrapper.setAttribute('data-cta-label', cardLinkLabelCell?.firstElementChild?.textContent.trim() || foundCardLink.textContent.trim());
    }

    const cards = document.createElement('div');
    cards.classList.add('article_listing--cards');
    cardWrapper.append(cards);

    // Card Image
    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('article_listing--cardImageWrapper');
    cards.append(cardImageWrapper);

    const picture = imageCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('article_listing--cardImage', 'w-100', 'h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);
      }
    }

    // Cards Content
    const cardsContentWrapper = document.createElement('div');
    cardsContentWrapper.classList.add('cards_content--wrapper');
    cards.append(cardsContentWrapper);

    // Date
    const date = document.createElement('p');
    date.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
    moveInstrumentation(dateCell, date);
    date.textContent = dateCell?.firstElementChild?.textContent.trim() || '';
    // Add data-date attribute if needed, parse from dateCell.firstElementChild?.textContent
    // For now, just setting textContent as per original HTML format
    cardsContentWrapper.append(date);

    // Title
    const cardTitle = document.createElement('p');
    cardTitle.classList.add('boing--text__body-2', 'boing--text__body');
    moveInstrumentation(titleCell, cardTitle);
    cardTitle.textContent = titleCell?.firstElementChild?.textContent.trim() || '';
    cardsContentWrapper.append(cardTitle);

    sectionSecond.append(cardWrapper);
  });

  block.textContent = '';
  block.append(wrapper);
}
