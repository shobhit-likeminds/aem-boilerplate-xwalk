import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    // Handle label-only nodes
    const anchor = li.querySelector(':scope > a');
    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
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

export default function decorate(block) {
  const children = [...block.children];

  const [
    logoRow,
    logoLinkRow,
    anniversaryLogoRow,
    anniversaryLogoLinkRow,
    ...itemRows
  ] = children;

  block.innerHTML = '';
  block.classList.remove('nav-up'); // Remove scroll-state class

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('container');
  block.append(headerContainer);

  const wrapDiv = document.createElement('div');
  wrapDiv.classList.add('wrap');
  headerContainer.append(wrapDiv);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  } else {
    logoLink.href = '#';
  }

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1'); // Add class from original HTML
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);
  moveInstrumentation(logoRow, logoDiv);
  wrapDiv.append(logoDiv);

  // Hamburger menu
  const hamburgerDiv = document.createElement('div');
  hamburgerDiv.classList.add('hamburger');
  const hamburgerUl = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    hamburgerUl.append(document.createElement('li'));
  }
  hamburgerDiv.append(hamburgerUl);
  wrapDiv.append(hamburgerDiv);

  // Main Nav
  const mainNav = document.createElement('nav');
  mainNav.classList.add('main-nav');
  const mainNavUl = document.createElement('ul');
  mainNavUl.setAttribute('itemscope', '');
  mainNavUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  mainNav.append(mainNavUl);
  wrapDiv.append(mainNav);

  // Separate item rows by type
  const navigationItems = itemRows.filter((row) => row.children.length === 6);
  const pressReleaseItems = itemRows.filter((row) => row.children.length === 4);
  const iconNavItems = itemRows.filter((row) => row.children.length === 3);

  // Navigation Menu
  navigationItems.forEach((row) => {
    const [labelCell, linkCell, iconCell, hierarchyCell, descriptionCell, subDescriptionCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');

    const foundLink = linkCell.querySelector('a');
    let anchor;
    if (foundLink) {
      anchor = document.createElement('a');
      anchor.href = foundLink.href;
      anchor.setAttribute('itemprop', 'url');
    } else {
      anchor = document.createElement('span'); // If no link, still provide a clickable element
    }
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(labelCell, anchor);
    li.append(anchor);

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const iconSpan = document.createElement('span');
      // Use the SVG content from the original HTML
      iconSpan.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776678565987.svg+xml"/>';
      li.append(iconSpan);
    }

    const hierarchyRoot = hierarchyCell.querySelector('ul');
    if (hierarchyRoot) {
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
      const headingAnchor = document.createElement('a');
      headingAnchor.textContent = labelCell.textContent.trim();
      leftDivHeading.append(headingAnchor);
      leftDiv.append(leftDivHeading);

      const leftDivDesc = document.createElement('p');
      leftDivDesc.classList.add('left-div-desc');
      leftDivDesc.textContent = descriptionCell.textContent.trim();
      leftDiv.append(leftDivDesc);

      const leftDivSubDesc = document.createElement('p');
      leftDivSubDesc.classList.add('left-div-subdesc');
      leftDivSubDesc.textContent = subDescriptionCell.textContent.trim();
      leftDiv.append(leftDivSubDesc);

      centerDiv.append(leftDiv);

      const subNavWrap = document.createElement('div');
      subNavWrap.classList.add('sub-nav-wrap', 'about-us-sub-nav');
      // Use a temporary div to parse innerHTML and apply classes
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      moveInstrumentation(hierarchyCell, tempDiv);

      tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('')); // No specific class for UL in original HTML for this section
      tempDiv.querySelectorAll('li').forEach(li => li.classList.add('')); // No specific class for LI in original HTML for this section
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('')); // No specific class for A in original HTML for this section

      // Move children from tempDiv to subNavWrap
      while (tempDiv.firstChild) {
        subNavWrap.append(tempDiv.firstChild);
      }
      transformNestedLists(subNavWrap.querySelector('ul')); // Apply transformations to nested lists
      centerDiv.append(subNavWrap);

      megaMenuWrap.append(centerDiv);
      megaMenu.append(megaMenuWrap);
      li.append(megaMenu);

      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active');
        megaMenu.classList.toggle('active');
      });
    }
    moveInstrumentation(row, li);
    mainNavUl.append(li);
  });

  // Press Releases (as a dedicated menu item)
  if (pressReleaseItems.length > 0) {
    const li = document.createElement('li');
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');

    const anchor = document.createElement('a');
    anchor.href = 'https://www.mahindra.com/newsroom'; // Link to newsroom based on original HTML
    anchor.setAttribute('itemprop', 'url');
    anchor.textContent = 'Newsroom'; // Hardcoded label based on original HTML

    const iconSpan = document.createElement('span');
    iconSpan.innerHTML = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776678565987.svg+xml"/>'; // Use the SVG content from the original HTML
    li.append(anchor, iconSpan);

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
    const headingAnchor = document.createElement('a');
    headingAnchor.textContent = 'Newsroom';
    leftDivHeading.append(headingAnchor);
    leftDiv.append(leftDivHeading);

    const latestPressReleaseDiv = document.createElement('div');
    latestPressReleaseDiv.classList.add('latest-two-press-release');
    pressReleaseItems.slice(0, 2).forEach((prRow) => {
      const [prLinkCell, prTitleCell, prDateCell, prCategoryCell] = [...prRow.children];
      const slidesDiv = document.createElement('div');
      slidesDiv.classList.add('slides');
      const prWrap = document.createElement('div');
      prWrap.classList.add('wrap');
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('content');
      const descDiv = document.createElement('div');
      descDiv.classList.add('desc');

      const prLink = document.createElement('a');
      const foundPrLink = prLinkCell.querySelector('a');
      if (foundPrLink) prLink.href = foundPrLink.href;
      prLink.textContent = prTitleCell.textContent.trim();
      const p = document.createElement('p');
      p.append(prLink);
      descDiv.append(p);

      const dateDiv = document.createElement('div');
      dateDiv.classList.add('date');
      const dateEm = document.createElement('em');
      dateEm.textContent = prDateCell.textContent.trim();
      const categoryEm = document.createElement('em');
      categoryEm.textContent = prCategoryCell.textContent.trim();
      dateDiv.append(dateEm, categoryEm);
      descDiv.append(dateDiv);

      contentDiv.append(descDiv);
      prWrap.append(contentDiv);
      slidesDiv.append(prWrap);
      latestPressReleaseDiv.append(slidesDiv);
      moveInstrumentation(prRow, slidesDiv);
    });
    leftDiv.append(latestPressReleaseDiv);
    centerDiv.append(leftDiv);

    const subNavWrap = document.createElement('div');
    subNavWrap.classList.add('sub-nav-wrap');
    const subNavUl1 = document.createElement('ul');
    const subNavUl1Li1 = document.createElement('li');
    const subNavUl1Li1Link = document.createElement('a');
    subNavUl1Li1Link.href = 'https://www.mahindra.com/newsroom/press-release';
    subNavUl1Li1Link.textContent = 'Press Releases';
    subNavUl1Li1.append(subNavUl1Li1Link);
    const subNavUl1Li2 = document.createElement('li');
    const subNavUl1Li2Link = document.createElement('a');
    subNavUl1Li2Link.href = 'https://www.mahindra.com/newsroom/corporate-doc';
    subNavUl1Li2Link.textContent = 'Media Resources';
    subNavUl1Li2.append(subNavUl1Li2Link);
    subNavUl1.append(subNavUl1Li1, subNavUl1Li2);
    subNavWrap.append(subNavUl1);

    const subNavUl2 = document.createElement('ul');
    const subNavUl2Li1 = document.createElement('li');
    const subNavUl2Li1Link = document.createElement('a');
    subNavUl2Li1Link.href = 'https://www.mahindra.com/newsroom#in-the-news';
    subNavUl2Li1Link.textContent = 'In The News';
    subNavUl2Li1.append(subNavUl2Li1Link);
    subNavUl2.append(subNavUl2Li1);
    subNavWrap.append(subNavUl2);

    centerDiv.append(subNavWrap);
    megaMenuWrap.append(centerDiv);
    megaMenu.append(megaMenuWrap);
    li.append(megaMenu);

    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      li.classList.toggle('active');
      megaMenu.classList.toggle('active');
    });
    mainNavUl.append(li);
  }

  // Icon Nav (mobile and desktop)
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconNavUl = document.createElement('ul');
  mobileIconNav.append(mobileIconNavUl);

  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconNavUl = document.createElement('ul');
  desktopIconNav.append(desktopIconNavUl);

  iconNavItems.forEach((row) => {
    const [iconCell, linkCell, labelCell] = [...row.children];

    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    } else {
      anchor.href = '#';
    }

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const iconSpan = document.createElement('span');
      // Replace data: URI SVG with inline SVG based on common icons
      let svgContent = '';
      if (labelCell.textContent.trim().toLowerCase() === 'contact us') {
        li.classList.add('mail');
        svgContent = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776678566167.svg+xml"/>';
        anchor.append(iconSpan); // Append icon first
        anchor.append(document.createTextNode(labelCell.textContent.trim())); // Then text
      } else if (labelCell.textContent.trim().toLowerCase() === 'search') {
        li.classList.add('search');
        svgContent = '<img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776678566399.svg+xml"/><img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776678566613.svg+xml"/>';
        anchor.append(iconSpan); // Append icon first
        const searchSpan = document.createElement('span');
        searchSpan.textContent = labelCell.textContent.trim();
        anchor.append(searchSpan);
      }
      iconSpan.innerHTML = svgContent;
    }
    li.append(anchor);
    moveInstrumentation(row, li);
    mobileIconNavUl.append(li.cloneNode(true)); // Clone for mobile
    desktopIconNavUl.append(li); // Original for desktop
  });

  mainNav.append(mobileIconNav);
  wrapDiv.append(desktopIconNav);

  // Anniversary Logo
  const anniversaryLogoDiv = document.createElement('div');
  anniversaryLogoDiv.classList.add('logo', 'year-80-logo');
  const anniversaryLogoLink = document.createElement('a');
  const foundAnniversaryLogoLink = anniversaryLogoLinkRow.querySelector('a');
  if (foundAnniversaryLogoLink) {
    anniversaryLogoLink.href = foundAnniversaryLogoLink.href;
  } else {
    anniversaryLogoLink.href = '#';
  }

  const anniversaryLogoPicture = anniversaryLogoRow.querySelector('picture');
  if (anniversaryLogoPicture) {
    const img = anniversaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1', 'years-80');
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    anniversaryLogoLink.append(optimizedPic);
  }
  anniversaryLogoDiv.append(anniversaryLogoLink);
  moveInstrumentation(anniversaryLogoRow, anniversaryLogoDiv);
  wrapDiv.append(anniversaryLogoDiv);

  // Hamburger click event
  hamburgerDiv.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    hamburgerDiv.classList.toggle('active');
    block.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Search toggle event
  const searchTriggers = block.querySelectorAll('.search > a');
  const searchScreenWrap = document.querySelector('.search-screen-wrap'); // Search screen is usually global, not nested in block
  if (searchTriggers && searchScreenWrap) {
    searchTriggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        searchScreenWrap.classList.toggle('active');
        trigger.closest('.search').classList.toggle('active');
        document.body.classList.toggle('no-scroll');
      });
    });

    searchScreenWrap.addEventListener('click', (e) => {
      if (e.target === searchScreenWrap) {
        searchScreenWrap.classList.remove('active');
        // Find the active search trigger within the block to remove its active class
        block.querySelector('.search.active')?.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });

    // Stop propagation for elements inside search form
    searchScreenWrap.querySelectorAll('[data-once="search-stop-propagation"]').forEach((el) => {
      el.addEventListener('click', (e) => e.stopPropagation());
      el.addEventListener('input', (e) => e.stopPropagation());
    });
  }
}
