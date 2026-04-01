import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageDesktopRow,
    imageMobileRow,
    headingRow,
    videoLinkRow,
    videoIconRow,
  ] = [...block.children];

  const figure = document.createElement('figure');

  // Image Desktop
  const desktopPicture = imageDesktopRow.querySelector('picture');
  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1440' }]);
    optimizedDesktopPic.querySelector('img').classList.add('hidden-xs', 'lazyloaded');
    moveInstrumentation(desktopPicture, optimizedDesktopPic);
    figure.append(optimizedDesktopPic);
  }

  // Image Mobile
  const mobilePicture = imageMobileRow.querySelector('picture');
  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '373' }]);
    optimizedMobilePic.querySelector('img').classList.add('visible-xs', 'lazyload');
    moveInstrumentation(mobilePicture, optimizedMobilePic);
    figure.append(optimizedMobilePic);
  }

  const bannerInfo = document.createElement('div');
  bannerInfo.classList.add('banner-info');

  const container = document.createElement('div');
  container.classList.add('container');

  const bannerCard = document.createElement('div');
  bannerCard.classList.add('banner-card', 'os-animation', 'animated', 'fadeIn');
  bannerCard.setAttribute('data-os-animation', 'fadeIn');

  const heading = document.createElement('h1');
  heading.classList.add('os-animation', 'hd1', 'animated', 'fadeIn');
  heading.setAttribute('data-os-animation', 'fadeIn');
  heading.setAttribute('data-os-animation-delay', '.5s');
  heading.style.animationDelay = '0.5s';
  moveInstrumentation(headingRow.firstElementChild, heading);
  heading.append(...headingRow.firstElementChild.children);

  const emptyParagraph = document.createElement('p');
  emptyParagraph.classList.add('os-animation', 'animated', 'fadeIn');
  emptyParagraph.setAttribute('data-os-animation', 'fadeIn');
  emptyParagraph.setAttribute('data-os-animation-delay', '.7s');
  emptyParagraph.style.animationDelay = '0.7s';

  const videoParagraph = document.createElement('p');
  videoParagraph.classList.add('MT30', 'os-animation', 'animated', 'fadeIn');
  videoParagraph.setAttribute('data-os-animation', 'fadeIn');
  videoParagraph.setAttribute('data-os-animation-delay', '.9s');
  videoParagraph.style.animationDelay = '0.9s';

  const videoLink = document.createElement('a');
  videoLink.classList.add('video-btn', 'fancybox-video');
  const foundVideoLink = videoLinkRow.querySelector('a');
  if (foundVideoLink) {
    videoLink.href = foundVideoLink.href;
    moveInstrumentation(foundVideoLink, videoLink);
  }

  const videoIconPicture = videoIconRow.querySelector('picture');
  if (videoIconPicture) {
    const videoIconImg = videoIconPicture.querySelector('img');
    const optimizedVideoIconPic = createOptimizedPicture(videoIconImg.src, videoIconImg.alt, false, [{ width: '32' }]);
    optimizedVideoIconPic.querySelector('img').classList.add('lazyloaded');
    moveInstrumentation(videoIconPicture, optimizedVideoIconPic);
    videoLink.append(optimizedVideoIconPic);
  }

  videoParagraph.append(videoLink);

  bannerCard.append(heading, emptyParagraph, videoParagraph);
  container.append(bannerCard);
  bannerInfo.append(container);

  block.textContent = '';
  block.classList.add('op1');
  block.append(figure, bannerInfo);
}
