import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('banner-section');

  const wrapper = document.createElement('div');
  wrapper.classList.add('position-relative', 'boing', 'banner-section__wrapper');

  [...block.children].forEach((row) => {
    const cells = [...row.children];

    // Check 0 & 1: Structure alignment - using content detection instead of direct index access
    // This block expects rows of 6 cells for "banner-video" items.
    // The original code already checks cells.length === 6, which is good.
    if (cells.length === 6) { // This is a banner-video item
      const videoWrapper = document.createElement('div');
      videoWrapper.classList.add('video-wrapper');

      // Content detection for cells
      const videoCell = cells.find(cell => cell.querySelector('picture source') || cell.querySelector('video source') || (cell.querySelector('picture img') && cell.textContent.trim() === ''));
      const playIconCell = cells.find(cell => cell.querySelector('picture img') && cell.querySelector('img').alt.toLowerCase().includes('play'));
      const pauseIconCell = cells.find(cell => cell.querySelector('picture img') && cell.querySelector('img').alt.toLowerCase().includes('pause'));
      const muteIconCell = cells.find(cell => cell.querySelector('picture img') && cell.querySelector('img').alt.toLowerCase().includes('mute'));
      const unmuteIconCell = cells.find(cell => cell.querySelector('picture img') && cell.querySelector('img').alt.toLowerCase().includes('unmute'));
      const noAudioIconCell = cells.find(cell => cell.querySelector('picture img') && cell.querySelector('img').alt.toLowerCase().includes('no audio'));

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

      if (videoCell) {
        const videoSource = videoCell.querySelector('picture source') || videoCell.querySelector('video source');
        if (videoSource) {
          const sourceEl = document.createElement('source');
          sourceEl.src = videoSource.src;
          sourceEl.type = videoSource.type || 'video/mp4'; // Default to mp4 if type not specified
          videoEl.append(sourceEl);
        } else {
          const img = videoCell.querySelector('img');
          if (img) {
            const src = img.getAttribute('src');
            const sourceEl = document.createElement('source');
            sourceEl.src = src.replace(/\.jpg|\.jpeg|\.png|\.gif/, '.mp4'); // Heuristic for video source
            sourceEl.type = 'video/mp4';
            videoEl.append(sourceEl);
          }
        }
        moveInstrumentation(videoCell, videoEl);
      }
      videoWrapper.append(videoEl);

      const playPauseContainer = document.createElement('div');
      playPauseContainer.classList.add('position-absolute', 'w-100', 'h-100', 'start-0', 'top-0', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer');

      const playButton = document.createElement('button');
      playButton.setAttribute('type', 'button');
      playButton.classList.add('d-none', 'video-icon', 'icon-play', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      if (playIconCell) {
        const playImg = playIconCell.querySelector('picture img');
        if (playImg) {
          const optimizedPlayPic = createOptimizedPicture(playImg.src, playImg.alt, false, [{ width: '750' }]);
          moveInstrumentation(playImg, optimizedPlayPic.querySelector('img'));
          playButton.append(optimizedPlayPic);
        }
        moveInstrumentation(playIconCell, playButton);
      }
      playPauseContainer.append(playButton);

      const pauseButton = document.createElement('button');
      pauseButton.setAttribute('type', 'button');
      pauseButton.classList.add('d-block', 'video-icon', 'icon-pause', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      if (pauseIconCell) {
        const pauseImg = pauseIconCell.querySelector('picture img');
        if (pauseImg) {
          const optimizedPausePic = createOptimizedPicture(pauseImg.src, pauseImg.alt, false, [{ width: '750' }]);
          moveInstrumentation(pauseImg, optimizedPausePic.querySelector('img'));
          pauseButton.append(optimizedPausePic);
        }
        moveInstrumentation(pauseIconCell, pauseButton);
      }
      playPauseContainer.append(pauseButton);
      videoWrapper.append(playPauseContainer);

      const muteUnmuteContainer = document.createElement('div');
      muteUnmuteContainer.classList.add('position-absolute', 'z-2', 'd-flex', 'justify-content-center', 'align-items-center', 'cursor-pointer', 'mute-icon');

      const muteButton = document.createElement('button');
      muteButton.setAttribute('type', 'button');
      muteButton.classList.add('video-icon-volume', 'icon-mute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      if (muteIconCell) {
        const muteImg = muteIconCell.querySelector('picture img');
        if (muteImg) {
          const optimizedMutePic = createOptimizedPicture(muteImg.src, muteImg.alt, false, [{ width: '750' }]);
          moveInstrumentation(muteImg, optimizedMutePic.querySelector('img'));
          muteButton.append(optimizedMutePic);
        }
        moveInstrumentation(muteIconCell, muteButton);
      }
      muteUnmuteContainer.append(muteButton);

      const unmuteButton = document.createElement('button');
      unmuteButton.setAttribute('type', 'button');
      unmuteButton.classList.add('video-icon-volume', 'icon-unmute', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer', 'd-none');
      if (unmuteIconCell) {
        const unmuteImg = unmuteIconCell.querySelector('picture img');
        if (unmuteImg) {
          const optimizedUnmutePic = createOptimizedPicture(unmuteImg.src, unmuteImg.alt, false, [{ width: '750' }]);
          moveInstrumentation(unmuteImg, optimizedUnmutePic.querySelector('img'));
          unmuteButton.append(optimizedUnmutePic);
        }
        moveInstrumentation(unmuteIconCell, unmuteButton);
      }
      muteUnmuteContainer.append(unmuteButton);

      const noAudioButton = document.createElement('button');
      noAudioButton.setAttribute('type', 'button');
      noAudioButton.classList.add('video-icon-volume', 'no-audio-icon', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center', 'cursor-pointer');
      if (noAudioIconCell) {
        const noAudioImg = noAudioIconCell.querySelector('picture img');
        if (noAudioImg) {
          const optimizedNoAudioPic = createOptimizedPicture(noAudioImg.src, noAudioImg.alt, false, [{ width: '750' }]);
          moveInstrumentation(noAudioImg, optimizedNoAudioPic.querySelector('img'));
          noAudioButton.append(optimizedNoAudioPic);
        }
        moveInstrumentation(noAudioIconCell, noAudioButton);
      }
      muteUnmuteContainer.append(noAudioButton);
      videoWrapper.append(muteUnmuteContainer);

      wrapper.append(videoWrapper);

      // Check 2: Interactivity - Event listeners are already present and correctly implemented.
      playButton.addEventListener('click', () => {
        videoEl.play();
        playButton.classList.add('d-none');
        pauseButton.classList.remove('d-none');
      });

      pauseButton.addEventListener('click', () => {
        videoEl.pause();
        pauseButton.classList.add('d-none');
        playButton.classList.remove('d-none');
      });

      muteButton.addEventListener('click', () => {
        videoEl.muted = true;
        muteButton.classList.add('d-none');
        unmuteButton.classList.add('d-none');
        noAudioButton.classList.remove('d-none');
      });

      unmuteButton.addEventListener('click', () => {
        videoEl.muted = false;
        unmuteButton.classList.add('d-none');
        muteButton.classList.remove('d-none');
        noAudioButton.classList.add('d-none');
      });

      noAudioButton.addEventListener('click', () => {
        videoEl.muted = false; // Clicking no-audio icon should unmute
        noAudioButton.classList.add('d-none');
        muteButton.classList.remove('d-none');
      });
    }
  });

  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('position-absolute', 'start-50', 'translate-middle-x', 'w-100', 'boing__banner--cta');
  const bannerCtaDiv = document.createElement('div');
  bannerCtaDiv.classList.add('banner-cta');
  ctaDiv.append(bannerCtaDiv);
  wrapper.append(ctaDiv);

  section.append(wrapper);
  block.textContent = '';
  block.append(section);

  // Optimize images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
