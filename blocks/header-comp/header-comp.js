import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoImageRow, logoLinkRow, searchIconRow, searchLabelRow, ...itemRows] = [...block.children];

  const headerComp = document.createElement('section');
  headerComp.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');
  moveInstrumentation(block, headerComp);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  headerComp.append(containerDiv);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  containerDiv.append(nav);

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(headerWrapper);

  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerButton.type = 'button';
  hamburgerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerButton.setAttribute('aria-expanded', 'false');
  hamburgerButton.setAttribute('aria-label', 'Toggle navigation');
  headerWrapper.append(hamburgerButton);

  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  hamburgerButton.append(togglerIcon);

  for (let i = 0; i < 3; i += 1) {
    const span = document.createElement('span');
    span.classList.add('d-block', 'bg-white');
    togglerIcon.append(span);
  }

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  headerWrapper.append(logoWrapper);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);
  logoWrapper.append(logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '750' }]);
    optimizedPic.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
    moveInstrumentation(logoImageRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  headerWrapper.append(navbarCollapse);

  const menuGroups = document.createElement('ul');
  menuGroups.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(menuGroups);

  hamburgerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
  });

  // Filter item rows based on the number of children to distinguish item types
  const headerMenuItems = itemRows.filter((row) => row.children.length === 6);
  // The other item types (header-sub-menu-item, header-sub-sub-menu-item) are handled within the hierarchy-tree processing.

  headerMenuItems.forEach((row) => {
    const [iconCell, labelCell, linkCell, arrowIconCell, subMenuItemsCell, hierarchyCell] = [...row.children];

    const menuItem = document.createElement('li');
    menuItem.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'dropdown', 'border-lg-0', 'show-nav', 'position-relative', 'left-division');
    moveInstrumentation(row, menuItem); // Move instrumentation for the main menu item row

    const menuLinkWrapper = document.createElement('div');
    menuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
    menuItem.append(menuLinkWrapper);

    const mobileIconPicture = iconCell.querySelector('picture');
    if (mobileIconPicture) {
      const mobileIconImg = mobileIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(mobileIconImg.src, mobileIconImg.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      menuLinkWrapper.append(optimizedPic);
    }

    const linkAnchor = document.createElement('a');
    linkAnchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    linkAnchor.setAttribute('data-link-region', 'Header');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkAnchor.href = foundLink.href;
    }
    const linkSpan = document.createElement('span');
    linkSpan.classList.add('link-span');
    linkSpan.textContent = labelCell.textContent.trim();
    linkAnchor.append(linkSpan);
    menuLinkWrapper.append(linkAnchor);

    const hierarchyRootTempDiv = document.createElement('div');
    hierarchyRootTempDiv.innerHTML = hierarchyCell.innerHTML;
    const hierarchyRoot = hierarchyRootTempDiv.querySelector('ul');

    if (hierarchyRoot) {
      menuLinkWrapper.classList.add('dropdown-toggle');
      menuLinkWrapper.setAttribute('aria-current', 'page');
      menuLinkWrapper.setAttribute('aria-expanded', 'false');

      const toggleDropDown = document.createElement('span');
      toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const arrowIconPicture = arrowIconCell.querySelector('picture');
      if (arrowIconPicture) {
        const arrowIconImg = arrowIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(arrowIconImg.src, arrowIconImg.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').alt = 'svg file';
        toggleDropDown.append(optimizedPic);
      }
      menuLinkWrapper.append(toggleDropDown);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      subMenusDiv.id = `leftHeaderItem${menuGroups.children.length}`;
      menuItem.append(subMenusDiv);

      const xfpageDiv = document.createElement('div');
      xfpageDiv.classList.add('xfpage', 'page', 'basicpage');
      subMenusDiv.append(xfpageDiv);

      const aemGridDiv = document.createElement('div');
      aemGridDiv.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');
      xfpageDiv.append(aemGridDiv);

      const headerSubMenuDiv = document.createElement('div');
      headerSubMenuDiv.classList.add('headerSubMenu', 'aem-GridColumn', 'aem-GridColumn--default--12');
      aemGridDiv.append(headerSubMenuDiv);

      const subMenuGroup = document.createElement('ul');
      subMenuGroup.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
      headerSubMenuDiv.append(subMenuGroup);

      const subMenuTriParent = document.createElement('div');
      subMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');
      subMenuGroup.append(subMenuTriParent);

      const processSubMenuItems = (parentUl, parentElement, level = 0) => {
        [...parentUl.children].forEach((subLi) => {
          const subMenuItem = document.createElement('li');
          subMenuItem.classList.add('header-comp__wrapper--sub-menu-item');
          if (level === 0) {
            subMenuItem.classList.add('child-below');
          } else {
            subMenuItem.classList.add('no-child');
          }
          // moveInstrumentation for nested list items
          moveInstrumentation(subLi, subMenuItem);

          const subMenuLinkWrapper = document.createElement('div');
          subMenuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');
          subMenuItem.append(subMenuLinkWrapper);

          const subMenuLinkDiv = document.createElement('div');
          subMenuLinkDiv.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');
          subMenuLinkWrapper.append(subMenuLinkDiv);

          const subLinkAnchor = document.createElement('a');
          subLinkAnchor.classList.add('text-decoration-none', 'text-dark-gray-100');
          const originalLink = subLi.querySelector('a');
          if (originalLink) {
            subLinkAnchor.href = originalLink.href;
            const subLinkSpan = document.createElement('span');
            subLinkSpan.classList.add('sub-link-span');
            subLinkSpan.textContent = originalLink.textContent.trim();
            subLinkAnchor.append(subLinkSpan);
            if (originalLink.target === '_blank') {
              const screenReaderOnlySpan = document.createElement('span');
              screenReaderOnlySpan.classList.add('cmp-link__screen-reader-only');
              screenReaderOnlySpan.textContent = 'opens in a new tab';
              subLinkAnchor.append(screenReaderOnlySpan);
            }
          } else {
            const subLinkSpan = document.createElement('span');
            subLinkSpan.classList.add('sub-link-span');
            subLinkSpan.textContent = subLi.textContent.trim();
            subLinkAnchor.append(subLinkSpan);
          }
          subMenuLinkDiv.append(subLinkAnchor);

          const nestedUl = subLi.querySelector('ul');
          if (nestedUl) {
            subMenuLinkWrapper.classList.add('dropdown-toggle');
            subMenuLinkWrapper.setAttribute('aria-expanded', 'false');

            const arrowIconRight = document.createElement('span');
            arrowIconRight.classList.add('arrow-icon-right', 'end-0', 'd-none', 'd-lg-inline');
            const arrowImg = document.createElement('img');
            arrowImg.alt = 'svg file';
            // Use the arrowIconCell from the main menu item for nested arrows
            arrowImg.src = arrowIconCell.querySelector('img')?.src;
            arrowIconRight.append(arrowImg);
            subMenuLinkDiv.append(arrowIconRight);

            const arrowIconMobile = document.createElement('span');
            arrowIconMobile.classList.add('arrow-icon', 'd-lg-none', 'end-0', 'd-lg-none');
            const mobileArrowImg = document.createElement('img');
            mobileArrowImg.alt = 'svg file';
            // Use the arrowIconCell from the main menu item for nested arrows
            mobileArrowImg.src = arrowIconCell.querySelector('img')?.src;
            arrowIconMobile.append(mobileArrowImg);
            subMenuLinkWrapper.append(arrowIconMobile);

            const innerChildsDiv = document.createElement('div');
            innerChildsDiv.classList.add('d-lg-none', 'inner-childs');
            subMenuItem.append(innerChildsDiv);

            const innerXfpageDiv = document.createElement('div');
            innerXfpageDiv.classList.add('xfpage', 'page', 'basicpage');
            innerChildsDiv.append(innerXfpageDiv);

            const innerAemGridDiv = document.createElement('div');
            innerAemGridDiv.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');
            innerXfpageDiv.append(innerAemGridDiv);

            const innerHeaderSubMenuDiv = document.createElement('div');
            innerHeaderSubMenuDiv.classList.add('headerSubMenu', 'aem-GridColumn', 'aem-GridColumn--default--12');
            innerAemGridDiv.append(innerHeaderSubMenuDiv);

            const innerSubMenuGroup = document.createElement('ul');
            innerSubMenuGroup.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
            innerHeaderSubMenuDiv.append(innerSubMenuGroup);

            const innerSubMenuTriParent = document.createElement('div');
            innerSubMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');
            innerSubMenuGroup.append(innerSubMenuTriParent);

            processSubMenuItems(nestedUl, innerSubMenuTriParent, level + 1);

            subMenuLinkWrapper.addEventListener('click', () => {
              innerChildsDiv.classList.toggle('show');
              subMenuLinkWrapper.classList.toggle('collapsed');
            });
          }
          parentElement.append(subMenuItem);
        });
      };

      processSubMenuItems(hierarchyRoot, subMenuTriParent);

      const borderSection = document.createElement('div');
      borderSection.classList.add('borderr-section', 'd-none', 'd-lg-flex', 'd-xl-flex', 'align-items-end', 'position-absolute', 'no-prod');
      const borderBg = document.createElement('div');
      borderBg.classList.add('border-bg');
      borderSection.append(borderBg);
      subMenuGroup.append(borderSection);

      menuLinkWrapper.addEventListener('click', () => {
        subMenusDiv.classList.toggle('show');
        menuLinkWrapper.classList.toggle('collapsed');
      });
    } else {
      menuLinkWrapper.setAttribute('aria-current', 'page');
    }

    menuGroups.append(menuItem);
  });

  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  containerDiv.append(searchAccessDiv);

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');
  searchAccessDiv.append(searchDiv);

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  searchDiv.append(searchIconDiv);

  const searchPicture = searchIconRow.querySelector('picture');
  if (searchPicture) {
    const searchImg = searchPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(searchImg.src, searchImg.alt, false, [{ width: '750' }]);
    optimizedPic.querySelector('img').alt = 'svg file';
    moveInstrumentation(searchIconRow, optimizedPic.querySelector('img'));
    searchIconDiv.append(optimizedPic);
  }

  const searchLabelSpan = document.createElement('span');
  searchLabelSpan.classList.add('d-none', 'd-lg-block');
  searchLabelSpan.textContent = searchLabelRow.textContent.trim();
  moveInstrumentation(searchLabelRow, searchLabelSpan);
  searchIconDiv.append(searchLabelSpan);

  const outerBoxDiv = document.createElement('div');
  outerBoxDiv.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerComp.append(outerBoxDiv);

  block.replaceChildren(headerComp);

  // Image optimization
  headerComp.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
