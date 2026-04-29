import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createSvgArrow() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
  svg.setAttribute('fill', '#000000');
  svg.setAttribute('stroke', '#000000');
  svg.setAttribute('stroke-width', '4.851456000000001');
  svg.innerHTML = `
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
    <g id="SVGRepo_iconCarrier">
      <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
        <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
      </g>
    </g>
  `;
  return svg;
}

function createSearchSvgLens() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 21 21');
  svg.setAttribute('fill', 'none');
  svg.classList.add('lens');
  svg.innerHTML = `<path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>`;
  return svg;
}

function createSearchSvgClose() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 50 50');
  svg.classList.add('close');
  svg.innerHTML = `<path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>`;
  return svg;
}

function createSubmitSvgArrow() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '12');
  svg.setAttribute('height', '8');
  svg.setAttribute('viewBox', '0 0 12 8');
  svg.setAttribute('fill', 'none');
  svg.innerHTML = `<path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path>`;
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
  const children = [...block.children];

  const [
    mainLogoRow,
    mainLogoLinkRow,
    anniversaryLogoRow,
    anniversaryLogoLinkRow,
    ...itemRows
  ] = children;

  const navigationItems = itemRows.filter((row) => row.children.length === 8);
  const pressReleaseItems = itemRows.filter((row) => row.children.length === 4);
  const iconLinkItems = itemRows.filter((row) => row.children.length === 2);

  const header = document.createElement('header');
  header.classList.add('main-header');
  header.setAttribute('data-once', 'header-hover');

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  wrap.append(logoDiv);

  const mainLogoLink = document.createElement('a');
  const mainLogoAnchor = mainLogoLinkRow.querySelector('a');
  if (mainLogoAnchor) {
    mainLogoLink.href = mainLogoAnchor.href;
  }
  moveInstrumentation(mainLogoLinkRow, mainLogoLink);

  const mainLogoPicture = mainLogoRow.querySelector('picture');
  if (mainLogoPicture) {
    const img = mainLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1');
    moveInstrumentation(mainLogoRow, optimizedPic.querySelector('img'));
    mainLogoLink.append(optimizedPic);
  }
  logoDiv.append(mainLogoLink);

  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.setAttribute('data-once', 'hamburger-click nav-close-search');
  const ulHamburger = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    ulHamburger.append(document.createElement('li'));
  }
  hamburger.append(ulHamburger);
  wrap.append(hamburger);

  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  nav.setAttribute('data-once', 'initSubChildToggle');
  wrap.append(nav);

  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);

  navigationItems.forEach((row) => {
    const [
      labelCell,
      linkCell,
      hierarchyCell,
      leftHeadingCell,
      leftDescCell,
      leftSubDescCell,
      leftStatsCell,
      // subMenuCell, // This cell is a container and its items are handled by filtering itemRows
    ] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');
    li.setAttribute('data-once', 'nav-close-search');
    navUl.append(li);

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    anchor.setAttribute('itemprop', 'url');
    moveInstrumentation(row, anchor);
    li.append(anchor);

    const arrowSpan = document.createElement('span');
    arrowSpan.append(createSvgArrow());
    li.append(arrowSpan);

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

    const leftHeading = document.createElement('h4');
    leftHeading.classList.add('left-div-heading');
    const leftHeadingLink = document.createElement('a');
    leftHeadingLink.textContent = leftHeadingCell.textContent.trim();
    leftHeading.append(leftHeadingLink);
    leftDiv.append(leftHeading);

    if (leftDescCell.textContent.trim()) {
      const leftDesc = document.createElement('p');
      leftDesc.classList.add('left-div-desc');
      leftDesc.textContent = leftDescCell.textContent.trim();
      leftDiv.append(leftDesc);
    }

    if (leftSubDescCell.textContent.trim()) {
      const leftSubDesc = document.createElement('p');
      leftSubDesc.classList.add('left-div-subdesc');
      leftSubDesc.textContent = leftSubDescCell.textContent.trim();
      leftDiv.append(leftSubDesc);
    }

    if (leftStatsCell.textContent.trim()) {
      const leftStats = document.createElement('div');
      leftStats.innerHTML = leftStatsCell.innerHTML;
      if (leftStats.querySelector('ul')) {
        leftStats.querySelectorAll('li').forEach((item) => item.classList.add('list-text-red'));
      }
      leftDiv.append(leftStats);
    }

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    centerDiv.append(subNavWrap);

    const hierarchyRoot = hierarchyCell.querySelector('ul');
    if (hierarchyRoot) {
      // Move instrumentation from hierarchyCell to the new hierarchyRoot if needed
      // For richtext, we usually move the content, not the cell itself.
      // moveInstrumentation(hierarchyCell, hierarchyRoot); // This might not be appropriate for nested content
      subNavWrap.append(hierarchyRoot);
      transformNestedLists(hierarchyRoot);
    }
  });

  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconUl = document.createElement('ul');
  mobileIconNav.append(mobileIconUl);
  navUl.append(mobileIconNav);

  const mailLiMobile = document.createElement('li');
  mailLiMobile.classList.add('mail');
  const mailLinkMobile = document.createElement('a');
  mailLinkMobile.href = 'https://www.mahindra.com/contact-us';
  mailLinkMobile.textContent = 'Contact Us'; // Corrected from original HTML
  mailLiMobile.append(mailLinkMobile);
  mobileIconUl.append(mailLiMobile);

  const searchLiMobile = document.createElement('li');
  searchLiMobile.classList.add('search');
  searchLiMobile.setAttribute('data-once', 'search-toggle search-stop-propagation');
  const searchLinkMobile = document.createElement('a');
  searchLinkMobile.href = '#';
  searchLinkMobile.setAttribute('data-once', 'search-stop-propagation');
  searchLinkMobile.append(createSearchSvgLens());
  searchLinkMobile.append(createSearchSvgClose());
  const searchSpanMobile = document.createElement('span');
  searchSpanMobile.textContent = ' Search';
  searchSpanMobile.setAttribute('data-once', 'search-stop-propagation');
  searchLinkMobile.append(searchSpanMobile);
  searchLiMobile.append(searchLinkMobile);
  mobileIconUl.append(searchLiMobile);

  const searchScreenWrapMobile = document.createElement('div');
  searchScreenWrapMobile.classList.add('search-screen-wrap');
  searchScreenWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  const searchScreenWrapInnerMobile = document.createElement('div');
  searchScreenWrapInnerMobile.classList.add('wrap');
  searchScreenWrapInnerMobile.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapMobile.append(searchScreenWrapInnerMobile);

  const searchFormMobile = document.createElement('form');
  searchFormMobile.action = 'https://www.mahindra.com/search';
  searchFormMobile.method = 'get';
  searchFormMobile.id = 'search-block-form';
  searchFormMobile.setAttribute('accept-charset', 'UTF-8');
  searchFormMobile.setAttribute('data-drupal-form-fields', 'edit-keys');
  searchFormMobile.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapInnerMobile.append(searchFormMobile);

  const searchWrapMobile = document.createElement('div');
  searchWrapMobile.classList.add('search-wrap');
  searchWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  searchFormMobile.append(searchWrapMobile);

  const searchIconDivMobile = document.createElement('div');
  searchIconDivMobile.classList.add('search-icon');
  searchIconDivMobile.setAttribute('data-once', 'search-stop-propagation');
  searchIconDivMobile.append(createSearchSvgLens());
  searchWrapMobile.append(searchIconDivMobile);

  const searchInputMobile = document.createElement('input');
  searchInputMobile.type = 'text';
  searchInputMobile.classList.add('input-text', 'searchtext');
  searchInputMobile.required = true;
  searchInputMobile.name = 'key';
  searchInputMobile.id = 'searchInput';
  searchInputMobile.autocomplete = 'off';
  searchInputMobile.setAttribute('data-once', 'search-stop-propagation');
  searchWrapMobile.append(searchInputMobile);

  const submitButtonMobile = document.createElement('button');
  submitButtonMobile.classList.add('submit-button');
  submitButtonMobile.setAttribute('data-once', 'search-stop-propagation');
  const submitLabelMobile = document.createElement('div');
  submitLabelMobile.classList.add('label');
  submitLabelMobile.textContent = ' Submit ';
  submitLabelMobile.setAttribute('data-once', 'search-stop-propagation');
  submitButtonMobile.append(submitLabelMobile);
  submitButtonMobile.append(createSubmitSvgArrow());
  searchWrapMobile.append(submitButtonMobile);

  const searchResultBoxMobile = document.createElement('div');
  searchResultBoxMobile.classList.add('searchResultBox');
  searchResultBoxMobile.setAttribute('data-once', 'search-stop-propagation');
  searchFormMobile.append(searchResultBoxMobile);

  const swiperMobile = document.createElement('div');
  swiperMobile.classList.add('swiper', 'scrollSwiper');
  swiperMobile.setAttribute('data-once', 'search-stop-propagation');
  const swiperWrapperMobile = document.createElement('div');
  swiperWrapperMobile.classList.add('swiper-wrapper');
  swiperWrapperMobile.setAttribute('data-once', 'search-stop-propagation');
  const swiperSlideMobile = document.createElement('div');
  swiperSlideMobile.classList.add('swiper-slide');
  swiperSlideMobile.setAttribute('data-once', 'search-stop-propagation');
  swiperWrapperMobile.append(swiperSlideMobile);
  swiperMobile.append(swiperWrapperMobile);
  searchResultBoxMobile.append(swiperMobile);

  const swiperScrollbarMobile = document.createElement('div');
  swiperScrollbarMobile.classList.add('swiper-scrollbar');
  swiperScrollbarMobile.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxMobile.append(swiperScrollbarMobile);

  const searchSuggestionsWrapMobile = document.createElement('div');
  searchSuggestionsWrapMobile.classList.add('search-suggestions-wrap');
  searchSuggestionsWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  const labelKeywordsMobile = document.createElement('div');
  labelKeywordsMobile.classList.add('label');
  labelKeywordsMobile.textContent = 'Popular Keywords:';
  labelKeywordsMobile.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsWrapMobile.append(labelKeywordsMobile);
  const tokensWrapKeywordsMobile = document.createElement('div');
  tokensWrapKeywordsMobile.classList.add('tokens-wrap');
  tokensWrapKeywordsMobile.setAttribute('data-once', 'search-stop-propagation');
  const ulKeywordsMobile = document.createElement('ul');
  ulKeywordsMobile.setAttribute('data-once', 'search-stop-propagation');
  ['Business', 'FY 21', 'Brands', 'XUV700', 'Global', 'Nanhi Kali'].forEach((text) => {
    const liKeyword = document.createElement('li');
    liKeyword.textContent = text;
    liKeyword.setAttribute('data-once', 'search-stop-propagation');
    ulKeywordsMobile.append(liKeyword);
  });
  tokensWrapKeywordsMobile.append(ulKeywordsMobile);
  searchSuggestionsWrapMobile.append(tokensWrapKeywordsMobile);
  searchScreenWrapInnerMobile.append(searchSuggestionsWrapMobile);

  const searchSuggestionsRecommendedMobile = document.createElement('div');
  searchSuggestionsRecommendedMobile.classList.add('search-suggestions-wrap');
  searchSuggestionsRecommendedMobile.setAttribute('data-once', 'search-stop-propagation');
  const labelRecommendedMobile = document.createElement('div');
  labelRecommendedMobile.classList.add('label');
  labelRecommendedMobile.textContent = 'Recommended for you:';
  labelRecommendedMobile.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsRecommendedMobile.append(labelRecommendedMobile);
  const tokensWrapRecommendedMobile = document.createElement('div');
  tokensWrapRecommendedMobile.classList.add('tokens-wrap');
  tokensWrapRecommendedMobile.setAttribute('data-once', 'search-stop-propagation');
  const ulRecommendedMobile = document.createElement('ul');
  ulRecommendedMobile.setAttribute('data-once', 'search-stop-propagation');
  ['Annual Report 2021 - 2022', 'Leadership Announcement', 'Latest Press Release', 'Brand Guidelines'].forEach((text) => {
    const liRecommended = document.createElement('li');
    liRecommended.textContent = text;
    liRecommended.setAttribute('data-once', 'search-stop-propagation');
    ulRecommendedMobile.append(liRecommended);
  });
  tokensWrapRecommendedMobile.append(ulRecommendedMobile);
  searchSuggestionsRecommendedMobile.append(tokensWrapRecommendedMobile);
  searchScreenWrapInnerMobile.append(searchSuggestionsRecommendedMobile);

  searchLiMobile.append(searchScreenWrapMobile);

  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconUl = document.createElement('ul');
  desktopIconNav.append(desktopIconUl);
  nav.append(desktopIconNav);

  const mailLiDesktop = document.createElement('li');
  mailLiDesktop.classList.add('mail');
  const mailLinkDesktop = document.createElement('a');
  mailLinkDesktop.href = 'https://www.mahindra.com/contact-us';
  const mailSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  mailSvg.setAttribute('version', '1.1');
  mailSvg.setAttribute('id', 'Layer_1');
  mailSvg.setAttribute('x', '0px');
  mailSvg.setAttribute('y', '0px');
  mailSvg.setAttribute('viewBox', '0 0 48 38.4');
  mailSvg.setAttribute('xml:space', 'preserve');
  mailSvg.setAttribute('width', '21');
  mailSvg.setAttribute('height', '21');
  mailSvg.innerHTML = `<path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1
    C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7
    L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z"></path>`;
  mailLinkDesktop.append(mailSvg);
  mailLiDesktop.append(mailLinkDesktop);
  desktopIconUl.append(mailLiDesktop);

  const searchLiDesktop = document.createElement('li');
  searchLiDesktop.classList.add('search');
  searchLiDesktop.setAttribute('data-once', 'search-toggle search-stop-propagation');
  const searchLinkDesktop = document.createElement('a');
  searchLinkDesktop.href = '#';
  searchLinkDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchLinkDesktop.append(createSearchSvgLens());
  searchLinkDesktop.append(createSearchSvgClose());
  searchLiDesktop.append(searchLinkDesktop);
  desktopIconUl.append(searchLiDesktop);

  const searchScreenWrapDesktop = document.createElement('div');
  searchScreenWrapDesktop.classList.add('search-screen-wrap');
  searchScreenWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  const searchScreenWrapInnerDesktop = document.createElement('div');
  searchScreenWrapInnerDesktop.classList.add('wrap');
  searchScreenWrapInnerDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapDesktop.append(searchScreenWrapInnerDesktop);

  const searchFormDesktop = document.createElement('form');
  searchFormDesktop.action = 'https://www.mahindra.com/search';
  searchFormDesktop.method = 'get';
  searchFormDesktop.id = 'search-block-form';
  searchFormDesktop.setAttribute('accept-charset', 'UTF-8');
  searchFormDesktop.setAttribute('data-drupal-form-fields', 'edit-keys');
  searchFormDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapInnerDesktop.append(searchFormDesktop);

  const searchWrapDesktop = document.createElement('div');
  searchWrapDesktop.classList.add('search-wrap');
  searchWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchFormDesktop.append(searchWrapDesktop);

  const searchIconDivDesktop = document.createElement('div');
  searchIconDivDesktop.classList.add('search-icon');
  searchIconDivDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchIconDivDesktop.append(createSearchSvgLens());
  searchWrapDesktop.append(searchIconDivDesktop);

  const searchInputDesktop = document.createElement('input');
  searchInputDesktop.type = 'text';
  searchInputDesktop.classList.add('input-text', 'searchtext');
  searchInputDesktop.required = true;
  searchInputDesktop.name = 'key';
  searchInputDesktop.id = 'searchInput';
  searchInputDesktop.autocomplete = 'off';
  searchInputDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchWrapDesktop.append(searchInputDesktop);

  const submitButtonDesktop = document.createElement('button');
  submitButtonDesktop.classList.add('submit-button');
  submitButtonDesktop.setAttribute('data-once', 'search-stop-propagation');
  const submitLabelDesktop = document.createElement('div');
  submitLabelDesktop.classList.add('label');
  submitLabelDesktop.textContent = ' Submit ';
  submitLabelDesktop.setAttribute('data-once', 'search-stop-propagation');
  submitButtonDesktop.append(submitLabelDesktop);
  submitButtonDesktop.append(createSubmitSvgArrow());
  searchWrapDesktop.append(submitButtonDesktop);

  const searchResultBoxDesktop = document.createElement('div');
  searchResultBoxDesktop.classList.add('searchResultBox');
  searchResultBoxDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchFormDesktop.append(searchResultBoxDesktop);

  const swiperDesktop = document.createElement('div');
  swiperDesktop.classList.add('swiper', 'scrollSwiper');
  swiperDesktop.setAttribute('data-once', 'search-stop-propagation');
  const swiperWrapperDesktop = document.createElement('div');
  swiperWrapperDesktop.classList.add('swiper-wrapper');
  swiperWrapperDesktop.setAttribute('data-once', 'search-stop-propagation');
  const swiperSlideDesktop = document.createElement('div');
  swiperSlideDesktop.classList.add('swiper-slide');
  swiperSlideDesktop.setAttribute('data-once', 'search-stop-propagation');
  swiperWrapperDesktop.append(swiperSlideDesktop);
  swiperDesktop.append(swiperWrapperDesktop);
  searchResultBoxDesktop.append(swiperDesktop);

  const swiperScrollbarDesktop = document.createElement('div');
  swiperScrollbarDesktop.classList.add('swiper-scrollbar');
  swiperScrollbarDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxDesktop.append(swiperScrollbarDesktop);

  const searchSuggestionsWrapDesktop = document.createElement('div');
  searchSuggestionsWrapDesktop.classList.add('search-suggestions-wrap');
  searchSuggestionsWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  const labelKeywordsDesktop = document.createElement('div');
  labelKeywordsDesktop.classList.add('label');
  labelKeywordsDesktop.textContent = 'Popular Keywords:';
  labelKeywordsDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsWrapDesktop.append(labelKeywordsDesktop);
  const tokensWrapKeywordsDesktop = document.createElement('div');
  tokensWrapKeywordsDesktop.classList.add('tokens-wrap');
  tokensWrapKeywordsDesktop.setAttribute('data-once', 'search-stop-propagation');
  const ulKeywordsDesktop = document.createElement('ul');
  ulKeywordsDesktop.setAttribute('data-once', 'search-stop-propagation');
  ['Business', 'FY 21', 'Brands', 'XUV700', 'Global', 'Nanhi Kali'].forEach((text) => {
    const liKeyword = document.createElement('li');
    liKeyword.textContent = text;
    liKeyword.setAttribute('data-once', 'search-stop-propagation');
    ulKeywordsDesktop.append(liKeyword);
  });
  tokensWrapKeywordsDesktop.append(ulKeywordsDesktop);
  searchSuggestionsWrapDesktop.append(tokensWrapKeywordsDesktop);
  searchScreenWrapInnerDesktop.append(searchSuggestionsWrapDesktop);

  const searchSuggestionsRecommendedDesktop = document.createElement('div');
  searchSuggestionsRecommendedDesktop.classList.add('search-suggestions-wrap');
  searchSuggestionsRecommendedDesktop.setAttribute('data-once', 'search-stop-propagation');
  const labelRecommendedDesktop = document.createElement('div');
  labelRecommendedDesktop.classList.add('label');
  labelRecommendedDesktop.textContent = 'Recommended for you:';
  labelRecommendedDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsRecommendedDesktop.append(labelRecommendedDesktop);
  const tokensWrapRecommendedDesktop = document.createElement('div');
  tokensWrapRecommendedDesktop.classList.add('tokens-wrap');
  tokensWrapRecommendedDesktop.setAttribute('data-once', 'search-stop-propagation');
  const ulRecommendedDesktop = document.createElement('ul');
  ulRecommendedDesktop.setAttribute('data-once', 'search-stop-propagation');
  ['Annual Report 2021 - 2022', 'Leadership Announcement', 'Latest Press Release', 'Brand Guidelines'].forEach((text) => {
    const liRecommended = document.createElement('li');
    liRecommended.textContent = text;
    liRecommended.setAttribute('data-once', 'search-stop-propagation');
    ulRecommendedDesktop.append(liRecommended);
  });
  tokensWrapRecommendedDesktop.append(ulRecommendedDesktop);
  searchSuggestionsRecommendedDesktop.append(tokensWrapRecommendedDesktop);
  searchScreenWrapInnerDesktop.append(searchSuggestionsRecommendedDesktop);

  searchLiDesktop.append(searchScreenWrapDesktop);

  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  wrap.append(year80LogoDiv);

  const anniversaryLogoLink = document.createElement('a');
  const anniversaryLogoAnchor = anniversaryLogoLinkRow.querySelector('a');
  if (anniversaryLogoAnchor) {
    anniversaryLogoLink.href = anniversaryLogoAnchor.href;
  }
  moveInstrumentation(anniversaryLogoLinkRow, anniversaryLogoLink);

  const anniversaryLogoPicture = anniversaryLogoRow.querySelector('picture');
  if (anniversaryLogoPicture) {
    const img = anniversaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1', 'years-80');
    moveInstrumentation(anniversaryLogoRow, optimizedPic.querySelector('img'));
    anniversaryLogoLink.append(optimizedPic);
  }
  year80LogoDiv.append(anniversaryLogoLink);

  block.replaceChildren(header);

  // Initialize Swiper for search results
  const swiperEls = block.querySelectorAll('.swiper.scrollSwiper');
  if (swiperEls.length > 0) {
    await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
    swiperEls.forEach((swiperEl) => {
      // eslint-disable-next-line no-undef
      new Swiper(swiperEl, {
        slidesPerView: 'auto',
        spaceBetween: 16, // Added from original HTML
        loop: false, // Explicitly set to false as per original HTML
        pagination: {
          el: swiperEl.nextElementSibling, // swiper-scrollbar is next sibling
          clickable: true,
        },
      });
    });
  }

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Search toggle
  const searchTriggers = block.querySelectorAll('.search > a');
  searchTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const searchParentLi = trigger.closest('li.search');
      searchParentLi.classList.toggle('active');
      const searchScreenWrap = searchParentLi.querySelector('.search-screen-wrap');
      if (searchScreenWrap) {
        searchScreenWrap.classList.toggle('active');
      }
    });
  });

  // Scroll behavior for header
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 0) {
      header.classList.add('nav-up');
      header.classList.remove('solid');
    } else if (window.scrollY < lastScrollY) {
      header.classList.remove('nav-up');
      if (window.scrollY === 0) {
        header.classList.remove('solid');
      } else {
        header.classList.add('solid');
      }
    }
    lastScrollY = window.scrollY;
  });
}
