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

function transformInnerNestedLists(rootUl) {
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
      subWrap.classList.add('has-inner-sub-child');
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active-child');
          subWrap.classList.toggle('active-child');
        });
      }
      transformInnerNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default async function decorate(block) {
  const children = [...block.children];

  const [
    logoRow,
    logoLinkRow,
    year80LogoRow,
    year80LogoLinkRow,
    ...itemRows
  ] = children;

  const navigationItems = itemRows.filter((row) => row.children.length === 6);
  const iconLinkItems = itemRows.filter((row) => row.children.length === 2);
  const pressReleaseItems = itemRows.filter((row) => row.children.length === 4);

  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid'); // Do not add 'nav-up'

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const logoLink = document.createElement('a');
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  moveInstrumentation(logoLinkRow, logoLink);
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
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

  // Main Nav
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  nav.setAttribute('data-once', 'initSubChildToggle');
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);
  wrap.append(nav);

  // Navigation Items
  navigationItems.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell, leftHeadingCell, leftDescCell, leftSubDescCell] = [
      ...row.children,
    ];
    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');
    li.setAttribute('data-once', 'nav-close-search');

    const anchor = document.createElement('a');
    anchor.setAttribute('itemprop', 'url');
    anchor.href = linkCell.querySelector('a')?.href || '#';
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(labelCell, anchor);
    moveInstrumentation(linkCell, anchor);
    li.append(anchor);

    const svgSpan = document.createElement('span');
    svgSpan.innerHTML = `<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>`;
    li.append(svgSpan);

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
    const leftHeading = document.createElement('h4');
    leftHeading.classList.add('left-div-heading');
    const leftHeadingAnchor = document.createElement('a');
    leftHeadingAnchor.textContent = leftHeadingCell.textContent.trim();
    moveInstrumentation(leftHeadingCell, leftHeadingAnchor);
    leftHeading.append(leftHeadingAnchor);
    leftDiv.append(leftHeading);

    const leftDesc = document.createElement('p');
    leftDesc.classList.add('left-div-desc');
    leftDesc.textContent = leftDescCell.textContent.trim();
    moveInstrumentation(leftDescCell, leftDesc);
    leftDiv.append(leftDesc);

    const leftSubDesc = document.createElement('p');
    leftSubDesc.classList.add('left-div-subdesc');
    leftSubDesc.textContent = leftSubDescCell.textContent.trim();
    moveInstrumentation(leftSubDescCell, leftSubDesc);
    leftDiv.append(leftSubDesc);
    centerDiv.append(leftDiv);

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap', 'about-us-sub-nav'); // specific class from original HTML

    const tempDiv = document.createElement('div');
    moveInstrumentation(hierarchyCell, tempDiv);
    tempDiv.innerHTML = hierarchyCell.innerHTML;

    const hierarchyRoot = tempDiv.querySelector('ul');
    if (hierarchyRoot) {
      // Apply classes from original HTML to nested elements
      hierarchyRoot.querySelectorAll('li').forEach(item => item.classList.add('list-item'));
      hierarchyRoot.querySelectorAll('a').forEach(item => item.classList.add('nav-menu-item'));

      subNavWrap.append(hierarchyRoot);
      transformNestedLists(hierarchyRoot);
      transformInnerNestedLists(hierarchyRoot);
    }
    centerDiv.append(subNavWrap);
    li.append(megaMenu);
    navUl.append(li);

    // Toggle mega menu on click
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      li.classList.toggle('active');
      megaMenu.classList.toggle('active');
    });
    svgSpan.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      li.classList.toggle('active');
      megaMenu.classList.toggle('active');
    });
  });

  // Icon Nav (Mobile)
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconUl = document.createElement('ul');
  mobileIconNav.append(mobileIconUl);

  // Contact Us Icon
  const contactLiMobile = document.createElement('li');
  contactLiMobile.classList.add('mail');
  const contactLinkMobile = document.createElement('a');
  // This link is hardcoded in ORIGINAL HTML, so it's fine to hardcode here.
  contactLinkMobile.href = 'https://www.mahindra.com/contact-us';
  contactLinkMobile.textContent = 'Contact Us';
  mobileIconUl.append(contactLiMobile);

  // Search Icon (Mobile)
  const searchLiMobile = document.createElement('li');
  searchLiMobile.classList.add('search');
  searchLiMobile.setAttribute('data-once', 'search-toggle search-stop-propagation');
  const searchLinkMobile = document.createElement('a');
  searchLinkMobile.href = '#';
  searchLinkMobile.setAttribute('data-once', 'search-stop-propagation');
  searchLinkMobile.innerHTML = `<svg viewBox="0 0 21 21" fill="none" class="lens" data-once="search-stop-propagation">
    <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path>
  </svg>
  <svg viewBox="0 0 50 50" class="close" data-once="search-stop-propagation">
    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" data-once="search-stop-propagation"></path>
  </svg>
  <span data-once="search-stop-propagation"> Search</span>`;
  searchLiMobile.append(searchLinkMobile);
  mobileIconUl.append(searchLiMobile);

  const searchScreenWrapMobile = document.createElement('div');
  searchScreenWrapMobile.classList.add('search-screen-wrap');
  searchScreenWrapMobile.setAttribute('data-once', 'search-stop-propagation');

  const searchWrapMobile = document.createElement('div');
  searchWrapMobile.classList.add('wrap');
  searchWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapMobile.append(searchWrapMobile);

  const searchFormMobile = document.createElement('form');
  searchFormMobile.action = 'https://www.mahindra.com/search';
  searchFormMobile.method = 'get';
  searchFormMobile.id = 'search-block-form';
  searchFormMobile.setAttribute('accept-charset', 'UTF-8');
  searchFormMobile.setAttribute('data-drupal-form-fields', 'edit-keys');
  searchFormMobile.setAttribute('data-once', 'search-stop-propagation');
  searchWrapMobile.append(searchFormMobile);

  const searchInputWrapMobile = document.createElement('div');
  searchInputWrapMobile.classList.add('search-wrap');
  searchInputWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  searchFormMobile.append(searchInputWrapMobile);

  searchInputWrapMobile.innerHTML = `<div class="search-icon" data-once="search-stop-propagation">
          <svg viewBox="0 0 21 21" fill="none" data-once="search-stop-propagation">
            <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path>
          </svg>
        </div>
        <input type="text" class="input-text searchtext" required="" name="key" id="searchInput" autocomplete="off" data-once="search-stop-propagation"/>
        <button class="submit-button" data-once="search-stop-propagation">
          <div class="label" data-once="search-stop-propagation"> Submit </div>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" data-once="search-stop-propagation">
            <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black" data-once="search-stop-propagation"></path>
          </svg>
        </button>`;

  const searchResultBoxMobile = document.createElement('div');
  searchResultBoxMobile.classList.add('searchResultBox');
  searchResultBoxMobile.style.display = 'none';
  searchResultBoxMobile.setAttribute('data-once', 'search-stop-propagation');
  searchFormMobile.append(searchResultBoxMobile);

  const swiperContainerMobile = document.createElement('div');
  swiperContainerMobile.classList.add('swiper', 'scrollSwiper');
  swiperContainerMobile.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxMobile.append(swiperContainerMobile);

  const swiperWrapperMobile = document.createElement('div');
  swiperWrapperMobile.classList.add('swiper-wrapper');
  swiperWrapperMobile.setAttribute('data-once', 'search-stop-propagation');
  swiperContainerMobile.append(swiperWrapperMobile);

  pressReleaseItems.forEach((row) => {
    const [pressLinkCell, pressTitleCell, pressDateCell, pressCategoryCell] = [...row.children];
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    moveInstrumentation(row, slide); // Move instrumentation from the row to the slide

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    const descDiv = document.createElement('div');
    descDiv.classList.add('desc');

    const linkP = document.createElement('p');
    const linkA = document.createElement('a');
    linkA.href = pressLinkCell.querySelector('a')?.href || '#';
    linkA.textContent = pressTitleCell.textContent.trim();
    moveInstrumentation(pressLinkCell, linkA);
    moveInstrumentation(pressTitleCell, linkA);
    linkP.append(linkA);
    descDiv.append(linkP);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    const dateEm = document.createElement('em');
    dateEm.textContent = pressDateCell.textContent.trim();
    moveInstrumentation(pressDateCell, dateEm);
    dateDiv.append(dateEm);
    const categoryEm = document.createElement('em');
    categoryEm.textContent = pressCategoryCell.textContent.trim();
    moveInstrumentation(pressCategoryCell, categoryEm);
    dateDiv.append(categoryEm);
    descDiv.append(dateDiv);

    contentDiv.append(descDiv);
    slide.append(contentDiv);
    swiperWrapperMobile.append(slide);
  });

  const swiperScrollbarMobile = document.createElement('div');
  swiperScrollbarMobile.classList.add('swiper-scrollbar');
  swiperScrollbarMobile.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxMobile.append(swiperScrollbarMobile);

  // Search suggestions (Popular Keywords)
  const popularKeywordsWrapMobile = document.createElement('div');
  popularKeywordsWrapMobile.classList.add('search-suggestions-wrap');
  popularKeywordsWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  popularKeywordsWrapMobile.innerHTML = `<div class="label" data-once="search-stop-propagation">Popular Keywords:</div>
      <div class="tokens-wrap" data-once="search-stop-propagation">
        <ul data-once="search-stop-propagation">
          ${iconLinkItems.map(row => {
            const [iconLabelCell] = [...row.children];
            return `<li data-once="search-stop-propagation">${iconLabelCell.textContent.trim()}</li>`;
          }).join('')}
        </ul>
      </div>`;
  searchWrapMobile.append(popularKeywordsWrapMobile);

  // Search suggestions (Recommended for you) - using iconLinkItems for example, adjust as needed
  const recommendedKeywordsWrapMobile = document.createElement('div');
  recommendedKeywordsWrapMobile.classList.add('search-suggestions-wrap');
  recommendedKeywordsWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  recommendedKeywordsWrapMobile.innerHTML = `<div class="label" data-once="search-stop-propagation">Recommended for you:</div>
      <div class="tokens-wrap" data-once="search-stop-propagation">
        <ul data-once="search-stop-propagation">
          ${iconLinkItems.map(row => {
            const [iconLabelCell] = [...row.children];
            return `<li data-once="search-stop-propagation">${iconLabelCell.textContent.trim()}</li>`;
          }).join('')}
        </ul>
      </div>`;
  searchWrapMobile.append(recommendedKeywordsWrapMobile);

  searchLiMobile.append(searchScreenWrapMobile);
  navUl.append(mobileIconNav);

  // Icon Nav (Desktop)
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconUl = document.createElement('ul');
  desktopIconNav.append(desktopIconUl);

  // Contact Us Icon
  const contactLiDesktop = document.createElement('li');
  contactLiDesktop.classList.add('mail');
  const contactLinkDesktop = document.createElement('a');
  // This link is hardcoded in ORIGINAL HTML, so it's fine to hardcode here.
  contactLinkDesktop.href = 'https://www.mahindra.com/contact-us';
  contactLinkDesktop.innerHTML = `<svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 48 38.4" style="enable-background:new 0 0 48 38.4;" xml:space="preserve" width="21" height="21" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1
              C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7
              L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z"></path>
  </svg>`;
  contactLiDesktop.append(contactLinkDesktop);
  desktopIconUl.append(contactLiDesktop);

  // Search Icon (Desktop)
  const searchLiDesktop = document.createElement('li');
  searchLiDesktop.classList.add('search');
  searchLiDesktop.setAttribute('data-once', 'search-toggle search-stop-propagation');
  const searchLinkDesktop = document.createElement('a');
  searchLinkDesktop.href = '#';
  searchLinkDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchLinkDesktop.innerHTML = `<svg viewBox="0 0 21 21" fill="none" class="lens" data-once="search-stop-propagation">
    <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path>
  </svg>
  <svg viewBox="0 0 50 50" class="close" data-once="search-stop-propagation">
    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" data-once="search-stop-propagation"></path>
  </svg>`;
  searchLiDesktop.append(searchLinkDesktop);
  desktopIconUl.append(searchLiDesktop);

  const searchScreenWrapDesktop = document.createElement('div');
  searchScreenWrapDesktop.classList.add('search-screen-wrap');
  searchScreenWrapDesktop.setAttribute('data-once', 'search-stop-propagation');

  const searchWrapDesktop = document.createElement('div');
  searchWrapDesktop.classList.add('wrap');
  searchWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapDesktop.append(searchWrapDesktop);

  const searchFormDesktop = document.createElement('form');
  searchFormDesktop.action = 'https://www.mahindra.com/search';
  searchFormDesktop.method = 'get';
  searchFormDesktop.id = 'search-block-form';
  searchFormDesktop.setAttribute('accept-charset', 'UTF-8');
  searchFormDesktop.setAttribute('data-drupal-form-fields', 'edit-keys');
  searchFormDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchWrapDesktop.append(searchFormDesktop);

  const searchInputWrapDesktop = document.createElement('div');
  searchInputWrapDesktop.classList.add('search-wrap');
  searchInputWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchFormDesktop.append(searchInputWrapDesktop);

  searchInputWrapDesktop.innerHTML = `<div class="search-icon" data-once="search-stop-propagation">
          <svg viewBox="0 0 21 21" fill="none" data-once="search-stop-propagation">
            <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path>
          </svg>
        </div>
        <input type="text" class="input-text searchtext" required="" name="key" id="searchInput" autocomplete="off" data-once="search-stop-propagation"/>
        <button class="submit-button" data-once="search-stop-propagation">
          <div class="label" data-once="search-stop-propagation"> Submit </div>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" data-once="search-stop-propagation">
            <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black" data-once="search-stop-propagation"></path>
          </svg>
        </button>`;

  const searchResultBoxDesktop = document.createElement('div');
  searchResultBoxDesktop.classList.add('searchResultBox');
  searchResultBoxDesktop.style.display = 'none';
  searchResultBoxDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchFormDesktop.append(searchResultBoxDesktop);

  const swiperContainerDesktop = document.createElement('div');
  swiperContainerDesktop.classList.add('swiper', 'scrollSwiper');
  swiperContainerDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxDesktop.append(swiperContainerDesktop);

  const swiperWrapperDesktop = document.createElement('div');
  swiperWrapperDesktop.classList.add('swiper-wrapper');
  swiperWrapperDesktop.setAttribute('data-once', 'search-stop-propagation');
  swiperContainerDesktop.append(swiperWrapperDesktop);

  pressReleaseItems.forEach((row) => {
    const [pressLinkCell, pressTitleCell, pressDateCell, pressCategoryCell] = [...row.children];
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    moveInstrumentation(row, slide); // Move instrumentation from the row to the slide

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    const descDiv = document.createElement('div');
    descDiv.classList.add('desc');

    const linkP = document.createElement('p');
    const linkA = document.createElement('a');
    linkA.href = pressLinkCell.querySelector('a')?.href || '#';
    linkA.textContent = pressTitleCell.textContent.trim();
    moveInstrumentation(pressLinkCell, linkA);
    moveInstrumentation(pressTitleCell, linkA);
    linkP.append(linkA);
    descDiv.append(linkP);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    const dateEm = document.createElement('em');
    dateEm.textContent = pressDateCell.textContent.trim();
    moveInstrumentation(pressDateCell, dateEm);
    dateDiv.append(dateEm);
    const categoryEm = document.createElement('em');
    categoryEm.textContent = pressCategoryCell.textContent.trim();
    moveInstrumentation(pressCategoryCell, categoryEm);
    dateDiv.append(categoryEm);
    descDiv.append(dateDiv);

    contentDiv.append(descDiv);
    slide.append(contentDiv);
    swiperWrapperDesktop.append(slide);
  });

  const swiperScrollbarDesktop = document.createElement('div');
  swiperScrollbarDesktop.classList.add('swiper-scrollbar');
  swiperScrollbarDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxDesktop.append(swiperScrollbarDesktop);

  // Search suggestions (Popular Keywords)
  const popularKeywordsWrapDesktop = document.createElement('div');
  popularKeywordsWrapDesktop.classList.add('search-suggestions-wrap');
  popularKeywordsWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  popularKeywordsWrapDesktop.innerHTML = `<div class="label" data-once="search-stop-propagation">Popular Keywords:</div>
      <div class="tokens-wrap" data-once="search-stop-propagation">
        <ul data-once="search-stop-propagation">
          ${iconLinkItems.map(row => {
            const [iconLabelCell] = [...row.children];
            return `<li data-once="search-stop-propagation">${iconLabelCell.textContent.trim()}</li>`;
          }).join('')}
        </ul>
      </div>`;
  searchWrapDesktop.append(popularKeywordsWrapDesktop);

  // Search suggestions (Recommended for you) - using iconLinkItems for example, adjust as needed
  const recommendedKeywordsWrapDesktop = document.createElement('div');
  recommendedKeywordsWrapDesktop.classList.add('search-suggestions-wrap');
  recommendedKeywordsWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  recommendedKeywordsWrapDesktop.innerHTML = `<div class="label" data-once="search-stop-propagation">Recommended for you:</div>
      <div class="tokens-wrap" data-once="search-stop-propagation">
        <ul data-once="search-stop-propagation">
          ${iconLinkItems.map(row => {
            const [iconLabelCell] = [...row.children];
            return `<li data-once="search-stop-propagation">${iconLabelCell.textContent.trim()}</li>`;
          }).join('')}
        </ul>
      </div>`;
  searchWrapDesktop.append(recommendedKeywordsWrapDesktop);

  searchLiDesktop.append(searchScreenWrapDesktop);
  nav.append(desktopIconNav);

  // 80th Year Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const year80LogoLink = document.createElement('a');
  year80LogoLink.href = year80LogoLinkRow.querySelector('a')?.href || '#';
  moveInstrumentation(year80LogoLinkRow, year80LogoLink);
  const year80LogoPicture = year80LogoRow.querySelector('picture');
  if (year80LogoPicture) {
    const img = year80LogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    moveInstrumentation(year80LogoRow, optimizedPic.querySelector('img'));
    year80LogoLink.append(optimizedPic);
  }
  year80LogoDiv.append(year80LogoLink);
  wrap.append(year80LogoDiv);

  block.replaceChildren(header);

  // Add event listeners for hamburger menu
  const mainNav = header.querySelector('.main-nav');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
    header.classList.toggle('active');
  });

  // Add event listeners for search toggle
  const searchTriggers = header.querySelectorAll('.icon-nav .search > a');
  searchTriggers.forEach((trigger) => {
    const searchLi = trigger.closest('.search');
    const searchScreen = searchLi.querySelector('.search-screen-wrap');
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchLi.classList.toggle('active');
      searchScreen.classList.toggle('active');
      header.classList.toggle('search-active');
    });
    searchScreen.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent clicks inside search screen from closing it
    });
  });

  // Close search and nav when clicking outside
  document.addEventListener('click', (e) => {
    const activeSearch = header.querySelector('.icon-nav .search.active');
    if (activeSearch && !activeSearch.contains(e.target)) {
      activeSearch.classList.remove('active');
      activeSearch.querySelector('.search-screen-wrap').classList.remove('active');
      header.classList.remove('search-active');
    }

    const activeNav = header.querySelector('.main-nav.active');
    if (activeNav && !activeNav.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      activeNav.classList.remove('active');
      header.classList.remove('active');
    }
  });

  // Add scroll behavior
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
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  const swiperEls = header.querySelectorAll('.scrollSwiper');
  swiperEls.forEach((swiperEl) => {
    // eslint-disable-next-line no-undef
    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      loop: false, // Original HTML doesn't specify loop, default to false
      // Navigation and pagination are not present in the search result swiper in original HTML
      // If they were, they would be configured here.
    });
  });
}
