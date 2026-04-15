import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.classList.add('navbar');
  nav.id = 'navbar-top';

  const section = document.createElement('section');
  section.classList.add('row', 'region', 'region-secondary-menu');

  const navBlock = document.createElement('nav');
  navBlock.classList.add('block', 'block-menu', 'navigation', 'menu--account');
  navBlock.setAttribute('role', 'navigation');
  navBlock.setAttribute('aria-labelledby', 'block-cbcog-account-menu-menu');
  navBlock.id = 'block-cbcog-account-menu';
  navBlock.setAttribute('data-block-plugin-id', 'system_menu_block:account');

  const h2 = document.createElement('h2');
  h2.classList.add('visually-hidden');
  h2.id = 'block-cbcog-account-menu-menu';
  h2.textContent = 'User account menu';

  const ul = document.createElement('ul');
  ul.classList.add('clearfix', 'nav', 'flex-row');
  ul.setAttribute('data-component-id', 'bootstrap_barrio:menu_columns');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    // Based on BlockJson:
    // cell[0]: field="label" type=text
    // cell[1]: field="link" type=aem-content
    // cell[2]: field="linkLabel" type=text
    // cell[3]: field="subLinks" type=richtext

    const labelCell = cells[0];
    const linkCell = cells[1];
    const linkLabelCell = cells[2];
    const subLinksCell = cells[3];

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('nav-item');

    // Check if subLinksCell contains a <ul>, indicating sub-links
    const subList = subLinksCell?.querySelector('ul');

    if (subList) {
      const triggerLink = document.createElement('a');
      triggerLink.classList.add('nav-link');
      triggerLink.textContent = labelCell.textContent.trim();
      // Use the link from linkCell if available, otherwise fallback
      const foundLink = linkCell?.querySelector('a');
      triggerLink.href = foundLink ? foundLink.href : '#';

      const dropdownContainer = document.createElement('div');
      // No specific dropdown class in ORIGINAL HTML, using a generic one.
      // If a specific class exists on the site, it should be used here.
      dropdownContainer.classList.add('nav-dropdown-wrapper'); // Placeholder class for dropdown content

      moveInstrumentation(subLinksCell, subList);
      dropdownContainer.appendChild(subList);

      triggerLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Toggle a class to show/hide the dropdown
        dropdownContainer.classList.toggle('show');
        triggerLink.classList.toggle('active'); // Add an active state to the trigger
      });

      li.appendChild(triggerLink);
      li.appendChild(dropdownContainer);

      // Transform nested lists within the subList if any
      transformNestedLists(subList);

    } else {
      // Simple flat link
      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a'); // For aem-content type, get href from <a>
      if (foundLink) {
        anchor.href = foundLink.href;
      } else {
        anchor.href = '#'; // Fallback if no link is found
      }

      // Use linkLabelCell content if available, otherwise fallback to labelCell
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell.textContent.trim();
      anchor.classList.add('nav-link');

      // Check if this is the "Log in" link based on content
      if (anchor.textContent.toLowerCase() === 'log in') {
        anchor.classList.add('nav-link--user-login');
        // Check if the original link had data-drupal-link-system-path
        const originalLink = linkCell?.querySelector('a');
        if (originalLink && originalLink.hasAttribute('data-drupal-link-system-path')) {
          anchor.setAttribute('data-drupal-link-system-path', originalLink.getAttribute('data-drupal-link-system-path'));
        }
      }

      moveInstrumentation(row, anchor);
      li.appendChild(anchor);
    }

    ul.append(li);
  });

  navBlock.append(h2, ul);
  section.append(navBlock);
  nav.append(section);

  block.textContent = '';
  block.append(nav);
}

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach(li => {
    const nested = li.querySelector(':scope > ul');
    if (nested) {
      nested.remove(); // Remove to re-append in a wrapper
      const subWrap = document.createElement('div');
      // The class 'has-sub-child' is not in the ORIGINAL HTML allowlist.
      // If this is for a specific dropdown/accordion style, it should be derived from the original site's CSS.
      // For now, using a generic class.
      subWrap.classList.add('sub-menu-wrapper');
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a') || li; // The link or the li itself acts as trigger
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents parent accordion from also toggling
        li.classList.toggle('active');
        subWrap.classList.toggle('active');
      });
    }
  });
}
