import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const titleRow = children[0];
  const backgroundImageRow = children[1];
  const viewAllLabelRow = children[2];
  const itemRows = children.slice(3);

  const newBlock = document.createElement('div');
  newBlock.classList.add('cmp-product-tabs', 'cmp-product-tabs--yippee-without-image');
  moveInstrumentation(block, newBlock);

  // Background Image URL is type=text, read from textContent
  const backgroundImage = backgroundImageRow.querySelector('div')?.textContent.trim();
  if (backgroundImage) {
    newBlock.style.backgroundImage = `url(${backgroundImage})`;
  }

  const tempImages = document.createElement('div');
  tempImages.classList.add('cmp-product-tabs__temp-images');
  newBlock.append(tempImages);

  // Title is type=richtext, read from innerHTML
  const title = document.createElement('h2');
  title.classList.add('cmp-product-tabs__title');
  moveInstrumentation(titleRow, title);
  title.innerHTML = titleRow.querySelector('div')?.innerHTML || ''; // Ensure it reads from the inner div
  newBlock.append(title);

  // Content wrapper for carousel
  const content = document.createElement('div');
  content.classList.add('cmp-product-tabs__content');
  newBlock.append(content);

  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('slickcarousel', 'carousel', 'panelcontainer');
  content.append(carouselWrapper);

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

  itemRows.forEach((row, index) => {
    // Corrected: Use content detection instead of direct index access for item cells
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('cmp-carousel__item', 'slick-slide');
    if (index === 0) {
      carouselItem.classList.add('slick-current', 'slick-active');
    }
    carouselItem.setAttribute('data-slick-index', index);
    carouselItem.setAttribute('aria-hidden', index !== 0);
    carouselItem.setAttribute('tabindex', index === 0 ? '0' : '-1');
    carouselItem.setAttribute('role', 'tabpanel');
    carouselItem.id = `slick-slide3${index}`;
    carouselItem.setAttribute('aria-describedby', `slick-slide-control3${index}`);
    moveInstrumentation(row, carouselItem);
    slickTrack.append(carouselItem);

    const lazyImageContainer = document.createElement('div');
    lazyImageContainer.classList.add('lazy-image-container');
    carouselItem.append(lazyImageContainer);

    // Corrected: productLink is type=aem-content, read from a.href
    const productLink = linkCell?.querySelector('a')?.href || '#';
    lazyImageContainer.setAttribute('data-redirection-url', productLink);

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          lazyImageContainer.append(optimizedPic);
          optimizedPic.querySelector('img').classList.add('is-clickable', 'lazy-image', 'loaded');
        }
      }
    }
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

  // View All Button
  const viewAllButtonDiv = document.createElement('div');
  viewAllButtonDiv.classList.add('button', 'cmp-button--primary', 'cmp-button--primary-undefined', 'cmp-product-tabs__button-range');
  newBlock.append(viewAllButtonDiv);

  const viewAllButton = document.createElement('button');
  viewAllButton.classList.add('cmp-button');
  viewAllButton.setAttribute('type', 'button');
  moveInstrumentation(viewAllLabelRow, viewAllButton);
  viewAllButtonDiv.append(viewAllButton);

  const viewAllButtonText = document.createElement('span');
  viewAllButtonText.classList.add('cmp-button__text');
  // View All Button Label is type=text, read from textContent
  viewAllButtonText.textContent = viewAllLabelRow.querySelector('div')?.textContent.trim() || '';
  viewAllButton.append(viewAllButtonText);

  block.replaceChildren(newBlock);

  // Basic carousel functionality (for demonstration, a full slick.js implementation would be more complex)
  let currentIndex = 0;
  const totalItems = itemRows.length;
  const itemsPerSlide = parseInt(carousel.getAttribute('data-item-count-per-slide'), 10);

  const updateCarousel = () => {
    const trackWidth = totalItems * 339; // Assuming item width is 339px from original HTML
    slickTrack.style.width = `${trackWidth}px`;
    const offset = -currentIndex * 339;
    slickTrack.style.transform = `translate3d(${offset}px, 0px, 0px)`;

    [...slickTrack.children].forEach((item, i) => {
      if (i >= currentIndex && i < currentIndex + itemsPerSlide) {
        item.classList.add('slick-active');
        item.setAttribute('aria-hidden', 'false');
        item.setAttribute('tabindex', '0');
      } else {
        item.classList.remove('slick-active');
        item.setAttribute('aria-hidden', 'true');
        item.setAttribute('tabindex', '-1');
      }
      if (i === currentIndex) {
        item.classList.add('slick-current');
      } else {
        item.classList.remove('slick-current');
      }
    });

    prevButton.classList.toggle('slick-disabled', currentIndex === 0);
    prevButton.setAttribute('aria-disabled', currentIndex === 0);
    nextButton.classList.toggle('slick-disabled', currentIndex >= totalItems - itemsPerSlide);
    nextButton.setAttribute('aria-disabled', currentIndex >= totalItems - itemsPerSlide);

    // Update dots
    slickDots.innerHTML = '';
    const totalDots = Math.ceil(totalItems / itemsPerSlide);
    for (let i = 0; i < totalDots; i += 1) {
      const dotLi = document.createElement('li');
      dotLi.setAttribute('role', 'presentation');
      const dotButton = document.createElement('button');
      dotButton.setAttribute('type', 'button');
      dotButton.setAttribute('role', 'tab');
      dotButton.id = `slick-slide-control3${i}`;
      dotButton.setAttribute('aria-controls', `slick-slide3${i * itemsPerSlide}`);
      dotButton.setAttribute('aria-label', `${i + 1} of ${totalDots}`);
      dotButton.textContent = i + 1;
      if (i === Math.floor(currentIndex / itemsPerSlide)) {
        dotLi.classList.add('slick-active');
        dotButton.setAttribute('aria-selected', 'true');
        dotButton.setAttribute('tabindex', '0');
      } else {
        dotButton.setAttribute('tabindex', '-1');
      }
      dotButton.addEventListener('click', () => {
        currentIndex = i * itemsPerSlide;
        updateCarousel();
      });
      dotLi.append(dotButton);
      slickDots.append(dotLi);
    }
  };

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < totalItems - itemsPerSlide) {
      currentIndex += 1;
      updateCarousel();
    }
  });

  updateCarousel();
}
