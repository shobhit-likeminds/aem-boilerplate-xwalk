import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children based on the BlockJson model
  // block.children[0] is the image row
  // block.children[1] is the link row
  // block.children[2] is the linkLabel row
  const [imageRow, linkRow, linkLabelRow] = [...block.children];

  // Use content detection for cells within each row
  const imageCell = [...imageRow.children].find(cell => cell.querySelector('picture'));
  const linkCell = [...linkRow.children].find(cell => cell.querySelector('a'));
  const linkLabelCell = [...linkLabelRow.children].find(cell => cell.textContent.trim());

  const backToTopLink = document.createElement('a');
  backToTopLink.id = 'backtop'; // Copied from ORIGINAL HTML
  backToTopLink.href = 'javascript:;'; // Original HTML uses javascript:;
  backToTopLink.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Get the original link from the AEM content field
  const originalLink = linkCell?.querySelector('a');
  if (originalLink) {
    // Although the original HTML uses 'javascript:;', if the AEM content field
    // provides a real link, we should use it. Otherwise, keep the 'javascript:;'
    backToTopLink.href = originalLink.href;
    // Move instrumentation from the link cell to the new anchor
    moveInstrumentation(linkCell, backToTopLink);
  }

  // Get the image from the image field
  const picture = imageCell?.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      // Create optimized picture, if it's not an SVG, otherwise just append the img
      if (img.src.endsWith('.svg') || img.src.endsWith('.svg+xml')) {
        const clonedImg = img.cloneNode(true);
        moveInstrumentation(img, clonedImg);
        backToTopLink.append(clonedImg);
      } else {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        backToTopLink.append(optimizedPic);
      }
    }
  }

  // Set the link label as text content if available
  if (linkLabelCell && linkLabelCell.textContent.trim()) {
    backToTopLink.textContent = linkLabelCell.textContent.trim();
  }

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(backToTopLink);
}
