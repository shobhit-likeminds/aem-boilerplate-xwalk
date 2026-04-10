import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CHECK 0 & 1: Replaced direct index access with content detection
  const cells = [...block.children[0].children];
  const videoCell = cells.find(cell => cell.querySelector('a') || cell.querySelector('picture'));
  
  const videoLink = videoCell ? videoCell.querySelector('a') : null;

  const section = document.createElement('section');
  section.classList.add('banner-section');

  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');

  const videoWrapper = document.createElement('div');
  videoWrapper.classList.add('video-wrapper');

  if (videoLink && /\.(mp4|webm|ogg|mov)$/i.test(videoLink.href)) {
    const video = document.createElement('video');
    video.classList.add('w-100', 'object-fit-cover', 'banner-media', 'banner-video');
    video.title = 'Video';
    video.ariaLabel = 'Video';
    video.playsInline = true;
    video.preload = 'metadata';
    video.fetchPriority = 'high';
    video.loop = false;
    video.muted = true;
    video.autoplay = true;

    const source = document.createElement('source');
    source.src = videoLink.href;
    source.type = `video/${videoLink.href.split('.').pop()}`;
    video.append(source);

    // Play/Pause controls
    const playPauseOverlay = document.createElement('div');
    playPauseOverlay.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const playImg = document.createElement('img');
    playImg.alt = 'svg file';
    playImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775815892662.svg+xml'; // From original HTML
    playButton.append(playImg);

    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const pauseImg = document.createElement('img');
    pauseImg.alt = 'svg file';
    pauseImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775815892740.svg+xml'; // From original HTML
    pauseButton.append(pauseImg);

    playPauseOverlay.append(playButton, pauseButton);

    // Mute/Unmute controls
    const muteOverlay = document.createElement('div');
    muteOverlay.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

    const muteButton = document.createElement('button');
    muteButton.type = 'button';
    muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    const muteImg = document.createElement('img');
    muteImg.alt = 'svg file';
    muteImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775815893441.svg+xml'; // From original HTML
    muteButton.append(muteImg);

    const unmuteButton = document.createElement('button');
    unmuteButton.type = 'button';
    unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    const unmuteImg = document.createElement('img');
    unmuteImg.alt = 'svg file';
    unmuteImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775815893604.svg+xml'; // From original HTML
    unmuteButton.append(unmuteImg);

    const noAudioButton = document.createElement('button');
    noAudioButton.type = 'button';
    noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const noAudioImg = document.createElement('img');
    noAudioImg.alt = 'svg file';
    noAudioImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775815893657.svg+xml'; // From original HTML
    noAudioButton.append(noAudioImg);

    muteOverlay.append(muteButton, unmuteButton, noAudioButton);

    videoWrapper.append(video, playPauseOverlay, muteOverlay);

    // Event listeners for video controls
    playPauseOverlay.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playButton.classList.add('d-none');
        pauseButton.classList.remove('d-none');
      } else {
        video.pause();
        playButton.classList.remove('d-none');
        pauseButton.classList.add('d-none');
      }
    });

    muteOverlay.addEventListener('click', () => {
      video.muted = !video.muted;
      if (video.muted) {
        muteButton.classList.add('d-none');
        unmuteButton.classList.add('d-none');
        noAudioButton.classList.remove('d-none');
      } else {
        muteButton.classList.remove('d-none');
        unmuteButton.classList.add('d-none');
        noAudioButton.classList.add('d-none');
      }
    });

    // Initial state for controls based on video muted status
    if (video.muted) {
      muteButton.classList.add('d-none');
      unmuteButton.classList.add('d-none');
      noAudioButton.classList.remove('d-none');
    } else {
      muteButton.classList.remove('d-none');
      unmuteButton.classList.add('d-none');
      noAudioButton.classList.add('d-none');
    }

  } else {
    // If it's not a video link, append the original picture element.
    const picture = videoCell ? videoCell.querySelector('picture') : null;
    if (picture) {
      videoWrapper.append(picture);
    }
  }

  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');
  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');
  ctaDiv.append(bannerCta);

  wrapper.append(videoWrapper, ctaDiv);
  section.append(wrapper);

  block.textContent = '';
  block.append(section);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
