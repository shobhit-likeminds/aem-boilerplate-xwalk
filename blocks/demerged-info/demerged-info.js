import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Use destructuring for direct access to rows based on the model
  const [imageRow, mainTextRow, scrollingTextRow] = [...block.children];

  // Clear the block to rebuild
  block.innerHTML = '';
  block.classList.add('demerged-info');

  // Dot-left section
  const dotLeftDiv = document.createElement('div');
  dotLeftDiv.classList.add('dot-left');
  // Access the first (and only) cell in the imageRow
  const imageCell = imageRow.firstElementChild;
  const picture = imageCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      dotLeftDiv.append(optimizedPic);
    }
  }
  moveInstrumentation(imageRow, dotLeftDiv);
  block.append(dotLeftDiv);

  // Container-1600-wrp
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  // Main Text
  // Access the first (and only) cell in the mainTextRow
  const mainTextCell = mainTextRow.firstElementChild;
  if (mainTextCell) {
    const demergedCon = document.createElement('div');
    demergedCon.classList.add('demerged-con', 'sp-para');
    // The aria-label should be derived from the entire text content of the cell
    demergedCon.setAttribute('aria-label', mainTextCell.textContent.trim());

    // Replicate lineParent/lineChild structure for main text
    // The original HTML shows each logical line wrapped in its own lineParent/lineChild.
    // Since the block model gives rich text, we should preserve the HTML structure
    // from the cell's innerHTML if it already contains lineParent/lineChild,
    // or wrap each paragraph if it's just plain paragraphs.
    // Based on the original HTML, the content is already structured with lineParent/lineChild.
    // So, we can directly use innerHTML here.
    demergedCon.innerHTML = mainTextCell.innerHTML;
    
    moveInstrumentation(mainTextRow, demergedCon);
    containerWrapper.append(demergedCon);
  }

  // Scrolling Text
  // Access the first (and only) cell in the scrollingTextRow
  const scrollingTextCell = scrollingTextRow.firstElementChild;
  if (scrollingTextCell) {
    const wowDiv = document.createElement('div');
    wowDiv.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
    wowDiv.style.visibility = 'visible';
    wowDiv.style.animationName = 'fadeInUp';

    const scrollingPara = document.createElement('div');
    scrollingPara.classList.add('demerged-con', 'scrolling-para', 'wow', 'animate__animated', 'animate__fade', 'animated');
    scrollingPara.style.visibility = 'visible';
    scrollingPara.style.animationName = 'float';
    scrollingPara.innerHTML = scrollingTextCell.innerHTML; // Use innerHTML for rich text

    wowDiv.append(scrollingPara);
    moveInstrumentation(scrollingTextRow, wowDiv);
    containerWrapper.append(wowDiv);
  }

  block.append(containerWrapper);
}
