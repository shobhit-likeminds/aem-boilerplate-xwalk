import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Replaced direct index access with content detection
  const videoRow = [...block.children].find(row => row.querySelector('picture'));

  const section = document.createElement('section');
  moveInstrumentation(block, section);
  section.classList.add('banner-section');

  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');
  moveInstrumentation(videoRow, wrapper);

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('video-wrapper');

  const videoEl = document.createElement('video');
  videoEl.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
  videoEl.setAttribute('title', 'Video');
  videoEl.setAttribute('aria-label', 'Video');
  videoEl.setAttribute('data-is-autoplay', 'true');
  videoEl.setAttribute('playsinline', '');
  videoEl.setAttribute('preload', 'metadata');
  videoEl.setAttribute('fetchpriority', 'high');
  videoEl.setAttribute('loop', 'false');
  videoEl.setAttribute('muted', 'true');
  videoEl.setAttribute('autoplay', 'true');

  // CHECK 0 & 1: Content detection for picture element within the videoRow
  const pictureCell = videoRow ? [...videoRow.children].find(cell => cell.querySelector('picture')) : null;
  const picture = pictureCell ? pictureCell.querySelector('picture') : null;

  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const src = img.getAttribute('src');
      const source = document.createElement('source');
      source.setAttribute('src', src.replace('.jpg', '.mp4')); // Assuming .jpg poster, .mp4 video
      source.setAttribute('type', 'video/mp4');
      videoEl.append(source);
    }
    // Remove the original picture element from the DOM
    picture.remove();
  }

  videoWrapper.append(videoEl);

  const playPauseOverlay = document.createElement('div');
  playPauseOverlay.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const playButton = document.createElement('button');
  playButton.setAttribute('type', 'button'); // Added missing type attribute
  playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  const playImg = document.createElement('img');
  playImg.setAttribute('alt', 'svg file');
  playImg.setAttribute('src', '/content/dam/aemigrate/uploaded-folder/image/1775655819452.svg+xml');
  playButton.append(playImg);

  const pauseButton = document.createElement('button');
  pauseButton.setAttribute('type', 'button'); // Added missing type attribute
  pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  const pauseImg = document.createElement('img');
  pauseImg.setAttribute('alt', 'svg file');
  pauseImg.setAttribute('src', '/content/dam/aemigrate/uploaded-folder/image/1775655819751.svg+xml');
  pauseButton.append(pauseImg);

  playPauseOverlay.append(playButton, pauseButton);

  const muteOverlay = document.createElement('div');
  muteOverlay.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

  const muteButton = document.createElement('button');
  muteButton.setAttribute('type', 'button'); // Added missing type attribute
  muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
  const muteImg = document.createElement('img');
  muteImg.setAttribute('alt', 'svg file');
  muteImg.setAttribute('src', '/content/dam/aemigrate/uploaded-folder/image/1775655819908.svg+xml');
  muteButton.append(muteImg);

  const unmuteButton = document.createElement('button');
  unmuteButton.setAttribute('type', 'button'); // Added missing type attribute
  unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
  const unmuteImg = document.createElement('img');
  unmuteImg.setAttribute('alt', 'svg file');
  unmuteImg.setAttribute('src', '/content/dam/aemigrate/uploaded-folder/image/1775655820102.svg+xml');
  unmuteButton.append(unmuteImg);

  const noAudioButton = document.createElement('button');
  noAudioButton.setAttribute('type', 'button'); // Added missing type attribute
  noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  const noAudioImg = document.createElement('img');
  noAudioImg.setAttribute('alt', 'svg file');
  noAudioImg.setAttribute('src', '/content/dam/aemigrate/uploaded-folder/image/1775655820272.svg+xml');
  noAudioButton.append(noAudioImg);

  muteOverlay.append(muteButton, unmuteButton, noAudioButton);

  videoWrapper.append(playPauseOverlay, muteOverlay);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');
  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');
  ctaWrapper.append(bannerCta);

  wrapper.append(videoWrapper, ctaWrapper);
  section.append(wrapper);

  // CHECK 2: Event Listeners for video controls
  const togglePlayPause = () => {
    if (videoEl.paused || videoEl.ended) {
      videoEl.play();
      playButton.classList.add('d-none');
      pauseButton.classList.remove('d-none');
    } else {
      videoEl.pause();
      playButton.classList.remove('d-none');
      pauseButton.classList.add('d-none');
    }
  };

  const toggleMute = () => {
    videoEl.muted = !videoEl.muted;
    if (videoEl.muted) {
      muteButton.classList.remove('d-none');
      unmuteButton.classList.add('d-none');
      noAudioButton.classList.add('d-none');
    } else {
      muteButton.classList.add('d-none');
      unmuteButton.classList.remove('d-none');
      noAudioButton.classList.add('d-none');
    }
  };

  playPauseOverlay.addEventListener('click', togglePlayPause);
  muteOverlay.addEventListener('click', toggleMute);

  // Initial state for mute button based on video's muted attribute
  if (videoEl.muted) {
    noAudioButton.classList.remove('d-none');
    muteButton.classList.add('d-none');
    unmuteButton.classList.add('d-none');
  } else {
    noAudioButton.classList.add('d-none');
    muteButton.classList.add('d-none');
    unmuteButton.classList.remove('d-none');
  }

  // Handle video ended event
  videoEl.addEventListener('ended', () => {
    playButton.classList.remove('d-none');
    pauseButton.classList.add('d-none');
  });

  block.textContent = '';
  block.append(section);
}
