import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...navItemRows] = [...block.children];

  block.textContent = '';
  block.classList.add('container-menu-top');

  const nav = document.createElement('nav');
  nav.classList.add('port-menu', 'clearfix');
  block.append(nav);

  const containerMobileHeader = document.createElement('div');
  containerMobileHeader.classList.add('container', 'mobile-header');
  nav.append(containerMobileHeader);

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-container');
  moveInstrumentation(logoLinkRow, logoLink);
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  logoLink.title = logoLinkLabelRow.textContent.trim() || 'Home';

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  containerMobileHeader.append(logoLink);

  // Hamburger menu for mobile
  const mobileMenuToggle = document.createElement('div');
  mobileMenuToggle.classList.add('visible-sm', 'visible-xs', 'clearfix', 'show-menu');
  const btnHumbeger = document.createElement('div');
  btnHumbeger.classList.add('btn-humbeger');
  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  navIcon4.classList.add('btn-bars');
  navIcon4.innerHTML = '<span></span><span></span><span></span>';
  btnHumbeger.append(navIcon4);
  mobileMenuToggle.append(btnHumbeger);
  containerMobileHeader.append(mobileMenuToggle);

  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menu-container');
  containerMobileHeader.append(menuContainer);

  const menuLeft = document.createElement('div');
  menuLeft.classList.add('menu-left');
  menuContainer.append(menuLeft);

  const mainMenu = document.createElement('ul');
  mainMenu.classList.add('main-menu');
  menuLeft.append(mainMenu);

  // Navigation Items
  navItemRows.forEach((row) => {
    // Use content detection instead of index access for item rows
    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('ul') && !cell.querySelector('p'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const linkLabelCell = cells.find(cell => cell !== labelCell && cell !== linkCell && !cell.querySelector('ul') && !cell.querySelector('p'));
    const subLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p'));

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');

    if (subList) {
      li.classList.add('has-submenu');
      const titleLink = document.createElement('a');
      titleLink.classList.add('title-link');
      titleLink.href = linkCell?.querySelector('a')?.href || '#';
      titleLink.textContent = labelCell?.textContent.trim();

      const arrowMenu = document.createElement('span');
      arrowMenu.classList.add('arrow-menu', 'visible-xs', 'visible-sm');
      arrowMenu.innerHTML = '<i class="fa fa-arrow-right"></i>';
      titleLink.append(arrowMenu);
      li.append(titleLink);

      const subMenu = document.createElement('div');
      subMenu.classList.add('sub-menu');
      const subMenuContainer = document.createElement('div');
      subMenuContainer.classList.add('container');
      const panelDisplay = document.createElement('div');
      panelDisplay.classList.add('panel-display', 'panel-1col', 'clearfix');
      const panelPanel = document.createElement('div');
      panelPanel.classList.add('panel-panel', 'panel-col');
      const panelPane = document.createElement('div');
      panelPane.classList.add('panel-pane', 'pane-custom'); // Add specific pane-N class if needed, e.g., pane-1
      const paneContent = document.createElement('div');
      paneContent.classList.add('pane-content');

      // Move the authored subList into the paneContent
      paneContent.append(subList);

      // Transform nested lists for accordion behavior
      subList.querySelectorAll('li').forEach((subLi) => {
        const nestedUl = subLi.querySelector(':scope > ul');
        if (nestedUl) {
          nestedUl.remove(); // Remove to re-wrap
          const subWrap = document.createElement('div');
          subWrap.classList.add('has-sub-child'); // Based on original HTML structure
          subWrap.append(nestedUl);
          subLi.append(subWrap);

          const subTrigger = subLi.querySelector(':scope > a') || subLi;
          subTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevents parent accordion from toggling
            subLi.classList.toggle('active');
            subWrap.classList.toggle('active'); // Toggle 'active' on the wrapper
          });
        }
      });

      panelPane.append(paneContent);
      panelPanel.append(panelPane);
      panelDisplay.append(panelPanel);
      subMenuContainer.append(panelDisplay);
      subMenu.append(subMenuContainer);
      li.append(subMenu);

      // Add event listener for main menu item toggle
      titleLink.addEventListener('click', (e) => {
        e.preventDefault();
        li.classList.toggle('active');
        subMenu.classList.toggle('active'); // Use 'active' for visibility, controlled by CSS
      });

    } else {
      // Simple flat link
      const anchor = document.createElement('a');
      anchor.classList.add('title-link');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim();
      li.append(anchor);
    }
    mainMenu.append(li);
  });

  // Mobile menu toggle functionality
  navIcon4.addEventListener('click', () => {
    navIcon4.classList.toggle('open');
    menuContainer.classList.toggle('show');
    document.body.classList.toggle('menu-open'); // Example class for body overflow
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
