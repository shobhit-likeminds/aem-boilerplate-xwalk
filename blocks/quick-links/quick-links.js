import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootDiv = document.createElement('div');
  rootDiv.classList.add('mt-0', 'pt-1', 'pb-1', 'm-none1', 'bottom-0', 'w-100', 'quick-links-parents-div', 'position-relative');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'aos-init', 'aos-animate');
  containerDiv.setAttribute('data-aos', 'fade-up');
  containerDiv.setAttribute('data-aos-offset', '-100');
  containerDiv.setAttribute('data-aos-duration', '650');
  containerDiv.setAttribute('data-aos-easing', 'ease-in-out');

  const ul = document.createElement('ul');
  ul.classList.add('quick-links-div');

  [...block.children].forEach((row) => {
    // Model: quick-link-item has fields: link (aem-content), label (text)
    // Therefore, use index destructuring for fixed schema.
    const [linkCell, labelCell] = [...row.children];

    const li = document.createElement('li');
    const anchor = document.createElement('a');

    // Read href from aem-content cell (linkCell)
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.target = '_blank'; // From original HTML
      anchor.classList.add('with-full-underline'); // From original HTML
    }

    // Read text from text cell (labelCell)
    if (labelCell) {
      anchor.textContent = labelCell.textContent.trim();
    }

    moveInstrumentation(row, li); // Move instrumentation from the original row to the new li
    li.append(anchor);
    ul.append(li);
  });

  containerDiv.append(ul);
  rootDiv.append(containerDiv);
  block.replaceChildren(rootDiv);

  // Removed image optimization as the BlockJson model and original HTML
  // do not contain any image fields or picture elements for this block.
}
