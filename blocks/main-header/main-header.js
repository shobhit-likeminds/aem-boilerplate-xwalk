import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

const SVG_ARROW_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#FF0000" d="M6.03 3.429L10.601 8l-4.571 4.571L7.43 14 13.43 8 7.43 2z"/></svg>';
const SVG_SEARCH_ICON_WHITE = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#fff" d="M19.795 18.205L15.34 13.75c1.07-1.307 1.71-2.99 1.71-4.85C17.05 4.04 13.01 0 8.525 0S0 4.04 0 8.9c0 4.86 4.04 8.9 8.525 8.9c1.86 0 3.543-.64 4.85-1.71l4.455 4.455c.27.27.67.36 1.01.27c.34-.09.6-.35.69-.69c.09-.34 0-.74-.27-1.01zM8.525 15.05c-3.39 0-6.15-2.76-6.15-6.15s2.76-6.15 6.15-6.15s6.15 2.76 6.15 6.15s-2.76 6.15-6.15 6.15z"/></svg>';
const SVG_SEARCH_ICON_BLACK = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="#000" d="M19.795 18.205L15.34 13.75c1.07-1.307 1.71-2.99 1.71-4.85C17.05 4.04 13.01 0 8.525 0S0 4.04 0 8.9c0 4.86 4.04 8.9 8.525 8.9c1.86 0 3.543-.64 4.85-1.71l4.455 4.455c.27.27.67.36 1.01.27c.34-.09.6-.35.69-.69c.09-.34 0-.74-.27-1.01zM8.525 15.05c-3.39 0-6.15-2.76-6.15-6.15s2.76-6.15 6.15-6.15s6.15 2.76 6.15 6.15s-2.76 6.15-6.15 6.15z"/></svg>';
const SVG_MAIL_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16"><path fill="#000" d="M18.8 0H1.2C.54 0 0 .54 0 1.2v13.6c0 .66.54 1.2 1.2 1.2h17.6c.66 0 1.2-.54 1.2-1.2V1.2c0-.66-.54-1.2-1.2-1.2zm-1.2 1.2L10 8.13L2.4 1.2h15.2zM1.2 14.8V2.17l8.8 7.8L18.8 2.17V14.8H1.2z"/></svg>';
const SVG_SUBMIT_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="#000" d="M14.5 7.5L2 1l1.5 6.5L2 14z"/></svg>';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    // Handle label-only nodes
    const anchor = li.querySelector(':scope > a');
    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
      }
    }
    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('has-sub-child');
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        const iconSpan = document.createElement('span');
        iconSpan.innerHTML = SVG_ARROW_ICON;
        trigger.appendChild(iconSpan);
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
    }
  });
}

function transformInnerNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');
    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
      }
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('has-inner-sub-child');
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        const iconSpan = document.createElement('span');
        iconSpan.innerHTML = SVG_ARROW_ICON;
        trigger.appendChild(iconSpan);
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active-child');
          subWrap.classList.toggle('active-child');
        });
      }
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root fields are identified by content type, not fixed index, as per best practice.
  // The first 4 rows are root fields, the rest are item rows.
  const rootRows = children.slice(0, 4);
  const itemRows = children.slice(4);

  const logoRow = rootRows.find(row => row.querySelector('picture'));
  const logoLinkRow = rootRows.find(row => row.querySelector('a') && row.querySelector('a').href.includes('/content/site/logo-link'));
  const anniversaryLogoRow = rootRows.find(row => row.querySelector('picture') && !row.isEqualNode(logoRow));
  const anniversaryLogoLinkRow = rootRows.find(row => row.querySelector('a') && row.querySelector('a').href.includes('/content/site/anniversary-logo-link'));

  const header = document.createElement('header');
  header.classList.add('main-header'); // Do not add 'nav-up' or state classes initially

  const container = document.createElement('div');
  container.classList.add('container');
  header.appendChild(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.appendChild(wrap);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const logoLink = document.createElement('a');
  if (logoLinkRow) {
    logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  } else {
    logoLink.href = '#';
  }
  if (logoRow) {
    const logoPicture = logoRow.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.appendChild(optimizedPic);
    }
  }
  logoDiv.appendChild(logoLink);
  wrap.appendChild(logoDiv);

  // Hamburger
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  const ulHamburger = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    ulHamburger.appendChild(document.createElement('li'));
  }
  hamburger.appendChild(ulHamburger);
  wrap.appendChild(hamburger);

  // Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.appendChild(navUl);

  const navigationItems = itemRows.filter((row) => [...row.children].length === 7);
  const pressReleaseItems = itemRows.filter((row) => [...row.children].length === 4);
  const iconLinkItems = itemRows.filter((row) => [...row.children].length === 3);

  navigationItems.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim().length > 0);
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const hierarchyCell = cells.find(cell => cell.querySelector('ul'));
    const leftHeadingCell = cells.find(cell => cell.textContent.trim() && cell !== labelCell && cell !== leftDescCell && cell !== leftSubDescCell);
    const leftDescCell = cells.find(cell => cell.textContent.trim() && cell !== labelCell && cell !== leftHeadingCell && cell !== leftSubDescCell);
    const leftSubDescCell = cells.find(cell => cell.textContent.trim() && cell !== labelCell && cell !== leftHeadingCell && cell !== leftDescCell);


    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');

    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell?.textContent.trim() || '';
    anchor.setAttribute('itemprop', 'url');
    li.appendChild(anchor);

    const iconSpan = document.createElement('span');
    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      // Replace with inline SVG if it's an SVG, otherwise use optimized picture
      if (img.src.endsWith('.svg') || img.src.includes('.svg+xml')) {
        iconSpan.innerHTML = SVG_ARROW_ICON;
      } else {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '16' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        iconSpan.appendChild(optimizedPic);
      }
    } else {
      iconSpan.innerHTML = SVG_ARROW_ICON; // Default arrow icon
    }
    li.appendChild(iconSpan);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu');
    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container');
    megaMenu.appendChild(megaMenuWrap);
    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div');
    megaMenuWrap.appendChild(centerDiv);

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div');
    centerDiv.appendChild(leftDiv);

    const leftHeading = document.createElement('h4');
    leftHeading.classList.add('left-div-heading');
    const headingAnchor = document.createElement('a');
    headingAnchor.textContent = leftHeadingCell?.textContent.trim() || '';
    leftHeading.appendChild(headingAnchor);
    leftDiv.appendChild(leftHeading);

    const leftDesc = document.createElement('p');
    leftDesc.classList.add('left-div-desc');
    leftDesc.textContent = leftDescCell?.textContent.trim() || '';
    leftDiv.appendChild(leftDesc);

    const leftSubDesc = document.createElement('p');
    leftSubDesc.classList.add('left-div-subdesc');
    leftSubDesc.textContent = leftSubDescCell?.textContent.trim() || '';
    leftDiv.appendChild(leftSubDesc);

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    centerDiv.appendChild(subNavWrap);

    if (hierarchyCell) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      moveInstrumentation(hierarchyCell, tempDiv);

      const hierarchyRoot = tempDiv.querySelector('ul');
      if (hierarchyRoot) {
        // Apply classes from ORIGINAL HTML to nested elements
        hierarchyRoot.querySelectorAll('li').forEach(item => item.classList.add('top-level-li'));
        hierarchyRoot.querySelectorAll('li > a').forEach(a => a.classList.add('top-level-li')); // Example, adjust based on actual HTML
        hierarchyRoot.querySelectorAll('ul').forEach(ul => ul.classList.add('has-sub-child', 'active')); // Example, adjust based on actual HTML
        hierarchyRoot.querySelectorAll('li > div > ul').forEach(ul => ul.classList.add('has-inner-sub-child', 'active-child')); // Example, adjust based on actual HTML

        subNavWrap.appendChild(hierarchyRoot);
        transformNestedLists(hierarchyRoot);
        hierarchyRoot.querySelectorAll('.has-sub-child > ul').forEach(transformInnerNestedLists);
      }
    }

    li.appendChild(megaMenu);
    navUl.appendChild(li);

    // Event listener for mega-menu toggle
    const toggleElements = [anchor, iconSpan];
    toggleElements.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active');
        megaMenu.classList.toggle('active');
      });
    });
  });

  // Newsroom item (special handling for latest press releases)
  const newsroomLi = document.createElement('li');
  newsroomLi.classList.add('has-child', 'hover-red');
  newsroomLi.setAttribute('itemprop', 'name');

  const newsroomAnchor = document.createElement('a');
  newsroomAnchor.href = 'https://www.mahindra.com/newsroom'; // Specific newsroom link from ORIGINAL HTML
  newsroomAnchor.textContent = 'newsroom';
  newsroomAnchor.setAttribute('itemprop', 'url');
  newsroomLi.appendChild(newsroomAnchor);

  const newsroomIconSpan = document.createElement('span');
  newsroomIconSpan.innerHTML = SVG_ARROW_ICON;
  newsroomLi.appendChild(newsroomIconSpan);

  const newsroomMegaMenu = document.createElement('div');
  newsroomMegaMenu.classList.add('mega-menu');
  const newsroomMegaMenuWrap = document.createElement('div');
  newsroomMegaMenuWrap.classList.add('wrap', 'container');
  newsroomMegaMenu.appendChild(newsroomMegaMenuWrap);
  const newsroomCenterDiv = document.createElement('div');
  newsroomCenterDiv.classList.add('center-div');
  newsroomMegaMenuWrap.appendChild(newsroomCenterDiv);

  const newsroomLeftDiv = document.createElement('div');
  newsroomLeftDiv.classList.add('left-div', 'newsroom-left-div');
  newsroomCenterDiv.appendChild(newsroomLeftDiv);

  const newsroomLeftHeading = document.createElement('h4');
  newsroomLeftHeading.classList.add('left-div-heading');
  const newsroomHeadingAnchor = document.createElement('a');
  newsroomHeadingAnchor.textContent = 'Newsroom';
  newsroomLeftHeading.appendChild(newsroomHeadingAnchor);
  newsroomLeftDiv.appendChild(newsroomLeftHeading);

  const latestPressReleasesDiv = document.createElement('div');
  latestPressReleasesDiv.classList.add('latest-two-press-release');
  newsroomLeftDiv.appendChild(latestPressReleasesDiv);

  pressReleaseItems.slice(0, 2).forEach((row) => { // Only show latest two
    const cells = [...row.children];
    const prLinkCell = cells.find(cell => cell.querySelector('a'));
    const prTitleCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim().length > 0);
    const prDateCell = cells.find(cell => cell.textContent.trim().match(/\d{1,2}\s\w+\s\d{4}/)); // Basic date detection
    const prCategoryCell = cells.find(cell => cell.textContent.trim().length > 0 && cell !== prTitleCell && cell !== prDateCell);

    const slidesDiv = document.createElement('div');
    slidesDiv.classList.add('slides');
    const slidesWrap = document.createElement('div');
    slidesWrap.classList.add('wrap');
    slidesDiv.appendChild(slidesWrap);
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    slidesWrap.appendChild(contentDiv);
    const descDiv = document.createElement('div');
    descDiv.classList.add('desc');
    contentDiv.appendChild(descDiv);

    const p = document.createElement('p');
    const prAnchor = document.createElement('a');
    const foundPrLink = prLinkCell?.querySelector('a');
    if (foundPrLink) prAnchor.href = foundPrLink.href;
    prAnchor.textContent = prTitleCell?.textContent.trim() || '';
    p.appendChild(prAnchor);
    descDiv.appendChild(p);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    const emDate = document.createElement('em');
    emDate.textContent = prDateCell?.textContent.trim() || '';
    dateDiv.appendChild(emDate);
    const emCategory = document.createElement('em');
    emCategory.textContent = prCategoryCell?.textContent.trim() || '';
    dateDiv.appendChild(emCategory);
    descDiv.appendChild(dateDiv);

    latestPressReleasesDiv.appendChild(slidesDiv);
  });

  const newsroomSubNavWrap = document.createElement('div');
  newsroomSubNavWrap.classList.add('sub-nav-wrap');
  newsroomCenterDiv.appendChild(newsroomSubNavWrap);

  const newsroomUl1 = document.createElement('ul');
  const newsroomLi1 = document.createElement('li');
  const newsroomLink1 = document.createElement('a');
  newsroomLink1.href = 'https://www.mahindra.com/newsroom/press-release';
  newsroomLink1.textContent = 'Press Releases';
  newsroomLi1.appendChild(newsroomLink1);
  newsroomUl1.appendChild(newsroomLi1);

  const newsroomLi2 = document.createElement('li');
  const newsroomLink2 = document.createElement('a');
  newsroomLink2.href = 'https://www.mahindra.com/newsroom/corporate-doc';
  newsroomLink2.textContent = 'Media Resources';
  newsroomLi2.appendChild(newsroomLink2);
  newsroomUl1.appendChild(newsroomLi2);
  newsroomSubNavWrap.appendChild(newsroomUl1);

  const newsroomUl2 = document.createElement('ul');
  const newsroomLi3 = document.createElement('li');
  const newsroomLink3 = document.createElement('a');
  newsroomLink3.href = 'https://www.mahindra.com/newsroom#in-the-news';
  newsroomLink3.textContent = 'In The News';
  newsroomLi3.appendChild(newsroomLink3);
  newsroomUl2.appendChild(newsroomLi3);
  newsroomSubNavWrap.appendChild(newsroomUl2);

  newsroomLi.appendChild(newsroomMegaMenu);
  navUl.appendChild(newsroomLi);

  // Event listener for newsroom mega-menu toggle
  [newsroomAnchor, newsroomIconSpan].forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      newsroomLi.classList.toggle('active');
      newsroomMegaMenu.classList.toggle('active');
    });
  });

  // Icon Links
  const iconNavMobile = document.createElement('div');
  iconNavMobile.classList.add('icon-nav', 'mobile-menus-icon');
  const ulIconMobile = document.createElement('ul');
  iconNavMobile.appendChild(ulIconMobile);

  const iconNavDesktop = document.createElement('div');
  iconNavDesktop.classList.add('icon-nav', 'desktop-menus-icon');
  const ulIconDesktop = document.createElement('ul');
  iconNavDesktop.appendChild(ulIconDesktop);

  iconLinkItems.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cell.textContent.trim().length > 0);

    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell?.textContent.trim() || '';

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      // Replace with inline SVG if it's an SVG
      if (img.src.endsWith('.svg') || img.src.includes('.svg+xml')) {
        let svgContent = '';
        if (labelCell?.textContent.trim().toLowerCase() === 'contact us') {
          svgContent = SVG_MAIL_ICON;
          li.classList.add('mail');
        } else if (labelCell?.textContent.trim().toLowerCase() === 'search') {
          svgContent = SVG_SEARCH_ICON_WHITE; // Mobile search icon
          li.classList.add('search');
        }
        if (svgContent) {
          const iconSpan = document.createElement('span');
          iconSpan.innerHTML = svgContent;
          anchor.prepend(iconSpan);
        }
      } else {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '20' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        anchor.prepend(optimizedPic);
      }
    }
    li.appendChild(anchor);
    ulIconMobile.appendChild(li.cloneNode(true)); // Add to mobile nav

    // Desktop icons might be different or have different labels
    const desktopLi = document.createElement('li');
    const desktopAnchor = document.createElement('a');
    if (foundLink) desktopAnchor.href = foundLink.href;

    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img.src.endsWith('.svg') || img.src.includes('.svg+xml')) {
        let svgContent = '';
        if (labelCell?.textContent.trim().toLowerCase() === 'contact us') {
          svgContent = SVG_MAIL_ICON;
          desktopLi.classList.add('mail');
        } else if (labelCell?.textContent.trim().toLowerCase() === 'search') {
          svgContent = SVG_SEARCH_ICON_WHITE; // Desktop search icon
          desktopLi.classList.add('search');
        }
        if (svgContent) {
          const iconSpan = document.createElement('span');
          iconSpan.innerHTML = svgContent;
          desktopAnchor.prepend(iconSpan);
        }
      } else {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '20' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        desktopAnchor.prepend(optimizedPic);
      }
    }
    desktopLi.appendChild(desktopAnchor);
    ulIconDesktop.appendChild(desktopLi);
  });

  nav.appendChild(iconNavMobile);
  nav.appendChild(iconNavDesktop);
  wrap.appendChild(nav);

  // Search functionality
  const searchMobileLi = ulIconMobile.querySelector('.search');
  const searchDesktopLi = ulIconDesktop.querySelector('.search');

  const createSearchScreen = () => {
    const searchScreenWrap = document.createElement('div');
    searchScreenWrap.classList.add('search-screen-wrap');
    const searchWrapInner = document.createElement('div');
    searchWrapInner.classList.add('wrap');
    searchScreenWrap.appendChild(searchWrapInner);

    const form = document.createElement('form');
    form.action = '/search'; // Placeholder
    form.method = 'get';
    form.id = 'search-block-form';
    form.setAttribute('accept-charset', 'UTF-8');
    form.setAttribute('data-drupal-form-fields', 'edit-keys');
    searchWrapInner.appendChild(form);

    const searchInputWrap = document.createElement('div');
    searchInputWrap.classList.add('search-wrap');
    form.appendChild(searchInputWrap);

    const searchIconDiv = document.createElement('div');
    searchIconDiv.classList.add('search-icon');
    searchIconDiv.innerHTML = SVG_SEARCH_ICON_BLACK;
    searchInputWrap.appendChild(searchIconDiv);

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('input-text', 'searchtext');
    input.required = true;
    input.name = 'key';
    input.id = 'searchInput';
    input.autocomplete = 'off';
    searchInputWrap.appendChild(input);

    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-button');
    const submitLabel = document.createElement('div');
    submitLabel.classList.add('label');
    submitLabel.textContent = 'Submit';
    submitButton.appendChild(submitLabel);
    const submitIcon = document.createElement('span');
    submitIcon.innerHTML = SVG_SUBMIT_ICON;
    submitButton.appendChild(submitIcon);
    searchInputWrap.appendChild(submitButton);

    // Placeholder for search results and suggestions
    const searchResultBox = document.createElement('div');
    searchResultBox.classList.add('searchResultBox');
    searchResultBox.style.display = 'none';
    form.appendChild(searchResultBox);

    const searchSuggestionsWrap1 = document.createElement('div');
    searchSuggestionsWrap1.classList.add('search-suggestions-wrap');
    const label1 = document.createElement('div');
    label1.classList.add('label');
    label1.textContent = 'Popular Keywords:';
    searchSuggestionsWrap1.appendChild(label1);
    const tokensWrap1 = document.createElement('div');
    tokensWrap1.classList.add('tokens-wrap');
    const ul1 = document.createElement('ul');
    ['Business', 'FY 21', 'Brands', 'XUV700', 'Global', 'Nanhi Kali'].forEach((keyword) => {
      const li = document.createElement('li');
      li.textContent = keyword;
      ul1.appendChild(li);
    });
    tokensWrap1.appendChild(ul1);
    searchSuggestionsWrap1.appendChild(tokensWrap1);
    searchWrapInner.appendChild(searchSuggestionsWrap1);

    const searchSuggestionsWrap2 = document.createElement('div');
    searchSuggestionsWrap2.classList.add('search-suggestions-wrap');
    const label2 = document.createElement('div');
    label2.classList.add('label');
    label2.textContent = 'Recommended for you:';
    searchSuggestionsWrap2.appendChild(label2);
    const tokensWrap2 = document.createElement('div');
    tokensWrap2.classList.add('tokens-wrap');
    const ul2 = document.createElement('ul');
    ['Annual Report 2021 - 2022', 'Leadership Announcement', 'Latest Press Release', 'Brand Guidelines'].forEach((keyword) => {
      const li = document.createElement('li');
      li.textContent = keyword;
      ul2.appendChild(li);
    });
    tokensWrap2.appendChild(ul2);
    searchSuggestionsWrap2.appendChild(tokensWrap2);
    searchWrapInner.appendChild(searchSuggestionsWrap2);

    return searchScreenWrap;
  };

  if (searchMobileLi) {
    const searchAnchor = searchMobileLi.querySelector('a');
    if (searchAnchor) {
      const searchScreen = createSearchScreen();
      searchMobileLi.appendChild(searchScreen);
      searchAnchor.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        searchScreen.classList.toggle('active');
        document.body.classList.toggle('search-open');
      });
      searchScreen.addEventListener('click', (e) => {
        if (e.target === searchScreen) {
          searchScreen.classList.remove('active');
          document.body.classList.remove('search-open');
        }
      });
    }
  }

  if (searchDesktopLi) {
    const searchAnchor = searchDesktopLi.querySelector('a');
    if (searchAnchor) {
      const searchScreen = createSearchScreen();
      searchDesktopLi.appendChild(searchScreen);
      searchAnchor.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        searchScreen.classList.toggle('active');
        document.body.classList.toggle('search-open');
      });
      searchScreen.addEventListener('click', (e) => {
        if (e.target === searchScreen) {
          searchScreen.classList.remove('active');
          document.body.classList.remove('search-open');
        }
      });
    }
  }

  // Anniversary Logo
  const anniversaryLogoDiv = document.createElement('div');
  anniversaryLogoDiv.classList.add('logo', 'year-80-logo');
  const anniversaryLogoLink = document.createElement('a');
  if (anniversaryLogoLinkRow) {
    anniversaryLogoLink.href = anniversaryLogoLinkRow.querySelector('a')?.href || '#';
  } else {
    anniversaryLogoLink.href = '#';
  }
  if (anniversaryLogoRow) {
    const anniversaryLogoPicture = anniversaryLogoRow.querySelector('picture');
    if (anniversaryLogoPicture) {
      const img = anniversaryLogoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('hiddenlogo1', 'years-80');
      optimizedPic.querySelector('img').width = 74;
      optimizedPic.querySelector('img').height = 60;
      anniversaryLogoLink.appendChild(optimizedPic);
    }
  }
  anniversaryLogoDiv.appendChild(anniversaryLogoLink);
  wrap.appendChild(anniversaryLogoDiv);

  block.replaceWith(header);

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
      hamburger.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}
