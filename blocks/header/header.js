import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...navItemRows] = [...block.children];

  const headerSection = document.createElement('section');
  headerSection.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');

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

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-comp__wrapper--logo');

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  moveInstrumentation(logoLinkRow.firstElementChild, logoLink);
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  logoLink.setAttribute('data-link-region', 'Header');

  const logoImg = logoRow.querySelector('img');
  if (logoImg) {
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '100' }]);
    optimizedLogoPic.classList.add('header-comp__wrapper--image', 'h-100');
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    logoLink.append(optimizedLogoPic);
  }
  logoDiv.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';

  const navList = document.createElement('ul');
  navList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');

  hamburgerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
  });

  navItemRows.forEach((row, index) => {
    const cells = [...row.children];
    // Use content detection instead of index access
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() !== '' && cell.textContent.trim() !== linkCell?.textContent.trim());
    const linkLabelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() !== '' && cell.textContent.trim() !== labelCell?.textContent.trim());
    const subLinksCell = cells.find(cell => cell.innerHTML.includes('<ul') || cell.innerHTML.includes('<p>')); // Richtext for sublinks

    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'border-lg-0');
    li.setAttribute('data-header-item-id', `leftHeaderItem${index}`);
    moveInstrumentation(row, li);

    const menuLinkDiv = document.createElement('div');
    menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');

    if (iconCell) {
      const iconImg = iconCell.querySelector('img');
      if (iconImg) {
        const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '24' }]);
        optimizedIconPic.classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        moveInstrumentation(iconImg, optimizedIconPic.querySelector('img'));
        menuLinkDiv.append(optimizedIconPic);
      }
    }

    const anchor = document.createElement('a');
    anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    anchor.setAttribute('data-link-region', 'Header');
    anchor.href = linkCell?.querySelector('a')?.href || '#';

    const spanLink = document.createElement('span');
    spanLink.classList.add('link-span');
    spanLink.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim() || '';
    anchor.append(spanLink);
    menuLinkDiv.append(anchor);

    const subList = subLinksCell?.querySelector('ul');
    if (subList) {
      li.classList.add('dropdown', 'show-nav', 'position-relative', 'left-division');
      menuLinkDiv.classList.add('dropdown-toggle');
      menuLinkDiv.setAttribute('aria-expanded', 'false');

      const toggleDropDown = document.createElement('span');
      toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const arrowIcon = document.createElement('img');
      arrowIcon.alt = 'svg file';
      arrowIcon.src = '/content/dam/aemigrate/uploaded-folder/image/1776285254752.svg+xml'; // Corrected SVG path from original HTML
      toggleDropDown.append(arrowIcon);
      menuLinkDiv.append(toggleDropDown);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.id = `leftHeaderItem${index}`;
      subMenusDiv.classList.add('header-comp__sub-menus');

      const subMenuWrapper = document.createElement('div');
      subMenuWrapper.classList.add('xfpage', 'page', 'basicpage');

      const subMenuGrid = document.createElement('div');
      subMenuGrid.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');

      const headerSubMenuDiv = document.createElement('div');
      headerSubMenuDiv.classList.add('headerSubMenu', 'aem-GridColumn', 'aem-GridColumn--default--12');

      const subMenuGroup = document.createElement('ul');
      subMenuGroup.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');

      const subMenuTriParent = document.createElement('div');
      subMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');
      subMenuTriParent.append(subList); // Move the authored UL here

      // Transform nested lists for accordion behavior
      function transformNestedLists(rootUl) {
        rootUl.querySelectorAll('li').forEach(subLi => {
          const nested = subLi.querySelector(':scope > ul');
          if (nested) {
            nested.remove(); // Remove the original nested ul
            const subWrap = document.createElement('div');
            subWrap.classList.add('d-lg-none', 'inner-childs'); // Use classes from original HTML
            subWrap.append(nested);
            subLi.append(subWrap);

            const subTrigger = subLi.querySelector(':scope > .header-comp__wrapper--menu-link');
            if (subTrigger) {
              subTrigger.classList.add('dropdown-toggle');
              subTrigger.setAttribute('aria-expanded', 'false');

              const arrowIconSpan = document.createElement('span');
              arrowIconSpan.classList.add('arrow-icon', 'd-lg-none', 'end-0');
              const arrowIconImg = document.createElement('img');
              arrowIconImg.alt = 'svg file';
              arrowIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776285255139.svg+xml'; // Corrected SVG path from original HTML
              arrowIconSpan.append(arrowIconImg);
              subTrigger.append(arrowIconSpan);

              subTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                subLi.classList.toggle('child-below'); // Toggle class for styling
                subWrap.classList.toggle('show'); // Toggle class for visibility
                subTrigger.setAttribute('aria-expanded', subWrap.classList.contains('show'));
              });
            }
          }
        });
      }

      transformNestedLists(subList);

      subMenuTriParent.querySelectorAll('a').forEach(subAnchor => {
        subAnchor.classList.add('text-decoration-none', 'text-dark-gray-100');
        const subLinkSpan = document.createElement('span');
        subLinkSpan.classList.add('sub-link-span');
        subLinkSpan.textContent = subAnchor.textContent.trim();
        subAnchor.textContent = '';
        subAnchor.append(subLinkSpan);
      });

      subMenuGroup.append(subMenuTriParent);
      headerSubMenuDiv.append(subMenuGroup);
      subMenuGrid.append(headerSubMenuDiv);
      subMenuWrapper.append(subMenuGrid);
      subMenusDiv.append(subMenuWrapper);
      li.append(subMenusDiv);

      toggleDropDown.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('show-nav');
        subMenusDiv.classList.toggle('show');
        menuLinkDiv.setAttribute('aria-expanded', li.classList.contains('show-nav'));
      });
    } else {
      li.classList.add('no-child');
      menuLinkDiv.classList.remove('dropdown-toggle');
      menuLinkDiv.removeAttribute('aria-expanded');
    }

    li.prepend(menuLinkDiv);
    navList.append(li);
  });

  navbarCollapse.append(navList);
  wrapperDiv.append(hamburgerButton, logoDiv, navbarCollapse);
  nav.append(wrapperDiv);
  containerDiv.append(nav);

  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  const searchIconImg = document.createElement('img');
  searchIconImg.alt = 'svg file';
  searchIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776285255324.svg+xml'; // Corrected SVG path from original HTML
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('d-none', 'd-lg-block');
  searchSpan.textContent = 'Search';
  searchIconDiv.append(searchIconImg, searchSpan);
  searchDiv.append(searchIconDiv);
  searchAccessDiv.append(searchDiv);
  containerDiv.append(searchAccessDiv);

  const outerBoxDiv = document.createElement('div');
  outerBoxDiv.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');

  headerSection.append(containerDiv, outerBoxDiv);

  // Global search section (initially hidden)
  const globalSearchSection = document.createElement('section');
  globalSearchSection.classList.add('global-search', 'position-fixed', 'w-100', 'd-none');

  const globalSearchWrapper = document.createElement('div');
  globalSearchWrapper.classList.add('w-100', 'z-4', 'global-search__wrapper', 'pb-md-5', 'pb-lg-6', 'pt-lg-0', 'pt-md-0', 'pt-2', 'pb-2');

  const globalSearchFlex = document.createElement('div');
  globalSearchFlex.classList.add('d-flex', 'justify-content-center', 'h-100');

  const crossWrapDiv = document.createElement('div');
  crossWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const crossWrapInner = document.createElement('div');
  crossWrapInner.classList.add('cross-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  const crossImg = document.createElement('img');
  crossImg.alt = 'svg file';
  crossImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776285255457.svg+xml'; // Corrected SVG path from original HTML
  crossWrapInner.append(crossImg);
  crossWrapDiv.append(crossWrapInner);

  const searchFormDiv = document.createElement('div');
  searchFormDiv.classList.add('global-search__wrapper--form', 'd-flex', 'align-items-center', 'justify-content-center');
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('global-search__wrapper--form-input', 'pb-1', 'pb-md-1', 'pb-lg-3', 'px-lg-4');
  searchInput.placeholder = 'Start typing...';
  searchInput.setAttribute('data-path', '/content/svasti/in/en');
  searchInput.setAttribute('data-limit', '5');
  searchInput.setAttribute('data-error', '<p><b>Sorry, we cannot find what you are looking for :(</b></p>\n<p>&nbsp;</p>\n<p>Please try a new search term or browse through one of our product categories.</p>\n');
  searchFormDiv.append(searchInput);

  const searchWrapDiv = document.createElement('div');
  searchWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const searchWrapInner = document.createElement('div');
  searchWrapInner.classList.add('search-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  const searchWrapImg = document.createElement('img');
  searchWrapImg.alt = 'svg file';
  searchWrapImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776285257294.svg+xml'; // Corrected SVG path from original HTML
  searchWrapInner.append(searchWrapImg);
  searchWrapDiv.append(searchWrapInner);

  globalSearchFlex.append(crossWrapDiv, searchFormDiv, searchWrapDiv);
  globalSearchWrapper.append(globalSearchFlex);
  globalSearchSection.append(globalSearchWrapper);

  const globalSearchResponseDiv = document.createElement('div');
  globalSearchResponseDiv.classList.add('d-flex', 'justify-content-center', 'w-100', 'close-on-click');
  const globalSearchResponseInner = document.createElement('div');
  globalSearchResponseInner.classList.add('global-search__response', 'd-flex', 'justify-content-start', 'z-4', 'bg-transparent');
  const globalSearchResultsUl = document.createElement('ul');
  globalSearchResultsUl.classList.add('global-search__response--results', 'm-0', 'w-100', 'd-none', 'pt-5', 'pb-5', 'px-9');
  globalSearchResponseInner.append(globalSearchResultsUl);
  globalSearchResponseDiv.append(globalSearchResponseInner);
  globalSearchSection.append(globalSearchResponseDiv);

  // Event listeners for search
  searchIconDiv.addEventListener('click', () => {
    globalSearchSection.classList.remove('d-none');
    document.body.style.overflow = 'hidden';
  });

  crossWrapInner.addEventListener('click', () => {
    globalSearchSection.classList.add('d-none');
    document.body.style.overflow = '';
  });

  globalSearchResponseDiv.addEventListener('click', (e) => {
    if (e.target === globalSearchResponseDiv) {
      globalSearchSection.classList.add('d-none');
      document.body.style.overflow = '';
    }
  });

  block.textContent = '';
  block.append(headerSection, globalSearchSection);
}
