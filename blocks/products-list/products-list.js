import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const productsList = document.createElement('div');
  productsList.classList.add('products-list');

  [...block.children].forEach((row, index) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.setAttribute('data-position', index + 1);
    moveInstrumentation(row, productDiv);

    let titleText = '';
    let imageUrl = '';
    let imageAlt = '';
    let productLinkHref = '#'; // Default to # if no link is provided
    let productId = '';

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        const img = cell.querySelector('picture img');
        if (img) {
          imageUrl = img.src;
          imageAlt = img.alt;
        }
      } else if (cell.querySelector('a')) {
        const link = cell.querySelector('a');
        if (link) {
          productLinkHref = link.href;
        }
      } else if (cell.textContent.trim().length > 0) {
        // Check if it's a potential product ID (simple heuristic: numeric or starts with digits)
        // Or if it's the title (usually the first text cell without a link/image)
        if (!isNaN(cell.textContent.trim()) || /^\d/.test(cell.textContent.trim())) {
          productId = cell.textContent.trim();
        } else if (!titleText) { // Assign to title if not already set
          titleText = cell.textContent.trim();
        }
      }
    });

    const anchor = document.createElement('a');
    anchor.href = productLinkHref;
    anchor.classList.add('inner');
    anchor.onclick = () => false; // Replicate original HTML behavior

    const titleMbOff = document.createElement('div');
    titleMbOff.classList.add('title', 'mb-off');
    titleMbOff.textContent = titleText;
    anchor.append(titleMbOff);

    if (imageUrl) {
      const picture = createOptimizedPicture(imageUrl, imageAlt, false, [{ width: '400' }]);
      const img = picture.querySelector('img');
      if (img) {
        img.alt = imageAlt;
        moveInstrumentation(row.querySelector('picture'), img);
      }
      anchor.append(picture);
    }

    const productTitleSpan = document.createElement('span');
    productTitleSpan.classList.add('product-title');

    const titleMbOn = document.createElement('div');
    titleMbOn.classList.add('title', 'mb-on');
    titleMbOn.textContent = titleText;
    productTitleSpan.append(titleMbOn);

    const moreInfoBtn = document.createElement('span');
    moreInfoBtn.classList.add('btn', 'more-info-btn');
    moreInfoBtn.textContent = 'More Info';
    if (productId) {
      moreInfoBtn.setAttribute('data-product-id', productId);
    }
    moreInfoBtn.onclick = () => false; // Replicate original HTML behavior
    productTitleSpan.append(moreInfoBtn);

    anchor.append(productTitleSpan);
    productDiv.append(anchor);
    productsList.append(productDiv);
  });

  block.textContent = '';
  const productsListWrapper = document.createElement('div');
  productsListWrapper.classList.add('products-list-wrapper');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  containerDiv.append(productsList);

  productsListWrapper.append(containerDiv);
  block.append(productsListWrapper);
}
