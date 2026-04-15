import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...navItemRows] = [...block.children];

  block.classList.add('bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');

  const navWrapper = document.createElement('div');
  navWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');

  const toggler = document.createElement('button');
  toggler.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  toggler.type = 'button';
  toggler.setAttribute('aria-controls', 'navbarSupportedContent');
  toggler.setAttribute('aria-expanded', 'false');
  toggler.setAttribute('aria-label', 'Toggle navigation');

  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');

  ['d-block', 'd-block', 'd-block'].forEach(() => {
    const span = document.createElement('span');
    span.classList.add('d-block', 'bg-white');
    togglerIcon.append(span);
  });
  toggler.append(togglerIcon);

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');

  const logoAnchor = document.createElement('a');
  logoAnchor.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoAnchor.setAttribute('data-link-region', 'Header');

  const logoLink = logoLinkRow.querySelector('a');
  if (logoLink) {
    logoAnchor.href = logoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoAnchor);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '750' }]);
    optimizedLogoPic.querySelector('img').classList.add('header-comp__wrapper--image', 'h-100');
    moveInstrumentation(logoRow, optimizedLogoPic.querySelector('img'));
    logoAnchor.append(optimizedLogoPic);
  } else {
    const logoImg = document.createElement('img');
    logoImg.classList.add('header-comp__wrapper--image', 'h-100');
    logoImg.alt = logoLinkLabelRow.textContent.trim();
    logoAnchor.append(logoImg);
    moveInstrumentation(logoRow, logoAnchor);
  }

  logoWrapper.append(logoAnchor);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';

  const navUl = document.createElement('ul');
  navUl.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');

  navItemRows.forEach((row, index) => {
    const cells = [...row.children];
    // Use content detection instead of index access for nav item cells
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim().length > 0);
    const linkLabelCell = cells.find(cell => cell !== iconCell && cell !== linkCell && cell !== labelCell && cell.textContent.trim().length > 0);
    const subLinksCell = cells.find(cell => cell.querySelector('ul'));

    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'border-lg-0', 'position-relative');
    if (index % 2 === 0) {
      li.classList.add('left-division');
    } else {
      li.classList.add('right-division');
    }
    li.setAttribute('data-header-item-id', `leftHeaderItem${index}`);
    moveInstrumentation(row, li);

    const menuLinkDiv = document.createElement('div');
    menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');

    if (iconCell) {
      const iconPicture = iconCell.querySelector('picture');
      if (iconPicture) {
        const iconImg = iconPicture.querySelector('img');
        const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '750' }]);
        optimizedIconPic.querySelector('img').classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        menuLinkDiv.append(optimizedIconPic);
        moveInstrumentation(iconCell, optimizedIconPic.querySelector('img'));
      }
    }

    const anchor = document.createElement('a');
    anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    anchor.setAttribute('data-link-region', 'Header');
    const foundLink = linkCell ? linkCell.querySelector('a') : null;
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    moveInstrumentation(linkCell, anchor);

    const span = document.createElement('span');
    span.classList.add('link-span');
    span.textContent = (linkLabelCell ? linkLabelCell.textContent.trim() : '') || (labelCell ? labelCell.textContent.trim() : '');
    anchor.append(span);
    menuLinkDiv.append(anchor);

    const subList = subLinksCell ? subLinksCell.querySelector('ul') : null;
    if (subList) {
      li.classList.add('dropdown', 'show-nav');
      menuLinkDiv.classList.add('dropdown-toggle');
      menuLinkDiv.setAttribute('aria-expanded', 'false');

      const toggleDropDown = document.createElement('span');
      toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const toggleImg = document.createElement('img');
      toggleImg.alt = 'svg file';
      toggleImg.src = '/icons/arrow-down.svg';
      toggleDropDown.append(toggleImg);
      menuLinkDiv.append(toggleDropDown);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      subMenusDiv.id = `leftHeaderItem${index}`;
      moveInstrumentation(subLinksCell, subMenusDiv);

      const xfpage = document.createElement('div');
      xfpage.classList.add('xfpage', 'page', 'basicpage');
      const aemGrid = document.createElement('div');
      aemGrid.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');
      const headerSubMenuCol = document.createElement('div');
      headerSubMenuCol.classList.add('headerSubMenu', 'aem-GridColumn', 'aem-GridColumn--default--12');

      const subMenuUl = document.createElement('ul');
      subMenuUl.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
      const triParentDiv = document.createElement('div');
      triParentDiv.classList.add('header-comp__sub-menu', 'tri-parent');

      // Transform nested lists
      const transformNestedLists = (rootUl) => {
        [...rootUl.querySelectorAll('li')].forEach((subLi) => {
          const nested = subLi.querySelector(':scope > ul');
          if (nested) {
            nested.remove();
            const subWrap = document.createElement('div');
            subWrap.classList.add('inner-childs');
            subWrap.append(nested);
            subLi.append(subWrap);

            const trigger = subLi.querySelector(':scope > .header-comp__wrapper--menu-link') || subLi;
            trigger.classList.add('child-below');
            trigger.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              subLi.classList.toggle('active');
              subWrap.classList.toggle('active');
            });
          } else {
            subLi.classList.add('no-child');
          }
        });
      };

      transformNestedLists(subList);
      triParentDiv.append(subList);
      subMenuUl.append(triParentDiv);
      headerSubMenuCol.append(subMenuUl);
      aemGrid.append(headerSubMenuCol);
      xfpage.append(aemGrid);
      subMenusDiv.append(xfpage);
      li.append(subMenusDiv);

      menuLinkDiv.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('show-nav');
        menuLinkDiv.classList.toggle('collapsed');
        menuLinkDiv.setAttribute('aria-expanded', li.classList.contains('show-nav'));
        navbarCollapse.querySelectorAll('.header-comp__wrapper--menu-item').forEach((item) => {
          if (item !== li && item.classList.contains('show-nav')) {
            item.classList.remove('show-nav');
            const itemMenuLink = item.querySelector('.header-comp__wrapper--menu-link');
            if (itemMenuLink) {
              itemMenuLink.classList.add('collapsed');
              itemMenuLink.setAttribute('aria-expanded', 'false');
            }
          }
        });
      });
    }

    li.prepend(menuLinkDiv);
    navUl.append(li);
  });

  navbarCollapse.append(navUl);
  navWrapper.append(toggler, logoWrapper, navbarCollapse);
  nav.append(navWrapper);

  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  const searchImg = document.createElement('img');
  searchImg.alt = 'svg file';
  searchImg.src = '/icons/search.svg';
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('d-none', 'd-lg-block');
  searchSpan.textContent = 'Search';
  searchIconDiv.append(searchImg, searchSpan);
  searchDiv.append(searchIconDiv);
  searchAccessDiv.append(searchDiv);

  containerDiv.append(nav, searchAccessDiv);

  const outerBox = document.createElement('div');
  outerBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');

  block.textContent = '';
  block.append(containerDiv, outerBox);

  // Event listener for hamburger menu
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    toggler.classList.toggle('collapsed');
    toggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('show'));
  });

  // Event listener for search icon (assuming it should trigger some search functionality)
  searchIconDiv.addEventListener('click', () => {
    // Implement search functionality here, e.g., show/hide a search bar
    console.log('Search icon clicked!');
    // Example: toggle a search overlay or input field
    // document.querySelector('.search-overlay').classList.toggle('active');
  });

  // Optimize all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
