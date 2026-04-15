import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  const [titleRow, subtitleRow, ctaLinkRow, ctaLabelRow, ...cardRows] = rows;

  block.classList.add('card-carousel');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0');

  const title = document.createElement('h2');
  title.classList.add('card-carousel__title', 'font-24', 'leading-28', 'font-sm-40', 'leading-sm-50', 'text-dark-gray-100', 'text-center', 'font-baskerville');
  moveInstrumentation(titleRow.firstElementChild, title);
  title.textContent = titleRow.firstElementChild.textContent.trim();
  containerDiv.append(title);

  const subtitle = document.createElement('p');
  subtitle.classList.add('card-carousel__subtitle', 'font-default', 'leading-24', 'font-sm-18', 'leading-sm-32', 'text-dark-gray-100', 'text-center', 'mt-4', 'fw-medium');
  moveInstrumentation(subtitleRow.firstElementChild, subtitle);
  subtitle.textContent = subtitleRow.firstElementChild.textContent.trim();
  containerDiv.append(subtitle);

  block.append(containerDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'true');

  const swiperWrapperContainer = document.createElement('div');
  swiperWrapperContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

  const popularRecipeSection = document.createElement('section');
  popularRecipeSection.classList.add('popular-recipe', 'slide-in-anim');

  const popularRecipeContainer = document.createElement('div');
  popularRecipeContainer.classList.add('popular-recipe__container', 'overflow-hidden');
  popularRecipeContainer.setAttribute('data-swiper-init-async', 'true');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');

  cardRows.forEach((row) => {
    const [imageCell, titleCell, descriptionCell, timeCell, servesCell, linkCell, linkLabelCell] = [...row.children];

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    moveInstrumentation(row, swiperSlide);

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');

    const cardLink = document.createElement('a');
    cardLink.classList.add('recipe-card__link', 'd-block', 'position-relative');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      cardLink.href = foundLink.href;
    }

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
      moveInstrumentation(img, optimizedImg);
      cardLink.append(optimizedPic);
    }

    const cardContent = document.createElement('div');
    cardContent.classList.add('recipe-card__content', 'py-6');

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('recipe-card__info', 'd-flex', 'align-items-center', 'justify-content-between');
    const cardTag = document.createElement('span');
    cardTag.classList.add('recipe-card__tag', 'text-uppercase', 'text-red-100', 'font-14', 'font-xl-default', 'leading-24', 'fw-semibold');
    cardInfo.append(cardTag);
    cardContent.append(cardInfo);

    const cardText = document.createElement('div');
    cardText.classList.add('recipe-card__text');
    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('recipe-card__title', 'font-20', 'font-xl-24', 'leading-24', 'leading-xl-30', 'font-baskerville', 'fw-bold', 'text-dark-gray-100', 'mt-4');
    cardTitle.textContent = titleCell.textContent.trim();
    cardText.append(cardTitle);

    const cardDesc = document.createElement('p');
    cardDesc.classList.add('recipe-card__desc', 'font-default', 'font-xl-18', 'leading-24', 'fw-medium', 'text-dark-gray-100', 'mt-4');
    cardDesc.textContent = descriptionCell.textContent.trim();
    cardText.append(cardDesc);
    cardContent.append(cardText);

    const cardWave = document.createElement('div');
    cardWave.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
    cardContent.append(cardWave);

    const cardProperties = document.createElement('ul');
    cardProperties.classList.add('recipe-card__properties', 'mt-4', 'd-flex', 'align-items-center'); // Corrected class name

    const timeProperty = document.createElement('li');
    timeProperty.classList.add('recipe-card__property', 'recipe-card__property--left', 'd-flex', 'align-items-center');
    const timeSpan = document.createElement('span');
    timeSpan.classList.add('recipe-card__time', 'text-dark-gray-100', 'font-14', 'font-xl-default', 'leading-20', 'fw-medium', 'ms-2', 'd-inline-block', 'text-nowrap');
    timeSpan.textContent = timeCell.textContent.trim();
    timeProperty.append(timeSpan);
    cardProperties.append(timeProperty);

    const servesProperty = document.createElement('li');
    servesProperty.classList.add('recipe-card__property', 'recipe-card__property--right', 'flex-fill', 'd-flex', 'align-items-center', 'justify-content-end');
    const servesSpan = document.createElement('span');
    servesSpan.classList.add('serve-content', 'recipe-card__serves', 'text-dark-gray-100', 'font-14', 'font-xl-default', 'leading-20', 'fw-medium', 'ms-2', 'd-inline-block');
    servesSpan.textContent = servesCell.textContent.trim();
    servesProperty.append(servesSpan);
    cardProperties.append(servesProperty);

    cardContent.append(cardProperties);
    cardLink.append(cardContent);
    recipeCard.append(cardLink);
    swiperSlide.append(recipeCard);
    swiperWrapper.append(swiperSlide);
  });

  popularRecipeContainer.append(swiperWrapper);
  popularRecipeSection.append(popularRecipeContainer);
  swiperWrapperContainer.append(popularRecipeSection);
  swiperContainer.append(swiperWrapperContainer);

  const prevButton = document.createElement('button');
  prevButton.classList.add('card-carousel__swiper--prev', 'card-carousel__navigation', 'cursor-pointer', 'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover', 'justify-content-center', 'align-items-center', 'position-absolute', 'd-none', 'd-sm-flex');
  const prevImg = document.createElement('img');
  prevImg.alt = 'svg file';
  // The original HTML uses a specific SVG for navigation buttons.
  // Since we cannot hardcode DAM paths, and the model does not provide a field for these icons,
  // we will omit the src attribute for these generated icons.
  // In a real scenario, these would either come from a model field or be handled by CSS.
  prevButton.append(prevImg);
  swiperWrapperContainer.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('card-carousel__swiper--next', 'card-carousel__navigation', 'cursor-pointer', 'rounded-circle', 'bg-transparent', 'text-red-100', 'text-maroon-600-hover', 'justify-content-center', 'align-items-center', 'position-absolute', 'end-0', 'd-none', 'd-sm-flex');
  const nextImg = document.createElement('img');
  nextImg.alt = 'svg file';
  nextButton.append(nextImg);
  swiperWrapperContainer.append(nextButton);

  const pagination = document.createElement('div');
  pagination.classList.add('card-carousel__swiper--pagination', 'mt-10', 'cursor-pointer', 'position-relative', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal', 'mx-auto', 'w-fit');
  swiperContainer.append(pagination);

  block.append(swiperContainer);

  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-8');

  const ctaAnchor = document.createElement('a');
  ctaAnchor.classList.add('svasti-cta', 'cta-analytics', 'w-fit', 'text-decoration-none', 'd-flex', 'align-items-center', 'primary', 'px-8', 'pb-3', 'text-cream-100', 'border', 'border-2', 'border-red-100', 'border-maroon-100-hover', 'border-red-300-active', 'bg-red-100', 'bg-maroon-100-hover', 'bg-red-300-active');
  const foundCtaLink = ctaLinkRow.querySelector('a');
  if (foundCtaLink) {
    ctaAnchor.href = foundCtaLink.href;
  }

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaLabelSpan.textContent = ctaLabelRow.firstElementChild.textContent.trim();
  ctaAnchor.append(ctaLabelSpan);
  moveInstrumentation(ctaLinkRow, ctaAnchor);
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);
  ctaDiv.append(ctaAnchor);

  block.append(ctaDiv);

  // Add event listeners for carousel navigation
  // These will typically interact with a Swiper instance initialized by data-swiper-init-async
  // For now, we'll add placeholder listeners. The actual Swiper API calls would go here.
  prevButton.addEventListener('click', () => {
    // Logic to navigate to the previous slide
    // e.g., if (window.swiperInstance) swiperInstance.slidePrev();
    console.log('Previous button clicked');
  });

  nextButton.addEventListener('click', () => {
    // Logic to navigate to the next slide
    // e.g., if (window.swiperInstance) swiperInstance.slideNext();
    console.log('Next button clicked');
  });


  // Clean up original block content
  rows.forEach((row) => row.remove());
}
