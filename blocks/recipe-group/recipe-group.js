import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Fixed fields: backgroundImageDesktop, title, subtitle, contentTitle, ctaLink, ctaLabel
  const [
    backgroundImageDesktopRow,
    titleRow,
    subtitleRow,
    contentTitleRow,
    ctaLinkRow,
    ctaLabelRow,
    ...itemRows
  ] = children;

  const recipeGroup = document.createElement('div');
  recipeGroup.classList.add('cmp-recipe-group');
  moveInstrumentation(block, recipeGroup);

  // Background Image (Desktop)
  const backgroundImagePicture = backgroundImageDesktopRow.querySelector('picture');
  if (backgroundImagePicture) {
    const img = backgroundImagePicture.querySelector('img');
    // We don't append the picture itself, just use its src for background-image
    // So, we move instrumentation to the recipeGroup itself for this row
    moveInstrumentation(backgroundImageDesktopRow, recipeGroup);
    // Use the optimized picture's source for the background image
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
    const optimizedImg = optimizedPic.querySelector('img');
    recipeGroup.style.backgroundImage = `url(${optimizedImg.src})`;
  }

  // Header Section
  const headerSection = document.createElement('div');
  headerSection.classList.add('cmp-recipe-group__header-section');
  recipeGroup.append(headerSection);

  // Section Title
  const title = document.createElement('h2');
  title.classList.add('cmp-recipe-group__title', 'text-center', 'title-star-icon');
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.textContent.trim();
  headerSection.append(title);

  // Section Subtitle
  const subtitle = document.createElement('div');
  subtitle.classList.add('cmp-recipe-group__sub-title', 'text-center');
  moveInstrumentation(subtitleRow, subtitle);
  subtitle.textContent = subtitleRow.textContent.trim();
  headerSection.append(subtitle);

  // Tab Group
  const tabGroup = document.createElement('div');
  tabGroup.classList.add('cmp-tab-group');
  recipeGroup.append(tabGroup);

  const tabGroupWrapper = document.createElement('div');
  tabGroupWrapper.classList.add('cmp-tab-group__wrapper');
  tabGroup.append(tabGroupWrapper);

  const recipeTabs = itemRows.filter((row) => row.children.length === 2); // Tab Image, Tab Label
  const recipeCards = itemRows.filter((row) => row.children.length === 4); // Card Image, Card Title, Time Value, Time Unit Label

  const tabs = [];
  let firstTab = true;

  recipeTabs.forEach((row, index) => {
    const [tabImageCell, tabLabelCell] = [...row.children];

    const tab = document.createElement('div');
    tab.classList.add('cmp-tab-group__tab');
    moveInstrumentation(row, tab);

    const tabImage = document.createElement('div');
    tabImage.classList.add('cmp-tab-group__image');
    tab.append(tabImage);

    const lazyImageContainer = document.createElement('div');
    lazyImageContainer.classList.add('lazy-image-container');
    tabImage.append(lazyImageContainer);

    const picture = tabImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('cmp-tab-group__img', 'lazy-image', 'loaded');
      moveInstrumentation(img, optimizedImg);
      lazyImageContainer.append(optimizedPic);
    }

    const tabTitle = document.createElement('div');
    tabTitle.classList.add('cmp-tab-group__title', 'body-3');
    tabTitle.textContent = tabLabelCell.textContent.trim();
    tab.append(tabTitle);

    const titleBorderWrapper = document.createElement('div');
    titleBorderWrapper.classList.add('cmp-tab-group__title-border-wrapper');
    tab.append(titleBorderWrapper);

    const titleBorder = document.createElement('div');
    titleBorder.classList.add('cmp-tab-group__title-border');
    titleBorderWrapper.append(titleBorder);

    tabGroupWrapper.append(tab);
    tabs.push(tab);

    if (firstTab) {
      tab.classList.add('active');
      firstTab = false;
    }
  });

  // Recipe Group Content
  const recipeGroupContent = document.createElement('div');
  recipeGroupContent.classList.add('cmp-recipe-group__content');
  recipeGroup.append(recipeGroupContent);

  // Content Title
  const contentTitle = document.createElement('h2');
  contentTitle.classList.add('cmp-recipe-group__content-title', 'text-center');
  moveInstrumentation(contentTitleRow, contentTitle);
  contentTitle.textContent = contentTitleRow.textContent.trim();
  recipeGroupContent.append(contentTitle);

  // Carousel
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('slickcarousel', 'carousel', 'panelcontainer');
  recipeGroupContent.append(carouselWrapper);

  const carousel = document.createElement('div');
  carousel.classList.add('cmp-carousel');
  carousel.setAttribute('data-component', 'carousel');
  carousel.setAttribute('data-show-infinite-scroll', 'false');
  carousel.setAttribute('data-show-arrows', 'true');
  carousel.setAttribute('data-show-dots', 'true');
  carousel.setAttribute('data-item-count-per-slide', '3');
  carousel.setAttribute('data-auto-play-is-enabled', 'false');
  carousel.setAttribute('data-auto-play-speed-in-ms', '500');
  carousel.setAttribute('data-reveal-next-item-partially', 'false');
  carousel.setAttribute('data-show-center-zoom', 'false');
  carousel.setAttribute('data-slides-to-scroll', '3');
  carouselWrapper.append(carousel);

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('cmp-carousel__container', 'slick-initialized', 'slick-slider', 'slick-dotted');
  carousel.append(carouselContainer);

  const prevButton = document.createElement('button');
  prevButton.classList.add('slick-prev', 'slick-arrow', 'slick-disabled');
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('aria-disabled', 'true');
  carouselContainer.append(prevButton);

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');
  carouselContainer.append(slickList);

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.style.opacity = '1';
  slickList.append(slickTrack);

  recipeCards.forEach((row, index) => {
    const [cardImageCell, cardTitleCell, timeValueCell, timeUnitLabelCell] = [...row.children];

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('cmp-carousel__item', 'slick-slide');
    carouselItem.setAttribute('data-slick-index', index);
    carouselItem.setAttribute('aria-hidden', 'true');
    carouselItem.setAttribute('tabindex', '-1');
    carouselItem.setAttribute('role', 'tabpanel');
    moveInstrumentation(row, carouselItem);
    slickTrack.append(carouselItem);

    const card = document.createElement('div');
    card.classList.add('card', 'cmp-card--yippee-recipe');
    carouselItem.append(card);

    const cmpCard = document.createElement('div');
    cmpCard.classList.add('cmp-card');
    card.append(cmpCard);

    const mainContent = document.createElement('div');
    mainContent.classList.add('cmp-card__main-content');
    cmpCard.append(mainContent);

    const options = document.createElement('div');
    options.classList.add('cmp-card__options');
    mainContent.append(options);

    const threeDots = document.createElement('div');
    threeDots.classList.add('cmp-card__three-dots', 'icon-Ellipses');
    options.append(threeDots);

    const media = document.createElement('div');
    media.classList.add('cmp-card__media');
    mainContent.append(media);

    const cardLazyImageContainer = document.createElement('div');
    cardLazyImageContainer.classList.add('lazy-image-container');
    media.append(cardLazyImageContainer);

    const cardPicture = cardImageCell.querySelector('picture');
    if (cardPicture) {
      const img = cardPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '300' }]);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('cmp-card__img', 'is-clickable', 'lazy-image', 'loaded');
      moveInstrumentation(img, optimizedImg);
      cardLazyImageContainer.append(optimizedPic);
    }

    const cardContent = document.createElement('div');
    cardContent.classList.add('cmp-card__content');
    mainContent.append(cardContent);

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('cmp-card__title');
    cardTitle.textContent = cardTitleCell.textContent.trim();
    cardContent.append(cardTitle);

    const timeInMinutes = document.createElement('div');
    timeInMinutes.classList.add('cmp-card__time-in-minutes');
    cardContent.append(timeInMinutes);

    const timeWrapper = document.createElement('div');
    timeWrapper.classList.add('cmp-card__time-wrapper');
    timeInMinutes.append(timeWrapper);

    const timeIcon = document.createElement('div');
    timeIcon.classList.add('cmp-card__time-icon');
    timeWrapper.append(timeIcon);

    const time = document.createElement('div');
    time.classList.add('cmp-card__time');
    time.textContent = timeValueCell.textContent.trim();
    timeWrapper.append(time);

    const minutesLabel = document.createElement('p');
    minutesLabel.classList.add('cmp-card__minutes', 'body-3');
    minutesLabel.textContent = timeUnitLabelCell.textContent.trim();
    timeInMinutes.append(minutesLabel);
  });

  const nextButton = document.createElement('button');
  nextButton.classList.add('slick-next', 'slick-arrow');
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('type', 'button');
  carouselContainer.append(nextButton);

  const slickDots = document.createElement('ul');
  slickDots.classList.add('slick-dots');
  slickDots.setAttribute('role', 'tablist');
  carouselContainer.append(slickDots);

  // CTA Action
  const actionDiv = document.createElement('div');
  actionDiv.classList.add('cmp-recipe-group__action');
  recipeGroup.append(actionDiv);

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button', 'cmp-button--primary-anchor', 'cmp-button--primary-anchor-undefined');
  actionDiv.append(buttonDiv);

  const ctaAnchor = document.createElement('a');
  ctaAnchor.classList.add('cmp-button');
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaAnchor.href = foundCtaLink.href;
    if (foundCtaLink.target) { // Preserve target attribute if it exists
      ctaAnchor.target = foundCtaLink.target;
    }
  }
  moveInstrumentation(ctaLinkRow, ctaAnchor);
  buttonDiv.append(ctaAnchor);

  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add('cmp-button__text');
  ctaSpan.textContent = ctaLabelRow.textContent.trim();
  moveInstrumentation(ctaLabelRow, ctaSpan);
  ctaAnchor.append(ctaSpan);

  // Share div
  const shareDiv = document.createElement('div');
  shareDiv.classList.add('share');
  recipeGroup.append(shareDiv);

  block.replaceChildren(recipeGroup);

  // --- INTERACTIVITY ---

  // Tab functionality
  function activateTab(selectedTab) {
    tabs.forEach(tab => tab.classList.remove('active'));
    selectedTab.classList.add('active');
    // TODO: Implement logic to update carousel content based on selected tab
    // For now, the carousel content is static, but in a real scenario,
    // this would trigger a re-render or filter of carousel items.
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activateTab(tab);
    });
  });

  // Carousel navigation (simplified for demonstration, actual slick carousel would handle this)
  let currentSlide = 0;
  const totalSlides = recipeCards.length;
  const itemsPerSlide = parseInt(carousel.getAttribute('data-item-count-per-slide'), 10);

  function updateCarousel() {
    // Disable/enable buttons
    prevButton.setAttribute('aria-disabled', currentSlide === 0);
    prevButton.classList.toggle('slick-disabled', currentSlide === 0);
    nextButton.setAttribute('aria-disabled', currentSlide >= totalSlides - itemsPerSlide);
    nextButton.classList.toggle('slick-disabled', currentSlide >= totalSlides - itemsPerSlide);

    // Update slick-track transform (simplified)
    const slideWidth = slickTrack.firstElementChild ? slickTrack.firstElementChild.offsetWidth : 0;
    slickTrack.style.transform = `translate3d(-${currentSlide * slideWidth}px, 0px, 0px)`;

    // Update active dots (simplified)
    slickDots.innerHTML = '';
    const numDots = Math.ceil(totalSlides / itemsPerSlide);
    for (let i = 0; i < numDots; i += 1) {
      const dotLi = document.createElement('li');
      dotLi.setAttribute('role', 'presentation');
      const dotButton = document.createElement('button');
      dotButton.setAttribute('type', 'button');
      dotButton.setAttribute('role', 'tab');
      dotButton.setAttribute('aria-controls', `slick-slide${i * itemsPerSlide}`);
      dotButton.setAttribute('aria-label', `${i + 1} of ${numDots}`);
      if (Math.floor(currentSlide / itemsPerSlide) === i) {
        dotLi.classList.add('slick-active');
        dotButton.setAttribute('aria-selected', 'true');
        dotButton.setAttribute('tabindex', '0');
      } else {
        dotButton.setAttribute('tabindex', '-1');
      }
      dotButton.textContent = i + 1;
      dotButton.addEventListener('click', () => {
        currentSlide = i * itemsPerSlide;
        updateCarousel();
      });
      dotLi.append(dotButton);
      slickDots.append(dotLi);
    }

    // Update aria-hidden and tabindex for carousel items
    [...slickTrack.children].forEach((item, index) => {
      if (index >= currentSlide && index < currentSlide + itemsPerSlide) {
        item.setAttribute('aria-hidden', 'false');
        item.setAttribute('tabindex', '0');
        item.classList.add('slick-current', 'slick-active');
      } else {
        item.setAttribute('aria-hidden', 'true');
        item.setAttribute('tabindex', '-1');
        item.classList.remove('slick-current', 'slick-active');
      }
    });
  }

  prevButton.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide -= itemsPerSlide;
      if (currentSlide < 0) currentSlide = 0;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentSlide < totalSlides - itemsPerSlide) {
      currentSlide += itemsPerSlide;
      if (currentSlide > totalSlides - itemsPerSlide) currentSlide = totalSlides - itemsPerSlide;
      updateCarousel();
    }
  });

  // Initial carousel state
  updateCarousel();
}
