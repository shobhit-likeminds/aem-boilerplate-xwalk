import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logo1Row,
    logo2Row,
    itcPortalLinkRow,
    itcPortalLinkLabelRow,
    copyrightRow,
    ...itemRows
  ] = [...block.children];

  const footerLinks = itemRows.filter((row) => row.children.length === 2);
  const socialLinks = itemRows.filter((row) => row.children.length === 3);

  block.textContent = '';
  block.classList.add('w-100', 'bg-boing-neutral-gray-600');

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');
  block.append(primarySection);

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');
  primarySection.append(containerDiv);

  const primaryContentDiv = document.createElement('div');
  primaryContentDiv.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  containerDiv.append(primaryContentDiv);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');
  primaryContentDiv.append(footerBrandLeft);

  // Logo 1
  if (logo1Row) {
    const logo1Link = document.createElement('a');
    logo1Link.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
    logo1Link.setAttribute('data-cta-region', 'Footer');
    logo1Link.setAttribute('aria-label', 'ITC Logo');

    const logo1Picture = logo1Row.querySelector('picture');
    if (logo1Picture) {
      const img = logo1Picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
        moveInstrumentation(logo1Picture, optimizedPic);
        logo1Link.append(optimizedPic);
        const foundLink = logo1Row.querySelector('a');
        if (foundLink) logo1Link.href = foundLink.href;
      }
    }
    moveInstrumentation(logo1Row, logo1Link);
    footerBrandLeft.append(logo1Link);
  }

  // Logo 2
  if (logo2Row) {
    const logo2Div = document.createElement('div');
    logo2Div.classList.add('footer-brand__secondary--logo', 'd-inline-block');
    const logo2Picture = logo2Row.querySelector('picture');
    if (logo2Picture) {
      const img = logo2Picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'no-rendition');
        moveInstrumentation(logo2Picture, optimizedPic);
        logo2Div.append(optimizedPic);
      }
    }
    moveInstrumentation(logo2Row, logo2Div);
    footerBrandLeft.append(logo2Div);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  primaryContentDiv.append(footerBrandRight);

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNavbar);

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavbar.append(footerNavbarLeft);

  // Footer Links
  if (footerLinks.length > 0) {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const footerListUl = document.createElement('ul');
    footerListUl.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    footerListDiv.append(footerListUl);

    footerLinks.forEach((row) => {
      const [urlCell, urlLabelCell] = [...row.children]; // Corrected: using destructuring
      const li = document.createElement('li');
      li.classList.add('footer-list__item');

      const link = document.createElement('a');
      link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      link.setAttribute('data-link-region', 'Footer List');

      const foundLink = urlCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
      }
      link.textContent = urlLabelCell ? urlLabelCell.textContent.trim() : '';

      moveInstrumentation(row, li);
      li.append(link);
      footerListUl.append(li);
    });
    footerNavbarLeft.append(footerListDiv);
  }

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  footerNavbar.append(footerNavbarRight);

  // ITC Portal Link
  if (itcPortalLinkRow && itcPortalLinkLabelRow) {
    const itcListDiv = document.createElement('div');
    itcListDiv.classList.add('footerList');
    const itcListUl = document.createElement('ul');
    itcListUl.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    itcListDiv.append(itcListUl);

    const li = document.createElement('li');
    li.classList.add('footer-list__item'); // Corrected: class name from 'foot_link' to 'footer-list__item'

    const link = document.createElement('a');
    link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block'); // Corrected: class name from 'footer-brand__left--link' to 'footer-list__item--link'
    link.setAttribute('data-link-region', 'Footer List');
    link.setAttribute('target', '_blank');

    const foundLink = itcPortalLinkRow.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
    }
    link.textContent = itcPortalLinkLabelRow ? itcPortalLinkLabelRow.textContent.trim() : '';

    moveInstrumentation(itcPortalLinkRow, li);
    li.append(link);
    itcListUl.append(li);
    footerNavbarRight.append(itcListDiv);
  }

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');
  block.append(secondarySection);

  const secondaryContainerDiv = document.createElement('div');
  secondaryContainerDiv.classList.add('container');
  secondarySection.append(secondaryContainerDiv);

  const secondaryContentDiv = document.createElement('div');
  secondaryContentDiv.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');
  secondaryContainerDiv.append(secondaryContentDiv);

  const socialMediaRight = document.createElement('section');
  socialMediaRight.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');
  secondaryContentDiv.append(socialMediaRight);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaRight.append(socialMediaTitle);

  // Social Links
  if (socialLinks.length > 0) {
    const socialListUl = document.createElement('ul');
    socialListUl.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
    socialMediaRight.append(socialListUl);

    socialLinks.forEach((row) => {
      const [urlCell, urlLabelCell, iconCell] = [...row.children]; // Corrected: using destructuring
      const li = document.createElement('li');
      li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

      const link = document.createElement('a');
      link.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      link.setAttribute('data-cta-region', 'Footer');
      link.setAttribute('target', '_blank');

      const foundLink = urlCell.querySelector('a');
      if (foundLink) {
        link.href = foundLink.href;
        link.setAttribute('data-cta-label', `footer-${urlLabelCell.textContent.trim().toLowerCase()}`);
        link.setAttribute('data-platform-name', urlLabelCell.textContent.trim().toLowerCase());
        link.setAttribute('data-social-linktype', 'follow');
      }

      const iconPicture = iconCell.querySelector('picture');
      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
          optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
          optimizedPic.querySelector('img').setAttribute('aria-label', urlLabelCell.textContent.trim().toLowerCase());
          moveInstrumentation(iconPicture, optimizedPic);
          link.append(optimizedPic);
        }
      }
      moveInstrumentation(row, li);
      li.append(link);
      socialListUl.append(li);
    });
  }

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  secondaryContentDiv.append(footerBrandLeftSecondary);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  footerBrandLeftSecondary.append(footerBrandLeftList);

  // Copyright
  if (copyrightRow) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand__left--text', 'text-white');
    copyrightSpan.textContent = copyrightRow.textContent.trim();
    moveInstrumentation(copyrightRow, copyrightDiv);
    copyrightDiv.append(copyrightSpan);
    footerBrandLeftSecondary.append(copyrightDiv);
  }

  // Image optimization for all pictures in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
