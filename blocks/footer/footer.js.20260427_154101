import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    // Add classes to li elements
    li.classList.add('nav-menu-item', 'list-item'); // Added from ORIGINAL HTML context

    const nested = li.querySelector(':scope > ul');
    // Handle label-only nodes
    const anchor = li.querySelector(':scope > a');
    if (anchor) {
      // Add classes to anchor elements
      anchor.classList.add('nav-menu-link'); // Added from ORIGINAL HTML context
    } else {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim()
      );
      if (textNode) {
        const span = document.createElement('span');
        span.classList.add('nav-menu-link'); // Apply similar styling for non-link labels
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
      }
    }
    if (nested) {
      // Add classes to ul elements
      nested.classList.add('nav-menu-dropdown'); // Added from ORIGINAL HTML context

      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('nav-dropdown'); // Use original HTML class if available, otherwise generic
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

  const [
    logoRow,
    logoLinkRow,
    secondaryLogoRow,
    ...remainingRows
  ] = children;

  // Filter item rows based on cell count for different item types
  const footerLinksItemRows = remainingRows.filter(row => row.children.length === 3);
  const socialLinksItemRows = remainingRows.filter(row => row.children.length === 2);

  // Determine the position of the fixed fields after the item rows
  const fixedRowsAfterItems = remainingRows.slice(footerLinksItemRows.length + socialLinksItemRows.length);

  const copyrightRow = fixedRowsAfterItems.find(row => row.textContent.trim().startsWith('©'));
  const itcPortalLinkRow = fixedRowsAfterItems.find(row => row.querySelector('a') && row.querySelector('a').href.includes('itcportal.com'));
  const itcPortalLabelRow = fixedRowsAfterItems.find(row => row.textContent.trim() === 'ITC Portal');


  const footerSection = document.createElement('section');
  footerSection.classList.add('container-hd', 'fmm-container', 'p-0');

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  footerSection.append(footerBrand);

  // Footer Brand Primary Section
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');
  footerBrand.append(footerBrandPrimary);

  const containerPrimary = document.createElement('div');
  containerPrimary.classList.add('container', 'fmm-container');
  footerBrandPrimary.append(containerPrimary);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  containerPrimary.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(footerBrandLeft);

  // Main Logo
  const mainLogoLink = document.createElement('a');
  mainLogoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
  mainLogoLink.setAttribute('aria-label', 'logo');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    mainLogoLink.href = foundLogoLink.href;
  }
  const mainLogoPicture = logoRow.querySelector('picture');
  if (mainLogoPicture) {
    const img = mainLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    mainLogoLink.append(optimizedPic);
  }
  moveInstrumentation(logoRow, mainLogoLink);
  moveInstrumentation(logoLinkRow, mainLogoLink);
  footerBrandLeft.append(mainLogoLink);

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

  // Footer Links
  const footerLinkLists = [];
  footerLinksItemRows.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
    
    // Use a temporary div to parse the richtext HTML and apply instrumentation/classes
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = hierarchyCell?.innerHTML || '';
    const hierarchyRoot = tempDiv.querySelector('ul');

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
      rootEl.classList.add('footer-list__item--link', 'd-inline-block'); // Apply similar styling for non-link labels
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl); // Move instrumentation from the whole row to the root element
    li.appendChild(rootEl);

    if (hierarchyRoot) {
      // Apply classes to elements within the hierarchyRoot before appending
      hierarchyRoot.classList.add('nav-menu'); // Added from ORIGINAL HTML context
      hierarchyRoot.querySelectorAll('li').forEach(item => item.classList.add('nav-menu-item', 'list-item'));
      hierarchyRoot.querySelectorAll('a').forEach(link => link.classList.add('nav-menu-link'));
      hierarchyRoot.querySelectorAll('ul').forEach(subUl => subUl.classList.add('nav-menu-dropdown'));

      const wrapper = document.createElement('div');
      wrapper.classList.add('nav-dropdown'); // Use original HTML class
      
      // Move instrumentation from the hierarchyCell to the wrapper
      moveInstrumentation(hierarchyCell, wrapper);
      
      // Move all children from tempDiv (which now contains the hierarchyRoot with classes) to the wrapper
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

    // Distribute footer links into two columns
    if (footerLinkLists.length < 2) {
      const footerListDiv = document.createElement('div');
      footerListDiv.classList.add('footerList');
      const ul = document.createElement('ul');
      ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
      footerListDiv.append(ul);
      footerLinkLists.push(ul);
      footerBrandNavbarLeft.append(footerListDiv);
    } else if (footerLinkLists.length < 4) { // Allow for up to 4 columns if needed, matching original HTML structure
      const footerListDiv = document.createElement('div');
      footerListDiv.classList.add('footerList');
      const ul = document.createElement('ul');
      ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
      footerListDiv.append(ul);
      footerLinkLists.push(ul);
      footerBrandNavbarRight.append(footerListDiv);
    }

    const targetListIndex = footerLinkLists.length - 1;
    footerLinkLists[targetListIndex].append(li);
  });

  // Footer Brand Secondary Section
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand__secondary');
  footerBrand.append(footerBrandSecondary);

  const containerSecondary = document.createElement('div');
  containerSecondary.classList.add('container', 'fmm-container');
  footerBrandSecondary.append(containerSecondary);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  containerSecondary.append(secondaryContent);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left');
  secondaryContent.append(footerBrandLeftSecondary);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  footerBrandLeftSecondary.append(footerBrandLeftList);

  // ITC Portal Link
  if (itcPortalLinkRow && itcPortalLabelRow) {
    const itcPortalLi = document.createElement('li');
    itcPortalLi.classList.add('footer-brand__left--item');
    const itcPortalAnchor = document.createElement('a');
    itcPortalAnchor.classList.add('footer-brand__left--link', 'cta-analytics');
    const foundItcLink = itcPortalLinkRow?.querySelector('a');
    if (foundItcLink) {
      itcPortalAnchor.href = foundItcLink.href;
      itcPortalAnchor.target = '_blank'; // Assuming external link
    }
    itcPortalAnchor.textContent = itcPortalLabelRow?.textContent.trim() || '';
    const screenReaderOnlySpan = document.createElement('span');
    screenReaderOnlySpan.classList.add('cmp-link__screen-reader-only');
    screenReaderOnlySpan.textContent = 'opens in a new tab';
    itcPortalAnchor.append(screenReaderOnlySpan);
    moveInstrumentation(itcPortalLinkRow, itcPortalAnchor);
    moveInstrumentation(itcPortalLabelRow, itcPortalAnchor);
    itcPortalLi.append(itcPortalAnchor);
    footerBrandLeftList.append(itcPortalLi);
  }


  // Copyright Notice
  if (copyrightRow) {
    const copyrightLi = document.createElement('li');
    copyrightLi.classList.add('footer-brand__left--item');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand__left--text');
    copyrightSpan.textContent = copyrightRow?.textContent.trim() || '';
    moveInstrumentation(copyrightRow, copyrightSpan);
    copyrightLi.append(copyrightSpan);
    footerBrandLeftList.append(copyrightLi);
  }

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand__right');
  secondaryContent.append(footerBrandRightSecondary);

  const footerBrandRightList = document.createElement('ul');
  footerBrandRightList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center');
  footerBrandRightSecondary.append(footerBrandRightList);

  // Social Links
  socialLinksItemRows.forEach((row) => {
    const [linkCell, iconCell] = [...row.children];

    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const socialLink = document.createElement('a');
    socialLink.classList.add('footer-brand__right--link', 'cta-analytics');
    const foundSocialLink = linkCell.querySelector('a');
    if (foundSocialLink) {
      socialLink.href = foundSocialLink.href;
      socialLink.target = '_blank'; // Assuming external social links
    }
    const socialIconPicture = iconCell.querySelector('picture');
    if (socialIconPicture) {
      const img = socialIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      socialLink.append(optimizedPic);
      socialLink.setAttribute('aria-label', img.alt);
    }
    const socialScreenReaderSpan = document.createElement('span');
    socialScreenReaderSpan.classList.add('cmp-link__screen-reader-only');
    socialScreenReaderSpan.textContent = 'opens in a new tab';
    socialLink.append(socialScreenReaderSpan);

    moveInstrumentation(row, socialLink);
    li.append(socialLink);
    footerBrandRightList.append(li);
  });

  block.replaceChildren(footerSection);
}
