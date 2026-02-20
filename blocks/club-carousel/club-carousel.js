import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const clubSectionContainer = document.createElement('div');
  clubSectionContainer.classList.add('club-section-container');

  const clubCarousel = document.createElement('div');
  clubCarousel.id = 'club-carousel';
  clubCarousel.classList.add('club-section-carousel', 'carousel', 'slide');
  clubCarousel.setAttribute('data-ride', 'carousel');

  const clubSectionShift = document.createElement('div');
  clubSectionShift.classList.add('club-section-shift');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  [...block.children].forEach((row, index) => {
    const cells = [...row.children];

    // Create carousel indicator
    const indicatorLi = document.createElement('li');
    indicatorLi.setAttribute('data-target', '#club-carousel');
    indicatorLi.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicatorLi.classList.add('active');
    }
    carouselIndicators.append(indicatorLi);

    // Create carousel item
    const carouselItemDiv = document.createElement('div');
    moveInstrumentation(row, carouselItemDiv);
    carouselItemDiv.classList.add('carousel-item');
    if (index === 0) {
      carouselItemDiv.classList.add('active');
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('d-md-flex', 'd-block');

    // Image (first cell)
    const imageCell = cells[0];
    if (imageCell) {
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          const newImg = optimizedPic.querySelector('img');
          newImg.classList.add('club-section-carousel-img', 'd-block', 'w-md-50', 'w-100');
          contentWrapper.append(optimizedPic);
        }
      }
    }

    // Right wrapper (second cell for title, third for description)
    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('club-section-right-wrapper', 'read-more');

    // Title (second cell)
    const titleCell = cells[1];
    if (titleCell) {
      const h2 = document.createElement('h2');
      h2.classList.add('club-section-carousel-title');
      h2.textContent = titleCell.textContent.trim();
      rightWrapper.append(h2);
    }

    // Description (third cell)
    const descriptionCell = cells[2];
    if (descriptionCell) {
      const p = document.createElement('p');
      p.classList.add('club-section-carousel-description');
      p.innerHTML = descriptionCell.innerHTML;
      rightWrapper.append(p);
    }

    contentWrapper.append(rightWrapper);
    carouselItemDiv.append(contentWrapper);
    carouselInner.append(carouselItemDiv);
  });

  clubSectionShift.append(carouselIndicators);
  clubSectionShift.append(carouselInner);

  // Add navigation buttons
  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('data-target', '#club-carousel');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';
  clubSectionShift.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control-next');
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('data-target', '#club-carousel');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';
  clubSectionShift.append(nextButton);

  clubCarousel.append(clubSectionShift);
  clubSectionContainer.append(clubCarousel);

  block.textContent = '';
  block.classList.add('club-section-main', 'mx-md-0', 'mx-4');
  block.append(clubSectionContainer);
}
