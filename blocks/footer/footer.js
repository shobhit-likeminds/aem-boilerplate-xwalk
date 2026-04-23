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
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Destructure root fields based on BlockJson model
  const [
    logoRow,
    logoLinkRow,
    secondaryLogoRow,
    copyrightTextRow,
    ...itemRows // All item rows follow the fixed root fields
  ] = children;

  const footer = document.createElement('section');
  footer.classList.add('container-hd', 'fmm-container', 'p-0');

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  footer.append(footerBrand);

  // Footer Brand Primary Section
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');
  footerBrandPrimary.style.backgroundColor = ''; // Keep empty as per original
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
    'align-items-center'
  );
  primaryContainer.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(footerBrandLeft);

  // Primary Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
  logoLink.setAttribute('aria-label', 'logo');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  const primaryLogoPicture = logoRow.querySelector('picture');
  if (primaryLogoPicture) {
    const img = primaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoRow, logoLink);
  moveInstrumentation(logoLinkRow, logoLink);
  footerBrandLeft.append(logoLink);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedPic);
  }
  moveInstrumentation(secondaryLogoRow, secondaryLogoDiv);
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

  // Filter item rows based on their structure as per BlockJson model
  const navItems = itemRows.filter((row) => [...row.children].length === 3); // Navigation Items: label, link, hierarchy-tree
  const brandLeftLinkItems = itemRows.filter((row) => [...row.children].length === 2 && !row.querySelector('picture')); // Brand Left Link Items: label, link
  const socialLinkItems = itemRows.filter((row) => [...row.children].length === 2 && row.querySelector('picture')); // Social Link Items: icon, link

  // Navigation Items
  const navGroups = [[], [], [], []]; // 4 groups as per original HTML structure
  navItems.forEach((row, i) => {
    // Destructure cells for footer-navigation-item
    const [labelCell, linkCell, hierarchyCell] = [...row.children];

    const groupIndex = i % 4; // Distribute items into 4 groups

    const footerListItem = document.createElement('li');
    footerListItem.classList.add('footer-list__item');

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
    moveInstrumentation(row, rootEl); // Move instrumentation from the item row to the root element
    footerListItem.appendChild(rootEl);

    // Handle richtext 'hierarchy-tree' field
    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('nav-dropdown'); // Class from ORIGINAL HTML
      
      // Create a temporary div to hold the innerHTML and apply instrumentation
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from the cell to the tempDiv

      // Apply classes to nested elements from ORIGINAL HTML
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('cta-analytics'));
      // No specific classes for ul/li in original HTML for this context, but if there were, they'd be added here.

      // Move children from tempDiv to wrapper
      while (tempDiv.firstChild) {
        wrapper.append(tempDiv.firstChild);
      }

      rootEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrapper.classList.toggle('active');
        footerListItem.classList.toggle('active');
      });
      footerListItem.appendChild(wrapper);
      transformNestedLists(wrapper.querySelector('ul')); // Pass the actual UL inside the wrapper
    }
    navGroups[groupIndex].push(footerListItem);
  });

  navGroups.forEach((group, index) => {
    if (group.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.classList.add('footerList');
      const footerListUl = document.createElement('ul');
      footerListUl.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
      group.forEach((item) => footerListUl.append(item));
      footerListDiv.append(footerListUl);

      if (index < 2) {
        footerBrandNavbarLeft.append(footerListDiv);
      } else {
        footerBrandNavbarRight.append(footerListDiv);
      }
    }
  });

  // Footer Brand Secondary Section
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand__secondary');
  footerBrandSecondary.style.backgroundColor = ''; // Keep empty as per original
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
    'align-items-center'
  );
  secondaryContainer.append(secondaryContent);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left');
  secondaryContent.append(footerBrandLeftSecondary);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  footerBrandLeftSecondary.append(footerBrandLeftList);

  // Brand Left Links
  brandLeftLinkItems.forEach((row) => {
    // Destructure cells for footer-brand-left-link-item
    const [labelCell, linkCell] = [...row.children];
    const footerBrandLeftItem = document.createElement('li');
    footerBrandLeftItem.classList.add('footer-brand__left--item');

    const link = document.createElement('a');
    link.classList.add('footer-brand__left--link', 'cta-analytics');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.target = '_blank'; // Assuming external links based on original HTML
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      link.append(screenReaderSpan);
    }
    link.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, link); // Move instrumentation from the item row to the link
    footerBrandLeftItem.append(link);
    footerBrandLeftList.append(footerBrandLeftItem);
  });

  // Copyright Text
  const copyrightItem = document.createElement('li');
  copyrightItem.classList.add('footer-brand__left--item');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text');
  copyrightSpan.textContent = copyrightTextRow.textContent.trim();
  moveInstrumentation(copyrightTextRow, copyrightSpan);
  copyrightItem.append(copyrightSpan);
  footerBrandLeftList.append(copyrightItem);

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand__right');
  secondaryContent.append(footerBrandRightSecondary);

  const footerBrandRightList = document.createElement('ul');
  footerBrandRightList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center');
  footerBrandRightSecondary.append(footerBrandRightList);

  // Social Links
  socialLinkItems.forEach((row) => {
    // Destructure cells for footer-social-link-item
    const [iconCell, linkCell] = [...row.children];
    const footerBrandRightItem = document.createElement('li');
    footerBrandRightItem.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const socialLink = document.createElement('a');
    socialLink.classList.add('footer-brand__right--link', 'cta-analytics');
    const foundSocialLink = linkCell.querySelector('a');
    if (foundSocialLink) {
      socialLink.href = foundSocialLink.href;
      socialLink.target = '_blank'; // Assuming external links
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      socialLink.append(screenReaderSpan);
    }

    const iconPicture = iconCell.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      socialLink.append(optimizedPic);
      socialLink.setAttribute('aria-label', img.alt || 'Social Icon');
    }
    moveInstrumentation(row, socialLink); // Move instrumentation from the item row to the social link
    footerBrandRightItem.append(socialLink);
    footerBrandRightList.append(footerBrandRightItem);
  });

  block.replaceChildren(footer);

  // Image optimization for all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
