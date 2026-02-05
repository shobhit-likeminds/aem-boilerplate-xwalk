import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainBannerContainer = document.createElement('div');
  mainBannerContainer.classList.add('main-banner-container');
  moveInstrumentation(block, mainBannerContainer);

  const mainBannerHeaderBanner = document.createElement('div');
  mainBannerHeaderBanner.classList.add('main-banner-header-banner');

  const mainBannerHeaderContent = document.createElement('div');
  mainBannerHeaderContent.classList.add('main-banner-header-content');

  const mainBannerHomeBanner = document.createElement('div');
  mainBannerHomeBanner.classList.add('main-banner-home-banner');

  const mainBannerBxWrapper = document.createElement('div');
  mainBannerBxWrapper.classList.add('main-banner-bx-wrapper');
  mainBannerBxWrapper.style.maxWidth = '100%';

  const mainBannerBxViewport = document.createElement('div');
  mainBannerBxViewport.classList.add('main-banner-bx-viewport');
  mainBannerBxViewport.style.width = '100%';
  mainBannerBxViewport.style.overflow = 'hidden';
  mainBannerBxViewport.style.position = 'relative';

  const mainBannerBxslider2 = document.createElement('ul');
  mainBannerBxslider2.classList.add('main-banner-bxslider-2');
  mainBannerBxslider2.style.width = '415%';
  mainBannerBxslider2.style.position = 'relative';

  const mainBannerBxControls = document.createElement('div');
  mainBannerBxControls.classList.add('main-banner-bx-controls');

  // Extracting main banner fields from the first row
  const firstRow = block.children[0];
  if (firstRow) {
    const cells = [...firstRow.children];

    // Header Image
    const headerImageCell = cells[0];
    if (headerImageCell) {
      const img = headerImageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('main-banner-m-header-banner');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        mainBannerHeaderBanner.append(optimizedPic);
      }
    }

    // Logo
    const logoCell = cells[1];
    if (logoCell) {
      const img = logoCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('main-banner-banner-logo');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        mainBannerHeaderContent.append(optimizedPic);
      }
    }

    // Title
    const titleCell = cells[2];
    if (titleCell) {
      const h2 = document.createElement('h2');
      h2.classList.add('main-banner-title');
      h2.textContent = titleCell.textContent;
      moveInstrumentation(titleCell, h2);
      mainBannerHeaderContent.append(h2);
    }
  }

  // Loop through remaining rows for slides
  [...block.children].slice(1).forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('main-banner-slide-item');
    moveInstrumentation(row, li);

    const cells = [...row.children];

    // Image or Caption
    const contentCell = cells[0];
    if (contentCell) {
      const img = contentCell.querySelector('img');
      const h5 = contentCell.querySelector('h5');

      if (img) {
        const videoDiv = document.createElement('div');
        videoDiv.classList.add('main-banner-video');
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        videoDiv.append(optimizedPic);
        li.append(videoDiv);
      } else if (h5) {
        const bannerCopyDiv = document.createElement('div');
        bannerCopyDiv.classList.add('main-banner-banner-copy');
        const newH5 = document.createElement('h5');
        newH5.classList.add('main-banner-copy-text');
        newH5.innerHTML = h5.innerHTML; // Retain inner HTML for span
        moveInstrumentation(h5, newH5);
        bannerCopyDiv.append(newH5);
        li.append(bannerCopyDiv);
      }
    }
    mainBannerBxslider2.append(li);
  });

  mainBannerBxViewport.append(mainBannerBxslider2);
  mainBannerBxWrapper.append(mainBannerBxViewport, mainBannerBxControls);
  mainBannerHomeBanner.append(mainBannerBxWrapper);
  mainBannerHeaderContent.append(mainBannerHomeBanner);
  mainBannerHeaderBanner.append(mainBannerHeaderContent);
  mainBannerContainer.append(mainBannerHeaderBanner);

  block.textContent = '';
  block.append(mainBannerContainer);
}