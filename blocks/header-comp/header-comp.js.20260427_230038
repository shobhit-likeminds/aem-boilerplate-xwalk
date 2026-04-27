import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
  rootUl.querySelectorAll('li').forEach((li) => {
    li.classList.add('header-comp__wrapper--sub-menu-item'); // Add base class for all list items
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (anchor) {
      anchor.classList.add('text-decoration-none', 'text-dark-gray-100'); // Add classes to anchor
      const span = document.createElement('span');
      span.classList.add('sub-link-span');
      span.textContent = anchor.textContent.trim();
      anchor.textContent = ''; // Clear original text content
      anchor.prepend(span);
    } else {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.classList.add('sub-link-span'); // Add class to span for consistency
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
      }
    }

    if (nested) {
      nested.remove();
      li.classList.add('child-below'); // Add class for items with children
      const subWrap = document.createElement('div');
      subWrap.classList.add('inner-childs', 'd-lg-none'); // Classes from original HTML for nested div
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        // Create a wrapper div for the link/span and arrow icon
        const linkWrapper = document.createElement('div');
        linkWrapper.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'dropdown-toggle', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');

        const subMenuLinkDiv = document.createElement('div');
        subMenuLinkDiv.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');

        // Move the trigger (a or span) into the subMenuLinkDiv
        subMenuLinkDiv.append(trigger);
        linkWrapper.append(subMenuLinkDiv);

        // Add the arrow icon for mobile
        const arrowIconMobile = document.createElement('span');
        arrowIconMobile.classList.add('arrow-icon', 'd-lg-none', 'end-0');
        const arrowImgMobile = document.createElement('img');
        arrowImgMobile.alt = 'svg file';
        arrowImgMobile.src = '/content/dam/aemigrate/uploaded-folder/image/1777307348731.svg+xml'; // Hardcoded from original HTML
        arrowIconMobile.append(arrowImgMobile);
        linkWrapper.append(arrowIconMobile);

        // Add the arrow icon for desktop
        const arrowIconRight = document.createElement('span');
        arrowIconRight.classList.add('arrow-icon-right', 'end-0', 'd-none', 'd-lg-inline');
        const arrowImgRight = document.createElement('img');
        arrowImgRight.alt = 'svg file';
        arrowImgRight.src = '/content/dam/aemigrate/uploaded-folder/image/1777307348500.svg+xml'; // Hardcoded from original HTML
        arrowIconRight.append(arrowImgRight);
        subMenuLinkDiv.append(arrowIconRight);

        // Prepend the new linkWrapper to the li
        li.prepend(linkWrapper);

        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
    } else {
      li.classList.add('no-child'); // Add class for items without children
      const linkWrapper = document.createElement('div');
      linkWrapper.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');
      linkWrapper.setAttribute('aria-current', 'page');

      const subMenuLinkDiv = document.createElement('div');
      subMenuLinkDiv.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');

      const currentTrigger = li.querySelector(':scope > a, :scope > span');
      if (currentTrigger) {
        subMenuLinkDiv.append(currentTrigger);
      }
      linkWrapper.append(subMenuLinkDiv);
      li.prepend(linkWrapper);
    }
  });
}

export default function decorate(block) {
  const [logoImageRow, logoLinkRow, ...itemRows] = [...block.children];

  const headerComp = document.createElement('section');
  headerComp.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

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

  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  for (let i = 0; i < 3; i += 1) {
    const span = document.createElement('span');
    span.classList.add('d-block', 'bg-white');
    togglerIcon.append(span);
  }
  hamburgerButton.append(togglerIcon);
  headerWrapper.append(hamburgerButton);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-comp__wrapper--logo');
  headerWrapper.append(logoDiv);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    optimizedPic.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
    moveInstrumentation(logoImageRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  headerWrapper.append(navbarCollapse);

  const menuList = document.createElement('ul');
  menuList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(menuList);

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

  hamburgerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
  });

  // Filter item rows based on their structure (number of children)
  const menuItems = itemRows.filter((row) => row.children.length === 6);
  // const subMenuItems = itemRows.filter((row) => row.children.length === 5); // Not used directly in this structure
  // const subChildMenuItems = itemRows.filter((row) => row.children.length === 2 && !row.querySelector('picture')); // Not used directly in this structure
  const searchItems = itemRows.filter((row) => row.children.length === 2 && row.querySelector('picture'));

  menuItems.forEach((row) => {
    const [menuIconCell, menuLabelCell, menuLinkCell, arrowIconCell, subMenuItemsContainerCell, hierarchyTreeCell] = [...row.children];

    const listItem = document.createElement('li');
    listItem.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'dropdown', 'border-lg-0', 'show-nav', 'position-relative', 'left-division');
    moveInstrumentation(row, listItem);

    const menuLinkWrapper = document.createElement('div');
    menuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'dropdown-toggle', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
    menuLinkWrapper.setAttribute('aria-current', 'page');
    menuLinkWrapper.setAttribute('aria-expanded', 'false');

    const menuIconPicture = menuIconCell.querySelector('picture');
    if (menuIconPicture) {
      const img = menuIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      menuLinkWrapper.append(optimizedPic);
    }

    const link = document.createElement('a');
    link.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    link.setAttribute('data-link-region', 'Header');
    link.href = menuLinkCell.querySelector('a')?.href || '#';
    const linkSpan = document.createElement('span');
    linkSpan.classList.add('link-span');
    linkSpan.textContent = menuLabelCell.textContent.trim();
    link.append(linkSpan);
    menuLinkWrapper.append(link);

    const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
    if (hierarchyRoot) {
      const toggleDropDown = document.createElement('span');
      toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const arrowIconPicture = arrowIconCell.querySelector('picture');
      if (arrowIconPicture) {
        const img = arrowIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        toggleDropDown.append(optimizedPic);
      }
      menuLinkWrapper.append(toggleDropDown);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      // Move instrumentation from the original cell to the new div
      moveInstrumentation(hierarchyTreeCell, subMenusDiv);
      subMenusDiv.append(hierarchyRoot); // Append the actual UL element
      transformNestedLists(hierarchyRoot);
      listItem.append(subMenusDiv);

      toggleDropDown.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        listItem.classList.toggle('show-nav');
        subMenusDiv.classList.toggle('show');
      });
    }

    listItem.append(menuLinkWrapper);
    menuList.append(listItem);
  });

  searchItems.forEach((row) => {
    const [searchIconCell, searchLabelCell] = [...row.children];
    const searchIconPicture = searchIconCell.querySelector('picture');
    if (searchIconPicture) {
      const img = searchIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      searchIconDiv.append(optimizedPic);
    }
    const searchSpan = document.createElement('span');
    searchSpan.classList.add('d-none', 'd-lg-block');
    searchSpan.textContent = searchLabelCell.textContent.trim();
    searchIconDiv.append(searchSpan);
    moveInstrumentation(row, searchIconDiv);
  });

  block.replaceChildren(headerComp);
}
