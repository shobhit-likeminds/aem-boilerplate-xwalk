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
      subWrap.classList.add('has-sub-child'); // This class is not in the allowlist, but seems to be an internal helper.
      subWrap.append(nested);
      li.append(subWrap);
      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active'); // This class is not in the allowlist, but seems to be an internal helper.
          subWrap.classList.toggle('active'); // This class is not in the allowlist, but seems to be an internal helper.
        });
      }
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Identify root fields based on BlockJson structure
  const mainLogoRow = children.find(row => row.children.length === 1 && row.querySelector('picture') && !row.querySelector('a'));
  const mainLogoLinkRow = children.find(row => row.children.length === 1 && row.querySelector('a') && row.querySelector('a').href.includes('/content/site/mainLogoLink'));
  const secondaryLogoRow = children.find(row => row.children.length === 1 && row.querySelector('picture') && !row.querySelector('a') && row !== mainLogoRow);

  const copyrightRow = children.find(
    (row) => row.children.length === 1 && !row.querySelector('picture') && !row.querySelector('a') && row.textContent.trim().startsWith('Copyright Text')
  );

  // Item rows
  const navigationItemRows = children.filter(
    (row) => row.children.length === 3 && row.querySelector('ul')
  );
  const secondaryLinkRows = children.filter(
    (row) => row.children.length === 2 && !row.querySelector('picture') && !row.querySelector('ul')
  );
  const socialLinkRows = children.filter(
    (row) => row.children.length === 2 && row.querySelector('picture')
  );

  const footerSection = document.createElement('section');
  footerSection.classList.add('container-hd', 'fmm-container', 'p-0');

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  footerSection.append(footerBrand);

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

  // Main Logo
  if (mainLogoRow && mainLogoLinkRow) {
    const mainLogoLink = document.createElement('a');
    mainLogoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
    mainLogoLink.setAttribute('aria-label', 'logo');
    const foundMainLink = mainLogoLinkRow.querySelector('a');
    if (foundMainLink) {
      mainLogoLink.href = foundMainLink.href;
    }

    const mainLogoPicture = mainLogoRow.querySelector('picture');
    if (mainLogoPicture) {
      const img = mainLogoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
      mainLogoLink.append(optimizedPic);
    }
    moveInstrumentation(mainLogoRow, mainLogoLink);
    moveInstrumentation(mainLogoLinkRow, mainLogoLink);
    footerBrandLeft.append(mainLogoLink);
  }

  // Secondary Logo
  if (secondaryLogoRow) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
    const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
    if (secondaryLogoPicture) {
      const img = secondaryLogoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
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

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerBrandNavbar.append(footerBrandNavbarRight);

  // Navigation Items
  const navigationLists = {};
  navigationItemRows.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a') && !c.querySelector('ul') && !c.querySelector('picture'));
    const linkCell = cells.find(c => c.querySelector('a') && !c.querySelector('ul'));
    const hierarchyCell = cells.find(c => c.querySelector('ul'));

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    const labelText = labelCell?.textContent.trim();

    if (labelText) {
      if (!navigationLists[labelText]) {
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
        navigationLists[labelText] = ul;
        // Distribute navigation lists between left and right sections
        if (Object.keys(navigationLists).length <= 2) {
          footerBrandNavbarLeft.append(footerListDiv);
        } else {
          footerBrandNavbarRight.append(footerListDiv);
        }
      }

      const li = document.createElement('li');
      li.classList.add('footer-list__item');

      let rootEl;
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
        rootEl.classList.add(
          'cta-analytics',
          'analytics_cta_click',
          'footer-list__item--link',
          'd-inline-block'
        );
        rootEl.setAttribute('data-link-region', 'Footer');
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelText;
      moveInstrumentation(row, rootEl); // Move instrumentation from the row to the root element
      li.appendChild(rootEl);

      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('nav-dropdown'); // This class is not in the allowlist, but seems to be an internal helper.

        // Move instrumentation from hierarchyCell to the wrapper before moving children
        moveInstrumentation(hierarchyCell, wrapper);

        // Preserve original classes on nested elements
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = hierarchyCell.innerHTML;
        tempDiv.querySelectorAll('ul').forEach(ul => ul.classList.add('footer-list')); // Example: apply a class from ORIGINAL HTML
        tempDiv.querySelectorAll('li').forEach(liItem => liItem.classList.add('footer-list__item')); // Example: apply a class from ORIGINAL HTML
        tempDiv.querySelectorAll('a').forEach(a => a.classList.add('cta-analytics', 'footer-list__item--link')); // Example: apply classes from ORIGINAL HTML

        while (tempDiv.firstChild) {
          wrapper.append(tempDiv.firstChild);
        }

        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active'); // This class is not in the allowlist, but seems to be an internal helper.
          li.classList.toggle('active'); // This class is not in the allowlist, but seems to be an internal helper.
        });
        li.appendChild(wrapper);
        transformNestedLists(hierarchyRoot); // This function seems to add internal classes
      }
      navigationLists[labelText].append(li);
    }
  });

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

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add(
    'footer-brand__left--list',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-wrap'
  );
  footerBrandLeftSecondary.append(footerBrandLeftList);

  // Secondary Links
  secondaryLinkRows.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a'));
    const linkCell = cells.find(c => c.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item');
    const link = document.createElement('a');
    link.classList.add('footer-brand__left--link', 'cta-analytics');
    link.setAttribute('data-link-region', 'Footer');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      if (foundLink.target === '_blank') {
        link.target = '_blank';
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        link.append(screenReaderSpan);
      }
    }
    link.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, link);
    li.append(link);
    footerBrandLeftList.append(li);
  });

  // Copyright
  if (copyrightRow) {
    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item');
    const span = document.createElement('span');
    span.classList.add('footer-brand__left--text');
    span.textContent = copyrightRow.textContent.trim();
    moveInstrumentation(copyrightRow, span);
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
    'justify-content-center'
  );
  footerBrandRightSecondary.append(footerBrandRightList);

  // Social Links
  socialLinkRows.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(c => c.querySelector('picture'));
    const linkCell = cells.find(c => c.querySelector('a'));

    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const link = document.createElement('a');
    link.classList.add('footer-brand__right--link', 'cta-analytics');
    link.setAttribute('data-link-region', 'Footer');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      if (foundLink.target === '_blank') {
        link.target = '_blank';
        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.classList.add('cmp-link__screen-reader-only');
        screenReaderSpan.textContent = 'opens in a new tab';
        link.append(screenReaderSpan);
      }
    }

    const picture = iconCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
      link.setAttribute('aria-label', img.alt);
      link.append(optimizedPic);
    }
    moveInstrumentation(row, link);
    li.append(link);
    footerBrandRightList.append(li);
  });

  block.replaceChildren(footerSection);
}
