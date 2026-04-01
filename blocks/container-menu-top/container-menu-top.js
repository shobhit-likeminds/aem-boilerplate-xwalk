import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoImageRow, logoLinkRow, ...itemRows] = [...block.children];

  const nav = document.createElement('nav');
  nav.classList.add('port-menu', 'clearfix');

  const containerMobileHeader = document.createElement('div');
  containerMobileHeader.classList.add('container', 'mobile-header');

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-container');
  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) {
    logoLink.href = logoAnchor.href;
    logoLink.title = logoAnchor.title || 'Home';
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  } else {
    // Fallback if no picture, append original content
    while (logoImageRow.firstChild) logoLink.append(logoImageRow.firstChild);
  }
  containerMobileHeader.append(logoLink);


  // Hamburger menu for mobile
  const visibleSmXs = document.createElement('div');
  visibleSmXs.classList.add('visible-sm', 'visible-xs', 'clearfix', 'show-menu');
  const btnHumbeger = document.createElement('div');
  btnHumbeger.classList.add('btn-humbeger');
  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  navIcon4.classList.add('btn-bars');
  for (let i = 0; i < 3; i += 1) {
    navIcon4.append(document.createElement('span'));
  }
  btnHumbeger.append(navIcon4);
  visibleSmXs.append(btnHumbeger);
  containerMobileHeader.append(visibleSmXs);

  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menu-container');

  const menuLeft = document.createElement('div');
  menuLeft.classList.add('menu-left');
  const mainMenu = document.createElement('ul');
  mainMenu.classList.add('main-menu');
  menuLeft.append(mainMenu);

  const menuRight = document.createElement('div');
  menuRight.classList.add('menu-right', 'steel');
  const mainMenuRight = document.createElement('ul');
  mainMenuRight.classList.add('main-menu-right');
  menuRight.append(mainMenuRight);

  // Distinguish menu items from social links based on cell count
  const menuItems = itemRows.filter((row) => [...row.children].length === 4);
  const socialLinks = itemRows.filter((row) => [...row.children].length === 1);

  menuItems.forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('has-submenu');

    const titleCell = cells[0];
    const linkCell = cells[1];
    const submenuCell = cells[2];
    const imageCell = cells[3];

    const titleLink = document.createElement('a');
    titleLink.classList.add('title-link');
    const linkEl = linkCell.querySelector('a');
    if (linkEl) {
      titleLink.href = linkEl.href;
      titleLink.textContent = titleCell.textContent;
    } else {
      titleLink.href = '#';
      titleLink.textContent = titleCell.textContent;
    }
    const arrowMenuSpan = document.createElement('span');
    arrowMenuSpan.classList.add('arrow-menu', 'visible-xs', 'visible-sm');
    const arrowIcon = document.createElement('i');
    arrowIcon.classList.add('fa', 'fa-arrow-right');
    arrowMenuSpan.append(arrowIcon);
    titleLink.append(arrowMenuSpan);
    li.append(titleLink);

    if (submenuCell.textContent.trim() || imageCell.querySelector('picture')) {
      const subMenu = document.createElement('div');
      subMenu.classList.add('sub-menu');
      const subMenuContainer = document.createElement('div');
      subMenuContainer.classList.add('container');
      subMenu.append(subMenuContainer);

      const panelDisplay = document.createElement('div');
      panelDisplay.classList.add('panel-display', 'panel-1col', 'clearfix');
      const panelPanel = document.createElement('div');
      panelPanel.classList.add('panel-panel', 'panel-col');
      const panelPane = document.createElement('div');
      panelPane.classList.add('panel-pane', 'pane-custom'); // Add specific pane-N class if needed
      const paneContent = document.createElement('div');
      paneContent.classList.add('pane-content');
      const blockMenu = document.createElement('ul');
      blockMenu.classList.add('block-menu');

      // Submenu content from submenuCell
      const submenuItem = document.createElement('li');
      const submenuItemLink = document.createElement('a');
      submenuItemLink.href = '#'; // Placeholder, actual link from sub-items if they exist
      const submenuTitleSpan = document.createElement('span');
      submenuTitleSpan.classList.add('title');
      submenuTitleSpan.textContent = submenuCell.textContent.trim();
      submenuItemLink.append(submenuTitleSpan);

      const menuImage = imageCell.querySelector('picture');
      if (menuImage) {
        const img = menuImage.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        submenuItemLink.append(optimizedPic);
      }
      submenuItem.append(submenuItemLink);
      blockMenu.append(submenuItem);

      paneContent.append(blockMenu);
      panelPane.append(paneContent);
      panelPanel.append(panelPane);
      panelDisplay.append(panelPanel);
      subMenuContainer.append(panelDisplay);
      li.append(subMenu);
    }
    mainMenu.append(li);
  });

  // Social links for main menu right
  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const linkCell = cells[0];
    const socialLinkAnchor = linkCell.querySelector('a');
    if (socialLinkAnchor) {
      const socialLink = document.createElement('a');
      socialLink.classList.add('title-link');
      socialLink.href = socialLinkAnchor.href;
      socialLink.target = '_blank';
      socialLink.textContent = socialLinkAnchor.textContent;
      li.append(socialLink);
    }
    mainMenuRight.append(li);
  });

  // Internal Home Link
  const internalHome = document.createElement('div');
  internalHome.classList.add('internal-home');
  const homeLink = document.createElement('a');
  homeLink.href = 'https://group.jsw.in';
  const homeIcon = document.createElement('i');
  homeIcon.classList.add('fa', 'fa-home', 'blue');
  homeLink.append(homeIcon);
  internalHome.append(homeLink);
  menuRight.append(internalHome);

  menuContainer.append(menuLeft, menuRight);
  containerMobileHeader.append(menuContainer);

  // Mobile search and social links
  const mobileVisibleSmXs = document.createElement('div');
  mobileVisibleSmXs.classList.add('visible-xs', 'visible-sm');
  const blockMobileSearch = document.createElement('div');
  blockMobileSearch.classList.add('block-mobile-search');
  const homeSearch = document.createElement('div');
  homeSearch.classList.add('home-search');
  const iconHome = document.createElement('a');
  iconHome.href = '/';
  iconHome.classList.add('icon-home');
  const homeIconWhite = document.createElement('i');
  homeIconWhite.classList.add('fa', 'fa-home', 'white');
  iconHome.append(homeIconWhite);
  homeSearch.append(iconHome);

  const searchMobile = document.createElement('div');
  searchMobile.classList.add('search-mobile');
  const headerSearch = document.createElement('div');
  headerSearch.id = 'auto-complete-search';
  headerSearch.classList.add('header-search');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('jsw_typeahead', 'tt-input');
  searchInput.placeholder = 'Search JSW';
  headerSearch.append(searchInput);
  const searchIconLink = document.createElement('a');
  searchIconLink.href = 'javascript:;';
  searchIconLink.classList.add('icon-search');
  const searchIcon = document.createElement('i');
  searchIcon.classList.add('fa', 'fa-search');
  searchIconLink.append(searchIcon);
  headerSearch.append(searchIconLink);
  searchMobile.append(headerSearch);
  homeSearch.append(searchMobile);
  blockMobileSearch.append(homeSearch);

  const followUs = document.createElement('div');
  followUs.classList.add('follow-us', 'clearfix');
  const txtFollow = document.createElement('span');
  txtFollow.classList.add('txt-follow');
  txtFollow.textContent = 'follow us';
  followUs.append(txtFollow);
  const linkSocial = document.createElement('div');
  linkSocial.classList.add('link-social');

  // Social links from the model
  const socialIcons = {
    twitter: 'fa-twitter',
    facebook: 'fa-facebook',
    youtube: 'fa-youtube',
    linkedin: 'fa-linkedin',
  };

  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells[0];
    const socialLinkAnchor = linkCell.querySelector('a');
    if (socialLinkAnchor) {
      const socialLink = document.createElement('a');
      socialLink.href = socialLinkAnchor.href;
      socialLink.target = '_blank';
      const socialIcon = document.createElement('i');
      const href = socialLinkAnchor.href.toLowerCase();
      Object.keys(socialIcons).forEach((platform) => {
        if (href.includes(platform)) {
          socialIcon.classList.add('fa', socialIcons[platform]);
        }
      });
      socialLink.append(socialIcon);
      linkSocial.append(socialLink);
    }
  });

  followUs.append(linkSocial);
  blockMobileSearch.append(followUs);
  mobileVisibleSmXs.append(blockMobileSearch);
  containerMobileHeader.append(mobileVisibleSmXs);

  nav.append(containerMobileHeader);

  // Toggle functionality for hamburger menu
  navIcon4.addEventListener('click', () => {
    navIcon4.classList.toggle('open');
    menuContainer.classList.toggle('show');
    mobileVisibleSmXs.classList.toggle('show');
  });

  // Toggle for submenu items
  [...mainMenu.querySelectorAll('li.has-submenu > a.title-link')].forEach((link) => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 991) { // Apply only on mobile/tablet
        e.preventDefault();
        const parentLi = link.closest('li.has-submenu');
        parentLi.classList.toggle('active');
        const subMenu = parentLi.querySelector('.sub-menu');
        if (subMenu) {
          subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
        }
        const arrow = link.querySelector('.arrow-menu i');
        if (arrow) {
          arrow.classList.toggle('fa-arrow-right');
          arrow.classList.toggle('fa-arrow-down');
        }
      }
    });
  });

  // Event listener for mobile search icon
  searchIconLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Implement search functionality or toggle search input visibility
    // For example, toggle a class on headerSearch to show/hide the input
    headerSearch.classList.toggle('active-search'); // Assuming 'active-search' class controls visibility
    searchInput.focus();
  });

  block.textContent = '';
  block.append(nav);
}
