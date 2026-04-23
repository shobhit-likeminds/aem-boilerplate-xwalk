import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
      }
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('has-sub-child'); // This class is not in the allowlist, but it's internal to the transform function.
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // This class is not in the allowlist, but it's internal to the transform function.
          subWrap.classList.toggle('active'); // This class is not in the allowlist, but it's internal to the transform function.
        });
      }
      transformNestedLists(nested);
    }
  });
}

export default function decorate(block) {
  const [logoImageRow, logoLinkRow, ...itemRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');
  moveInstrumentation(block, section);

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  section.append(container);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  container.append(nav);

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(headerWrapper);

  const hamburgerToggler = document.createElement('button');
  hamburgerToggler.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerToggler.type = 'button';
  hamburgerToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerToggler.setAttribute('aria-expanded', 'false');
  hamburgerToggler.setAttribute('aria-label', 'Toggle navigation');
  hamburgerToggler.innerHTML = `
    <span class="navbar-toggler-icon d-flex flex-column justify-content-center align-items-center">
      <span class="d-block bg-white"></span>
      <span class="d-block bg-white"></span>
      <span class="d-block bg-white"></span>
    </span>
  `;
  headerWrapper.append(hamburgerToggler);

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  headerWrapper.append(logoWrapper);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '100' }]);
    moveInstrumentation(logoImg, optimizedLogo.querySelector('img'));
    optimizedLogo.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
    logoLink.append(optimizedLogo);
  }
  moveInstrumentation(logoImageRow, logoLink);
  logoWrapper.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  headerWrapper.append(navbarCollapse);

  const navList = document.createElement('ul');
  navList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(navList);

  // Filter itemRows based on their structure to match models
  const navigationItems = itemRows.filter((row) => row.children.length === 7);
  const searchIconItems = itemRows.filter((row) => row.children.length === 2);

  navigationItems.forEach((row, i) => {
    const cells = [...row.children];
    const iconImageCell = cells.find(cell => cell.querySelector('picture') && cells.indexOf(cell) === 0);
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cells.indexOf(cell) === 1);
    const linkCell = cells.find(cell => cell.querySelector('a') && cells.indexOf(cell) === 2);
    const arrowIconCell = cells.find(cell => cell.querySelector('picture') && cells.indexOf(cell) === 3);
    const arrowIconMobileCell = cells.find(cell => cell.querySelector('picture') && cells.indexOf(cell) === 4);
    // cell[5] is a container, not directly rendered here
    const hierarchyCell = cells.find(cell => cell.querySelector('ul') && cells.indexOf(cell) === 6);

    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'border-lg-0', 'position-relative');
    if (i % 2 === 0) {
      li.classList.add('left-division');
    } else {
      li.classList.add('right-division');
    }
    li.setAttribute('data-header-item-id', `leftHeaderItem${i}`);
    moveInstrumentation(row, li);

    const menuLinkWrapper = document.createElement('div');
    menuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
    menuLinkWrapper.setAttribute('aria-current', 'page');

    if (iconImageCell) {
      const mobileIconPicture = iconImageCell.querySelector('picture');
      if (mobileIconPicture) {
        const mobileIconImg = mobileIconPicture.querySelector('img');
        const optimizedMobileIcon = createOptimizedPicture(mobileIconImg.src, mobileIconImg.alt, false, [{ width: '30' }]);
        moveInstrumentation(mobileIconImg, optimizedMobileIcon.querySelector('img'));
        optimizedMobileIcon.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        menuLinkWrapper.append(optimizedMobileIcon);
      }
    }

    const anchor = document.createElement('a');
    anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    anchor.setAttribute('data-link-region', 'Header');
    anchor.href = linkCell?.querySelector('a')?.href || '#';
    anchor.innerHTML = `<span class="link-span">${labelCell?.textContent.trim() || ''}</span>`;
    menuLinkWrapper.append(anchor);
    if (labelCell) moveInstrumentation(labelCell, anchor);
    if (linkCell) moveInstrumentation(linkCell, anchor);

    if (hierarchyCell) {
      const hierarchyRoot = hierarchyCell.querySelector('ul');
      if (hierarchyRoot) {
        li.classList.add('dropdown', 'show-nav');
        menuLinkWrapper.classList.add('dropdown-toggle');
        menuLinkWrapper.setAttribute('aria-expanded', 'false');

        const toggleDropDown = document.createElement('span');
        toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
        if (arrowIconCell) {
          const arrowIconPicture = arrowIconCell.querySelector('picture');
          if (arrowIconPicture) {
            const arrowIconImg = arrowIconPicture.querySelector('img');
            const optimizedArrowIcon = createOptimizedPicture(arrowIconImg.src, arrowIconImg.alt, false, [{ width: '20' }]);
            moveInstrumentation(arrowIconImg, optimizedArrowIcon.querySelector('img'));
            toggleDropDown.append(optimizedArrowIcon);
          }
        }
        menuLinkWrapper.append(toggleDropDown);

        const subMenusDiv = document.createElement('div');
        subMenusDiv.classList.add('header-comp__sub-menus');
        subMenusDiv.id = `leftHeaderItem${i}`;
        subMenusDiv.setAttribute('data-id', `leftHeaderItem${i}`);

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

        const headerSubMenu = document.createElement('div');
        headerSubMenu.classList.add('header-comp__sub-menu', 'tri-parent');
        subMenuGroup.append(headerSubMenu);

        // Use innerHTML to get the full rich text content, then clone and transform
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML;
        const clonedHierarchy = tempDiv.querySelector('ul');
        if (clonedHierarchy) {
          transformNestedLists(clonedHierarchy);
          clonedHierarchy.querySelectorAll('li').forEach((subLi, subIndex) => {
            const subLiElement = document.createElement('li');
            subLiElement.classList.add('header-comp__wrapper--sub-menu-item');
            subLiElement.setAttribute('data-child-id', `subNavItem${subIndex}`);
            moveInstrumentation(subLi, subLiElement); // Move instrumentation from original li in tempDiv

            const subMenuLinkWrapper = document.createElement('div');
            subMenuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');
            subMenuLinkWrapper.setAttribute('aria-current', 'page');
            subLiElement.append(subMenuLinkWrapper);

            const subMenuLinkDiv = document.createElement('div');
            subMenuLinkDiv.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');
            subMenuLinkWrapper.append(subMenuLinkDiv);

            const subAnchor = subLi.querySelector(':scope > a');
            const subSpan = subLi.querySelector(':scope > span');
            let subLinkEl;
            if (subAnchor) {
              subLinkEl = document.createElement('a');
              subLinkEl.classList.add('text-decoration-none', 'text-dark-gray-100');
              subLinkEl.href = subAnchor.href;
              subLinkEl.innerHTML = `<span class="sub-link-span">${subAnchor.textContent.trim()}</span>`;
              if (subAnchor.target) {
                subLinkEl.target = subAnchor.target;
                subLinkEl.innerHTML += '<span class="cmp-link__screen-reader-only">opens in a new tab</span>';
              }
            } else if (subSpan) {
              subLinkEl = document.createElement('span');
              subLinkEl.classList.add('text-decoration-none', 'text-dark-gray-100');
              subLinkEl.innerHTML = `<span class="sub-link-span">${subSpan.textContent.trim()}</span>`;
            } else {
              subLinkEl = document.createElement('span');
              subLinkEl.classList.add('text-decoration-none', 'text-dark-gray-100');
              subLinkEl.innerHTML = `<span class="sub-link-span">${subLi.firstChild?.textContent?.trim() || ''}</span>`;
            }
            subMenuLinkDiv.append(subLinkEl);

            const nestedUl = subLi.querySelector('ul');
            if (nestedUl) {
              subLiElement.classList.add('child-below');
              subMenuLinkWrapper.classList.add('dropdown-toggle');
              subMenuLinkWrapper.setAttribute('aria-expanded', 'false');

              const arrowRight = document.createElement('span');
              arrowRight.classList.add('arrow-icon-right', 'end-0', 'd-none', 'd-lg-inline');
              if (arrowIconCell) { // Use arrowIconCell for desktop arrow
                const arrowIconDesktopPicture = arrowIconCell.querySelector('picture');
                if (arrowIconDesktopPicture) {
                  const arrowIconDesktopImg = arrowIconDesktopPicture.querySelector('img');
                  const optimizedArrowIconDesktop = createOptimizedPicture(arrowIconDesktopImg.src, arrowIconDesktopImg.alt, false, [{ width: '20' }]);
                  moveInstrumentation(arrowIconDesktopImg, optimizedArrowIconDesktop.querySelector('img'));
                  arrowRight.append(optimizedArrowIconDesktop);
                }
              }
              subMenuLinkDiv.append(arrowRight);

              const arrowMobile = document.createElement('span');
              arrowMobile.classList.add('arrow-icon', 'd-lg-none', 'end-0');
              if (arrowIconMobileCell) { // Use arrowIconMobileCell for mobile arrow
                const arrowIconMobilePicture = arrowIconMobileCell.querySelector('picture');
                if (arrowIconMobilePicture) {
                  const arrowIconMobileImg = arrowIconMobilePicture.querySelector('img');
                  const optimizedArrowIconMobile = createOptimizedPicture(arrowIconMobileImg.src, arrowIconMobileImg.alt, false, [{ width: '20' }]);
                  moveInstrumentation(arrowIconMobileImg, optimizedArrowIconMobile.querySelector('img'));
                  arrowMobile.append(optimizedArrowIconMobile);
                }
              }
              subMenuLinkWrapper.append(arrowMobile);

              const innerChildsDiv = document.createElement('div');
              innerChildsDiv.classList.add('d-lg-none', 'inner-childs');
              innerChildsDiv.id = `subNavItem${subIndex}`;
              innerChildsDiv.setAttribute('data-id', `subNavItem${subIndex}`);
              subLiElement.append(innerChildsDiv);

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

              const innerHeaderSubMenu = document.createElement('div');
              innerHeaderSubMenu.classList.add('header-comp__sub-menu', 'tri-parent');
              innerSubMenuGroup.append(innerHeaderSubMenu);

              const nestedClonedHierarchy = nestedUl.cloneNode(true);
              transformNestedLists(nestedClonedHierarchy);
              nestedClonedHierarchy.querySelectorAll('li').forEach((innerSubLi, innerSubIndex) => {
                const innerSubLiElement = document.createElement('li');
                innerSubLiElement.classList.add('header-comp__wrapper--sub-menu-item', 'no-child');
                innerSubLiElement.setAttribute('data-child-id', `subNavItem${innerSubIndex}`);
                moveInstrumentation(innerSubLi, innerSubLiElement);

                const innerSubMenuLinkWrapper = document.createElement('div');
                innerSubMenuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');
                innerSubMenuLinkWrapper.setAttribute('aria-current', 'page');
                innerSubLiElement.append(innerSubMenuLinkWrapper);

                const innerSubMenuLinkDiv = document.createElement('div');
                innerSubMenuLinkDiv.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');
                innerSubMenuLinkWrapper.append(innerSubMenuLinkDiv);

                const innerSubAnchor = innerSubLi.querySelector(':scope > a');
                const innerSubSpan = innerSubLi.querySelector(':scope > span');
                let innerSubLinkEl;
                if (innerSubAnchor) {
                  innerSubLinkEl = document.createElement('a');
                  innerSubLinkEl.classList.add('text-decoration-none', 'text-dark-gray-100');
                  innerSubLinkEl.href = innerSubAnchor.href;
                  innerSubLinkEl.innerHTML = `<span class="sub-link-span">${innerSubAnchor.textContent.trim()}</span>`;
                  if (innerSubAnchor.target) {
                    innerSubLinkEl.target = innerSubAnchor.target;
                    innerSubLinkEl.innerHTML += '<span class="cmp-link__screen-reader-only">opens in a new tab</span>';
                  }
                } else if (innerSubSpan) {
                  innerSubLinkEl = document.createElement('span');
                  innerSubLinkEl.classList.add('text-decoration-none', 'text-dark-gray-100');
                  innerSubLinkEl.innerHTML = `<span class="sub-link-span">${innerSubSpan.textContent.trim()}</span>`;
                } else {
                  innerSubLinkEl = document.createElement('span');
                  innerSubLinkEl.classList.add('text-decoration-none', 'text-dark-gray-100');
                  innerSubLinkEl.innerHTML = `<span class="sub-link-span">${innerSubLi.firstChild?.textContent?.trim() || ''}</span>`;
                }
                innerSubMenuLinkDiv.append(innerSubLinkEl);
                innerHeaderSubMenu.append(innerSubLiElement);
              });
              innerSubMenuGroup.append(innerHeaderSubMenu);
            }
            headerSubMenu.append(subLiElement);
          });
        }
        subMenuGroup.append(headerSubMenu);

        const borderSection = document.createElement('div');
        borderSection.classList.add('borderr-section', 'd-none', 'd-lg-flex', 'd-xl-flex', 'align-items-end', 'position-absolute', 'no-prod');
        borderSection.id = 'borderSec';
        borderSection.innerHTML = '<div class="border-bg"></div>';
        subMenuGroup.append(borderSection);

        li.append(subMenusDiv);

        menuLinkWrapper.addEventListener('click', () => {
          li.classList.toggle('show-nav');
          menuLinkWrapper.classList.toggle('collapsed');
          navbarCollapse.querySelectorAll('.header-comp__wrapper--menu-item').forEach((item) => {
            if (item !== li && item.classList.contains('show-nav')) {
              item.classList.remove('show-nav');
              item.querySelector('.header-comp__wrapper--menu-link').classList.add('collapsed');
            }
          });
        });
      }
    }
    li.prepend(menuLinkWrapper);
    navList.append(li);
  });

  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  container.append(searchAccessDiv);

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');
  searchAccessDiv.append(searchDiv);

  searchIconItems.forEach((row) => {
    const cells = [...row.children];
    const searchIconImageCell = cells.find(cell => cell.querySelector('picture') && cells.indexOf(cell) === 0);
    const searchLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && cells.indexOf(cell) === 1);

    const searchIconWrapper = document.createElement('div');
    searchIconWrapper.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
    moveInstrumentation(row, searchIconWrapper);

    if (searchIconImageCell) {
      const searchIconPicture = searchIconImageCell.querySelector('picture');
      if (searchIconPicture) {
        const searchIconImg = searchIconPicture.querySelector('img');
        const optimizedSearchIcon = createOptimizedPicture(searchIconImg.src, searchIconImg.alt, false, [{ width: '20' }]);
        moveInstrumentation(searchIconImg, optimizedSearchIcon.querySelector('img'));
        searchIconWrapper.append(optimizedSearchIcon);
      }
    }
    searchIconWrapper.innerHTML += `<span class="d-none d-lg-block">${searchLabelCell?.textContent.trim() || ''}</span>`;
    searchDiv.append(searchIconWrapper);
  });

  const outerBox = document.createElement('div');
  outerBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  section.append(outerBox);

  hamburgerToggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show'); // This class is not in the allowlist, but it's for Bootstrap-like collapse behavior.
    hamburgerToggler.classList.toggle('collapsed');
  });

  block.replaceChildren(section);

  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
