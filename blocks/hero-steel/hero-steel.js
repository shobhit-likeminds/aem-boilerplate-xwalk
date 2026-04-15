import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    imageDesktopRow,
    imageMobileRow,
    breadcrumbsRow,
    headingRow,
    descriptionRow,
  ] = [...block.children];

  block.classList.add('op1');

  // Figure element for images
  const figure = document.createElement('figure');

  // Desktop Image
  const desktopPicture = imageDesktopRow.children[0].querySelector('picture');
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

  // Mobile Image
  const mobilePicture = imageMobileRow.children[0].querySelector('picture');
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
  const breadcrumbsContainer = document.createElement('div');
  breadcrumbsContainer.classList.add('container');
  const breadcrumbsDiv = document.createElement('div');
  breadcrumbsDiv.classList.add('breadcrumbs', 'hidden-sm', 'hidden-xs');
  const blockJswDiv = document.createElement('div');
  blockJswDiv.classList.add('block', 'block-jsw');
  blockJswDiv.id = 'block-jsw-breadcrumb-block';
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content');
  moveInstrumentation(breadcrumbsRow.children[0], contentDiv);
  while (breadcrumbsRow.children[0].firstChild) {
    contentDiv.append(breadcrumbsRow.children[0].firstChild);
  }
  blockJswDiv.append(contentDiv);
  breadcrumbsDiv.append(blockJswDiv);
  breadcrumbsContainer.append(breadcrumbsDiv);
  block.append(breadcrumbsContainer);

  // Banner Info
  const bannerInfo = document.createElement('div');
  bannerInfo.classList.add('banner-info');
  const bannerInfoContainer = document.createElement('div');
  bannerInfoContainer.classList.add('container');
  const bannerCard = document.createElement('div');
  bannerCard.classList.add('banner-card', 'os-animation', 'animated', 'fadeIn');

  // Heading
  const heading = document.createElement('h1');
  heading.classList.add('os-animation', 'hd1', 'animated', 'fadeIn');
  moveInstrumentation(headingRow.children[0], heading);
  heading.textContent = headingRow.children[0].textContent.trim();
  bannerCard.append(heading);

  // Description
  const description = document.createElement('p');
  description.classList.add('os-animation', 'animated', 'fadeIn');
  moveInstrumentation(descriptionRow.children[0], description);
  description.textContent = descriptionRow.children[0].textContent.trim();
  bannerCard.append(description);

  bannerInfoContainer.append(bannerCard);
  bannerInfo.append(bannerInfoContainer);
  block.append(bannerInfo);

  // Clear original block content
  imageDesktopRow.remove();
  imageMobileRow.remove();
  breadcrumbsRow.remove();
  headingRow.remove();
  descriptionRow.remove();
}
