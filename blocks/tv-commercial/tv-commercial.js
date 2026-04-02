import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('owl-stage-outer');

  const stage = document.createElement('div');
  stage.classList.add('owl-stage');
  wrapper.append(stage);

  [...block.children].forEach((row) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('owl-item');
    moveInstrumentation(row, itemDiv);

    const innerItemDiv = document.createElement('div');
    innerItemDiv.classList.add('item');
    itemDiv.append(innerItemDiv);

    const ul = document.createElement('ul');
    innerItemDiv.append(ul);

    [...row.children].forEach((cell) => {
      const li = document.createElement('li');
      const picture = cell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          optimizedPic.querySelector('img').classList.add('img-fluid', 'lozad');
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          li.append(optimizedPic);
        }
      }
      ul.append(li);
    });
    stage.append(itemDiv);
  });

  block.textContent = '';
  block.classList.add('owl-carousel', 'owl-theme', 'owl-loaded', 'owl-drag');
  block.append(wrapper);

  // Add navigation buttons (owl-nav) and dots (owl-dots) as they appear in the original HTML
  const owlNav = document.createElement('div');
  owlNav.classList.add('owl-nav');

  const owlPrev = document.createElement('div');
  owlPrev.classList.add('owl-prev');
  owlPrev.textContent = 'prev';
  owlNav.append(owlPrev);

  const owlNext = document.createElement('div');
  owlNext.classList.add('owl-next');
  owlNext.textContent = 'next';
  owlNav.append(owlNext);

  block.append(owlNav);

  const owlDots = document.createElement('div');
  owlDots.classList.add('owl-dots', 'disabled');
  block.append(owlDots);

  // Basic carousel functionality (simplified - real Owl Carousel has more complex state)
  let currentIndex = 0;
  const items = [...stage.children];
  const itemWidth = 1110 + 30; // item width + margin-right

  const updateCarousel = () => {
    stage.style.transform = `translate3d(-${currentIndex * itemWidth}px, 0px, 0px)`;
    items.forEach((item, index) => {
      if (index === currentIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  };

  owlPrev.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
    updateCarousel();
  });

  owlNext.addEventListener('click', () => {
    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

  // Initialize carousel state
  if (items.length > 0) {
    items[0].classList.add('active');
  }
}
