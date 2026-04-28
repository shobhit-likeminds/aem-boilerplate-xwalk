import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
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
      subWrap.classList.add('has-sub-child'); // Use class from original HTML
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

function transformInnerNestedLists(rootUl) {
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
      subWrap.classList.add('has-inner-sub-child'); // Use class from original HTML
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active-child');
          subWrap.classList.toggle('active-child');
        });
      }
      transformInnerNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default async function decorate(block) {
  const children = [...block.children];

  // Root fields: mainLogo, mainLogoLink, year80Logo, year80LogoLink
  // These are the first 4 rows in the block.children
  const [mainLogoRow, mainLogoLinkRow, year80LogoRow, year80LogoLinkRow, ...remainingRows] = children;

  const navigationItems = remainingRows.filter((row) => row.children.length === 8);
  const contactLinkItems = remainingRows.filter((row) => row.children.length === 2);
  const searchKeywordItems = remainingRows.filter((row) => row.children.length === 1 && row.querySelector('div').textContent.trim() !== 'Recommendation label text');
  const searchRecommendationItems = remainingRows.filter((row) => row.children.length === 1 && row.querySelector('div').textContent.trim() === 'Recommendation label text');
  const megaMenuAboutItems = remainingRows.filter((row) => row.children.length === 4 && row.querySelector('div').textContent.trim() === 'Heading label text' && row.querySelector('div:nth-child(2)').textContent.trim() === 'Description label text');
  const megaMenuWhatWeDoItems = remainingRows.filter((row) => row.children.length === 3 && row.querySelector('div').textContent.trim() === 'Heading label text' && row.querySelector('div:nth-child(2)').textContent.trim() === 'Key Facts (HTML) text content');
  const megaMenuInvestorRelationsItems = remainingRows.filter((row) => row.children.length === 4 && row.querySelector('div').textContent.trim() === 'Heading label text' && row.querySelector('div:nth-child(2)').textContent.trim() === 'Description label text' && row.querySelector('div:nth-child(3)').textContent.trim() === 'Key Facts (HTML) text content');
  const megaMenuNewsroomItems = remainingRows.filter((row) => row.children.length === 3 && row.querySelector('div').textContent.trim() === 'Heading label text' && row.querySelector('div:nth-child(2)').textContent.trim() === 'Latest Press Releases value');
  const megaMenuCareersItems = remainingRows.filter((row) => row.children.length === 4 && row.querySelector('div').textContent.trim() === 'Heading label text' && row.querySelector('div:nth-child(2)').textContent.trim() === 'Description label text' && row.querySelector('div:nth-child(3)').textContent.trim() === 'Sub Description label text');
  const pressReleaseSlideItems = remainingRows.filter((row) => row.children.length === 4 && row.querySelector('a'));

  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid'); // Do not add 'nav-up'

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const mainLogoAnchor = document.createElement('a');
  const mainLogoLink = mainLogoLinkRow.querySelector('a');
  if (mainLogoLink) {
    mainLogoAnchor.href = mainLogoLink.href;
  }
  const mainLogoPicture = mainLogoRow.querySelector('picture');
  if (mainLogoPicture) {
    const img = mainLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    mainLogoAnchor.append(optimizedPic);
    mainLogoAnchor.querySelector('img').classList.add('hiddenlogo1');
  }
  moveInstrumentation(mainLogoRow, mainLogoAnchor);
  logoDiv.append(mainLogoAnchor);
  wrap.append(logoDiv);

  // Hamburger
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.setAttribute('data-once', 'hamburger-click nav-close-search');
  const ulHamburger = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    ulHamburger.append(document.createElement('li'));
  }
  hamburger.append(ulHamburger);
  wrap.append(hamburger);

  // Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  nav.setAttribute('data-once', 'initSubChildToggle');
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);

  navigationItems.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell, aboutMegaMenuCell, whatWeDoMegaMenuCell,
      investorRelationsMegaMenuCell, newsroomMegaMenuCell, careersMegaMenuCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');
    li.setAttribute('data-once', 'nav-close-search');

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell.textContent.trim();
    anchor.setAttribute('itemprop', 'url');
    moveInstrumentation(row, anchor);
    li.append(anchor);

    const svgSpan = document.createElement('span');
    svgSpan.innerHTML = '<svg viewBox="-23.5 -23.5 122.80 122.80" fill="#000000" stroke="#000000" stroke-width="4.851456000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.30321600000000004"></g><g id="SVGRepo_iconCarrier"> <g id="Group_65" data-name="Group 65" transform="translate(-831.568 -384.448)"> <path id="Path_57" data-name="Path 57" d="M833.068,460.252a1.5,1.5,0,0,1-1.061-2.561l33.557-33.56a2.53,2.53,0,0,0,0-3.564l-33.557-33.558a1.5,1.5,0,0,1,2.122-2.121l33.556,33.558a5.53,5.53,0,0,1,0,7.807l-33.557,33.56A1.5,1.5,0,0,1,833.068,460.252Z" fill="#030408"></path> </g> </g></svg>';
    li.append(svgSpan);

    const megaMenu = document.createElement('div');
    megaMenu.classList.add('mega-menu');
    const megaMenuWrap = document.createElement('div');
    megaMenuWrap.classList.add('wrap', 'container');
    megaMenu.append(megaMenuWrap);
    const centerDiv = document.createElement('div');
    centerDiv.classList.add('center-div');
    megaMenuWrap.append(centerDiv);

    const hierarchyRoot = hierarchyCell.querySelector('ul');
    if (hierarchyRoot) {
      const leftDiv = document.createElement('div');
      leftDiv.classList.add('left-div');
      centerDiv.append(leftDiv);

      const heading = document.createElement('h4');
      heading.classList.add('left-div-heading');
      const headingAnchor = document.createElement('a');
      headingAnchor.textContent = labelCell.textContent.trim();
      heading.append(headingAnchor);
      leftDiv.append(heading);

      const subNavWrap = document.createElement('div');
      subNavWrap.classList.add('sub-nav-wrap');
      centerDiv.append(subNavWrap);

      // Move instrumentation for hierarchy-tree richtext
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      moveInstrumentation(hierarchyCell, tempDiv);
      while (tempDiv.firstChild) {
        subNavWrap.append(tempDiv.firstChild);
      }
      transformNestedLists(subNavWrap.querySelector('ul'));
    }

    // Mega Menu About
    if (aboutMegaMenuCell.textContent.trim() !== '') {
      const leftDiv = centerDiv.querySelector('.left-div');
      if (!leftDiv) {
        const newLeftDiv = document.createElement('div');
        newLeftDiv.classList.add('left-div');
        centerDiv.prepend(newLeftDiv);
      }
      const aboutItems = megaMenuAboutItems;
      aboutItems.forEach((itemRow) => {
        const [headingCell, descCell, subdescCell, linksCell] = [...itemRow.children];
        const heading = document.createElement('h4');
        heading.classList.add('left-div-heading');
        const headingAnchor = document.createElement('a');
        headingAnchor.textContent = headingCell.textContent.trim();
        heading.append(headingAnchor);
        centerDiv.querySelector('.left-div').append(heading);

        const desc = document.createElement('p');
        desc.classList.add('left-div-desc');
        desc.textContent = descCell.textContent.trim();
        centerDiv.querySelector('.left-div').append(desc);

        const subdesc = document.createElement('p');
        subdesc.classList.add('left-div-subdesc');
        subdesc.textContent = subdescCell.textContent.trim();
        centerDiv.querySelector('.left-div').append(subdesc);

        const subNavWrap = document.createElement('div');
        subNavWrap.classList.add('sub-nav-wrap', 'about-us-sub-nav');
        // Move instrumentation for richtext
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = linksCell.innerHTML;
        moveInstrumentation(linksCell, tempDiv);
        while (tempDiv.firstChild) {
          subNavWrap.append(tempDiv.firstChild);
        }
        centerDiv.append(subNavWrap);
        transformNestedLists(subNavWrap);
      });
    }

    // Mega Menu What We Do
    if (whatWeDoMegaMenuCell.textContent.trim() !== '') {
      const leftDiv = centerDiv.querySelector('.left-div');
      if (!leftDiv) {
        const newLeftDiv = document.createElement('div');
        newLeftDiv.classList.add('left-div');
        centerDiv.prepend(newLeftDiv);
      }
      const whatWeDoItems = megaMenuWhatWeDoItems;
      whatWeDoItems.forEach((itemRow) => {
        const [headingCell, factsCell, linksCell] = [...itemRow.children];
        const heading = document.createElement('h4');
        heading.classList.add('left-div-heading');
        const headingAnchor = document.createElement('a');
        headingAnchor.textContent = headingCell.textContent.trim();
        heading.append(headingAnchor);
        centerDiv.querySelector('.left-div').append(heading);

        const factsUl = document.createElement('ul');
        // Move instrumentation for richtext
        const tempFactsDiv = document.createElement('div');
        tempFactsDiv.innerHTML = factsCell.innerHTML;
        moveInstrumentation(factsCell, tempFactsDiv);
        while (tempFactsDiv.firstChild) {
          factsUl.append(tempFactsDiv.firstChild);
        }
        factsUl.querySelectorAll('li').forEach((liFact) => {
          liFact.classList.add('list-text-red');
        });
        centerDiv.querySelector('.left-div').append(factsUl);

        const subNavWrap = document.createElement('div');
        subNavWrap.classList.add('sub-nav-wrap', 'what-we-do');
        // Move instrumentation for richtext
        const tempLinksDiv = document.createElement('div');
        tempLinksDiv.innerHTML = linksCell.innerHTML;
        moveInstrumentation(linksCell, tempLinksDiv);
        while (tempLinksDiv.firstChild) {
          subNavWrap.append(tempLinksDiv.firstChild);
        }
        centerDiv.append(subNavWrap);
        transformInnerNestedLists(subNavWrap);
      });
    }

    // Mega Menu Investor Relations
    if (investorRelationsMegaMenuCell.textContent.trim() !== '') {
      const leftDiv = centerDiv.querySelector('.left-div');
      if (!leftDiv) {
        const newLeftDiv = document.createElement('div');
        newLeftDiv.classList.add('left-div');
        centerDiv.prepend(newLeftDiv);
      }
      leftDiv.classList.add('ir-left-div');
      const investorRelationsItems = megaMenuInvestorRelationsItems;
      investorRelationsItems.forEach((itemRow) => {
        const [headingCell, descCell, factsCell, linksCell] = [...itemRow.children];
        const heading = document.createElement('h4');
        heading.classList.add('left-div-heading');
        const headingAnchor = document.createElement('a');
        headingAnchor.textContent = headingCell.textContent.trim();
        heading.append(headingAnchor);
        centerDiv.querySelector('.left-div').append(heading);

        const desc = document.createElement('p');
        desc.textContent = descCell.textContent.trim();
        centerDiv.querySelector('.left-div').append(desc);

        const factsUl = document.createElement('ul');
        // Move instrumentation for richtext
        const tempFactsDiv = document.createElement('div');
        tempFactsDiv.innerHTML = factsCell.innerHTML;
        moveInstrumentation(factsCell, tempFactsDiv);
        while (tempFactsDiv.firstChild) {
          factsUl.append(tempFactsDiv.firstChild);
        }
        factsUl.querySelectorAll('li').forEach((liFact) => {
          liFact.classList.add('list-text-red');
        });
        centerDiv.querySelector('.left-div').append(factsUl);

        const subNavWrap = document.createElement('div');
        subNavWrap.classList.add('sub-nav-wrap', 'element-block');
        // Move instrumentation for richtext
        const tempLinksDiv = document.createElement('div');
        tempLinksDiv.innerHTML = linksCell.innerHTML;
        moveInstrumentation(linksCell, tempLinksDiv);
        while (tempLinksDiv.firstChild) {
          subNavWrap.append(tempLinksDiv.firstChild);
        }
        centerDiv.append(subNavWrap);
      });
    }

    // Mega Menu Newsroom
    if (newsroomMegaMenuCell.textContent.trim() !== '') {
      const leftDiv = centerDiv.querySelector('.left-div');
      if (!leftDiv) {
        const newLeftDiv = document.createElement('div');
        newLeftDiv.classList.add('left-div');
        centerDiv.prepend(newLeftDiv);
      }
      leftDiv.classList.add('newsroom-left-div');
      const newsroomItems = megaMenuNewsroomItems;
      newsroomItems.forEach((itemRow) => {
        const [headingCell, pressReleasesCell, linksCell] = [...itemRow.children];
        const heading = document.createElement('h4');
        heading.classList.add('left-div-heading');
        const headingAnchor = document.createElement('a');
        headingAnchor.textContent = headingCell.textContent.trim();
        heading.append(headingAnchor);
        centerDiv.querySelector('.left-div').append(heading);

        const latestPressReleaseDiv = document.createElement('div');
        latestPressReleaseDiv.classList.add('latest-two-press-release');
        centerDiv.querySelector('.left-div').append(latestPressReleaseDiv);

        pressReleaseSlideItems.forEach((pressReleaseRow) => {
          const [prLinkCell, prTitleCell, prDateCell, prCategoryCell] = [...pressReleaseRow.children];
          const slidesDiv = document.createElement('div');
          slidesDiv.classList.add('slides');
          const slidesWrap = document.createElement('div');
          slidesWrap.classList.add('wrap');
          slidesDiv.append(slidesWrap);
          const contentDiv = document.createElement('div');
          contentDiv.classList.add('content');
          slidesWrap.append(contentDiv);
          const descDiv = document.createElement('div');
          descDiv.classList.add('desc');
          contentDiv.append(descDiv);

          const prLink = prLinkCell.querySelector('a');
          const prP = document.createElement('p');
          const prAnchor = document.createElement('a');
          if (prLink) {
            prAnchor.href = prLink.href;
          }
          prAnchor.textContent = prTitleCell.textContent.trim();
          prP.append(prAnchor);
          descDiv.append(prP);

          const dateDiv = document.createElement('div');
          dateDiv.classList.add('date');
          const dateEm = document.createElement('em');
          dateEm.textContent = prDateCell.textContent.trim();
          dateDiv.append(dateEm);
          const categoryEm = document.createElement('em');
          categoryEm.textContent = prCategoryCell.textContent.trim();
          dateDiv.append(categoryEm);
          descDiv.append(dateDiv);
          latestPressReleaseDiv.append(slidesDiv);
        });

        const subNavWrap = document.createElement('div');
        subNavWrap.classList.add('sub-nav-wrap');
        // Move instrumentation for richtext
        const tempLinksDiv = document.createElement('div');
        tempLinksDiv.innerHTML = linksCell.innerHTML;
        moveInstrumentation(linksCell, tempLinksDiv);
        while (tempLinksDiv.firstChild) {
          subNavWrap.append(tempLinksDiv.firstChild);
        }
        centerDiv.append(subNavWrap);
      });
    }

    // Mega Menu Careers
    if (careersMegaMenuCell.textContent.trim() !== '') {
      const leftDiv = centerDiv.querySelector('.left-div');
      if (!leftDiv) {
        const newLeftDiv = document.createElement('div');
        newLeftDiv.classList.add('left-div');
        centerDiv.prepend(newLeftDiv);
      }
      leftDiv.classList.add('career-left-div');
      const careersItems = megaMenuCareersItems;
      careersItems.forEach((itemRow) => {
        const [headingCell, descCell, subdescCell, linksCell] = [...itemRow.children];
        const heading = document.createElement('h4');
        heading.classList.add('left-div-heading');
        const headingAnchor = document.createElement('a');
        headingAnchor.textContent = headingCell.textContent.trim();
        heading.append(headingAnchor);
        centerDiv.querySelector('.left-div').append(heading);

        const desc = document.createElement('p');
        desc.classList.add('left-div-desc');
        desc.textContent = descCell.textContent.trim();
        centerDiv.querySelector('.left-div').append(desc);

        const subdesc = document.createElement('p');
        subdesc.classList.add('left-div-subdesc');
        subdesc.textContent = subdescCell.textContent.trim();
        centerDiv.querySelector('.left-div').append(subdesc);

        const subNavWrap = document.createElement('div');
        subNavWrap.classList.add('sub-nav-wrap', 'careers-div');
        // Move instrumentation for richtext
        const tempLinksDiv = document.createElement('div');
        tempLinksDiv.innerHTML = linksCell.innerHTML;
        moveInstrumentation(linksCell, tempLinksDiv);
        while (tempLinksDiv.firstChild) {
          subNavWrap.append(tempLinksDiv.firstChild);
        }
        centerDiv.append(subNavWrap);
        transformNestedLists(subNavWrap);
      });
    }

    li.append(megaMenu);
    navUl.append(li);
  });

  // Mobile and Desktop Icon Nav
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');

  const createIconNavList = (isMobile) => {
    const ul = document.createElement('ul');

    // Contact Us Link
    const mailLi = document.createElement('li');
    mailLi.classList.add('mail');
    const mailAnchor = document.createElement('a');
    const contactLinkItem = contactLinkItems[0]; // Assuming first contact link item is for contact us
    if (contactLinkItem) {
      const [contactLabelCell, contactLinkCell] = [...contactLinkItem.children];
      const contactLink = contactLinkCell.querySelector('a');
      if (contactLink) {
        mailAnchor.href = contactLink.href;
      }
      if (isMobile) {
        mailAnchor.textContent = contactLabelCell.textContent.trim();
      } else {
        mailAnchor.innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 48 38.4"
        style="enable-background:new 0 0 48 38.4;" xml:space="preserve" width="21" height="21">
        <path d="M3.6,38.4c-1,0-1.8-0.4-2.5-1.1S0,35.8,0,34.8V3.6c0-1,0.4-1.8,1.1-2.5S2.6,0,3.6,0h40.8c1,0,1.8,0.4,2.5,1.1
                  C47.6,1.8,48,2.6,48,3.6v31.2c0,1-0.4,1.8-1.1,2.5c-0.7,0.7-1.6,1.1-2.5,1.1H3.6z M24,20.3L3.6,6.9v27.9h40.8V6.9L24,20.3z M24,16.7
                  L44.2,3.6H3.9L24,16.7z M3.6,6.9V3.6v31.2V6.9z" />
        </svg>`;
      }
      moveInstrumentation(contactLinkItem, mailAnchor);
    }
    mailLi.append(mailAnchor);
    ul.append(mailLi);

    // Search
    const searchLi = document.createElement('li');
    searchLi.classList.add('search');
    searchLi.setAttribute('data-once', 'search-toggle search-stop-propagation');
    const searchAnchor = document.createElement('a');
    searchAnchor.href = '#';
    searchAnchor.setAttribute('data-once', 'search-stop-propagation');
    searchAnchor.innerHTML = `
      <svg viewBox="0 0 21 21" fill="none" class="lens" data-once="search-stop-propagation">
        <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path>
      </svg>
      <svg viewBox="0 0 50 50" class="close" data-once="search-stop-propagation">
        <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" data-once="search-stop-propagation"></path>
      </svg>
      ${isMobile ? '<span data-once="search-stop-propagation"> Search</span>' : ''}
    `;
    searchLi.append(searchAnchor);

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
    searchIconDiv.innerHTML = `<svg viewBox="0 0 21 21" fill="none" data-once="search-stop-propagation">
      <path d="M15.0934 2.73157L15.0934 2.73156C11.6883 -0.67354 6.14543 -0.67354 2.74033 2.73156C-0.666039 6.13793 -0.666063 11.6795 2.74035 15.0847C4.38993 16.7342 6.58308 17.6433 8.91623 17.6433C10.9916 17.6433 12.9533 16.9181 14.5221 15.5975L19.5217 20.5972C19.6721 20.7476 19.8687 20.8212 20.0632 20.8212C20.2588 20.8212 20.4554 20.7476 20.6059 20.5972C20.905 20.2981 20.905 19.8121 20.6059 19.513L15.6062 14.5132C18.4815 11.0845 18.3159 5.95535 15.0934 2.73157ZM14.0092 14.0004C12.6491 15.3606 10.8404 16.1098 8.91623 16.1098C6.99211 16.1098 5.18468 15.3606 3.82452 14.0004C1.01633 11.1923 1.01633 6.62394 3.82452 3.81575C5.22857 2.41171 7.07147 1.71024 8.91623 1.71024C10.7609 1.71024 12.6052 2.41296 14.0092 3.81575C16.8174 6.62394 16.8174 11.1923 14.0092 14.0004Z" stroke-width="0.25" data-once="search-stop-propagation"></path>
    </svg>`;
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
    submitButton.innerHTML = `<div class="label" data-once="search-stop-propagation"> Submit </div>
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" data-once="search-stop-propagation">
        <path d="M11.3536 4.35355C11.5488 4.15829 11.5488 3.84171 11.3536 3.64645L8.17157 0.464465C7.97631 0.269203 7.65973 0.269203 7.46447 0.464465C7.2692 0.659728 7.2692 0.97631 7.46447 1.17157L10.2929 4L7.46447 6.82843C7.2692 7.02369 7.2692 7.34027 7.46447 7.53553C7.65973 7.7308 7.97631 7.7308 8.17157 7.53553L11.3536 4.35355ZM4.37114e-08 4.5L11 4.5L11 3.5L-4.37114e-08 3.5L4.37114e-08 4.5Z" fill="black" data-once="search-stop-propagation"></path>
      </svg>`;
    searchInputWrap.append(submitButton);

    const searchResultBox = document.createElement('div');
    searchResultBox.classList.add('searchResultBox');
    searchResultBox.style.display = 'none';
    searchResultBox.setAttribute('data-once', 'search-stop-propagation');
    searchForm.append(searchResultBox);

    const swiperDiv = document.createElement('div');
    swiperDiv.classList.add('swiper', 'scrollSwiper');
    swiperDiv.setAttribute('data-once', 'search-stop-propagation');
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    swiperWrapper.setAttribute('data-once', 'search-stop-propagation');
    const swiperSlide = document.createElement('div');
    swiperSlide.classList.add('swiper-slide');
    swiperSlide.setAttribute('data-once', 'search-stop-propagation');
    swiperWrapper.append(swiperSlide);
    swiperDiv.append(swiperWrapper);
    searchResultBox.append(swiperDiv);

    const swiperScrollbar = document.createElement('div');
    swiperScrollbar.classList.add('swiper-scrollbar');
    swiperScrollbar.setAttribute('data-once', 'search-stop-propagation');
    searchResultBox.append(swiperScrollbar);

    const searchSuggestionsKeywords = document.createElement('div');
    searchSuggestionsKeywords.classList.add('search-suggestions-wrap');
    searchSuggestionsKeywords.setAttribute('data-once', 'search-stop-propagation');
    const keywordsLabel = document.createElement('div');
    keywordsLabel.classList.add('label');
    keywordsLabel.setAttribute('data-once', 'search-stop-propagation');
    keywordsLabel.textContent = 'Popular Keywords:';
    searchSuggestionsKeywords.append(keywordsLabel);
    const keywordsTokensWrap = document.createElement('div');
    keywordsTokensWrap.classList.add('tokens-wrap');
    keywordsTokensWrap.setAttribute('data-once', 'search-stop-propagation');
    const keywordsUl = document.createElement('ul');
    keywordsUl.setAttribute('data-once', 'search-stop-propagation');
    searchKeywordItems.forEach((item) => {
      const li = document.createElement('li');
      li.setAttribute('data-once', 'search-stop-propagation');
      li.textContent = item.querySelector('div').textContent.trim();
      keywordsUl.append(li);
      moveInstrumentation(item, li);
    });
    keywordsTokensWrap.append(keywordsUl);
    searchSuggestionsKeywords.append(keywordsTokensWrap);
    searchWrapInner.append(searchSuggestionsKeywords);

    const searchSuggestionsRecommendations = document.createElement('div');
    searchSuggestionsRecommendations.classList.add('search-suggestions-wrap');
    searchSuggestionsRecommendations.setAttribute('data-once', 'search-stop-propagation');
    const recommendationsLabel = document.createElement('div');
    recommendationsLabel.classList.add('label');
    recommendationsLabel.setAttribute('data-once', 'search-stop-propagation');
    recommendationsLabel.textContent = 'Recommended for you:';
    searchSuggestionsRecommendations.append(recommendationsLabel);
    const recommendationsTokensWrap = document.createElement('div');
    recommendationsTokensWrap.classList.add('tokens-wrap');
    recommendationsTokensWrap.setAttribute('data-once', 'search-stop-propagation');
    const recommendationsUl = document.createElement('ul');
    recommendationsUl.setAttribute('data-once', 'search-stop-propagation');
    searchRecommendationItems.forEach((item) => {
      const li = document.createElement('li');
      li.setAttribute('data-once', 'search-stop-propagation');
      li.textContent = item.querySelector('div').textContent.trim();
      recommendationsUl.append(li);
      moveInstrumentation(item, li);
    });
    recommendationsTokensWrap.append(recommendationsUl);
    searchSuggestionsRecommendations.append(recommendationsTokensWrap);
    searchWrapInner.append(searchSuggestionsRecommendations);

    searchLi.append(searchScreenWrap);
    ul.append(searchLi);

    return ul;
  };

  mobileIconNav.append(createIconNavList(true));
  desktopIconNav.append(createIconNavList(false));

  navUl.append(mobileIconNav);
  navUl.append(desktopIconNav);
  wrap.append(nav);

  // 80th Year Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const year80LogoAnchor = document.createElement('a');
  const year80LogoLink = year80LogoLinkRow.querySelector('a');
  if (year80LogoLink) {
    year80LogoAnchor.href = year80LogoLink.href;
  }
  const year80LogoPicture = year80LogoRow.querySelector('picture');
  if (year80LogoPicture) {
    const img = year80LogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    year80LogoAnchor.append(optimizedPic);
    year80LogoAnchor.querySelector('img').classList.add('hiddenlogo1', 'years-80');
  }
  moveInstrumentation(year80LogoRow, year80LogoAnchor);
  year80LogoDiv.append(year80LogoAnchor);
  wrap.append(year80LogoDiv);

  block.replaceChildren(header);

  // Add event listeners for search toggle
  const searchToggleButtons = header.querySelectorAll('.search > a');
  const searchScreen = header.querySelector('.search-screen-wrap');
  const searchInput = header.querySelector('#searchInput');

  searchToggleButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      searchScreen.classList.toggle('active');
      button.querySelector('.lens').classList.toggle('active');
      button.querySelector('.close').classList.toggle('active');
      if (searchScreen.classList.contains('active')) {
        searchInput.focus();
      }
    });
  });

  searchScreen.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('click', () => {
    searchScreen.classList.remove('active');
    header.querySelectorAll('.search > a .lens').forEach((el) => el.classList.remove('active'));
    header.querySelectorAll('.search > a .close').forEach((el) => el.classList.remove('active'));
  });

  // Hamburger menu toggle
  const hamburgerButton = header.querySelector('.hamburger');
  const mainNav = header.querySelector('.main-nav');
  hamburgerButton.addEventListener('click', () => {
    hamburgerButton.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Scroll behavior for header
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight) {
      header.classList.add('nav-up');
    } else if (window.scrollY < lastScrollY || window.scrollY <= 0) {
      header.classList.remove('nav-up');
    }
    lastScrollY = window.scrollY;
  });

  // Swiper for search results
  const swiperEl = header.querySelector('.scrollSwiper');
  if (swiperEl) {
    await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
    // eslint-disable-next-line no-undef
    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      spaceBetween: 10,
      loop: false,
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,
      },
    });
  }
}
