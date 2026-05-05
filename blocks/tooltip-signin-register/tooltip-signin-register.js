import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRowElement, ...ctaRowElements] = [...block.children];

  const root = document.createElement('div');
  root.classList.add('bg--white-accent'); // From ORIGINAL HTML
  root.id = 'tooltip-signin-register'; // From ORIGINAL HTML
  root.setAttribute('role', 'dialog'); // From ORIGINAL HTML

  const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  arrowSvg.setAttribute('role', 'presentation');
  arrowSvg.classList.add('tooltip-signin-register--arrow'); // From ORIGINAL HTML
  arrowSvg.setAttribute('width', '16');
  arrowSvg.setAttribute('height', '12');
  arrowSvg.setAttribute('viewBox', '0 0 16 12');
  arrowSvg.setAttribute('fill', 'none');
  arrowSvg.innerHTML = '<path d="M6.26351 1.03885C7.0313 -0.304777 8.9687 -0.304778 9.73649 1.03885L16 12L0 12L6.26351 1.03885Z" fill="#FAFAFA"></path>';
  root.append(arrowSvg);

  const container = document.createElement('div');
  container.classList.add('tooltip-signin-register--container'); // From ORIGINAL HTML

  const title = document.createElement('div');
  title.classList.add('labelMediumBold', 'tooltip-signin-register--title'); // From ORIGINAL HTML
  // BlockJson indicates 'title' is richtext, so use innerHTML
  const [titleCell] = [...titleRowElement.children]; // Destructure for fixed schema
  moveInstrumentation(titleRowElement, title);
  title.innerHTML = titleCell?.innerHTML || '';
  container.append(title);

  const closeDiv = document.createElement('div');
  closeDiv.classList.add('tooltip-signin-register--close'); // From ORIGINAL HTML

  const closeButton = document.createElement('button');
  closeButton.setAttribute('type', 'button');
  closeButton.classList.add('icon', 'cross-icon-black', 'tooltip-signin-register--close-btn'); // From ORIGINAL HTML
  closeButton.setAttribute('aria-label', 'Close tooltip'); // From ORIGINAL HTML
  closeDiv.append(closeButton);
  container.append(closeDiv);

  // Add event listener for the close button
  closeButton.addEventListener('click', () => {
    // Assuming the tooltip should be hidden or removed when closed
    // This example removes the block from the DOM, adjust as needed
    block.remove();
  });

  const ctasDiv = document.createElement('div');
  ctasDiv.classList.add('tooltip-signin-register--ctas'); // From ORIGINAL HTML

  ctaRowElements.forEach((row, index) => {
    const [linkCell, labelCell] = [...row.children]; // Destructuring for fixed schema
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell?.textContent.trim() || '';
    anchor.classList.add('button'); // From ORIGINAL HTML
    anchor.setAttribute('aria-label', ''); // From ORIGINAL HTML
    anchor.setAttribute('rel', 'follow'); // From ORIGINAL HTML

    const buttonTextSpan = document.createElement('span');
    buttonTextSpan.classList.add('button-text'); // From ORIGINAL HTML
    buttonTextSpan.textContent = anchor.textContent;
    anchor.textContent = ''; // Clear anchor text to append span
    anchor.append(buttonTextSpan);

    if (index === 0) {
      anchor.classList.add('red', 'tooltip-signin-register--signin'); // From ORIGINAL HTML
    } else {
      anchor.classList.add('transparent-black', 'tooltip-signin-register--signup'); // From ORIGINAL HTML
    }
    moveInstrumentation(row, anchor);
    ctasDiv.append(anchor);
  });

  container.append(ctasDiv);
  root.append(container);

  block.replaceChildren(root);
}
