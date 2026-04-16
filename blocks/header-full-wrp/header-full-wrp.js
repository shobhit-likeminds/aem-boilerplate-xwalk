import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    logoMobileRow,
    secondaryLogoRow,
    secondaryLogoLinkRow,
    secondaryLogoLinkLabelRow,
    ...navItemRows
  ] = [...block.children];

  block.classList.add('fixed', 'nav-up'); // Add initial classes from original HTML

  const topHead = document.createElement('div');
  topHead.classList.add('top-head');
  const topHeadContainer = document.createElement('div');
  topHeadContainer.classList.add('container-1600-wrp');
  topHead.append(topHeadContainer);
  block.append(topHead);

  const mainNavBx = document.createElement('div');
  mainNavBx.classList.add('main-nav-bx');
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('container-1600-wrp');
  mainNavBx.append(mainNavContainer);
  block.append(mainNavBx);

  const row = document.createElement('div');
  row.classList.add('row');
  mainNavContainer.append(row);

  const colLeft = document.createElement('div');
  colLeft.classList.add('col-md-2', 'col-6');
  row.append(colLeft);

  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-wrp');
  const logoHref = logoLinkRow?.querySelector('a')?.href || 'javascript:void(0)';
  logoLink.href = logoHref;
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow?.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  colLeft.append(logoLink);

  const logoMobilePicture = logoMobileRow?.querySelector('picture');
  if (logoMobilePicture) {
    const mobileLogoWrapper = document.createElement('picture');
    mobileLogoWrapper.classList.add('image-holder', 'tata-logo-mob');
    const img = logoMobilePicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    mobileLogoWrapper.append(optimizedPic);
    colLeft.append(mobileLogoWrapper);
  }

  const navIcon = document.createElement('div');
  navIcon.id = 'nav-icon4';
  navIcon.innerHTML = '<span></span><span></span><span></span>';
  colLeft.append(navIcon);

  const switchButton = document.createElement('button');
  switchButton.id = 'switch2';
  switchButton.innerHTML = 'Mode <strong><span class="switch2_light">Light</span> <span class="switch2_dark">Dark</span></strong>';
  colLeft.append(switchButton);

  const colRight = document.createElement('div');
  colRight.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');
  row.append(colRight);

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');
  colRight.append(navCard);

  const closeMobDrop = document.createElement('a');
  closeMobDrop.href = 'javascript:void(0)';
  closeMobDrop.classList.add('close-mob-drop');
  // Assuming the close image is hardcoded in the original HTML, we replicate it.
  // If it were from an EDS field, we'd read it from the block model.
  const closeImg = document.createElement('img');
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/close.png'; // This is a hardcoded asset path from the original HTML
  closeImg.alt = '';
  closeImg.classList.add('img-fluid');
  closeMobDrop.append(closeImg);
  navCard.append(closeMobDrop);

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');
  navCard.append(level1Ul);

  navItemRows.forEach((row) => {
    // Use content detection instead of index access for navItemRows
    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && !cell.querySelector('ul'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const linkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && !cell.querySelector('ul') && cell !== labelCell);
    const subLinksCell = cells.find(cell => cell.querySelector('ul') || cell.innerHTML.includes('<p>')); // Check for ul or rich text content

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');
    if (subList) {
      li.classList.add('level1'); // Add level1 class for items with sub-menus
      const trigger = document.createElement('a');
      trigger.href = 'javascript:void(0)'; // Sub-menu triggers are often void links
      trigger.textContent = labelCell?.textContent.trim() || '';
      li.append(trigger);

      const level2Ul = document.createElement('ul');
      level2Ul.classList.add('level2');
      moveInstrumentation(subLinksCell, level2Ul);
      // Move original content from subLinksCell to level2Ul
      // Ensure only direct children are moved, and preserve original structure
      while (subLinksCell.firstChild) {
        level2Ul.append(subLinksCell.firstChild);
      }

      // Transform nested lists within the sub-menu
      level2Ul.querySelectorAll('li').forEach(subLi => {
        const nestedUl = subLi.querySelector(':scope > ul');
        if (nestedUl) {
          nestedUl.remove(); // Remove the original nested UL
          const subWrap = document.createElement('div');
          subWrap.classList.add('has-sub-child'); // Use class from original site CSS
          subWrap.append(nestedUl); // Append the nested UL into the new wrapper
          subLi.append(subWrap);

          const nestedTrigger = subLi.querySelector(':scope > a') || subLi;
          nestedTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            subLi.classList.toggle('active');
            subWrap.classList.toggle('active');
          });
        }
      });

      li.append(level2Ul);

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active'); // Toggle active class on parent li for CSS
        level2Ul.classList.toggle('active'); // Toggle active class on sub-menu ul for CSS
      });
    } else {
      li.classList.add('no-arrw-mob');
      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim() || '';
      li.append(anchor);
    }
    level1Ul.append(li);
  });

  const secondaryLogoWrapper = document.createElement('a');
  secondaryLogoWrapper.classList.add('logo-wrp2');
  secondaryLogoWrapper.target = '_blank';
  const secondaryLogoHref = secondaryLogoLinkRow?.querySelector('a')?.href || 'javascript:void(0)';
  secondaryLogoWrapper.href = secondaryLogoHref;
  moveInstrumentation(secondaryLogoLinkRow, secondaryLogoWrapper);

  const secondaryLogoPicture = secondaryLogoRow?.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    secondaryLogoWrapper.append(optimizedPic);
  }
  navCard.append(secondaryLogoWrapper);

  const cdSearch = document.createElement('div');
  cdSearch.classList.add('cd-search');
  cdSearch.style.display = 'none'; // Initial state from original HTML
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
  block.append(cdSearch);

  // Event listener for mobile menu toggle
  navIcon.addEventListener('click', () => {
    navIcon.classList.toggle('open');
    navCard.classList.toggle('open');
    document.body.classList.toggle('noscroll'); // Assuming noscroll class exists for body
  });

  closeMobDrop.addEventListener('click', (e) => {
    e.preventDefault();
    navIcon.classList.remove('open');
    navCard.classList.remove('open');
    document.body.classList.remove('noscroll');
  });

  // Event listener for switch2 button
  switchButton.addEventListener('click', () => {
    // Add logic for dark/light mode toggle here
    // Example: document.body.classList.toggle('dark-mode');
    console.log('Switch2 button clicked!');
  });

  // Event listener for search button
  const searchButton = cdSearch.querySelector('.btn.btn-outline-secondary');
  if (searchButton) {
    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      const searchInput = cdSearch.querySelector('#example-search-input');
      console.log('Search button clicked, search term:', searchInput.value);
      // Add actual search logic here
    });
  }

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
