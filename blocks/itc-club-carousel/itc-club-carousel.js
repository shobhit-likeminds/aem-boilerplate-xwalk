import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselItemsWrapper = block.children[0];
  moveInstrumentation(carouselItemsWrapper, block);
  carouselItemsWrapper.remove(); // Remove the "Carousel Items" title row

  const wrapper = document.createElement('section');
  wrapper.classList.add('shiftclub-itc-club-section', 'mx-md-0', 'mx-4');

  const container = document.createElement('div');
  container.classList.add('shiftclub-container');
  wrapper.append(container);

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add('shiftclub-carousel', 'slide', 'shiftclub-itc-club-carousel');
  carousel.setAttribute('data-ride', 'carousel');
  container.append(carousel);

  const itcCarouselShift = document.createElement('div');
  itcCarouselShift.classList.add('shiftclub-itc-carousel-shift');
  carousel.append(itcCarouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('shiftclub-carousel-inner');
  itcCarouselShift.append(carouselInner);

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('shiftclub-carousel-indicators');
  carousel.append(carouselIndicators); // Append indicators to carousel, not carouselInner

  const itemRows = [...block.children];

  itemRows.forEach((row, index) => {
    // Indicators
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    carouselIndicators.append(indicator);

    // Carousel Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('shiftclub-carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('shiftclub-d-md-flex', 'shiftclub-d-block');
    carouselItem.append(contentWrapper);

    const cells = [...row.children];
    let imageEl;
    let altText;
    let titleEl;
    let descriptionEl;

    // Based on BlockJson and EDS Block Structure:
    // cell[0]: image (picture)
    // cell[1]: alt (text)
    // cell[2]: title (h1-h6)
    // cell[3]: description (p)
    if (cells[0]) {
      imageEl = cells[0].querySelector('picture');
    }
    if (cells[1]) {
      altText = cells[1].textContent.trim();
    }
    if (cells[2]) {
      titleEl = cells[2].querySelector('h1, h2, h3, h4, h5, h6');
    }
    if (cells[3]) {
      descriptionEl = cells[3].querySelector('p');
    }

    if (imageEl) {
      const img = imageEl.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt || altText, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('shiftclub-carousel__img', 'shiftclub-d-block', 'shiftclub-w-md-50', 'shiftclub-w-100');
      contentWrapper.append(optimizedPic);
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('shiftclub-w-md-50', 'shiftclub-w-100', 'shiftclub-itc-club-right-wrapper', 'shiftclub-read-more');
    contentWrapper.append(rightWrapper);

    if (titleEl) {
      const h2 = document.createElement('h2');
      h2.classList.add('shiftclub-carousel-inner__title');
      moveInstrumentation(titleEl, h2);
      while (titleEl.firstChild) h2.append(titleEl.firstChild);
      rightWrapper.append(h2);
    }

    if (descriptionEl) {
      const p = document.createElement('p');
      p.classList.add('shiftclub-carousel-inner__description');
      moveInstrumentation(descriptionEl, p);
      while (descriptionEl.firstChild) p.append(descriptionEl.firstChild);
      rightWrapper.append(p);
    }

    carouselInner.append(carouselItem);
  });

  // Carousel controls
  const prevButton = document.createElement('button');
  prevButton.classList.add('shiftclub-carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.innerHTML = '<span class="shiftclub-carousel-control-prev-icon" aria-hidden="true"></span><span class="shiftclub-sr-only">Previous</span>';
  itcCarouselShift.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('shiftclub-carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.innerHTML = '<span class="shiftclub-carousel-control-next-icon" aria-hidden="true"></span><span class="shiftclub-sr-only">Next</span>';
  itcCarouselShift.append(nextButton);

  block.textContent = '';
  block.append(wrapper);

  let currentIndex = 0;
  const items = carouselInner.querySelectorAll('.shiftclub-carousel-item');
  const indicators = carouselIndicators.querySelectorAll('li');
  const totalItems = items.length;

  const showItem = (index) => {
    items.forEach((item, i) => {
      item.classList.remove('active', 'carousel-item-left', 'carousel-item-next');
      if (i === index) {
        item.classList.add('active');
      }
    });

    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  };

  const nextItem = () => {
    currentIndex = (currentIndex + 1) % totalItems;
    showItem(currentIndex);
  };

  const prevItem = () => {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showItem(currentIndex);
  };

  nextButton.addEventListener('click', nextItem);
  prevButton.addEventListener('click', prevItem);

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      showItem(currentIndex);
    });
  });
}
