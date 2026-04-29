import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function createSvgIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '-23.5 -23.5 122.80 122.80');
  svg.setAttribute('fill', '#000000');
  svg.setAttribute('stroke', '#000000');
  svg.setAttribute('stroke-width', '4.851456000000001');

  const g1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g1.setAttribute('id', 'SVGRepo_bgCarrier');
  g1.setAttribute('stroke-width', '0');
  svg.appendChild(g1);

  const g2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g2.setAttribute('id', 'SVGRepo_tracerCarrier');
  g2.setAttribute('stroke-linecap', 'round');
  g2.setAttribute('stroke-linejoin', 'round');
  g2.setAttribute('stroke', '#CCCCCC');
  g2.setAttribute('stroke-width', '0.30321600000000004');
  svg.appendChild(g2);

  const g3 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g3.setAttribute('id', 'SVGRepo_iconCarrier');
  const g4 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g4.setAttribute('id', 'Group_65');
  g4.setAttribute('data-name', 'Group 65');
  g4.setAttribute('transform', 'translate(-831.568 -384.448)');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('id', 'Path_57');
  path.setAttribute('data-name', 'Path 57');
  path.setAttribute(
    'd',
    'M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z',
  );
  path.setAttribute('fill', '#030408');
  g4.appendChild(path);
  g3.appendChild(g4);
  svg.appendChild(g3);

  return svg;
}

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
      li.classList.add('top-level-li'); // Add top-level-li for items with sub-children
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        const svgIcon = createSvgIcon();
        trigger.appendChild(svgIcon); // Add SVG icon to trigger
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

