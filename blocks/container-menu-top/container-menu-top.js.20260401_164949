import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, ...itemRows] = [...block.children];

  const nav = document.createElement('nav');
  nav.classList.add('port-menu', 'clearfix');

  const container = document.createElement('div');
  container.classList.add('container', 'mobile-header');
  nav.append(container);

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-container');
  moveInstrumentation(logoRow, logoLink);
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      logoLink.href = img.closest('a')?.href || '#'; // Assuming logo link is in the picture's parent a or default to #
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  container.append(logoLink);

  // Hamburger menu for mobile
  const showMenuDiv = document.createElement('div');
  showMenuDiv.classList.add('visible-sm', 'visible-xs', 'clearfix', 'show-menu');
  const btnHumbeger = document.createElement('div');
  btnHumbeger.classList.add('btn-humbeger');
  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  navIcon4.classList.add('btn-bars');
  for (let i = 0; i < 3; i += 1) {
    navIcon4.append(document.createElement('span'));
  }
  btnHumbeger.append(navIcon4);
  showMenuDiv.append(btnHumbeger);
  container.append(showMenuDiv);

  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menu-container');
  container.append(menuContainer);

  const menuLeft = document.createElement('div');
  menuLeft.classList.add('menu-left');
  const mainMenu = document.createElement('ul');
  mainMenu.classList.add('main-menu');
  menuLeft.append(mainMenu);
  menuContainer.append(menuLeft);

  const menuRight = document.createElement('div');
  menuRight.classList.add('menu-right', 'steel');
  const mainMenuRight = document.createElement('ul');
  mainMenuRight.classList.add('main-menu-right');
  menuRight.append(mainMenuRight);
  menuContainer.append(menuRight);

  // Separate menu items into left and right based on model structure
  // The EDS structure shows all menu items as direct children after the logo.
  // We'll assume the first half are 'menuItems' and the second half are 'rightMenuItems'.
  // This is a common pattern when two containers of the same item type follow each other.
  const middleIndex = Math.ceil(itemRows.length / 2);
  const leftMenuItems = itemRows.slice(0, middleIndex);
  const rightMenuItems = itemRows.slice(middleIndex);

  leftMenuItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('has-submenu');
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const imageCell = cells.find(cell => cell.querySelector('picture'));

    const link = linkCell?.querySelector('a') || document.createElement('a');
    link.classList.add('title-link');
    if (!link.href) link.href = '#';

    const labelSpan = document.createElement('span');
    labelSpan.textContent = labelCell?.textContent || '';
    labelSpan.classList.add('title');
    link.append(labelSpan);

    const arrowSpan = document.createElement('span');
    arrowSpan.classList.add('arrow-menu', 'visible-xs', 'visible-sm');
    const arrowIcon = document.createElement('i');
    arrowIcon.classList.add('fa', 'fa-arrow-right');
    arrowSpan.append(arrowIcon);
    link.append(arrowSpan);

    li.append(link);

    const subMenu = document.createElement('div');
    subMenu.classList.add('sub-menu');
    const subMenuContainer = document.createElement('div');
    subMenuContainer.classList.add('container');
    subMenu.append(subMenuContainer);

    const panelDisplay = document.createElement('div');
    panelDisplay.classList.add('panel-display', 'panel-1col', 'clearfix');
    const panelCol = document.createElement('div');
    panelCol.classList.add('panel-panel', 'panel-col');
    panelDisplay.append(panelCol);

    const panelPane = document.createElement('div');
    panelPane.classList.add('panel-pane', 'pane-custom'); // Add dynamic pane-N if needed
    const paneContent = document.createElement('div');
    paneContent.classList.add('pane-content');
    panelPane.append(paneContent);

    const blockMenu = document.createElement('ul');
    blockMenu.classList.add('block-menu');
    const blockMenuItem = document.createElement('li');
    const itemLink = document.createElement('a');
    itemLink.href = link.href;
    const itemTitleSpan = document.createElement('span');
    itemTitleSpan.classList.add('title');
    itemTitleSpan.textContent = labelCell?.textContent || '';
    itemLink.append(itemTitleSpan);

    const img = imageCell?.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('lazyloaded'); // Keep lazyloaded class
      itemLink.append(optimizedPic);
    }
    blockMenuItem.append(itemLink);
    blockMenu.append(blockMenuItem);
    paneContent.append(blockMenu);
    panelCol.append(panelPane);
    subMenuContainer.append(panelDisplay);
    li.append(subMenu);

    mainMenu.append(li);

    // Toggle behavior for sub-menu
    link.addEventListener('click', (e) => {
      if (window.innerWidth < 992) { // Only for mobile/tablet
        e.preventDefault();
        li.classList.toggle('active');
        subMenu.classList.toggle('show');
        arrowIcon.classList.toggle('fa-arrow-right');
        arrowIcon.classList.toggle('fa-arrow-down'); // Or another appropriate icon
      }
    });
  });

  rightMenuItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const imageCell = cells.find(cell => cell.querySelector('picture'));

    const link = linkCell?.querySelector('a') || document.createElement('a');
    link.classList.add('title-link');
    if (!link.href) link.href = '#';

    const labelSpan = document.createElement('span');
    labelSpan.textContent = labelCell?.textContent || '';
    link.append(labelSpan);

    const arrowSpan = document.createElement('span');
    arrowSpan.classList.add('arrow-menu', 'visible-xs', 'visible-sm');
    const arrowIcon = document.createElement('i');
    arrowIcon.classList.add('fa', 'fa-arrow-right'); // Assuming right menu items also have arrows
    arrowSpan.append(arrowIcon);
    link.append(arrowSpan);

    li.append(link);

    // Right menu items might also have sub-menus, but the structure in the original HTML is more complex.
    // For now, only add the link directly. If sub-menu content is needed, it would require more complex parsing
    // based on original HTML structure (e.g., detecting nested lists or specific panel structures).
    // The EDS model for 'menu-item' has an image, so if it's present, we can add it to a sub-menu structure
    // similar to the left menu items, or just display it if it's a simple item.
    if (imageCell) { // Check if an image cell exists, indicating a submenu
      li.classList.add('has-submenu'); // Mark as submenu if image is present
      const subMenu = document.createElement('div');
      subMenu.classList.add('sub-menu');
      const subMenuContainer = document.createElement('div');
      subMenuContainer.classList.add('container');
      subMenu.append(subMenuContainer);

      const section = document.createElement('section'); // Original HTML uses section for right menu sub-menu
      const panelPane = document.createElement('div');
      panelPane.classList.add('panel-pane', 'pane-custom', 'pane-5'); // Specific class for right menu
      const paneContent = document.createElement('div');
      paneContent.classList.add('pane-content');
      panelPane.append(paneContent);

      const innerContainer = document.createElement('div');
      innerContainer.classList.add('container');
      const clearfixListingMenu = document.createElement('div');
      clearfixListingMenu.classList.add('clearfix', 'listing-menu');
      clearfixListingMenu.style.paddingTop = '0'; // Inline style from original HTML
      innerContainer.append(clearfixListingMenu);

      const colMd12 = document.createElement('div');
      colMd12.classList.add('col-md-12');
      const h3Overview = document.createElement('h3');
      h3Overview.classList.add('io-lins');
      h3Overview.style.paddingTop = '10px';
      h3Overview.style.textAlign = 'left';
      const overviewLink = document.createElement('a');
      overviewLink.href = link.href; // Use the main link for overview
      overviewLink.textContent = 'Overview';
      h3Overview.append(overviewLink);
      colMd12.append(h3Overview);
      clearfixListingMenu.append(colMd12);

      // This part is highly specific to the "Investor Zone" example in the original HTML.
      // To fully replicate the nested structure of "Financial Information", "Governance", etc.,
      // the EDS model would need more complex nesting or additional item types.
      // For a generic 'menu-item' with label, link, image, we'll just add the image if present.
      const img = imageCell?.querySelector('img');
      if (img) {
        const colMd3 = document.createElement('div');
        colMd3.classList.add('col-md-3');
        const h3 = document.createElement('h3');
        h3.textContent = 'Related Info'; // Generic title
        colMd3.append(h3);
        const ul = document.createElement('ul');
        const liItem = document.createElement('li');
        const itemLink = document.createElement('a');
        itemLink.href = link.href;
        itemLink.textContent = labelCell?.textContent || '';
        liItem.append(itemLink);
        ul.append(liItem);
        colMd3.append(ul);
        clearfixListingMenu.append(colMd3);
      }

      paneContent.append(innerContainer);
      section.append(panelPane);
      subMenuContainer.append(section);
      li.append(subMenu);

      // Toggle behavior for sub-menu
      link.addEventListener('click', (e) => {
        if (window.innerWidth < 992) { // Only for mobile/tablet
          e.preventDefault();
          li.classList.toggle('active');
          subMenu.classList.toggle('show');
          arrowIcon.classList.toggle('fa-arrow-right');
          arrowIcon.classList.toggle('fa-arrow-down');
        }
      });
    }

    mainMenuRight.append(li);
  });

  // Mobile search and social links
  const mobileFooter = document.createElement('div');
  mobileFooter.classList.add('visible-xs', 'visible-sm');
  const blockMobileSearch = document.createElement('div');
  blockMobileSearch.classList.add('block-mobile-search');
  mobileFooter.append(blockMobileSearch);

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
  searchMobile.append(headerSearch);
  headerSearch.append(searchInput);
  const iconSearch = document.createElement('a');
  iconSearch.href = 'javascript:;';
  iconSearch.classList.add('icon-search');
  const searchIcon = document.createElement('i');
  searchIcon.classList.add('fa', 'fa-search');
  iconSearch.append(searchIcon);
  searchMobile.append(iconSearch);
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

  const socialLinks = [
    { href: 'https://twitter.com/jswsteel', icon: 'fa-twitter' },
    { href: 'https://www.facebook.com/JSWSteelOfficial', icon: 'fa-facebook' },
    { href: 'https://www.youtube.com/channel/UCMauB1IhqTxH982vZmdJoVw', icon: 'fa-youtube' },
    { href: 'https://www.linkedin.com/company/jsw', icon: 'fa-linkedin' },
  ];

  socialLinks.forEach((social) => {
    const a = document.createElement('a');
    a.href = social.href;
    a.target = '_blank';
    const i = document.createElement('i');
    i.classList.add('fa', social.icon);
    a.append(i);
    linkSocial.append(a);
  });
  followUs.append(linkSocial);
  blockMobileSearch.append(followUs);
  menuContainer.append(mobileFooter);

  // Internal home link
  const internalHome = document.createElement('div');
  internalHome.classList.add('internal-home');
  const internalHomeLink = document.createElement('a');
  internalHomeLink.href = 'https://group.jsw.in';
  const internalHomeIcon = document.createElement('i');
  internalHomeIcon.classList.add('fa', 'fa-home', 'blue');
  internalHomeLink.append(internalHomeIcon);
  internalHome.append(internalHomeLink);
  menuRight.append(internalHome);

  // Hamburger menu click listener
  navIcon4.addEventListener('click', () => {
    navIcon4.classList.toggle('open');
    menuContainer.classList.toggle('show');
    // For mobile, we might want to toggle a class on the body to prevent scrolling
    document.body.classList.toggle('menu-open');
  });

  block.textContent = '';
  block.append(nav);
}
