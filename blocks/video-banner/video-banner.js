import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Use content detection instead of direct index access for robustness
  const children = [...block.children];
  const desktopImageRow = children.find((row) => row.querySelector('picture img[alt="Desktop Image"]'));
  const mobileImageRow = children.find((row) => row.querySelector('picture img[alt="Mobile Image"]'));
  const headingRow = children.find((row) => !row.querySelector('picture') && !row.querySelector('a') && row.textContent.trim() !== '');
  const videoLinkRow = children.find((row) => row.querySelector('a'));
  const playIconRow = children.find((row) => row.querySelector('picture img[alt="Play Icon"]'));


  const heroSteel = document.createElement('div');
  heroSteel.classList.add('hero-steel', 'op1');

  const figure = document.createElement('figure');

  // Desktop Image
  if (desktopImageRow) {
    const desktopImageCell = desktopImageRow.querySelector('div');
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1440' }]);
      optimizedDesktopPic.querySelector('img').classList.add('hidden-xs', 'lazyloaded');
      moveInstrumentation(desktopPicture, optimizedDesktopPic);
      figure.append(optimizedDesktopPic);
    }
    moveInstrumentation(desktopImageRow, figure);
  }


  // Mobile Image
  if (mobileImageRow) {
    const mobileImageCell = mobileImageRow.querySelector('div');
    const mobilePicture = mobileImageCell.querySelector('picture');
    if (mobilePicture) {
      const mobileImg = mobilePicture.querySelector('img');
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '373' }]);
      optimizedMobilePic.querySelector('img').classList.add('visible-xs', 'lazyload');
      moveInstrumentation(mobilePicture, optimizedMobilePic);
      figure.append(optimizedMobilePic);
    }
    moveInstrumentation(mobileImageRow, figure);
  }

  heroSteel.append(figure);

  const bannerInfo = document.createElement('div');
  bannerInfo.classList.add('banner-info');

  const container = document.createElement('div');
  container.classList.add('container');

  const bannerCard = document.createElement('div');
  bannerCard.classList.add('banner-card', 'os-animation', 'animated', 'fadeIn');
  bannerCard.setAttribute('data-os-animation', 'fadeIn');

  // Heading
  if (headingRow) {
    const headingEl = document.createElement('h1');
    headingEl.classList.add('os-animation', 'hd1', 'animated', 'fadeIn');
    headingEl.setAttribute('data-os-animation', 'fadeIn');
    headingEl.setAttribute('data-os-animation-delay', '.5s');
    headingEl.style.animationDelay = '0.5s';
    moveInstrumentation(headingRow.firstElementChild, headingEl);
    while (headingRow.firstElementChild.firstChild) {
      headingEl.append(headingRow.firstElementChild.firstChild);
    }
    bannerCard.append(headingEl);
  }


  // Empty paragraph as per original HTML
  const emptyP = document.createElement('p');
  emptyP.classList.add('os-animation', 'animated', 'fadeIn');
  emptyP.setAttribute('data-os-animation', 'fadeIn');
  emptyP.setAttribute('data-os-animation-delay', '.7s');
  emptyP.style.animationDelay = '0.7s';
  bannerCard.append(emptyP);

  // Video Link and Play Icon
  const videoLinkP = document.createElement('p');
  videoLinkP.classList.add('MT30', 'os-animation', 'animated', 'fadeIn');
  videoLinkP.setAttribute('data-os-animation', 'fadeIn');
  videoLinkP.setAttribute('data-os-animation-delay', '.9s');
  videoLinkP.style.animationDelay = '0.9s';

  const videoLink = document.createElement('a');
  videoLink.classList.add('video-btn', 'fancybox-video');
  if (videoLinkRow) {
    const foundVideoLink = videoLinkRow.querySelector('a');
    if (foundVideoLink) {
      videoLink.href = foundVideoLink.href;
      // Add event listener for the video link
      videoLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Implement your video modal/player logic here
        // For example, open a simple modal or redirect to the video URL
        window.open(videoLink.href, '_blank'); // Opens video in a new tab
        // Or if you have a modal library:
        // openModal(videoLink.href);
      });
    }
    moveInstrumentation(videoLinkRow.firstElementChild, videoLink);
  }


  if (playIconRow) {
    const playIconCell = playIconRow.querySelector('div');
    const playIconPicture = playIconCell.querySelector('picture');
    if (playIconPicture) {
      const playIconImg = playIconPicture.querySelector('img');
      const optimizedPlayIconPic = createOptimizedPicture(playIconImg.src, playIconImg.alt, false, [{ width: 'auto' }]);
      optimizedPlayIconPic.querySelector('img').classList.add('lazyloaded');
      moveInstrumentation(playIconPicture, optimizedPlayIconPic);
      videoLink.append(optimizedPlayIconPic);
    }
    moveInstrumentation(playIconRow, videoLink);
  }


  videoLinkP.append(videoLink);
  bannerCard.append(videoLinkP);

  container.append(bannerCard);
  bannerInfo.append(container);
  heroSteel.append(bannerInfo);

  block.textContent = '';
  block.append(heroSteel);
}
