import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    titleRow,
    paragraph1Row,
    paragraph2Row,
    paragraph3Row,
    ctaLinkRow,
    ctaLabelRow,
  ] = [...block.children];

  const section = document.createElement('section');
  section.id = 'intro';
  section.classList.add('wrapper', 'style1');

  // Title
  const titleDiv = document.createElement('div');
  moveInstrumentation(titleRow, titleDiv);
  titleDiv.classList.add('title');
  // The title value is directly inside the first child of the row's first child
  titleDiv.textContent = titleRow.firstElementChild.textContent.trim();
  section.append(titleDiv);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  // Paragraph 1
  const paragraph1 = document.createElement('p');
  moveInstrumentation(paragraph1Row, paragraph1);
  paragraph1.classList.add('style1');
  // Append all children from the first cell of the paragraph row
  while (paragraph1Row.firstElementChild.firstChild) {
    paragraph1.append(paragraph1Row.firstElementChild.firstChild);
  }
  containerDiv.append(paragraph1);

  // Paragraph 2
  const paragraph2 = document.createElement('p');
  moveInstrumentation(paragraph2Row, paragraph2);
  paragraph2.classList.add('style2');
  // Append all children from the first cell of the paragraph row
  while (paragraph2Row.firstElementChild.firstChild) {
    paragraph2.append(paragraph2Row.firstElementChild.firstChild);
  }
  containerDiv.append(paragraph2);

  // Paragraph 3
  const paragraph3 = document.createElement('p');
  moveInstrumentation(paragraph3Row, paragraph3);
  paragraph3.classList.add('style3');
  // Append all children from the first cell of the paragraph row
  while (paragraph3Row.firstElementChild.firstChild) {
    paragraph3.append(paragraph3Row.firstElementChild.firstChild);
  }
  containerDiv.append(paragraph3);

  // CTA Link and Label
  const ctaLink = ctaLinkRow.querySelector('a');
  // The CTA label value is directly inside the first child of the row's first child
  const ctaLabelText = ctaLabelRow.firstElementChild.textContent.trim();

  if (ctaLink && ctaLabelText) {
    const ulActions = document.createElement('ul');
    ulActions.classList.add('actions');

    const li = document.createElement('li');
    const buttonLink = document.createElement('a');
    // Instrumentation should be moved from the row that contains the link
    moveInstrumentation(ctaLinkRow, buttonLink); 
    buttonLink.href = ctaLink.href;
    buttonLink.classList.add('button', 'style3', 'large');
    buttonLink.textContent = ctaLabelText;
    li.append(buttonLink);
    ulActions.append(li);
    containerDiv.append(ulActions);
  }

  section.append(containerDiv);

  block.textContent = '';
  block.append(section);
}
