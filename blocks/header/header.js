import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    anniversaryLogoRow,
    anniversaryLogoLinkRow,
    anniversaryLogoLinkLabelRow,
    ...navItemRows
  ] = [...block.children];

  // Create header structure
  const header = document.createElement('header');
  header.classList.add('main-header', 'with-marquee', 'solid', 'nav-up');
  header.dataset.once = 'header-hover';

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
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  } else {
    logoLink.href = '/'; // Default link
  }

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1');
    logoLink.append(optimizedPic);
  } else {
    const defaultLogoImg = document.createElement('img');
    defaultLogoImg.src = '/content/dam/aemigrate/uploaded-folder/image/mahindra-red-logo.webp'; // Fallback if no logo provided
    defaultLogoImg.alt = 'Mahindra Brand Logo White';
    defaultLogoImg.classList.add('hiddenlogo1');
    logoLink.append(defaultLogoImg);
  }
  moveInstrumentation(logoRow, logoLink);
  logoDiv.append(logoLink);
  wrap.append(logoDiv);

  // Hamburger menu
  const hamburger = document.createElement('div');
  hamburger.classList.add('hamburger');
  hamburger.dataset.once = 'hamburger-click nav-close-search';
  const hamburgerUl = document.createElement('ul');
  for (let i = 0; i < 3; i += 1) {
    hamburgerUl.append(document.createElement('li'));
  }
  hamburger.append(hamburgerUl);
  wrap.append(hamburger);

  // Navigation
  const nav = document.createElement('nav');
  nav.classList.add('main-nav');
  nav.dataset.once = 'initSubChildToggle';
  const navUl = document.createElement('ul');
  navUl.setAttribute('itemscope', '');
  navUl.setAttribute('itemtype', 'http://www.schema.org/SiteNavigationElement');
  nav.append(navUl);

  navItemRows.forEach((row) => {
    const cells = [...row.children];
    // Content detection for nav-item fields
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('ul'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const linkLabelCell = cells.find(cell => cell.querySelector('a') && cell !== linkCell); // Assuming linkLabelCell also contains an <a>
    const subLinksCell = cells.find(cell => cell.querySelector('ul'));

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('has-child', 'hover-red');
    li.setAttribute('itemprop', 'name');
    li.dataset.once = 'nav-close-search';

    const anchor = document.createElement('a');
    anchor.setAttribute('itemprop', 'url');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim() || '';
    li.append(anchor);

    const subList = subLinksCell?.querySelector('ul');
    if (subList) {
      const span = document.createElement('span');
      const img = document.createElement('img');
      img.alt = 'svg file';
      img.src = '/content/dam/aemigrate/uploaded-folder/image/1776145922536.svg+xml'; // Example SVG, replace if dynamic
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
      subNavWrap.append(subList); // Move the authored ul into the sub-nav-wrap
      centerDiv.append(subNavWrap);
      megaMenuWrap.append(centerDiv);
      megaMenu.append(megaMenuWrap);
      li.append(megaMenu);

      // Add event listener for dropdown toggle
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        li.classList.toggle('active');
        megaMenu.classList.toggle('active');
      });
    }

    navUl.append(li);
  });

  // Add icon navigation (mobile and desktop)
  const mobileIconNav = document.createElement('div');
  mobileIconNav.classList.add('icon-nav', 'mobile-menus-icon');
  mobileIconNav.innerHTML = `
    <ul>
      <li class="mail">
        <a href="https://www.mahindra.com/contact-us">
          Contact Us
        </a>
      </li>
      <li class="search" data-once="search-toggle search-stop-propagation">
        <a href="#" data-once="search-stop-propagation">
          <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776145923573.svg+xml"/>
          <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776145924034.svg+xml"/>
          <span data-once="search-stop-propagation"> Search</span>
        </a>
        <div class="search-screen-wrap" data-once="search-stop-propagation">
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
        </div>
      </li>
    </ul>
  `;
  navUl.append(mobileIconNav);

  const desktopIconNav = document.createElement('div');
  desktopIconNav.classList.add('icon-nav', 'desktop-menus-icon');
  desktopIconNav.innerHTML = `
    <ul>
      <li class="mail">
        <a href="https://www.mahindra.com/contact-us">
          <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776145926048.svg+xml"/>
        </a>
      </li>
      <li class="search" data-once="search-toggle search-stop-propagation">
        <a href="#" data-once="search-stop-propagation">
          <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776145923573.svg+xml"/>
          <img alt="svg file" src="/content/dam/aemigrate/uploaded-folder/image/1776145924034.svg+xml"/>
        </a>
        <div class="search-screen-wrap" data-once="search-stop-propagation">
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
        </div>
      </li>
    </ul>
  `;
  nav.append(desktopIconNav);
  wrap.append(nav);

  // Anniversary Logo
  const anniversaryLogoDiv = document.createElement('div');
  anniversaryLogoDiv.classList.add('logo', 'year-80-logo');
  const anniversaryLogoLink = document.createElement('a');
  const foundAnniversaryLogoLink = anniversaryLogoLinkRow.querySelector('a');
  if (foundAnniversaryLogoLink) {
    anniversaryLogoLink.href = foundAnniversaryLogoLink.href;
  } else {
    anniversaryLogoLink.href = '/'; // Default link
  }

  const anniversaryLogoPicture = anniversaryLogoRow.querySelector('picture');
  if (anniversaryLogoPicture) {
    const img = anniversaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '74' }]);
    optimizedPic.querySelector('img').classList.add('hiddenlogo1', 'years-80');
    anniversaryLogoLink.append(optimizedPic);
  } else {
    const defaultAnniversaryLogoImg = document.createElement('img');
    defaultAnniversaryLogoImg.src = '/content/dam/aemigrate/uploaded-folder/image/80thyearlogo-gold-com.webp'; // Fallback
    defaultAnniversaryLogoImg.alt = '80th Year Logo Gold';
    defaultAnniversaryLogoImg.classList.add('hiddenlogo1', 'years-80');
    anniversaryLogoLink.append(defaultAnniversaryLogoImg);
  }
  moveInstrumentation(anniversaryLogoRow, anniversaryLogoLink);
  anniversaryLogoDiv.append(anniversaryLogoLink);
  wrap.append(anniversaryLogoDiv);

  block.textContent = '';
  block.append(header);

  // Image optimization for all pictures in the header
  header.querySelectorAll('picture > img').forEach((img) => {
    // Only optimize if it's not one of the specific logos that already have optimization
    if (!img.classList.contains('hiddenlogo1')) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    }
  });

  // Hamburger click event
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('close');
  });

  // Search toggle event
  const searchTriggers = header.querySelectorAll('.search > a');
  const searchScreenWraps = header.querySelectorAll('.search-screen-wrap');
  searchTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parentSearchLi = trigger.closest('li.search');
      const searchScreenWrap = parentSearchLi.querySelector('.search-screen-wrap');
      if (searchScreenWrap) {
        searchScreenWrap.classList.toggle('active');
      }
    });
  });
}
