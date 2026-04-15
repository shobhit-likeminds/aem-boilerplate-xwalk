import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Destructure the first three rows as per BlockJson model for header fields
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...navItemRows] = [...block.children];

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('wrapper', 'cf', 'transparent_header', 'transparent_nav_header');

  // Head Logo
  const headLogo = document.createElement('div');
  headLogo.classList.add('head_logo');
  moveInstrumentation(logoRow, headLogo);

  const logoLink = document.createElement('a');
  logoLink.classList.add('navheader_logo');
  logoLink.setAttribute('aria-label', 'PepsiCo Home Logo');

  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  } else {
    logoLink.href = '#'; // Fallback if no link is provided
  }

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.appendChild(optimizedPic);
    }
  }

  headLogo.appendChild(logoLink);
  headerWrapper.appendChild(headLogo);

  // Main Navigation
  const nav = document.createElement('nav');
  nav.id = 'main-nav';
  nav.classList.add('blue_nav');

  const ul = document.createElement('ul');
  ul.classList.add('second-nav');

  navItemRows.forEach((row) => {
    // Use content detection for nav item cells as per EDS guidelines
    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && !cell.querySelector('ul') && cell.textContent.trim() === row.children[0].textContent.trim());
    const linkCell = cells.find(cell => cell.querySelector('a') && cell.querySelector('a').href === row.children[1].querySelector('a')?.href);
    const linkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture') && !cell.querySelector('ul') && cell.textContent.trim() === row.children[2].textContent.trim());
    const subLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p')); // subLinks can be richtext, so check for ul or p

    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');
    const labelText = labelCell?.textContent.trim();
    const linkHref = linkCell?.querySelector('a')?.href || '#';
    const linkLabelText = linkLabelCell?.textContent.trim();

    if (subList) {
      // Classes from original HTML: whoweare, active, ourimpacts, devices
      // The generated class 'labelText.toLowerCase().replace(/\s/g, '')' is an invented class.
      // We should use classes from the original HTML or derive them more carefully.
      // For now, let's assume 'active' is the primary class for dropdowns.
      // If specific classes like 'whoweare' or 'ourimpacts' are needed, they should be
      // explicitly provided in the model or derived from specific content.
      li.classList.add('active'); // Start with active if it's a dropdown, as seen in original HTML for 'whoweare' and 'ourimpacts'
      if (labelText) {
        // Add a class based on label text if it helps with styling, but ensure it's not the ONLY class.
        // Example: 'whoweare' for "Who We Are"
        const derivedClass = labelText.toLowerCase().replace(/\s/g, '');
        if (['whoweare', 'ourimpacts', 'devices'].includes(derivedClass)) { // Only add if it matches known classes
          li.classList.add(derivedClass);
        }
      }

      const trigger = document.createElement('a');
      trigger.href = '#'; // Prevent actual navigation for dropdown triggers
      trigger.setAttribute('tabindex', '0');
      trigger.textContent = labelText;

      // Arrow image from original HTML
      const arrowImg = document.createElement('img');
      arrowImg.alt = 'svg file';
      // The original HTML has an arrow image for dropdowns, but its source is hardcoded.
      // If the model does not provide a field for this, we cannot add it dynamically from content.
      // For now, we'll add it if a source is available, otherwise omit.
      // If the image is part of the original HTML structure, it should be handled by CSS or a static asset.
      // For now, omitting dynamic image source if not in model.

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        li.classList.toggle('active');
        li.querySelector('.ul_outer')?.classList.toggle('active'); // Toggle visibility of the dropdown
      });

      li.appendChild(trigger);
      // The original HTML adds the arrow image *after* the trigger text, but *before* the ul_outer.
      // If we need this image, its source must come from the model.
      // For now, we'll add a placeholder if it's crucial for layout, but ideally it's CSS background.
      // If the model does not provide it, we cannot generate it.

      const ulOuter = document.createElement('div');
      ulOuter.classList.add('ul_outer');
      if (li.classList.contains('devices')) { // Specific class for 'Resources' dropdown
        ulOuter.classList.add('resourcesClass');
      }

      const headerClassClose = document.createElement('div');
      headerClassClose.classList.add('Headerclassclose');
      const secondNavClose = document.createElement('div');
      secondNavClose.classList.add('SecondnavClose');
      const span = document.createElement('span');
      const closeImg = document.createElement('img');
      closeImg.alt = 'svg file';
      // Similar to arrowImg, if source not in model, omit.
      // if (closeImg.src) span.appendChild(closeImg);
      secondNavClose.appendChild(span);
      headerClassClose.appendChild(secondNavClose);
      ulOuter.appendChild(headerClassClose);

      // Add event listener for closing dropdowns
      headerClassClose.addEventListener('click', () => {
        li.classList.remove('active');
        ulOuter.classList.remove('active');
      });

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = subLinksCell.innerHTML;
      while (tempDiv.firstChild) {
        ulOuter.appendChild(tempDiv.firstChild);
      }
      li.appendChild(ulOuter);
    } else {
      li.classList.add('no-arw');
      const anchor = document.createElement('a');
      anchor.href = linkHref;
      anchor.setAttribute('tabindex', '0');
      anchor.textContent = linkLabelText || labelText;
      li.appendChild(anchor);
    }
    ul.appendChild(li);
  });

  nav.appendChild(ul);
  headerWrapper.appendChild(nav);

  // Toggle button for mobile
  const toggleButton = document.createElement('a');
  toggleButton.classList.add('toggle');
  const toggleSpan = document.createElement('span');
  toggleButton.appendChild(toggleSpan);
  toggleButton.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggleButton.classList.toggle('active');
    // Also toggle the headerWrapper's transparent classes if needed for mobile view
    headerWrapper.classList.toggle('transparent_header');
    headerWrapper.classList.toggle('transparent_nav_header');
  });
  headerWrapper.appendChild(toggleButton);

  // Head Right Nav
  const headRightNav = document.createElement('div');
  headRightNav.classList.add('head_right_nav');

  const rightNavUl = document.createElement('ul');

  // Contact link
  const contactLi = document.createElement('li');
  contactLi.classList.add('cont_act');
  const contactLink = document.createElement('a');
  contactLink.href = '/contact';
  contactLink.setAttribute('tabindex', '0');
  contactLink.setAttribute('aria-label', 'PepsiCo Contact');
  contactLink.textContent = 'Contact';
  contactLi.appendChild(contactLink);
  rightNavUl.appendChild(contactLi);

  // Country selector
  const countryLi = document.createElement('li');
  countryLi.classList.add('us');
  const countryImg = document.createElement('img');
  countryImg.alt = 'svg file';
  // If countryImg.src is not provided by the model, it cannot be added.
  // The original HTML shows it as a static asset.
  // if (countryImg.src) countryLi.appendChild(countryImg);
  const countryLink = document.createElement('a');
  countryLink.href = '/global-sites';
  countryLink.setAttribute('tabindex', '0');
  countryLink.textContent = 'India';
  countryLi.appendChild(countryLink);
  rightNavUl.appendChild(countryLi);

  // Search icon
  const searchLi = document.createElement('li');
  searchLi.classList.add('sea_rch_icon');
  const searchLink = document.createElement('a');
  searchLink.id = 'MainSiteSearchOpen';
  searchLink.href = '#';
  searchLink.style.textDecoration = 'none';
  searchLink.setAttribute('tabindex', '0');
  searchLink.setAttribute('aria-label', 'PepsiCo Search');
  const searchImg = document.createElement('img');
  searchImg.alt = 'svg file';
  // If searchImg.src is not provided by the model, it cannot be added.
  // The original HTML shows it as a static asset.
  // if (searchImg.src) searchLink.appendChild(searchImg);
  searchLi.appendChild(searchLink);
  rightNavUl.appendChild(searchLi);

  // Add event listener for the search icon
  searchLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Implement search modal/overlay toggle logic here
    // Example: document.body.classList.toggle('search-active');
    console.log('Search icon clicked!'); // Placeholder for actual search functionality
  });

  headRightNav.appendChild(rightNavUl);
  headerWrapper.appendChild(headRightNav);

  block.textContent = '';
  block.append(headerWrapper);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
