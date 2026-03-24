import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    descriptionRow,
    backgroundVideoRow,
    primaryCtaLinkRow,
    primaryCtaLabelRow,
    secondaryCtaLinkRow,
    secondaryCtaLabelRow,
  ] = [...block.children];

  block.classList.add('parallax-child-2');
  block.setAttribute('data-media-type', 'videoTypeSelected');

  const viewportImage = document.createElement('div');
  viewportImage.classList.add('viewport-image');
  viewportImage.setAttribute('hidden', '');
  viewportImage.setAttribute('aria-hidden', 'true');
  block.append(viewportImage);

  const viewportVideo = document.createElement('div');
  viewportVideo.classList.add('viewport-video');
  viewportVideo.setAttribute('hidden', '');
  viewportVideo.setAttribute('aria-hidden', 'true');
  block.append(viewportVideo);

  const cover = document.createElement('div');
  cover.classList.add('hero-full-width__cover');
  block.append(cover);

  const background = document.createElement('div');
  background.classList.add('hero-full-width__background');
  block.append(background);

  const backgroundWrapper = document.createElement('div');
  backgroundWrapper.classList.add('hero-full-width__background-wrapper', 'zoom-out');
  background.append(backgroundWrapper);

  const backgroundVideo = document.createElement('video');
  backgroundVideo.classList.add('hero-full-width__background-video');
  backgroundVideo.setAttribute('loop', '');
  backgroundVideo.setAttribute('muted', '');
  backgroundVideo.setAttribute('playsinline', '');
  backgroundVideo.setAttribute('autoplay', '');
  backgroundVideo.setAttribute('aria-hidden', 'true');
  backgroundVideo.setAttribute('data-responsive-video', '');

  // Get all source elements from the backgroundVideoRow's picture element
  const videoPicture = backgroundVideoRow.querySelector('picture');
  const videoSources = videoPicture ? [...videoPicture.querySelectorAll('source')] : [];
  const videoImg = videoPicture ? videoPicture.querySelector('img') : null;

  // Append all source elements to the backgroundVideo
  if (videoSources.length > 0) {
    videoSources.forEach((source) => {
      const newSource = document.createElement('source');
      newSource.src = source.src;
      newSource.type = source.type;
      backgroundVideo.append(newSource);
    });
    // Set the main src attribute from the first source if available
    backgroundVideo.src = videoSources[0].src;
  } else if (videoImg) {
    // Fallback if only an img is provided, though video is expected
    backgroundVideo.src = videoImg.src; // This might not be a video source
  }

  backgroundWrapper.append(backgroundVideo);

  const backgroundPoster = document.createElement('img');
  backgroundPoster.classList.add('hero-full-width__background-poster');
  backgroundPoster.setAttribute('alt', 'Background poster image');
  backgroundPoster.setAttribute('loading', 'lazy');
  backgroundPoster.setAttribute('aria-hidden', 'true');
  backgroundPoster.style.display = 'none'; // Keep this style as it's from original HTML
  if (videoImg) {
    backgroundPoster.src = videoImg.src;
  }
  backgroundWrapper.append(backgroundPoster);

  const content = document.createElement('div');
  content.classList.add('hero-full-width__content');
  block.append(content);

  const slideWrap1 = document.createElement('div');
  slideWrap1.classList.add('slide-wrap');
  content.append(slideWrap1);

  const slideUp1 = document.createElement('div');
  slideUp1.classList.add('slide-up');
  slideUp1.setAttribute('data-slide-type', 'slide-up');
  slideWrap1.append(slideUp1);

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('hero-full-width__content__title');
  titleDiv.setAttribute('tabindex', '0');
  moveInstrumentation(titleRow.firstElementChild, titleDiv);
  while (titleRow.firstElementChild.firstChild) {
    titleDiv.append(titleRow.firstElementChild.firstChild);
  }
  slideUp1.append(titleDiv);

  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('hero-full-width__content__description');
  descriptionDiv.setAttribute('tabindex', '0');
  moveInstrumentation(descriptionRow.firstElementChild, descriptionDiv);
  while (descriptionRow.firstElementChild.firstChild) {
    descriptionDiv.append(descriptionRow.firstElementChild.firstChild);
  }
  slideUp1.append(descriptionDiv);

  const slideWrap2 = document.createElement('div');
  slideWrap2.classList.add('slide-wrap');
  content.append(slideWrap2);

  const slideUp2 = document.createElement('div');
  slideUp2.classList.add('slide-up');
  slideUp2.setAttribute('data-slide-type', 'slide-up');
  slideWrap2.append(slideUp2);

  const ctas = document.createElement('div');
  ctas.classList.add('hero-full-width__content--ctas');
  slideUp2.append(ctas);

  const primaryCtaAnchor = primaryCtaLinkRow.querySelector('a');
  const primaryCta = document.createElement('a');
  primaryCta.classList.add('cta', 'cta__secondary', 'primaryCta');
  primaryCta.setAttribute('target', '_self');
  primaryCta.setAttribute('data-palette', 'palette-light');
  if (primaryCtaAnchor) {
    primaryCta.href = primaryCtaAnchor.href;
    primaryCta.setAttribute('aria-label', primaryCtaLabelRow.textContent.trim());
  }

  const primaryCtaSpan = document.createElement('span');
  primaryCtaSpan.classList.add('cta__label');
  moveInstrumentation(primaryCtaLabelRow.firstElementChild, primaryCtaSpan);
  while (primaryCtaLabelRow.firstElementChild.firstChild) {
    primaryCtaSpan.append(primaryCtaLabelRow.firstElementChild.firstChild);
  }
  primaryCta.append(primaryCtaSpan);
  ctas.append(primaryCta);

  const chevronWrapper = document.createElement('div');
  chevronWrapper.classList.add('chevron-wrapper');
  ctas.append(chevronWrapper);

  const chevronButton = document.createElement('button');
  chevronButton.classList.add('chevron-icon');
  chevronButton.setAttribute('type', 'button');
  chevronButton.setAttribute('aria-label', 'Open video modal');
  chevronWrapper.append(chevronButton);

  const secondaryCtaAnchor = secondaryCtaLinkRow.querySelector('a');
  const secondaryCta = document.createElement('a');
  secondaryCta.classList.add('cta', 'cta__link', 'secondaryCta');
  secondaryCta.setAttribute('target', '_self');
  secondaryCta.setAttribute('data-palette', 'palette-light');
  if (secondaryCtaAnchor) {
    secondaryCta.href = secondaryCtaAnchor.href;
    secondaryCta.setAttribute('aria-label', secondaryCtaLabelRow.textContent.trim());
  }

  const secondaryCtaIcon = document.createElement('span');
  secondaryCtaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
  secondaryCtaIcon.setAttribute('aria-hidden', 'true');
  secondaryCta.append(secondaryCtaIcon);

  const secondaryCtaSpan = document.createElement('span');
  secondaryCtaSpan.classList.add('cta__label');
  moveInstrumentation(secondaryCtaLabelRow.firstElementChild, secondaryCtaSpan);
  while (secondaryCtaLabelRow.firstElementChild.firstChild) {
    secondaryCtaSpan.append(secondaryCtaLabelRow.firstElementChild.firstChild);
  }
  secondaryCta.append(secondaryCtaSpan);
  chevronWrapper.append(secondaryCta);

  const dialog = document.createElement('dialog');
  dialog.classList.add('hero-full-width__content--modal');
  dialog.id = 'home-page-video-dialog';
  dialog.setAttribute('closedby', 'any');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Video Modal');
  content.append(dialog);

  const form = document.createElement('form');
  form.setAttribute('method', 'dialog');
  dialog.append(form);

  const closeButton = document.createElement('button');
  closeButton.classList.add('hero-full-width__content--modal__close-button');
  closeButton.setAttribute('aria-label', 'Close Video');
  closeButton.setAttribute('tabindex', '0');
  closeButton.textContent = 'X';
  form.append(closeButton);

  const videoModalDiv = document.createElement('div');
  videoModalDiv.classList.add('video', 'hero-full-width__content--modal__video');
  dialog.append(videoModalDiv);

  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video-container', 'show-controls');
  videoModalDiv.append(videoContainer);

  const viewportVideoModal = document.createElement('div');
  viewportVideoModal.classList.add('viewport-video');
  viewportVideoModal.setAttribute('hidden', '');
  viewportVideoModal.setAttribute('aria-hidden', 'true');
  videoContainer.append(viewportVideoModal);

  const videoControls = document.createElement('div');
  videoControls.classList.add('video-container__controls');
  videoContainer.append(videoControls);

  const timer = document.createElement('div');
  timer.classList.add('video-container__controls__timer');
  videoControls.append(timer);

  const progressArea = document.createElement('div');
  progressArea.classList.add('video-container__controls__timer__progress-area');
  timer.append(progressArea);

  const progressBar = document.createElement('span');
  progressBar.classList.add('video-container__controls__timer__progress-area__progress-bar');
  progressArea.append(progressBar);

  const pointer = document.createElement('span');
  pointer.classList.add('video-container__controls__timer__progress-area__pointer');
  progressArea.append(pointer);

  const progressPending = document.createElement('span');
  progressPending.classList.add('video-container__controls__timer__progress-area__progress-pending');
  progressArea.append(progressPending);

  const currentTime = document.createElement('p');
  currentTime.classList.add('video-container__controls__timer__current-time');
  currentTime.textContent = '00:00';
  timer.append(currentTime);

  const duration = document.createElement('p');
  duration.classList.add('video-container__controls__timer__duration');
  duration.textContent = '00:00';
  timer.append(duration);

  const controlsButtons = document.createElement('div');
  controlsButtons.classList.add('video-container__controls__buttons');
  videoControls.append(controlsButtons);

  const playButton = document.createElement('button');
  playButton.classList.add('video-container__controls__buttons__play-button', 'video-container__controls__buttons--button');
  const playIcon = document.createElement('span');
  playIcon.classList.add('video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--play');
  playButton.append(playIcon);
  controlsButtons.append(playButton);

  const muteButton = document.createElement('button');
  muteButton.classList.add('video-container__controls__buttons__mute-button', 'video-container__controls__buttons--button');
  const muteIcon = document.createElement('span');
  muteIcon.classList.add('video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--volume');
  muteButton.append(muteIcon);
  controlsButtons.append(muteButton);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.classList.add('video-container__controls__buttons__fullscreen-button', 'video-container__controls__buttons--button');
  const fullscreenIcon = document.createElement('span');
  fullscreenIcon.classList.add('video-container__controls__buttons__icon', 'qd-icon', 'qd-icon--fullscreen');
  fullscreenButton.append(fullscreenIcon);
  controlsButtons.append(fullscreenButton);

  const modalVideo = document.createElement('video');
  modalVideo.classList.add('video-container__video');
  modalVideo.setAttribute('playsinline', '');
  modalVideo.setAttribute('webkit-playsinline', '');
  modalVideo.setAttribute('x-webkit-airplay', 'allow');
  
  // Append all source elements to the modalVideo as well
  if (videoSources.length > 0) {
    videoSources.forEach((source) => {
      const newSource = document.createElement('source');
      newSource.src = source.src;
      newSource.type = source.type;
      modalVideo.append(newSource);
    });
    // Set the main src attribute from the first source if available
    modalVideo.setAttribute('data-video-src', videoSources[0].src);
    modalVideo.src = videoSources[0].src;
  } else if (videoImg) {
    modalVideo.setAttribute('data-video-src', videoImg.src);
    modalVideo.src = videoImg.src;
  }
  videoContainer.append(modalVideo);

  // Event Listeners for interactive behavior
  chevronButton.addEventListener('click', () => {
    dialog.showModal();
    if (modalVideo.paused) {
      modalVideo.play();
      playIcon.classList.remove('qd-icon--play');
      playIcon.classList.add('qd-icon--pause');
    }
  });

  closeButton.addEventListener('click', () => {
    dialog.close();
    modalVideo.pause();
    playIcon.classList.remove('qd-icon--pause');
    playIcon.classList.add('qd-icon--play');
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
      modalVideo.pause();
      playIcon.classList.remove('qd-icon--pause');
      playIcon.classList.add('qd-icon--play');
    }
  });

  playButton.addEventListener('click', () => {
    if (modalVideo.paused) {
      modalVideo.play();
      playIcon.classList.remove('qd-icon--play');
      playIcon.classList.add('qd-icon--pause');
    } else {
      modalVideo.pause();
      playIcon.classList.remove('qd-icon--pause');
      playIcon.classList.add('qd-icon--play');
    }
  });

  muteButton.addEventListener('click', () => {
    modalVideo.muted = !modalVideo.muted;
    if (modalVideo.muted) {
      muteIcon.classList.remove('qd-icon--volume');
      muteIcon.classList.add('qd-icon--volume-mute');
    } else {
      muteIcon.classList.remove('qd-icon--volume-mute');
      muteIcon.classList.add('qd-icon--volume');
    }
  });

  fullscreenButton.addEventListener('click', () => {
    if (modalVideo.requestFullscreen) {
      modalVideo.requestFullscreen();
    } else if (modalVideo.webkitRequestFullscreen) { /* Safari */
      modalVideo.webkitRequestFullscreen();
    } else if (modalVideo.msRequestFullscreen) { /* IE11 */
      modalVideo.msRequestFullscreen();
    }
  });

  // Update progress bar and time
  modalVideo.addEventListener('timeupdate', () => {
    const progress = (modalVideo.currentTime / modalVideo.duration) * 100;
    progressBar.style.width = `${progress}%`;
    pointer.style.left = `${progress}%`;
    currentTime.textContent = formatTime(modalVideo.currentTime);
  });

  modalVideo.addEventListener('loadedmetadata', () => {
    duration.textContent = formatTime(modalVideo.duration);
  });

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Optimized picture for background poster, if it were an image
  // This part seems to be intended for images, but the block structure implies a video.
  // If `background-video` field can also contain an image, this would be relevant.
  // Given the current structure, `videoImg` is used for the poster.
  // The original code iterated over `block.querySelectorAll('picture > img')` which would
  // optimize the `videoImg` if it was wrapped in a picture.
  // For now, keeping the original logic but noting its potential redundancy if videoImg is always directly used.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Clean up the original block content
  block.textContent = '';
  block.append(viewportImage, viewportVideo, cover, background, content);
}
