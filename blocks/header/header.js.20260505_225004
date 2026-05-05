import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function getArrowSVG() {
  return `<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>`;
}

function getMailSVG() {
  return `<svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 48 38.4" style="enable-background:new 0 0 48 38.4;" xml:space="preserve" width="21" height="21" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1
              C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7
              L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z"></path>
  </svg>`;
}

function getSearchLensSVG() {
  return `<svg viewBox="0 0 21 21" fill="none" class="lens">
    <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
  </svg>`;
}

function getSearchCloseSVG() {
  return `<svg viewBox="0 0 50 50" class="close">
    <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
  </svg>`;
}

function getSubmitArrowSVG() {
  return `<svg width="12" height="8" viewBox="0 0 12 8" fill="none">
    <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path>
  </svg>`;
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
  const children = [...block.children];

  const [
    logoRow,
    logoLinkRow,
    year80LogoRow,
    year80LogoLinkRow,
    ...itemRows
  ] = children;

  const navigationItems = itemRows.filter((row) => row.children.length >= 3);
  const contactLinkItems = itemRows.filter((row) => row.children.length === 2);

  const header = document.createElement('header');
  header.classList.add('main-header', 'solid'); // Do NOT add 'with-marquee' or 'nav-up'

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
  logoLink.href = logoLinkRow?.querySelector('a')?.href || '#';
  moveInstrumentation(logoLinkRow, logoLink);
  const logoPicture = logoRow?.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoRow, logoLink);
  logoDiv.append(logoLink);
  wrap.append(logoDiv);

  // Hamburger
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  const hamburgerUl = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    hamburgerUl.append(document.createElement('li'));
  }
  hamburger.append(hamburgerUl);
  wrap.append(hamburger);

  // Main Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);
  wrap.append(nav);

  navigationItems.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');

    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell?.textContent.trim() || '';
    anchor.setAttribute('itemprop', 'url');
    moveInstrumentation(linkCell, anchor);
    li.append(anchor);
    moveInstrumentation(labelCell, li);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      const span = document.createElement('span');
      span.innerHTML = getArrowSVG();
      li.append(span);

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

      // Assuming the first item in hierarchy is the main heading for the mega menu
      const firstLi = hierarchyRoot.querySelector(':scope > li');
      if (firstLi) {
        const h4 = document.createElement('h4');
        h4.classList.add('left-div-heading');
        const h4Link = document.createElement('a');
        h4Link.textContent = firstLi.querySelector('a, span')?.textContent.trim() || '';
        h4.append(h4Link);
        leftDiv.append(h4);

        const firstUl = firstLi.querySelector(':scope > ul');
        if (firstUl) {
          const subNavWrap = document.createElement('div');
          subNavWrap.classList.add('sub-nav-wrap');
          centerDiv.append(subNavWrap);

          [...firstUl.children].forEach((subLi) => {
            const subUl = document.createElement('ul');
            const subLiAnchor = subLi.querySelector(':scope > a');
            if (subLiAnchor) {
              const newLi = document.createElement('li');
              const newAnchor = document.createElement('a');
              newAnchor.href = subLiAnchor.href;
              newAnchor.textContent = subLiAnchor.textContent.trim();
              newLi.append(newAnchor);
              subUl.append(newLi);
            } else {
              const spanEl = subLi.querySelector(':scope > span');
              if (spanEl) {
                const newLi = document.createElement('li');
                newLi.textContent = spanEl.textContent.trim();
                subUl.append(newLi);
              }
            }
            const innerUl = subLi.querySelector(':scope > ul');
            if (innerUl) {
              const innerSubWrap = document.createElement('div');
              innerSubWrap.classList.add('has-sub-child');
              innerSubWrap.append(innerUl);
              subUl.querySelector('li').append(innerSubWrap);
              subUl.querySelector('li').append(span.cloneNode(true));
              transformNestedLists(innerUl);
            }
            subNavWrap.append(subUl);
          });
        }
      }
      li.append(megaMenu);
    }
    navUl.append(li);
    moveInstrumentation(row, li);
  });

  // Mobile and Desktop Icon Nav
  const createIconNav = (isMobile) => {
    const iconNav = document.createElement('div');
    iconNav.classList.add('icon-nav', isMobile ? 'mobile-menus-icon' : 'desktop-menus-icon');
    const iconNavUl = document.createElement('ul');
    iconNav.append(iconNavUl);

    // Mail icon
    const mailLi = document.createElement('li');
    mailLi.classList.add('mail');
    const mailLink = document.createElement('a');
    mailLink.href = contactLinkItems.find((r) => r.children[0].textContent.trim().toLowerCase() === 'contact us')?.children[1].querySelector('a')?.href || '#';
    if (isMobile) {
      mailLink.textContent = 'Contact Us';
    } else {
      mailLink.innerHTML = getMailSVG();
    }
    iconNavUl.append(mailLi);
    mailLi.append(mailLink);

    // Search icon
    const searchLi = document.createElement('li');
    searchLi.classList.add('search');
    const searchLink = document.createElement('a');
    searchLink.href = '#';
    searchLink.innerHTML = getSearchLensSVG() + getSearchCloseSVG() + (isMobile ? '<span> Search</span>' : '');
    searchLi.append(searchLink);
    iconNavUl.append(searchLi);

    const searchScreenWrap = document.createElement('div');
    searchScreenWrap.classList.add('search-screen-wrap');
    const searchWrapInner = document.createElement('div');
    searchWrapInner.classList.add('wrap');
    searchScreenWrap.append(searchWrapInner);

    const searchForm = document.createElement('form');
    searchForm.action = 'https://www.mahindra.com/search';
    searchForm.method = 'get';
    searchForm.id = 'search-block-form';
    searchForm.setAttribute('accept-charset', 'UTF-8');
    searchWrapInner.append(searchForm);

    const searchInputWrap = document.createElement('div');
    searchInputWrap.classList.add('search-wrap');
    searchForm.append(searchInputWrap);

    const searchIconDiv = document.createElement('div');
    searchIconDiv.classList.add('search-icon');
    searchIconDiv.innerHTML = getSearchLensSVG();
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
    const submitLabel = document.createElement('div');
    submitLabel.classList.add('label');
    submitLabel.textContent = 'Submit';
    submitButton.append(submitLabel);
    submitButton.innerHTML += getSubmitArrowSVG();
    searchInputWrap.append(submitButton);

    const searchResultBox = document.createElement('div');
    searchResultBox.classList.add('searchResultBox');
    searchResultBox.style.display = 'none';
    searchResultBox.innerHTML = `
      <div class="swiper scrollSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide"></div>
        </div>
      </div>
      <div class="swiper-scrollbar"></div>
    `;
    searchForm.append(searchResultBox);

    const searchSuggestionsWrap1 = document.createElement('div');
    searchSuggestionsWrap1.classList.add('search-suggestions-wrap');
    searchSuggestionsWrap1.innerHTML = `
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
    `;
    searchWrapInner.append(searchSuggestionsWrap1);

    const searchSuggestionsWrap2 = document.createElement('div');
    searchSuggestionsWrap2.classList.add('search-suggestions-wrap');
    searchSuggestionsWrap2.innerHTML = `
      <div class="label">Recommended for you:</div>
      <div class="tokens-wrap">
        <ul>
          <li>Annual Report 2021 - 2022</li>
          <li>Leadership Announcement</li>
          <li>Latest Press Release</li>
          <li>Brand Guidelines</li>
        </ul>
      </div>
    `;
    searchWrapInner.append(searchSuggestionsWrap2);

    searchLink.addEventListener('click', (e) => {
      e.preventDefault();
      searchScreenWrap.classList.toggle('active');
      searchLi.classList.toggle('active');
    });

    return iconNav;
  };

  navUl.append(createIconNav(true)); // Mobile icon nav
  nav.append(createIconNav(false)); // Desktop icon nav

  // 80th Year Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const year80LogoLink = document.createElement('a');
  year80LogoLink.href = year80LogoLinkRow?.querySelector('a')?.href || '#';
  moveInstrumentation(year80LogoLinkRow, year80LogoLink);
  const year80LogoPicture = year80LogoRow?.querySelector('picture');
  if (year80LogoPicture) {
    const img = year80LogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    year80LogoLink.append(optimizedPic);
  }
  moveInstrumentation(year80LogoRow, year80LogoLink);
  year80LogoDiv.append(year80LogoLink);
  wrap.append(year80LogoDiv);

  block.replaceChildren(header);

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Sub-menu toggles for mobile
  nav.querySelectorAll('.has-child > span').forEach((span) => {
    span.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentLi = span.closest('li');
      parentLi.classList.toggle('active');
      parentLi.querySelector('.mega-menu')?.classList.toggle('active');
    });
  });

  // Optimize images
  header.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
