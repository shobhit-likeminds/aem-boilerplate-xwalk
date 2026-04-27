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
      subWrap.classList.add('nav-dropdown'); // Use a generic class from ORIGINAL HTML
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
  const children = [...block.children];

  // Destructure root fields based on BlockJson model
  const primaryLogoRow = children[0];
  const primaryLogoLinkRow = children[1];
  const secondaryLogoRow = children[2];
  const copyrightRow = children[3]; // Copyright is the 4th root field

  // Remaining rows are item rows for containers
  const itemRows = children.slice(4);

  const root = document.createElement('section');
  root.classList.add('container-hd', 'fmm-container', 'p-0');

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  root.append(footerBrand);

  // Footer Brand Primary Section
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');
  footerBrand.append(footerBrandPrimary);

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container', 'fmm-container');
  footerBrandPrimary.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add(
    'footer-brand__primary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );
  primaryContainer.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(footerBrandLeft);

  // Primary Logo and Link
  if (primaryLogoRow && primaryLogoLinkRow) {
    const primaryLink = document.createElement('a');
    primaryLink.classList.add(
      'footer-brand__logo',
      'd-inline-block',
      'cta-analytics',
    );
    const primaryHref = primaryLogoLinkRow.querySelector('a')?.href;
    if (primaryHref) {
      primaryLink.href = primaryHref;
      primaryLink.setAttribute('aria-label', 'logo');
    }

    const primaryPicture = primaryLogoRow.querySelector('picture');
    if (primaryPicture) {
      const primaryImg = primaryPicture.querySelector('img');
      if (primaryImg) {
        const optimizedPic = createOptimizedPicture(
          primaryImg.src,
          primaryImg.alt,
          false,
          [{ width: '750' }],
        );
        moveInstrumentation(primaryImg, optimizedPic.querySelector('img'));
        primaryLink.append(optimizedPic);
      }
    }
    moveInstrumentation(primaryLogoRow, primaryLink);
    moveInstrumentation(primaryLogoLinkRow, primaryLink);
    footerBrandLeft.append(primaryLink);
  }

  // Secondary Logo
  if (secondaryLogoRow) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
    const secondaryPicture = secondaryLogoRow.querySelector('picture');
    if (secondaryPicture) {
      const secondaryImg = secondaryPicture.querySelector('img');
      if (secondaryImg) {
        const optimizedPic = createOptimizedPicture(
          secondaryImg.src,
          secondaryImg.alt,
          false,
          [{ width: '750' }],
        );
        moveInstrumentation(secondaryImg, optimizedPic.querySelector('img'));
        secondaryLogoDiv.append(optimizedPic);
      }
    }
    moveInstrumentation(secondaryLogoRow, secondaryLogoDiv);
    footerBrandLeft.append(secondaryLogoDiv);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  primaryContent.append(footerBrandRight);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarRight);

  // Separate item rows by type using content detection
  const navigationItems = itemRows.filter((row) => row.children.length === 3 && row.querySelector('ul'));
  const brandLinks = itemRows.filter((row) => row.children.length === 2 && !row.querySelector('picture'));
  const socialLinks = itemRows.filter((row) => row.children.length === 2 && row.querySelector('picture'));

  // Navigation Items
  if (navigationItems.length > 0) {
    const navListDiv = document.createElement('div');
    navListDiv.classList.add('footerList');
    const navList = document.createElement('ul');
    navList.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    navListDiv.append(navList);

    navigationItems.forEach((row) => {
      const cells = [...row.children];
      const labelCell = cells[0];
      const linkCell = cells[1];
      const hierarchyCell = cells[2];

      const li = document.createElement('li');
      li.classList.add('footer-list__item');

      const foundLink = linkCell?.querySelector('a');
      let rootEl;
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
        rootEl.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      } else {
        rootEl = document.createElement('span');
        rootEl.classList.add('footer-list__item--link', 'd-inline-block'); // Add appropriate styling for non-link labels
      }
      rootEl.textContent = labelCell?.textContent.trim() || '';
      moveInstrumentation(row, rootEl); // Move instrumentation from the row to the root element
      li.appendChild(rootEl);

      const hierarchyRoot = hierarchyCell?.querySelector('ul');
      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('nav-dropdown'); // Use a generic class from ORIGINAL HTML
        
        // Create a temporary div to hold the innerHTML and apply classes
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML;
        
        // Apply classes to nested elements
        tempDiv.querySelectorAll('a').forEach(a => a.classList.add('nav-menu-item-link')); // Example class, adjust as needed
        tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('nav-menu-list')); // Example class, adjust as needed
        tempDiv.querySelectorAll('li').forEach(liItem => liItem.classList.add('nav-menu-item')); // Example class, adjust as needed

        // Move instrumentation from the original hierarchy cell to the temporary div
        moveInstrumentation(hierarchyCell, tempDiv);

        // Append children from tempDiv to wrapper
        while (tempDiv.firstChild) {
          wrapper.append(tempDiv.firstChild);
        }

        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        transformNestedLists(wrapper.querySelector('ul')); // Apply transformations to the actual UL inside the wrapper
      }
      navList.appendChild(li);
    });
    footerBrandNavbarLeft.append(navListDiv);
  }

  // Footer Brand Secondary Section
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand__secondary');
  footerBrand.append(footerBrandSecondary);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container', 'fmm-container');
  footerBrandSecondary.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add(
    'footer-brand__secondary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );
  secondaryContainer.append(secondaryContent);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left');
  secondaryContent.append(footerBrandLeftSecondary);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add(
    'footer-brand__left--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-wrap',
  );
  footerBrandLeftSecondary.append(footerBrandLeftList);

  // Brand Links
  brandLinks.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells[0];
    const linkCell = cells[1];

    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item');

    const linkEl = document.createElement('a');
    linkEl.classList.add('footer-brand__left--link', 'cta-analytics');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      linkEl.textContent = labelCell.textContent.trim();
      if (foundLink.getAttribute('target') === '_blank') {
        linkEl.target = '_blank';
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        linkEl.append(screenReaderSpan);
      }
    }
    moveInstrumentation(row, linkEl);
    li.append(linkEl);
    footerBrandLeftList.append(li);
  });

  // Copyright Text
  if (copyrightRow) {
    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item');
    const span = document.createElement('span');
    span.classList.add('footer-brand__left--text');
    span.textContent = copyrightRow.textContent.trim();
    moveInstrumentation(copyrightRow, span);
    li.append(span);
    footerBrandLeftList.append(li);
  }

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand__right');
  secondaryContent.append(footerBrandRightSecondary);

  const footerBrandRightList = document.createElement('ul');
  footerBrandRightList.classList.add(
    'footer-brand__right--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
  );
  footerBrandRightSecondary.append(footerBrandRightList);

  // Social Links
  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells[0];
    const linkCell = cells[1];

    const li = document.createElement('li');
    li.classList.add(
      'footer-brand__right--item',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );

    const linkEl = document.createElement('a');
    linkEl.classList.add('footer-brand__right--link', 'cta-analytics');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      linkEl.href = foundLink.href;
      if (foundLink.getAttribute('target') === '_blank') {
        linkEl.target = '_blank';
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        linkEl.append(screenReaderSpan);
      }
    }

    const picture = iconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(
          img.src,
          img.alt,
          false,
          [{ width: '750' }],
        );
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        linkEl.append(optimizedPic);
      }
    }
    moveInstrumentation(row, linkEl);
    li.append(linkEl);
    footerBrandRightList.append(li);
  });

  block.replaceChildren(root);
}
