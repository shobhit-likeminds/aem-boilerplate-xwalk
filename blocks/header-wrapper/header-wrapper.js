import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLinkRow,
    headerMenuItemsContainer, // This row is not used in the JS, but kept for destructuring alignment
    headerRightMenuItemsContainer, // This row is not used in the JS, but kept for destructuring alignment
    headerRegionItemsContainer, // This row is not used in the JS, but kept for destructuring alignment
    searchPlaceholderRow,
    ...itemRows
  ] = [...block.children];

  // Create the main header structure
  const header = document.createElement('header');
  header.classList.add('header_wrapper');

  const container = document.createElement('div');
  container.classList.add('container', 'header_area');
  header.append(container);

  // Logo Area
  const logoArea = document.createElement('div');
  logoArea.classList.add('logo_area');
  const regionLogo = document.createElement('div');
  regionLogo.classList.add('region', 'region-logo');
  logoArea.append(regionLogo);

  const logoLink = document.createElement('a');
  logoLink.classList.add('logo', 'navbar-btn', 'pull-left');
  moveInstrumentation(logoLinkRow.firstElementChild, logoLink);
  const logoHref = logoLinkRow.querySelector('a')?.href || '/';
  logoLink.href = logoHref;

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '72' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  regionLogo.append(logoLink);
  container.append(logoArea);

  // Menu Area
  const menuArea = document.createElement('div');
  menuArea.classList.add('menu_area');
  menuArea.id = 'navbarCollapse';

  const regionMenuArea = document.createElement('div');
  regionMenuArea.classList.add('region', 'region-menu-area');
  menuArea.append(regionMenuArea);

  const blockMainNavigation = document.createElement('section');
  blockMainNavigation.classList.add('block', 'block-tb-megamenu', 'block-tb-megamenu-menu-blockmain', 'clearfix');
  blockMainNavigation.id = 'block-mainnavigation';
  regionMenuArea.append(blockMainNavigation);

  const tbMegamenu = document.createElement('div');
  tbMegamenu.classList.add('tb-megamenu', 'tb-megamenu-main');
  tbMegamenu.setAttribute('role', 'navigation');
  tbMegamenu.setAttribute('aria-label', 'Main navigation');
  blockMainNavigation.append(tbMegamenu);

  const toggler = document.createElement('button');
  toggler.classList.add('btn', 'btn-navbar', 'tb-megamenu-button');
  toggler.type = 'button';
  toggler.innerHTML = '<span></span><span></span><i class="fa fa-reorder"></i>';
  tbMegamenu.append(toggler);

  const navCollapse = document.createElement('div');
  navCollapse.classList.add('nav-collapse', 'always-show');
  tbMegamenu.append(navCollapse);

  const ul = document.createElement('ul');
  ul.classList.add('tb-megamenu-nav', 'nav', 'level-0', 'items-8');
  navCollapse.append(ul);

  // Filter item rows based on their content structure
  const headerMenuItems = itemRows.filter((row) => row.children.length === 2 && row.children[1].querySelector('a') && row.children[0].textContent.trim() !== '');
  const headerRightMenuItems = itemRows.filter((row) => row.children.length === 2 && row.children[1].querySelector('a') && !headerMenuItems.includes(row) && row.children[0].textContent.trim() !== '');
  const headerRegionItems = itemRows.filter((row) => row.children.length === 2 && row.children[1].querySelector('a') && !headerMenuItems.includes(row) && !headerRightMenuItems.includes(row) && row.children[0].textContent.trim() !== '');

  headerMenuItems.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('tb-megamenu-item', 'level-1', 'mega', 'dropdown');
    moveInstrumentation(row, li);

    const labelCell = row.children[0];
    const linkCell = row.children[1];

    const dropdownToggle = document.createElement('span');
    dropdownToggle.classList.add('dropdown-toggle', 'tb-megamenu-no-link');
    dropdownToggle.setAttribute('aria-expanded', 'false');
    dropdownToggle.setAttribute('tabindex', '0');
    dropdownToggle.innerHTML = `${labelCell.textContent.trim()}<span class="caret"></span>`;
    li.append(dropdownToggle);

    const mobileDropdownButton = document.createElement('div');
    mobileDropdownButton.classList.add('mobile-dropdown-button');
    mobileDropdownButton.textContent = 'button';
    li.append(mobileDropdownButton);

    // Placeholder for mega menu content
    const submenu = document.createElement('div');
    submenu.classList.add('tb-megamenu-submenu', 'dropdown-menu', 'mega-dropdown-menu', 'nav-child');
    submenu.setAttribute('role', 'list');
    submenu.setAttribute('aria-expanded', 'false');
    submenu.innerHTML = `
      <div class="mega-dropdown-inner">
        <div class="tb-megamenu-row row-fluid">
          <div class="tb-megamenu-column span4 mega-col-nav">
            <div class="tb-megamenu-column-inner mega-inner clearfix">
              <div class="tb-block tb-megamenu-block">
                <div class="block-inner">
                  <nav role="navigation">
                    <ul class="menu menu--dabur-corporate-profile nav">
                      <li>${linkCell.innerHTML}</li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    li.append(submenu);
    ul.append(li);

    dropdownToggle.addEventListener('click', () => {
      const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
      dropdownToggle.setAttribute('aria-expanded', !isExpanded);
      submenu.setAttribute('aria-expanded', !isExpanded);
      li.classList.toggle('open', !isExpanded);
    });
  });

  // Header Right Menu
  const headerRight = document.createElement('div');
  headerRight.classList.add('header_right');
  menuArea.append(headerRight);

  const regionHeaderRight = document.createElement('div');
  regionHeaderRight.classList.add('region', 'region-header-right');
  headerRight.append(regionHeaderRight);

  const navHeaderRightMenu = document.createElement('nav');
  navHeaderRightMenu.classList.add('menu', 'menu--header-right-menu', 'nav');
  navHeaderRightMenu.setAttribute('role', 'navigation');
  navHeaderRightMenu.setAttribute('aria-labelledby', 'block-headerrightmenu-menu');
  navHeaderRightMenu.id = 'block-headerrightmenu';
  regionHeaderRight.append(navHeaderRightMenu);

  const h2 = document.createElement('h2');
  h2.classList.add('visually-hidden');
  h2.id = 'block-headerrightmenu-menu';
  h2.textContent = 'Header Right Menu';
  navHeaderRightMenu.append(h2);

  const ulRight = document.createElement('ul');
  ulRight.classList.add('menu', 'menu--header-right-menu', 'nav');
  navHeaderRightMenu.append(ulRight);

  headerRightMenuItems.forEach((row, index) => {
    const li = document.createElement('li');
    li.classList.add(index === 0 ? 'first' : '', index === headerRightMenuItems.length - 1 ? 'last' : '');
    moveInstrumentation(row, li);
    const linkCell = row.children[1]; // Ensure we read the second cell for the link
    const link = linkCell.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      li.append(newLink);
    }
    ulRight.append(li);
  });

  // Search Block
  const searchSection = document.createElement('section');
  searchSection.classList.add('block', 'block-block-content', 'block-block-contentebb8176c-3364-4971-b277-65916ab83cdd', 'clearfix');
  searchSection.id = 'block-headersearch';
  regionHeaderRight.append(searchSection);

  const searchField = document.createElement('div');
  searchField.classList.add('field', 'field--name-body', 'field--type-text-with-summary', 'field--label-hidden', 'field--item');
  searchSection.append(searchField);

  const searchButtonDiv = document.createElement('div');
  searchButtonDiv.classList.add('search-button');
  searchButtonDiv.textContent = 'search';
  searchField.append(searchButtonDiv);

  const searchBlockForm = document.createElement('div');
  searchBlockForm.classList.add('search-block-form', 'block', 'block-search', 'block-search-form-block');
  searchBlockForm.id = 'block-searchform';
  searchBlockForm.setAttribute('role', 'search');
  regionHeaderRight.append(searchBlockForm);

  const searchForm = document.createElement('form');
  searchForm.action = '/en/search';
  searchForm.method = 'get';
  searchForm.id = 'search-block-form';
  searchForm.classList.add('search-box', 'mx-auto');
  searchBlockForm.append(searchForm);

  const formItem = document.createElement('div');
  formItem.classList.add('form-item', 'js-form-item', 'form-type-search', 'js-form-type-search', 'form-item-keys', 'js-form-item-keys', 'form-no-label', 'form-group');
  searchForm.append(formItem);

  const labelSearch = document.createElement('label');
  labelSearch.for = 'edit-keys';
  labelSearch.classList.add('control-label', 'sr-only');
  labelSearch.textContent = 'Search';
  formItem.append(labelSearch);

  const inputGroup = document.createElement('div');
  inputGroup.classList.add('input-group');
  formItem.append(inputGroup);

  const searchInput = document.createElement('input');
  searchInput.title = '';
  searchInput.classList.add('form-search', 'form-control', 'text', 'search-input');
  searchInput.placeholder = searchPlaceholderRow.textContent.trim();
  searchInput.type = 'search';
  searchInput.name = 'term';
  searchInput.value = '';
  searchInput.size = '15';
  searchInput.maxLength = '128';
  inputGroup.append(searchInput);

  const inputGroupBtn = document.createElement('span');
  inputGroupBtn.classList.add('input-group-btn');
  inputGroup.append(inputGroupBtn);

  const searchSubmitButton = document.createElement('button');
  searchSubmitButton.type = 'submit';
  searchSubmitButton.value = 'Search';
  searchSubmitButton.classList.add('button', 'js-form-submit', 'form-submit', 'btn-primary', 'btn', 'icon-only');
  searchSubmitButton.name = '';
  searchSubmitButton.innerHTML = '<span class="sr-only">Search</span><span class="icon glyphicon glyphicon-search" aria-hidden="true"></span>';
  inputGroupBtn.append(searchSubmitButton);

  const formActions = document.createElement('div');
  formActions.classList.add('form-actions', 'form-group', 'js-form-wrapper', 'form-wrapper');
  formActions.id = 'edit-actions';
  formItem.append(formActions);

  // Add event listener for the search button to toggle the search form visibility
  searchButtonDiv.addEventListener('click', () => {
    searchBlockForm.classList.toggle('open'); // Assuming 'open' class shows/hides the form
  });

  // Region Selector
  const globalSection = document.createElement('section');
  globalSection.classList.add('block', 'block-block-content', 'block-block-contente3619348-46e8-46cc-9ac0-183005d97f26', 'clearfix');
  globalSection.id = 'block-global';
  regionHeaderRight.append(globalSection);

  const globalField = document.createElement('div');
  globalField.classList.add('field', 'field--name-body', 'field--type-text-with-summary', 'field--label-hidden', 'field--item');
  globalSection.append(globalField);

  const navRegion = document.createElement('div');
  navRegion.classList.add('navRegion');
  globalField.append(navRegion);

  const navRegionBtn = document.createElement('div');
  navRegionBtn.classList.add('navRegionBtn');
  navRegionBtn.innerHTML = '<img alt="Dabur Region" src="/content/dam/aemigrate/uploaded-folder/image/1774436645991.svg+xml">';
  navRegion.append(navRegionBtn);

  const navRegionList = document.createElement('div');
  navRegionList.classList.add('navRegionList');
  navRegion.append(navRegionList);

  const ulRegion = document.createElement('ul');
  navRegionList.append(ulRegion);

  headerRegionItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const linkCell = row.children[1]; // Ensure we read the second cell for the link
    const link = linkCell.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      newLink.target = '_blank'; // Assuming region links open in new tab
      li.append(newLink);
    }
    ulRegion.append(li);
  });

  // Toggle functionality for mobile menu
  toggler.addEventListener('click', () => {
    navCollapse.classList.toggle('always-show');
    toggler.classList.toggle('collapsed');
  });

  // Toggle functionality for region dropdown
  navRegionBtn.addEventListener('click', () => {
    navRegionList.classList.toggle('show');
  });

  // Image optimization
  header.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(header);
}
