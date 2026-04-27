import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    // Handle label-only nodes
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
      // Use classes from ORIGINAL HTML if available, otherwise generic
      subWrap.classList.add('nav-dropdown'); // Using a class from the original HTML for dropdown wrapper
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

  const [
    primaryLogoRow,
    primaryLogoLinkRow,
    secondaryLogoRow,
    itcPortalLinkRow,
    itcPortalLabelRow,
    copyrightRow,
    ...itemRows
  ] = children;

  // Content detection for item rows based on number of cells
  const navigationItems = itemRows.filter((row) => [...row.children].length === 3);
  const socialLinks = itemRows.filter((row) => [...row.children].length === 2);

  const sectionContainer = document.createElement('section');
  sectionContainer.classList.add('container-hd', 'fmm-container', 'p-0');

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  sectionContainer.append(footerBrand);

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
    'align-items-center'
  );
  primaryContainer.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(footerBrandLeft);

  // Primary Logo and Link
  const primaryLogoLink = document.createElement('a');
  primaryLogoLink.classList.add(
    'footer-brand__logo',
    'd-inline-block',
    'cta-analytics'
  );
  primaryLogoLink.setAttribute('aria-label', 'logo');
  const primaryLink = primaryLogoLinkRow.querySelector('a');
  if (primaryLink) {
    primaryLogoLink.href = primaryLink.href;
  }
  const primaryPicture = primaryLogoRow.querySelector('picture');
  if (primaryPicture) {
    const primaryImg = primaryPicture.querySelector('img');
    const optimizedPrimaryPic = createOptimizedPicture(primaryImg.src, primaryImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(primaryImg, optimizedPrimaryPic.querySelector('img'));
    primaryLogoLink.append(optimizedPrimaryPic);
  }
  moveInstrumentation(primaryLogoRow, primaryLogoLink);
  moveInstrumentation(primaryLogoLinkRow, primaryLogoLink);
  footerBrandLeft.append(primaryLogoLink);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryPicture) {
    const secondaryImg = secondaryPicture.querySelector('img');
    const optimizedSecondaryPic = createOptimizedPicture(secondaryImg.src, secondaryImg.alt, false, [{ width: '750' }]);
    moveInstrumentation(secondaryImg, optimizedSecondaryPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedSecondaryPic);
  }
  moveInstrumentation(secondaryLogoRow, secondaryLogoDiv);
  footerBrandLeft.append(secondaryLogoDiv);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  primaryContent.append(footerBrandRight);

  // Navigation
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

  const navLists = [];
  let currentList = null;
  navigationItems.forEach((row, i) => {
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
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl); // Move instrumentation from the whole row to the root element
    li.appendChild(rootEl);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('nav-dropdown'); // Class from ORIGINAL HTML
      // Move instrumentation from the hierarchy cell to the wrapper
      moveInstrumentation(hierarchyCell, wrapper);
      // Append innerHTML to preserve structure
      wrapper.innerHTML = hierarchyCell.innerHTML;
      
      // Apply classes to nested elements if needed, based on ORIGINAL HTML
      wrapper.querySelectorAll('ul').forEach(ul => ul.classList.add('footer-list')); // Example class
      wrapper.querySelectorAll('li').forEach(liItem => liItem.classList.add('footer-list__item')); // Example class
      wrapper.querySelectorAll('a').forEach(a => a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link')); // Example class

      rootEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrapper.classList.toggle('active');
        li.classList.toggle('active');
      });
      li.appendChild(wrapper);
      // Transform nested lists within the wrapper
      transformNestedLists(wrapper);
    }

    if (i % 2 === 0) { // Group into two lists for left and right
      currentList = document.createElement('ul');
      currentList.classList.add(
        'footer-list',
        'd-flex',
        'align-items-center',
        'justify-content-center',
        'align-items-md-start',
        'flex-column'
      );
      const footerListDiv = document.createElement('div');
      footerListDiv.classList.add('footerList');
      footerListDiv.append(currentList);
      navLists.push(footerListDiv);
    }
    currentList.append(li);
  });

  navLists.forEach((listDiv, index) => {
    if (index < 2) {
      footerNavbarLeft.append(listDiv);
    } else {
      footerNavbarRight.append(listDiv);
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
    'align-items-center'
  );
  secondaryContainer.append(secondaryContent);

  const footerBrandLeftListSection = document.createElement('section');
  footerBrandLeftListSection.classList.add('footer-brand__left');
  secondaryContent.append(footerBrandLeftListSection);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add(
    'footer-brand__left--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-wrap'
  );
  footerBrandLeftListSection.append(footerBrandLeftList);

  // ITC Portal Link
  const itcPortalListItem = document.createElement('li');
  itcPortalListItem.classList.add('footer-brand__left--item');
  const itcPortalAnchor = document.createElement('a');
  itcPortalAnchor.classList.add('footer-brand__left--link', 'cta-analytics');
  const itcLink = itcPortalLinkRow.querySelector('a');
  if (itcLink) {
    itcPortalAnchor.href = itcLink.href;
    itcPortalAnchor.setAttribute('target', '_blank'); // Assuming external link
  }
  itcPortalAnchor.textContent = itcPortalLabelRow?.textContent.trim() || '';
  const screenReaderSpan = document.createElement('span');
  screenReaderSpan.classList.add('cmp-link__screen-reader-only');
  screenReaderSpan.textContent = 'opens in a new tab';
  itcPortalAnchor.append(screenReaderSpan);
  moveInstrumentation(itcPortalLinkRow, itcPortalAnchor);
  moveInstrumentation(itcPortalLabelRow, itcPortalAnchor);
  itcPortalListItem.append(itcPortalAnchor);
  footerBrandLeftList.append(itcPortalListItem);

  // Copyright Text
  const copyrightListItem = document.createElement('li');
  copyrightListItem.classList.add('footer-brand__left--item');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text');
  copyrightSpan.textContent = copyrightRow?.textContent.trim() || '';
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightListItem.append(copyrightSpan);
  footerBrandLeftList.append(copyrightListItem);

  const footerBrandRightSocialSection = document.createElement('section');
  footerBrandRightSocialSection.classList.add('footer-brand__right');
  secondaryContent.append(footerBrandRightSocialSection);

  const footerBrandRightList = document.createElement('ul');
  footerBrandRightList.classList.add(
    'footer-brand__right--list',
    'd-flex',
    'align-items-center',
    'justify-content-center'
  );
  footerBrandRightSocialSection.append(footerBrandRightList);

  // Social Links
  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells[0];
    const linkCell = cells[1];

    const socialListItem = document.createElement('li');
    socialListItem.classList.add(
      'footer-brand__right--item',
      'd-flex',
      'justify-content-center',
      'align-items-center'
    );
    const socialAnchor = document.createElement('a');
    socialAnchor.classList.add('footer-brand__right--link', 'cta-analytics');
    const socialLink = linkCell.querySelector('a');
    if (socialLink) {
      socialAnchor.href = socialLink.href;
      socialAnchor.setAttribute('target', '_blank'); // Assuming external link
    }
    const socialPicture = iconCell.querySelector('picture');
    if (socialPicture) {
      const socialImg = socialPicture.querySelector('img');
      socialAnchor.setAttribute('aria-label', socialImg.alt);
      const optimizedSocialPic = createOptimizedPicture(socialImg.src, socialImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(socialImg, optimizedSocialPic.querySelector('img'));
      socialAnchor.append(optimizedSocialPic);
    }
    const socialScreenReaderSpan = document.createElement('span');
    socialScreenReaderSpan.classList.add('cmp-link__screen-reader-only');
    socialScreenReaderSpan.textContent = 'opens in a new tab';
    socialAnchor.append(socialScreenReaderSpan);
    moveInstrumentation(row, socialAnchor);
    socialListItem.append(socialAnchor);
    footerBrandRightList.append(socialListItem);
  });

  block.replaceChildren(sectionContainer);
}
