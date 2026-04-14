import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    year80LogoRow,
    year80LogoLinkRow,
    year80LogoLinkLabelRow,
    ...navItemRows
  ] = [...block.children];

  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid'); // 'nav-up' is a scroll state class, do not add initially

  const container = document.createElement('div');
  container.classList.add('container');
  header.append(container);

  const wrap = document.createElement('div');
  wrap.classList.add('wrap');
  container.append(wrap);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  wrap.append(logoDiv);

  const logoAnchor = document.createElement('a');
  const logoLink = logoLinkRow.querySelector('a');
  if (logoLink) {
    logoAnchor.href = logoLink.href;
    moveInstrumentation(logoLinkRow, logoAnchor);
  } else {
    logoAnchor.href = '#';
  }

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1');
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    logoAnchor.append(optimizedPic);
  }
  logoDiv.append(logoAnchor);

  // Hamburger
  const hamburgerDiv = document.createElement('div');
  hamburgerDiv.classList.add('hamburger');
  hamburgerDiv.setAttribute('data-once', 'hamburger-click nav-close-search');
  const hamburgerUl = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    hamburgerUl.append(document.createElement('li'));
  }
  hamburgerDiv.append(hamburgerUl);
  wrap.append(hamburgerDiv);

  // Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  nav.setAttribute('data-once', 'initSubChildToggle');
  wrap.append(nav);

  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);

  // Nav Items
  navItemRows.forEach((row) => {
    const [labelCell, linkCell, linkLabelCell, subLinksCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');
    li.setAttribute('data-once', 'nav-close-search');

    const anchor = document.createElement('a');
    anchor.setAttribute('itemprop', 'url');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      moveInstrumentation(linkCell, anchor);
    } else {
      anchor.href = '#';
    }
    anchor.textContent = linkLabelCell.textContent.trim() || labelCell.textContent.trim();
    li.append(anchor);

    const subList = subLinksCell?.querySelector('ul');
    if (subList) {
      const span = document.createElement('span');
      const img = document.createElement('img');
      img.alt = 'svg file';
      img.src = '/content/dam/aemigrate/uploaded-folder/image/1776164448796.svg+xml'; // Example SVG, replace if needed
      span.append(img);
      li.append(span);

      const megaMenu = document.createElement('div');
      megaMenu.classList.add('mega-menu');
      const megaMenuWrap = document.createElement('div');
      megaMenuWrap.classList.add('wrap', 'container');
      const centerDiv = document.createElement('div');
      centerDiv.classList.add('center-div');
      const subNavWrap = document.createElement('div');
      subNavWrap.classList.add('sub-nav-wrap');
      subNavWrap.append(subList); // Move the authored UL here
      centerDiv.append(subNavWrap);
      megaMenuWrap.append(centerDiv);
      megaMenu.append(megaMenuWrap);
      li.append(megaMenu);

      // Add toggle functionality for sub-menus
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        li.classList.toggle('active');
      });
      span.addEventListener('click', (e) => {
        e.preventDefault();
        li.classList.toggle('active');
      });

      // Transform nested lists within the sub-menu
      function transformNestedLists(rootUl) {
        rootUl.querySelectorAll('li').forEach(itemLi => {
          const nested = itemLi.querySelector(':scope > ul');
          if (nested) {
            nested.remove();
            const subWrap = document.createElement('div');
            subWrap.classList.add('has-sub-child');
            subWrap.append(nested);
            itemLi.append(subWrap);

            const trigger = itemLi.querySelector(':scope > a') || itemLi;
            trigger.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              itemLi.classList.toggle('active');
              subWrap.classList.toggle('active');
            });

            // Handle deeper nesting
            transformNestedLists(nested);
          }
        });
      }
      transformNestedLists(subList);
    }
    navUl.append(li);
  });

  // Icon Nav (Mobile)
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconNavUl = document.createElement('ul');
  // Add Contact Us link
  const contactUsLiMobile = document.createElement('li');
  contactUsLiMobile.classList.add('mail');
  const contactUsAnchorMobile = document.createElement('a');
  contactUsAnchorMobile.href = 'https://www.mahindra.com/contact-us';
  contactUsAnchorMobile.textContent = 'Contact Us';
  contactUsLiMobile.append(contactUsAnchorMobile);
  mobileIconNavUl.append(contactUsLiMobile);

  // Add Search functionality for mobile
  const searchLiMobile = document.createElement('li');
  searchLiMobile.classList.add('search');
  searchLiMobile.setAttribute('data-once', 'search-toggle search-stop-propagation');
  const searchAnchorMobile = document.createElement('a');
  searchAnchorMobile.href = '#';
  searchAnchorMobile.setAttribute('data-once', 'search-stop-propagation');
  const searchImgMobile1 = document.createElement('img');
  searchImgMobile1.alt = 'svg file';
  searchImgMobile1.src = '/content/dam/aemigrate/uploaded-folder/image/1776164449055.svg+xml';
  const searchImgMobile2 = document.createElement('img');
  searchImgMobile2.alt = 'svg file';
  searchImgMobile2.src = '/content/dam/aemigrate/uploaded-folder/image/1776164449143.svg+xml';
  const searchSpanMobile = document.createElement('span');
  searchSpanMobile.setAttribute('data-once', 'search-stop-propagation');
  searchSpanMobile.textContent = ' Search';
  searchAnchorMobile.append(searchImgMobile1, searchImgMobile2, searchSpanMobile);
  searchLiMobile.append(searchAnchorMobile);

  const searchScreenWrapMobile = createSearchScreenWrap();
  searchLiMobile.append(searchScreenWrapMobile);
  mobileIconNavUl.append(searchLiMobile);
  mobileIconNav.append(mobileIconNavUl);
  navUl.append(mobileIconNav); // Mobile icon nav is a child of ul

  // Icon Nav (Desktop)
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconNavUl = document.createElement('ul');
  // Add Contact Us link
  const contactUsLiDesktop = document.createElement('li');
  contactUsLiDesktop.classList.add('mail');
  const contactUsAnchorDesktop = document.createElement('a');
  contactUsAnchorDesktop.href = 'https://www.mahindra.com/contact-us';
  const contactUsImgDesktop = document.createElement('img');
  contactUsImgDesktop.alt = 'svg file';
  contactUsImgDesktop.src = '/content/dam/aemigrate/uploaded-folder/image/1776164449550.svg+xml';
  contactUsAnchorDesktop.append(contactUsImgDesktop);
  contactUsLiDesktop.append(contactUsAnchorDesktop);
  desktopIconNavUl.append(contactUsLiDesktop);

  // Add Search functionality for desktop
  const searchLiDesktop = document.createElement('li');
  searchLiDesktop.classList.add('search');
  searchLiDesktop.setAttribute('data-once', 'search-toggle search-stop-propagation');
  const searchAnchorDesktop = document.createElement('a');
  searchAnchorDesktop.href = '#';
  searchAnchorDesktop.setAttribute('data-once', 'search-stop-propagation');
  const searchImgDesktop1 = document.createElement('img');
  searchImgDesktop1.alt = 'svg file';
  searchImgDesktop1.src = '/content/dam/aemigrate/uploaded-folder/image/1776164449055.svg+xml';
  const searchImgDesktop2 = document.createElement('img');
  searchImgDesktop2.alt = 'svg file';
  searchImgDesktop2.src = '/content/dam/aemigrate/uploaded-folder/image/1776164449143.svg+xml';
  searchAnchorDesktop.append(searchImgDesktop1, searchImgDesktop2);
  searchLiDesktop.append(searchAnchorDesktop);

  const searchScreenWrapDesktop = createSearchScreenWrap();
  searchLiDesktop.append(searchScreenWrapDesktop);
  desktopIconNavUl.append(searchLiDesktop);
  desktopIconNav.append(desktopIconNavUl);
  nav.append(desktopIconNav); // Desktop icon nav is a sibling of ul, not child of ul

  // 80th Year Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  wrap.append(year80LogoDiv);

  const year80LogoAnchor = document.createElement('a');
  const year80LogoLink = year80LogoLinkRow.querySelector('a');
  if (year80LogoLink) {
    year80LogoAnchor.href = year80LogoLink.href;
    moveInstrumentation(year80LogoLinkRow, year80LogoAnchor);
  } else {
    year80LogoAnchor.href = '#';
  }

  const year80LogoPicture = year80LogoRow.querySelector('picture');
  if (year80LogoPicture) {
    const img = year80LogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1', 'years-80');
    moveInstrumentation(year80LogoRow, optimizedPic.querySelector('img'));
    year80LogoAnchor.append(optimizedPic);
  }
  year80LogoDiv.append(year80LogoAnchor);

  // Clear block and append new header
  block.textContent = '';
  block.append(header);

  // Image optimization for all pictures in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Add event listeners for interactive elements
  // Hamburger menu toggle
  hamburgerDiv.addEventListener('click', () => {
    header.classList.toggle('nav-up'); // Assuming 'nav-up' is the class to show/hide nav
    nav.classList.toggle('active');
    hamburgerDiv.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // Prevent scrolling when nav is open
  });

  // Search toggle (for both mobile and desktop)
  block.querySelectorAll('.search').forEach((searchToggle) => {
    const searchAnchor = searchToggle.querySelector('a');
    const searchScreenWrap = searchToggle.querySelector('.search-screen-wrap');

    if (searchAnchor && searchScreenWrap) {
      searchAnchor.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent immediate closing from document click
        searchScreenWrap.classList.toggle('active');
        searchToggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        // Focus on the search input when opened
        const searchInput = searchScreenWrap.querySelector('.searchtext');
        if (searchInput) {
          searchInput.focus();
        }
      });

      // Close search when clicking outside
      document.addEventListener('click', (e) => {
        if (!searchToggle.contains(e.target) && searchScreenWrap.classList.contains('active')) {
          searchScreenWrap.classList.remove('active');
          searchToggle.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      });

      // Prevent closing when clicking inside the search screen wrap
      searchScreenWrap.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });
}

