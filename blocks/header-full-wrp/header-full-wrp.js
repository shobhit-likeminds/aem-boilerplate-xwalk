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

  block.classList.add('fixed'); // 'nav-up' is a scroll state class, do not add initially

  const topHead = document.createElement('div');
  topHead.classList.add('top-head');
  const topHeadContainer = document.createElement('div');
  topHeadContainer.classList.add('container-1600-wrp');
  topHead.append(topHeadContainer);

  const mainNavBx = document.createElement('div');
  mainNavBx.classList.add('main-nav-bx');
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('container-1600-wrp');
  mainNavBx.append(mainNavContainer);

  const row = document.createElement('div');
  row.classList.add('row');
  mainNavContainer.append(row);

  const colLeft = document.createElement('div');
  colLeft.classList.add('col-md-2', 'col-6');
  row.append(colLeft);

  const logoWrp = document.createElement('a');
  logoWrp.classList.add('logo-wrp');
  const logoLink = logoLinkRow.querySelector('a');
  if (logoLink) {
    logoWrp.href = logoLink.href;
  }
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(logoPicture, optimizedLogo.querySelector('img'));
    logoWrp.append(optimizedLogo);
  }
  colLeft.append(logoWrp);

  const mobileLogoPicture = mobileLogoRow.querySelector('picture');
  if (mobileLogoPicture) {
    const mobileLogoImg = mobileLogoPicture.querySelector('img');
    const optimizedMobileLogo = createOptimizedPicture(mobileLogoImg.src, mobileLogoImg.alt, false, [{ width: '750' }]);
    optimizedMobileLogo.classList.add('image-holder', 'tata-logo-mob');
    moveInstrumentation(mobileLogoPicture, optimizedMobileLogo.querySelector('img'));
    colLeft.append(optimizedMobileLogo);
  }

  const navIcon = document.createElement('div');
  navIcon.id = 'nav-icon4';
  navIcon.innerHTML = '<span></span><span></span><span></span>';
  colLeft.append(navIcon);

  const switchBtn = document.createElement('button');
  switchBtn.id = 'switch2';
  switchBtn.innerHTML = `Mode <strong><span class="switch2_light">Light</span> <span class="switch2_dark">Dark</span></strong>`;
  colLeft.append(switchBtn);

  const colRight = document.createElement('div');
  colRight.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');
  row.append(colRight);

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');
  colRight.append(navCard);

  const closeMobDrop = document.createElement('a');
  closeMobDrop.href = 'javascript:void(0)';
  closeMobDrop.classList.add('close-mob-drop');
  // Original HTML has a hardcoded image, but EDS blocks should only use authored content.
  // If a 'close-icon' field existed, we'd use that. For now, just create the link.
  // If the original image is critical, it should be part of the block model.
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
      const trigger = document.createElement('a');
      trigger.href = 'javascript:void(0)';
      trigger.textContent = labelCell?.textContent.trim() || '';
      li.append(trigger);

      const level2Ul = document.createElement('ul');
      level2Ul.classList.add('level2');
      moveInstrumentation(subLinksCell, level2Ul);
      // Original HTML has a hardcoded back button image. If a 'back-icon' field existed, we'd use that.
      // For now, just create the li.
      const mobBackLi = document.createElement('li');
      mobBackLi.classList.add('mob-back');
      level2Ul.append(mobBackLi);

      // Move existing <li> from subList into level2Ul
      // The original HTML had <ul> directly inside the richtext cell.
      // We need to parse this HTML and extract the <li> elements.
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = subLinksCell.innerHTML;
      const originalSubList = tempDiv.querySelector('ul');

      if (originalSubList) {
        [...originalSubList.children].forEach((subLi) => {
          const subLiLink = subLi.querySelector('a');
          if (subLiLink) {
            const newSubLi = document.createElement('li');
            const newSubLink = document.createElement('a');
            newSubLink.href = subLiLink.href;
            newSubLink.textContent = subLiLink.textContent.trim();
            newSubLi.append(newSubLink);
            level2Ul.append(newSubLi);
          }
        });
      }

      li.append(level2Ul);

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active'); // Use 'active' class for dropdown visibility
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

  const logoWrp2 = document.createElement('a');
  logoWrp2.classList.add('logo-wrp2');
  logoWrp2.target = '_blank';

  const secondaryLogoLink = secondaryLogoLinkRow.querySelector('a');
  if (secondaryLogoLink) {
    logoWrp2.href = secondaryLogoLink.href;
  } else {
    // Fallback if no link is authored, as per original HTML's hardcoded link
    logoWrp2.href = 'https://www.tata.com/';
  }

  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const secondaryLogoImg = secondaryLogoPicture.querySelector('img');
    const optimizedSecondaryLogo = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(secondaryLogoPicture, optimizedSecondaryLogo.querySelector('img'));
    logoWrp2.append(optimizedSecondaryLogo);
  }
  navCard.append(logoWrp2);

  const cdSearch = document.createElement('div');
  cdSearch.classList.add('cd-search');
  cdSearch.style.display = 'none'; // Initially hidden as per original HTML
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
  searchContainer.append(inputGroup);
  cdSearch.append(searchContainer);

  block.textContent = '';
  block.append(topHead, mainNavBx, cdSearch);

  // Optimize all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Toggle mobile navigation
  navIcon.addEventListener('click', () => {
    navCard.classList.toggle('active');
    navIcon.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });

  closeMobDrop.addEventListener('click', (e) => {
    e.preventDefault();
    navCard.classList.remove('active');
    navIcon.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });

  // Toggle light/dark mode (assuming 'switch2' button controls this)
  switchBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Example class for dark mode
    // You might also want to toggle text content or icons within the button
    const lightSpan = switchBtn.querySelector('.switch2_light');
    const darkSpan = switchBtn.querySelector('.switch2_dark');
    if (document.body.classList.contains('dark-mode')) {
      if (lightSpan) lightSpan.style.display = 'none';
      if (darkSpan) darkSpan.style.display = 'inline';
    } else {
      if (lightSpan) lightSpan.style.display = 'inline';
      if (darkSpan) darkSpan.style.display = 'none';
    }
  });
}
