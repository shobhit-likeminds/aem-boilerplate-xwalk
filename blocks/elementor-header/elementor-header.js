import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, ...itemRows] = [...block.children];

  // Main header container
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('elementor-element', 'elementor-element-7910b0b', 'e-con-full', 'e-flex', 'e-con', 'e-parent', 'elementor-sticky', 'elementor-sticky--active', 'elementor-section--handles-inside', 'elementor-sticky--effects', 'e-lazyloaded');

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('elementor-element', 'elementor-element-2dcde62', 'e-flex', 'e-con-boxed', 'e-con', 'e-child');
  headerContainer.append(innerContainer);

  const eConInner = document.createElement('div');
  eConInner.classList.add('e-con-inner');
  innerContainer.append(eConInner);

  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('elementor-element', 'elementor-element-5fef5c1', 'elementor-widget__width-initial', 'elementor-widget', 'elementor-widget-theme-site-logo', 'elementor-widget-image');
  eConInner.append(logoWrapper);

  const logoWidgetContainer = document.createElement('div');
  logoWidgetContainer.classList.add('elementor-widget-container');
  logoWrapper.append(logoWidgetContainer);

  const logoLink = document.createElement('a');
  const logoLinkFound = logoLinkRow.querySelector('a');
  if (logoLinkFound) {
    logoLink.href = logoLinkFound.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);
  logoWidgetContainer.append(logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '503' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  } else {
    // If no picture, append whatever is in the cell
    moveInstrumentation(logoRow, logoLink);
    while (logoRow.firstChild) logoLink.append(logoRow.firstChild);
  }

  // Navigation Menu
  const navMenuWrapper = document.createElement('div');
  navMenuWrapper.classList.add('elementor-element', 'elementor-element-f6dc590', 'elementor-widget__width-initial', 'elementor-nav-menu--stretch', 'elementor-nav-menu__text-align-center', 'elementor-nav-menu__align-end', 'elementor-nav-menu--dropdown-tablet', 'elementor-nav-menu--toggle', 'elementor-nav-menu--burger', 'elementor-widget', 'elementor-widget-nav-menu');
  eConInner.append(navMenuWrapper);

  const navMenuWidgetContainer = document.createElement('div');
  navMenuWidgetContainer.classList.add('elementor-widget-container');
  navMenuWrapper.append(navMenuWidgetContainer);

  const nav = document.createElement('nav');
  nav.classList.add('elementor-nav-menu--main', 'elementor-nav-menu__container', 'elementor-nav-menu--layout-horizontal', 'e--pointer-underline', 'e--animation-fade');
  nav.setAttribute('aria-label', 'Menu');
  navMenuWidgetContainer.append(nav);

  const ul = document.createElement('ul');
  ul.classList.add('elementor-nav-menu');
  ul.id = 'menu-1-f6dc590';
  nav.append(ul);

  const navItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a'));
  });

  const iconListItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && !cells.some(cell => cell.querySelector('a'));
  });

  navItems.forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('menu-item', 'menu-item-type-post_type', 'menu-item-object-page', 'elementor-item'); // Add relevant classes

    const linkEl = document.createElement('a');
    linkEl.classList.add('elementor-item');
    const textCell = cells.find(cell => !cell.querySelector('a'));
    const linkCell = cells.find(cell => cell.querySelector('a'));

    if (linkCell && linkCell.querySelector('a')) {
      linkEl.href = linkCell.querySelector('a').href;
      linkEl.textContent = textCell ? textCell.textContent : '';
    } else if (textCell) {
      linkEl.textContent = textCell.textContent;
      linkEl.href = '#'; // Fallback if link is not found
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
  navMenuWidgetContainer.append(menuToggle);

  // Add event listener for mobile menu toggle
  const mobileNavContainer = document.createElement('nav');
  mobileNavContainer.classList.add('elementor-nav-menu--dropdown', 'elementor-nav-menu__container');
  mobileNavContainer.setAttribute('aria-hidden', 'true');
  navMenuWidgetContainer.append(mobileNavContainer);

  const mobileUl = document.createElement('ul');
  mobileUl.classList.add('elementor-nav-menu');
  mobileUl.id = 'menu-2-f6dc590';
  mobileNavContainer.append(mobileUl);

  navItems.forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    li.classList.add('menu-item', 'menu-item-type-post_type', 'menu-item-object-page', 'elementor-item'); // Add relevant classes
    const linkEl = document.createElement('a');
    linkEl.classList.add('elementor-item');
    linkEl.setAttribute('tabindex', '-1');

    const textCell = cells.find(cell => !cell.querySelector('a'));
    const linkCell = cells.find(cell => cell.querySelector('a'));

    if (linkCell && linkCell.querySelector('a')) {
      linkEl.href = linkCell.querySelector('a').href;
      linkEl.textContent = textCell ? textCell.textContent : '';
    } else if (textCell) {
      linkEl.textContent = textCell.textContent;
      linkEl.href = '#'; // Fallback if link is not found
    }
    li.append(linkEl);
    mobileUl.append(li);
  });

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileNavContainer.setAttribute('aria-hidden', isExpanded);
    mobileNavContainer.classList.toggle('elementor-active', !isExpanded); // Example class for showing/hiding
  });

  // Icon List Section (hidden on mobile)
  const iconListSection = document.createElement('div');
  iconListSection.classList.add('elementor-element', 'elementor-element-ff0ccea', 'elementor-hidden-mobile', 'e-flex', 'e-con-boxed', 'e-con', 'e-child');
  headerContainer.append(iconListSection);

  const iconListInner = document.createElement('div');
  iconListInner.classList.add('e-con-inner');
  iconListSection.append(iconListInner);

  const iconListWidget = document.createElement('div');
  iconListWidget.classList.add('elementor-element', 'elementor-element-8b8d930', 'elementor-icon-list--layout-inline', 'elementor-align-center', 'elementor-list-item-link-full_width', 'elementor-widget', 'elementor-widget-icon-list');
  iconListInner.append(iconListWidget);

  const iconListWidgetContainer = document.createElement('div');
  iconListWidgetContainer.classList.add('elementor-widget-container');
  iconListWidget.append(iconListWidgetContainer);

  const iconListUl = document.createElement('ul');
  iconListUl.classList.add('elementor-icon-list-items', 'elementor-inline-items');
  iconListWidgetContainer.append(iconListUl);

  iconListItems.forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('elementor-icon-list-item', 'elementor-inline-item');

    const linkEl = document.createElement('a');
    const textCell = cells.find(cell => !cell.querySelector('a'));
    const linkCell = cells.find(cell => cell.querySelector('a'));

    if (linkCell && linkCell.querySelector('a')) {
      linkEl.href = linkCell.querySelector('a').href;
    } else {
      linkEl.href = '#';
    }

    const span = document.createElement('span');
    span.classList.add('elementor-icon-list-text');
    span.textContent = textCell ? textCell.textContent : '';
    linkEl.append(span);
    li.append(linkEl);
    iconListUl.append(li);
  });

  // Optimize images
  headerContainer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(headerContainer);
}
