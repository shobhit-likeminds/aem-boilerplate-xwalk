import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...planRows] = [...block.children];

  // Heading
  const headingEl = document.createElement('h2');
  headingEl.classList.add('plan-possibility-heading');
  moveInstrumentation(headingRow, headingEl);
  headingEl.textContent = headingRow.firstElementChild?.textContent.trim() || '';
  block.replaceChild(headingEl, headingRow);

  // Plans Container
  const planPossibilityContainer = document.createElement('div');
  planPossibilityContainer.classList.add('plan-possibility-container');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  planRows.forEach((row) => {
    const cells = [...row.children]; // Get all cells for content detection
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    moveInstrumentation(row, swiperSlide);

    const planPossibleBox = document.createElement('div');
    planPossibleBox.classList.add('planpossible-box', 'plan-possibility-box');

    const planIcon = document.createElement('div');
    planIcon.classList.add('plan-icon');

    const planIconBox = document.createElement('div');
    planIconBox.classList.add('plan-icon-box');

    const iconArea = document.createElement('div');
    iconArea.classList.add('icon-area');

    // Icon cell - using content detection
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    if (iconCell) {
      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          picture.replaceWith(optimizedPic);
          iconArea.appendChild(optimizedPic);
        }
      }
    }

    planIconBox.appendChild(iconArea);
    planIcon.appendChild(planIconBox);
    planPossibleBox.appendChild(planIcon);
    swiperSlide.appendChild(planPossibleBox);
    swiperWrapper.appendChild(swiperSlide);
  });

  swiper.appendChild(swiperWrapper);
  planPossibilityContainer.appendChild(swiper);
  block.appendChild(planPossibilityContainer);
}
