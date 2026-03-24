import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure root model fields based on BlockJson
  // BlockJson has 4 root fields: logo, contact-link, items (container for nav-item), languages (container for language-item)
  const [logoRow, contactLinkRow, navItemsContainerRow, languageSelectorContainerRow, ...itemRows] = [...block.children];

  const headerNav = document.createElement('div');
  headerNav.classList.add('header-cmp-navigation-wrapper');
  headerNav.setAttribute('role', 'banner');
  headerNav.setAttribute('aria-label', 'navigation.header.aria.label');

  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-cmp-navigation-wrapper__logo');
  const logoLink = document.createElement('a');
  moveInstrumentation(logoRow, logoLink);
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      logoLink.href = '/'; // Default home link
      logoLink.setAttribute('aria-label', 'Qiddiya - Go to homepage');
      const spanIcon = document.createElement('span');
      spanIcon.classList.add('qd-icon', 'qd-icon--logo', 'qd-logo');
      for (let i = 1; i <= 25; i += 1) {
        const pathSpan = document.createElement('span');
        pathSpan.classList.add(`path${i}`);
        spanIcon.append(pathSpan);
      }
      logoLink.append(spanIcon);
      logoWrapper.append(logoLink);
    }
  }

  // Contact Us CTA and Hamburger
  const contactUsCtaWrapper = document.createElement('div');
  contactUsCtaWrapper.classList.add('header-cmp-navigation-wrapper__contactUs-cta');

  const contactLinkEl = document.createElement('a');
  const foundContactLink = contactLinkRow.querySelector('a');
  if (foundContactLink) {
    moveInstrumentation(contactLinkRow, contactLinkEl);
    contactLinkEl.href = foundContactLink.href;
    // Corrected class name from 'cta__' to 'cta' based on ORIGINAL HTML
    contactLinkEl.classList.add('cta', 'header-cmp-navigation--content__cta');
    contactLinkEl.setAttribute('target', '_self');
    contactLinkEl.setAttribute('aria-label', 'Contact Us');

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    contactLinkEl.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('cta__label');
    ctaLabel.textContent = foundContactLink.textContent;
    contactLinkEl.append(ctaLabel);
  }
  contactUsCtaWrapper.append(contactLinkEl);

  const iconWrapper = document.createElement('div');
  iconWrapper.classList.add('header-cmp-navigation-wrapper__icon');
  iconWrapper.id = 'navigation-toggle';
  const hamburgerEllipse = document.createElement('div');
  hamburgerEllipse.classList.add('header-hamburger-ellipse');
  hamburgerEllipse.setAttribute('tabindex', '0');
  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.classList.add('header-hamburger-icon', 'qd-icon', 'qd-icon--hamburger');
  const closeIcon = document.createElement('span');
  closeIcon.classList.add('header-close-icon', 'qd-icon', 'qd-icon--cancel');
  hamburgerEllipse.append(hamburgerIcon, closeIcon);
  iconWrapper.append(hamburgerEllipse);
  contactUsCtaWrapper.append(iconWrapper);

  logoWrapper.append(contactUsCtaWrapper);
  headerNav.append(logoWrapper);

  // Desktop Navigation
  const desktopNav = document.createElement('nav');
  desktopNav.classList.add('header-cmp-navigation-wrapper__navbar');
  desktopNav.id = 'navbar-desktop';
  desktopNav.setAttribute('role', 'navigation');
  desktopNav.setAttribute('aria-label', 'navigation.main.aria.label');

  const desktopNavList = document.createElement('ul');
  desktopNavList.classList.add('header-cmp-navigation-wrapper__navbar-list');

  // Mobile Navigation
  const mobileNav = document.createElement('nav');
  mobileNav.classList.add('header-cmp-navigation-wrapper__mobilenavbar');
  mobileNav.id = 'navbar-mobile';
  mobileNav.setAttribute('role', 'navigation');
  mobileNav.setAttribute('aria-label', 'navigation.main.aria.label');

  const mobileNavList = document.createElement('ul');
  mobileNavList.classList.add('header-cmp-navigation-wrapper__mobilenavbar-list');

  // Content detection for item sub-components
  // nav-item: 3 cells (label, link, subitems container)
  // subnav-item: 2 cells (label, link)
  // language-item: 2 cells (label, link)
  const navItems = itemRows.filter((row) => row.children.length === 3);
  const subNavItems = itemRows.filter((row) => row.children.length === 2 && row.querySelector('a')); // subnav-item has a link
  const languageItems = itemRows.filter((row) => row.children.length === 2 && !row.querySelector('a')); // language-item has no direct link in the row, but a link inside the second cell

  navItems.forEach((row) => {
    const [labelCell, linkCell, subitemsCell] = [...row.children];

    // Desktop Nav Item
    const desktopMenuItem = document.createElement('li');
    desktopMenuItem.classList.add('header-cmp-navigation-wrapper__navbar-menu');
    moveInstrumentation(row, desktopMenuItem);

    const desktopMenuLink = document.createElement('a');
    desktopMenuLink.classList.add('header-cmp-navigation-wrapper__navbar-menulink');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      desktopMenuLink.href = foundLink.href;
      desktopMenuLink.setAttribute('target', '_self');
    }
    desktopMenuLink.innerHTML = `<span>${labelCell.textContent}</span>`;

    const desktopIconWrapper = document.createElement('span');
    desktopIconWrapper.classList.add('header-qd-icon-wrapper');
    const desktopMenuIcon = document.createElement('span');
    desktopMenuIcon.classList.add('header-menu-icon', 'qd-icon', 'qd-icon--cheveron-down');
    desktopIconWrapper.append(desktopMenuIcon);
    desktopMenuLink.append(desktopIconWrapper);
    desktopMenuItem.append(desktopMenuLink);

    const desktopSubmenu = document.createElement('ul');
    desktopSubmenu.classList.add('header-cmp-navigation-wrapper__navbar-submenu');

    const mobileMenuItem = document.createElement('li');
    mobileMenuItem.classList.add('header-cmp-navigation-wrapper__mobilenavbar-menu', 'border');
    moveInstrumentation(row, mobileMenuItem);

    const mobileMenuLink = document.createElement('a');
    mobileMenuLink.classList.add('header-cmp-navigation-wrapper__mobilenavbar-menulink');
    mobileMenuLink.innerHTML = `<span>${labelCell.textContent}</span>`;
    const mobileIcon = document.createElement('span');
    mobileIcon.classList.add('qd-icon', 'qd-icon--cheveron-right', 'header-cmp-navigation-wrapper__mobilenavbar-menulink-icon');
    mobileMenuLink.append(mobileIcon);
    mobileMenuItem.append(mobileMenuLink);

    const mobileSubmenu = document.createElement('ul');
    mobileSubmenu.classList.add('header-cmp-navigation-wrapper__mobilenavbar-submenu');
    const mobileSubmenuHeader = document.createElement('li');
    mobileSubmenuHeader.classList.add('header-cmp-navigation-wrapper__mobilenavbar-menuheader');
    const mobileSubmenuHeaderLink = document.createElement('a');
    mobileSubmenuHeaderLink.innerHTML = `<span>${labelCell.textContent}</span>`;
    mobileSubmenuHeader.append(mobileSubmenuHeaderLink);
    mobileSubmenu.append(mobileSubmenuHeader);

    // Filter subNavItems that are children of the current nav-item's subitemsCell
    const subNavItemsForThisParent = subNavItems.filter((subRow) => subitemsCell.contains(subRow));

    if (subNavItemsForThisParent.length > 0) {
      desktopMenuLink.setAttribute('aria-haspopup', 'true');
      desktopMenuLink.setAttribute('aria-expanded', 'false');

      // Desktop submenu toggle
      desktopMenuLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        const isExpanded = desktopMenuLink.getAttribute('aria-expanded') === 'true';
        desktopMenuLink.setAttribute('aria-expanded', !isExpanded);
        desktopSubmenu.classList.toggle('active');
        desktopMenuItem.classList.toggle('active'); // Add active class to parent li for styling
      });

      // Mobile submenu toggle
      mobileMenuLink.addEventListener('click', () => {
        mobileSubmenu.classList.add('active');
        mobileNav.classList.add('sub-menu-open');
      });

      subNavItemsForThisParent.forEach((subRow) => {
        const [subLabelCell, subLinkCell] = [...subRow.children];

        // Desktop Subitem
        const desktopSubLi = document.createElement('li');
        moveInstrumentation(subRow, desktopSubLi);
        const desktopSubLink = document.createElement('a');
        const foundSubLink = subLinkCell.querySelector('a');
        if (foundSubLink) {
          desktopSubLink.href = foundSubLink.href;
          desktopSubLink.setAttribute('target', '_self');
        }
        desktopSubLink.setAttribute('aria-expanded', 'false');
        desktopSubLink.innerHTML = `<span>${subLabelCell.textContent}</span>`;
        desktopSubLi.append(desktopSubLink);
        desktopSubmenu.append(desktopSubLi);

        // Mobile Subitem
        const mobileSubLi = document.createElement('li');
        mobileSubLi.classList.add('header-cmp-navigation-wrapper__mobilenavbar-menu');
        moveInstrumentation(subRow, mobileSubLi);
        const mobileSubLink = document.createElement('a');
        if (foundSubLink) {
          mobileSubLink.href = foundSubLink.href;
          mobileSubLink.setAttribute('target', '_self');
        }
        mobileSubLink.classList.add('header-cmp-navigation-wrapper__mobilenavbar-menulink');
        mobileSubLink.innerHTML = `<span>${subLabelCell.textContent}</span>`;
        mobileSubLi.append(mobileSubLink);
        mobileSubmenu.append(mobileSubLi);
      });
    }

    desktopMenuItem.append(desktopSubmenu);
    desktopNavList.append(desktopMenuItem);

    mobileMenuItem.append(mobileSubmenu);
    mobileNavList.append(mobileMenuItem);
  });

  desktopNav.append(desktopNavList);

  // Append contact us CTA to desktop nav
  const desktopContactLinkEl = document.createElement('a');
  const foundContactLinkDesktop = contactLinkRow.querySelector('a'); // Re-using contactLinkRow
  if (foundContactLinkDesktop) {
    desktopContactLinkEl.href = foundContactLinkDesktop.href;
    // Corrected class name from 'cta__' to 'cta' based on ORIGINAL HTML
    desktopContactLinkEl.classList.add('cta', 'header-cmp-navigation--content__cta');
    desktopContactLinkEl.setAttribute('target', '_self');
    desktopContactLinkEl.setAttribute('aria-label', 'Contact Us'); // Use static string or actual i18n key if available

    const ctaIcon = document.createElement('span');
    ctaIcon.classList.add('cta__icon', 'qd-icon', 'qd-icon--cheveron-right');
    ctaIcon.setAttribute('aria-hidden', 'true');
    desktopContactLinkEl.append(ctaIcon);

    const ctaLabel = document.createElement('span');
    ctaLabel.classList.add('cta__label');
    ctaLabel.textContent = foundContactLinkDesktop.textContent;
    desktopContactLinkEl.append(ctaLabel);
  }
  desktopNav.append(desktopContactLinkEl);

  // Language Selector
  const languageSelector = document.createElement('div');
  languageSelector.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  languageSelector.style.visibility = 'visible';
  const langUl = document.createElement('ul');
  langUl.classList.add('header-cmp-language-selector');

  languageItems.forEach((row, index) => {
    // language-item has 2 cells: [Language Label, Language Link]
    const [labelCell, linkCell] = [...row.children];
    const langLi = document.createElement('li');
    moveInstrumentation(row, langLi);
    if (index === 0) {
      langLi.classList.add('active');
    }
    const langLink = document.createElement('a');
    const foundLangLink = linkCell.querySelector('a'); // The link is inside the second cell
    if (foundLangLink) {
      langLink.href = foundLangLink.href;
      langLink.setAttribute('aria-label', labelCell.textContent);
      langLink.classList.add('header-cmp-language-selector__link');
      langLink.setAttribute('data-lang', labelCell.textContent.toLowerCase().substring(0, 2)); // Assuming 'en', 'ar'
      langLink.textContent = labelCell.textContent;
    }
    langLi.append(langLink);
    langUl.append(langLi);
  });
  languageSelector.append(langUl);
  desktopNav.append(languageSelector);

  headerNav.append(desktopNav);

  // Mobile Nav Back Button
  const mobileNavBack = document.createElement('div');
  mobileNavBack.classList.add('header-cmp-navigation-wrapper__mobilenavbar-back', 'nav-back');
  const backIconWrapper = document.createElement('a');
  backIconWrapper.classList.add('header-cmp-navigation-wrapper__icon');
  const backIcon = document.createElement('span');
  backIcon.classList.add('header-back-icon', 'qd-icon', 'qd-icon--cheveron-left');
  backIconWrapper.append(backIcon);
  const backLabel = document.createElement('span');
  backLabel.classList.add('header-cmp-navigation-wrapper__iconlabel');
  backLabel.textContent = 'Back';
  mobileNavBack.append(backIconWrapper, backLabel);
  mobileNav.append(mobileNavList, mobileNavBack);

  // Append language selector to mobile nav
  const mobileLanguageSelector = languageSelector.cloneNode(true);
  mobileNav.append(mobileLanguageSelector);

  headerNav.append(mobileNav);

  block.textContent = '';
  block.append(headerNav);

  // Toggle functionality for hamburger menu
  const navigationToggle = block.querySelector('#navigation-toggle');
  const navbarDesktop = block.querySelector('#navbar-desktop');
  const navbarMobile = block.querySelector('#navbar-mobile');

  if (navigationToggle && navbarDesktop && navbarMobile) {
    navigationToggle.addEventListener('click', () => {
      headerNav.classList.toggle('active');
      navbarDesktop.classList.toggle('active');
      navbarMobile.classList.toggle('active');
      document.body.classList.toggle('disable-scroll');
    });
  }

  const mobileBackBtn = block.querySelector('.header-cmp-navigation-wrapper__mobilenavbar-back');
  if (mobileBackBtn && navbarMobile) {
    mobileBackBtn.addEventListener('click', () => {
      const activeSubmenu = block.querySelector('.header-cmp-navigation-wrapper__mobilenavbar-submenu.active');
      if (activeSubmenu) {
        activeSubmenu.classList.remove('active');
        navbarMobile.classList.remove('sub-menu-open');
      }
    });
  }

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
