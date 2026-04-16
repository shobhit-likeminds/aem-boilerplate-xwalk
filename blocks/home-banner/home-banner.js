import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    headingRow,
    bannerTextRow,
    ...rotatorImageRows
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('home-banner');

  const pentionBnr = document.createElement('div');
  pentionBnr.classList.add('pention_bnr');

  const bannerHld = document.createElement('div');
  bannerHld.classList.add('banner-hld');

  // Background Image
  const animBg = document.createElement('div');
  animBg.classList.add('anim-bg');
  const bgFigure = document.createElement('figure');
  const bgPicture = backgroundImageRow.querySelector('picture');
  if (bgPicture) {
    const bgImg = bgPicture.querySelector('img');
    if (bgImg) {
      const optimizedBgPic = createOptimizedPicture(bgImg.src, bgImg.alt, false, [{ width: '1920' }]);
      moveInstrumentation(bgImg, optimizedBgPic.querySelector('img'));
      bgFigure.append(optimizedBgPic);
      optimizedBgPic.querySelector('img').classList.add('bg-cover');
    }
  }
  moveInstrumentation(backgroundImageRow, bgFigure);
  animBg.append(bgFigure);
  bannerHld.append(animBg);

  const container1600Wrp = document.createElement('div');
  container1600Wrp.classList.add('container-1600-wrp');

  // Heading
  const captionWrp = document.createElement('div');
  captionWrp.classList.add('caption-wrp');
  const heading = document.createElement('h2');
  moveInstrumentation(headingRow, heading);
  heading.innerHTML = headingRow.textContent.trim();
  captionWrp.append(heading);
  container1600Wrp.append(captionWrp);

  // Banner Text
  const bannerText = document.createElement('div');
  bannerText.classList.add('banner-text');
  moveInstrumentation(bannerTextRow, bannerText);
  bannerText.innerHTML = bannerTextRow.firstElementChild.innerHTML;
  container1600Wrp.append(bannerText);

  bannerHld.append(container1600Wrp);

  // Rotator Images
  if (rotatorImageRows.length > 0) {
    const rotator = document.createElement('div');
    rotator.classList.add('rotator');
    const rotatorFigure = document.createElement('figure');

    rotatorImageRows.forEach((row, index) => {
      // Use content detection instead of row.firstElementChild for robustness
      const imageCell = [...row.children].find(cell => cell.querySelector('picture'));
      if (imageCell) {
        const picture = imageCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            const rotatorImg = optimizedPic.querySelector('img');
            rotatorImg.classList.add('bg-cover');
            if (index === 0) {
              rotatorImg.style.display = 'block';
              rotatorImg.style.opacity = '1';
            } else {
              rotatorImg.style.display = 'block';
              rotatorImg.style.opacity = '0.7';
            }
            rotatorFigure.append(optimizedPic);
          }
        }
      }
      moveInstrumentation(row, rotatorFigure);
    });
    rotator.append(rotatorFigure);
    bannerHld.append(rotator);
  }

  const bannerOverlay = document.createElement('div');
  bannerOverlay.classList.add('banner-overlay');
  bannerHld.append(bannerOverlay);

  pentionBnr.append(bannerHld);
  block.append(pentionBnr);

  // Implement the banner text rotator logic
  const bannerTextSpans = bannerText.querySelectorAll('span');
  let currentSpanIndex = 0;

  function rotateBannerText() {
    bannerTextSpans.forEach((span, index) => {
      if (index === currentSpanIndex) {
        span.style.opacity = '1';
      } else {
        span.style.opacity = '0';
      }
    });

    currentSpanIndex = (currentSpanIndex + 1) % bannerTextSpans.length;
  }

  if (bannerTextSpans.length > 1) {
    // Initial state setup
    bannerTextSpans.forEach((span, index) => {
      span.style.display = 'block';
      span.style.transition = 'opacity 1s ease-in-out';
      span.style.opacity = index === 0 ? '1' : '0';
    });
    setInterval(rotateBannerText, 3000); // Rotate every 3 seconds
  }
}
