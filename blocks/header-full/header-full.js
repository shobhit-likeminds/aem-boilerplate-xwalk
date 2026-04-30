import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    // Handle label-only nodes
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
      subWrap.classList.add('level2'); // use ORIGINAL HTML class
      subWrap.append(nested);

      const mobBack = document.createElement('li');
      mobBack.classList.add('mob-back');
      // Using inline SVG for arrow as DAM paths are not available
      mobBack.innerHTML = '<svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 1.5L1.5 8.5L8.5 15.5" stroke="#1D1D1D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      subWrap.prepend(mobBack);

      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
        mobBack.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.remove('active');
          subWrap.classList.remove('active');
        });
      }
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [
    logoDesktopRow,
    logoDesktopLinkRow,
    logoMobileRow,
    closeIconRow,
    logoSecondaryRow,
    logoSecondaryLinkRow,
    modeLabelRow,
    lightLabelRow,
    darkLabelRow,
    ...navigationItemRows
  ] = children;

  const headerFullWrp = document.createElement('section');
  headerFullWrp.classList.add('header-full-wrp', 'fixed');
  // Do NOT add 'nav-up' class initially, it's a scroll state class (Rule 19)
  moveInstrumentation(block, headerFullWrp); // Move instrumentation from the block itself

  const topHead = document.createElement('div');
  topHead.classList.add('top-head');
  const topHeadContainer = document.createElement('div');
  topHeadContainer.classList.add('container-1600-wrp');
  topHead.append(topHeadContainer);
  headerFullWrp.append(topHead);

  const mainNavBx = document.createElement('div');
  mainNavBx.classList.add('main-nav-bx');
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('container-1600-wrp');
  mainNavBx.append(mainNavContainer);
  headerFullWrp.append(mainNavBx);

  const row = document.createElement('div');
  row.classList.add('row');
  mainNavContainer.append(row);

  const colLeft = document.createElement('div');
  colLeft.classList.add('col-md-2', 'col-6');
  row.append(colLeft);

  const logoWrp = document.createElement('a');
  logoWrp.classList.add('logo-wrp');
  logoWrp.href = logoDesktopLinkRow?.querySelector('a')?.href || '#';
  moveInstrumentation(logoDesktopLinkRow, logoWrp); // Move instrumentation for the link
  const logoDesktopPicture = logoDesktopRow?.querySelector('picture');
  if (logoDesktopPicture) {
    const img = logoDesktopPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(logoDesktopRow, optimizedPic.querySelector('img')); // Move instrumentation for the picture
    logoWrp.append(optimizedPic);
  }
  colLeft.append(logoWrp);

  const logoMobilePicture = logoMobileRow?.querySelector('picture');
  if (logoMobilePicture) {
    const pictureEl = document.createElement('picture');
    pictureEl.classList.add('image-holder', 'tata-logo-mob');
    const img = logoMobilePicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(logoMobileRow, optimizedPic.querySelector('img')); // Move instrumentation for the picture
    pictureEl.append(optimizedPic.querySelector('img'));
    colLeft.append(pictureEl);
  }

  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  navIcon4.innerHTML = '<span></span><span></span><span></span>';
  colLeft.append(navIcon4);

  const modeButton = document.createElement('button');
  modeButton.id = 'switch2';
  modeButton.textContent = modeLabelRow?.textContent.trim() || 'Mode';
  moveInstrumentation(modeLabelRow, modeButton); // Move instrumentation for mode label
  const strong = document.createElement('strong');
  const lightSpan = document.createElement('span');
  lightSpan.classList.add('switch2_light');
  lightSpan.textContent = lightLabelRow?.textContent.trim() || 'Light';
  moveInstrumentation(lightLabelRow, lightSpan); // Move instrumentation for light label
  const darkSpan = document.createElement('span');
  darkSpan.classList.add('switch2_dark');
  darkSpan.textContent = darkLabelRow?.textContent.trim() || 'Dark';
  moveInstrumentation(darkLabelRow, darkSpan); // Move instrumentation for dark label
  strong.append(lightSpan, darkSpan);
  modeButton.append(strong);
  colLeft.append(modeButton);

  const colRight = document.createElement('div');
  colRight.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');
  row.append(colRight);

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');
  colRight.append(navCard);

  const closeMobDrop = document.createElement('a');
  closeMobDrop.classList.add('close-mob-drop');
  closeMobDrop.href = 'javascript:void(0)';
  const closeIconPicture = closeIconRow?.querySelector('picture');
  if (closeIconPicture) {
    const img = closeIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(closeIconRow, optimizedPic.querySelector('img')); // Move instrumentation for close icon
    closeMobDrop.append(optimizedPic);
  } else {
    // Fallback if no close icon is provided
    closeMobDrop.textContent = 'X';
  }
  navCard.append(closeMobDrop);

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');
  navCard.append(level1Ul);

  navigationItemRows.forEach((rowEl) => {
    const [labelCell, linkCell, hierarchyCell] = [...rowEl.children];
    const li = document.createElement('li');
    li.classList.add('level1'); // Add level1 class to li as per original HTML

    const foundLink = linkCell?.querySelector('a');
    let rootEl;
    if (foundLink) {
      rootEl = document.createElement('a');
      rootEl.href = foundLink.href;
    } else {
      rootEl = document.createElement('span');
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(rowEl, rootEl); // Move instrumentation from the item row to its root element
    li.appendChild(rootEl);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('level2'); // use ORIGINAL HTML class

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML; // Read innerHTML for richtext
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from richtext cell

      const mobBack = document.createElement('li');
      mobBack.classList.add('mob-back');
      // Using inline SVG for arrow as DAM paths are not available
      mobBack.innerHTML = '<svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 1.5L1.5 8.5L8.5 15.5" stroke="#1D1D1D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      wrapper.appendChild(mobBack);

      // Append all children from the temporary div to the wrapper
      while (tempDiv.firstChild) {
        wrapper.appendChild(tempDiv.firstChild);
      }

      rootEl.addEventListener('click', (e) => {
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

      li.appendChild(wrapper);
      const wrapperUl = wrapper.querySelector('ul');
      if (wrapperUl) {
        transformNestedLists(wrapperUl);
      }
    } else {
      li.classList.add('no-arrw-mob');
    }
    level1Ul.appendChild(li);
  });

  const logoWrp2 = document.createElement('a');
  logoWrp2.classList.add('logo-wrp2');
  logoWrp2.href = logoSecondaryLinkRow?.querySelector('a')?.href || '#';
  moveInstrumentation(logoSecondaryLinkRow, logoWrp2); // Move instrumentation for secondary link
  logoWrp2.target = '_blank'; // Assuming target blank from original HTML
  const logoSecondaryPicture = logoSecondaryRow?.querySelector('picture');
  if (logoSecondaryPicture) {
    const img = logoSecondaryPicture.querySelector('img');
    // For SVG, we might want to embed it directly or handle it differently
    // For now, treating as a regular image.
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(logoSecondaryRow, optimizedPic.querySelector('img')); // Move instrumentation for secondary logo
    logoWrp2.append(optimizedPic);
  } else {
    // Fallback if no secondary logo is provided, using a placeholder SVG
    logoWrp2.innerHTML = `
      <svg width="136" height="29" viewBox="0 0 132 29" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M47.7871 4H68.0379V10.1893H62.2283V25.064H53.79V10.1893H47.7871V4ZM78.2938 12.5107L74.0302 25.064H65.9264L73.8743 4H82.6752L90.8147 25.064H82.6113L78.2938 12.5107ZM88.8788 4H109.129V10.1893H103.321V25.064H94.883V10.1893H88.8788V4ZM119.388 12.5107L115.123 25.064H107.019L114.97 4H123.768L131.905 25.064H123.704L119.388 12.5107Z" fill="white"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M40.9057 9.39853C40.4014 8.40989 39.7373 7.46232 38.9111 6.57372C37.0544 4.5759 34.4347 2.91345 31.3346 1.76686C28.209 0.611392 24.6439 0 21.021 0C17.3982 0 13.8331 0.611392 10.7091 1.76686C7.60735 2.91359 4.98759 4.57603 3.13089 6.57372C2.30522 7.46219 1.63891 8.41108 1.13477 9.40025C5.17074 8.42724 12.0745 7.14258 18.4847 7.00676C19.1031 6.99351 19.5288 7.19094 19.8091 7.54514C20.1506 7.97645 20.1249 9.51394 20.1166 10.2018L19.9343 27.9804C20.2953 27.9923 20.658 28 21.021 28C21.3871 28 21.7518 27.994 22.1128 27.9821L21.9306 10.2017C21.9211 9.51394 21.8947 7.97632 22.2374 7.54501C22.5183 7.19094 22.9426 6.99351 23.5608 7.00663C29.9684 7.14139 36.8705 8.42632 40.9057 9.39853Z" fill="white"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M41.7679 11.7104C35.8609 10.3791 31.9161 10.1329 28.0238 9.91753C24.631 9.7295 24.5867 10.9373 24.9254 13.2455C24.9476 13.3863 24.9748 13.5639 25.0071 13.7664C26.1451 20.4861 27.5623 26.2687 27.8058 27.2502C36.0771 25.3653 42.0422 20.1393 42.0422 14.0002C42.0422 13.2272 41.9485 12.4613 41.7679 11.7104ZM17.1208 13.2455C17.4599 10.9374 17.4164 9.7295 14.024 9.91753C10.1304 10.1329 6.18469 10.3789 0.275401 11.7112C0.0949015 12.4621 0 13.227 0 14.0001C0 16.6534 1.08273 19.2209 3.13149 21.4268C4.98818 23.4246 7.60795 25.087 10.7097 26.2344C11.8323 26.6488 13.0169 26.9884 14.2372 27.26C14.4663 26.3406 15.916 20.4376 17.0663 13.5977C17.0876 13.4666 17.1073 13.3456 17.1208 13.2455Z" fill="white"></path>
      </svg>
    `;
  }
  navCard.append(logoWrp2);

  // Search functionality (from original HTML, but hidden by default)
  const cdSearch = document.createElement('div');
  cdSearch.classList.add('cd-search');
  cdSearch.style.display = 'none'; // Initially hidden as per original HTML
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

  // Event listeners for mobile navigation toggle
  navIcon4.addEventListener('click', () => {
    navCard.classList.toggle('active');
    navIcon4.classList.toggle('open');
    document.body.classList.toggle('no-scroll'); // Assuming this class exists in original CSS
  });

  closeMobDrop.addEventListener('click', () => {
    navCard.classList.remove('active');
    navIcon4.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });

  // Mode button functionality (example toggle)
  modeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Assuming a dark-mode class
  });

  block.replaceChildren(headerFullWrp);

  // Scroll behavior for 'nav-up' class (Rule 19)
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
