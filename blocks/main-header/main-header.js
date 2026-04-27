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
      li.append(subWrap);
      subWrap.append(nested); // Append nested UL to subWrap

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // Class from ORIGINAL HTML
          subWrap.classList.toggle('active'); // Class from ORIGINAL HTML
        });
      }
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
  header.classList.add('main-header', 'with-marquee', 'solid', 'nav-up'); // Added 'nav-up' from ORIGINAL HTML

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  // Main Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const mainLogoLink = document.createElement('a');
  const mainLogoHref = mainLogoLinkRow.querySelector('a')?.href || '#';
  mainLogoLink.href = mainLogoHref;
  moveInstrumentation(mainLogoLinkRow, mainLogoLink);

  const mainLogoPicture = mainLogoRow.querySelector('picture');
  if (mainLogoPicture) {
    const mainLogoImg = mainLogoPicture.querySelector('img');
    const optimizedMainLogo = createOptimizedPicture(mainLogoImg.src, mainLogoImg.alt, false, [{ width: '200' }]);
    optimizedMainLogo.querySelector('img').classList.add('hiddenlogo1');
    moveInstrumentation(mainLogoRow, optimizedMainLogo.querySelector('img'));
    mainLogoLink.append(optimizedMainLogo);
  }
  logoDiv.append(mainLogoLink);
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

  const mainNav = document.createElement('nav');
  mainNav.classList.add('main-nav');
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  mainNav.append(navUl);

  const navigationItems = itemRows.filter((row) => row.children.length === 7);
  const contactLinkItems = itemRows.filter((row) => row.children.length === 3);
  const searchItems = itemRows.filter((row) => row.children.length === 10);

  navigationItems.forEach((row) => {
    const [
      labelCell,
      linkCell,
      iconCell,
      hierarchyTreeCell,
      megaMenuHeadingCell,
      megaMenuDescriptionCell,
      megaMenuSubDescriptionCell,
    ] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    anchor.setAttribute('itemprop', 'url');
    moveInstrumentation(linkCell, anchor);
    moveInstrumentation(labelCell, anchor);
    li.append(anchor);

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const iconImg = iconPicture.querySelector('img');
      const optimizedIcon = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '24' }]);
      moveInstrumentation(iconCell, optimizedIcon.querySelector('img'));
      li.append(optimizedIcon);
    }

    const hierarchyRootContent = hierarchyTreeCell.innerHTML;
    const megaMenuHeadingContent = megaMenuHeadingCell.textContent.trim();

    if (hierarchyRootContent || megaMenuHeadingContent) {
      li.classList.add('has-child'); // Ensure has-child class is present for mega menu
      const megaMenu = document.createElement('div');
      megaMenu.classList.add('mega-menu');
      const megaMenuWrap = document.createElement('div');
      megaMenuWrap.classList.add('wrap', 'container');
      const centerDiv = document.createElement('div');
      centerDiv.classList.add('center-div');
      megaMenuWrap.append(centerDiv);
      megaMenu.append(megaMenuWrap);

      const leftDiv = document.createElement('div');
      leftDiv.classList.add('left-div');
      const heading = document.createElement('h4');
      heading.classList.add('left-div-heading');
      const headingLink = document.createElement('a');
      headingLink.textContent = megaMenuHeadingContent;
      moveInstrumentation(megaMenuHeadingCell, headingLink);
      heading.append(headingLink);
      leftDiv.append(heading);

      const description = document.createElement('p');
      description.classList.add('left-div-desc');
      description.innerHTML = megaMenuDescriptionCell.innerHTML;
      moveInstrumentation(megaMenuDescriptionCell, description);
      leftDiv.append(description);

      const subDescription = document.createElement('p');
      subDescription.classList.add('left-div-subdesc');
      subDescription.textContent = megaMenuSubDescriptionCell.textContent.trim();
      moveInstrumentation(megaMenuSubDescriptionCell, subDescription);
      leftDiv.append(subDescription);
      centerDiv.append(leftDiv);

      const subNavWrap = document.createElement('div');
      subNavWrap.classList.add('sub-nav-wrap');

      if (hierarchyRootContent) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyRootContent;
        const hierarchyRootUl = tempDiv.querySelector('ul');
        if (hierarchyRootUl) {
          moveInstrumentation(hierarchyTreeCell, hierarchyRootUl);
          transformNestedLists(hierarchyRootUl);
          subNavWrap.append(hierarchyRootUl);
        }
      }
      centerDiv.append(subNavWrap);
      li.append(megaMenu);
    }
    navUl.append(li);
  });

  // Mobile icon nav
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconNavUl = document.createElement('ul');
  mobileIconNav.append(mobileIconNavUl);

  contactLinkItems.forEach((row) => {
    const [contactLinkCell, contactIconCell, contactLabelCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('mail');
    const contactAnchor = document.createElement('a');
    const foundContactLink = contactLinkCell.querySelector('a');
    if (foundContactLink) {
      contactAnchor.href = foundContactLink.href;
    }
    contactAnchor.textContent = contactLabelCell.textContent.trim();
    moveInstrumentation(contactLinkCell, contactAnchor);
    moveInstrumentation(contactIconCell, contactAnchor);
    moveInstrumentation(contactLabelCell, contactAnchor);

    // Icon is optional, if present, prepend it
    const contactIconPicture = contactIconCell.querySelector('picture');
    if (contactIconPicture) {
      const contactIconImg = contactIconPicture.querySelector('img');
      const optimizedContactIcon = createOptimizedPicture(contactIconImg.src, contactIconImg.alt, false, [{ width: '24' }]);
      contactAnchor.prepend(optimizedContactIcon);
    }
    li.append(contactAnchor);
    mobileIconNavUl.append(li);
  });

  searchItems.forEach((row) => {
    const [
      searchIcon1Cell,
      searchIcon2Cell,
      searchScreenIconCell,
      searchLabelCell,
      submitLabelCell,
      submitIconCell,
      popularKeywordsLabelCell,
      recommendedForYouLabelCell,
      popularKeywordsCell,
      recommendedKeywordsCell,
    ] = [...row.children];

    const searchLi = document.createElement('li');
    searchLi.classList.add('search');
    const searchAnchor = document.createElement('a');
    searchAnchor.href = '#';

    const searchIcon1Picture = searchIcon1Cell.querySelector('picture');
    if (searchIcon1Picture) {
      const searchIcon1Img = searchIcon1Picture.querySelector('img');
      const optimizedSearchIcon1 = createOptimizedPicture(searchIcon1Img.src, searchIcon1Img.alt, false, [{ width: '24' }]);
      moveInstrumentation(searchIcon1Cell, optimizedSearchIcon1.querySelector('img'));
      searchAnchor.append(optimizedSearchIcon1);
    }

    const searchIcon2Picture = searchIcon2Cell.querySelector('picture');
    if (searchIcon2Picture) {
      const searchIcon2Img = searchIcon2Picture.querySelector('img');
      const optimizedSearchIcon2 = createOptimizedPicture(searchIcon2Img.src, searchIcon2Img.alt, false, [{ width: '24' }]);
      moveInstrumentation(searchIcon2Cell, optimizedSearchIcon2.querySelector('img'));
      searchAnchor.append(optimizedSearchIcon2);
    }

    const searchSpan = document.createElement('span');
    searchSpan.textContent = searchLabelCell.textContent.trim();
    moveInstrumentation(searchLabelCell, searchSpan);
    searchAnchor.append(searchSpan);
    searchLi.append(searchAnchor);

    const searchScreenWrap = document.createElement('div');
    searchScreenWrap.classList.add('search-screen-wrap');
    const searchScreenWrapInner = document.createElement('div');
    searchScreenWrapInner.classList.add('wrap');
    searchScreenWrap.append(searchScreenWrapInner);

    const searchForm = document.createElement('form');
    searchForm.action = 'https://www.mahindra.com/search'; // Example action
    searchForm.method = 'get';
    searchForm.id = 'search-block-form';
    searchForm.setAttribute('accept-charset', 'UTF-8');
    searchForm.setAttribute('data-drupal-form-fields', 'edit-keys');

    const searchWrap = document.createElement('div');
    searchWrap.classList.add('search-wrap');

    const searchIconDiv = document.createElement('div');
    searchIconDiv.classList.add('search-icon');
    const searchScreenIconPicture = searchScreenIconCell.querySelector('picture');
    if (searchScreenIconPicture) {
      const searchScreenIconImg = searchScreenIconPicture.querySelector('img');
      const optimizedSearchScreenIcon = createOptimizedPicture(searchScreenIconImg.src, searchScreenIconImg.alt, false, [{ width: '24' }]);
      moveInstrumentation(searchScreenIconCell, optimizedSearchScreenIcon.querySelector('img'));
      searchIconDiv.append(optimizedSearchScreenIcon);
    }
    searchWrap.append(searchIconDiv);

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add('input-text', 'searchtext');
    searchInput.required = true;
    searchInput.name = 'key';
    searchInput.id = 'searchInput';
    searchInput.autocomplete = 'off';
    searchWrap.append(searchInput);

    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-button');
    const submitLabelDiv = document.createElement('div');
    submitLabelDiv.classList.add('label');
    submitLabelDiv.textContent = submitLabelCell.textContent.trim();
    moveInstrumentation(submitLabelCell, submitLabelDiv);
    submitButton.append(submitLabelDiv);
    const submitIconPicture = submitIconCell.querySelector('picture');
    if (submitIconPicture) {
      const submitIconImg = submitIconPicture.querySelector('img');
      const optimizedSubmitIcon = createOptimizedPicture(submitIconImg.src, submitIconImg.alt, false, [{ width: '24' }]);
      moveInstrumentation(submitIconCell, optimizedSubmitIcon.querySelector('img'));
      submitButton.append(optimizedSubmitIcon);
    }
    searchWrap.append(submitButton);
    searchForm.append(searchWrap);

    const searchResultBox = document.createElement('div');
    searchResultBox.classList.add('searchResultBox');
    searchResultBox.style.display = 'none'; // Initially hidden
    const swiperDiv = document.createElement('div');
    swiperDiv.classList.add('swiper', 'scrollSwiper');
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperWrapper.append(swiperSlide);
    swiperDiv.append(swiperWrapper);
    searchResultBox.append(swiperDiv);
    const swiperScrollbar = document.createElement('div');
    swiperScrollbar.classList.add('swiper-scrollbar');
    searchResultBox.append(swiperScrollbar);
    searchForm.append(searchResultBox);
    searchScreenWrapInner.append(searchForm);

    const popularSuggestionsWrap = document.createElement('div');
    popularSuggestionsWrap.classList.add('search-suggestions-wrap');
    const popularLabel = document.createElement('div');
    popularLabel.classList.add('label');
    popularLabel.textContent = popularKeywordsLabelCell.textContent.trim();
    moveInstrumentation(popularKeywordsLabelCell, popularLabel);
    popularSuggestionsWrap.append(popularLabel);
    const popularTokensWrap = document.createElement('div');
    popularTokensWrap.classList.add('tokens-wrap');
    const popularUl = document.createElement('ul');
    popularKeywordsCell.textContent.trim().split(',').forEach((keyword) => {
      const li = document.createElement('li');
      li.textContent = keyword.trim();
      popularUl.append(li);
    });
    moveInstrumentation(popularKeywordsCell, popularUl);
    popularTokensWrap.append(popularUl);
    popularSuggestionsWrap.append(popularTokensWrap);
    searchScreenWrapInner.append(popularSuggestionsWrap);

    const recommendedSuggestionsWrap = document.createElement('div');
    recommendedSuggestionsWrap.classList.add('search-suggestions-wrap');
    const recommendedLabel = document.createElement('div');
    recommendedLabel.classList.add('label');
    recommendedLabel.textContent = recommendedForYouLabelCell.textContent.trim();
    moveInstrumentation(recommendedForYouLabelCell, recommendedLabel);
    recommendedSuggestionsWrap.append(recommendedLabel);
    const recommendedTokensWrap = document.createElement('div');
    recommendedTokensWrap.classList.add('tokens-wrap');
    const recommendedUl = document.createElement('ul');
    recommendedKeywordsCell.textContent.trim().split(',').forEach((keyword) => {
      const li = document.createElement('li');
      li.textContent = keyword.trim();
      recommendedUl.append(li);
    });
    moveInstrumentation(recommendedKeywordsCell, recommendedUl);
    recommendedTokensWrap.append(recommendedUl);
    recommendedSuggestionsWrap.append(recommendedTokensWrap);
    searchScreenWrapInner.append(recommendedSuggestionsWrap);

    searchLi.append(searchScreenWrap);
    mobileIconNavUl.append(searchLi);

    searchAnchor.addEventListener('click', (e) => {
      e.preventDefault();
      searchScreenWrap.classList.toggle('active');
      searchLi.classList.toggle('active');
    });
  });

  navUl.append(mobileIconNav);
  wrap.append(mainNav);

  // Desktop icon nav
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconNavUl = document.createElement('ul');
  desktopIconNav.append(desktopIconNavUl);

  contactLinkItems.forEach((row) => {
    const [contactLinkCell, contactIconCell, contactLabelCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('mail');
    const contactAnchor = document.createElement('a');
    const foundContactLink = contactLinkCell.querySelector('a');
    if (foundContactLink) {
      contactAnchor.href = foundContactLink.href;
    }
    // For desktop, label is not part of anchor text, only icon
    moveInstrumentation(contactLinkCell, contactAnchor);
    moveInstrumentation(contactIconCell, contactAnchor);
    moveInstrumentation(contactLabelCell, contactAnchor);

    const contactIconPicture = contactIconCell.querySelector('picture');
    if (contactIconPicture) {
      const contactIconImg = contactIconPicture.querySelector('img');
      const optimizedContactIcon = createOptimizedPicture(contactIconImg.src, contactIconImg.alt, false, [{ width: '24' }]);
      contactAnchor.append(optimizedContactIcon);
    }
    li.append(contactAnchor);
    desktopIconNavUl.append(li);
  });

  searchItems.forEach((row) => {
    const [
      searchIcon1Cell,
      searchIcon2Cell,
      searchScreenIconCell,
      searchLabelCell,
      submitLabelCell,
      submitIconCell,
      popularKeywordsLabelCell,
      recommendedForYouLabelCell,
      popularKeywordsCell,
      recommendedKeywordsCell,
    ] = [...row.children];

    const searchLi = document.createElement('li');
    searchLi.classList.add('search');
    const searchAnchor = document.createElement('a');
    searchAnchor.href = '#';

    const searchIcon1Picture = searchIcon1Cell.querySelector('picture');
    if (searchIcon1Picture) {
      const searchIcon1Img = searchIcon1Picture.querySelector('img');
      const optimizedSearchIcon1 = createOptimizedPicture(searchIcon1Img.src, searchIcon1Img.alt, false, [{ width: '24' }]);
      moveInstrumentation(searchIcon1Cell, optimizedSearchIcon1.querySelector('img'));
      searchAnchor.append(optimizedSearchIcon1);
    }

    const searchIcon2Picture = searchIcon2Cell.querySelector('picture');
    if (searchIcon2Picture) {
      const searchIcon2Img = searchIcon2Picture.querySelector('img');
      const optimizedSearchIcon2 = createOptimizedPicture(searchIcon2Img.src, searchIcon2Img.alt, false, [{ width: '24' }]);
      moveInstrumentation(searchIcon2Cell, optimizedSearchIcon2.querySelector('img'));
      searchAnchor.append(optimizedSearchIcon2);
    }
    searchLi.append(searchAnchor);

    const searchScreenWrap = document.createElement('div');
    searchScreenWrap.classList.add('search-screen-wrap');
    const searchScreenWrapInner = document.createElement('div');
    searchScreenWrapInner.classList.add('wrap');
    searchScreenWrap.append(searchScreenWrapInner);

    const searchForm = document.createElement('form');
    searchForm.action = 'https://www.mahindra.com/search'; // Example action
    searchForm.method = 'get';
    searchForm.id = 'search-block-form';
    searchForm.setAttribute('accept-charset', 'UTF-8');
    searchForm.setAttribute('data-drupal-form-fields', 'edit-keys');

    const searchWrap = document.createElement('div');
    searchWrap.classList.add('search-wrap');

    const searchIconDiv = document.createElement('div');
    searchIconDiv.classList.add('search-icon');
    const searchScreenIconPicture = searchScreenIconCell.querySelector('picture');
    if (searchScreenIconPicture) {
      const searchScreenIconImg = searchScreenIconPicture.querySelector('img');
      const optimizedSearchScreenIcon = createOptimizedPicture(searchScreenIconImg.src, searchScreenIconImg.alt, false, [{ width: '24' }]);
      moveInstrumentation(searchScreenIconCell, optimizedSearchScreenIcon.querySelector('img'));
      searchIconDiv.append(optimizedSearchScreenIcon);
    }
    searchWrap.append(searchIconDiv);

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add('input-text', 'searchtext');
    searchInput.required = true;
    searchInput.name = 'key';
    searchInput.id = 'searchInput';
    searchInput.autocomplete = 'off';
    searchWrap.append(searchInput);

    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-button');
    const submitLabelDiv = document.createElement('div');
    submitLabelDiv.classList.add('label');
    submitLabelDiv.textContent = submitLabelCell.textContent.trim();
    moveInstrumentation(submitLabelCell, submitLabelDiv);
    submitButton.append(submitLabelDiv);
    const submitIconPicture = submitIconCell.querySelector('picture');
    if (submitIconPicture) {
      const submitIconImg = submitIconPicture.querySelector('img');
      const optimizedSubmitIcon = createOptimizedPicture(submitIconImg.src, submitIconImg.alt, false, [{ width: '24' }]);
      moveInstrumentation(submitIconCell, optimizedSubmitIcon.querySelector('img'));
      submitButton.append(optimizedSubmitIcon);
    }
    searchWrap.append(submitButton);
    searchForm.append(searchWrap);

    const searchResultBox = document.createElement('div');
    searchResultBox.classList.add('searchResultBox');
    searchResultBox.style.display = 'none'; // Initially hidden
    const swiperDiv = document.createElement('div');
    swiperDiv.classList.add('swiper', 'scrollSwiper');
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperWrapper.append(swiperSlide);
    swiperDiv.append(swiperWrapper);
    searchResultBox.append(swiperDiv);
    const swiperScrollbar = document.createElement('div');
    swiperScrollbar.classList.add('swiper-scrollbar');
    searchResultBox.append(swiperScrollbar);
    searchForm.append(searchResultBox);
    searchScreenWrapInner.append(searchForm);

    const popularSuggestionsWrap = document.createElement('div');
    popularSuggestionsWrap.classList.add('search-suggestions-wrap');
    const popularLabel = document.createElement('div');
    popularLabel.classList.add('label');
    popularLabel.textContent = popularKeywordsLabelCell.textContent.trim();
    moveInstrumentation(popularKeywordsLabelCell, popularLabel);
    popularSuggestionsWrap.append(popularLabel);
    const popularTokensWrap = document.createElement('div');
    popularTokensWrap.classList.add('tokens-wrap');
    const popularUl = document.createElement('ul');
    popularKeywordsCell.textContent.trim().split(',').forEach((keyword) => {
      const li = document.createElement('li');
      li.textContent = keyword.trim();
      popularUl.append(li);
    });
    moveInstrumentation(popularKeywordsCell, popularUl);
    popularTokensWrap.append(popularUl);
    popularSuggestionsWrap.append(popularTokensWrap);
    searchScreenWrapInner.append(popularSuggestionsWrap);

    const recommendedSuggestionsWrap = document.createElement('div');
    recommendedSuggestionsWrap.classList.add('search-suggestions-wrap');
    const recommendedLabel = document.createElement('div');
    recommendedLabel.classList.add('label');
    recommendedLabel.textContent = recommendedForYouLabelCell.textContent.trim();
    moveInstrumentation(recommendedForYouLabelCell, recommendedLabel);
    recommendedSuggestionsWrap.append(recommendedLabel);
    const recommendedTokensWrap = document.createElement('div');
    recommendedTokensWrap.classList.add('tokens-wrap');
    const recommendedUl = document.createElement('ul');
    recommendedKeywordsCell.textContent.trim().split(',').forEach((keyword) => {
      const li = document.createElement('li');
      li.textContent = keyword.trim();
      recommendedUl.append(li);
    });
    moveInstrumentation(recommendedKeywordsCell, recommendedUl);
    recommendedTokensWrap.append(recommendedUl);
    recommendedSuggestionsWrap.append(recommendedTokensWrap);
    searchScreenWrapInner.append(recommendedSuggestionsWrap);

    searchLi.append(searchScreenWrap);
    desktopIconNavUl.append(searchLi);

    searchAnchor.addEventListener('click', (e) => {
      e.preventDefault();
      searchScreenWrap.classList.toggle('active');
      searchLi.classList.toggle('active');
    });
  });

  wrap.append(desktopIconNav);

  // 80th Year Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const year80LogoLink = document.createElement('a');
  const year80LogoHref = year80LogoLinkRow.querySelector('a')?.href || '#';
  year80LogoLink.href = year80LogoHref;
  moveInstrumentation(year80LogoLinkRow, year80LogoLink);

  const year80LogoPicture = year80LogoRow.querySelector('picture');
  if (year80LogoPicture) {
    const year80LogoImg = year80LogoPicture.querySelector('img');
    const optimizedYear80Logo = createOptimizedPicture(year80LogoImg.src, year80LogoImg.alt, false, [{ width: '74' }]);
    optimizedYear80Logo.querySelector('img').classList.add('hiddenlogo1', 'years-80');
    moveInstrumentation(year80LogoRow, optimizedYear80Logo.querySelector('img'));
    year80LogoLink.append(optimizedYear80Logo);
  }
  year80LogoDiv.append(year80LogoLink);
  wrap.append(year80LogoDiv);

  block.replaceChildren(header);

  // Initialize Swiper for search results if present
  const searchSwiperEl = block.querySelector('.search-screen-wrap .swiper.scrollSwiper');
  if (searchSwiperEl) {
    await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
    // eslint-disable-next-line no-undef
    new Swiper(searchSwiperEl, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      loop: false,
      pagination: {
        el: '.swiper-scrollbar',
        type: 'progressbar',
      },
    });
  }

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}
