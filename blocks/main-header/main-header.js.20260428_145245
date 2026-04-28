import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Add classes from original HTML
    li.classList.add('top-level-li'); // Assuming this is a top-level li in the hierarchy-tree

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
    } else {
      // Add classes to anchor if it exists
      anchor.classList.add('top-level-link'); // Example class, adjust as needed from original HTML
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('has-sub-child'); // From ORIGINAL HTML
      subWrap.append(nested);
      li.append(subWrap);

      // Add SVG span for toggle
      const svgSpan = document.createElement('span');
      svgSpan.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
      li.append(svgSpan);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // From ORIGINAL HTML
          subWrap.classList.toggle('active'); // From ORIGINAL HTML
        });
      }
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Root rows are fixed schema, use destructuring
  const [
    logoRow,
    logoLinkRow,
    yearLogoRow,
    yearLogoLinkRow,
    ...itemRows
  ] = children;

  const header = document.createElement('header');
  header.classList.add('main-header'); // From ORIGINAL HTML
  // Removed 'with-marquee', 'solid', 'nav-up' as per Rule 19 and ORIGINAL HTML
  // Data-once attribute is on the header itself in original HTML, not recreated here
  // header.setAttribute('data-once', 'header-hover'); // If needed, add this

  const container = document.createElement('div');
  container.classList.add('container'); // From ORIGINAL HTML
  header.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap'); // From ORIGINAL HTML
  container.append(wrap);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo'); // From ORIGINAL HTML
  wrap.append(logoDiv);

  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a'); // Correctly read aem-content
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink); // Move instrumentation from original row to new element
  logoDiv.append(logoLink);

  const logoPicture = logoRow.querySelector('picture'); // Correctly read reference
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(logoRow, optimizedPic.querySelector('img')); // Move instrumentation
    logoLink.append(optimizedPic);
  }

  // Hamburger
  const hamburgerDiv = document.createElement('div');
  hamburgerDiv.classList.add('hamburger'); // From ORIGINAL HTML
  hamburgerDiv.setAttribute('data-once', 'hamburger-click nav-close-search'); // From ORIGINAL HTML
  const hamburgerUl = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    hamburgerUl.append(document.createElement('li'));
  }
  hamburgerDiv.append(hamburgerUl);
  wrap.append(hamburgerDiv);

  // Main Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav'); // From ORIGINAL HTML
  nav.setAttribute('data-once', 'initSubChildToggle'); // From ORIGINAL HTML
  wrap.append(nav);

  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', ''); // From ORIGINAL HTML
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement'); // From ORIGINAL HTML
  nav.append(navUl);

  // Separate navigation items from icon links and press releases
  // Use content detection for root-level rows to distinguish types
  const navigationItems = itemRows.filter((row) => row.children.length === 10);
  const pressReleaseItems = itemRows.filter((row) => row.children.length === 4);
  const iconLinkItems = itemRows.filter((row) => row.children.length === 2);

  navigationItems.forEach((row) => {
    // Fixed schema for navigation-item, use destructuring
    const [
      labelCell,
      linkCell,
      hierarchyCell,
      leftHeadingCell,
      leftDescCell,
      leftSubdescCell,
      keyFactsListCell,
      groupHighlightsCell,
      irFactsListCell,
      pressReleasesContainerCell, // This cell is a container, its items are separate rows
    ] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red'); // From ORIGINAL HTML
    li.setAttribute('itemprop', 'name'); // From ORIGINAL HTML
    li.setAttribute('data-once', 'nav-close-search'); // From ORIGINAL HTML

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a'); // Correctly read aem-content
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    anchor.setAttribute('itemprop', 'url'); // From ORIGINAL HTML
    moveInstrumentation(row, anchor); // Move instrumentation from original row to new element
    li.append(anchor);

    const svgSpan = document.createElement('span');
    svgSpan.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
    li.append(svgSpan);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu'); // From ORIGINAL HTML
    li.append(megaMenu);

    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container'); // From ORIGINAL HTML
    megaMenu.append(megaMenuWrap);

    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div'); // From ORIGINAL HTML
    megaMenuWrap.append(centerDiv);

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div'); // From ORIGINAL HTML
    centerDiv.append(leftDiv);

    const leftHeading = document.createElement('h4');
    leftHeading.classList.add('left-div-heading'); // From ORIGINAL HTML
    const leftHeadingLink = document.createElement('a');
    leftHeadingLink.textContent = leftHeadingCell.textContent.trim();
    leftHeading.append(leftHeadingLink);
    leftDiv.append(leftHeading);

    const leftDesc = document.createElement('p');
    leftDesc.classList.add('left-div-desc'); // From ORIGINAL HTML
    leftDesc.textContent = leftDescCell.textContent.trim();
    leftDiv.append(leftDesc);

    const leftSubdesc = document.createElement('p');
    leftSubdesc.classList.add('left-div-subdesc'); // From ORIGINAL HTML
    leftSubdesc.textContent = leftSubdescCell.textContent.trim();
    leftDiv.append(leftSubdesc);

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap'); // From ORIGINAL HTML
    centerDiv.append(subNavWrap);

    // Richtext handling for hierarchy-tree
    const tempDiv = document.createElement('div');
    moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell
    tempDiv.innerHTML = hierarchyCell.innerHTML; // Use innerHTML to preserve structure

    const hierarchyRoot = tempDiv.querySelector('ul');
    if (hierarchyRoot) {
      // Add classes to the root ul if needed, e.g., 'about-us-sub-nav' or 'what-we-do'
      // Based on original HTML, these are added dynamically based on menu label
      subNavWrap.append(hierarchyRoot);
      transformNestedLists(hierarchyRoot); // Apply transformations and event listeners
    }

    navUl.append(li);

    // Toggle mega-menu visibility
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      li.classList.toggle('active'); // From ORIGINAL HTML
      megaMenu.classList.toggle('active'); // From ORIGINAL HTML
    });

    // Handle specific left-div content based on label
    const menuLabel = labelCell.textContent.trim().toLowerCase();
    if (menuLabel === 'what we do') {
      leftDiv.classList.add('ir-left-div'); // From ORIGINAL HTML (used for 'what we do' in original)
      const keyFactsList = keyFactsListCell.textContent.trim();
      if (keyFactsList) {
        const ul = document.createElement('ul');
        keyFactsList.split(',').forEach((fact) => {
          const factLi = document.createElement('li');
          factLi.classList.add('list-text-red'); // From ORIGINAL HTML
          const [value, label] = fact.split(' ');
          factLi.innerHTML = `${value} <span>${label}</span>`;
          ul.append(factLi);
        });
        leftDiv.append(ul);
      }
      subNavWrap.classList.add('what-we-do'); // From ORIGINAL HTML
    } else if (menuLabel === 'investor relations') {
      leftDiv.classList.add('ir-left-div'); // From ORIGINAL HTML
      const groupHighlights = groupHighlightsCell.textContent.trim();
      if (groupHighlights) {
        const p = document.createElement('p');
        p.textContent = groupHighlights;
        leftDiv.append(p);
      }
      const irFactsList = irFactsListCell.textContent.trim();
      if (irFactsList) {
        const ul = document.createElement('ul');
        irFactsList.split(',').forEach((fact) => {
          const factLi = document.createElement('li');
          factLi.classList.add('list-text-red'); // From ORIGINAL HTML
          const [value, label] = fact.split(' ');
          factLi.innerHTML = `${value} <span>${label}</span>`;
          ul.append(factLi);
        });
        leftDiv.append(ul);
      }
      subNavWrap.classList.add('element-block'); // From ORIGINAL HTML
      // Add press releases
      const pressReleaseWrap = document.createElement('div');
      pressReleaseWrap.classList.add('latest-two-press-release'); // From ORIGINAL HTML
      leftDiv.append(pressReleaseWrap);

      pressReleaseItems.slice(0, 2).forEach((prRow) => {
        // Fixed schema for press-release-item, use destructuring
        const [prLinkCell, prTitleCell, prDateCell, prCategoryCell] = [...prRow.children];
        const prLink = prLinkCell.querySelector('a');

        const slideDiv = document.createElement('div');
        slideDiv.classList.add('slides'); // From ORIGINAL HTML
        const slideWrap = document.createElement('div');
        slideWrap.classList.add('wrap'); // From ORIGINAL HTML
        slideDiv.append(slideWrap);
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content'); // From ORIGINAL HTML
        slideWrap.append(contentDiv);
        const descDiv = document.createElement('div');
        descDiv.classList.add('desc'); // From ORIGINAL HTML
        contentDiv.append(descDiv);

        const p = document.createElement('p');
        const prAnchor = document.createElement('a');
        if (prLink) prAnchor.href = prLink.href;
        prAnchor.textContent = prTitleCell.textContent.trim();
        p.append(prAnchor);
        descDiv.append(p);

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date'); // From ORIGINAL HTML
        const emDate = document.createElement('em');
        emDate.textContent = prDateCell.textContent.trim();
        const emCategory = document.createElement('em');
        emCategory.textContent = prCategoryCell.textContent.trim();
        dateDiv.append(emDate, emCategory);
        descDiv.append(dateDiv);
        pressReleaseWrap.append(slideDiv);
        moveInstrumentation(prRow, prAnchor); // Move instrumentation
      });
    } else if (menuLabel === 'newsroom') {
      leftDiv.classList.add('newsroom-left-div'); // From ORIGINAL HTML
      const latestPressReleaseDiv = document.createElement('div');
      latestPressReleaseDiv.classList.add('latest-two-press-release'); // From ORIGINAL HTML
      leftDiv.append(latestPressReleaseDiv);

      pressReleaseItems.slice(0, 2).forEach((prRow) => {
        // Fixed schema for press-release-item, use destructuring
        const [prLinkCell, prTitleCell, prDateCell, prCategoryCell] = [...prRow.children];
        const prLink = prLinkCell.querySelector('a');

        const slideDiv = document.createElement('div');
        slideDiv.classList.add('slides'); // From ORIGINAL HTML
        const slideWrap = document.createElement('div');
        slideWrap.classList.add('wrap'); // From ORIGINAL HTML
        slideDiv.append(slideWrap);
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content'); // From ORIGINAL HTML
        slideWrap.append(contentDiv);
        const descDiv = document.createElement('div');
        descDiv.classList.add('desc'); // From ORIGINAL HTML
        contentDiv.append(descDiv);

        const p = document.createElement('p');
        const prAnchor = document.createElement('a');
        if (prLink) prAnchor.href = prLink.href;
        prAnchor.textContent = prTitleCell.textContent.trim();
        p.append(prAnchor);
        descDiv.append(p);

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date'); // From ORIGINAL HTML
        const emDate = document.createElement('em');
        emDate.textContent = prDateCell.textContent.trim();
        const emCategory = document.createElement('em');
        emCategory.textContent = prCategoryCell.textContent.trim();
        dateDiv.append(emDate, emCategory);
        descDiv.append(dateDiv);
        latestPressReleaseDiv.append(slideDiv);
        moveInstrumentation(prRow, prAnchor); // Move instrumentation
      });
    } else if (menuLabel === 'careers') {
      leftDiv.classList.add('career-left-div'); // From ORIGINAL HTML
      subNavWrap.classList.add('careers-div'); // From ORIGINAL HTML
    } else if (menuLabel === 'who we are') {
      subNavWrap.classList.add('about-us-sub-nav'); // From ORIGINAL HTML
    }
  });

  // Icon Navigation (Mobile)
  const iconNavMobile = document.createElement('div');
  iconNavMobile.classList.add('icon-nav', 'mobile-menus-icon'); // From ORIGINAL HTML
  const mobileUl = document.createElement('ul');
  iconNavMobile.append(mobileUl);

  iconLinkItems.forEach((row) => {
    // Fixed schema for icon-link-item, use destructuring
    const [iconLinkCell, iconLabelCell] = [...row.children];
    const li = document.createElement('li');
    // Determine class based on content, e.g., 'mail' or 'search'
    if (iconLabelCell.textContent.trim().toLowerCase() === 'contact us') {
      li.classList.add('mail'); // From ORIGINAL HTML
    } else {
      li.classList.add('generic-icon'); // Fallback or another class from original HTML
    }

    const iconLink = document.createElement('a');
    const foundIconLink = iconLinkCell.querySelector('a'); // Correctly read aem-content
    if (foundIconLink) {
      iconLink.href = foundIconLink.href;
    }
    iconLink.textContent = iconLabelCell.textContent.trim();
    moveInstrumentation(row, iconLink); // Move instrumentation
    li.append(iconLink);
    mobileUl.append(li);
  });

  // Add search icon for mobile
  const mobileSearchLi = document.createElement('li');
  mobileSearchLi.classList.add('search'); // From ORIGINAL HTML
  mobileSearchLi.setAttribute('data-once', 'search-toggle search-stop-propagation'); // From ORIGINAL HTML
  const mobileSearchLink = document.createElement('a');
  mobileSearchLink.href = '#';
  mobileSearchLink.setAttribute('data-once', 'search-stop-propagation'); // From ORIGINAL HTML
  mobileSearchLink.innerHTML = '<svg viewBox="0 0 21 21" fill="none" class="lens" data-once="search-stop-propagation"><path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path></svg><svg viewBox="0 0 50 50" class="close" data-once="search-stop-propagation"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" data-once="search-stop-propagation"></path></svg><span> Search</span>';
  mobileUl.append(mobileSearchLi);
  navUl.append(iconNavMobile);

  // Icon Navigation (Desktop)
  const iconNavDesktop = document.createElement('div');
  iconNavDesktop.classList.add('icon-nav', 'desktop-menus-icon'); // From ORIGINAL HTML
  const desktopUl = document.createElement('ul');
  iconNavDesktop.append(desktopUl);

  iconLinkItems.forEach((row) => {
    // Fixed schema for icon-link-item, use destructuring
    const [iconLinkCell, iconLabelCell] = [...row.children];
    const li = document.createElement('li');
    if (iconLabelCell.textContent.trim().toLowerCase() === 'contact us') {
      li.classList.add('mail'); // From ORIGINAL HTML
    } else {
      li.classList.add('generic-icon'); // Fallback or another class from original HTML
    }
    const iconLink = document.createElement('a');
    const foundIconLink = iconLinkCell.querySelector('a'); // Correctly read aem-content
    if (foundIconLink) {
      iconLink.href = foundIconLink.href;
    }
    // For desktop, the original HTML has an SVG for mail, not text
    if (iconLabelCell.textContent.trim().toLowerCase() === 'contact us') {
      iconLink.innerHTML = '<svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 48 38.4" style="enable-background:new 0 0 48 38.4;" xml:space="preserve" width="21" height="21"><path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z"></path></svg>';
    } else {
      iconLink.textContent = iconLabelCell.textContent.trim();
    }
    moveInstrumentation(row, iconLink); // Move instrumentation
    li.append(iconLink);
    desktopUl.append(li);
  });

  // Add search icon for desktop
  const desktopSearchLi = document.createElement('li');
  desktopSearchLi.classList.add('search'); // From ORIGINAL HTML
  desktopSearchLi.setAttribute('data-once', 'search-toggle search-stop-propagation'); // From ORIGINAL HTML
  const desktopSearchLink = document.createElement('a');
  desktopSearchLink.href = '#';
  desktopSearchLink.setAttribute('data-once', 'search-stop-propagation'); // From ORIGINAL HTML
  desktopSearchLink.innerHTML = '<svg viewBox="0 0 21 21" fill="none" class="lens" data-once="search-stop-propagation"><path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path></svg><svg viewBox="0 0 50 50" class="close" data-once="search-stop-propagation"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" data-once="search-stop-propagation"></path></svg>';
  desktopUl.append(desktopSearchLi);
  nav.append(iconNavDesktop);

  // Add search-screen-wrap for desktop search
  const desktopSearchScreenWrap = document.createElement('div');
  desktopSearchScreenWrap.classList.add('search-screen-wrap'); // From ORIGINAL HTML
  desktopSearchScreenWrap.setAttribute('data-once', 'search-stop-propagation'); // From ORIGINAL HTML
  desktopSearchLi.append(desktopSearchScreenWrap);
  // Add the form and other content inside desktopSearchScreenWrap as per ORIGINAL HTML
  desktopSearchScreenWrap.innerHTML = `
    <div class="wrap" data-once="search-stop-propagation">
      <form action="https://www.mahindra.com/search" method="get" id="search-block-form" accept-charset="UTF-8" data-drupal-form-fields="edit-keys" data-once="search-stop-propagation">
        <div class="search-wrap" data-once="search-stop-propagation">
          <div class="search-icon" data-once="search-stop-propagation">
            <svg viewBox="0 0 21 21" fill="none" data-once="search-stop-propagation">
              <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path>
          </svg>
        </div>
        <input type="text" class="input-text searchtext" required="" name="key" id="searchInput" autocomplete="off" data-once="search-stop-propagation">
        <button class="submit-button" data-once="search-stop-propagation">
          <div class="label" data-once="search-stop-propagation"> Submit </div>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" data-once="search-stop-propagation">
            <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black" data-once="search-stop-propagation"></path>
          </svg>
        </button>
      </div>
      <div class="searchResultBox" style="display: none;" data-once="search-stop-propagation">
        <div class="swiper scrollSwiper" data-once="search-stop-propagation">
          <div class="swiper-wrapper" data-once="search-stop-propagation">
            <div class="swiper-slide" data-once="search-stop-propagation">
            </div>
          </div>
        </div>
        <div class="swiper-scrollbar" data-once="search-stop-propagation"></div>
      </div>
    </form>
    <div class="search-suggestions-wrap" data-once="search-stop-propagation">
      <div class="label" data-once="search-stop-propagation">Popular Keywords:</div>
      <div class="tokens-wrap" data-once="search-stop-propagation">
        <ul data-once="search-stop-propagation">
          <li data-once="search-stop-propagation">Business</li>
          <li data-once="search-stop-propagation">FY 21</li>
          <li data-once="search-stop-propagation">Brands</li>
          <li data-once="search-stop-propagation">XUV700</li>
          <li data-once="search-stop-propagation">Global</li>
          <li data-once="search-stop-propagation">Nanhi Kali</li>
        </ul>
      </div>
    </div>
    <div class="search-suggestions-wrap" data-once="search-stop-propagation">
      <div class="label" data-once="search-stop-propagation">Recommended for you:</div>
      <div class="tokens-wrap" data-once="search-stop-propagation">
        <ul data-once="search-stop-propagation">
          <li data-once="search-stop-propagation">Annual Report 2021 - 2022</li>
          <li data-once="search-stop-propagation">Leadership Announcement</li>
          <li data-once="search-stop-propagation">Latest Press Release</li>
          <li data-once="search-stop-propagation">Brand Guidelines</li>
        </ul>
      </div>
    </div>
  </div>
  `;

  // 80th Year Logo
  const yearLogoDiv = document.createElement('div');
  yearLogoDiv.classList.add('logo', 'year-80-logo'); // From ORIGINAL HTML
  wrap.append(yearLogoDiv);

  const yearLogoLink = document.createElement('a');
  const foundYearLogoLink = yearLogoLinkRow.querySelector('a'); // Correctly read aem-content
  if (foundYearLogoLink) {
    yearLogoLink.href = foundYearLogoLink.href;
  }
  moveInstrumentation(yearLogoLinkRow, yearLogoLink); // Move instrumentation
  yearLogoDiv.append(yearLogoLink);

  const yearLogoPicture = yearLogoRow.querySelector('picture'); // Correctly read reference
  if (yearLogoPicture) {
    const img = yearLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    moveInstrumentation(yearLogoRow, optimizedPic.querySelector('img')); // Move instrumentation
    yearLogoLink.append(optimizedPic);
  }

  // Search functionality
  const searchToggle = (searchEl) => {
    searchEl.classList.toggle('active'); // From ORIGINAL HTML
    const searchScreenWrap = searchEl.querySelector('.search-screen-wrap');
    if (searchScreenWrap) {
      searchScreenWrap.classList.toggle('active'); // From ORIGINAL HTML
    }
    document.body.classList.toggle('no-scroll', searchEl.classList.contains('active')); // From ORIGINAL HTML
  };

  const searchElements = block.querySelectorAll('.search');
  searchElements.forEach((searchEl) => {
    searchEl.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchToggle(searchEl);
    });

    const searchScreenWrap = searchEl.querySelector('.search-screen-wrap');
    if (searchScreenWrap) {
      searchScreenWrap.addEventListener('click', (e) => {
        if (e.target === searchScreenWrap) {
          searchToggle(searchEl);
        }
      });
    }
  });

  // Hamburger menu toggle
  hamburgerDiv.addEventListener('click', () => {
    nav.classList.toggle('active'); // From ORIGINAL HTML
    hamburgerDiv.classList.toggle('active'); // From ORIGINAL HTML
    document.body.classList.toggle('no-scroll', nav.classList.contains('active')); // From ORIGINAL HTML
  });

  block.replaceChildren(header);
}
