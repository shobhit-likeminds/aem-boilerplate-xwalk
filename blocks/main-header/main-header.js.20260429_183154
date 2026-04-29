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

  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid'); // Do NOT add 'nav-up' initially

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  // Filter rows by cell count to identify item types
  // header-logo: 3 cells, first cell has picture
  const logoRows = children.filter((row) => row.children.length === 3 && row.children[0].querySelector('picture'));
  // navigation-item: 6 cells
  const navigationItemRows = children.filter((row) => row.children.length === 6);
  // icon-nav-item: 2 cells, first cell has a link
  const iconNavItemRows = children.filter((row) => row.children.length === 2 && row.children[0].querySelector('a'));
  // header-press-release: 4 cells
  const pressReleaseRows = children.filter((row) => row.children.length === 4);

  // Logos
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  wrap.append(logoDiv);

  if (logoRows.length > 0) {
    const [logoImageCell, logoLinkCell] = [...logoRows[0].children]; // CORRECT: destructuring
    const logoLink = document.createElement('a');
    const foundLink = logoLinkCell.querySelector('a');
    if (foundLink) {
      logoLink.href = foundLink.href;
    }
    const picture = logoImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
    moveInstrumentation(logoRows[0], logoLink);
    logoDiv.append(logoLink);
  }

  // Hamburger menu
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.innerHTML = '<ul><li></li><li></li><li></li></ul>';
  wrap.append(hamburger);

  // Main Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  wrap.append(nav);

  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);

  navigationItemRows.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell, leftDivHeadingCell, leftDivDescriptionCell, leftDivSubDescriptionCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell.textContent.trim();
    li.append(anchor);

    const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrowSvg.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
    arrowSvg.setAttribute('fill', '#000000');
    arrowSvg.setAttribute('stroke', '#000000');
    arrowSvg.setAttribute('stroke-width', '4.851456000000001');
    arrowSvg.innerHTML = `<g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g>`;
    li.append(arrowSvg);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu');
    li.append(megaMenu);

    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container');
    megaMenu.append(megaMenuWrap);

    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div');
    megaMenuWrap.append(centerDiv);

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div');
    centerDiv.append(leftDiv);

    const leftDivHeading = document.createElement('h4');
    leftDivHeading.classList.add('left-div-heading');
    // The original HTML has <a> inside <h4> for leftDivHeading, so we recreate that.
    leftDivHeading.innerHTML = `<a>${leftDivHeadingCell.textContent.trim()}</a>`;
    leftDiv.append(leftDivHeading);

    if (leftDivDescriptionCell.textContent.trim()) {
      const leftDivDesc = document.createElement('p');
      leftDivDesc.classList.add('left-div-desc');
      leftDivDesc.textContent = leftDivDescriptionCell.textContent.trim();
      leftDiv.append(leftDivDesc);
    }

    if (leftDivSubDescriptionCell.textContent.trim()) {
      const leftDivSubDesc = document.createElement('p');
      leftDivSubDesc.classList.add('left-div-subdesc');
      leftDivSubDesc.textContent = leftDivSubDescriptionCell.textContent.trim();
      leftDiv.append(leftDivSubDesc);
    }

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    centerDiv.append(subNavWrap);

    // Handle richtext 'hierarchy-tree'
    const hierarchyTempDiv = document.createElement('div');
    moveInstrumentation(hierarchyCell, hierarchyTempDiv); // Move instrumentation before reading innerHTML
    hierarchyTempDiv.innerHTML = hierarchyCell.innerHTML;
    const hierarchyRoot = hierarchyTempDiv.querySelector('ul');

    if (hierarchyRoot) {
      // Apply classes from ORIGINAL HTML to nested list elements
      hierarchyRoot.querySelectorAll('li').forEach(item => item.classList.add('top-level-li'));
      hierarchyRoot.querySelectorAll('li > a').forEach(item => item.classList.add('')); // No specific class for top-level anchors in original
      hierarchyRoot.querySelectorAll('li > ul > li').forEach(item => item.classList.add('first-level-li')); // Example: for nested lists
      hierarchyRoot.querySelectorAll('li > ul > li > a').forEach(item => item.classList.add('')); // No specific class for first-level anchors in original

      subNavWrap.append(hierarchyRoot);
      transformNestedLists(hierarchyRoot);
    }

    moveInstrumentation(row, li);
    navUl.append(li);

    // Add click listener for mega menu toggle
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      li.classList.toggle('active');
      megaMenu.classList.toggle('active');
    });
  });

  // Icon Navigation (mobile-menus-icon)
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconUl = document.createElement('ul');
  mobileIconNav.append(mobileIconUl);
  navUl.append(mobileIconNav); // Append to main nav ul for mobile

  iconNavItemRows.forEach((row) => {
    const [iconLinkCell, iconLabelCell] = [...row.children]; // CORRECT: destructuring
    const li = document.createElement('li');
    // Determine class based on label content, as per original HTML
    if (iconLabelCell.textContent.trim() === 'Contact Us') {
      li.classList.add('mail');
    } else {
      // Default or other specific classes if needed
      li.classList.add('mail'); // Assuming 'mail' or 'search' based on context, 'mail' is present in original
    }

    const anchor = document.createElement('a');
    const foundLink = iconLinkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = iconLabelCell.textContent.trim();
    li.append(anchor);
    moveInstrumentation(row, li);
    mobileIconUl.append(li);
  });

  // Search icon (mobile)
  const mobileSearchLi = document.createElement('li');
  mobileSearchLi.classList.add('search');
  // Extract search form action from original HTML
  const searchFormAction = 'https://www.mahindra.com/search'; // From original HTML
  mobileSearchLi.innerHTML = `
    <a href="#">
      <svg viewBox="0 0 21 21" fill="none" class="lens">
        <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
      </svg>
      <svg viewBox="0 0 50 50" class="close">
        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
      </svg>
      <span> Search</span>
    </a>
    <div class="search-screen-wrap">
      <div class="wrap">
        <form action="${searchFormAction}" method="get" id="search-block-form" accept-charset="UTF-8">
          <div class="search-wrap">
            <div class="search-icon">
              <svg viewBox="0 0 21 21" fill="none">
                <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
              </svg>
            </div>
            <input type="text" class="input-text searchtext" required="" name="key" id="searchInput" autocomplete="off"/>
            <button class="submit-button">
              <div class="label"> Submit </div>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path>
              </svg>
            </button>
          </div>
          <div class="searchResultBox" style="display: none;">
            <div class="swiper scrollSwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                </div>
              </div>
            </div>
            <div class="swiper-scrollbar"></div>
          </div>
        </form>
        <div class="search-suggestions-wrap">
          <div class="label">Popular Keywords:</div>
          <div class="tokens-wrap">
            <ul>
              <li>Business</li>
              <li>FY 21</li>
              <li>Brands</li>
              <li>XUV700</li>
              <li>Global</li>
              <li>Nanhi Kali</li>
            </ul>
          </div>
        </div>
        <div class="search-suggestions-wrap">
          <div class="label">Recommended for you:</div>
          <div class="tokens-wrap">
            <ul>
              <li>Annual Report 2021 - 2022</li>
              <li>Leadership Announcement</li>
              <li>Latest Press Release</li>
              <li>Brand Guidelines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  mobileIconUl.append(mobileSearchLi);

  // Icon Navigation (desktop-menus-icon)
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconUl = document.createElement('ul');
  desktopIconNav.append(desktopIconUl);
  nav.append(desktopIconNav); // Append to main nav for desktop

  iconNavItemRows.forEach((row) => {
    const [iconLinkCell, iconLabelCell] = [...row.children]; // CORRECT: destructuring
    const li = document.createElement('li');
    if (iconLabelCell.textContent.trim() === 'Contact Us') {
      li.classList.add('mail');
    } else {
      li.classList.add('mail'); // Assuming 'mail' or 'search' based on context, 'mail' is present in original
    }

    const anchor = document.createElement('a');
    const foundLink = iconLinkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    if (iconLabelCell.textContent.trim() === 'Contact Us') {
      // Use the SVG from the original HTML
      anchor.innerHTML = `<svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 48 38.4" style="enable-background:new 0 0 48 38.4;" xml:space="preserve" width="21" height="21" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z"></path></svg>`;
    } else {
      anchor.textContent = iconLabelCell.textContent.trim();
    }
    li.append(anchor);
    moveInstrumentation(row, li);
    desktopIconUl.append(li);
  });

  // Search icon (desktop)
  const desktopSearchLi = document.createElement('li');
  desktopSearchLi.classList.add('search');
  desktopSearchLi.innerHTML = `
    <a href="#">
      <svg viewBox="0 0 21 21" fill="none" class="lens">
        <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
      </svg>
      <svg viewBox="0 0 50 50" class="close">
        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
      </svg>
    </a>
    <div class="search-screen-wrap">
      <div class="wrap">
        <form action="${searchFormAction}" method="get" id="search-block-form" accept-charset="UTF-8">
          <div class="search-wrap">
            <div class="search-icon">
              <svg viewBox="0 0 21 21" fill="none">
                <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
              </svg>
            </div>
            <input type="text" class="input-text searchtext" required="" name="key" id="searchInput" autocomplete="off"/>
            <button class="submit-button">
              <div class="label"> Submit </div>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path>
              </svg>
            </button>
          </div>
          <div class="searchResultBox" style="display: none;">
            <div class="swiper scrollSwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                </div>
              </div>
            </div>
            <div class="swiper-scrollbar"></div>
          </div>
        </form>
        <div class="search-suggestions-wrap">
          <div class="label">Popular Keywords:</div>
          <div class="tokens-wrap">
            <ul>
              <li>Business</li>
              <li>FY 21</li>
              <li>Brands</li>
              <li>XUV700</li>
              <li>Global</li>
              <li>Nanhi Kali</li>
            </ul>
          </div>
        </div>
        <div class="search-suggestions-wrap">
          <div class="label">Recommended for you:</div>
          <div class="tokens-wrap">
            <ul>
              <li>Annual Report 2021 - 2022</li>
              <li>Leadership Announcement</li>
              <li>Latest Press Release</li>
              <li>Brand Guidelines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  desktopIconUl.append(desktopSearchLi);

  // Year 80 logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  wrap.append(year80LogoDiv);

  if (logoRows.length > 1) { // Assuming the second logo row is for the 80th year logo
    const [logoImageCell, logoLinkCell] = [...logoRows[1].children]; // CORRECT: destructuring
    const year80LogoLink = document.createElement('a');
    const foundLink = logoLinkCell.querySelector('a');
    if (foundLink) {
      year80LogoLink.href = foundLink.href;
    }
    const picture = logoImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      year80LogoLink.append(optimizedPic);
    }
    moveInstrumentation(logoRows[1], year80LogoLink);
    year80LogoDiv.append(year80LogoLink);
  }

  // Hamburger menu click listener
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('disable-scroll');
  });

  // Search toggle listener
  const searchTriggers = block.querySelectorAll('.search > a');
  const searchScreen = block.querySelector('.search-screen-wrap');
  searchTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchScreen.classList.toggle('active');
      trigger.closest('.search').classList.toggle('active');
    });
  });

  searchScreen.addEventListener('click', (e) => {
    if (e.target === searchScreen) {
      searchScreen.classList.remove('active');
      block.querySelector('.search').classList.remove('active');
    }
  });

  block.replaceChildren(header);

  // Swiper initialization for search results
  const searchResultBox = block.querySelector('.searchResultBox');
  if (searchResultBox) {
    await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

    const swiperEl = searchResultBox.querySelector('.scrollSwiper');
    const paginationEl = searchResultBox.querySelector('.swiper-scrollbar');

    if (swiperEl && paginationEl) {
      // eslint-disable-next-line no-undef
      new Swiper(swiperEl, {
        slidesPerView: 'auto',
        loop: false, // As per original HTML, no data-loop="true"
        // Navigation and pagination elements are not present in the hardcoded searchResultBox,
        // but if they were, they would be wired up here.
        // For now, only pagination is explicitly mentioned as swiper-scrollbar.
        pagination: {
          el: paginationEl,
          clickable: true,
        },
      });
    }
  }
}
