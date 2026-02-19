import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  moveInstrumentation(block.children[0], section);
  section.className = 'header-position-relative header-mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name d-none';
  appNameSpan.setAttribute('data-app-name', block.children[0].children[0].textContent.trim());
  appNameSpan.textContent = block.children[0].children[0].textContent.trim();
  section.append(appNameSpan);

  const headerMain = document.createElement('header');
  headerMain.className = 'header-main boing-container header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  section.append(headerMain);

  const div1 = document.createElement('div');
  div1.className = 'header-d-flex header-w-25';
  headerMain.append(div1);

  const div2 = document.createElement('div');
  div2.className = 'header-d-flex header-justify-content-center header-w-25';
  headerMain.append(div2);

  const mainLogoLink = block.children[0].children[2].querySelector('a');
  const mainLogoImg = block.children[0].children[1].querySelector('img');

  if (mainLogoLink && mainLogoImg) {
    const linkEl = document.createElement('a');
    linkEl.href = mainLogoLink.href;
    linkEl.className = 'header-analytics_cta_click';
    linkEl.setAttribute('data-ct', '');
    linkEl.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(mainLogoLink, linkEl);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header__logo header-d-flex header-align-items-center';

    const optimizedPic = createOptimizedPicture(mainLogoImg.src, mainLogoImg.alt, true, mainLogoImg.getAttribute('loading'));
    optimizedPic.querySelector('img').className = 'header__logo-img';
    moveInstrumentation(mainLogoImg, optimizedPic.querySelector('img'));

    logoDiv.append(optimizedPic);
    linkEl.append(logoDiv);
    div2.append(linkEl);
  }

  const div3 = document.createElement('div');
  div3.className = 'header-d-flex header-w-25 header-justify-content-end';
  headerMain.append(div3);

  const loginButtonLink = block.children[0].children[4].querySelector('a');
  const loginButtonLabel = block.children[0].children[3].textContent.trim();

  if (loginButtonLink && loginButtonLabel) {
    const loginLinkEl = document.createElement('a');
    loginLinkEl.href = loginButtonLink.href;
    loginLinkEl.className = 'header__login-btn-wrapper header-analytics_cta_click';
    loginLinkEl.style.display = 'inline';
    moveInstrumentation(loginButtonLink, loginLinkEl);

    const loginButton = document.createElement('button');
    loginButton.className = 'header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginButtonLabel;
    loginLinkEl.append(loginButton);
    div3.append(loginLinkEl);
  }

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  section.append(submenuContainer);

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  submenuContainer.append(aside);

  const ul = document.createElement('ul');
  ul.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  aside.append(ul);

  const headerMenuItems = [...block.children].slice(1, block.children.length - 3);
  headerMenuItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const link = row.children[1].querySelector('a');
    const icon = row.children[2].querySelector('img');

    if (link && icon) {
      const linkEl = document.createElement('a');
      linkEl.href = link.href;
      linkEl.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      linkEl.setAttribute('data-consent', link.getAttribute('data-consent'));
      linkEl.setAttribute('data-link', link.getAttribute('data-link'));
      moveInstrumentation(link, linkEl);

      const optimizedIcon = createOptimizedPicture(icon.src, icon.alt, false, icon.getAttribute('loading'));
      optimizedIcon.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      moveInstrumentation(icon, optimizedIcon.querySelector('img'));

      linkEl.append(optimizedIcon);
      linkEl.append(document.createTextNode(row.children[0].textContent.trim()));
      li.append(linkEl);
    }
    ul.append(li);
  });

  // Logout item is hardcoded in the HTML, so we need to add it specifically
  const logoutLi = document.createElement('li');
  logoutLi.className = 'header-sidebar__menu-item header-sidebar__menu-item--logout header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
  logoutLi.style.display = 'none';

  const logoutLink = document.createElement('a');
  logoutLink.href = '/';
  logoutLink.className = 'header-sidebar__menu-link header-sidebar__menu-item--logout-btn header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
  logoutLink.setAttribute('data-consent', 'false');
  logoutLink.setAttribute('data-link', '/content/boing/in/en/home');

  const logoutImg = createOptimizedPicture('/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp', 'Logout', false, 'lazy');
  logoutImg.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';

  logoutLink.append(logoutImg);
  logoutLink.append(document.createTextNode('Logout'));
  logoutLi.append(logoutLink);
  ul.append(logoutLi);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');
  aside.append(footerBrand);

  const primarySection = document.createElement('section');
  primarySection.className = 'header-footer-brand__primary';
  primarySection.style.backgroundColor = '';
  footerBrand.append(primarySection);

  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'header-container';
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  primaryContainer.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  primaryContent.append(footerBrandLeft);

  const itcLogoLink = block.children[block.children.length - 3].children[0].children[1].querySelector('a');
  const itcLogoImg = block.children[block.children.length - 3].children[0].children[0].querySelector('img');

  if (itcLogoLink && itcLogoImg) {
    const linkEl = document.createElement('a');
    linkEl.href = itcLogoLink.href;
    linkEl.target = '_blank';
    linkEl.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    linkEl.setAttribute('data-cta-region', 'Footer');
    linkEl.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(itcLogoLink, linkEl);

    const optimizedPic = createOptimizedPicture(itcLogoImg.src, itcLogoImg.alt, false, itcLogoImg.getAttribute('loading'));
    optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    moveInstrumentation(itcLogoImg, optimizedPic.querySelector('img'));
    linkEl.append(optimizedPic);
    footerBrandLeft.append(linkEl);
  }

  const fssiLogoDiv = document.createElement('div');
  fssiLogoDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  const fssiLogoImg = block.children[block.children.length - 3].children[0].children[2].querySelector('img');
  if (fssiLogoImg) {
    const optimizedPic = createOptimizedPicture(fssiLogoImg.src, fssiLogoImg.alt, false, fssiLogoImg.getAttribute('loading'));
    optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    moveInstrumentation(fssiLogoImg, optimizedPic.querySelector('img'));
    fssiLogoDiv.append(optimizedPic);
    footerBrandLeft.append(fssiLogoDiv);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  primaryContent.append(footerBrandRight);

  const nav = document.createElement('nav');
  nav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(nav);

  const navLeft = document.createElement('div');
  navLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';
  nav.append(navLeft);

  const footerLinkLists = [...block.children].slice(block.children.length - 3, block.children.length);
  footerLinkLists.forEach((listRow, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';

    const footerUl = document.createElement('ul');
    footerUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    [...listRow.children].forEach((cell) => {
      const link = cell.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';

        const linkEl = document.createElement('a');
        linkEl.href = link.href;
        linkEl.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        linkEl.setAttribute('data-link-region', 'Footer List');
        if (link.target) {
          linkEl.target = link.target;
        }
        linkEl.textContent = link.textContent.trim();
        moveInstrumentation(link, linkEl);
        li.append(linkEl);
        footerUl.append(li);
      }
    });
    footerListDiv.append(footerUl);
    if (index < 2) {
      navLeft.append(footerListDiv);
    } else {
      const navRight = document.createElement('div');
      navRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
      nav.append(navRight);
      navRight.append(footerListDiv);
    }
  });

  const secondarySection = document.createElement('section');
  secondarySection.className = 'header-footer-brand__secondary';
  secondarySection.style.backgroundColor = '';
  footerBrand.append(secondarySection);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'header-container';
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';
  secondaryContainer.append(secondaryContent);

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  secondaryContent.append(socialMediaSection);

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';
  socialMediaSection.append(socialUl);

  const socialLinksRow = block.children[block.children.length - 1]; // Assuming the last row contains social links
  [...socialLinksRow.children].forEach((cell) => {
    const link = cell.querySelector('a');
    const img = cell.querySelector('img');

    if (link && img) {
      const li = document.createElement('li');
      li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

      const linkEl = document.createElement('a');
      linkEl.href = link.href;
      linkEl.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      linkEl.setAttribute('data-cta-region', 'Footer');
      linkEl.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
      linkEl.target = '_blank';
      linkEl.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
      linkEl.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, linkEl);

      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, img.getAttribute('loading'));
      optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      optimizedPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
      moveInstrumentation(img, optimizedPic.querySelector('img'));

      linkEl.append(optimizedPic);
      li.append(linkEl);
      socialUl.append(li);
    }
  });

  const footerLeftSection = document.createElement('section');
  footerLeftSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  secondaryContent.append(footerLeftSection);

  const footerLeftUl = document.createElement('ul');
  footerLeftUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  footerLeftSection.append(footerLeftUl);

  const itcPortalLinkRow = block.children[block.children.length - 2]; // Assuming the second to last row contains ITC portal link
  const itcPortalLink = itcPortalLinkRow.children[0].querySelector('a');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__left--item header-foot_link';

    const linkEl = document.createElement('a');
    linkEl.href = itcPortalLink.href;
    linkEl.target = '_blank';
    linkEl.className = 'header-footer-brand__left--link header-analytics_cta_click';
    linkEl.setAttribute('data-cta-region', 'Footer');
    linkEl.textContent = itcPortalLink.textContent.trim();
    moveInstrumentation(itcPortalLink, linkEl);
    li.append(linkEl);
    footerLeftUl.append(li);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  footerLeftSection.append(copyrightDiv);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  block.textContent = '';
  block.append(section);
}
