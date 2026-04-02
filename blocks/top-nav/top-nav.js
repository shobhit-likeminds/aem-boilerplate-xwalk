import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('container');

  // Use existing class names from original HTML for wrappers
  const phonesWrapper = document.createElement('div');
  // No specific wrapper class for phones in original HTML, append directly to container or use 'phone' if it's a wrapper
  // Based on original HTML, 'phone' is for individual items, not a wrapper.
  // Let's create a temporary wrapper if needed, but not add a class to it.
  // Re-evaluating: The original HTML has individual <div class="phone"> and <div class="care"> elements directly inside <div class="container">.
  // The social icons are wrapped in <div class="social-icons">.
  // So, we should append phones and cares directly to the main container, and social icons to their specific wrapper.

  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add('social-icons');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 1 && cells[0].querySelector('a')) {
      const link = cells[0].querySelector('a');
      if (link) { // Ensure link exists before checking href
        if (link.href.startsWith('tel:')) {
          const phoneDiv = document.createElement('div');
          moveInstrumentation(row, phoneDiv);
          phoneDiv.classList.add('phone'); // Class from original HTML
          phoneDiv.append(link);
          container.append(phoneDiv); // Append directly to container as per original HTML
        } else if (link.href.startsWith('mailto:')) {
          const careDiv = document.createElement('div');
          moveInstrumentation(row, careDiv);
          careDiv.classList.add('care'); // Class from original HTML
          careDiv.append(link);
          container.append(careDiv); // Append directly to container as per original HTML
        }
      }
    } else if (cells.length === 2 && cells[0].querySelector('a') && cells[1].querySelector('picture')) {
      // This is a social item
      const socialDiv = document.createElement('div');
      moveInstrumentation(row, socialDiv);
      socialDiv.classList.add('social'); // Class from original HTML

      const link = cells[0].querySelector('a');
      const picture = cells[1].querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;

      if (link) {
        const socialLink = document.createElement('a');
        socialLink.href = link.href;
        if (link.target) socialLink.target = link.target;
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
          optimizedPic.querySelector('img').classList.add('svg'); // Class from original HTML
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          socialLink.append(optimizedPic);
        }
        socialDiv.append(socialLink);
      }
      socialIconsWrapper.append(socialDiv);
    }
  });

  // Append socialIconsWrapper only if it has children, as per original logic
  if (socialIconsWrapper.hasChildNodes()) {
    container.append(socialIconsWrapper);
  }

  block.textContent = '';
  block.append(container);
}
