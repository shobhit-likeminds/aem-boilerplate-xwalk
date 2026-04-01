import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const footerTop = document.createElement('div');
  footerTop.classList.add('footer-top');
  const container = document.createElement('div');
  container.classList.add('container');
  const column = document.createElement('div');
  column.classList.add('column');

  // Logo (first row with a picture)
  const logoRow = children.find((row) => row.querySelector('picture'));
  if (logoRow) {
    const logoWrapper = document.createElement('div');
    logoWrapper.classList.add('colum-element');
    const logoLink = document.createElement('a');
    logoLink.classList.add('logo');
    logoLink.href = '/';
    logoLink.rel = 'home';
    const logoPicture = logoRow.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '94' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        logoLink.append(optimizedPic);
      }
    }
    moveInstrumentation(logoRow, logoWrapper);
    logoWrapper.append(logoLink);
    column.append(logoWrapper);
  }

  // Link Groups (rows with 2 cells, no picture)
  const linkGroupsContainer = document.createElement('div');
  linkGroupsContainer.classList.add('colum-element');
  const linkGroupRows = children.filter((row) => row.children.length === 2 && !row.querySelector('picture'));

  linkGroupRows.forEach((row) => {
    const ul = document.createElement('ul');
    moveInstrumentation(row, ul);

    const [titleCell, linksCell] = [...row.children]; // CORRECT: destructuring

    const titleLi = document.createElement('li');
    titleLi.classList.add('title');
    const titleLink = titleCell.querySelector('a');
    if (titleLink) {
      titleLi.append(titleLink);
    } else {
      titleLi.textContent = titleCell.textContent;
    }
    ul.append(titleLi);

    [...linksCell.children].forEach((linkRow) => {
      const li = document.createElement('li');
      moveInstrumentation(linkRow, li);
      const link = linkRow.querySelector('a');
      if (link) {
        li.append(link);
      } else {
        li.textContent = linkRow.textContent;
      }
      ul.append(li);
    });
    linkGroupsContainer.append(ul);
  });
  column.append(linkGroupsContainer);

  // Social Links
  const socialLinksContainer = document.createElement('div');
  socialLinksContainer.classList.add('colum-element');
  const socialLinksTitle = document.createElement('div');
  socialLinksTitle.classList.add('title');

  // Find the contact us link row (row with a link containing "contact-us")
  const contactUsLinkRow = children.find((row) => row.querySelector('a[href*="contact-us"]'));
  if (contactUsLinkRow) {
    const link = contactUsLinkRow.querySelector('a');
    if (link) {
      socialLinksTitle.append(link);
    }
  } else {
    socialLinksTitle.textContent = 'CONTACT US';
  }
  socialLinksContainer.append(socialLinksTitle);

  const followUsDiv = document.createElement('div');
  followUsDiv.classList.add('follow-us');
  const followUsP = document.createElement('p');
  followUsP.textContent = 'Follow Us';
  followUsDiv.append(followUsP);

  const linkSocialDiv = document.createElement('div');
  linkSocialDiv.classList.add('link-social');
  // Social link rows are those with 2 cells and a picture in one of them
  const socialLinkRows = children.filter((row) => row.children.length === 2 && row.querySelector('picture'));

  socialLinkRows.forEach((row) => {
    const [linkCell, iconCell] = [...row.children]; // CORRECT: destructuring
    const socialLink = linkCell.querySelector('a');
    const socialIconPicture = iconCell.querySelector('picture');

    if (socialLink && socialIconPicture) {
      const iconImg = socialIconPicture.querySelector('img');
      if (iconImg) {
        const a = document.createElement('a');
        a.href = socialLink.href;
        a.target = '_blank';
        const optimizedPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '26' }]);
        moveInstrumentation(iconImg, optimizedPic.querySelector('img'));
        a.append(optimizedPic);
        linkSocialDiv.append(a);
      }
    } else if (socialLink) { // Fallback for font-awesome icons if no picture is present
      const i = document.createElement('i');
      if (socialLink.href.includes('facebook')) {
        i.classList.add('fa', 'fa-facebook');
      } else if (socialLink.href.includes('linkedin')) {
        i.classList.add('fa', 'fa-linkedin');
      }
      const a = document.createElement('a');
      a.href = socialLink.href;
      a.target = '_blank';
      a.append(i);
      linkSocialDiv.append(a);
    }
    moveInstrumentation(row, linkSocialDiv);
  });
  followUsDiv.append(linkSocialDiv);
  socialLinksContainer.append(followUsDiv);
  column.append(socialLinksContainer);

  container.append(column);
  footerTop.append(container);
  block.append(footerTop);

  // Footer Bottom
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  // Copyright (row containing "Copyright")
  const copyrightRow = children.find((row) => row.textContent.includes('Copyright'));
  if (copyrightRow) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('txt-copyright');
    moveInstrumentation(copyrightRow, copyrightDiv);
    copyrightDiv.textContent = copyrightRow.textContent.replace('Copyright value', 'Copyright © JSW 2021 All rights reserved');
    footerBottom.append(copyrightDiv);
  }

  // Privacy Policy Link (row with a link containing "privacyPolicy")
  const privacyPolicyRow = children.find((row) => row.querySelector('a[href*="privacyPolicy"]'));
  if (privacyPolicyRow) {
    const privacyDiv = document.createElement('div');
    privacyDiv.classList.add('txt-terms');
    const privacyLink = privacyPolicyRow.querySelector('a');
    if (privacyLink) {
      privacyLink.textContent = 'Privacy Policy';
      privacyLink.target = '_blank';
      privacyDiv.append(privacyLink);
    }
    moveInstrumentation(privacyPolicyRow, privacyDiv);
    footerBottom.append(privacyDiv);
  }

  block.append(footerBottom);
  block.classList.add('footer', 'hidden-xs');

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
