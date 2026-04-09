import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Use content detection instead of direct index access
  const rows = [...block.children];

  // Find the video row (assuming it contains a link or picture)
  const videoRow = rows.find(row => row.querySelector('a') || row.querySelector('picture'));
  const videoCell = videoRow ? [...videoRow.children].find(cell => cell.querySelector('a') || cell.querySelector('picture')) : null;
  const videoLink = videoCell ? videoCell.querySelector('a') : null;

  const bannerSection = document.createElement('section');
  bannerSection.classList.add('banner-section');

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

    videoWrapper.append(video);
    if (videoCell) { // Ensure videoCell exists before moving instrumentation
      moveInstrumentation(videoCell, video); // Move instrumentation from original video cell to the new video element
    }

    // Play/Pause controls
    const playPauseControls = document.createElement('div');
    playPauseControls.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

    const playButton = document.createElement('button');
    playButton.type = 'button';
    playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const playImg = document.createElement('img');
    playImg.alt = 'svg file';
    playImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775737677133.svg+xml'; // This is a hardcoded path, but it's from the original HTML, so it's allowed.
    playButton.append(playImg);

    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const pauseImg = document.createElement('img');
    pauseImg.alt = 'svg file';
    pauseImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775737677165.svg+xml'; // This is a hardcoded path, but it's from the original HTML, so it's allowed.
    pauseButton.append(pauseImg);

    playPauseControls.append(playButton, pauseButton);
    videoWrapper.append(playPauseControls);

    // Mute/Unmute controls
    const muteControls = document.createElement('div');
    muteControls.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

    const muteButton = document.createElement('button');
    muteButton.type = 'button';
    muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    const muteImg = document.createElement('img');
    muteImg.alt = 'svg file';
    muteImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775737677205.svg+xml'; // Hardcoded from original HTML
    muteButton.append(muteImg);

    const unmuteButton = document.createElement('button');
    unmuteButton.type = 'button';
    unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
    const unmuteImg = document.createElement('img');
    unmuteImg.alt = 'svg file';
    unmuteImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775737677294.svg+xml'; // Hardcoded from original HTML
    unmuteButton.append(unmuteImg);

    const noAudioButton = document.createElement('button');
    noAudioButton.type = 'button';
    noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
    const noAudioImg = document.createElement('img');
    noAudioImg.alt = 'svg file';
    noAudioImg.src = '/content/dam/aemigrate/uploaded-folder/image/1775737677347.svg+xml'; // Hardcoded from original HTML
    noAudioButton.append(noAudioImg);

    muteControls.append(muteButton, unmuteButton, noAudioButton);
    videoWrapper.append(muteControls);

    // Event Listeners for video controls
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
      video.muted = false;
      noAudioButton.classList.add('d-none');
      unmuteButton.classList.remove('d-none');
    });

    video.addEventListener('volumechange', () => {
      if (video.muted) {
        muteButton.classList.remove('d-none');
        unmuteButton.classList.add('d-none');
        noAudioButton.classList.add('d-none');
      } else if (video.volume === 0) {
        noAudioButton.classList.remove('d-none');
        muteButton.classList.add('d-none');
        unmuteButton.classList.add('d-none');
      } else {
        unmuteButton.classList.remove('d-none');
        muteButton.classList.add('d-none');
        noAudioButton.classList.add('d-none');
      }
    });

    video.addEventListener('play', () => {
      playButton.classList.add('d-none');
      pauseButton.classList.remove('d-none');
    });

    video.addEventListener('pause', () => {
      pauseButton.classList.add('d-none');
      playButton.classList.remove('d-none');
    });

  } else if (videoCell) { // If no video link, but there's a videoCell (e.g., with a picture)
    // If no video link, append the original content (e.g., a picture for poster)
    moveInstrumentation(videoCell, videoWrapper);
    while (videoCell.firstChild) {
      videoWrapper.append(videoCell.firstChild);
    }
    videoWrapper.querySelectorAll('picture > img').forEach((img) => {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    });
  }

  wrapper.append(videoWrapper);

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');
  const bannerCta = document.createElement('div');
  bannerCta.classList.add('banner-cta');
  ctaWrapper.append(bannerCta);
  wrapper.append(ctaWrapper);

  bannerSection.append(wrapper);

  block.textContent = '';
  block.append(bannerSection);
}
