import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const sectionPrimary = document.createElement('section');
  sectionPrimary.classList.add('footer-brand__primary');

  const containerPrimary = document.createElement('div');
  containerPrimary.classList.add('container');
  sectionPrimary.append(containerPrimary);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  containerPrimary.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');
  primaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  primaryContent.append(footerBrandRight);

  // Identify specific rows using content detection
  const logoImageRow = children.find(row => row.querySelector('picture') && row.nextElementSibling?.querySelector('a') && row.nextElementSibling.nextElementSibling?.querySelector('a') && !row.nextElementSibling.nextElementSibling.nextElementSibling?.querySelector('picture'));
  const logoLinkRow = logoImageRow ? logoImageRow.nextElementSibling : null;
  const logoLinkLabelRow = logoLinkRow ? logoLinkRow.nextElementSibling : null;
  const secondaryLogoImageRow = children.find(row => row.querySelector('picture') && row !== logoImageRow && row.previousElementSibling?.querySelector('a') && row.previousElementSibling.previousElementSibling?.querySelector('a') && row.previousElementSibling.previousElementSibling.previousElementSibling?.querySelector('picture'));

  const itcPortalLinkRow = children.find(row => row.querySelector('a') && row.nextElementSibling?.querySelector('a') && row.nextElementSibling.nextElementSibling?.textContent.trim().startsWith('©'));
  const itcPortalLinkLabelRow = itcPortalLinkRow ? itcPortalLinkRow.nextElementSibling : null;
  const copyrightTextRow = itcPortalLinkLabelRow ? itcPortalLinkLabelRow.nextElementSibling : null;

  // Logo Image
  if (logoImageRow && logoLinkRow && logoLinkLabelRow) {
    const logoAnchor = document.createElement('a');
    logoAnchor.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
    logoAnchor.setAttribute('data-cta-region', 'Footer');

    const logoLink = logoLinkRow.querySelector('a');
    if (logoLink) {
      logoAnchor.href = logoLink.href;
    }
    const logoLinkLabel = logoLinkLabelRow.querySelector('div')?.textContent.trim();
    if (logoLinkLabel) {
      logoAnchor.setAttribute('aria-label', logoLinkLabel);
    } else {
      logoAnchor.setAttribute('aria-label', 'ITC Logo'); // Default from original HTML
    }

    const logoPicture = logoImageRow.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      if (img) {
        img.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
        logoAnchor.append(logoPicture);
        moveInstrumentation(logoImageRow, logoPicture);
      }
    }
    footerBrandLeft.append(logoAnchor);
  }

  // Secondary Logo Image
  if (secondaryLogoImageRow) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
    const secondaryLogoPicture = secondaryLogoImageRow.querySelector('picture');
    if (secondaryLogoPicture) {
      const img = secondaryLogoPicture.querySelector('img');
      if (img) {
        img.classList.add('object-fit-contain', 'w-100', 'no-rendition');
        secondaryLogoDiv.append(secondaryLogoPicture);
        moveInstrumentation(secondaryLogoImageRow, secondaryLogoPicture);
      }
    }
    footerBrandLeft.append(secondaryLogoDiv);
  }

  // Footer Navbar
  const nav = document.createElement('nav');
  nav.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(nav);

  const navbarLeft = document.createElement('div');
  navbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navbarLeft);

  const navbarRight = document.createElement('div');
  navbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navbarRight);

  const footerLinks = children.filter(row => row.children.length === 2 && row.querySelector('a') && !row.querySelector('picture'));
  const footerSocialLinks = children.filter(row => row.children.length === 3 && row.querySelector('a') && row.querySelector('picture'));

  const footerLinkLists = [];
  // Distribute footer links into 4 lists as per original HTML structure
  for (let i = 0; i < 4; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    footerListDiv.append(ul);
    footerLinkLists.push(ul);
    if (i < 2) {
      navbarLeft.append(footerListDiv);
    } else {
      navbarRight.append(footerListDiv);
    }
  }

  footerLinks.forEach((row, index) => {
    const li = document.createElement('li');
    li.classList.add('footer-list__item');
    moveInstrumentation(row, li);

    const linkUrlCell = [...row.children].find(cell => cell.querySelector('a'));
    const linkLabelCell = [...row.children].find(cell => !cell.querySelector('a') || (cell.querySelector('a') && cell.querySelector('a').href === linkUrlCell.querySelector('a').href));

    const anchor = document.createElement('a');
    anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
    anchor.setAttribute('data-link-region', 'Footer List');

    if (linkUrlCell) {
      const foundLink = linkUrlCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }
    }
    if (linkLabelCell) {
      anchor.textContent = linkLabelCell.textContent.trim();
    }
    li.append(anchor);
    footerLinkLists[index % 4].append(li);
  });

  // Secondary Section
  const sectionSecondary = document.createElement('section');
  sectionSecondary.classList.add('footer-brand__secondary');

  const containerSecondary = document.createElement('div');
  containerSecondary.classList.add('container');
  sectionSecondary.append(containerSecondary);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');
  containerSecondary.append(secondaryContent);

  const secondaryFooterBrandRight = document.createElement('section');
  secondaryFooterBrandRight.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');
  secondaryContent.append(secondaryFooterBrandRight);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('social-media--title'); // Corrected class name
  socialMediaTitle.textContent = 'Follow Us On';
  secondaryFooterBrandRight.append(socialMediaTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
  secondaryFooterBrandRight.append(socialList);

  footerSocialLinks.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');
    moveInstrumentation(row, li);

    const socialLinkUrlCell = [...row.children].find(cell => cell.querySelector('a'));
    const socialLinkLabelCell = [...row.children].find(cell => cell.textContent.trim() && !cell.querySelector('a') && !cell.querySelector('picture'));
    const socialIconCell = [...row.children].find(cell => cell.querySelector('picture'));

    const anchor = document.createElement('a');
    anchor.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.setAttribute('data-social-linktype', 'follow');
    anchor.target = '_blank';

    if (socialLinkUrlCell) {
      const foundLink = socialLinkUrlCell.querySelector('a');
      if (foundLink) {
        anchor.href = foundLink.href;
      }
    }
    if (socialLinkLabelCell) {
      anchor.setAttribute('data-cta-label', `footer-${socialLinkLabelCell.textContent.trim().toLowerCase()}`);
      anchor.setAttribute('data-platform-name', socialLinkLabelCell.textContent.trim().toLowerCase());
    }

    if (socialIconCell) {
      const picture = socialIconCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          img.classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
          img.setAttribute('aria-label', socialLinkLabelCell ? socialLinkLabelCell.textContent.trim().toLowerCase() : '');
          anchor.append(picture);
        }
      }
    }
    li.append(anchor);
    socialList.append(li);
  });

  const secondaryFooterBrandLeft = document.createElement('section');
  secondaryFooterBrandLeft.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  secondaryContent.append(secondaryFooterBrandLeft);

  const secondaryLeftList = document.createElement('ul');
  secondaryLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  secondaryFooterBrandLeft.append(secondaryLeftList);

  // ITC Portal Link
  if (itcPortalLinkRow && itcPortalLinkLabelRow) {
    const itcLi = document.createElement('li');
    itcLi.classList.add('footer-brand__left--item', 'foot_link');
    moveInstrumentation(itcPortalLinkRow, itcLi);

    const itcAnchor = document.createElement('a');
    itcAnchor.classList.add('footer-brand__left--link', 'analytics_cta_click');
    itcAnchor.setAttribute('data-cta-region', 'Footer');
    itcAnchor.target = '_blank';

    const itcLink = itcPortalLinkRow.querySelector('a');
    if (itcLink) {
      itcAnchor.href = itcLink.href;
    }
    const itcLinkLabel = itcPortalLinkLabelRow.querySelector('div')?.textContent.trim();
    if (itcLinkLabel) {
      itcAnchor.textContent = itcLinkLabel;
    }
    itcLi.append(itcAnchor);
    secondaryLeftList.append(itcLi);
  }

  // Copyright Text
  if (copyrightTextRow) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
    moveInstrumentation(copyrightTextRow, copyrightDiv);

    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand__left--text', 'text-white');
    copyrightSpan.textContent = copyrightTextRow.querySelector('div')?.textContent.trim() || '';
    copyrightDiv.append(copyrightSpan);
    secondaryFooterBrandLeft.append(copyrightDiv);
  }

  block.textContent = '';
  block.classList.add('w-100', 'bg-boing-neutral-gray-600');
  block.append(sectionPrimary, sectionSecondary);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
