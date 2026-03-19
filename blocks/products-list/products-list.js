import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('productslist-products');

  const productsListWrapper = document.createElement('div');
  productsListWrapper.classList.add('productslist-products-list-wrapper');

  const productsListContainer = document.createElement('div');
  productsListContainer.classList.add('productslist-container');

  const productsList = document.createElement('div');
  productsList.classList.add('productslist-products-list');

  [...block.children].forEach((row, index) => {
    // Each row represents a "Product" item
    const productDiv = document.createElement('div');
    productDiv.classList.add('productslist-product');
    productDiv.setAttribute('data-position', index + 1);
    moveInstrumentation(row, productDiv);

    const anchor = document.createElement('a');
    anchor.href = '#'; // Original HTML had href="#"
    anchor.classList.add('productslist-inner');
    anchor.addEventListener('click', (e) => e.preventDefault()); // Prevent default link behavior

    let titleEl;
    let imageEl;
    let productId;

    [...row.children].forEach((cell) => {
      // title (richtext)
      if (cell.children.length === 1 && cell.querySelector('h1, h2, h3, h4, h5, h6, p')) {
        titleEl = cell.querySelector('h1, h2, h3, h4, h5, h6, p');
      }
      // image (reference)
      else if (cell.querySelector('picture')) {
        imageEl = cell.querySelector('picture');
      }
      // productId (text)
      else if (cell.textContent.trim()) {
        productId = cell.textContent.trim();
      }
    });

    if (titleEl) {
      const titleOff = document.createElement('div');
      titleOff.classList.add('productslist-title', 'productslist-mb-off');
      moveInstrumentation(titleEl, titleOff);
      titleOff.append(titleEl.textContent);
      anchor.append(titleOff);
    }

    if (imageEl) {
      const img = imageEl.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '400' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      anchor.append(optimizedPic);
    }

    const productTitleSpan = document.createElement('span');
    productTitleSpan.classList.add('productslist-product-title');

    if (titleEl) {
      const titleOn = document.createElement('div');
      titleOn.classList.add('productslist-title', 'productslist-mb-on');
      titleOn.textContent = titleEl.textContent;
      productTitleSpan.append(titleOn);
    }

    const moreInfoBtn = document.createElement('span');
    moreInfoBtn.classList.add('productslist-btn', 'productslist-more-info-btn');
    moreInfoBtn.textContent = 'More Info';
    if (productId) {
      moreInfoBtn.setAttribute('data-product-id', productId);
    }
    moreInfoBtn.addEventListener('click', (e) => e.preventDefault()); // Prevent default button behavior
    productTitleSpan.append(moreInfoBtn);

    anchor.append(productTitleSpan);
    productDiv.append(anchor);
    productsList.append(productDiv);
  });

  productsListContainer.append(productsList);
  productsListWrapper.append(productsListContainer);
  block.textContent = '';
  block.append(productsListWrapper);
}
