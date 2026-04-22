import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, viewAllLabelRow, ...itemRows] = [...block.children];

  const productTabsContainer = document.createElement('div');
  productTabsContainer.classList.add('cmp-product-tabs', 'cmp-product-tabs--yippee-without-image');

  // Title
  const title = document.createElement('h2');
  title.classList.add('cmp-product-tabs__title');
  moveInstrumentation(titleRow, title);
  title.innerHTML = titleRow.firstElementChild.innerHTML;
  productTabsContainer.append(title);

  // Tabs
  const tabsWrapper = document.createElement('div');
  tabsWrapper.classList.add('cmp-product-tabs__tabs');
  const tabs = itemRows.filter((row) => row.children.length === 1); // Product-Tab has 1 cell
  const tabButtons = []; // Store buttons to add event listeners later
  tabs.forEach((row, index) => {
    const tabLabelCell = [...row.children].find(c => c.textContent.trim()); // Find the cell with text content
    if (!tabLabelCell) return; // Skip if no label cell found

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button', 'cmp-button--secondary', 'cmp-button--secondary-undefined');
    if (index === 0) {
      buttonWrapper.classList.add('active');
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('cmp-button');
    const span = document.createElement('span');
    span.classList.add('cmp-button__text');
    span.textContent = tabLabelCell.textContent.trim();
    moveInstrumentation(row, buttonWrapper);
    button.append(span);
    buttonWrapper.append(button);
    tabsWrapper.append(buttonWrapper);
    tabButtons.push(buttonWrapper); // Add button wrapper to array for event listeners
  });
  productTabsContainer.append(tabsWrapper);

  // Content (Carousel)
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('cmp-product-tabs__content');

  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('slickcarousel', 'carousel', 'panelcontainer');

  const cmpCarousel = document.createElement('div');
  cmpCarousel.classList.add('cmp-carousel');
  cmpCarousel.setAttribute('data-component', 'carousel');
  // Add data attributes based on ORIGINAL HTML, if they were present and relevant for JS behavior
  cmpCarousel.setAttribute('data-show-infinite-scroll', 'false');
  cmpCarousel.setAttribute('data-show-arrows', 'true');
  cmpCarousel.setAttribute('data-show-dots', 'true');
  cmpCarousel.setAttribute('data-item-count-per-slide', '3');
  cmpCarousel.setAttribute('data-auto-play-is-enabled', 'false');
  cmpCarousel.setAttribute('data-auto-play-speed-in-ms', '500');
  cmpCarousel.setAttribute('data-reveal-next-item-partially', 'false');
  cmpCarousel.setAttribute('data-show-center-zoom', 'false');
  cmpCarousel.setAttribute('data-slides-to-scroll', '3');

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('cmp-carousel__container'); // slick-initialized, slick-slider, slick-dotted will be added by slick.js

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');

  const carouselItems = itemRows.filter((row) => row.children.length === 2); // Product-Carousel-Item has 2 cells
  carouselItems.forEach((row, index) => {
    const [imageCell, linkCell] = [...row.children];

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('cmp-carousel__item', 'slick-slide');
    if (index === 0) {
      carouselItem.classList.add('slick-current', 'slick-active');
    }
    carouselItem.setAttribute('data-slick-index', index);
    carouselItem.setAttribute('aria-hidden', index !== 0);
    carouselItem.setAttribute('tabindex', index === 0 ? '0' : '-1');
    carouselItem.setAttribute('role', 'tabpanel');
    carouselItem.id = `slick-slide1${index}`;
    carouselItem.setAttribute('aria-describedby', `slick-slide-control1${Math.floor(index / 3)}`); // Assuming 3 items per slide

    const lazyImageContainer = document.createElement('div');
    lazyImageContainer.classList.add('lazy-image-container');
    const link = linkCell.querySelector('a');
    if (link) {
      lazyImageContainer.setAttribute('data-redirection-url', link.href);
    }

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        lazyImageContainer.append(optimizedPic);
        const optimizedImg = optimizedPic.querySelector('img');
        optimizedImg.classList.add('is-clickable', 'lazy-image', 'loaded');
        optimizedImg.setAttribute('loading', 'lazy');
        optimizedImg.setAttribute('fetchpriority', 'low');
        optimizedImg.style.opacity = '1';
        optimizedImg.style.transition = 'opacity 0.3s ease-in-out';
      }
    }
    moveInstrumentation(row, carouselItem); // Move instrumentation from the authored row to the carousel item
    carouselItem.append(lazyImageContainer);
    slickTrack.append(carouselItem);
  });

  slickList.append(slickTrack);
  carouselContainer.append(slickList);
  cmpCarousel.append(carouselContainer);
  carouselWrapper.append(cmpCarousel);
  contentWrapper.append(carouselWrapper);
  productTabsContainer.append(contentWrapper);

  // View All Button
  const viewAllButtonWrapper = document.createElement('div');
  viewAllButtonWrapper.classList.add('button', 'cmp-button--primary', 'cmp-button--primary-undefined', 'cmp-product-tabs__button-range');
  const viewAllButton = document.createElement('button');
  viewAllButton.type = 'button';
  viewAllButton.classList.add('cmp-button');
  const viewAllSpan = document.createElement('span');
  viewAllSpan.classList.add('cmp-button__text');
  viewAllSpan.textContent = viewAllLabelRow.firstElementChild.textContent.trim();
  moveInstrumentation(viewAllLabelRow, viewAllButtonWrapper);
  viewAllButton.append(viewAllSpan);
  viewAllButtonWrapper.append(viewAllButton);
  productTabsContainer.append(viewAllButtonWrapper);

  block.replaceChildren(productTabsContainer);

  // Add event listeners for tab switching
  tabButtons.forEach((buttonWrapper, index) => {
    buttonWrapper.addEventListener('click', () => {
      // Remove 'active' class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add 'active' class to the clicked button
      buttonWrapper.classList.add('active');

      // TODO: Implement logic to switch carousel content based on the active tab.
      // This would typically involve interacting with a carousel library (e.g., Slick Carousel)
      // to change the active slide or filter items.
      // For now, this just handles the visual active state of the tab button.
      console.log(`Tab ${index} clicked: ${buttonWrapper.querySelector('.cmp-button__text').textContent}`);
    });
  });
}
