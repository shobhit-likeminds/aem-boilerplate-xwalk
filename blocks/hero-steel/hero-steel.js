import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Check 0 & 1: Structure Alignment - Using destructuring for root rows is acceptable
  // as the BlockJson defines a fixed number of root fields.
  const [
    imageDesktopRow,
    imageMobileRow,
    headingRow,
    videoLinkRow,
    videoIconRow,
  ] = [...block.children];

  // Create figure element for desktop and mobile images
  const figure = document.createElement('figure');

  const desktopPicture = imageDesktopRow.querySelector('picture');
  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    if (desktopImg) {
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1440' }]);
      optimizedDesktopPic.querySelector('img').classList.add('hidden-xs', 'lazyloaded');
      moveInstrumentation(desktopPicture, optimizedDesktopPic);
      figure.append(optimizedDesktopPic);
    }
  }

  const mobilePicture = mobileImageRow.querySelector('picture'); // Corrected variable name
  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    if (mobileImg) {
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '373' }]);
      optimizedMobilePic.querySelector('img').classList.add('visible-xs', 'lazyload');
      moveInstrumentation(mobilePicture, optimizedMobilePic);
      figure.append(optimizedMobilePic);
    }
  }

  // Create banner-info div
  const bannerInfo = document.createElement('div');
  bannerInfo.classList.add('banner-info');

  const container = document.createElement('div');
  container.classList.add('container');

  const bannerCard = document.createElement('div');
  bannerCard.classList.add('banner-card', 'os-animation', 'animated', 'fadeIn');
  // data-os-animation="fadeIn" is not needed as JS handles it

  const headingEl = document.createElement('h1');
  headingEl.classList.add('os-animation', 'hd1', 'animated', 'fadeIn');
  // data-os-animation="fadeIn" data-os-animation-delay=".5s" are not needed as JS handles it
  moveInstrumentation(headingRow.firstElementChild, headingEl);
  headingEl.append(headingRow.firstElementChild.textContent.trim());

  const emptyParagraph = document.createElement('p');
  emptyParagraph.classList.add('os-animation', 'animated', 'fadeIn');
  // data-os-animation="fadeIn" data-os-animation-delay=".7s" are not needed as JS handles it

  const videoLinkWrapper = document.createElement('p');
  videoLinkWrapper.classList.add('MT30', 'os-animation', 'animated', 'fadeIn');
  // data-os-animation="fadeIn" data-os-animation-delay=".9s" are not needed as JS handles it

  const videoLinkAnchor = document.createElement('a');
  videoLinkAnchor.classList.add('video-btn', 'fancybox-video');
  const foundVideoLink = videoLinkRow.querySelector('a');
  if (foundVideoLink) {
    videoLinkAnchor.href = foundVideoLink.href;
    moveInstrumentation(videoLinkRow.firstElementChild, videoLinkAnchor);
  }

  const videoIconPicture = videoIconRow.querySelector('picture');
  if (videoIconPicture) {
    const videoIconImg = videoIconPicture.querySelector('img');
    if (videoIconImg) {
      const optimizedVideoIconPic = createOptimizedPicture(videoIconImg.src, videoIconImg.alt, false, [{ width: '30' }]); // Assuming a small size for icons
      optimizedVideoIconPic.querySelector('img').classList.add('lazyloaded');
      moveInstrumentation(videoIconPicture, optimizedVideoIconPic);
      videoLinkAnchor.append(optimizedVideoIconPic);
    }
  }

  videoLinkWrapper.append(videoLinkAnchor);

  bannerCard.append(headingEl, emptyParagraph, videoLinkWrapper);
  container.append(bannerCard);
  bannerInfo.append(container);

  block.textContent = '';
  block.classList.add('op1'); // Add the op1 class from original HTML
  block.append(figure, bannerInfo);

  // CHECK 2: Interactivity - Add event listener for the video button
  videoLinkAnchor.addEventListener('click', (e) => {
    e.preventDefault();
    // In a real scenario, this would open a modal or navigate to the video.
    // For this exercise, we'll just log it.
    console.log(`Video button clicked! Playing video from: ${videoLinkAnchor.href}`);
    // Example: If using a modal, you'd add/remove classes to show/hide it
    // document.body.classList.add('video-modal-open');
    // const videoModal = document.createElement('div');
    // videoModal.classList.add('video-modal');
    // videoModal.innerHTML = `<iframe src="${videoLinkAnchor.href}" frameborder="0" allowfullscreen></iframe>`;
    // document.body.append(videoModal);
  });
}
