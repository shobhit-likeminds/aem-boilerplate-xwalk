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
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [
    logoRow,
    logoLinkRow,
    yearLogoRow,
    yearLogoLinkRow,
    ...itemRows
  ] = children;

  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid');
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
  const logoLink = document.createElement('a');
  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) {
    logoLink.href = logoAnchor.href;
  }
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoLinkRow, logoLink);
  logoDiv.append(logoLink);
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

  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  wrap.append(nav);

  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);

  const navigationItems = itemRows.filter((row) => row.children.length === 3);
  const megaMenuItems = itemRows.filter((row) => row.children.length === 4 && !row.querySelector('a'));
  const pressReleaseItems = itemRows.filter((row) => row.children.length === 4 && row.querySelector('a'));

  navigationItems.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');

    const foundLink = linkCell.querySelector('a');
    let rootEl;
    if (foundLink) {
      rootEl = document.createElement('a');
      rootEl.href = foundLink.href;
    } else {
      rootEl = document.createElement('span');
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl);
    li.appendChild(rootEl);

    const svgSpan = document.createElement('span');
    svgSpan.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
    li.append(svgSpan);

    const hierarchyRoot = hierarchyCell.querySelector('ul');
    if (hierarchyRoot) {
      const megaMenu = document.createElement('div');
      megaMenu.classList.add('mega-menu');
      const megaMenuWrap = document.createElement('div');
      megaMenuWrap.classList.add('wrap', 'container');
      const centerDiv = document.createElement('div');
      centerDiv.classList.add('center-div');

      const subNavWrap = document.createElement('div');
      subNavWrap.classList.add('sub-nav-wrap');
      subNavWrap.appendChild(hierarchyRoot);
      transformNestedLists(hierarchyRoot);

      centerDiv.append(subNavWrap);
      megaMenuWrap.append(centerDiv);
      megaMenu.append(megaMenuWrap);
      li.append(megaMenu);

      rootEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active');
        megaMenu.classList.toggle('active');
      });
    }
    navUl.append(li);
  });

  // Mega Menu Items
  megaMenuItems.forEach((row) => {
    const [headingCell, descriptionCell, subDescriptionCell, hierarchyCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');

    const headingAnchor = headingCell.querySelector('a');
    let rootEl;
    if (headingAnchor) {
      rootEl = document.createElement('a');
      rootEl.href = headingAnchor.href;
    } else {
      rootEl = document.createElement('span');
    }
    rootEl.textContent = headingCell.textContent.trim();
    moveInstrumentation(row, rootEl);
    li.appendChild(rootEl);

    const svgSpan = document.createElement('span');
    svgSpan.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
    li.append(svgSpan);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu');
    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container');
    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div');
    const leftDivHeading = document.createElement('h4');
    leftDivHeading.classList.add('left-div-heading');
    leftDivHeading.textContent = headingCell.textContent.trim();
    leftDiv.append(leftDivHeading);

    if (descriptionCell.innerHTML) {
      const desc = document.createElement('p');
      desc.classList.add('left-div-desc');
      desc.innerHTML = descriptionCell.innerHTML;
      leftDiv.append(desc);
    }
    if (subDescriptionCell.innerHTML) {
      const subDesc = document.createElement('p');
      subDesc.classList.add('left-div-subdesc');
      subDesc.innerHTML = subDescriptionCell.innerHTML;
      leftDiv.append(subDesc);
    }
    centerDiv.append(leftDiv);

    const hierarchyRoot = hierarchyCell.querySelector('ul');
    if (hierarchyRoot) {
      const subNavWrap = document.createElement('div');
      subNavWrap.classList.add('sub-nav-wrap');
      subNavWrap.appendChild(hierarchyRoot);
      transformNestedLists(hierarchyRoot);
      centerDiv.append(subNavWrap);
    }

    megaMenuWrap.append(centerDiv);
    megaMenu.append(megaMenuWrap);
    li.append(megaMenu);

    rootEl.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      li.classList.toggle('active');
      megaMenu.classList.toggle('active');
    });
    navUl.append(li);
  });

  // Latest Press Releases
  if (pressReleaseItems.length > 0) {
    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');

    const rootEl = document.createElement('a');
    rootEl.href = '#';
    rootEl.textContent = 'Newsroom'; // Hardcoded as per original HTML structure
    li.appendChild(rootEl);

    const svgSpan = document.createElement('span');
    svgSpan.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
    li.append(svgSpan);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu');
    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container');
    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div', 'newsroom-left-div');
    const leftDivHeading = document.createElement('h4');
    leftDivHeading.classList.add('left-div-heading');
    leftDivHeading.textContent = 'Newsroom';
    leftDiv.append(leftDivHeading);

    const latestPressReleaseDiv = document.createElement('div');
    latestPressReleaseDiv.classList.add('latest-two-press-release');
    pressReleaseItems.forEach((row) => {
      const [pressReleaseLinkCell, pressReleaseTitleCell, pressReleaseDateCell, pressReleaseCategoryCell] = [...row.children];

      const slidesDiv = document.createElement('div');
      slidesDiv.classList.add('slides');
      const slidesWrap = document.createElement('div');
      slidesWrap.classList.add('wrap');
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('content');
      const descDiv = document.createElement('div');
      descDiv.classList.add('desc');

      const p = document.createElement('p');
      const link = document.createElement('a');
      const foundLink = pressReleaseLinkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
      }
      link.textContent = pressReleaseTitleCell.textContent.trim();
      p.append(link);
      descDiv.append(p);

      const dateDiv = document.createElement('div');
      dateDiv.classList.add('date');
      const emDate = document.createElement('em');
      emDate.textContent = pressReleaseDateCell.textContent.trim();
      const emCategory = document.createElement('em');
      emCategory.textContent = pressReleaseCategoryCell.textContent.trim();
      dateDiv.append(emDate, emCategory);
      descDiv.append(dateDiv);

      contentDiv.append(descDiv);
      slidesWrap.append(contentDiv);
      slidesDiv.append(slidesWrap);
      latestPressReleaseDiv.append(slidesDiv);
      moveInstrumentation(row, slidesDiv);
    });
    leftDiv.append(latestPressReleaseDiv);
    centerDiv.append(leftDiv);

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    const ul1 = document.createElement('ul');
    const li1 = document.createElement('li');
    const a1 = document.createElement('a');
    a1.href = 'https://www.mahindra.com/newsroom/press-release';
    a1.textContent = 'Press Releases';
    li1.append(a1);
    const li2 = document.createElement('li');
    const a2 = document.createElement('a');
    a2.href = 'https://www.mahindra.com/newsroom/corporate-doc';
    a2.textContent = 'Media Resources';
    li2.append(a2);
    ul1.append(li1, li2);

    const ul2 = document.createElement('ul');
    const li3 = document.createElement('li');
    const a3 = document.createElement('a');
    a3.href = 'https://www.mahindra.com/newsroom#in-the-news';
    a3.textContent = 'In The News';
    li3.append(a3);
    ul2.append(li3);

    subNavWrap.append(ul1, ul2);
    centerDiv.append(subNavWrap);

    megaMenuWrap.append(centerDiv);
    megaMenu.append(megaMenuWrap);
    li.append(megaMenu);

    rootEl.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      li.classList.toggle('active');
      megaMenu.classList.toggle('active');
    });
    navUl.append(li);
  }

  // Icon Nav (Mobile)
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconUl = document.createElement('ul');
  const mobileMailLi = document.createElement('li');
  mobileMailLi.classList.add('mail');
  const mobileMailLink = document.createElement('a');
  mobileMailLink.href = 'https://www.mahindra.com/contact-us';
  mobileMailLink.textContent = 'Contact Us';
  mobileMailLi.append(mobileMailLink);
  mobileIconUl.append(mobileMailLi);

  const mobileSearchLi = document.createElement('li');
  mobileSearchLi.classList.add('search');
  const mobileSearchLink = document.createElement('a');
  mobileSearchLink.href = '#';
  mobileSearchLink.innerHTML = `
    <svg viewBox="0 0 21 21" fill="none" class="lens">
      <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
    </svg>
    <svg viewBox="0 0 50 50" class="close">
      <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
    </svg>
    <span> Search</span>
  `;
  mobileSearchLi.append(mobileSearchLink);
  mobileIconUl.append(mobileSearchLi);
  mobileIconNav.append(mobileIconUl);
  navUl.append(mobileIconNav);

  // Search screen wrap for mobile
  const mobileSearchScreenWrap = document.createElement('div');
  mobileSearchScreenWrap.classList.add('search-screen-wrap');
  const mobileSearchWrap = document.createElement('div');
  mobileSearchWrap.classList.add('wrap');
  const mobileSearchForm = document.createElement('form');
  mobileSearchForm.action = 'https://www.mahindra.com/search';
  mobileSearchForm.method = 'get';
  mobileSearchForm.id = 'search-block-form';
  mobileSearchForm.setAttribute('accept-charset', 'UTF-8');
  mobileSearchForm.setAttribute('data-drupal-form-fields', 'edit-keys');
  const mobileSearchInputWrap = document.createElement('div');
  mobileSearchInputWrap.classList.add('search-wrap');
  const mobileSearchIcon = document.createElement('div');
  mobileSearchIcon.classList.add('search-icon');
  mobileSearchIcon.innerHTML = `
    <svg viewBox="0 0 21 21" fill="none">
      <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
    </svg>
  `;
  const mobileSearchInput = document.createElement('input');
  mobileSearchInput.type = 'text';
  mobileSearchInput.classList.add('input-text', 'searchtext');
  mobileSearchInput.required = true;
  mobileSearchInput.name = 'key';
  mobileSearchInput.id = 'searchInputMobile';
  mobileSearchInput.autocomplete = 'off';
  const mobileSearchButton = document.createElement('button');
  mobileSearchButton.classList.add('submit-button');
  mobileSearchButton.innerHTML = `
    <div class="label"> Submit </div>
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path>
    </svg>
  `;
  mobileSearchInputWrap.append(mobileSearchIcon, mobileSearchInput, mobileSearchButton);
  mobileSearchForm.append(mobileSearchInputWrap);
  mobileSearchWrap.append(mobileSearchForm);
  mobileSearchScreenWrap.append(mobileSearchWrap);

  const mobilePopularKeywords = document.createElement('div');
  mobilePopularKeywords.classList.add('search-suggestions-wrap');
  mobilePopularKeywords.innerHTML = `
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
  `;
  mobileSearchWrap.append(mobilePopularKeywords);

  const mobileRecommendedLinks = document.createElement('div');
  mobileRecommendedLinks.classList.add('search-suggestions-wrap');
  mobileRecommendedLinks.innerHTML = `
    <div class="label">Recommended for you:</div>
    <div class="tokens-wrap">
      <ul>
        <li>Annual Report 2021 - 2022</li>
        <li>Leadership Announcement</li>
        <li>Latest Press Release</li>
        <li>Brand Guidelines</li>
      </ul>
    </div>
  `;
  mobileSearchWrap.append(mobileRecommendedLinks);
  mobileSearchLi.append(mobileSearchScreenWrap);

  // Icon Nav (Desktop)
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconUl = document.createElement('ul');
  const desktopMailLi = document.createElement('li');
  desktopMailLi.classList.add('mail');
  const desktopMailLink = document.createElement('a');
  desktopMailLink.href = 'https://www.mahindra.com/contact-us';
  desktopMailLink.innerHTML = `
    <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 48 38.4" style="enable-background:new 0 0 48 38.4;" xml:space="preserve" width="21" height="21" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1
                C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7
                L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z"></path>
    </svg>
  `;
  desktopMailLi.append(desktopMailLink);
  desktopIconUl.append(desktopMailLi);

  const desktopSearchLi = document.createElement('li');
  desktopSearchLi.classList.add('search');
  const desktopSearchLink = document.createElement('a');
  desktopSearchLink.href = '#';
  desktopSearchLink.innerHTML = `
    <svg viewBox="0 0 21 21" fill="none" class="lens">
      <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
    </svg>
    <svg viewBox="0 0 50 50" class="close">
      <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
    </svg>
  `;
  desktopSearchLi.append(desktopSearchLink);
  desktopIconUl.append(desktopSearchLi);
  desktopIconNav.append(desktopIconUl);
  nav.append(desktopIconNav);

  // Search screen wrap for desktop
  const desktopSearchScreenWrap = document.createElement('div');
  desktopSearchScreenWrap.classList.add('search-screen-wrap');
  const desktopSearchWrap = document.createElement('div');
  desktopSearchWrap.classList.add('wrap');
  const desktopSearchForm = document.createElement('form');
  desktopSearchForm.action = 'https://www.mahindra.com/search';
  desktopSearchForm.method = 'get';
  desktopSearchForm.id = 'search-block-form';
  desktopSearchForm.setAttribute('accept-charset', 'UTF-8');
  desktopSearchForm.setAttribute('data-drupal-form-fields', 'edit-keys');
  const desktopSearchInputWrap = document.createElement('div');
  desktopSearchInputWrap.classList.add('search-wrap');
  const desktopSearchIcon = document.createElement('div');
  desktopSearchIcon.classList.add('search-icon');
  desktopSearchIcon.innerHTML = `
    <svg viewBox="0 0 21 21" fill="none">
      <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path>
    </svg>
  `;
  const desktopSearchInput = document.createElement('input');
  desktopSearchInput.type = 'text';
  desktopSearchInput.classList.add('input-text', 'searchtext');
  desktopSearchInput.required = true;
  desktopSearchInput.name = 'key';
  desktopSearchInput.id = 'searchInputDesktop';
  desktopSearchInput.autocomplete = 'off';
  const desktopSearchButton = document.createElement('button');
  desktopSearchButton.classList.add('submit-button');
  desktopSearchButton.innerHTML = `
    <div class="label"> Submit </div>
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
      <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path>
    </svg>
  `;
  desktopSearchInputWrap.append(desktopSearchIcon, desktopSearchInput, desktopSearchButton);
  desktopSearchForm.append(desktopSearchInputWrap);
  desktopSearchWrap.append(desktopSearchForm);
  desktopSearchScreenWrap.append(desktopSearchWrap);

  const desktopPopularKeywords = document.createElement('div');
  desktopPopularKeywords.classList.add('search-suggestions-wrap');
  desktopPopularKeywords.innerHTML = `
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
  `;
  desktopSearchWrap.append(desktopPopularKeywords);

  const desktopRecommendedLinks = document.createElement('div');
  desktopRecommendedLinks.classList.add('search-suggestions-wrap');
  desktopRecommendedLinks.innerHTML = `
    <div class="label">Recommended for you:</div>
    <div class="tokens-wrap">
      <ul>
        <li>Annual Report 2021 - 2022</li>
        <li>Leadership Announcement</li>
        <li>Latest Press Release</li>
        <li>Brand Guidelines</li>
      </ul>
    </div>
  `;
  desktopSearchWrap.append(desktopRecommendedLinks);
  desktopSearchLi.append(desktopSearchScreenWrap);

  // 80th Year Logo
  const yearLogoDiv = document.createElement('div');
  yearLogoDiv.classList.add('logo', 'year-80-logo');
  const yearLogoLink = document.createElement('a');
  const yearLogoAnchor = yearLogoLinkRow.querySelector('a');
  if (yearLogoAnchor) {
    yearLogoLink.href = yearLogoAnchor.href;
  }
  const yearLogoPicture = yearLogoRow.querySelector('picture');
  if (yearLogoPicture) {
    const img = yearLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1', 'years-80');
    moveInstrumentation(yearLogoRow, optimizedPic.querySelector('img'));
    yearLogoLink.append(optimizedPic);
  }
  moveInstrumentation(yearLogoLinkRow, yearLogoLink);
  yearLogoDiv.append(yearLogoLink);
  wrap.append(yearLogoDiv);

  block.replaceChildren(header);

  // Toggle mobile navigation
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Search functionality (simplified for EDS)
  const searchToggle = (searchEl) => {
    const searchScreenWrap = searchEl.querySelector('.search-screen-wrap');
    searchEl.classList.toggle('active');
    searchScreenWrap.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  };

  mobileSearchLi.addEventListener('click', (e) => {
    e.preventDefault();
    searchToggle(mobileSearchLi);
  });

  desktopSearchLi.addEventListener('click', (e) => {
    e.preventDefault();
    searchToggle(desktopSearchLi);
  });
}
