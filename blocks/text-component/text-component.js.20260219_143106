import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const titleElement = block.querySelector('h1');
  if (titleElement) {
    const newTitle = document.createElement('h1');
    moveInstrumentation(titleElement, newTitle);
    newTitle.className = 'text-component-title';

    // Extract and re-create the content, including the span
    [...titleElement.childNodes].forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        newTitle.append(document.createTextNode(node.textContent));
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
        const span = document.createElement('span');
        moveInstrumentation(node, span);
        span.className = 'text-component-highlight';
        span.textContent = node.textContent;
        newTitle.append(span);
      }
    });
    block.textContent = '';
    block.append(newTitle);
  }
}
