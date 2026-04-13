import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footer = document.createElement('footer');
  footer.classList.add('bg-surface-footer');

  const borderDiv = document.createElement('div');
  borderDiv.classList.add('border-t', 'border-stroke-muted');
  footer.append(borderDiv);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'overflow-hidden', 'relative');
  borderDiv.append(containerDiv);

  const ptDiv = document.createElement('div');
  ptDiv.classList.add('pt-3xl', 'relative', 'z-1', 'lg:pb-5xl');
  containerDiv.append(ptDiv);

  const primaryNav = document.createElement('nav');
  primaryNav.classList.add('text-p1', 'grid', 'grid-cols-2', 'md:grid-cols-3', 'xl:grid-full');
  primaryNav.setAttribute('aria-label', 'Primary footer');
  ptDiv.append(primaryNav);

  const pandaBgDiv = document.createElement('div');
  pandaBgDiv.classList.add('absolute', '-z-1', 'bg-[url(\'../images/cssBackgrounds/panda.svg\')]', 'opacity-5', 'bg-no-repeat', 'inset-[0_-10%_0_0]', 'bg-position-[center_left]', 'bg-size-[130%]', 'sm:bg-size-[75%]', 'md:bg-top-left', 'md:inset-[24px_0_0_-24px]', 'lg:bg-size-[60%]');
  primaryNav.append(pandaBgDiv);

  const allRows = [...block.children];

  // The first row is always the address.
  const addressRow = allRows[0];
  const itemRows = allRows.slice(1);

  // Content detection for different item types
  const navGroupRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('ul')) && cells.some(cell => !cell.querySelector('a') && !cell.querySelector('picture'));
  });
  const actionRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a')) && cells.some(cell => !cell.querySelector('a') && !cell.querySelector('picture'));
  });
  const socialLinkRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells.some(cell => cell.querySelector('picture')) && cells.some(cell => cell.querySelector('a'));
  });
  const secondaryLinkRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells.some(cell => cell.querySelector('a')) && cells.some(cell => !cell.querySelector('a') && !cell.querySelector('picture'));
  });

  navGroupRows.forEach((row) => {
    const navGroupDiv = document.createElement('div');
    navGroupDiv.classList.add('not-last:mb-md', 'md:mb-0', 'flex', 'flex-col', 'xl:col-span-3');
    moveInstrumentation(row, navGroupDiv);

    const headingCell = [...row.children].find((cell) => !cell.querySelector('a') && !cell.querySelector('picture'));
    if (headingCell) {
      const headingP = document.createElement('p');
      headingP.classList.add('mb-xs', 'text-15', 'xl:text-p2', 'font-stretch-normal', 'font-bold', 'text-sm');
      moveInstrumentation(headingCell, headingP);
      while (headingCell.firstChild) headingP.append(headingCell.firstChild);
      navGroupDiv.append(headingP);
    }

    const linksCell = [...row.children].find((cell) => cell.querySelector('ul'));
    if (linksCell) {
      const ul = document.createElement('ul');
      ul.classList.add('flex', 'flex-col', 'gap-xs');
      moveInstrumentation(linksCell, ul);

      [...linksCell.children].forEach((linkWrapper) => {
        const li = document.createElement('li');
        moveInstrumentation(linkWrapper, li);

        const link = linkWrapper.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent.trim();
          newLink.classList.add('link', 'text-foreground', 'text-p2', 'xl:text-p1', 'transition-display', 'hocus:underline', 'hocus:text-foreground', 'motion-safe:not-focus-visible:transition-underline', 'no-underline');
          newLink.setAttribute('data-desktop-nav-link', '');
          moveInstrumentation(link, newLink);
          li.append(newLink);
        }
        ul.append(li);
      });
      navGroupDiv.append(ul);
    }
    primaryNav.append(navGroupDiv);
  });

  const actionsSocialWrapper = document.createElement('div');
  actionsSocialWrapper.classList.add('col-span-full', 'pt-[200px]', 'lg:pt-0', 'lg:col-start-10', 'lg:col-span-5', 'lg:ml-auto');
  primaryNav.append(actionsSocialWrapper);

  const actionsWrapper = document.createElement('div');
  actionsWrapper.classList.add('flex', 'flex-col', 'items-start', 'gap-md');
  actionsSocialWrapper.append(actionsWrapper);

  actionRows.forEach((row) => {
    const actionLinkCell = [...row.children].find((cell) => cell.querySelector('a'));
    const actionLinkLabelCell = [...row.children].find((cell) => !cell.querySelector('a') && !cell.querySelector('picture'));

    if (actionLinkCell && actionLinkLabelCell) {
      const originalLink = actionLinkCell.querySelector('a');
      const actionLink = document.createElement('a');
      if (originalLink) {
        actionLink.href = originalLink.href;
      }
      actionLink.textContent = actionLinkLabelCell.textContent.trim();
      actionLink.classList.add('button', 'button--dark', 'group');
      moveInstrumentation(row, actionLink);

      // Check if there's an image in the original link cell to append
      const img = originalLink ? originalLink.querySelector('img') : null;
      if (img) {
        const newImg = document.createElement('img');
        newImg.alt = img.alt;
        newImg.src = img.src;
        actionLink.append(newImg);
      }
      actionsWrapper.append(actionLink);
    }
  });

  const socialLinksWrapper = document.createElement('div');
  socialLinksWrapper.classList.add('flex', 'gap-sm', 'py-2xs', 'mt-sm', 'mb-lg', 'items-center');
  actionsSocialWrapper.append(socialLinksWrapper);

  socialLinkRows.forEach((row) => {
    const socialLinkCell = [...row.children].find((cell) => cell.querySelector('a'));
    const socialLinkLabelCell = [...row.children].find((cell) => !cell.querySelector('a') && !cell.querySelector('picture'));
    const iconCell = [...row.children].find((cell) => cell.querySelector('picture'));

    if (socialLinkCell && socialLinkLabelCell && iconCell) {
      const originalLink = socialLinkCell.querySelector('a');
      const socialLink = document.createElement('a');
      if (originalLink) {
        socialLink.href = originalLink.href;
        socialLink.target = '_blank';
        socialLink.rel = 'nofollow noopener';
      }
      socialLink.classList.add('transition-colors', 'hover:cursor-pointer', 'theme-focus-outline', 'outline-none', 'fill-foreground', 'hocus:fill-foreground-accent');
      moveInstrumentation(row, socialLink);

      const srOnlySpan = document.createElement('span');
      srOnlySpan.classList.add('sr-only');
      srOnlySpan.textContent = socialLinkLabelCell.textContent.trim();
      socialLink.append(srOnlySpan);

      const picture = iconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const newImg = document.createElement('img');
          newImg.alt = img.alt;
          newImg.src = img.src;
          socialLink.append(newImg);
        }
      }
      socialLinksWrapper.append(socialLink);
    }
  });

  const bottomFooterDiv = document.createElement('div');
  bottomFooterDiv.classList.add('py-2xl', 'text-foreground-invert', 'bg-punaluu-500');
  footer.append(bottomFooterDiv);

  const bottomContainerDiv = document.createElement('div');
  bottomContainerDiv.classList.add('grid-full', 'container');
  bottomFooterDiv.append(bottomContainerDiv);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('md:col-span-11', 'space-y-sm', '[&>p]:text-p2');
  bottomContainerDiv.append(contentDiv);

  if (addressRow) {
    const addressP = document.createElement('p');
    moveInstrumentation(addressRow, addressP);
    while (addressRow.firstChild) addressP.append(addressRow.firstChild);
    contentDiv.append(addressP);
  }

  // Add static content paragraphs from original HTML
  const staticP1 = document.createElement('p');
  staticP1.textContent = 'World Wildlife Fund Inc. is a nonprofit, tax-exempt charitable organization (tax ID number 52-1693387) under Section 501(c)(3) of the Internal Revenue Code. Donations are tax-deductible as allowed by law.';
  contentDiv.append(staticP1);

  const staticP2 = document.createElement('p');
  staticP2.textContent = '© 2026 World Wildlife Fund. WWF® and ©1986 Panda Symbol are owned by WWF. All rights reserved.';
  contentDiv.append(staticP2);

  const secondaryLinksContainer = document.createElement('div');
  contentDiv.append(secondaryLinksContainer);

  const secondaryNav = document.createElement('nav');
  secondaryNav.setAttribute('aria-label', 'Secondary footer');
  secondaryLinksContainer.append(secondaryNav);

  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('md:flex', 'flex-wrap', 'gap-sm');
  secondaryNav.append(secondaryUl);

  secondaryLinkRows.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('text-p2', 'mb-sm', 'md:mb-0');
    moveInstrumentation(row, li);

    const secondaryLinkCell = [...row.children].find((cell) => cell.querySelector('a'));
    const secondaryLinkLabelCell = [...row.children].find((cell) => !cell.querySelector('a') && !cell.querySelector('picture'));

    if (secondaryLinkCell && secondaryLinkLabelCell) {
      const originalLink = secondaryLinkCell.querySelector('a');
      const secondaryLink = document.createElement('a');
      if (originalLink) {
        secondaryLink.href = originalLink.href;
        if (originalLink.target) secondaryLink.target = originalLink.target;
        if (originalLink.rel) secondaryLink.rel = originalLink.rel;
      }
      secondaryLink.textContent = secondaryLinkLabelCell.textContent.trim();
      secondaryLink.classList.add('link', 'text-cta-size', 'font-semibold', 'decoration-2', 'underline-offset-8', 'text-foreground-invert', 'hocus:text-foreground-strong-invert');
      li.append(secondaryLink);
    }
    secondaryUl.append(li);
  });

  // Add the cookie settings button
  const cookieLi = document.createElement('li');
  cookieLi.classList.add('text-p2', 'mb-sm', 'md:mb-0');
  const cookieButton = document.createElement('button');
  cookieButton.type = 'button';
  cookieButton.classList.add('ot-sdk-show-settings', 'cursor-pointer', 'link', 'text-cta-size', 'font-semibold', 'decoration-2', 'underline-offset-8', 'text-foreground-invert', 'hocus:text-foreground-strong-invert');
  cookieButton.textContent = 'Cookie settings';
  cookieLi.append(cookieButton);
  secondaryUl.append(cookieLi);

  // Image optimization
  footer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(footer);
}
