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
      subWrap.classList.add('has-sub-child'); // This class is not in ORIGINAL HTML, but seems to be for JS functionality.
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // This class is not in ORIGINAL HTML, but seems to be for JS functionality.
          subWrap.classList.toggle('active'); // This class is not in ORIGINAL HTML, but seems to be for JS functionality.
        });
      }
    }
  });
}

export default function decorate(block) {
  const [
    primaryLogoRow,
    primaryLogoLinkRow,
    secondaryLogoRow,
    ...restRows
  ] = [...block.children];

  const copyrightTextRow = restRows.find(
    (row) => row.children.length === 1 && !row.querySelector('picture') && !row.querySelector('a'),
  );
  const itemRows = restRows.filter(
    (row) => row !== copyrightTextRow,
  );

  const footerNavLinks = itemRows.filter((row) => row.children.length === 3);
  const footerSecondaryLinks = itemRows.filter(
    (row) => row.children.length === 2 && !row.querySelector('picture'),
  );
  const footerSocialLinks = itemRows.filter(
    (row) => row.children.length === 2 && row.querySelector('picture'),
  );

  const root = document.createElement('div');
  root.classList.add('footer-brand', 'w-100');

  // Primary Section
  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');
  root.append(primarySection);

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

  const brandLeft = document.createElement('section');
  brandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(brandLeft);

  // Primary Logo
  const primaryLogoLink = document.createElement('a');
  primaryLogoLink.classList.add(
    'footer-brand__logo',
    'd-inline-block',
    'cta-analytics',
  );
  primaryLogoLink.setAttribute('aria-label', 'logo');
  const primaryLinkEl = primaryLogoLinkRow.querySelector('a');
  if (primaryLinkEl) {
    primaryLogoLink.href = primaryLinkEl.href;
  }
  moveInstrumentation(primaryLogoLinkRow, primaryLogoLink);

  const primaryPicture = primaryLogoRow.querySelector('picture');
  if (primaryPicture) {
    const img = primaryPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    moveInstrumentation(primaryLogoRow, optimizedPic.querySelector('img'));
    primaryLogoLink.append(optimizedPic);
  }
  brandLeft.append(primaryLogoLink);

  // Secondary Logo (FSSAI)
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryPicture) {
    const img = secondaryPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    moveInstrumentation(secondaryLogoRow, optimizedPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedPic);
  }
  brandLeft.append(secondaryLogoDiv);

  const brandRight = document.createElement('section');
  brandRight.classList.add('footer-brand__right');
  primaryContent.append(brandRight);

  const footerNav = document.createElement('nav');
  footerNav.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNav.setAttribute('aria-label', 'footer navbar');
  brandRight.append(footerNav);

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerNav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerNav.append(navRight);

  // Footer Navigation Links
  const navCols = [[], []];
  footerNavLinks.forEach((row, i) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
    const colIndex = i % 2;
    navCols[colIndex].push({ labelCell, linkCell, hierarchyCell, row });
  });

  navCols.forEach((colItems, colIndex) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add(
      'footer-list',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'align-items-md-start',
      'flex-column',
    );
    footerListDiv.append(ul);

    colItems.forEach(({
      labelCell, linkCell, hierarchyCell, row,
    }) => {
      const li = document.createElement('li');
      li.classList.add('footer-list__item');

      const hierarchyRoot = hierarchyCell.querySelector('ul');
      let rootEl;

      if (hierarchyRoot) {
        rootEl = document.createElement('a');
        rootEl.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
        const foundLink = linkCell.querySelector('a');
        if (foundLink) {
          rootEl.href = foundLink.href;
        } else {
          rootEl.href = '#';
        }
        rootEl.textContent = labelCell.textContent.trim();
        moveInstrumentation(row, rootEl); // Instrument the main link
        li.appendChild(rootEl);

        const wrapper = document.createElement('div');
        wrapper.classList.add('nav-dropdown'); // This class is not in ORIGINAL HTML, but seems to be for JS functionality.

        // Create a temporary div to hold the hierarchy content and instrument it
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML;
        moveInstrumentation(hierarchyCell, tempDiv); // Instrument the richtext cell content

        // Apply classes to nested elements from ORIGINAL HTML
        tempDiv.querySelectorAll('a').forEach(a => a.classList.add('cta-analytics', 'analytics_cta_click'));
        // No specific classes for ul/li in ORIGINAL HTML for this nested structure, so omit.

        while (tempDiv.firstChild) {
          wrapper.append(tempDiv.firstChild);
        }

        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active'); // This class is not in ORIGINAL HTML, but seems to be for JS functionality.
          li.classList.toggle('active'); // This class is not in ORIGINAL HTML, but seems to be for JS functionality.
        });
        li.appendChild(wrapper);
        transformNestedLists(hierarchyRoot); // This function operates on the live DOM, not the tempDiv
      } else {
        rootEl = document.createElement('a');
        rootEl.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
        const foundLink = linkCell.querySelector('a');
        if (foundLink) {
          rootEl.href = foundLink.href;
        } else {
          rootEl.href = '#';
        }
        rootEl.textContent = labelCell.textContent.trim();
        moveInstrumentation(row, rootEl);
        li.appendChild(rootEl);
      }
      ul.append(li);
    });

    if (colIndex === 0) {
      navLeft.append(footerListDiv);
    } else {
      navRight.append(footerListDiv);
    }
  });

  // Secondary Section
  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');
  root.append(secondarySection);

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
  secondaryLeftList.classList.add(
    'footer-brand__left--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-wrap',
  );
  secondaryLeft.append(secondaryLeftList);

  // Footer Secondary Links
  footerSecondaryLinks.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item');

    const link = document.createElement('a');
    link.classList.add('footer-brand__left--link', 'cta-analytics');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      if (foundLink.target) {
        link.target = foundLink.target;
        const srOnly = document.createElement('span');
        srOnly.classList.add('cmp-link__screen-reader-only');
        srOnly.textContent = 'opens in a new tab';
        link.append(srOnly);
      }
    }
    link.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, link);
    li.append(link);
    secondaryLeftList.append(li);
  });

  // Copyright Text
  if (copyrightTextRow) {
    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item');
    const span = document.createElement('span');
    span.classList.add('footer-brand__left--text');
    span.textContent = copyrightTextRow.textContent.trim();
    moveInstrumentation(copyrightTextRow, span);
    li.append(span);
    secondaryLeftList.append(li);
  }

  const secondaryRight = document.createElement('section');
  secondaryRight.classList.add('footer-brand__right');
  secondaryContent.append(secondaryRight);

  const secondaryRightList = document.createElement('ul');
  secondaryRightList.classList.add(
    'footer-brand__right--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
  );
  secondaryRight.append(secondaryRightList);

  // Footer Social Links
  footerSocialLinks.forEach((row) => {
    const [iconCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add(
      'footer-brand__right--item',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );

    const link = document.createElement('a');
    link.classList.add('footer-brand__right--link', 'cta-analytics');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      if (foundLink.target) {
        link.target = foundLink.target;
        const srOnly = document.createElement('span');
        srOnly.classList.add('cmp-link__screen-reader-only');
        srOnly.textContent = 'opens in a new tab';
        link.append(srOnly);
      }
    }
    moveInstrumentation(row, link);

    const picture = iconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
      optimizedPic.querySelector('img').setAttribute('aria-label', img.alt);
      moveInstrumentation(iconCell, optimizedPic.querySelector('img'));
      link.append(optimizedPic);
    }
    li.append(link);
    secondaryRightList.append(li);
  });

  block.replaceChildren(root);
}
