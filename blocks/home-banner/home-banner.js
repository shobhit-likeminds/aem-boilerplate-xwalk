import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure all rows based on the BlockJson model
  const [
    backgroundImageRow,
    headlineRow,
    bannerText1Row,
    bannerText2Row,
    bannerText3Row,
    rotatorImage1Row,
    rotatorImage2Row,
    rotatorImage3Row,
  ] = [...block.children];

  const pentionBnr = document.createElement('div');
  pentionBnr.classList.add('pention_bnr');

  const bannerHld = document.createElement('div');
  bannerHld.classList.add('banner-hld');
  pentionBnr.append(bannerHld);

  // Background Image
  const backgroundImageCell = backgroundImageRow.children[0];
  if (backgroundImageCell) {
    const animBg = document.createElement('div');
    animBg.classList.add('anim-bg');
    const figure = document.createElement('figure');
    const picture = backgroundImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('bg-cover');
    }
    moveInstrumentation(backgroundImageRow, animBg);
    animBg.append(figure);
    bannerHld.append(animBg);
  }

  const container1600Wrp = document.createElement('div');
  container1600Wrp.classList.add('container-1600-wrp');
  bannerHld.append(container1600Wrp);

  // Headline
  const headlineCell = headlineRow.children[0];
  if (headlineCell) {
    const captionWrp = document.createElement('div');
    captionWrp.classList.add('caption-wrp');
    const h2 = document.createElement('h2');
    moveInstrumentation(headlineRow, h2);
    // Headline is type=text, so use textContent.trim()
    h2.textContent = headlineCell.textContent.trim();
    captionWrp.append(h2);
    container1600Wrp.append(captionWrp);
  }

  // Banner Texts
  const bannerText1Cell = bannerText1Row.children[0];
  const bannerText2Cell = bannerText2Row.children[0];
  const bannerText3Cell = bannerText3Row.children[0];

  const bannerText = document.createElement('div');
  bannerText.classList.add('banner-text');

  if (bannerText1Cell) {
    const span1 = document.createElement('span');
    span1.style.display = 'block';
    span1.style.opacity = '0';
    moveInstrumentation(bannerText1Row, span1);
    span1.textContent = bannerText1Cell.textContent.trim();
    bannerText.append(span1);
  }

  if (bannerText2Cell) {
    const span2 = document.createElement('span');
    span2.style.display = 'block';
    span2.style.opacity = '1';
    moveInstrumentation(bannerText2Row, span2);
    span2.textContent = bannerText2Cell.textContent.trim();
    bannerText.append(span2);
  }

  if (bannerText3Cell) {
    const span3 = document.createElement('span');
    span3.style.display = 'block';
    span3.style.opacity = '0';
    moveInstrumentation(bannerText3Row, span3);
    span3.textContent = bannerText3Cell.textContent.trim();
    bannerText.append(span3);
  }
  container1600Wrp.append(bannerText);

  // Rotator Images
  const rotatorImage1Cell = rotatorImage1Row.children[0];
  const rotatorImage2Cell = rotatorImage2Row.children[0];
  const rotatorImage3Cell = rotatorImage3Row.children[0];

  const rotator = document.createElement('div');
  rotator.classList.add('rotator');
  const rotatorFigure = document.createElement('figure');

  if (rotatorImage1Cell) {
    const picture1 = rotatorImage1Cell.querySelector('picture');
    if (picture1) {
      const img = picture1.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      rotatorFigure.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('bg-cover');
      optimizedPic.querySelector('img').style.display = 'block';
      optimizedPic.querySelector('img').style.opacity = '0.7';
    }
  }

  if (rotatorImage2Cell) {
    const picture2 = rotatorImage2Cell.querySelector('picture');
    if (picture2) {
      const img = picture2.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      rotatorFigure.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('bg-cover');
      optimizedPic.querySelector('img').style.display = 'block';
      optimizedPic.querySelector('img').style.opacity = '1';
    }
  }

  if (rotatorImage3Cell) {
    const picture3 = rotatorImage3Cell.querySelector('picture');
    if (picture3) {
      const img = picture3.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      rotatorFigure.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('bg-cover');
      optimizedPic.querySelector('img').style.display = 'block';
      optimizedPic.querySelector('img').style.opacity = '0.7';
    }
  }
  rotator.append(rotatorFigure);
  bannerHld.append(rotator);

  const bannerOverlay = document.createElement('div');
  bannerOverlay.classList.add('banner-overlay');
  bannerHld.append(bannerOverlay);

  block.replaceChildren(pentionBnr);
}
