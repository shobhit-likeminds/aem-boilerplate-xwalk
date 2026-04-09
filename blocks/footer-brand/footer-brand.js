import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLinkRow,
    logoLinkLabelRow,
    secondaryLogoImageRow,
    socialTitleRow,
    footerLeftLogoLinkRow,
    footerLeftLogoLinkLabelRow,
    copyrightRow,
    ...itemRows
  ] = [...block.children];

  const footerNavItems = itemRows.filter((row) => row.children.length === 2);
  const footerSocialItems = itemRows.filter((row) => row.children.length === 3);

  block.textContent = '';

  const sectionContainer = document.createElement('section');
  sectionContainer.classList.add('container-hd', 'p-0');

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.classList.add('footer-brand', 'w-100', 'bg-boing-neutral-gray-600');
  footerBrandDiv.setAttribute('data-isdoodlevariation', 'false');

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');
  primarySection.style.backgroundColor = '';

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  // Logo Link
  const logoLink = document.createElement('a');
  logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
    logoLink.setAttribute('target', '_blank');
    logoLink.setAttribute('data-cta-region', 'Footer');
    logoLink.setAttribute('aria-label', logoLinkLabelRow.textContent.trim() || 'Logo');
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '750' }]);
    optimizedLogoPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
    logoLink.append(optimizedLogoPic);
    moveInstrumentation(logoImageRow, optimizedLogoPic);
  }
  footerBrandLeft.append(logoLink);

  // Secondary Logo Image
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryLogoPicture = secondaryLogoImageRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const secondaryLogoImg = secondaryLogoPicture.querySelector('img');
    const optimizedSecondaryLogoPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt, false, [{ width: '750' }]);
    optimizedSecondaryLogoPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'no-rendition');
    secondaryLogoDiv.append(optimizedSecondaryLogoPic);
    moveInstrumentation(secondaryLogoImageRow, optimizedSecondaryLogoPic);
  }
  footerBrandLeft.append(secondaryLogoDiv);
  primaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  // Footer Nav Items
  const uniqueNavLists = new Map(); // Group nav items by their link text for unique lists
  footerNavItems.forEach((row) => {
    const cells = [...row.children];
    const navLinkCell = cells.find(cell => cell.querySelector('a'));
    const navLinkLabelCell = cells.find(cell => !cell.querySelector('a'));

    const navLink = document.createElement('a');
    navLink.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
    const foundNavLink = navLinkCell.querySelector('a');
    if (foundNavLink) {
      navLink.href = foundNavLink.href;
      navLink.setAttribute('data-link-region', 'Footer List');
    }
    navLink.textContent = navLinkLabelCell.textContent.trim();
    moveInstrumentation(row, navLink);

    const linkText = navLink.textContent.trim();
    if (!uniqueNavLists.has(linkText)) {
      uniqueNavLists.set(linkText, []);
    }
    uniqueNavLists.get(linkText).push(navLink);
  });

  // Create footer lists based on unique links
  const navListWrappers = [];
  uniqueNavLists.forEach((links) => {
    const footerListWrapper = document.createElement('div');
    footerListWrapper.classList.add('footerList');

    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    links.forEach((link) => {
      const li = document.createElement('li');
      li.classList.add('footer-list__item');
      li.append(link);
      ul.append(li);
    });
    footerListWrapper.append(ul);
    navListWrappers.push(footerListWrapper);
  });

  // Distribute nav lists into left and right columns (simple even distribution for now)
  const midPoint = Math.ceil(navListWrappers.length / 2);
  const leftNavLists = navListWrappers.slice(0, midPoint);
  const rightNavLists = navListWrappers.slice(midPoint);

  leftNavLists.forEach((list) => footerNavbarLeft.append(list));
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  rightNavLists.forEach((list) => footerNavbarRight.append(list));
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  primaryContent.append(footerBrandRight);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);
  footerBrandDiv.append(primarySection);

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');
  secondarySection.style.backgroundColor = '';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const secondaryRight = document.createElement('section');
  secondaryRight.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');

  // Social Title
  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('social_media--title');
  socialTitle.textContent = socialTitleRow.textContent.trim();
  moveInstrumentation(socialTitleRow, socialTitle);
  secondaryRight.append(socialTitle);

  // Footer Social Items
  const socialUl = document.createElement('ul');
  socialUl.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  footerSocialItems.forEach((row) => {
    const cells = [...row.children];
    const socialLinkCell = cells.find(cell => cell.querySelector('a'));
    const socialLinkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));
    const socialIconCell = cells.find(cell => cell.querySelector('picture'));

    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const socialLink = document.createElement('a');
    socialLink.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
    const foundSocialLink = socialLinkCell.querySelector('a');
    if (foundSocialLink) {
      socialLink.href = foundSocialLink.href;
      socialLink.setAttribute('target', '_blank');
      socialLink.setAttribute('data-cta-region', 'Footer');
      socialLink.setAttribute('data-cta-label', `footer-${socialLinkLabelCell.textContent.trim().toLowerCase()}`);
      socialLink.setAttribute('data-platform-name', socialLinkLabelCell.textContent.trim().toLowerCase());
      socialLink.setAttribute('data-social-linktype', 'follow');
    }
    moveInstrumentation(row, socialLink);

    const socialPicture = socialIconCell.querySelector('picture');
    if (socialPicture) {
      const socialImg = socialPicture.querySelector('img');
      const optimizedSocialPic = createOptimizedPicture(socialImg.src, socialImg.alt, false, [{ width: '750' }]);
      optimizedSocialPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      optimizedSocialPic.querySelector('img').setAttribute('aria-label', socialImg.alt);
      socialLink.append(optimizedSocialPic);
      moveInstrumentation(socialIconCell, optimizedSocialPic);
    }
    li.append(socialLink);
    socialUl.append(li);
  });
  secondaryRight.append(socialUl);
  secondaryContent.append(secondaryRight);

  const secondaryLeft = document.createElement('section');
  secondaryLeft.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const footerLeftUl = document.createElement('ul');
  footerLeftUl.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  // Footer Left Logo Link
  const footerLeftLi = document.createElement('li');
  footerLeftLi.classList.add('footer-brand__left--item', 'foot_link');
  const footerLeftLink = document.createElement('a');
  footerLeftLink.classList.add('footer-brand__left--link', 'analytics_cta_click');
  const foundFooterLeftLink = footerLeftLogoLinkRow.querySelector('a');
  if (foundFooterLeftLink) {
    footerLeftLink.href = foundFooterLeftLink.href;
    footerLeftLink.setAttribute('target', '_blank');
    footerLeftLink.setAttribute('data-cta-region', 'Footer');
  }
  footerLeftLink.textContent = footerLeftLogoLinkLabelRow.textContent.trim();
  moveInstrumentation(footerLeftLogoLinkRow, footerLeftLink);
  moveInstrumentation(footerLeftLogoLinkLabelRow, footerLeftLink);
  footerLeftLi.append(footerLeftLink);
  footerLeftUl.append(footerLeftLi);
  secondaryLeft.append(footerLeftUl);

  // Copyright
  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text', 'text-white');
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightDiv.append(copyrightSpan);
  secondaryLeft.append(copyrightDiv);
  secondaryContent.append(secondaryLeft);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);
  footerBrandDiv.append(secondarySection);

  sectionContainer.append(footerBrandDiv);
  block.append(sectionContainer);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
