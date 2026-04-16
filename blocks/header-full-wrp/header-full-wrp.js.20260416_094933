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
  mainNavRow.append(colLeft);

  const logoWrp = document.createElement('a');
  logoWrp.classList.add('logo-wrp');
  const logoLink = logoLinkRow.querySelector('a');
  if (logoLink) {
    logoWrp.href = logoLink.href;
  }
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(logoPicture, optimizedPic.querySelector('img'));
    logoWrp.append(optimizedPic);
  }
  colLeft.append(logoWrp);

  const mobileLogoPicture = mobileLogoRow.querySelector('picture');
  if (mobileLogoPicture) {
    const mobileLogoHolder = document.createElement('picture');
    mobileLogoHolder.classList.add('image-holder', 'tata-logo-mob');
    const img = mobileLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(mobileLogoPicture, optimizedPic.querySelector('img'));
    mobileLogoHolder.append(optimizedPic);
    colLeft.append(mobileLogoHolder);
  }

  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  navIcon4.innerHTML = '<span></span><span></span><span></span>';
  colLeft.append(navIcon4);

  const switchBtn = document.createElement('button');
  switchBtn.id = 'switch2';
  switchBtn.innerHTML = 'Mode <strong><span class="switch2_light">Light</span> <span class="switch2_dark">Dark</span></strong>';
  colLeft.append(switchBtn);

  const colRight = document.createElement('div');
  colRight.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');
  mainNavRow.append(colRight);

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');
  colRight.append(navCard);

  const closeMobDrop = document.createElement('a');
  closeMobDrop.classList.add('close-mob-drop');
  // Assuming close button image is fixed or from a global asset. If it were in block, it would be a field.
  // For now, creating a placeholder image as per the original HTML structure.
  const closeImg = document.createElement('img');
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/close.png'; // This is a hardcoded path from ORIGINAL HTML, not from block model.
  closeImg.alt = '';
  closeImg.classList.add('img-fluid');
  closeMobDrop.append(closeImg);
  navCard.append(closeMobDrop);

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');
  navCard.append(level1Ul);

  navItemRows.forEach((row) => {
    const cells = [...row.children];
    // Content detection for nav-item fields:
    // labelCell: text (first cell without a link or sublinks)
    // linkCell: aem-content (cell with an 'a' tag, but not the subLinks cell)
    // linkLabelCell: text (cell with text content, but not the labelCell or subLinks cell)
    // subLinksCell: richtext (cell containing a 'ul' or 'p')
    const subLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p'));
    const linkCell = cells.find(cell => cell.querySelector('a') && cell !== subLinksCell);
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('ul') && !cell.querySelector('p') && cell.textContent.trim() !== '');
    const linkLabelCell = cells.find(cell => cell !== labelCell && cell !== linkCell && cell !== subLinksCell && cell.textContent.trim() !== '');

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');
    if (subList) {
      li.classList.add('level1');
      const trigger = document.createElement('a');
      trigger.href = 'javascript:void(0)';
      trigger.textContent = labelCell?.textContent.trim();
      li.append(trigger);

      const level2Ul = document.createElement('ul');
      level2Ul.classList.add('level2');
      const mobBackLi = document.createElement('li');
      mobBackLi.classList.add('mob-back');
      const mobBackImg = document.createElement('img');
      mobBackImg.src = '/content/dam/aemigrate/uploaded-folder/image/mob-level2-arrw.png'; // This is a hardcoded path from ORIGINAL HTML, not from block model.
      mobBackImg.alt = '';
      mobBackLi.append(mobBackImg);
      level2Ul.append(mobBackLi);

      [...subList.children].forEach((subLi) => {
        level2Ul.append(subLi);
      });
      li.append(level2Ul);

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        li.classList.toggle('active');
        level2Ul.classList.toggle('active');
      });
    } else {
      li.classList.add('no-arrw-mob');
      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim();
      li.append(anchor);
    }
    level1Ul.append(li);
  });

  const secondaryLogoWrp = document.createElement('a');
  secondaryLogoWrp.classList.add('logo-wrp2');
  secondaryLogoWrp.target = '_blank';
  const secondaryLogoLink = secondaryLogoLinkRow.querySelector('a');
  if (secondaryLogoLink) {
    secondaryLogoWrp.href = secondaryLogoLink.href;
  }
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(secondaryLogoPicture, optimizedPic.querySelector('img'));
    secondaryLogoWrp.append(optimizedPic);
  }
  navCard.append(secondaryLogoWrp);

  const cdSearch = document.createElement('div');
  cdSearch.classList.add('cd-search');
  cdSearch.style.display = 'none'; // Initial state as per original HTML
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

  // Add event listener for mobile menu toggle
  navIcon4.addEventListener('click', () => {
    navIcon4.classList.toggle('open');
    navCard.classList.toggle('open');
    document.body.classList.toggle('overflow-hidden');
  });

  closeMobDrop.addEventListener('click', (e) => {
    e.preventDefault();
    navIcon4.classList.remove('open');
    navCard.classList.remove('open');
    document.body.classList.remove('overflow-hidden');
  });

  // Add event listener for dark/light mode switch
  switchBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Assuming 'dark-mode' class toggles the theme
  });

  // Scroll behavior for nav-up/nav-down
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 0) {
      block.classList.remove('nav-up');
      block.classList.add('nav-down');
    } else {
      block.classList.remove('nav-down');
      block.classList.add('nav-up');
    }
    lastScrollY = window.scrollY;
  });
}
