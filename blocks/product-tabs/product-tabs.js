import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, ...itemRows] = [...block.children];

  const productTabsContainer = document.createElement('div');
  productTabsContainer.classList.add('cmp-product-tabs', 'cmp-product-tabs--yippee-without-image');

  // Title
  const titleEl = document.createElement('h2');
  titleEl.classList.add('cmp-product-tabs__title');
  moveInstrumentation(titleRow, titleEl);
  // Use innerHTML for richtext field
  titleEl.innerHTML = titleRow.firstElementChild?.innerHTML || '';
  productTabsContainer.append(titleEl);

  const tabsNav = document.createElement('div');
  tabsNav.classList.add('cmp-product-tabs__tabs');
  const tabsContent = document.createElement('div');
  tabsContent.classList.add('cmp-product-tabs__content');

  const tabItems = [];
  const productTabItems = [];

  // Separate tab definitions from product items using content detection
  itemRows.forEach((row) => {
    const cells = [...row.children];
    // A product-tab row has 3 cells: tabLabel (text), products (number), ctaLabel (text)
    // A product-tab-item row has 2 cells: image (picture), link (aem-content)
    if (cells.length === 3 && cells[0].textContent.trim() && !cells[0].querySelector('a') && cells[1].textContent.trim() && !cells[1].querySelector('picture') && cells[2].textContent.trim() && !cells[2].querySelector('a')) {
      tabItems.push(row);
    } else if (cells.length === 2 && cells[0].querySelector('picture') && cells[1].querySelector('a')) {
      productTabItems.push(row);
    }
  });

  let productItemIndex = 0;

  tabItems.forEach((tabRow, index) => {
    const [tabLabelCell, productsContainerCell, ctaLabelCell] = [...tabRow.children];

    // Tab button
    const tabButtonWrapper = document.createElement('div');
    tabButtonWrapper.classList.add('button', 'cmp-button--secondary', 'cmp-button--secondary-undefined');
    if (index === 0) {
      tabButtonWrapper.classList.add('active');
    }

    const tabButton = document.createElement('button');
    tabButton.type = 'button';
    tabButton.classList.add('cmp-button');
    const tabButtonText = document.createElement('span');
    tabButtonText.classList.add('cmp-button__text');
    tabButtonText.textContent = tabLabelCell.textContent.trim();
    tabButton.append(tabButtonText);
    tabButtonWrapper.append(tabButton);
    moveInstrumentation(tabLabelCell, tabButtonWrapper); // Move instrumentation from label cell
    tabsNav.append(tabButtonWrapper);

    // Tab content
    const tabPane = document.createElement('div');
    tabPane.classList.add('slickcarousel', 'carousel', 'panelcontainer');
    if (index === 0) {
      tabPane.classList.add('active');
    } else {
      tabPane.style.display = 'none'; // Hide inactive tabs
    }

    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('cmp-carousel', 'cmp-carousel__container', 'slick-initialized', 'slick-slider', 'slick-dotted');
    carouselContainer.setAttribute('data-component', 'carousel');
    carouselContainer.setAttribute('data-show-infinite-scroll', 'false');
    carouselContainer.setAttribute('data-show-arrows', 'true');
    carouselContainer.setAttribute('data-show-dots', 'true');
    carouselContainer.setAttribute('data-item-count-per-slide', '3');
    carouselContainer.setAttribute('data-auto-play-is-enabled', 'false');
    carouselContainer.setAttribute('data-auto-play-speed-in-ms', '500');
    carouselContainer.setAttribute('data-reveal-next-item-partially', 'false');
    carouselContainer.setAttribute('data-show-center-zoom', 'false');
    carouselContainer.setAttribute('data-slides-to-scroll', '3');
    carouselContainer.setAttribute('data-initialized', 'true');

    // Slick carousel structure
    const slickPrev = document.createElement('button');
    slickPrev.classList.add('slick-prev', 'slick-arrow', 'slick-disabled');
    slickPrev.setAttribute('aria-label', 'Previous');
    slickPrev.type = 'button';
    slickPrev.setAttribute('aria-disabled', 'true');
    slickPrev.textContent = 'Previous';
    carouselContainer.append(slickPrev);

    const slickList = document.createElement('div');
    slickList.classList.add('slick-list', 'draggable');
    const slickTrack = document.createElement('div');
    slickTrack.classList.add('slick-track');
    slickTrack.style.opacity = '1';
    slickList.append(slickTrack);
    carouselContainer.append(slickList);

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
    carouselContainer.append(slickDots);

    // Products for this tab
    const productsForTab = [];
    const numProducts = parseInt(productsContainerCell.textContent.trim(), 10); // Assuming this cell contains the number of products for this tab

    for (let i = 0; i < numProducts; i += 1) {
      if (productItemIndex < productTabItems.length) {
        productsForTab.push(productTabItems[productItemIndex]);
        productItemIndex += 1;
      }
    }

    productsForTab.forEach((productRow, prodIndex) => {
      const [imageCell, linkCell] = [...productRow.children];

      const carouselItem = document.createElement('div');
      // Corrected class names for carousel item
      carouselItem.classList.add('cmp-carousel__item', 'slick-slide');
      if (prodIndex === 0) {
        carouselItem.classList.add('slick-current', 'slick-active');
      }
      carouselItem.setAttribute('data-slick-index', prodIndex);
      carouselItem.setAttribute('aria-hidden', prodIndex !== 0);
      carouselItem.setAttribute('tabindex', prodIndex === 0 ? '0' : '-1');
      carouselItem.setAttribute('role', 'tabpanel');
      carouselItem.id = `slick-slide${index}${prodIndex}`;
      carouselItem.setAttribute('aria-describedby', `slick-slide-control${index}${prodIndex}`);

      const lazyImageContainer = document.createElement('div');
      lazyImageContainer.classList.add('lazy-image-container');

      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        // Read href for aem-content type
        lazyImageContainer.setAttribute('data-redirection-url', foundLink.href);
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
      moveInstrumentation(productRow, carouselItem); // Move instrumentation from product item row
      carouselItem.append(lazyImageContainer);
      slickTrack.append(carouselItem);
    });

    tabPane.append(carouselContainer);
    tabsContent.append(tabPane);

    // CTA Button for the tab
    if (ctaLabelCell.textContent.trim()) {
      const ctaButtonWrapper = document.createElement('div');
      ctaButtonWrapper.classList.add('button', 'cmp-button--primary', 'cmp-button--primary-undefined', 'cmp-product-tabs__button-range');
      const ctaButton = document.createElement('button');
      ctaButton.type = 'button';
      ctaButton.classList.add('cmp-button');
      const ctaButtonText = document.createElement('span');
      ctaButtonText.classList.add('cmp-button__text');
      ctaButtonText.textContent = ctaLabelCell.textContent.trim();
      ctaButton.append(ctaButtonText);
      ctaButtonWrapper.append(ctaButton);
      moveInstrumentation(ctaLabelCell, ctaButtonWrapper); // Move instrumentation from CTA label cell
      tabPane.append(ctaButtonWrapper);
    }
  });

  productTabsContainer.append(tabsNav);
  productTabsContainer.append(tabsContent);

  // Add event listeners for tab switching
  const tabButtons = tabsNav.querySelectorAll('.cmp-button--secondary');
  const tabPanes = tabsContent.querySelectorAll('.slickcarousel');

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Deactivate all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove('active'));
      tabPanes.forEach((pane) => {
        pane.classList.remove('active');
        pane.style.display = 'none';
      });

      // Activate clicked button and corresponding pane
      button.classList.add('active');
      tabPanes[index].classList.add('active');
      tabPanes[index].style.display = ''; // Show active tab
    });
  });

  block.replaceChildren(productTabsContainer);
}
