import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    li.classList.add('footer-list__item'); // Add class from ORIGINAL HTML
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (anchor) {
      anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block'); // Add classes from ORIGINAL HTML
      anchor.setAttribute('data-link-region', 'Footer');
    } else {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        span.classList.add('footer-list__item--link', 'd-inline-block'); // Add classes for consistency
        textNode.remove();
        li.prepend(span);
      }
    }

    if (nested) {
      nested.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column'); // Add classes from ORIGINAL HTML
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('nav-dropdown'); // Class from generated JS, assuming it's intended for dropdown behavior
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
    primaryLogoRow,
    primaryLogoLinkRow,
    secondaryLogoRow,
    copyrightRow,
    ...itemRows
  ] = [...block.children];

  const footerSection = document.createElement('section');
  footerSection.classList.add('container-hd', 'fmm-container', 'p-0');
  moveInstrumentation(block, footerSection);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  footerSection.append(footerBrand);

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
  footerBrandLeft.classList.add(
    'footer-brand__left',
    'd-flex',
    'gap-5',
    'align-items-center',
  );
  primaryContent.append(footerBrandLeft);

  // Primary Logo
  const primaryLogoLink = document.createElement('a');
  primaryLogoLink.classList.add(
    'footer-brand__logo',
    'd-inline-block',
    'cta-analytics',
  );
  primaryLogoLink.setAttribute('data-link-region', 'Footer');
  primaryLogoLink.setAttribute('aria-label', 'logo');

  const primaryLogoPicture = primaryLogoRow.querySelector('picture');
  if (primaryLogoPicture) {
    const img = primaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: '750' },
    ]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    primaryLogoLink.append(optimizedPic);
  }

  const primaryLink = primaryLogoLinkRow.querySelector('a');
  if (primaryLink) {
    primaryLogoLink.href = primaryLink.href;
  }
  moveInstrumentation(primaryLogoLinkRow, primaryLogoLink);
  footerBrandLeft.append(primaryLogoLink);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: '750' },
    ]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedPic);
  }
  moveInstrumentation(secondaryLogoRow, secondaryLogoDiv);
  footerBrandLeft.append(secondaryLogoDiv);

  // Footer Navigation
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

  // Filter item rows based on content
  const navigationLinks = itemRows.filter(
    (row) => row.children.length === 3 && row.querySelector('div:nth-child(3) ul'),
  );
  const inlineLinks = itemRows.filter(
    (row) => row.children.length === 2 && !row.querySelector('picture'),
  );
  const socialLinks = itemRows.filter(
    (row) => row.children.length === 2 && row.querySelector('picture'),
  );

  const navLists = [];
  navigationLinks.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a') && !c.querySelector('ul'));
    const linkCell = cells.find(c => c.querySelector('a') && !c.querySelector('ul'));
    const hierarchyCell = cells.find(c => c.querySelector('ul'));

    const li = document.createElement('li');
    li.classList.add('footer-list__item');

    const foundLink = linkCell?.querySelector('a');
    let rootEl;
    if (foundLink) {
      rootEl = document.createElement('a');
      rootEl.href = foundLink.href;
      rootEl.classList.add(
        'cta-analytics',
        'analytics_cta_click',
        'footer-list__item--link',
        'd-inline-block',
      );
      rootEl.setAttribute('data-link-region', 'Footer');
    } else {
      rootEl = document.createElement('span');
      rootEl.classList.add('footer-list__item--link', 'd-inline-block'); // Add classes for consistency
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl); // Move instrumentation from the row to the root element
    li.appendChild(rootEl);

    if (hierarchyCell) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML; // Use innerHTML for richtext
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from hierarchyCell to tempDiv

      // Apply classes to nested elements from ORIGINAL HTML
      tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column'));
      tempDiv.querySelectorAll('li').forEach(liEl => liEl.classList.add('footer-list__item'));
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block'));

      const hierarchyRoot = tempDiv.querySelector('ul');
      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('nav-dropdown');
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

    if (!navLists[0] || navLists[0].children.length >= 2) {
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
      navLists.unshift(ul);
      footerNavbarLeft.append(footerListDiv);
    }
    navLists[0].append(li);
  });

  // Inline Links
  if (inlineLinks.length > 0) {
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
    footerNavbarRight.append(footerListDiv);

    inlineLinks.forEach((row) => {
      const cells = [...row.children];
      const labelCell = cells.find(c => !c.querySelector('a'));
      const linkCell = cells.find(c => c.querySelector('a'));

      const li = document.createElement('li');
      li.classList.add('footer-list__item');

      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }
      anchor.textContent = labelCell?.textContent.trim() || '';
      anchor.classList.add(
        'cta-analytics',
        'analytics_cta_click',
        'footer-list__item--link',
        'd-inline-block',
      );
      anchor.setAttribute('data-link-region', 'Footer');
      moveInstrumentation(row, anchor);
      li.append(anchor);
      ul.append(li);
    });
  }

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

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left');
  secondaryContent.append(footerBrandLeftSecondary);

  const leftList = document.createElement('ul');
  leftList.classList.add(
    'footer-brand__left--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-wrap',
  );
  footerBrandLeftSecondary.append(leftList);

  // Copyright
  const copyrightItem = document.createElement('li');
  copyrightItem.classList.add('footer-brand__left--item');
  const copyrightText = document.createElement('span');
  copyrightText.classList.add('footer-brand__left--text');
  copyrightText.textContent = copyrightRow.textContent.trim();
  moveInstrumentation(copyrightRow, copyrightText);
  copyrightItem.append(copyrightText);
  leftList.append(copyrightItem);

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

  socialLinks.forEach((row) => {
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

    const socialLink = document.createElement('a');
    socialLink.classList.add('footer-brand__right--link', 'cta-analytics');
    socialLink.setAttribute('data-link-region', 'Footer');
    socialLink.setAttribute('target', '_blank');

    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      socialLink.href = foundLink.href;
    }

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
        { width: '750' },
      ]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      socialLink.append(optimizedPic);
      socialLink.setAttribute('aria-label', img.alt);
    }
    moveInstrumentation(row, socialLink);
    li.append(socialLink);
    socialList.append(li);
  });

  block.replaceChildren(footerSection);
}
