import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    appNameRow,
    headerSvgRow,
    headerLogoRow,
    headerLogoLinkRow,
    loginLabelRow,
    loginLinkRow,
    footerLogo1Row,
    footerLogo1LinkRow,
    footerLogo2Row,
    footerBrandLeftLinkRow,
    copyrightRow,
    ...itemRows
  ] = [...block.children];

  // Header
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
  const foundHeaderLogoLink = headerLogoLinkRow.querySelector('a');
  if (foundHeaderLogoLink) {
    headerLogoLink.href = foundHeaderLogoLink.href;
    headerLogoLink.classList.add('analytics_cta_click');
    headerLogoLink.setAttribute('data-ct', '');
    headerLogoLink.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(headerLogoLinkRow.firstElementChild, headerLogoLink);
  }
  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.classList.add('header__logo', 'd-flex', 'align-items-center');
  const headerLogoPicture = headerLogoRow.querySelector('picture');
  if (headerLogoPicture) {
    const headerLogoImg = headerLogoPicture.querySelector('img');
    if (headerLogoImg) {
      headerLogoImg.classList.add('header__logo-img');
      headerLogoImg.setAttribute('fetchpriority', 'high');
      headerLogoImg.setAttribute('loading', 'eager');
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
  const foundLoginLink = loginLinkRow.querySelector('a');
  if (foundLoginLink) {
    loginLinkWrapper.href = foundLoginLink.href;
    loginLinkWrapper.classList.add('header__login-btn-wrapper', 'analytics_cta_click');
    loginLinkWrapper.style.display = 'inline';
    moveInstrumentation(loginLinkRow.firstElementChild, loginLinkWrapper);
  }
  const loginButton = document.createElement('button');
  loginButton.classList.add('header__login-btn', 'btn', 'text-boing-primary', 'bg-transparent', 'fw-semibold', 'rounded-4', 'btn-sm', 'py-3', 'px-4');
  const loginLabel = loginLabelRow.querySelector('div')?.textContent.trim();
  if (loginLabel) {
    loginButton.textContent = loginLabel;
  }
  loginLinkWrapper.append(loginButton);
  headerRight.append(loginLinkWrapper);
  header.append(headerRight);

  // Submenu container (Sidebar)
  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');

  const sidebar = document.createElement('aside');
  sidebar.classList.add('sidebar', 'start-0', 'bg-white', 'position-absolute');

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.classList.add('sidebar__menu', 'list-unstyled', 'px-4');

  const sidebarMenuItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells.some(cell => cell.querySelector('picture')) && cells.some(cell => cell.querySelector('a'));
  });

  sidebarMenuItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('sidebar__menu-item', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');

    const link = document.createElement('a');
    link.classList.add('sidebar__menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'analytics_cta_click');

    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));

    if (linkCell && linkCell.querySelector('a')) {
      const foundLink = linkCell.querySelector('a');
      link.href = foundLink.href;
      link.setAttribute('data-consent', 'false'); // Assuming default
      link.setAttribute('data-link', foundLink.href); // Assuming link href is data-link
      moveInstrumentation(linkCell, link);
    }

    if (iconCell && iconCell.querySelector('picture')) {
      const iconPicture = iconCell.querySelector('picture');
      const iconImg = iconPicture.querySelector('img');
      if (iconImg) {
        iconImg.classList.add('sidebar__menu-icon', 'me-4');
        iconImg.setAttribute('loading', 'lazy');
      }
      moveInstrumentation(iconCell, iconPicture);
      link.append(iconPicture);
    }

    if (labelCell) {
      link.append(labelCell.textContent.trim());
    }
    li.append(link);
    sidebarMenu.append(li);
  });

  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('sidebar__curve');
  sidebar.append(sidebarCurve);

  // Footer
  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100', 'bg-boing-neutral-gray-600');
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');
  footerBrandPrimary.style.backgroundColor = ''; // Empty string as in original

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('container');

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  // Footer Logo 1
  const footerLogo1Link = document.createElement('a');
  const foundFooterLogo1Link = footerLogo1LinkRow.querySelector('a');
  if (foundFooterLogo1Link) {
    footerLogo1Link.href = foundFooterLogo1Link.href;
    footerLogo1Link.target = '_blank';
    footerLogo1Link.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
    footerLogo1Link.setAttribute('data-cta-region', 'Footer');
    footerLogo1Link.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(footerLogo1LinkRow.firstElementChild, footerLogo1Link);
  }
  const footerLogo1Picture = footerLogo1Row.querySelector('picture');
  if (footerLogo1Picture) {
    const footerLogo1Img = footerLogo1Picture.querySelector('img');
    if (footerLogo1Img) {
      footerLogo1Img.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      footerLogo1Img.setAttribute('loading', 'lazy');
    }
    moveInstrumentation(footerLogo1Row.firstElementChild, footerLogo1Picture);
    footerLogo1Link.append(footerLogo1Picture);
  }
  footerBrandLeft.append(footerLogo1Link);

  // Footer Logo 2
  const footerLogo2Div = document.createElement('div');
  footerLogo2Div.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const footerLogo2Picture = footerLogo2Row.querySelector('picture');
  if (footerLogo2Picture) {
    const footerLogo2Img = footerLogo2Picture.querySelector('img');
    if (footerLogo2Img) {
      footerLogo2Img.classList.add('object-fit-contain', 'w-100', 'no-rendition');
      footerLogo2Img.setAttribute('loading', 'lazy');
    }
    moveInstrumentation(footerLogo2Row.firstElementChild, footerLogo2Picture);
    footerLogo2Div.append(footerLogo2Picture);
  }
  footerBrandLeft.append(footerLogo2Div);
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  const footerListLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && !cells.some(cell => cell.querySelector('picture')) && cells.some(cell => cell.querySelector('a'));
  });

  const footerListContainers = [];
  for (let i = 0; i < footerListLinks.length; i += 3) { // Group into sets of 3 for two lists
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    footerListLinks.slice(i, i + 3).forEach((row) => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.classList.add('footer-list__item');

      const cells = [...row.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const labelCell = cells.find(cell => !cell.querySelector('a'));

      const link = document.createElement('a');
      if (linkCell && linkCell.querySelector('a')) {
        const foundLink = linkCell.querySelector('a');
        link.href = foundLink.href;
        link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
        link.setAttribute('data-link-region', 'Footer List');
        link.textContent = labelCell ? labelCell.textContent.trim() : '';
        moveInstrumentation(linkCell, link);
      }
      li.append(link);
      ul.append(li);
    });
    footerListDiv.append(ul);
    footerListContainers.push(footerListDiv);
  }

  // Append first two lists to footerNavbarLeft
  if (footerListContainers[0]) footerNavbarLeft.append(footerListContainers[0]);
  if (footerListContainers[1]) footerNavbarLeft.append(footerListContainers[1]);
  footerBrandNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');

  // Append remaining lists to footerNavbarRight
  if (footerListContainers[2]) footerNavbarRight.append(footerListContainers[2]);
  if (footerListContainers[3]) footerNavbarRight.append(footerListContainers[3]);
  footerBrandNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerBrandNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerContainer.append(footerPrimaryContent);
  footerBrandPrimary.append(footerContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand__secondary');
  footerBrandSecondary.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.classList.add('container');

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const footerSocialSection = document.createElement('section');
  footerSocialSection.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');
  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('social_media--title');
  socialTitle.textContent = 'Follow Us On';
  footerSocialSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  const footerSocialLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('picture')) && cells.some(cell => cell.querySelector('a'));
  });

  footerSocialLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));

    const link = document.createElement('a');
    if (linkCell && linkCell.querySelector('a')) {
      const foundLink = linkCell.querySelector('a');
      link.href = foundLink.href;
      link.target = '_blank';
      link.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      link.setAttribute('data-cta-region', 'Footer');
      link.setAttribute('data-cta-label', `footer-${foundLink.href.includes('facebook') ? 'facebook' : foundLink.href.includes('instagram') ? 'instagram' : 'youtube'}`);
      link.setAttribute('data-platform-name', foundLink.href.includes('facebook') ? 'facebook' : foundLink.href.includes('instagram') ? 'instagram' : 'youtube');
      link.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(linkCell, link);
    }

    if (iconCell && iconCell.querySelector('picture')) {
      const iconPicture = iconCell.querySelector('picture');
      const iconImg = iconPicture.querySelector('img');
      if (iconImg) {
        iconImg.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
        iconImg.setAttribute('loading', 'lazy');
        iconImg.setAttribute('aria-label', iconImg.alt || '');
      }
      moveInstrumentation(iconCell, iconPicture);
      link.append(iconPicture);
    }
    li.append(link);
    socialList.append(li);
  });
  footerSocialSection.append(socialList);
  footerSecondaryContent.append(footerSocialSection);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  const footerBrandLeftItem = document.createElement('li');
  footerBrandLeftItem.classList.add('footer-brand__left--item', 'foot_link');
  const footerBrandLeftLink = document.createElement('a');
  const foundFooterBrandLeftLink = footerBrandLeftLinkRow.querySelector('a');
  if (foundFooterBrandLeftLink) {
    footerBrandLeftLink.href = foundFooterBrandLeftLink.href;
    footerBrandLeftLink.target = '_blank';
    footerBrandLeftLink.classList.add('footer-brand__left--link', 'analytics_cta_click');
    footerBrandLeftLink.setAttribute('data-cta-region', 'Footer');
    footerBrandLeftLink.textContent = 'ITC portal'; // Hardcoded as per original
    moveInstrumentation(footerBrandLeftLinkRow.firstElementChild, footerBrandLeftLink);
  }
  footerBrandLeftItem.append(footerBrandLeftLink);
  footerBrandLeftList.append(footerBrandLeftItem);
  footerBrandLeftSecondary.append(footerBrandLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text', 'text-white');
  const copyrightText = copyrightRow.querySelector('div')?.textContent.trim();
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText;
  }
  copyrightDiv.append(copyrightSpan);
  footerBrandLeftSecondary.append(copyrightDiv);
  footerSecondaryContent.append(footerBrandLeftSecondary);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerBrandSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');
  submenuContainer.append(overlay);

  // App Name (hidden)
  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('d-none', 'app-name');
  const appName = appNameRow.querySelector('div')?.textContent.trim();
  if (appName) {
    appNameSpan.setAttribute('data-app-name', appName);
    appNameSpan.textContent = appName;
  }

  // Toggle functionality for sidebar
  const menuToggleBtn = document.createElement('button');
  menuToggleBtn.classList.add('navbar-toggler'); // Add a class for styling if needed
  menuToggleBtn.innerHTML = '<span class="navbar-toggler-icon"></span>'; // Example icon
  menuToggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show'); // Or a class that makes it visible
    overlay.classList.toggle('show'); // Or a class that makes it visible
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
  });

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.classList.add('position-relative', 'mb-15'); // Add section classes to the block itself
  block.append(appNameSpan, header, submenuContainer, menuToggleBtn); // Append menuToggleBtn to the block
}
