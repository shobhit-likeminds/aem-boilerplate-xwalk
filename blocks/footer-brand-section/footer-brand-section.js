import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Primary Wrapper
  const footerBrandWrapperPrimary = document.createElement('div');
  footerBrandWrapperPrimary.classList.add('footer-brand-wrapper', 'footer-brand-wrapper--primary');
  moveInstrumentation(block.children[0], footerBrandWrapperPrimary);

  const footerBrandContainerPrimary = document.createElement('div');
  footerBrandContainerPrimary.classList.add('footer-brand-container');
  footerBrandWrapperPrimary.append(footerBrandContainerPrimary);

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('footer-brand-primary-content');
  footerBrandContainerPrimary.append(footerBrandPrimaryContent);

  // Left Section (Logos)
  const footerBrandLeftSection = document.createElement('section');
  footerBrandLeftSection.classList.add('footer-brand-left-section');
  footerBrandPrimaryContent.append(footerBrandLeftSection);

  const primaryLogoCell = block.children[0].children[0];
  const primaryLogoLink = primaryLogoCell.querySelector('a');
  const primaryLogoImg = primaryLogoCell.querySelector('img');

  if (primaryLogoLink && primaryLogoImg) {
    const newPrimaryLogoLink = document.createElement('a');
    newPrimaryLogoLink.href = primaryLogoLink.href;
    newPrimaryLogoLink.target = primaryLogoLink.target;
    newPrimaryLogoLink.classList.add('footer-brand-logo-link', 'analytics_cta_click');
    newPrimaryLogoLink.setAttribute('data-cta-region', 'Footer');
    newPrimaryLogoLink.setAttribute('aria-label', primaryLogoLink.getAttribute('aria-label'));

    const optimizedPrimaryPic = createOptimizedPicture(primaryLogoImg.src, primaryLogoImg.alt);
    optimizedPrimaryPic.querySelector('img').classList.add('footer-brand-logo-img');
    optimizedPrimaryPic.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(primaryLogoImg, optimizedPrimaryPic.querySelector('img'));
    newPrimaryLogoLink.append(optimizedPrimaryPic);
    footerBrandLeftSection.append(newPrimaryLogoLink);
  }

  const secondaryLogoCell = block.children[0].children[1];
  const secondaryLogoImg = secondaryLogoCell.querySelector('img');

  if (secondaryLogoImg) {
    const footerBrandSecondaryLogo = document.createElement('div');
    footerBrandSecondaryLogo.classList.add('footer-brand-secondary-logo');

    const optimizedSecondaryPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
    optimizedSecondaryPic.querySelector('img').classList.add('footer-brand-secondary-logo-img');
    optimizedSecondaryPic.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(secondaryLogoImg, optimizedSecondaryPic.querySelector('img'));
    footerBrandSecondaryLogo.append(optimizedSecondaryPic);
    footerBrandLeftSection.append(footerBrandSecondaryLogo);
  }

  // Right Section (Navigation)
  const footerBrandRightSectionPrimary = document.createElement('section');
  footerBrandRightSectionPrimary.classList.add('footer-brand-right-section');
  footerBrandPrimaryContent.append(footerBrandRightSectionPrimary);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRightSectionPrimary.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar-left');
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar-right');
  footerBrandNavbar.append(footerBrandNavbarRight);

  // Navigation Columns
  const navColumnsStartRow = 1;
  const navColumnsEndRow = block.children.length - 3; // Social links and copyright are last 2 rows

  for (let i = navColumnsStartRow; i < navColumnsEndRow; i += 2) {
    const rowLeft = block.children[i];
    const rowRight = block.children[i + 1];

    // Left Nav Column
    if (rowLeft) {
      const footerListWrapperLeft = document.createElement('div');
      footerListWrapperLeft.classList.add('footer-list-wrapper');
      moveInstrumentation(rowLeft, footerListWrapperLeft);
      const ulLeft = document.createElement('ul');
      ulLeft.classList.add('footer-list');
      footerListWrapperLeft.append(ulLeft);
      footerBrandNavbarLeft.append(footerListWrapperLeft);

      [...rowLeft.children].forEach((cell) => {
        const link = cell.querySelector('a');
        if (link) {
          const li = document.createElement('li');
          li.classList.add('footer-list-item');
          moveInstrumentation(cell, li);

          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.classList.add('footer-list-item-link', 'analytics_cta_click');
          newLink.setAttribute('data-link-region', 'Footer List');
          if (link.target) newLink.target = link.target;
          li.append(newLink);
          ulLeft.append(li);
        }
      });
    }

    // Right Nav Column
    if (rowRight) {
      const footerListWrapperRight = document.createElement('div');
      footerListWrapperRight.classList.add('footer-list-wrapper');
      moveInstrumentation(rowRight, footerListWrapperRight);
      const ulRight = document.createElement('ul');
      ulRight.classList.add('footer-list');
      footerListWrapperRight.append(ulRight);
      footerBrandNavbarRight.append(footerListWrapperRight);

      [...rowRight.children].forEach((cell) => {
        const link = cell.querySelector('a');
        if (link) {
          const li = document.createElement('li');
          li.classList.add('footer-list-item');
          moveInstrumentation(cell, li);

          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.classList.add('footer-list-item-link', 'analytics_cta_click');
          newLink.setAttribute('data-link-region', 'Footer List');
          if (link.target) newLink.target = link.target;
          li.append(newLink);
          ulRight.append(li);
        }
      });
    }
  }

  // Secondary Wrapper
  const footerBrandWrapperSecondary = document.createElement('div');
  footerBrandWrapperSecondary.classList.add('footer-brand-wrapper', 'footer-brand-wrapper--secondary');
  moveInstrumentation(block.children[navColumnsEndRow], footerBrandWrapperSecondary);

  const footerBrandContainerSecondary = document.createElement('div');
  footerBrandContainerSecondary.classList.add('footer-brand-container');
  footerBrandWrapperSecondary.append(footerBrandContainerSecondary);

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('footer-brand-secondary-content');
  footerBrandContainerSecondary.append(footerBrandSecondaryContent);

  // Social Media Section
  const socialLinksRow = block.children[navColumnsEndRow];
  if (socialLinksRow) {
    const footerBrandRightSectionSecondary = document.createElement('section');
    footerBrandRightSectionSecondary.classList.add('footer-brand-right-section');
    moveInstrumentation(socialLinksRow, footerBrandRightSectionSecondary);
    footerBrandSecondaryContent.append(footerBrandRightSectionSecondary);

    const socialTitleCell = socialLinksRow.children[0];
    if (socialTitleCell) {
      const socialTitle = document.createElement('h3');
      socialTitle.classList.add('footer-social-media-title');
      socialTitle.textContent = socialTitleCell.textContent.trim();
      footerBrandRightSectionSecondary.append(socialTitle);
    }

    const ulSocial = document.createElement('ul');
    ulSocial.classList.add('footer-brand-right-list');
    footerBrandRightSectionSecondary.append(ulSocial);

    // Assuming social links are in subsequent cells of the same row
    for (let i = 1; i < socialLinksRow.children.length; i += 1) {
      const socialCell = socialLinksRow.children[i];
      const socialLink = socialCell.querySelector('a');
      const socialImg = socialCell.querySelector('img');

      if (socialLink && socialImg) {
        const li = document.createElement('li');
        li.classList.add('footer-brand-right-item');
        moveInstrumentation(socialCell, li);

        const newSocialLink = document.createElement('a');
        newSocialLink.href = socialLink.href;
        newSocialLink.target = socialLink.target;
        newSocialLink.classList.add('footer-brand-right-link', 'analytics_cta_click');
        newSocialLink.setAttribute('data-cta-region', 'Footer');
        newSocialLink.setAttribute('data-cta-label', `footer-${socialLink.textContent.trim().toLowerCase()}`);
        newSocialLink.setAttribute('data-platform-name', socialLink.textContent.trim().toLowerCase());
        newSocialLink.setAttribute('data-social-linktype', 'follow');

        const optimizedSocialPic = createOptimizedPicture(socialImg.src, socialImg.alt);
        optimizedSocialPic.querySelector('img').classList.add('footer-brand-social-icon');
        optimizedSocialPic.querySelector('img').setAttribute('loading', 'lazy');
        optimizedSocialPic.querySelector('img').setAttribute('aria-label', socialLink.textContent.trim().toLowerCase());
        moveInstrumentation(socialImg, optimizedSocialPic.querySelector('img'));
        newSocialLink.append(optimizedSocialPic);
        li.append(newSocialLink);
        ulSocial.append(li);
      }
    }
  }

  // Copyright and ITC Portal Link Section
  const copyrightRow = block.children[block.children.length - 1];
  if (copyrightRow) {
    const footerBrandLeftSectionSecondary = document.createElement('section');
    footerBrandLeftSectionSecondary.classList.add('footer-brand-left-section');
    moveInstrumentation(copyrightRow, footerBrandLeftSectionSecondary);
    footerBrandSecondaryContent.append(footerBrandLeftSectionSecondary);

    const itcPortalCell = copyrightRow.children[0];
    const itcPortalLink = itcPortalCell.querySelector('a');

    if (itcPortalLink) {
      const ulItc = document.createElement('ul');
      ulItc.classList.add('footer-brand-left-list');

      const liItc = document.createElement('li');
      liItc.classList.add('footer-brand-left-item', 'footer-link-item');
      moveInstrumentation(itcPortalCell, liItc);

      const newItcLink = document.createElement('a');
      newItcLink.href = itcPortalLink.href;
      newItcLink.target = itcPortalLink.target;
      newItcLink.textContent = itcPortalLink.textContent;
      newItcLink.classList.add('footer-brand-left-link', 'analytics_cta_click');
      newItcLink.setAttribute('data-cta-region', 'Footer');
      liItc.append(newItcLink);
      ulItc.append(liItc);
      footerBrandLeftSectionSecondary.append(ulItc);
    }

    const copyrightCell = copyrightRow.children[1];
    if (copyrightCell) {
      const footerBrandLeftCopyright = document.createElement('div');
      footerBrandLeftCopyright.classList.add('footer-brand-left-copyright');
      moveInstrumentation(copyrightCell, footerBrandLeftCopyright);

      const copyrightSpan = document.createElement('span');
      copyrightSpan.classList.add('footer-brand-left-text');
      copyrightSpan.textContent = copyrightCell.textContent.trim();
      footerBrandLeftCopyright.append(copyrightSpan);
      footerBrandLeftSectionSecondary.append(footerBrandLeftCopyright);
    }
  }

  block.textContent = '';
  block.classList.add('footer-brand-section');
  block.append(footerBrandWrapperPrimary, footerBrandWrapperSecondary);
}
