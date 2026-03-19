import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Extract top-level fields
  const phonesContainerRow = children[0]; // field="phones"
  const consumerCareEmailRow = children[1]; // field="consumerCareEmail"
  const socialsContainerRow = children[2]; // field="socials"
  const brandLogoRow = children[3]; // field="brandLogo"
  const menusContainerRow = children[4]; // field="menus"
  const searchPlaceholderRow = children[5]; // field="searchPlaceholder"

  // Separate item rows based on structure
  const itemRows = children.slice(6);
  const phoneItems = itemRows.filter((row) => row.children.length === 2 && row.children[1].textContent.trim().match(/^\d/)); // heuristic: 2 cells, second cell starts with digit
  const socialItems = itemRows.filter((row) => row.children.length === 3 && row.children[0].querySelector('a')); // heuristic: 3 cells, first cell has a link
  const menuItems = itemRows.filter((row) => row.children.length === 2 && row.children[0].textContent.trim() && row.children[1].querySelector('a')); // heuristic: 2 cells, first cell has text, second cell has a link

  block.textContent = '';
  block.id = 'masthead';
  block.classList.add('header-site-header');

  // Top Nav
  const headerTopNav = document.createElement('div');
  headerTopNav.classList.add('header-top-nav');
  const topNavContainer = document.createElement('div');
  topNavContainer.classList.add('header-container');
  headerTopNav.append(topNavContainer);

  // Phones
  phoneItems.forEach((row) => {
    const phoneDiv = document.createElement('div');
    moveInstrumentation(row, phoneDiv);
    phoneDiv.classList.add('header-phone');

    const label = row.children[0].textContent.trim();
    const phoneNumber = row.children[1].textContent.trim();

    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
    phoneLink.textContent = `${label} ${phoneNumber}`;
    phoneDiv.append(phoneLink);
    topNavContainer.append(phoneDiv);
  });

  // Consumer Care Email
  if (consumerCareEmailRow) {
    const careDiv = document.createElement('div');
    moveInstrumentation(consumerCareEmailRow, careDiv);
    careDiv.classList.add('header-care');
    const emailLink = document.createElement('a');
    const email = consumerCareEmailRow.children[0].textContent.trim();
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = 'Consumer Care'; // Hardcoded as per original HTML
    careDiv.append(emailLink);
    topNavContainer.append(careDiv);
  }

  // Socials
  if (socialItems.length > 0) {
    const socialIconsDiv = document.createElement('div');
    socialIconsDiv.classList.add('header-social-icons');

    socialItems.forEach((row) => {
      const socialDiv = document.createElement('div');
      moveInstrumentation(row, socialDiv);
      socialDiv.classList.add('header-social');

      const linkCell = row.children[0];
      const iconCell = row.children[1];
      const altTextCell = row.children[2];

      const foundLink = linkCell.querySelector('a');
      const socialLink = document.createElement('a');
      if (foundLink) {
        socialLink.href = foundLink.href;
        socialLink.target = '_blank'; // As per original HTML
      }

      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, altTextCell.textContent.trim(), false, [{ width: '32' }]);
          optimizedPic.querySelector('img').classList.add('header-svg'); // As per original HTML
          optimizedPic.querySelector('img').width = '32'; // As per original HTML
          optimizedPic.querySelector('img').height = '32'; // As per original HTML
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          socialLink.append(optimizedPic);
        }
      }
      socialDiv.append(socialLink);
      socialIconsDiv.append(socialDiv);
    });
    topNavContainer.append(socialIconsDiv);
  }
  block.append(headerTopNav);

  // Main Nav
  const headerMainNav = document.createElement('div');
  headerMainNav.classList.add('header-main-nav');
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('header-container');
  headerMainNav.append(mainNavContainer);

  // Brand Logo
  if (brandLogoRow) {
    const brandingDiv = document.createElement('div');
    moveInstrumentation(brandLogoRow, brandingDiv);
    brandingDiv.classList.add('header-site-branding');

    const logoLink = document.createElement('a');
    logoLink.href = '/'; // Assuming home page link
    const picture = brandLogoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]); // Adjust width as needed
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        logoLink.append(optimizedPic);
      }
    }
    brandingDiv.append(logoLink);
    mainNavContainer.append(brandingDiv);
  }

  // Navigation
  const nav = document.createElement('nav');
  nav.id = 'site-navigation';
  nav.classList.add('header-main-navigation');

  const menuToggle = document.createElement('button');
  menuToggle.classList.add('header-menu-toggle');
  menuToggle.setAttribute('aria-controls', 'primary-menu');
  menuToggle.setAttribute('aria-expanded', 'false');

  const iconBar1 = document.createElement('span');
  iconBar1.classList.add('header-icon-bar');
  const iconBar2 = document.createElement('span');
  iconBar2.classList.add('header-icon-bar');
  const iconBar3 = document.createElement('span');
  iconBar3.classList.add('header-icon-bar');
  const menuText = document.createElement('span');
  menuText.classList.add('header-text');
  menuText.textContent = 'Primary Menu';

  menuToggle.append(iconBar1, iconBar2, iconBar3, menuText);
  nav.append(menuToggle);

  const menuContainer = document.createElement('div');
  menuContainer.classList.add('header-menu-nav-old-dutch-container');
  const ul = document.createElement('ul');
  ul.id = 'brand-menu';
  ul.classList.add('header-menu', 'header-nav-menu');

  menuItems.forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('header-menu-item', `header-menu-item-${21960 + index}`); // Mimic original IDs

    const label = row.children[0].textContent.trim();
    const linkCell = row.children[1];
    const foundLink = linkCell.querySelector('a');

    const menuLink = document.createElement('a');
    if (foundLink) {
      menuLink.href = foundLink.href;
    }
    menuLink.textContent = label;
    li.append(menuLink);
    ul.append(li);
  });
  menuContainer.append(ul);
  nav.append(menuContainer);

  const mobileNavBottom = document.createElement('div');
  mobileNavBottom.classList.add('header-mobile-nav-bottom');
  const mobileSearchDiv = document.createElement('div');
  const mobileSearchForm = document.createElement('form');
  mobileSearchForm.setAttribute('role', 'search');
  mobileSearchForm.setAttribute('method', 'get');
  mobileSearchForm.classList.add('header-search-form');
  mobileSearchForm.setAttribute('action', '/'); // Assuming root for search action

  const mobileSearchField = document.createElement('input');
  mobileSearchField.setAttribute('type', 'search');
  mobileSearchField.classList.add('header-search-field');
  mobileSearchField.setAttribute('placeholder', searchPlaceholderRow?.children[0]?.textContent.trim() || 'Site search');
  mobileSearchField.setAttribute('name', 's');
  mobileSearchField.setAttribute('value', '');

  const mobileSearchSubmit = document.createElement('input');
  mobileSearchSubmit.setAttribute('type', 'submit');
  mobileSearchSubmit.classList.add('header-search-submit');
  mobileSearchSubmit.setAttribute('value', '');

  mobileSearchForm.append(mobileSearchField, mobileSearchSubmit);
  mobileSearchDiv.append(mobileSearchForm);
  mobileNavBottom.append(mobileSearchDiv);
  nav.append(mobileNavBottom);

  mainNavContainer.append(nav);

  // Desktop Search Form
  const desktopSearchForm = document.createElement('form');
  desktopSearchForm.setAttribute('role', 'search');
  desktopSearchForm.setAttribute('method', 'get');
  desktopSearchForm.classList.add('header-search-form');
  desktopSearchForm.setAttribute('action', '/'); // Assuming root for search action

  const desktopSearchField = document.createElement('input');
  desktopSearchField.setAttribute('type', 'search');
  desktopSearchField.classList.add('header-search-field');
  desktopSearchField.setAttribute('placeholder', searchPlaceholderRow?.children[0]?.textContent.trim() || 'Site search');
  desktopSearchField.setAttribute('name', 's');
  desktopSearchField.setAttribute('value', '');

  const desktopSearchSubmit = document.createElement('input');
  desktopSearchSubmit.setAttribute('type', 'submit');
  desktopSearchSubmit.classList.add('header-search-submit');
  desktopSearchSubmit.setAttribute('value', '');

  desktopSearchForm.append(desktopSearchField, desktopSearchSubmit);
  mainNavContainer.append(desktopSearchForm);

  block.append(headerMainNav);

  // Add event listener for menu toggle
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    menuContainer.classList.toggle('show'); // Assuming 'show' class controls visibility
  });

  // Optimize all images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
