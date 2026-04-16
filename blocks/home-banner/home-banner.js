import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children to get individual rows
  const [
    backgroundImageRow,
    headingRow,
    bannerText1Row,
    bannerText2Row,
    bannerText3Row,
    rotatorImage1Row,
    rotatorImage2Row,
    rotatorImage3Row,
  ] = [...block.children];

  // Main container
  const pentionBnr = document.createElement('div');
  pentionBnr.classList.add('pention_bnr');

  const bannerHld = document.createElement('div');
  bannerHld.classList.add('banner-hld');

  // Background Image
  const animBg = document.createElement('div');
  animBg.classList.add('anim-bg');
  const bgFigure = document.createElement('figure');

  // Access the cell within backgroundImageRow
  const backgroundImageCell = [...backgroundImageRow.children][0];
  const bgPicture = backgroundImageCell.querySelector('picture');
  if (bgPicture) {
    const img = bgPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    optimizedPic.querySelector('img').classList.add('bg-cover');
    bgFigure.append(optimizedPic);
  }
  moveInstrumentation(backgroundImageRow, bgFigure);
  animBg.append(bgFigure);
  bannerHld.append(animBg);

  // Caption and Banner Text
  const container1600Wrp = document.createElement('div');
  container1600Wrp.classList.add('container-1600-wrp');

  const captionWrp = document.createElement('div');
  captionWrp.classList.add('caption-wrp');
  const heading = document.createElement('h2');
  // Access the cell within headingRow
  const headingCell = [...headingRow.children][0];
  moveInstrumentation(headingRow, heading);
  heading.innerHTML = headingCell.textContent.trim();
  captionWrp.append(heading);
  container1600Wrp.append(captionWrp);

  const bannerText = document.createElement('div');
  bannerText.classList.add('banner-text');

  const bannerText1Span = document.createElement('span');
  // Access the cell within bannerText1Row
  const bannerText1Cell = [...bannerText1Row.children][0];
  moveInstrumentation(bannerText1Row, bannerText1Span);
  bannerText1Span.textContent = bannerText1Cell.textContent.trim();
  bannerText1Span.style.display = 'block';
  bannerText1Span.style.opacity = '1';
  bannerText.append(bannerText1Span);

  const bannerText2Span = document.createElement('span');
  // Access the cell within bannerText2Row
  const bannerText2Cell = [...bannerText2Row.children][0];
  moveInstrumentation(bannerText2Row, bannerText2Span);
  bannerText2Span.textContent = bannerText2Cell.textContent.trim();
  bannerText2Span.style.display = 'block';
  bannerText2Span.style.opacity = '0';
  bannerText.append(bannerText2Span);

  const bannerText3Span = document.createElement('span');
  // Access the cell within bannerText3Row
  const bannerText3Cell = [...bannerText3Row.children][0];
  moveInstrumentation(bannerText3Row, bannerText3Span);
  bannerText3Span.textContent = bannerText3Cell.textContent.trim();
  bannerText3Span.style.display = 'block';
  bannerText3Span.style.opacity = '0';
  bannerText.append(bannerText3Span);

  container1600Wrp.append(bannerText);
  bannerHld.append(container1600Wrp);

  // Rotator Images
  const rotator = document.createElement('div');
  rotator.classList.add('rotator');
  const rotatorFigure = document.createElement('figure');

  const rotatorImages = [rotatorImage1Row, rotatorImage2Row, rotatorImage3Row];
  rotatorImages.forEach((row, index) => {
    // Access the cell within each rotator image row
    const rotatorImageCell = [...row.children][0];
    const picture = rotatorImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('bg-cover');
      optimizedPic.querySelector('img').style.display = 'block';
      optimizedPic.querySelector('img').style.opacity = index === 0 ? '1' : '0.7'; // First image visible, others semi-transparent
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

  block.textContent = '';
  block.append(pentionBnr);
}
