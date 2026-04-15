import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageRow,
    headingRow,
    bannerTextRow,
    rotatorImage1Row,
    rotatorImage2Row,
    rotatorImage3Row,
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('home-banner');

  const pentionBnr = document.createElement('div');
  pentionBnr.classList.add('pention_bnr');
  block.append(pentionBnr);

  const bannerHld = document.createElement('div');
  bannerHld.classList.add('banner-hld');
  pentionBnr.append(bannerHld);

  // Background Image
  const animBg = document.createElement('div');
  animBg.classList.add('anim-bg');
  bannerHld.append(animBg);

  const bgFigure = document.createElement('figure');
  animBg.append(bgFigure);

  const bgImageCell = backgroundImageRow.firstElementChild;
  const bgPicture = bgImageCell.querySelector('picture');
  if (bgPicture) {
    const img = bgPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
    optimizedPic.querySelector('img').classList.add('bg-cover');
    moveInstrumentation(bgPicture, optimizedPic.querySelector('img'));
    bgFigure.append(optimizedPic);
  }
  moveInstrumentation(backgroundImageRow, animBg);

  const container1600Wrp = document.createElement('div');
  container1600Wrp.classList.add('container-1600-wrp');
  bannerHld.append(container1600Wrp);

  // Heading
  const captionWrp = document.createElement('div');
  captionWrp.classList.add('caption-wrp');
  container1600Wrp.append(captionWrp);

  const heading = document.createElement('h2');
  heading.innerHTML = headingRow.firstElementChild.innerHTML;
  captionWrp.append(heading);
  moveInstrumentation(headingRow, heading);

  // Banner Text
  const bannerText = document.createElement('div');
  bannerText.classList.add('banner-text');
  bannerText.innerHTML = bannerTextRow.firstElementChild.innerHTML;
  container1600Wrp.append(bannerText);
  moveInstrumentation(bannerTextRow, bannerText);

  // Rotator Images
  const rotator = document.createElement('div');
  rotator.classList.add('rotator');
  bannerHld.append(rotator);

  const rotatorFigure = document.createElement('figure');
  rotator.append(rotatorFigure);

  const rotatorImages = [rotatorImage1Row, rotatorImage2Row, rotatorImage3Row];
  rotatorImages.forEach((row, index) => {
    const rotatorImageCell = row.firstElementChild;
    const rotatorPicture = rotatorImageCell.querySelector('picture');
    if (rotatorPicture) {
      const img = rotatorPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      optimizedPic.querySelector('img').classList.add('bg-cover');
      moveInstrumentation(rotatorPicture, optimizedPic.querySelector('img'));
      rotatorFigure.append(optimizedPic);
    }
    moveInstrumentation(row, rotatorFigure);
  });

  const bannerOverlay = document.createElement('div');
  bannerOverlay.classList.add('banner-overlay');
  bannerHld.append(bannerOverlay);
}
