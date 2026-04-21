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
      subWrap.classList.add('nav-dropdown'); // Using 'nav-dropdown' from ORIGINAL HTML for similar dropdown functionality
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
    copyrightTextRow,
    ...itemRows
  ] = children;

  const rootSection = document.createElement('section');
  rootSection.classList.add('container-hd', 'fmm-container', 'p-0');

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  rootSection.append(footerBrand);

  // Footer Brand Primary Section
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
    'align-items-center'
  );
  containerPrimary.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-5', 'align-items-center');
  primaryContent.append(footerBrandLeft);

  // Primary Logo
  if (primaryLogoRow && primaryLogoLinkRow) {
    const primaryLogoPicture = primaryLogoRow.querySelector('picture');
    const primaryLogoLink = primaryLogoLinkRow.querySelector('a');

    if (primaryLogoPicture && primaryLogoLink) {
      const logoAnchor = document.createElement('a');
      logoAnchor.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
      logoAnchor.href = primaryLogoLink.href;
      logoAnchor.setAttribute('aria-label', 'logo');
      moveInstrumentation(primaryLogoLinkRow, logoAnchor);

      const img = primaryLogoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoAnchor.append(optimizedPic);
      logoAnchor.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');

      footerBrandLeft.append(logoAnchor);
    }
  }

  // Secondary Logo
  if (secondaryLogoRow) {
    const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
    if (secondaryLogoPicture) {
      const secondaryLogoDiv = document.createElement('div');
      secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
      moveInstrumentation(secondaryLogoRow, secondaryLogoDiv);

      const img = secondaryLogoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      secondaryLogoDiv.append(optimizedPic);
      secondaryLogoDiv.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');

      footerBrandLeft.append(secondaryLogoDiv);
    }
  }

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

  // Separate item rows by type
  const primaryNavigationItems = [];
  const secondaryNavigationItems = [];
  const footerLeftLinkItems = [];
  const socialLinkItems = [];

  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 3) {
      // footer-navigation-item
      const hierarchyCell = cells.find(cell => cell.querySelector('ul'));
      if (hierarchyCell) {
        primaryNavigationItems.push(row); // Assuming primary/secondary nav items are indistinguishable by structure alone
      } else {
        // If no hierarchy, it's a simple link, but the model says hierarchy-tree is present.
        // This case should ideally not happen if the model is strictly followed.
        // For robustness, treat as a simple link if hierarchy is empty, but still part of nav.
        primaryNavigationItems.push(row);
      }
    } else if (cells.length === 2) {
      const iconCell = cells.find(cell => cell.querySelector('picture'));
      if (iconCell) {
        // footer-social-link-item
        socialLinkItems.push(row);
      } else {
        // footer-link-item
        footerLeftLinkItems.push(row);
      }
    }
  });

  // Render Primary and Secondary Navigation Links (grouped into two columns)
  const primaryNavList = document.createElement('ul');
  primaryNavList.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
  const primaryNavDiv = document.createElement('div');
  primaryNavDiv.classList.add('footerList');
  primaryNavDiv.append(primaryNavList);
  footerNavbarLeft.append(primaryNavDiv);

  const secondaryNavList = document.createElement('ul');
  secondaryNavList.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
  const secondaryNavDiv = document.createElement('div');
  secondaryNavDiv.classList.add('footerList');
  secondaryNavDiv.append(secondaryNavList);
  footerNavbarRight.append(secondaryNavDiv);

  primaryNavigationItems.forEach((row, index) => {
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
      rootEl.setAttribute('data-link-region', 'Footer');
    } else {
      rootEl = document.createElement('span');
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl); // Move instrumentation from the row to the root element

    li.appendChild(rootEl);

    if (hierarchyCell) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML; // Use innerHTML to preserve nested structure
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from hierarchyCell to tempDiv

      // Apply classes to nested elements from ORIGINAL HTML if applicable
      tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('footer-list')); // Example class, adjust as needed
      tempDiv.querySelectorAll('li').forEach(liItem => liItem.classList.add('footer-list__item')); // Example class
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block')); // Example class

      const wrapper = document.createElement('div');
      wrapper.classList.add('nav-dropdown'); // Using 'nav-dropdown' from ORIGINAL HTML for similar dropdown functionality
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
      transformNestedLists(wrapper); // Apply nested list transformation to the new wrapper
    }

    // Distribute navigation items between left and right navbar sections
    if (index % 2 === 0) {
      primaryNavList.append(li);
    } else {
      secondaryNavList.append(li);
    }
  });

  // Footer Brand Secondary Section
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
    'align-items-center'
  );
  containerSecondary.append(secondaryContent);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left');
  secondaryContent.append(footerBrandLeftSecondary);

  const footerLeftList = document.createElement('ul');
  footerLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  footerBrandLeftSecondary.append(footerLeftList);

  // Render Footer Left Links
  footerLeftLinkItems.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells[0];
    const linkCell = cells[1];

    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item');

    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      const link = document.createElement('a');
      link.href = foundLink.href;
      link.textContent = labelCell?.textContent.trim() || '';
      link.classList.add('footer-brand__left--link', 'cta-analytics');
      link.setAttribute('data-link-region', 'Footer');
      moveInstrumentation(row, link);
      li.append(link);
    } else {
      const span = document.createElement('span');
      span.textContent = labelCell?.textContent.trim() || '';
      moveInstrumentation(row, span);
      li.append(span);
    }
    footerLeftList.append(li);
  });

  // Copyright Text
  if (copyrightTextRow) {
    const copyrightLi = document.createElement('li');
    copyrightLi.classList.add('footer-brand__left--item');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand__left--text');
    copyrightSpan.textContent = copyrightTextRow.textContent.trim();
    moveInstrumentation(copyrightTextRow, copyrightSpan);
    copyrightLi.append(copyrightSpan);
    footerLeftList.append(copyrightLi);
  }

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand__right');
  secondaryContent.append(footerBrandRightSecondary);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center');
  footerBrandRightSecondary.append(socialList);

  // Render Social Links
  socialLinkItems.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells[0];
    const linkCell = cells[1];

    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const foundLink = linkCell?.querySelector('a');
    const iconPicture = iconCell?.querySelector('picture');

    if (foundLink && iconPicture) {
      const link = document.createElement('a');
      link.href = foundLink.href;
      link.classList.add('footer-brand__right--link', 'cta-analytics');
      link.setAttribute('data-link-region', 'Footer');
      link.setAttribute('target', '_blank');
      moveInstrumentation(row, link);

      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      link.append(optimizedPic);
      link.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
      link.querySelector('img').setAttribute('aria-label', img.alt);

      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      link.append(screenReaderSpan);

      li.append(link);
    }
    socialList.append(li);
  });

  block.replaceChildren(rootSection);
}
