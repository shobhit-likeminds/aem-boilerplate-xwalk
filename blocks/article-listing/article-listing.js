import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    descriptionRow,
    viewAllLinkRow,
    viewAllLinkLabelRow,
    ...articleRows
  ] = [...block.children];

  block.textContent = '';

  const sectionWrapper = document.createElement('section');
  sectionWrapper.classList.add('article_listing--wrapper');

  const articleListing = document.createElement('div');
  articleListing.classList.add('article_listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('article_listing_section--first', 'text-white', 'text-center');

  // Title
  const title = document.createElement('h2');
  title.classList.add('article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.firstElementChild.textContent.trim();
  firstSection.append(title);

  // Description
  const description = document.createElement('p');
  description.classList.add('article_listing--desc', 'boing--text__body-2', 'pb-4');
  moveInstrumentation(descriptionRow, description);
  description.textContent = descriptionRow.firstElementChild.textContent.trim();
  firstSection.append(description);

  // View All Link
  const viewAllBtnWrapper = document.createElement('div');
  viewAllBtnWrapper.classList.add('article_listing--btnWrapper');

  const viewAllAnchor = document.createElement('a');
  viewAllAnchor.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
  const viewAllLink = viewAllLinkRow.querySelector('a');
  if (viewAllLink) {
    viewAllAnchor.href = viewAllLink.href;
    viewAllAnchor.title = viewAllLinkLabelRow.firstElementChild.textContent.trim();
  }
  viewAllAnchor.textContent = viewAllLinkLabelRow.firstElementChild.textContent.trim();
  moveInstrumentation(viewAllLinkRow, viewAllAnchor);
  moveInstrumentation(viewAllLinkLabelRow, viewAllAnchor);

  // Append SVG icon if available in the original link cell
  const originalLinkContent = viewAllLinkRow.firstElementChild;
  const originalLinkImg = originalLinkContent ? originalLinkContent.querySelector('img') : null;
  if (originalLinkImg) {
    const img = document.createElement('img');
    img.alt = originalLinkImg.alt;
    img.src = originalLinkImg.src;
    viewAllAnchor.append(img);
  }

  viewAllBtnWrapper.append(viewAllAnchor);
  firstSection.append(viewAllBtnWrapper);
  articleListing.append(firstSection);

  // Articles
  const secondSection = document.createElement('div');
  secondSection.classList.add('article_listing_section--second', 'd-flex');

  articleRows.forEach((row) => {
    const cells = [...row.children];
    // Content detection for article card cells
    const cardLinkCell = cells.find(cell => cell.querySelector('a'));
    const cardLinkLabelCell = cells.find(cell => !cell.querySelector('a') && cell.textContent.trim() !== '' && cells.indexOf(cell) === 1); // Assuming label is the second cell without a direct link
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const dateCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cells.indexOf(cell) === cells.length - 2); // Assuming date is second to last
    const textCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cells.indexOf(cell) === cells.length - 1); // Assuming text is last

    const cardLink = document.createElement('a');
    cardLink.classList.add('article_listing--cardWrapper', 'analytics_cta_click');
    moveInstrumentation(row, cardLink);

    const originalCardLink = cardLinkCell ? cardLinkCell.querySelector('a') : null;
    if (originalCardLink) {
      cardLink.href = originalCardLink.href;
      cardLink.setAttribute('data-cta-label', cardLinkLabelCell ? cardLinkLabelCell.textContent.trim() : '');
    }

    const articleCard = document.createElement('div');
    articleCard.classList.add('article_listing--cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('article_listing--cardImageWrapper');

    const picture = imageCell ? imageCell.querySelector('picture') : null;
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.classList.add('article_listing--cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(optimizedPic);
      }
    }
    articleCard.append(cardImageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('cards_content--wrapper');

    const date = document.createElement('p');
    date.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
    moveInstrumentation(dateCell, date);
    if (dateCell) {
      date.textContent = dateCell.textContent.trim();
      // Extract data-date attribute from the original HTML if available
      const originalDateP = dateCell.querySelector('p[data-date]');
      if (originalDateP) {
        date.setAttribute('data-date', originalDateP.getAttribute('data-date'));
      }
    }
    contentWrapper.append(date);

    const text = document.createElement('p');
    text.classList.add('boing--text__body-2', 'boing--text__body');
    moveInstrumentation(textCell, text);
    if (textCell) {
      text.textContent = textCell.textContent.trim();
    }
    contentWrapper.append(text);

    articleCard.append(contentWrapper);
    cardLink.append(articleCard);
    secondSection.append(cardLink);
  });

  articleListing.append(secondSection);
  sectionWrapper.append(articleListing);
  block.append(sectionWrapper);
}
