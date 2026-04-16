import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [dotImageRow, mainTextRow, scrollingTextRow] = [...block.children];

  block.textContent = '';
  block.classList.add('demerged-info'); // Add the block name as a class to the block itself

  // Dot Image
  const dotLeftDiv = document.createElement('div');
  dotLeftDiv.classList.add('dot-left');
  const picture = dotImageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      // Create optimized picture
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img')); // Move instrumentation from original img to new img
      dotLeftDiv.append(optimizedPic);
    }
  }
  moveInstrumentation(dotImageRow, dotLeftDiv); // Move instrumentation from the row to the new div
  block.append(dotLeftDiv);

  // Main content wrapper
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  // Main Text
  const demergedConDiv = document.createElement('div');
  demergedConDiv.classList.add('demerged-con', 'sp-para');
  if (mainTextRow) {
    moveInstrumentation(mainTextRow, demergedConDiv); // Move instrumentation from the row to the new div
    // The original HTML shows multiple lineParent/lineChild divs for the main text.
    // We will replicate this structure for the rich text content.
    const mainTextContent = mainTextRow.querySelector('div');
    if (mainTextContent) {
      // Split the text by lines to create lineParent/lineChild structure
      const lines = mainTextContent.textContent.split('\n').filter(line => line.trim() !== '');
      lines.forEach(line => {
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
        lineChild.textContent = line.trim();

        lineParent.append(lineChild);
        demergedConDiv.append(lineParent);
      });
    }
  }
  containerWrapper.append(demergedConDiv);

  // Scrolling Text
  const wowDiv = document.createElement('div');
  wowDiv.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');

  const scrollingParaDiv = document.createElement('div');
  scrollingParaDiv.classList.add('demerged-con', 'scrolling-para', 'wow', 'animate__animated', 'animate__fade', 'animated');
  if (scrollingTextRow) {
    moveInstrumentation(scrollingTextRow, scrollingParaDiv); // Move instrumentation from the row to the new div
    const scrollingTextContent = scrollingTextRow.querySelector('div');
    if (scrollingTextContent) {
      scrollingParaDiv.innerHTML = scrollingTextContent.innerHTML;
    }
  }
  wowDiv.append(scrollingParaDiv);
  containerWrapper.append(wowDiv);

  block.append(containerWrapper);
}
