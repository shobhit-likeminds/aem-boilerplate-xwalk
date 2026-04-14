import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Use content detection for the first 6 rows which are single-cell fields
  const rows = [...block.children];

  const logoRow = rows.find(row => row.querySelector('picture') && !row.nextElementSibling?.querySelector('a'));
  const logoLinkRow = rows.find(row => row.querySelector('a') && row.previousElementSibling?.querySelector('picture') && row.previousElementSibling.previousElementSibling?.querySelector('picture') === null);
  const logoLinkLabelRow = rows.find(row => row.textContent.trim() !== '' && row.previousElementSibling?.querySelector('a') && row.previousElementSibling.previousElementSibling?.querySelector('picture'));

  const secondaryLogoRow = rows.find(row => row.querySelector('picture') && row.nextElementSibling?.querySelector('a'));
  const secondaryLogoLinkRow = rows.find(row => row.querySelector('a') && row.previousElementSibling?.querySelector('picture') && row.nextElementSibling?.textContent.trim() !== '');
  const secondaryLogoLinkLabelRow = rows.find(row => row.textContent.trim() !== '' && row.previousElementSibling?.querySelector('a') && row.previousElementSibling.previousElementSibling?.querySelector('picture'));

  const navItemRows = rows.filter(row =>
    row !== logoRow &&
    row !== logoLinkRow &&
    row !== logoLinkLabelRow &&
    row !== secondaryLogoRow &&
    row !== secondaryLogoLinkRow &&
    row !== secondaryLogoLinkLabelRow
  );

  block.textContent = '';

  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid', 'nav-up');
  header.setAttribute('data-once', 'header-hover');

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow?.querySelector('a'); // Use optional chaining
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  } else {
    logoLink.href = '#'; // Fallback if no link provided
  }

  const logoPicture = logoRow?.querySelector('picture'); // Use optional chaining
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const newImg = document.createElement('img');
    newImg.src = img.src;
    newImg.alt = img.alt;
    newImg.classList.add('hiddenlogo1');
    logoLink.append(newImg);
    moveInstrumentation(logoRow, newImg);
  }
  logoDiv.append(logoLink);
  wrap.append(logoDiv);

  // Hamburger
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.setAttribute('data-once', 'hamburger-click nav-close-search');
  const ulHamburger = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    ulHamburger.append(document.createElement('li'));
  }
  hamburger.append(ulHamburger);
  wrap.append(hamburger);

  // Main Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  nav.setAttribute('data-once', 'initSubChildToggle');
  wrap.append(nav);

  const ul = document.createElement('ul');
  ul.setAttribute('itemscope', '');
  ul.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(ul);

  navItemRows.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells[0];
    const linkCell = cells[1];
    const linkLabelCell = cells[2];
    const subLinksCell = cells[3];
    const subList = subLinksCell?.querySelector('ul');

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    if (subList) {
      li.classList.add('has-child', 'hover-red');
      li.setAttribute('itemprop', 'name');
      li.setAttribute('data-once', 'nav-close-search');

      const anchor = document.createElement('a');
      anchor.setAttribute('itemprop', 'url');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell.textContent.trim();
      li.append(anchor);

      const span = document.createElement('span');
      const svgImg = document.createElement('img');
      svgImg.alt = 'svg file';
      // This SVG is hardcoded in the original HTML, so we replicate it
      svgImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776145922536.svg+xml';
      span.append(svgImg);
      li.append(span);

      const megaMenu = document.createElement('div');
      megaMenu.classList.add('mega-menu');
      const megaMenuWrap = document.createElement('div');
      megaMenuWrap.classList.add('wrap', 'container');
      const centerDiv = document.createElement('div');
      centerDiv.classList.add('center-div');
      const leftDiv = document.createElement('div');
      leftDiv.classList.add('left-div');
      const leftDivHeading = document.createElement('h4');
      leftDivHeading.classList.add('left-div-heading');
      const headingLink = document.createElement('a');
      headingLink.textContent = labelCell.textContent.trim();
      leftDivHeading.append(headingLink);
      leftDiv.append(leftDivHeading);
      centerDiv.append(leftDiv);

      const subNavWrap = document.createElement('div');
      subNavWrap.classList.add('sub-nav-wrap');
      // Apply specific class based on the original HTML if detectable, otherwise generic
      if (labelCell.textContent.trim().toLowerCase().includes('who we are')) {
        subNavWrap.classList.add('about-us-sub-nav');
      } else if (labelCell.textContent.trim().toLowerCase().includes('what we do')) {
        subNavWrap.classList.add('what-we-do');
      } else if (labelCell.textContent.trim().toLowerCase().includes('investor relations')) {
        leftDiv.classList.add('ir-left-div');
        subNavWrap.classList.add('element-block');
        const subNavWrapOneLink = document.createElement('ul');
        subNavWrapOneLink.classList.add('sub-nav-wrap-one-link');
        // Example of adding a specific link from original HTML if applicable
        const disclosureLi = document.createElement('li');
        const disclosureLink = document.createElement('a');
        disclosureLink.href = 'https://www.mahindra.com/sites/default/files/2025-04/Disclosures-under-Reg-46-62-MM-URLs_PDF.pdf';
        disclosureLink.target = '_blank';
        disclosureLink.textContent = 'Disclosures Under Regulation 46 And 62 Of SEBI (LODR)';
        disclosureLi.append(disclosureLink);
        subNavWrapOneLink.append(disclosureLi);
        subNavWrap.append(subNavWrapOneLink);

        const innerSubNavWrapList = document.createElement('div');
        innerSubNavWrapList.classList.add('inner-sub-nav-wrap-list');
        const ul1 = document.createElement('ul');
        ul1.innerHTML = '<li><a href="https://www.mahindra.com/investor-relations/reports">Reports</a></li><li><a href="https://www.mahindra.com/investor-relations/policies-and-documents">Policies</a></li>';
        const ul2 = document.createElement('ul');
        ul2.innerHTML = '<li><a href="https://www.mahindra.com/investor-relations/regulatory-filings">Regulatory Filings</a></li><li><a href="https://www.mahindra.com/investor-relations/sustainability">Sustainability</a></li>';
        innerSubNavWrapList.append(ul1, ul2);
        subNavWrap.append(innerSubNavWrapList);
      } else if (labelCell.textContent.trim().toLowerCase().includes('newsroom')) {
        leftDiv.classList.add('newsroom-left-div');
        // Placeholder for newsroom specific content, as it's complex and dynamic in original HTML
        const latestTwoPressRelease = document.createElement('div');
        latestTwoPressRelease.classList.add('latest-two-press-release');
        leftDiv.append(latestTwoPressRelease);
      } else if (labelCell.textContent.trim().toLowerCase().includes('careers')) {
        leftDiv.classList.add('career-left-div');
        subNavWrap.classList.add('careers-div');
      }

      subNavWrap.append(subList); // Move the authored <ul> into the sub-nav-wrap
      centerDiv.append(subNavWrap);
      megaMenuWrap.append(centerDiv);
      megaMenu.append(megaMenuWrap);
      li.append(megaMenu);
    } else {
      // Simple flat link
      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell.textContent.trim();
      li.append(anchor);
    }
    ul.append(li);
  });

  // Icon Nav (Mobile)
  const iconNavMobile = document.createElement('div');
  iconNavMobile.classList.add('icon-nav', 'mobile-menus-icon');
  const ulMobile = document.createElement('ul');
  const mailLiMobile = document.createElement('li');
  mailLiMobile.classList.add('mail');
  const mailLinkMobile = document.createElement('a');
  mailLinkMobile.href = 'https://www.mahindra.com/contact-us';
  mailLinkMobile.textContent = 'Contact Us';
  mailLiMobile.append(mailLinkMobile);
  ulMobile.append(mailLiMobile);

  const searchLiMobile = document.createElement('li');
  searchLiMobile.classList.add('search');
  searchLiMobile.setAttribute('data-once', 'search-toggle search-stop-propagation');
  const searchLinkMobile = document.createElement('a');
  searchLinkMobile.href = '#';
  searchLinkMobile.setAttribute('data-once', 'search-stop-propagation');
  const searchImg1Mobile = document.createElement('img');
  searchImg1Mobile.alt = 'svg file';
  searchImg1Mobile.src = '/content/dam/aemigrate/uploaded-folder/image/1776145923573.svg+xml';
  const searchImg2Mobile = document.createElement('img');
  searchImg2Mobile.alt = 'svg file';
  searchImg2Mobile.src = '/content/dam/aemigrate/uploaded-folder/image/1776145924034.svg+xml';
  const searchSpanMobile = document.createElement('span');
  searchSpanMobile.setAttribute('data-once', 'search-stop-propagation');
  searchSpanMobile.textContent = ' Search';
  searchLinkMobile.append(searchImg1Mobile, searchImg2Mobile, searchSpanMobile);
  searchLiMobile.append(searchLinkMobile);
  ulMobile.append(searchLiMobile);
  iconNavMobile.append(ulMobile);
  nav.append(iconNavMobile);

  // Icon Nav (Desktop)
  const iconNavDesktop = document.createElement('div');
  iconNavDesktop.classList.add('icon-nav', 'desktop-menus-icon');
  const ulDesktop = document.createElement('ul');
  const mailLiDesktop = document.createElement('li');
  mailLiDesktop.classList.add('mail');
  const mailLinkDesktop = document.createElement('a');
  mailLinkDesktop.href = 'https://www.mahindra.com/contact-us';
  const mailImgDesktop = document.createElement('img');
  mailImgDesktop.alt = 'svg file';
  mailImgDesktop.src = '/content/dam/aemigrate/uploaded-folder/image/1776145926048.svg+xml';
  mailLinkDesktop.append(mailImgDesktop);
  mailLiDesktop.append(mailLinkDesktop);
  ulDesktop.append(mailLiDesktop);

  const searchLiDesktop = document.createElement('li');
  searchLiDesktop.classList.add('search');
  searchLiDesktop.setAttribute('data-once', 'search-toggle search-stop-propagation');
  const searchLinkDesktop = document.createElement('a');
  searchLinkDesktop.href = '#';
  searchLinkDesktop.setAttribute('data-once', 'search-stop-propagation');
  const searchImg1Desktop = document.createElement('img');
  searchImg1Desktop.alt = 'svg file';
  searchImg1Desktop.src = '/content/dam/aemigrate/uploaded-folder/image/1776145923573.svg+xml';
  const searchImg2Desktop = document.createElement('img');
  searchImg2Desktop.alt = 'svg file';
  searchImg2Desktop.src = '/content/dam/aemigrate/uploaded-folder/image/1776145924034.svg+xml';
  searchLinkDesktop.append(searchImg1Desktop, searchImg2Desktop);
  searchLiDesktop.append(searchLinkDesktop);
  ulDesktop.append(searchLiDesktop);
  iconNavDesktop.append(ulDesktop);
  nav.append(iconNavDesktop);

  // Search Screen Wrap (for both mobile and desktop search)
  const searchScreenWrap = document.createElement('div');
  searchScreenWrap.classList.add('search-screen-wrap');
  searchScreenWrap.setAttribute('data-once', 'search-stop-propagation');
  const searchWrapInner = document.createElement('div');
  searchWrapInner.classList.add('wrap');
  searchWrapInner.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrap.append(searchWrapInner);

  const searchForm = document.createElement('form');
  searchForm.action = 'https://www.mahindra.com/search';
  searchForm.method = 'get';
  searchForm.id = 'search-block-form';
  searchForm.setAttribute('accept-charset', 'UTF-8');
  searchForm.setAttribute('data-drupal-form-fields', 'edit-keys');
  searchForm.setAttribute('data-once', 'search-stop-propagation');
  searchWrapInner.append(searchForm);

  const searchInputWrap = document.createElement('div');
  searchInputWrap.classList.add('search-wrap');
  searchInputWrap.setAttribute('data-once', 'search-stop-propagation');
  searchForm.append(searchInputWrap);

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('search-icon');
  searchIconDiv.setAttribute('data-once', 'search-stop-propagation');
  const searchIconImg = document.createElement('img');
  searchIconImg.alt = 'svg file';
  searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776145924308.svg+xml';
  searchIconDiv.append(searchIconImg);
  searchInputWrap.append(searchIconDiv);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('input-text', 'searchtext');
  searchInput.required = true;
  searchInput.name = 'key';
  searchInput.id = 'searchInput';
  searchInput.autocomplete = 'off';
  searchInput.setAttribute('data-once', 'search-stop-propagation');
  searchInputWrap.append(searchInput);

  const submitButton = document.createElement('button');
  submitButton.classList.add('submit-button');
  submitButton.setAttribute('data-once', 'search-stop-propagation');
  const submitLabel = document.createElement('div');
  submitLabel.classList.add('label');
  submitLabel.setAttribute('data-once', 'search-stop-propagation');
  submitLabel.textContent = ' Submit ';
  const submitImg = document.createElement('img');
  submitImg.alt = 'svg file';
  submitImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776145924935.svg+xml';
  submitButton.append(submitLabel, submitImg);
  searchInputWrap.append(submitButton);

  searchLiMobile.append(searchScreenWrap.cloneNode(true)); // Clone for mobile
  searchLiDesktop.append(searchScreenWrap); // Use original for desktop

  // Secondary Logo (80th year logo)
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('logo', 'year-80-logo');
  const secondaryLogoLink = document.createElement('a');
  const foundSecondaryLogoLink = secondaryLogoLinkRow?.querySelector('a'); // Use optional chaining
  if (foundSecondaryLogoLink) {
    secondaryLogoLink.href = foundSecondaryLogoLink.href;
  } else {
    secondaryLogoLink.href = '#'; // Fallback if no link provided
  }

  const secondaryLogoPicture = secondaryLogoRow?.querySelector('picture'); // Use optional chaining
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const newImg = document.createElement('img');
    newImg.src = img.src;
    newImg.alt = img.alt;
    newImg.classList.add('hiddenlogo1', 'years-80');
    secondaryLogoLink.append(newImg);
    moveInstrumentation(secondaryLogoRow, newImg);
  }
  secondaryLogoDiv.append(secondaryLogoLink);
  wrap.append(secondaryLogoDiv);

  block.append(header);

  // Event Listeners for interactive behavior
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Toggle dropdowns for navigation items
  ul.querySelectorAll('li.has-child > span').forEach((span) => {
    span.addEventListener('click', () => {
      const parentLi = span.closest('li.has-child');
      parentLi.classList.toggle('active');
      const megaMenu = parentLi.querySelector('.mega-menu');
      if (megaMenu) {
        megaMenu.classList.toggle('active');
      }
    });
  });

  // Search toggle
  const searchTriggers = block.querySelectorAll('.search > a');
  const searchWraps = block.querySelectorAll('.search-screen-wrap');

  searchTriggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSearchWrap = searchWraps[index];
      targetSearchWrap.classList.toggle('active');
      trigger.closest('.search').classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  });

  searchWraps.forEach((wrapEl) => {
    wrapEl.addEventListener('click', (e) => {
      if (e.target === wrapEl) {
        wrapEl.classList.remove('active');
        wrapEl.closest('.search').classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // Nested navigation dropdowns (e.g., in "What we do" -> "Industries" -> "Automotive")
  // This targets 'li.top-level-li > span' and 'li.first-level-li > span'
  ul.querySelectorAll('li.top-level-li > span, li.first-level-li > span').forEach((span) => {
    span.addEventListener('click', () => {
      const parentLi = span.closest('li'); // This will be either top-level-li or first-level-li
      parentLi.classList.toggle('active');
      const subChildDiv = parentLi.querySelector('.has-sub-child, .has-inner-sub-child');
      if (subChildDiv) {
        subChildDiv.classList.toggle('active');
      }
    });
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
