import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    headingRow,
    ...itemRows
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
  const figureBg = document.createElement('figure');
  const bgImage = backgroundImageRow.firstElementChild.querySelector('picture');
  if (bgImage) {
    const img = bgImage.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
    optimizedPic.querySelector('img').classList.add('bg-cover');
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    figureBg.append(optimizedPic);
  }
  moveInstrumentation(backgroundImageRow, figureBg);
  animBg.append(figureBg);
  bannerHld.append(animBg);

  const container1600Wrp = document.createElement('div');
  container1600Wrp.classList.add('container-1600-wrp');

  // Heading
  const captionWrp = document.createElement('div');
  captionWrp.classList.add('caption-wrp');
  const h2 = document.createElement('h2');
  h2.innerHTML = headingRow.firstElementChild.innerHTML;
  moveInstrumentation(headingRow, h2);
  captionWrp.append(h2);
  container1600Wrp.append(captionWrp);

  // Banner Texts
  const bannerTextDiv = document.createElement('div');
  bannerTextDiv.classList.add('banner-text');
  // Filter for banner-text items: rows with one child cell containing only text (no picture)
  const bannerTexts = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 1 && !cells[0].querySelector('picture') && cells[0].textContent.trim();
  });
  bannerTexts.forEach((row, index) => {
    const span = document.createElement('span');
    span.style.display = 'block';
    span.style.opacity = index === 0 ? '1' : '0'; // Set first item to visible initially
    span.textContent = row.firstElementChild.textContent.trim();
    moveInstrumentation(row, span);
    bannerTextDiv.append(span);
  });
  container1600Wrp.append(bannerTextDiv);
  bannerHld.append(container1600Wrp);

  // Rotator Images
  const rotatorDiv = document.createElement('div');
  rotatorDiv.classList.add('rotator');
  const rotatorFigure = document.createElement('figure');
  // Filter for rotator-image items: rows with one child cell containing a picture
  const rotatorImages = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 1 && cells[0].querySelector('picture');
  });
  rotatorImages.forEach((row, index) => {
    const picture = row.firstElementChild.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      optimizedPic.querySelector('img').classList.add('bg-cover');
      optimizedPic.querySelector('img').style.display = 'block';
      optimizedPic.querySelector('img').style.opacity = index === 0 ? '1' : '0.7'; // Set first item to visible initially
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      rotatorFigure.append(optimizedPic);
    }
    moveInstrumentation(row, rotatorFigure);
  });
  rotatorDiv.append(rotatorFigure);
  bannerHld.append(rotatorDiv);

  const bannerOverlay = document.createElement('div');
  bannerOverlay.classList.add('banner-overlay');
  bannerHld.append(bannerOverlay);

  pentionBnr.append(bannerHld);
  block.append(pentionBnr);

  // Implement rotator logic
  let currentBannerTextIndex = 0;
  let currentRotatorImageIndex = 0;

  const updateBanner = () => {
    // Update banner text
    const bannerTextSpans = bannerTextDiv.querySelectorAll('span');
    bannerTextSpans.forEach((span, i) => {
      span.style.opacity = i === currentBannerTextIndex ? '1' : '0';
    });

    // Update rotator images
    const rotatorImagesElements = rotatorFigure.querySelectorAll('picture');
    rotatorImagesElements.forEach((picture, i) => {
      picture.querySelector('img').style.opacity = i === currentRotatorImageIndex ? '1' : '0.7';
    });

    currentBannerTextIndex = (currentBannerTextIndex + 1) % bannerTextSpans.length;
    currentRotatorImageIndex = (currentRotatorImageIndex + 1) % rotatorImagesElements.length;
  };

  if (bannerTexts.length > 1 || rotatorImages.length > 1) {
    setInterval(updateBanner, 3000); // Change every 3 seconds
  }
}
