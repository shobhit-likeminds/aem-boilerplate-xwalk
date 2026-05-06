import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const [
    backgroundImageRow,
    headingRow,
    greetingMorningRow,
    greetingAfternoonRow,
    greetingEveningRow,
    greetingNightRow,
    guideTextRow,
    errorMessageRow,
    ...itemRows
  ] = children;

  const questionSlides = [];
  const optionItems = [];

  let currentQuestionSlide = null;
  itemRows.forEach((row) => {
    if (row.children.length === 1 && row.querySelector('div:first-child:not(:has(picture))')) {
      // This is a question-slide row
      currentQuestionSlide = {
        row,
        questionText: row.children[0].textContent.trim(),
        options: [],
      };
      questionSlides.push(currentQuestionSlide);
    } else if (row.children.length === 2 && row.querySelector('picture')) {
      // This is an option-item row, belonging to the last question slide
      if (currentQuestionSlide) {
        currentQuestionSlide.options.push({
          row,
          icon: row.children[0].querySelector('picture'),
          label: row.children[1].textContent.trim(),
        });
      }
    }
  });

  const section = document.createElement('section');
  section.classList.add('grid-container', 'coffee-profiler', 'animate-enter', 'in-view'); // Added data-api-url in original HTML, but not in EDS model

  // Background Image
  const parallaxBgImgContainer = document.createElement('div');
  parallaxBgImgContainer.classList.add('parallax-bg-img-container');
  const parallaxImg = document.createElement('div');
  parallaxImg.classList.add('parallax-img', 'lazyLoadedImage');
  const bgPicture = backgroundImageRow.children[0].querySelector('picture');
  if (bgPicture) {
    const img = bgPicture.querySelector('img');
    parallaxImg.style.backgroundImage = `url(${img.src})`;
    moveInstrumentation(backgroundImageRow, parallaxImg);
  }
  parallaxBgImgContainer.append(parallaxImg);
  section.append(parallaxBgImgContainer);

  const maxWidthContainer = document.createElement('div');
  maxWidthContainer.classList.add('max-width-container', 'grid-x');

  const contentCell = document.createElement('div');
  contentCell.classList.add('cell', 'small-12', 'medium-offset-1', 'medium-10', 'xlarge-offset-2', 'xlarge-8', 'padding-x');

  // Heading
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'animate-enter-fade-up-short', 'animate-delay-3');
  heading.textContent = headingRow.children[0].textContent.trim();
  moveInstrumentation(headingRow, heading);
  contentCell.append(heading);

  const introInfo = document.createElement('div');
  introInfo.classList.add('intro-info', 'animate-enter-fade', 'animate-delay-1', 'no-avatar-image');

  // Greetings
  const greetingsContainer = document.createElement('div');
  greetingsContainer.classList.add('greetings-container', 'headline-h4', 'animate-enter-fade-up-short', 'stagger-1');

  const greetingMorning = document.createElement('span');
  greetingMorning.classList.add('hide', 'greeting--morning');
  greetingMorning.textContent = greetingMorningRow.children[0].textContent.trim();
  moveInstrumentation(greetingMorningRow, greetingMorning);
  greetingsContainer.append(greetingMorning);

  const greetingAfternoon = document.createElement('span');
  greetingAfternoon.classList.add('hide', 'greeting--afternoon');
  greetingAfternoon.textContent = greetingAfternoonRow.children[0].textContent.trim();
  moveInstrumentation(greetingAfternoonRow, greetingAfternoon);
  greetingsContainer.append(greetingAfternoon);

  const greetingEvening = document.createElement('span');
  greetingEvening.classList.add('greeting--evening'); // Not hidden by default in original HTML
  greetingEvening.textContent = greetingEveningRow.children[0].textContent.trim();
  moveInstrumentation(greetingEveningRow, greetingEvening);
  greetingsContainer.append(greetingEvening);

  const greetingNight = document.createElement('span');
  greetingNight.classList.add('hide', 'greeting--night');
  greetingNight.textContent = greetingNightRow.children[0].textContent.trim();
  moveInstrumentation(greetingNightRow, greetingNight);
  greetingsContainer.append(greetingNight);

  introInfo.append(greetingsContainer);

  // Guide Text
  const guideText = document.createElement('div');
  guideText.classList.add('guide-text', 'labelMediumRegular', 'animate-enter-fade-up-short', 'animate-delay-6');
  guideText.textContent = guideTextRow.children[0].textContent.trim();
  moveInstrumentation(guideTextRow, guideText);
  introInfo.append(guideText);

  contentCell.append(introInfo);
  maxWidthContainer.append(contentCell);

  // Swiper Pagination Container
  const swiperPaginationContainer = document.createElement('div');
  swiperPaginationContainer.classList.add('cell', 'small-12', 'medium-offset-1', 'medium-10', 'xlarge-offset-2', 'xlarge-8', 'swiper-pagination-container', 'padding-x', 'animate-enter-fade-up-short', 'animate-delay-15');
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-progressbar', 'swiper-pagination-horizontal');
  swiperPaginationContainer.append(swiperPagination);
  maxWidthContainer.append(swiperPaginationContainer);

  // Swiper
  const swiperCell = document.createElement('div');
  swiperCell.classList.add('cell', 'small-12');
  const swiperEl = document.createElement('div');
  swiperEl.classList.add('swiper', 'coffee-profiler-swiper'); // swiper-initialized, swiper-horizontal, swiper-backface-hidden added by Swiper.js
  swiperEl.style.minHeight = '407px'; // From original HTML

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');

  questionSlides.forEach((question, index) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    if (index === 0) {
      swiperSlide.classList.add('initial-slide', 'swiper-slide-active');
    }
    swiperSlide.setAttribute('data-slide-index', index);
    swiperSlide.setAttribute('aria-label', `${index + 1} / ${questionSlides.length}`);
    swiperSlide.style.width = '1440px'; // From original HTML

    const coffeeProfilerSlide = document.createElement('div');
    coffeeProfilerSlide.classList.add('coffee-profiler-slide', 'animate-enter-fade-up-short', 'animate-delay-7');
    // data-q-id, data-slide-index, data-q-filter not in EDS model, so not added

    const questionLabel = document.createElement('h3');
    questionLabel.classList.add('question-label');
    questionLabel.textContent = question.questionText;
    moveInstrumentation(question.row, questionLabel); // Move instrumentation from question row to its label
    coffeeProfilerSlide.append(questionLabel);

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container', `options-count--${question.options.length}`);

    question.options.forEach((option) => {
      const optionButton = document.createElement('button');
      optionButton.classList.add('option', 'elevation-2', 'has-hover', 'bg--paper-white');
      optionButton.setAttribute('role', 'radio');
      optionButton.setAttribute('aria-checked', 'false');
      optionButton.style.minHeight = '159px'; // From original HTML
      // data-is-yes, data-opt-id, data-q-id, data-opt-filter-vals, data-opt-filter, data-opt-exc-filter not in EDS model

      const optionIcon = document.createElement('img');
      optionIcon.classList.add('option-icon', 'lazyloaded');
      if (option.icon) {
        const optimizedPic = createOptimizedPicture(option.icon.querySelector('img').src, option.icon.querySelector('img').alt, false, [{ width: '750' }]);
        moveInstrumentation(option.row, optimizedPic.querySelector('img')); // Move instrumentation from option row to its icon
        optionIcon.src = optimizedPic.querySelector('img').src;
        optionIcon.alt = optimizedPic.querySelector('img').alt;
      }
      optionButton.append(optionIcon);

      const optionLabel = document.createElement('span');
      optionLabel.classList.add('option-label', 'labelMediumRegular');
      optionLabel.textContent = option.label;
      optionButton.append(optionLabel);

      optionsContainer.append(optionButton);
    });

    coffeeProfilerSlide.append(optionsContainer);
    swiperSlide.append(coffeeProfilerSlide);
    swiperWrapper.append(swiperSlide);
  });

  swiperEl.append(swiperWrapper);

  const swiperControls = document.createElement('div');
  swiperControls.classList.add('swiper-controls', 'animate-enter-fade', 'animate-delay-15');

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('swiper-control', 'swiper-button', 'swiper-control--prev', 'elevation-1', 'animate-enter-fade-right-short', 'animate-delay-15', 'swiper-button-disabled');
  prevBtn.setAttribute('disabled', '');
  prevBtn.setAttribute('tabindex', '-1');
  prevBtn.setAttribute('aria-label', 'Previous slide');
  prevBtn.innerHTML = '<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7L17 7M1 7L6.33333 2M1 7L6.33333 12" stroke="#222222" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path></svg>';
  swiperControls.append(prevBtn);

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('swiper-control', 'swiper-button', 'swiper-control--next', 'elevation-1', 'animate-enter-fade-left-short', 'animate-delay-15');
  nextBtn.setAttribute('tabindex', '0');
  nextBtn.setAttribute('aria-label', 'Next slide');
  nextBtn.innerHTML = '<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 7L1 7M17 7L11.6667 2M17 7L11.6667 12" stroke="#222222" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round"></path></svg>';
  swiperControls.append(nextBtn);

  swiperEl.append(swiperControls);
  swiperCell.append(swiperEl);
  maxWidthContainer.append(swiperCell);

  section.append(maxWidthContainer);

  // Error Message
  const errorMessageDiv = document.createElement('div');
  errorMessageDiv.classList.add('error-message');
  errorMessageDiv.setAttribute('data-default-message', 'Error! Please try again.');
  const errorMessageText = document.createElement('span');
  errorMessageText.classList.add('error-message-text', 'bodyLargeRegular');
  errorMessageText.textContent = errorMessageRow.children[0].textContent.trim();
  moveInstrumentation(errorMessageRow, errorMessageText);
  errorMessageDiv.append(errorMessageText);
  section.append(errorMessageDiv);

  // Form (hidden)
  const form = document.createElement('form');
  form.classList.add('hide', 'coffee-profiler-form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', 'https://www.nescafe.com/in/coffee-profiler/result');
  form.innerHTML = `
    <input name="type" value="" type="hidden"/>
    <input name="intensity" value="" type="hidden"/>
    <input name="format" value="" type="hidden"/>
    <input name="features" value="" type="hidden"/>
    <input name="exc-type" value="" type="hidden"/>
    <input name="exc-intensity" value="" type="hidden"/>
    <input name="exc-format" value="" type="hidden"/>
    <input name="exc-features" value="" type="hidden"/>
  `;
  section.append(form);

  block.replaceChildren(section);

  // Initialize Swiper
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
      clickable: true,
      type: 'progressbar',
    },
    breakpoints: {
      // Adjust breakpoints as needed based on original HTML behavior
      768: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 1,
      },
    },
  });

  // Optimize images
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
}
