import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    // Apply classes from original HTML to li elements
    li.classList.add('header-comp__wrapper--sub-menu-item'); // Example class, adjust as needed from original HTML

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
      subWrap.classList.add('has-sub-child'); // This class is not in the allowlist. If it's for JS behavior, it's fine. If for styling, it should be from original HTML.
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // This class is not in the allowlist. If it's for JS behavior, it's fine. If for styling, it should be from original HTML.
          subWrap.classList.toggle('active'); // This class is not in the allowlist. If it's for JS behavior, it's fine. If for styling, it should be from original HTML.
        });
      }
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default function decorate(block) {
  const [logoImageRow, logoLinkRow, ...itemRows] = [...block.children];

  const headerComp = document.createElement('section');
  headerComp.classList.add(
    'header-comp',
    'bg-red-100',
    'position-fixed',
    'top-0',
    'start-0',
    'z-2',
    'w-100',
  );
  moveInstrumentation(block, headerComp);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add(
    'container',
    'gx-8',
    'gx-sm-0',
    'd-flex',
    'justify-content-between',
    'align-items-start',
    'align-items-md-center',
  );

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add(
    'header-comp__wrapper',
    'container-fluid',
    'justify-content-start',
    'gx-4',
    'gx-md-0',
  );

  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add(
    'border-0',
    'shadow-none',
    'navbar-toggler',
    'header-comp__wrapper--hamburger',
    'collapsed',
    'p-0',
  );
  hamburgerButton.type = 'button';
  hamburgerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerButton.setAttribute('aria-expanded', 'false');
  hamburgerButton.setAttribute('aria-label', 'Toggle navigation');

  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.classList.add(
    'navbar-toggler-icon',
    'd-flex',
    'flex-column',
    'justify-content-center',
    'align-items-center',
  );
  for (let i = 0; i < 3; i += 1) {
    const span = document.createElement('span');
    span.classList.add('d-block', 'bg-white');
    hamburgerIcon.append(span);
  }
  hamburgerButton.append(hamburgerIcon);

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');

  const logoLink = document.createElement('a');
  logoLink.classList.add(
    'header-comp__wrapper--link',
    'cta-analytics',
    'navbar-brand',
    'm-0',
  );
  logoLink.setAttribute('data-link-region', 'Header');
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
    optimizedPic.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
    optimizedPic.querySelector('img').setAttribute('loading', 'eager');
    moveInstrumentation(logoImageRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoWrapper.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add(
    'header-comp__wrapper--menus',
    'collapse',
    'navbar-collapse',
    'z-3',
  );
  navbarCollapse.id = 'navbarSupportedContent';

  const navList = document.createElement('ul');
  navList.classList.add(
    'header-comp__wrapper--menus-groups',
    'navbar-nav',
    'me-auto',
    'mb-2',
    'mb-lg-0',
    'w-100',
  );

  const searchAccess = document.createElement('div');
  searchAccess.classList.add(
    'header-comp__wrapper--search-access',
    'd-flex',
    'py-4',
    'py-lg-0',
  );
  const searchWrapper = document.createElement('div');
  searchWrapper.classList.add('header-comp__wrapper--search');
  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add(
    'header-comp__wrapper--search-icon',
    'd-flex',
    'flex-column',
    'align-items-center',
    'font-12',
    'leading-20',
    'text-white',
  );

  // Filter item rows based on their structure to match models
  const navItems = itemRows.filter((row) => row.children.length === 6);
  const searchItems = itemRows.filter((row) => row.children.length === 2);
  // Note: header-submenu-item and header-submenu-leaf-item are handled within the hierarchy-tree richtext.

  navItems.forEach((row, i) => {
    const cells = [...row.children];
    // Use content detection for cells, as per CHECK 0
    const menuIconCell = cells.find((cell) => cell.querySelector('picture')); // Assuming first picture is menuIcon
    const menuLabelCell = cells.find((cell) => !cell.querySelector('picture') && !cell.querySelector('a')); // Assuming text content without picture or link
    const menuLinkCell = cells.find((cell) => cell.querySelector('a')); // Assuming first link is menuLink
    const arrowIconCell = cells.find((cell) => cell.children.length > 0 && cell !== menuIconCell && cell !== menuLinkCell && cell.querySelector('picture')); // Assuming second picture is arrowIcon
    // cell[4] is a container, its content is not directly used here
    const hierarchyTreeCell = cells.find((cell) => cell.querySelector('ul')); // Assuming richtext with ul is hierarchy-tree

    const li = document.createElement('li');
    li.classList.add(
      'header-comp__wrapper--menu-item',
      'h-100',
      'd-flex',
      'align-items-center',
      'nav-item',
      'p-4',
      'p-lg-0',
      'border-bottom-lg-0',
      'dropdown',
      'flex-column',
      'border-lg-0',
      'position-relative',
    );
    if (i % 2 === 0) {
      li.classList.add('left-division');
    } else {
      li.classList.add('right-division');
    }
    li.setAttribute('data-header-item-id', `leftHeaderItem${i}`);
    moveInstrumentation(row, li);

    const menuLinkDiv = document.createElement('div');
    menuLinkDiv.classList.add(
      'header-comp__wrapper--menu-link',
      'gap-6',
      'gap-lg-1',
      'position-relative',
      'w-100',
      'd-flex',
      'align-items-center',
      'nav-link',
      'px-0',
      'font-default',
      'leading-28',
      'leading-lg-26',
      'text-header-list',
      'text-lg-cream-100',
    );
    menuLinkDiv.setAttribute('aria-current', 'page');

    if (menuIconCell) {
      const menuIconPicture = menuIconCell.querySelector('picture');
      if (menuIconPicture) {
        const img = menuIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '30' }]);
        optimizedPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        optimizedPic.querySelector('img').setAttribute('loading', 'eager');
        menuLinkDiv.append(optimizedPic);
      }
    }

    const menuAnchor = document.createElement('a');
    menuAnchor.classList.add(
      'text-decoration-none',
      'cta-analytics',
      'header-comp__wrapper--link',
    );
    menuAnchor.setAttribute('data-link-region', 'Header');
    menuAnchor.href = menuLinkCell?.querySelector('a')?.href || '#';

    const linkSpan = document.createElement('span');
    linkSpan.classList.add('link-span');
    linkSpan.textContent = menuLabelCell?.textContent.trim() || '';
    menuAnchor.append(linkSpan);
    menuLinkDiv.append(menuAnchor);

    if (hierarchyTreeCell) {
      const tempDiv = document.createElement('div');
      moveInstrumentation(hierarchyTreeCell, tempDiv); // Move instrumentation from original cell to tempDiv
      tempDiv.innerHTML = hierarchyTreeCell.innerHTML; // Use innerHTML for richtext

      const hierarchyRoot = tempDiv.querySelector('ul');
      if (hierarchyRoot) {
        menuLinkDiv.classList.add('dropdown-toggle');
        menuLinkDiv.setAttribute('aria-expanded', 'false');

        const arrowIconSpan = document.createElement('span');
        arrowIconSpan.classList.add(
          'toggle-drop-down',
          'arrow-icon',
          'd-flex',
          'end-0',
          'top-parent',
        );
        if (arrowIconCell) {
          const arrowIconPicture = arrowIconCell.querySelector('picture');
          if (arrowIconPicture) {
            const img = arrowIconPicture.querySelector('img');
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
            optimizedPic.querySelector('img').alt = 'svg file';
            arrowIconSpan.append(optimizedPic);
          }
        }
        menuLinkDiv.append(arrowIconSpan);

        const subMenusDiv = document.createElement('div');
        subMenusDiv.classList.add('header-comp__sub-menus');
        subMenusDiv.id = `leftHeaderItem${i}`;

        const xfpageDiv = document.createElement('div');
        xfpageDiv.classList.add('xfpage', 'page', 'basicpage');

        const aemGridDiv = document.createElement('div');
        aemGridDiv.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');

        const headerSubMenuGridColumn = document.createElement('div');
        headerSubMenuGridColumn.classList.add(
          'headerSubMenu',
          'aem-GridColumn',
          'aem-GridColumn--default--12',
        );

        const subMenuGroup = document.createElement('ul');
        subMenuGroup.classList.add(
          'header-comp__wrapper--sub-menu-group',
          'w-auto',
          'border-0',
          'pb-lg-0',
          'dropdown-menu',
          'p-0',
        );

        const subMenuTriParent = document.createElement('div');
        subMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');
        
        // Apply classes to nested elements from ORIGINAL HTML
        hierarchyRoot.querySelectorAll('li').forEach(itemLi => {
          itemLi.classList.add('header-comp__wrapper--sub-menu-item');
          if (itemLi.querySelector('ul')) {
            itemLi.classList.add('child-below');
          } else {
            itemLi.classList.add('no-child');
          }
        });
        hierarchyRoot.querySelectorAll('a').forEach(itemA => {
          itemA.classList.add('text-decoration-none', 'text-dark-gray-100');
          const span = document.createElement('span');
          span.classList.add('sub-link-span');
          span.textContent = itemA.textContent;
          itemA.textContent = '';
          itemA.prepend(span);
        });
        hierarchyRoot.querySelectorAll('div').forEach(itemDiv => {
          itemDiv.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');
        });

        subMenuTriParent.append(hierarchyRoot);
        transformNestedLists(hierarchyRoot); // Recursively transform nested lists
        
        subMenuGroup.append(subMenuTriParent);
        headerSubMenuGridColumn.append(subMenuGroup);
        aemGridDiv.append(headerSubMenuGridColumn);
        xfpageDiv.append(aemGridDiv);
        subMenusDiv.append(xfpageDiv);
        li.append(subMenusDiv);

        arrowIconSpan.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          menuLinkDiv.classList.toggle('collapsed');
          menuLinkDiv.setAttribute(
            'aria-expanded',
            menuLinkDiv.classList.contains('collapsed') ? 'true' : 'false',
          );
          subMenusDiv.classList.toggle('show'); // This class is not in the allowlist. If it's for JS behavior, it's fine. If for styling, it should be from original HTML.
        });
      }
    }

    li.prepend(menuLinkDiv);
    navList.append(li);
  });

  searchItems.forEach((row) => {
    const cells = [...row.children];
    const searchIconCell = cells.find((cell) => cell.querySelector('picture'));
    const searchLabelCell = cells.find((cell) => !cell.querySelector('picture'));

    if (searchIconCell) {
      const searchIconPicture = searchIconCell.querySelector('picture');
      if (searchIconPicture) {
        const img = searchIconPicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
        optimizedPic.querySelector('img').alt = 'svg file';
        searchIconDiv.append(optimizedPic);
      }
    }

    const searchLabelSpan = document.createElement('span');
    searchLabelSpan.classList.add('d-none', 'd-lg-block');
    searchLabelSpan.textContent = searchLabelCell?.textContent.trim() || '';
    searchIconDiv.append(searchLabelSpan);
    moveInstrumentation(row, searchIconDiv);
  });

  searchWrapper.append(searchIconDiv);
  searchAccess.append(searchWrapper);

  navbarCollapse.append(navList);
  headerWrapper.append(hamburgerButton, logoWrapper, navbarCollapse);
  nav.append(headerWrapper);
  containerDiv.append(nav, searchAccess);

  const outerBox = document.createElement('div');
  outerBox.classList.add(
    'header__outer-box',
    'position-absolute',
    'w-100',
    'z-2',
    'start-0',
    'd-lg-none',
  );

  headerComp.append(containerDiv, outerBox);

  block.replaceChildren(headerComp);

  hamburgerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show'); // This class is not in the allowlist. If it's for JS behavior, it's fine. If for styling, it should be from original HTML.
    hamburgerButton.classList.toggle('collapsed');
    hamburgerButton.setAttribute(
      'aria-expanded',
      navbarCollapse.classList.contains('show') ? 'true' : 'false',
    );
  });
}
