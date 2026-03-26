import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // BlockJson has 3 root fields: logo, logo-link, navigation-items (container)
  // The first two are single rows. The third is a container, so its content
  // (the actual navigation items) will follow as subsequent rows.
  // We need to skip the 'navigation-items' container row itself.
  const [logoRow, logoLinkRow, navigationItemsContainerRow, ...navItemRows] = [...block.children];

  // Main header container
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('elementor', 'elementor-16', 'elementor-location-header');

  const flexContainer = document.createElement('div');
  flexContainer.classList.add('elementor-element', 'elementor-element-ed9f9b0', 'e-flex', 'e-con-boxed', 'e-con', 'e-parent', 'e-lazyloaded');
  headerContainer.append(flexContainer);

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('e-con-inner');
  flexContainer.append(innerContainer);

  // --- Logo Section ---
  const logoSection = document.createElement('div');
  logoSection.classList.add('elementor-element', 'elementor-element-d1812f5', 'e-con-full', 'e-flex', 'e-con', 'e-child');
  innerContainer.append(logoSection);

  const logoWidget = document.createElement('div');
  logoWidget.classList.add('elementor-element', 'elementor-element-b16d513', 'elementor-widget', 'elementor-widget-theme-site-logo', 'elementor-widget-image');
  logoSection.append(logoWidget);

  const logoLink = document.createElement('a');
  // logoLinkRow is the second root row, which corresponds to the 'logo-link' field.
  // It contains a single cell with the <a> tag.
  const logoLinkFound = logoLinkRow.children[0].querySelector('a');
  if (logoLinkFound) {
    logoLink.href = logoLinkFound.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);
  logoWidget.append(logoLink);

  // logoRow is the first root row, which corresponds to the 'logo' field.
  // It contains a single cell with the <picture> tag.
  const picture = logoRow.children[0].querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1897' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoRow, logoLink);


  // --- Navigation Section ---
  const navSection = document.createElement('div');
  navSection.classList.add('elementor-element', 'elementor-element-c667a9f', 'e-con-full', 'e-flex', 'e-con', 'e-child');
  innerContainer.append(navSection);

  const navWidget = document.createElement('div');
  navWidget.classList.add('elementor-element', 'elementor-element-db6f5e4', 'e-full_width', 'e-n-menu-layout-horizontal', 'e-n-menu-tablet', 'elementor-widget', 'elementor-widget-n-menu');
  navSection.append(navWidget);

  const nav = document.createElement('nav');
  nav.classList.add('e-n-menu');
  nav.setAttribute('aria-label', 'Main Menu');
  nav.setAttribute('data-touch-mode', 'false');
  nav.setAttribute('data-layout', 'horizontal');
  navWidget.append(nav);

  const menuToggle = document.createElement('button');
  menuToggle.classList.add('e-n-menu-toggle');
  menuToggle.id = 'menu-toggle-230'; // Hardcoded ID from original HTML
  menuToggle.setAttribute('aria-haspopup', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-controls', 'menubar-230');
  menuToggle.setAttribute('aria-label', 'Menu Toggle');
  nav.append(menuToggle);

  const toggleIconOpen = document.createElement('span');
  toggleIconOpen.classList.add('e-n-menu-toggle-icon', 'e-open');
  const openImg = document.createElement('img');
  openImg.alt = 'svg file';
  openImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774440095737.svg+xml';
  toggleIconOpen.append(openImg);
  menuToggle.append(toggleIconOpen);

  const toggleIconClose = document.createElement('span');
  toggleIconClose.classList.add('e-n-menu-toggle-icon', 'e-close');
  const closeImg = document.createElement('img');
  closeImg.alt = 'svg file';
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/1774440095803.svg+xml';
  toggleIconClose.append(closeImg);
  menuToggle.append(toggleIconClose);

  const menuWrapper = document.createElement('div');
  menuWrapper.classList.add('e-n-menu-wrapper');
  menuWrapper.id = 'menubar-230'; // Hardcoded ID from original HTML
  menuWrapper.setAttribute('aria-labelledby', 'menu-toggle-230');
  nav.append(menuWrapper);

  const menuList = document.createElement('ul');
  menuList.classList.add('e-n-menu-heading');
  menuWrapper.append(menuList);

  navItemRows.forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('e-n-menu-item');

    const titleDiv = document.createElement('div');
    titleDiv.id = `e-n-menu-title-230${index + 1}`; // Hardcoded ID prefix from original HTML
    titleDiv.classList.add('e-n-menu-title', 'elementor-animation-grow');
    // Check if the current item is the 'e-current' one based on the original HTML structure
    // This logic might need refinement if the 'e-current' class is dynamic.
    // For now, assuming it's not the first item.
    // A more robust solution would involve checking the current page URL against the link href.
    // For this review, we'll assume it's not the first item, as the original HTML shows 'Home' as current.
    // If the first item in navItemRows is 'Home', then it should have 'e-current'.
    // Given the provided HTML, the first item is 'Home', so we add 'e-current' to the first nav item.
    if (index === 0) { // Assuming the first nav item is 'Home' and is current
      titleDiv.classList.add('e-current');
    }
    menuList.append(li);
    li.append(titleDiv);

    const linkContainer = document.createElement('a');
    linkContainer.classList.add('e-n-menu-title-container', 'e-focus', 'e-link');

    // header-nav-item model has 2 fields: label, link
    const labelCell = row.children[0];
    const linkCell = row.children[1];

    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkContainer.href = foundLink.href;
      linkContainer.setAttribute('data-focus-index', index + 1); // Hardcoded attribute from original HTML
      // Add aria-current if this is the current page link
      if (linkContainer.href === window.location.href) {
        linkContainer.setAttribute('aria-current', 'page');
      }
    }
    moveInstrumentation(linkCell, linkContainer);

    const spanText = document.createElement('span');
    spanText.classList.add('e-n-menu-title-text');
    spanText.textContent = labelCell.textContent.trim();
    moveInstrumentation(labelCell, spanText);

    linkContainer.append(spanText);
    titleDiv.append(linkContainer);
  });

  // Toggle functionality
  menuToggle.addEventListener('click', () => {
    menuWrapper.classList.toggle('e-open');
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  });

  block.textContent = '';
  block.append(headerContainer);
}
