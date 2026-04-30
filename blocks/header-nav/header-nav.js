import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Add classes to <li> and <a> elements based on ORIGINAL HTML
    li.classList.add('level1'); // Assuming all list items in the hierarchy are level1 initially
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
      anchor.classList.add('level1-link'); // Add a class to the anchor if it exists
    }

    if (nested) {
      nested.remove(); // Remove the original ul to re-wrap it
      nested.classList.add('level2'); // Add class to the nested ul itself
      const subWrap = document.createElement('div');
      subWrap.classList.add('level2'); // Use class from ORIGINAL HTML for the wrapper
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

      // Add "mob-back" for mobile navigation
      const mobBack = document.createElement('li');
      mobBack.classList.add('mob-back');
      // Using inline SVG for the arrow as per Rule 16 & 25.4
      mobBack.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`;
      subWrap.prepend(mobBack);

      mobBack.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.remove('active');
        subWrap.classList.remove('active');
      });
    }
  });
}

export default async function decorate(block) {
  const children = [...block.children];

  const [
    logoDesktopCell,
    logoDesktopLinkCell,
    logoMobileCell,
    closeNavIconCell,
    secondaryLogoCell,
    secondaryLogoLinkCell,
    ...navigationItemRows
  ] = children;

  const headerFullWrp = document.createElement('section');
  headerFullWrp.classList.add('header-full-wrp', 'fixed');
  moveInstrumentation(block, headerFullWrp);

  // Top Head (empty in EDS, but keeping structure for consistency)
  const topHead = document.createElement('div');
  topHead.classList.add('top-head');
  const topHeadContainer = document.createElement('div');
  topHeadContainer.classList.add('container-1600-wrp');
  topHead.append(topHeadContainer);
  headerFullWrp.append(topHead);

  // Main Nav Box
  const mainNavBx = document.createElement('div');
  mainNavBx.classList.add('main-nav-bx');
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('container-1600-wrp');
  const mainNavRow = document.createElement('div');
  mainNavRow.classList.add('row');

  // Col-md-2 (Logo and Mobile Nav Toggle)
  const colMd2 = document.createElement('div');
  colMd2.classList.add('col-md-2', 'col-6');

  const logoWrp = document.createElement('a');
  logoWrp.classList.add('logo-wrp');
  logoWrp.href = logoDesktopLinkCell?.querySelector('a')?.href || '#';
  moveInstrumentation(logoDesktopLinkCell, logoWrp);
  const desktopLogoPicture = logoDesktopCell?.querySelector('picture');
  if (desktopLogoPicture) {
    const optimizedDesktopPic = createOptimizedPicture(
      desktopLogoPicture.querySelector('img').src,
      desktopLogoPicture.querySelector('img').alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(logoDesktopCell, optimizedDesktopPic.querySelector('img'));
    logoWrp.append(optimizedDesktopPic);
  }
  colMd2.append(logoWrp);

  const mobileLogoPicture = logoMobileCell?.querySelector('picture');
  if (mobileLogoPicture) {
    const optimizedMobilePic = createOptimizedPicture(
      mobileLogoPicture.querySelector('img').src,
      mobileLogoPicture.querySelector('img').alt,
      false,
      [{ width: '750' }],
    );
    optimizedMobilePic.classList.add('image-holder', 'tata-logo-mob');
    moveInstrumentation(logoMobileCell, optimizedMobilePic.querySelector('img'));
    colMd2.append(optimizedMobilePic);
  }

  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  navIcon4.innerHTML = '<span></span><span></span><span></span>';
  colMd2.append(navIcon4);

  // Mode Switcher (static from original HTML)
  const switch2 = document.createElement('button');
  switch2.id = 'switch2';
  switch2.innerHTML = `
    Mode
    <strong>
      <span class="switch2_light">Light</span>
      <span class="switch2_dark">Dark</span>
    </strong>
  `;
  colMd2.append(switch2);

  mainNavRow.append(colMd2);

  // Col-md-10 (Navigation)
  const colMd10 = document.createElement('div');
  colMd10.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');

  const closeMobDrop = document.createElement('a');
  closeMobDrop.classList.add('close-mob-drop');
  closeMobDrop.href = 'javascript:void(0)'; // No functional link
  const closeNavIcon = closeNavIconCell?.querySelector('picture');
  if (closeNavIcon) {
    const optimizedCloseIcon = createOptimizedPicture(
      closeNavIcon.querySelector('img').src,
      closeNavIcon.querySelector('img').alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(closeNavIconCell, optimizedCloseIcon.querySelector('img'));
    closeMobDrop.append(optimizedCloseIcon);
  } else {
    // Fallback for missing close icon (Rule 16)
    closeMobDrop.textContent = 'X';
  }
  navCard.append(closeMobDrop);

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');

  navigationItemRows.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // Create a temporary div to parse the richtext HTML and apply instrumentation
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = hierarchyCell?.innerHTML || '';
    const hierarchyRoot = tempDiv.querySelector('ul');

    if (hierarchyRoot) {
      li.classList.add('level1'); // Add level1 class for items with sub-menus
      const trigger = document.createElement('a');
      trigger.href = 'javascript:void(0)'; // No direct link for parent with sub-menu
      trigger.textContent = labelCell?.textContent.trim() || '';
      li.appendChild(trigger);

      const wrapper = document.createElement('div');
      wrapper.classList.add('level2'); // Use class from ORIGINAL HTML for the wrapper

      // Move instrumentation from the original hierarchyCell to the new hierarchyRoot
      moveInstrumentation(hierarchyCell, hierarchyRoot);

      // Apply classes to nested elements within the hierarchyRoot
      hierarchyRoot.querySelectorAll('ul').forEach(ul => ul.classList.add('level2'));
      hierarchyRoot.querySelectorAll('li').forEach(liItem => liItem.classList.add('level1')); // Assuming all list items are level1 initially
      hierarchyRoot.querySelectorAll('a').forEach(a => a.classList.add('level1-link')); // Add a class to the anchor if it exists

      wrapper.appendChild(hierarchyRoot);
      li.appendChild(wrapper);

      // Add "mob-back" for mobile navigation
      const mobBack = document.createElement('li');
      mobBack.classList.add('mob-back');
      // Using inline SVG for the arrow as per Rule 16 & 25.4
      mobBack.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`;
      wrapper.prepend(mobBack);

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active');
        wrapper.classList.toggle('active');
      });

      mobBack.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.remove('active');
        wrapper.classList.remove('active');
      });

      transformNestedLists(hierarchyRoot);
    } else {
      li.classList.add('no-arrw-mob');
      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = labelCell?.textContent.trim() || '';
      li.appendChild(anchor);
    }
    level1Ul.append(li);
  });

  navCard.append(level1Ul);

  const logoWrp2 = document.createElement('a');
  logoWrp2.classList.add('logo-wrp2');
  logoWrp2.href = secondaryLogoLinkCell?.querySelector('a')?.href || '#';
  logoWrp2.target = '_blank';
  moveInstrumentation(secondaryLogoLinkCell, logoWrp2);

  const secondaryLogoPicture = secondaryLogoCell?.querySelector('picture');
  if (secondaryLogoPicture) {
    const optimizedSecondaryPic = createOptimizedPicture(
      secondaryLogoPicture.querySelector('img').src,
      secondaryLogoPicture.querySelector('img').alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(secondaryLogoCell, optimizedSecondaryPic.querySelector('img'));
    logoWrp2.append(optimizedSecondaryPic);
  } else {
    // Fallback for secondary logo if not an image (e.g., SVG markup from original HTML)
    // Using inline SVG markup as per Rule 16
    logoWrp2.innerHTML = `
      <svg width="136" height="29" viewBox="0 0 132 29" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M47.7871 4H68.0379V10.1893H62.2283V25.064H53.79V10.1893H47.7871V4ZM78.2938 12.5107L74.0302 25.064H65.9264L73.8743 4H82.6752L90.8147 25.064H82.6113L78.2938 12.5107ZM88.8788 4H109.129V10.1893H103.321V25.064H94.883V10.1893H88.8788V4ZM119.388 12.5107L115.123 25.064H107.019L114.97 4H123.768L131.905 25.064H123.704L119.388 12.5107Z" fill="white"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M40.9057 9.39853C40.4014 8.40989 39.7373 7.46232 38.9111 6.57372C37.0544 4.5759 34.4347 2.91345 31.3346 1.76686C28.209 0.611392 24.6439 0 21.021 0C17.3982 0 13.8331 0.611392 10.7091 1.76686C7.60735 2.91359 4.98759 4.57603 3.13089 6.57372C2.30522 7.46219 1.63891 8.41108 1.13477 9.40025C5.17074 8.42724 12.0745 7.14258 18.4847 7.00676C19.1031 6.99351 19.5288 7.19094 19.8091 7.54514C20.1506 7.97645 20.1249 9.51394 20.1166 10.2018L19.9343 27.9804C20.2953 27.9923 20.658 28 21.021 28C21.3871 28 21.7518 27.994 22.1128 27.9821L21.9306 10.2017C21.9211 9.51394 21.8947 7.97632 22.2374 7.54501C22.5183 7.19094 22.9426 6.99351 23.5608 7.00663C29.9684 7.14139 36.8705 8.42632 40.9057 9.39853Z" fill="white"></path>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M41.7679 11.7104C35.8609 10.3791 31.9161 10.1329 28.0238 9.91753C24.631 9.7295 24.5867 10.9373 24.9254 13.2455C24.9476 13.3863 24.9748 13.5639 25.0071 13.7664C26.1451 20.4861 27.5623 26.2687 27.8058 27.2502C36.0771 25.3653 42.0422 20.1393 42.0422 14.0002C42.0422 13.2272 41.9485 12.4613 41.7679 11.7104ZM17.1208 13.2455C17.4599 10.9374 17.4164 9.7295 14.024 9.91753C10.1304 10.1329 6.18469 10.3789 0.275401 11.7112C0.0949015 12.4621 0 13.227 0 14.0001C0 16.6534 1.08273 19.2209 3.13149 21.4268C4.98818 23.4246 7.60795 25.087 10.7097 26.2344C11.8323 26.6488 13.0169 26.9884 14.2372 27.26C14.4663 26.3406 15.916 20.4376 17.0663 13.5977C17.0876 13.4666 17.1073 13.3456 17.1208 13.2455Z" fill="white"></path>
      </svg>
    `;
  }
  navCard.append(logoWrp2);

  colMd10.append(navCard);
  mainNavRow.append(colMd10);
  mainNavContainer.append(mainNavRow);
  mainNavBx.append(mainNavContainer);
  headerFullWrp.append(mainNavBx);

  // Search (static from original HTML)
  const cdSearch = document.createElement('div');
  cdSearch.classList.add('cd-search');
  cdSearch.style.display = 'none'; // Initially hidden
  cdSearch.innerHTML = `
    <div class="container">
      <div class="input-group">
        <input class="form-control border-end-0 border" type="search" value="search" id="example-search-input"/>
        <span class="input-group-append">
          <button class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5" type="button">
            <i class="fa fa-search"></i>
          </button>
        </span>
      </div>
    </div>
  `;
  headerFullWrp.append(cdSearch);

  block.replaceChildren(headerFullWrp);

  // Event listeners for mobile navigation toggle
  const navToggle = document.getElementById('nav-icon4');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navCard.classList.toggle('open');
    document.body.classList.toggle('no-scroll'); // Add/remove no-scroll class to body
  });

  closeMobDrop.addEventListener('click', (e) => {
    e.preventDefault();
    navToggle.classList.remove('open');
    navCard.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });

  // Scroll behavior for header (Rule 19)
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 0) {
      headerFullWrp.classList.add('nav-up');
    } else {
      headerFullWrp.classList.remove('nav-up');
    }
    lastScrollY = window.scrollY;
  });
}
