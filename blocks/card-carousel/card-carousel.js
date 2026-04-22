import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    subtitleRow,
    prevButtonIconRow,
    nextButtonIconRow,
    ...productCardRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('card-carousel');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0');
  section.append(containerDiv);

  if (titleRow) {
    const title = document.createElement('h2');
    moveInstrumentation(titleRow, title);
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
    title.textContent = titleRow.firstElementChild.textContent.trim();
    containerDiv.append(title);
  }

  if (subtitleRow) {
    const subtitle = document.createElement('p');
    moveInstrumentation(subtitleRow, subtitle);
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
    subtitle.textContent = subtitleRow.firstElementChild.textContent.trim();
    containerDiv.append(subtitle);
  }

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('card-carousel__swiper', 'swiper', 'container', 'gx-0');
  swiperContainer.setAttribute('data-loop', 'false');
  section.append(swiperContainer);

  const swiperInnerContainer = document.createElement('div');
  swiperInnerContainer.classList.add('card-carousel__swiper--container', 'mt-8', 'mt-sm-10');
  swiperContainer.append(swiperInnerContainer);

  const productCardsWrapper = document.createElement('div');
  productCardsWrapper.classList.add(
    'product-cards__card-container',
    'mx-4',
    'mx-sm-0',
    'overflow-hidden',
    'add-margin',
  );
  swiperInnerContainer.append(productCardsWrapper);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'slide-in-anim');
  productCardsWrapper.append(swiperWrapper);

  productCardRows.forEach((row) => {
    // Use content detection instead of index access for robustness
    const cells = [...row.children];
    const mainImageCell = cells.find((cell) => cell.querySelector('picture'));
    const cardTitleCell = cells.find((cell) => cell.innerHTML.includes('<p>') && !cell.querySelector('picture') && !cell.querySelector('a'));
    const productImageCell = cells.filter((cell) => cell.querySelector('picture'))[1]; // Second picture cell
    const productLinkCell = cells.find((cell) => cell.querySelector('a') && cell.textContent.includes('/content/site/productLink'));
    const ctaLabelCell = cells.find((cell) => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() === 'CTA Label label text');
    const ctaLinkCell = cells.find((cell) => cell.querySelector('a') && cell.textContent.includes('/content/site/ctaLink'));

    const card = document.createElement('div');
    card.classList.add('product-cards__card', 'swiper-slide', 'd-flex', 'flex-column', 'cursor-pointer');
    moveInstrumentation(row, card);

    const media = document.createElement('div');
    media.classList.add('product-cards__card-media', 'position-relative');
    card.append(media);

    const ratioDiv = document.createElement('div');
    ratioDiv.classList.add('ratio', 'ratio-3x4', 'position-relative', 'product-cards__card-video-wrapper');
    media.append(ratioDiv);

    if (mainImageCell) {
      const picture = mainImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('product-cards__card-thumb', 'object-fit-cover');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        ratioDiv.append(optimizedPic);
      }
    }

    const cardGradient = document.createElement('div');
    cardGradient.classList.add('card-gradient', 'position-absolute', 'top-0', 'bottom-0', 'start-0', 'end-0');
    media.append(cardGradient);

    if (cardTitleCell) {
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
      moveInstrumentation(cardTitleCell, cardTitle); // Move instrumentation for richtext
      cardTitle.innerHTML = cardTitleCell.innerHTML;
      media.append(cardTitle);
    }

    const cardImgDiv = document.createElement('div');
    cardImgDiv.classList.add(
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
    media.append(cardImgDiv);

    const ratio1x1Div = document.createElement('div');
    ratio1x1Div.classList.add('ratio', 'ratio-1x1');
    cardImgDiv.append(ratio1x1Div);

    if (productImageCell && productLinkCell) {
      const productLink = document.createElement('a');
      productLink.classList.add('cta-analytics');
      const foundLink = productLinkCell.querySelector('a');
      if (foundLink) {
        productLink.href = foundLink.href; // Read href for aem-content
        moveInstrumentation(foundLink, productLink); // Move instrumentation for the link
      }

      const picture = productImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-contain');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        productLink.append(optimizedPic);
      }
      ratio1x1Div.append(productLink);
    }

    if (ctaLinkCell && ctaLabelCell) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('mt-6', 'align-self-center');
      card.append(ctaWrapper);

      const ctaLink = document.createElement('a');
      const foundCtaLink = ctaLinkCell.querySelector('a');
      if (foundCtaLink) {
        ctaLink.href = foundCtaLink.href; // Read href for aem-content
        moveInstrumentation(foundCtaLink, ctaLink); // Move instrumentation for the link
      }
      ctaLink.classList.add(
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
      ctaLink.textContent = ctaLabelCell.textContent.trim();
      ctaWrapper.append(ctaLink);
    }
    swiperWrapper.append(card);
  });

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
    'opacity-30',
  );
  if (prevButtonIconRow) {
    const picture = prevButtonIconRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      prevButton.append(optimizedPic);
    }
  }
  prevButton.disabled = true;
  swiperInnerContainer.append(prevButton);

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
  if (nextButtonIconRow) {
    const picture = nextButtonIconRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      nextButton.append(optimizedPic);
    }
  }
  swiperInnerContainer.append(nextButton);

  const pagination = document.createElement('div');
  pagination.classList.add(
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
  swiperContainer.append(pagination);

  block.replaceChildren(section);

  // Initialize Swiper (simplified for EDS, no actual Swiper library loaded)
  let currentIndex = 0;
  const slides = swiperWrapper.querySelectorAll('.swiper-slide');
  // Calculate slideWidth dynamically, considering potential margins
  const firstSlide = slides[0];
  let slideWidth = 0;
  if (firstSlide) {
    const style = window.getComputedStyle(firstSlide);
    slideWidth = firstSlide.offsetWidth + parseFloat(style.marginRight);
  }

  const updateCarousel = () => {
    swiperWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    prevButton.disabled = currentIndex === 0;
    // Assuming 1 slide visible at a time, adjust for multiple visible slides if needed
    nextButton.disabled = currentIndex >= slides.length - 1;
  };

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  updateCarousel(); // Initial state
}
