import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('home-blogListingCtn-KyX', 'gap-sm', 'grid');

  [...block.children].forEach((row) => {
    moveInstrumentation(row, row);
    row.classList.add('blogListingItem-blog_container-4j-', 'p-2xs');

    const imageCell = row.querySelector('picture')?.closest('div');
    const altTextCell = imageCell?.nextElementSibling;
    const titleCell = altTextCell?.nextElementSibling;
    const descriptionCell = titleCell?.nextElementSibling;
    const linkCell = descriptionCell?.nextElementSibling;

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('blogListingItem-blog_image_container-WOI');
    if (imageCell) {
      moveInstrumentation(imageCell, imageContainer);
      while (imageCell.firstChild) {
        imageContainer.append(imageCell.firstChild);
      }
      imageCell.remove();
    }

    const contentDiv = document.createElement('div');

    const titleElement = document.createElement('h2');
    titleElement.classList.add('blogListingItem-title-sQ9', 'py-2xs');
    if (titleCell) {
      moveInstrumentation(titleCell, titleElement);
      while (titleCell.firstChild) {
        titleElement.append(titleCell.firstChild);
      }
      titleCell.remove();
    }

    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('blogListingItem-Description-vFn');
    if (descriptionCell) {
      moveInstrumentation(descriptionCell, descriptionElement);
      while (descriptionCell.firstChild) {
        descriptionElement.append(descriptionCell.firstChild);
      }
      descriptionCell.remove();
    }

    const readStoryLink = document.createElement('a');
    readStoryLink.classList.add('blogListingItem-readStoryLink-gpk', 'grid');
    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        readStoryLink.href = foundLink.href;
        moveInstrumentation(linkCell, readStoryLink);
        while (linkCell.firstChild) {
          readStoryLink.append(linkCell.firstChild);
        }
      }
      linkCell.remove();
    }

    // Remove the alt text cell as it's not explicitly rendered in the original HTML structure
    if (altTextCell) {
      altTextCell.remove();
    }

    contentDiv.append(titleElement, descriptionElement, readStoryLink);
    row.prepend(imageContainer);
    row.append(contentDiv);
  });

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
