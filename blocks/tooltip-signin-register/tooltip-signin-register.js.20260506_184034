import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const root = document.createElement('div');
  root.classList.add('tooltip-signin-register', 'bg--white-accent');
  root.setAttribute('id', 'tooltip-signin-register');
  root.setAttribute('role', 'dialog');

  const arrowSvg = document.createElement('svg');
  arrowSvg.setAttribute('role', 'presentation');
  arrowSvg.classList.add('tooltip-signin-register--arrow');
  arrowSvg.setAttribute('width', '16');
  arrowSvg.setAttribute('height', '12');
  arrowSvg.setAttribute('viewBox', '0 0 16 12');
  arrowSvg.setAttribute('fill', 'none');
  arrowSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  arrowSvg.innerHTML = '<path d="M6.26351 1.03885C7.0313 -0.304777 8.9687 -0.304778 9.73649 1.03885L16 12L0 12L6.26351 1.03885Z" fill="#FAFAFA"></path>';
  root.append(arrowSvg);

  const container = document.createElement('div');
  container.classList.add('tooltip-signin-register--container');
  root.append(container);

  // block.children[0]: field="title" label="Tooltip Title" type=richtext
  const [titleRow] = children; // Destructuring for the first row
  const titleCell = titleRow.children[0]; // Accessing the first cell of the title row
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('labelMediumBold', 'tooltip-signin-register--title');
  moveInstrumentation(titleRow, titleDiv);
  titleDiv.innerHTML = titleCell?.innerHTML || ''; // Use innerHTML for richtext
  container.append(titleDiv);

  const closeDiv = document.createElement('div');
  closeDiv.classList.add('tooltip-signin-register--close');
  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('type', 'button');
  closeBtn.classList.add('icon', 'cross-icon-black', 'tooltip-signin-register--close-btn');
  closeBtn.setAttribute('aria-label', 'Close tooltip');
  closeDiv.append(closeBtn);
  container.append(closeDiv);

  const ctasDiv = document.createElement('div');
  ctasDiv.classList.add('tooltip-signin-register--ctas');
  container.append(ctasDiv);

  // Remaining children are CTA item rows
  const ctaRows = children.slice(1);
  ctaRows.forEach((row) => {
    // cell[0]: field="label" label="Button Label" type=text
    // cell[1]: field="link" label="Button Link" type=aem-content
    const [labelCell, linkCell] = [...row.children]; // Correct: named destructuring

    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    // The original HTML has a span inside the anchor for text,
    // and the anchor's aria-label is empty.
    // We will create the span and append it to the anchor.
    const span = document.createElement('span');
    span.classList.add('button-text');
    span.textContent = labelCell?.textContent.trim() || '';
    anchor.append(span);

    anchor.setAttribute('aria-label', ''); // Original HTML has empty aria-label
    anchor.setAttribute('rel', 'follow'); // Original HTML has rel="follow"

    // Determine button classes based on position
    if (ctasDiv.children.length === 0) {
      anchor.classList.add('button', 'red', 'tooltip-signin-register--signin');
    } else {
      anchor.classList.add('button', 'transparent-black', 'tooltip-signin-register--signup');
    }

    moveInstrumentation(row, anchor);
    ctasDiv.append(anchor);
  });

  block.replaceChildren(root);

  // Add event listener for close button
  closeBtn.addEventListener('click', () => {
    root.classList.remove('show'); // Assuming 'show' class controls visibility
    // Additional logic to hide/remove the tooltip from DOM if needed
  });
}
