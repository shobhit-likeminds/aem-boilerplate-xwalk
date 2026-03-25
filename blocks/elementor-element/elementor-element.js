import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [imageRow] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('e-con-inner');

  const imageWidget = document.createElement('div');
  imageWidget.classList.add('elementor-element', 'elementor-element-7794d2b', 'elementor-widget', 'elementor-widget-image');
  moveInstrumentation(imageRow, imageWidget);

  const imageCell = imageRow.firstElementChild;
  const picture = imageCell.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '2300' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      // Replace the original picture with the optimized one
      picture.replaceWith(optimizedPic);
      // Add classes to the img inside the optimized picture
      optimizedPic.querySelector('img').classList.add('attachment-full', 'size-full', 'wp-image-68');
      imageWidget.append(optimizedPic); // Append the optimized picture itself
    } else {
      // If there's a picture element but no img inside, append the picture as is
      imageWidget.append(picture);
    }
  } else {
    // If no picture, just append the cell content
    while (imageCell.firstChild) {
      imageWidget.append(imageCell.firstChild);
    }
  }

  container.append(imageWidget);

  block.textContent = '';
  block.classList.add('elementor-element', 'elementor-element-22eec36', 'e-flex', 'e-con-boxed', 'e-con', 'e-parent', 'e-lazyloaded');
  block.append(container);
}
