import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const backgroundImageRow = children[0];
  const headingRow = children[1];
  const greetingMorningRow = children[2];
  const greetingAfternoonRow = children[3];
  const greetingEveningRow = children[4];
  const greetingNightRow = children[5];
  const introTextRow = children[6];
  const errorMessageRow = children[7];

  const questionRows = children.filter((row) => row.children.length === 1 && row.querySelector('div'));
  const optionRows = children.filter((row) => row.children.length === 2 && row.querySelector('picture'));

  const root = document.createElement('section');
  root.classList.add('grid-container', 'animate-enter', 'in-view');
  root.setAttribute('data-api-url', 'https://www.nescafe.com/in/nc/cprofiler-status'); // From original HTML

  const dummyBg1 = document.createElement('div');
  dummyBg1.classList.add('bg--paper-blue', 'dummy-to-load-bg');
  root.append(dummyBg1);

  const dummyBg2 = document.createElement('div');
  dummyBg2.classList.add('bg--paper-white-heavy', 'dummy-to-load-bg');
  root.append(dummyBg2);

  const parallaxBgContainer = document.createElement('div');
  parallaxBgContainer.classList.add('parallax-bg-img-container');
  root.append(parallaxBgContainer);

  const parallaxImg = document.createElement('div');
  parallaxImg.classList.add('parallax-img', 'lazyLoadedImage');
  moveInstrumentation(backgroundImageRow, parallaxImg);
  const bgPicture = backgroundImageRow.querySelector('picture');
  if (bgPicture) {
    const imgSrc = bgPicture.querySelector('img')?.src;
    if (imgSrc) {
      parallaxImg.style.backgroundImage = `url('${imgSrc}')`;
    }
  }
  parallaxBgContainer.append(parallaxImg);

  const maxWidthContainer = document.createElement('div');
  maxWidthContainer.classList.add('max-width-container', 'grid-x');
  root.append(maxWidthContainer);

  const headerCellWrapper = document.createElement('div');
  headerCellWrapper.classList.add('cell', 'small-12', 'medium-offset-1', 'medium-10', 'xlarge-offset-2', 'xlarge-8', 'padding-x');
  maxWidthContainer.append(headerCellWrapper);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'animate-enter-fade-up-short', 'animate-delay-3');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.children[0]?.textContent.trim();
  headerCellWrapper.append(heading);

  const introInfo = document.createElement('div');
  introInfo.classList.add('intro-info', 'animate-enter-fade', 'animate-delay-1', 'no-avatar-image');
  headerCellWrapper.append(introInfo);

  const greetingsContainer = document.createElement('div');
  greetingsContainer.classList.add('greetings-container', 'headline-h4', 'animate-enter-fade-up-short', 'animate-delay-3', 'stagger-1');
  introInfo.append(greetingsContainer);

  const greetingMorning = document.createElement('span');
  greetingMorning.classList.add('hide', 'greeting--morning');
  moveInstrumentation(greetingMorningRow, greetingMorning);
  greetingMorning.textContent = greetingMorningRow.children[0]?.textContent.trim();
  greetingsContainer.append(greetingMorning);

  const greetingAfternoon = document.createElement('span');
  greetingAfternoon.classList.add('hide', 'greeting--afternoon');
  moveInstrumentation(greetingAfternoonRow, greetingAfternoon);
  greetingAfternoon.textContent = greetingAfternoonRow.children[0]?.textContent.trim();
  greetingsContainer.append(greetingAfternoon);

  const greetingEvening = document.createElement('span');
  greetingEvening.classList.add('hide', 'greeting--evening');
  moveInstrumentation(greetingEveningRow, greetingEvening);
  greetingEvening.textContent = greetingEveningRow.children[0]?.textContent.trim();
  greetingsContainer.append(greetingEvening);

  const greetingNight = document.createElement('span');
  greetingNight.classList.add('greeting--night'); // Note: original HTML has this visible, not hidden
  moveInstrumentation(greetingNightRow, greetingNight);
  greetingNight.textContent = greetingNightRow.children[0]?.textContent.trim();
  greetingsContainer.append(greetingNight);

  const guideText = document.createElement('div');
  guideText.classList.add('guide-text', 'labelMediumRegular', 'animate-enter-fade-up-short', 'animate-delay-6');
  moveInstrumentation(introTextRow, guideText);
  guideText.textContent = introTextRow.children[0]?.textContent.trim();
  introInfo.append(guideText);

  const swiperPaginationContainer = document.createElement('div');
  swiperPaginationContainer.classList.add('cell', 'small-12', 'medium-offset-1', 'medium-10', 'xlarge-offset-2', 'xlarge-8', 'swiper-pagination-container', 'padding-x', 'animate-enter-fade-up-short', 'animate-delay-15');
  maxWidthContainer.append(swiperPaginationContainer);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-progressbar', 'swiper-pagination-horizontal');
  swiperPaginationContainer.append(swiperPagination);

  const swiperCell = document.createElement('div');
  swiperCell.classList.add('cell', 'small-12');
  maxWidthContainer.append(swiperCell);

  const swiperEl = document.createElement('div');
  swiperEl.classList.add('swiper', 'coffee-profiler-swiper');
  swiperCell.append(swiperEl);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperEl.append(swiperWrapper);

  let optionIndex = 0;
  questionRows.forEach((questionRow, qIndex) => {
    const questionLabel = questionRow.children[0]?.textContent.trim();

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    if (qIndex === 0) {
      slide.classList.add('initial-slide', 'swiper-slide-active');
    }
    slide.setAttribute('data-slide-index', qIndex.toString());
    slide.setAttribute('aria-label', `${qIndex + 1} / ${questionRows.length}`);
    swiperWrapper.append(slide);

    const slideTypeNo = document.createElement('div');
    slideTypeNo.classList.add('slide-type--no');
    slide.append(slideTypeNo);

    const profilerSlideNo = document.createElement('div');
    profilerSlideNo.classList.add('coffee-profiler-slide', 'animate-enter-fade-up-short', 'animate-delay-7');
    profilerSlideNo.setAttribute('data-q-id', `q${qIndex}`); // Placeholder, actual IDs from original HTML
    profilerSlideNo.setAttribute('data-slide-index', qIndex.toString());
    profilerSlideNo.setAttribute('data-q-filter', ''); // Placeholder
    moveInstrumentation(questionRow, profilerSlideNo);
    slideTypeNo.append(profilerSlideNo);

    const questionLabelEl = document.createElement('h3');
    questionLabelEl.classList.add('question-label');
    questionLabelEl.textContent = questionLabel;
    profilerSlideNo.append(questionLabelEl);

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
    profilerSlideNo.append(optionsContainer);

    const currentQuestionOptions = [];
    // Assuming options are directly after their associated question in the block children
    // This logic needs to be robust if options are not immediately following
    // For now, we'll just take the next 2 options for simplicity based on original HTML
    // A more robust solution would involve a mapping or specific identifiers if available
    for (let i = 0; i < 2 && optionIndex < optionRows.length; i += 1) {
      currentQuestionOptions.push(optionRows[optionIndex]);
      optionIndex += 1;
    }

    optionsContainer.classList.add(`options-count--${currentQuestionOptions.length}`);

    currentQuestionOptions.forEach((optionRow, optIndex) => {
      const [iconCell, labelCell] = [...optionRow.children];

      const button = document.createElement('button');
      button.classList.add('option', 'elevation-2', 'has-hover', 'bg--paper-white');
      button.setAttribute('role', 'radio');
      button.setAttribute('aria-checked', 'false');
      button.setAttribute('data-q-id', `q${qIndex}`); // Placeholder
      button.setAttribute('data-opt-id', `opt${qIndex}-${optIndex}`); // Placeholder
      moveInstrumentation(optionRow, button);
      optionsContainer.append(button);

      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          const optimizedImg = optimizedPic.querySelector('img');
          optimizedImg.classList.add('option-icon', 'lazyloaded');
          button.append(optimizedPic);
          moveInstrumentation(img, optimizedImg);
        }
      }

      const optionLabel = document.createElement('span');
      optionLabel.classList.add('option-label', 'labelMediumRegular');
      optionLabel.textContent = labelCell?.textContent.trim();
      button.append(optionLabel);
    });

    const gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    slide.append(gridContainer);

    const gridX = document.createElement('div');
    gridX.classList.add('grid-x');
    gridContainer.append(gridX);

    // Add slide-type--yes div (hidden by default)
    const slideTypeYes = document.createElement('div');
    slideTypeYes.classList.add('slide-type--yes', 'hide');
    slide.append(slideTypeYes);

    const profilerSlideYes = document.createElement('div');
    profilerSlideYes.classList.add('coffee-profiler-slide', 'animate-enter-fade-up-short', 'animate-delay-7');
    slideTypeYes.append(profilerSlideYes);
  });

  const swiperControls = document.createElement('div');
  swiperControls.classList.add('swiper-controls', 'animate-enter-fade', 'animate-delay-15');
  swiperEl.append(swiperControls);

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('swiper-control', 'swiper-button', 'swiper-control--prev', 'elevation-1', 'animate-enter-fade-right-short', 'animate-delay-15', 'swiper-button-disabled');
  prevBtn.setAttribute('disabled', '');
  prevBtn.setAttribute('tabindex', '-1');
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.innerHTML = `
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7L17 7M1 7L6.33333 2M1 7L6.33333 12" stroke="#222222" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path>
    </svg>
  `;
  swiperControls.append(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('swiper-control', 'swiper-button', 'swiper-control--next', 'elevation-1', 'animate-enter-fade-left-short', 'animate-delay-15');
  nextBtn.setAttribute('tabindex', '0');
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.setAttribute('disabled', ''); // Initially disabled, will be enabled by Swiper
  nextBtn.innerHTML = `
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 7L1 7M17 7L11.6667 2M17 7L11.6667 12" stroke="#222222" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path>
    </svg>
  `;
  swiperControls.append(nextBtn);

  const swiperNotification = document.createElement('span');
  swiperNotification.classList.add('swiper-notification');
  swiperNotification.setAttribute('aria-live', 'assertive');
  swiperNotification.setAttribute('aria-atomic', 'true');
  swiperEl.append(swiperNotification);

  const errorMessageDiv = document.createElement('div');
  errorMessageDiv.classList.add('error-message');
  errorMessageDiv.setAttribute('data-default-message', 'Error! Please try again.');
  root.append(errorMessageDiv);

  const errorMessageText = document.createElement('span');
  errorMessageText.classList.add('error-message-text', 'bodyLargeRegular');
  moveInstrumentation(errorMessageRow, errorMessageText);
  errorMessageText.textContent = errorMessageRow.children[0]?.textContent.trim();
  errorMessageDiv.append(errorMessageText);

  const form = document.createElement('form');
  form.classList.add('hide', 'coffee-profiler-form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', 'https://www.nescafe.com/in/coffee-profiler/result');
  root.append(form);

  ['type', 'intensity', 'format', 'features', 'exc-type', 'exc-intensity', 'exc-format', 'exc-features'].forEach((name) => {
    const input = document.createElement('input');
    input.setAttribute('name', name);
    input.setAttribute('value', '');
    input.setAttribute('type', 'hidden');
    form.append(input);
  });

  block.replaceChildren(root);

  // Swiper Initialization
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 1, // Start with 1 slide per view
    spaceBetween: 0,
    loop: false,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    pagination: {
      el: swiperPagination,
      type: 'progressbar',
      clickable: true,
    },
    breakpoints: {
      // Adjust breakpoints based on desired responsive behavior
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 1,
      },
    },
  });
}
