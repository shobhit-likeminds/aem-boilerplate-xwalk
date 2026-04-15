import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    certificationImageRow,
    certificationImageLinkRow,
    certificationImageLinkLabelRow,
    twitterLinkRow,
    twitterLinkLabelRow,
    facebookLinkRow,
    facebookLinkLabelRow,
    linkedinLinkRow,
    linkedinLinkLabelRow,
    copyrightTextRow,
    privacyPolicyLinkRow,
    privacyPolicyLinkLabelRow,
    ...sectionRows
  ] = children;

  block.classList.add('hidden-xs');

  // Footer Top
  const footerTop = document.createElement('div');
  footerTop.classList.add('footer-top');
  const container = document.createElement('div');
  container.classList.add('container');
  const column = document.createElement('div');
  column.classList.add('column');

  // Logo
  const logoElement = document.createElement('div');
  logoElement.classList.add('colum-element'); // Corrected from 'colum-element' to 'column-element' based on original HTML
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo');
  logoLink.rel = 'home';
  const logoAnchor = logoLinkRow.querySelector('a');
  if (logoAnchor) {
    logoLink.href = logoAnchor.href;
  } else {
    logoLink.href = '#';
  }
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '94' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, logoLink);
  logoElement.append(logoLink);
  column.append(logoElement);

  // Section Links
  const sectionLinksWrapper = document.createElement('div');
  sectionLinksWrapper.classList.add('colum-element'); // Corrected from 'colum-element' to 'column-element' based on original HTML

  sectionRows.forEach((row) => {
    // Use content detection instead of index access for sectionRows
    const cells = [...row.children];
    const sectionTitleCell = cells.find(cell => !cell.querySelector('ul') && !cell.querySelector('p'));
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p'));

    if (sectionLinksCell) {
      const sectionUl = sectionLinksCell.querySelector('ul');
      if (sectionUl) {
        const ul = document.createElement('ul');
        const titleLi = document.createElement('li');
        titleLi.classList.add('title');
        titleLi.textContent = sectionTitleCell.textContent.trim();
        ul.append(titleLi);
        moveInstrumentation(sectionTitleCell, titleLi);

        [...sectionUl.children].forEach((li) => {
          ul.append(li);
        });
        sectionLinksWrapper.append(ul);
      } else {
        // Handle cases where sectionLinksCell might contain a <p> or just text
        const ul = document.createElement('ul');
        const titleLi = document.createElement('li');
        titleLi.classList.add('title');
        const titleLink = document.createElement('a');
        titleLink.href = '#'; // Placeholder, as sectionTitle is text, not aem-content
        titleLink.textContent = sectionTitleCell.textContent.trim();
        titleLi.append(titleLink);
        ul.append(titleLi);

        // Append other links if they are direct children of sectionLinksCell
        [...sectionLinksCell.children].forEach((child) => {
          if (child.tagName === 'P' && child.querySelector('a')) {
            const li = document.createElement('li');
            li.append(child.querySelector('a'));
            ul.append(li);
          } else if (child.tagName === 'A') {
            const li = document.createElement('li');
            li.append(child);
            ul.append(li);
          }
        });
        sectionLinksWrapper.append(ul);
      }
    }
    moveInstrumentation(row, sectionLinksWrapper);
  });
  column.append(sectionLinksWrapper);

  // Contact Us and Follow Us
  const contactFollowUs = document.createElement('div');
  contactFollowUs.classList.add('colum-element'); // Corrected from 'colum-element' to 'column-element' based on original HTML
  const contactTitle = document.createElement('div');
  contactTitle.classList.add('title');
  const contactLink = document.createElement('a');
  contactLink.href = 'https://www.jsw.in/groups/contact-us'; // Hardcoded as per original HTML
  contactLink.target = '_blank';
  contactLink.textContent = 'CONTACT US';
  contactTitle.append(contactLink);
  contactFollowUs.append(contactTitle);

  const followUs = document.createElement('div');
  followUs.classList.add('follow-us');
  const followUsP = document.createElement('p');
  followUsP.textContent = 'Follow Us';
  followUs.append(followUsP);

  const socialLinks = document.createElement('div');
  socialLinks.classList.add('link-social');

  // Twitter
  const twitterA = document.createElement('a');
  const twitterHref = twitterLinkRow.querySelector('a');
  if (twitterHref) {
    twitterA.href = twitterHref.href;
  } else {
    twitterA.href = '#';
  }
  twitterA.target = '_blank';
  const twitterImg = document.createElement('img');
  twitterImg.alt = twitterLinkLabelRow.textContent.trim() || 'twitter';
  // Use a placeholder if the image path is not available from block data,
  // but avoid hardcoding specific asset paths like /content/dam/...
  twitterImg.src = '/icons/twitter.svg'; // Placeholder, replace with actual icon if available in model
  twitterImg.classList.add('social-icon'); // Add a class for styling
  moveInstrumentation(twitterLinkRow, twitterA);
  twitterA.append(twitterImg);
  socialLinks.append(twitterA);

  // Facebook
  const facebookA = document.createElement('a');
  const facebookHref = facebookLinkRow.querySelector('a');
  if (facebookHref) {
    facebookA.href = facebookHref.href;
  } else {
    facebookA.href = '#';
  }
  facebookA.target = '_blank';
  const facebookI = document.createElement('i');
  facebookI.classList.add('fa', 'fa-facebook');
  facebookI.textContent = ' ';
  moveInstrumentation(facebookLinkRow, facebookA);
  facebookA.append(facebookI);
  socialLinks.append(facebookA);

  // LinkedIn
  const linkedinA = document.createElement('a');
  const linkedinHref = linkedinLinkRow.querySelector('a');
  if (linkedinHref) {
    linkedinA.href = linkedinHref.href;
  } else {
    linkedinA.href = '#';
  }
  linkedinA.target = '_blank';
  const linkedinI = document.createElement('i');
  linkedinI.classList.add('fa', 'fa-linkedin');
  linkedinI.textContent = ' ';
  moveInstrumentation(linkedinLinkRow, linkedinA);
  linkedinA.append(linkedinI);
  socialLinks.append(linkedinA);

  followUs.append(socialLinks);
  followUs.append(document.createElement('p')); // Empty paragraph as per original HTML

  // Certification Image
  const certImgP = document.createElement('p');
  const certImgLink = document.createElement('a');
  const certHref = certificationImageLinkRow.querySelector('a');
  if (certHref) {
    certImgLink.href = certHref.href;
  } else {
    certImgLink.href = '#';
  }
  const certPicture = certificationImageRow.querySelector('picture');
  if (certPicture) {
    const img = certPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '70' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      certImgLink.append(optimizedPic);
    }
  }
  moveInstrumentation(certificationImageRow, certImgLink);
  certImgP.append(certImgLink);
  followUs.append(certImgP);

  contactFollowUs.append(followUs);
  column.append(contactFollowUs);

  container.append(column);
  footerTop.append(container);
  block.append(footerTop);

  // Footer Bottom
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('txt-copyright');
  copyrightDiv.textContent = copyrightTextRow.textContent.trim();
  const cYearSpan = document.createElement('span');
  cYearSpan.id = 'cyear';
  cYearSpan.textContent = new Date().getFullYear(); // Dynamic year
  copyrightDiv.append(cYearSpan);
  moveInstrumentation(copyrightTextRow, copyrightDiv);
  footerBottom.append(copyrightDiv);

  const privacyDiv = document.createElement('div');
  privacyDiv.classList.add('txt-terms');
  const privacyLink = document.createElement('a');
  const privacyHref = privacyPolicyLinkRow.querySelector('a');
  if (privacyHref) {
    privacyLink.href = privacyHref.href;
  } else {
    privacyLink.href = '#';
  }
  privacyLink.target = '_blank';
  privacyLink.textContent = privacyPolicyLinkLabelRow.textContent.trim();
  moveInstrumentation(privacyPolicyLinkRow, privacyLink);
  privacyDiv.append(privacyLink);
  footerBottom.append(privacyDiv);

  block.append(footerBottom);

  // Mobile Footer (visible-xs)
  const footerMobile = document.createElement('div');
  footerMobile.classList.add('footer-mobile', 'visible-xs');
  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container');

  const mobileSocialLinks = document.createElement('div');
  mobileSocialLinks.classList.add('link-social');
  const mobileSocialTitle = document.createElement('div');
  mobileSocialTitle.classList.add('title-social');
  mobileSocialTitle.textContent = 'Follow Us';
  mobileSocialLinks.append(mobileSocialTitle);
  const mobileSocialP = document.createElement('p');

  // Twitter Mobile
  const mobileTwitterA = document.createElement('a');
  if (twitterHref) mobileTwitterA.href = twitterHref.href;
  mobileTwitterA.target = '_blank'; // Added target="_blank"
  const mobileTwitterI = document.createElement('i');
  mobileTwitterI.classList.add('fa', 'fa-twitter');
  mobileTwitterI.textContent = ' ';
  mobileTwitterA.append(mobileTwitterI);
  mobileSocialP.append(mobileTwitterA);

  // Facebook Mobile
  const mobileFacebookA = document.createElement('a');
  if (facebookHref) mobileFacebookA.href = facebookHref.href;
  mobileFacebookA.target = '_blank'; // Added target="_blank"
  const mobileFacebookI = document.createElement('i');
  mobileFacebookI.classList.add('fa', 'fa-facebook');
  mobileFacebookI.textContent = ' ';
  mobileFacebookA.append(mobileFacebookI);
  mobileSocialP.append(mobileFacebookA);

  // LinkedIn Mobile
  const mobileLinkedinA = document.createElement('a');
  if (linkedinHref) mobileLinkedinA.href = linkedinHref.href;
  mobileLinkedinA.target = '_blank'; // Added target="_blank"
  const mobileLinkedinI = document.createElement('i');
  mobileLinkedinI.classList.add('fa', 'fa-linkedin');
  mobileLinkedinI.textContent = ' ';
  mobileLinkedinA.append(mobileLinkedinI);
  mobileSocialP.append(mobileLinkedinA);

  mobileSocialLinks.append(mobileSocialP);
  mobileContainer.append(mobileSocialLinks);

  const mobileLinkFooter = document.createElement('div');
  mobileLinkFooter.classList.add('link-footer', 'clearfix');

  // Mobile Section Links - split into two columns based on original HTML
  const mobileUl1 = document.createElement('ul');
  mobileUl1.classList.add('text-footer');
  const mobileUl2 = document.createElement('ul');
  mobileUl2.classList.add('text-footer');

  sectionRows.forEach((row, index) => {
    // Use content detection instead of index access for sectionRows
    const cells = [...row.children];
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p'));

    if (sectionLinksCell) {
      const sectionUl = sectionLinksCell.querySelector('ul');
      if (sectionUl) {
        [...sectionUl.children].forEach((li) => {
          if (index % 2 === 0) {
            mobileUl1.append(li.cloneNode(true)); // Clone to avoid moving from desktop structure
          } else {
            mobileUl2.append(li.cloneNode(true));
          }
        });
      } else {
        // Handle cases where sectionLinksCell might contain a <p> or just text
        [...sectionLinksCell.children].forEach((child) => {
          if (child.tagName === 'P' && child.querySelector('a')) {
            const li = document.createElement('li');
            li.append(child.querySelector('a').cloneNode(true));
            if (index % 2 === 0) {
              mobileUl1.append(li);
            } else {
              mobileUl2.append(li);
            }
          } else if (child.tagName === 'A') {
            const li = document.createElement('li');
            li.append(child.cloneNode(true));
            if (index % 2 === 0) {
              mobileUl1.append(li);
            } else {
              mobileUl2.append(li);
            }
          }
        });
      }
    }
  });

  mobileLinkFooter.append(mobileUl1);
  mobileLinkFooter.append(mobileUl2);
  mobileContainer.append(mobileLinkFooter);
  footerMobile.append(mobileContainer);

  const mobileFooterBottom = document.createElement('div');
  mobileFooterBottom.classList.add('footer-bottom');
  const mobileCopyright = document.createElement('div');
  mobileCopyright.classList.add('copyright');
  mobileCopyright.textContent = copyrightTextRow.textContent.trim();
  const mobileCYearSpan = document.createElement('span');
  mobileCYearSpan.id = 'cyear';
  mobileCYearSpan.textContent = new Date().getFullYear();
  mobileCopyright.append(mobileCYearSpan);
  mobileFooterBottom.append(mobileCopyright);

  const mobilePrivacy = document.createElement('div');
  mobilePrivacy.classList.add('link-term');
  const mobilePrivacyLink = document.createElement('a');
  if (privacyHref) mobilePrivacyLink.href = privacyHref.href;
  mobilePrivacyLink.target = '_blank'; // Added target="_blank"
  mobilePrivacyLink.textContent = privacyPolicyLinkLabelRow.textContent.trim();
  mobilePrivacy.append(mobilePrivacyLink);
  mobileFooterBottom.append(mobilePrivacy);

  footerMobile.append(mobileFooterBottom);
  block.append(footerMobile);

  // Optimize all images in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    // Only optimize if not already handled for specific dimensions
    if (!img.closest('.logo') && !img.closest('.follow-us')) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    }
  });
}
