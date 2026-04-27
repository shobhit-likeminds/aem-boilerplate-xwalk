import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [titleRow, subtitleRow, ...cardRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('card-carousel');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0');

  const title = document.createElement('h2');
  title.classList.add(
    'card-carousel__title',
    'font-24',
    'leading-28',
    'font-sm-40',
    'leading-sm-50',
    'text-dark-gray-100',
    'text-center',
    'font-baskerville',
  );
  moveInstrumentation(titleRow, title);
  title.textContent = titleRow.textContent.trim();
  containerDiv.append(title);

  const subtitle = document.createElement('p');
  subtitle.classList.add(
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
  moveInstrumentation(subtitleRow, subtitle);
  subtitle.textContent = subtitleRow.textContent.trim();
  containerDiv.append(subtitle);
  section.append(containerDiv);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'false');

  const swiperInnerContainer = document.createElement('div');
  swiperInnerContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'slide-in-anim');

  cardRows.forEach((row) => {
    const [mainImageCell, headlineCell, secondaryImageCell, secondaryImageLinkCell, ctaLinkCell, ctaLabelCell] = [...row.children];

    const card = document.createElement('div');
    card.classList.add('product-cards__card', 'swiper-slide', 'd-flex', 'flex-column', 'cursor-pointer');
    moveInstrumentation(row, card);

    const media = document.createElement('div');
    media.classList.add('product-cards__card-media', 'position-relative');

    const ratioWrapper = document.createElement('div');
    ratioWrapper.classList.add('ratio', 'ratio-3x4', 'position-relative', 'product-cards__card-video-wrapper');

    const mainPicture = mainImageCell.querySelector('picture');
    if (mainPicture) {
      const img = mainPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      ratioWrapper.append(optimizedPic);
    }

    const cardGradient = document.createElement('div');
    cardGradient.classList.add('card-gradient', 'position-absolute', 'top-0', 'bottom-0', 'start-0', 'end-0');
    ratioWrapper.append(cardGradient);
    media.append(ratioWrapper);

    const cardTitle = document.createElement('div');
    cardTitle.classList.add(
      'product-cards__card-title',
      'position-absolute',
      'top-0',
      'text-white',
      'px-5',
      'pt-4',
      'text-cream-100',
      'leading-32',
    );
    cardTitle.innerHTML = headlineCell.innerHTML;
    media.append(cardTitle);

    const cardImg = document.createElement('div');
    cardImg.classList.add(
      'product-cards__card-img',
      'pt-lg-8',
      'pt-sm-6',
      'pt-8',
      'pb-3',
      'bg-cream-300',
      'position-absolute',
      'start-50',
      'top-100',
      'rounded-top-circle',
    );

    const ratio1x1 = document.createElement('div');
    ratio1x1.classList.add('ratio', 'ratio-1x1');

    const secondaryLink = document.createElement('a');
    secondaryLink.classList.add('cta-analytics');
    const secondaryFoundLink = secondaryImageLinkCell.querySelector('a');
    if (secondaryFoundLink) {
      secondaryLink.href = secondaryFoundLink.href;
    }

    const secondaryPicture = secondaryImageCell.querySelector('picture');
    if (secondaryPicture) {
      const img = secondaryPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-contain');
      secondaryLink.append(optimizedPic);
    }
    ratio1x1.append(secondaryLink);
    cardImg.append(ratio1x1);
    media.append(cardImg);
    card.append(media);

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('mt-6', 'align-self-center');

    const cta = document.createElement('a');
    cta.classList.add(
      'cta-analytics',
      'svasti-cta',
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
    const ctaFoundLink = ctaLinkCell.querySelector('a');
    if (ctaFoundLink) {
      cta.href = ctaFoundLink.href;
    }
    cta.textContent = ctaLabelCell.textContent.trim();
    ctaWrapper.append(cta);
    card.append(ctaWrapper);

    swiperWrapper.append(card);
  });

  swiperInnerContainer.append(swiperWrapper);

  const prevBtn = document.createElement('button');
  prevBtn.classList.add(
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
    'opacity-30',
  );
  prevBtn.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1777284081757.svg+xml"/>'; // Path from ORIGINAL HTML
  swiperInnerContainer.append(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.classList.add(
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
  nextBtn.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1777284081757.svg+xml"/>'; // Path from ORIGINAL HTML
  swiperInnerContainer.append(nextBtn);

  swiperContainer.append(swiperInnerContainer);

  const paginationEl = document.createElement('div');
  paginationEl.classList.add(
    'card-carousel__swiper--pagination',
    'mt-10',
    'cursor-pointer',
    'position-relative',
    'mx-auto',
    'w-fit',
  );
  swiperContainer.append(paginationEl);

  section.append(swiperContainer);
  block.replaceChildren(section);

  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(swiperContainer, {
    slidesPerView: 'auto',
    spaceBetween: 32,
    loop: swiperContainer.dataset.loop === 'true',
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    pagination: {
      el: paginationEl,
      clickable: true,
    },
    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
  });
}
