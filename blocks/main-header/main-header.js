import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Normalize label-only nodes
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
      subWrap.classList.add('has-sub-child'); // Use class from ORIGINAL HTML
      li.classList.add('top-level-li'); // Add top-level-li to parent if it has nested children
      if (anchor) {
        // Add arrow SVG for dropdown to the anchor if it exists
        const arrowSpan = document.createElement('span');
        arrowSpan.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
        anchor.append(arrowSpan);
      }
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
    // Apply first-level-li to direct children of a sub-nav-wrap ul
    if (li.parentElement.parentElement.classList.contains('sub-nav-wrap')) {
      li.classList.add('first-level-li');
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [
    brandLogoRow,
    brandLogoLinkRow,
    anniversaryLogoRow,
    anniversaryLogoLinkRow,
    contactUsLinkRow,
    contactUsLabelRow,
    searchLabelRow,
    searchActionRow,
    searchButtonLabelRow,
    searchPopularLabelRow,
    searchRecommendedLabelRow,
    ...itemRows
  ] = children;

  const navigationItems = itemRows.filter((row) => row.children.length === 8);
  const pressReleaseItems = itemRows.filter((row) => row.children.length === 4);
  const popularTokens = itemRows.filter((row) => row.children.length === 1 && row.querySelector('div')?.textContent.trim() && row.previousElementSibling === searchPopularLabelRow);
  const recommendedTokens = itemRows.filter((row) => row.children.length === 1 && row.querySelector('div')?.textContent.trim() && row.previousElementSibling === searchRecommendedLabelRow);

  const header = document.createElement('header');
  header.classList.add('main-header', 'solid'); // Do not add 'nav-up' or 'with-marquee' initially

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  wrap.append(logoDiv);

  const brandLogoLink = document.createElement('a');
  const brandLogoAnchor = brandLogoLinkRow.querySelector('a');
  if (brandLogoAnchor) {
    brandLogoLink.href = brandLogoAnchor.href;
  }
  moveInstrumentation(brandLogoLinkRow, brandLogoLink);
  logoDiv.append(brandLogoLink);

  const brandLogoPicture = brandLogoRow.querySelector('picture');
  if (brandLogoPicture) {
    const brandLogoImg = brandLogoPicture.querySelector('img');
    if (brandLogoImg) {
      const optimizedBrandLogo = createOptimizedPicture(brandLogoImg.src, brandLogoImg.alt, false, [{ width: '200' }]);
      moveInstrumentation(brandLogoRow, optimizedBrandLogo.querySelector('img'));
      brandLogoLink.append(optimizedBrandLogo);
    }
  }

  // Hamburger
  const hamburgerDiv = document.createElement('div');
  hamburgerDiv.classList.add('hamburger');
  moveInstrumentation(block, hamburgerDiv); // Move block instrumentation to a visible element
  wrap.append(hamburgerDiv);

  const hamburgerUl = document.createElement('ul');
  hamburgerDiv.append(hamburgerUl);
  for (let i = 0; i < 3; i += 1) {
    hamburgerUl.append(document.createElement('li'));
  }

  // Main Nav
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  wrap.append(nav);

  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);

  navigationItems.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell, leftPanelHeadingCell, leftPanelDescCell,
      leftPanelSubdescCell, leftPanelFactsCell, leftPanelHighlightCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');
    navUl.append(li);

    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell?.textContent.trim() || '';
    anchor.setAttribute('itemprop', 'url');
    moveInstrumentation(row, anchor);
    li.append(anchor);

    // Arrow SVG for dropdown
    const arrowSpan = document.createElement('span');
    arrowSpan.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
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

    if (labelCell?.textContent.trim().toLowerCase() === 'newsroom') {
      leftDiv.classList.add('newsroom-left-div');
      const newsroomHeading = document.createElement('h4');
      newsroomHeading.classList.add('left-div-heading');
      const newsroomHeadingLink = document.createElement('a');
      newsroomHeadingLink.textContent = 'Newsroom';
      newsroomHeading.append(newsroomHeadingLink);
      leftDiv.append(newsroomHeading);

      const latestPressReleaseDiv = document.createElement('div');
      latestPressReleaseDiv.classList.add('latest-two-press-release');
      leftDiv.append(latestPressReleaseDiv);

      pressReleaseItems.forEach((prRow) => {
        const [prLinkCell, prHeadlineCell, prDateCell, prCategoryCell] = [...prRow.children];

        const slidesDiv = document.createElement('div');
        slidesDiv.classList.add('slides');
        moveInstrumentation(prRow, slidesDiv);

        const slidesWrap = document.createElement('div');
        slidesWrap.classList.add('wrap');
        slidesDiv.append(slidesWrap);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        slidesWrap.append(contentDiv);

        const descDiv = document.createElement('div');
        descDiv.classList.add('desc');
        contentDiv.append(descDiv);

        const headlineP = document.createElement('p');
        const headlineLink = document.createElement('a');
        const prLinkAnchor = prLinkCell.querySelector('a');
        if (prLinkAnchor) {
          headlineLink.href = prLinkAnchor.href;
        }
        headlineLink.textContent = prHeadlineCell?.textContent.trim() || '';
        headlineP.append(headlineLink);
        descDiv.append(headlineP);

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date');
        const dateEm = document.createElement('em');
        dateEm.textContent = prDateCell?.textContent.trim() || '';
        dateDiv.append(dateEm);
        const categoryEm = document.createElement('em');
        categoryEm.textContent = prCategoryCell?.textContent.trim() || '';
        dateDiv.append(categoryEm);
        descDiv.append(dateDiv);

        latestPressReleaseDiv.append(slidesDiv);
      });
    } else {
      if (leftPanelHeadingCell?.textContent.trim()) {
        const heading = document.createElement('h4');
        heading.classList.add('left-div-heading');
        const headingLink = document.createElement('a');
        headingLink.textContent = leftPanelHeadingCell.textContent.trim();
        heading.append(headingLink);
        leftDiv.append(heading);
      }
      if (leftPanelDescCell?.textContent.trim()) {
        const desc = document.createElement('p');
        desc.classList.add('left-div-desc');
        desc.textContent = leftPanelDescCell.textContent.trim();
        leftDiv.append(desc);
      }
      if (leftPanelSubdescCell?.textContent.trim()) {
        const subdesc = document.createElement('p');
        subdesc.classList.add('left-div-subdesc');
        subdesc.textContent = leftPanelSubdescCell.textContent.trim();
        leftDiv.append(subdesc);
      }
      if (leftPanelFactsCell?.innerHTML.trim()) {
        const facts = document.createElement('div');
        facts.innerHTML = leftPanelFactsCell.innerHTML;
        leftDiv.append(facts);
      }
      if (leftPanelHighlightCell?.innerHTML.trim()) {
        const highlight = document.createElement('div');
        highlight.innerHTML = leftPanelHighlightCell.innerHTML;
        leftDiv.append(highlight);
      }
    }

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    centerDiv.append(subNavWrap);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      moveInstrumentation(hierarchyCell, hierarchyRoot);
      subNavWrap.append(hierarchyRoot);
      transformNestedLists(hierarchyRoot);
    }

    // Toggle logic for mega menu
    arrowSpan.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      li.classList.toggle('active');
      megaMenu.classList.toggle('active');
    });
    anchor.addEventListener('click', (e) => {
      // Only prevent default if it's a parent with a hierarchy
      if (hierarchyRoot) {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active');
        megaMenu.classList.toggle('active');
      }
    });
  });

  // Icon Nav (Mobile)
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  navUl.append(mobileIconNav);

  const mobileIconUl = document.createElement('ul');
  mobileIconNav.append(mobileIconUl);

  // Contact Us Link (Mobile)
  const mobileMailLi = document.createElement('li');
  mobileMailLi.classList.add('mail');
  mobileIconUl.append(mobileMailLi);

  const mobileMailLink = document.createElement('a');
  const contactUsAnchor = contactUsLinkRow.querySelector('a');
  if (contactUsAnchor) {
    mobileMailLink.href = contactUsAnchor.href;
  }
  mobileMailLink.textContent = contactUsLabelRow?.textContent.trim() || '';
  moveInstrumentation(contactUsLinkRow, mobileMailLink);
  mobileMailLi.append(mobileMailLink);

  // Search (Mobile)
  const mobileSearchLi = document.createElement('li');
  mobileSearchLi.classList.add('search');
  mobileIconUl.append(mobileSearchLi);

  const mobileSearchLink = document.createElement('a');
  mobileSearchLink.href = '#';
  mobileSearchLi.append(mobileSearchLink);

  const mobileSearchLens = document.createElement('svg');
  mobileSearchLens.classList.add('lens');
  mobileSearchLens.setAttribute('viewBox', '0 0 21 21');
  mobileSearchLens.setAttribute('fill', 'none');
  mobileSearchLens.innerHTML = '<path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>';
  mobileSearchLink.append(mobileSearchLens);

  const mobileSearchClose = document.createElement('svg');
  mobileSearchClose.classList.add('close');
  mobileSearchClose.setAttribute('viewBox', '0 0 50 50');
  mobileSearchClose.innerHTML = '<path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>';
  mobileSearchLink.append(mobileSearchClose);

  const mobileSearchSpan = document.createElement('span');
  mobileSearchSpan.textContent = searchLabelRow?.textContent.trim() || '';
  mobileSearchLink.append(mobileSearchSpan);

  const mobileSearchScreenWrap = document.createElement('div');
  mobileSearchScreenWrap.classList.add('search-screen-wrap');
  mobileSearchLi.append(mobileSearchScreenWrap);

  const mobileSearchWrapInner = document.createElement('div');
  mobileSearchWrapInner.classList.add('wrap');
  mobileSearchScreenWrap.append(mobileSearchWrapInner);

  const mobileSearchForm = document.createElement('form');
  const searchActionAnchor = searchActionRow.querySelector('a');
  if (searchActionAnchor) {
    mobileSearchForm.action = searchActionAnchor.href;
  }
  mobileSearchForm.method = 'get';
  mobileSearchForm.id = 'search-block-form';
  mobileSearchForm.setAttribute('accept-charset', 'UTF-8');
  mobileSearchWrapInner.append(mobileSearchForm);

  const mobileSearchInputWrap = document.createElement('div');
  mobileSearchInputWrap.classList.add('search-wrap');
  mobileSearchForm.append(mobileSearchInputWrap);

  const mobileSearchIcon = document.createElement('div');
  mobileSearchIcon.classList.add('search-icon');
  mobileSearchIcon.innerHTML = '<svg viewBox="0 0 21 21" fill="none"><path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path></svg>';
  mobileSearchInputWrap.append(mobileSearchIcon);

  const mobileSearchInput = document.createElement('input');
  mobileSearchInput.type = 'text';
  mobileSearchInput.classList.add('input-text', 'searchtext');
  mobileSearchInput.required = true;
  mobileSearchInput.name = 'key';
  mobileSearchInput.id = 'searchInput';
  mobileSearchInput.autocomplete = 'off';
  mobileSearchInputWrap.append(mobileSearchInput);

  const mobileSearchButton = document.createElement('button');
  mobileSearchButton.classList.add('submit-button');
  mobileSearchInputWrap.append(mobileSearchButton);

  const mobileSearchButtonLabel = document.createElement('div');
  mobileSearchButtonLabel.classList.add('label');
  mobileSearchButtonLabel.textContent = searchButtonLabelRow?.textContent.trim() || '';
  mobileSearchButton.append(mobileSearchButtonLabel);

  mobileSearchButton.innerHTML += '<svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path></svg>';

  // Search Result Box (hidden by default)
  const searchResultBox = document.createElement('div');
  searchResultBox.classList.add('searchResultBox');
  searchResultBox.style.display = 'none';
  mobileSearchForm.append(searchResultBox);

  // Search Suggestions (Popular Keywords)
  const popularKeywordsWrap = document.createElement('div');
  popularKeywordsWrap.classList.add('search-suggestions-wrap');
  mobileSearchWrapInner.append(popularKeywordsWrap);

  const popularKeywordsLabel = document.createElement('div');
  popularKeywordsLabel.classList.add('label');
  popularKeywordsLabel.textContent = searchPopularLabelRow?.textContent.trim() || '';
  popularKeywordsWrap.append(popularKeywordsLabel);

  const popularTokensWrap = document.createElement('div');
  popularTokensWrap.classList.add('tokens-wrap');
  popularKeywordsWrap.append(popularTokensWrap);

  const popularTokensUl = document.createElement('ul');
  popularTokensWrap.append(popularTokensUl);

  popularTokens.forEach((row) => {
    const li = document.createElement('li');
    li.textContent = row.querySelector('div')?.textContent.trim();
    moveInstrumentation(row, li);
    popularTokensUl.append(li);
  });

  // Search Suggestions (Recommended)
  const recommendedWrap = document.createElement('div');
  recommendedWrap.classList.add('search-suggestions-wrap');
  mobileSearchWrapInner.append(recommendedWrap);

  const recommendedLabel = document.createElement('div');
  recommendedLabel.classList.add('label');
  recommendedLabel.textContent = searchRecommendedLabelRow?.textContent.trim() || '';
  recommendedWrap.append(recommendedLabel);

  const recommendedTokensWrap = document.createElement('div');
  recommendedTokensWrap.classList.add('tokens-wrap');
  recommendedWrap.append(recommendedTokensWrap);

  const recommendedTokensUl = document.createElement('ul');
  recommendedTokensWrap.append(recommendedTokensUl);

  recommendedTokens.forEach((row) => {
    const li = document.createElement('li');
    li.textContent = row.querySelector('div')?.textContent.trim();
    moveInstrumentation(row, li);
    recommendedTokensUl.append(li);
  });

  // Icon Nav (Desktop)
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  nav.append(desktopIconNav);

  const desktopIconUl = document.createElement('ul');
  desktopIconNav.append(desktopIconUl);

  // Contact Us Link (Desktop)
  const desktopMailLi = document.createElement('li');
  desktopMailLi.classList.add('mail');
  desktopIconUl.append(desktopMailLi);

  const desktopMailLink = document.createElement('a');
  if (contactUsAnchor) {
    desktopMailLink.href = contactUsAnchor.href;
  }
  desktopMailLink.innerHTML = '<svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 48 38.4" style="enable-background:new 0 0 48 38.4;" xml:space="preserve" width="21" height="21" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z"></path></svg>';
  desktopMailLi.append(desktopMailLink);

  // Search (Desktop)
  const desktopSearchLi = document.createElement('li');
  desktopSearchLi.classList.add('search');
  desktopIconUl.append(desktopSearchLi);

  const desktopSearchLink = document.createElement('a');
  desktopSearchLink.href = '#';
  desktopSearchLi.append(desktopSearchLink);

  const desktopSearchLens = document.createElement('svg');
  desktopSearchLens.classList.add('lens');
  desktopSearchLens.setAttribute('viewBox', '0 0 21 21');
  desktopSearchLens.setAttribute('fill', 'none');
  desktopSearchLens.innerHTML = '<path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>';
  desktopSearchLink.append(desktopSearchLens);

  const desktopSearchClose = document.createElement('svg');
  desktopSearchClose.classList.add('close');
  desktopSearchClose.setAttribute('viewBox', '0 0 50 50');
  desktopSearchClose.innerHTML = '<path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>';
  desktopSearchLink.append(desktopSearchClose);

  const desktopSearchScreenWrap = document.createElement('div');
  desktopSearchScreenWrap.classList.add('search-screen-wrap');
  desktopSearchLi.append(desktopSearchScreenWrap);

  const desktopSearchWrapInner = document.createElement('div');
  desktopSearchWrapInner.classList.add('wrap');
  desktopSearchScreenWrap.append(desktopSearchWrapInner);

  const desktopSearchForm = document.createElement('form');
  if (searchActionAnchor) {
    desktopSearchForm.action = searchActionAnchor.href;
  }
  desktopSearchForm.method = 'get';
  desktopSearchForm.id = 'search-block-form';
  desktopSearchForm.setAttribute('accept-charset', 'UTF-8');
  desktopSearchWrapInner.append(desktopSearchForm);

  const desktopSearchInputWrap = document.createElement('div');
  desktopSearchInputWrap.classList.add('search-wrap');
  desktopSearchForm.append(desktopSearchInputWrap);

  const desktopSearchIcon = document.createElement('div');
  desktopSearchIcon.classList.add('search-icon');
  desktopSearchIcon.innerHTML = '<svg viewBox="0 0 21 21" fill="none"><path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path></svg>';
  desktopSearchInputWrap.append(desktopSearchIcon);

  const desktopSearchInput = document.createElement('input');
  desktopSearchInput.type = 'text';
  desktopSearchInput.classList.add('input-text', 'searchtext');
  desktopSearchInput.required = true;
  desktopSearchInput.name = 'key';
  desktopSearchInput.id = 'searchInput';
  desktopSearchInput.autocomplete = 'off';
  desktopSearchInputWrap.append(desktopSearchInput);

  const desktopSearchButton = document.createElement('button');
  desktopSearchButton.classList.add('submit-button');
  desktopSearchInputWrap.append(desktopSearchButton);

  const desktopSearchButtonLabel = document.createElement('div');
  desktopSearchButtonLabel.classList.add('label');
  desktopSearchButtonLabel.textContent = searchButtonLabelRow?.textContent.trim() || '';
  desktopSearchButton.append(desktopSearchButtonLabel);

  desktopSearchButton.innerHTML += '<svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path></svg>';

  // Search Result Box (hidden by default)
  const desktopSearchResultBox = document.createElement('div');
  desktopSearchResultBox.classList.add('searchResultBox');
  desktopSearchResultBox.style.display = 'none';
  desktopSearchForm.append(desktopSearchResultBox);

  // Search Suggestions (Popular Keywords)
  const desktopPopularKeywordsWrap = document.createElement('div');
  desktopPopularKeywordsWrap.classList.add('search-suggestions-wrap');
  desktopSearchWrapInner.append(desktopPopularKeywordsWrap);

  const desktopPopularKeywordsLabel = document.createElement('div');
  desktopPopularKeywordsLabel.classList.add('label');
  desktopPopularKeywordsLabel.textContent = searchPopularLabelRow?.textContent.trim() || '';
  desktopPopularKeywordsWrap.append(desktopPopularKeywordsLabel);

  const desktopPopularTokensWrap = document.createElement('div');
  desktopPopularTokensWrap.classList.add('tokens-wrap');
  desktopPopularKeywordsWrap.append(desktopPopularTokensWrap);

  const desktopPopularTokensUl = document.createElement('ul');
  desktopPopularTokensWrap.append(desktopPopularTokensUl);

  popularTokens.forEach((row) => {
    const li = document.createElement('li');
    li.textContent = row.querySelector('div')?.textContent.trim();
    moveInstrumentation(row, li);
    desktopPopularTokensUl.append(li);
  });

  // Search Suggestions (Recommended)
  const desktopRecommendedWrap = document.createElement('div');
  desktopRecommendedWrap.classList.add('search-suggestions-wrap');
  desktopSearchWrapInner.append(desktopRecommendedWrap);

  const desktopRecommendedLabel = document.createElement('div');
  recommendedLabel.classList.add('label');
  desktopRecommendedLabel.textContent = searchRecommendedLabelRow?.textContent.trim() || '';
  desktopRecommendedWrap.append(desktopRecommendedLabel);

  const desktopRecommendedTokensWrap = document.createElement('div');
  desktopRecommendedTokensWrap.classList.add('tokens-wrap');
  desktopRecommendedWrap.append(desktopRecommendedTokensWrap);

  const desktopRecommendedTokensUl = document.createElement('ul');
  desktopRecommendedTokensWrap.append(desktopRecommendedTokensUl);

  recommendedTokens.forEach((row) => {
    const li = document.createElement('li');
    li.textContent = row.querySelector('div')?.textContent.trim();
    moveInstrumentation(row, li);
    desktopRecommendedTokensUl.append(li);
  });

  // Year Logo
  const yearLogoDiv = document.createElement('div');
  yearLogoDiv.classList.add('logo', 'year-80-logo');
  wrap.append(yearLogoDiv);

  const anniversaryLogoLink = document.createElement('a');
  const anniversaryLogoAnchor = anniversaryLogoLinkRow.querySelector('a');
  if (anniversaryLogoAnchor) {
    anniversaryLogoLink.href = anniversaryLogoAnchor.href;
  }
  moveInstrumentation(anniversaryLogoLinkRow, anniversaryLogoLink);
  yearLogoDiv.append(anniversaryLogoLink);

  const anniversaryLogoPicture = anniversaryLogoRow.querySelector('picture');
  if (anniversaryLogoPicture) {
    const anniversaryLogoImg = anniversaryLogoPicture.querySelector('img');
    if (anniversaryLogoImg) {
      const optimizedAnniversaryLogo = createOptimizedPicture(anniversaryLogoImg.src, anniversaryLogoImg.alt, false, [{ width: '74' }]);
      moveInstrumentation(anniversaryLogoRow, optimizedAnniversaryLogo.querySelector('img'));
      anniversaryLogoLink.append(optimizedAnniversaryLogo);
    }
  }

  // Toggle for hamburger menu
  hamburgerDiv.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburgerDiv.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Toggle for mobile search
  mobileSearchLink.addEventListener('click', (e) => {
    e.preventDefault();
    mobileSearchLi.classList.toggle('active');
    mobileSearchScreenWrap.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Toggle for desktop search
  desktopSearchLink.addEventListener('click', (e) => {
    e.preventDefault();
    desktopSearchLi.classList.toggle('active');
    desktopSearchScreenWrap.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  block.replaceChildren(header);
}
