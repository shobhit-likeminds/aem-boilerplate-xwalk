import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Header
  const header = document.createElement('header');
  header.classList.add('boing-container', 'header', 'd-flex', 'justify-content-between', 'align-items-center', 'h-15', 'px-5', 'py-2', 'fixed-top', 'w-100', 'bg-white');

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.classList.add('d-flex', 'w-25');
  const headerLeftImageCell = children[0].firstElementChild; // headerLeftImage
  if (headerLeftImageCell) {
    moveInstrumentation(children[0], headerLeftDiv);
    headerLeftDiv.append(headerLeftImageCell);
  }
  header.append(headerLeftDiv);

  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.classList.add('d-flex', 'justify-content-center', 'w-25');

  const headerLogoLink = document.createElement('a');
  headerLogoLink.classList.add('analytics_cta_click');
  const headerLogoLinkRow = children[2]; // headerLogoLink
  if (headerLogoLinkRow) {
    const foundLink = headerLogoLinkRow.querySelector('a');
    if (foundLink) {
      headerLogoLink.href = foundLink.href;
      headerLogoLink.setAttribute('a-label', 'header-logo-boing');
      moveInstrumentation(headerLogoLinkRow, headerLogoLink);
    }
  }

  const headerLogoInnerDiv = document.createElement('div');
  headerLogoInnerDiv.classList.add('header__logo', 'd-flex', 'align-items-center');

  const headerLogoImageCell = children[1].firstElementChild; // headerLogoImage
  if (headerLogoImageCell) {
    const img = headerLogoImageCell.querySelector('img');
    if (img) {
      img.classList.add('header__logo-img');
      img.setAttribute('fetchpriority', 'high');
      img.setAttribute('loading', 'eager');
      moveInstrumentation(children[1], headerLogoInnerDiv);
      headerLogoInnerDiv.append(headerLogoImageCell);
    }
  }

  headerLogoLink.append(headerLogoInnerDiv);
  headerLogoDiv.append(headerLogoLink);
  header.append(headerLogoDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.classList.add('d-flex', 'w-25', 'justify-content-end');

  const loginLinkWrapper = document.createElement('a');
  loginLinkWrapper.classList.add('header__login-btn-wrapper', 'analytics_cta_click');
  loginLinkWrapper.style.display = 'inline';
  const loginLinkRow = children[4]; // loginLink
  if (loginLinkRow) {
    const foundLink = loginLinkRow.querySelector('a');
    if (foundLink) {
      loginLinkWrapper.href = foundLink.href;
      moveInstrumentation(loginLinkRow, loginLinkWrapper);
    }
  }

  const loginButton = document.createElement('button');
  loginButton.classList.add('header__login-btn', 'btn', 'text-boing-primary', 'bg-transparent', 'fw-semibold', 'rounded-4', 'btn-sm', 'py-3', 'px-4');
  const loginLinkLabelCell = children[5].firstElementChild; // loginLinkLabel
  if (loginLinkLabelCell) {
    loginButton.textContent = loginLinkLabelCell.textContent.trim();
    moveInstrumentation(children[5], loginButton);
  }
  loginLinkWrapper.append(loginButton);
  headerRightDiv.append(loginLinkWrapper);
  header.append(headerRightDiv);

  // Submenu container (for sidebar)
  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');

  const sidebar = document.createElement('aside');
  sidebar.classList.add('sidebar', 'start-0', 'bg-white', 'position-absolute');

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.classList.add('sidebar__menu', 'list-unstyled', 'px-4');

  // Fixed fields: headerLeftImage, headerLogoImage, headerLogoLink, headerLogoLinkLabel, loginLink, loginLinkLabel,
  // footerLeftLogo, footerRightLogo, footerLeftLink, footerLeftLinkLabel, footerCopyright
  // Total 11 fixed fields.
  const fixedFieldCount = 11;

  // Sidebar Menu Items: 3 cells (menuLink, menuLinkLabel, menuIcon)
  const sidebarMenuItems = children.slice(fixedFieldCount).filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells.some(cell => cell.querySelector('picture')); // Check for picture to identify menuIcon
  });

  sidebarMenuItems.forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    li.classList.add('sidebar__menu-item', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');
    moveInstrumentation(row, li);

    const menuLinkCell = cells.find(cell => cell.querySelector('a'));
    const menuIconCell = cells.find(cell => cell.querySelector('picture'));
    const menuLinkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));

    const menuLink = document.createElement('a');
    menuLink.classList.add('sidebar__menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'analytics_cta_click');
    if (menuLinkCell) {
      const foundMenuLink = menuLinkCell.querySelector('a');
      if (foundMenuLink) {
        menuLink.href = foundMenuLink.href;
        menuLink.setAttribute('data-consent', 'false');
        menuLink.setAttribute('data-link', foundMenuLink.href);
      }
    }

    if (menuIconCell) {
      const menuIcon = menuIconCell.querySelector('picture');
      if (menuIcon) {
        const img = menuIcon.querySelector('img');
        if (img) {
          img.classList.add('sidebar__menu-icon', 'me-4');
          img.setAttribute('loading', 'lazy');
          menuLink.append(menuIcon);
        }
      }
    }

    if (menuLinkLabelCell) {
      menuLink.append(menuLinkLabelCell.textContent.trim());
    }
    li.append(menuLink);
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

  const footerPrimary = document.createElement('section');
  footerPrimary.classList.add('footer-brand__primary');
  footerPrimary.style.backgroundColor = '';

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.classList.add('container');

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  const footerLeftLogoLink = document.createElement('a');
  footerLeftLogoLink.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
  footerLeftLogoLink.setAttribute('data-cta-region', 'Footer');
  footerLeftLogoLink.setAttribute('aria-label', 'ITC Logo');
  footerLeftLogoLink.target = '_blank';
  footerLeftLogoLink.href = 'https://www.itcportal.com/'; // Hardcoded from original HTML

  const footerLeftLogoCell = children[6].firstElementChild; // footerLeftLogo
  if (footerLeftLogoCell) {
    const picture = footerLeftLogoCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        img.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
        img.setAttribute('loading', 'lazy');
        moveInstrumentation(children[6], footerLeftLogoLink);
        footerLeftLogoLink.append(picture);
      }
    }
  }
  footerBrandLeft.append(footerLeftLogoLink);

  const footerRightLogoDiv = document.createElement('div');
  footerRightLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const footerRightLogoCell = children[7].firstElementChild; // footerRightLogo
  if (footerRightLogoCell) {
    const picture = footerRightLogoCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        img.classList.add('object-fit-contain', 'w-100', 'no-rendition');
        img.setAttribute('loading', 'lazy');
        moveInstrumentation(children[7], footerRightLogoDiv);
        footerRightLogoDiv.append(picture);
      }
    }
  }
  footerBrandLeft.append(footerRightLogoDiv);
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  // Footer List Items: 2 cells (footerLink, footerLinkLabel)
  // These items appear after fixed fields AND sidebar menu items.
  const footerListItems = children.slice(fixedFieldCount + sidebarMenuItems.length).filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a')) && !cells.some(cell => cell.querySelector('picture')); // Check for link and absence of picture to distinguish from social links
  });

  const createFooterList = (items) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    items.forEach((itemRow) => {
      const cells = [...itemRow.children];
      const li = document.createElement('li');
      li.classList.add('footer-list__item');
      moveInstrumentation(itemRow, li);

      const linkCell = cells.find(cell => cell.querySelector('a'));
      const labelCell = cells.find(cell => !cell.querySelector('a'));

      const link = document.createElement('a');
      link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      link.setAttribute('data-link-region', 'Footer List');

      if (linkCell) {
        const foundLink = linkCell.querySelector('a');
        if (foundLink) {
          link.href = foundLink.href;
        }
      }
      if (labelCell) {
        link.textContent = labelCell.textContent.trim();
      }
      li.append(link);
      ul.append(li);
    });
    footerListDiv.append(ul);
    return footerListDiv;
  };

  // Distribute footer list items into 4 columns
  const numFooterListItems = footerListItems.length;
  const itemsPerColumn = Math.ceil(numFooterListItems / 4);

  let startIndex = 0;
  if (itemsPerColumn > 0) {
    footerNavbarLeft.append(createFooterList(footerListItems.slice(startIndex, startIndex + itemsPerColumn)));
    startIndex += itemsPerColumn;
    footerNavbarLeft.append(createFooterList(footerListItems.slice(startIndex, startIndex + itemsPerColumn)));
    startIndex += itemsPerColumn;
  }

  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');

  if (itemsPerColumn > 0) {
    footerNavbarRight.append(createFooterList(footerListItems.slice(startIndex, startIndex + itemsPerColumn)));
    startIndex += itemsPerColumn;
    footerNavbarRight.append(createFooterList(footerListItems.slice(startIndex, startIndex + itemsPerColumn)));
  }
  footerNavbar.append(footerNavbarRight);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
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

  const footerSocialSection = document.createElement('section');
  footerSocialSection.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  footerSocialSection.append(socialMediaTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  // Footer Social Links: 3 cells (socialLink, socialLinkLabel, socialIcon)
  // These items appear after fixed fields, sidebar menu items, and footer list items.
  const footerSocialLinks = children.slice(fixedFieldCount + sidebarMenuItems.length + footerListItems.length).filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells.some(cell => cell.querySelector('picture')); // Check for picture to identify socialIcon
  });

  footerSocialLinks.forEach((row) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');
    moveInstrumentation(row, li);

    const socialLinkCell = cells.find(cell => cell.querySelector('a'));
    const socialIconCell = cells.find(cell => cell.querySelector('picture'));
    const socialLinkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));

    const socialLink = document.createElement('a');
    socialLink.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
    socialLink.setAttribute('data-cta-region', 'Footer');
    socialLink.target = '_blank';

    if (socialLinkCell) {
      const foundSocialLink = socialLinkCell.querySelector('a');
      if (foundSocialLink && socialLinkLabelCell) {
        socialLink.href = foundSocialLink.href;
        socialLink.setAttribute('data-cta-label', `footer-${socialLinkLabelCell.textContent.trim().toLowerCase()}`);
        socialLink.setAttribute('data-platform-name', socialLinkLabelCell.textContent.trim().toLowerCase());
        socialLink.setAttribute('data-social-linktype', 'follow');
      }
    }

    if (socialIconCell) {
      const socialIcon = socialIconCell.querySelector('picture');
      if (socialIcon && socialLinkLabelCell) {
        const img = socialIcon.querySelector('img');
        if (img) {
          img.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
          img.setAttribute('loading', 'lazy');
          img.setAttribute('aria-label', socialLinkLabelCell.textContent.trim().toLowerCase());
          moveInstrumentation(socialIconCell, socialLink);
          socialLink.append(socialIcon);
        }
      }
    }
    li.append(socialLink);
    socialList.append(li);
  });
  footerSocialSection.append(socialList);
  footerSecondaryContent.append(footerSocialSection);

  const footerLeftSection = document.createElement('section');
  footerLeftSection.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const footerLeftList = document.createElement('ul');
  footerLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  const footerLeftLinkLi = document.createElement('li');
  footerLeftLinkLi.classList.add('footer-brand__left--item', 'foot_link');
  const footerLeftLink = document.createElement('a');
  footerLeftLink.classList.add('footer-brand__left--link', 'analytics_cta_click');
  footerLeftLink.setAttribute('data-cta-region', 'Footer');
  footerLeftLink.target = '_blank';
  const footerLeftLinkContent = children[8].firstElementChild.querySelector('a'); // footerLeftLink
  const footerLeftLinkLabelContent = children[9].firstElementChild; // footerLeftLinkLabel
  if (footerLeftLinkContent && footerLeftLinkLabelContent) {
    footerLeftLink.href = footerLeftLinkContent.href;
    footerLeftLink.textContent = footerLeftLinkLabelContent.textContent.trim();
    moveInstrumentation(children[8], footerLeftLink);
    moveInstrumentation(children[9], footerLeftLink);
  }
  footerLeftLinkLi.append(footerLeftLink);
  footerLeftList.append(footerLeftLinkLi);
  footerLeftSection.append(footerLeftList);

  const footerCopyrightDiv = document.createElement('div');
  footerCopyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
  const footerCopyrightSpan = document.createElement('span');
  footerCopyrightSpan.classList.add('footer-brand__left--text', 'text-white');
  const footerCopyrightCell = children[10].firstElementChild; // footerCopyright
  if (footerCopyrightCell) {
    footerCopyrightSpan.textContent = footerCopyrightCell.textContent.trim();
    moveInstrumentation(children[10], footerCopyrightSpan);
  }
  footerCopyrightDiv.append(footerCopyrightSpan);
  footerLeftSection.append(footerCopyrightDiv);
  footerSecondaryContent.append(footerLeftSection);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');
  submenuContainer.append(overlay);

  // Append all created elements to the block
  block.textContent = '';
  block.classList.add('position-relative', 'mb-15'); // Add section classes to block wrapper
  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('d-none', 'app-name');
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  block.append(appNameSpan);
  block.append(header);
  block.append(submenuContainer);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Toggle sidebar functionality
  const headerLeftImage = headerLeftDiv.querySelector('img');
  if (headerLeftImage) {
    headerLeftImage.addEventListener('click', () => {
      sidebar.classList.toggle('show'); // Assuming 'show' class controls visibility
      overlay.classList.toggle('show'); // Assuming 'show' class controls visibility
    });
  }

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('show');
    overlay.classList.remove('show');
  });
}
