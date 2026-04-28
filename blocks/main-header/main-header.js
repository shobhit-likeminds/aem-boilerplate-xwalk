import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
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
      subWrap.classList.add('has-sub-child');
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default async function decorate(block) {
  const children = [...block.children];

  const [
    logoRow,
    logoLinkRow,
    anniversaryLogoRow,
    anniversaryLogoLinkRow,
    ...itemRows
  ] = children;

  // Filter item rows based on cell count for different sub-components
  // navigation-item has 9 cells, press-release-slide has 4 cells
  const navigationItems = itemRows.filter((row) => row.children.length === 9);
  const pressReleaseItems = itemRows.filter((row) => row.children.length === 4);

  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid');
  header.setAttribute('data-once', 'header-hover');

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  // Main Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const logoLink = document.createElement('a');
  const mainLogoAnchor = logoLinkRow.querySelector('a');
  if (mainLogoAnchor) logoLink.href = mainLogoAnchor.href;
  moveInstrumentation(logoLinkRow, logoLink);
  const mainLogoPicture = logoRow.querySelector('picture');
  if (mainLogoPicture) {
    const img = mainLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);
  wrap.append(logoDiv);

  // Hamburger
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.setAttribute('data-once', 'hamburger-click nav-close-search');
  const ulHamburger = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    ulHamburger.append(document.createElement('li'));
  }
  hamburger.append(ulHamburger);
  wrap.append(hamburger);

  // Main Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  nav.setAttribute('data-once', 'initSubChildToggle');
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);
  wrap.append(nav);

  navigationItems.forEach((row) => {
    // Fixed schema for navigation-item, use destructuring
    const [
      labelCell,
      linkCell,
      hierarchyCell,
      leftHeadingCell,
      leftDescriptionCell,
      leftSubDescriptionCell,
      leftStatsCell,
      leftStats2Cell,
      leftIRHighlightsCell,
    ] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');
    li.setAttribute('data-once', 'nav-close-search');

    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell?.textContent.trim() || '';
    anchor.setAttribute('itemprop', 'url');
    moveInstrumentation(linkCell, anchor);
    li.append(anchor);

    const spanSvg = document.createElement('span');
    spanSvg.innerHTML = `<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>`;
    li.append(spanSvg);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu');
    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container');
    megaMenu.append(megaMenuWrap);
    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div');
    megaMenuWrap.append(centerDiv);

    // Left Div content for Mega Menu
    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div');
    centerDiv.append(leftDiv);

    const leftHeading = document.createElement('h4');
    leftHeading.classList.add('left-div-heading');
    const leftHeadingAnchor = document.createElement('a');
    leftHeadingAnchor.textContent = leftHeadingCell?.textContent.trim() || '';
    moveInstrumentation(leftHeadingCell, leftHeadingAnchor);
    leftHeading.append(leftHeadingAnchor);
    leftDiv.append(leftHeading);

    if (leftDescriptionCell?.textContent.trim()) {
      const leftDesc = document.createElement('p');
      leftDesc.classList.add('left-div-desc');
      leftDesc.innerHTML = leftDescriptionCell.innerHTML; // Use innerHTML for richtext
      moveInstrumentation(leftDescriptionCell, leftDesc);
      leftDiv.append(leftDesc);
    }

    if (leftSubDescriptionCell?.textContent.trim()) {
      const leftSubDesc = document.createElement('p');
      leftSubDesc.classList.add('left-div-subdesc');
      leftSubDesc.textContent = leftSubDescriptionCell.textContent.trim();
      moveInstrumentation(leftSubDescriptionCell, leftSubDesc);
      leftDiv.append(leftSubDesc);
    }

    if (leftStatsCell?.textContent.trim()) {
      const leftStats = document.createElement('ul');
      leftStats.innerHTML = leftStatsCell.innerHTML; // Use innerHTML for richtext
      leftStats.querySelectorAll('li').forEach((liItem) => liItem.classList.add('list-text-red'));
      moveInstrumentation(leftStatsCell, leftStats);
      leftDiv.append(leftStats);
    }

    if (leftStats2Cell?.textContent.trim()) {
      const leftStats2 = document.createElement('ul');
      leftStats2.innerHTML = leftStats2Cell.innerHTML; // Use innerHTML for richtext
      leftStats2.querySelectorAll('li').forEach((liItem) => liItem.classList.add('list-text-red'));
      moveInstrumentation(leftStats2Cell, leftStats2);
      leftDiv.append(leftStats2);
    }

    if (leftIRHighlightsCell?.textContent.trim()) {
      const leftIRHighlights = document.createElement('div');
      leftIRHighlights.innerHTML = leftIRHighlightsCell.innerHTML; // Use innerHTML for richtext
      moveInstrumentation(leftIRHighlightsCell, leftIRHighlights);
      leftDiv.append(leftIRHighlights);
    }

    // Sub Navigation Wrap for Hierarchy Tree
    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    centerDiv.append(subNavWrap);

    const hierarchyRootTemp = document.createElement('div');
    hierarchyRootTemp.innerHTML = hierarchyCell?.innerHTML || '';
    const hierarchyRoot = hierarchyRootTemp.querySelector('ul');

    if (hierarchyRoot) {
      moveInstrumentation(hierarchyCell, hierarchyRootTemp); // Move instrumentation from original cell to temp div
      // Apply correct class based on original HTML, e.g., 'about-us-sub-nav'
      if (anchor.textContent.trim() === 'Who We Are') {
        subNavWrap.classList.add('about-us-sub-nav');
        subNavWrap.append(hierarchyRoot);
      } else if (anchor.textContent.trim() === 'What we do') {
        subNavWrap.classList.add('what-we-do');
        subNavWrap.append(hierarchyRoot);
      } else if (anchor.textContent.trim() === 'Investor Relations') {
        leftDiv.classList.add('ir-left-div');
        subNavWrap.classList.add('element-block');

        // Check for the specific "sub-nav-wrap-one-link" structure
        const firstLevelLis = [...hierarchyRoot.children];
        const hasOneLink = firstLevelLis.some(liItem => liItem.querySelector('a[target="_blank"]'));

        if (hasOneLink) {
          const subNavWrapOneLink = document.createElement('ul');
          subNavWrapOneLink.classList.add('sub-nav-wrap-one-link');
          const firstLinkLi = firstLevelLis.shift(); // Take the first <li>
          if (firstLinkLi) {
            subNavWrapOneLink.append(firstLinkLi);
            subNavWrap.append(subNavWrapOneLink);
          }
        }

        const innerSubNavWrapList = document.createElement('div');
        innerSubNavWrapList.classList.add('inner-sub-nav-wrap-list');
        // Split the remaining hierarchyRoot into two Uls
        const firstUl = document.createElement('ul');
        const secondUl = document.createElement('ul');
        const lis = [...hierarchyRoot.children]; // Use remaining children
        lis.forEach((item, index) => {
          if (index < Math.ceil(lis.length / 2)) {
            firstUl.append(item);
          } else {
            secondUl.append(item);
          }
        });
        if (firstUl.children.length > 0) innerSubNavWrapList.append(firstUl);
        if (secondUl.children.length > 0) innerSubNavWrapList.append(secondUl);
        subNavWrap.append(innerSubNavWrapList);
      } else if (anchor.textContent.trim() === 'newsroom') {
        leftDiv.classList.add('newsroom-left-div');
        const latestPressReleaseDiv = document.createElement('div');
        latestPressReleaseDiv.classList.add('latest-two-press-release');
        leftDiv.append(latestPressReleaseDiv);

        pressReleaseItems.slice(0, 2).forEach((prRow) => {
          // Fixed schema for press-release-slide, use destructuring
          const [prLinkCell, prTitleCell, prDateCell, prCategoryCell] = [...prRow.children];
          const slideDiv = document.createElement('div');
          slideDiv.classList.add('slides');
          const wrapDiv = document.createElement('div');
          wrapDiv.classList.add('wrap');
          slideDiv.append(wrapDiv);
          const contentDiv = document.createElement('div');
          contentDiv.classList.add('content');
          wrapDiv.append(contentDiv);
          const descDiv = document.createElement('div');
          descDiv.classList.add('desc');
          contentDiv.append(descDiv);

          const prLink = document.createElement('a');
          const foundPrLink = prLinkCell.querySelector('a');
          if (foundPrLink) prLink.href = foundPrLink.href;
          prLink.textContent = prTitleCell?.textContent.trim() || '';
          moveInstrumentation(prLinkCell, prLink);
          const pTitle = document.createElement('p');
          pTitle.append(prLink);
          descDiv.append(pTitle);

          const dateDiv = document.createElement('div');
          dateDiv.classList.add('date');
          const emDate = document.createElement('em');
          emDate.textContent = prDateCell?.textContent.trim() || '';
          moveInstrumentation(prDateCell, emDate);
          dateDiv.append(emDate);
          const emCategory = document.createElement('em');
          emCategory.textContent = prCategoryCell?.textContent.trim() || '';
          moveInstrumentation(prCategoryCell, emCategory);
          dateDiv.append(emCategory);
          descDiv.append(dateDiv);
          latestPressReleaseDiv.append(slideDiv);
        });
        subNavWrap.append(hierarchyRoot);
      } else if (anchor.textContent.trim() === 'careers') {
        leftDiv.classList.add('career-left-div');
        subNavWrap.classList.add('careers-div');
        subNavWrap.append(hierarchyRoot);
      } else {
        subNavWrap.append(hierarchyRoot);
      }

      transformNestedLists(hierarchyRoot);
    }
    li.append(megaMenu);
    navUl.append(li);
  });

  // Icon Nav (Mobile and Desktop)
  const createIconNav = (isMobile) => {
    const iconNav = document.createElement('div');
    iconNav.classList.add('icon-nav');
    if (isMobile) {
      iconNav.classList.add('mobile-menus-icon');
    } else {
      iconNav.classList.add('desktop-menus-icon');
    }
    const iconUl = document.createElement('ul');
    iconNav.append(iconUl);

    // Mail icon
    const mailLi = document.createElement('li');
    mailLi.classList.add('mail');
    const mailLink = document.createElement('a');
    mailLink.href = 'https://www.mahindra.com/contact-us';
    if (isMobile) {
      mailLink.textContent = 'Contact Us';
    } else {
      mailLink.innerHTML = `<svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 48 38.4" style="enable-background:new 0 0 48 38.4;" xml:space="preserve" width="21" height="21" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1
        C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7
        L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z"></path>
      </svg>`;
    }
    mailLi.append(mailLink);
    iconUl.append(mailLi);

    // Search icon
    const searchLi = document.createElement('li');
    searchLi.classList.add('search');
    searchLi.setAttribute('data-once', 'search-toggle search-stop-propagation');
    const searchLink = document.createElement('a');
    searchLink.href = '#';
    searchLink.setAttribute('data-once', 'search-stop-propagation');
    searchLink.innerHTML = `
      <svg viewBox="0 0 21 21" fill="none" class="lens" data-once="search-stop-propagation">
        <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path>
      </svg>
      <svg viewBox="0 0 50 50" class="close" data-once="search-stop-propagation">
        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" data-once="search-stop-propagation"></path>
      </svg>
      ${isMobile ? '<span data-once="search-stop-propagation"> Search</span>' : ''}
    `;
    searchLi.append(searchLink);

    const searchScreenWrap = document.createElement('div');
    searchScreenWrap.classList.add('search-screen-wrap');
    searchScreenWrap.setAttribute('data-once', 'search-stop-propagation');
    const searchWrapInner = document.createElement('div');
    searchWrapInner.classList.add('wrap');
    searchWrapInner.setAttribute('data-once', 'search-stop-propagation');
    searchScreenWrap.append(searchWrapInner);

    const searchForm = document.createElement('form');
    searchForm.action = 'https://www.mahindra.com/search';
    searchForm.method = 'get';
    searchForm.id = 'search-block-form';
    searchForm.setAttribute('accept-charset', 'UTF-8');
    searchForm.setAttribute('data-drupal-form-fields', 'edit-keys');
    searchForm.setAttribute('data-once', 'search-stop-propagation');
    searchWrapInner.append(searchForm);

    const searchInputWrap = document.createElement('div');
    searchInputWrap.classList.add('search-wrap');
    searchInputWrap.setAttribute('data-once', 'search-stop-propagation');
    searchForm.append(searchInputWrap);

    const searchIconDiv = document.createElement('div');
    searchIconDiv.classList.add('search-icon');
    searchIconDiv.setAttribute('data-once', 'search-stop-propagation');
    searchIconDiv.innerHTML = `<svg viewBox="0 0 21 21" fill="none" data-once="search-stop-propagation">
      <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path>
    </svg>`;
    searchInputWrap.append(searchIconDiv);

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add('input-text', 'searchtext');
    searchInput.required = true;
    searchInput.name = 'key';
    searchInput.id = 'searchInput';
    searchInput.autocomplete = 'off';
    searchInput.setAttribute('data-once', 'search-stop-propagation');
    searchInputWrap.append(searchInput);

    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-button');
    submitButton.setAttribute('data-once', 'search-stop-propagation');
    submitButton.innerHTML = `<div class="label" data-once="search-stop-propagation"> Submit </div>
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" data-once="search-stop-propagation">
        <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black" data-once="search-stop-propagation"></path>
      </svg>`;
    searchInputWrap.append(submitButton);

    const searchResultBox = document.createElement('div');
    searchResultBox.classList.add('searchResultBox');
    searchResultBox.style.display = 'none';
    searchResultBox.setAttribute('data-once', 'search-stop-propagation');
    searchForm.append(searchResultBox);

    const swiperDiv = document.createElement('div');
    swiperDiv.classList.add('swiper', 'scrollSwiper');
    swiperDiv.setAttribute('data-once', 'search-stop-propagation');
    searchResultBox.append(swiperDiv);

    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    swiperWrapper.setAttribute('data-once', 'search-stop-propagation');
    swiperDiv.append(swiperWrapper);

    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.setAttribute('data-once', 'search-stop-propagation');
    swiperWrapper.append(swiperSlide);

    const swiperScrollbar = document.createElement('div');
    swiperScrollbar.classList.add('swiper-scrollbar');
    swiperScrollbar.setAttribute('data-once', 'search-stop-propagation');
    searchResultBox.append(swiperScrollbar);

    const searchSuggestionsWrap1 = document.createElement('div');
    searchSuggestionsWrap1.classList.add('search-suggestions-wrap');
    searchSuggestionsWrap1.setAttribute('data-once', 'search-stop-propagation');
    searchWrapInner.append(searchSuggestionsWrap1);

    const label1 = document.createElement('div');
    label1.classList.add('label');
    label1.setAttribute('data-once', 'search-stop-propagation');
    label1.textContent = 'Popular Keywords:';
    searchSuggestionsWrap1.append(label1);

    const tokensWrap1 = document.createElement('div');
    tokensWrap1.classList.add('tokens-wrap');
    tokensWrap1.setAttribute('data-once', 'search-stop-propagation');
    searchSuggestionsWrap1.append(tokensWrap1);

    const ul1 = document.createElement('ul');
    ul1.setAttribute('data-once', 'search-stop-propagation');
    // These keywords are hardcoded in ORIGINAL HTML, so they can be hardcoded here.
    ['Business', 'FY 21', 'Brands', 'XUV700', 'Global', 'Nanhi Kali'].forEach((text) => {
      const liItem = document.createElement('li');
      liItem.setAttribute('data-once', 'search-stop-propagation');
      liItem.textContent = text;
      ul1.append(liItem);
    });
    tokensWrap1.append(ul1);

    const searchSuggestionsWrap2 = document.createElement('div');
    searchSuggestionsWrap2.classList.add('search-suggestions-wrap');
    searchSuggestionsWrap2.setAttribute('data-once', 'search-stop-propagation');
    searchWrapInner.append(searchSuggestionsWrap2);

    const label2 = document.createElement('div');
    label2.classList.add('label');
    label2.setAttribute('data-once', 'search-stop-propagation');
    label2.textContent = 'Recommended for you:';
    searchSuggestionsWrap2.append(label2);

    const tokensWrap2 = document.createElement('div');
    tokensWrap2.classList.add('tokens-wrap');
    tokensWrap2.setAttribute('data-once', 'search-stop-propagation');
    searchSuggestionsWrap2.append(tokensWrap2);

    const ul2 = document.createElement('ul');
    ul2.setAttribute('data-once', 'search-stop-propagation');
    // These keywords are hardcoded in ORIGINAL HTML, so they can be hardcoded here.
    ['Annual Report 2021 - 2022', 'Leadership Announcement', 'Latest Press Release', 'Brand Guidelines'].forEach((text) => {
      const liItem = document.createElement('li');
      liItem.setAttribute('data-once', 'search-stop-propagation');
      liItem.textContent = text;
      ul2.append(liItem);
    });
    tokensWrap2.append(ul2);

    searchLi.append(searchScreenWrap);
    iconUl.append(searchLi);
    return iconNav;
  };

  navUl.append(createIconNav(true)); // Mobile icon nav
  nav.append(createIconNav(false)); // Desktop icon nav

  // 80th Year Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const year80LogoLink = document.createElement('a');
  const anniversaryLogoAnchor = anniversaryLogoLinkRow.querySelector('a');
  if (anniversaryLogoAnchor) year80LogoLink.href = anniversaryLogoAnchor.href;
  moveInstrumentation(anniversaryLogoLinkRow, year80LogoLink);
  const anniversaryLogoPicture = anniversaryLogoRow.querySelector('picture');
  if (anniversaryLogoPicture) {
    const img = anniversaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    moveInstrumentation(anniversaryLogoRow, optimizedPic.querySelector('img'));
    optimizedPic.querySelector('img').classList.add('hiddenlogo1', 'years-80');
    year80LogoLink.append(optimizedPic);
  }
  year80LogoDiv.append(year80LogoLink);
  wrap.append(year80LogoDiv);

  block.replaceChildren(header);

  // Add event listeners for hamburger menu
  const hamburgerButton = header.querySelector('.hamburger');
  const mainNav = header.querySelector('.main-nav');
  hamburgerButton.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    hamburgerButton.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Add event listeners for search toggle
  const searchTriggers = header.querySelectorAll('.search > a');
  const searchScreenWraps = header.querySelectorAll('.search-screen-wrap');
  searchTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentLi = trigger.closest('li.search');
      parentLi.classList.toggle('active');
      const screenWrap = parentLi.querySelector('.search-screen-wrap');
      if (screenWrap) {
        screenWrap.classList.toggle('active');
      }
    });
  });

  searchScreenWraps.forEach((screenWrap) => {
    screenWrap.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  document.addEventListener('click', () => {
    searchTriggers.forEach((trigger) => {
      const parentLi = trigger.closest('li.search');
      parentLi.classList.remove('active');
      const screenWrap = parentLi.querySelector('.search-screen-wrap');
      if (screenWrap) {
        screenWrap.classList.remove('active');
      }
    });
  });

  // Scroll behavior for header
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 0) {
      header.classList.add('nav-up');
    } else {
      header.classList.remove('nav-up');
    }
    lastScrollY = window.scrollY;
  });

  // Swiper initialization for search results
  // Check 2.5: Swiper initialization
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  const swiperEl = header.querySelector('.scrollSwiper');
  if (swiperEl) {
    // eslint-disable-next-line no-undef
    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      direction: 'vertical', // Assuming vertical scroll for search results
      freeMode: true,
      scrollbar: {
        el: header.querySelector('.swiper-scrollbar'),
        hide: false,
      },
    });
  }
}
