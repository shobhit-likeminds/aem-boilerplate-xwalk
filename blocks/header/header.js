import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // CRITICAL: Check 0 - No row.children[n] for root rows, destructuring is fine here.
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...navItemRows] = [...block.children];

  const headerComp = document.createElement('section');
  headerComp.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

  const container = document.createElement('div');
  container.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');
  headerComp.append(container);

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');
  container.append(nav);

  const navWrapper = document.createElement('div');
  navWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');
  nav.append(navWrapper);

  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerButton.type = 'button';
  hamburgerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  hamburgerButton.setAttribute('aria-expanded', 'false');
  hamburgerButton.setAttribute('aria-label', 'Toggle navigation');

  const hamburgerIcon = document.createElement('span');
  hamburgerIcon.classList.add('navbar-toggler-icon', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center');
  ['d-block', 'd-block', 'd-block'].forEach((cls) => {
    const span = document.createElement('span');
    span.classList.add(cls, 'bg-white');
    hamburgerIcon.append(span);
  });
  hamburgerButton.append(hamburgerIcon);
  navWrapper.append(hamburgerButton);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-comp__wrapper--logo');
  navWrapper.append(logoDiv);

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoImg = logoRow.querySelector('img');
  if (logoImg) {
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, true, [{ width: '100' }]);
    optimizedLogoPic.classList.add('header-comp__wrapper--image', 'h-100');
    logoLink.append(optimizedLogoPic);
    moveInstrumentation(logoRow, optimizedLogoPic);
  }
  logoDiv.append(logoLink);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  navbarCollapse.id = 'navbarSupportedContent';
  navWrapper.append(navbarCollapse);

  const navList = document.createElement('ul');
  navList.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');
  navbarCollapse.append(navList);

  // INTERACTIVITY: Hamburger button toggle
  hamburgerButton.addEventListener('click', () => {
    navbarCollapse.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
  });

  navItemRows.forEach((row) => {
    // CRITICAL: Check 0 - Replaced row.children[n] with content detection.
    // CHECK 1: Structure alignment - Using content detection to find cells based on their content type.
    const cells = [...row.children];
    const imageCell = cells.find(cell => cell.querySelector('picture'));
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const subLinksCell = cells.find(cell => cell.querySelector('ul') || cell.innerHTML.includes('<p>')); // Richtext can be <p> or <ul>
    // Label and LinkLabel are text cells, distinguish them from linkCell by not having an <a>
    const textCells = cells.filter(cell => !cell.querySelector('picture') && !cell.querySelector('a') && !cell.querySelector('ul'));
    const labelCell = textCells[0]; // Assuming the first text cell is 'label'
    const linkLabelCell = textCells[1]; // Assuming the second text cell is 'linkLabel'

    const li = document.createElement('li');
    li.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'border-lg-0');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');

    if (subList) {
      li.classList.add('dropdown', 'flex-column', 'show-nav', 'position-relative', 'left-division');

      const menuLinkDiv = document.createElement('div');
      menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'dropdown-toggle', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
      menuLinkDiv.setAttribute('aria-current', 'page');
      menuLinkDiv.setAttribute('aria-expanded', 'false');

      const img = imageCell?.querySelector('img');
      if (img) {
        const optimizedImg = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        optimizedImg.classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        menuLinkDiv.append(optimizedImg);
        moveInstrumentation(imageCell, optimizedImg);
      }

      const anchor = document.createElement('a');
      anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
      anchor.setAttribute('data-link-region', 'Header');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }
      moveInstrumentation(linkCell, anchor);

      const spanLink = document.createElement('span');
      spanLink.classList.add('link-span');
      spanLink.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim();
      anchor.append(spanLink);
      menuLinkDiv.append(anchor);

      const toggleDropdown = document.createElement('span');
      toggleDropdown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
      const arrowImg = document.createElement('img');
      arrowImg.alt = 'svg file';
      arrowImg.src = '/icons/arrow-down.svg'; // Placeholder, replace with actual SVG path if available in model
      toggleDropdown.append(arrowImg);
      menuLinkDiv.append(toggleDropdown);
      li.append(menuLinkDiv);

      const subMenusDiv = document.createElement('div');
      subMenusDiv.classList.add('header-comp__sub-menus');
      const xfpageDiv = document.createElement('div');
      xfpageDiv.classList.add('xfpage', 'page', 'basicpage');
      const aemGridDiv = document.createElement('div');
      aemGridDiv.classList.add('aem-Grid', 'aem-Grid--12', 'aem-Grid--default--12');
      const headerSubMenuDiv = document.createElement('div');
      headerSubMenuDiv.classList.add('headerSubMenu', 'aem-GridColumn', 'aem-GridColumn--default--12');

      const subMenuGroup = document.createElement('ul');
      subMenuGroup.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0');
      const subMenuTriParent = document.createElement('div');
      subMenuTriParent.classList.add('header-comp__sub-menu', 'tri-parent');
      subMenuGroup.append(subMenuTriParent);

      const transformNestedLists = (rootUl) => {
        rootUl.querySelectorAll('li').forEach((subLi) => {
          const nested = subLi.querySelector(':scope > ul');
          if (nested) {
            nested.remove();
            const subWrap = document.createElement('div');
            subWrap.classList.add('inner-childs'); // Use class from original HTML
            subWrap.append(nested);
            subLi.append(subWrap);

            const trigger = subLi.querySelector(':scope > .header-comp__wrapper--menu-link') || subLi;
            trigger.classList.add('dropdown-toggle');
            // INTERACTIVITY: Nested dropdown toggle
            trigger.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              subLi.classList.toggle('child-below');
              subWrap.classList.toggle('show');
            });

            const arrowRight = document.createElement('span');
            arrowRight.classList.add('arrow-icon-right', 'end-0', 'd-none', 'd-lg-inline');
            const arrowRightImg = document.createElement('img');
            arrowRightImg.alt = 'svg file';
            arrowRightImg.src = '/icons/arrow-right.svg'; // Placeholder
            arrowRight.append(arrowRightImg);
            // Ensure .header-comp__wrapper--sub-menu-link exists before appending
            const subMenuLink = trigger.querySelector('.header-comp__wrapper--sub-menu-link');
            if (subMenuLink) {
              subMenuLink.append(arrowRight);
            }


            const arrowDown = document.createElement('span');
            arrowDown.classList.add('arrow-icon', 'd-lg-none', 'end-0');
            const arrowDownImg = document.createElement('img');
            arrowDownImg.alt = 'svg file';
            arrowDownImg.src = '/icons/arrow-down.svg'; // Placeholder
            arrowDown.append(arrowDownImg);
            trigger.append(arrowDown);
          } else {
            subLi.classList.add('no-child');
          }
        });
      };

      subMenuTriParent.innerHTML = subLinksCell.innerHTML;
      transformNestedLists(subMenuTriParent);

      headerSubMenuDiv.append(subMenuGroup);
      aemGridDiv.append(headerSubMenuDiv);
