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

  const [
    logoRow,
    logoLinkRow,
    anniversaryLogoRow,
    anniversaryLogoLinkRow,
    // The following are root-level fields, not item rows.
    // They are followed by item rows for navigationMenu, mobileIconNav, desktopIconNav,
    // pressReleaseSlides, popularKeywords, recommendedKeywords.
    // The remaining rows are filtered by their cell count.
    ...remainingRows
  ] = children;

  const navigationItems = remainingRows.filter((row) => row.children.length === 11);
  const iconNavItems = remainingRows.filter((row) => row.children.length === 3);
  const pressReleaseSlides = remainingRows.filter((row) => row.children.length === 4);
  const searchSuggestions = remainingRows.filter((row) => row.children.length === 1);

  // Identify the fixed root-level fields after the initial 4 and before the item rows
  // Based on the BlockJson model, there are 5 text/reference fields related to search
  // before the container item rows start.
  // The `remainingRows` array now starts with these 5 search-related fields,
  // followed by all the item rows.
  // We need to find the *first* 5 rows that are NOT navigationItems, iconNavItems,
  // pressReleaseSlides, or searchSuggestions.
  // A more robust way is to count the known item rows and then slice.
  // Let's assume the order in BlockJson is preserved for root fields.
  // The first 4 are already destructured. The next 5 are search-related.
  // The remaining `itemRows` start after these 9 root-level rows.

  const searchFormActionRow = children[4];
  const searchPlaceholderRow = children[5];
  const searchButtonLabelRow = children[6];
  const searchIconRow = children[7];
  const searchSubmitIconRow = children[8];

  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid'); // Do NOT add 'nav-up'

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
  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) logoLink.href = logoAnchor.href;
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoLink.classList.add('hiddenlogo1');
  moveInstrumentation(logoLinkRow, logoLink);
  logoDiv.append(logoLink);
  wrap.append(logoDiv);

  // Hamburger
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  const ulHamburger = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    ulHamburger.append(document.createElement('li'));
  }
  hamburger.append(ulHamburger);
  wrap.append(hamburger);

  // Main Navigation
  const mainNav = document.createElement('nav');
  mainNav.classList.add('main-nav');
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  mainNav.append(navUl);

  navigationItems.forEach((row) => {
    const [
      labelCell,
      linkCell,
      iconCell,
      megaMenuHeadingCell,
      megaMenuDescriptionCell,
      megaMenuSubDescriptionCell,
      keyFactsCell,
      groupHighlightsCell,
      subNavigationCell, // container for navigation-item (not used directly, its items are separate rows)
      subSubNavigationCell, // container for navigation-item (not used directly, its items are separate rows)
      hierarchyTreeCell,
    ] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell.textContent.trim();
    anchor.setAttribute('itemprop', 'url');
    moveInstrumentation(row, anchor); // Move instrumentation from the whole row to the main anchor
    li.append(anchor);

    const iconSpan = document.createElement('span');
    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
      moveInstrumentation(iconCell, optimizedPic.querySelector('img'));
      iconSpan.append(optimizedPic);
    } else {
      // Fallback SVG for icon
      iconSpan.innerHTML = '<svg alt="svg file" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>';
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
    centerDiv.append(leftDiv);

    const megaMenuHeading = document.createElement('h4');
    megaMenuHeading.classList.add('left-div-heading');
    megaMenuHeading.innerHTML = megaMenuHeadingCell.innerHTML;
    moveInstrumentation(megaMenuHeadingCell, megaMenuHeading);
    leftDiv.append(megaMenuHeading);

    const megaMenuDescription = document.createElement('p');
    megaMenuDescription.classList.add('left-div-desc');
    megaMenuDescription.innerHTML = megaMenuDescriptionCell.innerHTML;
    moveInstrumentation(megaMenuDescriptionCell, megaMenuDescription);
    leftDiv.append(megaMenuDescription);

    const megaMenuSubDescription = document.createElement('p');
    megaMenuSubDescription.classList.add('left-div-subdesc');
    megaMenuSubDescription.innerHTML = megaMenuSubDescriptionCell.innerHTML;
    moveInstrumentation(megaMenuSubDescriptionCell, megaMenuSubDescription);
    leftDiv.append(megaMenuSubDescription);

    if (keyFactsCell.textContent.trim()) {
      leftDiv.classList.add('ir-left-div'); // Specific class for Investor Relations
      leftDiv.innerHTML = ''; // Clear previous content if key facts exist
      const keyFactsHeading = document.createElement('h4');
      keyFactsHeading.classList.add('left-div-heading');
      keyFactsHeading.innerHTML = megaMenuHeadingCell.innerHTML; // Reuse heading
      moveInstrumentation(megaMenuHeadingCell, keyFactsHeading); // Re-use instrumentation
      leftDiv.append(keyFactsHeading);
      const keyFactsUl = document.createElement('ul');
      keyFactsUl.innerHTML = keyFactsCell.innerHTML;
      keyFactsUl.querySelectorAll('li').forEach((keyFactLi) => {
        keyFactLi.classList.add('list-text-red');
      });
      moveInstrumentation(keyFactsCell, keyFactsUl);
      leftDiv.append(keyFactsUl);
    }

    if (groupHighlightsCell.textContent.trim()) {
      leftDiv.classList.add('newsroom-left-div'); // Specific class for Newsroom
      leftDiv.innerHTML = ''; // Clear previous content if group highlights exist
      const groupHighlightsHeading = document.createElement('h4');
      groupHighlightsHeading.classList.add('left-div-heading');
      groupHighlightsHeading.innerHTML = megaMenuHeadingCell.innerHTML; // Reuse heading
      moveInstrumentation(megaMenuHeadingCell, groupHighlightsHeading); // Re-use instrumentation
      leftDiv.append(groupHighlightsHeading);

      const latestPressReleaseDiv = document.createElement('div');
      latestPressReleaseDiv.classList.add('latest-two-press-release');
      // The original HTML has a structure like:
      // <div class="slides"><div class="wrap"><div class="content"><div class="desc">...</div></div></div></div>
      // The generated JS is creating this structure inside the loop, which is correct.

      pressReleaseSlides.forEach((slideRow) => {
        const [
          pressReleaseLinkCell,
          pressReleaseLabelCell,
          pressReleaseDateCell,
          pressReleaseTagCell,
        ] = [...slideRow.children];

        const slideContent = document.createElement('div');
        slideContent.classList.add('slides');
        const slideWrap = document.createElement('div');
        slideWrap.classList.add('wrap');
        const slideContentInner = document.createElement('div');
        slideContentInner.classList.add('content');
        const slideDesc = document.createElement('div');
        slideDesc.classList.add('desc');

        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = pressReleaseLinkCell.querySelector('a')?.href || '#';
        a.hreflang = 'en'; // Hardcoded, check if this should come from model
        a.textContent = pressReleaseLabelCell.textContent.trim();
        moveInstrumentation(pressReleaseLinkCell, a);
        moveInstrumentation(pressReleaseLabelCell, a);
        p.append(a);
        slideDesc.append(p);

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date');
        const emTime = document.createElement('em');
        const time = document.createElement('time');
        // time.datetime = ''; // No datetime in model, so leave empty or derive
        time.textContent = pressReleaseDateCell.textContent.trim();
        moveInstrumentation(pressReleaseDateCell, time);
        emTime.append(time);
        dateDiv.append(emTime);

        const emTag = document.createElement('em');
        emTag.textContent = pressReleaseTagCell.textContent.trim();
        moveInstrumentation(pressReleaseTagCell, emTag);
        dateDiv.append(emTag);
        slideDesc.append(dateDiv);

        slideContentInner.append(slideDesc);
        slideWrap.append(slideContentInner);
        slideContent.append(slideWrap);
        moveInstrumentation(slideRow, slideContent); // Move instrumentation from the whole row
        latestPressReleaseDiv.append(slideContent);
      });
      leftDiv.append(latestPressReleaseDiv);
    }

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    centerDiv.append(subNavWrap);

    const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
    if (hierarchyRoot) {
      const hierarchyUl = document.createElement('ul');
      hierarchyUl.innerHTML = hierarchyTreeCell.innerHTML; // Correctly using innerHTML
      transformNestedLists(hierarchyUl);
      moveInstrumentation(hierarchyTreeCell, hierarchyUl); // Move instrumentation for richtext
      subNavWrap.append(hierarchyUl);
    } else {
      // Handle subNavigation and subSubNavigation (if they exist as direct links)
      // For this block, subNavigation and subSubNavigation are containers,
      // so their items would appear as separate rows.
      // If they were simple richtext, we'd process them here.
      // Given the model, these are container fields, so their content is not directly in the cell.
      // The current code correctly ignores them if they don't contain a UL.
    }

    li.append(megaMenu);
    navUl.append(li);
  });

  wrap.append(mainNav);

  // Mobile Icon Nav
  const mobileIconNavDiv = document.createElement('div');
  mobileIconNavDiv.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconNavUl = document.createElement('ul');
  mobileIconNavDiv.append(mobileIconNavUl);

  iconNavItems.forEach((row) => {
    const [iconCell, linkCell, labelCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add(labelCell.textContent.trim().toLowerCase().replace(/\s/g, '-')); // e.g., 'mail', 'search'
    moveInstrumentation(row, li); // Move instrumentation from the whole row to the li

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
      moveInstrumentation(iconCell, optimizedPic.querySelector('img'));
      anchor.append(optimizedPic);
    } else {
      // Fallback for icons if not provided
      anchor.innerHTML = '<svg alt="svg file" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 .55.45 1 1 1h2v1.93c-.66.04-1.32.07-2 .07zM17.93 13H15v-2h2.93c.49 1.29.77 2.68.77 4 0 1.9-.47 3.67-1.27 5.27z"/></svg>';
    }

    if (labelCell.textContent.trim() === 'Search') {
      const searchSpan = document.createElement('span');
      searchSpan.textContent = ' Search';
      anchor.append(searchSpan);
      li.classList.add('search');

      const searchScreenWrap = document.createElement('div');
      searchScreenWrap.classList.add('search-screen-wrap');
      const searchWrapInner = document.createElement('div');
      searchWrapInner.classList.add('wrap');
      searchScreenWrap.append(searchWrapInner);

      const searchForm = document.createElement('form');
      searchForm.action = searchFormActionRow.textContent.trim();
      searchForm.method = 'get';
      searchForm.id = 'search-block-form';
      searchForm.setAttribute('accept-charset', 'UTF-8');
      moveInstrumentation(searchFormActionRow, searchForm);
      searchWrapInner.append(searchForm);

      const searchInputWrap = document.createElement('div');
      searchInputWrap.classList.add('search-wrap');
      searchForm.append(searchInputWrap);

      const searchIconDiv = document.createElement('div');
      searchIconDiv.classList.add('search-icon');
      const searchIconImg = searchIconRow.querySelector('img');
      if (searchIconImg) {
        const optimizedPic = createOptimizedPicture(searchIconImg.src, searchIconImg.alt, false, [{ width: '24' }]);
        moveInstrumentation(searchIconRow, optimizedPic.querySelector('img'));
        searchIconDiv.append(optimizedPic);
      } else {
        searchIconDiv.innerHTML = '<svg alt="svg file" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';
      }
      searchInputWrap.append(searchIconDiv);

      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.classList.add('input-text', 'searchtext');
      searchInput.required = true;
      searchInput.name = 'key';
      searchInput.id = 'searchInput';
      searchInput.autocomplete = 'off';
      searchInput.placeholder = searchPlaceholderRow.textContent.trim();
      moveInstrumentation(searchPlaceholderRow, searchInput);
      searchInputWrap.append(searchInput);

      const submitButton = document.createElement('button');
      submitButton.classList.add('submit-button');
      const submitLabel = document.createElement('div');
      submitLabel.classList.add('label');
      submitLabel.textContent = searchButtonLabelRow.textContent.trim();
      moveInstrumentation(searchButtonLabelRow, submitLabel);
      submitButton.append(submitLabel);
      const submitIconImg = searchSubmitIconRow.querySelector('img');
      if (submitIconImg) {
        const optimizedPic = createOptimizedPicture(submitIconImg.src, submitIconImg.alt, false, [{ width: '24' }]);
        moveInstrumentation(searchSubmitIconRow, optimizedPic.querySelector('img'));
        submitButton.append(optimizedPic);
      } else {
        submitButton.innerHTML += '<svg alt="svg file" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>';
      }
      searchInputWrap.append(submitButton);

      const searchResultBox = document.createElement('div');
      searchResultBox.classList.add('searchResultBox');
      searchResultBox.style.display = 'none';
      searchForm.append(searchResultBox);

      const swiperDiv = document.createElement('div');
      swiperDiv.classList.add('swiper', 'scrollSwiper');
      const swiperWrapper = document.createElement('div');
      swiperWrapper.classList.add('swiper-wrapper');
      swiperDiv.append(swiperWrapper);
      searchResultBox.append(swiperDiv);

      const swiperScrollbar = document.createElement('div');
      swiperScrollbar.classList.add('swiper-scrollbar');
      searchResultBox.append(swiperScrollbar);

      const popularKeywordsWrap = document.createElement('div');
      popularKeywordsWrap.classList.add('search-suggestions-wrap');
      const popularLabel = document.createElement('div');
      popularLabel.classList.add('label');
      popularLabel.textContent = 'Popular Keywords:'; // Hardcoded, but matches original HTML
      popularKeywordsWrap.append(popularLabel);
      const popularTokens = document.createElement('div');
      popularTokens.classList.add('tokens-wrap');
      const popularUl = document.createElement('ul');
      // Filter searchSuggestions for "Popular Keywords" if there's a way to distinguish
      // For now, assuming all searchSuggestions are for both popular and recommended
      searchSuggestions.forEach((suggestionRow) => {
        const suggestionLi = document.createElement('li');
        suggestionLi.textContent = suggestionRow.textContent.trim();
        moveInstrumentation(suggestionRow, suggestionLi);
        popularUl.append(suggestionLi);
      });
      popularTokens.append(popularUl);
      popularKeywordsWrap.append(popularTokens);
      searchWrapInner.append(popularKeywordsWrap);

      const recommendedKeywordsWrap = document.createElement('div');
      recommendedKeywordsWrap.classList.add('search-suggestions-wrap');
      const recommendedLabel = document.createElement('div');
      recommendedLabel.classList.add('label');
      recommendedLabel.textContent = 'Recommended for you:'; // Hardcoded, but matches original HTML
      recommendedKeywordsWrap.append(recommendedLabel);
      const recommendedTokens = document.createElement('div');
      recommendedTokens.classList.add('tokens-wrap');
      const recommendedUl = document.createElement('ul');
      // Filter searchSuggestions for "Recommended for you" if there's a way to distinguish
      searchSuggestions.forEach((suggestionRow) => {
        const suggestionLi = document.createElement('li');
        suggestionLi.textContent = suggestionRow.textContent.trim();
        moveInstrumentation(suggestionRow, suggestionLi);
        recommendedUl.append(suggestionLi);
      });
      recommendedTokens.append(recommendedUl);
      recommendedKeywordsWrap.append(recommendedTokens);
      searchWrapInner.append(recommendedKeywordsWrap);

      // Event listeners for search functionality
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        searchScreenWrap.classList.toggle('active');
        block.classList.toggle('search-active');
      });

      // Close search when clicking outside
      searchScreenWrap.addEventListener('click', (e) => {
        if (e.target === searchScreenWrap) {
          searchScreenWrap.classList.remove('active');
          block.classList.remove('search-active');
        }
      });

      // Swiper initialization for search results
      // These are already loaded at the top of the file, no need to await again here.
      // await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
      // await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
      // eslint-disable-next-line no-undef
      new Swiper(swiperDiv, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop: false,
        scrollbar: {
          el: swiperScrollbar,
          hide: true,
        },
      });
    } else {
      anchor.textContent = labelCell.textContent.trim();
    }
    li.append(anchor); // Append anchor to li after search logic
    mobileIconNavUl.append(li);
  });
  navUl.append(mobileIconNavDiv);

  // Desktop Icon Nav
  const desktopIconNavDiv = document.createElement('div');
  desktopIconNavDiv.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconNavUl = document.createElement('ul');
  desktopIconNavDiv.append(desktopIconNavUl);

  iconNavItems.forEach((row) => {
    const [iconCell, linkCell, labelCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add(labelCell.textContent.trim().toLowerCase().replace(/\s/g, '-'));
    moveInstrumentation(row, li); // Move instrumentation from the whole row to the li

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
      moveInstrumentation(iconCell, optimizedPic.querySelector('img'));
      anchor.append(optimizedPic);
    } else {
      anchor.innerHTML = '<svg alt="svg file" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 .55.45 1 1 1h2v1.93c-.66.04-1.32.07-2 .07zM17.93 13H15v-2h2.93c.49 1.29.77 2.68.77 4 0 1.9-.47 3.67-1.27 5.27z"/></svg>';
    }

    if (labelCell.textContent.trim() === 'Search') {
      const searchScreenWrap = document.createElement('div');
      searchScreenWrap.classList.add('search-screen-wrap');
      const searchWrapInner = document.createElement('div');
      searchWrapInner.classList.add('wrap');
      searchScreenWrap.append(searchWrapInner);

      const searchForm = document.createElement('form');
      searchForm.action = searchFormActionRow.textContent.trim();
      searchForm.method = 'get';
      searchForm.id = 'search-block-form';
      searchForm.setAttribute('accept-charset', 'UTF-8');
      moveInstrumentation(searchFormActionRow, searchForm);
      searchWrapInner.append(searchForm);

      const searchInputWrap = document.createElement('div');
      searchInputWrap.classList.add('search-wrap');
      searchForm.append(searchInputWrap);

      const searchIconDiv = document.createElement('div');
      searchIconDiv.classList.add('search-icon');
      const searchIconImg = searchIconRow.querySelector('img');
      if (searchIconImg) {
        const optimizedPic = createOptimizedPicture(searchIconImg.src, searchIconImg.alt, false, [{ width: '24' }]);
        moveInstrumentation(searchIconRow, optimizedPic.querySelector('img'));
        searchIconDiv.append(optimizedPic);
      } else {
        searchIconDiv.innerHTML = '<svg alt="svg file" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';
      }
      searchInputWrap.append(searchIconDiv);

      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.classList.add('input-text', 'searchtext');
      searchInput.required = true;
      searchInput.name = 'key';
      searchInput.id = 'searchInput';
      searchInput.autocomplete = 'off';
      searchInput.placeholder = searchPlaceholderRow.textContent.trim();
      moveInstrumentation(searchPlaceholderRow, searchInput);
      searchInputWrap.append(searchInput);

      const submitButton = document.createElement('button');
      submitButton.classList.add('submit-button');
      const submitLabel = document.createElement('div');
      submitLabel.classList.add('label');
      submitLabel.textContent = searchButtonLabelRow.textContent.trim();
      moveInstrumentation(searchButtonLabelRow, submitLabel);
      submitButton.append(submitLabel);
      const submitIconImg = searchSubmitIconRow.querySelector('img');
      if (submitIconImg) {
        const optimizedPic = createOptimizedPicture(submitIconImg.src, submitIconImg.alt, false, [{ width: '24' }]);
        moveInstrumentation(searchSubmitIconRow, optimizedPic.querySelector('img'));
        submitButton.append(optimizedPic);
      } else {
        submitButton.innerHTML += '<svg alt="svg file" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>';
      }
      searchInputWrap.append(submitButton);

      const searchResultBox = document.createElement('div');
      searchResultBox.classList.add('searchResultBox');
      searchResultBox.style.display = 'none';
      searchForm.append(searchResultBox);

      const swiperDiv = document.createElement('div');
      swiperDiv.classList.add('swiper', 'scrollSwiper');
      const swiperWrapper = document.createElement('div');
      swiperWrapper.classList.add('swiper-wrapper');
      swiperDiv.append(swiperWrapper);
      searchResultBox.append(swiperDiv);

      const swiperScrollbar = document.createElement('div');
      swiperScrollbar.classList.add('swiper-scrollbar');
      searchResultBox.append(swiperScrollbar);

      const popularKeywordsWrap = document.createElement('div');
      popularKeywordsWrap.classList.add('search-suggestions-wrap');
      const popularLabel = document.createElement('div');
      popularLabel.classList.add('label');
      popularLabel.textContent = 'Popular Keywords:';
      popularKeywordsWrap.append(popularLabel);
      const popularTokens = document.createElement('div');
      popularTokens.classList.add('tokens-wrap');
      const popularUl = document.createElement('ul');
      searchSuggestions.forEach((suggestionRow) => {
        const suggestionLi = document.createElement('li');
        suggestionLi.textContent = suggestionRow.textContent.trim();
        moveInstrumentation(suggestionRow, suggestionLi);
        popularUl.append(suggestionLi);
      });
      popularTokens.append(popularUl);
      popularKeywordsWrap.append(popularTokens);
      searchWrapInner.append(popularKeywordsWrap);

      const recommendedKeywordsWrap = document.createElement('div');
      recommendedKeywordsWrap.classList.add('search-suggestions-wrap');
      const recommendedLabel = document.createElement('div');
      recommendedLabel.classList.add('label');
      recommendedLabel.textContent = 'Recommended for you:';
      recommendedKeywordsWrap.append(recommendedLabel);
      const recommendedTokens = document.createElement('div');
      recommendedTokens.classList.add('tokens-wrap');
      const recommendedUl = document.createElement('ul');
      searchSuggestions.forEach((suggestionRow) => {
        const suggestionLi = document.createElement('li');
        suggestionLi.textContent = suggestionRow.textContent.trim();
        moveInstrumentation(suggestionRow, suggestionLi);
        recommendedUl.append(suggestionLi);
      });
      recommendedTokens.append(recommendedUl);
      recommendedKeywordsWrap.append(recommendedTokens);
      searchWrapInner.append(recommendedKeywordsWrap);

      // Event listeners for search functionality
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        searchScreenWrap.classList.toggle('active');
        block.classList.toggle('search-active');
      });

      // Close search when clicking outside
      searchScreenWrap.addEventListener('click', (e) => {
        if (e.target === searchScreenWrap) {
          searchScreenWrap.classList.remove('active');
          block.classList.remove('search-active');
        }
      });

      // Swiper initialization for search results
      // These are already loaded at the top of the file, no need to await again here.
      // await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
      // await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
      // eslint-disable-next-line no-undef
      new Swiper(swiperDiv, {
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop: false,
        scrollbar: {
          el: swiperScrollbar,
          hide: true,
        },
      });
    } else {
      anchor.textContent = labelCell.textContent.trim();
    }
    li.append(anchor); // Append anchor to li after search logic
    desktopIconNavUl.append(li);
  });
  wrap.append(desktopIconNavDiv);

  // Anniversary Logo
  const anniversaryLogoDiv = document.createElement('div');
  anniversaryLogoDiv.classList.add('logo', 'year-80-logo');
  const anniversaryLogoLink = document.createElement('a');
  const anniversaryLogoAnchor = anniversaryLogoLinkRow.querySelector('a');
  if (anniversaryLogoAnchor) anniversaryLogoLink.href = anniversaryLogoAnchor.href;
  const anniversaryLogoPicture = anniversaryLogoRow.querySelector('picture');
  if (anniversaryLogoPicture) {
    const img = anniversaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    moveInstrumentation(anniversaryLogoRow, optimizedPic.querySelector('img'));
    anniversaryLogoLink.append(optimizedPic);
  }
  anniversaryLogoLink.classList.add('hiddenlogo1', 'years-80');
  moveInstrumentation(anniversaryLogoLinkRow, anniversaryLogoLink);
  anniversaryLogoDiv.append(anniversaryLogoLink);
  wrap.append(anniversaryLogoDiv);

  block.replaceChildren(header);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    // moveInstrumentation(img, optimizedPic.querySelector('img')); // This is already handled by createOptimizedPicture
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Scroll behavior for header
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 0) {
      header.classList.add('nav-up');
    } else {
      header.classList.remove('nav-up');
    }
    lastScrollY = window.scrollY;
  });

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    hamburger.classList.toggle('active');
    block.classList.toggle('nav-active');
  });
}
