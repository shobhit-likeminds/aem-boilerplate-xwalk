import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [dotImageRow, mainDescriptionRow, scrollingMessageRow] = [...block.children];

  const section = document.createElement('section');
  // section.classList.add('demerged-info'); // Removed: block already has this class from AEM

  // Dot Image
  const dotLeftDiv = document.createElement('div');
  dotLeftDiv.classList.add('dot-left');
  const dotImagePicture = dotImageRow.querySelector('picture');
  if (dotImagePicture) {
    const img = dotImagePicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '267' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      dotImagePicture.replaceWith(optimizedPic);
      dotLeftDiv.append(optimizedPic);
    }
  }
  moveInstrumentation(dotImageRow, dotLeftDiv);
  section.append(dotLeftDiv);

  const containerWrp = document.createElement('div');
  containerWrp.classList.add('container-1600-wrp');

  // Main Description
  const demergedConDiv = document.createElement('div');
  demergedConDiv.classList.add('demerged-con', 'sp-para');
  if (mainDescriptionRow) {
    // mainDescription is a richtext field, so its content is directly inside the cell div.
    // querySelector('div') would return null if the content is just <p>text</p>
    // We need to read the innerHTML of the cell itself.
    const mainDescriptionCell = mainDescriptionRow.children[0]; // Access the cell directly
    if (mainDescriptionCell) {
      demergedConDiv.innerHTML = mainDescriptionCell.innerHTML; // Use innerHTML for richtext
      moveInstrumentation(mainDescriptionRow, demergedConDiv);

      // The original HTML shows lineParent/lineChild divs wrapping the text,
      // but the generated JS was trying to re-split paragraphs into lines.
      // Instead, we should preserve the original paragraph structure and apply classes.
      // The lineParent/lineChild structure is likely for animation, which should be
      // handled by CSS/JS frameworks, not by re-parsing text content.
      // For now, we'll just ensure the paragraphs are moved correctly.
      // If the original HTML had lineParent/lineChild, they would be part of mainDescriptionCell.innerHTML.
      // The current generated JS was removing original paragraphs and creating new lineParent/lineChild.
      // We should append the actual content from the cell.
      // If the original HTML had specific lineParent/lineChild structure, it should be preserved.
      // Since the BlockJson says 'richtext', we should just move the content as is.
      // The original HTML example shows the lineParent/lineChild structure already present.
      // So, the innerHTML assignment above should bring it over.
      // The subsequent paragraph processing and removal is incorrect if the structure is already there.
      // Removing the manual line splitting logic.
    }
  }
  containerWrp.append(demergedConDiv);

  // Scrolling Message
  const wowDiv = document.createElement('div');
  wowDiv.classList.add('wow', 'animate__', 'animate__fadeInUp', 'animated');
  wowDiv.style.visibility = 'visible';
  wowDiv.style.animationName = 'fadeInUp';

  const scrollingPara = document.createElement('div');
  scrollingPara.classList.add('demerged-con', 'scrolling-para', 'wow', 'animate__animated', 'animate__fade', 'animated');
  scrollingPara.style.visibility = 'visible';
  scrollingPara.style.animationName = 'float';
  if (scrollingMessageRow) {
    // scrollingMessage is a text field, its content is directly inside the cell div.
    // querySelector('div') would return null if the content is just plain text.
    // We need to read the textContent of the cell itself.
    const scrollingMessageCell = scrollingMessageRow.children[0]; // Access the cell directly
    if (scrollingMessageCell) {
      scrollingPara.textContent = scrollingMessageCell.textContent.trim(); // Use textContent for plain text
      moveInstrumentation(scrollingMessageRow, scrollingPara);
    }
  }
  wowDiv.append(scrollingPara);
  containerWrp.append(wowDiv);

  section.append(containerWrp);
  block.replaceChildren(section);
}
