import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CRITICAL: Add page ID classes to the block root element
  block.classList.add('elementor', 'elementor-30');

  const [logoRow, ...itemRows] = [...block.children];

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('elementor-element', 'elementor-element-7910b0b', 'e-con-full', 'e-flex', 'e-con', 'e-parent', 'e-lazyloaded', 'elementor-sticky', 'elementor-sticky--active', 'elementor-section--handles-inside', 'elementor-sticky--effects');

  const topNavContainer = document.createElement('div');
  topNavContainer.classList.add('elementor-element', 'elementor-element-2dcde62', 'e-flex', 'e-con-boxed', 'e-con', 'e-child');
  mainContainer.append(topNavContainer);

  const innerTopNavContainer = document.createElement('div');
  innerTopNavContainer.classList.add('e-con-inner');
  topNavContainer.append(innerTopNavContainer);

  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('elementor-element', 'elementor-element-5fef5c1', 'elementor-widget__width-initial', 'elementor-widget', 'elementor-widget-theme-site-logo', 'elementor-widget-image');
  innerTopNavContainer.append(logoWrapper);

  const logoWidgetContainer = document.createElement('div');
  logoWidgetContainer.classList.add('elementor-widget-container');
  logoWrapper.append(logoWidgetContainer);

  const logoLink = document.createElement('a');
  const logoPicture = logoRow.querySelector('picture');
  const logoImg = logoPicture ? logoPicture.querySelector('img') : null;
  if (logoImg) {
    const optimizedPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '503' }]);
    moveInstrumentation(logoImg, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoWidgetContainer.append(logoLink);
  moveInstrumentation(logoRow, logoLink);


  // Nav Menu
  const navMenuWrapper = document.createElement('div');
  navMenuWrapper.classList.add('elementor-element', 'elementor-element-f6dc590', 'elementor-widget__width-initial', 'elementor-nav-menu--stretch', 'elementor-nav-menu__text-align-center', 'elementor-nav-menu__align-end', 'elementor-nav-menu--dropdown-tablet', 'elementor-nav-menu--toggle', 'elementor-nav-menu--burger', 'elementor-widget', 'elementor-widget-nav-menu');
  innerTopNavContainer.append(navMenuWrapper);

  const navWidgetContainer = document.createElement('div');
  navWidgetContainer.classList.add('elementor-widget-container');
  navMenuWrapper.append(navWidgetContainer);

  const nav = document.createElement('nav');
  nav.classList.add('elementor-nav-menu__container');
  navWidgetContainer.append(nav);

  const ul = document.createElement('ul');
  ul.classList.add('elementor-nav-menu');
  nav.append(ul);

  const navMenuItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a'));
  });
  navMenuItems.forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    li.classList.add('menu-item');  // FIXED: removed 'elementor-item' from <li>
    moveInstrumentation(row, li);

    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('a'));

    const foundLink = linkCell ? linkCell.querySelector('a') : null;
    const linkEl = document.createElement('a');
    linkEl.classList.add('elementor-item');  // FIXED: only <a> should have this class
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.textContent = labelCell ? labelCell.textContent : '';
    } else if (labelCell) {
      linkEl.textContent = labelCell.textContent;
    }
    li.append(linkEl);
    ul.append(li);
  });

  // Mobile Menu Toggle
  const menuToggle = document.createElement('div');
  menuToggle.classList.add('elementor-menu-toggle');
  menuToggle.setAttribute('role', 'button');
  menuToggle.setAttribute('tabindex', '0');
  menuToggle.setAttribute('aria-label', 'Menu Toggle');
  menuToggle.setAttribute('aria-expanded', 'false');
  navMenuWrapper.append(menuToggle);

  const toggleIcon1 = document.createElement('img');
  toggleIcon1.alt = 'svg file';
  toggleIcon1.src = '/icons/hamburger.svg'; // Placeholder, replace with actual icon path if available in block
  menuToggle.append(toggleIcon1);

  const toggleIcon2 = document.createElement('img');
  toggleIcon2.alt = 'svg file';
  toggleIcon2.src = '/icons/close.svg'; // Placeholder, replace with actual icon path if available in block
  menuToggle.append(toggleIcon2);

  const dropdownNav = document.createElement('nav');
  dropdownNav.classList.add('elementor-nav-menu--dropdown', 'elementor-nav-menu__container');
  dropdownNav.setAttribute('aria-hidden', 'true');
  navMenuWrapper.append(dropdownNav);

  const dropdownUl = ul.cloneNode(true); // Clone the main nav menu for dropdown
  dropdownUl.id = 'menu-2-f6dc590';
  dropdownNav.append(dropdownUl);

  // Toggle functionality
  menuToggle.addEventListener('click', () => {
    dropdownNav.classList.toggle('elementor-nav-menu--dropdown-open');
    menuToggle.setAttribute('aria-expanded', dropdownNav.classList.contains('elementor-nav-menu--dropdown-open'));
  });

  // Secondary Nav (Icon List)
  const secondaryNavContainer = document.createElement('div');
  secondaryNavContainer.classList.add('elementor-element', 'elementor-element-ff0ccea', 'elementor-hidden-mobile', 'e-flex', 'e-con-boxed', 'e-con', 'e-child');
  mainContainer.append(secondaryNavContainer);

  const innerSecondaryNavContainer = document.createElement('div');
  innerSecondaryNavContainer.classList.add('e-con-inner');
  secondaryNavContainer.append(innerSecondaryNavContainer);

  const iconListWrapper = document.createElement('div');
  iconListWrapper.classList.add('elementor-element', 'elementor-element-8b8d930', 'elementor-icon-list--layout-inline', 'elementor-align-center', 'elementor-list-item-link-full_width', 'elementor-widget', 'elementor-widget-icon-list');
  innerSecondaryNavContainer.append(iconListWrapper);

  const iconListWidgetContainer = document.createElement('div');
  iconListWidgetContainer.classList.add('elementor-widget-container');
  iconListWrapper.append(iconListWidgetContainer);

  const iconListUl = document.createElement('ul');
  iconListUl.classList.add('elementor-icon-list-items', 'elementor-inline-items');
  iconListWidgetContainer.append(iconListUl);

  const iconListItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a')) && !cells.some(cell => cell.querySelector('picture'));
  });
  iconListItems.forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    li.classList.add('elementor-icon-list-item', 'elementor-inline-item');
    moveInstrumentation(row, li);

    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('a'));

    const foundLink = linkCell ? linkCell.querySelector('a') : null;
    const linkEl = document.createElement('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
    }

    const span = document.createElement('span');
    span.classList.add('elementor-icon-list-text');
    span.textContent = labelCell ? labelCell.textContent : '';
    linkEl.append(span);
    li.append(linkEl);
    iconListUl.append(li);
  });

  block.textContent = '';
  block.append(mainContainer);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
