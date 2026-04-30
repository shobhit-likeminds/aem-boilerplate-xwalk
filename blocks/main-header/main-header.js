import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createSvgIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
  svg.setAttribute('fill', '#000000');
  svg.setAttribute('stroke', '#000000');
  svg.setAttribute('stroke-width', '4.851456000000001');

  const g1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g1.setAttribute('id', 'SVGRepo_bgCarrier');
  g1.setAttribute('stroke-width', '0');
  svg.appendChild(g1);

  const g2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g2.setAttribute('id', 'SVGRepo_tracerCarrier');
  g2.setAttribute('stroke-linecap', 'round');
  g2.setAttribute('stroke-linejoin', 'round');
  g2.setAttribute('stroke', '#CCCCCC');
  g2.setAttribute('stroke-width', '0.30321600000000004');
  svg.appendChild(g2);

  const g3 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g3.setAttribute('id', 'SVGRepo_iconCarrier');
  const g4 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g4.setAttribute('id', 'Group_65');
  g4.setAttribute('data-name', 'Group 65');
  g4.setAttribute('transform', 'translate(-831.568 -384.448)');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('id', 'Path_57');
  path.setAttribute('data-name', 'Path 57');
  path.setAttribute('d', 'M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z');
  path.setAttribute('fill', '#030408');
  g4.appendChild(path);
  g3.appendChild(g4);
  svg.appendChild(g3);

  return svg;
}

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
    }
  });
}

