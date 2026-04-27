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
      subWrap.classList.add('inner-childs');
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.classList.add('dropdown-toggle');
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('child-below');
          subWrap.classList.toggle('active');
        });
      }
    }
  });
}

export default async function decorate(block) {
  const children = [...block.children];

  const [logoRow, logoLinkRow, ...itemRows] = children;

  const navigationItems = itemRows.filter(
    (row) => row.children.length === 6,
  );
  const searchIconItems = itemRows.filter(
    (row) => row.children.length === 2,
  );
  const globalSearchAssets = itemRows.filter(
    (row) => row.children.length === 4,
  );

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

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add(
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

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-comp__wrapper--logo');

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

  const logoImage = logoRow.querySelector('picture');
  if (logoImage) {
    const img = logoImage.querySelector('img');
    const optimizedPic = createOptimizedPicture(
      img.src,
      img.alt,
      false,
      [{ width: '750' }],
    );
    optimizedPic.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);

  const menusDiv = document.createElement('div');
  menusDiv.classList.add(
    'header-comp__wrapper--menus',
    'collapse',
    'navbar-collapse',
    'z-3',
  );

  const menuGroups = document.createElement('ul');
  menuGroups.classList.add(
    'header-comp__wrapper--menus-groups',
    'navbar-nav',
    'me-auto',
    'mb-2',
    'mb-lg-0',
    'w-100',
  );

  navigationItems.forEach((row, i) => {
    // Fixed schema: menuIcon, label, link, arrowIcon, subNavigation (container), hierarchy-tree (richtext)
    const [menuIconCell, labelCell, linkCell, arrowIconCell, , hierarchyCell] = [...row.children];

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
      'flex-column',
      'border-lg-0',
      'position-relative',
    );
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

    const menuIcon = menuIconCell.querySelector('picture');
    if (menuIcon) {
      const img = menuIcon.querySelector('img');
      const optimizedPic = createOptimizedPicture(
        img.src,
        img.alt,
        false,
        [{ width: '750' }],
      );
      optimizedPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      menuLinkDiv.append(optimizedPic);
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

    const hierarchyRoot = hierarchyCell.querySelector('ul');
    if (hierarchyRoot) {
      li.classList.add('dropdown', 'show-nav');
      menuLinkDiv.classList.add('dropdown-toggle');
      menuLinkDiv.setAttribute('aria-expanded', 'false');

      const arrowIconSpan = document.createElement('span');
      arrowIconSpan.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const arrowIcon = arrowIconCell.querySelector('picture');
      if (arrowIcon) {
        const img = arrowIcon.querySelector('img');
        const optimizedPic = createOptimizedPicture(
          img.src,
          img.alt,
          false,
          [{ width: '750' }],
        );
        optimizedPic.querySelector('img').alt = 'svg file';
        arrowIconSpan.append(optimizedPic);
      }
      menuLinkDiv.append(arrowIconSpan);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      subMenusDiv.setAttribute('data-id', `leftHeaderItem${i}`);
      subMenusDiv.id = `leftHeaderItem${i}`;

      const subMenuUl = document.createElement('ul');
      subMenuUl.classList.add(
        'header-comp__wrapper--sub-menu-group',
        'w-auto',
        'border-0',
        'pb-lg-0',
        'dropdown-menu',
        'p-0',
      );

      const subMenuDiv = document.createElement('div');
      subMenuDiv.classList.add('header-comp__sub-menu', 'tri-parent');
      // Move instrumentation from hierarchyCell to subMenuDiv
      moveInstrumentation(hierarchyCell, subMenuDiv);
      // Append children from hierarchyRoot (which is a <ul>) to subMenuDiv
      while (hierarchyRoot.firstChild) {
        subMenuDiv.append(hierarchyRoot.firstChild);
      }
      subMenuUl.append(subMenuDiv);
      subMenusDiv.append(subMenuUl);
      li.append(subMenusDiv);

      // Apply classes to nested elements from ORIGINAL HTML
      subMenuDiv.querySelectorAll('li').forEach(item => {
        item.classList.add('header-comp__wrapper--sub-menu-item');
        if (item.querySelector('ul')) {
          item.classList.add('child-below');
        } else {
          item.classList.add('no-child');
        }
      });
      subMenuDiv.querySelectorAll('a').forEach(a => {
        a.classList.add('text-decoration-none', 'text-dark-gray-100');
      });
      subMenuDiv.querySelectorAll('span').forEach(span => {
        if (span.textContent.trim()) {
          span.classList.add('sub-link-span');
        }
      });

      transformNestedLists(subMenuDiv); // Pass the div containing the ul

      menuLinkDiv.addEventListener('click', () => {
        li.classList.toggle('show-nav');
        subMenusDiv.classList.toggle('show');
        menuLinkDiv.setAttribute('aria-expanded', li.classList.contains('show-nav'));
      });
    }

    li.append(menuLinkDiv);
    menuGroups.append(li);
  });

  menusDiv.append(menuGroups);

  wrapperDiv.append(hamburgerButton, logoDiv, menusDiv);
  nav.append(wrapperDiv);
  containerDiv.append(nav);

  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');

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

  searchIconItems.forEach((row) => {
    // Fixed schema: searchIcon, searchLabel
    const [searchIconCell, searchLabelCell] = [...row.children];
    const searchIcon = searchIconCell.querySelector('picture');
    if (searchIcon) {
      const img = searchIcon.querySelector('img');
      const optimizedPic = createOptimizedPicture(
        img.src,
        img.alt,
        false,
        [{ width: '750' }],
      );
      optimizedPic.querySelector('img').alt = 'svg file';
      searchIconDiv.append(optimizedPic);
    }

    const searchLabelSpan = document.createElement('span');
    searchLabelSpan.classList.add('d-none', 'd-lg-block');
    searchLabelSpan.textContent = searchLabelCell.textContent.trim();
    searchIconDiv.append(searchLabelSpan);
    moveInstrumentation(row, searchIconDiv);
  });

  searchDiv.append(searchIconDiv);
  searchAccessDiv.append(searchDiv);
  containerDiv.append(searchAccessDiv);
  headerComp.append(containerDiv);

  const outerBox = document.createElement('div');
  outerBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerComp.append(outerBox);

  const globalDiv = document.createElement('div');
  globalDiv.classList.add('global');

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

  const globalSearchContent = document.createElement('div');
  globalSearchContent.classList.add('d-flex', 'justify-content-center', 'h-100');

  const crossWrapDiv = document.createElement('div');
  crossWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const crossWrapInner = document.createElement('div');
  crossWrapInner.classList.add('cross-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  const closeIcon = document.createElement('img');
  closeIcon.alt = 'svg file';
  crossWrapInner.append(closeIcon);
  crossWrapDiv.append(crossWrapInner);

  const formDiv = document.createElement('div');
  formDiv.classList.add('global-search__wrapper--form', 'd-flex', 'align-items-center', 'justify-content-center');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add(
    'global-search__wrapper--form-input',
    'pb-1',
    'pb-md-1',
    'pb-lg-3',
    'px-lg-4',
  );

  const searchWrapDiv = document.createElement('div');
  searchWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const searchWrapInner = document.createElement('div');
  searchWrapInner.classList.add('search-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  const searchIcon = document.createElement('img');
  searchIcon.alt = 'svg file';
  searchWrapInner.append(searchIcon);
  searchWrapDiv.append(searchWrapInner);

  globalSearchAssets.forEach((row) => {
    // Fixed schema: closeIcon, searchIcon, placeholderText, searchErrorText
    const [closeIconCell, searchIconCell, placeholderTextCell, searchErrorTextCell] = [...row.children];

    const closeIconPic = closeIconCell.querySelector('picture');
    if (closeIconPic) {
      const img = closeIconPic.querySelector('img');
      closeIcon.src = img.src;
    }

    const searchIconPic = searchIconCell.querySelector('picture');
    if (searchIconPic) {
      const img = searchIconPic.querySelector('img');
      searchIcon.src = img.src;
    }

    searchInput.placeholder = placeholderTextCell.textContent.trim();
    // Use innerHTML for richtext field 'searchErrorText'
    searchInput.setAttribute('data-error', searchErrorTextCell.innerHTML);
    moveInstrumentation(row, searchInput);
  });

  formDiv.append(searchInput);
  globalSearchContent.append(crossWrapDiv, formDiv, searchWrapDiv);
  globalSearchWrapper.append(globalSearchContent);
  globalSearchSection.append(globalSearchWrapper);

  const searchResponseDiv = document.createElement('div');
  searchResponseDiv.classList.add('d-flex', 'justify-content-center', 'w-100', 'close-on-click');
  const searchResponseInner = document.createElement('div');
  searchResponseInner.classList.add(
    'global-search__response',
    'd-flex',
    'justify-content-start',
    'z-4',
    'bg-transparent',
  );
  const resultsUl = document.createElement('ul');
  resultsUl.classList.add(
    'global-search__response--results',
    'm-0',
    'w-100',
    'd-none',
    'pt-5',
    'pb-5',
    'px-9',
  );
  searchResponseInner.append(resultsUl);
  searchResponseDiv.append(searchResponseInner);
  globalSearchSection.append(searchResponseDiv);
  globalDiv.append(globalSearchSection);

  searchIconDiv.addEventListener('click', () => {
    globalSearchSection.classList.toggle('d-none');
    globalSearchSection.classList.toggle('d-block');
  });

  crossWrapInner.addEventListener('click', () => {
    globalSearchSection.classList.toggle('d-block');
    globalSearchSection.classList.toggle('d-none');
  });

  hamburgerButton.addEventListener('click', () => {
    menusDiv.classList.toggle('collapse');
    menusDiv.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
    hamburgerButton.setAttribute('aria-expanded', !menusDiv.classList.contains('collapse'));
  });

  block.replaceChildren(headerComp, globalDiv);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
