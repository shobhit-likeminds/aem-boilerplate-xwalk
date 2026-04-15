import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...navItemRows] = [...block.children];

  block.textContent = '';

  const headerSection = document.createElement('section');
  headerSection.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

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

  const togglerIconSpan = document.createElement('span');
  togglerIconSpan.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');

  const span1 = document.createElement('span');
  span1.classList.add('d-block', 'bg-white');
  const span2 = document.createElement('span');
  span2.classList.add('d-block', 'bg-white');
  const span3 = document.createElement('span');
  span3.classList.add('d-block', 'bg-white');

  togglerIconSpan.append(span1, span2, span3);
  toggler.append(togglerIconSpan);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-comp__wrapper--logo');

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '100' }]);
    optimizedLogoPic.classList.add('header-comp__wrapper--image', 'h-100');
    moveInstrumentation(logoRow, optimizedLogoPic.querySelector('img'));
    logoLink.append(optimizedLogoPic);
  } else {
    // If no picture, append the text content of the logo link label cell
    const logoLinkLabel = document.createElement('span');
    logoLinkLabel.textContent = logoLinkLabelRow.textContent.trim();
    logoLink.append(logoLinkLabel);
    moveInstrumentation(logoLinkLabelRow, logoLinkLabel);
  }
  logoDiv.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';

  const navList = document.createElement('ul');
  navList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');

  navItemRows.forEach((row, index) => {
    // CRITICAL: Replaced row.children[n] with named variables for clarity and robustness
    const cells = [...row.children];
    const iconCell = cells[0];
    const linkCell = cells[1];
    const linkLabelCell = cells[2];
    const subLinksCell = cells[3];

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

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const iconImg = iconPicture.querySelector('img');
      const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '24' }]); // Assuming small icon size
      optimizedIconPic.classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
      menuLinkDiv.append(optimizedIconPic);
      moveInstrumentation(iconCell, optimizedIconPic.querySelector('img'));
    }

    const anchor = document.createElement('a');
    anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
    anchor.setAttribute('data-link-region', 'Header');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    moveInstrumentation(linkCell, anchor);

    const linkSpan = document.createElement('span');
    linkSpan.classList.add('link-span');
    linkSpan.textContent = linkLabelCell.textContent.trim();
    anchor.append(linkSpan);
    menuLinkDiv.append(anchor);

    const subList = subLinksCell.querySelector('ul');
    if (subList) {
      li.classList.add('dropdown', 'show-nav');
      menuLinkDiv.classList.add('dropdown-toggle');
      menuLinkDiv.setAttribute('aria-expanded', 'false');

      const toggleDropDown = document.createElement('span');
      toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const arrowIconImg = document.createElement('img');
      arrowIconImg.alt = 'svg file';
      // Use a placeholder or default icon if the model doesn't provide one
      arrowIconImg.src = '/icons/arrow-down.svg'; // Placeholder, replace with actual icon if available in model
      toggleDropDown.append(arrowIconImg);
      menuLinkDiv.append(toggleDropDown);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      subMenusDiv.id = `leftHeaderItem${index}`;
      subMenusDiv.setAttribute('data-id', `leftHeaderItem${index}`);

      const subMenuContainer = document.createElement('div');
      subMenuContainer.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');

      const subMenuColumn = document.createElement('div');
      subMenuColumn.classList.add('headerSubMenu', 'aem-GridColumn', 'aem-GridColumn--default--12');

      const subMenuGroup = document.createElement('ul');
      subMenuGroup.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
      const subMenuTriParent = document.createElement('div');
      subMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');

      function transformNestedLists(rootUl) {
        rootUl.querySelectorAll('li').forEach((subLi, subLiIndex) => {
          subLi.classList.add('header-comp__wrapper--sub-menu-item');
          moveInstrumentation(subLi, subLi); // Move instrumentation from original li to new li

          const nestedUl = subLi.querySelector(':scope > ul');
          const subLiLink = subLi.querySelector(':scope > a'); // Check if the li itself contains a direct link

          const subMenuLinkDiv = document.createElement('div');
          subMenuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'mb-3', 'mb-lg-0', 'gap-4', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-18', 'leading-24', 'text-header-list', 'text-lg-black');
          subMenuLinkDiv.setAttribute('aria-current', 'page');

          const subMenuDropdownItem = document.createElement('div');
          subMenuDropdownItem.classList.add('header-comp__wrapper--sub-menu-link', 'dropdown-item', 'p-lg-3', 'mb-lg-3', 'mb-xl-3', 'leading-lg-24', 'leading-xl-24', 'font-default', 'font-lg-18', 'leading-lg-26', 'leading-28', 'ps-0', 'p-0', 'p-lg-3', 'd-inline-block', 'd-lg-flex', 'justify-content-between', 'align-items-center');

          const subAnchor = document.createElement('a');
          subAnchor.classList.add('text-decoration-none', 'text-dark-gray-100');
          if (subLiLink) {
            subAnchor.href = subLiLink.href;
            subAnchor.innerHTML = subLiLink.innerHTML; // Copy innerHTML to preserve span for label
            subLiLink.remove(); // Remove original link from li
          } else {
            subAnchor.textContent = subLi.firstChild?.textContent.trim() || ''; // Fallback to li text content
          }
          subMenuDropdownItem.append(subAnchor);

          if (nestedUl) {
            subLi.classList.add('child-below');
            subMenuLinkDiv.classList.add('dropdown-toggle');
            subMenuLinkDiv.setAttribute('aria-expanded', 'false');

            const arrowIconRight = document.createElement('span');
            arrowIconRight.classList.add('arrow-icon-right', 'end-0', 'd-none', 'd-lg-inline');
            const arrowImgRight = document.createElement('img');
            arrowImgRight.alt = 'svg file';
            arrowImgRight.src = '/icons/arrow-right.svg'; // Placeholder
            arrowIconRight.append(arrowImgRight);
            subMenuDropdownItem.append(arrowIconRight);

            const arrowIconMobile = document.createElement('span');
            arrowIconMobile.classList.add('arrow-icon', 'd-lg-none', 'end-0');
            const arrowImgMobile = document.createElement('img');
            arrowImgMobile.alt = 'svg file';
            arrowImgMobile.src = '/icons/arrow-down.svg'; // Placeholder
            arrowIconMobile.append(arrowImgMobile);
            subMenuLinkDiv.append(arrowIconMobile);

            const innerChildsDiv = document.createElement('div');
            innerChildsDiv.classList.add('d-lg-none', 'inner-childs');
            innerChildsDiv.id = `subNavItem${subLiIndex}`;
            innerChildsDiv.setAttribute('data-id', `subNavItem${subLiIndex}`);

            const innerXfpage = document.createElement('div');
            innerXfpage.classList.add('xfpage', 'page', 'basicpage');
            const innerGrid = document.createElement('div');
            innerGrid.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');
            const innerSubMenuColumn = document.createElement('div');
            innerSubMenuColumn.classList.add('headerSubMenu', 'aem-GridColumn', 'aem-GridColumn--default--12');
            const innerSubMenuGroup = document.createElement('ul');
            innerSubMenuGroup.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
            const innerSubMenuTriParent = document.createElement('div');
            innerSubMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');

            moveInstrumentation(nestedUl, innerSubMenuTriParent);
            while (nestedUl.firstChild) innerSubMenuTriParent.append(nestedUl.firstChild);
            transformNestedLists(innerSubMenuTriParent); // Recursively transform nested lists

            innerSubMenuGroup.append(innerSubMenuTriParent);
            innerSubMenuColumn.append(innerSubMenuGroup);
            innerGrid.append(innerSubMenuColumn);
            innerXfpage.append(innerGrid);
            innerChildsDiv.append(innerXfpage);

            subMenuLinkDiv.prepend(subMenuDropdownItem);
            subLi.append(subMenuLinkDiv, innerChildsDiv);

            subMenuLinkDiv.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              subLi.classList.toggle('active');
              innerChildsDiv.classList.toggle('active');
              subMenuLinkDiv.classList.toggle('active');
            });
          } else {
            subLi.classList.add('no-child');
            subMenuLinkDiv.prepend(subMenuDropdownItem);
            subLi.append(subMenuLinkDiv);
          }
          subLi.setAttribute('data-child-id', `subNavItem${subLiIndex}`);
          subMenuTriParent.append(subLi);
        });
      }

      moveInstrumentation(subLinksCell, subMenuTriParent);
      while (subLinksCell.firstChild) subMenuTriParent.append(subLinksCell.firstChild);
      transformNestedLists(subMenuTriParent);

      subMenuGroup.append(subMenuTriParent);
      subMenuColumn.append(subMenuGroup);
      subMenuContainer.append(subMenuColumn);
      subMenusDiv.append(subMenuContainer);

      li.append(menuLinkDiv, subMenusDiv);

      menuLinkDiv.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active');
        navbarCollapse.querySelectorAll('.header-comp__wrapper--menu-item').forEach((item) => {
          if (item !== li && item.classList.contains('dropdown')) {
            item.classList.remove('active');
            item.querySelector('.header-comp__sub-menus')?.classList.remove('active');
            item.querySelector('.header-comp__wrapper--menu-link')?.classList.remove('active');
          }
        });
        subMenusDiv.classList.toggle('active');
        menuLinkDiv.classList.toggle('active');
      });
    } else {
      li.classList.add('no-child');
      menuLinkDiv.setAttribute('aria-current', 'page');
      li.append(menuLinkDiv);
    }
    navList.append(li);
  });

  navbarCollapse.append(navList);
  navWrapper.append(toggler, logoDiv, navbarCollapse);
  nav.append(navWrapper);

  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  const searchIconImg = document.createElement('img');
  searchIconImg.alt = 'svg file';
  searchIconImg.src = '/icons/search.svg'; // Placeholder
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('d-none', 'd-lg-block');
  searchSpan.textContent = 'Search';
  searchIconDiv.append(searchIconImg, searchSpan);
  searchDiv.append(searchIconDiv);
  searchAccessDiv.append(searchDiv);

  containerDiv.append(nav, searchAccessDiv);

  const outerBoxDiv = document.createElement('div');
  outerBoxDiv.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');

  headerSection.append(containerDiv, outerBoxDiv);
  block.append(headerSection);

  // Toggle functionality for hamburger menu
  toggler.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    toggler.classList.toggle('collapsed');
    toggler.setAttribute('aria-expanded', navbarCollapse.classList.contains('show'));
  });

  // Add event listener for the search icon
  searchIconDiv.addEventListener('click', () => {
    // Implement search functionality here, e.g., toggle a search bar visibility
    console.log('Search icon clicked!');
    // Example: toggle a class on a search overlay
    // document.querySelector('.search-overlay').classList.toggle('active');
  });

  // Optimize all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
