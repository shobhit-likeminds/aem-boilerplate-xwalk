import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Fixed fields
  const [
    logoImageRow,
    logoLinkRow,
    logoLinkLabelRow,
    loginLinkRow,
    loginLinkLabelRow,
    ...itemRows
  ] = children;

  // Split item rows into their respective types
  const sidebarMenuItems = itemRows.filter((row) => row.children.length === 3);
  const footerLinks = itemRows.filter((row) => row.children.length === 2);
  // CRITICAL FIX: Replaced row.children[2] with content detection
  const socialLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells.some(cell => cell.querySelector('picture'));
  });

  // Create header
  const header = document.createElement('header');
  header.classList.add('boing-container', 'header', 'd-flex', 'justify-content-between', 'align-items-center', 'h-15', 'px-5', 'py-2', 'fixed-top', 'w-100', 'bg-white');

  // Header left (logo)
  const headerLeft = document.createElement('div');
  headerLeft.classList.add('d-flex', 'w-25');
  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
    logoLink.classList.add('analytics_cta_click');
    logoLink.setAttribute('data-ct', '');
    logoLink.setAttribute('a-label', 'header-logo-boing');
  }
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header__logo', 'd-flex', 'align-items-center');
  const logoImg = logoImageRow.querySelector('picture');
  if (logoImg) {
    moveInstrumentation(logoImageRow.firstElementChild, logoImg);
    logoDiv.append(logoImg);
  }
  logoLink.append(logoDiv);
  headerLeft.append(logoLink);

  // Header center (empty in original for this content, but structure is there)
  const headerCenter = document.createElement('div');
  headerCenter.classList.add('d-flex', 'justify-content-center', 'w-25');

  // Header right (login button)
  const headerRight = document.createElement('div');
  headerRight.classList.add('d-flex', 'w-25', 'justify-content-end');
  const loginLink = document.createElement('a');
  const foundLoginLink = loginLinkRow.querySelector('a');
  if (foundLoginLink) {
    loginLink.href = foundLoginLink.href;
    loginLink.classList.add('header__login-btn-wrapper', 'analytics_cta_click');
    loginLink.style.display = 'inline';
  }
  const loginButton = document.createElement('button');
  loginButton.classList.add('header__login-btn', 'btn', 'text-boing-primary', 'bg-transparent', 'fw-semibold', 'rounded-4', 'btn-sm', 'py-3', 'px-4');
  loginButton.textContent = loginLinkLabelRow.textContent.trim();
  loginLink.append(loginButton);
  headerRight.append(loginLink);

  // Hamburger menu button (added based on common header patterns and interactivity check)
  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add('hamburger-menu-button', 'btn', 'bg-transparent', 'd-flex', 'align-items-center', 'justify-content-center');
  hamburgerButton.innerHTML = `
    <span class="icon icon-hamburger"></span>
  `;
  headerRight.prepend(hamburgerButton); // Prepend to right section to be next to login

  header.append(headerLeft, headerCenter, headerRight);

  // Create submenu container (sidebar and overlay)
  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');

  const sidebar = document.createElement('aside');
  sidebar.classList.add('sidebar', 'start-0', 'bg-white', 'position-absolute');

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.classList.add('sidebar__menu', 'list-unstyled', 'px-4');

  sidebarMenuItems.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const menuLinkCell = cells.find(cell => cell.querySelector('a'));
    const menuLinkLabelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('sidebar__menu-item', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');

    const menuLink = document.createElement('a');
    const foundMenuLink = menuLinkCell?.querySelector('a');
    if (foundMenuLink) {
      menuLink.href = foundMenuLink.href;
      menuLink.classList.add('sidebar__menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'analytics_cta_click');
      menuLink.setAttribute('data-consent', 'false'); // Assuming default
      menuLink.setAttribute('data-link', foundMenuLink.href); // Assuming data-link is href
    }
    menuLink.textContent = menuLinkLabelCell?.textContent.trim() || '';

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const iconImg = iconPicture.querySelector('img');
      if (iconImg) {
        const newIconImg = document.createElement('img');
        newIconImg.src = iconImg.src;
        newIconImg.alt = iconImg.alt;
        newIconImg.classList.add('sidebar__menu-icon', 'me-4');
        newIconImg.loading = 'lazy';
        menuLink.prepend(newIconImg);
        moveInstrumentation(iconCell.firstElementChild, newIconImg);
      }
    }
    li.append(menuLink);
    sidebarMenu.append(li);
  });

  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('sidebar__curve');
  sidebar.append(sidebarCurve);

  // Create footer
  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100', 'bg-boing-neutral-gray-600');
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimary = document.createElement('section');
  footerPrimary.classList.add('footer-brand__primary');
  footerPrimary.style.backgroundColor = ''; // Empty string as per original

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.classList.add('container');

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerLeftSection = document.createElement('section');
  footerLeftSection.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  // ITC Logo (hardcoded in original, but we'll skip since it's not in EDS model)
  // FSSI Logo (hardcoded in original, but we'll skip since it's not in EDS model)

  footerPrimaryContent.append(footerLeftSection);

  const footerRightSection = document.createElement('section');
  footerRightSection.classList.add('footer-brand__right');

  const footerNav = document.createElement('nav');
  footerNav.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNav.setAttribute('aria-label', 'footer navbar');

  const footerNavLeft = document.createElement('div');
  footerNavLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  // Group footer links into lists as per original HTML structure
  const footerLinkGroups = {};
  footerLinks.forEach((row) => {
    const cells = [...row.children];
    const footerLinkCell = cells.find(cell => cell.querySelector('a'));
    const footerLinkLabelCell = cells.find(cell => !cell.querySelector('a'));

    const linkHref = footerLinkCell?.querySelector('a')?.href;
    const linkText = footerLinkLabelCell?.textContent.trim();

    // Grouping logic based on original HTML structure (e.g., 4 lists)
    // This is an approximation as EDS model doesn't specify groups
    let groupKey = 'group1';
    if (linkText?.includes('BoingWale Blogs') || linkText?.includes('Tedhe Medhe Highlights') || linkText?.includes('Numbers Ka Khel')) {
      groupKey = 'group2';
    } else if (linkText?.includes('Contact us') || linkText?.includes('Sa-Meme-Char')) {
      groupKey = 'group3';
    } else if (linkText?.includes('Pyaar O Scope') || linkText?.includes('Bhavishya On The Go') || linkText?.includes('Boing Weekly')) {
      groupKey = 'group4';
    }

    if (!footerLinkGroups[groupKey]) {
      footerLinkGroups[groupKey] = [];
    }
    footerLinkGroups[groupKey].push({ href: linkHref, text: linkText, row });
  });

  Object.values(footerLinkGroups).forEach((group, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    group.forEach(({ href, text, row }) => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.classList.add('footer-list__item');
      const a = document.createElement('a');
      a.href = href;
      a.textContent = text;
      a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      a.setAttribute('data-link-region', 'Footer List');
      li.append(a);
      ul.append(li);
    });
    footerListDiv.append(ul);
    if (index < 2) { // Assuming first two groups go to footerNavLeft
      footerNavLeft.append(footerListDiv);
    } else { // Remaining groups go to footerNavRight
      const footerNavRight = footerNav.querySelector('.footer-brand__navbar--right') || document.createElement('div');
      footerNavRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
      footerNavRight.append(footerListDiv);
      if (!footerNav.contains(footerNavRight)) {
        footerNav.append(footerNavRight);
      }
    }
  });

  footerNav.prepend(footerNavLeft);
  footerRightSection.append(footerNav);
  footerPrimaryContent.append(footerRightSection);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerPrimary.append(footerPrimaryContainer);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.classList.add('footer-brand__secondary');
  footerSecondary.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.classList.add('container');

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');
  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('social_media--title');
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const socialUrlCell = cells.find(cell => cell.querySelector('a'));
    const socialIconCell = cells.find(cell => cell.querySelector('picture'));
    const socialUrlLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));

    const socialUrl = socialUrlCell?.querySelector('a')?.href;
    const socialIconPicture = socialIconCell?.querySelector('picture');
    const socialIconImg = socialIconPicture ? socialIconPicture.querySelector('img') : null;
    const socialLabel = socialUrlLabelCell?.textContent.trim();

    if (socialUrl && socialIconImg) {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

      const a = document.createElement('a');
      a.href = socialUrl;
      a.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      a.setAttribute('data-cta-region', 'Footer');
      a.setAttribute('data-cta-label', `footer-${socialLabel?.toLowerCase()}`);
      a.target = '_blank';
      a.setAttribute('data-platform-name', socialLabel?.toLowerCase());
      a.setAttribute('data-social-linktype', 'follow');

      const img = document.createElement('img');
      img.src = socialIconImg.src;
      img.alt = socialIconImg.alt;
      img.setAttribute('aria-label', socialLabel?.toLowerCase());
      img.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      img.loading = 'lazy';
      a.append(img);
      moveInstrumentation(socialIconCell.firstElementChild, img);
      li.append(a);
      socialList.append(li);
    }
  });

  socialMediaSection.append(socialList);
  footerSecondaryContent.append(socialMediaSection);

  const footerCopyrightSection = document.createElement('section');
  footerCopyrightSection.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  // ITC portal link (hardcoded in original, but we'll skip since it's not in EDS model)

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text', 'text-white');
  copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.'; // Hardcoded as per original
  copyrightDiv.append(copyrightSpan);

  footerCopyrightSection.append(copyrightList, copyrightDiv);
  footerSecondaryContent.append(footerCopyrightSection);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerSecondary);
  sidebar.append(footerBrand); // Footer is part of sidebar in original HTML

  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');

  submenuContainer.append(sidebar, overlay);

  const sectionWrapper = document.createElement('section');
  sectionWrapper.classList.add('position-relative', 'mb-15');

  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('d-none', 'app-name');
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';

  sectionWrapper.append(appNameSpan, header, submenuContainer);

  // Image optimization
  sectionWrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Interactivity: Hamburger menu toggle
  hamburgerButton.addEventListener('click', () => {
    sidebar.classList.toggle('is-open'); // Assuming 'is-open' class controls visibility
    overlay.classList.toggle('is-visible'); // Assuming 'is-visible' class controls visibility
    document.body.classList.toggle('no-scroll'); // Prevent scrolling when sidebar is open
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.classList.remove('no-scroll');
  });

  block.textContent = '';
  block.append(sectionWrapper);
}
