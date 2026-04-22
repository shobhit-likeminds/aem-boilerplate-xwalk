import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, viewAllLabelRow, ...itemRows] = [...block.children];

  const productTabsContainer = document.createElement('div');
  productTabsContainer.classList.add('cmp-product-tabs', 'cmp-product-tabs--yippee-without-image');
  moveInstrumentation(block, productTabsContainer);

  // Title
  const titleEl = document.createElement('h2');
  titleEl.classList.add('cmp-product-tabs__title');
  moveInstrumentation(titleRow, titleEl);
  titleEl.innerHTML = titleRow.firstElementChild?.innerHTML || '';
  productTabsContainer.append(titleEl);

  // Tabs and Carousel Items
  const tabLabels = [];
  const carouselItems = [];

  itemRows.forEach((row) => {
    // Detect item type based on cell count and content
    const cells = [...row.children];
    const firstCell = cells[0];

    if (cells.length === 1 && firstCell && !firstCell.querySelector('picture')) {
      // Product Tab item: single cell, no picture
      tabLabels.push(row);
    } else if (cells.length === 2 && firstCell && firstCell.querySelector('picture')) {
      // Product Carousel Item: two cells, first has a picture
      carouselItems.push(row);
    }
  });

  // Tabs section
  const tabsSection = document.createElement('div');
  tabsSection.classList.add('cmp-product-tabs__tabs');

  tabLabels.forEach((tabRow, index) => {
    const [labelCell] = [...tabRow.children];
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
    span.textContent = labelCell.textContent.trim();

    moveInstrumentation(tabRow, buttonWrapper);
    button.append(span);
    buttonWrapper.append(button);
    tabsSection.append(buttonWrapper);

    // Add event listener for tab switching
    button.addEventListener('click', () => {
      tabsSection.querySelectorAll('.button').forEach((btn) => btn.classList.remove('active'));
      buttonWrapper.classList.add('active');
      // TODO: Implement actual tab content switching logic here if there are different carousel sets per tab
      // For now, assuming a single carousel for all tabs.
    });
  });
  productTabsContainer.append(tabsSection);

  // Content section
  const contentSection = document.createElement('div');
  contentSection.classList.add('cmp-product-tabs__content');

  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('slickcarousel', 'carousel', 'panelcontainer');

  const carouselEl = document.createElement('div');
  carouselEl.classList.add('cmp-carousel');
  carouselEl.setAttribute('data-component', 'carousel');
  carouselEl.setAttribute('data-show-infinite-scroll', 'false');
  carouselEl.setAttribute('data-show-arrows', 'true');
  carouselEl.setAttribute('data-show-dots', 'true');
  carouselEl.setAttribute('data-item-count-per-slide', '3');
  carouselEl.setAttribute('data-auto-play-is-enabled', 'false');
  carouselEl.setAttribute('data-auto-play-speed-in-ms', '500');
  carouselEl.setAttribute('data-reveal-next-item-partially', 'false');
  carouselEl.setAttribute('data-show-center-zoom', 'false');
  carouselEl.setAttribute('data-slides-to-scroll', '3');
  carouselEl.setAttribute('data-initialized', 'true'); // This is usually set by the carousel JS, not hardcoded

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('cmp-carousel__container', 'slick-initialized', 'slick-slider', 'slick-dotted');

  const slickPrev = document.createElement('button');
  slickPrev.classList.add('slick-prev', 'slick-arrow', 'slick-disabled');
  slickPrev.setAttribute('aria-label', 'Previous');
  slickPrev.type = 'button';
  slickPrev.setAttribute('aria-disabled', 'true');
  slickPrev.textContent = 'Previous'; // Text for accessibility, background image for visual

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.style.opacity = '1';
  // slickTrack.style.width = '1695px'; // These should be dynamic from carousel JS
  // slickTrack.style.transform = 'translate3d(0px, 0px, 0px)';

  carouselItems.forEach((itemRow, index) => {
    const [imageCell, linkCell] = [...itemRow.children];

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
    carouselItem.setAttribute('aria-describedby', `slick-slide-control1${Math.floor(index / 3)}`);
    // carouselItem.style.width = '339px'; // This should be dynamic from carousel JS

    const lazyImageContainer = document.createElement('div');
    lazyImageContainer.classList.add('lazy-image-container');
    const link = linkCell.querySelector('a');
    if (link) {
      lazyImageContainer.setAttribute('data-redirection-url', link.href);
      // Add click listener for the image container to navigate
      lazyImageContainer.addEventListener('click', () => {
        window.location.href = link.href;
      });
      lazyImageContainer.style.cursor = 'pointer'; // Indicate it's clickable
    }

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        lazyImageContainer.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('is-clickable', 'lazy-image', 'loaded');
        optimizedPic.querySelector('img').style.opacity = '1';
        optimizedPic.querySelector('img').style.transition = 'opacity 0.3s ease-in-out';
      }
    }
    moveInstrumentation(itemRow, carouselItem);
    carouselItem.append(lazyImageContainer);
    slickTrack.append(carouselItem);
  });

  slickList.append(slickTrack);
  carouselContainer.append(slickPrev, slickList);

  const slickNext = document.createElement('button');
  slickNext.classList.add('slick-next', 'slick-arrow');
  slickNext.setAttribute('aria-label', 'Next');
  slickNext.type = 'button';
  slickNext.setAttribute('aria-disabled', 'false');
  slickNext.textContent = 'Next';
  carouselContainer.append(slickNext);

  const slickDots = document.createElement('ul');
  slickDots.classList.add('slick-dots');
  slickDots.setAttribute('role', 'tablist');

  const numPages = Math.ceil(carouselItems.length / 3);
  for (let i = 0; i < numPages; i += 1) {
    const li = document.createElement('li');
    if (i === 0) {
      li.classList.add('slick-active');
    }
    li.setAttribute('role', 'presentation');
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('role', 'tab');
    button.id = `slick-slide-control1${i}`;
    button.setAttribute('aria-controls', `slick-slide1${i * 3}`);
    button.setAttribute('aria-label', `${i + 1} of ${numPages}`);
    button.setAttribute('tabindex', i === 0 ? '0' : '-1');
    button.setAttribute('aria-selected', i === 0);
    button.textContent = String(i + 1); // Ensure textContent is a string
    li.append(button);
    slickDots.append(li);
  }
  carouselContainer.append(slickDots);

  carouselEl.append(carouselContainer);
  carouselWrapper.append(carouselEl);
  contentSection.append(carouselWrapper);
  productTabsContainer.append(contentSection);

  // View All Button
  const viewAllButtonWrapper = document.createElement('div');
  viewAllButtonWrapper.classList.add('button', 'cmp-button--primary', 'cmp-button--primary-undefined', 'cmp-product-tabs__button-range');

  const viewAllButton = document.createElement('button');
  viewAllButton.type = 'button';
  viewAllButton.classList.add('cmp-button');

  const viewAllSpan = document.createElement('span');
  viewAllSpan.classList.add('cmp-button__text');
  viewAllSpan.textContent = viewAllLabelRow.firstElementChild?.textContent.trim() || '';

  moveInstrumentation(viewAllLabelRow, viewAllButtonWrapper);
  viewAllButton.append(viewAllSpan);
  viewAllButtonWrapper.append(viewAllButton);
  productTabsContainer.append(viewAllButtonWrapper);

  // Add event listeners for carousel navigation (simplified, actual SlickJS would handle this)
  // These are placeholders; a real carousel library would attach its own listeners.
  slickPrev.addEventListener('click', () => {
    // TODO: Implement carousel previous slide logic
    console.log('Previous button clicked');
  });

  slickNext.addEventListener('click', () => {
    // TODO: Implement carousel next slide logic
    console.log('Next button clicked');
  });

  slickDots.querySelectorAll('button').forEach((dotButton, dotIndex) => {
    dotButton.addEventListener('click', () => {
      // TODO: Implement carousel slide to specific page logic
      console.log(`Dot button ${dotIndex + 1} clicked`);
    });
  });

  block.replaceChildren(productTabsContainer);
}
