import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const slides = [...block.children];
  const carouselId = `carousel-${Math.random().toString(36).substring(2, 9)}`;

  const section = document.createElement('section');
  section.classList.add('itc-club-section', 'mx-md-0', 'mx-4');

  const container = document.createElement('div');
  container.classList.add('container');
  section.append(container);

  const carousel = document.createElement('div');
  carousel.id = carouselId;
  carousel.classList.add('carousel', 'slide', 'itc-club-carousel');
  carousel.setAttribute('data-ride', 'carousel');
  container.append(carousel);

  const carouselShift = document.createElement('div');
  carouselShift.classList.add('itc-carousel-shift');
  carousel.append(carouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');
  // carouselIndicators will be appended to carouselInner later, before carouselItems
  carouselShift.append(carouselInner);

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');
  carouselInner.append(carouselIndicators); // Append indicators first

  slides.forEach((slideRow, index) => {
    const li = document.createElement('li');
    li.setAttribute('data-target', `#${carouselId}`);
    li.setAttribute('data-slide-to', index);
    if (index === 0) {
      li.classList.add('active');
    }
    carouselIndicators.append(li);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const dFlexWrapper = document.createElement('div');
    dFlexWrapper.classList.add('d-md-flex', 'd-block');

    // Content detection for cells
    const cells = [...slideRow.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const altCell = cells.find(cell => !cell.querySelector('picture') && cell.textContent.trim().length > 0); // Assuming alt text is plain text
    const titleCell = cells.find(cell => cell.querySelector('h1, h2, h3, h4, h5, h6') || (cell.textContent.trim().length > 0 && !cell.querySelector('picture') && !cell.querySelector('p')));
    const descriptionCell = cells.find(cell => cell.querySelector('p'));

    // Image
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, altCell?.textContent.trim() || '', false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.classList.add('carousel__img', 'd-block', 'w-md-50', 'w-100');
          dFlexWrapper.append(optimizedPic);
        }
      }
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'itc-club-right-wrapper', 'read-more');

    // Title
    if (titleCell) {
      const title = document.createElement('h2');
      title.classList.add('carousel-inner__title');
      moveInstrumentation(titleCell, title);
      title.textContent = titleCell.textContent.trim();
      rightWrapper.append(title);
    }

    // Description
    if (descriptionCell) {
      const description = document.createElement('p');
      description.classList.add('carousel-inner__description');
      moveInstrumentation(descriptionCell, description);
      while (descriptionCell.firstChild) {
        description.append(descriptionCell.firstChild);
      }
      rightWrapper.append(description);
    }

    dFlexWrapper.append(rightWrapper);
    carouselItem.append(dFlexWrapper);
    carouselInner.append(carouselItem);
  });

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', `#${carouselId}`);
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.addEventListener('click', () => {
    const currentActiveItem = carouselInner.querySelector('.carousel-item.active');
    const currentActiveIndicator = carouselIndicators.querySelector('li.active');
    let prevItem = currentActiveItem.previousElementSibling;
    if (!prevItem || !prevItem.classList.contains('carousel-item')) { // Loop to last item if at first
      prevItem = carouselInner.lastElementChild;
    }

    if (prevItem) {
      currentActiveItem.classList.remove('active');
      currentActiveIndicator?.classList.remove('active');

      prevItem.classList.add('active');
      const prevIndex = Array.from(carouselInner.children).filter(el => el.classList.contains('carousel-item')).indexOf(prevItem);
      carouselIndicators.children[prevIndex]?.classList.add('active');
    }
  });

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevSrOnly);
  carouselShift.append(prevButton);

  // Next button
  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', `#${carouselId}`);
  nextButton.setAttribute('data-slide', 'next');
  nextButton.addEventListener('click', () => {
    const currentActiveItem = carouselInner.querySelector('.carousel-item.active');
    const currentActiveIndicator = carouselIndicators.querySelector('li.active');
    let nextItem = currentActiveItem.nextElementSibling;
    if (!nextItem) { // Loop to first item if at last
      nextItem = carouselInner.querySelector('.carousel-item');
    }

    if (nextItem) {
      currentActiveItem.classList.remove('active');
      currentActiveIndicator?.classList.remove('active');

      nextItem.classList.add('active');
      const nextIndex = Array.from(carouselInner.children).filter(el => el.classList.contains('carousel-item')).indexOf(nextItem);
      carouselIndicators.children[nextIndex]?.classList.add('active');
    }
  });

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);
  carouselShift.append(nextButton);

  block.textContent = '';
  block.append(section);

  // Manual carousel logic for indicators
  carouselIndicators.querySelectorAll('li').forEach((indicator, idx) => {
    indicator.addEventListener('click', () => {
      carouselIndicators.querySelector('.active')?.classList.remove('active');
      indicator.classList.add('active');

      carouselInner.querySelector('.carousel-item.active')?.classList.remove('active');
      // Find the corresponding carousel item.
      // carouselInner contains carouselIndicators (first child) and then carouselItems.
      // So, the Nth carousel item is at index N+1 in carouselInner.children.
      const carouselItems = Array.from(carouselInner.children).filter(el => el.classList.contains('carousel-item'));
      carouselItems[idx]?.classList.add('active');
    });
  });
}
