import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative');

  const swiper = document.createElement('div');
  swiper.classList.add(
    'swiper',
    'primary-swiper',
    'primary-swiper-carousel-419d8524f7',
    'swiper-initialized',
    'swiper-horizontal',
    'swiper-backface-hidden',
  );
  swiper.setAttribute('data-swiper-id', '.primary-swiper-carousel-419d8524f7');
  swiper.id = 'carousel-419d8524f7';
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');
  swiper.setAttribute('data-is-autoplay', 'true');
  swiper.setAttribute('data-delay', '5000');
  swiper.setAttribute('data-autopause-disabled', 'true');
  swiper.setAttribute('data-is-loop', 'false');
  swiper.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper', 'primary-swiper-wrapper', 'z-0');

  [...block.children].forEach((row, index) => {
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

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('banner-section');

    const bannerSectionWrapper = document.createElement('div');
    bannerSectionWrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');

    // Use content detection instead of index access
    const cells = [...row.children];
    const videoCell = cells.find((cell) => cell.querySelector('a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"], a[href$=".mov"]'));
    const imageCell = cells.find((cell) => cell.querySelector('picture') && !videoCell); // Image cell if no video
    const ctaLinkCell = cells.find((cell) => cell.querySelector('a') && cell !== videoCell); // CTA link cell
    const ctaLinkLabelCell = cells.find((cell) => !cell.querySelector('a') && cell !== videoCell && cell !== imageCell); // CTA label cell

    const videoLink = videoCell ? videoCell.querySelector('a') : null;
    const videoPicture = videoCell ? videoCell.querySelector('picture') : null;
    const imagePicture = imageCell ? imageCell.querySelector('picture') : null;

    if (videoLink && /\.(mp4|webm|ogg|mov)$/i.test(videoLink.href)) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');

      const video = document.createElement('video');
      video.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
      video.title = 'Video';
      video.ariaLabel = 'Video';
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.loop = false;
      video.preload = 'metadata';
      video.fetchPriority = 'high';

      const source = document.createElement('source');
      source.src = videoLink.href;
      source.type = 'video/mp4';
      video.append(source);
      videoWrapper.append(video);

      const playPauseOverlay = document.createElement('div');
      playPauseOverlay.classList.add(
        'position-absolute',
        'w-100',
        'h-100',
        'start-0',
        'top-0',
        'd-flex',
        'justify-content-center',
        'align-items-center',
        'cursor-pointer',
      );

      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.classList.add(
        'd-none',
        'video-icon',
        'icon-play',
        'bg-transparent',
        'd-flex',
        'align-items-center',
        'justify-content-center',
        'cursor-pointer',
      );
      playButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775815892662.svg+xml"/>';
      playPauseOverlay.append(playButton);

      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.classList.add(
        'd-block',
        'video-icon',
        'icon-pause',
        'bg-transparent',
        'd-flex',
        'align-items-center',
        'justify-content-center',
        'cursor-pointer',
      );
      pauseButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775815892740.svg+xml"/>';
      playPauseOverlay.append(pauseButton);
      videoWrapper.append(playPauseOverlay);

      const muteOverlay = document.createElement('div');
      muteOverlay.classList.add(
        'position-absolute',
        'z-2',
        'd-flex',
        'justify-content-center',
        'align-items-center',
        'cursor-pointer',
        'mute-icon',
      );

      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.classList.add(
        'video-icon-volume',
        'icon-mute',
        'bg-transparent',
        'd-flex',
        'align-items-center',
        'justify-content-center',
        'cursor-pointer',
        'd-none',
      );
      muteButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775815893441.svg+xml"/>';
      muteOverlay.append(muteButton);

      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.classList.add(
        'video-icon-volume',
        'icon-unmute',
        'bg-transparent',
        'd-flex',
        'align-items-center',
        'justify-content-center',
        'cursor-pointer',
        'd-none',
      );
      unmuteButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775815893604.svg+xml"/>';
      muteOverlay.append(unmuteButton);

      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.classList.add(
        'video-icon-volume',
        'no-audio-icon',
        'bg-transparent',
        'd-flex',
        'align-items-center',
        'justify-content-center',
        'cursor-pointer',
      );
      noAudioButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775815893657.svg+xml"/>';
      muteOverlay.append(noAudioButton);
      videoWrapper.append(muteOverlay);

      bannerSectionWrapper.append(videoWrapper);

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
        video.muted = true;
        muteButton.classList.add('d-none');
        unmuteButton.classList.add('d-none');
        noAudioButton.classList.remove('d-none');
      });

      unmuteButton.addEventListener('click', () => {
        video.muted = false;
        unmuteButton.classList.add('d-none');
        muteButton.classList.remove('d-none');
        noAudioButton.classList.add('d-none');
      });

      noAudioButton.addEventListener('click', () => {
        video.muted = false;
        noAudioButton.classList.add('d-none');
        muteButton.classList.remove('d-none');
      });
    } else if (imagePicture) {
      const img = imagePicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
        optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'banner-image');
        optimizedPic.querySelector('img').setAttribute('loading', 'eager');
        optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
        optimizedPic.querySelector('img').setAttribute('decoding', 'async');
        bannerSectionWrapper.append(optimizedPic);
      }
    } else if (videoPicture) {
      // Fallback for video field containing a picture (e.g., poster image)
      const img = videoPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
        optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'banner-image');
        optimizedPic.querySelector('img').setAttribute('loading', 'eager');
        optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
        optimizedPic.querySelector('img').setAttribute('decoding', 'async');
        bannerSectionWrapper.append(optimizedPic);
      }
    }

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('banner-cta');

    const textCenter = document.createElement('div');
    textCenter.classList.add('text-center');

    const ctaLink = ctaLinkCell ? ctaLinkCell.querySelector('a') : null;
    if (ctaLink && ctaLinkLabelCell) {
      const anchor = document.createElement('a');
      anchor.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
      anchor.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'cta-layout');
      anchor.href = ctaLink.href;
      anchor.setAttribute('data-link-region', 'CTA');
      anchor.setAttribute('data-is-internal', 'true');
      anchor.setAttribute('data-enable-gating', 'false');
      anchor.setAttribute('target', '_blank');

      const span = document.createElement('span');
      span.classList.add(
        'cmp-button__text',
        'primary-btn',
        'w-75',
        'p-5',
        'rounded-pill',
        'd-inline-flex',
        'justify-content-center',
        'align-items-center',
        'famlf-cta-btn',
      );
      span.textContent = ctaLinkLabelCell.textContent.trim();
      anchor.append(span);
      textCenter.append(anchor);

      const popupDiv = document.createElement('div');
      popupDiv.classList.add('pop-up', 'd-none');
      popupDiv.innerHTML = `
        <input type="hidden" class="popup-message">
        <input type="hidden" class="proceed-button-label">
        <input type="hidden" class="cancel-button-label">
        <input type="hidden" class="background-color">
      `;
      textCenter.append(popupDiv);
    }
    bannerCta.append(textCenter);
    ctaWrapper.append(bannerCta);
    bannerSectionWrapper.append(ctaWrapper);
    bannerSection.append(bannerSectionWrapper);
    bannerDiv.append(bannerSection);
    swiperSlide.append(bannerDiv);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  const cmpCarouselActions = document.createElement('div');
  cmpCarouselActions.classList.add('cmp-carousel__actions');

  const prevButton = document.createElement('button');
  prevButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--previous');
  prevButton.type = 'button';
  prevButton.ariaLabel = 'Previous';
  prevButton.setAttribute('data-cmp-hook-carousel', 'previous');
  prevButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Previous</span>';
  cmpCarouselActions.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--next');
  nextButton.type = 'button';
  nextButton.ariaLabel = 'Next';
  nextButton.setAttribute('data-cmp-hook-carousel', 'next');
  nextButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Next</span>';
  cmpCarouselActions.append(nextButton);

  const pauseButton = document.createElement('button');
  pauseButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--pause');
  pauseButton.type = 'button';
  pauseButton.ariaLabel = 'Pause';
  pauseButton.setAttribute('data-cmp-hook-carousel', 'pause');
  pauseButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Pause</span>';
  cmpCarouselActions.append(pauseButton);

  const playButton = document.createElement('button');
  playButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--play', 'cmp-carousel__action--disabled');
  playButton.type = 'button';
  playButton.ariaLabel = 'Play';
  playButton.setAttribute('data-cmp-hook-carousel', 'play');
  playButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Play</span>';
  cmpCarouselActions.append(playButton);

  swiper.append(cmpCarouselActions);

  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('swiper-container');

  const nextButtonWrapper = document.createElement('div');
  const nextSwiperButton = document.createElement('button');
  nextSwiperButton.classList.add(
    'primary-swiper__buttonNext',
    'position-absolute',
    'top-50',
    'swiper-buttonBg',
    'd-none',
    'd-sm-block',
    'cursor-pointer',
    'analytics_cta_click',
    'disabled',
  );
  nextSwiperButton.disabled = true;
  nextButtonWrapper.append(nextSwiperButton);
  swiperContainer.append(nextButtonWrapper);

  const prevButtonWrapper = document.createElement('div');
  const prevSwiperButton = document.createElement('button');
  prevSwiperButton.classList.add(
    'primary-swiper__buttonPrev',
    'position-absolute',
    'top-50',
    'swiper-buttonBg',
    'd-none',
    'd-sm-block',
    'cursor-pointer',
    'analytics_cta_click',
  );
  prevButtonWrapper.append(prevSwiperButton);
  swiperContainer.append(prevButtonWrapper);
  swiper.append(swiperContainer);

  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add(
    'swiper-pagination',
    'primary-swiper-pagination',
    'pagination-set',
    'mb-md-8',
    'mb-10',
    'mt-6',
    'position-absolute',
    'swiper-pagination-clickable',
    'swiper-pagination-bullets',
    'swiper-pagination-horizontal',
  );
  // Add pagination bullets based on number of slides
  [...block.children].forEach((_, index) => {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (index === 0) {
      bullet.classList.add('swiper-pagination-bullet-active');
    }
    swiperPagination.append(bullet);
  });
  swiper.append(swiperPagination);

  wrapper.append(swiper);
  block.textContent = '';
  block.append(wrapper);

  // Swiper logic (simplified for demonstration, full Swiper.js integration would be more complex)
  let currentIndex = 0;
  const slides = swiperWrapper.querySelectorAll('.swiper-slide');
  const totalSlides = slides.length;

  function updateCarousel() {
    slides.forEach((slide, i) => {
      slide.classList.remove('swiper-slide-prev', 'swiper-slide-active', 'cmp-carousel__item--active');
      slide.removeAttribute('data-active');
      if (i === currentIndex) {
        slide.classList.add('swiper-slide-active', 'cmp-carousel__item--active');
        slide.setAttribute('data-active', '1');
      } else if (i === (currentIndex - 1 + totalSlides) % totalSlides) {
        slide.classList.add('swiper-slide-prev');
      }
    });

    swiperWrapper.style.transform = `translate3d(-${currentIndex * slides[0].offsetWidth}px, 0px, 0px)`;

    swiperPagination.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, i) => {
      bullet.classList.toggle('swiper-pagination-bullet-active', i === currentIndex);
    });

    nextSwiperButton.disabled = currentIndex === totalSlides - 1;
    prevSwiperButton.disabled = currentIndex === 0;
    nextSwiperButton.classList.toggle('disabled', currentIndex === totalSlides - 1);
    prevSwiperButton.classList.toggle('disabled', currentIndex === 0);
  }

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  });

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });

  nextSwiperButton.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex += 1;
      updateCarousel();
    }
  });

  prevSwiperButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  });

  // Add event listeners for pagination bullets
  swiperPagination.querySelectorAll('.swiper-pagination-bullet').forEach((bullet, i) => {
    bullet.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
  });

  let autoplayInterval;
  let isPlaying = true;

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel();
    }, 5000);
    isPlaying = true;
    playButton.classList.add('cmp-carousel__action--disabled');
    pauseButton.classList.remove('cmp-carousel__action--disabled');
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
    isPlaying = false;
    pauseButton.classList.add('cmp-carousel__action--disabled');
    playButton.classList.remove('cmp-carousel__action--disabled');
  }

  pauseButton.addEventListener('click', stopAutoplay);
  playButton.addEventListener('click', startAutoplay);

  startAutoplay(); // Start autoplay initially
  updateCarousel(); // Initial state
}
