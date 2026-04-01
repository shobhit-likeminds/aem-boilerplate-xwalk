import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, subtitleRow, ...itemRows] = [...block.children];

  const cmpPopularProducts = document.createElement('div');
  cmpPopularProducts.classList.add('cmp-popular-products');
  moveInstrumentation(block, cmpPopularProducts);

  const headerSection = document.createElement('div');
  headerSection.classList.add('cmp-popular-products__header-section');

  const title = document.createElement('h2');
  title.classList.add('cmp-popular-products__title');
  moveInstrumentation(titleRow.firstElementChild, title);
  title.innerHTML = titleRow.firstElementChild.innerHTML;
  headerSection.append(title);

  const subtitle = document.createElement('div');
  subtitle.classList.add('cmp-popular-products__subtitle');
  moveInstrumentation(subtitleRow.firstElementChild, subtitle);
  subtitle.innerHTML = subtitleRow.firstElementChild.innerHTML;
  headerSection.append(subtitle);

  cmpPopularProducts.append(headerSection);

  const carouselSection = document.createElement('div');
  carouselSection.classList.add('cmp-popular-products__carousel');

  const cmpCarousel = document.createElement('div');
  cmpCarousel.classList.add('cmp-carousel');
  // Data attributes from original HTML
  cmpCarousel.setAttribute('data-component', 'carousel');
  cmpCarousel.setAttribute('data-show-infinite-scroll', 'false');
  cmpCarousel.setAttribute('data-show-arrows', 'true');
  cmpCarousel.setAttribute('data-show-dots', 'true');
  cmpCarousel.setAttribute('data-item-count-per-slide', '1');
  cmpCarousel.setAttribute('data-auto-play-is-enabled', 'true');
  cmpCarousel.setAttribute('data-auto-play-speed-in-ms', '3000');
  cmpCarousel.setAttribute('data-reveal-next-item-partially', 'false');
  cmpCarousel.setAttribute('data-show-center-zoom', 'false');
  cmpCarousel.setAttribute('data-slides-to-scroll', '1');
  cmpCarousel.setAttribute('data-initialized', 'true');

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('cmp-carousel__container', 'slick-initialized', 'slick-slider', 'slick-dotted');

  const prevButton = document.createElement('button');
  prevButton.classList.add('slick-prev', 'slick-arrow', 'slick-disabled');
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('aria-disabled', 'true');
  prevButton.textContent = 'Previous';

  const nextButton = document.createElement('button');
  nextButton.classList.add('slick-next', 'slick-arrow');
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('aria-disabled', 'false');
  nextButton.textContent = 'Next';

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.style.opacity = '1';

  const slickDots = document.createElement('ul');
  slickDots.classList.add('slick-dots');
  slickDots.setAttribute('role', 'tablist');

  itemRows.forEach((row, index) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('cmp-popular-products__carousel-item', 'cmp-carousel__item', 'slick-slide');
    item.setAttribute('data-slick-index', index);
    item.setAttribute('id', `slick-slide2${index}`);
    item.setAttribute('role', 'tabpanel');
    item.setAttribute('aria-describedby', `slick-slide-control2${index}`);
    if (index === 0) {
      item.classList.add('slick-current', 'slick-active');
      item.setAttribute('aria-hidden', 'false');
      item.setAttribute('tabindex', '0');
    } else {
      item.setAttribute('aria-hidden', 'true');
      item.setAttribute('tabindex', '-1');
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('cmp-popular-products__content-wrapper');

    const cells = [...row.children];
    const imageCell = cells.find((cell) => cell.querySelector('picture'));
    const linkCell = cells.find((cell) => cell.querySelector('a'));
    const productDetailsCell = cells.find((cell) => cell.querySelector('p'));
    // Find product name and button text by ensuring they don't contain other specific elements
    const productNameCell = cells.find((cell) => !cell.querySelector('picture') && !cell.querySelector('a') && !cell.querySelector('p') && cell.textContent.trim() !== (cells[4]?.textContent.trim() || ''));
    const buttonTextCell = cells.find((cell) => !cell.querySelector('picture') && !cell.querySelector('a') && !cell.querySelector('p') && cell.textContent.trim() !== (cells[2]?.textContent.trim() || ''));


    const imageDiv = document.createElement('div');
    imageDiv.classList.add('cmp-popular-products__image');
    imageDiv.style.backgroundImage = 'url("/etc.clientlibs/itc-foods-brands/clientlibs/clientlib-aashirvaad/resources/images/product-background.svg")';

    const productLink = document.createElement('a');
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        productLink.href = foundLink.href;
        productLink.setAttribute('tabindex', index === 0 ? '0' : '-1');
      }
    }
    moveInstrumentation(linkCell, productLink);

    const lazyImageContainer = document.createElement('div');
    lazyImageContainer.classList.add('lazy-image-container');

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('cmp-popular-products__prod-image', 'lazy-image', 'loaded');
          lazyImageContainer.append(optimizedPic);
        }
      }
    }
    productLink.append(lazyImageContainer);
    imageDiv.append(productLink);
    contentWrapper.append(imageDiv);

    const productDescription = document.createElement('div');
    productDescription.classList.add('cmp-popular-products__product-description');

    const productNameDiv = document.createElement('div');
    productNameDiv.classList.add('cmp-popular-products__product-name');
    if (productNameCell) {
      moveInstrumentation(productNameCell, productNameDiv);
      productNameDiv.innerHTML = productNameCell.innerHTML;
      productNameDiv.setAttribute('data-title', productNameCell.textContent.trim());
    }
    const mobileWeightSpan = document.createElement('span');
    mobileWeightSpan.classList.add('cmp-popular-products__mobile-weight');
    productNameDiv.append(mobileWeightSpan);
    productDescription.append(productNameDiv);

    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('cmp-popular-products__quantity-container');
    productDescription.append(quantityContainer);

    const productDetailsDiv = document.createElement('div');
    productDetailsDiv.classList.add('cmp-popular-products__product-details');
    if (productDetailsCell) {
      moveInstrumentation(productDetailsCell, productDetailsDiv);
      productDetailsDiv.innerHTML = productDetailsCell.innerHTML;
    }
    productDescription.append(productDetailsDiv);

    const actionDiv = document.createElement('div');
    actionDiv.classList.add('cmp-popular-products__action');

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button', 'cmp-button--secondary', 'cmp-button--secondary-light');

    const button = document.createElement('button');
    button.classList.add('cmp-button');
    button.setAttribute('type', 'button');
    button.setAttribute('tabindex', index === 0 ? '0' : '-1');

    const buttonTextSpan = document.createElement('span');
    buttonTextSpan.classList.add('cmp-button__text');
    if (buttonTextCell) {
      moveInstrumentation(buttonTextCell, buttonTextSpan);
      buttonTextSpan.textContent = buttonTextCell.textContent.trim();
    }
    button.append(buttonTextSpan);
    buttonWrapper.append(button);
    actionDiv.append(buttonWrapper);
    productDescription.append(actionDiv);

    contentWrapper.append(productDescription);
    item.append(contentWrapper);
    slickTrack.append(item);

    const dotLi = document.createElement('li');
    dotLi.setAttribute('role', 'presentation');
    if (index === 0) {
      dotLi.classList.add('slick-active');
    }
    const dotButton = document.createElement('button');
    dotButton.setAttribute('type', 'button');
    dotButton.setAttribute('role', 'tab');
    dotButton.setAttribute('id', `slick-slide-control2${index}`);
    dotButton.setAttribute('aria-controls', `slick-slide2${index}`);
    dotButton.setAttribute('aria-label', `${index + 1} of ${itemRows.length}`);
    dotButton.setAttribute('tabindex', index === 0 ? '0' : '-1');
    if (index === 0) {
      dotButton.setAttribute('aria-selected', 'true');
    }
    dotButton.textContent = index + 1;
    dotLi.append(dotButton);
    slickDots.append(dotLi);
  });

  slickList.append(slickTrack);
  carouselContainer.append(prevButton, slickList, nextButton, slickDots);
  cmpCarousel.append(carouselContainer);
  carouselSection.append(cmpCarousel);
  cmpPopularProducts.append(carouselSection);

  block.textContent = '';
  block.append(cmpPopularProducts);

  // Carousel functionality (simplified for example, full slick.js not implemented)
  const carouselItems = [...slickTrack.children];
  let currentIndex = 0;

  function updateCarousel() {
    carouselItems.forEach((item, i) => {
      if (i === currentIndex) {
        item.classList.add('slick-current', 'slick-active');
        item.setAttribute('aria-hidden', 'false');
        item.setAttribute('tabindex', '0');
        item.querySelectorAll('a, button').forEach((el) => el.setAttribute('tabindex', '0'));
      } else {
        item.classList.remove('slick-current', 'slick-active');
        item.setAttribute('aria-hidden', 'true');
        item.setAttribute('tabindex', '-1');
        item.querySelectorAll('a, button').forEach((el) => el.setAttribute('tabindex', '-1'));
      }
    });

    [...slickDots.children].forEach((dotLi, i) => {
      const dotButton = dotLi.querySelector('button');
      if (i === currentIndex) {
        dotLi.classList.add('slick-active');
        dotButton.setAttribute('aria-selected', 'true');
        dotButton.setAttribute('tabindex', '0');
      } else {
        dotLi.classList.remove('slick-active');
        dotButton.setAttribute('aria-selected', 'false');
        dotButton.setAttribute('tabindex', '-1');
      }
    });

    if (currentIndex === 0) {
      prevButton.classList.add('slick-disabled');
      prevButton.setAttribute('aria-disabled', 'true');
    } else {
      prevButton.classList.remove('slick-disabled');
      prevButton.setAttribute('aria-disabled', 'false');
    }

    if (currentIndex === carouselItems.length - 1) {
      nextButton.classList.add('slick-disabled');
      nextButton.setAttribute('aria-disabled', 'true');
    } else {
      nextButton.classList.remove('slick-disabled');
      nextButton.setAttribute('aria-disabled', 'false');
    }

    slickTrack.style.transform = `translate3d(-${currentIndex * 100}%, 0px, 0px)`;
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < carouselItems.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  slickDots.querySelectorAll('button').forEach((dotButton, i) => {
    dotButton.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
  });

  updateCarousel(); // Initialize carousel state
}
