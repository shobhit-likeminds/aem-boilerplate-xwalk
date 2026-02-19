import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The block itself is the <header> element, so we will build its children.
  // The block content will be the rows from the CMS.
  // Based on the JSON, we expect 4 rows: logo, closeMenuIcon, toggleMenuIcon, menuPrimary.

  const rows = [...block.children];
  let logoContent = null;
  let closeMenuIconContent = null;
  let toggleMenuIconContent = null;
  let menuPrimaryContent = null;

  // Assuming a fixed order for simplicity based on the JSON fields and typical block content structure
  // Row 0: Logo
  // Row 1: Close Menu Icon
  // Row 2: Toggle Menu Icon
  // Row 3: Primary Menu

  if (rows.length > 0) {
    logoContent = rows[0].querySelector('a'); // Expecting an <a> tag with an <img> inside
  }
  if (rows.length > 1) {
    closeMenuIconContent = rows[1].querySelector('img'); // Expecting an <img> tag
  }
  if (rows.length > 2) {
    toggleMenuIconContent = rows[2].querySelector('img'); // Expecting an <img> tag
  }
  if (rows.length > 3) {
    menuPrimaryContent = rows[3].querySelector('ul'); // Expecting a <ul> tag for the menu
  }

  block.textContent = ''; // Clear the existing block content
  block.classList.add('header-site-header'); // Add classes from the source HTML
  block.setAttribute('id', 'site-header');
  block.setAttribute('role', 'banner');

  // --- Header Top --- //
  const headerTop = document.createElement('div');
  headerTop.classList.add('header-top');
  block.append(headerTop);

  const menuSecondaryContainer = document.createElement('div');
  menuSecondaryContainer.setAttribute('id', 'menu-secondary-container');
  menuSecondaryContainer.classList.add('header-menu-secondary-container');
  headerTop.append(menuSecondaryContainer);

  const menuSecondary = document.createElement('div');
  menuSecondary.setAttribute('id', 'menu-secondary');
  menuSecondary.classList.add('header-menu-container', 'header-menu-secondary');
  menuSecondary.setAttribute('role', 'navigation');
  menuSecondaryContainer.append(menuSecondary);

  const socialIconsContainer = document.createElement('div');
  socialIconsContainer.setAttribute('id', 'social-icons-container');
  socialIconsContainer.classList.add('header-social-icons-container');
  headerTop.append(socialIconsContainer);

  // --- Header Middle --- //
  const headerMiddle = document.createElement('div');
  headerMiddle.classList.add('header-middle');
  block.append(headerMiddle);

  const titleContainer = document.createElement('div');
  titleContainer.setAttribute('id', 'title-container');
  titleContainer.classList.add('header-title-container');
  headerMiddle.append(titleContainer);

  const siteTitle = document.createElement('div');
  siteTitle.setAttribute('id', 'site-title');
  siteTitle.classList.add('header-site-title');
  titleContainer.append(siteTitle);

  if (logoContent) {
    // The logo content is expected to be an <a> element with an <img> inside.
    // We need to move instrumentation from the original row to the new <a> element.
    const newLogoLink = logoContent.cloneNode(true);
    moveInstrumentation(rows[0], newLogoLink);
    siteTitle.append(newLogoLink);
    
    // Optimize the picture if it's an AEM image, otherwise keep as is
    const logoImg = newLogoLink.querySelector('img');
    if (logoImg && logoImg.src.includes('/content/dam/')) {
      const optimizedPic = createOptimizedPicture(
        logoImg.src,
        logoImg.alt,
        false,
        [{ width: logoImg.width || '305' }]
      );
      // Move instrumentation from the original img to the new optimized img within the picture
      moveInstrumentation(logoImg, optimizedPic.querySelector('img'));
      logoImg.closest('img').replaceWith(optimizedPic);
    }
  }

  // --- Header Bottom --- //
  const headerBottom = document.createElement('div');
  headerBottom.classList.add('header-bottom');
  block.append(headerBottom);

  const mobileMenuContainer = document.createElement('div');
  mobileMenuContainer.setAttribute('id', 'mobile-menu-container');
  mobileMenuContainer.classList.add('header-mobile-menu-container');
  headerBottom.append(mobileMenuContainer);

  const mobileMenuContainerInner = document.createElement('div');
  mobileMenuContainerInner.setAttribute('id', 'mobile-menu-container-inner');
  mobileMenuContainer.append(mobileMenuContainerInner);

  const closeMobileMenu = document.createElement('div');
  closeMobileMenu.setAttribute('id', 'close-mobile-menu');
  closeMobileMenu.classList.add('header-close-mobile-menu');
  mobileMenuContainerInner.append(closeMobileMenu);

  const closeButton = document.createElement('button');
  if (closeMenuIconContent) {
    const newCloseIcon = closeMenuIconContent.cloneNode(true);
    moveInstrumentation(rows[1], newCloseIcon); // Move instrumentation from original row to new image
    closeButton.append(newCloseIcon);
  }
  closeMobileMenu.append(closeButton);

  const menuPrimaryContainer = document.createElement('div');
  menuPrimaryContainer.setAttribute('id', 'menu-primary-container');
  menuPrimaryContainer.classList.add('header-menu-primary-container');
  mobileMenuContainerInner.append(menuPrimaryContainer);

  const menuPrimary = document.createElement('div');
  menuPrimary.setAttribute('id', 'menu-primary');
  menuPrimary.classList.add('header-menu-container', 'header-menu-primary');
  menuPrimary.setAttribute('role', 'navigation');
  menuPrimaryContainer.append(menuPrimary);

  const navMenu = document.createElement('nav');
  navMenu.classList.add('header-menu');
  menuPrimary.append(navMenu);

  if (menuPrimaryContent) {
    // The primary menu content is expected to be a <ul> element.
    // We need to move instrumentation from the original row to the new <ul> element.
    const newMenuPrimaryItems = menuPrimaryContent.cloneNode(true);
    moveInstrumentation(rows[3], newMenuPrimaryItems);
    newMenuPrimaryItems.setAttribute('id', 'menu-primary-items'); // Add ID from source HTML
    newMenuPrimaryItems.classList.add('header-menu-primary-items'); // Add classes from source HTML

    // Update classes for list items and links within the menu
    [...newMenuPrimaryItems.children].forEach((li) => {
      li.classList.forEach((cls) => {
        if (cls.startsWith('menu-item-')) {
          li.classList.remove(cls);
        }
      });
      li.classList.add('header-menu-item', 'header-menu-item-type-post_type', 'header-menu-item-object-page');
      const link = li.querySelector('a');
      if (link) {
        // Preserve specific classes like 'header-current-menu-item' if they exist in the source
        if (link.parentElement.classList.contains('header-current-menu-item')) {
          li.classList.add('header-current-menu-item', 'header-page_item', 'header-current_page_item');
        }
      }
    });
    navMenu.append(newMenuPrimaryItems);
  }

  const toggleContainer = document.createElement('div');
  toggleContainer.setAttribute('id', 'toggle-container');
  toggleContainer.classList.add('header-toggle-container');
  headerBottom.append(toggleContainer);

  const toggleNavigationButton = document.createElement('button');
  toggleNavigationButton.setAttribute('id', 'toggle-navigation');
  toggleNavigationButton.classList.add('header-toggle-navigation');
  toggleNavigationButton.setAttribute('name', 'toggle-navigation');
  toggleNavigationButton.setAttribute('aria-expanded', 'false');
  toggleContainer.append(toggleNavigationButton);

  const screenReaderText = document.createElement('span');
  screenReaderText.classList.add('header-screen-reader-text');
  screenReaderText.textContent = 'open menu';
  toggleNavigationButton.append(screenReaderText);

  if (toggleMenuIconContent) {
    const newToggleIcon = toggleMenuIconContent.cloneNode(true);
    moveInstrumentation(rows[2], newToggleIcon); // Move instrumentation from original row to new image
    toggleNavigationButton.append(newToggleIcon);
  }
}