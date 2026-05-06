import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, ...ctaRows] = [...block.children];

  const root = document.createElement('div');
  root.classList.add('tooltip-signin-register', 'bg--white-accent');
  root.id = 'tooltip-signin-register';
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

  const titleWrapper = document.createElement('div');
  titleWrapper.classList.add('labelMediumBold', 'tooltip-signin-register--title');
  moveInstrumentation(titleRow, titleWrapper);
  // The titleRow's first child is a div, which contains the richtext content.
  // We need to get the innerHTML of that div, not the row's first child directly.
  titleWrapper.innerHTML = titleRow.querySelector('div')?.innerHTML || '';
  container.append(titleWrapper);

  const closeWrapper = document.createElement('div');
  closeWrapper.classList.add('tooltip-signin-register--close');
  const closeButton = document.createElement('button');
  closeButton.classList.add('icon', 'cross-icon-black', 'tooltip-signin-register--close-btn');
  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('aria-label', 'Close tooltip');
  closeWrapper.append(closeButton);
  container.append(closeWrapper);

  const ctasWrapper = document.createElement('div');
  ctasWrapper.classList.add('tooltip-signin-register--ctas');

  ctaRows.forEach((row, index) => {
    const [labelCell, linkCell] = [...row.children];
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    // Original HTML has a span inside the anchor for the text.
    const span = document.createElement('span');
    span.classList.add('button-text');
    span.textContent = labelCell.textContent.trim(); // Use labelCell for text content
    anchor.append(span);

    anchor.classList.add('button'); // 'button-text' is for the span, not the anchor itself
    anchor.setAttribute('aria-label', '');
    anchor.setAttribute('rel', 'follow');

    if (index === 0) {
      anchor.classList.add('red', 'tooltip-signin-register--signin');
    } else {
      anchor.classList.add('transparent-black', 'tooltip-signin-register--signup');
    }

    moveInstrumentation(row, anchor);
    ctasWrapper.append(anchor);
  });

  container.append(ctasWrapper);
  root.append(container);

  block.replaceChildren(root);
}
