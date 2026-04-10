import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Fixed fields are identified by their index
  const headerLeftLogoRow = children[0];
  const headerCenterLogoRow = children[1];
  const headerCenterLogoLinkRow = children[2];
  const headerCenterLogoLinkLabelRow = children[3];
  const headerLoginLinkRow = children[4];
  const headerLoginLinkLabelRow = children[5];
  const footerLeftLogoRow = children[6];
  const footerSecondaryLogoRow = children[7];
  const footerItcPortalLinkRow = children[8];
  const footerItcPortalLinkLabelRow = children[9];
  const footerCopyrightTextRow = children[10];

  // Item rows start from index 11
  const itemRows = children.slice(11);

  // Content detection for item rows
  const sidebarMenuItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[2].querySelector('picture'); // Link, Label, Icon (picture)
  });
  const footerLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2; // Link, Label
  });
  const socialLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && !cells[2].querySelector('picture'); // Link, Label, Icon (no picture, assuming text or other non-picture content)
  });

  // Header
  const header = document.createElement('header');
  header.classList.add('boing-container', 'header', 'd-flex', 'justify-content-between', 'align-items-center', 'h-15', 'px-5', 'py-2', 'fixed-top', 'w-100', 'bg-white');

  // Header Left
  const headerLeft = document.createElement('div');
  headerLeft.classList.add('d-flex', 'w-25');
  if (headerLeftLogoRow) {
    const logoPicture = headerLeftLogoRow.querySelector('picture');
    if (logoPicture) {
      moveInstrumentation(headerLeftLogoRow, headerLeft);
      headerLeft.append(logoPicture);
    }
  }
  header.append(headerLeft);

  // Header Center
  const headerCenter = document.createElement('div');
  headerCenter.classList.add('d-flex', 'justify-content-center', 'w-25');
  if (headerCenterLogoLinkRow && headerCenterLogoLinkLabelRow) {
    const linkEl = document.createElement('a');
    linkEl.classList.add('analytics_cta_click');
    const originalLink = headerCenterLogoLinkRow.querySelector('a');
    if (originalLink) {
      linkEl.href = originalLink.href;
      linkEl.setAttribute('data-ct', '');
      linkEl.setAttribute('a-label', 'header-logo-boing');
    }
    moveInstrumentation(headerCenterLogoLinkRow, linkEl);

    const logoDiv = document.createElement('div');
    logoDiv.classList.add('header__logo', 'd-flex', 'align-items-center');

    if (headerCenterLogoRow) {
      const logoPicture = headerCenterLogoRow.querySelector('picture');
      if (logoPicture) {
        const img = logoPicture.querySelector('img');
        if (img) {
          img.classList.add('header__logo-img');
          img.setAttribute('fetchpriority', 'high');
          img.setAttribute('loading', 'eager');
          moveInstrumentation(headerCenterLogoRow, logoPicture);
          logoDiv.append(logoPicture);
        }
      }
    }
    linkEl.append(logoDiv);
    headerCenter.append(linkEl);
  }
  header.append(headerCenter);

  // Header Right
  const headerRight = document.createElement('div');
  headerRight.classList.add('d-flex', 'w-25', 'justify-content-end');
  if (headerLoginLinkRow && headerLoginLinkLabelRow) {
    const loginLinkWrapper = document.createElement('a');
    loginLinkWrapper.classList.add('header__login-btn-wrapper', 'analytics_cta_click');
    loginLinkWrapper.style.display = 'inline';

    const originalLoginLink = headerLoginLinkRow.querySelector('a');
    if (originalLoginLink) {
      loginLinkWrapper.href = originalLoginLink.href;
    }
    moveInstrumentation(headerLoginLinkRow, loginLinkWrapper);

    const loginBtn = document.createElement('button');
    loginBtn.classList.add('header__login-btn', 'btn', 'text-boing-primary', 'bg-transparent', 'fw-semibold', 'rounded-4', 'btn-sm', 'py-3', 'px-4');
    loginBtn.textContent = headerLoginLinkLabelRow.textContent.trim();
    loginLinkWrapper.append(loginBtn);
    headerRight.append(loginLinkWrapper);
  }
  header.append(headerRight);

  // Submenu Container (Sidebar and Overlay)
  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');

  const sidebar = document.createElement('aside');
  sidebar.classList.add('sidebar', 'start-0', 'bg-white', 'position-absolute');

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.classList.add('sidebar__menu', 'list-unstyled', 'px-4');

  sidebarMenuItems.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));
    const iconCell = cells.find(cell => cell.querySelector('picture'));

    const li = document.createElement('li');
    li.classList.add('sidebar__menu-item', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');
    moveInstrumentation(row, li);

    const link = document.createElement('a');
    link.classList.add('sidebar__menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'analytics_cta_click');
    const originalLink = linkCell?.querySelector('a');
    if (originalLink) {
      link.href = originalLink.href;
      link.setAttribute('data-consent', 'false'); // Assuming default
      link.setAttribute('data-link', originalLink.href); // Assuming path
    }
    link.textContent = labelCell?.textContent.trim() || '';

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        img.classList.add('sidebar__menu-icon', 'me-4');
        img.setAttribute('loading', 'lazy');
        moveInstrumentation(iconCell, iconPicture);
        link.prepend(iconPicture);
      }
    }
    li.append(link);
    sidebarMenu.append(li);
  });
  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('sidebar__curve');
  sidebar.append(sidebarCurve);

  // Footer Brand (inside sidebar)
  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100', 'bg-boing-neutral-gray-600');
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');
  const footerBrandPrimaryContainer = document.createElement('div');
  footerBrandPrimaryContainer.classList.add('container');
  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeftPrimary = document.createElement('section');
  footerBrandLeftPrimary.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  if (footerLeftLogoRow) {
    const logoLink = document.createElement('a');
    logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
    logoLink.href = 'https://www.itcportal.com/'; // Hardcoded from original HTML
    logoLink.target = '_blank';
    logoLink.setAttribute('data-cta-region', 'Footer');
    logoLink.setAttribute('aria-label', 'ITC Logo');
    const logoPicture = footerLeftLogoRow.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      if (img) {
        img.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
        img.setAttribute('loading', 'lazy');
        moveInstrumentation(footerLeftLogoRow, logoPicture);
        logoLink.append(logoPicture);
      }
    }
    footerBrandLeftPrimary.append(logoLink);
  }

  if (footerSecondaryLogoRow) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
    const logoPicture = footerSecondaryLogoRow.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      if (img) {
        img.classList.add('object-fit-contain', 'w-100', 'no-rendition');
        img.setAttribute('loading', 'lazy');
        moveInstrumentation(footerSecondaryLogoRow, logoPicture);
        secondaryLogoDiv.append(logoPicture);
      }
    }
    footerBrandLeftPrimary.append(secondaryLogoDiv);
  }
  footerBrandPrimaryContent.append(footerBrandLeftPrimary);

  const footerBrandRightPrimary = document.createElement('section');
  footerBrandRightPrimary.classList.add('footer-brand__right');
  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  // Group footer links into lists (assuming 4 lists, 2 in left, 2 in right)
  const footerLinkLists = [];
  for (let i = 0; i < footerLinks.length; i += Math.ceil(footerLinks.length / 4)) {
    footerLinkLists.push(footerLinks.slice(i, i + Math.ceil(footerLinks.length / 4)));
  }

  footerLinkLists.forEach((listItems, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    listItems.forEach((row) => {
      const cells = [...row.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const labelCell = cells.find(cell => !cell.querySelector('a'));

      const li = document.createElement('li');
      li.classList.add('footer-list__item');
      moveInstrumentation(row, li);

      const link = document.createElement('a');
      link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      const originalLink = linkCell?.querySelector('a');
      if (originalLink) {
        link.href = originalLink.href;
        link.setAttribute('data-link-region', 'Footer List');
        if (originalLink.target) link.target = originalLink.target;
      }
      link.textContent = labelCell?.textContent.trim() || '';
      li.append(link);
      ul.append(li);
    });
    footerListDiv.append(ul);
    if (index < 2) {
      footerBrandNavbarLeft.append(footerListDiv);
    } else {
      // Create footerBrandNavbarRight if it doesn't exist yet
      if (!footerBrandNavbar.querySelector('.footer-brand__navbar--right')) {
        const footerBrandNavbarRight = document.createElement('div');
        footerBrandNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
        footerBrandNavbar.append(footerBrandNavbarRight);
      }
      footerBrandNavbar.querySelector('.footer-brand__navbar--right').append(footerListDiv);
    }
  });

  footerBrandNavbar.prepend(footerBrandNavbarLeft);
  footerBrandRightPrimary.append(footerBrandNavbar);
  footerBrandPrimaryContent.append(footerBrandRightPrimary);
  footerBrandPrimaryContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandPrimaryContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand__secondary');
  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.classList.add('container');
  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  footerBrandRightSecondary.append(socialMediaTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));
    const iconCell = cells.find(cell => cell.querySelector('picture')); // Social icon is a picture

    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');
    moveInstrumentation(row, li);

    const link = document.createElement('a');
    link.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
    const originalLink = linkCell?.querySelector('a');
    if (originalLink) {
      link.href = originalLink.href;
      link.target = '_blank';
      link.setAttribute('data-cta-region', 'Footer');
      link.setAttribute('data-cta-label', `footer-${labelCell?.textContent.trim().toLowerCase()}`);
      link.setAttribute('data-platform-name', labelCell?.textContent.trim().toLowerCase());
      link.setAttribute('data-social-linktype', 'follow');
    }

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        img.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
        img.setAttribute('aria-label', labelCell?.textContent.trim().toLowerCase());
        img.setAttribute('loading', 'lazy');
        moveInstrumentation(iconCell, iconPicture);
        link.append(iconPicture);
      }
    }
    li.append(link);
    socialList.append(li);
  });
  footerBrandRightSecondary.append(socialList);
  footerBrandSecondaryContent.append(footerBrandRightSecondary);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  if (footerItcPortalLinkRow && footerItcPortalLinkLabelRow) {
    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item', 'foot_link');
    const link = document.createElement('a');
    link.classList.add('footer-brand__left--link', 'analytics_cta_click');
    const originalLink = footerItcPortalLinkRow.querySelector('a');
    if (originalLink) {
      link.href = originalLink.href;
      link.target = '_blank';
      link.setAttribute('data-cta-region', 'Footer');
    }
    link.textContent = footerItcPortalLinkLabelRow.textContent.trim();
    moveInstrumentation(footerItcPortalLinkRow, li);
    li.append(link);
    footerBrandLeftList.append(li);
  }
  footerBrandLeftSecondary.append(footerBrandLeftList);

  if (footerCopyrightTextRow) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand__left--text', 'text-white');
    copyrightSpan.textContent = footerCopyrightTextRow.textContent.trim();
    moveInstrumentation(footerCopyrightTextRow, copyrightDiv);
    copyrightDiv.append(copyrightSpan);
    footerBrandLeftSecondary.append(copyrightDiv);
  }
  footerBrandSecondaryContent.append(footerBrandLeftSecondary);
  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');
  submenuContainer.append(overlay);

  block.textContent = '';
  block.classList.add('position-relative', 'mb-15');

  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('d-none', 'app-name');
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  block.append(appNameSpan);

  block.append(header);
  block.append(submenuContainer);

  // Interactivity
  const loginButton = header.querySelector('.header__login-btn-wrapper');
  if (loginButton) {
    loginButton.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior for now, if it's meant to trigger a modal/sidebar
      // Example: toggle sidebar or show login modal
      submenuContainer.classList.toggle('is-open'); // Assuming 'is-open' class controls visibility
      sidebar.classList.toggle('is-open');
      overlay.classList.toggle('is-open');
    });
  }

  const sidebarLinks = sidebar.querySelectorAll('.sidebar__menu-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Close sidebar when a menu item is clicked
      submenuContainer.classList.remove('is-open');
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-open');
    });
  });

  overlay.addEventListener('click', () => {
    // Close sidebar when overlay is clicked
    submenuContainer.classList.remove('is-open');
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-open');
  });

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
