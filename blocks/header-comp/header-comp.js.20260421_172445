import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Add classes to li, a, ul elements based on ORIGINAL HTML
    li.classList.add('header-comp__wrapper--sub-menu-item');
    if (anchor) {
      anchor.classList.add('text-decoration-none', 'text-dark-gray-100');
      const span = anchor.querySelector('span');
      if (span) span.classList.add('sub-link-span');
    }
    if (nested) {
      nested.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
    }

    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        span.classList.add('sub-link-span'); // Added class
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
  const [logoRow, logoLinkRow, ...itemRows] = [...block.children];

  const headerCompSection = document.createElement('section');
  headerCompSection.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  headerCompSection.append(containerDiv);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  containerDiv.append(nav);

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(wrapperDiv);

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
  wrapperDiv.append(hamburgerButton);

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  wrapperDiv.append(logoWrapper);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
  }
  moveInstrumentation(logoRow, logoLink);
  logoWrapper.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  wrapperDiv.append(navbarCollapse);

  hamburgerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
  });

  const menuList = document.createElement('ul');
  menuList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(menuList);

  itemRows.forEach((row, index) => {
    const [iconCell, labelCell, linkCell, hierarchyCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0');

    if (index % 2 === 0) {
      li.classList.add('left-division');
    } else {
      li.classList.add('right-division');
    }

    const menuLinkWrapper = document.createElement('div');
    menuLinkWrapper.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
    menuLinkWrapper.setAttribute('aria-current', 'page');

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      menuLinkWrapper.append(optimizedPic);
    }
    moveInstrumentation(iconCell, menuLinkWrapper);

    const menuAnchor = document.createElement('a');
    menuAnchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    menuAnchor.setAttribute('data-link-region', 'Header');
    menuAnchor.href = linkCell.querySelector('a')?.href || '#';
    moveInstrumentation(linkCell, menuAnchor);

    const linkSpan = document.createElement('span');
    linkSpan.classList.add('link-span');
    linkSpan.textContent = labelCell.textContent.trim();
    menuAnchor.append(linkSpan);
    moveInstrumentation(labelCell, linkSpan);

    menuLinkWrapper.append(menuAnchor);

    const hierarchyRoot = hierarchyCell.querySelector('ul');
    if (hierarchyRoot) {
      li.classList.add('dropdown', 'show-nav', 'border-lg-0', 'position-relative');
      menuLinkWrapper.classList.add('dropdown-toggle');
      menuLinkWrapper.setAttribute('aria-expanded', 'false');

      const toggleDropDown = document.createElement('span');
      toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const toggleIcon = document.createElement('img');
      toggleIcon.alt = 'svg file';
      // TODO: This SVG path was hardcoded. It should be an authored asset.
      toggleIcon.src = '/etc.clientlibs/aemigrate/clientlibs/clientlib-site/resources/images/arrow-down.svg';
      toggleDropDown.append(toggleIcon);
      menuLinkWrapper.append(toggleDropDown);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      // Move instrumentation for the hierarchy cell before moving its children
      moveInstrumentation(hierarchyCell, subMenusDiv);
      subMenusDiv.append(hierarchyRoot);
      transformNestedLists(hierarchyRoot);
      li.append(subMenusDiv);

      menuLinkWrapper.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('show-nav');
        menuLinkWrapper.classList.toggle('collapsed');
        menuLinkWrapper.setAttribute('aria-expanded', li.classList.contains('show-nav'));
      });
    } else {
      menuLinkWrapper.setAttribute('aria-expanded', 'false');
    }

    li.append(menuLinkWrapper);
    menuList.append(li);
    moveInstrumentation(row, li);
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

  const searchIconImg = document.createElement('img');
  searchIconImg.alt = 'svg file';
  // TODO: This SVG path was hardcoded. It should be an authored asset.
  searchIconImg.src = '/etc.clientlibs/aemigrate/clientlibs/clientlib-site/resources/images/search-icon.svg';
  searchIconDiv.append(searchIconImg);

  const searchSpan = document.createElement('span');
  searchSpan.classList.add('d-none', 'd-lg-block');
  searchSpan.textContent = 'Search';
  searchIconDiv.append(searchSpan);

  const outerBoxDiv = document.createElement('div');
  outerBoxDiv.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerCompSection.append(outerBoxDiv);

  const globalSearchSection = document.createElement('section');
  globalSearchSection.classList.add('global-search', 'position-fixed', 'w-100', 'd-none');
  const globalSearchWrapper = document.createElement('div');
  globalSearchWrapper.classList.add('w-100', 'z-4', 'global-search__wrapper', 'pb-md-5', 'pb-lg-6', 'pt-lg-0', 'pt-md-0', 'pt-2', 'pb-2');
  globalSearchSection.append(globalSearchWrapper);

  const globalSearchFlex = document.createElement('div');
  globalSearchFlex.classList.add('d-flex', 'justify-content-center', 'h-100');
  globalSearchWrapper.append(globalSearchFlex);

  const crossWrapDiv = document.createElement('div');
  crossWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const crossWrapInner = document.createElement('div');
  crossWrapInner.classList.add('cross-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  const crossImg = document.createElement('img');
  crossImg.alt = 'svg file';
  // TODO: This SVG path was hardcoded. It should be an authored asset.
  crossImg.src = '/etc.clientlibs/aemigrate/clientlibs/clientlib-site/resources/images/cross-icon.svg';
  crossWrapInner.append(crossImg);
  crossWrapDiv.append(crossWrapInner);
  globalSearchFlex.append(crossWrapDiv);

  const searchFormDiv = document.createElement('div');
  searchFormDiv.classList.add('global-search__wrapper--form', 'd-flex', 'align-items-center', 'justify-content-center');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('global-search__wrapper--form-input', 'pb-1', 'pb-md-1', 'pb-lg-3', 'px-lg-4');
  searchInput.placeholder = 'Start typing...';
  searchInput.setAttribute('data-path', '/content/svasti/in/en');
  searchInput.setAttribute('data-limit', '5');
  searchInput.setAttribute('data-error', '<p><b>Sorry, we cannot find what you are looking for :(</b></p><p>&nbsp;</p><p>Please try a new search term or browse through one of our product categories.</p>');
  searchFormDiv.append(searchInput);
  globalSearchFlex.append(searchFormDiv);

  const searchWrapDiv = document.createElement('div');
  searchWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const searchWrapInner = document.createElement('div');
  searchWrapInner.classList.add('search-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  const searchWrapImg = document.createElement('img');
  searchWrapImg.alt = 'svg file';
  // TODO: This SVG path was hardcoded. It should be an authored asset.
  searchWrapImg.src = '/etc.clientlibs/aemigrate/clientlibs/clientlib-site/resources/images/search-icon.svg';
  searchWrapInner.append(searchWrapImg);
  searchWrapDiv.append(searchWrapInner);
  globalSearchFlex.append(searchWrapDiv);

  const responseDiv = document.createElement('div');
  responseDiv.classList.add('d-flex', 'justify-content-center', 'w-100', 'close-on-click');
  const responseInner = document.createElement('div');
  responseInner.classList.add('global-search__response', 'd-flex', 'justify-content-start', 'z-4', 'bg-transparent');
  const resultsUl = document.createElement('ul');
  resultsUl.classList.add('global-search__response--results', 'm-0', 'w-100', 'd-none', 'pt-5', 'pb-5', 'px-9');
  responseInner.append(resultsUl);
  responseDiv.append(responseInner);
  globalSearchSection.append(responseDiv);

  searchIconDiv.addEventListener('click', () => {
    globalSearchSection.classList.remove('d-none');
  });

  crossWrapDiv.addEventListener('click', () => {
    globalSearchSection.classList.add('d-none');
  });

  block.replaceChildren(headerCompSection, globalSearchSection);

  headerCompSection.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
