import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, ...itemRows] = [...block.children];

  const nav = document.createElement('nav');
  nav.classList.add('port-menu', 'clearfix');

  const containerMobileHeader = document.createElement('div');
  containerMobileHeader.classList.add('container', 'mobile-header');

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-container');
  const logoCell = logoRow.firstElementChild;
  const logoPicture = logoCell.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      // Use the href from the original HTML if available, otherwise default to '/'
      const originalLogoLink = logoCell.querySelector('a');
      logoLink.href = originalLogoLink ? originalLogoLink.href : '/';
      logoLink.title = 'Home';
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, logoLink);
  containerMobileHeader.append(logoLink);

  // Hamburger menu
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
  const mainMenuLeft = document.createElement('ul');
  mainMenuLeft.classList.add('main-menu');
  menuLeft.append(mainMenuLeft);

  const menuRight = document.createElement('div');
  menuRight.classList.add('menu-right', 'steel');
  const mainMenuRight = document.createElement('ul');
  mainMenuRight.classList.add('main-menu-right');
  menuRight.append(mainMenuRight);

  // Filter menu items and social links based on cell count
  const menuItems = itemRows.filter((row) => [...row.children].length === 3);
  const socialLinks = itemRows.filter((row) => [...row.children].length === 1);

  menuItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const labelCell = cells.find((cell) => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim() !== '' && cell.children.length === 0);
    const linkCell = cells.find((cell) => cell.querySelector('a'));
    const submenuItemsCell = cells.find((cell) => cell.children.length > 0 && !cell.querySelector('a') && !cell.querySelector('picture') && cell !== labelCell);

    const link = document.createElement('a');
    link.classList.add('title-link');
    if (linkCell && linkCell.querySelector('a')) {
      link.href = linkCell.querySelector('a').href;
      link.textContent = linkCell.querySelector('a').textContent;
    } else if (labelCell) {
      link.textContent = labelCell.textContent;
      link.href = '#'; // Default if no link provided
    }

    if (submenuItemsCell && submenuItemsCell.children.length > 0) {
      li.classList.add('has-submenu');
      const arrowSpan = document.createElement('span');
      arrowSpan.classList.add('arrow-menu', 'visible-xs', 'visible-sm');
      const arrowIcon = document.createElement('i');
      arrowIcon.classList.add('fa', 'fa-arrow-right');
      arrowSpan.append(arrowIcon);
      link.append(arrowSpan);

      const subMenuDiv = document.createElement('div');
      subMenuDiv.classList.add('sub-menu');
      const subMenuContainer = document.createElement('div');
      subMenuContainer.classList.add('container');
      subMenuDiv.append(subMenuContainer);

      const panelDisplay = document.createElement('div');
      panelDisplay.classList.add('panel-display', 'panel-1col', 'clearfix');
      const panelPanel = document.createElement('div');
      panelPanel.classList.add('panel-panel', 'panel-col');
      const panelPane = document.createElement('div');
      panelPane.classList.add('panel-pane', 'pane-custom', 'pane-1'); // Placeholder pane number
      const paneContent = document.createElement('div');
      paneContent.classList.add('pane-content');
      const blockMenuUl = document.createElement('ul');
      blockMenuUl.classList.add('block-menu');

      [...submenuItemsCell.children].forEach((subMenuItemRow) => {
        const subMenuItemLi = document.createElement('li');
        const subMenuItemLink = document.createElement('a');

        const subMenuItemCells = [...subMenuItemRow.children];
        const subLabelCell = subMenuItemCells.find((cell) => !cell.querySelector('a') && !cell.querySelector('picture'));
        const subLinkCell = subMenuItemCells.find((cell) => cell.querySelector('a'));
        const subImageCell = subMenuItemCells.find((cell) => cell.querySelector('picture'));

        if (subLinkCell && subLinkCell.querySelector('a')) {
          subMenuItemLink.href = subLinkCell.querySelector('a').href;
        } else {
          subMenuItemLink.href = '#';
        }

        const titleSpan = document.createElement('span');
        titleSpan.classList.add('title');
        if (subLabelCell) {
          titleSpan.textContent = subLabelCell.textContent;
        }
        subMenuItemLink.append(titleSpan);

        if (subImageCell && subImageCell.querySelector('picture')) {
          const img = subImageCell.querySelector('picture').querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            subMenuItemLink.append(optimizedPic);
          }
        }
        subMenuItemLi.append(subMenuItemLink);
        blockMenuUl.append(subMenuItemLi);
      });

      paneContent.append(blockMenuUl);
      panelPane.append(paneContent);
      panelPanel.append(panelPane);
      panelDisplay.append(panelPanel);
      subMenuContainer.append(panelDisplay);
      li.append(subMenuDiv);
    }

    li.prepend(link);
    mainMenuLeft.append(li);
  });

  socialLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const linkCell = [...row.children].find((cell) => cell.querySelector('a'));
    if (linkCell && linkCell.querySelector('a')) {
      const socialLink = document.createElement('a');
      socialLink.classList.add('title-link');
      socialLink.href = linkCell.querySelector('a').href;
      socialLink.textContent = linkCell.querySelector('a').textContent; // Or use an icon based on href
      li.append(socialLink);
      mainMenuRight.append(li);
    }
  });

  // Mobile search and social links
  const mobileSearchDiv = document.createElement('div');
  mobileSearchDiv.classList.add('visible-xs', 'visible-sm');
  const blockMobileSearch = document.createElement('div');
  blockMobileSearch.classList.add('block-mobile-search');
  const homeSearch = document.createElement('div');
  homeSearch.classList.add('home-search');

  const iconHome = document.createElement('a');
  iconHome.href = '/';
  iconHome.classList.add('icon-home');
  const homeIcon = document.createElement('i');
  homeIcon.classList.add('fa', 'fa-home', 'white');
  iconHome.append(homeIcon);
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
  searchInput.autocomplete = 'off';
  searchInput.spellcheck = false;
  searchInput.dir = 'auto';
  searchInput.style.position = 'relative';
  searchInput.style.verticalAlign = 'top';
  searchInput.style.backgroundColor = 'transparent';

  const iconSearch = document.createElement('a');
  iconSearch.href = 'javascript:;';
  iconSearch.classList.add('icon-search');
  const searchIcon = document.createElement('i');
  searchIcon.classList.add('fa', 'fa-search');
  iconSearch.append(searchIcon);

  headerSearch.append(searchInput, iconSearch);
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

  socialLinks.forEach((row) => {
    const linkEl = row.querySelector('a');
    if (linkEl) {
      const socialAnchor = document.createElement('a');
      socialAnchor.href = linkEl.href;
      socialAnchor.target = '_blank';
      const socialIcon = document.createElement('i');

      if (linkEl.href.includes('twitter')) {
        socialIcon.classList.add('fa', 'fa-twitter');
      } else if (linkEl.href.includes('facebook')) {
        socialIcon.classList.add('fa', 'fa-facebook');
      } else if (linkEl.href.includes('youtube')) {
        socialIcon.classList.add('fa', 'fa-youtube');
      } else if (linkEl.href.includes('linkedin')) {
        socialIcon.classList.add('fa', 'fa-linkedin');
      } else {
        socialIcon.classList.add('fa', 'fa-link'); // Default icon
      }
      socialAnchor.append(socialIcon);
      linkSocial.append(socialAnchor);
    }
  });

  followUs.append(linkSocial);
  blockMobileSearch.append(followUs);
  mobileSearchDiv.append(blockMobileSearch);

  menuContainer.append(menuLeft, menuRight, mobileSearchDiv);
  containerMobileHeader.append(menuContainer);
  nav.append(containerMobileHeader);

  block.textContent = '';
  block.append(nav);

  // Toggle mobile menu
  navIcon4.addEventListener('click', () => {
    navIcon4.classList.toggle('open');
    menuContainer.classList.toggle('show');
    blockMobileSearch.classList.toggle('show');
  });

  // Toggle submenu for menu-left
  mainMenuLeft.querySelectorAll('.has-submenu > .title-link').forEach((titleLink) => {
    titleLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 991) { // Apply only for mobile/tablet
        e.preventDefault();
        const parentLi = titleLink.closest('li.has-submenu');
        parentLi.classList.toggle('active');
        const subMenu = parentLi.querySelector('.sub-menu');
        if (subMenu) {
          subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
        }
      }
    });
  });

  // Toggle submenu for menu-right (if any exist, though not in provided HTML)
  mainMenuRight.querySelectorAll('.has-submenu > .title-link').forEach((titleLink) => {
    titleLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 991) { // Apply only for mobile/tablet
        e.preventDefault();
        const parentLi = titleLink.closest('li.has-submenu');
        parentLi.classList.toggle('active');
        const subMenu = parentLi.querySelector('.sub-menu');
        if (subMenu) {
          subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
        }
      }
    });
  });

  // Toggle mobile search input visibility
  iconSearch.addEventListener('click', (e) => {
    e.preventDefault();
    searchInput.classList.toggle('show'); // Assuming 'show' class controls visibility
    // Optionally, focus the input when shown
    if (searchInput.classList.contains('show')) {
      searchInput.focus();
    }
  });
}
