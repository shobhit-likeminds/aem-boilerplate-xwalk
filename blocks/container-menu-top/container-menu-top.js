import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.classList.add('port-menu', 'clearfix');

  const containerMobileHeader = document.createElement('div');
  containerMobileHeader.classList.add('container', 'mobile-header');

  // Use content detection for item types
  const allRows = [...block.children];
  const logoItems = allRows.filter(row => row.children.length === 2 && row.children[1].querySelector('picture'));
  const menuLinkItems = allRows.filter(row => row.children.length === 3);
  const socialLinkItems = allRows.filter(row => row.children.length === 1 && row.querySelector('a')); // Ensure it's a social link

  // --- Logo Section ---
  if (logoItems.length > 0) {
    const logoRow = logoItems[0]; // Assuming only one logo for the main header
    const cells = [...logoRow.children];
    const logoLinkCell = cells.find(cell => cell.querySelector('a'));
    const logoImageCell = cells.find(cell => cell.querySelector('picture'));

    const logoLink = logoLinkCell ? logoLinkCell.querySelector('a') : null;
    const logoPicture = logoImageCell ? logoImageCell.querySelector('picture') : null;
    const logoImg = logoPicture ? logoPicture.querySelector('img') : null;

    const logoContainer = document.createElement('a');
    logoContainer.classList.add('logo-container');
    if (logoLink) {
      logoContainer.href = logoLink.href;
      logoContainer.title = 'Home'; // Hardcoded based on original HTML, adjust if dynamic
    }

    if (logoImg) {
      const optimizedPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(logoImg, optimizedPic.querySelector('img'));
      logoContainer.append(optimizedPic);
    }
    moveInstrumentation(logoRow, logoContainer);
    containerMobileHeader.append(logoContainer);
  }

  // --- Mobile Menu Toggle ---
  const visibleSmXsShowMenu = document.createElement('div');
  visibleSmXsShowMenu.classList.add('visible-sm', 'visible-xs', 'clearfix', 'show-menu');

  const btnHumbeger = document.createElement('div');
  btnHumbeger.classList.add('btn-humbeger');
  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  navIcon4.classList.add('btn-bars');
  navIcon4.innerHTML = '<span></span><span></span><span></span>';
  btnHumbeger.append(navIcon4);
  visibleSmXsShowMenu.append(btnHumbeger);
  containerMobileHeader.append(visibleSmXsShowMenu);

  // --- Menu Container ---
  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menu-container');

  const menuLeft = document.createElement('div');
  menuLeft.classList.add('menu-left');
  const mainMenuLeft = document.createElement('ul');
  mainMenuLeft.classList.add('main-menu');
  menuLeft.append(mainMenuLeft);

  const menuRight = document.createElement('div');
  menuRight.classList.add('menu-right', 'steel');
  const mainMenuRight = document.createElement('ul');
  mainMenuRight.classList.add('main-menu-right');
  menuRight.append(mainMenuRight);

  // Separate menu links into left and right based on original HTML structure
  const leftMenuCount = 8; // Based on original HTML structure
  menuLinkItems.forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const labelCell = cells[0]; // First cell is always label
    const linkCell = cells[1];   // Second cell is always link
    const subLinksCell = cells[2]; // Third cell is always sub-links container

    const linkEl = linkCell.querySelector('a') || document.createElement('a');
    if (!linkEl.href) linkEl.href = '#'; // Default if no link is provided
    linkEl.classList.add('title-link');
    linkEl.textContent = labelCell.textContent;

    const subLinksContent = subLinksCell.textContent.trim();
    if (subLinksContent) {
      li.classList.add('has-submenu');
      const arrowMenu = document.createElement('span');
      arrowMenu.classList.add('arrow-menu', 'visible-xs', 'visible-sm');
      const arrowIcon = document.createElement('i');
      arrowIcon.classList.add('fa', 'fa-arrow-right');
      arrowMenu.append(arrowIcon);
      linkEl.append(arrowMenu);

      const subMenu = document.createElement('div');
      subMenu.classList.add('sub-menu');
      const subMenuContainer = document.createElement('div');
      subMenuContainer.classList.add('container');
      subMenu.append(subMenuContainer);

      if (subLinksContent !== 'Sub Links value') { // Check if it's not the default placeholder
        const section = document.createElement('section'); // Use section as per original HTML for investor zone
        const panelPane = document.createElement('div');
        panelPane.classList.add('panel-pane', 'pane-custom', `pane-${index + 1}`);
        const paneContent = document.createElement('div');
        paneContent.classList.add('pane-content');

        // Assuming subLinksContent might contain HTML for a block-menu or other complex structure
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = subLinksCell.innerHTML; // Use innerHTML to preserve structure
        const blockMenu = tempDiv.querySelector('.block-menu');
        const listingMenu = tempDiv.querySelector('.listing-menu');

        if (blockMenu) {
          paneContent.append(blockMenu);
        } else if (listingMenu) {
          paneContent.append(listingMenu);
        } else {
          // Fallback if it's just text or simple HTML
          paneContent.innerHTML = subLinksCell.innerHTML;
        }

        panelPane.append(paneContent);
        section.append(panelPane);
        subMenuContainer.append(section);
      }
      li.append(subMenu);
    }

    li.prepend(linkEl);

    if (index < leftMenuCount) {
      mainMenuLeft.append(li);
    } else {
      mainMenuRight.append(li);
    }
  });

  menuContainer.append(menuLeft);

  // --- Internal Home Link (static based on original HTML) ---
  const internalHome = document.createElement('div');
  internalHome.classList.add('internal-home');
  const internalHomeLink = document.createElement('a');
  internalHomeLink.href = 'https://group.jsw.in';
  const homeIcon = document.createElement('i');
  homeIcon.classList.add('fa', 'fa-home', 'blue');
  internalHomeLink.append(homeIcon);
  internalHome.append(internalHomeLink);
  menuRight.append(internalHome);

  menuContainer.append(menuRight);

  // --- Mobile Search and Social ---
  const visibleXsSmMobile = document.createElement('div');
  visibleXsSmMobile.classList.add('visible-xs', 'visible-sm');

  const blockMobileSearch = document.createElement('div');
  blockMobileSearch.classList.add('block-mobile-search');

  const homeSearch = document.createElement('div');
  homeSearch.classList.add('home-search');

  const iconHomeLink = document.createElement('a');
  iconHomeLink.href = '/';
  iconHomeLink.classList.add('icon-home');
  const iconHome = document.createElement('i');
  iconHome.classList.add('fa', 'fa-home', 'white');
  iconHomeLink.append(iconHome);
  homeSearch.append(iconHomeLink);

  const searchMobile = document.createElement('div');
  searchMobile.classList.add('search-mobile');
  const headerSearch = document.createElement('div');
  headerSearch.id = 'auto-complete-search';
  headerSearch.classList.add('header-search');
  // Simplified search input for EDS
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('jsw_typeahead', 'tt-input');
  searchInput.placeholder = 'Search JSW';
  searchInput.autocomplete = 'off';
  searchInput.spellcheck = false;
  searchInput.dir = 'auto';
  searchInput.style.position = 'relative';
  searchInput.style.verticalAlign = 'top';
  searchInput.style.backgroundColor = 'transparent';

  const searchIconLink = document.createElement('a');
  searchIconLink.href = 'javascript:;';
  searchIconLink.classList.add('icon-search');
  const searchIcon = document.createElement('i');
  searchIcon.classList.add('fa', 'fa-search');
  searchIconLink.append(searchIcon);

  headerSearch.append(searchInput, searchIconLink);
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

  socialLinkItems.forEach((row) => {
    // FIXED: Using content detection instead of index access
    const cells = [...row.children];
    const socialLinkCell = cells.find(cell => cell.querySelector('a'));
    const socialAnchor = socialLinkCell.querySelector('a');
    if (socialAnchor) {
      const socialHref = socialAnchor.href;
      const socialIcon = document.createElement('i');
      // Determine icon based on href (heuristic)
      if (socialHref.includes('twitter')) socialIcon.classList.add('fa', 'fa-twitter');
      else if (socialHref.includes('facebook')) socialIcon.classList.add('fa', 'fa-facebook');
      else if (socialHref.includes('youtube')) socialIcon.classList.add('fa', 'fa-youtube');
      else if (socialHref.includes('linkedin')) socialIcon.classList.add('fa', 'fa-linkedin');
      else socialIcon.classList.add('fa', 'fa-globe'); // Default icon, though not in original HTML

      const socialLinkEl = document.createElement('a');
      socialLinkEl.href = socialHref;
      socialLinkEl.target = '_blank';
      socialLinkEl.append(socialIcon);
      moveInstrumentation(row, socialLinkEl);
      linkSocial.append(socialLinkEl);
    }
  });
  followUs.append(linkSocial);
  blockMobileSearch.append(followUs);
  visibleXsSmMobile.append(blockMobileSearch);
  menuContainer.append(visibleXsSmMobile);

  containerMobileHeader.append(menuContainer);
  nav.append(containerMobileHeader);

  // Toggle functionality for mobile menu
  navIcon4.addEventListener('click', () => {
    menuContainer.classList.toggle('show');
    navIcon4.classList.toggle('open');
  });

  // Toggle functionality for submenus on mobile
  mainMenuLeft.querySelectorAll('.has-submenu > .title-link, .main-menu-right .has-submenu > .title-link').forEach((titleLink) => {
    titleLink.addEventListener('click', (e) => {
      // Only toggle if on mobile (visible-xs, visible-sm)
      // Check if the arrow-menu is visible, which indicates mobile view
      const arrowMenu = titleLink.querySelector('.arrow-menu');
      if (arrowMenu && window.getComputedStyle(arrowMenu).display !== 'none') {
        e.preventDefault();
        const parentLi = titleLink.closest('li.has-submenu');
        parentLi.classList.toggle('open');
        const subMenu = parentLi.querySelector('.sub-menu');
        if (subMenu) {
          subMenu.classList.toggle('show');
        }
      }
    });
  });

  block.textContent = '';
  block.append(nav);
}
