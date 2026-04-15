import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...navItemRows] = [...block.children];

  const nav = document.createElement('nav');
  nav.classList.add('port-menu', 'clearfix');

  const containerMobileHeader = document.createElement('div');
  containerMobileHeader.classList.add('container', 'mobile-header');

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-container');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
    logoLink.title = logoLinkLabelRow.textContent.trim() || 'Home';
  } else {
    logoLink.href = '#';
    logoLink.title = logoLinkLabelRow.textContent.trim() || '';
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
  containerMobileHeader.append(logoLink);

  // Mobile Menu Toggler
  const visibleSmXs = document.createElement('div');
  visibleSmXs.classList.add('visible-sm', 'visible-xs', 'clearfix', 'show-menu');
  const btnHumbeger = document.createElement('div');
  btnHumbeger.classList.add('btn-humbeger');
  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  navIcon4.classList.add('btn-bars');
  navIcon4.innerHTML = '<span></span><span></span><span></span>';
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

  // Separate nav items into left and right menus based on original HTML structure
  // This assumes a fixed split point based on the original HTML's 8 left items and 6 right items
  const leftNavItems = navItemRows.slice(0, 8);
  const rightNavItems = navItemRows.slice(8);

  function transformNestedLists(rootUl) {
    rootUl.querySelectorAll('li').forEach(li => {
      const nested = li.querySelector(':scope > ul');
      if (nested) {
        nested.remove();
        const subWrap = document.createElement('div');
        subWrap.classList.add('has-sub-child'); // Use class from original site CSS
        subWrap.append(nested);
        li.append(subWrap);
        const trigger = li.querySelector(':scope > a') || li;
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
    });
  }

  leftNavItems.forEach((row) => {
    const [labelCell, linkCell, linkLabelCell, subLinksCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');
    if (subList) {
      li.classList.add('has-submenu');
      const titleLink = document.createElement('a');
      titleLink.classList.add('title-link');
      titleLink.href = linkCell?.querySelector('a')?.href || '#';
      titleLink.textContent = labelCell?.textContent.trim();
      titleLink.innerHTML += '<span class="arrow-menu visible-xs visible-sm"><i class="fa fa-arrow-right"></i></span>';
      li.append(titleLink);

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
      panelPane.classList.add('panel-pane', 'pane-custom'); // Original HTML has pane-1, pane-2 etc.
      const paneContent = document.createElement('div');
      paneContent.classList.add('pane-content');

      paneContent.append(subList);
      transformNestedLists(subList);

      panelPane.append(paneContent);
      panelPanel.append(panelPane);
      panelDisplay.append(panelPanel);
      subMenuContainer.append(panelDisplay);
      li.append(subMenu);

      titleLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active');
      });
    } else {
      const titleLink = document.createElement('a');
      titleLink.classList.add('title-link');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) titleLink.href = foundLink.href;
      titleLink.textContent = linkLabelCell?.textContent.trim() || labelCell.textContent.trim();
      li.append(titleLink);
    }
    mainMenuLeft.append(li);
  });

  rightNavItems.forEach((row) => {
    const [labelCell, linkCell, linkLabelCell, subLinksCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');
    if (subList) {
      li.classList.add('has-submenu');
      const titleLink = document.createElement('a');
      titleLink.classList.add('title-link');
      titleLink.href = linkCell?.querySelector('a')?.href || '#';
      titleLink.textContent = labelCell?.textContent.trim();
      titleLink.innerHTML += '<span class="arrow-menu visible-xs visible-sm"><i class="fa fa-arrow-right"></i></span>';
      li.append(titleLink);

      const subMenu = document.createElement('div');
      subMenu.classList.add('sub-menu');
      const subMenuContainer = document.createElement('div');
      subMenuContainer.classList.add('container');
      subMenu.append(subMenuContainer);

      const section = document.createElement('section');
      const panelPane = document.createElement('div');
      panelPane.classList.add('panel-pane', 'pane-custom');
      const paneContent = document.createElement('div');
      paneContent.classList.add('pane-content');
      const innerContainer = document.createElement('div');
      innerContainer.classList.add('container');
      const listingMenu = document.createElement('div');
      listingMenu.classList.add('clearfix', 'listing-menu');
      listingMenu.style.paddingTop = '0';

      listingMenu.append(subList);
      transformNestedLists(subList);

      innerContainer.append(listingMenu);
      paneContent.append(innerContainer);
      panelPane.append(paneContent);
      section.append(panelPane);
      subMenuContainer.append(section);
      li.append(subMenu);

      titleLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active');
      });
    } else {
      const titleLink = document.createElement('a');
      titleLink.classList.add('title-link');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) titleLink.href = foundLink.href;
      titleLink.textContent = linkLabelCell?.textContent.trim() || labelCell.textContent.trim();
      li.append(titleLink);
    }
    mainMenuRight.append(li);
  });

  // Internal Home Link
  const internalHome = document.createElement('div');
  internalHome.classList.add('internal-home');
  const internalHomeLink = document.createElement('a');
  internalHomeLink.href = 'https://group.jsw.in';
  internalHomeLink.innerHTML = '<i class="fa fa-home blue"></i>';
  internalHome.append(internalHomeLink);
  mainMenuRight.append(internalHome);

  menuContainer.append(menuLeft, menuRight);
  containerMobileHeader.append(menuContainer);

  // Mobile search and social links
  const mobileFooter = document.createElement('div');
  mobileFooter.classList.add('visible-xs', 'visible-sm');
  const blockMobileSearch = document.createElement('div');
  blockMobileSearch.classList.add('block-mobile-search');

  const homeSearch = document.createElement('div');
  homeSearch.classList.add('home-search');
  const iconHomeLink = document.createElement('a');
  iconHomeLink.href = '/';
  iconHomeLink.classList.add('icon-home');
  iconHomeLink.innerHTML = '<i class="fa fa-home white"></i>';
  homeSearch.append(iconHomeLink);

  const searchMobile = document.createElement('div');
  searchMobile.classList.add('search-mobile');
  const headerSearch = document.createElement('div');
  headerSearch.id = 'auto-complete-search';
  headerSearch.classList.add('header-search');
  headerSearch.innerHTML = `
    <div style="display:none;">
      <form autocomplete="off" action="/steel/tmt-bars" method="post" id="search-block-form--2" accept-charset="UTF-8">
        <div>
          <div class="form-item form-type-textfield form-item-search-block-form" role="application">
            <label class="element-invisible" for="edit-search-block-form--4">Search </label>
            <input title="Enter the terms you wish to search for." type="text" id="edit-search-block-form--4" name="search_block_form" value="" size="15" maxlength="128" class="form-text form-autocomplete" autocomplete="OFF" aria-autocomplete="list">
            <input type="hidden" id="edit-search-block-form--4-autocomplete" value="https://group.jsw.in/index.php?q=apachesolr_autocomplete_callback/apachesolr_search_page%3Acore_search" disabled="disabled" class="autocomplete autocomplete-processed">
            <span class="element-invisible" aria-live="assertive" aria-atomic="true" id="edit-search-block-form--4-autocomplete-aria-live"></span>
          </div>
          <input type="hidden" name="form_build_id" value="form-07aHq-_3MXMjKvZpSCsxA5UyF86klETcynSBQopwxFk">
          <input type="hidden" name="form_id" value="search_block_form">
          <div class="form-actions form-wrapper" id="edit-actions--2">
            <input type="submit" id="edit-submit--2" name="op" value="Search" class="form-submit">
          </div>
        </div>
      </form>
    </div>
    <span class="twitter-typeahead" style="position: relative; display: inline-block;">
      <input type="text" class="jsw_typeahead tt-hint" readonly="" autocomplete="off" spellcheck="false" tabindex="-1" dir="ltr" style="position: absolute; top: 0px; left: 0px; border-color: transparent; box-shadow: none; opacity: 1; background: none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255);">
      <input type="text" class="jsw_typeahead tt-input" placeholder="Search JSW" autocomplete="off" spellcheck="false" dir="auto" style="position: relative; vertical-align: top; background-color: transparent;">
      <pre aria-hidden="true" style="position: absolute; visibility: hidden; white-space: pre; font-family: BarlowRegular; font-size: 15px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: 0px; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre>
      <div class="tt-menu" style="position: absolute; top: 100%; left: 0px; z-index: 100; display: none;"><div class="tt-dataset tt-dataset-states"></div></div>
    </span>
    <a href="javascript:;" class="icon-search"><i class="fa fa-search"></i></a>
  `;
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
  linkSocial.innerHTML = `
    <a href="https://twitter.com/jswsteel" target="_blank"><i class="fa fa-twitter"></i></a>
    <a href="https://www.facebook.com/JSWSteelOfficial" target="_blank"><i class="fa fa-facebook"></i></a>
    <a href="https://www.youtube.com/channel/UCMauB1IhqTxH982vZmdJoVw" target="_blank"><i class="fa fa-youtube"></i></a>
    <a href="https://www.linkedin.com/company/jsw" target="_blank"><i class="fa fa-linkedin"></i></a>
  `;
  followUs.append(linkSocial);
  blockMobileSearch.append(followUs);
  mobileFooter.append(blockMobileSearch);
  containerMobileHeader.append(mobileFooter);

  nav.append(containerMobileHeader);
  block.textContent = '';
  block.append(nav);

  // Toggle mobile menu
  const btnBars = block.querySelector('.btn-bars');
  const menuContainerEl = block.querySelector('.menu-container');
  if (btnBars && menuContainerEl) {
    btnBars.addEventListener('click', () => {
      btnBars.classList.toggle('open');
      menuContainerEl.classList.toggle('active');
      block.classList.toggle('menu-open'); // Add a class to the block for body overflow control
    });
  }

  // Toggle mobile search
  const mobileSearchIcon = block.querySelector('.search-mobile .icon-search');
  const mobileSearchFormDiv = block.querySelector('.search-mobile .header-search > div:first-child');
  if (mobileSearchIcon && mobileSearchFormDiv) {
    mobileSearchIcon.addEventListener('click', (e) => {
      e.preventDefault();
      mobileSearchFormDiv.style.display = mobileSearchFormDiv.style.display === 'none' ? 'block' : 'none';
    });
  }
}