export default async function decorate(block) {
  const [logoRow, logoLinkRow, year80LogoRow, year80LogoLinkRow, ...itemRows] = [...block.children];

  const navigationItems = itemRows.filter((row) => row.children.length === 4);
  // The original filter for pressReleaseItems used a[href*="pressReleaseLink"] which is fragile.
  // Based on the BlockJson, press-release-item has 4 cells, and the first cell is the link.
  // navigation-item also has 4 cells, but its first cell is text.
  // So, we can distinguish by checking if the first cell contains an anchor.
  const pressReleaseItems = itemRows.filter((row) => row.children.length === 4 && row.children[0].querySelector('a'));
  const contactLinkItems = itemRows.filter((row) => row.children.length === 2);

  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid'); // No 'nav-up'

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
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  } else {
    logoLink.href = '#';
  }
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.appendChild(optimizedPic);
  }
  logoDiv.appendChild(logoLink);
  moveInstrumentation(logoRow, logoLink);
  moveInstrumentation(logoLinkRow, logoLink);
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
  wrap.appendChild(nav);

  navigationItems.forEach((row) => {
    const [labelCell, linkCell, megaMenuContentCell, hierarchyTreeCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');

    const anchor = document.createElement('a');
    anchor.setAttribute('itemprop', 'url');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    } else {
      anchor.href = '#';
    }
    anchor.textContent = labelCell.textContent.trim();
    li.appendChild(anchor);
    li.appendChild(createSvgIcon());
    moveInstrumentation(row, li);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu');
    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container');
    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div'); // Corrected classList.classList.add to classList.add
    leftDiv.innerHTML = megaMenuContentCell.innerHTML;
    moveInstrumentation(megaMenuContentCell, leftDiv); // Move instrumentation for richtext
    centerDiv.appendChild(leftDiv);

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap', 'about-us-sub-nav');
    const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
    if (hierarchyRoot) {
      // Create a temporary div to hold the hierarchy content and apply classes
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyTreeCell.innerHTML;
      moveInstrumentation(hierarchyTreeCell, tempDiv); // Move instrumentation for richtext

      // Apply classes to nested elements as per ORIGINAL HTML
      tempDiv.querySelectorAll('ul').forEach((ul) => {
        // No specific classes on ULs in ORIGINAL HTML, but keep structure
      });
      tempDiv.querySelectorAll('li').forEach((liElement) => {
        // No specific classes on LIs in ORIGINAL HTML, but keep structure
      });
      tempDiv.querySelectorAll('a').forEach((aElement) => {
        // No specific classes on A elements in ORIGINAL HTML, but keep structure
      });

      // Append all children from the temporary div to subNavWrap
      while (tempDiv.firstChild) {
        subNavWrap.appendChild(tempDiv.firstChild);
      }
      transformNestedLists(subNavWrap.querySelector('ul')); // Apply transformations to the new UL
    }
    centerDiv.appendChild(subNavWrap);

    megaMenuWrap.appendChild(centerDiv);
    megaMenu.appendChild(megaMenuWrap);
    li.appendChild(megaMenu);
    navUl.appendChild(li);

    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      li.classList.toggle('active');
    });
  });

  // Contact Links and Search
  const iconNavDesktop = document.createElement('div');
  iconNavDesktop.classList.add('icon-nav', 'desktop-menus-icon');
  const ulIconNavDesktop = document.createElement('ul');
  iconNavDesktop.appendChild(ulIconNavDesktop);
  nav.appendChild(iconNavDesktop);

  contactLinkItems.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('mail');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    } else {
      anchor.href = '#';
    }
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, anchor);
    li.appendChild(anchor);
    ulIconNavDesktop.appendChild(li);
  });

  // Search icon (desktop)
  const liSearchDesktop = document.createElement('li');
  liSearchDesktop.classList.add('search');
  const searchAnchorDesktop = document.createElement('a');
  searchAnchorDesktop.href = '#';
  const searchLensDesktop = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  searchLensDesktop.setAttribute('viewBox', '0 0 21 21');
  searchLensDesktop.setAttribute('fill', 'none');
  searchLensDesktop.classList.add('lens');
  searchLensDesktop.innerHTML = '<path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>';
  searchAnchorDesktop.appendChild(searchLensDesktop);
  const searchCloseDesktop = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  searchCloseDesktop.setAttribute('viewBox', '0 0 50 50');
  searchCloseDesktop.classList.add('close');
  searchCloseDesktop.innerHTML = '<path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>';
  searchAnchorDesktop.appendChild(searchCloseDesktop);
  liSearchDesktop.appendChild(searchAnchorDesktop);
  ulIconNavDesktop.appendChild(liSearchDesktop);

  // 80th Year Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const year80LogoLink = document.createElement('a');
  const foundYear80LogoLink = year80LogoLinkRow.querySelector('a');
  if (foundYear80LogoLink) {
    year80LogoLink.href = foundYear80LogoLink.href;
  } else {
    year80LogoLink.href = '#';
  }
  const year80LogoPicture = year80LogoRow.querySelector('picture');
  if (year80LogoPicture) {
    const img = year80LogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    year80LogoLink.appendChild(optimizedPic);
  }
  year80LogoDiv.appendChild(year80LogoLink);
  moveInstrumentation(year80LogoRow, year80LogoLink);
  moveInstrumentation(year80LogoLinkRow, year80LogoLink);
  wrap.appendChild(year80LogoDiv);

  block.replaceChildren(header);

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('disable-scroll');
  });

  // Search functionality
  const searchScreenWrap = document.createElement('div');
  searchScreenWrap.classList.add('search-screen-wrap');

  // Hardcoded text from ORIGINAL HTML for search suggestions
  const popularKeywords = ['Business', 'FY 21', 'Brands', 'XUV700', 'Global', 'Nanhi Kali'];
  const recommendedKeywords = ['Annual Report 2021 - 2022', 'Leadership Announcement', 'Latest Press Release', 'Brand Guidelines'];

  searchScreenWrap.innerHTML = `
    <div class="wrap">
      <form action="https://www.mahindra.com/search" method="get" id="search-block-form" accept-charset="UTF-8">
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
            ${popularKeywords.map((keyword) => `<li>${keyword}</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="search-suggestions-wrap">
        <div class="label">Recommended for you:</div>
        <div class="tokens-wrap">
          <ul>
            ${recommendedKeywords.map((keyword) => `<li>${keyword}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
  header.appendChild(searchScreenWrap);

  const toggleSearch = () => {
    searchScreenWrap.classList.toggle('active');
    document.body.classList.toggle('disable-scroll');
  };

  liSearchDesktop.addEventListener('click', toggleSearch);
  searchCloseDesktop.addEventListener('click', toggleSearch);

  // Swiper initialization for search results (if needed)
  const searchResultBox = searchScreenWrap.querySelector('.searchResultBox');
  if (searchResultBox) {
    await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

    const swiperEl = searchResultBox.querySelector('.scrollSwiper');
    const paginationEl = searchResultBox.querySelector('.swiper-scrollbar');

    if (swiperEl && paginationEl) {
      // eslint-disable-next-line no-undef
      new Swiper(swiperEl, {
        slidesPerView: 'auto',
        loop: false, // Assuming no loop based on original HTML
        pagination: {
          el: paginationEl,
          clickable: true,
        },
      });
    }
  }
}
