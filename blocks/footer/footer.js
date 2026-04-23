import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    li.classList.add('footer-list__item'); // Add class from original HTML
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    if (anchor) {
      anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block'); // Add classes from original HTML
      anchor.setAttribute('data-link-region', 'Footer');
    } else {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        span.classList.add('footer-list__item--link', 'd-inline-block'); // Add classes for non-link items
        textNode.remove();
        li.prepend(span);
      }
    }

    if (nested) {
      nested.classList.add('footer-list'); // Add class from original HTML
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('nav-dropdown'); // Use class from original HTML
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

  // Use content detection instead of fixed indices for root fields
  const primaryLogoRow = children.find(row => row.children.length === 1 && row.querySelector('picture'));
  const primaryLogoLinkRow = children.find(row => row.children.length === 1 && row.querySelector('a') && row !== primaryLogoLinkRow); // Ensure it's not the same as primaryLogoRow
  const secondaryLogoRow = children.find(row => row.children.length === 1 && row.querySelector('picture') && row !== primaryLogoRow);

  const copyrightTextRow = children.find((row) => row.children.length === 1 && !row.querySelector('picture') && !row.querySelector('a'));

  const footerNavigationItems = children.filter(
    (row) => row.children.length === 3 && row.querySelector('ul'),
  );
  const footerSecondaryLinks = children.filter(
    (row) => row.children.length === 2,
  );
  const footerSocialLinks = children.filter(
    (row) => row.children.length === 3 && row.querySelector('picture'),
  );

  const sectionContainer = document.createElement('section');
  sectionContainer.classList.add('container-hd', 'fmm-container', 'p-0');
  moveInstrumentation(block, sectionContainer);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  sectionContainer.append(footerBrand);

  // Footer Brand Primary
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');
  footerBrandPrimary.style.backgroundColor = ''; // From original HTML
  footerBrand.append(footerBrandPrimary);

  const containerFmm = document.createElement('div');
  containerFmm.classList.add('container', 'fmm-container');
  footerBrandPrimary.append(containerFmm);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add(
    'footer-brand__primary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );
  containerFmm.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(footerBrandLeft);

  // Primary Logo
  if (primaryLogoRow) {
    const primaryLogoLink = document.createElement('a');
    primaryLogoLink.classList.add(
      'footer-brand__logo',
      'd-inline-block',
      'cta-analytics',
    );
    primaryLogoLink.setAttribute('data-link-region', 'Footer');
    primaryLogoLink.setAttribute('aria-label', 'logo');

    const primaryLogoImg = primaryLogoRow.querySelector('picture > img');
    if (primaryLogoImg) {
      const optimizedPic = createOptimizedPicture(
        primaryLogoImg.src,
        primaryLogoImg.alt,
        false,
        [{ width: '750' }],
      );
      moveInstrumentation(primaryLogoImg, optimizedPic.querySelector('img'));
      primaryLogoLink.append(optimizedPic);
    }
    const primaryLink = primaryLogoLinkRow?.querySelector('a'); // Use optional chaining
    if (primaryLink) {
      primaryLogoLink.href = primaryLink.href;
    }
    moveInstrumentation(primaryLogoRow, primaryLogoLink);
    if (primaryLogoLinkRow) moveInstrumentation(primaryLogoLinkRow, primaryLogoLink); // Move instrumentation for the link row too
    footerBrandLeft.append(primaryLogoLink);
  }

  // Secondary Logo
  if (secondaryLogoRow) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
    const secondaryLogoImg = secondaryLogoRow.querySelector('picture > img');
    if (secondaryLogoImg) {
      const optimizedPic = createOptimizedPicture(
        secondaryLogoImg.src,
        secondaryLogoImg.alt,
        false,
        [{ width: '750' }],
      );
      moveInstrumentation(secondaryLogoImg, optimizedPic.querySelector('img'));
      secondaryLogoDiv.append(optimizedPic);
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

  const navbarLeft = document.createElement('div');
  navbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(navbarLeft);

  const navbarRight = document.createElement('div');
  navbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(navbarRight);

  // Footer Navigation Items
  const footerListLeft = document.createElement('div');
  footerListLeft.classList.add('footerList');
  const footerListRight = document.createElement('div');
  footerListRight.classList.add('footerList');

  const navUlLeft = document.createElement('ul');
  navUlLeft.classList.add(
    'footer-list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'align-items-md-start',
    'flex-column',
  );
  footerListLeft.append(navUlLeft);

  const navUlRight = document.createElement('ul');
  navUlRight.classList.add(
    'footer-list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'align-items-md-start',
    'flex-column',
  );
  footerListRight.append(navUlRight);

  footerNavigationItems.forEach((row, index) => {
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
      rootEl.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      rootEl.setAttribute('data-link-region', 'Footer');
    } else {
      rootEl = document.createElement('span');
      rootEl.classList.add('footer-list__item--link', 'd-inline-block'); // Add classes for non-link items
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl); // Move instrumentation from the row to the root element
    li.appendChild(rootEl);

    if (hierarchyCell) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML; // Use innerHTML for richtext
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from hierarchy cell

      const hierarchyRoot = tempDiv.querySelector('ul');
      if (hierarchyRoot) {
        hierarchyRoot.classList.add('footer-list'); // Add class from original HTML
        const wrapper = document.createElement('div');
        wrapper.classList.add('nav-dropdown'); // Use class from original HTML
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

    if (index % 2 === 0) {
      navUlLeft.append(li);
    } else {
      navUlRight.append(li);
    }
  });

  navbarLeft.append(footerListLeft);
  navbarRight.append(footerListRight);

  // Footer Brand Secondary
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand__secondary');
  footerBrandSecondary.style.backgroundColor = ''; // From original HTML
  footerBrand.append(footerBrandSecondary);

  const containerFmmSecondary = document.createElement('div');
  containerFmmSecondary.classList.add('container', 'fmm-container');
  footerBrandSecondary.append(containerFmmSecondary);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add(
    'footer-brand__secondary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );
  containerFmmSecondary.append(secondaryContent);

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

  // Footer Secondary Links
  footerSecondaryLinks.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a'));
    const linkCell = cells.find(c => c.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item');

    const link = document.createElement('a');
    link.classList.add('footer-brand__left--link', 'cta-analytics');
    link.setAttribute('data-link-region', 'Footer');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      if (foundLink.target) {
        link.target = foundLink.target;
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        link.append(screenReaderSpan);
      }
    }
    link.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, link);
    li.append(link);
    footerBrandLeftList.append(li);
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

  // Footer Social Links
  footerSocialLinks.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(c => c.querySelector('picture'));
    const linkCell = cells.find(c => c.querySelector('a'));
    const altTextCell = cells.find(c => !c.querySelector('picture') && !c.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add(
      'footer-brand__right--item',
      'd-flex',
      'justify-content-center',
      'align-items-center',
    );

    const link = document.createElement('a');
    link.classList.add('footer-brand__right--link', 'cta-analytics');
    link.setAttribute('data-link-region', 'Footer');
    link.target = '_blank';

    const iconImg = iconCell?.querySelector('picture > img');
    if (iconImg) {
      const optimizedPic = createOptimizedPicture(
        iconImg.src,
        altTextCell?.textContent.trim() || iconImg.alt,
        false,
        [{ width: '750' }],
      );
      moveInstrumentation(iconImg, optimizedPic.querySelector('img'));
      link.append(optimizedPic);
    }

    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.setAttribute('aria-label', altTextCell?.textContent.trim() || foundLink.href);
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      link.append(screenReaderSpan);
    }
    moveInstrumentation(row, link);
    li.append(link);
    footerBrandRightList.append(li);
  });

  block.replaceChildren(sectionContainer);
}
