import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('card-list-cmp-card-list', 'parallax-child');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('card-list-cmp-card-list__content');

  // BlockJson defines 3 root fields: heading, cta, cards (container).
  // The 'cards' field is a container, its children are the actual card items.
  // So, we expect 3 root rows from block.children before the actual card item rows begin.
  const [headingRow, ctaRow, cardsContainer, ...cardRows] = [...block.children];

  // Top content (heading and CTA)
  const slideWrap = document.createElement('div');
  slideWrap.classList.add('slide-wrap');

  const topContent = document.createElement('div');
  topContent.classList.add('card-list-cmp-card-list__content__top', 'slide-up');
  topContent.setAttribute('data-slide-type', 'slide-up');

  // Heading
  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('card-list-cmp-card-list__content__heading', 'is-visible');
  const headingTitle = document.createElement('div');
  headingTitle.id = 'card-list-heading';
  headingTitle.classList.add('card-list-cmp-card-list__content__heading__title');
  headingTitle.setAttribute('tabindex', '0');
  moveInstrumentation(headingRow.firstElementChild, headingTitle);
  while (headingRow.firstElementChild.firstChild) {
    headingTitle.append(headingRow.firstElementChild.firstChild);
  }
  headingWrapper.append(headingTitle);
  topContent.append(headingWrapper);

  // CTA
  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('card-list-cmp-card-list__content__cta-wrapper', 'is-visible');
  const ctaLink = ctaRow.querySelector('a');
  if (ctaLink) {
    const newCtaLink = document.createElement('a');
    newCtaLink.href = ctaLink.href;
    newCtaLink.classList.add('cta', 'cta__primary');
    newCtaLink.target = '_self';
    newCtaLink.setAttribute('aria-label', ctaLink.textContent.trim());
    newCtaLink.setAttribute('data-palette', 'palette-1');

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    newCtaLink.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('cta__label');
    moveInstrumentation(ctaLink, ctaLabel);
    while (ctaLink.firstChild) {
      ctaLabel.append(ctaLink.firstChild);
    }
    newCtaLink.append(ctaLabel);
    ctaWrapper.append(newCtaLink);
  }
  topContent.append(ctaWrapper);
  slideWrap.append(topContent);
  contentDiv.append(slideWrap);

  // Cards
  const itemsContainer = document.createElement('div');
  itemsContainer.classList.add('card-list-cmp-card-list__content__items');

  // The actual card item rows are now correctly captured in cardRows
  cardRows.forEach((row, index) => {
    const cardItem = document.createElement('div');
    moveInstrumentation(row, cardItem);
    cardItem.classList.add('card-list-cmp-card-list__content__card-item', 'is-visible', 'slide-up');
    cardItem.setAttribute('data-animation', 'card');
    cardItem.setAttribute('data-slide-type', 'slide-up');
    cardItem.setAttribute('data-slide-no-wrap', '');
    cardItem.setAttribute('data-slide-delay', `${index * 100}`.padStart(3, '0'));
    cardItem.style.transitionDelay = `${index * 0.2}s`;

    // Each card item has 3 fields: image, title, description
    const [imageCell, titleCell, descriptionCell] = [...row.children];

    // Image
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('card-list-cmp-card-list__content__card-item__image');
      cardItem.append(optimizedPic);
    }

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-list-cmp-card-list__content__card-item-content');

    // Title
    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('card-list-cmp-card-list__content__card-item-content__heading-wrapper');
    titleWrapper.setAttribute('tabindex', '0');
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('card-list-cmp-card-list__content__card-item-content__title');
    titleDiv.setAttribute('aria-hidden', 'false');
    moveInstrumentation(titleCell, titleDiv);
    while (titleCell.firstChild) {
      titleDiv.append(titleCell.firstChild);
    }
    titleWrapper.append(titleDiv);
    cardContent.append(titleWrapper);

    // Description
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('card-list-cmp-card-list__content__card-item-content__description');
    descriptionDiv.setAttribute('tabindex', '0');
    descriptionDiv.setAttribute('aria-hidden', 'false');
    const descriptionP = descriptionCell.querySelector('p');
    if (descriptionP) {
      descriptionDiv.setAttribute('aria-label', descriptionP.outerHTML);
    }
    moveInstrumentation(descriptionCell, descriptionDiv);
    while (descriptionCell.firstChild) {
      descriptionDiv.append(descriptionCell.firstChild);
    }
    cardContent.append(descriptionDiv);

    cardItem.append(cardContent);
    itemsContainer.append(cardItem);
  });

  contentDiv.append(itemsContainer);

  block.textContent = '';
  block.append(contentDiv);
}
