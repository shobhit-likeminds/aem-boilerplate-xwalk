import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.classList.add('navbar');
  nav.id = 'navbar-top'; // Assuming this ID is unique and necessary

  const section = document.createElement('section');
  section.classList.add('row', 'region', 'region-secondary-menu');

  const navBlock = document.createElement('nav');
  navBlock.setAttribute('role', 'navigation');
  navBlock.setAttribute('aria-labelledby', 'block-cbcog-account-menu-menu');
  navBlock.id = 'block-cbcog-account-menu';
  navBlock.classList.add('block', 'block-menu', 'navigation', 'menu--account');

  const h2 = document.createElement('h2');
  h2.classList.add('visually-hidden');
  h2.id = 'block-cbcog-account-menu-menu';
  h2.textContent = 'User account menu'; // Hardcoded text from original HTML

  const ul = document.createElement('ul');
  ul.classList.add('clearfix', 'nav', 'flex-row');

  [...block.children].forEach((row) => {
    // Using destructuring for fixed-field item models as per EDS BLOCK STRUCTURE guide
    const cells = [...row.children];
    const labelCell = cells[0];
    const linkCell = cells[1];
    const linkLabelCell = cells[2];
    const subLinksCell = cells[3]; // This cell might contain a UL for sub-links

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('nav-item');

    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    } else {
      anchor.href = '#'; // Fallback if no link is found
    }

    anchor.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim() || '';
    anchor.classList.add('nav-link');

    // Check for sub-links in the richtext cell
    const subList = subLinksCell?.querySelector('ul');
    if (subList) {
      // If there are sub-links, this item becomes a dropdown/accordion trigger
      anchor.classList.add('nav-link--dropdown-toggle'); // Class from original HTML or common pattern
      const dropdownWrapper = document.createElement('div');
      dropdownWrapper.classList.add('nav-dropdown'); // Custom class for styling, not in original HTML but needed for functionality

      // Move subList's children directly to dropdownWrapper to avoid nested UL if subList itself is the wrapper
      [...subList.children].forEach(child => dropdownWrapper.appendChild(child));

      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropdownWrapper.classList.toggle('active');
        li.classList.toggle('active'); // Indicate active state on the list item
      });

      li.appendChild(anchor);
      li.appendChild(dropdownWrapper);
    } else {
      // Simple flat link
      li.appendChild(anchor);
    }

    ul.append(li);
  });

  navBlock.append(h2, ul);
  section.append(navBlock);
  nav.append(section);

  block.textContent = '';
  block.append(nav);

  // No images in this block, so no createOptimizedPicture needed.
}
