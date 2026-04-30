import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
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

  // Anim BG
  const animBg = document.createElement('div');
  animBg.classList.add('anim-bg');
  const animBgFigure = document.createElement('figure');
  const backgroundImage = backgroundImageRow.children[0]?.querySelector('picture');
  if (backgroundImage) {
    const img = backgroundImage.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
    optimizedPic.querySelector('img').classList.add('bg-cover');
    moveInstrumentation(img.closest('picture'), optimizedPic.querySelector('img'));
    animBgFigure.append(optimizedPic);
  }
  moveInstrumentation(backgroundImageRow, animBgFigure);
  animBg.append(animBgFigure);
  bannerHld.append(animBg);

  const container1600Wrp = document.createElement('div');
  container1600Wrp.classList.add('container-1600-wrp');

  // Caption Wrapper
  const captionWrp = document.createElement('div');
  captionWrp.classList.add('caption-wrp');
  const headline = document.createElement('h2');
  moveInstrumentation(headlineRow, headline);
  // Use innerHTML from the cell to preserve <br/> or other rich text in headline
  headline.innerHTML = headlineRow.children[0]?.innerHTML || '';
  captionWrp.append(headline);
  container1600Wrp.append(captionWrp);

  // Banner Text
  const bannerText = document.createElement('div');
  bannerText.classList.add('banner-text');

  const bannerText1Span = document.createElement('span');
  moveInstrumentation(bannerText1Row, bannerText1Span);
  bannerText1Span.textContent = bannerText1Row.children[0]?.textContent.trim() || '';
  bannerText1Span.style.display = 'block';
  bannerText1Span.style.opacity = '0';
  bannerText.append(bannerText1Span);

  const bannerText2Span = document.createElement('span');
  moveInstrumentation(bannerText2Row, bannerText2Span);
  bannerText2Span.textContent = bannerText2Row.children[0]?.textContent.trim() || '';
  bannerText2Span.style.display = 'block';
  bannerText2Span.style.opacity = '1';
  bannerText.append(bannerText2Span);

  const bannerText3Span = document.createElement('span');
  moveInstrumentation(bannerText3Row, bannerText3Span);
  bannerText3Span.textContent = bannerText3Row.children[0]?.textContent.trim() || '';
  bannerText3Span.style.display = 'block';
  bannerText3Span.style.opacity = '0';
  bannerText.append(bannerText3Span);

  container1600Wrp.append(bannerText);
  bannerHld.append(container1600Wrp);

  // Rotator
  const rotator = document.createElement('div');
  rotator.classList.add('rotator');
  const rotatorFigure = document.createElement('figure');

  const rotatorImages = [rotatorImage1Row, rotatorImage2Row, rotatorImage3Row];
  rotatorImages.forEach((row, index) => {
    const picture = row.children[0]?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      const rotatorImg = optimizedPic.querySelector('img');
      rotatorImg.classList.add('bg-cover');
      rotatorImg.style.display = 'block';
      rotatorImg.style.opacity = index === 1 ? '1' : '0.7'; // Set opacity for rotator images
      moveInstrumentation(img.closest('picture'), rotatorImg);
      rotatorFigure.append(optimizedPic);
    }
  });
  rotator.append(rotatorFigure);
  bannerHld.append(rotator);

  // Banner Overlay
  const bannerOverlay = document.createElement('div');
  bannerOverlay.classList.add('banner-overlay');
  bannerHld.append(bannerOverlay);

  pentionBnr.append(bannerHld);

  block.replaceChildren(pentionBnr);
}
