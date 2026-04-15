import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, imageRow, ...storyRows] = [...block.children];

  block.classList.add('steel-stories');

  const container = document.createElement('div');
  container.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row');

  // Left column: Heading and Image
  const leftCol = document.createElement('div');
  leftCol.classList.add('col-sm-6', 'os-animation', 'animated', 'fadeInLeft');

  const storiesSteelBox = document.createElement('div');
  storiesSteelBox.classList.add('stories-steel-box');

  const heading = document.createElement('h2');
  moveInstrumentation(headingRow, heading);
  heading.textContent = headingRow.firstElementChild.textContent.trim();
  storiesSteelBox.append(heading);

  const figure = document.createElement('figure');
  figure.classList.add('MT30');
  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    figure.append(optimizedPic);
  }
  moveInstrumentation(imageRow, figure);
  storiesSteelBox.append(figure);

  leftCol.append(storiesSteelBox);
  row.append(leftCol);

  // Right column: Story list
  const rightCol = document.createElement('div');
  rightCol.classList.add('col-sm-6', 'os-animation', 'ohidden', 'animated', 'fadeInRight');

  const storyList = document.createElement('ul');
  storyList.classList.add('story-list', 'op1');

  storyRows.forEach((storyRow) => {
    const li = document.createElement('li');
    li.classList.add('os-animation', 'animated', 'fadeInLeft');

    // CRITICAL FIX: Replaced storyRow.children[0] with content detection
    const cells = [...storyRow.children];
    const textCell = cells.find(cell => cell.innerHTML.trim().length > 0); // Find the cell with content

    if (textCell) {
      moveInstrumentation(textCell, li);
      const p = document.createElement('p');
      p.innerHTML = textCell.innerHTML; // richtext content
      li.append(p);
    }
    moveInstrumentation(storyRow, li);
    storyList.append(li);
  });

  rightCol.append(storyList);
  row.append(rightCol);

  container.append(row);
  block.textContent = '';
  block.append(container);
}
