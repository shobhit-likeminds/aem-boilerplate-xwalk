import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoImageRow, logoLinkRow, ...itemRows] = [...block.children];

  const headerComp = document.createElement('section');
  headerComp.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');
  moveInstrumentation(block, headerComp);

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  headerComp.append(container);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  container.append(nav);

  const navWrapper = document.createElement('div');
  navWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(navWrapper);

  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerButton.type = 'button';
  hamburgerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerButton.setAttribute('aria-expanded', 'false');
  hamburgerButton.setAttribute('aria-label', 'Toggle navigation');

  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');

  ['d-block', 'd-block', 'd-block'].forEach((cls) => {
    const span = document.createElement('span');
    span.classList.add(cls, 'bg-white');
    togglerIcon.append(span);
  });
  hamburgerButton.append(togglerIcon);
  navWrapper.append(hamburgerButton);

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  navWrapper.append(logoWrapper);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '150' }]);
    optimizedLogoPic.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
    moveInstrumentation(logoImageRow, optimizedLogoPic.querySelector('img'));
    logoLink.append(optimizedLogoPic);
  }
  logoWrapper.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  navWrapper.append(navbarCollapse);

  const navList = document.createElement('ul');
  navList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(navList);

  const searchAccess = document.createElement('div');
  searchAccess.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  container.append(searchAccess);

  const searchWrapper = document.createElement('div');
  searchWrapper.classList.add('header-comp__wrapper--search');
  searchAccess.append(searchWrapper);

  const searchIconWrapper = document.createElement('div');
  searchIconWrapper.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  searchWrapper.append(searchIconWrapper);

  const outerBox = document.createElement('div');
  outerBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerComp.append(outerBox);

  hamburgerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
  });

  itemRows.forEach((row) => {
    const cells = [...row.children];
    const numCells = cells.length;

    if (numCells === 7) { // navigation-item
      const [iconImageCell, labelCell, linkCell, arrowIconDesktopCell, arrowIconMobileCell, submenuItemsCell, hierarchyTreeCell] = cells;

      const li = document.createElement('li');
      li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'dropdown', 'border-lg-0', 'show-nav', 'position-relative', 'left-division');
      moveInstrumentation(row, li);

      const menuLinkWrapper = document.createElement('div');
      menuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
      li.append(menuLinkWrapper);

      const iconImage = iconImageCell.querySelector('picture');
      if (iconImage) {
        const img = iconImage.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        optimizedPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        menuLinkWrapper.append(optimizedPic);
      }

      const linkTextWrapper = document.createElement('a');
      linkTextWrapper.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
      linkTextWrapper.href = linkCell.querySelector('a')?.href || '#';
      const linkSpan = document.createElement('span');
      linkSpan.classList.add('link-span');
      linkSpan.textContent = labelCell.textContent.trim();
      linkTextWrapper.append(linkSpan);
      menuLinkWrapper.append(linkTextWrapper);

      const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
      if (hierarchyRoot) {
        menuLinkWrapper.classList.add('dropdown-toggle');
        menuLinkWrapper.setAttribute('aria-expanded', 'false');

        const toggleDropDown = document.createElement('span');
        toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
        const arrowIconDesktop = arrowIconDesktopCell.querySelector('picture');
        if (arrowIconDesktop) {
          const img = arrowIconDesktop.querySelector('img');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '20' }]);
          optimizedPic.querySelector('img').alt = 'svg file';
          toggleDropDown.append(optimizedPic);
        }
        menuLinkWrapper.append(toggleDropDown);

        const subMenusDiv = document.createElement('div');
        subMenusDiv.classList.add('header-comp__sub-menus');
        li.append(subMenusDiv);

        const subMenuUl = document.createElement('ul');
        subMenuUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
        subMenusDiv.append(subMenuUl);

        const subMenuTriParent = document.createElement('div');
        subMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');
        subMenuUl.append(subMenuTriParent);

        // Process hierarchy-tree richtext content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyTreeCell.innerHTML;
        moveInstrumentation(hierarchyTreeCell, tempDiv); // Move instrumentation from original cell to tempDiv

        tempDiv.querySelectorAll('li').forEach((rootLi, index) => {
          const subMenuItem = document.createElement('li');
          subMenuItem.classList.add('header-comp__wrapper--sub-menu-item', 'child-below');
          subMenuItem.setAttribute('data-child-id', `subNavItem${index}`);
          subMenuTriParent.append(subMenuItem);

          const subMenuLinkWrapper = document.createElement('div');
          subMenuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');
          subMenuItem.append(subMenuLinkWrapper);

          const subMenuLinkDiv = document.createElement('div');
          subMenuLinkDiv.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');
          subMenuLinkWrapper.append(subMenuLinkDiv);

          const subAnchor = rootLi.querySelector(':scope > a');
          const subLinkSpan = document.createElement('span');
          subLinkSpan.classList.add('sub-link-span');
          subLinkSpan.textContent = subAnchor ? subAnchor.textContent.trim() : rootLi.firstChild.textContent.trim();

          const subLink = document.createElement('a');
          subLink.classList.add('text-decoration-none', 'text-dark-gray-100');
          if (subAnchor) {
            subLink.href = subAnchor.href;
          } else {
            subLink.href = '#';
          }
          subLink.append(subLinkSpan);
          subMenuLinkDiv.append(subLink);

          const nestedUl = rootLi.querySelector(':scope > ul');
          if (nestedUl) {
            subMenuLinkWrapper.classList.add('dropdown-toggle');
            subMenuLinkWrapper.setAttribute('aria-expanded', 'false');

            const arrowIconRight = document.createElement('span');
            arrowIconRight.classList.add('arrow-icon-right', 'end-0', 'd-none', 'd-lg-inline');
            const desktopArrow = arrowIconDesktopCell.querySelector('picture');
            if (desktopArrow) {
              const img = desktopArrow.querySelector('img');
              const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '20' }]);
              optimizedPic.querySelector('img').alt = 'svg file';
              arrowIconRight.append(optimizedPic);
            }
            subMenuLinkDiv.append(arrowIconRight);

            const arrowIconMobile = document.createElement('span');
            arrowIconMobile.classList.add('arrow-icon', 'd-lg-none', 'end-0', 'd-lg-none');
            const mobileArrow = arrowIconMobileCell.querySelector('picture');
            if (mobileArrow) {
              const img = mobileArrow.querySelector('img');
              const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '20' }]);
              optimizedPic.querySelector('img').alt = 'svg file';
              arrowIconMobile.append(optimizedPic);
            }
            subMenuLinkWrapper.append(arrowIconMobile);

            const innerChilds = document.createElement('div');
            innerChilds.classList.add('d-lg-none', 'inner-childs');
            innerChilds.id = `subNavItem${index}`;
            innerChilds.setAttribute('data-id', `subNavItem${index}`);
            subMenuItem.append(innerChilds);

            const innerSubMenuUl = document.createElement('ul');
            innerSubMenuUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
            innerChilds.append(innerSubMenuUl);

            const innerSubMenuTriParent = document.createElement('div');
            innerSubMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');
            innerSubMenuUl.append(innerSubMenuTriParent);

            [...nestedUl.children].forEach((nestedLi, nestedIndex) => {
              const innerSubMenuItem = document.createElement('li');
              innerSubMenuItem.classList.add('header-comp__wrapper--sub-menu-item', 'no-child');
              innerSubMenuItem.setAttribute('data-child-id', `subNavItem${nestedIndex}`);
              innerSubMenuTriParent.append(innerSubMenuItem);

              const innerSubMenuLinkWrapper = document.createElement('div');
              innerSubMenuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');
              innerSubMenuItem.append(innerSubMenuLinkWrapper);

              const innerSubMenuLinkDiv = document.createElement('div');
              innerSubMenuLinkDiv.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');
              innerSubMenuLinkWrapper.append(innerSubMenuLinkDiv);

              const innerSubAnchor = nestedLi.querySelector(':scope > a');
              const innerSubLinkSpan = document.createElement('span');
              innerSubLinkSpan.classList.add('sub-link-span');
              innerSubLinkSpan.textContent = innerSubAnchor ? innerSubAnchor.textContent.trim() : nestedLi.firstChild.textContent.trim();

              const innerSubLink = document.createElement('a');
              innerSubLink.classList.add('text-decoration-none', 'text-dark-gray-100');
              if (innerSubAnchor) {
                innerSubLink.href = innerSubAnchor.href;
              } else {
                innerSubLink.href = '#';
              }
              innerSubLink.append(innerSubLinkSpan);
              innerSubMenuLinkDiv.append(innerSubLink);
            });

            subMenuLinkWrapper.addEventListener('click', () => {
              innerChilds.classList.toggle('show');
              subMenuLinkWrapper.classList.toggle('collapsed');
            });
          }
        });

        const borderSection = document.createElement('div');
        borderSection.classList.add('borderr-section', 'd-none', 'd-lg-flex', 'd-xl-flex', 'align-items-end', 'position-absolute', 'no-prod');
        borderSection.id = 'borderSec';
        const borderBg = document.createElement('div');
        borderBg.classList.add('border-bg');
        borderSection.append(borderBg);
        subMenuUl.append(borderSection);

        menuLinkWrapper.addEventListener('click', () => {
          subMenusDiv.classList.toggle('show');
          menuLinkWrapper.classList.toggle('collapsed');
        });
      }
      navList.append(li);
    } else if (numCells === 2) { // search-item
      const [searchIconCell, searchLabelCell] = cells;

      const searchIcon = searchIconCell.querySelector('picture');
      if (searchIcon) {
        const img = searchIcon.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '20' }]);
        optimizedPic.querySelector('img').alt = 'svg file';
        searchIconWrapper.append(optimizedPic);
      }
      const searchLabel = document.createElement('span');
      searchLabel.classList.add('d-none', 'd-lg-block');
      searchLabel.textContent = searchLabelCell.textContent.trim();
      searchIconWrapper.append(searchLabel);
      moveInstrumentation(row, searchIconWrapper);
    }
  });

  block.replaceChildren(headerComp);

  headerComp.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
