import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    headerSvgRow,
    headerLogoRow,
    headerLogoLinkRow,
    headerLogoLinkLabelRow,
    loginLinkRow,
    loginLinkLabelRow,
    footerLogo1Row,
    footerLogo2Row,
    footerLeftLinkRow,
    footerLeftLinkLabelRow,
    footerCopyrightRow,
    ...itemRows
  ] = [...block.children];

  const sidebarMenuItems = itemRows.filter((row) => row.children.length === 3 && row.querySelector('picture'));
  const footerListItems = itemRows.filter((row) => row.children.length === 2 && row.querySelector('a'));
  const footerSocialItems = itemRows.filter((row) => row.children.length === 3 && row.querySelector('picture') && row.querySelector('a'));

  // Create Header
  const header = document.createElement('header');
  header.classList.add('boing-container', 'header', 'd-flex', 'justify-content-between', 'align-items-center', 'h-15', 'px-5', 'py-2', 'fixed-top', 'w-100', 'bg-white');

  const headerLeft = document.createElement('div');
  headerLeft.classList.add('d-flex', 'w-25');
  const headerSvgPicture = headerSvgRow.querySelector('picture');
  if (headerSvgPicture) {
    moveInstrumentation(headerSvgRow.firstElementChild, headerSvgPicture);
    headerLeft.append(headerSvgPicture);
  }
  header.append(headerLeft);

  const headerCenter = document.createElement('div');
  headerCenter.classList.add('d-flex', 'justify-content-center', 'w-25');
  const headerLogoLink = document.createElement('a');
  headerLogoLink.classList.add('analytics_cta_click');
  const headerLogoLinkFound = headerLogoLinkRow.querySelector('a');
  if (headerLogoLinkFound) {
    headerLogoLink.href = headerLogoLinkFound.href;
    headerLogoLink.setAttribute('a-label', 'header-logo-boing');
  }
  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.classList.add('header__logo', 'd-flex', 'align-items-center');
  const headerLogoPicture = headerLogoRow.querySelector('picture');
  if (headerLogoPicture) {
    const img = headerLogoPicture.querySelector('img');
    if (img) {
      img.classList.add('header__logo-img');
      img.setAttribute('fetchpriority', 'high');
      img.setAttribute('loading', 'eager');
    }
    moveInstrumentation(headerLogoRow.firstElementChild, headerLogoPicture);
    headerLogoDiv.append(headerLogoPicture);
  }
  headerLogoLink.append(headerLogoDiv);
  headerCenter.append(headerLogoLink);
  header.append(headerCenter);

  const headerRight = document.createElement('div');
  headerRight.classList.add('d-flex', 'w-25', 'justify-content-end');
  const loginLinkWrapper = document.createElement('a');
  loginLinkWrapper.classList.add('header__login-btn-wrapper', 'analytics_cta_click');
  const loginLinkFound = loginLinkRow.querySelector('a');
  if (loginLinkFound) {
    loginLinkWrapper.href = loginLinkFound.href;
    loginLinkWrapper.style.display = 'inline';
  }
  const loginButton = document.createElement('button');
  loginButton.classList.add('header__login-btn', 'btn', 'text-boing-primary', 'bg-transparent', 'fw-semibold', 'rounded-4', 'btn-sm', 'py-3', 'px-4');
  const loginLinkLabelFound = loginLinkLabelRow.firstElementChild; // Access first element for text content
  if (loginLinkLabelFound) {
    moveInstrumentation(loginLinkLabelRow.firstElementChild, loginButton);
    loginButton.append(loginLinkLabelFound.textContent.trim());
  } else {
    loginButton.textContent = 'Login'; // Default text if label is missing
  }
  loginLinkWrapper.append(loginButton);
  headerRight.append(loginLinkWrapper);
  header.append(headerRight);

  // Create Submenu Container (Sidebar)
  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');

  const sidebar = document.createElement('aside');
  sidebar.classList.add('sidebar', 'start-0', 'bg-white', 'position-absolute');

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.classList.add('sidebar__menu', 'list-unstyled', 'px-4');

  sidebarMenuItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('sidebar__menu-item', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');

    const link = document.createElement('a');
    link.classList.add('sidebar__menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'analytics_cta_click');

    let menuIcon = null;
    let menuLinkText = '';
    let menuLinkHref = '';

    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const linkLabelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')); // Assuming linkLabel is plain text

    if (iconCell) {
      menuIcon = iconCell.querySelector('picture').querySelector('img');
      if (menuIcon) {
        menuIcon.classList.add('sidebar__menu-icon', 'me-4');
      }
    }
    if (linkCell) {
      menuLinkHref = linkCell.querySelector('a').href;
    }
    if (linkLabelCell) { // Use linkLabelCell for text content
      menuLinkText = linkLabelCell.textContent.trim();
    }


    if (menuIcon) {
      link.append(menuIcon);
    }
    link.href = menuLinkHref;
    link.textContent = menuLinkText;
    li.append(link);
    sidebarMenu.append(li);
  });
  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('sidebar__curve');
  sidebar.append(sidebarCurve);

  // Create Footer
  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100', 'bg-boing-neutral-gray-600');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');
  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.classList.add('container');
  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeftPrimary = document.createElement('section');
  footerBrandLeftPrimary.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  const footerLogo1Link = document.createElement('a');
  footerLogo1Link.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
  footerLogo1Link.href = '#'; // Placeholder, as link is not in model
  footerLogo1Link.setAttribute('aria-label', 'ITC Logo');
  const footerLogo1Picture = footerLogo1Row.querySelector('picture');
  if (footerLogo1Picture) {
    const img = footerLogo1Picture.querySelector('img');
    if (img) {
      img.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
    }
    moveInstrumentation(footerLogo1Row.firstElementChild, footerLogo1Picture);
    footerLogo1Link.append(footerLogo1Picture);
  }
  footerBrandLeftPrimary.append(footerLogo1Link);

  const footerLogo2Div = document.createElement('div');
  footerLogo2Div.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const footerLogo2Picture = footerLogo2Row.querySelector('picture');
  if (footerLogo2Picture) {
    const img = footerLogo2Picture.querySelector('img');
    if (img) {
      img.classList.add('object-fit-contain', 'w-100', 'no-rendition');
    }
    moveInstrumentation(footerLogo2Row.firstElementChild, footerLogo2Picture);
    footerLogo2Div.append(footerLogo2Picture);
  }
  footerBrandLeftPrimary.append(footerLogo2Div);
  footerPrimaryContent.append(footerBrandLeftPrimary);

  const footerBrandRightPrimary = document.createElement('section');
  footerBrandRightPrimary.classList.add('footer-brand__right');
  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  // Group footer list items into two columns (example, adjust as needed)
  const footerListCol1 = document.createElement('div');
  footerListCol1.classList.add('footerList');
  const ul1 = document.createElement('ul');
  ul1.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
  footerListItems.slice(0, Math.ceil(footerListItems.length / 2)).forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('footer-list__item');
    const link = document.createElement('a');
    link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
    const aFound = row.querySelector('a');
    if (aFound) {
      link.href = aFound.href;
      link.textContent = aFound.textContent.trim();
    }
    li.append(link);
    ul1.append(li);
  });
  footerListCol1.append(ul1);
  footerNavbarLeft.append(footerListCol1);

  const footerListCol2 = document.createElement('div');
  footerListCol2.classList.add('footerList');
  const ul2 = document.createElement('ul');
  ul2.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
  footerListItems.slice(Math.ceil(footerListItems.length / 2)).forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('footer-list__item');
    const link = document.createElement('a');
    link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
    const aFound = row.querySelector('a');
    if (aFound) {
      link.href = aFound.href;
      link.textContent = aFound.textContent.trim();
    }
    li.append(link);
    ul2.append(li);
  });
  footerListCol2.append(ul2);
  footerNavbarLeft.append(footerListCol2);
  footerNavbar.append(footerNavbarLeft);

  footerBrandRightPrimary.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRightPrimary);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerBrandPrimary.append(footerPrimaryContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand__secondary');
  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.classList.add('container');
  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  footerBrandRightSecondary.append(socialMediaTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  footerSocialItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const link = document.createElement('a');
    link.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');

    let socialIcon = null;
    let socialLinkHref = '';

    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));

    if (iconCell) {
      socialIcon = iconCell.querySelector('picture').querySelector('img');
      if (socialIcon) {
        socialIcon.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      }
    }
    if (linkCell) {
      socialLinkHref = linkCell.querySelector('a').href;
    }

    link.href = socialLinkHref;
    link.target = '_blank';
    if (socialIcon) {
      link.append(socialIcon);
    }
    li.append(link);
    socialList.append(li);
  });
  footerBrandRightSecondary.append(socialList);
  footerSecondaryContent.append(footerBrandRightSecondary);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  const footerLeftList = document.createElement('ul');
  footerLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  const footerLeftListItem = document.createElement('li');
  footerLeftListItem.classList.add('footer-brand__left--item', 'foot_link');
  const footerLeftLink = document.createElement('a');
  footerLeftLink.classList.add('footer-brand__left--link', 'analytics_cta_click');
  const footerLeftLinkFound = footerLeftLinkRow.querySelector('a');
  if (footerLeftLinkFound) {
    footerLeftLink.href = footerLeftLinkFound.href;
    footerLeftLink.textContent = footerLeftLinkFound.textContent.trim();
    footerLeftLink.target = '_blank';
  }
  footerLeftList.append(footerLeftListItem);
  footerBrandLeftSecondary.append(footerLeftList);

  const footerLeftLinkLabelSpan = document.createElement('span'); // Create a span for the label
  footerLeftLinkLabelSpan.classList.add('footer-brand__left--text', 'text-white'); // Apply appropriate classes
  const footerLeftLinkLabelContent = footerLeftLinkLabelRow.firstElementChild; // Get the content from the row
  if (footerLeftLinkLabelContent) {
    moveInstrumentation(footerLeftLinkLabelRow.firstElementChild, footerLeftLinkLabelSpan);
    footerLeftLinkLabelSpan.textContent = footerLeftLinkLabelContent.textContent.trim();
  }
  footerLeftListItem.append(footerLeftLinkLabelSpan); // Append the span to the list item

  const footerCopyrightDiv = document.createElement('div');
  footerCopyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text', 'text-white');
  moveInstrumentation(footerCopyrightRow.firstElementChild, copyrightSpan);
  copyrightSpan.textContent = footerCopyrightRow.firstElementChild.textContent.trim();
  footerCopyrightDiv.append(copyrightSpan);
  footerBrandLeftSecondary.append(footerCopyrightDiv);
  footerSecondaryContent.append(footerBrandLeftSecondary);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerBrandSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');
  submenuContainer.append(overlay);

  const section = document.createElement('section');
  section.classList.add('position-relative', 'mb-15');

  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('d-none', 'app-name');
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  section.append(appNameSpan);
  section.append(header);
  section.append(submenuContainer);

  block.textContent = '';
  block.append(section);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Toggle sidebar functionality
  const menuToggle = document.createElement('button');
  menuToggle.classList.add('navbar-toggler', 'd-md-none', 'ms-3'); // Example classes, adjust as needed
  menuToggle.innerHTML = '<span class="navbar-toggler-icon"></span>';
  headerLeft.prepend(menuToggle); // Add a toggle button to the header

  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show'); // Assuming 'show' class makes sidebar visible
    overlay.classList.toggle('show'); // Assuming 'show' class makes overlay visible
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
  });
}
