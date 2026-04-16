import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    logoMobileRow,
    logoSecondaryRow,
    ...navItemRows
  ] = [...block.children];

  const headerFullWrp = document.createElement('section');
  headerFullWrp.classList.add('header-full-wrp', 'fixed');
  moveInstrumentation(block, headerFullWrp);

  const topHead = document.createElement('div');
  topHead.classList.add('top-head');
  const topHeadContainer = document.createElement('div');
  topHeadContainer.classList.add('container-1600-wrp');
  topHeadContainer.appendChild(document.createElement('ul')); // Empty ul as per original HTML
  topHead.appendChild(topHeadContainer);
  headerFullWrp.appendChild(topHead);

  const mainNavBx = document.createElement('div');
  mainNavBx.classList.add('main-nav-bx');
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('container-1600-wrp');
  const row = document.createElement('div');
  row.classList.add('row');

  const colLeft = document.createElement('div');
  colLeft.classList.add('col-md-2', 'col-6');

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-wrp');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  } else {
    logoLink.href = '#'; // Fallback if link is missing
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    if (logoImg) {
      const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '750' }]);
      optimizedLogoPic.querySelector('img').classList.add('img-fluid');
      moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
      logoLink.appendChild(optimizedLogoPic);
    }
  }
  colLeft.appendChild(logoLink);

  // Logo Mobile
  const logoMobilePicture = logoMobileRow.querySelector('picture');
  if (logoMobilePicture) {
    const logoMobileImg = logoMobilePicture.querySelector('img');
    if (logoMobileImg) {
      const optimizedLogoMobilePic = createOptimizedPicture(logoMobileImg.src, logoMobileImg.alt, false, [{ width: '750' }]);
      optimizedLogoMobilePic.classList.add('image-holder', 'tata-logo-mob');
      optimizedLogoMobilePic.querySelector('img').classList.add('img-fluid');
      moveInstrumentation(logoMobileImg, optimizedLogoMobilePic.querySelector('img'));
      colLeft.appendChild(optimizedLogoMobilePic);
    }
  }

  // Nav Icon
  const navIcon = document.createElement('div');
  navIcon.id = 'nav-icon4';
  navIcon.innerHTML = '<span></span><span></span><span></span>';
  colLeft.appendChild(navIcon);

  // Mode Switch Button (as per original HTML)
  const switchButton = document.createElement('button');
  switchButton.id = 'switch2';
  switchButton.innerHTML = `Mode <strong><span class="switch2_light">Light</span> <span class="switch2_dark">Dark</span></strong>`;
  colLeft.appendChild(switchButton);

  // Add event listener for switch button
  switchButton.addEventListener('click', () => {
    // Example: Toggle a class on the body or a parent element for dark/light mode
    document.body.classList.toggle('dark-mode');
    // You might also want to toggle the text content or classes on the spans inside the button
    const lightSpan = switchButton.querySelector('.switch2_light');
    const darkSpan = switchButton.querySelector('.switch2_dark');
    if (document.body.classList.contains('dark-mode')) {
      lightSpan.style.display = 'none';
      darkSpan.style.display = 'inline';
    } else {
      lightSpan.style.display = 'inline';
      darkSpan.style.display = 'none';
    }
  });

  row.appendChild(colLeft);

  const colRight = document.createElement('div');
  colRight.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');

  const closeMobDrop = document.createElement('a');
  closeMobDrop.classList.add('close-mob-drop');
  closeMobDrop.href = 'javascript:void(0)';
  const closeImg = document.createElement('img');
  closeImg.src = '/etc.clientlibs/tatamotors/clientlibs/clientlib-site/resources/images/close.png'; // Placeholder, ideally from block data
  closeImg.alt = '';
  closeImg.classList.add('img-fluid');
  closeMobDrop.appendChild(closeImg);
  navCard.appendChild(closeMobDrop);

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');

  navItemRows.forEach((rowItem) => {
    const cells = [...rowItem.children];
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('ul') && !cell.querySelector('p'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const linkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('ul') && !cell.querySelector('p') && cell !== labelCell); // Assuming linkLabel is distinct from label
    const subLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p')); // richtext can be <p> or <ul>

    const li = document.createElement('li');
    moveInstrumentation(rowItem, li);

    const subList = subLinksCell?.querySelector('ul');

    if (subList) {
      li.classList.add('level1'); // Add level1 class for items with sub-menus
      const triggerLink = document.createElement('a');
      triggerLink.href = 'javascript:void(0)';
      triggerLink.textContent = labelCell?.textContent.trim() || '';
      li.appendChild(triggerLink);

      const level2Ul = document.createElement('ul');
      level2Ul.classList.add('level2');
      moveInstrumentation(subLinksCell, level2Ul);

      // Add mob-back item if present in original HTML for sub-menus
      const mobBackImg = document.createElement('img');
      mobBackImg.src = '/etc.clientlibs/tatamotors/clientlibs/clientlib-site/resources/images/mob-level2-arrw.png'; // Placeholder
      mobBackImg.alt = '';
      const mobBackLi = document.createElement('li');
      mobBackLi.classList.add('mob-back');
      mobBackLi.appendChild(mobBackImg);
      level2Ul.appendChild(mobBackLi);

      // Move subList content into level2Ul
      while (subList.firstChild) {
        const subLi = document.createElement('li');
        // Check if the firstChild is an anchor or a paragraph containing an anchor
        const childAnchor = subList.firstChild.querySelector('a') || subList.firstChild;
        if (childAnchor.tagName === 'A') {
          subLi.appendChild(childAnchor);
        } else {
          // If it's not an anchor, append the whole child (e.g., a <p> or <li>)
          subLi.appendChild(subList.firstChild);
        }
        level2Ul.appendChild(subLi);
      }
      li.appendChild(level2Ul);

      // Add event listener for dropdown toggle
      triggerLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active');
        level2Ul.classList.toggle('active');
      });

    } else {
      li.classList.add('no-arrw-mob');
      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim() || '';
      li.appendChild(anchor);
    }
    level1Ul.appendChild(li);
  });

  navCard.appendChild(level1Ul);

  // Secondary logo
  const logoWrp2 = document.createElement('a');
  logoWrp2.classList.add('logo-wrp2');
  logoWrp2.href = 'https://www.tata.com/'; // Hardcoded as per original HTML
  logoWrp2.target = '_blank';
  const logoSecondaryPicture = logoSecondaryRow.querySelector('picture');
  if (logoSecondaryPicture) {
    const logoSecondaryImg = logoSecondaryPicture.querySelector('img');
    if (logoSecondaryImg) {
      const optimizedLogoSecondaryPic = createOptimizedPicture(logoSecondaryImg.src, logoSecondaryImg.alt, false, [{ width: '750' }]);
      optimizedLogoSecondaryPic.querySelector('img').alt = 'svg file';
      moveInstrumentation(logoSecondaryImg, optimizedLogoSecondaryPic.querySelector('img'));
      logoWrp2.appendChild(optimizedLogoSecondaryPic);
    }
  }
  navCard.appendChild(logoWrp2);

  colRight.appendChild(navCard);
  row.appendChild(colRight);
  mainNavContainer.appendChild(row);
  mainNavBx.appendChild(mainNavContainer);
  headerFullWrp.appendChild(mainNavBx);

  // Search section (as per original HTML)
  const cdSearch = document.createElement('div');
  cdSearch.classList.add('cd-search');
  cdSearch.style.display = 'none'; // Initially hidden
  const searchContainer = document.createElement('div');
  searchContainer.classList.add('container');
  const inputGroup = document.createElement('div');
  inputGroup.classList.add('input-group');
  inputGroup.innerHTML = `
    <input class="form-control border-end-0 border" type="search" value="search" id="example-search-input">
    <span class="input-group-append">
      <button class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5" type="button">
        <i class="fa fa-search"></i>
      </button>
    </span>
  `;
  searchContainer.appendChild(inputGroup);
  cdSearch.appendChild(searchContainer);
  headerFullWrp.appendChild(cdSearch);

  // Toggle mobile navigation
  navIcon.addEventListener('click', () => {
    navCard.classList.toggle('active');
    navIcon.classList.toggle('open');
  });

  closeMobDrop.addEventListener('click', (e) => {
    e.preventDefault();
    navCard.classList.remove('active');
    navIcon.classList.remove('open');
  });

  block.textContent = '';
  block.append(headerFullWrp);
}
