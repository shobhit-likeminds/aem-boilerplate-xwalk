import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    // Handle label-only nodes
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
    }
  });
}

export default function decorate(block) {
  const [
    brandLogoRow,
    brandLogoLinkRow,
    secondaryLogoRow,
    copyrightTextRow,
    ...itemRows
  ] = [...block.children];

  const root = document.createElement('section');
  root.classList.add('container-hd', 'fmm-container', 'p-0');
  moveInstrumentation(block, root);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  root.append(footerBrand);

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

  // Brand Logo
  const brandLogoLink = document.createElement('a');
  brandLogoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
  moveInstrumentation(brandLogoLinkRow, brandLogoLink);
  const brandLogoHref = brandLogoLinkRow.querySelector('a')?.href;
  if (brandLogoHref) {
    brandLogoLink.href = brandLogoHref;
  } else {
    brandLogoLink.href = '#';
  }
  brandLogoLink.setAttribute('aria-label', 'logo');

  const brandLogoPicture = brandLogoRow.querySelector('picture');
  if (brandLogoPicture) {
    const img = brandLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(brandLogoRow, optimizedPic.querySelector('img'));
    brandLogoLink.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
  }
  footerBrandLeft.append(brandLogoLink);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  moveInstrumentation(secondaryLogoRow, secondaryLogoDiv);
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(secondaryLogoRow, optimizedPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
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

  // Content detection for item rows
  const navigationItems = itemRows.filter((row) => row.children.length === 3 && row.querySelector('ul'));
  const socialItems = itemRows.filter((row) => row.children.length === 2 && row.querySelector('picture'));
  const footerLinkItems = itemRows.filter((row) => row.children.length === 2 && !row.querySelector('picture') && !row.querySelector('ul'));

  // Navigation Items
  const navLists = [];
  navigationItems.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a') && !c.querySelector('ul'));
    const linkCell = cells.find(c => c.querySelector('a') && !c.querySelector('ul'));
    const hierarchyCell = cells.find(c => c.querySelector('ul'));

    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    moveInstrumentation(row, footerListDiv);

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

    const li = document.createElement('li');
    li.classList.add('footer-list__item');
    ul.append(li);

    const foundLink = linkCell?.querySelector('a');
    let rootEl;
    if (foundLink) {
      rootEl = document.createElement('a');
      rootEl.href = foundLink.href;
      rootEl.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
    } else {
      rootEl = document.createElement('span');
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    li.appendChild(rootEl);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('has-sub-child'); // From ORIGINAL HTML
      
      // Move instrumentation from hierarchyCell to the new wrapper
      moveInstrumentation(hierarchyCell, wrapper);

      // Preserve original HTML structure and classes for hierarchy-tree
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;

      tempDiv.querySelectorAll('ul').forEach((nestedUl) => {
        nestedUl.classList.add('footer-list'); // Example class, adjust as per ORIGINAL HTML
      });
      tempDiv.querySelectorAll('li').forEach((nestedLi) => {
        nestedLi.classList.add('footer-list__item'); // Example class, adjust as per ORIGINAL HTML
      });
      tempDiv.querySelectorAll('a').forEach((nestedA) => {
        nestedA.classList.add('footer-list__item--link', 'cta-analytics'); // Example class, adjust as per ORIGINAL HTML
      });

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
      transformNestedLists(wrapper.querySelector('ul')); // Apply transformations to the moved hierarchy
    }
    navLists.push(footerListDiv);
  });

  // Distribute navigation items into left and right navbar sections
  const half = Math.ceil(navLists.length / 2);
  navLists.slice(0, half).forEach((list) => footerBrandNavbarLeft.append(list));
  navLists.slice(half).forEach((list) => footerBrandNavbarRight.append(list));

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

  // Footer Link Items
  footerLinkItems.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a'));
    const linkCell = cells.find(c => c.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item');
    moveInstrumentation(row, li);

    const link = document.createElement('a');
    link.classList.add('footer-brand__left--link', 'cta-analytics');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.textContent = labelCell?.textContent.trim() || '';
    } else {
      link.href = '#';
      link.textContent = labelCell?.textContent.trim() || '';
    }
    li.append(link);
    footerBrandLeftList.append(li);
  });

  // Copyright Text
  const copyrightLi = document.createElement('li');
  copyrightLi.classList.add('footer-brand__left--item');
  moveInstrumentation(copyrightTextRow, copyrightLi);
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text');
  copyrightSpan.textContent = copyrightTextRow.textContent.trim();
  copyrightLi.append(copyrightSpan);
  footerBrandLeftList.append(copyrightLi);

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

  // Social Items
  socialItems.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(c => c.querySelector('picture'));
    const linkCell = cells.find(c => c.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add(
      'footer-brand__right--item',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );
    moveInstrumentation(row, li);

    const link = document.createElement('a');
    link.classList.add('footer-brand__right--link', 'cta-analytics');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.href = '#';
    }

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '48' }]);
      moveInstrumentation(iconCell, optimizedPic.querySelector('img'));
      link.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
      link.setAttribute('aria-label', img.alt);
    }
    li.append(link);
    footerBrandRightList.append(li);
  });

  block.replaceChildren(root);
}
