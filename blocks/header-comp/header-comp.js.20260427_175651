import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    // Handle label-only nodes
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
      subWrap.classList.add('has-sub-child'); // use ORIGINAL HTML class
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
    logoRow,
    logoLinkRow,
    searchIconRow,
    searchLabelRow,
    ...itemRows
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add(
    'header-comp',
    'bg-red-100',
    'position-fixed',
    'top-0',
    'start-0',
    'z-2',
    'w-100',
  );

  const container = document.createElement('div');
  container.classList.add(
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

  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add(
    'navbar-toggler-icon',
    'd-flex',
    'flex-column',
    'justify-content-center',
    'align-items-center',
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
    'm-0',
  );
  logoLink.setAttribute('data-link-region', 'Header');
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    if (logoImg) {
      const optimizedLogo = createOptimizedPicture(
        logoImg.src,
        logoImg.alt,
        false,
        [{ width: '200' }],
      );
      moveInstrumentation(logoRow, optimizedLogo.querySelector('img'));
      optimizedLogo.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
      logoLink.append(optimizedLogo);
    }
  }
  logoWrapper.append(logoLink);

  const menusWrapper = document.createElement('div');
  menusWrapper.classList.add(
    'header-comp__wrapper--menus',
    'collapse',
    'navbar-collapse',
    'z-3',
  );
  menusWrapper.id = 'navbarSupportedContent';

  const menuList = document.createElement('ul');
  menuList.classList.add(
    'header-comp__wrapper--menus-groups',
    'navbar-nav',
    'me-auto',
    'mb-2',
    'mb-lg-0',
    'w-100',
  );

  // Separate item rows based on their structure
  const navigationItems = itemRows.filter((row) => row.children.length === 5);
  const subNavigationItems = itemRows.filter((row) => row.children.length === 3);

  navigationItems.forEach((row, index) => {
    const [iconCell, labelCell, linkCell, dropdownArrowIconCell, hierarchyCell] = [...row.children];
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
      'border-lg-0',
      'show-nav',
      'position-relative',
    );
    li.setAttribute('data-header-item-id', `leftHeaderItem${index}`);
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

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const iconImg = iconPicture.querySelector('img');
      if (iconImg) {
        const optimizedIcon = createOptimizedPicture(
          iconImg.src,
          iconImg.alt,
          false,
          [{ width: '30' }],
        );
        optimizedIcon.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        menuLinkDiv.append(optimizedIcon);
      }
    }

    const anchor = document.createElement('a');
    anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    anchor.setAttribute('data-link-region', 'Header');
    anchor.href = linkCell.querySelector('a')?.href || '#';

    const spanLink = document.createElement('span');
    spanLink.classList.add('link-span');
    spanLink.textContent = labelCell.textContent.trim();
    anchor.append(spanLink);
    menuLinkDiv.append(anchor);

    const hierarchyRootUl = hierarchyCell.querySelector('ul');
    if (hierarchyRootUl) {
      menuLinkDiv.classList.add('dropdown-toggle');
      menuLinkDiv.setAttribute('aria-expanded', 'false');

      const toggleArrow = document.createElement('span');
      toggleArrow.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const dropdownArrowPicture = dropdownArrowIconCell.querySelector('picture');
      if (dropdownArrowPicture) {
        const dropdownArrowImg = dropdownArrowPicture.querySelector('img');
        if (dropdownArrowImg) {
          const optimizedArrow = createOptimizedPicture(
            dropdownArrowImg.src,
            dropdownArrowImg.alt,
            false,
            [{ width: '20' }],
          );
          toggleArrow.append(optimizedArrow);
        }
      }
      menuLinkDiv.append(toggleArrow);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.id = `leftHeaderItem${index}`;
      subMenusDiv.classList.add('header-comp__sub-menus');

      const subMenuContainer = document.createElement('div');
      subMenuContainer.classList.add('xfpage', 'page', 'basicpage');
      const grid = document.createElement('div');
      grid.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');
      const gridColumn = document.createElement('div');
      gridColumn.classList.add('headerSubMenu', 'aem-GridColumn', 'aem-GridColumn--default--12');

      const subMenuGroup = document.createElement('ul');
      subMenuGroup.classList.add(
        'header-comp__wrapper--sub-menu-group',
        'w-auto',
        'border-0',
        'pb-lg-0',
        'dropdown-menu',
        'p-0',
      );

      const headerSubMenu = document.createElement('div');
      headerSubMenu.classList.add('header-comp__sub-menu', 'tri-parent');

      // Process the hierarchy-tree richtext content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from the original cell

      // Apply classes to nested elements as per ORIGINAL HTML
      tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0'));
      tempDiv.querySelectorAll('li').forEach(li => li.classList.add('header-comp__wrapper--sub-menu-item', 'child-below'));
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('text-decoration-none', 'text-dark-gray-100'));
      tempDiv.querySelectorAll('span.cmp-link__screen-reader-only').forEach(span => span.classList.add('cmp-link__screen-reader-only'));

      // Move the processed hierarchy content to the headerSubMenu
      while (tempDiv.firstChild) {
        headerSubMenu.append(tempDiv.firstChild);
      }

      // Process sub-navigation items (if any, though the model implies hierarchy-tree is the primary sub-nav)
      // The current implementation of subNavigationItems processing here is problematic
      // as it creates new elements instead of processing the hierarchy-tree.
      // Given the model, the hierarchy-tree is the source of sub-navigation.
      // The subNavigationItems filter is likely for a different type of sub-menu,
      // or it's a misunderstanding of how the hierarchy-tree is used.
      // For now, I'm assuming hierarchy-tree is the primary source and will keep the original subNavigationItems
      // loop as it was, but this might need further clarification if the model implies
      // these two types of sub-menus should be merged or handled differently.
      subNavigationItems.forEach((subRow, subIndex) => {
        const [subLabelCell, subLinkCell, subArrowIconCell] = [...subRow.children];
        const subLi = document.createElement('li');
        subLi.classList.add('header-comp__wrapper--sub-menu-item', 'child-below');
        subLi.setAttribute('data-child-id', `subNavItem${subIndex}`);
        moveInstrumentation(subRow, subLi);

        const subMenuLinkDiv = document.createElement('div');
        subMenuLinkDiv.classList.add(
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
          'text-lg-black',
        );

        const subMenuLinkInner = document.createElement('div');
        subMenuLinkInner.classList.add(
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
          'align-items-center',
        );

        const subAnchor = document.createElement('a');
        subAnchor.classList.add('text-decoration-none', 'text-dark-gray-100');
        subAnchor.href = subLinkCell.querySelector('a')?.href || '#';
        const subSpan = document.createElement('span');
        subSpan.classList.add('sub-link-span');
        subSpan.textContent = subLabelCell.textContent.trim();
        subAnchor.append(subSpan);
        subMenuLinkInner.append(subAnchor);

        const subArrowIconSpan = document.createElement('span');
        subArrowIconSpan.classList.add('arrow-icon-right', 'end-0', 'd-none', 'd-lg-inline');
        const subArrowPicture = subArrowIconCell.querySelector('picture');
        if (subArrowPicture) {
          const subArrowImg = subArrowPicture.querySelector('img');
          if (subArrowImg) {
            const optimizedSubArrow = createOptimizedPicture(
              subArrowImg.src,
              subArrowImg.alt,
              false,
              [{ width: '20' }],
            );
            subArrowIconSpan.append(optimizedSubArrow);
          }
        }
        subMenuLinkInner.append(subArrowIconSpan);
        subMenuLinkDiv.append(subMenuLinkInner);

        const mobileArrowIcon = document.createElement('span');
        mobileArrowIcon.classList.add('arrow-icon', 'd-lg-none', 'end-0');
        const mobileArrowPicture = subArrowIconCell.querySelector('picture');
        if (mobileArrowPicture) {
          const mobileArrowImg = mobileArrowPicture.querySelector('img');
          if (mobileArrowImg) {
            const optimizedMobileArrow = createOptimizedPicture(
              mobileArrowImg.src,
              mobileArrowImg.alt,
              false,
              [{ width: '20' }],
            );
            mobileArrowIcon.append(optimizedMobileArrow);
          }
        }
        subMenuLinkDiv.append(mobileArrowIcon);
        subLi.append(subMenuLinkDiv);

        const innerChildsDiv = document.createElement('div');
        innerChildsDiv.classList.add('d-lg-none', 'inner-childs');
        innerChildsDiv.id = `subNavItem${subIndex}`;
        innerChildsDiv.setAttribute('data-id', `subNavItem${subIndex}`);

        headerSubMenu.append(subLi);
      });

      subMenuGroup.append(headerSubMenu);
      gridColumn.append(subMenuGroup);
      grid.append(gridColumn);
      subMenuContainer.append(grid);
      subMenusDiv.append(subMenuContainer);

      li.append(menuLinkDiv, subMenusDiv);
    } else {
      li.append(menuLinkDiv); // No dropdown, just the link
    }
    menuList.append(li);
  });

  menusWrapper.append(menuList);

  headerWrapper.append(hamburgerButton, logoWrapper, menusWrapper);
  nav.append(headerWrapper);

  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');

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

  const searchPicture = searchIconRow.querySelector('picture');
  if (searchPicture) {
    const searchImg = searchPicture.querySelector('img');
    if (searchImg) {
      const optimizedSearchIcon = createOptimizedPicture(
        searchImg.src,
        searchImg.alt,
        false,
        [{ width: '20' }],
      );
      searchIconDiv.append(optimizedSearchIcon);
      moveInstrumentation(searchIconRow, optimizedSearchIcon.querySelector('img'));
    }
  }

  const searchLabelSpan = document.createElement('span');
  searchLabelSpan.classList.add('d-none', 'd-lg-block');
  searchLabelSpan.textContent = searchLabelRow.textContent.trim();
  searchIconDiv.append(searchLabelSpan);
  moveInstrumentation(searchLabelRow, searchLabelSpan);

  searchWrapper.append(searchIconDiv);
  searchAccessDiv.append(searchWrapper);

  container.append(nav, searchAccessDiv);

  const outerBox = document.createElement('div');
  outerBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');

  section.append(container, outerBox);

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
    'pb-2',
  );

  const globalSearchFlex = document.createElement('div');
  globalSearchFlex.classList.add('d-flex', 'justify-content-center', 'h-100');

  const crossWrapDiv = document.createElement('div');
  crossWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const crossWrapInner = document.createElement('div');
  crossWrapInner.classList.add('cross-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  const crossImg = document.createElement('img');
  crossImg.alt = 'Close icon';
  // Assuming a close icon is provided in the block data or a default path
  // For now, using a placeholder, ideally this would come from a block field.
  crossImg.src = '/icons/close-icon.svg'; // TODO: Get from block data if available
  crossWrapInner.append(crossImg);
  crossWrapDiv.append(crossWrapInner);

  const searchFormDiv = document.createElement('div');
  searchFormDiv.classList.add(
    'global-search__wrapper--form',
    'd-flex',
    'align-items-center',
    'justify-content-center',
  );
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add(
    'global-search__wrapper--form-input',
    'pb-1',
    'pb-md-1',
    'pb-lg-3',
    'px-lg-4',
  );
  searchInput.placeholder = 'Start typing...';
  searchInput.setAttribute('data-path', '/content/svasti/in/en'); // TODO: Get from block data if available
  searchInput.setAttribute('data-limit', '5'); // TODO: Get from block data if available
  searchInput.setAttribute('data-error', '<p><b>Sorry, we cannot find what you are looking for :(</b></p><p>&nbsp;</p><p>Please try a new search term or browse through one of our product categories.</p>'); // TODO: Get from block data if available
  searchFormDiv.append(searchInput);

  const searchWrapDiv = document.createElement('div');
  searchWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const searchWrapInner = document.createElement('div');
  searchWrapInner.classList.add('search-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  const searchImg = document.createElement('img');
  searchImg.alt = 'Search icon';
  // Assuming a search icon is provided in the block data or a default path
  // For now, using a placeholder, ideally this would come from a block field.
  searchImg.src = '/icons/search-icon.svg'; // TODO: Get from block data if available
  searchWrapInner.append(searchImg);
  searchWrapDiv.append(searchWrapInner);

  globalSearchFlex.append(crossWrapDiv, searchFormDiv, searchWrapDiv);
  globalSearchWrapper.append(globalSearchFlex);

  const globalSearchResponseDiv = document.createElement('div');
  globalSearchResponseDiv.classList.add(
    'd-flex',
    'justify-content-center',
    'w-100',
    'close-on-click',
  );
  const globalSearchResponseInner = document.createElement('div');
  globalSearchResponseInner.classList.add(
    'global-search__response',
    'd-flex',
    'justify-content-start',
    'z-4',
    'bg-transparent',
  );
  const resultsList = document.createElement('ul');
  resultsList.classList.add('global-search__response--results', 'm-0', 'w-100', 'd-none', 'pt-5', 'pb-5', 'px-9');
  globalSearchResponseInner.append(resultsList);
  globalSearchResponseDiv.append(globalSearchResponseInner);

  globalSearchSection.append(globalSearchWrapper, globalSearchResponseDiv);

  block.replaceChildren(section, globalSearchSection);

  // Event Listeners
  const navbarCollapse = block.querySelector('#navbarSupportedContent');
  hamburgerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
  });

  const searchIcon = block.querySelector('.header-comp__wrapper--search-icon');
  searchIcon.addEventListener('click', () => {
    globalSearchSection.classList.toggle('d-none');
    document.body.classList.toggle('overflow-hidden'); // Use document.body instead of block.querySelector('body')
  });

  block.querySelectorAll('.cross-wrap, .close-on-click').forEach((el) => {
    el.addEventListener('click', () => {
      globalSearchSection.classList.add('d-none');
      document.body.classList.remove('overflow-hidden'); // Use document.body
    });
  });

  block.querySelectorAll('.header-comp__wrapper--menu-link.dropdown-toggle').forEach((dropdownToggle) => {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parentLi = dropdownToggle.closest('.header-comp__wrapper--menu-item');
      if (parentLi) {
        parentLi.classList.toggle('show-nav');
        // The 'collapsed' class is typically for the button that toggles the collapse,
        // not the dropdown itself. Removing this toggle for the dropdown link.
        // dropdownToggle.classList.toggle('collapsed');
        dropdownToggle.setAttribute('aria-expanded', parentLi.classList.contains('show-nav') ? 'true' : 'false');
      }
    });
  });

  // Apply transformNestedLists to each hierarchy-tree submenu
  block.querySelectorAll('.header-comp__sub-menu ul').forEach(transformNestedLists);
}
