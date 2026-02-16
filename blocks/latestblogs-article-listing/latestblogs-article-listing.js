import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('latestblogs-article_listing--wrapper');

  const mainDiv = document.createElement('div');
  mainDiv.classList.add('latestblogs-article_listing', 'position-relative');
  moveInstrumentation(block.firstElementChild, mainDiv);

  // First section (title, description, button)
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-article_listing_section--first', 'text-white', 'text-center');
  moveInstrumentation(block.firstElementChild.firstElementChild, firstSection);

  const title = document.createElement('h2');
  title.classList.add('latestblogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'text-white', 'pb-3');
  title.textContent = block.children[0].children[0].textContent.trim();
  firstSection.append(title);

  const description = document.createElement('p');
  description.classList.add('latestblogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'pb-4');
  description.textContent = block.children[0].children[1].textContent.trim();
  firstSection.append(description);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-article_listing--btnWrapper');

  const viewAllLink = document.createElement('a');
  viewAllLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-article_listing--btn', 'analytics_cta_click');
  const linkCell = block.children[0].children[2].querySelector('a');
  if (linkCell) {
    viewAllLink.href = linkCell.href;
    viewAllLink.title = linkCell.title;
    viewAllLink.textContent = linkCell.textContent.trim();
  }
  btnWrapper.append(viewAllLink);
  firstSection.append(btnWrapper);
  mainDiv.append(firstSection);

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-article_listing_section--second', 'd-flex');
  moveInstrumentation(block.children[1], secondSection);

  [...block.children].slice(1).forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = link.href;
      cardWrapper.classList.add('latestblogs-article_listing--cardWrapper', 'analytics_cta_click');
      if (link.dataset.ctaLabel) {
        cardWrapper.dataset.ctaLabel = link.dataset.ctaLabel;
      }
      moveInstrumentation(row, cardWrapper);

      const card = document.createElement('div');
      card.classList.add('latestblogs-article_listing--cards');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('latestblogs-article_listing--cardImageWrapper');

      const img = row.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('latestblogs-article_listing--cardImage', 'w-100', 'h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrapper.append(optimizedPic);
      }
      card.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-cards_content--wrapper');

      const dateP = document.createElement('p');
      dateP.classList.add('latestblogs-boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestblogs-published_date');
      const dateElement = row.querySelector('[data-date]');
      if (dateElement) {
        dateP.dataset.date = dateElement.dataset.date;
        dateP.textContent = dateElement.textContent.trim();
      }
      contentWrapper.append(dateP);

      const titleP = document.createElement('p');
      titleP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
      const titleElement = row.querySelector('p:not([data-date])');
      if (titleElement) {
        titleP.textContent = titleElement.textContent.trim();
      }
      contentWrapper.append(titleP);

      card.append(contentWrapper);
      cardWrapper.append(card);
      secondSection.append(cardWrapper);
    }
  });

  mainDiv.append(secondSection);
  wrapper.append(mainDiv);

  block.textContent = '';
  block.append(wrapper);
}
