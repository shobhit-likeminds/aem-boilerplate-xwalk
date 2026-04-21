import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, originalCell) {
  rootUl.querySelectorAll('li').forEach((li) => {
    li.classList.add('nav-menu-item', 'list-item'); // From ORIGINAL HTML if applicable
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Normalize label-only nodes
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
      nested.remove(); // Remove from current position to re-append
      nested.classList.add('nav-sub-menu', 'list-group'); // From ORIGINAL HTML if applicable
      nested.querySelectorAll('li').forEach((nestedLi) => nestedLi.classList.add('nav-sub-menu-item', 'list-item'));
      nested.querySelectorAll('a').forEach((nestedA) => nestedA.classList.add('nav-sub-menu-link', 'list-item-link'));

      const subWrap = document.createElement('div');
      subWrap.classList.add('has-sub-child'); // Use ORIGINAL HTML class if available, otherwise a semantic name
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
  moveInstrumentation(originalCell, rootUl); // Move instrumentation for the entire hierarchy
}

export default function decorate(block) {
  const children = [...block.children];

  // Destructure the known root fields
  const primaryLogoRow = children[0];
  const primaryLogoLinkRow = children[1];
  const secondaryLogoRow = children[2];
  const itcPortalLinkRow = children[3];
  const copyrightTextRow = children[4];

  // Filter item rows based on their cell count as per BlockJson
  const itemRows = children.slice(5); // All rows after the fixed root fields are item rows
  const navLinks = itemRows.filter((row) => [...row.children].length === 3);
  const socialLinks = itemRows.filter((row) => [...row.children].length === 2);

  const footerSection = document.createElement('section');
  footerSection.classList.add('container-hd', 'fmm-container', 'p-0');

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  footerSection.append(footerBrand);

  // Footer Brand Primary
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');
  footerBrand.append(footerBrandPrimary);

  const containerPrimary = document.createElement('div');
  containerPrimary.classList.add('container', 'fmm-container');
  footerBrandPrimary.append(containerPrimary);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add(
    'footer-brand__primary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );
  containerPrimary.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(footerBrandLeft);

  // Primary Logo and Link
  if (primaryLogoRow && primaryLogoLinkRow) {
    const primaryLogoPictureCell = [...primaryLogoRow.children].find(c => c.querySelector('picture'));
    const primaryLogoLinkCell = [...primaryLogoLinkRow.children].find(c => c.querySelector('a'));

    if (primaryLogoPictureCell && primaryLogoLinkCell) {
      const primaryLogoPicture = primaryLogoPictureCell.querySelector('picture');
      const primaryLogoLink = primaryLogoLinkCell.querySelector('a');

      if (primaryLogoPicture && primaryLogoLink) {
        const logoAnchor = document.createElement('a');
        logoAnchor.classList.add(
          'footer-brand__logo',
          'd-inline-block',
          'cta-analytics',
        );
        logoAnchor.href = primaryLogoLink.href;
        logoAnchor.setAttribute('aria-label', 'logo');
        moveInstrumentation(primaryLogoLinkCell, logoAnchor); // Instrumentation for the link cell

        const img = primaryLogoPicture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          logoAnchor.append(optimizedPic);
          logoAnchor.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
        }
        footerBrandLeft.append(logoAnchor);
        moveInstrumentation(primaryLogoPictureCell, logoAnchor); // Instrumentation for the picture cell
      }
    }
  }

  // Secondary Logo
  if (secondaryLogoRow) {
    const secondaryLogoPictureCell = [...secondaryLogoRow.children].find(c => c.querySelector('picture'));
    if (secondaryLogoPictureCell) {
      const secondaryLogoPicture = secondaryLogoPictureCell.querySelector('picture');
      if (secondaryLogoPicture) {
        const secondaryLogoDiv = document.createElement('div');
        secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
        const img = secondaryLogoPicture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          secondaryLogoDiv.append(optimizedPic);
          secondaryLogoDiv.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
        }
        footerBrandLeft.append(secondaryLogoDiv);
        moveInstrumentation(secondaryLogoPictureCell, secondaryLogoDiv);
      }
    }
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  primaryContent.append(footerBrandRight);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add(
    'footer-brand__navbar--left',
    'd-flex',
    'flex-column',
    'flex-md-row',
  );
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add(
    'footer-brand__navbar--right',
    'd-flex',
    'flex-column',
    'flex-md-row',
  );
  footerBrandNavbar.append(footerBrandNavbarRight);

  // Navigation Links
  const navLinkGroups = [];
  let currentGroup = [];
  navLinks.forEach((row, index) => {
    currentGroup.push(row);
    if ((index + 1) % 2 === 0 || index === navLinks.length - 1) {
      navLinkGroups.push(currentGroup);
      currentGroup = [];
    }
  });

  navLinkGroups.forEach((group, groupIndex) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const footerListUl = document.createElement('ul');
    footerListUl.classList.add(
      'footer-list',
      'd-flex',
      'align-items-center',
      'justify-content-center',
      'align-items-md-start',
      'flex-column',
    );
    footerListDiv.append(footerListUl);

    group.forEach((row) => {
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
        rootEl.classList.add('footer-list__item--link', 'd-inline-block');
      }
      rootEl.textContent = labelCell?.textContent.trim() || '';
      moveInstrumentation(row, rootEl); // Instrumentation for the item row
      li.appendChild(rootEl);

      const hierarchyRoot = hierarchyCell?.querySelector('ul');
      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('nav-dropdown');

        // Use innerHTML to preserve structure and then move instrumentation
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML;
        const processedHierarchyUl = tempDiv.querySelector('ul');

        if (processedHierarchyUl) {
          wrapper.appendChild(processedHierarchyUl);
          transformNestedLists(processedHierarchyUl, hierarchyCell); // Pass original cell for instrumentation
        }

        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
      }
      footerListUl.append(li);
    });

    if (groupIndex < navLinkGroups.length / 2) {
      footerBrandNavbarLeft.append(footerListDiv);
    } else {
      footerBrandNavbarRight.append(footerListDiv);
    }
  });

  // Footer Brand Secondary
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand__secondary');
  footerBrand.append(footerBrandSecondary);

  const containerSecondary = document.createElement('div');
  containerSecondary.classList.add('container', 'fmm-container');
  footerBrandSecondary.append(containerSecondary);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add(
    'footer-brand__secondary--content',
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-md-between',
    'align-items-center',
  );
  containerSecondary.append(secondaryContent);

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

  // ITC Portal Link
  if (itcPortalLinkRow) {
    const itcLinkCell = [...itcPortalLinkRow.children].find(c => c.querySelector('a'));
    if (itcLinkCell) {
      const itcLink = itcLinkCell.querySelector('a');
      if (itcLink) {
        const li = document.createElement('li');
        li.classList.add('footer-brand__left--item');
        const anchor = document.createElement('a');
        anchor.href = itcLink.href;
        anchor.classList.add('footer-brand__left--link', 'cta-analytics');
        anchor.setAttribute('target', '_blank');
        anchor.textContent = 'ITC Portal'; // Hardcoded as per original HTML, but should ideally come from a label field
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        anchor.append(screenReaderSpan);
        li.append(anchor);
        footerBrandLeftList.append(li);
        moveInstrumentation(itcLinkCell, li);
      }
    }
  }

  // Copyright Text
  if (copyrightTextRow) {
    const copyrightTextCell = [...copyrightTextRow.children].find(c => c.textContent.trim());
    if (copyrightTextCell) {
      const li = document.createElement('li');
      li.classList.add('footer-brand__left--item');
      const span = document.createElement('span');
      span.classList.add('footer-brand__left--text');
      span.textContent = copyrightTextCell.textContent.trim();
      li.append(span);
      footerBrandLeftList.append(li);
      moveInstrumentation(copyrightTextCell, li);
    }
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

  // Social Links
  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(c => c.querySelector('picture'));
    const linkCell = cells.find(c => c.querySelector('a'));

    if (iconCell && linkCell) {
      const iconPicture = iconCell.querySelector('picture');
      const socialLink = linkCell.querySelector('a');

      if (iconPicture && socialLink) {
        const li = document.createElement('li');
        li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

        const anchor = document.createElement('a');
        anchor.href = socialLink.href;
        anchor.classList.add('footer-brand__right--link', 'cta-analytics');
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('aria-label', iconPicture.querySelector('img')?.alt || 'Social Media Link');

        const img = iconPicture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          anchor.append(optimizedPic);
          anchor.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
        }

        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        anchor.append(screenReaderSpan);

        li.append(anchor);
        footerBrandRightList.append(li);
        moveInstrumentation(row, li);
      }
    }
  });

  block.replaceChildren(footerSection);

  // Optimize all images in the footer
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
