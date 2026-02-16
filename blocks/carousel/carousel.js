import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselPositionRelative = document.createElement('div');
  carouselPositionRelative.className = 'carousel-position-relative';

  const swiper = document.createElement('div');
  swiper.className = 'swiper carousel-primary-swiper';
  // Transfer attributes from the existing swiper element if available
  // For simplicity, we'll hardcode some for now based on the HTML provided
  swiper.setAttribute('role', 'group');
  swiper.setAttribute('aria-live', 'polite');
  swiper.setAttribute('aria-roledescription', 'carousel');
  swiper.setAttribute('data-is-autoplay', 'true');
  swiper.setAttribute('data-delay', '5000');
  swiper.setAttribute('data-autopause-disabled', 'true');
  swiper.setAttribute('data-is-loop', 'false');
  swiper.setAttribute('data-placeholder-text', 'false');

  const swiperWrapper = document.createElement('div');
  swiperWrapper.className = 'swiper-wrapper carousel-primary-swiper-wrapper carousel-z-0';

  [...block.children].forEach((row) => {
    const swiperSlide = document.createElement('div');
    moveInstrumentation(row, swiperSlide);
    swiperSlide.className = 'carousel-swiper-slide carousel-primary-swiper-slide';
    swiperSlide.setAttribute('role', 'tabpanel');
    swiperSlide.setAttribute('aria-roledescription', 'slide');
    swiperSlide.style.width = '508px'; // Assuming a fixed width from the example

    const carouselBanner = document.createElement('div');
    carouselBanner.className = 'carousel-banner';

    const section = document.createElement('section');
    section.className = 'carousel-banner-section';

    const wrapper = document.createElement('div');
    wrapper.className = 'carousel-position-relative carousel-boing carousel-banner-section__wrapper ';

    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'carousel-position-absolute carousel-start-50 carousel-translate-middle-x carousel-w-100 carousel-boing__banner--cta';

    const bannerCta = document.createElement('div');
    bannerCta.className = 'carousel-banner-cta';

    const textCenter = document.createElement('div');
    textCenter.className = 'carousel-text-center ';

    let mediaElement = null;
    let ctaLinkElement = null;

    [...row.children].forEach((cell) => {
      const video = cell.querySelector('video');
      const img = cell.querySelector('img');
      const link = cell.querySelector('a');

      if (video) {
        const videoWrapper = document.createElement('div');
        videoWrapper.className = 'carousel-video-wrapper';

        const newVideo = document.createElement('video');
        moveInstrumentation(video, newVideo);
        newVideo.className = 'carousel-w-100 carousel-object-fit-cover carousel-banner-media carousel-banner-video';
        newVideo.title = video.title || 'Video';
        newVideo.ariaLabel = video.ariaLabel || 'Video';
        newVideo.setAttribute('data-is-autoplay', video.getAttribute('data-is-autoplay') || 'true');
        newVideo.setAttribute('playsinline', video.getAttribute('playsinline') || '');
        newVideo.setAttribute('preload', video.getAttribute('preload') || 'metadata');
        newVideo.setAttribute('fetchpriority', video.getAttribute('fetchpriority') || 'high');
        newVideo.setAttribute('loop', video.getAttribute('loop') || 'false');
        newVideo.setAttribute('muted', video.getAttribute('muted') || 'true');
        newVideo.setAttribute('autoplay', video.getAttribute('autoplay') || 'true');

        const source = document.createElement('source');
        source.src = video.querySelector('source').src;
        source.type = video.querySelector('source').type;
        newVideo.append(source);
        videoWrapper.append(newVideo);

        // Add play/pause and mute/unmute buttons if they exist in the original HTML
        const playPauseWrapper = document.createElement('div');
        playPauseWrapper.className = 'carousel-position-absolute carousel-w-100 carousel-h-100 carousel-start-0 carousel-top-0 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer';

        const playButton = document.createElement('button');
        playButton.type = 'button';
        playButton.className = 'carousel-d-none carousel-video-icon carousel-icon-play carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
        playButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1771224070940.svg+xml'; // Assuming this is SVG content
        playPauseWrapper.append(playButton);

        const pauseButton = document.createElement('button');
        pauseButton.type = 'button';
        pauseButton.className = 'carousel-d-block carousel-video-icon carousel-icon-pause carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
        pauseButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1771224070958.svg+xml'; // Assuming this is SVG content
        playPauseWrapper.append(pauseButton);

        videoWrapper.append(playPauseWrapper);

        const muteIconWrapper = document.createElement('div');
        muteIconWrapper.className = 'carousel-position-absolute carousel-z-2 carousel-d-flex carousel-justify-content-center carousel-align-items-center carousel-cursor-pointer carousel-mute-icon ';

        const muteButton = document.createElement('button');
        muteButton.type = 'button';
        muteButton.className = 'carousel-video-icon-volume carousel-icon-mute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
        muteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1771224070974.svg+xml';
        muteIconWrapper.append(muteButton);

        const unmuteButton = document.createElement('button');
        unmuteButton.type = 'button';
        unmuteButton.className = 'carousel-video-icon-volume carousel-icon-unmute carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer carousel-d-none';
        unmuteButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1771224070989.svg+xml';
        muteIconWrapper.append(unmuteButton);

        const noAudioButton = document.createElement('button');
        noAudioButton.type = 'button';
        noAudioButton.className = 'carousel-video-icon-volume carousel-no-audio-icon carousel-bg-transparent carousel-d-flex carousel-align-items-center carousel-justify-content-center carousel-cursor-pointer';
        noAudioButton.innerHTML = '/content/dam/aemigrate/uploaded-folder/image/1771224071007.svg+xml';
        muteIconWrapper.append(noAudioButton);

        videoWrapper.append(muteIconWrapper);

        mediaElement = videoWrapper;
      } else if (img) {
        const newImg = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, newImg.querySelector('img'));
        newImg.querySelector('img').className = 'carousel-w-100 carousel-h-100 carousel-object-fit-cover carousel-banner-media carousel-banner-image';
        newImg.querySelector('img').setAttribute('loading', img.getAttribute('loading') || 'eager');
        newImg.querySelector('img').setAttribute('fetchpriority', img.getAttribute('fetchpriority') || 'high');
        newImg.querySelector('img').setAttribute('decoding', img.getAttribute('decoding') || 'async');
        mediaElement = newImg;
      }

      if (link) {
        const newLink = document.createElement('a');
        newLink.id = link.id;
        newLink.className = 'carousel-cmp-button carousel-analytics_cta_click carousel-text-center carousel-cta-layout';
        newLink.setAttribute('data-link-region', link.getAttribute('data-link-region') || 'CTA');
        newLink.setAttribute('data-is-internal', link.getAttribute('data-is-internal') || 'true');
        newLink.setAttribute('data-enable-gating', link.getAttribute('data-enable-gating') || 'false');
        newLink.href = link.href;
        newLink.target = link.target || '_blank';

        const span = document.createElement('span');
        span.className = 'carousel-cmp-button__text carousel-primary-btn carousel-w-75 carousel-p-5 carousel-rounded-pill carousel-d-inline-flex carousel-justify-content-center carousel-align-items-center carousel-famlf-cta-btn';
        span.textContent = link.textContent.trim();
        newLink.append(span);

        const popUp = document.createElement('div');
        popUp.className = 'carousel-pop-up carousel-d-none';
        popUp.innerHTML = `
          <input type="hidden" class="carousel-popup-message">
          <input type="hidden" class="carousel-proceed-button-label">
          <input type="hidden" class="carousel-cancel-button-label">
          <input type="hidden" class="carousel-background-color">
        `;
        textCenter.append(newLink, popUp);
        ctaLinkElement = textCenter;
      }
    });

    if (mediaElement) {
      wrapper.append(mediaElement);
    }
    if (ctaLinkElement) {
      bannerCta.append(ctaLinkElement);
      ctaWrapper.append(bannerCta);
      wrapper.append(ctaWrapper);
    }

    section.append(wrapper);
    carouselBanner.append(section);
    swiperSlide.append(carouselBanner);
    swiperWrapper.append(swiperSlide);
  });

  swiper.append(swiperWrapper);

  // Add navigation and pagination elements (hardcoded for now based on the example)
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'carousel-cmp-carousel__actions';
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

  const swiperContainer = document.createElement('div');
  swiperContainer.className = 'carousel-swiper-container';
  swiperContainer.innerHTML = `
    <div>
        <button class="carousel-primary-swiper__buttonNext carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click carousel-disabled" disabled="">
            /content/dam/aemigrate/uploaded-folder/image/1771224071020.svg+xml
        </button>
    </div>
    <div>
        <button class="carousel-primary-swiper__buttonPrev carousel-position-absolute carousel-top-50 carousel-swiper-buttonBg carousel-d-none carousel-d-sm-block carousel-cursor-pointer carousel-analytics_cta_click">
            /content/dam/aemigrate/uploaded-folder/image/1771224071045.svg+xml
        </button>
    </div>
  `;
  swiper.append(swiperContainer);

  const swiperPagination = document.createElement('div');
  swiperPagination.className = 'carousel-swiper-pagination carousel-primary-swiper-pagination carousel-pagination-set carousel-mb-md-8 carousel-mb-10 carousel-mt-6 carousel-position-absolute carousel-swiper-pagination-clickable carousel-swiper-pagination-bullets carousel-swiper-pagination-horizontal';
  swiperPagination.innerHTML = '<span class="carousel-swiper-pagination-bullet"></span><span class="carousel-swiper-pagination-bullet carousel-swiper-pagination-bullet-active"></span>';
  swiper.append(swiperPagination);

  carouselPositionRelative.append(swiper);

  block.textContent = '';
  block.append(carouselPositionRelative);
}
