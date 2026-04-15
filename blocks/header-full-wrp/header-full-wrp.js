import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    logoMobileRow,
    ...navItemRows
  ] = [...block.children];

  block.classList.add('fixed'); // 'nav-up' is a state class, not initial

  const topHead = document.createElement('div');
  topHead.classList.add('top-head');
  const topHeadContainer = document.createElement('div');
  topHeadContainer.classList.add('container-1600-wrp');
  const topHeadUl = document.createElement('ul');
  topHeadContainer.append(topHeadUl);
  topHead.append(topHeadContainer);

  const mainNavBx = document.createElement('div');
  mainNavBx.classList.add('main-nav-bx');
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('container-1600-wrp');
  const mainNavRow = document.createElement('div');
  mainNavRow.classList.add('row');

  const col1 = document.createElement('div');
  col1.classList.add('col-md-2', 'col-6');

  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-wrp');
  const logoHref = logoLinkRow.querySelector('a')?.href;
  if (logoHref) {
    logoLink.href = logoHref;
  } else {
    logoLink.href = '#';
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, logoLink);
  col1.append(logoLink);

  const mobileLogoPicture = logoMobileRow.querySelector('picture');
  if (mobileLogoPicture) {
    const mobileLogoImg = mobileLogoPicture.querySelector('img');
    if (mobileLogoImg) {
      const mobileLogoOptimizedPic = createOptimizedPicture(mobileLogoImg.src, mobileLogoImg.alt, false, [{ width: '750' }]);
      mobileLogoOptimizedPic.classList.add('image-holder', 'tata-logo-mob');
      moveInstrumentation(mobileLogoImg, mobileLogoOptimizedPic.querySelector('img'));
      col1.append(mobileLogoOptimizedPic);
    }
  }
  moveInstrumentation(logoMobileRow, col1);

  const navIcon = document.createElement('div');
  navIcon.id = 'nav-icon4';
  navIcon.innerHTML = '<span></span><span></span><span></span>';
  col1.append(navIcon);

  const switchBtn = document.createElement('button');
  switchBtn.id = 'switch2';
  switchBtn.innerHTML = `Mode <strong><span class="switch2_light">Light</span> <span class="switch2_dark">Dark</span> </strong>`;
  col1.append(switchBtn);

  mainNavRow.append(col1);

  const col2 = document.createElement('div');
  col2.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');
  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');

  const closeMobDrop = document.createElement('a');
  closeMobDrop.href = 'javascript:void(0)';
  closeMobDrop.classList.add('close-mob-drop');
  const closeImg = document.createElement('img');
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/close.png'; // This is a hardcoded path from the original HTML, but it's for a UI icon, not content.
  closeImg.alt = '';
  closeImg.classList.add('img-fluid');
  closeMobDrop.append(closeImg);
  navCard.append(closeMobDrop);

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');

  navItemRows.forEach((row) => {
    const cells = [...row.children];
    // Based on BlockJson, nav-item has 4 fields: label, link, linkLabel, subLinks
    // label: text, link: aem-content, linkLabel: text, subLinks: richtext (may contain ul)
    const labelCell = cells[0];
    const linkCell = cells[1];
    const linkLabelCell = cells[2];
    const subLinksCell = cells[3];

    const li = document.createElement('li');
    moveInstrumentation(row, li);

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
      // Move all children from subLinksCell to level2Ul
      while (subLinksCell.firstChild) level2Ul.append(subLinksCell.firstChild);

      // Transform nested lists within level2Ul
      level2Ul.querySelectorAll('li').forEach(subLi => {
        const nested = subLi.querySelector(':scope > ul');
        if (nested) {
          nested.remove();
          const subWrap = document.createElement('div');
          subWrap.classList.add('has-sub-child'); // Use class from original site CSS
          subWrap.append(nested);
          subLi.append(subWrap);
          const subTrigger = subLi.querySelector(':scope > a') || subLi;
          subTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            subLi.classList.toggle('active');
            subWrap.classList.toggle('active');
          });
        }
      });

      li.append(level2Ul);

      triggerLink.addEventListener('click', (e) => {
        e.preventDefault();
        li.classList.toggle('active');
        level2Ul.classList.toggle('active');
      });
    } else {
      li.classList.add('no-arrw-mob');
      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim() || '';
      moveInstrumentation(linkCell, anchor);
      li.append(anchor);
    }
    level1Ul.append(li);
  });

  navCard.append(level1Ul);

  const logoWrp2 = document.createElement('a');
  logoWrp2.href = 'https://www.tata.com/';
  logoWrp2.classList.add('logo-wrp2');
  logoWrp2.target = '_blank';
  const logoWrp2Img = document.createElement('img');
  logoWrp2Img.alt = 'svg file';
  logoWrp2Img.src = '/content/dam/aemigrate/uploaded-folder/image/1776234858938.svg+xml'; // This is a hardcoded path from the original HTML, but it's for a UI icon, not content.
  logoWrp2.append(logoWrp2Img);
  navCard.append(logoWrp2);

  col2.append(navCard);
  mainNavRow.append(col2);
  mainNavContainer.append(mainNavRow);
  mainNavBx.append(mainNavContainer);

  const cdSearch = document.createElement('div');
  cdSearch.classList.add('cd-search');
  cdSearch.style.display = 'none';
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

  // Add event listener for mobile nav toggle
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

  // Add event listener for search button
  const searchButton = cdSearch.querySelector('.btn.btn-outline-secondary');
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      // Implement search functionality here, e.g., submit form, filter results
      console.log('Search button clicked!');
      const searchInput = cdSearch.querySelector('#example-search-input');
      if (searchInput) {
        console.log('Search query:', searchInput.value);
      }
      // Example: toggle a class to show/hide search results or trigger a search API call
    });
  }

  // Optimize all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
