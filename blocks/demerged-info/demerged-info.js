import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CRITICAL: Replaced direct index access block.children[n] with destructuring
  // This aligns with the BlockJson model which defines 3 root fields.
  const [imageRow, mainTextRow, scrollingTextRow] = [...block.children];

  block.textContent = '';
  // Class name 'demerged-info' is already present in ORIGINAL HTML and BlockJson
  block.classList.add('demerged-info');

  // Dot Left section
  const dotLeft = document.createElement('div');
  dotLeft.classList.add('dot-left'); // Class 'dot-left' is from ORIGINAL HTML
  const imageCell = imageRow.firstElementChild;
  const picture = imageCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    dotLeft.appendChild(optimizedPic);
  }
  moveInstrumentation(imageRow, dotLeft);
  block.append(dotLeft);

  // Container wrapper
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp'); // Class 'container-1600-wrp' is from ORIGINAL HTML

  // Main Text section
  const mainTextCell = mainTextRow.firstElementChild;
  if (mainTextCell) {
    const demergedCon = document.createElement('div');
    // Classes 'demerged-con', 'sp-para' are from ORIGINAL HTML
    demergedCon.classList.add('demerged-con', 'sp-para');
    moveInstrumentation(mainTextRow, demergedCon);

    // Replicate lineParent/lineChild structure for main text
    const paragraphs = mainTextCell.querySelectorAll('p');
    paragraphs.forEach(p => {
      const lineParent = document.createElement('div');
      // Class 'lineParent' is from ORIGINAL HTML
      lineParent.classList.add('lineParent');
      lineParent.setAttribute('aria-hidden', 'true');
      lineParent.style.position = 'relative';
      lineParent.style.display = 'block';
      lineParent.style.textAlign = 'center';

      const lineChild = document.createElement('div');
      // Class 'lineChild' is from ORIGINAL HTML
      lineChild.classList.add('lineChild');
      lineChild.setAttribute('aria-hidden', 'true');
      lineChild.style.position = 'relative';
      lineChild.style.display = 'block';
      lineChild.style.textAlign = 'center';
      lineChild.textContent = p.textContent.trim(); // Use textContent from authored paragraph

      lineParent.appendChild(lineChild);
      demergedCon.appendChild(lineParent);
    });

    containerWrapper.append(demergedCon);
  }

  // Scrolling Text section
  const scrollingTextCell = scrollingTextRow.firstElementChild;
  if (scrollingTextCell) {
    const wowDiv = document.createElement('div');
    // Classes 'wow', 'animate__', 'animate__fadeInUp', 'animated' are from ORIGINAL HTML
    wowDiv.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
    wowDiv.style.visibility = 'visible';
    wowDiv.style.animationName = 'fadeInUp';

    const scrollingPara = document.createElement('div');
    // Classes 'demerged-con', 'scrolling-para', 'wow', 'animate__animated', 'animate__fade', 'animated' are from ORIGINAL HTML
    scrollingPara.classList.add('demerged-con', 'scrolling-para', 'wow', 'animate__animated', 'animate__fade', 'animated');
    scrollingPara.style.visibility = 'visible';
    scrollingPara.style.animationName = 'float';
    scrollingPara.innerHTML = scrollingTextCell.innerHTML; // Use innerHTML for richtext
    moveInstrumentation(scrollingTextRow, scrollingPara);
    wowDiv.append(scrollingPara);
    containerWrapper.append(wowDiv);
  }

  block.append(containerWrapper);
}
