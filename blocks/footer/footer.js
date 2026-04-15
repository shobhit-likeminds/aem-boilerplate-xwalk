import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    secondaryLogoRow,
    ...sectionRows
  ] = [...block.children];

  block.textContent = '';

  const sectionContainer = document.createElement('section');
  sectionContainer.classList.add('container-hd', 'fmm-container', 'p-0');
  block.append(sectionContainer);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100');
  sectionContainer.append(footerBrand);

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

  // Logo
  const logoLink = document.createElement('a');
  logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'cta-analytics');
  logoLink.setAttribute('data-link-region', 'Footer');
  logoLink.setAttribute('aria-label', 'logo');
  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) {
    logoLink.href = logoAnchor.href;
    moveInstrumentation(logoLinkRow, logoLink);
  }

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  footerBrandLeft.append(logoLink);

  // Secondary Logo
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100');
    moveInstrumentation(secondaryLogoRow, optimizedPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedPic);
  }
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

  // Section Links
  sectionRows.forEach((row, index) => {
    // Check 0: Replaced row.children[0] with content detection
    const sectionLinksCell = [...row.children].find((cell) => cell.innerHTML.trim());
    if (!sectionLinksCell) return; // Skip if cell is empty

    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    moveInstrumentation(row, footerListDiv);

    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    ul.innerHTML = sectionLinksCell.innerHTML;

    // Transform nested lists if any
    ul.querySelectorAll('li').forEach((li) => {
      const nestedUl = li.querySelector(':scope > ul');
      if (nestedUl) {
        nestedUl.remove();
        const subWrap = document.createElement('div');
        subWrap.classList.add('has-sub-child'); // Use class from original site CSS
        subWrap.append(nestedUl);
        li.append(subWrap);

        const trigger = li.querySelector(':scope > a') || li;
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }

      const link = li.querySelector('a');
      if (link) {
        link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
        link.setAttribute('data-link-region', 'Footer');
        moveInstrumentation(li, link);
      }
      li.classList.add('footer-list__item');
    });

    footerListDiv.append(ul);
    if (index < 2) { // Assuming first two footerLists go to navbar-left
      footerBrandNavbarLeft.append(footerListDiv);
    } else { // Remaining footerLists go to navbar-right
      footerBrandNavbarRight.append(footerListDiv);
    }
  });

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

  // ITC Portal link (hardcoded from original HTML as it's not in EDS model)
  const itcPortalLi = document.createElement('li');
  itcPortalLi.classList.add('footer-brand__left--item');
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.classList.add('footer-brand__left--link', 'cta-analytics');
  itcPortalLink.setAttribute('data-link-region', 'Footer');
  itcPortalLink.textContent = 'ITC Portal';
  const screenReaderSpan = document.createElement('span');
  screenReaderSpan.classList.add('cmp-link__screen-reader-only');
  screenReaderSpan.textContent = 'opens in a new tab';
  itcPortalLink.append(screenReaderSpan);
  itcPortalLi.append(itcPortalLink);
  footerBrandLeftList.append(itcPortalLi);

  // Copyright text (hardcoded from original HTML as it's not in EDS model)
  const copyrightLi = document.createElement('li');
  copyrightLi.classList.add('footer-brand__left--item');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text');
  copyrightSpan.textContent = '© 2025 Aashirvaad Svasti. All Rights Reserved.';
  copyrightLi.append(copyrightSpan);
  footerBrandLeftList.append(copyrightLi);

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.classList.add('footer-brand__right');
  secondaryContent.append(footerBrandRightSecondary);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center');
  footerBrandRightSecondary.append(socialList);

  // Social media links (hardcoded from original HTML as they are not in EDS model)
  const socialLinks = [
    {
      href: 'https://www.instagram.com/aashirvaad_svastimilk',
      alt: 'Instagram',
      src: '/content/dam/aemigrate/uploaded-folder/image/1776285259108.svg+xml',
    },
    {
      href: 'https://www.facebook.com/SvastiMilkAashirvaad',
      alt: 'Facebook',
      src: '/content/dam/aemigrate/uploaded-folder/image/1776285259070.svg+xml',
    },
    {
      href: 'https://www.youtube.com/@aashirvaadsvastimilk5475',
      alt: 'Youtube',
      src: '/content/dam/aemigrate/uploaded-folder/image/1776285259145.svg+xml',
    },
  ];

  socialLinks.forEach((social) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');
    const link = document.createElement('a');
    link.href = social.href;
    link.classList.add('footer-brand__right--link', 'cta-analytics');
    link.setAttribute('data-link-region', 'Footer');
    link.target = '_blank';
    const img = document.createElement('img');
    img.setAttribute('aria-label', social.alt);
    img.src = social.src;
    img.classList.add('object-fit-contain', 'w-100', 'h-100');
    img.alt = social.alt; // Corrected: Use alt from social object
    img.loading = 'lazy';
    const screenReader = document.createElement('span');
    screenReader.classList.add('cmp-link__screen-reader-only');
    screenReader.textContent = 'opens in a new tab';
    link.append(img, screenReader);
    li.append(link);
    socialList.append(li);
  });
}
