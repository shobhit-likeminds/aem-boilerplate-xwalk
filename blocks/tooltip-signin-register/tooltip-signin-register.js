import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, ...ctaRows] = [...block.children];

  const root = document.createElement('div');
  root.classList.add('bg--white-accent');
  root.setAttribute('id', 'tooltip-signin-register');
  root.setAttribute('role', 'dialog');

  const arrowSvg = document.createElement('svg');
  arrowSvg.classList.add('tooltip-signin-register--arrow');
  arrowSvg.setAttribute('role', 'presentation');
  arrowSvg.setAttribute('width', '16');
  arrowSvg.setAttribute('height', '12');
  arrowSvg.setAttribute('viewBox', '0 0 16 12');
  arrowSvg.setAttribute('fill', 'none');
  arrowSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  arrowSvg.innerHTML = '<path d="M6.26351 1.03885C7.0313 -0.304777 8.9687 -0.304778 9.73649 1.03885L16 12L0 12L6.26351 1.03885Z" fill="#FAFAFA"></path>';
  root.append(arrowSvg);

  const container = document.createElement('div');
  container.classList.add('tooltip-signin-register--container');

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('labelMediumBold', 'tooltip-signin-register--title');
  moveInstrumentation(titleRow, titleDiv);
  // Title is richtext, so use innerHTML directly from the cell
  const [titleCell] = [...titleRow.children]; // Destructuring for fixed schema
  titleDiv.innerHTML = titleCell?.innerHTML || '';
  container.append(titleDiv);

  const closeDiv = document.createElement('div');
  closeDiv.classList.add('tooltip-signin-register--close');
  const closeBtn = document.createElement('button');
  closeBtn.setAttribute('type', 'button');
  closeBtn.classList.add('icon', 'cross-icon-black', 'tooltip-signin-register--close-btn');
  closeBtn.setAttribute('aria-label', 'Close tooltip');
  closeDiv.append(closeBtn);
  container.append(closeDiv);

  // Add event listener for the close button
  closeBtn.addEventListener('click', () => {
    block.classList.remove('active'); // Assuming 'active' class controls visibility
    // Or if it's a modal, you might want to hide it differently
  });

  const ctasDiv = document.createElement('div');
  ctasDiv.classList.add('tooltip-signin-register--ctas');

  ctaRows.forEach((row) => {
    const [linkCell, labelCell] = [...row.children]; // Destructuring for fixed schema
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    const labelText = labelCell?.textContent.trim() || '';
    anchor.classList.add('button'); // All CTAs are buttons
    anchor.setAttribute('aria-label', labelText); // Use labelText for aria-label
    anchor.setAttribute('rel', 'follow');

    // Determine specific CTA classes based on position or content if needed
    // For this block, the first CTA is 'red' (signin), the second is 'transparent-black' (signup)
    if (ctaRows.indexOf(row) === 0) {
      anchor.classList.add('red', 'tooltip-signin-register--signin');
    } else if (ctaRows.indexOf(row) === 1) {
      anchor.classList.add('transparent-black', 'tooltip-signin-register--signup');
    }

    const buttonTextSpan = document.createElement('span');
    buttonTextSpan.classList.add('button-text');
    buttonTextSpan.textContent = labelText;
    anchor.append(buttonTextSpan);

    moveInstrumentation(row, anchor);
    ctasDiv.append(anchor);
  });

  container.append(ctasDiv);
  root.append(container);

  block.replaceChildren(root);
}
