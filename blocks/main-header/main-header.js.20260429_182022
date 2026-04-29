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
    mainLogoImageCell,
    mainLogoLinkCell,
    year80LogoImageCell,
    year80LogoLinkCell,
    ...itemRows
  ] = children;

  // Content detection for different item row types based on BlockJson models
  const navigationItems = itemRows.filter(
    (row) => row.children.length === 6 && row.querySelector('div:nth-child(3) ul'),
  );
  const megaMenuLeftContents = itemRows.filter(
    (row) => row.children.length === 3 && !row.querySelector('div:nth-child(3) ul') && !row.querySelector('div:nth-child(3) a'),
  );
  const megaMenuListGroups = itemRows.filter(
    (row) => row.children.length === 3 && row.querySelector('div:nth-child(3) a'),
  );
  const pressReleaseItems = itemRows.filter(
    (row) => row.children.length === 4,
  );
  const iconNavItems = itemRows.filter(
    (row) => row.children.length === 2,
  );

  const header = document.createElement('header');
  header.classList.add('main-header');
  moveInstrumentation(block, header);

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const mainLogoLink = document.createElement('a');
  if (mainLogoLinkCell) {
    const link = mainLogoLinkCell.querySelector('a');
    if (link) {
      mainLogoLink.href = link.href;
      moveInstrumentation(mainLogoLinkCell, mainLogoLink);
    }
  }
  if (mainLogoImageCell) {
    const picture = mainLogoImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mainLogoLink.append(optimizedPic);
    }
  }
  logoDiv.append(mainLogoLink);
  wrap.append(logoDiv);

  // Hamburger
  const hamburgerDiv = document.createElement('div');
