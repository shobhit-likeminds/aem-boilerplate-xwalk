import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    titleRow,
    subtitleRow,
    carouselTitleRow,
    viewAllLinkRow,
    viewAllLabelRow,
    ...itemRows
  ] = [...block.children];

  const recipeTabs = itemRows.filter((row) => row.children.length === 2);
  const recipeCards = itemRows.filter((row) => row.children.length === 4);

  const cmpRecipeGroup = document.createElement('div');
  cmpRecipeGroup.classList.add('cmp-recipe-group');
  moveInstrumentation(block, cmpRecipeGroup);

  // Background Image
  const backgroundImage = backgroundImageRow.querySelector('picture');
  if (backgroundImage) {
    cmpRecipeGroup.style.backgroundImage = `url(${backgroundImage.querySelector('img').src})`;
    // No moveInstrumentation for background image as it's applied to the wrapper style
  }

  // Header Section
  const headerSection = document.createElement('div');
  headerSection.classList.add('cmp-recipe-group__header-section');

  const title = document.createElement('h2');
  title.classList.add('cmp-recipe-group__title', 'text-center', 'title-star-icon');
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.textContent.trim();
  headerSection.append(title);

  const subtitle = document.createElement('div');
  subtitle.classList.add('cmp-recipe-group__sub-title', 'text-center');
  moveInstrumentation(subtitleRow, subtitle);
  subtitle.textContent = subtitleRow.textContent.trim();
  headerSection.append(subtitle);

  cmpRecipeGroup.append(headerSection);

  // Tab Group
  if (recipeTabs.length > 0) {
    const tabGroup = document.createElement('div');
    tabGroup.classList.add('cmp-tab-group');

    const tabGroupWrapper = document.createElement('div');
    tabGroupWrapper.classList.add('cmp-tab-group__wrapper');
    tabGroup.append(tabGroupWrapper);

    recipeTabs.forEach((row, index) => {
      const [tabImageCell, tabLabelCell] = [...row.children];

      const tab = document.createElement('div');
      tab.classList.add('cmp-tab-group__tab');
      if (index === 0) {
        tab.classList.add('active');
      }
      moveInstrumentation(row, tab);

      const tabImageDiv = document.createElement('div');
      tabImageDiv.classList.add('cmp-tab-group__image');
      const lazyImageContainer = document.createElement('div');
      lazyImageContainer.classList.add('lazy-image-container');
      tabImageDiv.append(lazyImageContainer);

      const picture = tabImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.classList.add('cmp-tab-group__img', 'lazy-image', 'loaded');
        lazyImageContainer.append(optimizedPic);
      }
      tab.append(tabImageDiv);

      const tabTitle = document.createElement('div');
      tabTitle.classList.add('cmp-tab-group__title', 'body-3');
      tabTitle.textContent = tabLabelCell.textContent.trim();
      tab.append(tabTitle);

      if (index === 0) {
        const titleBorderWrapper = document.createElement('div');
        titleBorderWrapper.classList.add('cmp-tab-group__title-border-wrapper');
        const titleBorder = document.createElement('div');
        titleBorder.classList.add('cmp-tab-group__title-border');
        titleBorderWrapper.append(titleBorder);
        tab.append(titleBorderWrapper);
      }

      tabGroupWrapper.append(tab);

      // Add event listener for tab interactivity
      tab.addEventListener('click', () => {
        tabGroupWrapper.querySelectorAll('.cmp-tab-group__tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        // TODO: Implement logic to update carousel content based on selected tab
        // This would likely involve re-rendering the carousel or filtering its items.
      });
    });
    cmpRecipeGroup.append(tabGroup);
  }

  // Content Section
  const contentSection = document.createElement('div');
  contentSection.classList.add('cmp-recipe-group__content');

  const contentTitle = document.createElement('h2');
  contentTitle.classList.add('cmp-recipe-group__content-title', 'text-center');
  moveInstrumentation(carouselTitleRow, contentTitle);
  contentTitle.textContent = carouselTitleRow.textContent.trim();
  contentSection.append(contentTitle);

  // Carousel Section
  if (recipeCards.length > 0) {
    const carouselWrapper = document.createElement('div');
    carouselWrapper.classList.add('slickcarousel', 'carousel', 'panelcontainer');

    const carousel = document.createElement('div');
    carousel.classList.add('cmp-carousel');
    // Add data attributes from original HTML
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
    carousel.setAttribute('data-initialized', 'true');

    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('cmp-carousel__container', 'slick-initialized', 'slick-slider', 'slick-dotted');
    carousel.append(carouselContainer);

    // Placeholder for slick-prev button
    const prevButton = document.createElement('button');
    prevButton.classList.add('slick-prev', 'slick-arrow', 'slick-disabled');
    prevButton.setAttribute('aria-label', 'Previous');
    prevButton.setAttribute('type', 'button');
    prevButton.setAttribute('aria-disabled', 'true');
    // Original HTML has background-image style on button, but this should be handled by CSS
    // prevButton.style.backgroundImage = `url("/etc.clientlibs/itc-foods-brands/clientlibs/clientlib-yippee/resources/images/prev-arrow-disabled.svg")`;
    carouselContainer.append(prevButton);

    const slickList = document.createElement('div');
    slickList.classList.add('slick-list', 'draggable');
    carouselContainer.append(slickList);

    const slickTrack = document.createElement('div');
    slickTrack.classList.add('slick-track');
    slickTrack.style.opacity = '1';
    slickTrack.style.transform = 'translate3d(0px, 0px, 0px)'; // Initial transform
    slickList.append(slickTrack);

    recipeCards.forEach((row, index) => {
      const [thumbnailCell, recipeTitleCell, timeCell, timeLabelCell] = [...row.children];

      const carouselItem = document.createElement('div');
      carouselItem.classList.add('cmp-carousel__item', 'slick-slide');
      if (index === 0) {
        carouselItem.classList.add('slick-current', 'slick-active');
      }
      carouselItem.setAttribute('data-slick-index', index);
      carouselItem.setAttribute('aria-hidden', index !== 0);
      carouselItem.setAttribute('tabindex', index === 0 ? '0' : '-1');
      carouselItem.setAttribute('role', 'tabpanel');
      carouselItem.id = `slick-slide5${index}`;
      // These aria-describedby values are hardcoded in the original HTML, but typically dynamic
      // For now, mirroring the original HTML's pattern.
      if (index === 0) {
        carouselItem.setAttribute('aria-describedby', `slick-slide-control50`);
      } else if (index === 3) {
        carouselItem.setAttribute('aria-describedby', `slick-slide-control51`);
      } else if (index === 6) {
        carouselItem.setAttribute('aria-describedby', `slick-slide-control52`);
      }
      moveInstrumentation(row, carouselItem);

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
      const threeDots = document.createElement('div');
      threeDots.classList.add('cmp-card__three-dots', 'icon-Ellipses');
      options.append(threeDots);
      mainContent.append(options);

      const media = document.createElement('div');
      media.classList.add('cmp-card__media');
      const lazyImageContainer = document.createElement('div');
      lazyImageContainer.classList.add('lazy-image-container');
      media.append(lazyImageContainer);

      const picture = thumbnailCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.classList.add('cmp-card__img', 'is-clickable', 'lazy-image', 'loaded');
        lazyImageContainer.append(optimizedPic);
      }
      mainContent.append(media);

      const content = document.createElement('div');
      content.classList.add('cmp-card__content');
      mainContent.append(content);

      const recipeTitle = document.createElement('h2');
      recipeTitle.classList.add('cmp-card__title');
      recipeTitle.textContent = recipeTitleCell.textContent.trim();
      content.append(recipeTitle);

      const timeInMinutes = document.createElement('div');
      timeInMinutes.classList.add('cmp-card__time-in-minutes');
      content.append(timeInMinutes);

      const timeWrapper = document.createElement('div');
      timeWrapper.classList.add('cmp-card__time-wrapper');
      const timeIcon = document.createElement('div');
      timeIcon.classList.add('cmp-card__time-icon');
      timeWrapper.append(timeIcon);
      const time = document.createElement('div');
      time.classList.add('cmp-card__time');
      time.textContent = timeCell.textContent.trim();
      timeWrapper.append(time);
      timeInMinutes.append(timeWrapper);

      const minutesLabel = document.createElement('p');
      minutesLabel.classList.add('cmp-card__minutes', 'body-3');
      minutesLabel.textContent = timeLabelCell.textContent.trim();
      timeInMinutes.append(minutesLabel);

      slickTrack.append(carouselItem);
    });

    // Placeholder for slick-next button
    const nextButton = document.createElement('button');
    nextButton.classList.add('slick-next', 'slick-arrow');
    nextButton.setAttribute('aria-label', 'Next');
    nextButton.setAttribute('type', 'button');
    nextButton.setAttribute('aria-disabled', 'false');
    // Original HTML has background-image style on button, but this should be handled by CSS
    // nextButton.style.backgroundImage = `url("/etc.clientlibs/itc-foods-brands/clientlibs/clientlib-yippee/resources/images/next-arrow.svg")`;
    carouselContainer.append(nextButton);

    // Placeholder for slick-dots
    const slickDots = document.createElement('ul');
    slickDots.classList.add('slick-dots');
    slickDots.setAttribute('role', 'tablist');
    carouselContainer.append(slickDots);

    contentSection.append(carouselWrapper);
  }

  cmpRecipeGroup.append(contentSection);

  // Action Section
  const actionSection = document.createElement('div');
  actionSection.classList.add('cmp-recipe-group__action');

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button', 'cmp-button--primary-anchor', 'cmp-button--primary-anchor-undefined');
  actionSection.append(buttonDiv);

  const viewAllAnchor = document.createElement('a');
  viewAllAnchor.classList.add('cmp-button');
  const foundLink = viewAllLinkRow.querySelector('a');
  if (foundLink) {
    viewAllAnchor.href = foundLink.href; // Correctly reading href from aem-content cell
  }
  viewAllAnchor.setAttribute('target', '_self'); // Assuming default target
  moveInstrumentation(viewAllLinkRow, viewAllAnchor);

  const viewAllSpan = document.createElement('span');
  viewAllSpan.classList.add('cmp-button__text');
  viewAllSpan.textContent = viewAllLabelRow.textContent.trim();
  viewAllAnchor.append(viewAllSpan);
  buttonDiv.append(viewAllAnchor);

  cmpRecipeGroup.append(actionSection);

  // Share section (empty div as per original)
  const shareDiv = document.createElement('div');
  shareDiv.classList.add('share');
  cmpRecipeGroup.append(shareDiv);

  block.replaceChildren(cmpRecipeGroup);

  // Optimize all images within the block
  cmpRecipeGroup.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
