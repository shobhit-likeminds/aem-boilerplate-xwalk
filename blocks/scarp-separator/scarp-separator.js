import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const scarpSeparatorComponent = document.createElement('div');
  scarpSeparatorComponent.classList.add('scarp-separator-component', 'fade-in');
  scarpSeparatorComponent.setAttribute('data-fade-in', '');

  const scarpSeparatorContainer = document.createElement('div');
  scarpSeparatorContainer.classList.add('scarp-separator_container');

  // block.children[0] corresponds to the 'image' field
  const [imageRow] = [...block.children];

  // The 'image' field is a reference, so it contains a div with a picture element
  const pictureElement = imageRow.querySelector('picture');
  if (pictureElement) {
    const img = pictureElement.querySelector('img');
    if (img) {
      // Create an optimized picture and extract the img element
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '2000' }]);
      const optimizedImg = optimizedPic.querySelector('img');

      // Add the correct CSS classes and attributes from the original HTML
      optimizedImg.classList.add('scarp-separator__scarp', 'green-scarp');
      optimizedImg.setAttribute('aria-hidden', 'true');

      // Move instrumentation if necessary (assuming moveInstrumentation handles img elements)
      moveInstrumentation(img, optimizedImg);

      // Append the optimized image to the container
      scarpSeparatorContainer.append(optimizedImg);
    }
  }

  scarpSeparatorComponent.append(scarpSeparatorContainer);

  block.textContent = '';
  block.append(scarpSeparatorComponent);
}
