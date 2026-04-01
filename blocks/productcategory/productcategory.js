import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, subtitleRow, ...categoryListRows] = [...block.children];

  const productCategoryListing = document.createElement('div');
  productCategoryListing.classList.add('cmp-product-category-listing');

  const header = document.createElement('div');
  header.classList.add('cmp-product-category-listing__header');

  const title = document.createElement('h1');
  title.classList.add('cmp-product-category-listing__title');
  moveInstrumentation(titleRow, title);
  while (titleRow.firstChild) title.append(titleRow.firstChild);
  header.append(title);

  const subtitle = document.createElement('div');
  subtitle.classList.add('cmp-product-category-listing__subTitle', 'desc-2');
  moveInstrumentation(subtitleRow, subtitle);
  while (subtitleRow.firstChild) subtitle.append(subtitleRow.firstChild);
  header.append(subtitle);

  productCategoryListing.append(header);

  const content = document.createElement('div');
  content.classList.add('cmp-product-category-listing__content');

  categoryListRows.forEach((row) => {
    const categoryItemWrapper = document.createElement('div');
    categoryItemWrapper.classList.add('cmp-categorylist', 'cmp-categorylist--anchor');
    moveInstrumentation(row, categoryItemWrapper);

    let linkEl;
    let imageEl;
    let nameEl;

    [...row.children].forEach((cell) => {
      if (cell.querySelector('a')) {
        linkEl = cell.querySelector('a');
      } else if (cell.querySelector('picture')) {
        imageEl = cell.querySelector('picture');
      } else {
        nameEl = cell;
      }
    });

    const anchor = document.createElement('a');
    anchor.classList.add('cmp-categorylist__item');
    if (linkEl) {
      anchor.href = linkEl.href;
      anchor.title = linkEl.textContent.trim();
    }
    moveInstrumentation(row, anchor);

    const imageWrapper = document.createElement('span');
    imageWrapper.classList.add('cmp-categorylist__imagewrapper');
    const lazyImageContainer = document.createElement('div');
    lazyImageContainer.classList.add('lazy-image-container');

    if (imageEl) {
      const img = imageEl.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        lazyImageContainer.append(optimizedPic);
      }
    }
    imageWrapper.append(lazyImageContainer);
    anchor.append(imageWrapper);

    const nameSpan = document.createElement('span');
    nameSpan.classList.add('cmp-categorylist__name');
    if (nameEl) {
      nameSpan.textContent = nameEl.textContent.trim();
      nameSpan.setAttribute('data-title', nameEl.textContent.trim());
    }
    anchor.append(nameSpan);

    categoryItemWrapper.append(anchor);
    content.append(categoryItemWrapper);
  });

  productCategoryListing.append(content);

  block.textContent = '';
  block.append(productCategoryListing);
}
