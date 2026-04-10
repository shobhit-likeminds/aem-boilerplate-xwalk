import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Check 0 & 1: Structure Alignment - Replaced videoRow.firstElementChild with content detection
  const rows = [...block.children];
  const videoRow = rows.find(row => row.querySelector('a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"], a[href$=".mov"], picture'));

  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');
  moveInstrumentation(block, wrapper);

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('video-wrapper');

  // Ensure videoRow exists before proceeding
  if (videoRow) {
    const videoCell = [...videoRow.children].find(cell => cell.querySelector('a[href$=".mp4"], a[href$=".webm"], a[href$=".ogg"], a[href$=".mov"], picture'));
    if (videoCell) {
      const videoLink = videoCell.querySelector('a');
      const videoPicture = videoCell.querySelector('picture');

      if (videoLink && /\.(mp4|webm|ogg|mov)$/i.test(videoLink.href)) {
        const video = document.createElement('video');
        video.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
        video.setAttribute('title', 'Video');
        video.setAttribute('aria-label', 'Video');
        video.setAttribute('data-is-autoplay', 'true');
        video.setAttribute('playsinline', '');
        video.setAttribute('preload', 'metadata');
        video.setAttribute('fetchpriority', 'high');
        video.setAttribute('loop', 'false');
        video.setAttribute('muted', 'true');
        video.setAttribute('autoplay', 'true');

        const source = document.createElement('source');
        source.src = videoLink.href;
        source.type = 'video/mp4';
        video.append(source);

        // Remove the original picture and link, append the video
        moveInstrumentation(videoCell, video);
        videoWrapper.append(video);
      } else if (videoPicture) {
        // If it's just an image, handle it as a background image or regular image
        const img = videoPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        videoPicture.replaceWith(optimizedPic);
        videoWrapper.append(optimizedPic); // Append the optimized picture
      }
    }
  }

  // Play/Pause controls
  const playPauseControls = document.createElement('div');
  playPauseControls.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

  const playButton = document.createElement('button');
  playButton.setAttribute('type', 'button');
  playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  const playImg = document.createElement('img');
  playImg.alt = 'svg file';
  playImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775811715126.svg+xml'; // From original HTML
  playButton.append(playImg);

  const pauseButton = document.createElement('button');
  pauseButton.setAttribute('type', 'button');
  pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  const pauseImg = document.createElement('img');
  pauseImg.alt = 'svg file';
  pauseImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775811715165.svg+xml'; // From original HTML
  pauseButton.append(pauseImg);

  playPauseControls.append(playButton, pauseButton);
  videoWrapper.append(playPauseControls);

  // Mute/Unmute controls
  const muteControls = document.createElement('div');
  muteControls.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

  const muteButton = document.createElement('button');
  muteButton.setAttribute('type', 'button');
  muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
  const muteImg = document.createElement('img');
  muteImg.alt = 'svg file';
  muteImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775811715205.svg+xml'; // From original HTML
  muteButton.append(muteImg);

  const unmuteButton = document.createElement('button');
  unmuteButton.setAttribute('type', 'button');
  unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
  const unmuteImg = document.createElement('img');
  unmuteImg.alt = 'svg file';
  unmuteImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775811715260.svg+xml'; // From original HTML
  unmuteButton.append(unmuteImg);

  const noAudioButton = document.createElement('button');
  noAudioButton.setAttribute('type', 'button');
  noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
  const noAudioImg = document.createElement('img');
  noAudioImg.alt = 'svg file';
  noAudioImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775811715294.svg+xml'; // From original HTML
  noAudioButton.append(noAudioImg);

  muteControls.append(muteButton, unmuteButton, noAudioButton);
  videoWrapper.append(muteControls);

  wrapper.append(videoWrapper);

  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');
  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');
  ctaDiv.append(bannerCta);
  wrapper.append(ctaDiv);

  block.textContent = '';
  block.append(wrapper);

  // Add event listeners for video controls
  const videoElement = wrapper.querySelector('video');
  if (videoElement) {
    playButton.addEventListener('click', () => {
      videoElement.play();
      playButton.classList.add('d-none');
      pauseButton.classList.remove('d-none');
    });

    pauseButton.addEventListener('click', () => {
      videoElement.pause();
      pauseButton.classList.add('d-none');
      playButton.classList.remove('d-none');
    });

    muteButton.addEventListener('click', () => {
      videoElement.muted = false;
      muteButton.classList.add('d-none');
      unmuteButton.classList.remove('d-none');
      noAudioButton.classList.add('d-none');
    });

    unmuteButton.addEventListener('click', () => {
      videoElement.muted = true;
      unmuteButton.classList.add('d-none');
      muteButton.classList.remove('d-none');
      noAudioButton.classList.add('d-none');
    });

    noAudioButton.addEventListener('click', () => {
      videoElement.muted = false;
      noAudioButton.classList.add('d-none');
      unmuteButton.classList.remove('d-none');
    });

    // Initial state based on video muted attribute
    if (videoElement.muted) {
      muteButton.classList.remove('d-none');
      unmuteButton.classList.add('d-none');
      noAudioButton.classList.add('d-none');
    } else {
      muteButton.classList.add('d-none');
      unmuteButton.classList.remove('d-none');
      noAudioButton.classList.add('d-none');
    }

    // Initial play/pause state
    if (videoElement.paused) {
      playButton.classList.remove('d-none');
      pauseButton.classList.add('d-none');
    } else {
      playButton.classList.add('d-none');
      pauseButton.classList.remove('d-none');
    }
  }
}
