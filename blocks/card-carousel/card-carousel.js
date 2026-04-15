import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    subtitleRow,
    ctaLinkRow,
    ctaLinkLabelRow,
    ...cardRows
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('container', 'gx-8', 'gx-sm-0');

  const titleText = titleRow?.firstElementChild?.textContent.trim();
  if (titleText) {
    const h2 = document.createElement('h2');
    h2.classList.add(
      'card-carousel__title',
      'font-24',
      'leading-28',
      'font-sm-40',
      'leading-sm-50',
      'text-dark-gray-100',
      'text-center',
      'font-baskerville',
    );
    moveInstrumentation(titleRow, h2);
    h2.textContent = titleText;
    block.append(h2);
  }

  const subtitleText = subtitleRow?.firstElementChild?.textContent.trim();
  if (subtitleText) {
    const p = document.createElement('p');
    p.classList.add(
      'card-carousel__subtitle',
      'font-default',
      'leading-24',
      'font-sm-18',
      'leading-sm-32',
      'text-dark-gray-100',
      'text-center',
      'mt-4',
      'fw-medium',
    );
    moveInstrumentation(subtitleRow, p);
    p.textContent = subtitleText;
    block.append(p);
  }

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'true');

  const swiperWrapperContainer = document.createElement('div');
  swiperWrapperContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'popular-recipe__recipe-wrapper');

  cardRows.forEach((row) => {
    const [
      imageCell,
      imageAltCell,
      linkCell,
      linkLabelCell,
      titleCell,
      descriptionCell,
      timeCell,
      servesCell,
    ] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    moveInstrumentation(row, slide);

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card', 'bg-cream-100', 'h-100');

    const recipeLink = document.createElement('a');
    recipeLink.classList.add('recipe-card__link', 'd-block', 'position-relative');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      recipeLink.href = foundLink.href;
    }

    const picture = imageCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, imageAltCell?.textContent.trim() || img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('recipe-card__image', 'object-fit-cover', 'w-100');
      moveInstrumentation(picture, optimizedPic.querySelector('img'));
      recipeLink.append(optimizedPic);
    }

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('recipe-card__content', 'py-6');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('recipe-card__info', 'd-flex', 'align-items-center', 'justify-content-between');

    const tagSpan = document.createElement('span');
    tagSpan.classList.add(
      'recipe-card__tag',
      'text-uppercase',
      'text-red-100',
      'font-14',
      'font-xl-default',
      'leading-24',
      'fw-semibold',
    );
    infoDiv.append(tagSpan);

    const textDiv = document.createElement('div');
    textDiv.classList.add('recipe-card__text');

    const h3 = document.createElement('h3');
    h3.classList.add(
      'recipe-card__title',
      'font-20',
      'font-xl-24',
      'leading-24',
      'leading-xl-30',
      'font-baskerville',
      'fw-bold',
      'text-dark-gray-100',
      'mt-4',
    );
    h3.textContent = titleCell?.textContent.trim();
    textDiv.append(h3);

    const descP = document.createElement('p');
    descP.classList.add(
      'recipe-card__desc',
      'font-default',
      'font-xl-18',
      'leading-24',
      'fw-medium',
      'text-dark-gray-100',
      'mt-4',
    );
    descP.textContent = descriptionCell?.textContent.trim();
    textDiv.append(descP);

    contentDiv.append(infoDiv, textDiv);

    const waveDiv = document.createElement('div');
    waveDiv.classList.add('recipe-card__wave', 'mt-11', 'mt-xl-7', 'w-100');
    contentDiv.append(waveDiv);

    const propertiesUl = document.createElement('ul');
    propertiesUl.classList.add('recipe-card__properties', 'mt-4', 'd-flex', 'align-items-center');

    const timeLi = document.createElement('li');
    timeLi.classList.add('recipe-card__property', 'recipe-card__property--left', 'd-flex', 'align-items-center');

    const timeSpan = document.createElement('span');
    timeSpan.classList.add(
      'recipe-card__time',
      'text-dark-gray-100',
      'font-14',
      'font-xl-default',
      'leading-20',
      'fw-medium',
      'ms-2',
      'd-inline-block',
      'text-nowrap',
    );
    timeSpan.textContent = timeCell?.textContent.trim();
    timeLi.append(timeSpan);
    propertiesUl.append(timeLi);

    const servesLi = document.createElement('li');
    servesLi.classList.add(
      'recipe-card__property',
      'recipe-card__property--right',
      'flex-fill',
      'd-flex',
      'align-items-center',
      'justify-content-end',
    );

    const servesSpan = document.createElement('span');
    servesSpan.classList.add(
      'serve-content',
      'recipe-card__serves',
      'text-dark-gray-100',
      'font-14',
      'font-xl-default',
      'leading-20',
      'fw-medium',
      'ms-2',
      'd-inline-block',
    );
    servesSpan.textContent = servesCell?.textContent.trim();
    servesLi.append(servesSpan);
    propertiesUl.append(servesLi);

    contentDiv.append(propertiesUl);
    recipeLink.append(contentDiv);
    recipeCard.append(recipeLink);
    slide.append(recipeCard);
    swiperWrapper.append(slide);
  });

  swiperWrapperContainer.append(swiperWrapper);
  swiperContainer.append(swiperWrapperContainer);
  block.append(swiperContainer);

  const prevButton = document.createElement('button');
  prevButton.classList.add(
    'card-carousel__swiper--prev',
    'card-carousel__navigation',
    'cursor-pointer',
    'rounded-circle',
    'bg-transparent',
    'text-red-100',
    'text-maroon-600-hover',
    'justify-content-center',
    'align-items-center',
    'position-absolute',
    'd-none',
    'd-sm-flex',
  );
  // Add an image for the navigation button if needed, from a block cell if available
  // For now, it's empty as per the original HTML structure for the button itself.
  swiperWrapperContainer.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add(
    'card-carousel__swiper--next',
    'card-carousel__navigation',
    'cursor-pointer',
    'rounded-circle',
    'bg-transparent',
    'text-red-100',
    'text-maroon-600-hover',
    'justify-content-center',
    'align-items-center',
    'position-absolute',
    'end-0',
    'd-none',
    'd-sm-flex',
  );
  // Add an image for the navigation button if needed, from a block cell if available
  swiperWrapperContainer.append(nextButton);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add(
    'card-carousel__swiper--pagination',
    'mt-10',
    'cursor-pointer',
    'position-relative',
    'swiper-pagination-clickable',
    'swiper-pagination-bullets',
    'swiper-pagination-horizontal',
    'mx-auto',
    'w-fit',
  );
  paginationDiv.style.width = '140px';
  swiperContainer.append(paginationDiv);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-8');

  const ctaAnchor = document.createElement('a');
  ctaAnchor.classList.add(
    'svasti-cta',
    'cta-analytics',
    'w-fit',
    'text-decoration-none',
    'd-flex',
    'align-items-center',
    'primary',
    'px-8',
    'pb-3',
    'text-cream-100',
    'border',
    'border-2',
    'border-red-100',
    'border-maroon-100-hover',
    'border-red-300-active',
    'bg-red-100',
    'bg-maroon-100-hover',
    'bg-red-300-active',
  );
  const ctaHref = ctaLinkRow?.querySelector('a')?.href;
  if (ctaHref) {
    ctaAnchor.href = ctaHref;
  } else {
    ctaAnchor.href = '#';
  }

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaLabelSpan.textContent = ctaLinkLabelRow?.firstElementChild?.textContent.trim();
  moveInstrumentation(ctaLinkLabelRow, ctaLabelSpan);
  ctaAnchor.append(ctaLabelSpan);
  moveInstrumentation(ctaLinkRow, ctaAnchor);
  ctaWrapper.append(ctaAnchor);
  block.append(ctaWrapper);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Initialize Swiper
  import('swiper').then(async (module) => {
    const Swiper = module.default;
    const swiper = new Swiper(swiperContainer, {
      loop: swiperContainer.dataset.loop === 'true',
      slidesPerView: 1,
      spaceBetween: 34, // Based on original HTML margin-right
      breakpoints: {
        768: {
          slidesPerView: 3,
          spaceBetween: 34,
        },
      },
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      pagination: {
        el: paginationDiv,
        clickable: true,
      },
    });

    // Add event listeners for navigation buttons
    prevButton.addEventListener('click', () => {
      swiper.slidePrev();
    });

    nextButton.addEventListener('click', () => {
      swiper.slideNext();
    });
  });
}
