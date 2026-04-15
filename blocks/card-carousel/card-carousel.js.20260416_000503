import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import Swiper from '../../scripts/swiper-bundle.min.js';

export default function decorate(block) {
  const [titleRow, subtitleRow, ...cardRows] = [...block.children];

  block.textContent = '';
  block.classList.add('container', 'gx-8', 'gx-sm-0');

  const titleWrapper = document.createElement('div');
  moveInstrumentation(titleRow, titleWrapper);
  const title = document.createElement('h2');
  title.classList.add('card-carousel__title', 'font-24', 'leading-28', 'font-sm-40', 'leading-sm-50', 'text-dark-gray-100', 'text-center', 'font-baskerville');
  title.textContent = titleRow.firstElementChild.textContent.trim();
  titleWrapper.append(title);
  block.append(titleWrapper);

  const subtitleWrapper = document.createElement('div');
  moveInstrumentation(subtitleRow, subtitleWrapper);
  const subtitle = document.createElement('p');
  subtitle.classList.add('card-carousel__subtitle', 'font-default', 'leading-24', 'font-sm-18', 'leading-sm-32', 'text-dark-gray-100', 'text-center', 'mt-4', 'fw-medium');
  subtitle.textContent = subtitleRow.firstElementChild.textContent.trim();
  subtitleWrapper.append(subtitle);
  block.append(subtitleWrapper);

  const swiperSection = document.createElement('div');
  swiperSection.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperSection.setAttribute('data-loop', 'true');

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');

  cardRows.forEach((row) => {
    const [imageCell, linkCell, linkLabelCell, recipeTitleCell, descriptionCell, timeCell, servesCell] = [...row.children];

    const swiperSlide = document.createElement('div');
    moveInstrumentation(row, swiperSlide);
    swiperSlide.classList.add('swiper-slide');

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');

    const link = document.createElement('a');
    link.classList.add('recipe-card__link', 'd-block', 'position-relative');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        link.append(optimizedPic);
      }
    }

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('recipe-card__content', 'py-6');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('recipe-card__info', 'd-flex', 'align-items-center', 'justify-content-between');
    const tagSpan = document.createElement('span');
    tagSpan.classList.add('recipe-card__tag', 'text-uppercase', 'text-red-100', 'font-14', 'font-xl-default', 'leading-24', 'fw-semibold');
    // The linkLabelCell is for the tag text, not the SVG.
    tagSpan.textContent = linkLabelCell.textContent.trim();
    infoDiv.append(tagSpan);
    const svgIcon = document.createElement('img');
    svgIcon.alt = 'svg file';
    svgIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1776254209589.svg+xml'; // Path from original HTML
    infoDiv.append(svgIcon);
    contentDiv.append(infoDiv);

    const textDiv = document.createElement('div');
    textDiv.classList.add('recipe-card__text');

    const recipeTitle = document.createElement('h3');
    recipeTitle.classList.add('recipe-card__title', 'font-20', 'font-xl-24', 'leading-24', 'leading-xl-30', 'font-baskerville', 'fw-bold', 'text-dark-gray-100', 'mt-4');
    recipeTitle.textContent = recipeTitleCell.textContent.trim();
    textDiv.append(recipeTitle);

    const description = document.createElement('p');
    description.classList.add('recipe-card__desc', 'font-default', 'font-xl-18', 'leading-24', 'fw-medium', 'text-dark-gray-100', 'mt-4');
    description.textContent = descriptionCell.textContent.trim();
    textDiv.append(description);
    contentDiv.append(textDiv);

    const waveDiv = document.createElement('div');
    waveDiv.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
    contentDiv.append(waveDiv);

    const propertiesUl = document.createElement('ul');
    propertiesUl.classList.add('recipe-card__properties', 'mt-4', 'd-flex', 'align-items-center'); // Removed duplicate mt-4

    const timeLi = document.createElement('li');
    timeLi.classList.add('recipe-card__property', 'recipe-card__property--left', 'd-flex', 'align-items-center');
    const timeIcon = document.createElement('img');
    timeIcon.alt = 'svg file';
    timeIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1776254209831.svg+xml'; // Path from original HTML
    timeLi.append(timeIcon);
    const timeSpan = document.createElement('span');
    timeSpan.classList.add('recipe-card__time', 'text-dark-gray-100', 'font-14', 'font-xl-default', 'leading-20', 'fw-medium', 'ms-2', 'd-inline-block', 'text-nowrap');
    timeSpan.textContent = timeCell.textContent.trim();
    timeLi.append(timeSpan);
    propertiesUl.append(timeLi);

    const servesLi = document.createElement('li');
    servesLi.classList.add('recipe-card__property', 'recipe-card__property--right', 'flex-fill', 'd-flex', 'align-items-center', 'justify-content-end');
    const servesIcon = document.createElement('img');
    servesIcon.alt = 'svg file';
    servesIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1776254210129.svg+xml'; // Path from original HTML
    servesLi.append(servesIcon);
    const servesSpan = document.createElement('span');
    servesSpan.classList.add('serve-content', 'recipe-card__serves', 'text-dark-gray-100', 'font-14', 'font-xl-default', 'leading-20', 'fw-medium', 'ms-2', 'd-inline-block');
    servesSpan.textContent = servesCell.textContent.trim();
    servesLi.append(servesSpan);
    propertiesUl.append(servesLi);

    contentDiv.append(propertiesUl);
    link.append(contentDiv);
    recipeCard.append(link);
    swiperSlide.append(recipeCard);
    swiperWrapper.append(swiperSlide);
  });

  swiperContainer.append(swiperWrapper);
  swiperSection.append(swiperContainer);

  const prevButton = document.createElement('button');
  prevButton.classList.add('card-carousel__swiper--prev', 'card-carousel__navigation', 'cursor-pointer', 'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover', 'justify-content-center', 'align-items-center', 'position-absolute', 'd-none', 'd-sm-flex');
  const prevIcon = document.createElement('img');
  prevIcon.alt = 'svg file';
  prevIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1776254209462.svg+xml'; // Path from original HTML
  prevButton.append(prevIcon);
  swiperSection.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('card-carousel__swiper--next', 'card-carousel__navigation', 'cursor-pointer', 'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover', 'justify-content-center', 'align-items-center', 'position-absolute', 'end-0', 'd-none', 'd-sm-flex');
  const nextIcon = document.createElement('img');
  nextIcon.alt = 'svg file';
  nextIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1776254209462.svg+xml'; // Path from original HTML
  nextButton.append(nextIcon);
  swiperSection.append(nextButton);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('card-carousel__swiper--pagination', 'mt-10', 'cursor-pointer', 'position-relative', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal', 'mx-auto', 'w-fit');
  swiperSection.append(paginationDiv);

  block.append(swiperSection);

  // Add the "View All" button as per the original HTML
  const viewAllWrapper = document.createElement('div');
  viewAllWrapper.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-8');
  const viewAllLink = document.createElement('a');
  viewAllLink.classList.add('svasti-cta', 'cta-analytics', 'w-fit', 'text-decoration-none', 'd-flex', 'align-items-center', 'primary', 'px-8', 'pb-3', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
  viewAllLink.href = 'https://aashirvaadsvasti.in/our-recipe.html';
  const viewAllLabel = document.createElement('span');
  viewAllLabel.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  viewAllLabel.textContent = 'View All';
  viewAllLink.append(viewAllLabel);
  viewAllWrapper.append(viewAllLink);
  block.append(viewAllWrapper);

  // Initialize Swiper
  const swiper = new Swiper(swiperSection, {
    loop: swiperSection.dataset.loop === 'true',
    slidesPerView: 1,
    spaceBetween: 34,
    navigation: {
      nextEl: prevButton, // Corrected to match original HTML's prev/next button classes
      prevEl: nextButton,
    },
    pagination: {
      el: paginationDiv,
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
  });

  // Add event listeners for navigation buttons
  prevButton.addEventListener('click', () => {
    swiper.slidePrev();
  });

  nextButton.addEventListener('click', () => {
    swiper.slideNext();
  });
}
