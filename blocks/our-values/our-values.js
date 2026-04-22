import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [
    titleRow,
    descriptionRow,
    ctaLinkRow,
    ctaLabelRow,
    ...itemRows
  ] = children;

  block.classList.add('cmp-our-values', 'cmp-our-values--better-world');

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('cmp-our-values__title-wrapper');
  const title = document.createElement('h1');
  title.classList.add('cmp-our-values__title', 'star-icon');
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.textContent.trim();
  titleWrapper.append(title);

  const itemContainer = document.createElement('div');
  itemContainer.classList.add('cmp-our-values__item-container');

  itemRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection instead of brittle index access
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const itemTitleCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim() !== '' && !cell.querySelector('a'));
    const itemDescriptionCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim() !== '' && cell !== itemTitleCell && !cell.querySelector('a'));

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('cmp-our-values__details-container');
    moveInstrumentation(row, detailsContainer);

    const itemImageContainer = document.createElement('div');
    itemImageContainer.classList.add('cmp-our-values__item-image-container');
    const lazyImageContainer = document.createElement('div');
    lazyImageContainer.classList.add('lazy-image-container');

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          lazyImageContainer.append(optimizedPic);
          optimizedPic.querySelector('img').classList.add('cmp-our-values__item-image', 'lazy-image', 'loaded');
        }
      }
    }
    itemImageContainer.append(lazyImageContainer);

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('cmp-our-values__item-content-wrapper');

    if (itemTitleCell) {
      const itemTitle = document.createElement('div');
      itemTitle.classList.add('cmp-our-values__item-title');
      moveInstrumentation(itemTitleCell, itemTitle);
      itemTitle.textContent = itemTitleCell.textContent.trim();
      itemContentWrapper.append(itemTitle);
    }

    if (itemDescriptionCell) {
      const itemDescription = document.createElement('div');
      itemDescription.classList.add('cmp-our-values__item-title--description');
      moveInstrumentation(itemDescriptionCell, itemDescription);
      itemDescription.textContent = itemDescriptionCell.textContent.trim();
      itemContentWrapper.append(itemDescription);
    }

    detailsContainer.append(itemImageContainer, itemContentWrapper);
    itemContainer.append(detailsContainer);
  });

  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('cmp-our-values__description-container');
  const description = document.createElement('div');
  description.classList.add('cmp-our-values__description');
  moveInstrumentation(descriptionRow, description);
  description.innerHTML = descriptionRow.innerHTML;
  descriptionContainer.append(description);

  const ctaButtonWrapper = document.createElement('div');
  ctaButtonWrapper.classList.add('button', 'cmp-button--primary-anchor', 'cmp-button--primary-anchor-undefined');
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('cmp-button');
  moveInstrumentation(ctaLinkRow, ctaLink);
  const foundLink = ctaLinkRow.querySelector('a');
  if (foundLink) {
    ctaLink.href = foundLink.href;
  }
  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('cmp-button__text');
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  ctaLink.append(ctaLabelSpan);
  ctaButtonWrapper.append(ctaLink);

  block.replaceChildren(
    titleWrapper,
    itemContainer,
    descriptionContainer,
    ctaButtonWrapper,
  );
}
