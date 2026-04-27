import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoImageRow, logoLinkRow, ...itemRows] = [...block.children];

  const headerComp = document.createElement('section');
  headerComp.classList.add('header-comp', 'bg-red-100', 'position-fixed', 'top-0', 'start-0', 'z-2', 'w-100');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'gx-8', 'gx-sm-0', 'd-flex', 'justify-content-between', 'align-items-start', 'align-items-md-center');

  const nav = document.createElement('nav');
  nav.classList.add('header-nav', 'navbar', 'position-static', 'navbar-expand-lg');

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-comp__wrapper', 'container-fluid', 'justify-content-start', 'gx-4', 'gx-md-0');

  const hamburgerButton = document.createElement('button');
  hamburgerButton.classList.add('border-0', 'shadow-none', 'navbar-toggler', 'header-comp__wrapper--hamburger', 'collapsed', 'p-0');
  hamburgerButton.setAttribute('type', 'button');
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

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-comp__wrapper--logo');

  const logoLink = document.createElement('a');
  logoLink.classList.add('header-comp__wrapper--link', 'cta-analytics', 'navbar-brand', 'm-0');
  logoLink.setAttribute('data-link-region', 'Header');
  logoLink.href = logoLinkRow.querySelector('a')?.href || '#';
  moveInstrumentation(logoLinkRow, logoLink); // Move instrumentation for logoLinkRow

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '150' }]);
    const newLogoImg = optimizedLogoPic.querySelector('img');
    newLogoImg.classList.add('header-comp__wrapper--image', 'h-100');
    newLogoImg.setAttribute('loading', 'eager');
    moveInstrumentation(logoImageRow, newLogoImg);
    logoLink.append(optimizedLogoPic);
  }
  logoWrapper.append(logoLink);

  const menusWrapper = document.createElement('div');
  menusWrapper.classList.add('header-comp__wrapper--menus', 'collapse', 'navbar-collapse', 'z-3');
  menusWrapper.id = 'navbarSupportedContent';

  const menuGroups = document.createElement('ul');
  menuGroups.classList.add('header-comp__wrapper--menus-groups', 'navbar-nav', 'me-auto', 'mb-2', 'mb-lg-0', 'w-100');

  const searchAccess = document.createElement('div');
  searchAccess.classList.add('header-comp__wrapper--search-access', 'd-flex', 'py-4', 'py-lg-0');

  const searchWrapper = document.createElement('div');
  searchWrapper.classList.add('header-comp__wrapper--search');

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-comp__wrapper--search-icon', 'd-flex', 'flex-column', 'align-items-center', 'font-12', 'leading-20', 'text-white');

  const searchLabelSpan = document.createElement('span');
  searchLabelSpan.classList.add('d-none', 'd-lg-block');

  const globalSearchSection = document.createElement('section');
  globalSearchSection.classList.add('global-search', 'position-fixed', 'w-100', 'd-none');

  const globalSearchWrapper = document.createElement('div');
  globalSearchWrapper.classList.add('w-100', 'z-4', 'global-search__wrapper', 'pb-md-5', 'pb-lg-6', 'pt-lg-0', 'pt-md-0', 'pt-2', 'pb-2');

  const globalSearchInner = document.createElement('div');
  globalSearchInner.classList.add('d-flex', 'justify-content-center', 'h-100');

  const crossWrapDiv = document.createElement('div');
  crossWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const crossWrapInner = document.createElement('div');
  crossWrapInner.classList.add('cross-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  const crossImg = document.createElement('img');
  crossImg.alt = 'svg file';
  crossWrapInner.append(crossImg);
  crossWrapDiv.append(crossWrapInner);

  const searchForm = document.createElement('div');
  searchForm.classList.add('global-search__wrapper--form', 'd-flex', 'align-items-center', 'justify-content-center');
  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.classList.add('global-search__wrapper--form-input', 'pb-1', 'pb-md-1', 'pb-lg-3', 'px-lg-4');
  searchInput.setAttribute('placeholder', 'Start typing...');
  searchInput.setAttribute('data-path', '/content/svasti/in/en');
  searchInput.setAttribute('data-limit', '5');
  searchInput.setAttribute('data-error', '<p><b>Sorry, we cannot find what you are looking for :(</b></p>\n<p>&nbsp;</p>\n<p>Please try a new search term or browse through one of our product categories.</p>\n');
  searchForm.append(searchInput);

  const searchWrapDiv = document.createElement('div');
  searchWrapDiv.classList.add('d-lg-block', 'align-items-center', 'd-flex');
  const searchWrapInner = document.createElement('div');
  searchWrapInner.classList.add('search-wrap', 'd-flex', 'justify-content-center', 'align-items-center');
  const searchImg = document.createElement('img');
  searchImg.alt = 'svg file';
  searchWrapInner.append(searchImg);
  searchWrapDiv.append(searchWrapInner);

  globalSearchInner.append(crossWrapDiv, searchForm, searchWrapDiv);
  globalSearchWrapper.append(globalSearchInner);

  const globalSearchResponse = document.createElement('div');
  globalSearchResponse.classList.add('d-flex', 'justify-content-center', 'w-100', 'close-on-click');
  const globalSearchResponseInner = document.createElement('div');
  globalSearchResponseInner.classList.add('global-search__response', 'd-flex', 'justify-content-start', 'z-4', 'bg-transparent');
  const globalSearchResults = document.createElement('ul');
  globalSearchResults.classList.add('global-search__response--results', 'm-0', 'w-100', 'd-none', 'pt-5', 'pb-5', 'px-9');
  globalSearchResponseInner.append(globalSearchResults);
  globalSearchResponse.append(globalSearchResponseInner);

  globalSearchSection.append(globalSearchWrapper, globalSearchResponse);

  const headerOuterBox = document.createElement('div');
  headerOuterBox.classList.add('header__outer-box', 'position-absolute', 'w-100', 'z-2', 'start-0', 'd-lg-none');

  const transformNestedLists = (rootUl) => {
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
        subWrap.classList.add('has-sub-child');
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
        transformNestedLists(nested);
      }
    });
  };

  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 6) { // navigation-menu-item
      const iconImageCell = cells.find(cell => cell.querySelector('picture'));
      const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() !== 'Sub Menu Items value');
      const linkCell = cells.find(cell => cell.querySelector('a') && cell.textContent.includes('/content/site/link'));
      const arrowIconCell = cells.find(cell => cell.querySelector('picture') && cell !== iconImageCell);
      const hierarchyTreeCell = cells.find(cell => cell.querySelector('ul'));

      const menuItem = document.createElement('li');
      menuItem.classList.add('header-comp__wrapper--menu-item', 'h-100', 'd-flex', 'align-items-center', 'nav-item', 'p-4', 'p-lg-0', 'border-bottom-lg-0', 'dropdown', 'flex-column', 'border-lg-0', 'show-nav', 'position-relative', 'left-division');
      moveInstrumentation(row, menuItem);

      const menuLinkDiv = document.createElement('div');
      menuLinkDiv.classList.add('header-comp__wrapper--menu-link', 'gap-6', 'gap-lg-1', 'position-relative', 'w-100', 'd-flex', 'align-items-center', 'nav-link', 'px-0', 'font-default', 'leading-28', 'leading-lg-26', 'text-header-list', 'text-lg-cream-100');
      menuLinkDiv.setAttribute('aria-current', 'page');

      if (iconImageCell) {
        const iconPicture = iconImageCell.querySelector('picture');
        if (iconPicture) {
          const menuIconImg = iconPicture.querySelector('img');
          const optimizedMenuIconPic = createOptimizedPicture(menuIconImg.src, menuIconImg.alt, false, [{ width: '40' }]);
          const newMenuIconImg = optimizedMenuIconPic.querySelector('img');
          newMenuIconImg.classList.add('header-comp__wrapper--menu-image', 'd-lg-none');
          newMenuIconImg.setAttribute('loading', 'eager');
          moveInstrumentation(iconImageCell, newMenuIconImg);
          menuLinkDiv.append(optimizedMenuIconPic);
        }
      }

      const anchor = document.createElement('a');
      anchor.classList.add('text-decoration-none', 'cta-analytics', 'header-comp__wrapper--link');
      anchor.setAttribute('data-link-region', 'Header');
      anchor.href = linkCell?.querySelector('a')?.href || '#';
      if (linkCell) moveInstrumentation(linkCell, anchor);

      const spanLink = document.createElement('span');
      spanLink.classList.add('link-span');
      spanLink.textContent = labelCell?.textContent.trim() || '';
      if (labelCell) moveInstrumentation(labelCell, spanLink);
      anchor.append(spanLink);
      menuLinkDiv.append(anchor);

      if (hierarchyTreeCell) {
        const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
        if (hierarchyRoot) {
          menuLinkDiv.classList.add('dropdown-toggle');
          menuLinkDiv.setAttribute('aria-expanded', 'false');

          const toggleDropDown = document.createElement('span');
          toggleDropDown.classList.add('toggle-drop-down', 'arrow-icon', 'd-flex', 'end-0', 'top-parent');
          if (arrowIconCell) {
            const arrowIconPicture = arrowIconCell.querySelector('picture');
            if (arrowIconPicture) {
              const arrowImg = arrowIconPicture.querySelector('img');
              const optimizedArrowPic = createOptimizedPicture(arrowImg.src, arrowImg.alt, false, [{ width: '20' }]);
              optimizedArrowPic.querySelector('img').alt = 'svg file';
              moveInstrumentation(arrowIconCell, optimizedArrowPic.querySelector('img'));
              toggleDropDown.append(optimizedArrowPic);
            }
          }
          menuLinkDiv.append(toggleDropDown);

          const subMenusDiv = document.createElement('div');
          subMenusDiv.classList.add('header-comp__sub-menus');
          
          // Create a temporary div to hold the innerHTML and apply instrumentation
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = hierarchyTreeCell.innerHTML;
          moveInstrumentation(hierarchyTreeCell, tempDiv); // Move instrumentation for the original richtext cell
          
          // Apply classes to nested elements from ORIGINAL HTML
          tempDiv.querySelectorAll('a').forEach(a => a.classList.add('text-decoration-none', 'text-dark-gray-100'));
          tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('header-comp__wrapper--sub-menu-group', 'w-auto', 'border-0', 'pb-lg-0', 'dropdown-menu', 'p-0'));
          tempDiv.querySelectorAll('li').forEach(li => li.classList.add('header-comp__wrapper--sub-menu-item'));

          // Move children from tempDiv to subMenusDiv
          while (tempDiv.firstChild) {
            subMenusDiv.append(tempDiv.firstChild);
          }

          transformNestedLists(subMenusDiv.querySelector('ul')); // Transform the actual UL
          menuItem.append(menuLinkDiv, subMenusDiv);

          menuLinkDiv.addEventListener('click', () => {
            menuItem.classList.toggle('show-nav');
            menuLinkDiv.classList.toggle('collapsed');
            menuLinkDiv.setAttribute('aria-expanded', menuItem.classList.contains('show-nav'));
          });
        } else {
          menuItem.append(menuLinkDiv);
        }
      } else {
        menuItem.append(menuLinkDiv);
      }
      menuGroups.append(menuItem);
    } else if (cells.length === 5) { // sub-menu-item
      const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a') && cell.textContent.trim() !== 'Sub Sub Menu Items value');
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const arrowIconDesktopCell = cells.find(cell => cell.querySelector('picture') && cell.textContent.trim() === 'Arrow Icon (Desktop) value');
      const arrowIconMobileCell = cells.find(cell => cell.querySelector('picture') && cell.textContent.trim() === 'Arrow Icon (Mobile) value');

      // This logic is for sub-menu-items, which are nested within navigation-menu-items.
      // The current structure creates them as top-level items, which is incorrect.
      // This part of the code needs to be refactored to be called from within the transformNestedLists
      // or a similar recursive function that builds the nested structure.
      // For now, we'll just move instrumentation and skip rendering them at the top level.
      if (labelCell) moveInstrumentation(labelCell, document.createElement('span'));
      if (linkCell) moveInstrumentation(linkCell, document.createElement('a'));
      if (arrowIconDesktopCell) moveInstrumentation(arrowIconDesktopCell, document.createElement('img'));
      if (arrowIconMobileCell) moveInstrumentation(arrowIconMobileCell, document.createElement('img'));
      // The 'Sub Sub Menu Items value' cell is a container and its instrumentation should be moved.
      const subSubMenuItemsCell = cells.find(cell => cell.textContent.trim() === 'Sub Sub Menu Items value');
      if (subSubMenuItemsCell) moveInstrumentation(subSubMenuItemsCell, document.createElement('div'));

    } else if (cells.length === 2 && !cells[0].querySelector('picture') && cells[0].querySelector('a')) { // sub-sub-menu-item
      const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));
      const linkCell = cells.find(cell => cell.querySelector('a'));

      // Similar to sub-menu-item, this should be handled recursively.
      if (labelCell) moveInstrumentation(labelCell, document.createElement('span'));
      if (linkCell) moveInstrumentation(linkCell, document.createElement('a'));

    } else if (cells.length === 2 && cells[0].querySelector('picture')) { // search-icon
      const iconImageCell = cells.find(cell => cell.querySelector('picture'));
      const labelCell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a'));

      if (iconImageCell) {
        const searchIconPicture = iconImageCell.querySelector('picture');
        if (searchIconPicture) {
          const searchIconImg = searchIconPicture.querySelector('img');
          const optimizedSearchIconPic = createOptimizedPicture(searchIconImg.src, searchIconImg.alt, false, [{ width: '20' }]);
          optimizedSearchIconPic.querySelector('img').alt = 'svg file';
          moveInstrumentation(iconImageCell, optimizedSearchIconPic.querySelector('img'));
          searchIconDiv.append(optimizedSearchIconPic);
        }
      }
      searchLabelSpan.textContent = labelCell?.textContent.trim() || '';
      if (labelCell) moveInstrumentation(labelCell, searchLabelSpan);
      searchIconDiv.append(searchLabelSpan);
      searchWrapper.append(searchIconDiv);

      const searchTrigger = searchIconDiv;
      searchTrigger.addEventListener('click', () => {
        globalSearchSection.classList.toggle('d-none');
        document.body.classList.toggle('overflow-hidden');
      });

      crossWrapInner.addEventListener('click', () => {
        globalSearchSection.classList.add('d-none');
        document.body.classList.remove('overflow-hidden');
      });

      searchWrapInner.addEventListener('click', () => {
        // Implement search functionality here
      });

      searchAccess.append(searchWrapper);
    }
  });

  hamburgerButton.addEventListener('click', () => {
    menusWrapper.classList.toggle('show');
    hamburgerButton.classList.toggle('collapsed');
    hamburgerButton.setAttribute('aria-expanded', menusWrapper.classList.contains('show'));
    document.body.classList.toggle('overflow-hidden');
  });

  headerWrapper.append(hamburgerButton, logoWrapper, menusWrapper);
  menusWrapper.append(menuGroups);
  nav.append(headerWrapper);
  containerDiv.append(nav, searchAccess);
  headerComp.append(containerDiv, headerOuterBox);

  block.replaceChildren(headerComp, globalSearchSection);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
