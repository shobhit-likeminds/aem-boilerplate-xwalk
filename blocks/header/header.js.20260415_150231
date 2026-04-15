import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    internalHomeLinkRow,
    internalHomeLinkLabelRow,
    mobileHomeLinkRow,
    mobileHomeLinkLabelRow,
    ...navItemRows
  ] = [...block.children];

  block.textContent = '';

  const containerMenuTop = document.createElement('div');
  containerMenuTop.classList.add('container-menu-top');

  const nav = document.createElement('nav');
  nav.classList.add('port-menu', 'clearfix');
  containerMenuTop.append(nav);

  const mobileHeaderContainer = document.createElement('div');
  mobileHeaderContainer.classList.add('container', 'mobile-header');
  nav.append(mobileHeaderContainer);

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-container');
  const logoFoundLink = logoLinkRow.querySelector('a');
  if (logoFoundLink) {
    logoLink.href = logoFoundLink.href;
    logoLink.title = logoLinkLabelRow.children[0].textContent.trim();
  }
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, logoLink);
  moveInstrumentation(logoLinkRow, logoLink);
  moveInstrumentation(logoLinkLabelRow, logoLink);
  mobileHeaderContainer.append(logoLink);

  // Close menu on logo click
  logoLink.addEventListener('click', () => {
    const menuContainer = document.querySelector('.menu-container');
    const navIcon4 = document.getElementById('nav-icon4');
    if (menuContainer && navIcon4) {
      menuContainer.classList.remove('open');
      document.body.classList.remove('menu-open');
      navIcon4.classList.remove('open');
    }
  });


  // Hamburger menu for mobile
  const showMenuDiv = document.createElement('div');
  showMenuDiv.classList.add('visible-sm', 'visible-xs', 'clearfix', 'show-menu');
  mobileHeaderContainer.append(showMenuDiv);

  const btnHumbeger = document.createElement('div');
  btnHumbeger.classList.add('btn-humbeger');
  showMenuDiv.append(btnHumbeger);

  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  navIcon4.classList.add('btn-bars');
  btnHumbeger.append(navIcon4);
  for (let i = 0; i < 3; i += 1) {
    navIcon4.append(document.createElement('span'));
  }

  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menu-container');
  nav.append(menuContainer);

  const menuLeft = document.createElement('div');
  menuLeft.classList.add('menu-left');
  menuContainer.append(menuLeft);

  const mainMenu = document.createElement('ul');
  mainMenu.classList.add('main-menu');
  menuLeft.append(mainMenu);

  navItemRows.forEach((row) => {
    const [labelCell, linkCell, linkLabelCell, subLinksCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');
    if (subList) {
      li.classList.add('has-submenu');
      const titleLink = document.createElement('a');
      titleLink.classList.add('title-link');
      titleLink.href = linkCell?.querySelector('a')?.href || '#';
      titleLink.textContent = labelCell.textContent.trim();

      const arrowMenu = document.createElement('span');
      arrowMenu.classList.add('arrow-menu', 'visible-xs', 'visible-sm');
      const arrowIcon = document.createElement('i');
      arrowIcon.classList.add('fa', 'fa-arrow-right');
      arrowMenu.append(arrowIcon);
      titleLink.append(arrowMenu);
      li.append(titleLink);

      const subMenu = document.createElement('div');
      subMenu.classList.add('sub-menu');
      const subMenuContainer = document.createElement('div');
      subMenuContainer.classList.add('container');
      subMenu.append(subMenuContainer);

      const panelDisplay = document.createElement('div');
      panelDisplay.classList.add('panel-display', 'panel-1col', 'clearfix');
      subMenuContainer.append(panelDisplay);

      const panelCol = document.createElement('div');
      panelCol.classList.add('panel-panel', 'panel-col');
      panelDisplay.append(panelCol);

      const panelPane = document.createElement('div');
      panelCol.append(panelPane);

      const paneContent = document.createElement('div');
      paneContent.classList.add('pane-content');
      paneContent.innerHTML = subLinksCell.innerHTML;
      panelPane.append(paneContent);

      li.append(subMenu);

      // Toggle submenu on click
      titleLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents parent accordion from also toggling
        li.classList.toggle('active');
        subMenu.classList.toggle('active'); // Use active class for CSS transitions
      });

      // Transform nested lists within sub-menu
      const transformNestedLists = (rootUl) => {
        rootUl.querySelectorAll('li').forEach(itemLi => {
          const nested = itemLi.querySelector(':scope > ul');
          if (nested) {
            nested.remove();
            const subWrap = document.createElement('div');
            subWrap.classList.add('has-sub-child'); // Use class from original site CSS
            subWrap.append(nested);
            itemLi.append(subWrap);

            const trigger = itemLi.querySelector(':scope > a') || itemLi;
            trigger.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              itemLi.classList.toggle('active');
              subWrap.classList.toggle('active');
            });
          }
        });
      };

      const blockMenu = paneContent.querySelector('.block-menu');
      if (blockMenu) {
        transformNestedLists(blockMenu);
      } else {
        const firstUl = paneContent.querySelector('ul');
        if (firstUl) {
          transformNestedLists(firstUl);
        }
      }

    } else {
      const titleLink = document.createElement('a');
      titleLink.classList.add('title-link');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) titleLink.href = foundLink.href;
      titleLink.textContent = linkLabelCell?.textContent.trim() || labelCell.textContent.trim();

      const arrowMenu = document.createElement('span');
      arrowMenu.classList.add('arrow-menu', 'visible-xs', 'visible-sm');
      titleLink.append(arrowMenu);
      li.append(titleLink);
    }
    mainMenu.append(li);
  });

  const menuRight = document.createElement('div');
  menuRight.classList.add('menu-right', 'steel');
  menuContainer.append(menuRight);

  const mainMenuRight = document.createElement('ul');
  mainMenuRight.classList.add('main-menu-right');
  menuRight.append(mainMenuRight);

  // Internal Home Link
  const internalHomeLi = document.createElement('li');
  internalHomeLi.classList.add('internal-home');
  const internalHomeLink = document.createElement('a');
  const internalHomeFoundLink = internalHomeLinkRow.querySelector('a');
  if (internalHomeFoundLink) {
    internalHomeLink.href = internalHomeFoundLink.href;
  }
  const homeIcon = document.createElement('i');
  homeIcon.classList.add('fa', 'fa-home', 'blue');
  internalHomeLink.append(homeIcon);
  moveInstrumentation(internalHomeLinkRow, internalHomeLink);
  moveInstrumentation(internalHomeLinkLabelRow, internalHomeLink);
  internalHomeLi.append(internalHomeLink);
  menuRight.append(internalHomeLi);

  // Close menu on internal home link click
  internalHomeLink.addEventListener('click', () => {
    const menuContainer = document.querySelector('.menu-container');
    const navIcon4 = document.getElementById('nav-icon4');
    if (menuContainer && navIcon4) {
      menuContainer.classList.remove('open');
      document.body.classList.remove('menu-open');
      navIcon4.classList.remove('open');
    }
  });

  // Mobile Home Link (for the mobile search block)
  const mobileHomeDiv = document.createElement('div');
  mobileHomeDiv.classList.add('visible-xs', 'visible-sm');
  const blockMobileSearch = document.createElement('div');
  blockMobileSearch.classList.add('block-mobile-search');
  mobileHomeDiv.append(blockMobileSearch);

  const homeSearch = document.createElement('div');
  homeSearch.classList.add('home-search');
  blockMobileSearch.append(homeSearch);

  const mobileHomeAnchor = document.createElement('a');
  mobileHomeAnchor.classList.add('icon-home');
  const mobileHomeFoundLink = mobileHomeLinkRow.querySelector('a');
  if (mobileHomeFoundLink) {
    mobileHomeAnchor.href = mobileHomeFoundLink.href;
  }
  const mobileHomeIcon = document.createElement('i');
  mobileHomeIcon.classList.add('fa', 'fa-home', 'white');
  mobileHomeAnchor.append(mobileHomeIcon);
  moveInstrumentation(mobileHomeLinkRow, mobileHomeAnchor);
  moveInstrumentation(mobileHomeLinkLabelRow, mobileHomeAnchor);
  homeSearch.append(mobileHomeAnchor);

  // Close menu on mobile home link click
  mobileHomeAnchor.addEventListener('click', () => {
    const menuContainer = document.querySelector('.menu-container');
    const navIcon4 = document.getElementById('nav-icon4');
    if (menuContainer && navIcon4) {
      menuContainer.classList.remove('open');
      document.body.classList.remove('menu-open');
      navIcon4.classList.remove('open');
    }
  });

  // Mobile search (placeholder, not fully functional as per rules)
  const searchMobile = document.createElement('div');
  searchMobile.classList.add('search-mobile');
  const autoCompleteSearch = document.createElement('div');
  autoCompleteSearch.id = 'auto-complete-search';
  autoCompleteSearch.classList.add('header-search');
  searchMobile.append(autoCompleteSearch);
  const searchInputWrapper = document.createElement('span');
  searchInputWrapper.classList.add('twitter-typeahead');
  searchInputWrapper.style.position = 'relative';
  searchInputWrapper.style.display = 'inline-block';
  autoCompleteSearch.append(searchInputWrapper);
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('jsw_typeahead', 'tt-input');
  searchInput.placeholder = 'Search JSW';
  searchInput.autocomplete = 'off';
  searchInput.spellcheck = false;
  searchInput.dir = 'auto';
  searchInputWrapper.append(searchInput);
  const searchIcon = document.createElement('a');
  searchIcon.href = 'javascript:;';
  searchIcon.classList.add('icon-search');
  const faSearch = document.createElement('i');
  faSearch.classList.add('fa', 'fa-search');
  searchIcon.append(faSearch);
  homeSearch.append(searchMobile, searchIcon);
  blockMobileSearch.append(homeSearch);

  // Follow us section (placeholder)
  const followUs = document.createElement('div');
  followUs.classList.add('follow-us', 'clearfix');
  const txtFollow = document.createElement('span');
  txtFollow.classList.add('txt-follow');
  txtFollow.textContent = 'follow us';
  followUs.append(txtFollow);
  const linkSocial = document.createElement('div');
  linkSocial.classList.add('link-social');
  ['twitter', 'facebook', 'youtube', 'linkedin'].forEach(social => {
    const socialLink = document.createElement('a');
    socialLink.href = '#'; // Placeholder, actual links would come from model if available
    socialLink.target = '_blank';
    const socialIcon = document.createElement('i');
    socialIcon.classList.add('fa', `fa-${social}`);
    socialLink.append(socialIcon);
    linkSocial.append(socialLink);
  });
  followUs.append(linkSocial);
  blockMobileSearch.append(followUs);
  menuContainer.append(mobileHomeDiv);


  // Hamburger menu click listener
  navIcon4.addEventListener('click', () => {
    navIcon4.classList.toggle('open');
    menuContainer.classList.toggle('open'); // Assuming 'open' class controls visibility
    document.body.classList.toggle('menu-open'); // Add a class to body for overflow hidden
  });


  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.append(containerMenuTop);
}
