import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Identify rows based on content and structure, avoiding direct index access
  const copyrightRow = children.find(row => row.children.length === 1 && !row.querySelector('a') && !row.querySelector('picture'));
  const logoRows = children.filter(row => row.children.length === 2 && row.querySelector('picture') && row.querySelector('a'));
  const secondaryLogoRows = children.filter(row => row.children.length === 1 && row.querySelector('picture') && !row.querySelector('a'));
  const linkGroupRows = children.filter(row => row.children.length === 1 && !row.querySelector('picture') && !row.querySelector('a') && row.textContent.trim() !== copyrightRow.textContent.trim());
  const bottomLinkRows = children.filter(row => row.children.length === 2 && row.querySelector('a') && !row.querySelector('picture'));
  const socialLinkRows = children.filter(row => row.children.length === 2 && row.querySelector('a') && row.querySelector('picture'));

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  primarySection.append(containerDiv);

  const primaryContentDiv = document.createElement('div');
  primaryContentDiv.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  containerDiv.append(primaryContentDiv);

  const leftSection = document.createElement('section');
  leftSection.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');
  primaryContentDiv.append(leftSection);

  logoRows.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const pictureCell = cells.find(cell => cell.querySelector('picture'));

    if (linkCell && pictureCell) {
      const linkEl = linkCell.querySelector('a');
      const pictureEl = pictureCell.querySelector('picture');

      const anchor = document.createElement('a');
      moveInstrumentation(linkEl, anchor);
      anchor.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
      anchor.href = linkEl.href;
      anchor.setAttribute('aria-label', pictureEl.querySelector('img').alt);

      const img = pictureEl.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      anchor.append(optimizedPic);
      optimizedPic.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      leftSection.append(anchor);
    }
  });

  secondaryLogoRows.forEach((row) => {
    const pictureEl = row.querySelector('picture');
    if (pictureEl) {
      const secondaryLogoDiv = document.createElement('div');
      secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
      const img = pictureEl.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      secondaryLogoDiv.append(optimizedPic);
      optimizedPic.classList.add('object-fit-contain', 'w-100', 'no-rendition');
      leftSection.append(secondaryLogoDiv);
    }
  });

  const rightSectionPrimary = document.createElement('section');
  rightSectionPrimary.classList.add('footer-brand__right');
  primaryContentDiv.append(rightSectionPrimary);

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  rightSectionPrimary.append(nav);

  const navbarLeft = document.createElement('div');
  navbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navbarLeft);

  const navbarRight = document.createElement('div');
  navbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navbarRight);

  // Distribute link groups between navbarLeft and navbarRight based on original HTML
  const half = Math.ceil(linkGroupRows.length / 2);
  linkGroupRows.forEach((row, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    moveInstrumentation(row, footerListDiv);

    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    footerListDiv.append(ul);

    // The content of the link group cell contains the actual links as children
    // FIXED: Using content detection instead of index access
    const cells = [...row.children];
    const cell = cells.find(cell => !cell.querySelector('picture') && !cell.querySelector('a')) || cells[0];
    [...cell.children].forEach((linkEl) => {
      if (linkEl.tagName === 'A') {
        const li = document.createElement('li');
        li.classList.add('footer-list__item');
        moveInstrumentation(linkEl, li);
        const anchor = document.createElement('a');
        anchor.href = linkEl.href;
        anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
        anchor.textContent = linkEl.textContent;
        if (linkEl.target) anchor.setAttribute('target', linkEl.target); // Preserve target attribute
        ul.append(li);
        li.append(anchor);
      }
    });

    if (index < half) {
      navbarLeft.append(footerListDiv);
    } else {
      navbarRight.append(footerListDiv);
    }
  });

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');
  block.append(primarySection, secondarySection);

  const secondaryContainerDiv = document.createElement('div');
  secondaryContainerDiv.classList.add('container');
  secondarySection.append(secondaryContainerDiv);

  const secondaryContentDiv = document.createElement('div');
  secondaryContentDiv.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');
  secondaryContainerDiv.append(secondaryContentDiv);

  const rightSectionSecondary = document.createElement('section');
  rightSectionSecondary.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');
  secondaryContentDiv.append(rightSectionSecondary);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  rightSectionSecondary.append(socialMediaTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
  rightSectionSecondary.append(socialList);

  socialLinkRows.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const pictureCell = cells.find(cell => cell.querySelector('picture'));

    if (linkCell && pictureCell) {
      const linkEl = linkCell.querySelector('a');
      const pictureEl = pictureCell.querySelector('picture');

      const li = document.createElement('li');
      li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');
      moveInstrumentation(row, li);

      const anchor = document.createElement('a');
      anchor.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      anchor.href = linkEl.href;
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('target', '_blank');

      const img = pictureEl.querySelector('img');
      anchor.setAttribute('data-cta-label', `footer-${img.alt.toLowerCase()}`);
      anchor.setAttribute('data-platform-name', img.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');

      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      anchor.append(optimizedPic);
      li.append(anchor);
      socialList.append(li);
    }
  });

  const leftSectionSecondary = document.createElement('section');
  leftSectionSecondary.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  secondaryContentDiv.append(leftSectionSecondary);

  const bottomLinksList = document.createElement('ul');
  bottomLinksList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  leftSectionSecondary.append(bottomLinksList);

  bottomLinkRows.forEach((row) => {
    const cells = [...row.children];
    const linkCell = cells.find(cell => cell.querySelector('a'));
    const labelCell = cells.find(cell => !cell.querySelector('a'));

    if (linkCell && labelCell) {
      const linkEl = linkCell.querySelector('a');
      const li = document.createElement('li');
      li.classList.add('footer-brand__left--item', 'foot_link');
      moveInstrumentation(row, li);

      const anchor = document.createElement('a');
      anchor.classList.add('footer-brand__left--link', 'analytics_cta_click');
      anchor.href = linkEl.href;
      anchor.setAttribute('data-cta-region', 'Footer');
      if (linkEl.target) anchor.setAttribute('target', linkEl.target);
      anchor.textContent = labelCell.textContent.trim();
      li.append(anchor);
      bottomLinksList.append(li);
    }
  });

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
  moveInstrumentation(copyrightRow, copyrightDiv);
  leftSectionSecondary.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text', 'text-white');
  while (copyrightRow.firstChild) copyrightSpan.append(copyrightRow.firstChild);
  copyrightDiv.append(copyrightSpan);

  block.textContent = '';
  block.classList.add('w-100', 'bg-boing-neutral-gray-600');
  block.append(primarySection, secondarySection);

  // The original JS had a redundant optimized picture creation at the end.
  // This is usually handled within the specific element creation.
  // Removing it as it's not necessary if handled correctly above.
}
