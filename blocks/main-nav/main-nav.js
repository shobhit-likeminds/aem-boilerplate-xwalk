import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure block.children based on the BlockJson model and EDS Block Structure
  // logoRow (block.children[0])
  // logoLinkRow (block.children[1])
  // searchPlaceholderRow (block.children[2])
  // searchActionRow (block.children[3])
  // ...menuItemRows (remaining children are menu-item sub-components)
  const [logoRow, logoLinkRow, searchPlaceholderRow, searchActionRow, ...menuItemRows] = [...block.children];

  block.textContent = '';
  block.classList.add('main-nav');

  const container = document.createElement('div');
  container.classList.add('container');
  block.append(container);

  const siteBranding = document.createElement('div');
  siteBranding.classList.add('site-branding');
  container.append(siteBranding);

  const logoLink = document.createElement('a');
  moveInstrumentation(logoLinkRow, logoLink);
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    moveInstrumentation(logoRow, logoPicture);
    logoLink.append(logoPicture);
  }
  siteBranding.append(logoLink);

  const nav = document.createElement('nav');
  nav.id = 'site-navigation';
  nav.classList.add('main-navigation');
  container.append(nav);

  const menuToggle = document.createElement('button');
  menuToggle.classList.add('menu-toggle');
  menuToggle.setAttribute('aria-controls', 'primary-menu');
  menuToggle.setAttribute('aria-expanded', 'false');
  nav.append(menuToggle);

  ['icon-bar', 'icon-bar', 'icon-bar'].forEach((className) => {
    const span = document.createElement('span');
    span.classList.add(className);
    menuToggle.append(span);
  });

  const textSpan = document.createElement('span');
  textSpan.classList.add('text');
  textSpan.textContent = 'Primary Menu';
  menuToggle.append(textSpan);

  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menu-nav-old-dutch-container');
  nav.append(menuContainer);

  const ul = document.createElement('ul');
  ul.id = 'brand-menu';
  ul.classList.add('menu', 'nav-menu');
  menuContainer.append(ul);

  menuItemRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    // Add specific classes from the original HTML for menu items
    li.classList.add('menu-item', 'menu-item-type-post_type', 'menu-item-object-page');

    // Use content detection for cells within the menu item row
    const labelCell = row.querySelector('div:first-child'); // Corresponds to 'label' field
    const linkCell = row.querySelector('div:last-child');   // Corresponds to 'link' field

    const link = document.createElement('a');
    if (linkCell && linkCell.querySelector('a')) {
      link.href = linkCell.querySelector('a').href;
      moveInstrumentation(linkCell, link);
      // Move all children from the link cell to the new link element
      while (linkCell.firstChild) link.append(linkCell.firstChild);
    } else if (labelCell) {
      // If no explicit link, use label as text
      moveInstrumentation(labelCell, link);
      // Move all children from the label cell to the new link element
      while (labelCell.firstChild) link.append(labelCell.firstChild);
    }
    li.append(link);
    ul.append(li);
  });

  const mobileNavBottom = document.createElement('div');
  mobileNavBottom.classList.add('mobile-nav-bottom');
  nav.append(mobileNavBottom);

  const mobileNavDiv = document.createElement('div');
  mobileNavBottom.append(mobileNavDiv);

  const mobileSearchForm = document.createElement('form');
  mobileSearchForm.setAttribute('role', 'search');
  mobileSearchForm.setAttribute('method', 'get');
  mobileSearchForm.classList.add('search-form');
  mobileSearchForm.setAttribute('action', searchActionRow.querySelector('a')?.href || '#');
  mobileNavDiv.append(mobileSearchForm);

  const mobileSearchField = document.createElement('input');
  mobileSearchField.setAttribute('type', 'search');
  mobileSearchField.classList.add('search-field');
  mobileSearchField.setAttribute('placeholder', searchPlaceholderRow.textContent.trim());
  mobileSearchField.setAttribute('value', '');
  mobileSearchField.setAttribute('name', 's');
  mobileSearchForm.append(mobileSearchField);

  const mobileSearchSubmit = document.createElement('input');
  mobileSearchSubmit.setAttribute('type', 'submit');
  mobileSearchSubmit.classList.add('search-submit');
  mobileSearchSubmit.setAttribute('value', '');
  mobileSearchForm.append(mobileSearchSubmit);


  const searchForm = document.createElement('form');
  searchForm.setAttribute('role', 'search');
  searchForm.setAttribute('method', 'get');
  searchForm.classList.add('search-form');
  searchForm.setAttribute('action', searchActionRow.querySelector('a')?.href || '#');
  container.append(searchForm);

  const searchField = document.createElement('input');
  searchField.setAttribute('type', 'search');
  searchField.classList.add('search-field');
  searchField.setAttribute('placeholder', searchPlaceholderRow.textContent.trim());
  searchField.setAttribute('value', '');
  searchField.setAttribute('name', 's');
  searchForm.append(searchField);

  const searchSubmit = document.createElement('input');
  searchSubmit.setAttribute('type', 'submit');
  searchSubmit.classList.add('search-submit');
  searchSubmit.setAttribute('value', '');
  searchForm.append(searchSubmit);

  // Toggle functionality for menu
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('toggled'); // Original HTML uses 'toggled' class on nav for open state
  });


  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