export default async function decorate(block) {
  const children = [...block.children];

  const [
    mainLogoRow,
    mainLogoLinkRow,
    anniversaryLogoRow,
    anniversaryLogoLinkRow,
    ...itemRows
  ] = children;

  const navigationItems = itemRows.filter((row) => row.children.length === 8);
  const contactLinkItems = itemRows.filter((row) => row.children.length === 2);
  const pressReleaseItems = itemRows.filter((row) => row.children.length === 4);

  const header = document.createElement('header');
  header.classList.add('main-header');
  // Do not add 'with-marquee', 'solid', 'nav-up' as these are scroll-state classes.

  const container = document.createElement('div');
  container.classList.add('container');
  header.appendChild(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.appendChild(wrap);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const mainLogoLink = document.createElement('a');
  const mainLogoAnchor = mainLogoLinkRow.querySelector('a');
  if (mainLogoAnchor) mainLogoLink.href = mainLogoAnchor.href;
  const mainLogoPicture = mainLogoRow.querySelector('picture');
  if (mainLogoPicture) {
    const mainLogoImg = mainLogoPicture.querySelector('img');
    if (mainLogoImg) {
      const optimizedPic = createOptimizedPicture(
        mainLogoImg.src,
        mainLogoImg.alt,
        false,
        [{ width: '200' }],
      );
      moveInstrumentation(mainLogoImg, optimizedPic.querySelector('img'));
      mainLogoLink.appendChild(optimizedPic);
      mainLogoLink.querySelector('img').classList.add('hiddenlogo1');
    }
  }
  moveInstrumentation(mainLogoRow, mainLogoLink);
  moveInstrumentation(mainLogoLinkRow, mainLogoLink);
  logoDiv.appendChild(mainLogoLink);
  wrap.appendChild(logoDiv);

  // Hamburger
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  const ulHamburger = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    ulHamburger.appendChild(document.createElement('li'));
  }
  hamburger.appendChild(ulHamburger);
  wrap.appendChild(hamburger);

  // Main Nav
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.appendChild(navUl);

  navigationItems.forEach((row) => {
    const [
      labelCell,
      linkCell,
      hierarchyTreeCell,
      leftPanelHeadingCell,
      leftPanelDescCell,
      leftPanelSubdescCell,
      leftPanelListCell,
      subMenuLinksCell,
    ] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell.textContent.trim();
    anchor.setAttribute('itemprop', 'url');
    moveInstrumentation(labelCell, anchor);
    moveInstrumentation(linkCell, anchor);
    li.appendChild(anchor);

    const spanIcon = document.createElement('span');
    spanIcon.appendChild(createSvgIcon());
    li.appendChild(spanIcon);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu');
    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container');
    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div');
    megaMenuWrap.appendChild(centerDiv);
    megaMenu.appendChild(megaMenuWrap);
    li.appendChild(megaMenu);

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div');
    centerDiv.appendChild(leftDiv);

    const leftDivHeading = document.createElement('h4');
    leftDivHeading.classList.add('left-div-heading');
    const headingAnchor = document.createElement('a');
    headingAnchor.textContent = leftPanelHeadingCell.textContent.trim();
    moveInstrumentation(leftPanelHeadingCell, headingAnchor);
    leftDivHeading.appendChild(headingAnchor);
    leftDiv.appendChild(leftDivHeading);

    if (leftPanelDescCell.innerHTML.trim()) {
      const pDesc = document.createElement('p');
      pDesc.classList.add('left-div-desc');
      pDesc.innerHTML = leftPanelDescCell.innerHTML;
      moveInstrumentation(leftPanelDescCell, pDesc);
      leftDiv.appendChild(pDesc);
    }

    if (leftPanelSubdescCell.textContent.trim()) {
      const pSubdesc = document.createElement('p');
      pSubdesc.classList.add('left-div-subdesc');
      pSubdesc.textContent = leftPanelSubdescCell.textContent.trim();
      moveInstrumentation(leftPanelSubdescCell, pSubdesc);
      leftDiv.appendChild(pSubdesc);
    }

    if (leftPanelListCell.innerHTML.trim()) {
      const ulList = document.createElement('ul');
      ulList.innerHTML = leftPanelListCell.innerHTML;
      ulList.querySelectorAll('li').forEach((listItem) => {
        listItem.classList.add('list-text-red');
      });
      moveInstrumentation(leftPanelListCell, ulList);
      leftDiv.appendChild(ulList);
    }

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    centerDiv.appendChild(subNavWrap);

    const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
    if (hierarchyRoot) {
      const clonedHierarchy = hierarchyRoot.cloneNode(true);
      transformNestedLists(clonedHierarchy);
      subNavWrap.appendChild(clonedHierarchy);
      moveInstrumentation(hierarchyTreeCell, clonedHierarchy);
    }

    if (subMenuLinksCell.innerHTML.trim()) {
      const subMenuUl = document.createElement('ul');
      subMenuUl.innerHTML = subMenuLinksCell.innerHTML;
      moveInstrumentation(subMenuLinksCell, subMenuUl);
      subNavWrap.appendChild(subMenuUl);
    }

    navUl.appendChild(li);

    // Event listeners for mega menu interaction
    li.addEventListener('mouseenter', () => {
      li.classList.add('active');
    });
    li.addEventListener('mouseleave', () => {
      li.classList.remove('active');
    });

    // Mobile menu toggle
    spanIcon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      li.classList.toggle('active');
      megaMenu.classList.toggle('active');
    });
  });

  // Icon Nav (Mobile and Desktop)
  const createIconNav = (isMobile = false) => {
    const iconNav = document.createElement('div');
    iconNav.classList.add('icon-nav');
    if (isMobile) {
      iconNav.classList.add('mobile-menus-icon');
    } else {
      iconNav.classList.add('desktop-menus-icon');
    }

    const iconUl = document.createElement('ul');
    iconNav.appendChild(iconUl);

    // Contact Us Link
    const mailLi = document.createElement('li');
    mailLi.classList.add('mail');
    const mailLink = document.createElement('a');
    const contactLinkItem = contactLinkItems[0]; // Assuming first contact link is for contact us
    if (contactLinkItem) {
      const [contactLinkCell, contactLabelCell] = [...contactLinkItem.children];
      const foundLink = contactLinkCell.querySelector('a');
      if (foundLink) mailLink.href = foundLink.href;
      mailLink.textContent = contactLabelCell.textContent.trim();
      moveInstrumentation(contactLinkCell, mailLink);
      moveInstrumentation(contactLabelCell, mailLink);
    } else {
      // Fallback for hardcoded link if not provided in block
      mailLink.href = 'https://www.mahindra.com/contact-us';
      mailLink.textContent = 'Contact Us';
    }

    if (!isMobile) {
      const mailSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      mailSvg.setAttribute('version', '1.1');
      mailSvg.setAttribute('id', 'Layer_1');
      mailSvg.setAttribute('x', '0px');
      mailSvg.setAttribute('y', '0px');
      mailSvg.setAttribute('viewBox', '0 0 48 38.4');
      mailSvg.setAttribute('xml:space', 'preserve');
      mailSvg.setAttribute('width', '21');
      mailSvg.setAttribute('height', '21');
      const mailPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      mailPath.setAttribute(
        'd',
        'M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z',
      );
      mailSvg.appendChild(mailPath);
      mailLink.prepend(mailSvg);
    }
    mailLi.appendChild(mailLink);
    iconUl.appendChild(mailLi);

    // Search
    const searchLi = document.createElement('li');
    searchLi.classList.add('search');
    const searchLink = document.createElement('a');
    searchLink.href = '#';

    const lensSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    lensSvg.setAttribute('viewBox', '0 0 21 21');
    lensSvg.setAttribute('fill', 'none');
    lensSvg.classList.add('lens');
    const lensPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    lensPath.setAttribute(
      'd',
      'M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z',
    );
    lensPath.setAttribute('stroke-width', '0.25');
    lensSvg.appendChild(lensPath);
    searchLink.appendChild(lensSvg);

    const closeSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    closeSvg.setAttribute('viewBox', '0 0 50 50');
    closeSvg.classList.add('close');
    const closePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    closePath.setAttribute(
      'd',
      'M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z',
    );
    closeSvg.appendChild(closePath);
    searchLink.appendChild(closeSvg);

    if (isMobile) {
      const searchSpan = document.createElement('span');
      searchSpan.textContent = ' Search';
      searchLink.appendChild(searchSpan);
    }

    searchLi.appendChild(searchLink);
    iconUl.appendChild(searchLi);

    const searchScreenWrap = document.createElement('div');
    searchScreenWrap.classList.add('search-screen-wrap');
    searchScreenWrap.style.display = 'none'; // Hidden by default

    const searchWrapInner = document.createElement('div');
    searchWrapInner.classList.add('wrap');
    searchScreenWrap.appendChild(searchWrapInner);

    const searchForm = document.createElement('form');
    // searchForm.action = 'https://www.mahindra.com/search'; // Remove hardcoded action
    searchForm.method = 'get';
    searchForm.id = 'search-block-form';
    searchForm.setAttribute('accept-charset', 'UTF-8');
    searchForm.setAttribute('data-drupal-form-fields', 'edit-keys');
    searchWrapInner.appendChild(searchForm);

    const searchInputWrap = document.createElement('div');
    searchInputWrap.classList.add('search-wrap');
    searchForm.appendChild(searchInputWrap);

    const searchIconDiv = document.createElement('div');
    searchIconDiv.classList.add('search-icon');
    const searchInputLensSvg = lensSvg.cloneNode(true); // Re-use lens SVG
    searchIconDiv.appendChild(searchInputLensSvg);
    searchInputWrap.appendChild(searchIconDiv);

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add('input-text', 'searchtext');
    searchInput.required = true;
    searchInput.name = 'key';
    searchInput.id = 'searchInput';
    searchInput.autocomplete = 'off';
    searchInputWrap.appendChild(searchInput);

    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-button');
    const submitLabel = document.createElement('div');
    submitLabel.classList.add('label');
    submitLabel.textContent = ' Submit ';
    submitButton.appendChild(submitLabel);
    const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrowSvg.setAttribute('width', '12');
    arrowSvg.setAttribute('height', '8');
    arrowSvg.setAttribute('viewBox', '0 0 12 8');
    arrowSvg.setAttribute('fill', 'none');
    const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrowPath.setAttribute(
      'd',
      'M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z',
    );
    arrowPath.setAttribute('fill', 'black');
    arrowSvg.appendChild(arrowPath);
    submitButton.appendChild(arrowSvg);
    searchInputWrap.appendChild(submitButton);

    const searchResultBox = document.createElement('div');
    searchResultBox.classList.add('searchResultBox');
    searchResultBox.style.display = 'none';
    searchForm.appendChild(searchResultBox);

    const swiperContainer = document.createElement('div');
    swiperContainer.classList.add('swiper', 'scrollSwiper');
    searchResultBox.appendChild(swiperContainer);

    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    swiperContainer.appendChild(swiperWrapper);

    // Populate swiper slides with press release items
    pressReleaseItems.forEach((row) => {
      const [pressReleaseLinkCell, pressReleaseTitleCell, pressReleaseDateCell, pressReleaseCategoryCell] = [...row.children];

      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      const slideWrap = document.createElement('div');
      slideWrap.classList.add('wrap');
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('content');
      const descDiv = document.createElement('div');
      descDiv.classList.add('desc');

      const pLink = document.createElement('p');
      const linkAnchor = pressReleaseLinkCell.querySelector('a');
      if (linkAnchor) {
        const a = document.createElement('a');
        a.href = linkAnchor.href;
        a.textContent = pressReleaseTitleCell.textContent.trim();
        pLink.appendChild(a);
      } else {
        pLink.textContent = pressReleaseTitleCell.textContent.trim();
      }
      moveInstrumentation(pressReleaseLinkCell, pLink);
      moveInstrumentation(pressReleaseTitleCell, pLink);
      descDiv.appendChild(pLink);

      const dateDiv = document.createElement('div');
      dateDiv.classList.add('date');
      const emDate = document.createElement('em');
      emDate.textContent = pressReleaseDateCell.textContent.trim();
      moveInstrumentation(pressReleaseDateCell, emDate);
      dateDiv.appendChild(emDate);
      const emCategory = document.createElement('em');
      emCategory.textContent = pressReleaseCategoryCell.textContent.trim();
      moveInstrumentation(pressReleaseCategoryCell, emCategory);
      dateDiv.appendChild(emCategory);
      descDiv.appendChild(dateDiv);

      contentDiv.appendChild(descDiv);
      slideWrap.appendChild(contentDiv);
      slide.appendChild(slideWrap);
      swiperWrapper.appendChild(slide);
      moveInstrumentation(row, slide);
    });

    const swiperScrollbar = document.createElement('div');
    swiperScrollbar.classList.add('swiper-scrollbar');
    searchResultBox.appendChild(swiperScrollbar);

    const searchSuggestionsWrap = document.createElement('div');
    searchSuggestionsWrap.classList.add('search-suggestions-wrap');
    const popularKeywordsLabel = document.createElement('div');
    popularKeywordsLabel.classList.add('label');
    popularKeywordsLabel.textContent = 'Popular Keywords:';
    searchSuggestionsWrap.appendChild(popularKeywordsLabel);
    const popularTokensWrap = document.createElement('div');
    popularTokensWrap.classList.add('tokens-wrap');
    const popularUl = document.createElement('ul');
    ['Business', 'FY 21', 'Brands', 'XUV700', 'Global', 'Nanhi Kali'].forEach((keyword) => {
      const li = document.createElement('li');
      li.textContent = keyword;
      popularUl.appendChild(li);
    });
    popularTokensWrap.appendChild(popularUl);
    searchSuggestionsWrap.appendChild(popularTokensWrap);
    searchWrapInner.appendChild(searchSuggestionsWrap);

    const recommendedSuggestionsWrap = document.createElement('div');
    recommendedSuggestionsWrap.classList.add('search-suggestions-wrap');
    const recommendedLabel = document.createElement('div');
    recommendedLabel.classList.add('label');
    recommendedLabel.textContent = 'Recommended for you:';
    recommendedSuggestionsWrap.appendChild(recommendedLabel);
    const recommendedTokensWrap = document.createElement('div');
    recommendedTokensWrap.classList.add('tokens-wrap');
    const recommendedUl = document.createElement('ul');
    ['Annual Report 2021 - 2022', 'Leadership Announcement', 'Latest Press Release', 'Brand Guidelines'].forEach((keyword) => {
      const li = document.createElement('li');
      li.textContent = keyword;
      recommendedUl.appendChild(li);
    });
    recommendedTokensWrap.appendChild(recommendedUl);
    recommendedSuggestionsWrap.appendChild(recommendedTokensWrap);
    searchWrapInner.appendChild(recommendedSuggestionsWrap);

    searchLi.appendChild(searchScreenWrap);

    // Event listeners for search toggle
    searchLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchScreenWrap.style.display = searchScreenWrap.style.display === 'none' ? 'block' : 'none';
      if (searchScreenWrap.style.display === 'block') {
        // Initialize Swiper when search screen is shown
        // eslint-disable-next-line no-undef
        new Swiper(swiperContainer, {
          slidesPerView: 'auto',
          loop: false, // Original HTML doesn't specify loop, default to false
          scrollbar: {
            el: swiperScrollbar,
            hide: false,
          },
        });
      }
    });

    searchScreenWrap.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    return iconNav;
  };

  navUl.appendChild(createIconNav(true)); // Mobile icon nav
  nav.appendChild(createIconNav(false)); // Desktop icon nav

  wrap.appendChild(nav);

  // Anniversary Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const anniversaryLogoLink = document.createElement('a');
  const anniversaryLogoAnchor = anniversaryLogoLinkRow.querySelector('a');
  if (anniversaryLogoAnchor) anniversaryLogoLink.href = anniversaryLogoAnchor.href;
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
      moveInstrumentation(anniversaryLogoImg, optimizedPic.querySelector('img'));
      anniversaryLogoLink.appendChild(optimizedPic);
      anniversaryLogoLink.querySelector('img').classList.add('hiddenlogo1', 'years-80');
    }
  }
  moveInstrumentation(anniversaryLogoRow, anniversaryLogoLink);
  moveInstrumentation(anniversaryLogoLinkRow, anniversaryLogoLink);
  year80LogoDiv.appendChild(anniversaryLogoLink);
  wrap.appendChild(year80LogoDiv);

  block.replaceChildren(header);

  // Add event listener for hamburger menu
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close search when clicking outside
  document.addEventListener('click', (e) => {
    const searchScreenWraps = block.querySelectorAll('.search-screen-wrap');
    searchScreenWraps.forEach((searchScreenWrap) => {
      if (searchScreenWrap.style.display === 'block' && !searchScreenWrap.contains(e.target) && !e.target.closest('.search')) {
        searchScreenWrap.style.display = 'none';
      }
    });
  });

  // Load Swiper CSS and JS if not already loaded
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
}
