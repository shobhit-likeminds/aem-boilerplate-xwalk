import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('video-wrapper');

  // CRITICAL FIX: Use content detection instead of direct index access
  const rows = [...block.children];
  const videoImageRow = rows.find(row => row.querySelector('picture') || row.querySelector('a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"], a[href$=".mov"]'));

  let videoLink;
  let videoPicture;
  if (videoImageRow) {
    const videoCell = videoImageRow.firstElementChild;
    videoLink = videoCell.querySelector('a');
    videoPicture = videoCell.querySelector('picture');
  }

  if (videoLink && /\.(mp4|webm|ogg|mov)$/i.test(videoLink.href)) {
    const video = document.createElement('video');
    video.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
    video.title = 'Video';
    video.ariaLabel = 'Video';
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.fetchPriority = 'high';
    video.loop = false; // Original HTML has loop="false"

    const source = document.createElement('source');
    source.src = videoLink.href;
    source.type = 'video/mp4';
    video.append(source);

    // moveInstrumentation(videoCell, video); // videoCell might be null if videoImageRow not found
    if (videoImageRow) { // Ensure videoCell exists before moving instrumentation
      moveInstrumentation(videoImageRow.firstElementChild, video);
    }
    videoWrapper.append(video);

    const controlsContainer = document.createElement('div');
    controlsContainer.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const playIcon = document.createElement('img');
    playIcon.alt = 'svg file';
    // The original HTML has src for these images, but the generated JS comments it out.
    // For now, keeping it commented as per the generated JS's intent, assuming CSS handles it.
    // playIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1775744424408.svg+xml';
    playButton.append(playIcon);

    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const pauseIcon = document.createElement('img');
    pauseIcon.alt = 'svg file';
    // pauseIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1775744424426.svg+xml';
    pauseButton.append(pauseIcon);

    controlsContainer.append(playButton, pauseButton);

    const muteContainer = document.createElement('div');
    muteContainer.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

    const muteButton = document.createElement('button');
    muteButton.type = 'button';
    muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    const muteIcon = document.createElement('img');
    muteIcon.alt = 'svg file';
    // muteIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1775744424465.svg+xml';
    muteButton.append(muteIcon);

    const unmuteButton = document.createElement('button');
    unmuteButton.type = 'button';
    unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    const unmuteIcon = document.createElement('img');
    unmuteIcon.alt = 'svg file';
    // unmuteIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1775744424490.svg+xml';
    unmuteButton.append(unmuteIcon);

    const noAudioButton = document.createElement('button');
    noAudioButton.type = 'button';
    noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const noAudioIcon = document.createElement('img');
    noAudioIcon.alt = 'svg file';
    // noAudioIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1775744424589.svg+xml';
    noAudioButton.append(noAudioIcon);

    muteContainer.append(muteButton, unmuteButton, noAudioButton);

    videoWrapper.append(controlsContainer, muteContainer);

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
      video.muted = false;
      muteButton.classList.add('d-none');
      unmuteButton.classList.remove('d-none');
      noAudioButton.classList.add('d-none');
    });

    unmuteButton.addEventListener('click', () => {
      video.muted = true;
      unmuteButton.classList.add('d-none');
      muteButton.classList.remove('d-none');
      noAudioButton.classList.add('d-none');
    });

    noAudioButton.addEventListener('click', () => {
      video.muted = false; // Clicking no-audio should unmute
      noAudioButton.classList.add('d-none');
      unmuteButton.classList.remove('d-none');
      muteButton.classList.add('d-none'); // Ensure mute button is hidden
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
        muteButton.classList.remove('d-none');
        unmuteButton.classList.add('d-none');
        noAudioButton.classList.add('d-none');
      } else if (video.volume === 0) { // Check if volume is 0 (but not muted)
        muteButton.classList.add('d-none');
        unmuteButton.classList.add('d-none');
        noAudioButton.classList.remove('d-none');
      } else { // Unmuted and volume > 0
        muteButton.classList.add('d-none');
        unmuteButton.classList.remove('d-none');
        noAudioButton.classList.add('d-none');
      }
    });

  } else if (videoPicture) {
    const img = videoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    videoWrapper.append(optimizedPic);
  }

  const ctaContainer = document.createElement('div');
  ctaContainer.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');
  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');
  ctaContainer.append(bannerCta);

  wrapper.append(videoWrapper, ctaContainer);
  bannerSection.append(wrapper);

  block.textContent = '';
  block.append(bannerSection);
}
