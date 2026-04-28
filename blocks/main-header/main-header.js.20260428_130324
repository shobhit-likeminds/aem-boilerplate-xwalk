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
    }
  });
}

export default async function decorate(block) {
  const children = [...block.children];

  // Root fields - fixed schema, use destructuring
  const [
    mainLogoCell,
    mainLogoLinkCell,
    anniversaryLogoCell,
    anniversaryLogoLinkCell,
    searchPlaceholderCell,
    submitLabelCell,
    ...remainingRows
  ] = children;

  const navigationItemRows = remainingRows.filter((row) => row.children.length === 7);
  const pressReleaseItemRows = remainingRows.filter((row) => row.children.length === 4);
  const iconNavItemRows = remainingRows.filter((row) => row.children.length === 3);
  const searchSuggestionItemRows = remainingRows.filter((row) => row.children.length === 1);

  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  header.append(containerDiv);

  const wrapDiv = document.createElement('div');
  wrapDiv.classList.add('wrap');
  containerDiv.append(wrapDiv);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const mainLogoAnchor = document.createElement('a');
  mainLogoAnchor.href = mainLogoLinkCell.querySelector('a')?.href || '#';
  moveInstrumentation(mainLogoLinkCell, mainLogoAnchor);
  const mainLogoPicture = mainLogoCell.querySelector('picture');
  if (mainLogoPicture) {
    const mainLogoImg = mainLogoPicture.querySelector('img');
    const optimizedMainLogo = createOptimizedPicture(mainLogoImg.src, mainLogoImg.alt, false, [{ width: '200' }]);
    moveInstrumentation(mainLogoImg, optimizedMainLogo.querySelector('img'));
    mainLogoAnchor.append(optimizedMainLogo);
  }
  mainLogoAnchor.classList.add('hiddenlogo1');
  logoDiv.append(mainLogoAnchor);
  wrapDiv.append(logoDiv);

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

  // Add event listener for hamburger menu
  hamburgerDiv.addEventListener('click', () => {
    header.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
  });

  // Main Nav
  const mainNav = document.createElement('nav');
  mainNav.classList.add('main-nav');
  mainNav.setAttribute('data-once', 'initSubChildToggle');
  const mainNavUl = document.createElement('ul');
  mainNavUl.setAttribute('itemscope', '');
  mainNavUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  mainNav.append(mainNavUl);
  wrapDiv.append(mainNav);

  navigationItemRows.forEach((row) => {
    const [labelCell, linkCell, iconCell, hierarchyCell, leftHeadingCell, leftDescCell, leftSubDescCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');
    li.setAttribute('data-once', 'nav-close-search');
    moveInstrumentation(row, li); // Move instrumentation for the whole row

    const anchor = document.createElement('a');
    anchor.setAttribute('itemprop', 'url');
    anchor.href = linkCell.querySelector('a')?.href || '#';
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(linkCell, anchor);
    moveInstrumentation(labelCell, anchor);
    li.append(anchor);

    const iconSpan = document.createElement('span');
    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const iconImg = iconPicture.querySelector('img');
      const optimizedIcon = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '24' }]);
      moveInstrumentation(iconImg, optimizedIcon.querySelector('img'));
      iconSpan.append(optimizedIcon);
    }
    li.append(iconSpan);

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
    const leftDivHeading = document.createElement('h4');
    leftDivHeading.classList.add('left-div-heading');
    const leftDivHeadingAnchor = document.createElement('a');
    leftDivHeadingAnchor.textContent = leftHeadingCell.textContent.trim();
    moveInstrumentation(leftHeadingCell, leftDivHeadingAnchor);
    leftDivHeading.append(leftDivHeadingAnchor);
    leftDiv.append(leftDivHeading);

    const leftDivDesc = document.createElement('p');
    leftDivDesc.classList.add('left-div-desc');
    leftDivDesc.innerHTML = leftDescCell.innerHTML; // Use innerHTML for richtext
    moveInstrumentation(leftDescCell, leftDivDesc);
    leftDiv.append(leftDivDesc);

    const leftDivSubDesc = document.createElement('p');
    leftDivSubDesc.classList.add('left-div-subdesc');
    leftDivSubDesc.textContent = leftSubDescCell.textContent.trim();
    moveInstrumentation(leftSubDescCell, leftDivSubDesc);
    leftDiv.append(leftDivSubDesc);
    centerDiv.append(leftDiv);

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap', 'about-us-sub-nav');
    const hierarchyTempDiv = document.createElement('div');
    hierarchyTempDiv.innerHTML = hierarchyCell.innerHTML; // Use innerHTML for richtext
    moveInstrumentation(hierarchyCell, hierarchyTempDiv);
    const hierarchyRoot = hierarchyTempDiv.querySelector('ul');
    if (hierarchyRoot) {
      subNavWrap.append(hierarchyRoot);
      transformNestedLists(hierarchyRoot);
    }
    centerDiv.append(subNavWrap);
    li.append(megaMenu);
    mainNavUl.append(li);
  });

  // Icon Nav (Mobile)
  const iconNavMobile = document.createElement('div');
  iconNavMobile.classList.add('icon-nav', 'mobile-menus-icon');
  const iconNavMobileUl = document.createElement('ul');
  iconNavMobile.append(iconNavMobileUl);

  iconNavItemRows.forEach((row) => {
    const [iconCell, labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li); // Move instrumentation for the whole row
    const anchor = document.createElement('a');
    anchor.href = linkCell.querySelector('a')?.href || '#';
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(linkCell, anchor);
    moveInstrumentation(labelCell, anchor);

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const iconImg = iconPicture.querySelector('img');
      const optimizedIcon = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '24' }]);
      moveInstrumentation(iconImg, optimizedIcon.querySelector('img'));
      anchor.prepend(optimizedIcon);
    }
    li.append(anchor);
    iconNavMobileUl.append(li);

    if (labelCell.textContent.trim().toLowerCase() === 'search') {
      li.classList.add('search');
      li.setAttribute('data-once', 'search-toggle search-stop-propagation');
      anchor.setAttribute('data-once', 'search-stop-propagation');
      const searchSpan = document.createElement('span');
      searchSpan.setAttribute('data-once', 'search-stop-propagation');
      searchSpan.textContent = searchPlaceholderCell.textContent.trim();
      anchor.append(searchSpan);

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
      searchIconDiv.innerHTML = '<img alt="svg file" src="/icons/search.svg"/>'; // Replaced hardcoded path
      searchInputWrap.append(searchIconDiv);

      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.classList.add('input-text', 'searchtext');
      searchInput.required = true;
      searchInput.name = 'key';
      searchInput.id = 'searchInput';
      searchInput.autocomplete = 'off';
      searchInput.setAttribute('data-once', 'search-stop-propagation');
      searchInput.placeholder = searchPlaceholderCell.textContent.trim();
      moveInstrumentation(searchPlaceholderCell, searchInput);
      searchInputWrap.append(searchInput);

      const submitButton = document.createElement('button');
      submitButton.classList.add('submit-button');
      submitButton.setAttribute('data-once', 'search-stop-propagation');
      const submitLabelDiv = document.createElement('div');
      submitLabelDiv.classList.add('label');
      submitLabelDiv.setAttribute('data-once', 'search-stop-propagation');
      submitLabelDiv.textContent = submitLabelCell.textContent.trim();
      moveInstrumentation(submitLabelCell, submitLabelDiv);
      submitButton.append(submitLabelDiv);
      submitButton.innerHTML += '<img alt="svg file" src="/icons/arrow-right.svg"/>'; // Replaced hardcoded path
      searchInputWrap.append(submitButton);

      const searchResultBox = document.createElement('div');
      searchResultBox.classList.add('searchResultBox');
      searchResultBox.setAttribute('data-once', 'search-stop-propagation');
      searchResultBox.style.display = 'none'; // Initial state
      searchResultBox.innerHTML = `
        <div class="swiper scrollSwiper" data-once="search-stop-propagation">
          <div class="swiper-wrapper" data-once="search-stop-propagation">
            <div class="swiper-slide" data-once="search-stop-propagation"></div>
          </div>
        </div>
        <div class="swiper-scrollbar" data-once="search-stop-propagation"></div>
      `;
      searchForm.append(searchResultBox);

      const popularKeywordsWrap = document.createElement('div');
      popularKeywordsWrap.classList.add('search-suggestions-wrap');
      popularKeywordsWrap.setAttribute('data-once', 'search-stop-propagation');
      const popularLabel = document.createElement('div');
      popularLabel.classList.add('label');
      popularLabel.setAttribute('data-once', 'search-stop-propagation');
      popularLabel.textContent = 'Popular Keywords:';
      popularKeywordsWrap.append(popularLabel);
      const popularTokensWrap = document.createElement('div');
      popularTokensWrap.classList.add('tokens-wrap');
      popularTokensWrap.setAttribute('data-once', 'search-stop-propagation');
      const popularUl = document.createElement('ul');
      popularUl.setAttribute('data-once', 'search-stop-propagation');
      searchSuggestionItemRows
        .filter((row) => row.children.length === 1 && row.textContent.trim().includes('Popular'))
        .forEach((row) => {
          const liKeyword = document.createElement('li');
          liKeyword.setAttribute('data-once', 'search-stop-propagation');
          liKeyword.textContent = row.textContent.trim();
          moveInstrumentation(row, liKeyword);
          popularUl.append(liKeyword);
        });
      popularTokensWrap.append(popularUl);
      popularKeywordsWrap.append(popularTokensWrap);
      searchWrapInner.append(popularKeywordsWrap);

      const recommendedKeywordsWrap = document.createElement('div');
      recommendedKeywordsWrap.classList.add('search-suggestions-wrap');
      recommendedKeywordsWrap.setAttribute('data-once', 'search-stop-propagation');
      const recommendedLabel = document.createElement('div');
      recommendedLabel.classList.add('label');
      recommendedLabel.setAttribute('data-once', 'search-stop-propagation');
      recommendedLabel.textContent = 'Recommended for you:';
      recommendedKeywordsWrap.append(recommendedLabel);
      const recommendedTokensWrap = document.createElement('div');
      recommendedTokensWrap.classList.add('tokens-wrap');
      recommendedTokensWrap.setAttribute('data-once', 'search-stop-propagation');
      const recommendedUl = document.createElement('ul');
      recommendedUl.setAttribute('data-once', 'search-stop-propagation');
      searchSuggestionItemRows
        .filter((row) => row.children.length === 1 && row.textContent.trim().includes('Recommended'))
        .forEach((row) => {
          const liKeyword = document.createElement('li');
          liKeyword.setAttribute('data-once', 'search-stop-propagation');
          liKeyword.textContent = row.textContent.trim();
          moveInstrumentation(row, liKeyword);
          recommendedUl.append(liKeyword);
        });
      recommendedTokensWrap.append(recommendedUl);
      recommendedKeywordsWrap.append(recommendedTokensWrap);
      searchWrapInner.append(recommendedKeywordsWrap);

      li.append(searchScreenWrap);

      // Add event listener for search toggle
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        searchScreenWrap.classList.toggle('show');
      });
      searchScreenWrap.addEventListener('click', (e) => {
        if (e.target === searchScreenWrap) {
          searchScreenWrap.classList.remove('show');
        }
      });
    }
  });

  mainNavUl.append(iconNavMobile);

  // Icon Nav (Desktop)
  const iconNavDesktop = document.createElement('div');
  iconNavDesktop.classList.add('icon-nav', 'desktop-menus-icon');
  const iconNavDesktopUl = document.createElement('ul');
  iconNavDesktop.append(iconNavDesktopUl);

  iconNavItemRows.forEach((row) => {
    const [iconCell, labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li); // Move instrumentation for the whole row
    const anchor = document.createElement('a');
    anchor.href = linkCell.querySelector('a')?.href || '#';
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(linkCell, anchor);
    moveInstrumentation(labelCell, anchor);

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const iconImg = iconPicture.querySelector('img');
      const optimizedIcon = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '24' }]);
      moveInstrumentation(iconImg, optimizedIcon.querySelector('img'));
      anchor.prepend(optimizedIcon);
    }
    li.append(anchor);
    iconNavDesktopUl.append(li);

    if (labelCell.textContent.trim().toLowerCase() === 'search') {
      li.classList.add('search');
      li.setAttribute('data-once', 'search-toggle search-stop-propagation');
      anchor.setAttribute('data-once', 'search-stop-propagation');

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
      searchIconDiv.innerHTML = '<img alt="svg file" src="/icons/search.svg"/>'; // Replaced hardcoded path
      searchInputWrap.append(searchIconDiv);

      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.classList.add('input-text', 'searchtext');
      searchInput.required = true;
      searchInput.name = 'key';
      searchInput.id = 'searchInput';
      searchInput.autocomplete = 'off';
      searchInput.setAttribute('data-once', 'search-stop-propagation');
      searchInput.placeholder = searchPlaceholderCell.textContent.trim();
      moveInstrumentation(searchPlaceholderCell, searchInput);
      searchInputWrap.append(searchInput);

      const submitButton = document.createElement('button');
      submitButton.classList.add('submit-button');
      submitButton.setAttribute('data-once', 'search-stop-propagation');
      const submitLabelDiv = document.createElement('div');
      submitLabelDiv.classList.add('label');
      submitLabelDiv.setAttribute('data-once', 'search-stop-propagation');
      submitLabelDiv.textContent = submitLabelCell.textContent.trim();
      moveInstrumentation(submitLabelCell, submitLabelDiv);
      submitButton.append(submitLabelDiv);
      submitButton.innerHTML += '<img alt="svg file" src="/icons/arrow-right.svg"/>'; // Replaced hardcoded path
      searchInputWrap.append(submitButton);

      const searchResultBox = document.createElement('div');
      searchResultBox.classList.add('searchResultBox');
      searchResultBox.setAttribute('data-once', 'search-stop-propagation');
      searchResultBox.style.display = 'none'; // Initial state
      searchResultBox.innerHTML = `
        <div class="swiper scrollSwiper" data-once="search-stop-propagation">
          <div class="swiper-wrapper" data-once="search-stop-propagation">
            <div class="swiper-slide" data-once="search-stop-propagation"></div>
          </div>
        </div>
        <div class="swiper-scrollbar" data-once="search-stop-propagation"></div>
      `;
      searchForm.append(searchResultBox);

      const popularKeywordsWrap = document.createElement('div');
      popularKeywordsWrap.classList.add('search-suggestions-wrap');
      popularKeywordsWrap.setAttribute('data-once', 'search-stop-propagation');
      const popularLabel = document.createElement('div');
      popularLabel.classList.add('label');
      popularLabel.setAttribute('data-once', 'search-stop-propagation');
      popularLabel.textContent = 'Popular Keywords:';
      popularKeywordsWrap.append(popularLabel);
      const popularTokensWrap = document.createElement('div');
      popularTokensWrap.classList.add('tokens-wrap');
      popularTokensWrap.setAttribute('data-once', 'search-stop-propagation');
      const popularUl = document.createElement('ul');
      popularUl.setAttribute('data-once', 'search-stop-propagation');
      searchSuggestionItemRows
        .filter((row) => row.children.length === 1 && row.textContent.trim().includes('Popular'))
        .forEach((row) => {
          const liKeyword = document.createElement('li');
          liKeyword.setAttribute('data-once', 'search-stop-propagation');
          liKeyword.textContent = row.textContent.trim();
          moveInstrumentation(row, liKeyword);
          popularUl.append(liKeyword);
        });
      popularTokensWrap.append(popularUl);
      popularKeywordsWrap.append(popularTokensWrap);
      searchWrapInner.append(popularKeywordsWrap);

      const recommendedKeywordsWrap = document.createElement('div');
      recommendedKeywordsWrap.classList.add('search-suggestions-wrap');
      recommendedKeywordsWrap.setAttribute('data-once', 'search-stop-propagation');
      const recommendedLabel = document.createElement('div');
      recommendedLabel.classList.add('label');
      recommendedLabel.setAttribute('data-once', 'search-stop-propagation');
      recommendedLabel.textContent = 'Recommended for you:';
      recommendedKeywordsWrap.append(recommendedLabel);
      const recommendedTokensWrap = document.createElement('div');
      recommendedTokensWrap.classList.add('tokens-wrap');
      recommendedTokensWrap.setAttribute('data-once', 'search-stop-propagation');
      const recommendedUl = document.createElement('ul');
      recommendedUl.setAttribute('data-once', 'search-stop-propagation');
      searchSuggestionItemRows
        .filter((row) => row.children.length === 1 && row.textContent.trim().includes('Recommended'))
        .forEach((row) => {
          const liKeyword = document.createElement('li');
          liKeyword.setAttribute('data-once', 'search-stop-propagation');
          liKeyword.textContent = row.textContent.trim();
          moveInstrumentation(row, liKeyword);
          recommendedUl.append(liKeyword);
        });
      recommendedTokensWrap.append(recommendedUl);
      recommendedKeywordsWrap.append(recommendedTokensWrap);
      searchWrapInner.append(recommendedKeywordsWrap);

      li.append(searchScreenWrap);

      // Add event listener for search toggle
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        searchScreenWrap.classList.toggle('show');
      });
      searchScreenWrap.addEventListener('click', (e) => {
        if (e.target === searchScreenWrap) {
          searchScreenWrap.classList.remove('show');
        }
      });
    }
  });
  mainNav.append(iconNavDesktop);

  // Anniversary Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const anniversaryLogoAnchor = document.createElement('a');
  anniversaryLogoAnchor.href = anniversaryLogoLinkCell.querySelector('a')?.href || '#';
  moveInstrumentation(anniversaryLogoLinkCell, anniversaryLogoAnchor);
  const anniversaryLogoPicture = anniversaryLogoCell.querySelector('picture');
  if (anniversaryLogoPicture) {
    const anniversaryLogoImg = anniversaryLogoPicture.querySelector('img');
    const optimizedAnniversaryLogo = createOptimizedPicture(anniversaryLogoImg.src, anniversaryLogoImg.alt, false, [{ width: '74' }]);
    moveInstrumentation(anniversaryLogoImg, optimizedAnniversaryLogo.querySelector('img'));
    anniversaryLogoAnchor.append(optimizedAnniversaryLogo);
  }
  anniversaryLogoAnchor.classList.add('hiddenlogo1', 'years-80');
  year80LogoDiv.append(anniversaryLogoAnchor);
  wrapDiv.append(year80LogoDiv);

  block.replaceChildren(header);

  // Swiper initialization for search results
  const swiperEl = block.querySelector('.swiper.scrollSwiper');
  if (swiperEl) {
    await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

    // eslint-disable-next-line no-undef
    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      loop: false, // Assuming loop is false based on original HTML absence
      navigation: {
        prevEl: swiperEl.querySelector('.swiper-button-prev'), // Assuming these elements exist or will be created
        nextEl: swiperEl.querySelector('.swiper-button-next'),
      },
      scrollbar: {
        el: swiperEl.querySelector('.swiper-scrollbar'),
        hide: true,
      },
    });
  }
}
