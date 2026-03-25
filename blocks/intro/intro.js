import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.id = 'intro';
  section.classList.add('wrapper', 'style1');

  const [
    titleRow,
    paragraph1Row,
    paragraph2Row,
    paragraph3Row,
    buttonLinkRow,
    buttonTextRow,
  ] = [...block.children];

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('title');
  moveInstrumentation(titleRow, titleDiv);
  // The original HTML has "The Introduction" as plain text in the div.
  // The block structure has "Title value" in a div.
  // We need to extract the text content directly.
  titleDiv.textContent = titleRow.firstElementChild.textContent;
  section.append(titleDiv);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const p1 = document.createElement('p');
  p1.classList.add('style1');
  moveInstrumentation(paragraph1Row, p1);
  // Append all child nodes (including text and other elements) from the source paragraph
  while (paragraph1Row.firstElementChild.firstChild) {
    p1.append(paragraph1Row.firstElementChild.firstChild);
  }
  containerDiv.append(p1);

  const p2 = document.createElement('p');
  p2.classList.add('style2');
  moveInstrumentation(paragraph2Row, p2);
  // Append all child nodes (including text and other elements) from the source paragraph
  while (paragraph2Row.firstElementChild.firstChild) {
    p2.append(paragraph2Row.firstElementChild.firstChild);
  }
  // The original HTML's <br class="mobile-hide"> and <a class="nobr"> are part of the content
  // and should be present in the richtext field from the editor.
  // The JS should not try to re-add or enforce these classes if they are not explicitly
  // part of the content provided by the editor.
  // If the editor provides them, they will be moved with the content.
  containerDiv.append(p2);

  const p3 = document.createElement('p');
  p3.classList.add('style3');
  moveInstrumentation(paragraph3Row, p3);
  // Append all child nodes (including text and other elements) from the source paragraph
  while (paragraph3Row.firstElementChild.firstChild) {
    p3.append(paragraph3Row.firstElementChild.firstChild);
  }
  containerDiv.append(p3);

  const actionsUl = document.createElement('ul');
  actionsUl.classList.add('actions');
  const actionsLi = document.createElement('li');
  
  const buttonLinkElement = buttonLinkRow.querySelector('a'); // This is the <a> element from the editor
  const buttonTextElement = buttonTextRow.firstElementChild; // This is the <div> containing the text

  const buttonA = document.createElement('a');
  buttonA.classList.add('button', 'style3', 'large');
  
  if (buttonLinkElement) {
    buttonA.href = buttonLinkElement.href;
    moveInstrumentation(buttonLinkRow, buttonA);
  }
  if (buttonTextElement) {
    buttonA.textContent = buttonTextElement.textContent; // Extract text content from the div
    moveInstrumentation(buttonTextRow, buttonA);
  }
  actionsLi.append(buttonA);
  actionsUl.append(actionsLi);
  containerDiv.append(actionsUl);

  section.append(containerDiv);

  block.textContent = '';
  block.append(section);
}
