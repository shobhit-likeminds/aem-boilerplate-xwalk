import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    desktopImageRow,
    mobileImageRow,
    headingRow,
    videoLinkRow,
    videoLinkLabelRow,
  ] = [...block.children];

  // Fix: Replaced row.firstElementChild with destructuring for explicit children[0] access
  const [desktopImageCell] = [...desktopImageRow.children];
  const [mobileImageCell] = [...mobileImageRow.children];
  const [headingCell] = [...headingRow.children];
  const [videoLinkCell] = [...videoLinkRow.children];
  const [videoLinkLabelCell] = [...videoLinkLabelRow.children];

  const heroSteel = document.createElement('div');
  heroSteel.classList.add('hero-steel', 'op1');

  const figure = document.createElement('figure');

  // Desktop Image
  const desktopPicture = desktopImageCell?.querySelector('picture');
  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1440' }]);
    optimizedDesktopPic.querySelector('img').classList.add('hidden-xs', 'lazyloaded');
    moveInstrumentation(desktopPicture, optimizedDesktopPic.querySelector('img'));
    figure.appendChild(optimizedDesktopPic);
  }

  // Mobile Image
  const mobilePicture = mobileImageCell?.querySelector('picture');
  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '373' }]);
    optimizedMobilePic.querySelector('img').classList.add('visible-xs', 'lazyload');
    moveInstrumentation(mobilePicture, optimizedMobilePic.querySelector('img'));
    figure.appendChild(optimizedMobilePic);
  }

  heroSteel.appendChild(figure);

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
  heading.textContent = headingCell?.textContent.trim() || '';
  bannerCard.appendChild(heading);

  const emptyP = document.createElement('p');
  emptyP.classList.add('os-animation', 'animated', 'fadeIn');
  emptyP.setAttribute('data-os-animation', 'fadeIn');
  emptyP.setAttribute('data-os-animation-delay', '.7s');
  emptyP.style.animationDelay = '0.7s';
  bannerCard.appendChild(emptyP);

  const videoLinkP = document.createElement('p');
  videoLinkP.classList.add('MT30', 'os-animation', 'animated', 'fadeIn');
  videoLinkP.setAttribute('data-os-animation', 'fadeIn');
  videoLinkP.setAttribute('data-os-animation-delay', '.9s');
  videoLinkP.style.animationDelay = '0.9s';

  const videoAnchor = document.createElement('a');
  videoAnchor.classList.add('video-btn', 'fancybox-video');
  const foundVideoLink = videoLinkCell?.querySelector('a');
  if (foundVideoLink) {
    videoAnchor.href = foundVideoLink.href;
  }
  videoAnchor.textContent = videoLinkLabelCell?.textContent.trim() || '';

  // Original HTML has a play icon, but the block model does not provide a field for it.
  // Rule 16: Never hardcode DAM paths or site-specific asset URLs.
  // Therefore, we do not add the play icon image.

  videoLinkP.appendChild(videoAnchor);
  bannerCard.appendChild(videoLinkP);

  container.appendChild(bannerCard);
  bannerInfo.appendChild(container);
  heroSteel.appendChild(bannerInfo);

  block.textContent = '';
  block.classList.add('pane-content'); // Based on original HTML structure
  block.appendChild(heroSteel);

  // Check 2: Interactivity - Add event listener for the video button
  videoAnchor.addEventListener('click', (e) => {
    e.preventDefault();
    // In a real scenario, this would trigger a modal or lightbox for the video.
    // For now, we'll just log to console or open in a new tab as a fallback.
    window.open(videoAnchor.href, '_blank');
    console.log(`Video link clicked: ${videoAnchor.href}`);
  });
}
