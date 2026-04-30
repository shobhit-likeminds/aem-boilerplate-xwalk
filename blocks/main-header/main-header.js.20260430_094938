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
      // Recursively transform nested lists
      transformNestedLists(nested);
    }
  });
}

export default async function decorate(block) {
  const children = [...block.children];

  const [
    logoRow,
    logoLinkRow,
    logo80Row,
    logo80LinkRow,
    ...itemRows
  ] = children;

  const navigationItems = itemRows.filter((row) => row.children.length === 8);
  const iconLinkItems = itemRows.filter((row) => row.children.length === 2);
  const newsroomItems = itemRows.filter((row) => row.children.length === 4);

  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid'); // 'nav-up' is a scroll state class, do not add initially
  header.setAttribute('data-once', 'header-hover');

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
  const logoLinkHref = logoLinkRow.querySelector('a')?.href || '#';
  logoLink.href = logoLinkHref;
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1');
    optimizedPic.querySelector('img').width = 200;
    optimizedPic.querySelector('img').height = 30;
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoRow, logoLink);
  moveInstrumentation(logoLinkRow, logoLink);
  logoDiv.append(logoLink);
  wrap.append(logoDiv);

  // Hamburger
  const hamburgerDiv = document.createElement('div');
  hamburgerDiv.classList.add('hamburger');
  hamburgerDiv.setAttribute('data-once', 'hamburger-click nav-close-search');
  const ulHamburger = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    ulHamburger.append(document.createElement('li'));
  }
  hamburgerDiv.append(ulHamburger);
  wrap.append(hamburgerDiv);

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
    const [labelCell, linkCell, hierarchyCell, leftHeadingCell, leftDescCell, leftSubDescCell, highlightListCell, singleLinkCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');
    li.setAttribute('data-once', 'nav-close-search');

    const anchor = document.createElement('a');
    anchor.setAttribute('itemprop', 'url');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell.textContent.trim();
    li.append(anchor);

    const svgSpan = document.createElement('span');
    svgSpan.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
    li.append(svgSpan);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu');
    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container');
    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div');
    const leftHeading = document.createElement('h4');
    leftHeading.classList.add('left-div-heading');
    const leftHeadingAnchor = document.createElement('a');
    leftHeadingAnchor.textContent = leftHeadingCell.textContent.trim();
    leftHeading.append(leftHeadingAnchor);
    leftDiv.append(leftHeading);

    const leftDesc = document.createElement('p');
    leftDesc.classList.add('left-div-desc');
    leftDesc.textContent = leftDescCell.textContent.trim();
    leftDiv.append(leftDesc);

    const leftSubDesc = document.createElement('p');
    leftSubDesc.classList.add('left-div-subdesc');
    leftSubDesc.textContent = leftSubDescCell.textContent.trim();
    leftDiv.append(leftSubDesc);

    const highlightList = highlightListCell.querySelector('ul');
    if (highlightList) {
      leftDiv.append(highlightList);
      highlightList.querySelectorAll('li').forEach((item) => item.classList.add('list-text-red'));
    } else if (highlightListCell.textContent.trim()) {
      const p = document.createElement('p');
      p.innerHTML = highlightListCell.innerHTML;
      leftDiv.append(p);
    }

    const singleLink = singleLinkCell.querySelector('a');
    if (singleLink) {
      const singleLinkAnchor = document.createElement('a');
      singleLinkAnchor.href = singleLink.href;
      singleLinkAnchor.textContent = singleLink.href.split('/').pop(); // Use filename as text
      leftDiv.append(singleLinkAnchor);
    }

    centerDiv.append(leftDiv);

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    const hierarchyRoot = hierarchyCell.querySelector('ul');
    if (hierarchyRoot) {
      // Move instrumentation from the original cell to the new hierarchyRoot
      moveInstrumentation(hierarchyCell, hierarchyRoot);
      subNavWrap.append(hierarchyRoot);
      transformNestedLists(hierarchyRoot);
    }
    centerDiv.append(subNavWrap);

    megaMenuWrap.append(centerDiv);
    megaMenu.append(megaMenuWrap);
    li.append(megaMenu);

    moveInstrumentation(row, li);
    navUl.append(li);
  });

  // Newsroom Press Releases
  // Find the newsroom li based on its content or a specific class if it exists in the model
  // For now, assuming a specific structure or adding a class to identify it
  const newsroomLi = navUl.querySelector('li:has(a[href*="newsroom"])'); // More robust way to find it
  if (newsroomLi) {
    const newsroomLeftDiv = newsroomLi.querySelector('.left-div'); // Assuming .left-div is the target
    if (newsroomLeftDiv) {
      const latestTwoPressRelease = document.createElement('div');
      latestTwoPressRelease.classList.add('latest-two-press-release');

      newsroomItems.forEach((row) => {
        const [pressReleaseLinkCell, pressReleaseTitleCell, pressReleaseDateCell, pressReleaseCategoryCell] = [...row.children];

        const slidesDiv = document.createElement('div');
        slidesDiv.classList.add('slides');
        const wrapDiv = document.createElement('div');
        wrapDiv.classList.add('wrap');
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        const descDiv = document.createElement('div');
        descDiv.classList.add('desc');

        const p = document.createElement('p');
        const pressReleaseAnchor = document.createElement('a');
        const foundLink = pressReleaseLinkCell.querySelector('a');
        if (foundLink) pressReleaseAnchor.href = foundLink.href;
        pressReleaseAnchor.textContent = pressReleaseTitleCell.textContent.trim();
        p.append(pressReleaseAnchor);
        descDiv.append(p);

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date');
        const dateEm = document.createElement('em');
        dateEm.textContent = pressReleaseDateCell.textContent.trim();
        const categoryEm = document.createElement('em');
        categoryEm.textContent = pressReleaseCategoryCell.textContent.trim();
        dateDiv.append(dateEm, categoryEm);
        descDiv.append(dateDiv);

        contentDiv.append(descDiv);
        wrapDiv.append(contentDiv);
        slidesDiv.append(wrapDiv);
        moveInstrumentation(row, slidesDiv);
        latestTwoPressRelease.append(slidesDiv);
      });
      newsroomLeftDiv.append(latestTwoPressRelease);
    }
  }

  // Icon Nav (Mobile)
  const iconNavMobile = document.createElement('div');
  iconNavMobile.classList.add('icon-nav', 'mobile-menus-icon');
  const ulMobile = document.createElement('ul');
  iconNavMobile.append(ulMobile);
  navUl.append(iconNavMobile);

  // Icon Nav (Desktop)
  const iconNavDesktop = document.createElement('div');
  iconNavDesktop.classList.add('icon-nav', 'desktop-menus-icon');
  const ulDesktop = document.createElement('ul');
  iconNavDesktop.append(ulDesktop);
  navUl.append(iconNavDesktop);

  iconLinkItems.forEach((row) => {
    const [linkCell, labelCell] = [...row.children];

    const li = document.createElement('li');
    const foundLink = linkCell.querySelector('a');
    const labelText = labelCell.textContent.trim();

    if (labelText.toLowerCase() === 'contact us') {
      li.classList.add('mail');
      const anchor = document.createElement('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = 'Contact Us';
      anchor.innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 48 38.4"
        style="enable-background:new 0 0 48 38.4;" xml:space="preserve" width="21" height="21">
        <path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1
                  C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7
                  L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z" />
      </svg> Contact Us`;
      li.append(anchor);
    } else if (labelText.toLowerCase() === 'search') {
      li.classList.add('search');
      li.setAttribute('data-once', 'search-toggle search-stop-propagation');
      const anchor = document.createElement('a');
      anchor.href = '#';
      anchor.setAttribute('data-once', 'search-stop-propagation'); // This data-once is redundant on inline SVG
      anchor.innerHTML = `<svg viewBox="0 0 21 21" fill="none" class="lens">
        <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
      </svg>
      <svg viewBox="0 0 50 50" class="close">
        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
      </svg>
      <span> Search</span>`;
      li.append(anchor);

      const searchScreenWrap = document.createElement('div');
      searchScreenWrap.classList.add('search-screen-wrap');
      searchScreenWrap.setAttribute('data-once', 'search-stop-propagation');
      // The form action should come from a model field if it's dynamic, otherwise hardcode is okay.
      // For now, assuming it's fixed as per original HTML.
      searchScreenWrap.innerHTML = `<div class="wrap" data-once="search-stop-propagation">
        <form action="https://www.mahindra.com/search" method="get" id="search-block-form" accept-charset="UTF-8" data-drupal-form-fields="edit-keys" data-once="search-stop-propagation">
          <div class="search-wrap" data-once="search-stop-propagation">
            <div class="search-icon" data-once="search-stop-propagation">
              <svg viewBox="0 0 21 21" fill="none">
                <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
              </svg>
            </div>
            <input type="text" class="input-text searchtext" required="" name="key" id="searchInput" autocomplete="off" data-once="search-stop-propagation"/>
            <button class="submit-button" data-once="search-stop-propagation">
              <div class="label" data-once="search-stop-propagation"> Submit </div>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path>
              </svg>
            </button>
          </div>
          <div class="searchResultBox" style="display: none;" data-once="search-stop-propagation">
            <div class="swiper scrollSwiper" data-once="search-stop-propagation">
              <div class="swiper-wrapper" data-once="search-stop-propagation">
                <div class="swiper-slide" data-once="search-stop-propagation">
                </div>
              </div>
            </div>
            <div class="swiper-scrollbar" data-once="search-stop-propagation"></div>
          </div>
        </form>
        <div class="search-suggestions-wrap" data-once="search-stop-propagation">
          <div class="label" data-once="search-stop-propagation">Popular Keywords:</div>
          <div class="tokens-wrap" data-once="search-stop-propagation">
            <ul data-once="search-stop-propagation">
              <li data-once="search-stop-propagation">Business</li>
              <li data-once="search-stop-propagation">FY 21</li>
              <li data-once="search-stop-propagation">Brands</li>
              <li data-once="search-stop-propagation">XUV700</li>
              <li data-once="search-stop-propagation">Global</li>
              <li data-once="search-stop-propagation">Nanhi Kali</li>
            </ul>
          </div>
        </div>
        <div class="search-suggestions-wrap" data-once="search-stop-propagation">
          <div class="label" data-once="search-stop-propagation">Recommended for you:</div>
          <div class="tokens-wrap" data-once="search-stop-propagation">
            <ul data-once="search-stop-propagation">
              <li data-once="search-stop-propagation">Annual Report 2021 - 2022</li>
              <li data-once="search-stop-propagation">Leadership Announcement</li>
              <li data-once="search-stop-propagation">Latest Press Release</li>
              <li data-once="search-stop-propagation">Brand Guidelines</li>
            </ul>
          </div>
        </div>
      </div>`;
      li.append(searchScreenWrap);
    }
    moveInstrumentation(row, li);
    ulMobile.append(li);
    ulDesktop.append(li.cloneNode(true)); // Clone for desktop nav
  });

  // 80th Year Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const year80LogoLink = document.createElement('a');
  const year80LogoLinkHref = logo80LinkRow.querySelector('a')?.href || '#';
  year80LogoLink.href = year80LogoLinkHref;
  const year80LogoPicture = logo80Row.querySelector('picture');
  if (year80LogoPicture) {
    const img = year80LogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1', 'years-80');
    optimizedPic.querySelector('img').width = 74;
    optimizedPic.querySelector('img').height = 60;
    year80LogoLink.append(optimizedPic);
  }
  moveInstrumentation(logo80Row, year80LogoLink);
  moveInstrumentation(logo80LinkRow, year80LogoLink);
  year80LogoDiv.append(year80LogoLink);
  wrap.append(year80LogoDiv);

  block.replaceChildren(header);

  // Hamburger menu toggle
  hamburgerDiv.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburgerDiv.classList.toggle('active');
  });

  // Search toggle
  const searchTriggers = header.querySelectorAll('.search');
  searchTriggers.forEach((searchTrigger) => {
    searchTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchTrigger.classList.toggle('active');
      const searchScreenWrap = searchTrigger.querySelector('.search-screen-wrap');
      if (searchScreenWrap) {
        searchScreenWrap.classList.toggle('active');
      }
    });
  });

  // Close search when clicking outside
  document.addEventListener('click', (e) => {
    searchTriggers.forEach((searchTrigger) => {
      const searchScreenWrap = searchTrigger.querySelector('.search-screen-wrap');
      if (searchTrigger.classList.contains('active') && searchScreenWrap && !searchScreenWrap.contains(e.target) && !searchTrigger.contains(e.target)) {
        searchTrigger.classList.remove('active');
        searchScreenWrap.classList.remove('active');
      }
    });
  });

  // Scroll behavior for header
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight) {
      header.classList.add('nav-up');
    } else if (window.scrollY < lastScrollY) {
      header.classList.remove('nav-up');
    }
    lastScrollY = window.scrollY;
  });

  // Swiper initialization for search results
  // Check if Swiper is needed and initialize it
  const searchResultBox = header.querySelector('.searchResultBox');
  if (searchResultBox) {
    await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

    const swiperEl = searchResultBox.querySelector('.scrollSwiper');
    const swiperScrollbar = searchResultBox.querySelector('.swiper-scrollbar');

    if (swiperEl && swiperScrollbar) {
      // eslint-disable-next-line no-undef
      new Swiper(swiperEl, {
        direction: 'vertical', // Assuming vertical scroll for search results
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: swiperScrollbar,
          hide: false,
        },
      });
    }
  }
}
