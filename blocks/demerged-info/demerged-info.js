import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [dotImageRow, mainDescriptionRow, scrollingDescriptionRow] = [...block.children];

  const root = document.createElement('section');
  root.classList.add('demerged-info'); // Add block's own class to the root element

  // Dot Image
  const dotLeft = document.createElement('div');
  dotLeft.classList.add('dot-left');
  const dotImagePicture = dotImageRow?.querySelector('picture');
  if (dotImagePicture) {
    const img = dotImagePicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
    moveInstrumentation(dotImagePicture, optimizedPic.querySelector('img'));
    dotLeft.append(optimizedPic);
  }
  moveInstrumentation(dotImageRow, dotLeft);
  root.append(dotLeft);

  // Container for descriptions
  const containerWrapper = document.createElement('div');
  containerWrapper.classList.add('container-1600-wrp');

  // Main Description
  const demergedConMain = document.createElement('div');
  demergedConMain.classList.add('demerged-con', 'sp-para');
  if (mainDescriptionRow) {
    moveInstrumentation(mainDescriptionRow, demergedConMain);
    // Create a temporary div to hold the innerHTML and process it
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = mainDescriptionRow.querySelector('div')?.innerHTML || '';

    // The original HTML has nested lineParent/lineChild divs for animation.
    // We need to recreate this structure and move the content.
    const paragraphs = tempDiv.querySelectorAll('p');
    if (paragraphs.length > 0) {
      paragraphs.forEach((p) => {
        const textContent = p.textContent.trim();
        textContent.split('\n').forEach((line) => {
          if (line.trim()) {
            const lineParent = document.createElement('div');
            lineParent.classList.add('lineParent');
            lineParent.setAttribute('aria-hidden', 'true');
            lineParent.style.cssText = 'position: relative; display: block; text-align: center;';

            const lineChild = document.createElement('div');
            lineChild.classList.add('lineChild');
            lineChild.setAttribute('aria-hidden', 'true');
            lineChild.style.cssText = 'position: relative; display: block; text-align: center; translate: none; rotate: none; scale: none; transform: translate(0px, 0px); opacity: 1;';
            lineChild.textContent = line.trim();

            lineParent.append(lineChild);
            demergedConMain.append(lineParent);
          }
        });
      });
    } else {
      // If no paragraphs, just move the raw content
      while (tempDiv.firstChild) {
        demergedConMain.append(tempDiv.firstChild);
      }
    }
  }
  containerWrapper.append(demergedConMain);

  // Scrolling Description
  const wowDiv = document.createElement('div');
  wowDiv.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  // Do not set visibility or animationName here; these are handled by the animation library
  // wowDiv.style.visibility = 'visible';
  // wowDiv.style.animationName = 'fadeInUp';

  const scrollingPara = document.createElement('div');
  scrollingPara.classList.add('demerged-con', 'scrolling-para', 'wow', 'animate__animated', 'animate__fade', 'animated');
  // Do not set visibility or animationName here; these are handled by the animation library
  // scrollingPara.style.visibility = 'visible';
  // scrollingPara.style.animationName = 'float';
  if (scrollingDescriptionRow) {
    moveInstrumentation(scrollingDescriptionRow, scrollingPara);
    // Move all children from the cell to the scrollingPara div
    const cellContent = scrollingDescriptionRow.querySelector('div');
    if (cellContent) {
      while (cellContent.firstChild) {
        scrollingPara.append(cellContent.firstChild);
      }
    }
  }
  wowDiv.append(scrollingPara);
  containerWrapper.append(wowDiv);

  root.append(containerWrapper);

  block.replaceChildren(root);
}
