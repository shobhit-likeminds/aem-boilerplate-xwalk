import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Normalize label-only nodes
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
      subWrap.classList.add('has-sub-child'); // Use class from ORIGINAL HTML
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
    }
  });
}

export default async function decorate(block) {
  const children = [...block.children];

  const [
    logoRow,
    logoLinkRow,
    yearLogoRow,
    yearLogoLinkRow,
    ...itemRows
  ] = children;

  const root = document.createElement('header');
  root.classList.add('main-header'); // Do NOT add 'nav-up' or 'solid' here, they are state classes

  const container = document.createElement('div');
  container.classList.add('container');
  root.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const logoLink = document.createElement('a');
  logoLink.href = logoLinkRow?.querySelector('a')?.href || '#';
  const logoPicture = logoRow?.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoLinkRow, logoLink);
  logoDiv.append(logoLink);
  wrap.append(logoDiv);

  // Hamburger
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  const ulHamburger = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    ulHamburger.append(document.createElement('li'));
  }
  hamburger.append(ulHamburger);
  wrap.append(hamburger);

  // Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);
  wrap.append(nav);

  const navigationItems = itemRows.filter((row) => row.children.length === 7);
  const iconLinkItems = itemRows.filter((row) => row.children.length === 2);
  const pressReleaseItems = itemRows.filter((row) => row.children.length === 4);

  navigationItems.forEach((row) => {
    const [
      labelCell,
      linkCell,
      hierarchyCell,
      megaMenuHeadingCell,
      megaMenuDescCell,
      megaMenuSubDescCell,
      megaMenuListCell,
    ] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');

    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(labelCell, anchor);
    moveInstrumentation(linkCell, anchor);
    li.append(anchor);

    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
    svgIcon.setAttribute('fill', '#000000');
    svgIcon.setAttribute('stroke', '#000000');
    svgIcon.setAttribute('stroke-width', '4.851456000000001');
    svgIcon.innerHTML = `<g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g>`;
    const spanIcon = document.createElement('span');
    spanIcon.append(svgIcon);
    li.append(spanIcon);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu');
    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container');
    megaMenu.append(megaMenuWrap);
    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div');
    megaMenuWrap.append(centerDiv);

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div');
    centerDiv.append(leftDiv);

    const megaMenuHeading = document.createElement('h4');
    megaMenuHeading.classList.add('left-div-heading');
    const megaMenuHeadingAnchor = document.createElement('a');
    megaMenuHeadingAnchor.textContent = megaMenuHeadingCell?.textContent.trim() || '';
    moveInstrumentation(megaMenuHeadingCell, megaMenuHeadingAnchor);
    megaMenuHeading.append(megaMenuHeadingAnchor);
    leftDiv.append(megaMenuHeading);

    const megaMenuDesc = document.createElement('p');
    megaMenuDesc.classList.add('left-div-desc');
    megaMenuDesc.textContent = megaMenuDescCell?.textContent.trim() || '';
    moveInstrumentation(megaMenuDescCell, megaMenuDesc);
    leftDiv.append(megaMenuDesc);

    const megaMenuSubDesc = document.createElement('p');
    megaMenuSubDesc.classList.add('left-div-subdesc');
    megaMenuSubDesc.textContent = megaMenuSubDescCell?.textContent.trim() || '';
    moveInstrumentation(megaMenuSubDescCell, megaMenuSubDesc);
    leftDiv.append(megaMenuSubDesc);

    const megaMenuListUl = megaMenuListCell?.querySelector('ul');
    if (megaMenuListUl) {
      leftDiv.append(megaMenuListUl);
      moveInstrumentation(megaMenuListCell, megaMenuListUl);
    } else if (megaMenuListCell?.textContent.trim()) {
      const p = document.createElement('p');
      p.innerHTML = megaMenuListCell.innerHTML;
      moveInstrumentation(megaMenuListCell, p);
      leftDiv.append(p);
    }

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    centerDiv.append(subNavWrap);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      subNavWrap.append(hierarchyRoot);
      transformNestedLists(hierarchyRoot);
      moveInstrumentation(hierarchyCell, hierarchyRoot);
    }

    li.append(megaMenu);
    navUl.append(li);

    // Toggle mega-menu on click
    li.addEventListener('click', (e) => {
      e.stopPropagation();
      li.classList.toggle('active');
    });
  });

  // Icon Nav (Mobile)
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconNavUl = document.createElement('ul');
  mobileIconNav.append(mobileIconNavUl);

  // Contact Us link
  const contactUsLiMobile = document.createElement('li');
  contactUsLiMobile.classList.add('mail');
  const contactUsLinkMobile = document.createElement('a');
  const contactUsItem = iconLinkItems.find((row) => row.children[1].textContent.trim().toLowerCase() === 'contact us');
  if (contactUsItem) {
    const [contactLinkCell, contactLabelCell] = [...contactUsItem.children];
    contactUsLinkMobile.href = contactLinkCell?.querySelector('a')?.href || '#';
    contactUsLinkMobile.textContent = contactLabelCell?.textContent.trim() || 'Contact Us';
    moveInstrumentation(contactLinkCell, contactUsLinkMobile);
    moveInstrumentation(contactLabelCell, contactUsLinkMobile);
  } else {
    contactUsLinkMobile.href = '#'; // Fallback
    contactUsLinkMobile.textContent = 'Contact Us';
  }
  contactUsLiMobile.append(contactUsLinkMobile);
  mobileIconNavUl.append(contactUsLiMobile);

  // Search icon
  const searchLiMobile = document.createElement('li');
  searchLiMobile.classList.add('search');
  const searchLinkMobile = document.createElement('a');
  searchLinkMobile.href = '#';
  searchLinkMobile.innerHTML = `<svg viewBox="0 0 21 21" fill="none" class="lens">
    <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
                  </svg>
                  <svg viewBox="0 0 50 50" class="close">
                    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                  </svg>
                  <span> Search</span>`;
  searchLiMobile.append(searchLinkMobile);
  mobileIconNavUl.append(searchLiMobile);

  navUl.append(mobileIconNav);

  // Icon Nav (Desktop)
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconNavUl = document.createElement('ul');
  desktopIconNav.append(desktopIconNavUl);

  // Contact Us link
  const contactUsLiDesktop = document.createElement('li');
  contactUsLiDesktop.classList.add('mail');
  const contactUsLinkDesktop = document.createElement('a');
  if (contactUsItem) {
    const [contactLinkCell, contactLabelCell] = [...contactUsItem.children];
    contactUsLinkDesktop.href = contactLinkCell?.querySelector('a')?.href || '#';
    moveInstrumentation(contactLinkCell, contactUsLinkDesktop);
    moveInstrumentation(contactLabelCell, contactUsLinkDesktop);
  } else {
    contactUsLinkDesktop.href = '#'; // Fallback
  }
  contactUsLinkDesktop.innerHTML = `<svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 48 38.4" style="enable-background:new 0 0 48 38.4;" xml:space="preserve" width="21" height="21" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1
              C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7
              L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z"></path>
  </svg>`;
  contactUsLiDesktop.append(contactUsLinkDesktop);
  desktopIconNavUl.append(contactUsLiDesktop);

  // Search icon
  const searchLiDesktop = document.createElement('li');
  searchLiDesktop.classList.add('search');
  const searchLinkDesktop = document.createElement('a');
  searchLinkDesktop.href = '#';
  searchLinkDesktop.innerHTML = `<svg viewBox="0 0 21 21" fill="none" class="lens">
    <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
  </svg>
  <svg viewBox="0 0 50 50" class="close">
    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
  </svg>`;
  searchLiDesktop.append(searchLinkDesktop);
  desktopIconNavUl.append(searchLiDesktop);

  nav.append(desktopIconNav);

  const searchScreenWrap = document.createElement('div');
  searchScreenWrap.classList.add('search-screen-wrap');
  const searchWrapContent = document.createElement('div');
  searchWrapContent.classList.add('wrap');
  searchScreenWrap.append(searchWrapContent);

  const searchForm = document.createElement('form');
  searchForm.action = 'https://www.mahindra.com/search';
  searchForm.method = 'get';
  searchForm.id = 'search-block-form';
  searchForm.setAttribute('accept-charset', 'UTF-8');
  searchForm.setAttribute('data-drupal-form-fields', 'edit-keys');

  const searchInputWrap = document.createElement('div');
  searchInputWrap.classList.add('search-wrap');
  searchForm.append(searchInputWrap);

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('search-icon');
  searchIconDiv.innerHTML = `<svg viewBox="0 0 21 21" fill="none">
    <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
  </svg>`;
  searchInputWrap.append(searchIconDiv);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('input-text', 'searchtext');
  searchInput.required = true;
  searchInput.name = 'key';
  searchInput.id = 'searchInput';
  searchInput.autocomplete = 'off';
  searchInputWrap.append(searchInput);

  const submitButton = document.createElement('button');
  submitButton.classList.add('submit-button');
  submitButton.innerHTML = `<div class="label"> Submit </div>
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path>
    </svg>`;
  searchInputWrap.append(submitButton);
  searchWrapContent.append(searchForm);

  const searchResultBox = document.createElement('div');
  searchResultBox.classList.add('searchResultBox');
  searchResultBox.style.display = 'none';
  searchResultBox.innerHTML = `<div class="swiper scrollSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide"></div>
    </div>
  </div>
  <div class="swiper-scrollbar"></div>`;
  searchWrapContent.append(searchResultBox);

  const popularKeywords = ['Business', 'FY 21', 'Brands', 'XUV700', 'Global', 'Nanhi Kali'];
  const recommendedKeywords = ['Annual Report 2021 - 2022', 'Leadership Announcement', 'Latest Press Release', 'Brand Guidelines'];

  const createSearchSuggestions = (label, keywords) => {
    const suggestionWrap = document.createElement('div');
    suggestionWrap.classList.add('search-suggestions-wrap');
    const labelDiv = document.createElement('div');
    labelDiv.classList.add('label');
    labelDiv.textContent = label;
    suggestionWrap.append(labelDiv);
    const tokensWrap = document.createElement('div');
    tokensWrap.classList.add('tokens-wrap');
    const ul = document.createElement('ul');
    keywords.forEach((keyword) => {
      const li = document.createElement('li');
      li.textContent = keyword;
      ul.append(li);
    });
    tokensWrap.append(ul);
    suggestionWrap.append(tokensWrap);
    return suggestionWrap;
  };

  searchWrapContent.append(createSearchSuggestions('Popular Keywords:', popularKeywords));
  searchWrapContent.append(createSearchSuggestions('Recommended for you:', recommendedKeywords));

  searchLiMobile.append(searchScreenWrap);
  // Clone the search screen for desktop, but only the content wrap
  const desktopSearchScreenWrap = searchScreenWrap.cloneNode(true);
  searchLiDesktop.append(desktopSearchScreenWrap);

  // Toggle search screen
  const toggleSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    searchScreenWrap.classList.toggle('active');
    desktopSearchScreenWrap.classList.toggle('active'); // Toggle for both instances
    document.body.classList.toggle('search-overlay-active');
  };
  searchLinkMobile.addEventListener('click', toggleSearch);
  searchLinkDesktop.addEventListener('click', toggleSearch);

  // Year Logo
  const yearLogoDiv = document.createElement('div');
  yearLogoDiv.classList.add('logo', 'year-80-logo');
  const yearLogoLink = document.createElement('a');
  yearLogoLink.href = yearLogoLinkRow?.querySelector('a')?.href || '#';
  const yearLogoPicture = yearLogoRow?.querySelector('picture');
  if (yearLogoPicture) {
    const img = yearLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    moveInstrumentation(yearLogoRow, optimizedPic.querySelector('img'));
    yearLogoLink.append(optimizedPic);
  }
  moveInstrumentation(yearLogoLinkRow, yearLogoLink);
  yearLogoDiv.append(yearLogoLink);
  wrap.append(yearLogoDiv);

  block.replaceChildren(root);

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  });

  // Scroll behavior (Rule 19)
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 0) {
      root.classList.add('nav-up');
    } else {
      root.classList.remove('nav-up');
    }
    lastScrollY = window.scrollY;
  });

  // Swiper initialization for search results
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  const swiperEl = searchResultBox.querySelector('.scrollSwiper');
  if (swiperEl) {
    // eslint-disable-next-line no-undef
    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      loop: false, // Assuming no loop based on typical search results
      // Add navigation/pagination if needed based on original HTML, but not present here
    });
  }

  // Event listener for search input to show/hide search results
  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim().length > 0) {
      searchResultBox.style.display = 'block';
    } else {
      searchResultBox.style.display = 'none';
    }
  });
}
