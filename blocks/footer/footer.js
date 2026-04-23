import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

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
      subWrap.classList.add('nav-dropdown'); // Class from ORIGINAL HTML (from footer-list__item with nested ul)
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

  // Root fields are identified by their position as per BlockJson model
  const primaryLogoRow = children[0];
  const primaryLogoLinkRow = children[1];
  const secondaryLogoRow = children[2];
  const copyrightRow = children[3]; // This is the 4th root field, after 3 containers

  // Item rows start from index 4
  const itemRows = children.slice(4);

  const root = document.createElement('section');
  root.classList.add('container-hd', 'fmm-container', 'p-0');
  moveInstrumentation(block, root);

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
    'align-items-center'
  );
  primaryContainer.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(footerBrandLeft);

  // Primary Logo
  const primaryLogoLink = document.createElement('a');
  primaryLogoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
  primaryLogoLink.setAttribute('aria-label', 'logo');
  const primaryLogoAnchor = primaryLogoLinkRow?.querySelector('a');
  if (primaryLogoAnchor) {
    primaryLogoLink.href = primaryLogoAnchor.href;
    moveInstrumentation(primaryLogoLinkRow, primaryLogoLink);
  } else {
    primaryLogoLink.href = '#';
  }

  const primaryPicture = primaryLogoRow?.querySelector('picture');
  if (primaryPicture) {
    const img = primaryPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    moveInstrumentation(primaryLogoRow, optimizedPic.querySelector('img'));
    primaryLogoLink.append(optimizedPic);
  }
  footerBrandLeft.append(primaryLogoLink);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryPicture = secondaryLogoRow?.querySelector('picture');
  if (secondaryPicture) {
    const img = secondaryPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    moveInstrumentation(secondaryLogoRow, optimizedPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedPic);
  }
  footerBrandLeft.append(secondaryLogoDiv);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  primaryContent.append(footerBrandRight);

  const footerNav = document.createElement('nav');
  footerNav.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerNav.append(footerNavLeft);

  const footerNavRight = document.createElement('div');
  footerNavRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerNav.append(footerNavRight);

  // Content detection for item rows
  const footerNavigationSections = itemRows.filter((row) => row.children.length === 3);
  const footerSecondaryLinks = itemRows.filter((row) => row.children.length === 2 && !row.querySelector('picture'));
  const footerSocialLinks = itemRows.filter((row) => row.children.length === 2 && row.querySelector('picture'));

  // Footer Navigation Sections
  const navLists = [];
  footerNavigationSections.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a') && !c.querySelector('ul')); // Text cell
    const linkCell = cells.find(c => c.querySelector('a') && !c.querySelector('ul')); // Link cell
    const hierarchyCell = cells.find(c => c.querySelector('ul')); // Richtext hierarchy-tree cell

    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add(
      'footer-list',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'align-items-md-start',
      'flex-column'
    );
    footerListDiv.append(ul);

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
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl); // Instrument the entire row to the root element of the list item
    li.appendChild(rootEl);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('nav-dropdown'); // Class from ORIGINAL HTML (from footer-list__item with nested ul)
      // Move instrumentation from hierarchyCell to the wrapper
      moveInstrumentation(hierarchyCell, wrapper);
      // Use innerHTML to preserve nested structure
      wrapper.innerHTML = hierarchyCell.innerHTML;

      // Apply classes to nested elements from ORIGINAL HTML
      wrapper.querySelectorAll('a').forEach(a => a.classList.add('cta-analytics', 'analytics_cta_click'));
      wrapper.querySelectorAll('ul').forEach(ulEl => ulEl.classList.add('footer-list'));
      wrapper.querySelectorAll('li').forEach(liEl => liEl.classList.add('footer-list__item'));

      rootEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrapper.classList.toggle('active');
        li.classList.toggle('active');
      });
      li.appendChild(wrapper);
      transformNestedLists(wrapper.querySelector('ul')); // Pass the actual root UL inside the wrapper
    }
    ul.append(li);
    navLists.push(footerListDiv);
  });

  // Distribute navLists to left and right as per original HTML structure
  const half = Math.ceil(navLists.length / 2);
  navLists.slice(0, half).forEach(list => footerNavLeft.append(list));
  navLists.slice(half).forEach(list => footerNavRight.append(list));


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
    'align-items-center'
  );
  secondaryContainer.append(secondaryContent);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left');
  secondaryContent.append(footerBrandLeftSecondary);

  const footerLeftList = document.createElement('ul');
  footerLeftList.classList.add(
    'footer-brand__left--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-wrap'
  );
  footerBrandLeftSecondary.append(footerLeftList);

  // Footer Secondary Links
  footerSecondaryLinks.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a')); // Text cell
    const linkCell = cells.find(c => c.querySelector('a')); // Link cell

    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item');

    const link = document.createElement('a');
    link.classList.add('footer-brand__left--link', 'cta-analytics');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      moveInstrumentation(row, link); // Instrument the row to the link
    } else {
      link.href = '#';
    }
    link.textContent = labelCell?.textContent.trim() || '';
    li.append(link);
    footerLeftList.append(li);
  });

  // Copyright Text
  const copyrightLi = document.createElement('li');
  copyrightLi.classList.add('footer-brand__left--item');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text');
  if (copyrightRow) {
    copyrightSpan.textContent = copyrightRow.textContent.trim();
    moveInstrumentation(copyrightRow, copyrightSpan);
  }
  copyrightLi.append(copyrightSpan);
  footerLeftList.append(copyrightLi);

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand__right');
  secondaryContent.append(footerBrandRightSecondary);

  const footerRightList = document.createElement('ul');
  footerRightList.classList.add(
    'footer-brand__right--list',
    'd-flex',
    'align-items-center',
    'justify-content-center'
  );
  footerBrandRightSecondary.append(footerRightList);

  // Footer Social Links
  footerSocialLinks.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(c => c.querySelector('picture')); // Icon cell
    const linkCell = cells.find(c => c.querySelector('a')); // Link cell

    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const link = document.createElement('a');
    link.classList.add('footer-brand__right--link', 'cta-analytics');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      moveInstrumentation(row, link); // Instrument the row to the link
      link.target = '_blank'; // Assuming social links open in new tab
    } else {
      link.href = '#';
    }

    const picture = iconCell?.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '48' }]);
      optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
      optimizedPic.querySelector('img').setAttribute('aria-label', img.alt);
      moveInstrumentation(iconCell, optimizedPic.querySelector('img'));
      link.append(optimizedPic);
    }
    li.append(link);
    footerRightList.append(li);
  });

  block.replaceChildren(root);
}
