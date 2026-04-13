import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    mobileLogoRow,
    closeIconRow,
    secondaryLogoRow,
    secondaryLogoLinkRow,
    secondaryLogoLinkLabelRow,
    ...navItemRows
  ] = [...block.children];

  block.classList.add('fixed', 'nav-up');

  // Top Head
  const topHead = document.createElement('div');
  topHead.classList.add('top-head');
  const container1600WrpTop = document.createElement('div');
  container1600WrpTop.classList.add('container-1600-wrp');
  const ulTop = document.createElement('ul');
  container1600WrpTop.append(ulTop);
  topHead.append(container1600WrpTop);

  // Main Nav Box
  const mainNavBx = document.createElement('div');
  mainNavBx.classList.add('main-nav-bx');
  const container1600WrpMain = document.createElement('div');
  container1600WrpMain.classList.add('container-1600-wrp');
  const row = document.createElement('div');
  row.classList.add('row');

  const colMd2Col6 = document.createElement('div');
  colMd2Col6.classList.add('col-md-2', 'col-6');

  // Logo Wrapper
  const logoWrp = document.createElement('a');
  logoWrp.classList.add('logo-wrp');
  const logoLink = logoLinkRow.querySelector('a');
  if (logoLink) {
    logoWrp.href = logoLink.href;
    moveInstrumentation(logoLinkRow, logoWrp);
  } else {
    logoWrp.href = logoLinkLabelRow.textContent.trim();
  }

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const newLogoImg = document.createElement('img');
    newLogoImg.src = logoImg.src;
    newLogoImg.alt = logoImg.alt;
    newLogoImg.classList.add('img-fluid');
    moveInstrumentation(logoRow, newLogoImg);
    logoWrp.append(newLogoImg);
  }
  colMd2Col6.append(logoWrp);

  // Mobile Logo
  const mobileLogoPicture = mobileLogoRow.querySelector('picture');
  if (mobileLogoPicture) {
    const mobileLogoImg = mobileLogoPicture.querySelector('img');
    const pictureHolder = document.createElement('picture');
    pictureHolder.classList.add('image-holder', 'tata-logo-mob');
    const newMobileLogoImg = document.createElement('img');
    newMobileLogoImg.src = mobileLogoImg.src;
    newMobileLogoImg.alt = mobileLogoImg.alt;
    newMobileLogoImg.classList.add('img-fluid');
    moveInstrumentation(mobileLogoRow, newMobileLogoImg);
    pictureHolder.append(newMobileLogoImg);
    colMd2Col6.append(pictureHolder);
  }

  // Nav Icon
  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  navIcon4.innerHTML = '<span></span><span></span><span></span>';
  colMd2Col6.append(navIcon4);

  // Mode Switch Button
  const switch2 = document.createElement('button');
  switch2.id = 'switch2';
  switch2.innerHTML = `
    Mode  
    <strong>
      <span class="switch2-light">Light</span> 
      <span class="switch2-dark">Dark</span> 
    </strong>
  `;
  colMd2Col6.append(switch2);

  row.append(colMd2Col6);

  const colMd10Col6 = document.createElement('div');
  colMd10Col6.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');

  // Close Mobile Drop
  const closeMobDrop = document.createElement('a');
  closeMobDrop.classList.add('close-mob-drop');
  const closeIconPicture = closeIconRow.querySelector('picture');
  if (closeIconPicture) {
    const closeIconImg = closeIconPicture.querySelector('img');
    const newCloseIconImg = document.createElement('img');
    newCloseIconImg.src = closeIconImg.src;
    newCloseIconImg.alt = closeIconImg.alt;
    newCloseIconImg.classList.add('img-fluid');
    moveInstrumentation(closeIconRow, newCloseIconImg);
    closeMobDrop.append(newCloseIconImg);
  }
  navCard.append(closeMobDrop);

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');

  navItemRows.forEach((row) => {
    // Destructuring for nav-item fields
    const [labelCell, linkCell, linkLabelCell, subLinksCell] = [...row.children];
    const subList = subLinksCell?.querySelector('ul');
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    if (subList) {
      li.classList.add('level1');
      const trigger = document.createElement('a');
      trigger.href = 'javascript:void(0)'; // Use a dummy href for the trigger
      trigger.textContent = labelCell.textContent.trim();
      li.append(trigger);

      const level2Ul = document.createElement('ul');
      level2Ul.classList.add('level2');

      const mobBackLi = document.createElement('li');
      mobBackLi.classList.add('mob-back');
      // If mob-level2-arrw.png is not in the model, we cannot create it dynamically.
      // Assuming it's not strictly required if not in the model.
      level2Ul.append(mobBackLi);

      [...subList.children].forEach((subLi) => {
        const subLink = subLi.querySelector('a');
        if (subLink) {
          const newSubLi = document.createElement('li');
          const newSubLink = document.createElement('a');
          newSubLink.href = subLink.href;
          newSubLink.textContent = subLink.textContent.trim();
          moveInstrumentation(subLi, newSubLi);
          newSubLi.append(newSubLink);
          level2Ul.append(newSubLi);
        }
      });
      li.append(level2Ul);

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        li.classList.toggle('active'); // Example class for dropdown open
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

  // Secondary Logo Wrapper
  const logoWrp2 = document.createElement('a');
  logoWrp2.classList.add('logo-wrp2');
  logoWrp2.target = '_blank';
  const secondaryLogoLink = secondaryLogoLinkRow.querySelector('a');
  if (secondaryLogoLink) {
    logoWrp2.href = secondaryLogoLink.href;
    moveInstrumentation(secondaryLogoLinkRow, logoWrp2);
  } else {
    logoWrp2.href = secondaryLogoLinkLabelRow.textContent.trim();
  }

  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const secondaryLogoImg = secondaryLogoPicture.querySelector('img');
    const newSecondaryLogoImg = document.createElement('img');
    newSecondaryLogoImg.src = secondaryLogoImg.src;
    newSecondaryLogoImg.alt = secondaryLogoImg.alt;
    moveInstrumentation(secondaryLogoRow, newSecondaryLogoImg);
    logoWrp2.append(newSecondaryLogoImg);
  }
  navCard.append(logoWrp2);

  colMd10Col6.append(navCard);
  row.append(colMd10Col6);
  container1600WrpMain.append(row);
  mainNavBx.append(container1600WrpMain);

  // Search
  const cdSearch = document.createElement('div');
  cdSearch.classList.add('cd-search');
  cdSearch.style.display = 'none'; // Hidden by default
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

  // Add event listener for mobile menu toggle
  navIcon4.addEventListener('click', () => {
    navCard.classList.toggle('active');
    navIcon4.classList.toggle('open');
    document.body.classList.toggle('no-scroll'); // Example for preventing scroll
  });

  closeMobDrop.addEventListener('click', (e) => {
    e.preventDefault();
    navCard.classList.remove('active');
    navIcon4.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });

  // Add event listener for mode switch button
  switch2.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Example class for dark mode
  });

  // Add event listener for search button
  const searchButton = inputGroup.querySelector('button');
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      // Example: toggle search visibility or perform search action
      console.log('Search button clicked!');
      // cdSearch.style.display = cdSearch.style.display === 'none' ? 'block' : 'none';
    });
  }


  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
