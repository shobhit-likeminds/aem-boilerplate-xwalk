import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const latestBlogsWrapper = document.createElement('div');
  latestBlogsWrapper.classList.add('latestblogs-wrapper');

  const latestBlogsListing = document.createElement('div');
  latestBlogsListing.classList.add('latestblogs-listing');
  latestBlogsWrapper.append(latestBlogsListing);

  // First section (title, description, view all button)
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-listing_section--first', 'latestblogs-text--white', 'latestblogs-text--center');
  latestBlogsListing.append(firstSection);

  const sectionTitle = document.createElement('h2');
  sectionTitle.classList.add('latestblogs-listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text--white', 'latestblogs-pb-3');
  // Assuming the first row contains the section title, description, and view all link
  const firstRow = block.children[0];
  if (firstRow) {
    const titleCell = firstRow.children[0];
    if (titleCell) {
      sectionTitle.textContent = titleCell.textContent.trim();
    }
    firstSection.append(sectionTitle);

    const sectionDesc = document.createElement('p');
    sectionDesc.classList.add('latestblogs-listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
    const descCell = firstRow.children[1];
    if (descCell) {
      sectionDesc.textContent = descCell.textContent.trim();
    }
    firstSection.append(sectionDesc);

    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-listing--btnWrapper');
    const viewAllLink = document.createElement('a');
    viewAllLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-listing--btn', 'latestblogs-analytics_cta_click');
    const linkCell = firstRow.children[2];
    if (linkCell) {
      const linkElement = linkCell.querySelector('a');
      if (linkElement) {
        viewAllLink.href = linkElement.href;
        viewAllLink.title = linkElement.textContent.trim();
        viewAllLink.textContent = linkElement.textContent.trim();
      }
    }
    btnWrapper.append(viewAllLink);
    firstSection.append(btnWrapper);
  }

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-listing_section--second', 'latestblogs-d-flex');
  latestBlogsListing.append(secondSection);

  // Loop through remaining rows for blog cards
  [...block.children].slice(1).forEach((row) => {
    const linkWrapper = document.createElement('a');
    moveInstrumentation(row, linkWrapper);
    linkWrapper.classList.add('latestblogs-listing--cardWrapper', 'latestblogs-analytics_cta_click');

    const cells = [...row.children];
    const linkCell = cells[0];
    const imageCell = cells[1];
    const dateCell = cells[2];
    const titleCell = cells[3];

    if (linkCell) {
      const linkElement = linkCell.querySelector('a');
      if (linkElement) {
        linkWrapper.href = linkElement.href;
        linkWrapper.setAttribute('data-cta-label', linkElement.textContent.trim());
      }
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-listing--cards');
    linkWrapper.append(cardDiv);

    if (imageCell) {
      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-listing--cardImageWrapper');
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('latestblogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        cardImageWrapper.append(optimizedPic);
      }
      cardDiv.append(cardImageWrapper);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-cards_content--wrapper');

    if (dateCell) {
      const dateP = document.createElement('p');
      dateP.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-published_date');
      dateP.textContent = dateCell.textContent.trim();
      const dateValue = dateCell.textContent.trim();
      if (dateValue) {
        // Assuming date is in a format like 'DD Month YYYY'
        // To get a data-date attribute, we might need to parse it or assume it's already in the cell
        // For now, we'll just use the text content.
        // If the date cell contains a specific data-date attribute, we would extract it here.
        // For example: const existingDateP = dateCell.querySelector('p[data-date]');
        // if (existingDateP) dateP.setAttribute('data-date', existingDateP.getAttribute('data-date'));
      }
      contentWrapper.append(dateP);
    }

    if (titleCell) {
      const titleP = document.createElement('p');
      titleP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
      titleP.textContent = titleCell.textContent.trim();
      contentWrapper.append(titleP);
    }

    cardDiv.append(contentWrapper);
    secondSection.append(linkWrapper);
  });

  block.textContent = '';
  block.append(latestBlogsWrapper);
}
