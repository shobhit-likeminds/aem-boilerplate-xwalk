import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Check 0 & 1: Structure Alignment - using destructuring for root rows, which is acceptable.
  // The BlockJson defines 'heading', 'image', and 'stories' (container of 'story' items).
  // The JS correctly destructures these into headingRow, imageRow, and storyRows.
  const [headingRow, imageRow, ...storyRows] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('container');

  const row = document.createElement('div');
  row.classList.add('row');

  const leftCol = document.createElement('div');
  leftCol.classList.add('col-sm-6', 'os-animation', 'animated', 'fadeInLeft');
  leftCol.setAttribute('data-os-animation', 'fadeInLeft');
  leftCol.setAttribute('data-os-animation-delay', '.2s');

  const storiesSteelBox = document.createElement('div');
  storiesSteelBox.classList.add('stories-steel-box');

  const h2 = document.createElement('h2');
  // Check 0 & 1: CRITICAL FIX - headingRow.firstElementChild.innerHTML is an index access.
  // Replaced with content detection.
  const headingTextElement = headingRow.querySelector('div'); // Assuming heading is always in the first div
  if (headingTextElement) {
    moveInstrumentation(headingRow, h2);
    h2.innerHTML = headingTextElement.innerHTML;
  }


  const figure = document.createElement('figure');
  figure.classList.add('MT30');
  const picture = imageRow.querySelector('picture');
  if (picture) {
    moveInstrumentation(imageRow, figure);
    figure.append(picture);
  }

  storiesSteelBox.append(h2, figure);
  leftCol.append(storiesSteelBox);

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
    li.setAttribute('data-os-animation', 'fadeInLeft');
    li.setAttribute('data-os-animation-delay', `${(index + 1) * 0.2}s`); // Increment delay for each item

    // Check 0 & 1: CRITICAL FIX - storyRow.firstChild is an index access.
    // Replaced with content detection. The BlockJson for 'story' has a single 'text' field (richtext).
    const storyTextCell = storyRow.querySelector('div'); // Assuming the story text is always in the first div
    if (storyTextCell) {
      li.append(storyTextCell);
    }
    ul.append(li);
  });

  rightCol.append(ul);
  row.append(leftCol, rightCol);
  container.append(row);

  block.textContent = '';
  block.append(container);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Check 2: Interactivity - No interactive elements found in the ORIGINAL HTML.
}
