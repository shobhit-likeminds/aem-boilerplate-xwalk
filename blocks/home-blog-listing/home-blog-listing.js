import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blogListingContainer = document.createElement('div');
  blogListingContainer.classList.add('home-blogListingCtn-KyX', 'gap-sm', 'grid');

  // Skip the first row which is just the container label
  const itemRows = [...block.children].slice(1);

  itemRows.forEach((row) => {
    const blogItemContainer = document.createElement('div');
    moveInstrumentation(row, blogItemContainer);
    blogItemContainer.classList.add('blogListingItem-blog_container-4j-', 'p-2xs');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('blogListingItem-blog_image_container-WOI');

    const contentContainer = document.createElement('div');

    // Destructure cells based on the BlockJson model:
    // [0] image, [1] image-alt, [2] title, [3] description, [4] link
    const cells = [...row.children];

    const imageCell = cells[0];
    const imageAltTextCell = cells[1];
    const titleCell = cells[2];
    const descriptionCell = cells[3];
    const linkCell = cells[4];

    let imageEl;
    let imageAltText = '';
    let titleEl;
    let descriptionEl;
    let linkEl;

    // Process image
    if (imageCell) {
      imageEl = imageCell.querySelector('picture');
    }

    // Process image alt text
    if (imageAltTextCell) {
      imageAltText = imageAltTextCell.textContent.trim();
    }

    // Process title
    if (titleCell) {
      titleEl = document.createElement('h2');
      titleEl.classList.add('blogListingItem-title-sQ9', 'py-2xs');
      moveInstrumentation(titleCell, titleEl);
      while (titleCell.firstChild) titleEl.append(titleCell.firstChild);
    }

    // Process description
    if (descriptionCell) {
      descriptionEl = document.createElement('div');
      descriptionEl.classList.add('blogListingItem-Description-vFn');
      moveInstrumentation(descriptionCell, descriptionEl);
      while (descriptionCell.firstChild) descriptionEl.append(descriptionCell.firstChild);
    }

    // Process link
    if (linkCell) {
      linkEl = linkCell.querySelector('a');
    }

    if (imageEl) {
      const img = imageEl.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, imageAltText || img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageContainer.append(optimizedPic);
    }

    blogItemContainer.append(imageContainer);

    if (titleEl) {
      contentContainer.append(titleEl);
    }
    if (descriptionEl) {
      contentContainer.append(descriptionEl);
    }
    if (linkEl) {
      const newLink = document.createElement('a');
      moveInstrumentation(linkEl, newLink);
      newLink.classList.add('blogListingItem-readStoryLink-gpk', 'grid');
      newLink.href = linkEl.href;
      while (linkEl.firstChild) newLink.append(linkEl.firstChild);
      contentContainer.append(newLink);
    }

    blogItemContainer.append(contentContainer);
    blogListingContainer.append(blogItemContainer);
  });

  block.textContent = '';
  block.append(blogListingContainer);
}
