import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative');

  const swiper = document.createElement('div');
  swiper.classList.add('swiper', 'primary-swiper', 'primary-swiper-carousel-419d8524f7', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'primary-swiper-wrapper', 'z-0');

  const pagination = document.createElement('div');
  pagination.classList.add('swiper-pagination', 'primary-swiper-pagination', 'pagination-set', 'mb-md-8', 'mb-10', 'mt-6', 'position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper-container');

  const prevButtonWrapper = document.createElement('div');
  const prevButton = document.createElement('button');
  prevButton.classList.add('primary-swiper__buttonPrev', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click');
  prevButtonWrapper.append(prevButton);

  const nextButtonWrapper = document.createElement('div');
  const nextButton = document.createElement('button');
  nextButton.classList.add('primary-swiper__buttonNext', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click');
  nextButtonWrapper.append(nextButton);

  swiperContainer.append(prevButtonWrapper, nextButtonWrapper);

  const slides = [...block.children].map((row, index) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'primary-swiper-slide');
    if (index === 0) {
      slide.classList.add('cmp-carousel__item--active', 'swiper-slide-active');
      slide.setAttribute('data-active', '1');
    } else if (index === block.children.length - 1) {
      slide.classList.add('swiper-slide-prev');
    }
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('banner');
    slide.append(bannerDiv);

    const section = document.createElement('section');
    section.classList.add('banner-section');
    bannerDiv.append(section);

    const sectionWrapper = document.createElement('div');
    sectionWrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');
    section.append(sectionWrapper);

    // Content detection for cells
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const videoCell = cells.find(cell => cell.querySelector('video') || (cell.querySelector('picture') && cell.querySelector('img[src*=".mp4"]'))); // More robust video detection
    const linkCell = cells.find(cell => cell.querySelector('a'));

    const linkEl = linkCell ? linkCell.querySelector('a') : null;
    const videoSource = videoCell ? videoCell.querySelector('source') : null;
    const videoPoster = videoCell ? videoCell.querySelector('img') : null;
    const imageEl = imageCell ? imageCell.querySelector('picture') : null;

    if (videoSource) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');

      const video = document.createElement('video');
      video.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
      video.setAttribute('title', 'Video');
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('data-is-autoplay', 'true');
      video.setAttribute('playsinline', '');
      video.setAttribute('preload', 'metadata');
      video.setAttribute('fetchpriority', 'high');
      video.setAttribute('loop', 'false');
      video.setAttribute('muted', 'true');
      video.setAttribute('autoplay', 'true');

      const source = document.createElement('source');
      source.src = videoSource.src;
      source.type = videoSource.type;
      video.append(source);

      if (videoPoster) {
        video.setAttribute('poster', videoPoster.src);
      }
      videoWrapper.append(video);

      const playPauseOverlay = document.createElement('div');
      playPauseOverlay.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

      const playButton = document.createElement('button');
      playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      const playIcon = document.createElement('img');
      playIcon.alt = 'svg file';
      playIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1775062202294.svg+xml'; // Placeholder, replace with actual icon path if available in block
      playButton.append(playIcon);

      const pauseButton = document.createElement('button');
      pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      const pauseIcon = document.createElement('img');
      pauseIcon.alt = 'svg file';
      pauseIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1775062202311.svg+xml'; // Placeholder
      pauseButton.append(pauseIcon);

      playPauseOverlay.append(playButton, pauseButton);
      videoWrapper.append(playPauseOverlay);

      const muteOverlay = document.createElement('div');
      muteOverlay.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

      const muteButton = document.createElement('button');
      muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      const muteIcon = document.createElement('img');
      muteIcon.alt = 'svg file';
      muteIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1775062202326.svg+xml'; // Placeholder
      muteButton.append(muteIcon);

      const unmuteButton = document.createElement('button');
      unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      const unmuteIcon = document.createElement('img');
      unmuteIcon.alt = 'svg file';
      unmuteIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1775062202352.svg+xml'; // Placeholder
      unmuteButton.append(unmuteIcon);

      const noAudioButton = document.createElement('button');
      noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      const noAudioIcon = document.createElement('img');
      noAudioIcon.alt = 'svg file';
      noAudioIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1775062202406.svg+xml'; // Placeholder
      noAudioButton.append(noAudioIcon);

      muteOverlay.append(muteButton, unmuteButton, noAudioButton);
      videoWrapper.append(muteOverlay);

      sectionWrapper.append(videoWrapper);

      video.addEventListener('play', () => {
        playButton.classList.add('d-none');
        pauseButton.classList.remove('d-none');
      });

      video.addEventListener('pause', () => {
        playButton.classList.remove('d-none');
        pauseButton.classList.add('d-none');
      });

      video.addEventListener('volumechange', () => {
        if (video.muted) {
          muteButton.classList.add('d-none');
          unmuteButton.classList.add('d-none');
          noAudioButton.classList.remove('d-none');
        } else if (video.volume === 0) {
          muteButton.classList.add('d-none');
          unmuteButton.classList.add('d-none');
          noAudioButton.classList.remove('d-none');
        } else {
          muteButton.classList.remove('d-none');
          unmuteButton.classList.add('d-none');
          noAudioButton.classList.add('d-none');
        }
      });

      playPauseOverlay.addEventListener('click', () => {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });

      muteOverlay.addEventListener('click', () => {
        video.muted = !video.muted;
        if (video.muted) {
          muteButton.classList.add('d-none');
          unmuteButton.classList.add('d-none');
          noAudioButton.classList.remove('d-none');
        } else {
          muteButton.classList.remove('d-none');
          unmuteButton.classList.add('d-none');
          noAudioButton.classList.add('d-none');
        }
      });
    } else if (imageEl) {
      const img = imageEl.querySelector('img');
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt;
      newImg.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'banner-image');
      newImg.setAttribute('loading', 'eager');
      newImg.setAttribute('fetchpriority', 'high');
      newImg.setAttribute('decoding', 'async');
      sectionWrapper.append(newImg);
      moveInstrumentation(imageEl, newImg);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');
    sectionWrapper.append(ctaWrapper);

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('banner-cta');
    ctaWrapper.append(bannerCta);

    if (linkEl) {
      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('text-center');

      const ctaButton = document.createElement('a');
      ctaButton.id = `cta-${Math.random().toString(36).substring(2, 11)}`;
      ctaButton.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'cta-layout');
      ctaButton.setAttribute('data-link-region', 'CTA');
      ctaButton.setAttribute('data-is-internal', 'true');
      ctaButton.setAttribute('data-enable-gating', 'false');
      ctaButton.href = linkEl.href;
      ctaButton.target = '_blank';

      const buttonTextSpan = document.createElement('span');
      buttonTextSpan.classList.add('cmp-button__text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'famlf-cta-btn');
      buttonTextSpan.textContent = linkEl.textContent.trim();
      ctaButton.append(buttonTextSpan);
      textCenterDiv.append(ctaButton);

      const popupDiv = document.createElement('div');
      popupDiv.classList.add('pop-up', 'd-none');
      popupDiv.innerHTML = `
        <input type="hidden" class="popup-message">
        <input type="hidden" class="proceed-button-label">
        <input type="hidden" class="cancel-button-label">
        <input type="hidden" class="background-color">
      `;
      textCenterDiv.append(popupDiv);
      bannerCta.append(textCenterDiv);
    }
    moveInstrumentation(row, slide);
    return slide;
  });

  slides.forEach((slide) => swiperWrapper.append(slide));
  swiper.append(swiperWrapper);

  const carouselActions = document.createElement('div');
  carouselActions.classList.add('cmp-carousel__actions');

  const prevAction = document.createElement('button');
  prevAction.classList.add('cmp-carousel__action', 'cmp-carousel__action--previous');
  prevAction.setAttribute('type', 'button');
  prevAction.setAttribute('aria-label', 'Previous');
  prevAction.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Previous</span>';
  carouselActions.append(prevAction);

  const nextAction = document.createElement('button');
  nextAction.classList.add('cmp-carousel__action', 'cmp-carousel__action--next');
  nextAction.setAttribute('type', 'button');
  nextAction.setAttribute('aria-label', 'Next');
  nextAction.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Next</span>';
  carouselActions.append(nextAction);

  const pauseAction = document.createElement('button');
  pauseAction.classList.add('cmp-carousel__action', 'cmp-carousel__action--pause');
  pauseAction.setAttribute('type', 'button');
  pauseAction.setAttribute('aria-label', 'Pause');
  pauseAction.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Pause</span>';
  carouselActions.append(pauseAction);

  const playAction = document.createElement('button');
  playAction.classList.add('cmp-carousel__action', 'cmp-carousel__action--play', 'cmp-carousel__action--disabled');
  playAction.setAttribute('type', 'button');
  playAction.setAttribute('aria-label', 'Play');
  playAction.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Play</span>';
  carouselActions.append(playAction);

  swiper.append(carouselActions, swiperContainer, pagination);
  wrapper.append(swiper);

  block.textContent = '';
  block.append(wrapper);

  // Initialize Swiper-like functionality
  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateCarousel() {
    slides.forEach((slide, i) => {
      slide.classList.remove('cmp-carousel__item--active', 'swiper-slide-active', 'swiper-slide-prev');
      if (i === currentIndex) {
        slide.classList.add('cmp-carousel__item--active', 'swiper-slide-active');
        slide.setAttribute('data-active', '1');
      } else {
        slide.removeAttribute('data-active');
      }
      if (i === (currentIndex - 1 + totalSlides) % totalSlides) {
        slide.classList.add('swiper-slide-prev');
      }
    });

    const bullets = [...pagination.children];
    bullets.forEach((bullet, i) => {
      bullet.classList.toggle('swiper-pagination-bullet-active', i === currentIndex);
    });

    // Update button states
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === totalSlides - 1;
    prevButton.classList.toggle('disabled', currentIndex === 0);
    nextButton.classList.toggle('disabled', currentIndex === totalSlides - 1);

    swiperWrapper.style.transform = `translate3d(-${currentIndex * slides[0].offsetWidth}px, 0px, 0px)`;
  }

  // Create pagination bullets
  for (let i = 0; i < totalSlides; i++) {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (i === 0) {
      bullet.classList.add('swiper-pagination-bullet-active');
    }
    bullet.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
    pagination.append(bullet);
  }

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  });

  prevAction.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  nextAction.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  });

  let autoplayInterval;
  let isAutoplayPaused = false;

  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      if (!isAutoplayPaused) {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
      }
    }, 5000); // data-delay="5000"
    playAction.classList.add('cmp-carousel__action--disabled');
    pauseAction.classList.remove('cmp-carousel__action--disabled');
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
    playAction.classList.remove('cmp-carousel__action--disabled');
    pauseAction.classList.add('cmp-carousel__action--disabled');
  }

  pauseAction.addEventListener('click', () => {
    isAutoplayPaused = true;
    stopAutoplay();
  });

  playAction.addEventListener('click', () => {
    isAutoplayPaused = false;
    startAutoplay();
  });

  // Initial update
  updateCarousel();
  startAutoplay();

  // Handle image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
