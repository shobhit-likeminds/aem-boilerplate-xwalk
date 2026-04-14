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

  // Create header element
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
  const logoHref = logoLinkRow.querySelector('a')?.href || '#';
  logoLink.href = logoHref;
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1');
  }
  logoDiv.append(logoLink);
  wrap.append(logoDiv);

  // Hamburger
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.setAttribute('data-once', 'hamburger-click nav-close-search');
  const hamburgerUl = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    hamburgerUl.append(document.createElement('li'));
  }
  hamburger.append(hamburgerUl);
  wrap.append(hamburger);

  // Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  nav.setAttribute('data-once', 'initSubChildToggle');
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);
  wrap.append(nav);

  navItemRows.forEach((row) => {
    const cells = [...row.children];
    // Use content detection instead of index access
    const labelCell = cells.find((cell) => !cell.querySelector('a') && !cell.querySelector('ul'));
    const linkCell = cells.find((cell) => cell.querySelector('a'));
    const subLinksCell = cells.find((cell) => cell.querySelector('ul'));
    // Assuming linkLabelCell is the text content of the link, it might be the same as labelCell if no explicit link label is provided.
    // For simplicity, we'll use the labelCell text content if linkLabelCell is not distinct.
    const linkLabelCell = cells.find((cell) => cell !== labelCell && cell !== linkCell && cell !== subLinksCell);

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');
    if (subList) {
      li.classList.add('has-child', 'hover-red');
      li.setAttribute('itemprop', 'name');
      li.setAttribute('data-once', 'nav-close-search');

      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell.textContent.trim();
      anchor.setAttribute('itemprop', 'url');
      moveInstrumentation(linkCell, anchor);
      li.append(anchor);

      const span = document.createElement('span');
      const svgImg = document.createElement('img');
      svgImg.alt = 'svg file';
      // This SVG is from the original HTML, but its path is hardcoded.
      // If it were dynamic, we would read it from a block cell.
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
      const h4 = document.createElement('h4');
      h4.classList.add('left-div-heading');
      const h4Link = document.createElement('a');
      h4Link.textContent = labelCell.textContent.trim();
      h4.append(h4Link);
      leftDiv.append(h4);

      // Move the sub-links into a new div
      const subNavWrap = document.createElement('div');
      subNavWrap.classList.add('sub-nav-wrap');
      // Add specific classes based on the original HTML for certain nav items
      if (labelCell.textContent.trim().toLowerCase() === 'who we are') {
        subNavWrap.classList.add('about-us-sub-nav');
        // Add left-div-desc and left-div-subdesc if present in the original HTML for this specific item
        const pDesc = document.createElement('p');
        pDesc.classList.add('left-div-desc');
        pDesc.textContent = 'Drive positive change in the lives of our communities. Only when we enable others to rise will we rise.';
        leftDiv.append(pDesc);
        const pSubDesc = document.createElement('p');
        pSubDesc.classList.add('left-div-subdesc');
        pSubDesc.textContent = '#TogetherWeRise';
        leftDiv.append(pSubDesc);
      } else if (labelCell.textContent.trim().toLowerCase() === 'what we do') {
        subNavWrap.classList.add('what-we-do');
        const h4KeyFacts = document.createElement('h4');
        h4KeyFacts.classList.add('left-div-heading');
        const h4KeyFactsLink = document.createElement('a');
        h4KeyFactsLink.textContent = 'Key Facts';
        h4KeyFacts.append(h4KeyFactsLink);
        leftDiv.append(h4KeyFacts);
        const ulKeyFacts = document.createElement('ul');
        ['20+ Industries', '100+ Countries', '324K+ Employees'].forEach((text) => {
          const liKeyFact = document.createElement('li');
          liKeyFact.classList.add('list-text-red');
          const [value, label] = text.split(' ');
          liKeyFact.innerHTML = `${value} <span>${label}</span>`;
          ulKeyFacts.append(liKeyFact);
        });
        leftDiv.append(ulKeyFacts);
      } else if (labelCell.textContent.trim().toLowerCase() === 'investor relations') {
        leftDiv.classList.add('ir-left-div');
        const h4Ir = document.createElement('h4');
        h4Ir.classList.add('left-div-heading');
        const h4IrLink = document.createElement('a');
        h4IrLink.textContent = 'Investor Relations';
        h4Ir.append(h4IrLink);
        leftDiv.append(h4Ir);
        const pIr = document.createElement('p');
        pIr.textContent = 'Group Highlights - Q3 F26';
        leftDiv.append(pIr);
        const ulIr = document.createElement('ul');
        ['20.1% Consolidated ROE (Annualized)', 'Rs 52,100 cr Revenue', 'Rs 4,675 cr PAT'].forEach((text) => {
          const liIr = document.createElement('li');
          liIr.classList.add('list-text-red');
          const [value, ...labelParts] = text.split(' ');
          liIr.innerHTML = `${value} <span>${labelParts.join(' ')}</span>`;
          ulIr.append(liIr);
        });
        leftDiv.append(ulIr);
        subNavWrap.classList.add('element-block');
      } else if (labelCell.textContent.trim().toLowerCase() === 'newsroom') {
        leftDiv.classList.add('newsroom-left-div');
        const h4Newsroom = document.createElement('h4');
        h4Newsroom.classList.add('left-div-heading');
        const h4NewsroomLink = document.createElement('a');
        h4NewsroomLink.textContent = 'Newsroom';
        h4Newsroom.append(h4NewsroomLink);
        leftDiv.append(h4Newsroom);
        const latestTwoPressRelease = document.createElement('div');
        latestTwoPressRelease.classList.add('latest-two-press-release');
        // Placeholder for dynamic news content - in a real scenario, this would be
        // populated from additional block fields or an API.
        latestTwoPressRelease.innerHTML = `
          <div class="slides"><div class="wrap">
            <div class="content">
              <div class="desc">
                <p><a href="/news-room/press-release/en/swaraj-announces-price-hike-across-its-tractor-range-effective-april-21-2026" hreflang="en">Swaraj announces price hike across its Tractor range effective April 21, 2026</a></p>
                <div class="date">
                  <em><time datetime="2026-04-07T12:00:00Z">7 April 2026</time></em><em>Farm</em>
                </div>
              </div>
            </div>
          </div></div>
          <div class="slides"><div class="wrap">
            <div class="content">
              <div class="desc">
                <p><a href="/news-room/press-release/en/mahindra-announces-price-hike-across-its-tractor-range-effective-april-08-2026" hreflang="en">Mahindra announces price hike across its Tractor range effective April 08, 2026</a></p>
                <div class="date">
                  <em><time datetime="2026-04-07T12:00:00Z">7 April 2026</time></em><em>Farm</em>
                </div>
              </div>
            </div>
          </div></div>
        `;
        leftDiv.append(latestTwoPressRelease);
      } else if (labelCell.textContent.trim().toLowerCase() === 'careers') {
        leftDiv.classList.add('career-left-div');
        const h4Careers = document.createElement('h4');
        h4Careers.classList.add('left-div-heading');
        const h4CareersLink = document.createElement('a');
        h4CareersLink.textContent = 'careers';
        h4Careers.append(h4CareersLink);
        leftDiv.append(h4Careers);
        const pDesc = document.createElement('p');
        pDesc.classList.add('left-div-desc');
        pDesc.textContent = 'Committed to elevate the lives of communities, guided by our core behaviours and values.';
        leftDiv.append(pDesc);
        const pSubDesc = document.createElement('p');
        pSubDesc.classList.add('left-div-subdesc');
        pSubDesc.textContent = 'Bold. Agile. Collaborative.';
        leftDiv.append(pSubDesc);
        subNavWrap.classList.add('careers-div');
      }

      subNavWrap.append(subList);
      centerDiv.append(leftDiv, subNavWrap);
      megaMenuWrap.append(centerDiv);
      megaMenu.append(megaMenuWrap);
      li.append(megaMenu);
    } else {
      // Simple flat link
      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell.textContent.trim();
      moveInstrumentation(row, anchor);
      li.append(anchor);
    }
    navUl.append(li);
  });

  // Mobile Icons Nav
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  const mobileIconUl = document.createElement('ul');
  mobileIconNav.append(mobileIconUl);

  const mailLiMobile = document.createElement('li');
  mailLiMobile.classList.add('mail');
  const mailLinkMobile = document.createElement('a');
  mailLinkMobile.href = 'https://www.mahindra.com/contact-us';
  mailLinkMobile.textContent = 'Contact Us';
  mailLiMobile.append(mailLinkMobile);
  mobileIconUl.append(mailLiMobile);

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

  const searchScreenWrapMobile = document.createElement('div');
  searchScreenWrapMobile.classList.add('search-screen-wrap');
  searchScreenWrapMobile.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapMobile.innerHTML = `
    <div class="wrap" data-once="search-stop-propagation">
      <form action="https://www.mahindra.com/search" method="get" id="search-block-form" accept-charset="UTF-8" data-drupal-form-fields="edit-keys" data-once="search-stop-propagation">
        <div class="search-wrap" data-once="search-stop-propagation">
          <div class="search-icon" data-once="search-stop-propagation">
            <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776145924308.svg+xml"/>
          </div>
          <input type="text" class="input-text searchtext" required="" name="key" id="searchInput" autocomplete="off" data-once="search-stop-propagation">
          <button class="submit-button" data-once="search-stop-propagation">
            <div class="label" data-once="search-stop-propagation"> Submit </div>
            <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776145924935.svg+xml"/>
          </button>
        </div>
        <div class="searchResultBox" style="display: none;" data-once="search-stop-propagation">
          <div class="swiper scrollSwiper" data-once="search-stop-propagation">
            <div class="swiper-wrapper" data-once="search-stop-propagation">
              <div class="swiper-slide" data-once="search-stop-propagation">
              </div>
            </div>
          </div>
          <div class="swiper-scrollbar" data-once="search-stop-propagation"></div>
        </div>
      </form>
      <div class="search-suggestions-wrap" data-once="search-stop-propagation">
        <div class="label" data-once="search-stop-propagation">Popular Keywords:</div>
        <div class="tokens-wrap" data-once="search-stop-propagation">
          <ul data-once="search-stop-propagation">
            <li data-once="search-stop-propagation">Business</li>
            <li data-once="search-stop-propagation">FY 21</li>
            <li data-once="search-stop-propagation">Brands</li>
            <li data-once="search-stop-propagation">XUV700</li>
            <li data-once="search-stop-propagation">Global</li>
            <li data-once="search-stop-propagation">Nanhi Kali</li>
          </ul>
        </div>
      </div>
      <div class="search-suggestions-wrap" data-once="search-stop-propagation">
        <div class="label" data-once="search-stop-propagation">Recommended for you:</div>
        <div class="tokens-wrap" data-once="search-stop-propagation">
          <ul data-once="search-stop-propagation">
            <li data-once="search-stop-propagation">Annual Report 2021 - 2022</li>
            <li data-once="search-stop-propagation">Leadership Announcement</li>
            <li data-once="search-stop-propagation">Latest Press Release</li>
            <li data-once="search-stop-propagation">Brand Guidelines</li>
          </ul>
        </div>
      </div>
    </div>
  `;
  searchLiMobile.append(searchScreenWrapMobile);
  mobileIconUl.append(searchLiMobile);
  navUl.append(mobileIconNav);

  // Desktop Icons Nav
  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  const desktopIconUl = document.createElement('ul');
  desktopIconNav.append(desktopIconUl);

  const mailLiDesktop = document.createElement('li');
  mailLiDesktop.classList.add('mail');
  const mailLinkDesktop = document.createElement('a');
  mailLinkDesktop.href = 'https://www.mahindra.com/contact-us';
  const mailImgDesktop = document.createElement('img');
  mailImgDesktop.alt = 'svg file';
  mailImgDesktop.src = '/content/dam/aemigrate/uploaded-folder/image/1776145926048.svg+xml';
  mailLinkDesktop.append(mailImgDesktop);
  mailLiDesktop.append(mailLinkDesktop);
  desktopIconUl.append(mailLiDesktop);

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

  const searchScreenWrapDesktop = document.createElement('div');
  searchScreenWrapDesktop.classList.add('search-screen-wrap');
  searchScreenWrapDesktop.setAttribute('data-once', 'search-stop-propagation');
  searchScreenWrapDesktop.innerHTML = `
    <div class="wrap" data-once="search-stop-propagation">
      <form action="https://www.mahindra.com/search" method="get" id="search-block-form" accept-charset="UTF-8" data-drupal-form-fields="edit-keys" data-once="search-stop-propagation">
        <div class="search-wrap" data-once="search-stop-propagation">
          <div class="search-icon" data-once="search-stop-propagation">
            <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776145924308.svg+xml"/>
          </div>
          <input type="text" class="input-text searchtext" required="" name="key" id="searchInput" autocomplete="off" data-once="search-stop-propagation">
          <button class="submit-button" data-once="search-stop-propagation">
            <div class="label" data-once="search-stop-propagation"> Submit </div>
            <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776145924935.svg+xml"/>
          </button>
        </div>
        <div class="searchResultBox" style="display: none;" data-once="search-stop-propagation">
          <div class="swiper scrollSwiper" data-once="search-stop-propagation">
            <div class="swiper-wrapper" data-once="search-stop-propagation">
              <div class="swiper-slide" data-once="search-stop-propagation">
              </div>
            </div>
          </div>
          <div class="swiper-scrollbar" data-once="search-stop-propagation"></div>
        </div>
      </form>
      <div class="search-suggestions-wrap" data-once="search-stop-propagation">
        <div class="label" data-once="search-stop-propagation">Popular Keywords:</div>
        <div class="tokens-wrap" data-once="search-stop-propagation">
          <ul data-once="search-stop-propagation">
            <li data-once="search-stop-propagation">Business</li>
            <li data-once="search-stop-propagation">FY 21</li>
            <li data-once="search-stop-propagation">Brands</li>
            <li data-once="search-stop-propagation">XUV700</li>
            <li data-once="search-stop-propagation">Global</li>
            <li data-once="search-stop-propagation">Nanhi Kali</li>
          </ul>
        </div>
      </div>
      <div class="search-suggestions-wrap" data-once="search-stop-propagation">
        <div class="label" data-once="search-stop-propagation">Recommended for you:</div>
        <div class="tokens-wrap" data-once="search-stop-propagation">
          <ul data-once="search-stop-propagation">
            <li data-once="search-stop-propagation">Annual Report 2021 - 2022</li>
            <li data-once="search-stop-propagation">Leadership Announcement</li>
            <li data-once="search-stop-propagation">Latest Press Release</li>
            <li data-once="search-stop-propagation">Brand Guidelines</li>
          </ul>
        </div>
      </div>
    </div>
  `;
  searchLiDesktop.append(searchScreenWrapDesktop);
  desktopIconUl.append(searchLiDesktop);
  nav.append(desktopIconNav);

  // 80th Year Logo
  const year80LogoDiv = document.createElement('div');
  year80LogoDiv.classList.add('logo', 'year-80-logo');
  const year80LogoLink = document.createElement('a');
  const year80LogoHref = year80LogoLinkRow.querySelector('a')?.href || '#';
  year80LogoLink.href = year80LogoHref;
  moveInstrumentation(year80LogoLinkRow, year80LogoLink);

  const year80LogoPicture = year80LogoRow.querySelector('picture');
  if (year80LogoPicture) {
    const img = year80LogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    year80LogoLink.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1', 'years-80');
  }
  year80LogoDiv.append(year80LogoLink);
  wrap.append(year80LogoDiv);

  // Hamburger click event
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('close-btn');
    document.body.classList.toggle('no-scroll');
  });

  // Search toggle event
  const searchTriggers = header.querySelectorAll('.search > a');
  searchTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const searchScreenWrap = trigger.nextElementSibling;
      searchScreenWrap.classList.toggle('active');
      trigger.closest('.search').classList.toggle('active');
    });
  });

  // Mega menu toggle event for desktop
  navUl.querySelectorAll('li.has-child > span').forEach((span) => {
    span.addEventListener('click', () => {
      const li = span.closest('li.has-child');
      li.classList.toggle('active');
    });
  });

  block.textContent = '';
  block.append(header);
}
