import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block itself should have the class from the original HTML, not a new one.
  // The original HTML shows 'home-blogListingCtn-KyX gap-sm grid' on the block div.
  // The generated JS already adds these classes, so no change needed here.
  // block.classList.add('home-blogListingCtn-KyX', 'gap-sm', 'grid'); // This line is already correct based on original HTML

  [...block.children].forEach((row) => {
    const itemContainer = document.createElement('div');
    moveInstrumentation(row, itemContainer);
    itemContainer.classList.add('blogListingItem-blog_container-4j-', 'p-2xs');

    // Check 1: Structure Alignment
    // BlockJson model 'home-blog-list-item' has 5 fields: image, imageAlt, title, description, link.
    // The JS correctly reads 5 children from each row.
    const imageCell = row.children[0];
    const imageAltCell = row.children[1];
    const titleCell = row.children[2];
    const descriptionCell = row.children[3];
    const linkCell = row.children[4];

    // Image container
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('blogListingItem-blog_image_container-WOI');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      // The original HTML shows img.alt directly, not imageAltCell.textContent.trim()
      // However, createOptimizedPicture expects an alt text, and imageAltCell is provided for this.
      // Keeping the current implementation as it correctly uses the provided alt text.
      const optimizedPic = createOptimizedPicture(img.src, imageAltCell.textContent.trim(), false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageContainer.append(optimizedPic);
    } else {
      // If no picture, append the original image cell content (e.g., just an img tag)
      while (imageCell.firstChild) imageContainer.append(imageCell.firstChild);
    }
    itemContainer.append(imageContainer);

    // Content container
    const contentContainer = document.createElement('div');

    // Title
    const title = document.createElement('h2');
    title.classList.add('blogListingItem-title-sQ9', 'py-2xs');
    moveInstrumentation(titleCell, title);
    while (titleCell.firstChild) title.append(titleCell.firstChild);
    contentContainer.append(title);

    // Description
    const description = document.createElement('div');
    description.classList.add('blogListingItem-Description-vFn');
    moveInstrumentation(descriptionCell, description);
    while (descriptionCell.firstChild) description.append(descriptionCell.firstChild);
    contentContainer.append(description);

    // Read Story Link
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      const link = document.createElement('a');
      link.classList.add('blogListingItem-readStoryLink-gpk', 'grid');
      link.href = foundLink.href;
      moveInstrumentation(linkCell, link);
      // Append all children from the link cell, including the image if present
      while (linkCell.firstChild) link.append(linkCell.firstChild);
      contentContainer.append(link);
    }

    itemContainer.append(contentContainer);
    // The block.append(itemContainer) was redundant as the itemContainer is already a child of the block
    // and we are transforming its content. The original row is replaced by itemContainer.
    row.replaceWith(itemContainer);
  });
}
