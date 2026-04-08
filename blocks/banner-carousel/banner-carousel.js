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

  const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination', 'primary-swiper-pagination', 'pagination-set', 'mb-md-8', 'mb-10', 'mt-6', 'position-absolute', 'swiper-pagination-clickable', 'swiper-pagination-bullets', 'swiper-pagination-horizontal');

  const navContainer = document.createElement('div');
  navContainer.classList.add('swiper-container');

  const nextButtonWrapper = document.createElement('div');
  const nextButton = document.createElement('button');
  nextButton.classList.add('primary-swiper__buttonNext', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click', 'disabled');
  nextButton.disabled = true;
  nextButtonWrapper.append(nextButton);

  const prevButtonWrapper = document.createElement('div');
  const prevButton = document.createElement('button');
  prevButton.classList.add('primary-swiper__buttonPrev', 'position-absolute', 'top-50', 'swiper-buttonBg', 'd-none', 'd-sm-block', 'cursor-pointer', 'analytics_cta_click');
  prevButtonWrapper.append(prevButton);

  navContainer.append(nextButtonWrapper, prevButtonWrapper);

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('cmp-carousel__actions');

  const prevAction = document.createElement('button');
  prevAction.classList.add('cmp-carousel__action', 'cmp-carousel__action--previous');
  prevAction.type = 'button';
  prevAction.setAttribute('aria-label', 'Previous');
  prevAction.setAttribute('data-cmp-hook-carousel', 'previous');
  prevAction.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Previous</span>';
  actionsDiv.append(prevAction);

  const nextAction = document.createElement('button');
  nextAction.classList.add('cmp-carousel__action', 'cmp-carousel__action--next');
  nextAction.type = 'button';
  nextAction.setAttribute('aria-label', 'Next');
  nextAction.setAttribute('data-cmp-hook-carousel', 'next');
  nextAction.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Next</span>';
  actionsDiv.append(nextAction);

  const pauseAction = document.createElement('button');
  pauseAction.classList.add('cmp-carousel__action', 'cmp-carousel__action--pause');
  pauseAction.type = 'button';
  pauseAction.setAttribute('aria-label', 'Pause');
  pauseAction.setAttribute('data-cmp-hook-carousel', 'pause');
  pauseAction.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Pause</span>';
  actionsDiv.append(pauseAction);

  const playAction = document.createElement('button');
  playAction.classList.add('cmp-carousel__action', 'cmp-carousel__action--play', 'cmp-carousel__action--disabled');
  playAction.type = 'button';
  playAction.setAttribute('aria-label', 'Play');
  playAction.setAttribute('data-cmp-hook-carousel', 'play');
  playAction.innerHTML = '<span class="cmp-carousel__action-icon"></span><span class="cmp-carousel__action-text">Play</span>';
  actionsDiv.append(playAction);

  let slideIndex = 0;
  [...block.children].forEach((row, index) => {
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide', 'primary-swiper-slide', 'banner');
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    swiperSlide.setAttribute('data-cmp-hook-carousel', 'item');

    if (index === 0) {
      swiperSlide.classList.add('cmp-carousel__item--active', 'swiper-slide-prev');
      swiperSlide.setAttribute('data-active', '1');
    } else if (index === 1) {
      swiperSlide.classList.add('swiper-slide-active');
    }

    const bannerSection = document.createElement('section');
    bannerSection.classList.add('banner-section');

    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');

    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');

    const bannerCta = document.createElement('div');
    bannerCta.classList.add('banner-cta');
    ctaWrapper.append(bannerCta);

    let videoEl = null;
    let imageEl = null;
    let ctaLink = null;
    let ctaLinkLabel = '';

    // Content detection for cells
    const cells = [...row.children];
    const videoCell = cells.find(cell => cell.querySelector('picture img[alt="Video"]'));
    const imageCell = cells.find(cell => cell.querySelector('picture img[alt="Image"]'));
    const ctaLinkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('https://example.com/ctaLink'));
    const ctaLinkLabelCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href.includes('https://example.com/ctalinklabel'));

    if (videoCell) {
      videoEl = videoCell.querySelector('source') ? videoCell.querySelector('source').src : videoCell.querySelector('img').src;
    }
    if (imageCell) {
      imageEl = imageCell.querySelector('picture');
    }
    if (ctaLinkCell) {
      ctaLink = ctaLinkCell.querySelector('a').href;
      ctaLinkLabel = ctaLinkCell.querySelector('a').textContent.trim();
    } else if (ctaLinkLabelCell) { // Fallback for ctaLinkLabel if it's a separate cell with a link
      ctaLink = ctaLinkLabelCell.querySelector('a').href;
      ctaLinkLabel = ctaLinkLabelCell.querySelector('a').textContent.trim();
    }


    if (videoEl) {
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
      source.src = videoEl;
      source.type = 'video/mp4';
      video.append(source);
      videoWrapper.append(video);

      const videoControls = document.createElement('div');
      videoControls.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

      const playButton = document.createElement('button');
      playButton.type = 'button';
      playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      playButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775655819452.svg+xml"/>';
      videoControls.append(playButton);

      const pauseButton = document.createElement('button');
      pauseButton.type = 'button';
      pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      pauseButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775655819751.svg+xml"/>';
      videoControls.append(pauseButton);

      const muteControls = document.createElement('div');
      muteControls.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

      const muteButton = document.createElement('button');
      muteButton.type = 'button';
      muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      muteButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775655819908.svg+xml"/>';
      muteControls.append(muteButton);

      const unmuteButton = document.createElement('button');
      unmuteButton.type = 'button';
      unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      unmuteButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775655820102.svg+xml"/>';
      muteControls.append(unmuteButton);

      const noAudioButton = document.createElement('button');
      noAudioButton.type = 'button';
      noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      noAudioButton.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1775655820272.svg+xml"/>';
      muteControls.append(noAudioButton);

      videoWrapper.append(videoControls, muteControls);
      bannerWrapper.append(videoWrapper);

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
    } else if (imageEl) {
      const img = imageEl.querySelector('img');
      if (img) {
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt;
        newImg.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'banner-image');
        newImg.loading = 'eager';
        newImg.fetchPriority = 'high';
        newImg.decoding = 'async';
        bannerWrapper.append(newImg);
        moveInstrumentation(imageEl, newImg);
      }
    }

    if (ctaLink && ctaLinkLabel) {
      const ctaDiv = document.createElement('div');
      ctaDiv.classList.add('text-center');

      const ctaAnchor = document.createElement('a');
      ctaAnchor.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Unique ID
      ctaAnchor.classList.add('cmp-button', 'analytics_cta_click', 'text-center', 'cta-layout');
      ctaAnchor.setAttribute('data-link-region', 'CTA');
      ctaAnchor.setAttribute('data-is-internal', 'true');
      ctaAnchor.setAttribute('data-enable-gating', 'false');
      ctaAnchor.href = ctaLink;
      ctaAnchor.target = '_blank';

      const ctaSpan = document.createElement('span');
      ctaSpan.classList.add('cmp-button__text', 'primary-btn', 'w-75', 'p-5', 'rounded-pill', 'd-inline-flex', 'justify-content-center', 'align-items-center', 'famlf-cta-btn');
      ctaSpan.textContent = ctaLinkLabel;
      ctaAnchor.append(ctaSpan);
      ctaDiv.append(ctaAnchor);

      const popupDiv = document.createElement('div');
      popupDiv.classList.add('pop-up', 'd-none');
      popupDiv.innerHTML = '<input type="hidden" class="popup-message"><input type="hidden" class="proceed-button-label"><input type="hidden" class="cancel-button-label"><input type="hidden" class="background-color">';
      ctaDiv.append(popupDiv);

      bannerCta.append(ctaDiv);
    }

    bannerWrapper.append(ctaWrapper);
    bannerSection.append(bannerWrapper);
    swiperSlide.append(bannerSection);
    swiperWrapper.append(swiperSlide);

    const paginationBullet = document.createElement('span');
    paginationBullet.classList.add('swiper-pagination-bullet');
    if (index === 0) {
      paginationBullet.classList.add('swiper-pagination-bullet-active');
    }
    paginationDiv.append(paginationBullet);
    slideIndex += 1;
  });

  swiperContainer.append(swiperWrapper, actionsDiv, navContainer, paginationDiv);
  wrapper.append(swiperContainer);

  // Swiper navigation logic
  const slides = [...swiperWrapper.children];
  let currentSlide = 0;

  const updateSwiper = () => {
    slides.forEach((slide, idx) => {
      slide.classList.remove('cmp-carousel__item--active', 'swiper-slide-prev', 'swiper-slide-active');
      slide.removeAttribute('data-active');
      if (idx === currentSlide) {
        slide.classList.add('swiper-slide-active');
        slide.setAttribute('data-active', '1');
      } else if (idx === (currentSlide - 1 + slides.length) % slides.length) {
        slide.classList.add('swiper-slide-prev');
      }
    });

    [...paginationDiv.children].forEach((bullet, idx) => {
      bullet.classList.remove('swiper-pagination-bullet-active');
      if (idx === currentSlide) {
        bullet.classList.add('swiper-pagination-bullet-active');
      }
    });

    // Update button states
    nextButton.disabled = currentSlide === slides.length - 1;
    prevButton.disabled = currentSlide === 0;
    if (nextButton.disabled) {
      nextButton.classList.add('disabled');
    } else {
      nextButton.classList.remove('disabled');
    }
    if (prevButton.disabled) {
      prevButton.classList.add('disabled');
    } else {
      prevButton.classList.remove('disabled');
    }
  };

  const goToSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    // The original JS hardcoded 508px. This should ideally be dynamic or handled by CSS.
    // For now, keeping the hardcoded value as it's from the original generated JS.
    swiperWrapper.style.transform = `translate3d(-${currentSlide * 508}px, 0px, 0px)`;
    updateSwiper();
  };

  nextButton.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  });

  nextAction.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    }
  });

  prevAction.addEventListener('click', () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  });

  [...paginationDiv.children].forEach((bullet, idx) => {
    bullet.addEventListener('click', () => {
      goToSlide(idx);
    });
  });

  // Autoplay logic (simplified)
  let autoplayInterval;
  const startAutoplay = () => {
    if (swiperContainer.getAttribute('data-is-autoplay') === 'true') {
      const delay = parseInt(swiperContainer.getAttribute('data-delay'), 10) || 5000;
      autoplayInterval = setInterval(() => {
        goToSlide((currentSlide + 1) % slides.length);
      }, delay);
      pauseAction.classList.remove('cmp-carousel__action--disabled');
      playAction.classList.add('cmp-carousel__action--disabled');
    }
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
    pauseAction.classList.add('cmp-carousel__action--disabled');
    playAction.classList.remove('cmp-carousel__action--disabled');
  };

  pauseAction.addEventListener('click', stopAutoplay);
  playAction.addEventListener('click', startAutoplay);

  startAutoplay(); // Start autoplay initially

  // Initial update
  updateSwiper();

  block.textContent = '';
  block.append(wrapper);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
