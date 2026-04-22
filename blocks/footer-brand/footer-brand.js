import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    li.classList.add('footer-list__item'); // Add class from ORIGINAL HTML

    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Handle label-only nodes
    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        span.classList.add('footer-list__item--link', 'd-inline-block'); // Add classes from ORIGINAL HTML
        textNode.remove();
        li.prepend(span);
      }
    } else {
      anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block'); // Add classes from ORIGINAL HTML
    }

    if (nested) {
      nested.remove();
      nested.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column'); // Add classes from ORIGINAL HTML
      const subWrap = document.createElement('div');
      subWrap.classList.add('nav-dropdown'); // Class from ORIGINAL HTML
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

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  moveInstrumentation(block, footerBrand);

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

  const brandLeft = document.createElement('section');
  brandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(brandLeft);

  // Primary Logo and Link
  const logoLink = document.createElement('a');
  logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const primaryLogoPicture = logoRow.querySelector('picture');
  if (primaryLogoPicture) {
    const img = primaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  brandLeft.append(logoLink);

  // Secondary Logo (FSSAI)
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedPic);
  }
  brandLeft.append(secondaryLogoDiv);

  const brandRight = document.createElement('section');
  brandRight.classList.add('footer-brand__right');
  primaryContent.append(brandRight);

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  brandRight.append(nav);

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navRight);

  const footerNavLinks = itemRows.filter((row) => row.children.length === 3);
  const socialLinks = itemRows.filter((row) => row.children.length === 2);

  // Footer Navigation Links
  const footerNavLists = [];
  footerNavLinks.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a') && !c.querySelector('ul') && c.textContent.trim());
    const linkCell = cells.find(c => c.querySelector('a') && !c.querySelector('ul'));
    const hierarchyCell = cells.find(c => c.querySelector('ul'));

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
      rootEl.classList.add('footer-list__item--link', 'd-inline-block');
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl); // Move instrumentation from the row to the root element
    li.appendChild(rootEl);

    if (hierarchyCell) {
      const hierarchyRootTemp = document.createElement('div');
      hierarchyRootTemp.innerHTML = hierarchyCell.innerHTML; // Use innerHTML for richtext
      const hierarchyRoot = hierarchyRootTemp.querySelector('ul');

      if (hierarchyRoot) {
        moveInstrumentation(hierarchyCell, hierarchyRoot); // Move instrumentation from cell to the root UL
        const wrapper = document.createElement('div');
        wrapper.classList.add('nav-dropdown'); // Class from ORIGINAL HTML
        wrapper.appendChild(hierarchyRoot);
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

    let targetList;
    if (footerNavLists.length < 2) {
      // First two lists go to navLeft
      if (!footerNavLists[0]) {
        footerNavLists[0] = document.createElement('ul');
        footerNavLists[0].classList.add(
          'footer-list',
          'd-flex',
          'align-items-center',
          'justify-content-center',
          'align-items-md-start',
          'flex-column',
        );
        const div = document.createElement('div');
        div.classList.add('footerList');
        div.append(footerNavLists[0]);
        navLeft.append(div);
      }
      if (!footerNavLists[1] && footerNavLists[0].children.length >= 2) {
        footerNavLists[1] = document.createElement('ul');
        footerNavLists[1].classList.add(
          'footer-list',
          'd-flex',
          'align-items-center',
          'justify-content-center',
          'align-items-md-start',
          'flex-column',
        );
        const div = document.createElement('div');
        div.classList.add('footerList');
        div.append(footerNavLists[1]);
        navLeft.append(div);
      }
      targetList = footerNavLists[0].children.length < 2 ? footerNavLists[0] : footerNavLists[1];
    } else {
      // Remaining lists go to navRight
      if (!footerNavLists[2]) {
        footerNavLists[2] = document.createElement('ul');
        footerNavLists[2].classList.add(
          'footer-list',
          'd-flex',
          'align-items-center',
          'justify-content-center',
          'align-items-md-start',
          'flex-column',
        );
        const div = document.createElement('div');
        div.classList.add('footerList');
        div.append(footerNavLists[2]);
        navRight.append(div);
      }
      if (!footerNavLists[3] && footerNavLists[2].children.length >= 2) {
        footerNavLists[3] = document.createElement('ul');
        footerNavLists[3].classList.add(
          'footer-list',
          'd-flex',
          'align-items-center',
          'justify-content-center',
          'align-items-md-start',
          'flex-column',
        );
        const div = document.createElement('div');
        div.classList.add('footerList');
        div.append(footerNavLists[3]);
        navRight.append(div);
      }
      targetList = footerNavLists[2].children.length < 2 ? footerNavLists[2] : footerNavLists[3];
    }
    if (targetList) {
      targetList.append(li);
    }
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
  secondaryLeftList.classList.add(
    'footer-brand__left--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-wrap',
  );
  secondaryLeft.append(secondaryLeftList);

  // ITC Portal Link
  const itcPortalLi = document.createElement('li');
  itcPortalLi.classList.add('footer-brand__left--item');
  const itcPortalLink = document.createElement('a');
  itcPortalLink.classList.add('footer-brand__left--link', 'cta-analytics');
  const foundItcLink = itcPortalLinkRow.querySelector('a');
  if (foundItcLink) {
    itcPortalLink.href = foundItcLink.href;
  }
  itcPortalLink.textContent = itcPortalLabelRow.textContent.trim();
  moveInstrumentation(itcPortalLinkRow, itcPortalLink);
  moveInstrumentation(itcPortalLabelRow, itcPortalLink);
  itcPortalLi.append(itcPortalLink);
  secondaryLeftList.append(itcPortalLi);

  // Copyright Text
  const copyrightLi = document.createElement('li');
  copyrightLi.classList.add('footer-brand__left--item');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text');
  copyrightSpan.textContent = copyrightTextRow.textContent.trim();
  moveInstrumentation(copyrightTextRow, copyrightSpan);
  copyrightLi.append(copyrightSpan);
  secondaryLeftList.append(copyrightLi);

  // Social Links
  const secondaryRight = document.createElement('section');
  secondaryRight.classList.add('footer-brand__right');
  secondaryContent.append(secondaryRight);

  const socialList = document.createElement('ul');
  socialList.classList.add(
    'footer-brand__right--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
  );
  secondaryRight.append(socialList);

  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(c => c.querySelector('picture'));
    const linkCell = cells.find(c => c.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const link = document.createElement('a');
    link.classList.add('footer-brand__right--link', 'cta-analytics');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    moveInstrumentation(linkCell, link);

    const picture = iconCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      link.append(optimizedPic);
    }
    moveInstrumentation(iconCell, link); // Also move instrumentation from iconCell

    li.append(link);
    socialList.append(li);
  });

  block.replaceChildren(footerBrand);

  // Optimize all images in the block
  footerBrand.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}

