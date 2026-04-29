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
  const [
    mainLogoRow,
    mainLogoLinkRow,
    year80LogoRow,
    year80LogoLinkRow,
    ...itemRows
  ] = [...block.children];

  const header = document.createElement('header');
  header.classList.add('main-header'); // 'with-marquee', 'solid', 'nav-up' are scroll-state classes, not added initially

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  // Main Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  wrap.append(logoDiv);

  const mainLogoLink = document.createElement('a');
  const mainLogoLinkHref = mainLogoLinkRow.querySelector('a')?.href;
  if (mainLogoLinkHref) {
    mainLogoLink.href = mainLogoLinkHref;
  }
  moveInstrumentation(mainLogoLinkRow, mainLogoLink);
  logoDiv.append(mainLogoLink);

  const mainLogoPicture = mainLogoRow.querySelector('picture');
  if (mainLogoPicture) {
    const img = mainLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(mainLogoRow, optimizedPic.querySelector('img'));
    mainLogoLink.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1');
    optimizedPic.querySelector('img').width = '200';
    optimizedPic.querySelector('img').height = '30';
  }

  // Hamburger
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.setAttribute('data-once', 'hamburger-click nav-close-search');
  const ul = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    ul.append(document.createElement('li'));
  }
  hamburger.append(ul);
  wrap.append(hamburger);

  // Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  nav.setAttribute('data-once', 'initSubChildToggle');
  wrap.append(nav);

  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);

  const navigationItems = itemRows.filter((row) => row.children.length === 8);
  const pressReleaseSlides = itemRows.filter((row) => row.children.length === 4);
  const iconLinkItems = itemRows.filter((row) => row.children.length === 2);

  navigationItems.forEach((row) => {
    const [
      labelCell,
      linkCell,
      hierarchyTreeCell,
      leftHeadingCell,
      leftDescriptionCell,
      leftSubDescriptionCell,
      highlightedStatsCell,
      subMenuCell,
    ] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');
    li.setAttribute('data-once', 'nav-close-search');
    navUl.append(li);

    const anchor = document.createElement('a');
    anchor.setAttribute('itemprop', 'url');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, anchor);
    li.append(anchor);

    // Arrow SVG
    const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrowSvg.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
    arrowSvg.setAttribute('fill', '#000000');
    arrowSvg.setAttribute('stroke', '#000000');
    arrowSvg.setAttribute('stroke-width', '4.851456000000001');
    arrowSvg.innerHTML = `
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g>
      <g id="SVGRepo_iconCarrier">
        <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)">
          <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path>
        </g>
      </g>
    `;
    const span = document.createElement('span');
    span.append(arrowSvg);
    li.append(span);

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
    const leftHeadingAnchor = document.createElement('a');
    leftHeadingAnchor.textContent = leftHeadingCell.textContent.trim();
    leftHeading.append(leftHeadingAnchor);
    leftDiv.append(leftHeading);

    const leftDescription = document.createElement('p');
    leftDescription.classList.add('left-div-desc');
    leftDescription.textContent = leftDescriptionCell.textContent.trim();
    leftDiv.append(leftDescription);

    const leftSubDescription = document.createElement('p');
    leftSubDescription.classList.add('left-div-subdesc');
    leftSubDescription.textContent = leftSubDescriptionCell.textContent.trim();
    leftDiv.append(leftSubDescription);

    // Handle highlightedStats richtext
    const highlightedStatsTempDiv = document.createElement('div');
    highlightedStatsTempDiv.innerHTML = highlightedStatsCell.innerHTML;
    const highlightedStatsUl = highlightedStatsTempDiv.querySelector('ul');
    if (highlightedStatsUl) {
      highlightedStatsUl.querySelectorAll('li').forEach((statLi) => {
        statLi.classList.add('list-text-red');
      });
      moveInstrumentation(highlightedStatsCell, highlightedStatsTempDiv);
      while (highlightedStatsTempDiv.firstChild) {
        leftDiv.append(highlightedStatsTempDiv.firstChild);
      }
    }

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    centerDiv.append(subNavWrap);

    // Handle hierarchy-tree richtext
    const hierarchyTreeTempDiv = document.createElement('div');
    hierarchyTreeTempDiv.innerHTML = hierarchyTreeCell.innerHTML;
    const hierarchyRoot = hierarchyTreeTempDiv.querySelector('ul');
    if (hierarchyRoot) {
      // Apply classes from original HTML if any, e.g., 'about-us-sub-nav'
      // For this specific block, the sub-nav-wrap itself gets the class, not the ul directly
      // subNavWrap.classList.add('about-us-sub-nav'); // Example if needed
      transformNestedLists(hierarchyRoot);
      moveInstrumentation(hierarchyTreeCell, hierarchyTreeTempDiv);
      while (hierarchyTreeTempDiv.firstChild) {
        subNavWrap.append(hierarchyTreeTempDiv.firstChild);
      }
    }

    // Handle subMenu richtext
    const subMenuTempDiv = document.createElement('div');
    subMenuTempDiv.innerHTML = subMenuCell.innerHTML;
    const subMenuUl = subMenuTempDiv.querySelector('ul');
    if (subMenuUl) {
      moveInstrumentation(subMenuCell, subMenuTempDiv);
      while (subMenuTempDiv.firstChild) {
        subNavWrap.append(subMenuTempDiv.firstChild);
      }
    }
  });

  // Icon Nav (Mobile)
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconUl = document.createElement('ul');
  mobileIconNav.append(mobileIconUl);
  navUl.append(mobileIconNav); // Append to navUl as per original HTML structure

  // Contact Us
  const mailLiMobile = document.createElement('li');
  mailLiMobile.classList.add('mail');
  const mailLinkMobile = document.createElement('a');
  mailLinkMobile.href = 'https://www.mahindra.com/contact-us';
  mailLinkMobile.textContent = 'Contact Us';
  mailLiMobile.append(mailLinkMobile);
  mobileIconUl.append(mailLiMobile);

  // Search
  const searchLiMobile = document.createElement('li');
  searchLiMobile.classList.add('search');
  searchLiMobile.setAttribute('data-once', 'search-toggle search-stop-propagation');
  const searchLinkMobile = document.createElement('a');
  searchLinkMobile.href = '#';
  searchLinkMobile.setAttribute('data-once', 'search-stop-propagation');

  const searchLensSvgMobile = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  searchLensSvgMobile.setAttribute('viewBox', '0 0 21 21');
  searchLensSvgMobile.setAttribute('fill', 'none');
  searchLensSvgMobile.classList.add('lens');
  searchLensSvgMobile.setAttribute('data-once', 'search-stop-propagation');
  searchLensSvgMobile.innerHTML = '<path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>';
  searchLinkMobile.append(searchLensSvgMobile);

  const searchCloseSvgMobile = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  searchCloseSvgMobile.setAttribute('viewBox', '0 0 50 50');
  searchCloseSvgMobile.classList.add('close');
  searchCloseSvgMobile.setAttribute('data-once', 'search-stop-propagation');
  searchCloseSvgMobile.innerHTML = '<path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>';
  searchLinkMobile.append(searchCloseSvgMobile);

  const searchSpanMobile = document.createElement('span');
  searchSpanMobile.setAttribute('data-once', 'search-stop-propagation');
  searchSpanMobile.textContent = ' Search';
  searchLinkMobile.append(searchSpanMobile);
  searchLiMobile.append(searchLinkMobile);

  const searchScreenWrapMobile = document.createElement('div');
  searchScreenWrapMobile.classList.add('search-screen-wrap');
  searchScreenWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  searchLiMobile.append(searchScreenWrapMobile);

  const searchScreenWrapInnerMobile = document.createElement('div');
  searchScreenWrapInnerMobile.classList.add('wrap');
  searchScreenWrapInnerMobile.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapMobile.append(searchScreenWrapInnerMobile);

  const searchFormMobile = document.createElement('form');
  searchFormMobile.setAttribute('action', 'https://www.mahindra.com/search');
  searchFormMobile.setAttribute('method', 'get');
  searchFormMobile.setAttribute('id', 'search-block-form');
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
  const searchIconSvgMobile = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  searchIconSvgMobile.setAttribute('viewBox', '0 0 21 21');
  searchIconSvgMobile.setAttribute('fill', 'none');
  searchIconSvgMobile.setAttribute('data-once', 'search-stop-propagation');
  searchIconSvgMobile.innerHTML = '<path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>';
  searchIconDivMobile.append(searchIconSvgMobile);
  searchWrapMobile.append(searchIconDivMobile);

  const searchInputMobile = document.createElement('input');
  searchInputMobile.setAttribute('type', 'text');
  searchInputMobile.classList.add('input-text', 'searchtext');
  searchInputMobile.setAttribute('required', '');
  searchInputMobile.setAttribute('name', 'key');
  searchInputMobile.setAttribute('id', 'searchInput');
  searchInputMobile.setAttribute('autocomplete', 'off');
  searchInputMobile.setAttribute('data-once', 'search-stop-propagation');
  searchWrapMobile.append(searchInputMobile);

  const submitButtonMobile = document.createElement('button');
  submitButtonMobile.classList.add('submit-button');
  submitButtonMobile.setAttribute('data-once', 'search-stop-propagation');
  const submitLabelMobile = document.createElement('div');
  submitLabelMobile.classList.add('label');
  submitLabelMobile.setAttribute('data-once', 'search-stop-propagation');
  submitLabelMobile.textContent = ' Submit ';
  submitButtonMobile.append(submitLabelMobile);
  const submitSvgMobile = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  submitSvgMobile.setAttribute('width', '12');
  submitSvgMobile.setAttribute('height', '8');
  submitSvgMobile.setAttribute('viewBox', '0 0 12 8');
  submitSvgMobile.setAttribute('fill', 'none');
  submitSvgMobile.setAttribute('data-once', 'search-stop-propagation');
  submitSvgMobile.innerHTML = '<path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path>';
  submitButtonMobile.append(submitSvgMobile);
  searchWrapMobile.append(submitButtonMobile);

  const searchResultBoxMobile = document.createElement('div');
  searchResultBoxMobile.classList.add('searchResultBox');
  searchResultBoxMobile.setAttribute('data-once', 'search-stop-propagation');
  searchFormMobile.append(searchResultBoxMobile);

  const searchSwiperMobile = document.createElement('div');
  searchSwiperMobile.classList.add('swiper', 'scrollSwiper');
  searchSwiperMobile.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxMobile.append(searchSwiperMobile);

  const searchSwiperWrapperMobile = document.createElement('div');
  searchSwiperWrapperMobile.classList.add('swiper-wrapper');
  searchSwiperWrapperMobile.setAttribute('data-once', 'search-stop-propagation');
  searchSwiperMobile.append(searchSwiperWrapperMobile);

  const searchSwiperSlideMobile = document.createElement('div');
  searchSwiperSlideMobile.classList.add('swiper-slide');
  searchSwiperSlideMobile.setAttribute('data-once', 'search-stop-propagation');
  searchSwiperWrapperMobile.append(searchSwiperSlideMobile);

  const searchSwiperScrollbarMobile = document.createElement('div');
  searchSwiperScrollbarMobile.classList.add('swiper-scrollbar');
  searchSwiperScrollbarMobile.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxMobile.append(searchSwiperScrollbarMobile);

  const searchSuggestionsWrap1Mobile = document.createElement('div');
  searchSuggestionsWrap1Mobile.classList.add('search-suggestions-wrap');
  searchSuggestionsWrap1Mobile.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapInnerMobile.append(searchSuggestionsWrap1Mobile);

  const searchSuggestionsLabel1Mobile = document.createElement('div');
  searchSuggestionsLabel1Mobile.classList.add('label');
  searchSuggestionsLabel1Mobile.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsLabel1Mobile.textContent = 'Popular Keywords:';
  searchSuggestionsWrap1Mobile.append(searchSuggestionsLabel1Mobile);

  const searchTokensWrap1Mobile = document.createElement('div');
  searchTokensWrap1Mobile.classList.add('tokens-wrap');
  searchTokensWrap1Mobile.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsWrap1Mobile.append(searchTokensWrap1Mobile);

  const searchTokensUl1Mobile = document.createElement('ul');
  searchTokensUl1Mobile.setAttribute('data-once', 'search-stop-propagation');
  ['Business', 'FY 21', 'Brands', 'XUV700', 'Global', 'Nanhi Kali'].forEach((keyword) => {
    const li = document.createElement('li');
    li.setAttribute('data-once', 'search-stop-propagation');
    li.textContent = keyword;
    searchTokensUl1Mobile.append(li);
  });
  searchTokensWrap1Mobile.append(searchTokensUl1Mobile);

  const searchSuggestionsWrap2Mobile = document.createElement('div');
  searchSuggestionsWrap2Mobile.classList.add('search-suggestions-wrap');
  searchSuggestionsWrap2Mobile.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapInnerMobile.append(searchSuggestionsWrap2Mobile);

  const searchSuggestionsLabel2Mobile = document.createElement('div');
  searchSuggestionsLabel2Mobile.classList.add('label');
  searchSuggestionsLabel2Mobile.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsLabel2Mobile.textContent = 'Recommended for you:';
  searchSuggestionsWrap2Mobile.append(searchSuggestionsLabel2Mobile);

  const searchTokensWrap2Mobile = document.createElement('div');
  searchTokensWrap2Mobile.classList.add('tokens-wrap');
  searchTokensWrap2Mobile.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsWrap2Mobile.append(searchTokensWrap2Mobile);

  const searchTokensUl2Mobile = document.createElement('ul');
  searchTokensUl2Mobile.setAttribute('data-once', 'search-stop-propagation');
  ['Annual Report 2021 - 2022', 'Leadership Announcement', 'Latest Press Release', 'Brand Guidelines'].forEach((keyword) => {
    const li = document.createElement('li');
    li.setAttribute('data-once', 'search-stop-propagation');
    li.textContent = keyword;
    searchTokensUl2Mobile.append(li);
  });
  searchTokensWrap2Mobile.append(searchTokensUl2Mobile);

  mobileIconUl.append(searchLiMobile);

  // Icon Nav (Desktop)
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconUl = document.createElement('ul');
  desktopIconNav.append(desktopIconUl);
  nav.append(desktopIconNav);

  // Contact Us
  const mailLiDesktop = document.createElement('li');
  mailLiDesktop.classList.add('mail');
  const mailLinkDesktop = document.createElement('a');
  mailLinkDesktop.href = 'https://www.mahindra.com/contact-us';
  const mailSvgDesktop = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  mailSvgDesktop.setAttribute('version', '1.1');
  mailSvgDesktop.setAttribute('id', 'Layer_1');
  mailSvgDesktop.setAttribute('x', '0px');
  mailSvgDesktop.setAttribute('y', '0px');
  mailSvgDesktop.setAttribute('viewBox', '0 0 48 38.4');
  mailSvgDesktop.setAttribute('xml:space', 'preserve');
  mailSvgDesktop.setAttribute('width', '21');
  mailSvgDesktop.setAttribute('height', '21');
  mailSvgDesktop.innerHTML = '<path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z"></path>';
  mailLinkDesktop.append(mailSvgDesktop);
  mailLiDesktop.append(mailLinkDesktop);
  desktopIconUl.append(mailLiDesktop);

  // Search
  const searchLiDesktop = document.createElement('li');
  searchLiDesktop.classList.add('search');
  searchLiDesktop.setAttribute('data-once', 'search-toggle search-stop-propagation');
  const searchLinkDesktop = document.createElement('a');
  searchLinkDesktop.href = '#';
  searchLinkDesktop.setAttribute('data-once', 'search-stop-propagation');

  const searchLensSvgDesktop = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  searchLensSvgDesktop.setAttribute('viewBox', '0 0 21 21');
  searchLensSvgDesktop.setAttribute('fill', 'none');
  searchLensSvgDesktop.classList.add('lens');
  searchLensSvgDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchLensSvgDesktop.innerHTML = '<path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>';
  searchLinkDesktop.append(searchLensSvgDesktop);

  const searchCloseSvgDesktop = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  searchCloseSvgDesktop.setAttribute('viewBox', '0 0 50 50');
  searchCloseSvgDesktop.classList.add('close');
  searchCloseSvgDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchCloseSvgDesktop.innerHTML = '<path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>';
  searchLinkDesktop.append(searchCloseSvgDesktop);
  searchLiDesktop.append(searchLinkDesktop);

  const searchScreenWrapDesktop = document.createElement('div');
  searchScreenWrapDesktop.classList.add('search-screen-wrap');
  searchScreenWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchLiDesktop.append(searchScreenWrapDesktop);

  const searchScreenWrapInnerDesktop = document.createElement('div');
  searchScreenWrapInnerDesktop.classList.add('wrap');
  searchScreenWrapInnerDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapDesktop.append(searchScreenWrapInnerDesktop);

  const searchFormDesktop = document.createElement('form');
  searchFormDesktop.setAttribute('action', 'https://www.mahindra.com/search');
  searchFormDesktop.setAttribute('method', 'get');
  searchFormDesktop.setAttribute('id', 'search-block-form');
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
  const searchIconSvgDesktop = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  searchIconSvgDesktop.setAttribute('viewBox', '0 0 21 21');
  searchIconSvgDesktop.setAttribute('fill', 'none');
  searchIconSvgDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchIconSvgDesktop.innerHTML = '<path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>';
  searchIconDivDesktop.append(searchIconSvgDesktop);
  searchWrapDesktop.append(searchIconDivDesktop);

  const searchInputDesktop = document.createElement('input');
  searchInputDesktop.setAttribute('type', 'text');
  searchInputDesktop.classList.add('input-text', 'searchtext');
  searchInputDesktop.setAttribute('required', '');
  searchInputDesktop.setAttribute('name', 'key');
  searchInputDesktop.setAttribute('id', 'searchInput');
  searchInputDesktop.setAttribute('autocomplete', 'off');
  searchInputDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchWrapDesktop.append(searchInputDesktop);

  const submitButtonDesktop = document.createElement('button');
  submitButtonDesktop.classList.add('submit-button');
  submitButtonDesktop.setAttribute('data-once', 'search-stop-propagation');
  const submitLabelDesktop = document.createElement('div');
  submitLabelDesktop.classList.add('label');
  submitLabelDesktop.setAttribute('data-once', 'search-stop-propagation');
  submitLabelDesktop.textContent = ' Submit ';
  submitButtonDesktop.append(submitLabelDesktop);
  const submitSvgDesktop = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  submitSvgDesktop.setAttribute('width', '12');
  submitSvgDesktop.setAttribute('height', '8');
  submitSvgDesktop.setAttribute('viewBox', '0 0 12 8');
  submitSvgDesktop.setAttribute('fill', 'none');
  submitSvgDesktop.setAttribute('data-once', 'search-stop-propagation');
  submitSvgDesktop.innerHTML = '<path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path>';
  submitButtonDesktop.append(submitSvgDesktop);
  searchWrapDesktop.append(submitButtonDesktop);

  const searchResultBoxDesktop = document.createElement('div');
  searchResultBoxDesktop.classList.add('searchResultBox');
  searchResultBoxDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchFormDesktop.append(searchResultBoxDesktop);

  const searchSwiperDesktop = document.createElement('div');
  searchSwiperDesktop.classList.add('swiper', 'scrollSwiper');
  searchSwiperDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxDesktop.append(searchSwiperDesktop);

  const searchSwiperWrapperDesktop = document.createElement('div');
  searchSwiperWrapperDesktop.classList.add('swiper-wrapper');
  searchSwiperWrapperDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchSwiperDesktop.append(searchSwiperWrapperDesktop);

  const searchSwiperSlideDesktop = document.createElement('div');
  searchSwiperSlideDesktop.classList.add('swiper-slide');
  searchSwiperSlideDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchSwiperWrapperDesktop.append(searchSwiperSlideDesktop);

  const searchSwiperScrollbarDesktop = document.createElement('div');
  searchSwiperScrollbarDesktop.classList.add('swiper-scrollbar');
  searchSwiperScrollbarDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxDesktop.append(searchSwiperScrollbarDesktop);

  const searchSuggestionsWrap1Desktop = document.createElement('div');
  searchSuggestionsWrap1Desktop.classList.add('search-suggestions-wrap');
  searchSuggestionsWrap1Desktop.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapInnerDesktop.append(searchSuggestionsWrap1Desktop);

  const searchSuggestionsLabel1Desktop = document.createElement('div');
  searchSuggestionsLabel1Desktop.classList.add('label');
  searchSuggestionsLabel1Desktop.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsLabel1Desktop.textContent = 'Popular Keywords:';
  searchSuggestionsWrap1Desktop.append(searchSuggestionsLabel1Desktop);

  const searchTokensWrap1Desktop = document.createElement('div');
  searchTokensWrap1Desktop.classList.add('tokens-wrap');
  searchTokensWrap1Desktop.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsWrap1Desktop.append(searchTokensWrap1Desktop);

  const searchTokensUl1Desktop = document.createElement('ul');
  searchTokensUl1Desktop.setAttribute('data-once', 'search-stop-propagation');
  ['Business', 'FY 21', 'Brands', 'XUV700', 'Global', 'Nanhi Kali'].forEach((keyword) => {
    const li = document.createElement('li');
    li.setAttribute('data-once', 'search-stop-propagation');
    li.textContent = keyword;
    searchTokensUl1Desktop.append(li);
  });
  searchTokensWrap1Desktop.append(searchTokensUl1Desktop);

  const searchSuggestionsWrap2Desktop = document.createElement('div');
  searchSuggestionsWrap2Desktop.classList.add('search-suggestions-wrap');
  searchSuggestionsWrap2Desktop.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapInnerDesktop.append(searchSuggestionsWrap2Desktop);

  const searchSuggestionsLabel2Desktop = document.createElement('div');
  searchSuggestionsLabel2Desktop.classList.add('label');
  searchSuggestionsLabel2Desktop.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsLabel2Desktop.textContent = 'Recommended for you:';
  searchSuggestionsWrap2Desktop.append(searchSuggestionsLabel2Desktop);

  const searchTokensWrap2Desktop = document.createElement('div');
  searchTokensWrap2Desktop.classList.add('tokens-wrap');
  searchTokensWrap2Desktop.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsWrap2Desktop.append(searchTokensWrap2Desktop);

  const searchTokensUl2Desktop = document.createElement('ul');
  searchTokensUl2Desktop.setAttribute('data-once', 'search-stop-propagation');
  ['Annual Report 2021 - 2022', 'Leadership Announcement', 'Latest Press Release', 'Brand Guidelines'].forEach((keyword) => {
    const li = document.createElement('li');
    li.setAttribute('data-once', 'search-stop-propagation');
    li.textContent = keyword;
    searchTokensUl2Desktop.append(li);
  });
  searchTokensWrap2Desktop.append(searchTokensUl2Desktop);

  desktopIconUl.append(searchLiDesktop);

  // Year 80 Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  wrap.append(year80LogoDiv);

  const year80LogoLink = document.createElement('a');
  const year80LogoLinkHref = year80LogoLinkRow.querySelector('a')?.href;
  if (year80LogoLinkHref) {
    year80LogoLink.href = year80LogoLinkHref;
  }
  moveInstrumentation(year80LogoLinkRow, year80LogoLink);
  year80LogoDiv.append(year80LogoLink);

  const year80LogoPicture = year80LogoRow.querySelector('picture');
  if (year80LogoPicture) {
    const img = year80LogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    moveInstrumentation(year80LogoRow, optimizedPic.querySelector('img'));
    year80LogoLink.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1', 'years-80');
    optimizedPic.querySelector('img').width = '74';
    optimizedPic.querySelector('img').height = '60';
  }

  // Press Release Slides
  if (pressReleaseSlides.length > 0) {
    const latestTwoPressReleaseDiv = document.createElement('div');
    latestTwoPressReleaseDiv.classList.add('latest-two-press-release');

    pressReleaseSlides.forEach((row) => {
      const [
        pressReleaseLinkCell,
        pressReleaseTitleCell,
        pressReleaseDateCell,
        pressReleaseCategoryCell,
      ] = [...row.children];

      const slideDiv = document.createElement('div');
      slideDiv.classList.add('slides');
      const slideWrap = document.createElement('div');
      slideWrap.classList.add('wrap');
      slideDiv.append(slideWrap);
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('content');
      slideWrap.append(contentDiv);
      const descDiv = document.createElement('div');
      descDiv.classList.add('desc');
      contentDiv.append(descDiv);

      const titleP = document.createElement('p');
      const titleLink = document.createElement('a');
      const prLink = pressReleaseLinkCell.querySelector('a');
      if (prLink) {
        titleLink.href = prLink.href;
      }
      titleLink.textContent = pressReleaseTitleCell.textContent.trim();
      moveInstrumentation(pressReleaseLinkCell, titleLink);
      titleP.append(titleLink);
      descDiv.append(titleP);

      const dateDiv = document.createElement('div');
      dateDiv.classList.add('date');
      const dateEm = document.createElement('em');
      dateEm.textContent = pressReleaseDateCell.textContent.trim();
      dateDiv.append(dateEm);
      const categoryEm = document.createElement('em');
      categoryEm.textContent = pressReleaseCategoryCell.textContent.trim();
      dateDiv.append(categoryEm);
      descDiv.append(dateDiv);
      moveInstrumentation(row, slideDiv);
      latestTwoPressReleaseDiv.append(slideDiv);
    });

    const newsroomLeftDiv = nav.querySelector('.newsroom-left-div');
    if (newsroomLeftDiv) {
      newsroomLeftDiv.append(latestTwoPressReleaseDiv);
    }
  }

  // Icon Link Items (if needed, append to an appropriate place, e.g., a mobile menu)
  if (iconLinkItems.length > 0) {
    const mobileMenusIcon = nav.querySelector('.mobile-menus-icon ul');
    if (mobileMenusIcon) {
      iconLinkItems.forEach((row) => {
        const [iconLinkCell, iconLabelCell] = [...row.children];
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        const foundLink = iconLinkCell.querySelector('a');
        if (foundLink) {
          anchor.href = foundLink.href;
        }
        anchor.textContent = iconLabelCell.textContent.trim();
        moveInstrumentation(row, anchor);
        li.append(anchor);
        mobileMenusIcon.append(li);
      });
    }
  }

  block.replaceChildren(header);

  // Add event listener for hamburger menu
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('close');
    header.classList.toggle('active');
  });

  // Add event listener for search toggle
  const searchToggles = block.querySelectorAll('.search[data-once="search-toggle search-stop-propagation"]');
  searchToggles.forEach((searchToggle) => {
    const searchLink = searchToggle.querySelector('a');
    const searchScreenWrap = searchToggle.querySelector('.search-screen-wrap');
    if (searchLink && searchScreenWrap) {
      searchLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        searchToggle.classList.toggle('active');
        searchScreenWrap.classList.toggle('active');
        header.classList.toggle('search-active');
      });
    }
  });

  // Close search when clicking outside
  document.addEventListener('click', (e) => {
    const searchElements = block.querySelectorAll('.search');
    searchElements.forEach((searchElement) => {
      if (!searchElement.contains(e.target) && searchElement.classList.contains('active')) {
        searchElement.classList.remove('active');
        searchElement.querySelector('.search-screen-wrap').classList.remove('active');
        header.classList.remove('search-active');
      }
    });
  });

  // Prevent search screen wrap from closing on internal clicks
  const searchScreenWraps = block.querySelectorAll('.search-screen-wrap');
  searchScreenWraps.forEach((wrapEl) => {
    wrapEl.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Initialize Swiper for search results if present
  const searchSwiperEls = block.querySelectorAll('.scrollSwiper');
  if (searchSwiperEls.length > 0) {
    await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
    searchSwiperEls.forEach((swiperEl) => {
      // eslint-disable-next-line no-undef
      new Swiper(swiperEl, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop: false,
        navigation: {
          prevEl: swiperEl.querySelector('.swiper-button-prev'),
          nextEl: swiperEl.querySelector('.swiper-button-next'),
        },
        pagination: {
          el: swiperEl.querySelector('.swiper-pagination'),
          clickable: true,
        },
        breakpoints: {
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
        },
      });
    });
  }
}
