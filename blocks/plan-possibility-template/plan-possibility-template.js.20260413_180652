import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, ...planRows] = [...block.children];

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('plan-possibility-heading');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.firstElementChild?.textContent.trim() || '';
  block.append(heading);

  // Plans Container (Swiper structure)
  const planPossibilityContainer = document.createElement('div');
  planPossibilityContainer.classList.add('plan-possibility-container');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  planRows.forEach((row, index) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    if (index === 0) {
      swiperSlide.classList.add('swiper-slide-active');
    }

    const planBox = document.createElement('div');
    planBox.classList.add('planpossible-box', 'plan-possibility-box');
    moveInstrumentation(row, planBox);

    // Use content detection for cells within each plan row
    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const contentCells = cells.filter(cell => !cell.querySelector('picture'));

    if (iconCell) {
      const planIcon = document.createElement('div');
      planIcon.classList.add('plan-icon');
      const planIconBox = document.createElement('div');
      planIconBox.classList.add('plan-icon-box');
      const iconArea = document.createElement('div');
      iconArea.classList.add('icon-area');

      moveInstrumentation(iconCell, iconArea);
      while (iconCell.firstChild) {
        iconArea.append(iconCell.firstChild);
      }
      planIconBox.append(iconArea);
      planIcon.append(planIconBox);
      planBox.append(planIcon);
    }

    contentCells.forEach((cell) => {
      planBox.append(cell);
    });

    swiperSlide.append(planBox);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);
  planPossibilityContainer.append(swiper);
  block.append(planPossibilityContainer);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
