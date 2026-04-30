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
      subWrap.classList.add('has-sub-child'); // Class from ORIGINAL HTML
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // Class from ORIGINAL HTML
          subWrap.classList.toggle('active'); // Class from ORIGINAL HTML
        });
      }
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

async function initSwiper(swiperEl, paginationEl, prevBtn, nextBtn) {
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // eslint-disable-next-line no-undef
  new Swiper(swiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: false,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    pagination: {
      el: paginationEl,
      clickable: true,
    },
    breakpoints: {
      576: { slidesPerView: 1 },
      768: { slidesPerView: 1 },
      992: { slidesPerView: 1 },
    },
  });
}

export default async function decorate(block) {
  const children = [...block.children];

  const [
    primaryLogoRow,
    primaryLogoLinkRow,
    anniversaryLogoRow,
    anniversaryLogoLinkRow,
    ...itemRows
  ] = children;

  const navigationItems = itemRows.filter((row) => row.children.length === 8);
  const iconLinkItems = itemRows.filter((row) => row.children.length === 2);
  const pressReleaseItems = itemRows.filter((row) => row.children.length === 4);

  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid'); // nav-up is a scroll state class, do not add initially

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  header.append(containerDiv);

  const wrapDiv = document.createElement('div');
  wrapDiv.classList.add('wrap');
  containerDiv.append(wrapDiv);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const primaryLogoLink = document.createElement('a');
  primaryLogoLink.href = primaryLogoLinkRow.querySelector('a')?.href || '#';
  const primaryLogoPicture = primaryLogoRow.querySelector('picture');
  if (primaryLogoPicture) {
    const img = primaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    primaryLogoLink.append(optimizedPic);
  }
  primaryLogoLink.querySelector('img')?.classList.add('hiddenlogo1');
  wrapDiv.append(logoDiv);
  logoDiv.append(primaryLogoLink);
  moveInstrumentation(primaryLogoRow, primaryLogoLink);
  moveInstrumentation(primaryLogoLinkRow, primaryLogoLink);

  // Hamburger
  const hamburgerDiv = document.createElement('div');
  hamburgerDiv.classList.add('hamburger');
  hamburgerDiv.setAttribute('data-once', 'hamburger-click nav-close-search');
  const hamburgerUl = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    hamburgerUl.append(document.createElement('li'));
  }
  hamburgerDiv.append(hamburgerUl);
  wrapDiv.append(hamburgerDiv);

  // Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  nav.setAttribute('data-once', 'initSubChildToggle');
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);
  wrapDiv.append(nav);

  navigationItems.forEach((row) => {
    const [
      labelCell,
      linkCell,
      hierarchyCell,
      leftPanelHeadingCell,
      leftPanelDescCell,
      leftPanelSubDescCell,
      leftPanelListCell,
      subNavigationCell,
    ] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');
    li.setAttribute('data-once', 'nav-close-search');
    navUl.append(li);

    const anchor = document.createElement('a');
    anchor.setAttribute('itemprop', 'url');
    anchor.href = linkCell.querySelector('a')?.href || '#';
    anchor.textContent = labelCell.textContent.trim();
    li.append(anchor);
    moveInstrumentation(row, anchor);

    const svgSpan = document.createElement('span');
    svgSpan.innerHTML = `<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>`;
    li.append(svgSpan);

    const megaMenuDiv = document.createElement('div');
    megaMenuDiv.classList.add('mega-menu');
    li.append(megaMenuDiv);

    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container');
    megaMenuDiv.append(megaMenuWrap);

    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div');
    megaMenuWrap.append(centerDiv);

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div');
    centerDiv.append(leftDiv);

    if (leftPanelHeadingCell.textContent.trim()) {
      const heading = document.createElement('h4');
      heading.classList.add('left-div-heading');
      const headingLink = document.createElement('a'); // Original HTML has <a> inside <h4>
      headingLink.textContent = leftPanelHeadingCell.textContent.trim();
      heading.append(headingLink);
      leftDiv.append(heading);
    }

    if (leftPanelDescCell.textContent.trim()) {
      const desc = document.createElement('p');
      desc.classList.add('left-div-desc');
      desc.textContent = leftPanelDescCell.textContent.trim();
      leftDiv.append(desc);
    }

    if (leftPanelSubDescCell.textContent.trim()) {
      const subDesc = document.createElement('p');
      subDesc.classList.add('left-div-subdesc');
      subDesc.textContent = leftPanelSubDescCell.textContent.trim();
      leftDiv.append(subDesc);
    }

    const leftPanelListContent = leftPanelListCell.innerHTML.trim();
    if (leftPanelListContent) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = leftPanelListContent;
      const ul = tempDiv.querySelector('ul');
      if (ul) {
        // Apply classes from ORIGINAL HTML to nested elements
        ul.querySelectorAll('li').forEach(item => item.classList.add('list-text-red'));
        leftDiv.append(ul);
      } else {
        leftDiv.append(tempDiv);
      }
      moveInstrumentation(leftPanelListCell, tempDiv);
    }

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    centerDiv.append(subNavWrap);

    const hierarchyRoot = hierarchyCell.querySelector('ul');
    if (hierarchyRoot) {
      // Apply classes from ORIGINAL HTML to nested elements
      hierarchyRoot.querySelectorAll('li').forEach(item => {
        if (item.querySelector(':scope > ul')) {
          item.classList.add('top-level-li'); // Example class from ORIGINAL HTML
        }
      });
      hierarchyRoot.querySelectorAll('li > a').forEach(a => {
        if (a.parentElement.querySelector(':scope > ul')) {
          const svgSpan = document.createElement('span');
          svgSpan.innerHTML = `<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>`;
          a.after(svgSpan);
        }
      });
      subNavWrap.append(hierarchyRoot);
      transformNestedLists(hierarchyRoot);
      moveInstrumentation(hierarchyCell, hierarchyRoot);
    }

    const subNavigationContent = subNavigationCell.innerHTML.trim();
    if (subNavigationContent) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = subNavigationContent;
      const ul = tempDiv.querySelector('ul');
      if (ul) {
        // Apply classes from ORIGINAL HTML to nested elements
        ul.querySelectorAll('li').forEach(item => {
          if (item.querySelector(':scope > ul')) {
            item.classList.add('top-level-li'); // Example class from ORIGINAL HTML
          }
        });
        ul.querySelectorAll('li > a').forEach(a => {
          if (a.parentElement.querySelector(':scope > ul')) {
            const svgSpan = document.createElement('span');
            svgSpan.innerHTML = `<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>`;
            a.after(svgSpan);
          }
        });
        subNavWrap.append(ul);
        transformNestedLists(ul);
      } else {
        subNavWrap.append(tempDiv);
      }
      moveInstrumentation(subNavigationCell, tempDiv);
    }
  });

  // Icon Nav (Mobile)
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconUl = document.createElement('ul');
  mobileIconNav.append(mobileIconUl);
  navUl.append(mobileIconNav);

  const contactUsLiMobile = document.createElement('li');
  contactUsLiMobile.classList.add('mail');
  const contactUsLinkMobile = document.createElement('a');
  // Find the contact us link from iconLinkItems if available, otherwise use a placeholder
  const contactUsItem = iconLinkItems.find(row => row.children[0].textContent.trim() === 'Contact Us');
  contactUsLinkMobile.href = contactUsItem?.children[1].querySelector('a')?.href || 'https://www.mahindra.com/contact-us';
  contactUsLinkMobile.textContent = 'Contact Us';
  contactUsLiMobile.append(contactUsLinkMobile);
  mobileIconUl.append(contactUsLiMobile);

  const searchLiMobile = document.createElement('li');
  searchLiMobile.classList.add('search');
  searchLiMobile.setAttribute('data-once', 'search-toggle search-stop-propagation');
  const searchLinkMobile = document.createElement('a');
  searchLinkMobile.href = '#';
  searchLinkMobile.setAttribute('data-once', 'search-stop-propagation');
  searchLinkMobile.innerHTML = `
    <svg viewBox="0 0 21 21" fill="none" class="lens" data-once="search-stop-propagation">
      <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path>
    </svg>
    <svg viewBox="0 0 50 50" class="close" data-once="search-stop-propagation">
      <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" data-once="search-stop-propagation"></path>
    </svg>
    <span data-once="search-stop-propagation"> Search</span>
  `;
  searchLiMobile.append(searchLinkMobile);
  mobileIconUl.append(searchLiMobile);

  const searchScreenWrapMobile = document.createElement('div');
  searchScreenWrapMobile.classList.add('search-screen-wrap');
  searchScreenWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  searchLiMobile.append(searchScreenWrapMobile);

  const searchWrapContentMobile = document.createElement('div');
  searchWrapContentMobile.classList.add('wrap');
  searchWrapContentMobile.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapMobile.append(searchWrapContentMobile);

  const searchFormMobile = document.createElement('form');
  searchFormMobile.action = 'https://www.mahindra.com/search';
  searchFormMobile.method = 'get';
  searchFormMobile.id = 'search-block-form-mobile';
  searchFormMobile.setAttribute('accept-charset', 'UTF-8');
  searchFormMobile.setAttribute('data-drupal-form-fields', 'edit-keys');
  searchFormMobile.setAttribute('data-once', 'search-stop-propagation');
  searchWrapContentMobile.append(searchFormMobile);

  const searchInputWrapMobile = document.createElement('div');
  searchInputWrapMobile.classList.add('search-wrap');
  searchInputWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  searchFormMobile.append(searchInputWrapMobile);

  const searchIconMobile = document.createElement('div');
  searchIconMobile.classList.add('search-icon');
  searchIconMobile.setAttribute('data-once', 'search-stop-propagation');
  searchIconMobile.innerHTML = `
    <svg viewBox="0 0 21 21" fill="none" data-once="search-stop-propagation">
      <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path>
    </svg>
  `;
  searchInputWrapMobile.append(searchIconMobile);

  const searchInputMobile = document.createElement('input');
  searchInputMobile.type = 'text';
  searchInputMobile.classList.add('input-text', 'searchtext');
  searchInputMobile.required = true;
  searchInputMobile.name = 'key';
  searchInputMobile.id = 'searchInputMobile';
  searchInputMobile.autocomplete = 'off';
  searchInputMobile.setAttribute('data-once', 'search-stop-propagation');
  searchInputWrapMobile.append(searchInputMobile);

  const submitButtonMobile = document.createElement('button');
  submitButtonMobile.classList.add('submit-button');
  submitButtonMobile.setAttribute('data-once', 'search-stop-propagation');
  submitButtonMobile.innerHTML = `
    <div class="label" data-once="search-stop-propagation"> Submit </div>
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" data-once="search-stop-propagation">
      <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black" data-once="search-stop-propagation"></path>
    </svg>
  `;
  searchInputWrapMobile.append(submitButtonMobile);

  const searchResultBoxMobile = document.createElement('div');
  searchResultBoxMobile.classList.add('searchResultBox');
  searchResultBoxMobile.setAttribute('data-once', 'search-stop-propagation');
  searchFormMobile.append(searchResultBoxMobile);

  const swiperMobile = document.createElement('div');
  swiperMobile.classList.add('swiper', 'scrollSwiper');
  swiperMobile.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxMobile.append(swiperMobile);

  const swiperWrapperMobile = document.createElement('div');
  swiperWrapperMobile.classList.add('swiper-wrapper');
  swiperWrapperMobile.setAttribute('data-once', 'search-stop-propagation');
  swiperMobile.append(swiperWrapperMobile);

  const swiperSlideMobile = document.createElement('div');
  swiperSlideMobile.classList.add('swiper-slide');
  swiperSlideMobile.setAttribute('data-once', 'search-stop-propagation');
  swiperWrapperMobile.append(swiperSlideMobile);

  const swiperScrollbarMobile = document.createElement('div');
  swiperScrollbarMobile.classList.add('swiper-scrollbar');
  swiperScrollbarMobile.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxMobile.append(swiperScrollbarMobile);

  const searchSuggestionsWrapMobile = document.createElement('div');
  searchSuggestionsWrapMobile.classList.add('search-suggestions-wrap');
  searchSuggestionsWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  searchWrapContentMobile.append(searchSuggestionsWrapMobile);

  const popularKeywordsLabelMobile = document.createElement('div');
  popularKeywordsLabelMobile.classList.add('label');
  popularKeywordsLabelMobile.setAttribute('data-once', 'search-stop-propagation');
  popularKeywordsLabelMobile.textContent = 'Popular Keywords:';
  searchSuggestionsWrapMobile.append(popularKeywordsLabelMobile);

  const tokensWrapMobile = document.createElement('div');
  tokensWrapMobile.classList.add('tokens-wrap');
  tokensWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsWrapMobile.append(tokensWrapMobile);

  const popularKeywordsUlMobile = document.createElement('ul');
  popularKeywordsUlMobile.setAttribute('data-once', 'search-stop-propagation');
  tokensWrapMobile.append(popularKeywordsUlMobile);

  // Hardcoded keywords should come from a model field if available. For now, keep as is.
  ['Business', 'FY 21', 'Brands', 'XUV700', 'Global', 'Nanhi Kali'].forEach((keyword) => {
    const li = document.createElement('li');
    li.setAttribute('data-once', 'search-stop-propagation');
    li.textContent = keyword;
    popularKeywordsUlMobile.append(li);
  });

  const recommendedForYouWrapMobile = document.createElement('div');
  recommendedForYouWrapMobile.classList.add('search-suggestions-wrap');
  recommendedForYouWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  searchWrapContentMobile.append(recommendedForYouWrapMobile);

  const recommendedLabelMobile = document.createElement('div');
  recommendedLabelMobile.classList.add('label');
  recommendedLabelMobile.setAttribute('data-once', 'search-stop-propagation');
  recommendedLabelMobile.textContent = 'Recommended for you:';
  recommendedForYouWrapMobile.append(recommendedLabelMobile);

  const recommendedTokensWrapMobile = document.createElement('div');
  recommendedTokensWrapMobile.classList.add('tokens-wrap');
  recommendedTokensWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  recommendedForYouWrapMobile.append(recommendedTokensWrapMobile);

  const recommendedUlMobile = document.createElement('ul');
  recommendedUlMobile.setAttribute('data-once', 'search-stop-propagation');
  recommendedTokensWrapMobile.append(recommendedUlMobile);

  // Hardcoded recommended items should come from a model field if available. For now, keep as is.
  ['Annual Report 2021 - 2022', 'Leadership Announcement', 'Latest Press Release', 'Brand Guidelines'].forEach((item) => {
    const li = document.createElement('li');
    li.setAttribute('data-once', 'search-stop-propagation');
    li.textContent = item;
    recommendedUlMobile.append(li);
  });

  // Icon Nav (Desktop)
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconUl = document.createElement('ul');
  desktopIconNav.append(desktopIconUl);
  nav.append(desktopIconNav);

  const contactUsLiDesktop = document.createElement('li');
  contactUsLiDesktop.classList.add('mail');
  const contactUsLinkDesktop = document.createElement('a');
  contactUsLinkDesktop.href = contactUsItem?.children[1].querySelector('a')?.href || 'https://www.mahindra.com/contact-us';
  contactUsLinkDesktop.innerHTML = `
    <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 48 38.4" style="enable-background:new 0 0 48 38.4;" xml:space="preserve" width="21" height="21" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1
                C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7
                L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z"></path>
    </svg>
  `;
  contactUsLiDesktop.append(contactUsLinkDesktop);
  desktopIconUl.append(contactUsLiDesktop);

  const searchLiDesktop = document.createElement('li');
  searchLiDesktop.classList.add('search');
  searchLiDesktop.setAttribute('data-once', 'search-toggle search-stop-propagation');
  const searchLinkDesktop = document.createElement('a');
  searchLinkDesktop.href = '#';
  searchLinkDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchLinkDesktop.innerHTML = `
    <svg viewBox="0 0 21 21" fill="none" class="lens" data-once="search-stop-propagation">
      <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path>
    </svg>
    <svg viewBox="0 0 50 50" class="close" data-once="search-stop-propagation">
      <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" data-once="search-stop-propagation"></path>
    </svg>
  `;
  searchLiDesktop.append(searchLinkDesktop);
  desktopIconUl.append(searchLiDesktop);

  const searchScreenWrapDesktop = document.createElement('div');
  searchScreenWrapDesktop.classList.add('search-screen-wrap');
  searchScreenWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchLiDesktop.append(searchScreenWrapDesktop);

  const searchWrapContentDesktop = document.createElement('div');
  searchWrapContentDesktop.classList.add('wrap');
  searchWrapContentDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapDesktop.append(searchWrapContentDesktop);

  const searchFormDesktop = document.createElement('form');
  searchFormDesktop.action = 'https://www.mahindra.com/search';
  searchFormDesktop.method = 'get';
  searchFormDesktop.id = 'search-block-form-desktop';
  searchFormDesktop.setAttribute('accept-charset', 'UTF-8');
  searchFormDesktop.setAttribute('data-drupal-form-fields', 'edit-keys');
  searchFormDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchWrapContentDesktop.append(searchFormDesktop);

  const searchInputWrapDesktop = document.createElement('div');
  searchInputWrapDesktop.classList.add('search-wrap');
  searchInputWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchFormDesktop.append(searchInputWrapDesktop);

  const searchIconDesktop = document.createElement('div');
  searchIconDesktop.classList.add('search-icon');
  searchIconDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchIconDesktop.innerHTML = `
    <svg viewBox="0 0 21 21" fill="none" data-once="search-stop-propagation">
      <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path>
    </svg>
  `;
  searchInputWrapDesktop.append(searchIconDesktop);

  const searchInputDesktop = document.createElement('input');
  searchInputDesktop.type = 'text';
  searchInputDesktop.classList.add('input-text', 'searchtext');
  searchInputDesktop.required = true;
  searchInputDesktop.name = 'key';
  searchInputDesktop.id = 'searchInputDesktop';
  searchInputDesktop.autocomplete = 'off';
  searchInputDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchInputWrapDesktop.append(searchInputDesktop);

  const submitButtonDesktop = document.createElement('button');
  submitButtonDesktop.classList.add('submit-button');
  submitButtonDesktop.setAttribute('data-once', 'search-stop-propagation');
  submitButtonDesktop.innerHTML = `
    <div class="label" data-once="search-stop-propagation"> Submit </div>
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" data-once="search-stop-propagation">
      <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black" data-once="search-stop-propagation"></path>
    </svg>
  `;
  searchInputWrapDesktop.append(submitButtonDesktop);

  const searchResultBoxDesktop = document.createElement('div');
  searchResultBoxDesktop.classList.add('searchResultBox');
  searchResultBoxDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchFormDesktop.append(searchResultBoxDesktop);

  const swiperDesktop = document.createElement('div');
  swiperDesktop.classList.add('swiper', 'scrollSwiper');
  swiperDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxDesktop.append(swiperDesktop);

  const swiperWrapperDesktop = document.createElement('div');
  swiperWrapperDesktop.classList.add('swiper-wrapper');
  swiperWrapperDesktop.setAttribute('data-once', 'search-stop-propagation');
  swiperDesktop.append(swiperWrapperDesktop);

  const swiperSlideDesktop = document.createElement('div');
  swiperSlideDesktop.classList.add('swiper-slide');
  swiperSlideDesktop.setAttribute('data-once', 'search-stop-propagation');
  swiperWrapperDesktop.append(swiperSlideDesktop);

  const swiperScrollbarDesktop = document.createElement('div');
  swiperScrollbarDesktop.classList.add('swiper-scrollbar');
  swiperScrollbarDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchResultBoxDesktop.append(swiperScrollbarDesktop);

  const searchSuggestionsWrapDesktop = document.createElement('div');
  searchSuggestionsWrapDesktop.classList.add('search-suggestions-wrap');
  searchSuggestionsWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchWrapContentDesktop.append(searchSuggestionsWrapDesktop);

  const popularKeywordsLabelDesktop = document.createElement('div');
  popularKeywordsLabelDesktop.classList.add('label');
  popularKeywordsLabelDesktop.setAttribute('data-once', 'search-stop-propagation');
  popularKeywordsLabelDesktop.textContent = 'Popular Keywords:';
  searchSuggestionsWrapDesktop.append(popularKeywordsLabelDesktop);

  const tokensWrapDesktop = document.createElement('div');
  tokensWrapDesktop.classList.add('tokens-wrap');
  tokensWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchSuggestionsWrapDesktop.append(tokensWrapDesktop);

  const popularKeywordsUlDesktop = document.createElement('ul');
  popularKeywordsUlDesktop.setAttribute('data-once', 'search-stop-propagation');
  tokensWrapDesktop.append(popularKeywordsUlDesktop);

  // Hardcoded keywords should come from a model field if available. For now, keep as is.
  ['Business', 'FY 21', 'Brands', 'XUV700', 'Global', 'Nanhi Kali'].forEach((keyword) => {
    const li = document.createElement('li');
    li.setAttribute('data-once', 'search-stop-propagation');
    li.textContent = keyword;
    popularKeywordsUlDesktop.append(li);
  });

  const recommendedForYouWrapDesktop = document.createElement('div');
  recommendedForYouWrapDesktop.classList.add('search-suggestions-wrap');
  recommendedForYouWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchWrapContentDesktop.append(recommendedForYouWrapDesktop);

  const recommendedLabelDesktop = document.createElement('div');
  recommendedLabelDesktop.classList.add('label');
  recommendedLabelDesktop.setAttribute('data-once', 'search-stop-propagation');
  recommendedLabelDesktop.textContent = 'Recommended for you:';
  recommendedForYouWrapDesktop.append(recommendedLabelDesktop);

  const recommendedTokensWrapDesktop = document.createElement('div');
  recommendedTokensWrapDesktop.classList.add('tokens-wrap');
  recommendedTokensWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  recommendedForYouWrapDesktop.append(recommendedTokensWrapDesktop);

  const recommendedUlDesktop = document.createElement('ul');
  recommendedUlDesktop.setAttribute('data-once', 'search-stop-propagation');
  recommendedTokensWrapDesktop.append(recommendedUlDesktop);

  // Hardcoded recommended items should come from a model field if available. For now, keep as is.
  ['Annual Report 2021 - 2022', 'Leadership Announcement', 'Latest Press Release', 'Brand Guidelines'].forEach((item) => {
    const li = document.createElement('li');
    li.setAttribute('data-once', 'search-stop-propagation');
    li.textContent = item;
    recommendedUlDesktop.append(li);
  });

  // 80th Year Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const anniversaryLogoLink = document.createElement('a');
  anniversaryLogoLink.href = anniversaryLogoLinkRow.querySelector('a')?.href || '#';
  const anniversaryLogoPicture = anniversaryLogoRow.querySelector('picture');
  if (anniversaryLogoPicture) {
    const img = anniversaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    anniversaryLogoLink.append(optimizedPic);
  }
  anniversaryLogoLink.querySelector('img')?.classList.add('hiddenlogo1', 'years-80');
  wrapDiv.append(year80LogoDiv);
  year80LogoDiv.append(anniversaryLogoLink);
  moveInstrumentation(anniversaryLogoRow, anniversaryLogoLink);
  moveInstrumentation(anniversaryLogoLinkRow, anniversaryLogoLink);

  // Latest Press Releases
  if (pressReleaseItems.length > 0) {
    // The original HTML shows this structure inside a newsroom-left-div, which is part of a mega-menu.
    // This implies that the press releases are only rendered if a "newsroom" navigation item exists.
    // The current code creates a newsroomLeftDiv variable but it's always null.
    // We need to find the correct parent for the press releases.
    // For now, let's assume it should be appended to the nav directly if no specific newsroom-left-div is found.
    // A more robust solution would involve checking if a navigation item's label is 'newsroom' and then appending.
    const newsroomNavItem = navigationItems.find(row => row.children[0].textContent.trim().toLowerCase() === 'newsroom');
    let newsroomLeftDiv;
    if (newsroomNavItem) {
      const megaMenu = nav.querySelector(`a[href="${newsroomNavItem.children[1].querySelector('a')?.href || '#'}"]`)?.parentElement.querySelector('.mega-menu');
      if (megaMenu) {
        newsroomLeftDiv = megaMenu.querySelector('.newsroom-left-div');
      }
    }

    if (newsroomLeftDiv) {
      const latestPressReleaseDiv = document.createElement('div');
      latestPressReleaseDiv.classList.add('latest-two-press-release');
      newsroomLeftDiv.append(latestPressReleaseDiv);

      const swiperContainer = document.createElement('div');
      swiperContainer.classList.add('swiper', 'slides');
      latestPressReleaseDiv.append(swiperContainer);

      const swiperWrapper = document.createElement('div');
      swiperWrapper.classList.add('swiper-wrapper', 'wrap');
      swiperContainer.append(swiperWrapper);

      pressReleaseItems.forEach((row) => {
        const [pressReleaseLinkCell, pressReleaseTitleCell, pressReleaseDateCell, pressReleaseCategoryCell] = [...row.children];

        const slide = document.createElement('div');
        slide.classList.add('swiper-slide', 'content');
        swiperWrapper.append(slide);

        const descDiv = document.createElement('div');
        descDiv.classList.add('desc');
        slide.append(descDiv);

        const p = document.createElement('p');
        const link = document.createElement('a');
        link.href = pressReleaseLinkCell.querySelector('a')?.href || '#';
        link.textContent = pressReleaseTitleCell.textContent.trim();
        p.append(link);
        descDiv.append(p);
        moveInstrumentation(row, link); // Move instrumentation from the row to the link

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date');
        const emDate = document.createElement('em');
        emDate.textContent = pressReleaseDateCell.textContent.trim();
        const emCategory = document.createElement('em');
        emCategory.textContent = pressReleaseCategoryCell.textContent.trim();
        dateDiv.append(emDate, emCategory);
        descDiv.append(dateDiv);
      });

      const paginationEl = document.createElement('div');
      paginationEl.classList.add('swiper-pagination');
      swiperContainer.append(paginationEl);

      const prevBtn = document.createElement('div');
      prevBtn.classList.add('swiper-button-prev');
      swiperContainer.append(prevBtn);

      const nextBtn = document.createElement('div');
      nextBtn.classList.add('swiper-button-next');
      swiperContainer.append(nextBtn);

      initSwiper(swiperContainer, paginationEl, prevBtn, nextBtn);
    }
  }

  // Hamburger toggle functionality
  hamburgerDiv.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburgerDiv.classList.toggle('close');
  });

  // Search toggle functionality
  searchLinkMobile.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    searchLiMobile.classList.toggle('active');
    searchScreenWrapMobile.classList.toggle('active');
  });

  searchLinkDesktop.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    searchLiDesktop.classList.toggle('active');
    searchScreenWrapDesktop.classList.toggle('active');
  });

  block.replaceChildren(header);
}
