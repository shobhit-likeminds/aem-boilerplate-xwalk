import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, subtitleRow, ...cardRows] = [...block.children];

  block.classList.add('cmp-recipe-group');

  // Header Section
  const headerSection = document.createElement('div');
  headerSection.classList.add('cmp-recipe-group__header-section');
  moveInstrumentation(titleRow, headerSection);
  moveInstrumentation(subtitleRow, headerSection);

  const title = document.createElement('h2');
  title.classList.add('cmp-recipe-group__title');
  while (titleRow.firstElementChild) title.append(titleRow.firstElementChild);
  headerSection.append(title);

  const subtitle = document.createElement('div');
  subtitle.classList.add('cmp-recipe-group__subtitle');
  while (subtitleRow.firstElementChild) subtitle.append(subtitleRow.firstElementChild);
  headerSection.append(subtitle);

  block.append(headerSection);

  // Tabs Section
  const tabsSection = document.createElement('div');
  tabsSection.classList.add('cmp-recipe-group__tabs');
  const tabGroup = document.createElement('div');
  tabGroup.classList.add('tab-group', 'cmp-tab-group');
  const carouselItem = document.createElement('div');
  carouselItem.classList.add('cmp-tab-group__carousel-item', 'cmp-carousel__item', 'scrollbar-style-h', 'scrollbar-style-w');

  // Assuming tab content comes from the original HTML structure or another source
  // For now, let's recreate the example tabs from the original HTML
  const tabTexts = ['Breakfast and Savoury', 'Breakfast and Nutriotious', 'Lunch and Dinner'];

  tabTexts.forEach((text, index) => {
    const tabItem = document.createElement('div');
    tabItem.classList.add('cmp-tab-group__tab-item');
    const tabDiv = document.createElement('div');
    tabDiv.classList.add('tab', 'cmp-tab--primary');
    const tabButton = document.createElement('button');
    tabButton.setAttribute('type', 'button');
    tabButton.classList.add('cmp-tab');
    if (index === 0) { // First tab is selected by default
      tabButton.classList.add('selected');
    }
    const tabTextSpan = document.createElement('span');
    tabTextSpan.classList.add('cmp-tab__text');
    tabTextSpan.textContent = text;
    tabButton.append(tabTextSpan);
    tabDiv.append(tabButton);
    tabItem.append(tabDiv);
    carouselItem.append(tabItem);

    // Add event listener for tab buttons
    tabButton.addEventListener('click', () => {
      // Remove 'selected' from all tabs
      carouselItem.querySelectorAll('.cmp-tab').forEach((btn) => btn.classList.remove('selected'));
      // Add 'selected' to the clicked tab
      tabButton.classList.add('selected');
      // TODO: Implement logic to switch carousel content based on selected tab
      console.log(`Tab "${text}" clicked!`);
    });
  });

  tabGroup.append(carouselItem);
  tabsSection.append(tabGroup);
  block.append(tabsSection);

  // Content Section (Carousel)
  const contentSection = document.createElement('div');
  contentSection.classList.add('cmp-recipe-group__content');
  const carouselWrapper = document.createElement('div');
  // Corrected class name from 'undefined' to 'cmp-recipe-group__carousel--undefined'
  carouselWrapper.classList.add('cmp-recipe-group__carousel', 'cmp-recipe-group__carousel--undefined');

  const slickCarousel = document.createElement('div');
  slickCarousel.classList.add('slickcarousel', 'carousel', 'panelcontainer');

  const cmpCarousel = document.createElement('div');
  cmpCarousel.classList.add('cmp-carousel');
  // Add data attributes from original HTML if needed for JS functionality
  cmpCarousel.setAttribute('data-component', 'carousel');
  cmpCarousel.setAttribute('data-show-infinite-scroll', 'false');
  cmpCarousel.setAttribute('data-show-arrows', 'true');
  cmpCarousel.setAttribute('data-show-dots', 'false');
  cmpCarousel.setAttribute('data-item-count-per-slide', '3');
  cmpCarousel.setAttribute('data-auto-play-is-enabled', 'false');
  cmpCarousel.setAttribute('data-auto-play-speed-in-ms', '500');
  cmpCarousel.setAttribute('data-reveal-next-item-partially', 'false');
  cmpCarousel.setAttribute('data-show-center-zoom', 'false');
  cmpCarousel.setAttribute('data-slides-to-scroll', '3');
  cmpCarousel.setAttribute('data-initialized', 'true');

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('cmp-carousel__container', 'slick-initialized', 'slick-slider');

  // Prev button
  const prevButton = document.createElement('button');
  prevButton.classList.add('slick-prev', 'slick-arrow', 'slick-disabled');
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('aria-disabled', 'true');
  prevButton.textContent = 'Previous';
  carouselContainer.append(prevButton);

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');
  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.style.opacity = '1';
  slickTrack.style.width = '4524px'; // Placeholder, actual width set by slick.js
  slickTrack.style.transform = 'translate3d(0px, 0px, 0px)'; // Placeholder

  cardRows.forEach((row, index) => {
    const cells = [...row.children];
    // Use content detection instead of index access
    const linkEl = cells.find(cell => cell.querySelector('a'));
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const tagCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim() === 'Tag value'); // More specific detection
    const headingCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim() === 'Heading value');
    const timeCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim() === 'Time value');
    const difficultyCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim() === 'Difficulty value');

    const carouselItemCard = document.createElement('div');
    carouselItemCard.classList.add('cmp-recipe-group__carousel-item', 'cmp-carousel__item', 'slick-slide');
    if (index === 0) {
      carouselItemCard.classList.add('slick-current', 'slick-active');
      carouselItemCard.setAttribute('aria-hidden', 'false');
    } else {
      carouselItemCard.setAttribute('aria-hidden', 'true');
    }
    carouselItemCard.setAttribute('data-slick-index', index.toString());
    carouselItemCard.setAttribute('tabindex', index === 0 ? '0' : '-1');
    carouselItemCard.style.width = '316px'; // Placeholder, actual width set by slick.js

    const cardLink = document.createElement('a');
    cardLink.href = linkEl ? linkEl.querySelector('a').href : '#';
    cardLink.classList.add('card', 'cmp-card--recipe', 'cmp-card--aashirvaad-recipe', 'color-background-background-2');
    cardLink.setAttribute('tabindex', index === 0 ? '0' : '-1');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('cmp-card');

    const cardContent = document.createElement('div');
    cardContent.classList.add('cmp-card__content');

    const cardMedia = document.createElement('div');
    cardMedia.classList.add('cmp-card__media');

    const cardOptions = document.createElement('div');
    cardOptions.classList.add('cmp-card__options');
    const threeDots = document.createElement('div');
    threeDots.classList.add('cmp-card__three-dots', 'icon-open-card-popup');
    cardOptions.append(threeDots);
    cardMedia.append(cardOptions);

    // Add event listener for the three-dots icon (modal/popup)
    threeDots.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior if applicable
      event.stopPropagation(); // Stop event from bubbling to cardLink
      // TODO: Implement modal/popup display logic
      console.log('Three dots clicked for card:', headingCell?.textContent.trim());
      // Example: toggle a class on a modal element
      // document.querySelector('.my-modal').classList.toggle('is-open');
    });

    const cardImage = document.createElement('div');
    cardImage.classList.add('cmp-card__image');
    const lazyImageContainer = document.createElement('div');
    lazyImageContainer.classList.add('lazy-image-container');
    const picture = imageCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      lazyImageContainer.append(optimizedPic);
    }
    cardImage.append(lazyImageContainer);
    cardMedia.append(cardImage);
    cardContent.append(cardMedia);

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('cmp-card__info');

    const cardTag = document.createElement('div');
    cardTag.classList.add('cmp-card__tag', 'cmp-card__tag--with-heart');
    const tagWrapper = document.createElement('div');
    tagWrapper.classList.add('cmp-card__tag-wrapper');
    const pTag = document.createElement('p');
    if (tagCell) {
      moveInstrumentation(tagCell.firstElementChild, pTag);
      while (tagCell.firstElementChild) pTag.append(tagCell.firstElementChild);
    }
    tagWrapper.append(pTag);
    cardTag.append(tagWrapper);
    const heartsWrapper = document.createElement('div');
    heartsWrapper.classList.add('cmp-card__hearts-wrapper', 'hidden');
    const heartIcon = document.createElement('div');
    heartIcon.classList.add('cmp-card__icon', 'icon-favorite_FILL1_wght400_GRAD0_opsz20');
    heartsWrapper.append(heartIcon);
    heartsWrapper.append(document.createElement('p')); // Empty p tag from original
    cardTag.append(heartsWrapper);
    cardInfo.append(cardTag);

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('cmp-card__title');
    const h4 = document.createElement('h4');
    if (headingCell) {
      moveInstrumentation(headingCell.firstElementChild, h4);
      while (headingCell.firstElementChild) h4.append(headingCell.firstElementChild);
    }
    cardTitle.append(h4);
    cardInfo.append(cardTitle);

    const recipeFooter = document.createElement('div');
    recipeFooter.classList.add('cmp-card__recipe_footer');

    const timeInMinutes = document.createElement('div');
    timeInMinutes.classList.add('cmp-card__time-in-minutes');
    const timeIcon = document.createElement('div');
    timeIcon.classList.add('cmp-card__icon', 'icon-Group-21690');
    timeInMinutes.append(timeIcon);
    const pTime = document.createElement('p');
    if (timeCell) {
      moveInstrumentation(timeCell.firstElementChild, pTime);
      while (timeCell.firstElementChild) pTime.append(timeCell.firstElementChild);
    }
    timeInMinutes.append(pTime);
    recipeFooter.append(timeInMinutes);

    const difficultyLevel = document.createElement('div');
    difficultyLevel.classList.add('cmp-card__difficulty-level', 'icon-chef-cap');
    const difficultyIcon = document.createElement('div');
    difficultyIcon.classList.add('cmp-card__icon', 'path1');
    difficultyLevel.append(difficultyIcon);
    const pDifficulty = document.createElement('p');
    if (difficultyCell) {
      moveInstrumentation(difficultyCell.firstElementChild, pDifficulty);
      while (difficultyCell.firstElementChild) pDifficulty.append(difficultyCell.firstElementChild);
    }
    difficultyLevel.append(pDifficulty);
    recipeFooter.append(difficultyLevel);

    cardInfo.append(recipeFooter);
    cardContent.append(cardInfo);
    cardDiv.append(cardContent);
    cardLink.append(cardDiv);
    carouselItemCard.append(cardLink);
    slickTrack.append(carouselItemCard);
    moveInstrumentation(row, carouselItemCard); // Move instrumentation from original row to the new card
  });

  slickList.append(slickTrack);
  carouselContainer.append(slickList);

  // Next button
  const nextButton = document.createElement('button');
  nextButton.classList.add('slick-next', 'slick-arrow');
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('aria-disabled', 'false');
  nextButton.textContent = 'Next';
  carouselContainer.append(nextButton);

  // Add event listeners for carousel navigation buttons
  prevButton.addEventListener('click', () => {
    // TODO: Implement carousel previous slide logic (e.g., using a carousel library or custom JS)
    console.log('Carousel Prev button clicked');
  });

  nextButton.addEventListener('click', () => {
    // TODO: Implement carousel next slide logic
    console.log('Carousel Next button clicked');
  });

  cmpCarousel.append(carouselContainer);
  slickCarousel.append(cmpCarousel);
  carouselWrapper.append(slickCarousel);
  contentSection.append(carouselWrapper);
  block.append(contentSection);

  // Action Section (View All button)
  const actionSection = document.createElement('div');
  actionSection.classList.add('cmp-recipe-group__action');
  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('button', 'cmp-button--primary', 'cmp-button--primary-light');
  const viewAllButton = document.createElement('button');
  viewAllButton.setAttribute('type', 'button');
  viewAllButton.classList.add('cmp-button');
  const viewAllText = document.createElement('span');
  viewAllText.classList.add('cmp-button__text');
  viewAllText.textContent = 'View All';
  viewAllButton.append(viewAllText);
  buttonWrapper.append(viewAllButton);
  actionSection.append(buttonWrapper);
  block.append(actionSection);

  // Add event listener for the View All button
  viewAllButton.addEventListener('click', () => {
    // TODO: Implement navigation or other action for "View All"
    console.log('View All button clicked!');
  });

  // Share section (empty div from original)
  const shareDiv = document.createElement('div');
  shareDiv.classList.add('share');
  block.append(shareDiv);

  // Clear the original block content as all children have been moved/recreated
  block.textContent = '';
}
