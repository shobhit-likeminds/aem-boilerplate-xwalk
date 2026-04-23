import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    // Apply classes from ORIGINAL HTML to li
    li.classList.add('footer-list__item');

    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Handle label-only nodes
    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
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
      // Use original HTML class if available, otherwise a generic one
      // Assuming 'nav-dropdown' is the correct class for nested wrappers from the original HTML if it were present.
      // If not, this should be a generic class or derived from the block.
      subWrap.classList.add('nav-dropdown');
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
  // Apply classes to nested ul elements
  rootUl.querySelectorAll('ul').forEach((ul) => {
    ul.classList.add('footer-list'); // Assuming this class applies to all nested ULs
  });
  // Apply classes to nested a elements
  rootUl.querySelectorAll('a').forEach((a) => {
    a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
    a.setAttribute('data-link-region', 'Footer');
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Fixed fields
  const [
    logoRow,
    logoLinkRow,
    secondaryLogoRow,
    itcPortalLinkRow,
    itcPortalLabelRow,
    copyrightTextRow,
    ...itemRows
  ] = children;

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
  if (logoRow && logoLinkRow) {
    const logoLink = document.createElement('a');
    logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
    const foundLink = logoLinkRow.querySelector('a');
    if (foundLink) {
      logoLink.href = foundLink.href;
      logoLink.setAttribute('aria-label', 'logo');
    }

    const picture = logoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
        logoLink.append(optimizedPic);
      }
    }
    moveInstrumentation(logoRow, logoLink);
    moveInstrumentation(logoLinkRow, logoLink);
    footerBrandLeft.append(logoLink);
  }

  // Secondary Logo
  if (secondaryLogoRow) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
    const picture = secondaryLogoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
        secondaryLogoDiv.append(optimizedPic);
      }
    }
    moveInstrumentation(secondaryLogoRow, secondaryLogoDiv);
    footerBrandLeft.append(secondaryLogoDiv);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  primaryContent.append(footerBrandRight);

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNavbar);

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavbar.append(footerNavbarRight);

  // Separate item rows into footer links and social links
  const footerLinkItems = itemRows.filter((row) => row.children.length === 3);
  const footerSocialLinkItems = itemRows.filter((row) => row.children.length === 2);

  // Footer Navigation Links
  const footerLinkLists = [];
  let currentList = null;

  footerLinkItems.forEach((row) => {
    const cells = [...row.children]; // Use destructuring for fixed-field item models
    const labelCell = cells[0];
    const linkCell = cells[1];
    const hierarchyCell = cells[2];

    if (!currentList || currentList.children.length >= 2) { // Logic to group lists, adjust as needed
      currentList = document.createElement('ul');
      currentList.classList.add(
        'footer-list',
        'd-flex',
        'align-items-center',
        'justify-content-center',
        'align-items-md-start',
        'flex-column',
      );
      footerLinkLists.push(currentList);
    }

    const li = document.createElement('li');
    li.classList.add('footer-list__item');

    const foundLink = linkCell?.querySelector('a');
    let rootEl;
    if (foundLink) {
      rootEl = document.createElement('a');
      rootEl.href = foundLink.href;
      rootEl.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      rootEl.setAttribute('data-link-region', 'Footer');
    } else {
      rootEl = document.createElement('span');
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl); // Move instrumentation from the row to the root element of the item
    li.appendChild(rootEl);

    if (hierarchyCell) {
      const tempDiv = document.createElement('div');
      // Use innerHTML to preserve nested structure
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      const hierarchyRoot = tempDiv.querySelector('ul');

      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('nav-dropdown'); // Use original HTML class if available
        
        // Move instrumentation from hierarchyCell to the wrapper
        moveInstrumentation(hierarchyCell, wrapper);

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
        transformNestedLists(hierarchyRoot);
      }
    }
    currentList.append(li);
  });

  footerLinkLists.forEach((list, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    footerListDiv.append(list);
    if (index < 2) { // Distribute lists between left and right navbar sections
      footerNavbarLeft.append(footerListDiv);
    } else {
      footerNavbarRight.append(footerListDiv);
    }
  });

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

  // ITC Portal Link
  if (itcPortalLinkRow && itcPortalLabelRow) {
    const itcLi = document.createElement('li');
    itcLi.classList.add('footer-brand__left--item');
    const itcLink = document.createElement('a');
    itcLink.classList.add('footer-brand__left--link', 'cta-analytics');
    const foundLink = itcPortalLinkRow.querySelector('a');
    if (foundLink) {
      itcLink.href = foundLink.href;
      itcLink.setAttribute('target', '_blank');
      itcLink.setAttribute('data-link-region', 'Footer');
      itcLink.textContent = itcPortalLabelRow.textContent.trim();
      const srOnly = document.createElement('span');
      srOnly.classList.add('cmp-link__screen-reader-only');
      srOnly.textContent = 'opens in a new tab';
      itcLink.append(srOnly);
    }
    moveInstrumentation(itcPortalLinkRow, itcLink);
    moveInstrumentation(itcPortalLabelRow, itcLink);
    itcLi.append(itcLink);
    footerBrandLeftList.append(itcLi);
  }

  // Copyright Text
  if (copyrightTextRow) {
    const copyrightLi = document.createElement('li');
    copyrightLi.classList.add('footer-brand__left--item');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand__left--text');
    copyrightSpan.textContent = copyrightTextRow.textContent.trim();
    moveInstrumentation(copyrightTextRow, copyrightSpan);
    copyrightLi.append(copyrightSpan);
    footerBrandLeftList.append(copyrightLi);
  }

  // Social Links
  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand__right');
  secondaryContent.append(footerBrandRightSecondary);

  const socialList = document.createElement('ul');
  socialList.classList.add(
    'footer-brand__right--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
  );
  footerBrandRightSecondary.append(socialList);

  footerSocialLinkItems.forEach((row) => {
    const cells = [...row.children]; // Use destructuring for fixed-field item models
    const iconCell = cells[0];
    const linkCell = cells[1];

    const socialLi = document.createElement('li');
    socialLi.classList.add(
      'footer-brand__right--item',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );

    const socialLink = document.createElement('a');
    socialLink.classList.add('footer-brand__right--link', 'cta-analytics');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      socialLink.href = foundLink.href;
      socialLink.setAttribute('data-link-region', 'Footer');
      socialLink.setAttribute('target', '_blank');
      const srOnly = document.createElement('span');
      srOnly.classList.add('cmp-link__screen-reader-only');
      srOnly.textContent = 'opens in a new tab';
      socialLink.append(srOnly);
    }

    const picture = iconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
        optimizedPic.querySelector('img').setAttribute('aria-label', img.alt);
        socialLink.prepend(optimizedPic);
      }
    }
    moveInstrumentation(row, socialLink);
    socialLi.append(socialLink);
    socialList.append(socialLi);
  });

  block.replaceChildren(root);
}
