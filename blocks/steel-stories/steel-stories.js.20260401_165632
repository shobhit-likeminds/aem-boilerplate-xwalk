import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, imageRow, ...storyRows] = [...block.children];

  // Create the main container div
  const container = document.createElement('div');
  container.classList.add('container');

  // Create the row div
  const row = document.createElement('div');
  row.classList.add('row');

  // Left column for heading and image
  const leftCol = document.createElement('div');
  leftCol.classList.add('col-sm-6', 'os-animation', 'animated', 'fadeInLeft');
  leftCol.setAttribute('data-os-animation', 'fadeInLeft');
  leftCol.setAttribute('data-os-animation-delay', '.2s');

  const storiesSteelBox = document.createElement('div');
  storiesSteelBox.classList.add('stories-steel-box');

  const h2 = document.createElement('h2');
  // headingRow has one cell, which contains the text
  const headingCell = headingRow.querySelector('div');
  if (headingCell) {
    moveInstrumentation(headingCell, h2);
    h2.append(headingCell.textContent);
  }
  storiesSteelBox.append(h2);

  const figure = document.createElement('figure');
  figure.classList.add('MT30');
  // imageRow has one cell, which contains the picture
  const imageCell = imageRow.querySelector('div');
  if (imageCell) {
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      figure.append(optimizedPic);
    }
  }
  storiesSteelBox.append(figure);
  leftCol.append(storiesSteelBox);
  row.append(leftCol);

  // Right column for story list
  const rightCol = document.createElement('div');
  rightCol.classList.add('col-sm-6', 'os-animation', 'ohidden', 'animated', 'fadeInRight');
  rightCol.setAttribute('data-os-animation', 'fadeInRight');
  rightCol.setAttribute('data-os-animation-delay', '.1s');

  const ul = document.createElement('ul');
  ul.classList.add('story-list', 'op1');

  storyRows.forEach((rowEl, index) => {
    const li = document.createElement('li');
    moveInstrumentation(rowEl, li);
    li.classList.add('os-animation', 'animated', 'fadeInLeft');
    li.setAttribute('data-os-animation', 'fadeInLeft');
    // Original HTML uses 0.2s, 0.4s, 0.6s, etc. for delay
    li.setAttribute('data-os-animation-delay', `${(index + 1) * 0.2}s`);

    const p = document.createElement('p');
    // Each story row has one cell containing the richtext content (which is a <p> tag)
    const storyTextCell = rowEl.querySelector('div');
    if (storyTextCell) {
      moveInstrumentation(storyTextCell, p);
      // Move all children from the cell to the new p tag
      while (storyTextCell.firstChild) {
        p.append(storyTextCell.firstChild);
      }
    }
    li.append(p);
    ul.append(li);
  });

  rightCol.append(ul);
  row.append(rightCol);

  container.append(row);
  block.textContent = '';
  block.append(container);

  // Optimize any images that might be in the stories (though not in current model)
  // This part is fine as it's a general cleanup, not tied to specific block structure.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
