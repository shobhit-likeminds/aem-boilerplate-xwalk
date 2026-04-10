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

  const bannerRows = [...block.children];

  bannerRows.forEach((row, index) => {
    // CRITICAL FIX: Replaced row.children[n] with content detection
    const cells = [...row.children];
    const videoCell = cells.find(cell => cell.querySelector('a') && /\.(mp4|webm|ogg|mov)$/i.test(cell.querySelector('a').href));
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && !/\.(mp4|webm|ogg|mov)$/i.test(cell.querySelector('a').href));
    const ctaLinkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture')); // Assuming ctaLinkLabel is plain text or a link that's not a video/image

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'primary-swiper-slide');
    if (index === 0) {
      swiperSlide.classList.add('cmp-carousel__item--active', 'swiper-slide-prev');
      swiperSlide.setAttribute('data-active', '1');
    } else if (index === 1) {
      swiperSlide.classList.add('swiper-slide-active');
    }
    swiperSlide.id = `carousel-419d8524f7-item-${index}-tabpanel`;
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-labelledby', `carousel-419d8524f7-item-${index}-tab`);
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    swiperSlide.setAttribute('data-cmp-hook-carousel', 'item');

    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('banner');

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('banner-section');

    const bannerSectionWrapper = document.createElement('div');
    bannerSectionWrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');

    const videoLink = videoCell ? videoCell.querySelector('a') : null;
    const imagePicture = imageCell ? imageCell.querySelector('picture') : null;

    if (videoLink && /\.(mp4|webm|ogg|mov)$/i.test(videoLink.href)) {
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');

      const video = document.createElement('video');
      video.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
      video.title = 'Video';
      video.setAttribute('aria-label', 'Video');
      video.setAttribute('data-is-autoplay', 'true');
      video.playsInline = true;
      video.preload = 'metadata';
      video.fetchPriority = 'high';
      video.loop = false;
      video.muted = true;
      video.autoplay = true;

      const source = document.createElement('source');
      source.src = videoLink.href;
      source.type = 'video/mp4';
      video.append(source);
      videoWrapper.append(video);

      const controlsOverlay = document.createElement('div');
      controlsOverlay.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

      const playButton = document.createElement('button');
      playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      playButton.type = 'button';
      const playImg = document.createElement('img');
      playImg.alt = 'svg file';
      playImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775744424408.svg+xml'; // Placeholder, ideally from model
      playButton.append(playImg);
      controlsOverlay.append(playButton);

      const pauseButton = document.createElement('button');
      pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      pauseButton.type = 'button';
      const pauseImg = document.createElement('img');
      pauseImg.alt = 'svg file';
      pauseImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775744424426.svg+xml'; // Placeholder, ideally from model
      pauseButton.append(pauseImg);
      controlsOverlay.append(pauseButton);

      const muteIconDiv = document.createElement('div');
      muteIconDiv.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

      const muteButton = document.createElement('button');
      muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      muteButton.type = 'button';
      const muteImg = document.createElement('img');
      muteImg.alt = 'svg file';
      muteImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775744424465.svg+xml'; // Placeholder, ideally from model
      muteButton.append(muteImg);
      muteIconDiv.append(muteButton);

      const unmuteButton = document.createElement('button');
      unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      unmuteButton.type = 'button';
      const unmuteImg = document.createElement('img');
      unmuteImg.alt = 'svg file';
      unmuteImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775744424490.svg+xml'; // Placeholder, ideally from model
      unmuteButton.append(unmuteImg);
      muteIconDiv.append(unmuteButton);

      const noAudioButton = document.createElement('button');
      noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      noAudioButton.type = 'button';
      const noAudioImg = document.createElement('img');
      noAudioImg.alt = 'svg file';
      noAudioImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775744424589.svg+xml'; // Placeholder, ideally from model
      noAudioButton.append(noAudioImg);
      muteIconDiv.append(noAudioButton);

      videoWrapper.append(controlsOverlay, muteIconDiv);
      bannerSectionWrapper.append(videoWrapper);

      // Event listeners for video controls
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
        unmuteButton.classList.remove('d-none');
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

      video.addEventListener('play', () => {
        playButton.classList.add('d-none');
        pauseButton.classList.remove('d-none');
      });

      video.addEventListener('pause', () => {
        pauseButton.classList.add('d-none');
        playButton.classList.remove('d-none');
      });

      video.addEventListener('volumechange', () => {
        if (video.muted) {
          muteButton.classList.add('d-none');
          unmuteButton.classList.remove('d-none');
          noAudioButton.classList.remove('d-none');
        } else {
          unmuteButton.classList.add('d-none');
          muteButton.classList.remove('d-none');
          noAudioButton.classList.add('d-none');
        }
      });
    } else if (imagePicture) {
      const img = imagePicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
        optimizedPic.querySelector('img').classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'banner-image');
        optimizedPic.querySelector('img').setAttribute('loading', 'eager');
        optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
        optimizedPic.querySelector('img').setAttribute('decoding', 'async');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        bannerSectionWrapper.append(optimizedPic);
      }
    }

    const ctaDiv = document.createElement('div');
    ctaDiv.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

    const bannerCtaDiv = document.createElement('div');
    bannerCtaDiv.classList.add('banner-cta');

    const ctaLinkAnchor = ctaLinkCell ? ctaLinkCell.querySelector('a') : null;
    if (ctaLinkAnchor) {
      const ctaWrapperDiv = document.createElement('div');
      ctaWrapperDiv.classList.add('text-center');

      const ctaLink = document.createElement('a');
      ctaLink.id = `cta-${index}`;
      ctaLink.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'cta-layout');
      ctaLink.setAttribute('data-link-region', 'CTA');
      ctaLink.setAttribute('data-is-internal', 'true');
      ctaLink.setAttribute('data-enable-gating', 'false');
      ctaLink.href = ctaLinkAnchor.href;
      ctaLink.target = '_blank';

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('cmp-button__text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'famlf-cta-btn');
      ctaSpan.textContent = ctaLinkLabelCell ? ctaLinkLabelCell.textContent.trim() : ''; // Use ctaLinkLabelCell
      ctaLink.append(ctaSpan);
      ctaWrapperDiv.append(ctaLink);

      const popupDiv = document.createElement('div');
      popupDiv.classList.add('pop-up', 'd-none');
      popupDiv.innerHTML = `
        <input type="hidden" class="popup-message">
        <input type="hidden" class="proceed-button-label">
        <input type="hidden" class="cancel-button-label">
        <input type="hidden" class="background-color">
      `;
      ctaWrapperDiv.append(popupDiv);
      bannerCtaDiv.append(ctaWrapperDiv);
    }

    ctaDiv.append(bannerCtaDiv);
    bannerSectionWrapper.append(ctaDiv);
    bannerSection.append(bannerSectionWrapper);
    bannerDiv.append(bannerSection);
    swiperSlide.append(bannerDiv);
    swiperWrapper.append(swiperSlide);
    moveInstrumentation(row, swiperSlide);
  });

  swiperContainer.append(swiperWrapper);

  // Carousel actions (buttons)
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('cmp-carousel__actions');

  const prevButton = document.createElement('button');
  prevButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--previous');
  prevButton.type = 'button';
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('data-cmp-hook-carousel', 'previous');
  prevButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Previous</span>';
  actionsDiv.append(prevButton);

  const nextButton = document.createElement('button');
  nextButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--next');
  nextButton.type = 'button';
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('data-cmp-hook-carousel', 'next');
  nextButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Next</span>';
  actionsDiv.append(nextButton);

  const pauseButton = document.createElement('button');
  pauseButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--pause');
  pauseButton.type = 'button';
  pauseButton.setAttribute('aria-label', 'Pause');
  pauseButton.setAttribute('data-cmp-hook-carousel', 'pause');
  pauseButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Pause</span>';
  actionsDiv.append(pauseButton);

  const playButton = document.createElement('button');
  playButton.classList.add('cmp-carousel__action', 'cmp-carousel__action--play', 'cmp-carousel__action--disabled');
  playButton.type = 'button';
  playButton.setAttribute('aria-label', 'Play');
  playButton.setAttribute('data-cmp-hook-carousel', 'play');
  playButton.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Play</span>';
  actionsDiv.append(playButton);

  swiperWrapper.append(actionsDiv); // Actions are inside swiper-wrapper in original HTML

  const swiperNavContainer = document.createElement('div');
  swiperNavContainer.classList.add('swiper-container');

  const nextNavButtonDiv = document.createElement('div');
  const nextNavButton = document.createElement('button');
  nextNavButton.classList.add('primary-swiper__buttonNext', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click', 'disabled');
  nextNavButton.disabled = true;
  nextNavButtonDiv.append(nextNavButton);
  swiperNavContainer.append(nextNavButtonDiv);

  const prevNavButtonDiv = document.createElement('div');
  const prevNavButton = document.createElement('button');
  prevNavButton.classList.add('primary-swiper__buttonPrev', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click');
  prevNavButtonDiv.append(prevNavButton);
  swiperNavContainer.append(prevNavButtonDiv);

  swiperContainer.append(swiperNavContainer);

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination', 'primary-swiper-pagination', 'pagination-set', 'mb-md-8', 'mb-10', 'mt-6', 'position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');
  // Add initial bullets
  bannerRows.forEach((_, i) => {
    const bullet = document.createElement('span');
    bullet.classList.add('swiper-pagination-bullet');
    if (i === 0) {
      bullet.classList.add('swiper-pagination-bullet-active');
    }
    paginationDiv.append(bullet);
  });
  swiperContainer.append(paginationDiv);

  wrapper.append(swiperContainer);

  block.textContent = '';
  block.append(wrapper);

  // Swiper logic (simplified for demonstration, full Swiper.js integration would be more complex)
  let currentIndex = 0;
  const slides = [...swiperWrapper.children].filter(child => child.classList.contains('swiper-slide')); // Filter out actionsDiv
  const bullets = [...paginationDiv.children];

  const updateCarousel = () => {
    slides.forEach((slide, i) => {
      slide.classList.remove('swiper-slide-prev', 'swiper-slide-active', 'cmp-carousel__item--active');
      slide.removeAttribute('data-active');
      bullets[i].classList.remove('swiper-pagination-bullet-active');
    });

    slides[currentIndex].classList.add('swiper-slide-active', 'cmp-carousel__item--active');
    slides[currentIndex].setAttribute('data-active', '1');
    bullets[currentIndex].classList.add('swiper-pagination-bullet-active');

    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    slides[prevIndex].classList.add('swiper-slide-prev');

    swiperWrapper.style.transform = `translate3d(-${currentIndex * slides[0].offsetWidth}px, 0px, 0px)`;
  };

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  bullets.forEach((bullet, i) => {
    bullet.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
  });

  // Autoplay functionality
  let autoplayInterval;
  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    }, parseInt(swiperContainer.getAttribute('data-delay'), 10));
    pauseButton.classList.remove('cmp-carousel__action--disabled');
    playButton.classList.add('cmp-carousel__action--disabled');
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
    playButton.classList.remove('cmp-carousel__action--disabled');
    pauseButton.classList.add('cmp-carousel__action--disabled');
  };

  if (swiperContainer.getAttribute('data-is-autoplay') === 'true') {
    startAutoplay();
  }

  pauseButton.addEventListener('click', stopAutoplay);
  playButton.addEventListener('click', startAutoplay);
}