function createSearchScreenWrap() {
  const searchScreenWrap = document.createElement('div');
  searchScreenWrap.classList.add('search-screen-wrap');
  searchScreenWrap.setAttribute('data-once', 'search-stop-propagation');

  const wrapDiv = document.createElement('div');
  wrapDiv.classList.add('wrap');
  wrapDiv.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrap.append(wrapDiv);

  const form = document.createElement('form');
  form.action = 'https://www.mahindra.com/search';
  form.method = 'get';
  form.id = 'search-block-form';
  form.setAttribute('accept-charset', 'UTF-8');
  form.setAttribute('data-drupal-form-fields', 'edit-keys');
  form.setAttribute('data-once', 'search-stop-propagation');
  wrapDiv.append(form);

  const searchWrap = document.createElement('div');
  searchWrap.classList.add('search-wrap');
  searchWrap.setAttribute('data-once', 'search-stop-propagation');
  form.append(searchWrap);

  const searchIcon = document.createElement('div');
  searchIcon.classList.add('search-icon');
  searchIcon.setAttribute('data-once', 'search-stop-propagation');
  const searchIconImg = document.createElement('img');
  searchIconImg.alt = 'svg file';
  searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776164449299.svg+xml';
  searchIcon.append(searchIconImg);
  searchWrap.append(searchIcon);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('input-text', 'searchtext');
  searchInput.required = true;
  searchInput.name = 'key';
  searchInput.id = 'searchInput';
  searchInput.autocomplete = 'off';
  searchInput.setAttribute('data-once', 'search-stop-propagation');
  searchWrap.append(searchInput);

  const submitButton = document.createElement('button');
  submitButton.classList.add('submit-button');
  submitButton.setAttribute('data-once', 'search-stop-propagation');
  const submitLabel = document.createElement('div');
  submitLabel.classList.add('label');
  submitLabel.setAttribute('data-once', 'search-stop-propagation');
  submitLabel.textContent = ' Submit ';
  const submitImg = document.createElement('img');
  submitImg.alt = 'svg file';
  submitImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776164449399.svg+xml';
  submitButton.append(submitLabel, submitImg);
  searchWrap.append(submitButton);

  const searchResultBox = document.createElement('div');
  searchResultBox.classList.add('searchResultBox');
  searchResultBox.style.display = 'none';
  searchResultBox.setAttribute('data-once', 'search-stop-propagation');
  // Add swiper structure if needed, for now, just the container
  searchResultBox.innerHTML = `
    <div class="swiper scrollSwiper" data-once="search-stop-propagation">
      <div class="swiper-wrapper" data-once="search-stop-propagation">
        <div class="swiper-slide" data-once="search-stop-propagation">
        </div>
      </div>
    </div>
    <div class="swiper-scrollbar" data-once="search-stop-propagation"></div>
  `;
  form.append(searchResultBox);

  // Popular Keywords
  const popularKeywordsWrap = document.createElement('div');
  popularKeywordsWrap.classList.add('search-suggestions-wrap');
  popularKeywordsWrap.setAttribute('data-once', 'search-stop-propagation');
  const popularKeywordsLabel = document.createElement('div');
  popularKeywordsLabel.classList.add('label');
  popularKeywordsLabel.setAttribute('data-once', 'search-stop-propagation');
  popularKeywordsLabel.textContent = 'Popular Keywords:';
  popularKeywordsWrap.append(popularKeywordsLabel);
  const popularKeywordsTokens = document.createElement('div');
  popularKeywordsTokens.classList.add('tokens-wrap');
  popularKeywordsTokens.setAttribute('data-once', 'search-stop-propagation');
  const popularKeywordsUl = document.createElement('ul');
  popularKeywordsUl.setAttribute('data-once', 'search-stop-propagation');
  ['Business', 'FY 21', 'Brands', 'XUV700', 'Global', 'Nanhi Kali'].forEach(keyword => {
    const li = document.createElement('li');
    li.setAttribute('data-once', 'search-stop-propagation');
    li.textContent = keyword;
    popularKeywordsUl.append(li);
  });
  popularKeywordsTokens.append(popularKeywordsUl);
  popularKeywordsWrap.append(popularKeywordsTokens);
  wrapDiv.append(popularKeywordsWrap);

  // Recommended for you
  const recommendedWrap = document.createElement('div');
  recommendedWrap.classList.add('search-suggestions-wrap');
  recommendedWrap.setAttribute('data-once', 'search-stop-propagation');
  const recommendedLabel = document.createElement('div');
  recommendedLabel.classList.add('label');
  recommendedLabel.setAttribute('data-once', 'search-stop-propagation');
  recommendedLabel.textContent = 'Recommended for you:';
  recommendedWrap.append(recommendedLabel);
  const recommendedTokens = document.createElement('div');
  recommendedTokens.classList.add('tokens-wrap');
  recommendedTokens.setAttribute('data-once', 'search-stop-propagation');
  const recommendedUl = document.createElement('ul');
  recommendedUl.setAttribute('data-once', 'search-stop-propagation');
  ['Annual Report 2021 - 2022', 'Leadership Announcement', 'Latest Press Release', 'Brand Guidelines'].forEach(keyword => {
    const li = document.createElement('li');
    li.setAttribute('data-once', 'search-stop-propagation');
    li.textContent = keyword;
    recommendedUl.append(li);
  });
  recommendedTokens.append(recommendedUl);
  recommendedWrap.append(recommendedTokens);
  wrapDiv.append(recommendedWrap);

  return searchScreenWrap;
}