hamburgerDiv.classList.add('hamburger');
  const hamburgerUl = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    hamburgerUl.append(document.createElement('li'));
  }
  hamburgerDiv.append(hamburgerUl);
  wrap.append(hamburgerDiv);

  // Main Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);
  wrap.append(nav);

  navigationItems.forEach((row) => {
    // Fixed schema for navigation-item: label, link, hierarchy-tree, megaMenuLeftContents, megaMenuListGroups, pressReleaseItems
    const [labelCell, linkCell, hierarchyCell, megaMenuLeftContentsCell, megaMenuListGroupsCell, pressReleaseItemsCell] = [...row.children];
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
    moveInstrumentation(labelCell, anchor);
    moveInstrumentation(linkCell, anchor);

    li.append(anchor);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu');
    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container');
    megaMenu.append(megaMenuWrap);
    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div');
    megaMenuWrap.append(centerDiv);

    // Hierarchy Tree (richtext)
    const hierarchyTempDiv = document.createElement('div');
    hierarchyTempDiv.innerHTML = hierarchyCell.innerHTML;
    const hierarchyRoot = hierarchyTempDiv.querySelector('ul');

    if (hierarchyRoot) {
      const span = document.createElement('span');
      span.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
      li.append(span);

      const subNavWrap = document.createElement('div');
      subNavWrap.classList.add('sub-nav-wrap');
      moveInstrumentation(hierarchyCell, subNavWrap); // Move instrumentation from original richtext cell
      subNavWrap.append(hierarchyRoot);
      centerDiv.append(subNavWrap);
      transformNestedLists(hierarchyRoot);
    }

    if (megaMenuLeftContentsCell.textContent.trim() || megaMenuListGroupsCell.textContent.trim() || pressReleaseItemsCell.textContent.trim()) {
      const leftDiv = document.createElement('div');
      leftDiv.classList.add('left-div');
      centerDiv.prepend(leftDiv);

      megaMenuLeftContents.forEach((leftRow) => {
        // Fixed schema for mega-menu-left-content: heading, desc, subdesc
        const [headingCell, descCell, subdescCell] = [...leftRow.children];
        const heading = document.createElement('h4');
        heading.classList.add('left-div-heading');
        heading.textContent = headingCell.textContent.trim();
        moveInstrumentation(headingCell, heading);
        leftDiv.append(heading);

        const desc = document.createElement('p');
        desc.classList.add('left-div-desc');
        desc.textContent = descCell.textContent.trim();
        moveInstrumentation(descCell, desc);
        leftDiv.append(desc);

        const subdesc = document.createElement('p');
        subdesc.classList.add('left-div-subdesc');
        subdesc.textContent = subdescCell.textContent.trim();
        moveInstrumentation(subdescCell, subdesc);
        leftDiv.append(subdesc);
      });

      if (megaMenuListGroups.length > 0) {
        const listUl = document.createElement('ul');
        megaMenuListGroups.forEach((listRow) => {
          // Fixed schema for mega-menu-list-group: listText, listSpanText, link
          const [listTextCell, listSpanTextCell, listLinkCell] = [...listRow.children];
          const listLi = document.createElement('li');
          listLi.classList.add('list-text-red');
          const listLink = document.createElement('a');
          const foundListLink = listLinkCell.querySelector('a');
          if (foundListLink) {
            listLink.href = foundListLink.href;
          }
          listLink.textContent = listTextCell.textContent.trim();
          moveInstrumentation(listTextCell, listLink);
          moveInstrumentation(listLinkCell, listLink);
          listLi.append(listLink);
          if (listSpanTextCell.textContent.trim()) {
            const span = document.createElement('span');
            span.textContent = listSpanTextCell.textContent.trim();
            moveInstrumentation(listSpanTextCell, span);
            listLi.append(span);
          }
          listUl.append(listLi);
        });
        leftDiv.append(listUl);
      }

      if (pressReleaseItems.length > 0) {
        const latestPressReleaseDiv = document.createElement('div');
        latestPressReleaseDiv.classList.add('latest-two-press-release');
        pressReleaseItems.forEach((pressRow) => {
          // Fixed schema for press-release-item: pressReleaseLink, pressReleaseTitle, pressReleaseDate, pressReleaseCategory
          const [pressLinkCell, pressTitleCell, pressDateCell, pressCategoryCell] = [...pressRow.children];
          const slidesDiv = document.createElement('div');
          slidesDiv.classList.add('slides');
          const slideWrap = document.createElement('div');
          slideWrap.classList.add('wrap');
          slidesDiv.append(slideWrap);
          const contentDiv = document.createElement('div');
          contentDiv.classList.add('content');
          slideWrap.append(contentDiv);
          const descDiv = document.createElement('div');
          descDiv.classList.add('desc');
          contentDiv.append(descDiv);

          const p = document.createElement('p');
          const pressAnchor = document.createElement('a');
          const foundPressLink = pressLinkCell.querySelector('a');
          if (foundPressLink) {
            pressAnchor.href = foundPressLink.href;
          }
          pressAnchor.textContent = pressTitleCell.textContent.trim();
          moveInstrumentation(pressLinkCell, pressAnchor);
          moveInstrumentation(pressTitleCell, pressAnchor);
          p.append(pressAnchor);
          descDiv.append(p);

          const dateDiv = document.createElement('div');
          dateDiv.classList.add('date');
          const emDate = document.createElement('em');
          emDate.textContent = pressDateCell.textContent.trim();
          moveInstrumentation(pressDateCell, emDate);
          dateDiv.append(emDate);
          const emCategory = document.createElement('em');
          emCategory.textContent = pressCategoryCell.textContent.trim();
          moveInstrumentation(pressCategoryCell, emCategory);
          dateDiv.append(emCategory);
          descDiv.append(dateDiv);
          latestPressReleaseDiv.append(slidesDiv);
        });
        leftDiv.append(latestPressReleaseDiv);
      }
    }
    li.append(megaMenu);
    navUl.append(li);
  });

  // Icon Navigation (Mobile)
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconUl = document.createElement('ul');
  mobileIconNav.append(mobileIconUl);
  navUl.append(mobileIconNav);

  iconNavItems.forEach((row) => {
    // Fixed schema for icon-nav-item: label, link
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    // Determine class based on content, e.g., 'mail' for contact us
    if (labelCell.textContent.trim().toLowerCase().includes('contact')) {
      li.classList.add('mail');
    } else {
      // Default or other specific classes if needed
      li.classList.add('mail'); // Assuming 'mail' as a default if not search
    }

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(labelCell, anchor);
    moveInstrumentation(linkCell, anchor);
    li.append(anchor);
    mobileIconUl.append(li);
  });

  // Search icon (mobile)
  const mobileSearchLi = document.createElement('li');
  mobileSearchLi.classList.add('search');
  mobileSearchLi.innerHTML = `
    <a href="#">
      <svg viewBox="0 0 21 21" fill="none" class="lens">
        <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
      </svg>
      <svg viewBox="0 0 50 50" class="close">
        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
      </svg>
      <span> Search</span>
    </a>
    <div class="search-screen-wrap">
      <div class="wrap">
        <form action="https://www.mahindra.com/search" method="get" id="search-block-form" accept-charset="UTF-8">
          <div class="search-wrap">
            <div class="search-icon">
              <svg viewBox="0 0 21 21" fill="none">
                <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
              </svg>
            </div>
            <input type="text" class="input-text searchtext" required="" name="key" id="searchInput" autocomplete="off">
            <button class="submit-button">
              <div class="label"> Submit </div>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path>
              </svg>
            </button>
          </div>
          <div class="searchResultBox" style="display: none;">
            <div class="swiper scrollSwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                </div>
              </div>
            </div>
            <div class="swiper-scrollbar"></div>
          </div>
        </form>
        <div class="search-suggestions-wrap">
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
        </div>
        <div class="search-suggestions-wrap">
          <div class="label">Recommended for you:</div>
          <div class="tokens-wrap">
            <ul>
              <li>Annual Report 2021 - 2022</li>
              <li>Leadership Announcement</li>
              <li>Latest Press Release</li>
              <li>Brand Guidelines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  mobileIconUl.append(mobileSearchLi);

  // Icon Navigation (Desktop)
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconUl = document.createElement('ul');
  desktopIconNav.append(desktopIconUl);
  nav.append(desktopIconNav);

  iconNavItems.forEach((row) => {
    // Fixed schema for icon-nav-item: label, link
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    // Determine class based on content, e.g., 'mail' for contact us
    if (labelCell.textContent.trim().toLowerCase().includes('contact')) {
      li.classList.add('mail');
    } else {
      // Default or other specific classes if needed
      li.classList.add('mail'); // Assuming 'mail' as a default if not search
    }

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    // The label text is not used for desktop icons in the original HTML, so we don't set textContent.
    // Instead, we hardcode the SVG for the mail icon as per original HTML.
    anchor.innerHTML = `
      <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 48 38.4" style="enable-background:new 0 0 48 38.4;" xml:space="preserve" width="21" height="21" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1
                  C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7
                  L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z"></path>
      </svg>
    `;
    moveInstrumentation(labelCell, anchor);
    moveInstrumentation(linkCell, anchor);
    li.append(anchor);
    desktopIconUl.append(li);
  });

  // Search icon (desktop)
  const desktopSearchLi = document.createElement('li');
  desktopSearchLi.classList.add('search');
  desktopSearchLi.innerHTML = `
    <a href="#">
      <svg viewBox="0 0 21 21" fill="none" class="lens">
        <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
      </svg>
      <svg viewBox="0 0 50 50" class="close">
        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
      </svg>
    </a>
    <div class="search-screen-wrap">
      <div class="wrap">
        <form action="https://www.mahindra.com/search" method="get" id="search-block-form" accept-charset="UTF-8">
          <div class="search-wrap">
            <div class="search-icon">
              <svg viewBox="0 0 21 21" fill="none">
                <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
              </svg>
            </div>
            <input type="text" class="input-text searchtext" required="" name="key" id="searchInput" autocomplete="off">
            <button class="submit-button">
              <div class="label"> Submit </div>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path>
              </svg>
            </button>
          </div>
          <div class="searchResultBox" style="display: none;">
            <div class="swiper scrollSwiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                </div>
              </div>
            </div>
            <div class="swiper-scrollbar"></div>
          </div>
        </form>
        <div class="search-suggestions-wrap">
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
        </div>
        <div class="search-suggestions-wrap">
          <div class="label">Recommended for you:</div>
          <div class="tokens-wrap">
            <ul>
              <li>Annual Report 2021 - 2022</li>
              <li>Leadership Announcement</li>
              <li>Latest Press Release</li>
              <li>Brand Guidelines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  desktopIconUl.append(desktopSearchLi);

  // Year 80 Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const year80LogoLink = document.createElement('a');
  if (year80LogoLinkCell) {
    const link = year80LogoLinkCell.querySelector('a');
    if (link) {
      year80LogoLink.href = link.href;
      moveInstrumentation(year80LogoLinkCell, year80LogoLink);
    }
  }
  if (year80LogoImageCell) {
    const picture = year80LogoImageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      year80LogoLink.append(optimizedPic);
    }
  }
  year80LogoDiv.append(year80LogoLink);
  wrap.append(year80LogoDiv);

  block.replaceChildren(header);

  // Add event listeners for hamburger and search toggles
  const hamburger = header.querySelector('.hamburger');
  const mainNav = header.querySelector('.main-nav');
  const mobileSearch = header.querySelector('.icon-nav.mobile-menus-icon .search');
  const desktopSearch = header.querySelector('.icon-nav.desktop-menus-icon .search');

  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    hamburger.classList.toggle('close');
  });

  const toggleSearchScreen = (searchElement) => {
    const searchScreenWrap = searchElement.querySelector('.search-screen-wrap');
    searchScreenWrap.classList.toggle('active');
    searchElement.classList.toggle('active');
  };

  if (mobileSearch) {
    mobileSearch.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      toggleSearchScreen(mobileSearch);
    });
  }

  if (desktopSearch) {
    desktopSearch.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      toggleSearchScreen(desktopSearch);
    });
  }

  // Handle nested dropdowns within mega menu
  header.querySelectorAll('.mega-menu .has-sub-child, .mega-menu .has-inner-sub-child').forEach((subChild) => {
    const trigger = subChild.previousElementSibling;
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        subChild.classList.toggle('active');
        trigger.parentElement.classList.toggle('active');
      });
    }
  });

  // Swiper initialization for search results
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  const swiperContainers = header.querySelectorAll('.swiper.scrollSwiper');
  swiperContainers.forEach((swiperEl) => {
    // eslint-disable-next-line no-undef
    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      loop: false, // Assuming loop is false based on typical search result behavior
      // Add other Swiper options as needed from original HTML/design
    });
  });
}
