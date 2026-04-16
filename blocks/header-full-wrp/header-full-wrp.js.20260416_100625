import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    logoMobileRow,
    logoSecondaryRow,
    logoSecondaryLinkRow,
    logoSecondaryLinkLabelRow,
    ...navItemRows
  ] = [...block.children];

  block.classList.add('fixed'); // Add fixed class from original HTML, but NOT nav-up

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

  const colLeft = document.createElement('div');
  colLeft.classList.add('col-md-2', 'col-6');

  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-wrp');
  const logoHref = logoLinkRow?.querySelector('a')?.href || '#';
  logoLink.href = logoHref;
  const logoPicture = logoRow?.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, logoLink);
  colLeft.append(logoLink);

  const logoMobilePicture = logoMobileRow?.querySelector('picture');
  if (logoMobilePicture) {
    const mobileImg = logoMobilePicture.querySelector('img');
    if (mobileImg) {
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ width: '150' }]);
      moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
      optimizedMobilePic.classList.add('image-holder', 'tata-logo-mob');
      colLeft.append(optimizedMobilePic);
    }
  }
  moveInstrumentation(logoMobileRow, colLeft);

  const navIcon = document.createElement('div');
  navIcon.id = 'nav-icon4';
  navIcon.innerHTML = '<span></span><span></span><span></span>';
  colLeft.append(navIcon);

  const switchBtn = document.createElement('button');
  switchBtn.id = 'switch2';
  switchBtn.innerHTML = 'Mode <strong><span class="switch2_light">Light</span> <span class="switch2_dark">Dark</span></strong>';
  colLeft.append(switchBtn);

  mainNavRow.append(colLeft);

  const colRight = document.createElement('div');
  colRight.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');

  const closeMobDrop = document.createElement('a');
  closeMobDrop.classList.add('close-mob-drop');
  closeMobDrop.href = 'javascript:void(0)';
  const closeImg = document.createElement('img');
  closeImg.classList.add('img-fluid');
  // There is no close image field in the model, so we don't add it.
  // Original HTML has: <img srcset="/content/dam/aemigrate/uploaded-folder/image/close.png" alt="" class="img-fluid">
  // We cannot hardcode this asset.
  navCard.append(closeMobDrop);

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');

  navItemRows.forEach((row) => {
    const [labelCell, linkCell, linkLabelCell, subLinksCell] = [...row.children];

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');
    if (subList) {
      li.classList.add('level1'); // Add level1 class for items with sub-links

      const trigger = document.createElement('a');
      trigger.href = 'javascript:void(0)';
      trigger.textContent = labelCell?.textContent.trim() || '';
      li.append(trigger);

      const level2Ul = document.createElement('ul');
      level2Ul.classList.add('level2');

      const mobBackLi = document.createElement('li');
      mobBackLi.classList.add('mob-back');
      const mobBackImg = document.createElement('img');
      // No image field for mob-back, so we don't add it.
      // Original HTML has: <img src="/content/dam/aemigrate/uploaded-folder/image/mob-level2-arrw.png" alt="">
      // We cannot hardcode this asset.
      mobBackLi.append(mobBackImg);
      level2Ul.append(mobBackLi);

      // Move the authored sub-list content into the new level2Ul
      while (subList.firstChild) {
        const subLi = document.createElement('li');
        moveInstrumentation(subList.firstElementChild, subLi);
        subLi.append(subList.firstElementChild);
        level2Ul.append(subLi);
      }
      li.append(level2Ul);

      // Add event listener for dropdown toggle
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        li.classList.toggle('active'); // Use 'active' class for styling
        level2Ul.classList.toggle('active'); // Use 'active' class for styling
      });

    } else {
      li.classList.add('no-arrw-mob'); // Add no-arrw-mob for items without sub-links
      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim() || '';
      li.append(anchor);
    }
    level1Ul.append(li);
  });

  navCard.append(level1Ul);

  const logoWrp2 = document.createElement('a');
  logoWrp2.classList.add('logo-wrp2');
  logoWrp2.href = 'https://www.tata.com/';
  logoWrp2.target = '_blank';
  const logoSecondaryPicture = logoSecondaryRow?.querySelector('picture');
  if (logoSecondaryPicture) {
    const secondaryImg = logoSecondaryPicture.querySelector('img');
    if (secondaryImg) {
      const optimizedSecondaryPic = createOptimizedPicture(secondaryImg.src, secondaryImg.alt, false, [{ width: '150' }]);
      moveInstrumentation(secondaryImg, optimizedSecondaryPic.querySelector('img'));
      logoWrp2.append(optimizedSecondaryPic);
    }
  }
  moveInstrumentation(logoSecondaryRow, logoWrp2);
  navCard.append(logoWrp2);

  colRight.append(navCard);
  mainNavRow.append(colRight);

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

  // Image optimization for all pictures in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Toggle mobile navigation
  navIcon.addEventListener('click', () => {
    navIcon.classList.toggle('open');
    navCard.classList.toggle('open');
    document.body.classList.toggle('overflow-hidden');
  });

  closeMobDrop.addEventListener('click', (e) => {
    e.preventDefault();
    navIcon.classList.remove('open');
    navCard.classList.remove('open');
    document.body.classList.remove('overflow-hidden');
  });

  // Toggle search overlay
  const searchButton = cdSearch.querySelector('.btn');
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      cdSearch.style.display = cdSearch.style.display === 'none' ? 'block' : 'none';
    });
  }

  // Simple scroll behavior for header
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) { // Scrolling down
      block.classList.add('nav-up');
    } else if (window.scrollY < lastScrollY) { // Scrolling up
      block.classList.remove('nav-up');
    }
    lastScrollY = window.scrollY;
  });
}
