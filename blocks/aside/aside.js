import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('container');

  const ul = document.createElement('ul');
  ul.classList.add('inline-block-list');

  // Skip the first row which is the container title, as per BlockJson model for 'items'
  const itemRows = [...block.children].slice(1);

  itemRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const linkEl = document.createElement('a');

    let imageSrc = '';
    let imageAlt = '';
    let linkHref = '';
    let linkText = '';
    let textContent = '';

    // Destructure cells based on the inline-block-list-item model: [image, link, text]
    const cells = [...row.children];
    if (cells.length === 3) {
      // Cell 0: Image
      const imageCell = cells[0];
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          imageSrc = img.src;
          imageAlt = img.alt;
        }
      }

      // Cell 1: Link
      const linkCell = cells[1];
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkHref = foundLink.href;
        linkText = foundLink.textContent; // This is the primary text for the link
      }

      // Cell 2: Text (additional text content)
      const textCell = cells[2];
      textContent = textCell.textContent;
    }

    if (linkHref) {
      linkEl.href = linkHref;
    }

    if (imageSrc) {
      const optimizedPic = createOptimizedPicture(imageSrc, imageAlt, false, [{ width: '18' }]);
      // moveInstrumentation(imageEl, optimizedPic.querySelector('img')); // imageEl is not defined here
      linkEl.append(optimizedPic);
    }

    // Append the link's text content first, then any additional text content
    if (linkText) {
      linkEl.append(linkText);
    }
    if (textContent) {
      // If there's linkText, append textContent after it. Otherwise, it's the main text.
      // The original HTML shows "Report issues" and "Help on Stack Overflow" directly after the image,
      // which implies linkText should be the primary text. The 'Text' field from the model
      // is not explicitly shown in the original HTML output, so we'll append it if present.
      // For this specific block, based on the original HTML, it seems the 'Text' field
      // might be redundant or intended for a different layout.
      // However, adhering to the model, we'll append it.
      if (linkText) {
        linkEl.append(` ${textContent}`); // Add a space for separation if both exist
      } else {
        linkEl.append(textContent);
      }
    }

    li.append(linkEl);
    ul.append(li);
  });

  container.append(ul);
  block.textContent = '';
  block.append(container);
  block.classList.add('aside');
}
