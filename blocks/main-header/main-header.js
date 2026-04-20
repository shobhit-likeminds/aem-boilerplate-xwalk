import { createOptimizedPicture } from '../../scripts/aem.js';
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
      transformNestedLists(nested);
    }
  });
}

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    year80LogoRow,
    year80LogoLinkRow,
    ...itemRows
  ] = [...block.children];

  block.innerHTML = '';
  block.classList.add('with-marquee', 'solid');

  const container = document.createElement('div');
  container.classList.add('container');
  block.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  // Main Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const logoLink = document.createElement('a');
  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) {
    logoLink.href = logoAnchor.href;
  }
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('hiddenlogo1');
      logoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, logoLink);
  logoDiv.append(logoLink);
  wrap.append(logoDiv);

  // Hamburger
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.setAttribute('data-once', 'hamburger-click nav-close-search');
  const hamburgerUl = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    hamburgerUl.append(document.createElement('li'));
  }
  hamburger.append(hamburgerUl);
  wrap.append(hamburger);

  // Main Nav
  const mainNav = document.createElement('nav');
  mainNav.classList.add('main-nav');
  mainNav.setAttribute('data-once', 'initSubChildToggle');
  const mainUl = document.createElement('ul');
  mainUl.setAttribute('itemscope', '');
  mainUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  mainNav.append(mainUl);
  wrap.append(mainNav);

  // Separate item rows
  const navigationItems = itemRows.filter((row) => row.children.length === 7);
  const iconNavItems = itemRows.filter((row) => row.children.length === 3);
  const pressReleaseItems = itemRows.filter((row) => row.children.length === 4);

  navigationItems.forEach((row) => {
    const [labelCell, linkCell, iconCell, hierarchyCell, headingCell, descriptionCell, subDescriptionCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');
    li.setAttribute('data-once', 'nav-close-search');

    const linkEl = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
    }
    linkEl.setAttribute('itemprop', 'url');
    linkEl.textContent = labelCell.textContent.trim();
    moveInstrumentation(linkCell, linkEl);
    li.append(linkEl);

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        const span = document.createElement('span');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '16' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        span.append(optimizedPic);
        li.append(span);
      }
    }

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu');
    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container');
    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div');
    const heading = document.createElement('h4');
    heading.classList.add('left-div-heading');
    const headingAnchor = document.createElement('a');
    headingAnchor.textContent = headingCell.textContent.trim();
    heading.append(headingAnchor);
    leftDiv.append(heading);

    if (descriptionCell.textContent.trim()) {
      const desc = document.createElement('p');
      desc.classList.add('left-div-desc');
      desc.textContent = descriptionCell.textContent.trim();
      leftDiv.append(desc);
    }

    if (subDescriptionCell.textContent.trim()) {
      const subDesc = document.createElement('p');
      subDesc.classList.add('left-div-subdesc');
      subDesc.textContent = subDescriptionCell.textContent.trim();
      leftDiv.append(subDesc);
    }
    centerDiv.append(leftDiv);

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    if (labelCell.textContent.trim().toLowerCase() === 'who we are') {
      subNavWrap.classList.add('about-us-sub-nav');
    } else if (labelCell.textContent.trim().toLowerCase() === 'what we do') {
      subNavWrap.classList.add('what-we-do');
    } else if (labelCell.textContent.trim().toLowerCase() === 'investor relations') {
      leftDiv.classList.add('ir-left-div');
      subNavWrap.classList.add('element-block');
    } else if (labelCell.textContent.trim().toLowerCase() === 'newsroom') {
      leftDiv.classList.add('newsroom-left-div');
      const latestPressReleaseDiv = document.createElement('div');
      latestPressReleaseDiv.classList.add('latest-two-press-release');
      const slidesDiv = document.createElement('div');
      slidesDiv.classList.add('slides');
      const slidesWrap = document.createElement('div');
      slidesWrap.classList.add('wrap');
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('content');
      const descDiv = document.createElement('div');
      descDiv.classList.add('desc');
      const dateDiv = document.createElement('div');
      dateDiv.classList.add('date');
      pressReleaseItems.forEach((prRow) => {
        const [prLinkCell, prTitleCell, prDateCell, prCategoryCell] = [...prRow.children];
        const prP = document.createElement('p');
        const prAnchor = document.createElement('a');
        const foundPrLink = prLinkCell.querySelector('a');
        if (foundPrLink) {
          prAnchor.href = foundPrLink.href;
        }
        prAnchor.textContent = prTitleCell.textContent.trim();
        prP.append(prAnchor);
        descDiv.append(prP);
        const dateEm = document.createElement('em');
        dateEm.textContent = prDateCell.textContent.trim();
        const categoryEm = document.createElement('em');
        categoryEm.textContent = prCategoryCell.textContent.trim();
        dateDiv.append(dateEm, categoryEm);
        contentDiv.append(descDiv, dateDiv);
        slidesWrap.append(contentDiv);
        slidesDiv.append(slidesWrap);
        latestPressReleaseDiv.append(slidesDiv);
        moveInstrumentation(prRow, prP);
      });
      leftDiv.append(latestPressReleaseDiv);
    } else if (labelCell.textContent.trim().toLowerCase() === 'careers') {
      leftDiv.classList.add('career-left-div');
      subNavWrap.classList.add('careers-div');
    }

    // Handle hierarchy-tree richtext field
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = hierarchyCell.innerHTML;
    const hierarchyRoot = tempDiv.querySelector('ul');

    if (hierarchyRoot) {
      // Apply classes from ORIGINAL HTML to the nested elements
      hierarchyRoot.querySelectorAll('li').forEach(liElement => {
        // Example: if ORIGINAL HTML has <li class="top-level-li">, add it here
        if (liElement.querySelector(':scope > ul')) {
          liElement.classList.add('top-level-li');
        }
        if (liElement.parentElement === hierarchyRoot) {
          // Add specific classes for top-level list items if needed
        }
      });
      hierarchyRoot.querySelectorAll('a').forEach(aElement => {
        // Add specific classes for anchors if needed
      });

      if (labelCell.textContent.trim().toLowerCase() === 'investor relations') {
        const ulOneLink = document.createElement('ul');
        ulOneLink.classList.add('sub-nav-wrap-one-link');
        const firstLi = hierarchyRoot.querySelector('li');
        if (firstLi) {
          ulOneLink.append(firstLi);
        }
        subNavWrap.append(ulOneLink);
        const innerSubNavWrapList = document.createElement('div');
        innerSubNavWrapList.classList.add('inner-sub-nav-wrap-list');
        const remainingUl = document.createElement('ul');
        [...hierarchyRoot.children].slice(1).forEach((child) => {
          remainingUl.append(child);
        });
        innerSubNavWrapList.append(remainingUl);
        subNavWrap.append(innerSubNavWrapList);
      } else {
        subNavWrap.append(hierarchyRoot);
      }
      moveInstrumentation(hierarchyCell, hierarchyRoot); // Move instrumentation for the whole hierarchy
      transformNestedLists(hierarchyRoot);
    }
    centerDiv.append(subNavWrap);
    megaMenuWrap.append(centerDiv);
    megaMenu.append(megaMenuWrap);
    li.append(megaMenu);
    mainUl.append(li);
    moveInstrumentation(row, li);
  });

  // Icon Nav for mobile
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconUl = document.createElement('ul');
  mobileIconNav.append(mobileIconUl);
  mainUl.append(mobileIconNav);

  // Icon Nav for desktop
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconUl = document.createElement('ul');
  desktopIconNav.append(desktopIconUl);
  mainNav.append(desktopIconNav);

  iconNavItems.forEach((row) => {
    const [iconCell, linkCell, labelCell] = [...row.children];

    const iconLiMobile = document.createElement('li');
    const iconLiDesktop = document.createElement('li');

    const iconAnchorMobile = document.createElement('a');
    const iconAnchorDesktop = document.createElement('a');

    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      iconAnchorMobile.href = foundLink.href;
      iconAnchorDesktop.href = foundLink.href;
    } else {
      iconAnchorMobile.href = '#';
      iconAnchorDesktop.href = '#';
    }

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        const optimizedPicMobile = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
        const optimizedPicDesktop = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
        moveInstrumentation(img, optimizedPicMobile.querySelector('img'));
        moveInstrumentation(img, optimizedPicDesktop.querySelector('img'));
        iconAnchorMobile.append(optimizedPicMobile);
        iconAnchorDesktop.append(optimizedPicDesktop);
      }
    }

    if (labelCell.textContent.trim().toLowerCase() === 'contact us') {
      iconLiMobile.classList.add('mail');
      iconAnchorMobile.textContent = labelCell.textContent.trim();
    } else if (labelCell.textContent.trim().toLowerCase() === 'search') {
      iconLiMobile.classList.add('search');
      iconLiMobile.setAttribute('data-once', 'search-toggle search-stop-propagation');
      iconAnchorMobile.setAttribute('data-once', 'search-stop-propagation');
      const searchSpan = document.createElement('span');
      searchSpan.setAttribute('data-once', 'search-stop-propagation');
      searchSpan.textContent = labelCell.textContent.trim();
      iconAnchorMobile.append(searchSpan);

      iconLiDesktop.classList.add('search');
      iconLiDesktop.setAttribute('data-once', 'search-toggle search-stop-propagation');
      iconAnchorDesktop.setAttribute('data-once', 'search-stop-propagation');
    }

    iconLiMobile.append(iconAnchorMobile);
    mobileIconUl.append(iconLiMobile);

    iconLiDesktop.append(iconAnchorDesktop);
    desktopIconUl.append(iconLiDesktop);
    moveInstrumentation(row, iconLiMobile);
  });

  // Search screen wrap
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
  searchIconDiv.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M15.707 14.293L11.5 10.086A6.476 6.476 0 0 0 13 6.5C13 2.916 10.084 0 6.5 0S0 2.916 0 6.5 2.916 13 6.5 13a6.476 6.476 0 0 0 3.586-1.293l4.217 4.217a1 1 0 0 0 1.414-1.414zM6.5 11C4.019 11 2 8.981 2 6.5S4.019 2 6.5 2 11 4.019 11 6.5 8.981 11 6.5 11z"/></svg>'; // Example SVG
  searchInputWrap.append(searchIconDiv);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('input-text', 'searchtext');
  searchInput.required = true;
  searchInput.name = 'key';
  searchInput.id = 'searchInput';
  searchInput.autocomplete = 'off';
  searchInput.setAttribute('data-once', 'search-stop-propagation');
  searchInputWrap.append(searchInput);

  const submitButton = document.createElement('button');
  submitButton.classList.add('submit-button');
  submitButton.setAttribute('data-once', 'search-stop-propagation');
  const submitLabel = document.createElement('div');
  submitLabel.classList.add('label');
  submitLabel.setAttribute('data-once', 'search-stop-propagation');
  submitLabel.textContent = 'Submit';
  submitButton.append(submitLabel);
  submitButton.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M15.707 14.293L11.5 10.086A6.476 6.476 0 0 0 13 6.5C13 2.916 10.084 0 6.5 0S0 2.916 0 6.5 2.916 13 6.5 13a6.476 6.476 0 0 0 3.586-1.293l4.217 4.217a1 1 0 0 0 1.414-1.414zM6.5 11C4.019 11 2 8.981 2 6.5S4.019 2 6.5 2 11 4.019 11 6.5 8.981 11 6.5 11z"/></svg>'; // Example SVG
  searchInputWrap.append(submitButton);

  const searchResultBox = document.createElement('div');
  searchResultBox.classList.add('searchResultBox');
  searchResultBox.style.display = 'none';
  searchResultBox.setAttribute('data-once', 'search-stop-propagation');
  searchForm.append(searchResultBox);

  const searchSuggestionsWrap = document.createElement('div');
  searchSuggestionsWrap.classList.add('search-suggestions-wrap');
  searchSuggestionsWrap.setAttribute('data-once', 'search-stop-propagation');
  const popularKeywordsLabel = document.createElement('div');
  popularKeywordsLabel.classList.add('label');
  popularKeywordsLabel.setAttribute('data-once', 'search-stop-propagation');
  popularKeywordsLabel.textContent = 'Popular Keywords:';
  searchSuggestionsWrap.append(popularKeywordsLabel);
  const popularKeywordsTokens = document.createElement('div');
  popularKeywordsTokens.classList.add('tokens-wrap');
  popularKeywordsTokens.setAttribute('data-once', 'search-stop-propagation');
  const popularKeywordsUl = document.createElement('ul');
  popularKeywordsUl.setAttribute('data-once', 'search-stop-propagation');
  ['Business', 'FY 21', 'Brands', 'XUV700', 'Global', 'Nanhi Kali'].forEach((keyword) => {
    const li = document.createElement('li');
    li.setAttribute('data-once', 'search-stop-propagation');
    li.textContent = keyword;
    popularKeywordsUl.append(li);
  });
  popularKeywordsTokens.append(popularKeywordsUl);
  searchSuggestionsWrap.append(popularKeywordsTokens);
  searchWrapInner.append(searchSuggestionsWrap);

  const recommendedSuggestionsWrap = document.createElement('div');
  recommendedSuggestionsWrap.classList.add('search-suggestions-wrap');
  recommendedSuggestionsWrap.setAttribute('data-once', 'search-stop-propagation');
  const recommendedLabel = document.createElement('div');
  recommendedLabel.classList.add('label');
  recommendedLabel.setAttribute('data-once', 'search-stop-propagation');
  recommendedLabel.textContent = 'Recommended for you:';
  recommendedSuggestionsWrap.append(recommendedLabel);
  const recommendedTokens = document.createElement('div');
  recommendedTokens.classList.add('tokens-wrap');
  recommendedTokens.setAttribute('data-once', 'search-stop-propagation');
  const recommendedUl = document.createElement('ul');
  recommendedUl.setAttribute('data-once', 'search-stop-propagation');
  ['Annual Report 2021 - 2022', 'Leadership Announcement', 'Latest Press Release', 'Brand Guidelines'].forEach((keyword) => {
    const li = document.createElement('li');
    li.setAttribute('data-once', 'search-stop-propagation');
    li.textContent = keyword;
    recommendedUl.append(li);
  });
  recommendedTokens.append(recommendedUl);
  recommendedSuggestionsWrap.append(recommendedTokens);
  searchWrapInner.append(recommendedSuggestionsWrap);

  // Append search screen wrap to the search list item for both mobile and desktop
  const mobileSearchLi = mobileIconUl.querySelector('.search');
  if (mobileSearchLi) {
    mobileSearchLi.append(searchScreenWrap.cloneNode(true)); // Clone for mobile
  }
  const desktopSearchLi = desktopIconUl.querySelector('.search');
  if (desktopSearchLi) {
    desktopSearchLi.append(searchScreenWrap); // Original for desktop
  }

  // 80th Year Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const year80LogoLink = document.createElement('a');
  const year80LogoAnchor = year80LogoLinkRow.querySelector('a');
  if (year80LogoAnchor) {
    year80LogoLink.href = year80LogoAnchor.href;
  }
  const year80LogoPicture = year80LogoRow.querySelector('picture');
  if (year80LogoPicture) {
    const img = year80LogoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('hiddenlogo1', 'years-80');
      year80LogoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(year80LogoRow, year80LogoLink);
  year80LogoDiv.append(year80LogoLink);
  wrap.append(year80LogoDiv);

  // Event Listeners for Hamburger
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    hamburger.classList.toggle('active');
    block.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
  });

  // Event Listeners for Search
  const searchTriggers = block.querySelectorAll('.search > a');
  searchTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const searchScreen = trigger.closest('.search').querySelector('.search-screen-wrap');
      if (searchScreen) {
        searchScreen.classList.toggle('active');
        trigger.closest('.search').classList.toggle('active');
      }
    });
  });

  // Close search when clicking outside
  document.addEventListener('click', (e) => {
    const activeSearch = block.querySelector('.search.active');
    if (activeSearch && !activeSearch.contains(e.target)) {
      activeSearch.querySelector('.search-screen-wrap').classList.remove('active');
      activeSearch.classList.remove('active');
    }
  });

  // Prevent closing search when clicking inside search screen wrap
  block.querySelectorAll('.search-screen-wrap').forEach((searchScreen) => {
    searchScreen.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
}
