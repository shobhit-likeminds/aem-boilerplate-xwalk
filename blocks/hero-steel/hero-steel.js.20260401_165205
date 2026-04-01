import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageDesktopRow,
    imageMobileRow,
    breadcrumbRow,
    headingRow,
    descriptionRow,
  ] = [...block.children];

  block.classList.add('op1');

  const figure = document.createElement('figure');

  // Image Desktop
  const desktopPicture = imageDesktopRow.querySelector('picture');
  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    if (desktopImg) {
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1440' }]);
      const newDesktopImg = optimizedDesktopPic.querySelector('img');
      moveInstrumentation(desktopImg, newDesktopImg);
      newDesktopImg.classList.add('hidden-xs', 'lazyloaded');
      figure.append(optimizedDesktopPic);
    }
  }

  // Image Mobile
  const mobilePicture = mobileRow.querySelector('picture');
  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    if (mobileImg) {
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '373' }]);
      const newMobileImg = optimizedMobilePic.querySelector('img');
      moveInstrumentation(mobileImg, newMobileImg);
      newMobileImg.classList.add('visible-xs', 'lazyload');
      figure.append(optimizedMobilePic);
    }
  }

  block.append(figure);

  // Breadcrumbs
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const breadcrumbsDiv = document.createElement('div');
  breadcrumbsDiv.classList.add('breadcrumbs', 'hidden-sm', 'hidden-xs');

  const blockJswDiv = document.createElement('div');
  blockJswDiv.classList.add('block', 'block-jsw');

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content');

  const breadcrumbLink = breadcrumbRow.querySelector('a');
  if (breadcrumbLink) {
    const homeLink = document.createElement('a');
    homeLink.href = '/'; // Assuming home link always goes to root
    homeLink.textContent = 'Home';
    contentDiv.append(homeLink);

    const splitSpan = document.createElement('span');
    splitSpan.classList.add('split');
    const icon = document.createElement('i');
    icon.classList.add('fa', 'fa-arrow-right');
    splitSpan.append(icon);
    contentDiv.append(splitSpan);

    const currentLink = document.createElement('a');
    currentLink.href = breadcrumbLink.href;
    currentLink.textContent = breadcrumbLink.textContent;
    moveInstrumentation(breadcrumbLink, currentLink);
    contentDiv.append(currentLink);
  }

  blockJswDiv.append(contentDiv);
  breadcrumbsDiv.append(blockJswDiv);
  containerDiv.append(breadcrumbsDiv);
  block.append(containerDiv);

  // Banner Info
  const bannerInfoDiv = document.createElement('div');
  bannerInfoDiv.classList.add('banner-info');

  const bannerContainerDiv = document.createElement('div');
  bannerContainerDiv.classList.add('container');

  const bannerCardDiv = document.createElement('div');
  bannerCardDiv.classList.add('banner-card', 'os-animation', 'animated', 'fadeIn');
  bannerCardDiv.setAttribute('data-os-animation', 'fadeIn');

  const headingEl = document.createElement('h1');
  headingEl.classList.add('os-animation', 'hd1', 'animated', 'fadeIn');
  headingEl.setAttribute('data-os-animation', 'fadeIn');
  headingEl.setAttribute('data-os-animation-delay', '.5s');
  const originalHeading = headingRow.querySelector('div > div'); // Find the content div
  if (originalHeading) {
    moveInstrumentation(originalHeading, headingEl);
    headingEl.innerHTML = originalHeading.innerHTML;
  }
  bannerCardDiv.append(headingEl);

  const descriptionEl = document.createElement('p');
  descriptionEl.classList.add('os-animation', 'animated', 'fadeIn');
  descriptionEl.setAttribute('data-os-animation', 'fadeIn');
  descriptionEl.setAttribute('data-os-animation-delay', '.7s');
  const originalDescription = descriptionRow.querySelector('div > div'); // Find the content div
  if (originalDescription) {
    moveInstrumentation(originalDescription, descriptionEl);
    descriptionEl.innerHTML = originalDescription.innerHTML;
  }
  bannerCardDiv.append(descriptionEl);

  bannerContainerDiv.append(bannerCardDiv);
  bannerInfoDiv.append(bannerContainerDiv);
  block.append(bannerInfoDiv);

  // Clear original block content
  [...block.children].forEach((row) => {
    if (row !== figure && row !== containerDiv && row !== bannerInfoDiv) {
      row.remove();
    }
  });
}
