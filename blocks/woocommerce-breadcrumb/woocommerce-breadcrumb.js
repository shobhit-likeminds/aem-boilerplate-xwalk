import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.classList.add('woocommerce-breadcrumb');
  nav.setAttribute('aria-label', 'Breadcrumb');

  // Check 0 & 1: Use destructuring for the single row
  const [breadcrumbRow] = [...block.children];
  moveInstrumentation(breadcrumbRow, nav);

  // Check 1: Access the cell containing the link
  const cells = [...breadcrumbRow.children];
  const breadcrumbLinkCell = cells.find(cell => cell.querySelector('a'));

  if (breadcrumbLinkCell) {
    const link = breadcrumbLinkCell.querySelector('a');
    if (link) {
      const homeLink = document.createElement('a');
      homeLink.href = '/'; // Assuming home link is always root
      homeLink.textContent = 'Home';
      nav.append(homeLink);

      const separator = document.createTextNode(' / ');
      nav.append(separator);

      const currentLink = document.createElement('a');
      currentLink.href = link.href;
      currentLink.textContent = link.textContent;
      nav.append(currentLink);
    }
  }

  block.textContent = '';
  block.append(nav);
}
