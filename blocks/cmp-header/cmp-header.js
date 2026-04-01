import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, ...itemRows] = [...block.children];

  // Create the main header structure
  const header = document.createElement('div');
  header.classList.add('cmp-header');

  const hamburgerInput = document.createElement('input');
  hamburgerInput.classList.add('cmp-header__hamburger');
  hamburgerInput.type = 'checkbox';
  header.append(hamburgerInput);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo', 'image', 'cmp-header__logo');
  moveInstrumentation(logoRow, logoDiv);

  const logoImageWrapper = document.createElement('div');
  logoImageWrapper.classList.add('cmp-image'); // Add cmp-image class
  const logoLink = document.createElement('a');
  logoLink.classList.add('cmp-image__link');
  logoLink.href = '/'; // Default link for logo

  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  logoImageWrapper.append(logoLink);
  logoDiv.append(logoImageWrapper);
  header.append(logoDiv);

  // Navigation links container
  const navLinksDiv = document.createElement('div');
  navLinksDiv.classList.add('cmp-header__nav-links');
  const navigationDiv = document.createElement('div');
  navigationDiv.classList.add('navigation');
  navLinksDiv.append(navigationDiv);

  const nav = document.createElement('nav');
  nav.classList.add('cmp-navigation');
  nav.role = 'navigation';
  navigationDiv.append(nav);

  const navUl = document.createElement('ul');
  navUl.classList.add('cmp-navigation__group', 'cmp-header__nav-group');
  nav.append(navUl);

  // Filter item rows based on content
  const navigationItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a'));
  });
  const policyLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && !cells.some(cell => cell.querySelector('picture')) && cells.some(cell => cell.querySelector('a'));
  });
  const socialLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 1 && cells.some(cell => cell.querySelector('a'));
  });

  // Navigation Items
  navigationItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('cmp-navigation__item', 'cmp-navigation__item--level-0', 'cmp-header__nav-products', 'cmp-header__nav-products-click');

    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('a'));
    const linkCell = cells.find(cell => cell.querySelector('a'));

    if (linkCell) {
      const link = document.createElement('a');
      link.classList.add('cmp-navigation__item-link');
      link.href = linkCell.querySelector('a').href;
      link.textContent = labelCell ? labelCell.textContent.trim() : linkCell.querySelector('a').textContent.trim();
      li.append(link);
    } else if (labelCell) {
      const span = document.createElement('span'); // Use span if no link
      span.textContent = labelCell.textContent.trim();
      li.append(span);
    }

    navUl.append(li);
  });

  // Mobile list for policy and social links
  const mobileListDiv = document.createElement('div');
  mobileListDiv.classList.add('cmp-header__mobile-list');
  nav.append(mobileListDiv);

  const policyUl = document.createElement('ul');
  policyUl.classList.add('cmp-header__policy');
  mobileListDiv.append(policyUl);

  policyLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('cmp-header__policy-list');

    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    if (linkCell) {
      const link = document.createElement('a');
      link.href = linkCell.querySelector('a').href;
      link.textContent = linkCell.querySelector('a').textContent.trim();
      link.target = '_blank';
      li.append(link);
    }
    policyUl.append(li);
  });

  const socialMediaDiv = document.createElement('div');
  socialMediaDiv.classList.add('cmp-header__social-media');
  mobileListDiv.append(socialMediaDiv);

  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    if (linkCell) {
      const link = document.createElement('a');
      link.href = linkCell.querySelector('a').href;
      link.target = '_blank';
      const iconName = linkCell.querySelector('a').textContent.trim().toLowerCase();
      // Correcting 'icon-facebok' to 'icon-facebook' based on common practice, assuming typo in original HTML
      link.classList.add(`icon-${iconName === 'facebook' ? 'facebook' : iconName}`);
      link.setAttribute('data-social', iconName);
      socialMediaDiv.append(link);
    }
    moveInstrumentation(row, socialMediaDiv.lastElementChild); // Move instrumentation to the newly created link
  });

  header.append(navLinksDiv);

  // Nav icons
  const navIconsDiv = document.createElement('div');
  navIconsDiv.classList.add('cmp-header__nav-icons');

  const accessibilityDiv = document.createElement('div');
  accessibilityDiv.classList.add('cmp-header__accessbility', 'cmp-header__hide-icon');
  const accessibilityLink = document.createElement('a');
  accessibilityLink.href = '#';
  accessibilityLink.classList.add('cmp-header__icon-img');
  const accessibilityIcon = document.createElement('div');
  accessibilityIcon.classList.add('icon-accessibility');
  accessibilityLink.append(accessibilityIcon);
  accessibilityDiv.append(accessibilityLink);
  navIconsDiv.append(accessibilityDiv);

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('cmp-header__search');
  const searchLink = document.createElement('a');
  searchLink.href = '#';
  searchLink.classList.add('cmp-header__icon-img');
  const searchIcon = document.createElement('div');
  searchIcon.classList.add('icon-search');
  const searchText = document.createElement('div');
  searchText.classList.add('cmp-header__icon-text');
  searchText.textContent = 'Search';
  searchLink.append(searchIcon, searchText);
  searchDiv.append(searchLink);
  navIconsDiv.append(searchDiv);

  const loginDiv = document.createElement('div');
  loginDiv.classList.add('cmp-header__login', 'cmp-header__hide-icon');
  const loginLink = document.createElement('a');
  loginLink.href = '#';
  loginLink.classList.add('cmp-header__icon-img');
  const loginIcon = document.createElement('div');
  loginIcon.classList.add('icon-profile');
  loginLink.append(loginIcon);
  loginDiv.append(loginLink);
  navIconsDiv.append(loginDiv);

  header.append(navIconsDiv);

  // Image optimization
  header.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Add event listeners for interactivity
  hamburgerInput.addEventListener('change', () => {
    header.classList.toggle('cmp-header--open', hamburgerInput.checked);
    navLinksDiv.classList.toggle('cmp-header__nav-links--open', hamburgerInput.checked);
  });

  searchLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Example: Toggle a search overlay or expand a search input
    searchDiv.classList.toggle('cmp-header__search--active');
    // You might want to add more specific logic here, e.g., showing/hiding a search input field
  });

  block.textContent = '';
  block.append(header);
}
