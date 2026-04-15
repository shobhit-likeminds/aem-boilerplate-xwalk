import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [dotsImageRow, mainTextRow, scrollingTextRow] = [...block.children];

  // Dots Image
  const dotLeftDiv = document.createElement('div');
  dotLeftDiv.classList.add('dot-left');
  const picture = dotsImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      dotLeftDiv.append(optimizedPic);
    }
  }
  moveInstrumentation(dotsImageRow, dotLeftDiv);

  // Main content wrapper
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  // Main Text
  const demergedConDiv = document.createElement('div');
  demergedConDiv.classList.add('demerged-con', 'sp-para');
  if (mainTextRow) {
    // Use content detection for richtext cell
    const mainTextCell = [...mainTextRow.children].find(cell => cell.innerHTML.trim() !== '');
    if (mainTextCell) {
      moveInstrumentation(mainTextRow, demergedConDiv);
      // The original HTML has nested divs for animation, replicate this structure
      const pElements = mainTextCell.querySelectorAll('p');
      pElements.forEach((p) => {
        const lineParent = document.createElement('div');
        lineParent.classList.add('lineParent');
        lineParent.setAttribute('aria-hidden', 'true');
        lineParent.style.position = 'relative';
        lineParent.style.display = 'block';
        lineParent.style.textAlign = 'center';

        const lineChild = document.createElement('div');
        lineChild.classList.add('lineChild');
        lineChild.setAttribute('aria-hidden', 'true');
        lineChild.style.position = 'relative';
        lineChild.style.display = 'block';
        lineChild.style.textAlign = 'center';
        lineChild.style.transform = 'translate(0px, 0px)';
        lineChild.style.opacity = '1';
        lineChild.textContent = p.textContent.trim();

        lineParent.append(lineChild);
        demergedConDiv.append(lineParent);
      });
    }
  }

  // Scrolling Text
  const wowDiv = document.createElement('div');
  wowDiv.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  wowDiv.style.visibility = 'visible';
  wowDiv.style.animationName = 'fadeInUp';

  const scrollingPara = document.createElement('div');
  scrollingPara.classList.add('demerged-con', 'scrolling-para', 'wow', 'animate__animated', 'animate__fade', 'animated');
  scrollingPara.style.visibility = 'visible';
  scrollingPara.style.animationName = 'float';
  if (scrollingTextRow) {
    // Use content detection for richtext cell
    const scrollingTextCell = [...scrollingTextRow.children].find(cell => cell.innerHTML.trim() !== '');
    if (scrollingTextCell) {
      moveInstrumentation(scrollingTextRow, scrollingPara);
      scrollingPara.innerHTML = scrollingTextCell.innerHTML;
    }
  }
  wowDiv.append(scrollingPara);

  containerWrapper.append(demergedConDiv, wowDiv);

  block.textContent = '';
  block.append(dotLeftDiv, containerWrapper);
}
