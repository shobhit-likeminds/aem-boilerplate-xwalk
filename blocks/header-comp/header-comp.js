import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...navItemRows] = [...block.children];

  block.classList.add('bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  block.append(containerDiv);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  containerDiv.append(nav);

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(wrapperDiv);

  // Hamburger button
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
  wrapperDiv.append(hamburgerButton);

  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');
  wrapperDiv.append(logoWrapper);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');
  const logoHref = logoLinkRow?.querySelector('a')?.href;
  if (logoHref) {
    logoLink.href = logoHref;
  } else {
    logoLink.href = '#';
  }
  logoLink.textContent = logoLinkLabelRow?.textContent.trim() || '';
  logoWrapper.append(logoLink);
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow?.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    if (logoImg) {
      const optimizedPic = createOptimizedPicture(logoImg.src, logoImg.alt, true, [{ width: '100' }]);
      optimizedPic.classList.add('header-comp__wrapper--image', 'h-100');
      logoLink.append(optimizedPic);
      moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    }
  }

  // Navigation menus
  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  wrapperDiv.append(navbarCollapse);

  const navUl = document.createElement('ul');
  navUl.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(navUl);

  navItemRows.forEach((row, index) => {
    const cells = [...row.children];
    const iconCell = cells.find((cell) => cell.querySelector('picture'));
    const linkCell = cells.find((cell) => cell.querySelector('a'));
    const labelCell = cells.find((cell) => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() !== '' && cell.textContent.trim() !== (linkCell?.textContent.trim() || ''));
    const linkLabelCell = cells.find((cell) => cell.textContent.trim() === (linkCell?.textContent.trim() || '') && cell !== labelCell);
    const subLinksCell = cells.find((cell) => cell.querySelector('ul'));

    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'position-relative');
    if (index % 2 === 0) {
      li.classList.add('left-division');
    } else {
      li.classList.add('right-division');
    }
    li.setAttribute('data-header-item-id', `leftHeaderItem${index}`);
    moveInstrumentation(row, li);

    const menuLinkDiv = document.createElement('div');
    menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const iconImg = iconPicture.querySelector('img');
      if (iconImg) {
        const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '24' }]);
        optimizedIconPic.classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        menuLinkDiv.append(optimizedIconPic);
        moveInstrumentation(iconCell, optimizedIconPic.querySelector('img'));
      }
    }

    const anchor = document.createElement('a');
    anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    anchor.setAttribute('data-link-region', 'Header');
    const linkHref = linkCell?.querySelector('a')?.href;
    if (linkHref) {
      anchor.href = linkHref;
    } else {
      anchor.href = '#';
    }
    const span = document.createElement('span');
    span.classList.add('link-span');
    span.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim() || '';
    anchor.append(span);
    menuLinkDiv.append(anchor);
    moveInstrumentation(linkCell, anchor);

    const subLinksUl = subLinksCell?.querySelector('ul');
    if (subLinksUl) {
      li.classList.add('dropdown', 'show-nav'); // Add dropdown classes if sub-links exist
      menuLinkDiv.classList.add('dropdown-toggle');
      menuLinkDiv.setAttribute('aria-expanded', 'false');

      const toggleDropDown = document.createElement('span');
      toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const arrowImg = document.createElement('img');
      arrowImg.alt = 'svg file';
      // Use a placeholder for the arrow image as it's not in the block model
      // In a real scenario, this would come from a dedicated field or a global asset
      arrowImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgMTBMMTIgMTVMMTcgMTBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K';
      toggleDropDown.append(arrowImg);
      menuLinkDiv.append(toggleDropDown);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      subMenusDiv.id = `leftHeaderItem${index}`;
      subMenusDiv.setAttribute('data-id', `leftHeaderItem${index}`);

      // Transform nested lists within subLinksUl
      const transformNestedLists = (rootUl) => {
        rootUl.querySelectorAll('li').forEach((subLi) => {
          const nested = subLi.querySelector(':scope > ul');
          if (nested) {
            nested.remove();
            const subWrap = document.createElement('div');
            subWrap.classList.add('inner-childs');
            subWrap.append(nested);
            subLi.append(subWrap);

            const subTrigger = subLi.querySelector(':scope > .header-comp__wrapper--menu-link') || subLi.querySelector(':scope > a') || subLi;
            subTrigger.classList.add('dropdown-toggle');
            subTrigger.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              subLi.classList.toggle('child-below');
              subLi.classList.toggle('show-nav');
              subWrap.classList.toggle('show');
            });
          }
        });
      };

      transformNestedLists(subLinksUl);

      const headerSubMenuDiv = document.createElement('div');
      headerSubMenuDiv.classList.add('headerSubMenu');
      headerSubMenuDiv.append(subLinksUl);
      subLinksUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');

      const subMenuTriParent = document.createElement('div');
      subMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');
      subMenuTriParent.append(...subLinksUl.children); // Move children from subLinksUl to tri-parent
      subLinksUl.append(subMenuTriParent); // Append the tri-parent back to subLinksUl

      subMenusDiv.append(headerSubMenuDiv);
      li.append(subMenusDiv);

      menuLinkDiv.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('show-nav');
        subMenusDiv.classList.toggle('show');
      });
    }

    li.prepend(menuLinkDiv);
    navUl.append(li);
  });

  // Search and access
  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  containerDiv.append(searchAccessDiv);

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');
  searchAccessDiv.append(searchDiv);

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  const searchImg = document.createElement('img');
  searchImg.alt = 'svg file';
  // Placeholder for search icon
  searchImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1LjUgMTRIMTQuNzFMMTQuNDMgMTMuNzFMMTguMzkgMTcuNjdMMTcuNjcgMTguMzlMMTMuNzEgMTQuNDNMMTMuNDMgMTQuNzFWMTUuNUwxOCAxOS41TDE5LjUgMThMMUExLjUgMS41IDAgMCAwIDAgMTYuNUwxLjUgMTUuNUgxNS41VjE0WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
  searchIconDiv.append(searchImg);
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('d-none', 'd-lg-block');
  searchSpan.textContent = 'Search';
  searchIconDiv.append(searchSpan);
  searchDiv.append(searchIconDiv);

  const outerBoxDiv = document.createElement('div');
  outerBoxDiv.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  block.append(outerBoxDiv);

  // Event listener for hamburger button
  hamburgerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
  });

  // Event listener for search icon
  searchIconDiv.addEventListener('click', () => {
    const globalSearch = document.querySelector('.global-search');
    if (globalSearch) {
      globalSearch.classList.toggle('d-none');
    }
  });
}
