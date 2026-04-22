import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    // Add classes from ORIGINAL HTML
    li.classList.add('footer-list__item');

    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        li.prepend(span);
      }
    } else {
      // Add classes from ORIGINAL HTML to anchors in hierarchy
      anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
    }

    if (nested) {
      // Add classes from ORIGINAL HTML to nested ul
      nested.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('nav-dropdown'); // Class from original HTML for dropdown wrapper
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
      transformNestedLists(nested); // Recursively transform nested lists
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Identify root fields based on their content type and position
  const primaryLogoRow = children.find((row) => row.querySelector('picture') && row.children.length === 1);
  const primaryLogoLinkRow = children.find((row) => row.querySelector('a') && row.children.length === 1 && row !== primaryLogoRow);
  const secondaryLogoRow = children.find((row) => row.querySelector('picture') && row.children.length === 1 && row !== primaryLogoRow);
  const copyrightTextRow = children.find((row) => !row.querySelector('a') && !row.querySelector('picture') && row.textContent.trim().startsWith('©'));

  // Filter item rows based on their structure and content
  const itemRows = children.filter(
    (row) => row !== primaryLogoRow
      && row !== primaryLogoLinkRow
      && row !== secondaryLogoRow
      && row !== copyrightTextRow,
  );

  const navigationItems = itemRows.filter((row) => row.children.length === 3 && row.querySelector('ul'));
  const secondaryLinks = itemRows.filter((row) => row.children.length === 2);
  const socialLinks = itemRows.filter((row) => row.children.length === 3 && row.querySelector('picture') && !row.querySelector('ul'));

  const root = document.createElement('section');
  root.classList.add('container-hd', 'fmm-container', 'p-0');

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  root.append(footerBrand);

  // Primary Section
  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');
  footerBrand.append(primarySection);

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container', 'fmm-container');
  primarySection.append(primaryContainer);

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

  // Primary Logo
  const primaryLogoLink = document.createElement('a');
  primaryLogoLink.classList.add(
    'footer-brand__logo',
    'd-inline-block',
    'cta-analytics',
  );
  if (primaryLogoLinkRow) {
    moveInstrumentation(primaryLogoLinkRow, primaryLogoLink);
    primaryLogoLink.href = primaryLogoLinkRow.querySelector('a')?.href || '#';
  } else {
    primaryLogoLink.href = '#'; // Fallback if link row is missing
  }
  primaryLogoLink.setAttribute('aria-label', 'logo');

  if (primaryLogoRow) {
    const primaryLogoPicture = primaryLogoRow.querySelector('picture');
    if (primaryLogoPicture) {
      const primaryLogoImg = primaryLogoPicture.querySelector('img');
      const optimizedPrimaryPic = createOptimizedPicture(
        primaryLogoImg.src,
        primaryLogoImg.alt,
        false,
        [{ width: '750' }],
      );
      moveInstrumentation(primaryLogoRow, optimizedPrimaryPic.querySelector('img'));
      primaryLogoLink.append(optimizedPrimaryPic);
      optimizedPrimaryPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    }
  }
  footerBrandLeft.append(primaryLogoLink);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  if (secondaryLogoRow) {
    const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
    if (secondaryLogoPicture) {
      const secondaryLogoImg = secondaryLogoPicture.querySelector('img');
      const optimizedSecondaryPic = createOptimizedPicture(
        secondaryLogoImg.src,
        secondaryLogoImg.alt,
        false,
        [{ width: '750' }],
      );
      moveInstrumentation(secondaryLogoRow, optimizedSecondaryPic.querySelector('img'));
      secondaryLogoDiv.append(optimizedSecondaryPic);
      optimizedSecondaryPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    }
  }
  footerBrandLeft.append(secondaryLogoDiv);

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

  // Navigation Items
  const navLists = [];
  navigationItems.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find((cell) => !cell.querySelector('a') && !cell.querySelector('ul'));
    const linkCell = cells.find((cell) => cell.querySelector('a') && !cell.querySelector('ul'));
    const hierarchyCell = cells.find((cell) => cell.querySelector('ul'));

    const li = document.createElement('li');
    li.classList.add('footer-list__item');

    let rootEl;
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      rootEl = document.createElement('a');
      rootEl.href = foundLink.href;
      rootEl.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
    } else {
      rootEl = document.createElement('span');
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl);
    li.appendChild(rootEl);

    if (hierarchyCell) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('nav-dropdown');

      const tempDiv = document.createElement('div');
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from the original cell
      tempDiv.innerHTML = hierarchyCell.innerHTML; // Preserve full HTML structure

      const hierarchyRoot = tempDiv.querySelector('ul');
      if (hierarchyRoot) {
        // Add classes from ORIGINAL HTML to the root ul
        hierarchyRoot.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
        wrapper.appendChild(hierarchyRoot);
        transformNestedLists(hierarchyRoot); // Apply transformations and classes recursively
      }

      rootEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrapper.classList.toggle('active');
        li.classList.toggle('active');
      });
      li.appendChild(wrapper);
    }

    if (!navLists[navLists.length - 1] || navLists[navLists.length - 1].children.length >= 2) {
      const footerListDiv = document.createElement('div');
      footerListDiv.classList.add('footerList');
      const ul = document.createElement('ul');
      ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
      footerListDiv.append(ul);
      navLists.push(ul);
      footerBrandNavbarLeft.append(footerListDiv);
    }
    navLists[navLists.length - 1].append(li);
  });

  // Secondary Links
  const secondaryLinkListDiv = document.createElement('div');
  secondaryLinkListDiv.classList.add('footerList');
  const secondaryLinkUl = document.createElement('ul');
  secondaryLinkUl.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
  secondaryLinkListDiv.append(secondaryLinkUl);
  footerBrandNavbarRight.append(secondaryLinkListDiv);

  secondaryLinks.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find((cell) => !cell.querySelector('a'));
    const linkCell = cells.find((cell) => cell.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add('footer-list__item');

    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.textContent = labelCell?.textContent.trim() || '';
    anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
    moveInstrumentation(row, anchor);
    li.append(anchor);
    secondaryLinkUl.append(li);
  });

  // Secondary Section
  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');
  footerBrand.append(secondarySection);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container', 'fmm-container');
  secondarySection.append(secondaryContainer);

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

  const secondaryLeft = document.createElement('section');
  secondaryLeft.classList.add('footer-brand__left');
  secondaryContent.append(secondaryLeft);

  const secondaryLeftList = document.createElement('ul');
  secondaryLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  secondaryLeft.append(secondaryLeftList);

  // TODO: ITC Portal Link - This was hardcoded in the original HTML but is not part of the BlockJson model.
  // It should be added as a field in the model if it needs to be editable.
  // For now, it's removed to avoid hardcoding.
  // const itcPortalLi = document.createElement('li');
  // itcPortalLi.classList.add('footer-brand__left--item');
  // const itcPortalLink = document.createElement('a');
  // itcPortalLink.href = 'https://www.itcportal.com/';
  // itcPortalLink.target = '_blank';
  // itcPortalLink.classList.add('footer-brand__left--link', 'cta-analytics');
  // itcPortalLink.textContent = 'ITC Portal';
  // const screenReaderSpan = document.createElement('span');
  // screenReaderSpan.classList.add('cmp-link__screen-reader-only');
  // screenReaderSpan.textContent = 'opens in a new tab';
  // itcPortalLink.append(screenReaderSpan);
  // itcPortalLi.append(itcPortalLink);
  // secondaryLeftList.append(itcPortalLi);

  // Copyright Text
  if (copyrightTextRow) {
    const copyrightLi = document.createElement('li');
    copyrightLi.classList.add('footer-brand__left--item');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand__left--text');
    moveInstrumentation(copyrightTextRow, copyrightSpan);
    copyrightSpan.textContent = copyrightTextRow.textContent.trim();
    copyrightLi.append(copyrightSpan);
    secondaryLeftList.append(copyrightLi);
  }


  const secondaryRight = document.createElement('section');
  secondaryRight.classList.add('footer-brand__right');
  secondaryContent.append(secondaryRight);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center');
  secondaryRight.append(socialList);

  // Social Links
  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find((cell) => cell.querySelector('picture'));
    const linkCell = cells.find((cell) => cell.querySelector('a'));
    const altTextCell = cells.find((cell) => !cell.querySelector('picture') && !cell.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    anchor.classList.add('footer-brand__right--link', 'cta-analytics');
    anchor.target = '_blank';
    moveInstrumentation(row, anchor);

    if (iconCell) {
      const iconPicture = iconCell.querySelector('picture');
      if (iconPicture) {
        const iconImg = iconPicture.querySelector('img');
        const optimizedIconPic = createOptimizedPicture(
          iconImg.src,
          altTextCell?.textContent.trim() || iconImg.alt,
          false,
          [{ width: '40' }],
        );
        moveInstrumentation(iconCell, optimizedIconPic.querySelector('img'));
        anchor.append(optimizedIconPic);
        optimizedIconPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
        optimizedIconPic.querySelector('img').setAttribute('aria-label', altTextCell?.textContent.trim() || iconImg.alt);
      }
    }

    const srOnlySpan = document.createElement('span');
    srOnlySpan.classList.add('cmp-link__screen-reader-only');
    srOnlySpan.textContent = 'opens in a new tab';
    anchor.append(srOnlySpan);

    li.append(anchor);
    socialList.append(li);
  });

  block.replaceChildren(root);
}
