import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoLightRow, logoDarkRow, copyrightRow, ...itemRows] = [...block.children];

  const header = document.createElement('header');
  const nav = document.createElement('nav');
  nav.classList.add('navbar', 'navbar-expand-xl', 'navbar-light', 'bg-light', 'header_fixed');
  nav.id = 'myHeader';

  const containerFluid = document.createElement('div');
  containerFluid.classList.add('container-fluid');

  // Hamburger toggler
  const toggler = document.createElement('button');
  toggler.id = 'trignav';
  toggler.classList.add('navbar-toggler', 'hamburger', 'hamburger--collapse');
  toggler.type = 'button';
  toggler.innerHTML = `
    <span class="hamburger-box">
      <span class="hamburger-inner"></span>
    </span>
  `;

  // Navbar Brand (Logo)
  const navbarBrand = document.createElement('a');
  navbarBrand.href = '/';
  navbarBrand.classList.add('navbar-brand');

  const logoLightPicture = logoLightRow.querySelector('picture');
  if (logoLightPicture) {
    const imgLight = logoLightPicture.querySelector('img');
    const lightImage = document.createElement('img');
    lightImage.src = imgLight.src;
    lightImage.alt = imgLight.alt;
    lightImage.classList.add('img-fluid', 'light-image');
    lightImage.setAttribute('rel', 'home');
    moveInstrumentation(logoLightPicture, lightImage);
    navbarBrand.append(lightImage);
  }

  const logoDarkPicture = logoDarkRow.querySelector('picture');
  if (logoDarkPicture) {
    const imgDark = logoDarkPicture.querySelector('img');
    const darkImage = document.createElement('img');
    darkImage.src = imgDark.src;
    darkImage.alt = imgDark.alt;
    darkImage.classList.add('img-fluid', 'dark-image');
    darkImage.setAttribute('rel', 'home');
    moveInstrumentation(logoDarkPicture, darkImage);
    navbarBrand.append(darkImage);
  }

  const navmask = document.createElement('div');
  navmask.classList.add('navmask');

  const navbarCollapse = document.createElement('div');
  navbarCollapse.id = 'bbnav';
  navbarCollapse.classList.add('navbar-collapse');

  const navClose = document.createElement('div');
  navClose.classList.add('navclose');
  const closeNav = document.createElement('a');
  closeNav.id = 'closnav';
  // Original HTML has img inside a, so we replicate that.
  const closeImg = document.createElement('img');
  closeImg.src = '/content/dam/aemigrate/uploaded-folder/image/close.png'; // This is a hardcoded path in original HTML
  closeImg.classList.add('img-fluid');
  closeImg.alt = '';
  closeNav.append(closeImg);
  navClose.append(closeNav);

  const scrollableDiv = document.createElement('div');
  scrollableDiv.classList.add('scrollable', 'w-100', 'h-100');

  // Main Navigation
  const mainnavUl = document.createElement('ul');
  mainnavUl.classList.add('navbar-nav', 'mr-auto', 'level_0');
  mainnavUl.id = 'mainnav';
  mainnavUl.setAttribute('data-region', 'header');

  const mainnavItems = itemRows.filter((row) => [...row.children].length === 3 && row.querySelector('picture'));
  mainnavItems.forEach((row, index) => {
    const li = document.createElement('li');
    li.classList.add(`mm-li-${index + 1}`, 'nav-item', '/node'); // Note: '/node' is a class in original HTML
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));

    const linkEl = document.createElement('a');
    linkEl.classList.add('nav-link');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
    }
    linkEl.setAttribute('active', ''); // present in original HTML

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const iconImg = document.createElement('img');
      iconImg.src = img.src;
      iconImg.alt = img.alt;
      moveInstrumentation(iconPicture, iconImg);
      linkEl.append(iconImg);
    }

    if (labelCell) {
      linkEl.append(labelCell.textContent.trim());
    }

    li.append(linkEl);
    mainnavUl.append(li);
  });

  scrollableDiv.append(mainnavUl);

  // Search box (hidden by default)
  const searchForm = document.createElement('form');
  searchForm.action = '/web/search/results';
  searchForm.classList.add('search-box');
  searchForm.style.display = 'none';
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('text', 'search-input');
  searchInput.id = 'search_product';
  searchInput.name = 'keys';
  searchInput.placeholder = 'Type here to search...';
  searchForm.append(searchInput);
  scrollableDiv.append(searchForm);

  // Mobile-specific footer links, social links, and copyright
  const mobileFooterDiv = document.createElement('div');
  mobileFooterDiv.classList.add('d-block', 'd-xl-none', 'pb-5');

  const hfootlinksUl = document.createElement('ul');
  hfootlinksUl.classList.add('hfootlinks');

  const hfootlinkItems = itemRows.filter((row) => [...row.children].length === 2 && !row.querySelector('picture'));
  hfootlinkItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('a'));

    const linkEl = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
    }
    if (labelCell) {
      linkEl.title = labelCell.textContent.trim();
      linkEl.textContent = labelCell.textContent.trim();
    }
    li.append(linkEl);
    hfootlinksUl.append(li);
  });
  mobileFooterDiv.append(hfootlinksUl);

  const hsocialDiv = document.createElement('div');
  hsocialDiv.classList.add('hsocial');
  const hsocialNav = document.createElement('nav');
  hsocialNav.setAttribute('role', 'navigation');
  hsocialNav.setAttribute('aria-labelledby', 'block-socialmedialinks-menu');
  hsocialNav.id = 'block-socialmedialinks';
  hsocialNav.innerHTML = `<h2 class="visually-hidden" id="block-socialmedialinks-menu">social media links</h2>`;

  const sociallinkItems = itemRows.filter((row) => [...row.children].length === 3 && row.querySelector('picture'));
  sociallinkItems.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    // const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')); // Not used for social links

    const linkEl = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.target = '_blank'; // Original HTML has target="_blank"
    }

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const iconImg = document.createElement('img');
      iconImg.src = img.src;
      iconImg.alt = img.alt;
      iconImg.classList.add('img-fluid');
      moveInstrumentation(iconPicture, iconImg);
      linkEl.append(iconImg);

      // Add specific classes based on alt text for social icons (from original HTML)
      const altText = img.alt.toLowerCase();
      if (altText.includes('facebook')) linkEl.classList.add('fb');
      else if (altText.includes('twitter')) linkEl.classList.add('tw');
      else if (altText.includes('youtube')) linkEl.classList.add('yt');
      else if (altText.includes('linkedin')) linkEl.classList.add('lin');
      else if (altText.includes('instagram')) linkEl.classList.add('yt'); // Original HTML uses 'yt' for instagram
    }

    moveInstrumentation(row, linkEl);
    hsocialNav.append(linkEl);
  });
  hsocialDiv.append(hsocialNav);
  mobileFooterDiv.append(hsocialDiv);

  const hcopyDiv = document.createElement('div');
  hcopyDiv.classList.add('hcopy');
  if (copyrightRow) {
    moveInstrumentation(copyrightRow, hcopyDiv);
    hcopyDiv.textContent = copyrightRow.textContent.trim();
  }
  mobileFooterDiv.append(hcopyDiv);

  scrollableDiv.append(mobileFooterDiv);
  navbarCollapse.append(navClose, scrollableDiv);

  // Top Actions
  const topActionsDiv = document.createElement('div');
  const topActionsNav = document.createElement('nav');
  topActionsNav.setAttribute('role', 'navigation');
  topActionsNav.setAttribute('aria-labelledby', 'block-toprightmenu-menu');
  topActionsNav.id = 'block-toprightmenu';
  topActionsNav.innerHTML = `<h2 class="visually-hidden" id="block-toprightmenu-menu">Top Right menu</h2>`;

  const topActionsUl = document.createElement('ul');
  topActionsUl.classList.add('top-actions', 'row', 'no-gutters');

  const topactionItems = itemRows.filter((row) => [...row.children].length === 3 && row.querySelector('a'));
  topactionItems.forEach((row, index) => {
    const li = document.createElement('li');
    li.classList.add('col');
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));

    const linkEl = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
    }

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const span = document.createElement('span');
      const img = iconPicture.querySelector('img');
      const iconImg = document.createElement('img');
      iconImg.src = img.src;
      iconImg.alt = img.alt;
      moveInstrumentation(iconPicture, iconImg);
      span.append(iconImg);

      // Add specific classes based on alt text for top action icons (from original HTML)
      const altText = img.alt.toLowerCase();
      if (altText.includes('search')) {
        span.classList.add('search');
        linkEl.id = 'searchPopModal_open'; // Add ID for search toggle
      } else if (altText.includes('location')) span.classList.add('location');
      else if (altText.includes('help')) span.classList.add('help', 'd-block', 'd-xl-none');
      else if (altText.includes('pay')) span.classList.add('help', 'd-block', 'd-xl-none');
      else if (altText.includes('account')) span.classList.add('account', 'd-block', 'd-xl-none');

      linkEl.append(span);
    }

    if (labelCell) {
      const labelText = labelCell.textContent.trim();
      if (labelText === 'Reach us' || labelText === 'Pay' || labelText === 'Login') {
        li.classList.add('loginbtn', 'dropdown');
        linkEl.classList.add('dropdown-toggle');
        linkEl.setAttribute('role', 'button');
        linkEl.id = `dropdownMenu${labelText.replace(/\s/g, '')}`;
        linkEl.setAttribute('aria-haspopup', 'true');
        linkEl.setAttribute('aria-expanded', 'false');

        const btnSpan = document.createElement('span');
        btnSpan.classList.add('btn', 'btn-outline-secondary', 'd-none', 'd-xl-block', 'no-shadow');
        if (labelText === 'Login') {
          btnSpan.classList.remove('btn-outline-secondary');
          btnSpan.classList.add('btn-primary');
        }
        btnSpan.textContent = labelText;
        linkEl.append(btnSpan);

        // Handle dropdown menu content (hardcoded in original HTML, not from block data)
        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-menu');
        dropdownMenu.setAttribute('aria-labelledby', linkEl.id);

        if (labelText === 'Pay') {
          dropdownMenu.innerHTML = `
            <a class="dropdown-item" href="https://bandhan.bank.in/pay-your-tax">Pay Tax</a>
            <a class="dropdown-item" href="https://pay.bandhan.bank.in/" target="_blank">Loan Repayments</a>
          `;
          linkEl.setAttribute('data-toggle', 'dropdown'); // Required for dropdown JS
        } else if (labelText === 'Login') {
          dropdownMenu.classList.add('collapse', 'in');
          dropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuLinkHelp'); // Original HTML has this ID
          dropdownMenu.innerHTML = `
            <a class="dropdown-item" href="https://bandhan.bank.in/internet-banking-login" target="_blank">Internet Banking</a>
            <a class="dropdown-item" href="https://corporate.bandhanbank.com/Corporatebanking/prelogin" target="_blank">Corporate Internet Banking</a>
            <a class="dropdown-item" href="https://cms.bandhanbank.com/?utm_source=login_button&amp;utm_medium=bblwebsite&amp;utm_campaign=cms" target="_blank" style="display: none;">Cash Management Services</a>
          `;
          linkEl.setAttribute('data-toggle', 'dropdown'); // Required for dropdown JS
        }
        li.append(linkEl, dropdownMenu);
      } else {
        linkEl.textContent = labelText;
        li.append(linkEl);
      }
    } else {
      li.append(linkEl);
    }
    topActionsUl.append(li);
  });

  topActionsNav.append(topActionsUl);
  topActionsDiv.append(topActionsNav);

  containerFluid.append(toggler, navbarBrand, navmask, navbarCollapse, topActionsDiv);
  nav.append(containerFluid);
  header.append(nav);

  block.textContent = '';
  block.append(header);

  // Add event listener for toggler
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    toggler.classList.toggle('collapsed');
  });

  closeNav.addEventListener('click', () => {
    navbarCollapse.classList.remove('show');
    toggler.classList.remove('collapsed');
  });

  // Event listener for search icon to toggle search box visibility
  const searchIconLink = block.querySelector('#searchPopModal_open');
  if (searchIconLink) {
    searchIconLink.addEventListener('click', (event) => {
      event.preventDefault();
      const searchBox = block.querySelector('.search-box');
      if (searchBox) {
        if (searchBox.style.display === 'none') {
          searchBox.style.display = 'block';
        } else {
          searchBox.style.display = 'none';
        }
      }
    });
  }

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Handle dropdowns manually since Bootstrap JS is not loaded
  block.querySelectorAll('.dropdown-toggle').forEach((dropdownToggle) => {
    dropdownToggle.addEventListener('click', (event) => {
      event.preventDefault();
      const dropdownMenu = dropdownToggle.nextElementSibling;
      if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
        dropdownMenu.classList.toggle('show');
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (event) => {
    block.querySelectorAll('.dropdown').forEach((dropdown) => {
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      if (dropdownMenu && !dropdown.contains(event.target) && dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
      }
    });
  });
}
