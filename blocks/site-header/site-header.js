import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main header element
  const header = document.createElement('header');
  moveInstrumentation(block, header);
  header.classList.add('header-site');
  header.id = 'site-header';
  header.setAttribute('role', 'banner');

  // Extract content from block children based on the model structure
  const rows = [...block.children];

  // Row 0: Logo (picture element expected in first cell)
  const logoCell = rows[0]?.children[0];
  const logoPicture = logoCell?.querySelector('picture');
  const logoLink = logoCell?.querySelector('a');

  // Row 1: Logo Alt Text (text content expected in first cell)
  const logoAltCell = rows[1]?.children[0];
  const logoAltText = logoAltCell?.textContent.trim();

  // Row 2: Close Menu Icon (picture element expected in first cell)
  const closeMenuIconCell = rows[2]?.children[0];
  const closeMenuIcon = closeMenuIconCell?.querySelector('img');

  // Row 3: Toggle Menu Icon (picture element expected in first cell)
  const toggleMenuIconCell = rows[3]?.children[0];
  const toggleMenuIcon = toggleMenuIconCell?.querySelector('img');

  // Remaining rows are menu items
  const menuItemsRows = rows.slice(4);

  // --- header-top section ---
  const headerTop = document.createElement('div');
  headerTop.classList.add('header-top');

  const headerMenuSecondaryContainer = document.createElement('div');
  headerMenuSecondaryContainer.classList.add('header-menu-secondary-container');
  headerMenuSecondaryContainer.id = 'menu-secondary-container';
  const headerMenuSecondary = document.createElement('div');
  headerMenuSecondary.classList.add('header-menu-secondary');
  headerMenuSecondary.id = 'menu-secondary';
  headerMenuSecondary.setAttribute('role', 'navigation');
  headerMenuSecondaryContainer.append(headerMenuSecondary);
  headerTop.append(headerMenuSecondaryContainer);

  const headerSocialIconsContainer = document.createElement('div');
  headerSocialIconsContainer.classList.add('header-social-icons-container');
  headerSocialIconsContainer.id = 'social-icons-container';
  headerTop.append(headerSocialIconsContainer);

  header.append(headerTop);

  // --- header-middle section (Logo) ---
  const headerMiddle = document.createElement('div');
  headerMiddle.classList.add('header-middle');

  const headerTitleContainer = document.createElement('div');
  headerTitleContainer.classList.add('header-title-container');
  headerTitleContainer.id = 'title-container';

  const headerSiteTitle = document.createElement('div');
  headerSiteTitle.classList.add('header-site-title');
  headerSiteTitle.id = 'site-title';

  if (logoLink && logoPicture) {
    const customLogoLink = document.createElement('a');
    customLogoLink.href = logoLink.href;
    customLogoLink.classList.add('header-custom-logo-link');
    customLogoLink.setAttribute('rel', 'home');

    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, logoAltText || img.alt, false, [{ width: '305' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img')); // Rule 3
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('header-custom-logo');
      optimizedImg.setAttribute('width', '305');
      optimizedImg.setAttribute('height', '96');
      optimizedImg.setAttribute('decoding', 'async');
      customLogoLink.append(optimizedPic);
    }
    headerSiteTitle.append(customLogoLink);
  }
  headerTitleContainer.append(headerSiteTitle);
  headerMiddle.append(headerTitleContainer);
  header.append(headerMiddle);

  // --- header-bottom section (Mobile Menu & Toggle) ---
  const headerBottom = document.createElement('div');
  headerBottom.classList.add('header-bottom');

  const headerMobileMenuContainer = document.createElement('div');
  headerMobileMenuContainer.classList.add('header-mobile-menu-container');
  headerMobileMenuContainer.id = 'mobile-menu-container';

  const headerMobileMenuContainerInner = document.createElement('div');
  headerMobileMenuContainerInner.classList.add('header-mobile-menu-container-inner');
  headerMobileMenuContainerInner.id = 'mobile-menu-container-inner';

  // Close Mobile Menu Button
  const headerCloseMobileMenu = document.createElement('div');
  headerCloseMobileMenu.classList.add('header-close-mobile-menu');
  headerCloseMobileMenu.id = 'close-mobile-menu';
  const closeButton = document.createElement('button');
  if (closeMenuIcon) {
    const closeIconImg = document.createElement('img');
    closeIconImg.src = closeMenuIcon.src;
    closeIconImg.alt = closeMenuIcon.alt || 'svg file';
    closeButton.append(closeIconImg);
  }
  headerCloseMobileMenu.append(closeButton);
  headerMobileMenuContainerInner.append(headerCloseMobileMenu);

  // Primary Menu Container
  const headerMenuPrimaryContainer = document.createElement('div');
  headerMenuPrimaryContainer.classList.add('header-menu-primary-container');
  headerMenuPrimaryContainer.id = 'menu-primary-container';

  const headerMenuPrimary = document.createElement('div');
  headerMenuPrimary.classList.add('header-menu-primary');
  headerMenuPrimary.id = 'menu-primary';
  headerMenuPrimary.setAttribute('role', 'navigation');

  const navMenu = document.createElement('nav');
  navMenu.classList.add('header-menu');

  const menuPrimaryItems = document.createElement('ul');
  menuPrimaryItems.id = 'menu-primary-items';
  menuPrimaryItems.classList.add('header-menu-primary-items');

  // Populate menu items dynamically
  menuItemsRows.forEach((row, index) => {
    const cells = [...row.children];
    const labelCell = cells[0];
    const urlCell = cells[1];

    if (labelCell && urlCell) {
      const li = document.createElement('li');
      // No direct instrumentation for li as it's part of a list, but the content comes from a row.
      // If the row itself was replaced by the li, moveInstrumentation would be used.
      // Here, the row's content is used to build the li.
      li.classList.add('header-menu-item', `header-menu-item-${43 + index}`); // Example ID/class based on source

      const a = document.createElement('a');
      a.href = urlCell.textContent.trim();
      a.textContent = labelCell.textContent.trim();
      li.append(a);
      menuPrimaryItems.append(li);
    }
  });

  navMenu.append(menuPrimaryItems);
  headerMenuPrimary.append(navMenu);
  headerMenuPrimaryContainer.append(headerMenuPrimary);
  headerMobileMenuContainerInner.append(headerMenuPrimaryContainer);
  headerMobileMenuContainer.append(headerMobileMenuContainerInner);
  headerBottom.append(headerMobileMenuContainer);

  // Toggle Container
  const headerToggleContainer = document.createElement('div');
  headerToggleContainer.classList.add('header-toggle-container');
  headerToggleContainer.id = 'toggle-container';

  const toggleNavigationButton = document.createElement('button');
  toggleNavigationButton.id = 'toggle-navigation';
  toggleNavigationButton.classList.add('header-toggle-navigation');
  toggleNavigationButton.setAttribute('name', 'toggle-navigation');
  toggleNavigationButton.setAttribute('aria-expanded', 'false');

  const screenReaderText = document.createElement('span');
  screenReaderText.classList.add('header-screen-reader-text');
  screenReaderText.textContent = 'open menu';
  toggleNavigationButton.append(screenReaderText);

  if (toggleMenuIcon) {
    const toggleIconImg = document.createElement('img');
    toggleIconImg.src = toggleMenuIcon.src;
    toggleIconImg.alt = toggleMenuIcon.alt || 'svg file';
    toggleNavigationButton.append(toggleIconImg);
  }
  headerToggleContainer.append(toggleNavigationButton);
  headerBottom.append(headerToggleContainer);

  header.append(headerBottom);

  // Clear the original block content and append the new header structure
  block.textContent = '';
  block.append(header);
}
