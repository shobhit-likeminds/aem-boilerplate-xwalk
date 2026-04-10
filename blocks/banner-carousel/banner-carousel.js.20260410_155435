import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative');

  const primarySwiper = document.createElement('div');
  primarySwiper.classList.add('swiper', 'primary-swiper', 'primary-swiper-carousel-419d8524f7', 'swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
  primarySwiper.setAttribute('role', 'group');
  primarySwiper.setAttribute('aria-live', 'polite');
  primarySwiper.setAttribute('aria-roledescription', 'carousel');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'primary-swiper-wrapper', 'z-0');

  const carouselActions = document.createElement('div');
  carouselActions.classList.add('cmp-carousel__actions');

  const prevButton = document.createElement('button');
  prevButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--previous');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Previous</span>';
  carouselActions.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--next');
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Next</span>';
  carouselActions.append(nextButton);

  const pauseButton = document.createElement('button');
  pauseButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--pause');
  pauseButton.setAttribute('type', 'button');
  pauseButton.setAttribute('aria-label', 'Pause');
  pauseButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Pause</span>';
  carouselActions.append(pauseButton);

  const playButton = document.createElement('button');
  playButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--play', 'cmp-carousel__action--disabled');
  playButton.setAttribute('type', 'button');
  playButton.setAttribute('aria-label', 'Play');
  playButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Play</span>';
  carouselActions.append(playButton);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper-container');

  const nextNavButtonWrapper = document.createElement('div');
  const nextNavButton = document.createElement('button');
  nextNavButton.classList.add('primary-swiper__buttonNext', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click', 'disabled');
  nextNavButton.setAttribute('disabled', '');
  nextNavButtonWrapper.append(nextNavButton);
  swiperContainer.append(nextNavButtonWrapper);

  const prevNavButtonWrapper = document.createElement('div');
  const prevNavButton = document.createElement('button');
  prevNavButton.classList.add('primary-swiper__buttonPrev', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click');
  prevNavButtonWrapper.append(prevNavButton);
  swiperContainer.append(prevNavButtonWrapper);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination', 'primary-swiper-pagination', 'pagination-set', 'mb-md-8', 'mb-10', 'mt-6', 'position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');

  [...block.children].forEach((row, index) => {
    // CRITICAL FIX: Replaced row.children[n] with content detection
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const videoCell = cells.find(cell => cell.querySelector('a') && /\.(mp4|webm|ogg|mov)$/i.test(cell.querySelector('a').href));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && !/\.(mp4|webm|ogg|mov)$/i.test(cell.querySelector('a').href));
    const ctaLinkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'primary-swiper-slide');
    if (index === 0) {
      slide.classList.add('cmp-carousel__item--active', 'swiper-slide-prev');
    } else if (index === 1) {
      slide.classList.add('swiper-slide-active');
    }
    slide.setAttribute('role', 'tabpanel');
    slide.setAttribute('aria-roledescription', 'slide');

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('banner');

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('banner-section');

    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');

    const videoLink = videoCell ? videoCell.querySelector('a') : null;
    const imagePicture = imageCell ? imageCell.querySelector('picture') : null;

    if (videoLink && /\.(mp4|webm|ogg|mov)$/i.test(videoLink.href)) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');

      const videoEl = document.createElement('video');
      videoEl.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
      videoEl.setAttribute('title', 'Video');
      videoEl.setAttribute('aria-label', 'Video');
      videoEl.setAttribute('playsinline', '');
      videoEl.setAttribute('preload', 'metadata');
      videoEl.setAttribute('fetchpriority', 'high');
      videoEl.setAttribute('muted', 'true');
      videoEl.setAttribute('autoplay', 'true');
      videoEl.loop = false; // Based on original HTML

      const source = document.createElement('source');
      source.src = videoLink.href;
      source.type = `video/${videoLink.href.split('.').pop()}`;
      videoEl.append(source);
      videoWrapper.append(videoEl);

      const playPauseOverlay = document.createElement('div');
      playPauseOverlay.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

      const playButtonOverlay = document.createElement('button');
      playButtonOverlay.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      playButtonOverlay.setAttribute('type', 'button');
      playButtonOverlay.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775811715126.svg+xml"/>';
      playPauseOverlay.append(playButtonOverlay);

      const pauseButtonOverlay = document.createElement('button');
      pauseButtonOverlay.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      pauseButtonOverlay.setAttribute('type', 'button');
      pauseButtonOverlay.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775811715165.svg+xml"/>';
      playPauseOverlay.append(pauseButtonOverlay);
      videoWrapper.append(playPauseOverlay);

      const muteOverlay = document.createElement('div');
      muteOverlay.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

      const muteButtonOverlay = document.createElement('button');
      muteButtonOverlay.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      muteButtonOverlay.setAttribute('type', 'button');
      muteButtonOverlay.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775811715205.svg+xml"/>';
      muteOverlay.append(muteButtonOverlay);

      const unmuteButtonOverlay = document.createElement('button');
      unmuteButtonOverlay.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      unmuteButtonOverlay.setAttribute('type', 'button');
      unmuteButtonOverlay.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775811715260.svg+xml"/>';
      muteOverlay.append(unmuteButtonOverlay);

      const noAudioButtonOverlay = document.createElement('button');
      noAudioButtonOverlay.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      noAudioButtonOverlay.setAttribute('type', 'button');
      noAudioButtonOverlay.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775811715294.svg+xml"/>';
      muteOverlay.append(noAudioButtonOverlay);
      videoWrapper.append(muteOverlay);

      bannerWrapper.append(videoWrapper);

      // Add event listeners for video controls
      playButtonOverlay.addEventListener('click', () => {
        videoEl.play();
        playButtonOverlay.classList.add('d-none');
        pauseButtonOverlay.classList.remove('d-none');
      });

      pauseButtonOverlay.addEventListener('click', () => {
        videoEl.pause();
        playButtonOverlay.classList.remove('d-none');
        pauseButtonOverlay.classList.add('d-none');
      });

      muteButtonOverlay.addEventListener('click', () => {
        videoEl.muted = true;
        muteButtonOverlay.classList.add('d-none');
        unmuteButtonOverlay.classList.remove('d-none');
        noAudioButtonOverlay.classList.add('d-none');
      });

      unmuteButtonOverlay.addEventListener('click', () => {
        videoEl.muted = false;
        muteButtonOverlay.classList.remove('d-none');
        unmuteButtonOverlay.classList.add('d-none');
        noAudioButtonOverlay.classList.add('d-none');
      });

      noAudioButtonOverlay.addEventListener('click', () => {
        videoEl.muted = false;
        muteButtonOverlay.classList.remove('d-none');
        unmuteButtonOverlay.classList.add('d-none');
        noAudioButtonOverlay.classList.add('d-none');
      });

      videoEl.addEventListener('play', () => {
        playButtonOverlay.classList.add('d-none');
        pauseButtonOverlay.classList.remove('d-none');
      });

      videoEl.addEventListener('pause', () => {
        playButtonOverlay.classList.remove('d-none');
        pauseButtonOverlay.classList.add('d-none');
      });

      videoEl.addEventListener('volumechange', () => {
        if (videoEl.muted) {
          muteButtonOverlay.classList.add('d-none');
          unmuteButtonOverlay.classList.remove('d-none');
          noAudioButtonOverlay.classList.add('d-none');
        } else if (videoEl.volume === 0) {
          muteButtonOverlay.classList.add('d-none');
          unmuteButtonOverlay.classList.add('d-none');
          noAudioButtonOverlay.classList.remove('d-none');
        } else {
          muteButtonOverlay.classList.remove('d-none');
          unmuteButtonOverlay.classList.add('d-none');
          noAudioButtonOverlay.classList.add('d-none');
        }
      });
    } else if (imagePicture) {
      const img = imagePicture.querySelector('img');
      const newImg = createOptimizedPicture(img.src, img.alt, index === 0, [{ width: '750' }]);
      const newImgEl = newImg.querySelector('img');
      newImgEl.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'banner-image');
      newImgEl.setAttribute('loading', index === 0 ? 'eager' : 'lazy');
      newImgEl.setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
      moveInstrumentation(imagePicture, newImgEl);
      bannerWrapper.append(newImg);
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('banner-cta');

    const ctaContainer = document.createElement('div');
    ctaContainer.classList.add('text-center');

    const ctaLink = ctaLinkCell ? ctaLinkCell.querySelector('a') : null;
    if (ctaLink) {
      const ctaAnchor = document.createElement('a');
      ctaAnchor.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      ctaAnchor.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'cta-layout');
      ctaAnchor.href = ctaLink.href;
      ctaAnchor.target = '_blank'; // From original HTML
      ctaAnchor.setAttribute('data-link-region', 'CTA');
      ctaAnchor.setAttribute('data-is-internal', 'true');
      ctaAnchor.setAttribute('data-enable-gating', 'false');

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('cmp-button__text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'famlf-cta-btn');
      ctaSpan.textContent = ctaLinkLabelCell ? ctaLinkLabelCell.textContent.trim() : '';
      ctaAnchor.append(ctaSpan);
      ctaContainer.append(ctaAnchor);
    }

    const popupDiv = document.createElement('div');
    popupDiv.classList.add('pop-up', 'd-none');
    popupDiv.innerHTML = `
      <input type="hidden" class="popup-message">
      <input type="hidden" class="proceed-button-label">
      <input type="hidden" class="cancel-button-label">
      <input type="hidden" class="background-color">
    `;
    ctaContainer.append(popupDiv);

    bannerCta.append(ctaContainer);
    ctaWrapper.append(bannerCta);
    bannerWrapper.append(ctaWrapper);
    bannerSection.append(bannerWrapper);
    bannerDiv.append(bannerSection);
    moveInstrumentation(row, slide);
    slide.append(bannerDiv);
    swiperWrapper.append(slide);

    const paginationBullet = document.createElement('span');
    paginationBullet.classList.add('swiper-pagination-bullet');
    if (index === 0) {
      paginationBullet.classList.add('swiper-pagination-bullet-active');
    }
    swiperPagination.append(paginationBullet);
  });

  primarySwiper.append(swiperWrapper);
  primarySwiper.append(carouselActions);
  primarySwiper.append(swiperContainer);
  primarySwiper.append(swiperPagination);
  wrapper.append(primarySwiper);

  block.textContent = '';
  block.append(wrapper);

  // Swiper initialization (simplified, full Swiper logic would be complex)
  let currentIndex = 0;
  const slides = [...swiperWrapper.children];
  const bullets = [...swiperPagination.children];
  const totalSlides = slides.length;

  const updateCarousel = () => {
    slides.forEach((slide, i) => {
      slide.classList.remove('cmp-carousel__item--active', 'swiper-slide-active', 'swiper-slide-prev');
      if (i === currentIndex) {
        slide.classList.add('cmp-carousel__item--active', 'swiper-slide-active');
      } else if (i === (currentIndex - 1 + totalSlides) % totalSlides) {
        slide.classList.add('swiper-slide-prev');
      }
    });
    // Ensure slides[0] exists before accessing offsetWidth
    if (slides.length > 0) {
      swiperWrapper.style.transform = `translate3d(-${currentIndex * slides[0].offsetWidth}px, 0px, 0px)`;
    }

    bullets.forEach((bullet, i) => {
      bullet.classList.toggle('swiper-pagination-bullet-active', i === currentIndex);
    });

    prevNavButton.disabled = currentIndex === 0;
    prevNavButton.classList.toggle('disabled', currentIndex === 0);
    nextNavButton.disabled = currentIndex === totalSlides - 1;
    nextNavButton.classList.toggle('disabled', currentIndex === totalSlides - 1);
  };

  const goToSlide = (index) => {
    currentIndex = (index + totalSlides) % totalSlides;
    updateCarousel();
  };

  nextButton.addEventListener('click', () => goToSlide(currentIndex + 1));
  nextNavButton.addEventListener('click', () => goToSlide(currentIndex + 1));
  prevButton.addEventListener('click', () => goToSlide(currentIndex - 1));
  prevNavButton.addEventListener('click', () => goToSlide(currentIndex - 1));

  bullets.forEach((bullet, i) => {
    bullet.addEventListener('click', () => goToSlide(i));
  });

  let autoplayInterval;
  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
    playButton.classList.add('cmp-carousel__action--disabled');
    pauseButton.classList.remove('cmp-carousel__action--disabled');
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
