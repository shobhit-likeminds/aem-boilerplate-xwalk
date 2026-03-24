import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('section');
  wrapper.classList.add('shiftclub-itc-club-section', 'mx-md-0', 'mx-4');

  const container = document.createElement('div');
  container.classList.add('shiftclub-container');
  wrapper.append(container);

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.classList.add('shiftclub-carousel', 'slide', 'shiftclub-itc-club-carousel');
  carousel.setAttribute('data-ride', 'carousel'); // Added from original HTML
  container.append(carousel);

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('shiftclub-itc-carousel-shift');
  carousel.append(carouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('shiftclub-carousel-inner');
  carouselShift.append(carouselInner);

  const indicators = document.createElement('ol');
  indicators.classList.add('shiftclub-carousel-indicators');
  // indicators are appended to carouselInner later, after items are created

  const itemRows = [...block.children].slice(1); // Skip the first row which is the container label

  itemRows.forEach((row, index) => {
    const li = document.createElement('li');
    li.setAttribute('data-target', '#carousel');
    li.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      li.classList.add('active');
    }
    indicators.append(li);
  });
  carouselInner.append(indicators); // Append indicators here, after they are populated

  itemRows.forEach((row, index) => {
    const item = document.createElement('div');
    moveInstrumentation(row, item);
    item.classList.add('shiftclub-carousel-item');
    if (index === 0) {
      item.classList.add('active');
    }

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('shiftclub-d-md-flex', 'd-block');
    item.append(itemContentWrapper);

    const cells = [...row.children];
    const imageCell = cells[0];
    const altTextCell = cells[1];
    const titleCell = cells[2];
    const descriptionCell = cells[3];

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        // The original HTML uses <img> directly, not optimized picture.
        // However, createOptimizedPicture is a standard AEM practice, so we'll keep it,
        // but ensure the class names match the original HTML's img tag.
        const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        // Corrected class names to match original HTML: 'shiftclub-carousel__img d-block w-md-50 w-100'
        optimizedPic.classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
        itemContentWrapper.append(optimizedPic);
      }
    }

    const rightWrapper = document.createElement('div');
    // Corrected class names to match original HTML: 'shiftclub-w-md-50 w-100 shiftclub-itc-club-right-wrapper read-more'
    rightWrapper.classList.add('shiftclub-w-md-50', 'w-100', 'shiftclub-itc-club-right-wrapper', 'read-more');
    itemContentWrapper.append(rightWrapper);

    const title = document.createElement('h2');
    // Corrected class name to match original HTML: 'shiftclub-carousel-inner__title'
    title.classList.add('shiftclub-carousel-inner__title');
    moveInstrumentation(titleCell, title);
    while (titleCell.firstChild) title.append(titleCell.firstChild);
    rightWrapper.append(title);

    const description = document.createElement('p');
    // Corrected class name to match original HTML: 'shiftclub-carousel-inner__description'
    description.classList.add('shiftclub-carousel-inner__description');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    rightWrapper.append(description);

    carouselInner.append(item);
  });

  const prevButton = document.createElement('button');
  prevButton.classList.add('shiftclub-carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel'); // Added from original HTML
  prevButton.setAttribute('data-slide', 'prev'); // Added from original HTML
  prevButton.addEventListener('click', () => {
    carousel.dispatchEvent(new CustomEvent('slide', { detail: { direction: 'prev' } }));
  });
  const prevIcon = document.createElement('span');
  prevIcon.classList.add('shiftclub-carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('shiftclub-sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);
  carouselShift.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('shiftclub-carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel'); // Added from original HTML
  nextButton.setAttribute('data-slide', 'next'); // Added from original HTML
  nextButton.addEventListener('click', () => {
    carousel.dispatchEvent(new CustomEvent('slide', { detail: { direction: 'next' } }));
  });
  const nextIcon = document.createElement('span');
  nextIcon.classList.add('shiftclub-carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('shiftclub-sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);
  carouselShift.append(nextButton);

  // Simple carousel logic
  let currentIndex = 0;
  const totalItems = itemRows.length;

  const showSlide = (index) => {
    const slides = carouselInner.querySelectorAll('.shiftclub-carousel-item');
    const indicatorLis = indicators.querySelectorAll('li');

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    indicatorLis.forEach((li, i) => {
      li.classList.toggle('active', i === index);
    });
  };

  carousel.addEventListener('slide', (event) => {
    const { direction } = event.detail;
    if (direction === 'prev') {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    } else if (direction === 'next') {
      currentIndex = (currentIndex + 1) % totalItems;
    }
    showSlide(currentIndex);
  });

  indicators.addEventListener('click', (event) => {
    const targetLi = event.target.closest('li');
    if (targetLi) {
      const slideTo = parseInt(targetLi.getAttribute('data-slide-to'), 10);
      if (!isNaN(slideTo)) {
        currentIndex = slideTo;
        showSlide(currentIndex);
      }
    }
  });

  // Initialize the carousel to show the first slide
  showSlide(currentIndex);

  block.textContent = '';
  block.append(wrapper);
}
