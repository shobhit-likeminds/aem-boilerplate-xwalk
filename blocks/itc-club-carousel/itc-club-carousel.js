import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselId = 'carousel'; // Unique ID for the carousel, matching HTML

  const container = document.createElement('div');
  container.classList.add('container');

  const carouselDiv = document.createElement('div');
  carouselDiv.id = carouselId;
  carouselDiv.classList.add('shiftclub-carousel', 'slide', 'itc-club-carousel');
  carouselDiv.setAttribute('data-ride', 'carousel');

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('shiftclub-itc-carousel-shift');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('shiftclub-carousel-inner');

  const indicators = document.createElement('ol');
  indicators.classList.add('shiftclub-carousel-indicators');

  const items = [...block.children];

  items.forEach((row, index) => {
    // Create indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', `#${carouselId}`);
    indicator.setAttribute('data-slide-to', index);
    if (index === 0) {
      indicator.classList.add('active');
    }
    indicators.append(indicator);

    // Create carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('shiftclub-carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.classList.add('d-md-flex', 'd-block');
    moveInstrumentation(row, itemContentWrapper);

    // BlockJson model fields: image, alt, title, description
    // Assuming cells are in this order: [image, alt, title, description]
    const cells = [...row.children];
    const imageCell = cells[0]; // Image
    // const altCell = cells[1]; // Alt text is typically an attribute of the image, not a separate cell for display
    const titleCell = cells[2]; // Title
    const descriptionCell = cells[3]; // Description

    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          // Use the alt text from the original img element or altCell if it existed as a separate cell
          const altText = img.alt || (cells[1] ? cells[1].textContent.trim() : '');
          const optimizedPic = createOptimizedPicture(img.src, altText, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
          itemContentWrapper.append(optimizedPic);
        }
      } else {
        // Handle case where image might be a direct img tag without picture
        const img = imageCell.querySelector('img');
        if (img) {
          const altText = img.alt || (cells[1] ? cells[1].textContent.trim() : '');
          const optimizedPic = createOptimizedPicture(img.src, altText, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
          itemContentWrapper.append(optimizedPic);
        }
      }
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'shiftclub-itc-club-right-wrapper', 'read-more');

    if (titleCell) {
      // Ensure we get the heading element, not just the cell content
      const title = titleCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (title) {
        title.classList.add('shiftclub-carousel-inner__title');
        rightWrapper.append(title);
      } else {
        // If no heading, append the cell content directly (e.g., if it's just text)
        const h2 = document.createElement('h2'); // Default to h2 if no specific heading found
        h2.classList.add('shiftclub-carousel-inner__title');
        h2.innerHTML = titleCell.innerHTML; // Preserve any rich text
        rightWrapper.append(h2);
      }
    }

    if (descriptionCell) {
      // Ensure we get the paragraph element, not just the cell content
      const description = descriptionCell.querySelector('p');
      if (description) {
        description.classList.add('shiftclub-carousel-inner__description');
        rightWrapper.append(description);
      } else {
        // If no paragraph, append the cell content directly
        const p = document.createElement('p');
        p.classList.add('shiftclub-carousel-inner__description');
        p.innerHTML = descriptionCell.innerHTML; // Preserve any rich text
        rightWrapper.append(p);
      }
    }
    itemContentWrapper.append(rightWrapper);
    carouselItem.append(itemContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselShift.append(indicators);
  carouselShift.append(carouselInner);

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.classList.add('shiftclub-carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', `#${carouselId}`);
  prevButton.setAttribute('data-slide', 'prev');
  const prevIcon = document.createElement('span');
  prevIcon.classList.add('shiftclub-carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevIcon, prevSrOnly);

  // Next button
  const nextButton = document.createElement('button');
  nextButton.classList.add('shiftclub-carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', `#${carouselId}`);
  nextButton.setAttribute('data-slide', 'next');
  const nextIcon = document.createElement('span');
  nextIcon.classList.add('shiftclub-carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextIcon, nextSrOnly);

  carouselShift.append(prevButton, nextButton);
  carouselDiv.append(carouselShift);
  container.append(carouselDiv);

  block.textContent = '';
  block.classList.add('shiftclub-itc-club-section', 'mx-md-0', 'mx-4'); // Apply section classes to the block itself
  block.append(container);

  // Add carousel functionality using event listeners
  let currentSlide = 0;
  const totalSlides = items.length;

  const updateCarousel = () => {
    carouselInner.querySelectorAll('.shiftclub-carousel-item').forEach((item, idx) => {
      item.classList.toggle('active', idx === currentSlide);
    });
    indicators.querySelectorAll('li').forEach((indicator, idx) => {
      indicator.classList.toggle('active', idx === currentSlide);
    });
  };

  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  });

  indicators.querySelectorAll('li').forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel();
    });
  });
}
