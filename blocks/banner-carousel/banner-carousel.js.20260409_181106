import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative');

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper', 'primary-swiper', 'primary-swiper-carousel-419d8524f7', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  swiperContainer.setAttribute('data-swiper-id', '.primary-swiper-carousel-419d8524f7');
  swiperContainer.id = 'carousel-419d8524f7';
  swiperContainer.setAttribute('role', 'group');
  swiperContainer.setAttribute('aria-live', 'polite');
  swiperContainer.setAttribute('aria-roledescription', 'carousel');
  swiperContainer.setAttribute('data-is-autoplay', 'true');
  swiperContainer.setAttribute('data-delay', '5000');
  swiperContainer.setAttribute('data-autopause-disabled', 'true');
  swiperContainer.setAttribute('data-is-loop', 'false');
  swiperContainer.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'primary-swiper-wrapper', 'z-0');

  [...block.children].forEach((row, index) => {
    const cells = [...row.children]; // Get all cells for content detection

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'primary-swiper-slide');
    if (index === 0) {
      swiperSlide.classList.add('cmp-carousel__item--active', 'swiper-slide-prev');
      swiperSlide.setAttribute('data-active', '1');
    } else if (index === 1) {
      swiperSlide.classList.add('swiper-slide-active');
    }
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    swiperSlide.setAttribute('data-cmp-hook-carousel', 'item');
    moveInstrumentation(row, swiperSlide);

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('banner');
    swiperSlide.append(bannerDiv);

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('banner-section');
    bannerDiv.append(bannerSection);

    const bannerSectionWrapper = document.createElement('div');
    bannerSectionWrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');
    bannerSection.append(bannerSectionWrapper);

    // Content detection for cells
    const videoCell = cells.find(cell => cell.querySelector('a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"], a[href$=".mov"]'));
    const imageCell = cells.find(cell => cell.querySelector('picture') && !videoCell); // Image if no video
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell !== videoCell); // CTA link, not the video link
    const ctaLinkLabelCell = cells.find(cell => !cell.querySelector('a') && cell.textContent.trim() !== '' && cell !== videoCell && cell !== imageCell); // Text content for CTA label

    const videoLink = videoCell ? videoCell.querySelector('a') : null;
    const imagePicture = imageCell ? imageCell.querySelector('picture') : null;

    if (videoLink && /\.(mp4|webm|ogg|mov)$/i.test(videoLink.href)) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');
      bannerSectionWrapper.append(videoWrapper);

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
      source.src = videoLink.href;
      source.type = 'video/mp4';
      video.append(source);
      videoWrapper.append(video);
      moveInstrumentation(videoLink, video);

      const playPauseWrapper = document.createElement('div');
      playPauseWrapper.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');
      videoWrapper.append(playPauseWrapper);

      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      playButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775730058394.svg+xml"/>'; // Placeholder, actual path from original
      playPauseWrapper.append(playButton);

      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      pauseButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775730058535.svg+xml"/>'; // Placeholder, actual path from original
      playPauseWrapper.append(pauseButton);

      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');
      videoWrapper.append(muteIconWrapper);

      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      muteButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775730058707.svg+xml"/>'; // Placeholder, actual path from original
      muteIconWrapper.append(muteButton);

      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      unmuteButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775730058811.svg+xml"/>'; // Placeholder, actual path from original
      muteIconWrapper.append(unmuteButton);

      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      noAudioButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775730058886.svg+xml"/>'; // Placeholder, actual path from original
      muteIconWrapper.append(noAudioButton);

      playButton.addEventListener('click', () => {
        video.play();
        playButton.classList.add('d-none');
        pauseButton.classList.remove('d-none');
      });

      pauseButton.addEventListener('click', () => {
        video.pause();
        pauseButton.classList.add('d-none');
        playButton.classList.remove('d-none');
      });

      muteButton.addEventListener('click', () => {
        video.muted = false;
        muteButton.classList.add('d-none');
        unmuteButton.classList.remove('d-none');
        noAudioButton.classList.add('d-none');
      });

      unmuteButton.addEventListener('click', () => {
        video.muted = true;
        unmuteButton.classList.add('d-none');
        muteButton.classList.remove('d-none');
        noAudioButton.classList.remove('d-none');
      });

      noAudioButton.addEventListener('click', () => {
        video.muted = false;
        noAudioButton.classList.add('d-none');
        unmuteButton.classList.remove('d-none');
      });
    } else if (imagePicture) {
      const img = imagePicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'banner-image');
        optimizedPic.querySelector('img').setAttribute('loading', 'eager');
        optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
        optimizedPic.querySelector('img').setAttribute('decoding', 'async');
        bannerSectionWrapper.append(optimizedPic);
        moveInstrumentation(imageCell, optimizedPic);
      }
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');
    bannerSectionWrapper.append(ctaWrapper);

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('banner-cta');
    ctaWrapper.append(bannerCta);

    const textCenterDiv = document.createElement('div');
    textCenterDiv.classList.add('text-center');
    bannerCta.append(textCenterDiv);

    const ctaLink = ctaLinkCell ? ctaLinkCell.querySelector('a') : null;
    if (ctaLink && ctaLinkLabelCell) { // Ensure both link and label cells are found
      const anchor = document.createElement('a');
      anchor.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      anchor.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'cta-layout');
      anchor.setAttribute('data-link-region', 'CTA');
      anchor.setAttribute('data-is-internal', 'true');
      anchor.setAttribute('data-enable-gating', 'false');
      anchor.href = ctaLink.href;
      anchor.target = '_blank';

      const span = document.createElement('span');
      span.classList.add('cmp-button__text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'famlf-cta-btn');
      span.textContent = ctaLinkLabelCell.textContent.trim();
      anchor.append(span);
      textCenterDiv.append(anchor);
      moveInstrumentation(ctaLinkCell, anchor);
      moveInstrumentation(ctaLinkLabelCell, span);
    }

    const popUpDiv = document.createElement('div');
    popUpDiv.classList.add('pop-up', 'd-none');
    popUpDiv.innerHTML = `
      <input type="hidden" class="popup-message">
      <input type="hidden" class="proceed-button-label">
      <input type="hidden" class="cancel-button-label">
      <input type="hidden" class="background-color">
    `;
    textCenterDiv.append(popUpDiv);

    swiperWrapper.append(swiperSlide);
  });

  swiperContainer.append(swiperWrapper);

  const carouselActions = document.createElement('div');
  carouselActions.classList.add('cmp-carousel__actions');

  const prevButton = document.createElement('button');
  prevButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--previous');
  prevButton.type = 'button';
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('data-cmp-hook-carousel', 'previous');
  prevButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Previous</span>';
  carouselActions.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--next');
  nextButton.type = 'button';
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('data-cmp-hook-carousel', 'next');
  nextButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Next</span>';
  carouselActions.append(nextButton);

  const pauseButton = document.createElement('button');
  pauseButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--pause');
  pauseButton.type = 'button';
  pauseButton.setAttribute('aria-label', 'Pause');
  pauseButton.setAttribute('data-cmp-hook-carousel', 'pause');
  pauseButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Pause</span>';
  carouselActions.append(pauseButton);

  const playButton = document.createElement('button');
  playButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--play', 'cmp-carousel__action--disabled');
  playButton.type = 'button';
  playButton.setAttribute('aria-label', 'Play');
  playButton.setAttribute('data-cmp-hook-carousel', 'play');
  playButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Play</span>';
  carouselActions.append(playButton);

  swiperContainer.append(carouselActions);

  const swiperNavContainer = document.createElement('div');
  swiperNavContainer.classList.add('swiper-container');

  const nextButtonWrapper = document.createElement('div');
  const nextNavButton = document.createElement('button');
  nextNavButton.classList.add('primary-swiper__buttonNext', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click', 'disabled');
  nextNavButton.disabled = true;
  nextButtonWrapper.append(nextNavButton);
  swiperNavContainer.append(nextButtonWrapper);

  const prevButtonWrapper = document.createElement('div');
  const prevNavButton = document.createElement('button');
  prevNavButton.classList.add('primary-swiper__buttonPrev', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click');
  prevButtonWrapper.append(prevNavButton);
  swiperNavContainer.append(prevButtonWrapper);

  swiperContainer.append(swiperNavContainer);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'primary-swiper-pagination', 'pagination-set', 'mb-md-8', 'mb-10', 'mt-6', 'position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  swiperContainer.append(swiperPagination);

  wrapper.append(swiperContainer);
  block.textContent = '';
  block.append(wrapper);

  // Swiper initialization logic (simplified, actual Swiper.js would be loaded externally)
  const slides = [...swiperWrapper.children];
  let currentIndex = 0;

  const updateCarousel = () => {
    slides.forEach((slide, i) => {
      slide.classList.remove('cmp-carousel__item--active', 'swiper-slide-prev', 'swiper-slide-active');
      slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
    slides[currentIndex].classList.add('cmp-carousel__item--active', 'swiper-slide-active');
    if (currentIndex > 0) {
      slides[currentIndex - 1].classList.add('swiper-slide-prev');
    }
    // Update pagination bullets
    swiperPagination.innerHTML = '';
    slides.forEach((_, i) => {
      const bullet = document.createElement('span');
      bullet.classList.add('swiper-pagination-bullet');
      if (i === currentIndex) {
        bullet.classList.add('swiper-pagination-bullet-active');
      }
      bullet.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      swiperPagination.append(bullet);
    });

    nextNavButton.disabled = currentIndex === slides.length - 1;
    prevNavButton.disabled = currentIndex === 0;
  };

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  prevNavButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextNavButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  let autoplayInterval;
  const startAutoplay = () => {
    if (swiperContainer.getAttribute('data-is-autoplay') === 'true') {
      const delay = parseInt(swiperContainer.getAttribute('data-delay'), 10) || 5000;
      autoplayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }, delay);
      playButton.classList.add('cmp-carousel__action--disabled');
      pauseButton.classList.remove('cmp-carousel__action--disabled');
    }
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
    playButton.classList.remove('cmp-carousel__action--disabled');
    pauseButton.classList.add('cmp-carousel__action--disabled');
  };

  pauseButton.addEventListener('click', stopAutoplay);
  playButton.addEventListener('click', startAutoplay);

  updateCarousel();
  startAutoplay();
}
