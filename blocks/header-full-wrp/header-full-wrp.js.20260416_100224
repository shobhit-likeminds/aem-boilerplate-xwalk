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

  block.classList.add('fixed', 'nav-up');

  // Top Head
  const topHead = document.createElement('div');
  topHead.classList.add('top-head');
  const topHeadContainer = document.createElement('div');
  topHeadContainer.classList.add('container-1600-wrp');
  topHead.append(topHeadContainer);

  // Main Nav Box
  const mainNavBox = document.createElement('div');
  mainNavBox.classList.add('main-nav-bx');
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('container-1600-wrp');
  const mainNavRow = document.createElement('div');
  mainNavRow.classList.add('row');
  mainNavContainer.append(mainNavRow);
  mainNavBox.append(mainNavContainer);

  // Col 1: Logo and Mobile elements
  const col1 = document.createElement('div');
  col1.classList.add('col-md-2', 'col-6');
  mainNavRow.append(col1);

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-wrp');
  const logoHref = logoLinkRow.querySelector('a')?.href;
  if (logoHref) logoLink.href = logoHref;
  logoLink.textContent = logoLinkLabelRow.textContent.trim();
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoRow, logoLink);
  moveInstrumentation(logoLinkRow, logoLink);
  moveInstrumentation(logoLinkLabelRow, logoLink);
  col1.append(logoLink);

  // Mobile Logo
  const mobileLogoPicture = mobileLogoRow.querySelector('picture');
  if (mobileLogoPicture) {
    // The original HTML has <picture class="image-holder tata-logo-mob"> directly, not a div wrapping a picture.
    // So, we should create a picture element and add classes to it.
    const mobileLogoPicElement = document.createElement('picture');
    mobileLogoPicElement.classList.add('image-holder', 'tata-logo-mob');
    const img = mobileLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    mobileLogoPicElement.append(optimizedPic);
    moveInstrumentation(mobileLogoRow, mobileLogoPicElement);
    col1.append(mobileLogoPicElement);
  }

  // Nav Icon
  const navIcon = document.createElement('div');
  navIcon.id = 'nav-icon4';
  navIcon.innerHTML = '<span></span><span></span><span></span>';
  col1.append(navIcon);

  // Mode Switch Button
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

  // Col 2: Navigation
  const col2 = document.createElement('div');
  col2.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');
  mainNavRow.append(col2);

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');
  col2.append(navCard);

  const closeMobDrop = document.createElement('a');
  closeMobDrop.classList.add('close-mob-drop');
  closeMobDrop.href = 'javascript:void(0)';
  const closeImg = document.createElement('img');
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/close.png';
  closeImg.alt = '';
  closeImg.classList.add('img-fluid');
  closeMobDrop.append(closeImg);
  navCard.append(closeMobDrop);

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');
  navCard.append(level1Ul);

  navItemRows.forEach((row) => {
    // Destructuring for nav-item fields as per BlockJson
    const [labelCell, linkCell, linkLabelCell, subLinksCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');

    if (subList) {
      li.classList.add('level1'); // This class is already present on the parent <ul>, not necessarily on the <li> itself for sub-menus
      const anchor = document.createElement('a');
      anchor.href = 'javascript:void(0)'; // As per original HTML, parent links are void
      anchor.textContent = labelCell.textContent.trim();
      li.append(anchor);

      const level2Ul = document.createElement('ul');
      level2Ul.classList.add('level2');
      moveInstrumentation(subLinksCell, level2Ul); // Move instrumentation from subLinksCell to level2Ul
      // Move content from subLinksCell to level2Ul
      // The subLinksCell contains the raw HTML, which might have <p> tags around the <ul>.
      // We need to extract the <ul> directly.
      const extractedUl = subLinksCell.querySelector('ul');
      if (extractedUl) {
        // Move children of the extracted <ul> to level2Ul
        while (extractedUl.firstChild) {
          level2Ul.append(extractedUl.firstChild);
        }
      }

      // Transform nested lists within level2Ul
      level2Ul.querySelectorAll('li').forEach((nestedLi) => {
        const nestedUl = nestedLi.querySelector(':scope > ul');
        if (nestedUl) {
          nestedUl.remove(); // Remove the original nested UL
          const subWrap = document.createElement('div');
          subWrap.classList.add('has-sub-child'); // This class is not in the allowlist. Assuming it's a dynamic class.
          subWrap.append(nestedUl); // Append the original nested UL here
          nestedLi.append(subWrap);

          // Add mob-back class to the first li of level2Ul if it contains an image
          const firstLiInLevel2 = level2Ul.querySelector('li');
          if (firstLiInLevel2 && firstLiInLevel2.querySelector('img')) {
            firstLiInLevel2.classList.add('mob-back');
          }

          const trigger = nestedLi.querySelector(':scope > a') || nestedLi;
          trigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nestedLi.classList.toggle('active');
            subWrap.classList.toggle('active');
          });
        }
      });

      li.append(level2Ul);
    } else {
      li.classList.add('no-arrw-mob');
      const anchor = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell.textContent.trim() || labelCell.textContent.trim();
      li.append(anchor);
    }
    level1Ul.append(li);
  });

  // Secondary Logo
  const secondaryLogoLink = document.createElement('a');
  secondaryLogoLink.classList.add('logo-wrp2');
  const secondaryLogoHref = secondaryLogoLinkRow.querySelector('a')?.href;
  if (secondaryLogoHref) secondaryLogoLink.href = secondaryLogoHref;
  secondaryLogoLink.setAttribute('target', '_blank');
  secondaryLogoLink.textContent = secondaryLogoLinkLabelRow.textContent.trim();
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    secondaryLogoLink.append(optimizedPic);
  }
  moveInstrumentation(secondaryLogoRow, secondaryLogoLink);
  moveInstrumentation(secondaryLogoLinkRow, secondaryLogoLink);
  moveInstrumentation(secondaryLogoLinkLabelRow, secondaryLogoLink);
  navCard.append(secondaryLogoLink);

  // Search
  const cdSearch = document.createElement('div');
  cdSearch.classList.add('cd-search');
  cdSearch.style.display = 'none'; // Initially hidden as per original HTML
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

  // Clear block content and append new structure
  block.textContent = '';
  block.append(topHead, mainNavBox, cdSearch);

  // Add event listener for mobile menu toggle
  navIcon.addEventListener('click', () => {
    navIcon.classList.toggle('open');
    navCard.classList.toggle('open');
    document.body.classList.toggle('overflow-hidden');
  });

  closeMobDrop.addEventListener('click', () => {
    navIcon.classList.remove('open');
    navCard.classList.remove('open');
    document.body.classList.remove('overflow-hidden');
  });

  // Add event listener for Mode Switch Button
  switchBtn.addEventListener('click', () => {
    // Implement dark/light mode toggle logic here
    // Example: document.body.classList.toggle('dark-mode');
    console.log('Mode switch button clicked!');
  });

  // Add event listener for search button
  const searchButton = cdSearch.querySelector('.btn.btn-outline-secondary');
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      // Implement search functionality here
      const searchInput = cdSearch.querySelector('#example-search-input');
      console.log('Search button clicked! Search term:', searchInput.value);
    });
  }

  // Optimize all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
