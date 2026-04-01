import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [headingRow, imageRow, ...storyRows] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row');

  // Left column: Heading and Image
  const leftCol = document.createElement('div');
  leftCol.classList.add('col-sm-6', 'os-animation', 'animated', 'fadeInLeft');
  leftCol.setAttribute('data-os-animation', 'fadeInLeft');
  leftCol.setAttribute('data-os-animation-delay', '.2s');

  const storiesSteelBox = document.createElement('div');
  storiesSteelBox.classList.add('stories-steel-box');

  const heading = document.createElement('h2');
  const headingContent = headingRow.querySelector('h1, h2, h3, h4, h5, h6');
  if (headingContent) {
    moveInstrumentation(headingContent, heading);
    heading.append(...headingContent.childNodes);
  } else {
    // Fallback if no specific heading tag is found, take all children of the first cell
    moveInstrumentation(headingRow.firstElementChild, heading);
    heading.append(...headingRow.firstElementChild.childNodes);
  }
  storiesSteelBox.append(heading);

  const figure = document.createElement('figure');
  figure.classList.add('MT30');
  const picture = imageRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    picture.replaceWith(optimizedPic);
    figure.append(optimizedPic);
  }
  storiesSteelBox.append(figure);

  leftCol.append(storiesSteelBox);
  row.append(leftCol);

  // Right column: Story list
  const rightCol = document.createElement('div');
  rightCol.classList.add('col-sm-6', 'os-animation', 'ohidden', 'animated', 'fadeInRight');
  rightCol.setAttribute('data-os-animation', 'fadeInRight');
  rightCol.setAttribute('data-os-animation-delay', '.1s');

  const ul = document.createElement('ul');
  ul.classList.add('story-list', 'op1');

  storyRows.forEach((storyRow, index) => {
    const li = document.createElement('li');
    moveInstrumentation(storyRow, li);
    li.classList.add('os-animation', 'animated', 'fadeInLeft');
    const delay = 0.2 + index * 0.2;
    li.setAttribute('data-os-animation', 'fadeInLeft');
    li.setAttribute('data-os-animation-delay', `${delay.toFixed(1)}s`);

    // Content detection for the story text cell
    const storyTextCell = [...storyRow.children].find(cell => cell.textContent.trim() !== '');
    if (storyTextCell) {
      moveInstrumentation(storyTextCell, li);
      while (storyTextCell.firstChild) {
        li.append(storyTextCell.firstChild);
      }
    }
    ul.append(li);
  });

  rightCol.append(ul);
  row.append(rightCol);

  container.append(row);
  block.textContent = '';
  block.append(container);
}
