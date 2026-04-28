import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const quickLinksParentsDiv = document.createElement('div');
  quickLinksParentsDiv.classList.add('mt-0', 'pt-1', 'pb-1', 'm-none1', 'bottom-0', 'w-100', 'quick-links-parents-div', 'position-relative');

  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');
  container.setAttribute('data-aos', 'fade-up');
  container.setAttribute('data-aos-offset', '-100');
  container.setAttribute('data-aos-duration', '650');
  container.setAttribute('data-aos-easing', 'ease-in-out');

  const ul = document.createElement('ul');
  ul.classList.add('quick-links-div');

  [...block.children].forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // CORRECT: Array destructuring for fixed schema

    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.classList.add('with-full-underline');

    // CORRECT: Read href from the <a> tag within the linkCell, not textContent
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      // Check if target attribute exists in the original link and copy it
      if (foundLink.hasAttribute('target')) {
        anchor.setAttribute('target', foundLink.getAttribute('target'));
      }
    }
    // CORRECT: Read label text from the labelCell
    anchor.textContent = labelCell.textContent.trim();

    moveInstrumentation(row, li);
    li.append(anchor);
    ul.append(li);
  });

  container.append(ul);
  quickLinksParentsDiv.append(container);
  block.replaceChildren(quickLinksParentsDiv);

  // Removed image optimization as there are no images in this block based on the EDS Block Structure.
  // The original code had a createOptimizedPicture call, but it would never execute
  // because block.querySelectorAll('picture > img') would return an empty NodeList.
}
