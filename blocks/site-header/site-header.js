import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerTop = document.createElement('div');
  headerTop.classList.add('header-top');

  const headerMenuSecondaryContainer = document.createElement('div');
  headerMenuSecondaryContainer.classList.add('header-menu-secondary-container');
  headerMenuSecondaryContainer.id = 'menu-secondary-container';
  const headerMenuSecondary = document.createElement('div');
  headerMenuSecondary.classList.add('header-menu-container', 'header-menu-secondary');
  headerMenuSecondary.id = 'menu-secondary';
  headerMenuSecondary.setAttribute('role', 'navigation');
  headerMenuSecondaryContainer.append(headerMenuSecondary);
  headerTop.append(headerMenuSecondaryContainer);

  const headerSocialIconsContainer = document.createElement('div');
  headerSocialIconsContainer.classList.add('header-social-icons-container');
  headerSocialIconsContainer.id = 'social-icons-container';
  headerTop.append(headerSocialIconsContainer);

  const headerMiddle = document.createElement('div');
  headerMiddle.classList.add('header-middle');

  const headerTitleContainer = document.createElement('div');
  headerTitleContainer.classList.add('header-title-container');
  headerTitleContainer.id = 'title-container';

  const headerSiteTitle = document.createElement('div');
  headerSiteTitle.classList.add('header-site-title');
  headerSiteTitle.id = 'site-title';

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-custom-logo-link');
  logoLink.setAttribute('rel', 'home');

  const logoCell = block.children[0]?.children[0];
  const logoImg = logoCell?.querySelector('img');
  if (logoImg) {
    const optimizedPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '305' }]);
    moveInstrumentation(logoImg, optimizedPic.querySelector('img'));
    logoLink.href = logoImg.closest('a')?.href || '#';
    logoLink.append(optimizedPic);
  } else {
    // Fallback if no image, but still need a link
    const linkEl = logoCell?.querySelector('a');
    if (linkEl) {
      logoLink.href = linkEl.href;
      logoLink.textContent = linkEl.textContent;
    }
  }
  headerSiteTitle.append(logoLink);
  headerTitleContainer.append(headerSiteTitle);
  headerMiddle.append(headerTitleContainer);

  const headerBottom = document.createElement('div');
  headerBottom.classList.add('header-bottom');

  const headerMobileMenuContainer = document.createElement('div');
  headerMobileMenuContainer.classList.add('header-mobile-menu-container');
  headerMobileMenuContainer.id = 'mobile-menu-container';

  const headerMobileMenuContainerInner = document.createElement('div');
  headerMobileMenuContainerInner.classList.add('header-mobile-menu-container-inner');
  headerMobileMenuContainerInner.id = 'mobile-menu-container-inner';

  const headerCloseMobileMenu = document.createElement('div');
  headerCloseMobileMenu.classList.add('header-close-mobile-menu');
  headerCloseMobileMenu.id = 'close-mobile-menu';
  const closeButton = document.createElement('button');
  const closeButtonImg = document.createElement('img');
  closeButtonImg.alt = 'svg file';
  closeButtonImg.src = '/content/dam/aemigrate/uploaded-folder/image/1771505763415.svg+xml'; // Placeholder
  closeButton.append(closeButtonImg);
  headerCloseMobileMenu.append(closeButton);
  headerMobileMenuContainerInner.append(headerCloseMobileMenu);

  const headerMenuPrimaryContainer = document.createElement('div');
  headerMenuPrimaryContainer.classList.add('header-menu-primary-container');
  headerMenuPrimaryContainer.id = 'menu-primary-container';

  const headerMenuPrimary = document.createElement('div');
  headerMenuPrimary.classList.add('header-menu-container', 'header-menu-primary');
  headerMenuPrimary.id = 'menu-primary';
  headerMenuPrimary.setAttribute('role', 'navigation');

  const nav = document.createElement('nav');
  nav.classList.add('header-menu');

  const ul = document.createElement('ul');
  ul.id = 'menu-primary-items';
  ul.classList.add('header-menu-primary-items');

  // Assuming primary menu items start from the second row in the block
  [...block.children].slice(1).forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.id = `menu-item-${43 + index}`; // Assign dynamic IDs based on example
    li.classList.add('header-menu-item', 'header-menu-item-type-post_type', 'header-menu-item-object-page', `header-menu-item-${43 + index}`);

    const link = row.querySelector('a');
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent;
      // Add current menu item classes if applicable, based on original HTML
      if (link.closest('.header-current-menu-item')) {
        li.classList.add('header-current-menu-item', 'header-page_item', 'header-page-item-15', 'header-current_page_item');
        a.setAttribute('aria-current', 'page');
      }
      if (link.closest('.header-menu-item-home')) {
        li.classList.add('header-menu-item-home');
      }
      li.append(a);
    }
    ul.append(li);
  });

  nav.append(ul);
  headerMenuPrimary.append(nav);
  headerMenuPrimaryContainer.append(headerMenuPrimary);
  headerMobileMenuContainerInner.append(headerMenuPrimaryContainer);
  headerMobileMenuContainer.append(headerMobileMenuContainerInner);
  headerBottom.append(headerMobileMenuContainer);

  const headerToggleContainer = document.createElement('div');
  headerToggleContainer.classList.add('header-toggle-container');
  headerToggleContainer.id = 'toggle-container';

  const toggleButton = document.createElement('button');
  toggleButton.id = 'toggle-navigation';
  toggleButton.classList.add('header-toggle-navigation');
  toggleButton.name = 'toggle-navigation';
  toggleButton.setAttribute('aria-expanded', 'false');

  const screenReaderText = document.createElement('span');
  screenReaderText.classList.add('header-screen-reader-text');
  screenReaderText.textContent = 'open menu';
  toggleButton.append(screenReaderText);

  const toggleButtonImg = document.createElement('img');
  toggleButtonImg.alt = 'svg file';
  toggleButtonImg.src = '/content/dam/aemigrate/uploaded-folder/image/1771505763449.svg+xml'; // Placeholder
  toggleButton.append(toggleButtonImg);
  headerToggleContainer.append(toggleButton);
  headerBottom.append(headerToggleContainer);

  const newHeader = document.createElement('header');
  newHeader.classList.add('header-site');
  newHeader.id = 'site-header';
  newHeader.setAttribute('role', 'banner');

  newHeader.append(headerTop);
  newHeader.append(headerMiddle);
  newHeader.append(headerBottom);

  block.textContent = '';
  block.append(newHeader);
}