xfpageDiv.append(aemGridDiv);
      subMenusDiv.append(xfpageDiv);
      li.append(subMenusDiv);

      // INTERACTIVITY: Main dropdown toggle
      menuLinkDiv.addEventListener('click', () => {
        li.classList.toggle('show-nav');
        subMenusDiv.classList.toggle('show');
      });

    } else {
      li.classList.add('right-division'); // or other appropriate class if no sublinks

      const menuLinkDiv = document.createElement('div');
      menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
      menuLinkDiv.setAttribute('aria-current', 'page');

      const img = imageCell?.querySelector('img');
      if (img) {
        const optimizedImg = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        optimizedImg.classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
        menuLinkDiv.append(optimizedImg);
        moveInstrumentation(imageCell, optimizedImg);
      }

      const anchor = document.createElement('a');
      anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
      anchor.setAttribute('data-link-region', 'Header');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }
      moveInstrumentation(linkCell, anchor);

      const spanLink = document.createElement('span');
      spanLink.classList.add('link-span');
      spanLink.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim();
      anchor.append(spanLink);
      menuLinkDiv.append(anchor);
      li.append(menuLinkDiv);
    }
    navList.append(li);
  });

  const searchAccessDiv = document.createElement('div');
  searchAccessDiv.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');
  container.append(searchAccessDiv);

  const searchDiv = document.createElement('div');
  searchDiv.classList.add('header-comp__wrapper--search');
  searchAccessDiv.append(searchDiv);

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');
  const searchIconImg = document.createElement('img');
  searchIconImg.alt = 'svg file';
  searchIconImg.src = '/icons/search.svg'; // Placeholder for search icon
  searchIconDiv.append(searchIconImg);
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('d-none', 'd-lg-block');
  searchSpan.textContent = 'Search';
  searchIconDiv.append(searchSpan);
  searchDiv.append(searchIconDiv);

  // INTERACTIVITY: Search icon click (assuming it opens a search modal/overlay)
  // The original HTML shows a global-search section that is initially `d-none`.
  // We need to find the search icon and add an event listener to toggle the global search.
  const globalSearchSection = document.querySelector('.global-search');
  if (globalSearchSection) {
    searchIconDiv.addEventListener('click', () => {
      globalSearchSection.classList.toggle('d-none'); // Toggle visibility
      globalSearchSection.classList.toggle('show'); // Add 'show' if it's used for display
    });

    // Also add event listener for the cross-wrap to close the search
    const crossWrap = globalSearchSection.querySelector('.cross-wrap');
    if (crossWrap) {
      crossWrap.addEventListener('click', () => {
        globalSearchSection.classList.add('d-none');
        globalSearchSection.classList.remove('show');
      });
    }
  }


  const outerBoxDiv = document.createElement('div');
  outerBoxDiv.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');
  headerComp.append(outerBoxDiv);

  block.textContent = '';
  block.append(headerComp);
}
