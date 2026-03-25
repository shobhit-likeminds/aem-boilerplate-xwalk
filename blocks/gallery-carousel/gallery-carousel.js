import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const allRows = [...block.children];
  // The first row is the container field "Slides", actual items start from the second row
  // BlockJson indicates one root field "slides" which is a container.
  // So block.children[0] corresponds to the "slides" container.
  // The actual item rows are children of this container, not direct children of the block.
  // Therefore, we need to get the children of the first row (the container).
  const itemRows = allRows[0] ? [...allRows[0].children] : [];

  const carouselId = `gallery-carousel-${Math.random().toString(36).substring(2, 11)}`;
  block.id = carouselId;
  block.classList.add('gallery', 'carousel', 'slide', 'flexslider', 'optionset-slider');
  block.setAttribute('data-ride', 'carousel');

  const indicators = document.createElement('ol');
  indicators.classList.add(
    'carousel-indicators',
    'slick--skin--asnavfor',
    'slick--optionset--x-slick-nav',
    'slick--thumbnail',
    'slick__slider',
    'slick-initialized',
    'slick-slider',
  );

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner', 'slides', 'slick-list');

  itemRows.forEach((row, index) => {
    // BlockJson for gallery-carousel-item has 3 fields: image, title, body
    const [imageCell, titleCell, bodyCell] = [...row.children];

    // Create indicator
    const indicatorLi = document.createElement('li');
    indicatorLi.setAttribute('data-target', `#${carouselId}`);
    indicatorLi.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicatorLi.classList.add('active');
    }

    const indicatorImg = imageCell.querySelector('picture img');
    if (indicatorImg) {
      const optimizedIndicatorPic = createOptimizedPicture(indicatorImg.src, indicatorImg.alt, false, [{ width: '99' }]);
      moveInstrumentation(indicatorImg, optimizedIndicatorPic.querySelector('img'));
      indicatorLi.append(optimizedIndicatorPic);
      indicatorLi.querySelector('img').classList.add('img-responsive');
    }
    indicators.append(indicatorLi);

    // Create carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    // The original HTML has classes like gallery-carousel-69c3c0e82abbb-0.
    // However, dynamic class names based on block ID and index are not allowed
    // as they are not present in the allowlist. We should only use static classes.
    // The core carousel functionality relies on 'carousel-item' and 'active'.
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const slideContent = document.createElement('div');
    slideContent.classList.add('slide__content');

    const slideCaption = document.createElement('div');
    slideCaption.classList.add('slide__caption');

    const slideTitleWrapper = document.createElement('h2');
    slideTitleWrapper.classList.add('slide__title');

    const imageContentWrapperBox = document.createElement('div');
    imageContentWrapperBox.classList.add('image-content-wrapper-box');

    const mainImagePicture = imageCell.querySelector('picture');
    if (mainImagePicture) {
      const mainImageImg = mainImagePicture.querySelector('img');
      const optimizedMainPic = createOptimizedPicture(mainImageImg.src, mainImageImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(mainImageImg, optimizedMainPic.querySelector('img'));
      imageContentWrapperBox.append(optimizedMainPic);
      optimizedMainPic.querySelector('img').classList.add('img-responsive');
    }

    const imageContentBox = document.createElement('div');
    imageContentBox.classList.add('image-content-box');

    const imageContent = document.createElement('div');
    imageContent.classList.add('image-content');

    const ingrTitle = document.createElement('h6');
    ingrTitle.classList.add('ingrTitle');
    ingrTitle.textContent = 'INGREDIENTS'; // Hardcoded based on original HTML

    const titleEl = document.createElement('h5');
    titleEl.classList.add('title');
    moveInstrumentation(titleCell, titleEl);
    while (titleCell.firstChild) titleEl.append(titleCell.firstChild);

    const fieldSubTitle = document.createElement('h3');
    fieldSubTitle.classList.add('field_sub_title'); // Empty in original HTML, but present

    const bodyEl = document.createElement('div');
    bodyEl.classList.add('body');
    moveInstrumentation(bodyCell, bodyEl);
    while (bodyCell.firstChild) bodyEl.append(bodyCell.firstChild);

    imageContent.append(ingrTitle, titleEl, fieldSubTitle, bodyEl);
    imageContentBox.append(imageContent);
    imageContentWrapperBox.append(imageContentBox);
    slideTitleWrapper.append(imageContentWrapperBox);
    slideCaption.append(slideTitleWrapper);
    slideContent.append(slideCaption);
    carouselItem.append(slideContent);
    carouselInner.append(carouselItem);

    // Move instrumentation from the original row to the new carousel item
    moveInstrumentation(row, carouselItem);
  });

  block.textContent = '';
  block.append(indicators, carouselInner);

  // Add event listeners for carousel functionality
  let currentSlide = 0;
  const carouselItems = [...carouselInner.children];
  const indicatorItems = [...indicators.children];

  function showSlide(index) {
    carouselItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    indicatorItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    currentSlide = index;
  }

  indicators.addEventListener('click', (event) => {
    const targetLi = event.target.closest('li');
    if (targetLi) {
      const slideTo = parseInt(targetLi.getAttribute('data-slide-to'), 10);
      if (!isNaN(slideTo)) {
        showSlide(slideTo);
      }
    }
  });
}
