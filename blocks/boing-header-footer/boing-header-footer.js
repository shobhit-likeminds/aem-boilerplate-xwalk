import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    headerLeftImageRow,
    headerLogoImageRow,
    headerLogoLinkRow,
    headerLogoLinkLabelRow,
    loginLinkRow,
    loginLinkLabelRow,
    footerPrimaryLeftLogoRow,
    footerPrimaryLeftLogoLinkRow,
    footerPrimaryLeftLogoLinkLabelRow,
    footerPrimarySecondaryLogoRow,
    footerLeftLinkRow,
    footerLeftLinkLabelRow,
    footerCopyrightRow,
    ...itemRows
  ] = [...block.children];

  // Header
  const header = document.createElement('header');
  header.classList.add('boing-container', 'header', 'd-flex', 'justify-content-between', 'align-items-center', 'h-15', 'px-5', 'py-2', 'fixed-top', 'w-100', 'bg-white');

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.classList.add('d-flex', 'w-25');
  const headerLeftImage = headerLeftImageRow.querySelector('picture');
  if (headerLeftImage) {
    moveInstrumentation(headerLeftImageRow.firstElementChild, headerLeftImage);
    headerLeftDiv.append(headerLeftImage);
  }
  header.append(headerLeftDiv);

  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.classList.add('d-flex', 'justify-content-center', 'w-25');
  const headerLogoLink = document.createElement('a');
  const headerLogoLinkFound = headerLogoLinkRow.querySelector('a');
  if (headerLogoLinkFound) {
    headerLogoLink.href = headerLogoLinkFound.href;
    headerLogoLink.classList.add('analytics_cta_click');
    headerLogoLink.setAttribute('data-ct', '');
    headerLogoLink.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(headerLogoLinkRow.firstElementChild, headerLogoLink);
  }
  const headerLogo = document.createElement('div');
  headerLogo.classList.add('header__logo', 'd-flex', 'align-items-center');
  const headerLogoImage = headerLogoImageRow.querySelector('picture');
  if (headerLogoImage) {
    const img = headerLogoImage.querySelector('img');
    if (img) {
      img.classList.add('header__logo-img');
      img.setAttribute('fetchpriority', 'high');
      img.setAttribute('loading', 'eager');
    }
    moveInstrumentation(headerLogoImageRow.firstElementChild, headerLogoImage);
    headerLogo.append(headerLogoImage);
  }
  const headerLogoLinkLabel = headerLogoLinkLabelRow.querySelector('div')?.textContent.trim();
  if (headerLogoLinkLabel) {
    headerLogoLink.setAttribute('aria-label', headerLogoLinkLabel);
  }
  headerLogoLink.append(headerLogo);
  headerLogoDiv.append(headerLogoLink);
  header.append(headerLogoDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.classList.add('d-flex', 'w-25', 'justify-content-end');
  const loginLinkWrapper = document.createElement('a');
  const loginLinkFound = loginLinkRow.querySelector('a');
  if (loginLinkFound) {
    loginLinkWrapper.href = loginLinkFound.href;
    loginLinkWrapper.classList.add('header__login-btn-wrapper', 'analytics_cta_click');
    loginLinkWrapper.style.display = 'inline';
    moveInstrumentation(loginLinkRow.firstElementChild, loginLinkWrapper);
  }
  const loginButton = document.createElement('button');
  loginButton.classList.add('header__login-btn', 'btn', 'text-boing-primary', 'bg-transparent', 'fw-semibold', 'rounded-4', 'btn-sm', 'py-3', 'px-4');
  const loginLinkLabel = loginLinkLabelRow.querySelector('div')?.textContent.trim();
  if (loginLinkLabel) {
    loginButton.textContent = loginLinkLabel;
  }
  loginLinkWrapper.append(loginButton);
  headerRightDiv.append(loginLinkWrapper);
  header.append(headerRightDiv);

  // Sidebar
  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');

  const sidebar = document.createElement('aside');
  sidebar.classList.add('sidebar', 'start-0', 'bg-white', 'position-absolute');

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.classList.add('sidebar__menu', 'list-unstyled', 'px-4');

  // Filter for sidebar menu items (3 cells: icon, link, label)
  const sidebarMenuItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[0].querySelector('picture') && cells[1].querySelector('a') && cells[2].querySelector('div');
  });

  sidebarMenuItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('sidebar__menu-item', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');

    const linkEl = document.createElement('a');
    linkEl.classList.add('sidebar__menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'analytics_cta_click');

    const cells = [...row.children];
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => cell.querySelector('div') && !cell.querySelector('a'));

    if (iconCell) {
      const iconPicture = iconCell.querySelector('picture');
      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        if (img) {
          img.classList.add('sidebar__menu-icon', 'me-4');
          img.setAttribute('loading', 'lazy');
        }
        moveInstrumentation(iconCell.firstElementChild, iconPicture);
        linkEl.append(iconPicture);
      }
    }

    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        linkEl.setAttribute('data-consent', 'false');
        linkEl.setAttribute('data-link', foundLink.href);
        moveInstrumentation(linkCell.firstElementChild, linkEl);
      }
    }
    if (labelCell) {
      const labelText = labelCell.querySelector('div')?.textContent.trim();
      if (labelText) {
        linkEl.append(labelText);
      }
    }

    li.append(linkEl);
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

  const footerPrimaryLeftLogoLink = document.createElement('a');
  const footerPrimaryLeftLogoLinkFound = footerPrimaryLeftLogoLinkRow.querySelector('a');
  if (footerPrimaryLeftLogoLinkFound) {
    footerPrimaryLeftLogoLink.href = footerPrimaryLeftLogoLinkFound.href;
    footerPrimaryLeftLogoLink.setAttribute('target', '_blank');
    footerPrimaryLeftLogoLink.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
    footerPrimaryLeftLogoLink.setAttribute('data-cta-region', 'Footer');
    moveInstrumentation(footerPrimaryLeftLogoLinkRow.firstElementChild, footerPrimaryLeftLogoLink);
  }
  const footerPrimaryLeftLogo = footerPrimaryLeftLogoRow.querySelector('picture');
  if (footerPrimaryLeftLogo) {
    const img = footerPrimaryLeftLogo.querySelector('img');
    if (img) {
      img.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      img.setAttribute('loading', 'lazy');
    }
    moveInstrumentation(footerPrimaryLeftLogoRow.firstElementChild, footerPrimaryLeftLogo);
    footerPrimaryLeftLogoLink.append(footerPrimaryLeftLogo);
  }
  const footerPrimaryLeftLogoLinkLabel = footerPrimaryLeftLogoLinkLabelRow.querySelector('div')?.textContent.trim();
  if (footerPrimaryLeftLogoLinkLabel) {
    footerPrimaryLeftLogoLink.setAttribute('aria-label', footerPrimaryLeftLogoLinkLabel);
  }
  footerBrandLeft.append(footerPrimaryLeftLogoLink);

  const footerSecondaryLogoDiv = document.createElement('div');
  footerSecondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const footerPrimarySecondaryLogo = footerPrimarySecondaryLogoRow.querySelector('picture');
  if (footerPrimarySecondaryLogo) {
    const img = footerPrimarySecondaryLogo.querySelector('img');
    if (img) {
      img.classList.add('object-fit-contain', 'w-100', 'no-rendition');
      img.setAttribute('loading', 'lazy');
    }
    moveInstrumentation(footerPrimarySecondaryLogoRow.firstElementChild, footerPrimarySecondaryLogo);
    footerSecondaryLogoDiv.append(footerPrimarySecondaryLogo);
  }
  footerBrandLeft.append(footerSecondaryLogoDiv);
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  // Filter for footer list items (2 cells: link, label)
  const footerListItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells[0].querySelector('a') && cells[1].querySelector('div');
  });

  const numLists = Math.ceil(footerListItems.length / 3); // Assuming 3 items per list as in original HTML
  for (let i = 0; i < numLists; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    footerListItems.slice(i * 3, (i + 1) * 3).forEach((row) => {
      const li = document.createElement('li');
      li.classList.add('footer-list__item');
      const linkEl = document.createElement('a');
      linkEl.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      linkEl.setAttribute('data-link-region', 'Footer List');

      const cells = [...row.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const labelCell = cells.find(cell => cell.querySelector('div') && !cell.querySelector('a'));

      if (linkCell) {
        const foundLink = linkCell.querySelector('a');
        if (foundLink) {
          linkEl.href = foundLink.href;
          moveInstrumentation(linkCell.firstElementChild, linkEl);
        }
      }
      if (labelCell) {
        const labelText = labelCell.querySelector('div')?.textContent.trim();
        if (labelText) {
          linkEl.textContent = labelText;
        }
      }
      li.append(linkEl);
      ul.append(li);
    });
    footerListDiv.append(ul);
    footerNavbarLeft.append(footerListDiv);
  }
  footerNavbar.append(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);
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

  const footerRightSection = document.createElement('section');
  footerRightSection.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  footerRightSection.append(socialMediaTitle);

  const socialLinksList = document.createElement('ul');
  socialLinksList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  // Filter for social links (3 cells: link, label, icon)
  const socialLinks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells.some(cell => cell.querySelector('a')) && cells.some(cell => cell.querySelector('picture'));
  });

  socialLinks.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');
    const linkEl = document.createElement('a');
    linkEl.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
    linkEl.setAttribute('data-cta-region', 'Footer');
    linkEl.setAttribute('target', '_blank');

    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => cell.querySelector('div') && !cell.querySelector('a'));
    const iconCell = cells.find(cell => cell.querySelector('picture'));

    if (linkCell) {
      const foundLink = linkCell.querySelector('a');
      if (foundLink) {
        linkEl.href = foundLink.href;
        moveInstrumentation(linkCell.firstElementChild, linkEl);
      }
    }
    let labelText = '';
    if (labelCell) {
      labelText = labelCell.querySelector('div')?.textContent.trim();
      if (labelText) {
        linkEl.setAttribute('data-cta-label', `footer-${labelText.toLowerCase()}`);
        linkEl.setAttribute('data-platform-name', labelText.toLowerCase());
        linkEl.setAttribute('data-social-linktype', 'follow');
      }
    }
    if (iconCell) {
      const iconPicture = iconCell.querySelector('picture');
      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        if (img) {
          img.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
          img.setAttribute('loading', 'lazy');
          img.setAttribute('aria-label', labelText || '');
          img.alt = linkEl.href; // Original HTML uses href as alt
        }
        moveInstrumentation(iconCell.firstElementChild, iconPicture);
        linkEl.append(iconPicture);
      }
    }
    li.append(linkEl);
    socialLinksList.append(li);
  });
  footerRightSection.append(socialLinksList);
  footerSecondaryContent.append(footerRightSection);

  const footerLeftSection = document.createElement('section');
  footerLeftSection.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  const footerLeftList = document.createElement('ul');
  footerLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  const footerLeftLinkLi = document.createElement('li');
  footerLeftLinkLi.classList.add('footer-brand__left--item', 'foot_link');
  const footerLeftLinkEl = document.createElement('a');
  footerLeftLinkEl.classList.add('footer-brand__left--link', 'analytics_cta_click');
  footerLeftLinkEl.setAttribute('data-cta-region', 'Footer');

  const footerLeftLinkFound = footerLeftLinkRow.querySelector('a');
  if (footerLeftLinkFound) {
    footerLeftLinkEl.href = footerLeftLinkFound.href;
    footerLeftLinkEl.setAttribute('target', '_blank');
    moveInstrumentation(footerLeftLinkRow.firstElementChild, footerLeftLinkEl);
  }
  const footerLeftLinkLabel = footerLeftLinkLabelRow.querySelector('div')?.textContent.trim();
  if (footerLeftLinkLabel) {
    footerLeftLinkEl.textContent = footerLeftLinkLabel;
  }
  footerLeftLinkLi.append(footerLeftLinkEl);
  footerLeftList.append(footerLeftLinkLi);
  footerLeftSection.append(footerLeftList);

  const footerCopyrightDiv = document.createElement('div');
  footerCopyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
  const footerCopyrightSpan = document.createElement('span');
  footerCopyrightSpan.classList.add('footer-brand__left--text', 'text-white');
  const footerCopyrightText = footerCopyrightRow.querySelector('div')?.textContent.trim();
  if (footerCopyrightText) {
    footerCopyrightSpan.textContent = footerCopyrightText;
  }
  footerCopyrightDiv.append(footerCopyrightSpan);
  footerLeftSection.append(footerCopyrightDiv);
  footerSecondaryContent.append(footerLeftSection);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerBrandSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerBrandSecondary);
  sidebar.append(footerBrand);

  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');

  submenuContainer.append(sidebar, overlay);

  // Append all to block
  block.textContent = '';
  block.classList.add('position-relative', 'mb-15');
  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('d-none', 'app-name');
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  block.append(appNameSpan, header, submenuContainer);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Add event listeners for sidebar toggle
  const toggleSidebar = () => {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
  };

  // Assuming there will be a button to toggle the sidebar,
  // which is not explicitly in the block structure but present in the original HTML pattern.
  // For now, let's add a placeholder for demonstration.
  // In a real scenario, this would be triggered by a specific button in the header.
  const menuToggleBtn = document.createElement('button');
  menuToggleBtn.classList.add('navbar-toggler', 'd-md-none'); // Example classes
  menuToggleBtn.innerHTML = '<span class="navbar-toggler-icon"></span>';
  menuToggleBtn.addEventListener('click', toggleSidebar);
  header.prepend(menuToggleBtn); // Placed in header as it's a header control

  overlay.addEventListener('click', toggleSidebar);
}
