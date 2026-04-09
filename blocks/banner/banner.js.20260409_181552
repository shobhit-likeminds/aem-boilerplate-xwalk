import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Replaced block.children[0] with content detection.
  // The BlockJson indicates a single 'video' field, which is a reference.
  // This means the first row should contain the video element or a link/picture for it.
  const videoRow = [...block.children].find(row => row.querySelector('picture') || row.querySelector('a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"], a[href$=".mov"]'));

  const section = document.createElement('section');
  section.classList.add('banner-section');

  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('video-wrapper');

  let videoElement;
  if (videoRow) {
    const videoCell = videoRow.firstElementChild;
    const picture = videoCell.querySelector('picture');
    const img = picture ? picture.querySelector('img') : null;
    const videoLink = videoCell.querySelector('a');

    videoElement = document.createElement('video');
    videoElement.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
    videoElement.title = img?.alt || 'Video';
    videoElement.ariaLabel = img?.alt || 'Video';
    videoElement.setAttribute('data-is-autoplay', 'true');
    videoElement.playsInline = true;
    videoElement.preload = 'metadata';
    videoElement.fetchPriority = 'high';
    videoElement.loop = false; // Original HTML has loop="false"
    videoElement.muted = true; // Original HTML has muted="true"
    videoElement.autoplay = true; // Original HTML has autoplay="true"

    const source = document.createElement('source');
    if (videoLink && /\.(mp4|webm|ogg|mov)$/i.test(videoLink.href)) {
      source.src = videoLink.href;
    } else if (img?.src) {
      // Fallback: try to derive video path from image path if no explicit video link
      source.src = img.src.replace(/\.(jpg|jpeg|png|gif)$/i, '.mp4');
    } else {
      source.src = ''; // No video source found
    }
    source.type = 'video/mp4';
    videoElement.append(source);

    moveInstrumentation(videoCell, videoElement);
    videoWrapper.append(videoElement);

    // Play/Pause controls
    const playPauseContainer = document.createElement('div');
    playPauseContainer.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const playImg = document.createElement('img');
    playImg.alt = 'svg file';
    playImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775730058394.svg+xml';
    playButton.append(playImg);

    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const pauseImg = document.createElement('img');
    pauseImg.alt = 'svg file';
    pauseImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775730058535.svg+xml';
    pauseButton.append(pauseImg);

    playPauseContainer.append(playButton, pauseButton);
    videoWrapper.append(playPauseContainer);

    // Mute/Unmute controls
    const muteContainer = document.createElement('div');
    muteContainer.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

    const muteButton = document.createElement('button');
    muteButton.type = 'button';
    muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    const muteImg = document.createElement('img');
    muteImg.alt = 'svg file';
    muteImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775730058707.svg+xml';
    muteButton.append(muteImg);

    const unmuteButton = document.createElement('button');
    unmuteButton.type = 'button';
    unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    const unmuteImg = document.createElement('img');
    unmuteImg.alt = 'svg file';
    unmuteImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775730058811.svg+xml';
    unmuteButton.append(unmuteImg);

    const noAudioButton = document.createElement('button');
    noAudioButton.type = 'button';
    noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const noAudioImg = document.createElement('img');
    noAudioImg.alt = 'svg file';
    noAudioImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775730058886.svg+xml';
    noAudioButton.append(noAudioImg);

    muteContainer.append(muteButton, unmuteButton, noAudioButton);
    videoWrapper.append(muteContainer);

    // CHECK 2: Event listeners for video controls
    videoElement.addEventListener('play', () => {
      playButton.classList.add('d-none');
      pauseButton.classList.remove('d-none');
    });

    videoElement.addEventListener('pause', () => {
      playButton.classList.remove('d-none');
      pauseButton.classList.add('d-none');
    });

    playButton.addEventListener('click', () => videoElement.play());
    pauseButton.addEventListener('click', () => videoElement.pause());

    videoElement.addEventListener('volumechange', () => {
      if (videoElement.muted || videoElement.volume === 0) {
        muteButton.classList.add('d-none');
        unmuteButton.classList.add('d-none');
        noAudioButton.classList.remove('d-none');
      } else {
        muteButton.classList.remove('d-none');
        unmuteButton.classList.add('d-none');
        noAudioButton.classList.add('d-none');
      }
    });

    muteButton.addEventListener('click', () => {
      videoElement.muted = true;
      videoElement.volume = 0;
    });
    unmuteButton.addEventListener('click', () => {
      videoElement.muted = false;
      videoElement.volume = 1; // Or restore previous volume
    });
    noAudioButton.addEventListener('click', () => {
      videoElement.muted = false;
      videoElement.volume = 1; // Or restore previous volume
    });

    // Initial state for mute/unmute buttons based on video's muted property
    if (videoElement.muted) {
      muteButton.classList.add('d-none');
      unmuteButton.classList.add('d-none');
      noAudioButton.classList.remove('d-none');
    } else {
      muteButton.classList.remove('d-none');
      unmuteButton.classList.add('d-none');
      noAudioButton.classList.add('d-none');
    }
  }

  wrapper.append(videoWrapper);

  const ctaContainer = document.createElement('div');
  ctaContainer.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');
  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');
  ctaContainer.append(bannerCta);
  wrapper.append(ctaContainer);

  section.append(wrapper);
  block.textContent = '';
  block.append(section);

  // Optimize images if any are left (e.g., poster image, if not used for video directly)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
