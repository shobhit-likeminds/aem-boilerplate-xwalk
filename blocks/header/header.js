import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    mobileLogoRow,
    secondaryLogoRow,
    ...navItemRows
  ] = [...block.children];

  const headerFullWrp = document.createElement('section');
  headerFullWrp.classList.add('header-full-wrp', 'fixed'); // nav-up is a scroll state class, do not add initially

  // Top Head
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
  mainNavBx.append(mainNavContainer);
  headerFullWrp.append(mainNavBx);

  const row = document.createElement('div');
  row.classList.add('row');
  mainNavContainer.append(row);

  // Col 1: Logo and Mobile Elements
  const col1 = document.createElement('div');
  col1.classList.add('col-md-2', 'col-6');
  row.append(col1);

  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-wrp');
  const logoHref = logoLinkRow.querySelector('a')?.href;
  if (logoHref) logoLink.href = logoHref;
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(logoImg, optimizedLogo.querySelector('img'));
    logoLink.append(optimizedLogo);
  }
  col1.append(logoLink);

  const mobileLogoPicture = mobileLogoRow.querySelector('picture');
  if (mobileLogoPicture) {
    const mobileLogoDiv = document.createElement('picture');
    mobileLogoDiv.classList.add('image-holder', 'tata-logo-mob');
    const mobileLogoImg = mobileLogoPicture.querySelector('img');
    const optimizedMobileLogo = createOptimizedPicture(mobileLogoImg.src, mobileLogoImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(mobileLogoImg, optimizedMobileLogo.querySelector('img'));
    mobileLogoDiv.append(optimizedMobileLogo);
    col1.append(mobileLogoDiv);
  }

  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  navIcon4.innerHTML = '<span></span><span></span><span></span>';
  col1.append(navIcon4);

  const switchButton = document.createElement('button');
  switchButton.id = 'switch2';
  switchButton.innerHTML = 'Mode <strong><span class="switch2_light">Light</span> <span class="switch2_dark">Dark</span></strong>';
  col1.append(switchButton);

  // Col 2: Navigation
  const col2 = document.createElement('div');
  col2.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');
  row.append(col2);

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');
  col2.append(navCard);

  const closeMobDrop = document.createElement('a');
  closeMobDrop.href = 'javascript:void(0)';
  closeMobDrop.classList.add('close-mob-drop');
  // Create a dummy image for the close button, as the original image path is hardcoded
  const closeImg = document.createElement('img');
  closeImg.alt = 'close';
  closeImg.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\'/%3E%3C/svg%3E';
  closeImg.classList.add('img-fluid');
  closeMobDrop.append(closeImg);
  navCard.append(closeMobDrop);

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');
  navCard.append(level1Ul);

  navItemRows.forEach((rowItem) => {
    const [labelCell, linkCell, linkLabelCell, subLinksCell] = [...rowItem.children];
    const li = document.createElement('li');
    moveInstrumentation(rowItem, li);

    const subList = subLinksCell?.querySelector('ul');

    if (subList) {
      li.classList.add('level1');
      const triggerLink = document.createElement('a');
      triggerLink.href = 'javascript:void(0)';
      triggerLink.textContent = labelCell?.textContent.trim() || '';
      li.append(triggerLink);

      const level2Ul = document.createElement('ul');
      level2Ul.classList.add('level2');
      moveInstrumentation(subLinksCell, level2Ul);
      // Move children from original subList (ul) to new level2Ul
      while (subList.firstChild) {
        level2Ul.append(subList.firstChild);
      }

      // Transform nested lists within level2Ul
      transformNestedLists(level2Ul);

      li.append(level2Ul);

      triggerLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active');
        level2Ul.classList.toggle('active'); // Use 'active' for visibility, controlled by CSS
      });
    } else {
      li.classList.add('no-arrw-mob');
      const anchor = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim() || '';
      moveInstrumentation(linkCell, anchor);
      li.append(anchor);
    }
    level1Ul.append(li);
  });

  const logoWrp2 = document.createElement('a');
  logoWrp2.href = 'https://www.tata.com/';
  logoWrp2.classList.add('logo-wrp2');
  logoWrp2.target = '_blank';
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const secondaryLogoImg = secondaryLogoPicture.querySelector('img');
    const optimizedSecondaryLogo = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(secondaryLogoImg, optimizedSecondaryLogo.querySelector('img'));
    logoWrp2.append(optimizedSecondaryLogo);
  }
  navCard.append(logoWrp2);

  // Search section (initially hidden)
  const cdSearch = document.createElement('div');
  cdSearch.classList.add('cd-search');
  cdSearch.style.display = 'none'; // Hidden by default
  cdSearch.innerHTML = `
    <div class="container">
      <div class="input-group">
        <input class="form-control border-end-0 border" type="search" value="search" id="example-search-input">
        <span class="input-group-append">
          <button class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5" type="button">
            <i class="fa fa-search"></i>
          </button>
        </span>
      </div>
    </div>
  `;
  headerFullWrp.append(cdSearch);

  // Toggle mobile navigation
  navIcon4.addEventListener('click', () => {
    navCard.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden'); // Example: prevent body scroll
  });

  closeMobDrop.addEventListener('click', (e) => {
    e.preventDefault();
    navCard.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  });

  // Toggle switch button (Light/Dark mode)
  switchButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Assuming 'dark-mode' class controls the theme
  });

  // Optimize all images in the header
  headerFullWrp.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(headerFullWrp);
}

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('has-sub-child'); // Use the class from original site CSS
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a') || li;
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Critical: prevents parent accordion from also toggling
        li.classList.toggle('active');
        subWrap.classList.toggle('active');
      });
    }
  });
}
