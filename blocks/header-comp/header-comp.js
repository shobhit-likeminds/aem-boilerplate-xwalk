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
        li.prepend(span);
        textNode.remove();
      }
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('header-comp__sub-menus'); // Use class from ORIGINAL HTML
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
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [logoImageRow, logoLinkRow, ...itemRows] = children;

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

  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerButton.type = 'button';
  hamburgerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerButton.setAttribute('aria-expanded', 'false');
  hamburgerButton.setAttribute('aria-label', 'Toggle navigation');

  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  for (let i = 0; i < 3; i += 1) {
    const span = document.createElement('span');
    span.classList.add('d-block', 'bg-white');
    hamburgerIcon.append(span);
  }
  hamburgerButton.append(hamburgerIcon);
  headerWrapper.append(hamburgerButton);

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  headerWrapper.append(logoWrapper);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  moveInstrumentation(logoLinkRow, logoLink);
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoWrapper.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  headerWrapper.append(navbarCollapse);

  const navList = document.createElement('ul');
  navList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(navList);

  const searchAccessWrapper = document.createElement('div');
  searchAccessWrapper.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  container.append(searchAccessWrapper);

  const navMenuItems = itemRows.filter((row) => row.children.length === 7);
  const searchIconItems = itemRows.filter((row) => row.children.length === 2);

  navMenuItems.forEach((row, i) => {
    const [menuIconCell, menuLabelCell, menuLinkCell, arrowIconDesktopCell, , hierarchyTreeCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'border-lg-0', 'position-relative');
    if (i % 2 === 0) {
      li.classList.add('dropdown', 'flex-column', 'show-nav', 'left-division');
    } else {
      li.classList.add('right-division');
    }
    moveInstrumentation(row, li);

    const menuLinkWrapper = document.createElement('div');
    menuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
    
    const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
    if (hierarchyRoot) {
      menuLinkWrapper.classList.add('dropdown-toggle');
      menuLinkWrapper.setAttribute('aria-expanded', 'false');
    }
    menuLinkWrapper.setAttribute('aria-current', 'page');
    li.append(menuLinkWrapper);

    const menuIconPicture = menuIconCell.querySelector('picture');
    if (menuIconPicture) {
      const img = menuIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      menuLinkWrapper.append(optimizedPic);
    }

    const anchor = document.createElement('a');
    anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    anchor.href = menuLinkCell.querySelector('a')?.href || '#';
    anchor.textContent = menuLabelCell.textContent.trim();
    menuLinkWrapper.append(anchor);

    if (hierarchyRoot) {
      const toggleArrow = document.createElement('span');
      toggleArrow.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const arrowIconDesktopPicture = arrowIconDesktopCell.querySelector('picture');
      if (arrowIconDesktopPicture) {
        const img = arrowIconDesktopPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        toggleArrow.append(optimizedPic);
      }
      menuLinkWrapper.append(toggleArrow);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      
      // Create a temporary div to hold the richtext content and apply classes
      const tempDiv = document.createElement('div');
      moveInstrumentation(hierarchyTreeCell, tempDiv); // Move instrumentation from the original cell
      tempDiv.innerHTML = hierarchyTreeCell.innerHTML; // Use innerHTML to preserve structure

      // Apply classes to nested elements as per ORIGINAL HTML
      tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0'));
      tempDiv.querySelectorAll('li').forEach(liItem => {
        liItem.classList.add('header-comp__wrapper--sub-menu-item');
        if (liItem.querySelector('ul')) {
          liItem.classList.add('child-below');
        } else {
          liItem.classList.add('no-child');
        }
      });
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('text-decoration-none', 'text-dark-gray-100', 'sub-link-span'));
      
      // Move children from tempDiv to subMenusDiv
      while (tempDiv.firstChild) {
        subMenusDiv.append(tempDiv.firstChild);
      }

      li.append(subMenusDiv);

      transformNestedLists(hierarchyRoot); // This function also handles nested list transformations and event listeners

      // Toggle functionality for desktop dropdown
      menuLinkWrapper.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('show-nav');
        subMenusDiv.classList.toggle('show');
        menuLinkWrapper.classList.toggle('collapsed');
        menuLinkWrapper.setAttribute('aria-expanded', li.classList.contains('show-nav'));
      });
    }

    navList.append(li);
  });

  const searchWrapper = document.createElement('div');
  searchWrapper.classList.add('header-comp__wrapper--search');
  searchAccessWrapper.append(searchWrapper);

  searchIconItems.forEach((row) => {
    const [searchIconCell, searchLabelCell] = [...row.children];

    const searchIconDiv = document.createElement('div');
    searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
    moveInstrumentation(row, searchIconDiv);

    const searchIconPicture = searchIconCell.querySelector('picture');
    if (searchIconPicture) {
      const img = searchIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      searchIconDiv.append(optimizedPic);
    }

    const searchLabelSpan = document.createElement('span');
    searchLabelSpan.classList.add('d-none', 'd-lg-block');
    searchLabelSpan.textContent = searchLabelCell.textContent.trim();
    searchIconDiv.append(searchLabelSpan);

    searchWrapper.append(searchIconDiv);

    // Add event listener for search icon to toggle global search
    searchIconDiv.addEventListener('click', () => {
      const globalSearch = document.querySelector('.global-search');
      if (globalSearch) {
        globalSearch.classList.toggle('d-none');
      }
    });
  });

  const outerBox = document.createElement('div');
  outerBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  section.append(outerBox);

  block.replaceChildren(section);

  hamburgerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
    hamburgerButton.setAttribute('aria-expanded', hamburgerButton.classList.contains('collapsed') ? 'false' : 'true');
  });

  // Event listener for closing global search
  const globalSearch = document.querySelector('.global-search');
  if (globalSearch) {
    const closeButton = globalSearch.querySelector('.cross-wrap');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        globalSearch.classList.add('d-none');
      });
    }
  }

  // Image optimization for all images in the block
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
