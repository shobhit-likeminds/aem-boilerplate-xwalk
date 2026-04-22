import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
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
      // Using a generic class here as no specific class for nested dropdown was found in original HTML.
      // If original HTML had a class for this, it would be used here.
      subWrap.classList.add('nav-dropdown'); // This class was invented, but no specific class for this wrapper exists in original HTML.
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
    primaryLogoRow,
    primaryLogoLinkRow,
    secondaryLogoRow,
    ...itemRows
  ] = children;

  const copyrightRow = itemRows.find((row) => row.children.length === 1);
  const navigationItemRows = itemRows.filter((row) => row.children.length === 3);
  const secondaryLinkRows = itemRows.filter((row) => row.children.length === 2 && !row.querySelector('picture'));
  const socialItemRows = itemRows.filter((row) => row.children.length === 2 && row.querySelector('picture'));

  const footer = document.createElement('section');
  footer.classList.add('container-hd', 'fmm-container', 'p-0');

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  footer.append(footerBrand);

  // Footer Brand Primary Section
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand__primary');
  footer.append(footerBrandPrimary);

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

  // Primary Logo
  const primaryLogoLink = document.createElement('a');
  primaryLogoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
  primaryLogoLink.setAttribute('aria-label', 'logo');
  if (primaryLogoLinkRow) {
    const link = primaryLogoLinkRow.querySelector('a');
    if (link) primaryLogoLink.href = link.href;
    moveInstrumentation(primaryLogoLinkRow, primaryLogoLink);
  } else {
    primaryLogoLink.href = '#';
  }

  if (primaryLogoRow) {
    const picture = primaryLogoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        primaryLogoLink.append(optimizedPic);
      }
    }
    moveInstrumentation(primaryLogoRow, primaryLogoLink);
  }
  footerBrandLeft.append(primaryLogoLink);

  // Secondary Logo
  if (secondaryLogoRow) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
    const picture = secondaryLogoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        secondaryLogoDiv.append(optimizedPic);
      }
    }
    moveInstrumentation(secondaryLogoRow, secondaryLogoDiv);
    footerBrandLeft.append(secondaryLogoDiv);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  primaryContent.append(footerBrandRight);

  // Footer Navigation
  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNavbar);

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavbar.append(footerNavbarLeft);

  // Group navigation items into columns (simulating the original structure)
  const navColumns = [[], []]; // Two columns for navigation links
  navigationItemRows.forEach((row, i) => {
    navColumns[i % 2].push(row);
  });

  navColumns.forEach((columnItems) => {
    if (columnItems.length > 0) {
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

      columnItems.forEach((row) => {
        const [labelCell, linkCell, hierarchyCell] = [...row.children];
        const li = document.createElement('li');
        li.classList.add('footer-list__item');

        const foundLink = linkCell?.querySelector('a');
        let rootEl;
        if (foundLink) {
          rootEl = document.createElement('a');
          rootEl.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
          rootEl.href = foundLink.href;
        } else {
          rootEl = document.createElement('span');
        }
        rootEl.textContent = labelCell?.textContent.trim() || '';
        moveInstrumentation(row, rootEl);
        li.appendChild(rootEl);

        if (hierarchyCell) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = hierarchyCell.innerHTML; // Read richtext content
          const hierarchyRoot = tempDiv.querySelector('ul');

          if (hierarchyRoot) {
            moveInstrumentation(hierarchyCell, hierarchyRoot); // Move instrumentation from the original cell to the new ul
            const wrapper = document.createElement('div');
            // Using a generic class here as no specific class for nested dropdown was found in original HTML.
            wrapper.classList.add('nav-dropdown'); // This class was invented, but no specific class for this wrapper exists in original HTML.
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
        ul.append(li);
      });
      footerNavbarLeft.append(footerListDiv);
    }
  });

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavbar.append(footerNavbarRight);

  // Group secondary links into columns (simulating the original structure)
  const secondaryLinkColumns = [[], []]; // Two columns for secondary links
  secondaryLinkRows.forEach((row, i) => {
    secondaryLinkColumns[i % 2].push(row);
  });

  secondaryLinkColumns.forEach((columnItems) => {
    if (columnItems.length > 0) {
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

      columnItems.forEach((row) => {
        const [labelCell, linkCell] = [...row.children];
        const li = document.createElement('li');
        li.classList.add('footer-list__item');

        const link = document.createElement('a');
        link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
        const foundLink = linkCell?.querySelector('a');
        if (foundLink) link.href = foundLink.href;
        link.textContent = labelCell?.textContent.trim() || '';
        moveInstrumentation(row, link);
        li.append(link);
        ul.append(li);
      });
      footerNavbarRight.append(footerListDiv);
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

  // Copyright Text
  if (copyrightRow) {
    const copyrightLi = document.createElement('li');
    copyrightLi.classList.add('footer-brand__left--item');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand__left--text');
    copyrightSpan.textContent = copyrightRow.textContent.trim();
    moveInstrumentation(copyrightRow, copyrightSpan);
    copyrightLi.append(copyrightSpan);
    footerBrandLeftList.append(copyrightLi);
  }

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand__right');
  secondaryContent.append(footerBrandRightSecondary);

  // Social Links
  if (socialItemRows.length > 0) {
    const socialList = document.createElement('ul');
    socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center');
    footerBrandRightSecondary.append(socialList);

    socialItemRows.forEach((row) => {
      const [iconCell, linkCell] = [...row.children];
      const li = document.createElement('li');
      li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

      const link = document.createElement('a');
      link.classList.add('footer-brand__right--link', 'cta-analytics');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
        link.target = '_blank'; // Assuming social links open in new tab
      }

      if (iconCell) {
        const picture = iconCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          if (img) {
            const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
            moveInstrumentation(img, optimizedPic.querySelector('img'));
            link.append(optimizedPic);
            link.setAttribute('aria-label', img.alt);
          }
        }
      }
      moveInstrumentation(row, link);
      li.append(link);
      socialList.append(li);
    });
  }

  block.replaceChildren(footer);

  // Optimize images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
