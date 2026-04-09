import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    headerIconRow,
    headerLogoRow,
    loginLinkRow,
    loginLinkLabelRow,
    ...itemRows
  ] = [...block.children];

  // Header
  const header = document.createElement('header');
  header.classList.add('boing-container', 'header', 'd-flex', 'justify-content-between', 'align-items-center', 'h-15', 'px-5', 'py-2', 'fixed-top', 'w-100', 'bg-white');

  // Header Left (Icon and Toggler)
  const headerLeft = document.createElement('div');
  headerLeft.classList.add('d-flex', 'w-25');

  // Toggle functionality
  const toggleButton = document.createElement('button');
  toggleButton.classList.add('navbar-toggler');
  toggleButton.type = 'button';
  toggleButton.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon');
  toggleButton.append(togglerIcon);
  headerLeft.append(toggleButton);

  const headerIconPicture = headerIconRow.querySelector('picture');
  if (headerIconPicture) {
    const img = headerIconPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]);
    moveInstrumentation(headerIconPicture, optimizedPic);
    headerLeft.append(optimizedPic);
  }
  header.append(headerLeft);

  // Header Center (Logo)
  const headerCenter = document.createElement('div');
  headerCenter.classList.add('d-flex', 'justify-content-center', 'w-25');
  const headerLogoLink = document.createElement('a');
  headerLogoLink.classList.add('analytics_cta_click');
  headerLogoLink.setAttribute('data-ct', '');
  headerLogoLink.setAttribute('a-label', 'header-logo-boing');
  const headerLogoFoundLink = headerLogoRow.querySelector('a');
  if (headerLogoFoundLink) {
    headerLogoLink.href = headerLogoFoundLink.href;
  } else {
    headerLogoLink.href = '/'; // Default to home if no link provided
  }

  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.classList.add('header__logo', 'd-flex', 'align-items-center');
  const headerLogoPicture = headerLogoRow.querySelector('picture');
  if (headerLogoPicture) {
    const img = headerLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]);
    optimizedPic.querySelector('img').classList.add('header__logo-img');
    moveInstrumentation(headerLogoPicture, optimizedPic);
    headerLogoDiv.append(optimizedPic);
  }
  headerLogoLink.append(headerLogoDiv);
  headerCenter.append(headerLogoLink);
  header.append(headerCenter);

  // Header Right (Login)
  const headerRight = document.createElement('div');
  headerRight.classList.add('d-flex', 'w-25', 'justify-content-end');
  const loginWrapperLink = document.createElement('a');
  loginWrapperLink.classList.add('header__login-btn-wrapper', 'analytics_cta_click');
  loginWrapperLink.style.display = 'inline';

  const loginLinkAnchor = loginLinkRow.querySelector('a');
  if (loginLinkAnchor) {
    loginWrapperLink.href = loginLinkAnchor.href;
  }

  const loginButton = document.createElement('button');
  loginButton.classList.add('header__login-btn', 'btn', 'text-boing-primary', 'bg-transparent', 'fw-semibold', 'rounded-4', 'btn-sm', 'py-3', 'px-4');
  loginButton.textContent = loginLinkLabelRow.textContent.trim();
  moveInstrumentation(loginLinkLabelRow, loginButton);

  loginWrapperLink.append(loginButton);
  headerRight.append(loginWrapperLink);
  header.append(headerRight);

  // Submenu Container (Sidebar and Overlay)
  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');

  const sidebar = document.createElement('aside');
  sidebar.classList.add('sidebar', 'start-0', 'bg-white', 'position-absolute');

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.classList.add('sidebar__menu', 'list-unstyled', 'px-4');

  // Filter for header menu items (3 cells: icon, link, label)
  const headerMenuItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[0].querySelector('picture') && cells[1].querySelector('a') && cells[2].textContent.trim();
  });

  headerMenuItems.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));

    if (iconCell && linkCell && labelCell) {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.classList.add('sidebar__menu-item', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');

      const link = document.createElement('a');
      link.classList.add('sidebar__menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'analytics_cta_click');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
        link.setAttribute('data-link', foundLink.href);
      }
      link.textContent = labelCell.textContent.trim();

      const iconPicture = iconCell.querySelector('picture');
      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]);
        optimizedPic.querySelector('img').classList.add('sidebar__menu-icon', 'me-4');
        moveInstrumentation(iconCell, optimizedPic);
        link.prepend(optimizedPic);
      }
      li.append(link);
      sidebarMenu.append(li);
    }
  });
  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('sidebar__curve');
  sidebar.append(sidebarCurve);

  // Footer
  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100', 'bg-boing-neutral-gray-600');
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimary = document.createElement('section');
  footerPrimary.classList.add('footer-brand__primary');
  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.classList.add('container');
  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  // Add ITC Logo (hardcoded from original HTML)
  const itcLogoLink = document.createElement('a');
  itcLogoLink.href = 'https://www.itcportal.com/';
  itcLogoLink.target = '_blank';
  itcLogoLink.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
  itcLogoLink.setAttribute('data-cta-region', 'Footer');
  itcLogoLink.setAttribute('aria-label', 'ITC Logo');
  const itcLogoImg = document.createElement('img');
  itcLogoImg.src = '/content/dam/aemigrate/uploaded-folder/image/itc-logo-2-fmt-webp-alpha.webp'; // Placeholder, ideally from block content
  itcLogoImg.alt = 'ITC Logo';
  itcLogoImg.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
  itcLogoLink.append(itcLogoImg);
  footerBrandLeft.append(itcLogoLink);

  // Add FSSI Logo (hardcoded from original HTML)
  const fssiLogoDiv = document.createElement('div');
  fssiLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const fssiLogoImg = document.createElement('img');
  fssiLogoImg.src = '/content/dam/aemigrate/uploaded-folder/image/fssi-logo-update-fmt-webp-alpha.webp'; // Placeholder, ideally from block content
  fssiLogoImg.alt = 'FSSI Logo';
  fssiLogoImg.classList.add('object-fit-contain', 'w-100', 'no-rendition');
  fssiLogoDiv.append(fssiLogoImg);
  footerBrandLeft.append(fssiLogoDiv);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');

  // Filter for footer list items (2 cells: link, label)
  const footerListItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells[0].querySelector('a') && cells[1].textContent.trim();
  });

  const numFooterLists = 4; // As per original HTML structure
  for (let i = 0; i < numFooterLists; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    const itemsPerList = Math.ceil(footerListItems.length / numFooterLists);
    const startIndex = i * itemsPerList;
    const endIndex = Math.min(startIndex + itemsPerList, footerListItems.length);

    for (let j = startIndex; j < endIndex; j += 1) {
      const row = footerListItems[j];
      const cells = [...row.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const labelCell = cells.find(cell => !cell.querySelector('a'));

      if (linkCell && labelCell) {
        const li = document.createElement('li');
        moveInstrumentation(row, li);
        li.classList.add('footer-list__item');

        const link = document.createElement('a');
        link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
        link.setAttribute('data-link-region', 'Footer List');
        const foundLink = linkCell.querySelector('a');
        if (foundLink) {
          link.href = foundLink.href;
        }
        link.textContent = labelCell.textContent.trim();
        li.append(link);
        ul.append(li);
      }
    }
    if (ul.children.length > 0) { // Only append if there are actual list items
      footerListDiv.append(ul);
      if (i < 2) { // Distribute to left and right navbar sections
        footerNavbarLeft.append(footerListDiv);
      } else {
        footerNavbarRight.append(footerListDiv);
      }
    }
  }

  footerBrandNavbar.append(footerNavbarLeft, footerNavbarRight);
  footerBrandRight.append(footerBrandNavbar);
  footerPrimaryContent.append(footerBrandLeft, footerBrandRight);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerPrimary.append(footerPrimaryContainer);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.classList.add('footer-brand__secondary');
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

  // Filter for footer social links (3 cells: socialLink, socialLinkLabel, icon)
  const footerSocialLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[0].querySelector('a') && cells[1].textContent.trim() && cells[2].querySelector('picture');
  });

  footerSocialLinks.forEach((row) => {
    const cells = [...row.children];
    const socialLinkCell = cells.find(cell => cell.querySelector('a'));
    const socialLinkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));
    const socialIconCell = cells.find(cell => cell.querySelector('picture'));

    if (socialLinkCell && socialLinkLabelCell && socialIconCell) {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

      const link = document.createElement('a');
      link.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      link.setAttribute('data-cta-region', 'Footer');
      link.setAttribute('target', '_blank');

      const foundLink = socialLinkCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
        link.setAttribute('data-cta-label', `footer-${socialLinkLabelCell.textContent.trim().toLowerCase()}`);
        link.setAttribute('data-platform-name', socialLinkLabelCell.textContent.trim().toLowerCase());
        link.setAttribute('data-social-linktype', 'follow');
      }

      const iconPicture = socialIconCell.querySelector('picture');
      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]);
        optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
        optimizedPic.querySelector('img').setAttribute('aria-label', socialLinkLabelCell.textContent.trim().toLowerCase());
        moveInstrumentation(socialIconCell, optimizedPic);
        link.append(optimizedPic);
      }
      li.append(link);
      socialList.append(li);
    }
  });
  footerSocialSection.append(socialList);
  footerSecondaryContent.append(footerSocialSection);

  const footerCopyrightSection = document.createElement('section');
  footerCopyrightSection.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  // Hardcoded ITC portal link from original HTML
  const itcLi = document.createElement('li');
  itcLi.classList.add('footer-brand__left--item', 'foot_link');
  const itcLink = document.createElement('a');
  itcLink.classList.add('footer-brand__left--link', 'analytics_cta_click');
  itcLink.href = 'https://www.itcportal.com/';
  itcLink.setAttribute('target', '_blank');
  itcLink.setAttribute('data-cta-region', 'Footer');
  itcLink.textContent = 'ITC portal';
  itcLi.append(itcLink);
  copyrightList.append(itcLi);
  footerCopyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text', 'text-white');
  copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  footerCopyrightSection.append(copyrightDiv);
  footerSecondaryContent.append(footerCopyrightSection);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');
  submenuContainer.append(overlay);

  toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
    toggleButton.classList.toggle('collapsed');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
    toggleButton.classList.remove('collapsed');
  });

  block.textContent = '';
  block.append(header, submenuContainer);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
