import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
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
      subWrap.classList.add('inner-childs');
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
  const [
    logoImageRow,
    logoLinkRow,
    searchIconRow,
    searchLabelRow,
    crossIconRow, // Added for cross.svg
    searchMagnifyingGlassIconRow, // Added for search.svg
    ...itemRows
  ] = [...block.children];

  const headerComp = document.createElement('section');
  headerComp.classList.add(
    'header-comp',
    'bg-red-100',
    'position-fixed',
    'top-0',
    'start-0',
    'z-2',
    'w-100'
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
    'align-items-md-center'
  );

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');

  const navWrapper = document.createElement('div');
  navWrapper.classList.add(
    'header-comp__wrapper',
    'container-fluid',
    'justify-content-start',
    'gx-4',
    'gx-md-0'
  );

  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add(
    'border-0',
    'shadow-none',
    'navbar-toggler',
    'header-comp__wrapper--hamburger',
    'collapsed',
    'p-0'
  );
  hamburgerButton.type = 'button';
  hamburgerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerButton.setAttribute('aria-expanded', 'false');
  hamburgerButton.setAttribute('aria-label', 'Toggle navigation');

  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add(
    'navbar-toggler-icon',
    'd-flex',
    'flex-column',
    'justify-content-center',
    'align-items-center'
  );
  for (let i = 0; i < 3; i += 1) {
    const span = document.createElement('span');
    span.classList.add('d-block', 'bg-white');
    togglerIcon.append(span);
  }
  hamburgerButton.append(togglerIcon);

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');

  const logoLink = document.createElement('a');
  logoLink.classList.add(
    'header-comp__wrapper--link',
    'cta-analytics',
    'navbar-brand',
    'm-0'
  );
  logoLink.setAttribute('data-link-region', 'Header');
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(
      logoImg.src,
      logoImg.alt,
      false,
      [{ width: '750' }]
    );
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    logoLink.append(optimizedLogoPic);
    optimizedLogoPic.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100'); // Apply class to the img inside picture
  }

  logoWrapper.append(logoLink);

  const menusWrapper = document.createElement('div');
  menusWrapper.classList.add(
    'header-comp__wrapper--menus',
    'collapse',
    'navbar-collapse',
    'z-3'
  );
  menusWrapper.id = 'navbarSupportedContent';

  const menuList = document.createElement('ul');
  menuList.classList.add(
    'header-comp__wrapper--menus-groups',
    'navbar-nav',
    'me-auto',
    'mb-2',
    'mb-lg-0',
    'w-100'
  );

  const searchAccessWrapper = document.createElement('div');
  searchAccessWrapper.classList.add(
    'header-comp__wrapper--search-access',
    'd-flex',
    'py-4',
    'py-lg-0'
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
    'text-white'
  );

  const searchPicture = searchIconRow.querySelector('picture');
  if (searchPicture) {
    const searchImg = searchPicture.querySelector('img');
    const optimizedSearchPic = createOptimizedPicture(
      searchImg.src,
      searchImg.alt,
      false,
      [{ width: '750' }]
    );
    moveInstrumentation(searchImg, optimizedSearchPic.querySelector('img'));
    searchIconDiv.append(optimizedSearchPic);
  }

  const searchLabelSpan = document.createElement('span');
  searchLabelSpan.classList.add('d-none', 'd-lg-block');
  searchLabelSpan.textContent = searchLabelRow.textContent.trim();
  moveInstrumentation(searchLabelRow, searchLabelSpan);
  searchIconDiv.append(searchLabelSpan);

  searchWrapper.append(searchIconDiv);
  searchAccessWrapper.append(searchWrapper);

  const headerOuterBox = document.createElement('div');
  headerOuterBox.classList.add(
    'header__outer-box',
    'position-absolute',
    'w-100',
    'z-2',
    'start-0',
    'd-lg-none'
  );

  const globalSearchSection = document.createElement('section');
  globalSearchSection.classList.add('global-search', 'position-fixed', 'w-100', 'd-none');

  const globalSearchWrapper = document.createElement('div');
  globalSearchWrapper.classList.add(
    'w-100',
    'z-4',
    'global-search__wrapper',
    'pb-md-5',
    'pb-lg-6',
    'pt-lg-0',
    'pt-md-0',
    'pt-2',
    'pb-2'
  );

  const globalSearchFlex = document.createElement('div');
  globalSearchFlex.classList.add('d-flex', 'justify-content-center', 'h-100');

  const crossWrapDiv = document.createElement('div');
  crossWrapDiv.classList.add(
    'd-lg-block',
    'align-items-center',
    'd-flex'
  );
  const crossWrap = document.createElement('div');
  crossWrap.classList.add(
    'cross-wrap',
    'd-flex',
    'justify-content-center',
    'align-items-center'
  );
  const crossImg = crossIconRow.querySelector('img');
  if (crossImg) {
    const optimizedCrossPic = createOptimizedPicture(
      crossImg.src,
      crossImg.alt,
      false,
      [{ width: '750' }]
    );
    moveInstrumentation(crossImg, optimizedCrossPic.querySelector('img'));
    crossWrap.append(optimizedCrossPic);
  }
  crossWrapDiv.append(crossWrap);

  const searchForm = document.createElement('div');
  searchForm.classList.add(
    'global-search__wrapper--form',
    'd-flex',
    'align-items-center',
    'justify-content-center'
  );
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add(
    'global-search__wrapper--form-input',
    'pb-1',
    'pb-md-1',
    'pb-lg-3',
    'px-lg-4'
  );
  searchInput.placeholder = 'Start typing...';
  searchInput.setAttribute('data-path', '/content/svasti/in/en');
  searchInput.setAttribute('data-limit', '5');
  searchInput.setAttribute('data-error', '<p><b>Sorry, we cannot find what you are looking for :(</b></p>\n<p>&nbsp;</p>\n<p>Please try a new search term or browse through one of our product categories.</p>\n');
  searchForm.append(searchInput);

  const searchWrapDiv = document.createElement('div');
  searchWrapDiv.classList.add(
    'd-lg-block',
    'align-items-center',
    'd-flex'
  );
  const searchWrap = document.createElement('div');
  searchWrap.classList.add(
    'search-wrap',
    'd-flex',
    'justify-content-center',
    'align-items-center'
  );
  const searchMagnifyingGlassImg = searchMagnifyingGlassIconRow.querySelector('img');
  if (searchMagnifyingGlassImg) {
    const optimizedSearchMagnifyingGlassPic = createOptimizedPicture(
      searchMagnifyingGlassImg.src,
      searchMagnifyingGlassImg.alt,
      false,
      [{ width: '750' }]
    );
    moveInstrumentation(searchMagnifyingGlassImg, optimizedSearchMagnifyingGlassPic.querySelector('img'));
    searchWrap.append(optimizedSearchMagnifyingGlassPic);
  }
  searchWrapDiv.append(searchWrap);

  globalSearchFlex.append(crossWrapDiv, searchForm, searchWrapDiv);
  globalSearchWrapper.append(globalSearchFlex);

  const globalSearchResponse = document.createElement('div');
  globalSearchResponse.classList.add(
    'd-flex',
    'justify-content-center',
    'w-100',
    'close-on-click'
  );
  const globalSearchResponseInner = document.createElement('div');
  globalSearchResponseInner.classList.add(
    'global-search__response',
    'd-flex',
    'justify-content-start',
    'z-4',
    'bg-transparent'
  );
  const searchResultsList = document.createElement('ul');
  searchResultsList.classList.add(
    'global-search__response--results',
    'm-0',
    'w-100',
    'd-none',
    'pt-5',
    'pb-5',
    'px-9'
  );
  globalSearchResponseInner.append(searchResultsList);
  globalSearchResponse.append(globalSearchResponseInner);

  globalSearchSection.append(globalSearchWrapper, globalSearchResponse);

  itemRows.forEach((row) => {
    const cells = [...row.children];
    // Detect navigation-item (7 cells) vs submenu-item (5 cells)
    if (cells.length === 7) {
      const [
        menuIconCell,
        labelCell,
        linkCell,
        arrowIconDesktopCell,
        arrowIconMobileCell,
        subMenuContainerCell, // This cell is a container, its content is not directly used here
        hierarchyTreeCell,
      ] = cells;

      const listItem = document.createElement('li');
      listItem.classList.add(
        'header-comp__wrapper--menu-item',
        'h-100',
        'd-flex',
        'align-items-center',
        'nav-item',
        'p-4',
        'p-lg-0',
        'border-bottom-lg-0',
        'dropdown',
        'border-lg-0',
        'show-nav',
        'position-relative'
      );
      moveInstrumentation(row, listItem);

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
        'dropdown-toggle',
        'font-default',
        'leading-28',
        'leading-lg-26',
        'text-header-list',
        'text-lg-cream-100'
      );
      menuLinkDiv.setAttribute('aria-current', 'page');
      menuLinkDiv.setAttribute('aria-expanded', 'false');

      const menuIconPicture = menuIconCell.querySelector('picture');
      if (menuIconPicture) {
        const menuIconImg = menuIconPicture.querySelector('img');
        const optimizedMenuIconPic = createOptimizedPicture(
          menuIconImg.src,
          menuIconImg.alt,
          false,
          [{ width: '750' }]
        );
        moveInstrumentation(menuIconImg, optimizedMenuIconPic.querySelector('img'));
        optimizedMenuIconPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        menuLinkDiv.append(optimizedMenuIconPic);
      }

      const linkAnchor = document.createElement('a');
      linkAnchor.classList.add(
        'text-decoration-none',
        'cta-analytics',
        'header-comp__wrapper--link'
      );
      linkAnchor.setAttribute('data-link-region', 'Header');
      linkAnchor.href = linkCell.querySelector('a')?.href || '#';
      moveInstrumentation(linkCell, linkAnchor);

      const linkSpan = document.createElement('span');
      linkSpan.classList.add('link-span');
      linkSpan.textContent = labelCell.textContent.trim();
      moveInstrumentation(labelCell, linkSpan);
      linkAnchor.append(linkSpan);
      menuLinkDiv.append(linkAnchor);

      const arrowIconSpan = document.createElement('span');
      arrowIconSpan.classList.add(
        'toggle-drop-down',
        'arrow-icon',
        'd-flex',
        'end-0',
        'top-parent'
      );
      const arrowIconDesktopPicture = arrowIconDesktopCell.querySelector('picture');
      if (arrowIconDesktopPicture) {
        const arrowIconDesktopImg = arrowIconDesktopPicture.querySelector('img');
        const optimizedArrowIconDesktopPic = createOptimizedPicture(
          arrowIconDesktopImg.src,
          arrowIconDesktopImg.alt,
          false,
          [{ width: '750' }]
        );
        moveInstrumentation(arrowIconDesktopImg, optimizedArrowIconDesktopPic.querySelector('img'));
        arrowIconSpan.append(optimizedArrowIconDesktopPic);
      }
      menuLinkDiv.append(arrowIconSpan);
      listItem.append(menuLinkDiv);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      subMenusDiv.id = `headerItem${menuList.children.length}`;
      subMenusDiv.setAttribute('data-id', `headerItem${menuList.children.length}`);

      const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
      if (hierarchyRoot) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyTreeCell.innerHTML;
        moveInstrumentation(hierarchyTreeCell, tempDiv); // Instrument the original cell to the tempDiv

        const subMenuWrapper = document.createElement('ul');
        subMenuWrapper.classList.add(
          'header-comp__wrapper--sub-menu-group',
          'w-auto',
          'border-0',
          'pb-lg-0',
          'dropdown-menu',
          'p-0'
        );
        // Move all children from tempDiv to subMenuWrapper
        while (tempDiv.firstChild) {
          subMenuWrapper.append(tempDiv.firstChild);
        }
        transformNestedLists(subMenuWrapper); // Apply transformations to the moved hierarchy
        subMenusDiv.append(subMenuWrapper);
      }

      listItem.append(subMenusDiv);
      menuList.append(listItem);

      menuLinkDiv.addEventListener('click', () => {
        listItem.classList.toggle('show-nav');
        menuLinkDiv.classList.toggle('collapsed');
        subMenusDiv.classList.toggle('show');
      });
    } else if (cells.length === 5) {
      const [
        labelCell,
        linkCell,
        arrowIconDesktopCell,
        arrowIconMobileCell,
        hierarchyTreeCell,
      ] = cells;

      const listItem = document.createElement('li');
      listItem.classList.add(
        'header-comp__wrapper--sub-menu-item',
        'child-below'
      );
      moveInstrumentation(row, listItem);

      const menuLinkDiv = document.createElement('div');
      menuLinkDiv.classList.add(
        'header-comp__wrapper--menu-link',
        'mb-3',
        'mb-lg-0',
        'gap-4',
        'position-relative',
        'w-100',
        'd-flex',
        'align-items-center',
        'nav-link',
        'px-0',
        'dropdown-toggle',
        'font-18',
        'leading-24',
        'text-header-list',
        'text-lg-black'
      );
      menuLinkDiv.setAttribute('aria-current', 'page');
      menuLinkDiv.setAttribute('aria-expanded', 'false');

      const subMenuLinkDiv = document.createElement('div');
      subMenuLinkDiv.classList.add(
        'header-comp__wrapper--sub-menu-link',
        'dropdown-item',
        'p-lg-3',
        'mb-lg-3',
        'mb-xl-3',
        'leading-lg-24',
        'leading-xl-24',
        'font-default',
        'font-lg-18',
        'leading-lg-26',
        'leading-28',
        'ps-0',
        'p-0',
        'p-lg-3',
        'd-inline-block',
        'd-lg-flex',
        'justify-content-between',
        'align-items-center'
      );

      const linkAnchor = document.createElement('a');
      linkAnchor.classList.add('text-decoration-none', 'text-dark-gray-100');
      linkAnchor.href = linkCell.querySelector('a')?.href || '#';
      moveInstrumentation(linkCell, linkAnchor);

      const linkSpan = document.createElement('span');
      linkSpan.classList.add('sub-link-span');
      linkSpan.textContent = labelCell.textContent.trim();
      moveInstrumentation(labelCell, linkSpan);
      linkAnchor.append(linkSpan);

      subMenuLinkDiv.append(linkAnchor);

      const arrowIconRightSpan = document.createElement('span');
      arrowIconRightSpan.classList.add(
        'arrow-icon-right',
        'end-0',
        'd-none',
        'd-lg-inline'
      );
      const arrowIconDesktopPicture = arrowIconDesktopCell.querySelector('picture');
      if (arrowIconDesktopPicture) {
        const arrowIconDesktopImg = arrowIconDesktopPicture.querySelector('img');
        const optimizedArrowIconDesktopPic = createOptimizedPicture(
          arrowIconDesktopImg.src,
          arrowIconDesktopImg.alt,
          false,
          [{ width: '750' }]
        );
        moveInstrumentation(arrowIconDesktopImg, optimizedArrowIconDesktopPic.querySelector('img'));
        arrowIconRightSpan.append(optimizedArrowIconDesktopPic);
      }
      subMenuLinkDiv.append(arrowIconRightSpan);
      menuLinkDiv.append(subMenuLinkDiv);

      const arrowIconMobileSpan = document.createElement('span');
      arrowIconMobileSpan.classList.add('arrow-icon', 'd-lg-none', 'end-0'); // Removed redundant 'd-lg-none'
      const arrowIconMobilePicture = arrowIconMobileCell.querySelector('picture');
      if (arrowIconMobilePicture) {
        const arrowIconMobileImg = arrowIconMobilePicture.querySelector('img');
        const optimizedArrowIconMobilePic = createOptimizedPicture(
          arrowIconMobileImg.src,
          arrowIconMobileImg.alt,
          false,
          [{ width: '750' }]
        );
        moveInstrumentation(arrowIconMobileImg, optimizedArrowIconMobilePic.querySelector('img'));
        arrowIconMobileSpan.append(optimizedArrowIconMobilePic);
      }
      menuLinkDiv.append(arrowIconMobileSpan);
      listItem.append(menuLinkDiv);

      const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
      if (hierarchyRoot) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyTreeCell.innerHTML;
        moveInstrumentation(hierarchyTreeCell, tempDiv); // Instrument the original cell to the tempDiv

        const innerChildsDiv = document.createElement('div');
        innerChildsDiv.classList.add('d-lg-none', 'inner-childs');
        innerChildsDiv.id = `subNavItem${menuList.children.length}`;
        innerChildsDiv.setAttribute('data-id', `subNavItem${menuList.children.length}`);

        const subMenuWrapper = document.createElement('ul');
        subMenuWrapper.classList.add(
          'header-comp__wrapper--sub-menu-group',
          'w-auto',
          'border-0',
          'pb-lg-0',
          'dropdown-menu',
          'p-0'
        );
        // Move all children from tempDiv to subMenuWrapper
        while (tempDiv.firstChild) {
          subMenuWrapper.append(tempDiv.firstChild);
        }
        transformNestedLists(subMenuWrapper); // Apply transformations to the moved hierarchy
        innerChildsDiv.append(subMenuWrapper);
        listItem.append(innerChildsDiv);
      }
      menuList.append(listItem);

      menuLinkDiv.addEventListener('click', () => {
        listItem.classList.toggle('child-below');
      });
    }
  });

  menusWrapper.append(menuList);
  navWrapper.append(hamburgerButton, logoWrapper, menusWrapper);
  nav.append(navWrapper);
  containerDiv.append(nav, searchAccessWrapper);
  headerComp.append(containerDiv, headerOuterBox);

  block.replaceChildren(headerComp, globalSearchSection);

  hamburgerButton.addEventListener('click', () => {
    menusWrapper.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
  });

  searchIconDiv.addEventListener('click', () => {
    globalSearchSection.classList.toggle('d-none');
  });

  crossWrap.addEventListener('click', () => {
    globalSearchSection.classList.add('d-none');
  });
}
