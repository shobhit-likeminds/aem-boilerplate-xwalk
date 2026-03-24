import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [posterRow, videoRow] = [...block.children];

  const mediaViewportVideo = document.createElement('div');
  mediaViewportVideo.classList.add('media-viewport-video');
  mediaViewportVideo.setAttribute('hidden', '');
  mediaViewportVideo.setAttribute('aria-hidden', 'true');

  const mediaBackground = document.createElement('div');
  mediaBackground.classList.add('media-background');

  const mediaWrapper = document.createElement('div');
  mediaWrapper.classList.add('media-wrapper', 'media-wrapper--no-title');

  const mediaHeader = document.createElement('div');
  mediaHeader.classList.add('media-header');
  const mediaHeading = document.createElement('div');
  mediaHeading.classList.add('media-heading');
  const mediaTitle = document.createElement('div');
  mediaTitle.classList.add('media-title');
  mediaHeading.append(mediaTitle);
  mediaHeader.append(mediaHeading);
  mediaWrapper.append(mediaHeader);

  const videoDiv = document.createElement('div');
  videoDiv.classList.add('video', 'apps.qiddiya__002d__commons.components.content.commons.video__002d__v1.v1.video__002d__v1.video__002d__v1__002e__html@5f8ba13f');

  const videoPoster = document.createElement('div');
  videoPoster.classList.add('video-poster');

  const playButton = document.createElement('button');
  playButton.classList.add('video-poster-play-button');
  const playIcon = document.createElement('span');
  playIcon.classList.add('qd-icon', 'qd-icon--play', 'video-poster-play-button__icon');
  const playText = document.createElement('span');
  playText.classList.add('video-poster-play-button__text');
  playText.setAttribute('aria-hidden', 'true'); // Corrected from 'visually-hidden'
  playText.textContent = ' Watch Video ';
  playButton.append(playIcon, playText);
  videoPoster.append(playButton);

  const posterVideo = document.createElement('video');
  posterVideo.classList.add('video-poster-video');
  posterVideo.setAttribute('muted', '');
  posterVideo.setAttribute('loop', '');
  posterVideo.setAttribute('playsinline', '');
  posterVideo.setAttribute('webkit-playsinline', '');
  posterVideo.setAttribute('x-webkit-airplay', 'allow');
  posterVideo.setAttribute('autoplay', '');

  const posterPicture = posterRow.querySelector('picture');
  if (posterPicture) {
    const posterImg = posterPicture.querySelector('img');
    if (posterImg) {
      posterVideo.poster = posterImg.src;
      // The original HTML uses the poster image src for the video src as well.
      // We'll use the video field for the main video, but keep the poster src for the poster video.
      posterVideo.src = posterImg.src; // Use the poster image src for the poster video
    }
  }
  videoPoster.append(posterVideo);
  videoDiv.append(videoPoster);

  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video-container', 'show-controls', 'video-hide');

  const videoContainerViewport = document.createElement('div');
  videoContainerViewport.classList.add('media-viewport-video');
  videoContainerViewport.setAttribute('hidden', '');
  videoContainerViewport.setAttribute('aria-hidden', 'true');
  videoContainer.append(videoContainerViewport);

  const videoContainerControls = document.createElement('div');
  videoContainerControls.classList.add('video-container-controls');

  const timer = document.createElement('div');
  timer.classList.add('video-container-controls-timer');
  const progressBarArea = document.createElement('div');
  progressBarArea.classList.add('video-container-controls-timer-progress-area');
  progressBarArea.innerHTML = `
    <span class="video-container-controls-timer-progress-area__progress-bar"></span>
    <span class="video-container-controls-timer-progress-area__pointer"></span>
    <span class="video-container-controls-timer-progress-area__progress-pending"></span>
  `;
  const currentTime = document.createElement('p');
  currentTime.classList.add('video-container-controls-timer-current-time');
  currentTime.textContent = '00:00';
  const duration = document.createElement('p');
  duration.classList.add('video-container-controls-timer-duration');
  duration.textContent = '00:00';
  timer.append(progressBarArea, currentTime, duration);
  videoContainerControls.append(timer);

  const controlsButtons = document.createElement('div');
  controlsButtons.classList.add('video-container-controls-buttons');

  const playControlButton = document.createElement('button');
  playControlButton.classList.add('video-container-controls-buttons-play-button', 'video-container-controls-buttons--button');
  playControlButton.innerHTML = '<span class="video-container-controls-buttons__icon qd-icon qd-icon--play"></span>';
  controlsButtons.append(playControlButton);

  const muteButton = document.createElement('button');
  muteButton.classList.add('video-container-controls-buttons-mute-button', 'video-container-controls-buttons--button');
  muteButton.innerHTML = '<span class="video-container-controls-buttons__icon qd-icon qd-icon--volume"></span>';
  controlsButtons.append(muteButton);

  const fullscreenButton = document.createElement('button');
  fullscreenButton.classList.add('video-container-controls-buttons-fullscreen-button', 'video-container-controls-buttons--button');
  fullscreenButton.innerHTML = '<span class="video-container-controls-buttons__icon qd-icon qd-icon--fullscreen"></span>';
  controlsButtons.append(fullscreenButton);

  videoContainerControls.append(controlsButtons);
  videoContainer.append(videoContainerControls);

  const mainVideo = document.createElement('video');
  mainVideo.classList.add('video-container-video');
  mainVideo.setAttribute('playsinline', '');
  mainVideo.setAttribute('webkit-playsinline', '');
  mainVideo.setAttribute('x-webkit-airplay', 'allow');

  const videoLink = videoRow.querySelector('a');
  if (videoLink) {
    mainVideo.src = videoLink.href;
    mainVideo.setAttribute('data-video-src', videoLink.href);
  } else {
    // Fallback to video row's picture img src if no explicit video link
    const videoImg = videoRow.querySelector('picture img');
    if (videoImg) {
      mainVideo.src = videoImg.src;
      mainVideo.setAttribute('data-video-src', videoImg.src);
    }
  }
  videoContainer.append(mainVideo);
  videoDiv.append(videoContainer);
  mediaWrapper.append(videoDiv);

  block.textContent = '';
  block.classList.add('cmp-media');
  block.append(mediaViewportVideo, mediaBackground, mediaWrapper);

  // Add event listeners for video functionality
  let isPlaying = false;
  let isMuted = true;

  const togglePlay = () => {
    if (isPlaying) {
      mainVideo.pause();
      posterVideo.pause();
      playIcon.classList.remove('qd-icon--pause');
      playIcon.classList.add('qd-icon--play');
      playControlButton.querySelector('.qd-icon').classList.remove('qd-icon--pause');
      playControlButton.querySelector('.qd-icon').classList.add('qd-icon--play');
    } else {
      mainVideo.play();
      posterVideo.play();
      playIcon.classList.remove('qd-icon--play');
      playIcon.classList.add('qd-icon--pause');
      playControlButton.querySelector('.qd-icon').classList.remove('qd-icon--play');
      playControlButton.querySelector('.qd-icon').classList.add('qd-icon--pause');
      videoContainer.classList.remove('video-hide');
      videoPoster.classList.add('video-hide');
    }
    isPlaying = !isPlaying;
  };

  const toggleMute = () => {
    mainVideo.muted = !isMuted;
    posterVideo.muted = !isMuted;
    if (isMuted) {
      muteButton.querySelector('.qd-icon').classList.remove('qd-icon--volume');
      muteButton.querySelector('.qd-icon').classList.add('qd-icon--volume-mute');
    } else {
      muteButton.querySelector('.qd-icon').classList.remove('qd-icon--volume-mute');
      muteButton.querySelector('.qd-icon').classList.add('qd-icon--volume');
    }
    isMuted = !isMuted;
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (mainVideo.requestFullscreen) {
      mainVideo.requestFullscreen();
    }
  };

  playButton.addEventListener('click', togglePlay);
  playControlButton.addEventListener('click', togglePlay);
  muteButton.addEventListener('click', toggleMute);
  fullscreenButton.addEventListener('click', toggleFullscreen);

  mainVideo.addEventListener('timeupdate', () => {
    const current = mainVideo.currentTime;
    const durationVal = mainVideo.duration;
    const progress = (current / durationVal) * 100;
    progressBarArea.querySelector('.video-container-controls-timer-progress-area__progress-bar').style.width = `${progress}%`;
    progressBarArea.querySelector('.video-container-controls-timer-progress-area__pointer').style.left = `${progress}%`;

    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    currentTime.textContent = formatTime(current);
    duration.textContent = formatTime(durationVal);
  });

  mainVideo.addEventListener('ended', () => {
    isPlaying = false;
    playIcon.classList.remove('qd-icon--pause');
    playIcon.classList.add('qd-icon--play');
    playControlButton.querySelector('.qd-icon').classList.remove('qd-icon--pause');
    playControlButton.querySelector('.qd-icon').classList.add('qd-icon--play');
    videoContainer.classList.add('video-hide');
    videoPoster.classList.remove('video-hide');
  });

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
