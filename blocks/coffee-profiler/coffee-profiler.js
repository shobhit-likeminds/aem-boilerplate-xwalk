import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  // Destructure root rows based on BlockJson model
  const [
    backgroundImageRow,
    headingRow,
    greetingMorningRow,
    greetingAfternoonRow,
    greetingEveningRow,
    greetingNightRow,
    guideTextRow,
    errorMessageRow,
    ...remainingRows
  ] = [...block.children];

  // Filter question and option rows from the remaining rows
  const questionSlideRows = remainingRows.filter(
    (row) => row.children.length === 1 && row.children[0]?.textContent.trim() !== '',
  );
  const slideOptionRows = remainingRows.filter(
    (row) => row.children.length === 2 && row.children[0]?.querySelector('picture') && row.children[1]?.textContent.trim() !== '',
  );

  const root = document.createElement('section');
  root.classList.add('grid-container', 'coffee-profiler', 'animate-enter', 'in-view');
  moveInstrumentation(block, root);

  const bgPaperBlue = document.createElement('div');
  bgPaperBlue.classList.add('bg--paper-blue', 'dummy-to-load-bg');
  root.append(bgPaperBlue);

  const bgPaperWhiteHeavy = document.createElement('div');
  bgPaperWhiteHeavy.classList.add('bg--paper-white-heavy', 'dummy-to-load-bg');
  root.append(bgPaperWhiteHeavy);

  const parallaxBgImgContainer = document.createElement('div');
  parallaxBgImgContainer.classList.add('parallax-bg-img-container');
  root.append(parallaxBgImgContainer);

  const parallaxImg = document.createElement('div');
  parallaxImg.classList.add('parallax-img', 'lazyLoadedImage');
  const backgroundImagePicture = backgroundImageRow?.querySelector('picture');
  if (backgroundImagePicture) {
    const img = backgroundImagePicture.querySelector('img');
    if (img) {
      parallaxImg.style.backgroundImage = `url(${img.src})`;
      moveInstrumentation(backgroundImageRow, parallaxImg);
    }
  }
  parallaxBgImgContainer.append(parallaxImg);

  const maxWidthContainer = document.createElement('div');
  maxWidthContainer.classList.add('max-width-container', 'grid-x');
  root.append(maxWidthContainer);

  const headerCell = document.createElement('div');
  headerCell.classList.add('cell', 'small-12', 'medium-offset-1', 'medium-10', 'xlarge-offset-2', 'xlarge-8', 'padding-x');
  maxWidthContainer.append(headerCell);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'animate-enter-fade-up-short', 'animate-delay-3');
  // Read text content directly from the cell, not querySelector('div')
  heading.textContent = headingRow?.children[0]?.textContent.trim() || '';
  moveInstrumentation(headingRow, heading);
  headerCell.append(heading);

  const introInfo = document.createElement('div');
  introInfo.classList.add('intro-info', 'animate-enter-fade', 'animate-delay-1', 'no-avatar-image');
  headerCell.append(introInfo);

  const greetingsContainer = document.createElement('div');
  greetingsContainer.classList.add('greetings-container', 'headline-h4', 'animate-enter-fade-up-short', 'animate-delay-3', 'stagger-1');
  introInfo.append(greetingsContainer);

  const greetingMorningSpan = document.createElement('span');
  greetingMorningSpan.classList.add('hide', 'greeting--morning');
  // Read text content directly from the cell, not querySelector('div')
  greetingMorningSpan.textContent = greetingMorningRow?.children[0]?.textContent.trim() || '';
  moveInstrumentation(greetingMorningRow, greetingMorningSpan);
  greetingsContainer.append(greetingMorningSpan);

  const greetingAfternoonSpan = document.createElement('span');
  greetingAfternoonSpan.classList.add('hide', 'greeting--afternoon');
  // Read text content directly from the cell, not querySelector('div')
  greetingAfternoonSpan.textContent = greetingAfternoonRow?.children[0]?.textContent.trim() || '';
  moveInstrumentation(greetingAfternoonRow, greetingAfternoonSpan);
  greetingsContainer.append(greetingAfternoonSpan);

  const greetingEveningSpan = document.createElement('span');
  greetingEveningSpan.classList.add('hide', 'greeting--evening');
  // Read text content directly from the cell, not querySelector('div')
  greetingEveningSpan.textContent = greetingEveningRow?.children[0]?.textContent.trim() || '';
  moveInstrumentation(greetingEveningRow, greetingEveningSpan);
  greetingsContainer.append(greetingEveningSpan);

  const greetingNightSpan = document.createElement('span');
  greetingNightSpan.classList.add('greeting--night');
  // Read text content directly from the cell, not querySelector('div')
  greetingNightSpan.textContent = greetingNightRow?.children[0]?.textContent.trim() || '';
  moveInstrumentation(greetingNightRow, greetingNightSpan);
  greetingsContainer.append(greetingNightSpan);

  const guideTextDiv = document.createElement('div');
  guideTextDiv.classList.add('guide-text', 'labelMediumRegular', 'animate-enter-fade-up-short', 'animate-delay-6');
  // Read text content directly from the cell, not querySelector('div')
  guideTextDiv.textContent = guideTextRow?.children[0]?.textContent.trim() || '';
  moveInstrumentation(guideTextRow, guideTextDiv);
  introInfo.append(guideTextDiv);

  const swiperPaginationContainer = document.createElement('div');
  swiperPaginationContainer.classList.add('cell', 'small-12', 'medium-offset-1', 'medium-10', 'xlarge-offset-2', 'xlarge-8', 'swiper-pagination-container', 'padding-x', 'animate-enter-fade-up-short', 'animate-delay-15');
  maxWidthContainer.append(swiperPaginationContainer);

  const swiperPagination = document.createElement('div');
  // Removed swiper-pagination-horizontal as Swiper adds it
  swiperPagination.classList.add('swiper-pagination', 'swiper-pagination-progressbar');
  swiperPaginationContainer.append(swiperPagination);

  const swiperWrapperCell = document.createElement('div');
  swiperWrapperCell.classList.add('cell', 'small-12');
  maxWidthContainer.append(swiperWrapperCell);

  const swiperEl = document.createElement('div');
  // Removed swiper-initialized, swiper-horizontal, swiper-backface-hidden as Swiper adds them
  swiperEl.classList.add('swiper', 'coffee-profiler-swiper');
  swiperWrapperCell.append(swiperEl);

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperEl.append(swiperWrapper);

  const slides = [];
  questionSlideRows.forEach((row, index) => {
    const [questionCell] = [...row.children]; // Destructure question cell

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('swiper-slide');
    if (index === 0) {
      // Removed swiper-slide-active as Swiper adds it
      slideDiv.classList.add('initial-slide');
    } else if (index === 1) {
      // Removed swiper-slide-next as Swiper adds it
    }
    if (index === questionSlideRows.length - 1) {
      slideDiv.classList.add('last-slide');
    }
    slideDiv.dataset.slideIndex = index;
    moveInstrumentation(row, slideDiv);

    const coffeeProfilerSlide = document.createElement('div');
    coffeeProfilerSlide.classList.add('coffee-profiler-slide', 'animate-enter-fade-up-short', 'animate-delay-7');
    coffeeProfilerSlide.dataset.qId = `q${index}`; // Placeholder, actual q-id would come from model
    coffeeProfilerSlide.dataset.slideIndex = index;
    coffeeProfilerSlide.dataset.qFilter = ''; // Placeholder

    const questionLabel = document.createElement('h3');
    questionLabel.classList.add('question-label');
    // Read text content directly from the cell, not querySelector('div')
    questionLabel.textContent = questionCell?.textContent.trim() || '';
    coffeeProfilerSlide.append(questionLabel);

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
    coffeeProfilerSlide.append(optionsContainer);

    // Filter slide options that belong to this question
    // This logic assumes 2 options per question and consumes from slideOptionRows.
    // This might need refinement if options are not strictly paired 2-per-question.
    const currentSlideOptions = slideOptionRows.splice(0, 2);

    currentSlideOptions.forEach((optionRow, optionIndex) => {
      const [optionIconCell, optionLabelCell] = [...optionRow.children]; // Destructure option cells

      const optionButton = document.createElement('button');
      optionButton.classList.add('option', 'elevation-2', 'has-hover', 'bg--paper-white');
      optionButton.dataset.optId = `opt${index}-${optionIndex}`; // Placeholder
      optionButton.dataset.qId = `q${index}`; // Placeholder
      optionButton.dataset.optFilterVals = ''; // Placeholder
      optionButton.dataset.optFilter = ''; // Placeholder
      optionButton.dataset.optExcFilter = ''; // Placeholder
      optionButton.setAttribute('role', 'radio');
      optionButton.setAttribute('aria-checked', 'false');
      moveInstrumentation(optionRow, optionButton);

      const optionIconPicture = optionIconCell?.querySelector('picture');
      if (optionIconPicture) {
        const img = optionIconPicture.querySelector('img');
        if (img) {
          const optionIcon = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          optionIcon.classList.add('option-icon', 'lazyloaded');
          optionButton.append(optionIcon);
        }
      }

      const optionLabel = document.createElement('span');
      optionLabel.classList.add('option-label', 'labelMediumRegular');
      // Read text content directly from the cell, not querySelector('div:last-child')
      optionLabel.textContent = optionLabelCell?.textContent.trim() || '';
      optionButton.append(optionLabel);
      optionsContainer.append(optionButton);
    });
    optionsContainer.classList.add(`options-count--${currentSlideOptions.length}`);

    slideDiv.append(coffeeProfilerSlide);
    swiperWrapper.append(slideDiv);
    slides.push(slideDiv);
  });

  const swiperControls = document.createElement('div');
  swiperControls.classList.add('swiper-controls', 'animate-enter-fade', 'animate-delay-15');
  swiperEl.append(swiperControls);

  const prevBtn = document.createElement('button');
  // Removed swiper-button-disabled as Swiper adds it
  prevBtn.classList.add('swiper-control', 'swiper-button', 'swiper-control--prev', 'elevation-1', 'animate-enter-fade-right-short', 'animate-delay-15');
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
  nextBtn.setAttribute('disabled', 'disabled'); // Initial state as per original HTML
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
  errorMessageDiv.dataset.defaultMessage = 'Error! Please try again.';
  root.append(errorMessageDiv);

  const errorMessageText = document.createElement('span');
  errorMessageText.classList.add('error-message-text', 'bodyLargeRegular');
  // Read text content directly from the cell, not querySelector('div')
  errorMessageText.textContent = errorMessageRow?.children[0]?.textContent.trim() || 'Error! Please try again.';
  moveInstrumentation(errorMessageRow, errorMessageText);
  errorMessageDiv.append(errorMessageText);

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
  root.append(form);

  block.replaceChildren(root);

  // Swiper initialization
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // eslint-disable-next-line no-undef
  const swiper = new Swiper(swiperEl, {
    slidesPerView: 1,
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
    on: {
      init() {
        // Update navigation buttons initial state
        if (this.isBeginning) {
          prevBtn.setAttribute('disabled', 'true');
        } else {
          prevBtn.removeAttribute('disabled');
        }
        if (this.isEnd) {
          nextBtn.setAttribute('disabled', 'true');
        } else {
          nextBtn.removeAttribute('disabled');
        }
      },
      slideChange() {
        // Update navigation buttons on slide change
        if (this.isBeginning) {
          prevBtn.setAttribute('disabled', 'true');
        } else {
          prevBtn.removeAttribute('disabled');
        }
        if (this.isEnd) {
          nextBtn.setAttribute('disabled', 'true');
        } else {
          nextBtn.removeAttribute('disabled');
        }
      },
    },
  });

  // Greetings logic
  const updateGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    let currentGreeting = greetingNightSpan;

    if (hour >= 5 && hour < 12) {
      currentGreeting = greetingMorningSpan;
    } else if (hour >= 12 && hour < 17) {
      currentGreeting = greetingAfternoonSpan;
    } else if (hour >= 17 && hour < 21) {
      currentGreeting = greetingEveningSpan;
    }

    [greetingMorningSpan, greetingAfternoonSpan, greetingEveningSpan, greetingNightSpan].forEach((span) => {
      span.classList.add('hide');
    });
    currentGreeting.classList.remove('hide');
  };

  updateGreeting();
  setInterval(updateGreeting, 60 * 60 * 1000); // Update every hour
}
