import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.classList.add('hidden-xs');

  const footerTop = document.createElement('div');
  footerTop.classList.add('footer-top');

  const container = document.createElement('div');
  container.classList.add('container');

  const columnWrapper = document.createElement('div');
  columnWrapper.classList.add('column');

  [...block.children].forEach((row) => {
    const columnElement = document.createElement('div');
    moveInstrumentation(row, columnElement);
    columnElement.classList.add('colum-element');

    // Process all cells within the current row
    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        const picture = cell.querySelector('picture');
        const img = picture ? picture.querySelector('img') : null;
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '94' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          picture.replaceWith(optimizedPic);
        }
        const link = cell.querySelector('a');
        if (link) {
          link.classList.add('logo');
        }
        columnElement.append(cell); // Append the cell after processing
      } else if (cell.querySelector('ul')) {
        // ULs are already structured correctly in the cell
        columnElement.append(cell);
      } else if (cell.querySelector('div.title')) {
        // Div with class 'title'
        columnElement.append(cell);
      } else if (cell.querySelector('p') || cell.querySelector('div.link-social')) {
        const followUsDiv = document.createElement('div');
        followUsDiv.classList.add('follow-us');
        moveInstrumentation(cell, followUsDiv);

        // Move children from original cell to followUsDiv
        while (cell.firstChild) {
          const child = cell.firstChild;
          if (child.tagName === 'P' && child.textContent.trim() === '') {
            child.remove(); // Remove empty paragraphs
          } else if (child.tagName === 'P' && child.querySelector('img')) {
            const img = child.querySelector('img');
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '70' }]);
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            img.closest('p').replaceWith(optimizedPic);
          } else {
            followUsDiv.append(child);
          }
        }
        if (followUsDiv.children.length > 0) {
          columnElement.append(followUsDiv);
        }
      } else {
        // Append any other cells directly
        columnElement.append(cell);
      }
    });
    columnWrapper.append(columnElement);
  });

  container.append(columnWrapper);
  footerTop.append(container);
  block.textContent = ''; // Clear the original block content
  block.append(footerTop);

  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('txt-copyright');
  copyrightDiv.innerHTML = `Copyright © JSW <span id="cyear">${new Date().getFullYear()}</span> All rights reserved`;
  footerBottom.append(copyrightDiv);

  const termsDiv = document.createElement('div');
  termsDiv.classList.add('txt-terms');
  const termsLink = document.createElement('a');
  termsLink.href = 'https://www.jsw.in/groups/privacy-policy';
  termsLink.target = '_blank';
  termsLink.textContent = 'Privacy Policy';
  termsDiv.append(termsLink);
  footerBottom.append(termsDiv);

  block.append(footerBottom);

  // Ensure all images are optimized that might have been missed or added later
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]); // Default width, adjust if specific
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
