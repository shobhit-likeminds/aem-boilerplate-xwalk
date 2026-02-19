import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'shiftclub-section shiftclub-mx-md-0 shiftclub-mx-4';
  moveInstrumentation(block, section); // Transfer instrumentation to the new section

  const container = document.createElement('div');
  container.className = 'container';

  const carouselDiv = document.createElement('div');
  carouselDiv.id = 'shiftclub-carousel';
  carouselDiv.className = 'carousel slide shiftclub-carousel';
  carouselDiv.setAttribute('data-ride', 'carousel');

  const carouselShift = document.createElement('div');
  carouselShift.className = 'shiftclub-carousel-shift';

  const carouselInner = document.createElement('div');
  carouselInner.className = 'carousel-inner';

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.className = 'carousel-indicators';

  [...block.children].forEach((row, index) => {
    // Extract content from the row
    const imageCell = row.children[0];
    const altCell = row.children[1];
    const titleCell = row.children[2];
    const descriptionCell = row.children[3];

    const imgElement = imageCell.querySelector('img');
    const altText = altCell.textContent.trim();
    const titleText = titleCell.textContent.trim();
    const descriptionHTML = descriptionCell.innerHTML.trim();

    // Create carousel indicator
    const indicatorLi = document.createElement('li');
    indicatorLi.setAttribute('data-target', '#shiftclub-carousel');
    indicatorLi.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicatorLi.classList.add('active');
    }
    carouselIndicators.append(indicatorLi);

    // Create carousel item
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem); // Transfer instrumentation to the new carousel item

    const itemContentWrapper = document.createElement('div');
    itemContentWrapper.className = 'd-md-flex d-block';

    if (imgElement) {
      const optimizedPic = createOptimizedPicture(imgElement.src, altText);
      optimizedPic.querySelector('img').classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
      moveInstrumentation(imgElement, optimizedPic.querySelector('img')); // Transfer instrumentation to the optimized picture's img
      itemContentWrapper.append(optimizedPic);
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.className = 'w-md-50 w-100 shiftclub-right-wrapper read-more';

    const titleH2 = document.createElement('h2');
    titleH2.className = 'shiftclub-carousel-inner__title';
    titleH2.textContent = titleText;
    rightWrapper.append(titleH2);

    const descriptionP = document.createElement('p');
    descriptionP.className = 'shiftclub-carousel-inner__description';
    descriptionP.innerHTML = descriptionHTML;
    rightWrapper.append(descriptionP);

    itemContentWrapper.append(rightWrapper);
    carouselItem.append(itemContentWrapper);
    carouselInner.append(carouselItem);
  });

  // Add navigation buttons
  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-control-prev';
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#shiftclub-carousel');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-control-next';
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#shiftclub-carousel');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';

  carouselShift.append(carouselIndicators, carouselInner, prevButton, nextButton);
  carouselDiv.append(carouselShift);
  container.append(carouselDiv);
  section.append(container);

  block.textContent = '';
  block.append(section);
}
