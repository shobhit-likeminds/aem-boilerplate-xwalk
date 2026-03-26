import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const blogPostItemList = document.createElement('div');
  blogPostItemList.classList.add('blogListing-blogpostItemList-9Yy');

  [...block.children].forEach((row) => {
    const blogPostItem = document.createElement('div');
    moveInstrumentation(row, blogPostItem);
    blogPostItem.classList.add('blogListing-blogpostItem-4Ib');

    const col1 = document.createElement('div');
    col1.classList.add('blogListing-blogpostItemCol1-Y2n');
    const col2 = document.createElement('div');
    col2.classList.add('blogListing-blogpostItemCol2-xmk');

    // BlockJson for 'blog-post-item' shows no specific fields.
    // The original HTML structure implies an image in the first cell,
    // followed by other content in subsequent cells.
    // We'll treat the first cell with a picture as the image for col1,
    // and all other content (from all cells) will go into col2.

    let imageProcessed = false;

    [...row.children].forEach((cell) => {
      if (!imageProcessed && cell.querySelector('picture')) {
        const picture = cell.querySelector('picture');
        const img = picture ? picture.querySelector('img') : null;
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          picture.replaceWith(optimizedPic);
          col1.append(optimizedPic);
          imageProcessed = true;
        }
      } else {
        // Append all other content from this cell to col2
        moveInstrumentation(cell, col2);
        while (cell.firstChild) col2.append(cell.firstChild);
      }
    });

    blogPostItem.append(col1, col2);
    blogPostItemList.append(blogPostItem);
  });

  block.textContent = '';
  block.append(blogPostItemList);
}
