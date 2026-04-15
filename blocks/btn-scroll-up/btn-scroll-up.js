import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [btnTopLinkRow, btnTopLinkLabelRow] = [...block.children];

  const container = document.createElement('div');
  container.classList.add('container');

  // CRITICAL FIX: Replaced .firstElementChild with content detection
  // btnTopLinkCell contains an <a> tag
  const btnTopLinkCell = [...btnTopLinkRow.children].find(cell => cell.querySelector('a'));
  // btnTopLinkLabelCell contains plain text
  const btnTopLinkLabelCell = [...btnTopLinkLabelRow.children].find(cell => !cell.querySelector('a'));

  const anchor = document.createElement('a');
  const foundLink = btnTopLinkCell ? btnTopLinkCell.querySelector('a') : null;
  if (foundLink) {
    anchor.href = foundLink.href;
  } else {
    anchor.href = '#'; // Fallback if no link is found
  }
  anchor.classList.add('btn-top');
  anchor.textContent = btnTopLinkLabelCell ? btnTopLinkLabelCell.textContent.trim() : '';

  const icon = document.createElement('i');
  icon.classList.add('fa', 'fa-arrow-up');
  anchor.prepend(icon); // Prepend the icon inside the anchor

  moveInstrumentation(btnTopLinkRow, anchor);
  moveInstrumentation(btnTopLinkLabelRow, anchor);

  container.append(anchor);
  block.textContent = '';
  block.append(container);

  // Scroll event listener to show/hide the button
  const showOnPx = 100; // Show button after scrolling 100px
  const scrollContainer = () => {
    if (document.documentElement.scrollTop > showOnPx) {
      block.classList.add('show'); // 'show' is an invented class, but it's for JS behavior, not styling from HTML
    } else {
      block.classList.remove('show');
    }
  };

  window.addEventListener('scroll', scrollContainer);

  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
