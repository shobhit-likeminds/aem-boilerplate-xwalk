import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Normalize label-only nodes
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
      subWrap.classList.add('has-sub-child'); // Use original HTML class
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default function decorate(block) {
  const [logoImageRow, logoLinkRow, ...itemRows] = [...block.children];

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

  const hamburgerBtn = document.createElement('button');
  hamburgerBtn.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerBtn.type = 'button';
  hamburgerBtn.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  hamburgerBtn.setAttribute('aria-label', 'Toggle navigation');
  headerWrapper.append(hamburgerBtn);

  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  hamburgerBtn.append(togglerIcon);

  for (let i = 0; i < 3; i += 1) {
    const span = document.createElement('span');
    span.classList.add('d-block', 'bg-white');
    togglerIcon.append(span);
  }

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-comp__wrapper--logo');
  headerWrapper.append(logoDiv);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  moveInstrumentation(logoLinkRow, logoLink);
  logoDiv.append(logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    optimizedPic.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
    logoLink.append(optimizedPic);
  }

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  headerWrapper.append(navbarCollapse);

  hamburgerBtn.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerBtn.classList.toggle('collapsed');
  });

  const menuGroups = document.createElement('ul');
  menuGroups.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(menuGroups);

  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  containerDiv.append(searchAccessDiv);

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');
  searchAccessDiv.append(searchDiv);

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  searchDiv.append(searchIconDiv);

  const outerBox = document.createElement('div');
  outerBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerComp.append(outerBox);

  // Process item rows
  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 7) { // header-navigation-item
      const menuImageCell = cells[0];
      const menuLabelCell = cells[1];
      const menuLinkCell = cells[2];
      const arrowIconDesktopCell = cells[3];
      // const arrowIconMobileCell = cells[4]; // Not used in current rendering logic
      const hierarchyTreeCell = cells[5];
      // const subNavigationItemsCell = cells[6]; // Container field, not directly rendered here

      const li = document.createElement('li');
      li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'dropdown', 'flex-column', 'border-lg-0', 'position-relative');
      moveInstrumentation(row, li);

      const menuLinkWrapper = document.createElement('div');
      menuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
      li.append(menuLinkWrapper);

      const menuImagePicture = menuImageCell.querySelector('picture');
      if (menuImagePicture) {
        const img = menuImagePicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        menuLinkWrapper.append(optimizedPic);
      }

      const anchor = document.createElement('a');
      anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
      anchor.setAttribute('data-link-region', 'Header');
      anchor.href = menuLinkCell.querySelector('a')?.href || '#';
      moveInstrumentation(menuLinkCell, anchor);

      const spanLink = document.createElement('span');
      spanLink.classList.add('link-span');
      spanLink.textContent = menuLabelCell.textContent.trim();
      moveInstrumentation(menuLabelCell, spanLink);
      anchor.append(spanLink);
      menuLinkWrapper.append(anchor);

      const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
      if (hierarchyRoot) {
        menuLinkWrapper.classList.add('dropdown-toggle');
        menuLinkWrapper.setAttribute('aria-expanded', 'false');
        li.classList.add('show-nav'); // For desktop dropdown
        const toggleSpan = document.createElement('span');
        toggleSpan.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
        menuLinkWrapper.append(toggleSpan);

        const arrowIcon = arrowIconDesktopCell.querySelector('picture > img');
        if (arrowIcon) {
          const optimizedArrowPic = createOptimizedPicture(arrowIcon.src, arrowIcon.alt, false, [{ width: '750' }]);
          moveInstrumentation(arrowIcon, optimizedArrowPic.querySelector('img'));
          toggleSpan.append(optimizedArrowPic);
        }

        const subMenusDiv = document.createElement('div');
        subMenusDiv.classList.add('header-comp__sub-menus');
        li.append(subMenusDiv);

        const xfpageDiv = document.createElement('div');
        xfpageDiv.classList.add('xfpage', 'page', 'basicpage');
        subMenusDiv.append(xfpageDiv);

        const aemGrid = document.createElement('div');
        aemGrid.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');
        xfpageDiv.append(aemGrid);

        const headerSubMenuCol = document.createElement('div');
        headerSubMenuCol.classList.add('headerSubMenu', 'aem-GridColumn', 'aem-GridColumn--default--12');
        aemGrid.append(headerSubMenuCol);

        const subMenuGroup = document.createElement('ul');
        subMenuGroup.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
        headerSubMenuCol.append(subMenuGroup);

        const headerSubMenu = document.createElement('div');
        headerSubMenu.classList.add('header-comp__sub-menu', 'tri-parent');
        subMenuGroup.append(headerSubMenu);

        // Move hierarchyRoot content into headerSubMenu
        moveInstrumentation(hierarchyTreeCell, headerSubMenu); // Instrument the cell itself
        while (hierarchyRoot.firstChild) {
          headerSubMenu.append(hierarchyRoot.firstChild);
        }
        transformNestedLists(headerSubMenu); // Transform the nested list structure

        // Add event listener for dropdown toggle
        menuLinkWrapper.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('show-nav');
          subMenusDiv.classList.toggle('show');
          menuLinkWrapper.classList.toggle('collapsed');
        });
      }

      menuGroups.append(li);
    } else if (cells.length === 2 && cells[0].querySelector('picture')) { // header-search
      const searchIconCell = cells[0];
      const searchLabelCell = cells[1];
      const searchIconPicture = searchIconCell.querySelector('picture');
      if (searchIconPicture) {
        const img = searchIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        searchIconDiv.append(optimizedPic);
      }
      const searchLabelSpan = document.createElement('span');
      searchLabelSpan.classList.add('d-none', 'd-lg-block');
      searchLabelSpan.textContent = searchLabelCell.textContent.trim();
      moveInstrumentation(searchLabelCell, searchLabelSpan);
      searchIconDiv.append(searchLabelSpan);
    }
    // Note: header-sub-navigation-item and header-sub-sub-navigation-item are handled by the richtext transformNestedLists
    // and are not expected as direct top-level itemRows.
  });

  block.replaceChildren(headerComp);
}
