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

  // Top Head Section
  const topHead = document.createElement('div');
  topHead.classList.add('top-head');
  const topHeadContainer = document.createElement('div');
  topHeadContainer.classList.add('container-1600-wrp');
  topHead.append(topHeadContainer);

  // Main Nav Box
  const mainNavBx = document.createElement('div');
  mainNavBx.classList.add('main-nav-bx');
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('container-1600-wrp');
  const mainNavRow = document.createElement('div');
  mainNavRow.classList.add('row');
  mainNavContainer.append(mainNavRow);
  mainNavBx.append(mainNavContainer);

  // Column 1: Logo, Mobile Logo, Nav Icon, Switcher
  const col1 = document.createElement('div');
  col1.classList.add('col-md-2', 'col-6');

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-wrp');
  const logoHref = logoLinkRow.querySelector('a')?.href || '#'; // Correctly read href from aem-content cell
  logoLink.href = logoHref;
  moveInstrumentation(logoLinkRow, logoLink);

  const logoImg = logoRow.querySelector('img');
  if (logoImg) {
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    logoLink.append(optimizedLogoPic);
  } else {
    logoLink.textContent = logoLinkLabelRow.textContent.trim();
  }
  col1.append(logoLink);

  // Mobile Logo
  const mobileLogoPicture = mobileLogoRow.querySelector('picture');
  if (mobileLogoPicture) {
    const mobileLogoImg = mobileLogoPicture.querySelector('img');
    const optimizedMobileLogoPic = createOptimizedPicture(mobileLogoImg.src, mobileLogoImg.alt, false, [{ width: '750' }]);
    optimizedMobileLogoPic.classList.add('image-holder', 'tata-logo-mob');
    moveInstrumentation(mobileLogoRow, optimizedMobileLogoPic.querySelector('img'));
    col1.append(optimizedMobileLogoPic);
  }

  // Nav Icon
  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  for (let i = 0; i < 3; i += 1) {
    navIcon4.append(document.createElement('span'));
  }
  col1.append(navIcon4);

  navIcon4.addEventListener('click', () => {
    mainNavBx.classList.toggle('open');
    navIcon4.classList.toggle('open');
  });

  // Switcher (hardcoded from original HTML, as no model field)
  const switcher = document.createElement('button');
  switcher.id = 'switch2';
  switcher.innerHTML = `
    Mode  
    <strong>
      <span class="switch2_light">Light</span> 
      <span class="switch2_dark">Dark</span> 
    </strong>
  `;
  col1.append(switcher);

  mainNavRow.append(col1);

  // Column 2: Navigation
  const col2 = document.createElement('div');
  col2.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');

  // Close Mobile Drop (hardcoded from original HTML, as no model field)
  const closeMobDrop = document.createElement('a');
  closeMobDrop.href = 'javascript:void(0)';
  closeMobDrop.classList.add('close-mob-drop');
  const closeImg = document.createElement('img');
  closeImg.src = '/etc.clientlibs/tatamotors/clientlibs/clientlib-site/resources/images/close.png'; // Fallback for missing model field
  closeImg.alt = '';
  closeImg.classList.add('img-fluid');
  closeMobDrop.append(closeImg);
  navCard.append(closeMobDrop);

  closeMobDrop.addEventListener('click', () => {
    mainNavBx.classList.remove('open');
    navIcon4.classList.remove('open');
  });

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');

  navItemRows.forEach((row) => {
    const [labelCell, linkCell, linkLabelCell, subLinksCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');

    if (subList) {
      li.classList.add('level1');
      const trigger = document.createElement('a');
      trigger.href = 'javascript:void(0)';
      trigger.textContent = labelCell.textContent.trim();
      li.append(trigger);

      const level2Ul = document.createElement('ul');
      level2Ul.classList.add('level2');
      moveInstrumentation(subLinksCell, level2Ul);
      while (subLinksCell.firstChild) {
        level2Ul.append(subLinksCell.firstChild);
      }

      // Add back button for mobile
      const mobBack = document.createElement('li');
      mobBack.classList.add('mob-back');
      const mobBackImg = document.createElement('img');
      mobBackImg.src = '/etc.clientlibs/tatamotors/clientlibs/clientlib-site/resources/images/mob-level2-arrw.png'; // Fallback for missing model field
      mobBackImg.alt = '';
      mobBack.append(mobBackImg);
      level2Ul.prepend(mobBack);

      li.append(level2Ul);

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('open');
        level2Ul.classList.toggle('open');
      });

      mobBack.addEventListener('click', (e) => {
        e.stopPropagation();
        li.classList.remove('open');
        level2Ul.classList.remove('open');
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

  navCard.append(level1Ul);

  // Secondary Logo
  const secondaryLogoAnchor = document.createElement('a');
  secondaryLogoAnchor.classList.add('logo-wrp2');
  secondaryLogoAnchor.target = '_blank';
  const secondaryLogoLink = secondaryLogoLinkRow.querySelector('a');
  secondaryLogoAnchor.href = secondaryLogoLink?.href || 'https://www.tata.com/'; // Correctly read href from aem-content cell
  moveInstrumentation(secondaryLogoLinkRow, secondaryLogoAnchor);

  const secondaryLogoImg = secondaryLogoRow.querySelector('img');
  if (secondaryLogoImg) {
    const optimizedSecondaryLogoPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(secondaryLogoImg, optimizedSecondaryLogoPic.querySelector('img'));
    secondaryLogoAnchor.append(optimizedSecondaryLogoPic);
  } else {
    secondaryLogoAnchor.textContent = secondaryLogoLinkLabelRow.textContent.trim();
  }
  navCard.append(secondaryLogoAnchor);

  col2.append(navCard);
  mainNavRow.append(col2);

  // Search Section (hardcoded from original HTML, as no model field)
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

  // Append all created elements to the block
  block.textContent = '';
  block.classList.add('fixed'); // Add fixed class for styling
  block.append(topHead, mainNavBx, cdSearch);

  // Event listener for the search button
  const searchButton = cdSearch.querySelector('.btn.btn-outline-secondary');
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      // Toggle visibility of the search overlay
      if (cdSearch.style.display === 'none') {
        cdSearch.style.display = 'block';
      } else {
        cdSearch.style.display = 'none';
      }
    });
  }

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Scroll behavior for nav-up/nav-down
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 0) {
      block.classList.add('nav-up');
    } else {
      block.classList.remove('nav-up');
    }
    lastScrollY = window.scrollY;
  });
}
