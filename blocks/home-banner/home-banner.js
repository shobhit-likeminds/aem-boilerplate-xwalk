import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructuring block.children is fine as long as the number of rows is fixed and known,
  // and each row contains only one cell relevant to its field.
  // The EDS BLOCK STRUCTURE and BLOCK JSON confirm 8 distinct fields, each mapping to a row.
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

  block.textContent = '';

  const pentionBnr = document.createElement('div');
  pentionBnr.classList.add('pention_bnr');

  const bannerHld = document.createElement('div');
  bannerHld.classList.add('banner-hld');

  // Background Image
  const animBg = document.createElement('div');
  animBg.classList.add('anim-bg');
  const bgFigure = document.createElement('figure');
  // Access the cell within the row using content detection
  const bgPictureCell = [...backgroundImageRow.children].find(cell => cell.querySelector('picture'));
  const bgPicture = bgPictureCell ? bgPictureCell.querySelector('picture') : null;

  if (bgPicture) {
    const img = bgPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
      optimizedPic.querySelector('img').classList.add('bg-cover');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      bgFigure.append(optimizedPic);
    }
  }
  moveInstrumentation(backgroundImageRow, bgFigure);
  animBg.append(bgFigure);
  bannerHld.append(animBg);

  const containerWrp = document.createElement('div');
  containerWrp.classList.add('container-1600-wrp');

  // Heading
  const captionWrp = document.createElement('div');
  captionWrp.classList.add('caption-wrp');
  const h2 = document.createElement('h2');
  // Access the cell within the row using content detection
  const headingCell = [...headingRow.children].find(cell => cell.textContent.trim());
  moveInstrumentation(headingRow, h2);
  h2.innerHTML = headingCell ? headingCell.textContent.trim() : '';
  captionWrp.append(h2);
  containerWrp.append(captionWrp);

  // Banner Text
  const bannerText = document.createElement('div');
  bannerText.classList.add('banner-text');

  const span1 = document.createElement('span');
  // Access the cell within the row using content detection
  const bannerText1Cell = [...bannerText1Row.children].find(cell => cell.textContent.trim());
  moveInstrumentation(bannerText1Row, span1);
  span1.textContent = bannerText1Cell ? bannerText1Cell.textContent.trim() : '';
  span1.style.display = 'block'; // Apply inline style as per original HTML
  bannerText.append(span1);

  const span2 = document.createElement('span');
  // Access the cell within the row using content detection
  const bannerText2Cell = [...bannerText2Row.children].find(cell => cell.textContent.trim());
  moveInstrumentation(bannerText2Row, span2);
  span2.textContent = bannerText2Cell ? bannerText2Cell.textContent.trim() : '';
  span2.style.display = 'block'; // Apply inline style as per original HTML
  bannerText.append(span2);

  const span3 = document.createElement('span');
  // Access the cell within the row using content detection
  const bannerText3Cell = [...bannerText3Row.children].find(cell => cell.textContent.trim());
  moveInstrumentation(bannerText3Row, span3);
  span3.textContent = bannerText3Cell ? bannerText3Cell.textContent.trim() : '';
  span3.style.display = 'block'; // Apply inline style as per original HTML
  bannerText.append(span3);

  containerWrp.append(bannerText);
  bannerHld.append(containerWrp);

  // Rotator Images
  const rotator = document.createElement('div');
  rotator.classList.add('rotator');
  const rotatorFigure = document.createElement('figure');

  [rotatorImage1Row, rotatorImage2Row, rotatorImage3Row].forEach((row) => {
    // Access the cell within the row using content detection
    const pictureCell = [...row.children].find(cell => cell.querySelector('picture'));
    const picture = pictureCell ? pictureCell.querySelector('picture') : null;
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1920' }]);
        optimizedPic.querySelector('img').classList.add('bg-cover');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        rotatorFigure.append(optimizedPic);
      }
    }
    moveInstrumentation(row, rotatorFigure);
  });
  rotator.append(rotatorFigure);
  bannerHld.append(rotator);

  const bannerOverlay = document.createElement('div');
  bannerOverlay.classList.add('banner-overlay');
  bannerHld.append(bannerOverlay);

  pentionBnr.append(bannerHld);
  block.append(pentionBnr);
}
