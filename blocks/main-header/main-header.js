import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Handle label-only nodes (no anchor)
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
    primaryLogoRow,
    primaryLogoLinkRow,
    anniversaryLogoRow,
    anniversaryLogoLinkRow,
    ...itemRows
  ] = children;

  const navigationItems = itemRows.filter((row) => row.children.length === 10);
  const contactLinkItems = itemRows.filter((row) => row.children.length === 2);
  const pressReleaseItems = itemRows.filter((row) => row.children.length === 4);

  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid'); // 'nav-up' is a state class, not initial

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  // Primary Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const primaryLogoAnchor = document.createElement('a');
  const primaryLogoLink = primaryLogoLinkRow.querySelector('a');
  if (primaryLogoLink) primaryLogoAnchor.href = primaryLogoLink.href;
  moveInstrumentation(primaryLogoLinkRow, primaryLogoAnchor);

  const primaryLogoPicture = primaryLogoRow.querySelector('picture');
  if (primaryLogoPicture) {
    const primaryLogoImg = primaryLogoPicture.querySelector('img');
    if (primaryLogoImg) {
      const optimizedPic = createOptimizedPicture(
        primaryLogoImg.src,
        primaryLogoImg.alt,
        false,
        [{ width: '200' }],
      );
      moveInstrumentation(primaryLogoRow, optimizedPic.querySelector('img'));
      primaryLogoAnchor.append(optimizedPic);
    }
  }
  primaryLogoAnchor.classList.add('hiddenlogo1');
  logoDiv.append(primaryLogoAnchor);
  wrap.append(logoDiv);

  // Hamburger menu
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  const hamburgerUl = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    hamburgerUl.append(document.createElement('li'));
  }
  hamburger.append(hamburgerUl);
  wrap.append(hamburger);

  // Main Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);
  wrap.append(nav);

  navigationItems.forEach((row) => {
    const [
      labelCell,
      linkCell,
      hierarchyCell,
      leftHeadingCell,
      leftDescCell,
      leftSubdescCell,
      leftFactsCell,
      leftIrStatsCell,
      careerLeftDescCell,
      careerLeftSubdescCell,
    ] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');

    const linkAnchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) linkAnchor.href = foundLink.href;
    linkAnchor.textContent = labelCell.textContent.trim();
    linkAnchor.setAttribute('itemprop', 'url');
    moveInstrumentation(linkCell, linkAnchor);
    li.append(linkAnchor);

    const svgSpan = document.createElement('span');
    svgSpan.innerHTML = `<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>`;
    li.append(svgSpan);

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

    const leftHeading = document.createElement('h4');
    leftHeading.classList.add('left-div-heading');
    const leftHeadingAnchor = document.createElement('a');
    leftHeadingAnchor.textContent = leftHeadingCell.textContent.trim();
    moveInstrumentation(leftHeadingCell, leftHeadingAnchor);
    leftHeading.append(leftHeadingAnchor);
    leftDiv.append(leftHeading);

    if (leftDescCell.textContent.trim()) {
      const leftDesc = document.createElement('p');
      leftDesc.classList.add('left-div-desc');
      leftDesc.textContent = leftDescCell.textContent.trim();
      moveInstrumentation(leftDescCell, leftDesc);
      leftDiv.append(leftDesc);
    }

    if (leftSubdescCell.textContent.trim()) {
      const leftSubdesc = document.createElement('p');
      leftSubdesc.classList.add('left-div-subdesc');
      leftSubdesc.textContent = leftSubdescCell.textContent.trim();
      moveInstrumentation(leftSubdescCell, leftSubdesc);
      leftDiv.append(leftSubdesc);
    }

    if (leftFactsCell.innerHTML.trim()) {
      leftDiv.classList.add('what-we-do');
      const factsUl = document.createElement('ul');
      factsUl.innerHTML = leftFactsCell.innerHTML;
      factsUl.querySelectorAll('li').forEach((factLi) => {
        factLi.classList.add('list-text-red');
      });
      moveInstrumentation(leftFactsCell, factsUl);
      leftDiv.append(factsUl);
    }

    if (leftIrStatsCell.innerHTML.trim()) {
      leftDiv.classList.add('ir-left-div');
      const irStatsUl = document.createElement('ul');
      irStatsUl.innerHTML = leftIrStatsCell.innerHTML;
      irStatsUl.querySelectorAll('li').forEach((statLi) => {
        statLi.classList.add('list-text-red');
      });
      moveInstrumentation(leftIrStatsCell, irStatsUl);
      leftDiv.append(irStatsUl);
    }

    if (careerLeftDescCell.innerHTML.trim()) {
      leftDiv.classList.add('career-left-div');
      const careerDesc = document.createElement('p');
      careerDesc.classList.add('left-div-desc');
      careerDesc.innerHTML = careerLeftDescCell.innerHTML;
      moveInstrumentation(careerLeftDescCell, careerDesc);
      leftDiv.append(careerDesc);
    }

    if (careerLeftSubdescCell.textContent.trim()) {
      const careerSubdesc = document.createElement('p');
      careerSubdesc.classList.add('left-div-subdesc');
      careerSubdesc.textContent = careerLeftSubdescCell.textContent.trim();
      moveInstrumentation(careerLeftSubdescCell, careerSubdesc);
      leftDiv.append(careerSubdesc);
    }

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    centerDiv.append(subNavWrap);

    const hierarchyRoot = hierarchyCell.querySelector('ul');
    if (hierarchyRoot) {
      subNavWrap.append(hierarchyRoot);
      transformNestedLists(hierarchyRoot);
      moveInstrumentation(hierarchyCell, hierarchyRoot);
    }

    li.append(megaMenu);
    navUl.append(li);
    moveInstrumentation(row, li);
  });

  // Contact and Search Icons (Mobile)
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconUl = document.createElement('ul');
  mobileIconNav.append(mobileIconUl);

  const mailLiMobile = document.createElement('li');
  mailLiMobile.classList.add('mail');
  const mailAnchorMobile = document.createElement('a');
  const contactUsLink = contactLinkItems.find((row) => row.children[0].textContent.trim() === 'Contact Us');
  if (contactUsLink) {
    mailAnchorMobile.href = contactUsLink.querySelector('a').href;
    moveInstrumentation(contactUsLink, mailAnchorMobile);
  } else {
    mailAnchorMobile.href = '#'; // Fallback if no specific contact link
  }
  mailAnchorMobile.textContent = 'Contact Us';
  mobileIconUl.append(mailLiMobile);
  mailLiMobile.append(mailAnchorMobile);


  const searchLiMobile = document.createElement('li');
  searchLiMobile.classList.add('search');
  const searchAnchorMobile = document.createElement('a');
  searchAnchorMobile.href = '#';
  searchAnchorMobile.innerHTML = `<svg viewBox="0 0 21 21" fill="none" class="lens"><path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path></svg><svg viewBox="0 0 50 50" class="close"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path></svg><span> Search</span>`;
  searchLiMobile.append(searchAnchorMobile);
  mobileIconUl.append(searchLiMobile);
  navUl.append(mobileIconNav);

  // Contact and Search Icons (Desktop)
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconUl = document.createElement('ul');
  desktopIconNav.append(desktopIconUl);

  const mailLiDesktop = document.createElement('li');
  mailLiDesktop.classList.add('mail');
  const mailAnchorDesktop = document.createElement('a');
  if (contactUsLink) {
    mailAnchorDesktop.href = contactUsLink.querySelector('a').href;
    // Instrumentation already moved for mobile link, no need to move again for desktop
  } else {
    mailAnchorDesktop.href = '#'; // Fallback
  }
  mailAnchorDesktop.innerHTML = `<svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 48 38.4" style="enable-background:new 0 0 48 38.4;" xml:space="preserve" width="21" height="21" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1 C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7 L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z"></path></svg>`;
  mailLiDesktop.append(mailAnchorDesktop);
  desktopIconUl.append(mailLiDesktop);

  const searchLiDesktop = document.createElement('li');
  searchLiDesktop.classList.add('search');
  const searchAnchorDesktop = document.createElement('a');
  searchAnchorDesktop.href = '#';
  searchAnchorDesktop.innerHTML = `<svg viewBox="0 0 21 21" fill="none" class="lens"><path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path></svg><svg viewBox="0 0 50 50" class="close"><path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path></svg>`;
  searchLiDesktop.append(searchAnchorDesktop);
  desktopIconUl.append(searchLiDesktop);
  nav.append(desktopIconNav);

  // Search Screen Wrap (common for both mobile and desktop)
  const searchScreenWrap = document.createElement('div');
  searchScreenWrap.classList.add('search-screen-wrap');
  const searchWrapContent = document.createElement('div');
  searchWrapContent.classList.add('wrap');
  searchScreenWrap.append(searchWrapContent);

  const searchForm = document.createElement('form');
  searchForm.action = 'https://www.mahindra.com/search';
  searchForm.method = 'get';
  searchForm.id = 'search-block-form';
  searchForm.setAttribute('accept-charset', 'UTF-8');
  searchForm.setAttribute('data-drupal-form-fields', 'edit-keys');
  searchWrapContent.append(searchForm);

  const searchInputWrap = document.createElement('div');
  searchInputWrap.classList.add('search-wrap');
  searchForm.append(searchInputWrap);

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('search-icon');
  searchIconDiv.innerHTML = `<svg viewBox="0 0 21 21" fill="none"><path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25"></path></svg>`;
  searchInputWrap.append(searchIconDiv);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('input-text', 'searchtext');
  searchInput.required = true;
  searchInput.name = 'key';
  searchInput.id = 'searchInput';
  searchInput.autocomplete = 'off';
  searchInputWrap.append(searchInput);

  const submitButton = document.createElement('button');
  submitButton.classList.add('submit-button');
  submitButton.innerHTML = `<div class="label"> Submit </div><svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black"></path></svg>`;
  searchInputWrap.append(submitButton);

  const searchResultBox = document.createElement('div');
  searchResultBox.classList.add('searchResultBox');
  searchResultBox.style.display = 'none'; // Initially hidden
  searchForm.append(searchResultBox);

  // Swiper setup for search results (if present in original HTML)
  const swiperEl = document.createElement('div');
  swiperEl.classList.add('swiper', 'scrollSwiper');
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperEl.append(swiperWrapper);
  searchResultBox.append(swiperEl);

  const swiperScrollbar = document.createElement('div');
  swiperScrollbar.classList.add('swiper-scrollbar');
  searchResultBox.append(swiperScrollbar);

  // Search suggestions
  const popularKeywordsWrap = document.createElement('div');
  popularKeywordsWrap.classList.add('search-suggestions-wrap');
  popularKeywordsWrap.innerHTML = `<div class="label">Popular Keywords:</div><div class="tokens-wrap"><ul><li>Business</li><li>FY 21</li><li>Brands</li><li>XUV700</li><li>Global</li><li>Nanhi Kali</li></ul></div>`;
  searchWrapContent.append(popularKeywordsWrap);

  const recommendedKeywordsWrap = document.createElement('div');
  recommendedKeywordsWrap.classList.add('search-suggestions-wrap');
  recommendedKeywordsWrap.innerHTML = `<div class="label">Recommended for you:</div><div class="tokens-wrap"><ul><li>Annual Report 2021 - 2022</li><li>Leadership Announcement</li><li>Latest Press Release</li><li>Brand Guidelines</li></ul></div>`;
  searchWrapContent.append(recommendedKeywordsWrap);

  searchAnchorMobile.addEventListener('click', (e) => {
    e.preventDefault();
    searchScreenWrap.classList.toggle('active');
  });
  searchAnchorDesktop.addEventListener('click', (e) => {
    e.preventDefault();
    searchScreenWrap.classList.toggle('active');
  });

  // Toggle search screen visibility
  const searchCloseButton = searchScreenWrap.querySelector('.close');
  if (searchCloseButton) {
    searchCloseButton.addEventListener('click', (e) => {
      e.preventDefault();
      searchScreenWrap.classList.remove('active');
    });
  }

  // Press Releases (in Newsroom mega menu)
  const newsroomLi = navUl.querySelector('li.has-child a[itemprop="url"][href*="newsroom"]')
    ?.closest('li');
  if (newsroomLi) {
    const newsroomLeftDiv = newsroomLi.querySelector('.mega-menu .newsroom-left-div');
    if (newsroomLeftDiv) {
      const latestPressReleaseDiv = document.createElement('div');
      latestPressReleaseDiv.classList.add('latest-two-press-release');
      newsroomLeftDiv.append(latestPressReleaseDiv);

      pressReleaseItems.forEach((row) => {
        const [linkCell, headlineCell, dateCell, categoryCell] = [...row.children];

        const slideDiv = document.createElement('div');
        slideDiv.classList.add('slides');
        const wrapDiv = document.createElement('div');
        wrapDiv.classList.add('wrap');
        slideDiv.append(wrapDiv);
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        wrapDiv.append(contentDiv);
        const descDiv = document.createElement('div');
        descDiv.classList.add('desc');
        contentDiv.append(descDiv);

        const headlineP = document.createElement('p');
        const pressLink = document.createElement('a');
        const foundPressLink = linkCell.querySelector('a');
        if (foundPressLink) pressLink.href = foundPressLink.href;
        pressLink.textContent = headlineCell.textContent.trim();
        headlineP.append(pressLink);
        descDiv.append(headlineP);
        moveInstrumentation(linkCell, pressLink);
        moveInstrumentation(headlineCell, headlineP);

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date');
        const dateEm = document.createElement('em');
        dateEm.textContent = dateCell.textContent.trim();
        dateDiv.append(dateEm);
        const categoryEm = document.createElement('em');
        categoryEm.textContent = categoryCell.textContent.trim();
        dateDiv.append(categoryEm);
        descDiv.append(dateDiv);
        moveInstrumentation(dateCell, dateEm);
        moveInstrumentation(categoryCell, categoryEm);

        latestPressReleaseDiv.append(slideDiv);
        moveInstrumentation(row, slideDiv);
      });
    }
  }

  // 80th Year Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const year80LogoAnchor = document.createElement('a');
  const anniversaryLogoLink = anniversaryLogoLinkRow.querySelector('a');
  if (anniversaryLogoLink) year80LogoAnchor.href = anniversaryLogoLink.href;
  moveInstrumentation(anniversaryLogoLinkRow, year80LogoAnchor);

  const anniversaryLogoPicture = anniversaryLogoRow.querySelector('picture');
  if (anniversaryLogoPicture) {
    const anniversaryLogoImg = anniversaryLogoPicture.querySelector('img');
    if (anniversaryLogoImg) {
      const optimizedPic = createOptimizedPicture(
        anniversaryLogoImg.src,
        anniversaryLogoImg.alt,
        false,
        [{ width: '74' }],
      );
      moveInstrumentation(anniversaryLogoRow, optimizedPic.querySelector('img'));
      year80LogoAnchor.append(optimizedPic);
    }
  }
  year80LogoAnchor.classList.add('hiddenlogo1', 'years-80');
  year80LogoDiv.append(year80LogoAnchor);
  wrap.append(year80LogoDiv);

  // Append search screen wrap to the header, outside the main nav
  header.append(searchScreenWrap);

  // Toggle hamburger menu
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('close');
  });

  block.replaceChildren(header);

  // Initialize Swiper if searchResultBox contains swiper classes
  if (searchResultBox.querySelector('.swiper-wrapper')) {
    await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
    // eslint-disable-next-line no-undef
    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      loop: false,
      navigation: {
        prevEl: swiperEl.querySelector('.swiper-button-prev'), // Assuming buttons are created dynamically or exist
        nextEl: swiperEl.querySelector('.swiper-button-next'),
      },
      pagination: {
        el: swiperScrollbar,
        clickable: true,
      },
      breakpoints: {
        576: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
      },
    });
  }

  // Scroll behavior for header
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      header.classList.add('nav-up');
    } else {
      header.classList.remove('nav-up');
    }
    lastScrollY = window.scrollY;
  });
}
