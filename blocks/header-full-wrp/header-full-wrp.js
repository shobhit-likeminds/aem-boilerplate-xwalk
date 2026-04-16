import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    mobileLogoRow,
    secondaryLogoRow,
    secondaryLogoLinkRow,
    secondaryLogoLinkLabelRow,
    ...navItemRows
  ] = [...block.children];

  block.classList.add('fixed'); // Add 'fixed' class as per original HTML

  const topHead = document.createElement('div');
  topHead.classList.add('top-head');
  const topHeadContainer = document.createElement('div');
  topHeadContainer.classList.add('container-1600-wrp');
  topHead.append(topHeadContainer);

  const mainNavBx = document.createElement('div');
  mainNavBx.classList.add('main-nav-bx');
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('container-1600-wrp');
  const mainNavRow = document.createElement('div');
  mainNavRow.classList.add('row');
  mainNavContainer.append(mainNavRow);
  mainNavBx.append(mainNavContainer);

  // Column 1: Logo, Mobile Logo, Nav Icon, Mode Switch
  const col1 = document.createElement('div');
  col1.classList.add('col-md-2', 'col-6');
  mainNavRow.append(col1);

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-wrp');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  } else {
    logoLink.href = '#'; // Fallback if no link
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    if (logoImg) {
      const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '100' }]);
      optimizedLogo.querySelector('img').classList.add('img-fluid');
      moveInstrumentation(logoRow, optimizedLogo.querySelector('img'));
      logoLink.append(optimizedLogo);
    }
  }
  col1.append(logoLink);

  // Mobile Logo
  const mobileLogoPicture = mobileLogoRow.querySelector('picture');
  if (mobileLogoPicture) {
    const mobileLogoImg = mobileLogoPicture.querySelector('img');
    if (mobileLogoImg) {
      const mobileLogoHolder = document.createElement('picture');
      mobileLogoHolder.classList.add('image-holder', 'tata-logo-mob');
      const optimizedMobileLogo = createOptimizedPicture(mobileLogoImg.src, mobileLogoImg.alt, false, [{ width: '100' }]);
      optimizedMobileLogo.querySelector('img').classList.add('img-fluid');
      moveInstrumentation(mobileLogoRow, optimizedMobileLogo.querySelector('img'));
      mobileLogoHolder.append(optimizedMobileLogo.querySelector('img'));
      col1.append(mobileLogoHolder);
    }
  }

  // Nav Icon
  const navIcon = document.createElement('div');
  navIcon.id = 'nav-icon4';
  for (let i = 0; i < 3; i += 1) {
    navIcon.append(document.createElement('span'));
  }
  col1.append(navIcon);

  // Mode Switch (hardcoded as per original HTML structure)
  const switchBtn = document.createElement('button');
  switchBtn.id = 'switch2';
  switchBtn.innerHTML = `
    Mode  
    <strong>
      <span class="switch2_light">Light</span> 
      <span class="switch2_dark">Dark</span> 
    </strong>
  `;
  col1.append(switchBtn);

  // Column 2: Main Navigation
  const col2 = document.createElement('div');
  col2.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');
  mainNavRow.append(col2);

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');
  col2.append(navCard);

  // Close Mobile Drop
  const closeMobDrop = document.createElement('a');
  closeMobDrop.href = 'javascript:void(0)';
  closeMobDrop.classList.add('close-mob-drop');
  const closeImg = document.createElement('img');
  closeImg.src = '/icons/close.png'; // Assuming an icon path, original was hardcoded DAM
  closeImg.alt = '';
  closeImg.classList.add('img-fluid');
  closeMobDrop.append(closeImg);
  navCard.append(closeMobDrop);

  // Level 1 Navigation List
  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');
  navCard.append(level1Ul);

  navItemRows.forEach((row) => {
    // Corrected: Using destructuring for navItemRows as per BlockJson model
    const [labelCell, linkCell, linkLabelCell, subLinksCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');

    if (subList) {
      li.classList.add('level1'); // Add level1 class for items with sub-menus
      const triggerLink = document.createElement('a');
      triggerLink.href = 'javascript:void(0)'; // Trigger for dropdown
      triggerLink.textContent = labelCell?.textContent.trim() || '';
      li.append(triggerLink);

      const level2Ul = document.createElement('ul');
      level2Ul.classList.add('level2');
      moveInstrumentation(subLinksCell, level2Ul);
      // Move all children from subLinksCell to level2Ul
      while (subLinksCell.firstChild) {
        level2Ul.append(subLinksCell.firstChild);
      }

      // Add mob-back item with arrow image (hardcoded as per original HTML structure)
      const mobBackLi = document.createElement('li');
      mobBackLi.classList.add('mob-back');
      const mobBackImg = document.createElement('img');
      mobBackImg.src = '/icons/mob-level2-arrw.png'; // Assuming an icon path, original was hardcoded DAM
      mobBackImg.alt = '';
      mobBackLi.append(mobBackImg);
      level2Ul.prepend(mobBackLi);

      li.append(level2Ul);

      // Event listener for dropdown toggle
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
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell.textContent.trim();
      li.append(anchor);
    }
    level1Ul.append(li);
  });

  // Secondary Logo (for footer-like section in nav-card)
  const secondaryLogoLink = document.createElement('a');
  secondaryLogoLink.classList.add('logo-wrp2');
  secondaryLogoLink.target = '_blank';
  const foundSecondaryLogoLink = secondaryLogoLinkRow.querySelector('a');
  if (foundSecondaryLogoLink) {
    secondaryLogoLink.href = foundSecondaryLogoLink.href;
  } else {
    secondaryLogoLink.href = '#'; // Fallback
  }
  moveInstrumentation(secondaryLogoLinkRow, secondaryLogoLink);

  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const secondaryLogoImg = secondaryLogoPicture.querySelector('img');
    if (secondaryLogoImg) {
      const optimizedSecondaryLogo = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt, false, [{ width: '100' }]);
      optimizedSecondaryLogo.querySelector('img').alt = 'svg file';
      moveInstrumentation(secondaryLogoRow, optimizedSecondaryLogo.querySelector('img'));
      secondaryLogoLink.append(optimizedSecondaryLogo);
    }
  }
  navCard.append(secondaryLogoLink);

  // Search section (hardcoded as per original HTML structure)
  const cdSearch = document.createElement('div');
  cdSearch.classList.add('cd-search');
  cdSearch.style.display = 'none'; // Initially hidden
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

  block.textContent = '';
  block.append(topHead, mainNavBx, cdSearch);

  // Toggle mobile navigation
  navIcon.addEventListener('click', () => {
    navIcon.classList.toggle('open');
    navCard.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  closeMobDrop.addEventListener('click', (e) => {
    e.preventDefault();
    navIcon.classList.remove('open');
    navCard.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });

  // Toggle dark/light mode
  switchBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Assuming 'dark-mode' class controls the theme
  });

  // Scroll behavior (as per original site's JS, not in EDS block.js)
  // This is an example of how to implement the 'nav-up' behavior if needed.
  // Do NOT add 'nav-up' to initial classList, it will hide the header permanently.
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      block.classList.add('nav-up');
    } else {
      block.classList.remove('nav-up');
    }
    lastScrollY = window.scrollY;
  });
}
