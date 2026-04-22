import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, subHeadingRow] = [...block.children];

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cmp-cards', 'cmp-cards--yippee-diy', 'color-background-default');

  if (headingRow) {
    const heading = document.createElement('h2');
    heading.classList.add('cmp-cards__heading', 'text-center', 'title-star-icon');
    moveInstrumentation(headingRow, heading);
    heading.textContent = headingRow.textContent.trim();
    cardsContainer.append(heading);
  }

  if (subHeadingRow) {
    const subHeading = document.createElement('p');
    subHeading.classList.add('cmp-cards__sub-heading', 'body-3', 'text-center');
    moveInstrumentation(subHeadingRow, subHeading);
    subHeading.textContent = subHeadingRow.textContent.trim();
    cardsContainer.append(subHeading);
  }

  // The original HTML implies a carousel structure, but the EDS block structure
  // does not provide any items for the carousel. So, we create the carousel
  // container as per the original HTML, but it will be empty.
  const carouselWrapper = document.createElement('div');
  carouselWrapper.classList.add('slickcarousel', 'carousel', 'panelcontainer');

  const cmpCarousel = document.createElement('div');
  cmpCarousel.classList.add('cmp-carousel');
  cmpCarousel.setAttribute('data-component', 'carousel');
  // Add other data attributes from original HTML if they are static or can be derived
  cmpCarousel.setAttribute('data-show-infinite-scroll', 'false');
  cmpCarousel.setAttribute('data-show-arrows', 'true');
  cmpCarousel.setAttribute('data-show-dots', 'true');
  cmpCarousel.setAttribute('data-item-count-per-slide', '3');
  cmpCarousel.setAttribute('data-auto-play-is-enabled', 'false');
  cmpCarousel.setAttribute('data-auto-play-speed-in-ms', '1000');
  cmpCarousel.setAttribute('data-reveal-next-item-partially', 'false');
  cmpCarousel.setAttribute('data-show-center-zoom', 'false');
  cmpCarousel.setAttribute('data-slides-to-scroll', '3');
  cmpCarousel.setAttribute('data-initialized', 'true'); // This might be set by JS, but including for structure

  const carouselContainer = document.createElement('div');
  carouselContainer.classList.add('cmp-carousel__container', 'slick-initialized', 'slick-slider', 'slick-dotted');

  // Since there are no item rows in the provided block structure,
  // the carousel will be empty. If item rows were present, they would
  // be processed here and appended to carouselContainer.

  cmpCarousel.append(carouselContainer);
  carouselWrapper.append(cmpCarousel);
  cardsContainer.append(carouselWrapper);

  block.replaceChildren(cardsContainer);

  // Image optimization (if any images were part of the block, which they are not in this model)
  cardsContainer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
