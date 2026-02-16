import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSectionRoot = document.createElement('section');
  moveInstrumentation(block, headerSectionRoot);
  headerSectionRoot.className = 'header-section-root position-relative header-mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name d-none';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  headerSectionRoot.append(appNameSpan);

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container d-flex justify-content-between align-items-center header-h-15 px-5 py-2 fixed-top header-w-100 header-bg-white';
  headerSectionRoot.append(headerContainer);

  const div1 = document.createElement('div');
  div1.className = 'header-d-flex header-w-25';
  headerContainer.append(div1);

  const div2 = document.createElement('div');
  div2.className = 'header-d-flex justify-content-center header-w-25';
  headerContainer.append(div2);

  const div3 = document.createElement('div');
  div3.className = 'header-d-flex header-w-25 justify-content-end';
  headerContainer.append(div3);

  const headerSubmenuContainer = document.createElement('div');
  headerSubmenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';
  headerSectionRoot.append(headerSubmenuContainer);

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar start-0 header-bg-white position-absolute';
  headerSubmenuContainer.append(aside);

  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.className = 'header-sidebar-menu list-unstyled px-4';
  aside.append(sidebarMenuUl);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');
  aside.append(footerBrand);

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand-primary';
  footerBrandPrimary.style.backgroundColor = '';
  footerBrand.append(footerBrandPrimary);

  const footerBrandPrimaryContainer = document.createElement('div');
  footerBrandPrimaryContainer.className = 'header-container';
  footerBrandPrimary.append(footerBrandPrimaryContainer);

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'header-footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';
  footerBrandPrimaryContainer.append(footerBrandPrimaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';
  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';
  footerBrandPrimaryContent.append(footerBrandRight);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'header-footer-brand-navbar d-grid d-md-flex';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row ';
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';
  footerBrandNavbar.append(footerBrandNavbarRight);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand-secondary';
  footerBrandSecondary.style.backgroundColor = '';
  footerBrand.append(footerBrandSecondary);

  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.className = 'header-container';
  footerBrandSecondary.append(footerBrandSecondaryContainer);

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'header-footer-brand-secondary--content d-flex flex-column justify-content-md-between align-items-center';
  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.className = 'header-footer-brand-right d-flex flex-column pb-5';
  footerBrandSecondaryContent.append(footerBrandRightSecondary);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  footerBrandRightSecondary.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';
  footerBrandRightSecondary.append(socialMediaList);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'header-footer-brand-left header-py-5 d-flex flex-column gap-3';
  footerBrandSecondaryContent.append(footerBrandLeftSecondary);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.className = 'header-footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';
  footerBrandLeftSecondary.append(footerBrandLeftList);

  const footerBrandLeftCopyright = document.createElement('div');
  footerBrandLeftCopyright.className = 'header-footer-brand-left--copyright text-center ';
  footerBrandLeftSecondary.append(footerBrandLeftCopyright);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay position-absolute top-0 start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  headerSubmenuContainer.append(overlay);

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const type = cells[0].textContent.trim();

    if (type === 'Logo') {
      const logoLink = cells[1].querySelector('a');
      if (logoLink) {
        const logoAnchor = document.createElement('a');
        logoAnchor.href = logoLink.href;
        logoAnchor.className = 'header-analytics_cta_click';
        logoAnchor.setAttribute('data-ct', '');
        logoAnchor.setAttribute('a-label', 'header-logo-boing');
        moveInstrumentation(logoLink, logoAnchor);

        const logoDiv = document.createElement('div');
        logoDiv.className = 'header-logo d-flex align-items-center';
        logoAnchor.append(logoDiv);

        const img = logoLink.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').className = 'header-logo-img';
          optimizedPic.querySelector('img').setAttribute('fetchpriority', 'high');
          optimizedPic.querySelector('img').setAttribute('loading', 'eager');
          logoDiv.append(optimizedPic);
        }
        div2.append(logoAnchor);
      }
    } else if (type === 'Login Link') {
      const loginLink = cells[1].querySelector('a');
      if (loginLink) {
        const loginAnchor = document.createElement('a');
        loginAnchor.href = loginLink.href;
        loginAnchor.className = 'header-login-btn-wrapper header-analytics_cta_click';
        loginAnchor.style.display = 'inline';
        moveInstrumentation(loginLink, loginAnchor);

        const loginButton = document.createElement('button');
        loginButton.className = 'header-login-btn btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 btn-sm header-py-3 header-px-4';
        loginButton.textContent = 'Login';
        loginAnchor.append(loginButton);
        div3.append(loginAnchor);
      }
    } else if (type === 'Sidebar Menu Items') {
      [...cells[1].children].forEach((item) => {
        const li = document.createElement('li');
        li.className = 'header-sidebar-menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
        moveInstrumentation(item, li);

        const anchor = item.querySelector('a');
        if (anchor) {
          const newAnchor = document.createElement('a');
          newAnchor.href = anchor.href;
          newAnchor.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 header-fw-medium header-analytics_cta_click';
          newAnchor.setAttribute('data-consent', anchor.getAttribute('data-consent') || 'false');
          newAnchor.setAttribute('data-link', anchor.getAttribute('data-link') || '');
          moveInstrumentation(anchor, newAnchor);

          const img = anchor.querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, img.alt);
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            optimizedPic.querySelector('img').className = 'header-sidebar-menu-icon me-4';
            optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
            newAnchor.append(optimizedPic);
          }
          newAnchor.append(anchor.textContent.trim());
          li.append(newAnchor);
        }
        sidebarMenuUl.append(li);
      });
      // Add the logout item separately as it has a specific class and style
      const logoutLi = document.createElement('li');
      logoutLi.className = 'header-sidebar-menu-item header-sidebar-menu-item--logout header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
      logoutLi.style.display = 'none';

      const logoutAnchor = document.createElement('a');
      logoutAnchor.href = '/';
      logoutAnchor.className = 'header-sidebar-menu-link header-sidebar-menu-item--logout-btn d-flex align-items-center text-decoration-none px-6 header-fw-medium header-analytics_cta_click';
      logoutAnchor.setAttribute('data-consent', 'false');
      logoutAnchor.setAttribute('data-link', '/content/boing/in/en/home');

      const logoutImg = document.createElement('img');
      logoutImg.src = '/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp';
      logoutImg.alt = 'Logout';
      logoutImg.className = 'header-sidebar-menu-icon me-4';
      logoutImg.setAttribute('loading', 'lazy');
      logoutAnchor.append(logoutImg);
      logoutAnchor.append('Logout');
      logoutLi.append(logoutAnchor);
      sidebarMenuUl.append(logoutLi);

    } else if (type === 'Footer Links') {
      const footerLists = cells[1].querySelectorAll('ul');
      footerLists.forEach((list, index) => {
        const footerListDiv = document.createElement('div');
        footerListDiv.className = 'header-footerList';
        moveInstrumentation(list, footerListDiv);

        const ul = document.createElement('ul');
        ul.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
        footerListDiv.append(ul);

        [...list.children].forEach((item) => {
          const li = document.createElement('li');
          li.className = 'header-footer-list__item';
          moveInstrumentation(item, li);

          const anchor = item.querySelector('a');
          if (anchor) {
            const newAnchor = document.createElement('a');
            newAnchor.href = anchor.href;
            newAnchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link d-inline-block';
            newAnchor.setAttribute('data-link-region', 'Footer List');
            if (anchor.target) {
              newAnchor.setAttribute('target', anchor.target);
            }
            newAnchor.textContent = anchor.textContent;
            moveInstrumentation(anchor, newAnchor);
            li.append(newAnchor);
          }
          ul.append(li);
        });

        if (index < 2) {
          footerBrandNavbarLeft.append(footerListDiv);
        } else {
          footerBrandNavbarRight.append(footerListDiv);
        }
      });

      // Add the ITC Logo and FSSI Logo
      const itcLogoLink = document.createElement('a');
      itcLogoLink.href = 'https://www.itcportal.com/';
      itcLogoLink.target = '_blank';
      itcLogoLink.className = 'header-footer-brand-logo d-inline-block header-analytics_cta_click';
      itcLogoLink.setAttribute('data-cta-region', 'Footer');
      itcLogoLink.setAttribute('aria-label', 'ITC Logo');

      const itcImg = document.createElement('img');
      itcImg.src = '/content/dam/aemigrate/uploaded-folder/image/itc-logo-2-fmt-webp-alpha.webp';
      itcImg.alt = 'ITC Logo';
      itcImg.className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      itcImg.setAttribute('loading', 'lazy');
      itcLogoLink.append(itcImg);
      footerBrandLeft.append(itcLogoLink);

      const fssiLogoDiv = document.createElement('div');
      fssiLogoDiv.className = 'header-footer-brand-secondary--logo d-inline-block';

      const fssiImg = document.createElement('img');
      fssiImg.className = 'header-object-fit-contain header-w-100 header-no-rendition';
      fssiImg.src = '/content/dam/aemigrate/uploaded-folder/image/fssi-logo-update-fmt-webp-alpha.webp';
      fssiImg.alt = 'FSSI Logo';
      fssiImg.setAttribute('loading', 'lazy');
      fssiLogoDiv.append(fssiImg);
      footerBrandLeft.append(fssiLogoDiv);

      // Add ITC portal link in footerBrandLeftSecondary
      const itcPortalLi = document.createElement('li');
      itcPortalLi.className = 'header-footer-brand-left--item header-foot_link';
      const itcPortalAnchor = document.createElement('a');
      itcPortalAnchor.href = 'https://www.itcportal.com/';
      itcPortalAnchor.target = '_blank';
      itcPortalAnchor.className = 'header-footer-brand-left--link header-analytics_cta_click';
      itcPortalAnchor.setAttribute('data-cta-region', 'Footer');
      itcPortalAnchor.textContent = 'ITC portal';
      itcPortalLi.append(itcPortalAnchor);
      footerBrandLeftList.append(itcPortalLi);

    } else if (type === 'Footer Social Links') {
      [...cells[1].children].forEach((item) => {
        const li = document.createElement('li');
        li.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';
        moveInstrumentation(item, li);

        const anchor = item.querySelector('a');
        if (anchor) {
          const newAnchor = document.createElement('a');
          newAnchor.href = anchor.href;
          newAnchor.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center header-analytics_cta_click';
          newAnchor.setAttribute('data-cta-region', 'Footer');
          newAnchor.setAttribute('data-cta-label', `footer-${anchor.querySelector('img').alt.toLowerCase()}`);
          newAnchor.setAttribute('target', '_blank');
          newAnchor.setAttribute('data-platform-name', anchor.querySelector('img').alt.toLowerCase());
          newAnchor.setAttribute('data-social-linktype', 'follow');
          moveInstrumentation(anchor, newAnchor);

          const img = anchor.querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, img.alt);
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            optimizedPic.querySelector('img').setAttribute('aria-label', img.alt.toLowerCase());
            optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
            optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
            newAnchor.append(optimizedPic);
          }
          li.append(newAnchor);
        }
        socialMediaList.append(li);
      });
    } else if (type === 'Footer Copyright') {
      const copyrightSpan = document.createElement('span');
      copyrightSpan.className = 'header-footer-brand-left--text text-white';
      copyrightSpan.textContent = cells[1].textContent.trim();
      footerBrandLeftCopyright.append(copyrightSpan);
    }
  });

  block.textContent = '';
  block.append(headerSectionRoot);
}
