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

  block.classList.add('fixed'); // Do NOT add 'nav-up' here, it's a scroll state class

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

  const colLeft = document.createElement('div');
  colLeft.classList.add('col-md-2', 'col-6');

  const logoWrp = document.createElement('a');
  logoWrp.classList.add('logo-wrp');
  const logoLink = logoLinkRow.querySelector('a');
  if (logoLink) {
    logoWrp.href = logoLink.href;
  } else {
    logoWrp.href = '#';
  }

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoWrp.append(optimizedPic);
      optimizedPic.classList.add('img-fluid');
    }
  }
  moveInstrumentation(logoRow, logoWrp);
  moveInstrumentation(logoLinkRow, logoWrp);
  moveInstrumentation(logoLinkLabelRow, logoWrp);

  const mobileLogoPicture = mobileLogoRow.querySelector('picture');
  const mobileLogoImageHolder = document.createElement('picture');
  mobileLogoImageHolder.classList.add('image-holder', 'tata-logo-mob');
  if (mobileLogoPicture) {
    const img = mobileLogoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobileLogoImageHolder.append(optimizedPic);
      optimizedPic.classList.add('img-fluid');
    }
  }
  moveInstrumentation(mobileLogoRow, mobileLogoImageHolder);

  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  ['', '', ''].forEach(() => navIcon4.append(document.createElement('span')));

  const switchBtn = document.createElement('button');
  switchBtn.id = 'switch2';
  switchBtn.innerHTML = `Mode <strong><span class="switch2_light">Light</span> <span class="switch2_dark">Dark</span> </strong>`;
  switchBtn.addEventListener('click', () => {
    // Implement dark/light mode toggle logic here
    document.body.classList.toggle('dark-mode'); // Example class
  });

  colLeft.append(logoWrp, mobileLogoImageHolder, navIcon4, switchBtn);

  const colRight = document.createElement('div');
  colRight.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');

  const closeMobDrop = document.createElement('a');
  closeMobDrop.classList.add('close-mob-drop');
  closeMobDrop.href = 'javascript:void(0)';
  const closeImg = document.createElement('img');
  closeImg.src = '/icons/close.png'; // Placeholder, replace with actual icon if available in block
  closeImg.alt = '';
  closeImg.classList.add('img-fluid');
  closeMobDrop.append(closeImg);
  closeMobDrop.addEventListener('click', () => {
    navCard.classList.remove('active');
    navIcon4.classList.remove('open');
    block.classList.remove('nav-open');
  });

  navIcon4.addEventListener('click', () => {
    navCard.classList.toggle('active');
    navIcon4.classList.toggle('open');
    block.classList.toggle('nav-open');
  });

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');

  navItemRows.forEach((row) => {
    const cells = [...row.children];
    // Based on BlockJson, nav-item has 4 fields: label, link, linkLabel, subLinks
    // label (text), link (aem-content), linkLabel (text), subLinks (richtext)
    const labelCell = cells[0];
    const linkCell = cells[1];
    const linkLabelCell = cells[2];
    const subLinksCell = cells[3];

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');

    if (subList) {
      li.classList.add('level1');
      const anchor = document.createElement('a');
      anchor.href = 'javascript:void(0)';
      anchor.textContent = labelCell.textContent.trim();
      li.append(anchor);

      const level2Ul = document.createElement('ul');
      level2Ul.classList.add('level2');

      const mobBackLi = document.createElement('li');
      mobBackLi.classList.add('mob-back');
      const mobBackImg = document.createElement('img');
      mobBackImg.src = '/icons/mob-level2-arrw.png'; // Placeholder, replace with actual icon if available in block
      mobBackImg.alt = '';
      mobBackLi.append(mobBackImg);
      mobBackLi.addEventListener('click', () => {
        li.classList.remove('active');
      });
      level2Ul.append(mobBackLi);

      [...subList.children].forEach((subLi) => {
        const nestedLi = document.createElement('li');
        moveInstrumentation(subLi, nestedLi);
        while (subLi.firstChild) nestedLi.append(subLi.firstChild);
        level2Ul.append(nestedLi);
      });
      li.append(level2Ul);

      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        li.classList.toggle('active');
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

  const logoWrp2 = document.createElement('a');
  logoWrp2.classList.add('logo-wrp2');
  logoWrp2.href = 'https://www.tata.com/';
  logoWrp2.target = '_blank';
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoWrp2.append(optimizedPic);
    }
  }
  moveInstrumentation(secondaryLogoRow, logoWrp2);
  moveInstrumentation(secondaryLogoLinkRow, logoWrp2);
  moveInstrumentation(secondaryLogoLinkLabelRow, logoWrp2);

  navCard.append(closeMobDrop, level1Ul, logoWrp2);
  colRight.append(navCard);

  mainNavRow.append(colLeft, colRight);
  mainNavContainer.append(mainNavRow);
  mainNavBx.append(mainNavContainer);

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

  // Add event listener for the search button
  const searchButton = cdSearch.querySelector('.btn.btn-outline-secondary');
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      const searchInput = cdSearch.querySelector('#example-search-input');
      if (searchInput) {
        // Implement search logic here, e.g., redirect to search results page
        console.log('Searching for:', searchInput.value);
        // window.location.href = `/search?q=${encodeURIComponent(searchInput.value)}`;
      }
    });
  }

  block.textContent = '';
  block.append(topHead, mainNavBx, cdSearch);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
