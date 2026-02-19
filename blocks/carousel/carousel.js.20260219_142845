import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselContainer = document.createElement('div');
  carouselContainer.className = 'carousel-container';

  const swiper = document.createElement('div');
  swiper.className = 'swiper carousel-primary-swiper';
  // Transfer attributes from the outer block if they exist, or set defaults
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');
  swiper.setAttribute('data-is-autoplay', block.dataset.isAutoplay || 'true');
  swiper.setAttribute('data-delay', block.dataset.delay || '5000');
  swiper.setAttribute('data-autopause-disabled', block.dataset.autopauseDisabled || 'true');
  swiper.setAttribute('data-is-loop', block.dataset.isLoop || 'false');
  swiper.setAttribute('data-placeholder-text', block.dataset.placeholderText || 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper carousel-primary-swiper-wrapper carousel-z-0';

  [...block.children].forEach((row) => {
    const swiperSlide = document.createElement('div');
    moveInstrumentation(row, swiperSlide);
    swiperSlide.className = 'swiper-slide carousel-primary-swiper-slide';
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');

    const carouselBanner = document.createElement('div');
    carouselBanner.className = 'carousel-banner';

    const carouselBannerSection = document.createElement('section');
    carouselBannerSection.className = 'carousel-banner-section';

    const carouselBannerSectionWrapper = document.createElement('div');
    carouselBannerSectionWrapper.className = 'carousel-position-relative carousel-boing carousel-banner-section__wrapper';

    const cells = [...row.children];

    // Check for video first, as per the first slide structure
    const videoCell = cells[1]; // Assuming video is in the second cell based on JSON
    const imageCell = cells[0]; // Assuming image is in the first cell based on JSON
    const ctaTextCell = cells[2]; // Assuming CTA text is in the third cell
    const ctaLinkCell = cells[3]; // Assuming CTA link is in the fourth cell

    const videoSource = videoCell?.querySelector('a[href$=".mp4"], a[href$=".webm"]');
    const image = imageCell?.querySelector('img');
    const ctaText = ctaTextCell?.textContent.trim();
    const ctaLink = ctaLinkCell?.querySelector('a');

    if (videoSource) {
      const videoWrapper = document.createElement('div');
      videoWrapper.className = 'carousel-video-wrapper';

      const videoElement = document.createElement('video');
      videoElement.className = 'carousel-w-100 carousel-object-fit-cover carousel-banner-media carousel-banner-video';
      videoElement.setAttribute('title', 'Video');
      videoElement.setAttribute('aria-label', 'Video');
      videoElement.setAttribute('data-is-autoplay', 'true');
      videoElement.setAttribute('playsinline', '');
      videoElement.setAttribute('preload', 'metadata');
      videoElement.setAttribute('fetchpriority', 'high');
      videoElement.setAttribute('loop', 'false');
      videoElement.setAttribute('muted', 'true');
      videoElement.setAttribute('autoplay', 'true');

      const sourceElement = document.createElement('source');
      sourceElement.src = videoSource.href;
      sourceElement.type = `video/${videoSource.href.split('.').pop()}`;
      videoElement.append(sourceElement);

      // Add play/pause and mute/unmute buttons structure (simplified for brevity)
      const controlsWrapper = document.createElement('div');
      controlsWrapper.className = 'carousel-position-absolute carousel-w-100 carousel-h-100 carousel-start-0 carousel-top-0 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer';
      // ... add play/pause buttons here ...

      const muteIconWrapper = document.createElement('div');
      muteIconWrapper.className = 'carousel-position-absolute carousel-z-2 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer carousel-mute-icon';
      // ... add mute/unmute buttons here ...

      videoWrapper.append(videoElement, controlsWrapper, muteIconWrapper);
      carouselBannerSectionWrapper.append(videoWrapper);
    } else if (image) {
      const optimizedPic = createOptimizedPicture(image.src, image.alt, true, [{ width: '2000' }]);
      moveInstrumentation(image, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'carousel-w-100 carousel-h-100 carousel-object-fit-cover carousel-banner-media carousel-banner-image';
      optimizedPic.querySelector('img').setAttribute('loading', 'eager');
      optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
      optimizedPic.querySelector('img').setAttribute('decoding', 'async');
      carouselBannerSectionWrapper.append(optimizedPic);
    }

    if (ctaText || ctaLink) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';

      const bannerCta = document.createElement('div');
      bannerCta.className = 'carousel-banner-cta';

      const textCenter = document.createElement('div');
      textCenter.className = 'carousel-text-center';

      if (ctaLink) {
        const newLink = document.createElement('a');
        newLink.id = `cta-${Math.random().toString(36).substring(2, 11)}`; // Generate a random ID
        newLink.className = 'carousel-cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
        newLink.setAttribute('data-link-region', 'CTA');
        newLink.setAttribute('data-is-internal', 'true');
        newLink.setAttribute('data-enable-gating', 'false');
        newLink.href = ctaLink.href;
        if (ctaLink.target) newLink.target = ctaLink.target;

        const span = document.createElement('span');
        span.className = 'carousel-cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
        span.textContent = ctaText || ctaLink.textContent.trim();
        newLink.append(span);
        textCenter.append(newLink);
      }

      // Add pop-up structure if needed (from HTML, but not in JSON fields)
      const popUp = document.createElement('div');
      popUp.className = 'carousel-pop-up carousel-d-none';
      popUp.innerHTML = '<input type="hidden" class="carousel-popup-message">' +
                        '<input type="hidden" class="carousel-proceed-button-label">' +
                        '<input type="hidden" class="carousel-cancel-button-label">' +
                        '<input type="hidden" class="carousel-background-color">';
      textCenter.append(popUp);

      bannerCta.append(textCenter);
      ctaWrapper.append(bannerCta);
      carouselBannerSectionWrapper.append(ctaWrapper);
    }

    carouselBannerSection.append(carouselBannerSectionWrapper);
    carouselBanner.append(carouselBannerSection);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  // Add navigation and pagination elements (simplified, as they are static)
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'carousel-cmp-carousel__actions';
  // ... add previous, next, pause, play buttons here ...
  actionsDiv.innerHTML = `
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--previous" type="button" aria-label="Previous" data-cmp-hook-carousel="previous">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Previous</span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--next" type="button" aria-label="Next" data-cmp-hook-carousel="next">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Next</span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--pause" type="button" aria-label="Pause" data-cmp-hook-carousel="pause">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Pause</span>
    </button>
    <button class="carousel-cmp-carousel__action carousel-cmp-carousel__action--play carousel-cmp-carousel__action--disabled" type="button" aria-label="Play" data-cmp-hook-carousel="play" disabled="">
      <span class="carousel-cmp-carousel__action-icon"></span>
      <span class="carousel-cmp-carousel__action-text">Play</span>
    </button>
  `;
  swiper.append(actionsDiv);

  const swiperNavContainer = document.createElement('div');
  swiperNavContainer.className = 'carousel-swiper-container';
  swiperNavContainer.innerHTML = `
    <div>
      <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled" disabled="">
        /content/dam/aemigrate/uploaded-folder/image/1771228781797.svg+xml
      </button>
    </div>
    <div>
      <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
        /content/dam/aemigrate/uploaded-folder/image/1771228781822.svg+xml
      </button>
    </div>
  `;
  swiper.append(swiperNavContainer);

  const swiperPagination = document.createElement('div');
  swiperPagination.className = 'carousel-swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';
  swiperPagination.innerHTML = '<span class="swiper-pagination-bullet"></span><span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>';
  swiper.append(swiperPagination);

  carouselContainer.append(swiper);

  block.textContent = '';
  block.append(carouselContainer);

  // Initialize Swiper (assuming Swiper library is loaded elsewhere)
  // This part would typically be handled in a separate client-side script
  // or by a generic Swiper initializer if the block is a Swiper instance.
  // For this decorate function, we only build the DOM structure.
}
