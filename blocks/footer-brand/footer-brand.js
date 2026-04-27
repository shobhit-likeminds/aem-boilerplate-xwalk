import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    // Handle label-only nodes
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
      subWrap.classList.add('nav-dropdown'); // Use a generic class name for sub-children, from ORIGINAL HTML
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

export default async function decorate(block) {
  // Fixed fields based on BlockJson model
  const [
    logoImageRow,
    logoLinkRow,
    secondaryLogoImageRow,
    copyrightTextRow, // Copyright text is a fixed field, not the last item row
    ...itemRows // Remaining rows are item rows
  ] = [...block.children];

  const navigationItems = [];
  const externalLinks = [];
  const socialLinks = [];

  // Categorize item rows based on cell count and content
  itemRows.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 3) {
      // Navigation item: label, link, hierarchy-tree
      navigationItems.push(row);
    } else if (cells.length === 2 && cells[0].querySelector('picture')) {
      // Social link item: icon, link
      socialLinks.push(row);
    } else if (cells.length === 2) {
      // External link item: label, link
      externalLinks.push(row);
    }
  });

  const root = document.createElement('section');
  root.classList.add('container-hd', 'fmm-container', 'p-0');

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.classList.add('footer-brand', 'w-100');
  root.append(footerBrandDiv);

  // Primary section
  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');
  footerBrandDiv.append(primarySection);

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

  // Primary Logo
  const primaryLogoLink = document.createElement('a');
  primaryLogoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
  primaryLogoLink.setAttribute('aria-label', 'logo');
  const logoLink = logoLinkRow?.querySelector('a');
  if (logoLink) {
    primaryLogoLink.href = logoLink.href;
  }
  const primaryLogoPicture = logoImageRow?.querySelector('picture');
  if (primaryLogoPicture) {
    const img = primaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    primaryLogoLink.append(optimizedPic);
  }
  moveInstrumentation(logoImageRow, primaryLogoLink);
  moveInstrumentation(logoLinkRow, primaryLogoLink);
  brandLeft.append(primaryLogoLink);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryLogoPicture = secondaryLogoImageRow?.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedPic);
  }
  moveInstrumentation(secondaryLogoImageRow, secondaryLogoDiv);
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

  // Navigation Items
  const navGroups = [[], []]; // Two groups for left and right nav sections
  navigationItems.forEach((row, i) => {
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
    moveInstrumentation(row, rootEl); // Move instrumentation for the whole row to the root element
    li.appendChild(rootEl);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('nav-dropdown'); // Use a generic class name for dropdown
      // Use innerHTML to preserve nested structure and then move instrumentation
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell to tempDiv

      // Apply classes to nested elements from ORIGINAL HTML
      tempDiv.querySelectorAll('a').forEach(a => a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block'));
      tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column'));
      tempDiv.querySelectorAll('li').forEach(liElem => liElem.classList.add('footer-list__item'));

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
      transformNestedLists(wrapper.querySelector('ul')); // Pass the actual UL element
    }
    navGroups[i % 2].push(li); // Distribute items between left and right nav sections
  });

  navGroups.forEach((group, index) => {
    if (group.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.classList.add('footerList');
      const ul = document.createElement('ul');
      ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
      group.forEach((item) => ul.append(item));
      footerListDiv.append(ul);
      if (index === 0) {
        navLeft.append(footerListDiv);
      } else {
        navRight.append(footerListDiv);
      }
    }
  });

  // Secondary section
  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');
  footerBrandDiv.append(secondarySection);

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

  // External Links
  externalLinks.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item');

    const anchor = document.createElement('a');
    anchor.classList.add('footer-brand__left--link', 'cta-analytics');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      if (foundLink.getAttribute('target') === '_blank') {
        anchor.setAttribute('target', '_blank');
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        anchor.append(screenReaderSpan);
      }
    }
    anchor.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, anchor);
    li.append(anchor);
    secondaryLeftList.append(li);
  });

  // Copyright Text
  const copyrightLi = document.createElement('li');
  copyrightLi.classList.add('footer-brand__left--item');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text');
  copyrightSpan.textContent = copyrightTextRow?.textContent.trim() || '';
  moveInstrumentation(copyrightTextRow, copyrightSpan);
  copyrightLi.append(copyrightSpan);
  secondaryLeftList.append(copyrightLi);

  const secondaryRight = document.createElement('section');
  secondaryRight.classList.add('footer-brand__right');
  secondaryContent.append(secondaryRight);

  const secondaryRightList = document.createElement('ul');
  secondaryRightList.classList.add(
    'footer-brand__right--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
  );
  secondaryRight.append(secondaryRightList);

  // Social Links
  socialLinks.forEach((row) => {
    const [iconCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const anchor = document.createElement('a');
    anchor.classList.add('footer-brand__right--link', 'cta-analytics');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      if (foundLink.getAttribute('target') === '_blank') {
        anchor.setAttribute('target', '_blank');
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        anchor.append(screenReaderSpan);
      }
    }
    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      anchor.append(optimizedPic);
    }
    moveInstrumentation(row, anchor);
    li.append(anchor);
    secondaryRightList.append(li);
  });

  block.replaceChildren(root);

  // Swiper Initialization (if needed, based on original HTML classes)
  // The original HTML does not contain Swiper classes, so no Swiper initialization is added.
  // If Swiper was intended, the following would be added:
  // await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  // await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  // const swiperEl = root.querySelector('.swiper'); // Or appropriate selector
  // if (swiperEl) {
  //   // eslint-disable-next-line no-undef
  //   new Swiper(swiperEl, {
  //     slidesPerView: 'auto',
  //     loop: false,
  //     navigation: { prevEl: swiperEl.querySelector('.swiper-button-prev'), nextEl: swiperEl.querySelector('.swiper-button-next') },
  //     pagination: { el: swiperEl.querySelector('.swiper-pagination'), clickable: true },
  //   });
  // }
}
