import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Main footer section wrapper
  const mainFooter = document.createElement('footer');
  mainFooter.classList.add('footer-section');
  moveInstrumentation(block.children[0], mainFooter); // Instrument the first row to the main footer

  const container = document.createElement('div');
  container.classList.add('container');
  mainFooter.append(container);

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-section-row');
  container.append(footerRow);

  // Secondary footer section wrapper
  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add('footer-section-secondary');

  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('footer-secondary-container');
  secondaryFooter.append(secondaryUl);

  // Initialize containers for dynamic content
  const colLeft = document.createElement('div');
  colLeft.classList.add('footer-section-col-left');
  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-logos');
  colLeft.append(footerLogos);

  const colCenter = document.createElement('div');
  colCenter.classList.add('footer-section-col-center', 'footer-page-links-wrapper');
  const list1 = document.createElement('div');
  list1.classList.add('list-1-list');
  const list2 = document.createElement('div');
  list2.classList.add('list-2-list');
  colCenter.append(list1, list2);

  const colRightLinks = document.createElement('div');
  colRightLinks.classList.add('footer-section-col-right-links');
  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container');
  const list3 = document.createElement('div');
  list3.classList.add('list-3-list');
  const list4 = document.createElement('div');
  list4.classList.add('list-4-list');
  const ul4 = document.createElement('ul');
  list4.append(ul4);
  const ul3 = document.createElement('ul');
  ul3.classList.add('cmp-list');
  list3.append(ul3);
  footerListsContainer.append(list4, list3);

  const contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');
  colRightLinks.append(footerListsContainer, contactDetails);

  const colRightSocial = document.createElement('div');
  colRightSocial.classList.add('footer-section-col-right-social');
  const socialIconsWrapper = document.createElement('div');
  colRightSocial.append(socialIconsWrapper);

  let itcLogoAdded = false;
  let fssaiLogoAdded = false;
  let grievanceTitleAdded = false;
  let copyrightTextAdded = false;

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 0) return;

    // ITC Logo
    const itcLogoCell = cells[0];
    const itcPicture = itcLogoCell?.querySelector('picture');
    if (itcPicture && !itcLogoAdded) {
      const footerItcLogo = document.createElement('div');
      footerItcLogo.classList.add('footer-itc-logo');
      const logoImageDiv = document.createElement('div');
      logoImageDiv.classList.add('logo-image');
      const img = itcPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '93' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        const link = itcLogoCell.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.classList.add('cmp-image__link');
          newLink.href = link.href;
          newLink.append(optimizedPic);
          logoImageDiv.append(newLink);
        } else {
          logoImageDiv.append(optimizedPic);
        }
      }
      footerItcLogo.append(logoImageDiv);
      footerLogos.append(footerItcLogo);
      itcLogoAdded = true;
    }

    // FSSAI Logo
    const fssaiLogoCell = cells[1];
    const fssaiPicture = fssaiLogoCell?.querySelector('picture');
    if (fssaiPicture && !fssaiLogoAdded) {
      const footerFssaiLogo = document.createElement('div');
      footerFssaiLogo.classList.add('footer-fssai-logo');
      const fssaiLogoImageDiv = document.createElement('div');
      fssaiLogoImageDiv.classList.add('fssai-logo-image');
      const img = fssaiPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '192' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        fssaiLogoImageDiv.append(optimizedPic);
      }
      footerFssaiLogo.append(fssaiLogoImageDiv);
      footerLogos.append(footerFssaiLogo);
      fssaiLogoAdded = true;
    }

    // Footer Links (processed into list3 and list4)
    const link = cells[0]?.querySelector('a');
    if (link && link.closest('li')) {
      const li = document.createElement('li');
      moveInstrumentation(link.closest('li'), li);
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent.replace(/opens in a new tab$/, '').trim(); // Remove screen reader text
      if (link.target) newLink.target = link.target;
      if (link.dataset.cmpClickable) newLink.setAttribute('data-cmp-clickable', '');
      li.append(newLink);

      // Distribute links to ul3 (list-3-list) and ul4 (list-4-list) based on content or inferred order
      // For simplicity, let's assume the first few go to list4, then others to list3
      // In a real scenario, this might need more specific logic or class names.
      // Based on HTML, list-4-list has Privacy, Terms, Talk To Us. list-3-list has Our Heritage, Shop.
      const linkText = newLink.textContent.toLowerCase();
      if (linkText.includes('privacy policy') || linkText.includes('terms and conditions') || linkText.includes('talk to us')) {
        ul4.append(li);
      } else if (linkText.includes('our heritage') || linkText.includes('shop')) {
        li.classList.add('cmp-list__item');
        newLink.classList.add('cmp-list__item-link');
        const span = document.createElement('span');
        span.classList.add('cmp-list__item-title');
        span.textContent = newLink.textContent;
        newLink.textContent = '';
        newLink.append(span);
        ul3.append(li);
      }
    }

    // Footer Social Icons
    const socialLink = cells[0]?.querySelector('a#socialIcons');
    if (socialLink) {
      const socialUl = document.createElement('ul');
      socialUl.classList.add('list-unstyled');
      const socialLi = document.createElement('li');
      moveInstrumentation(socialLink.closest('li'), socialLi);
      const newSocialLink = document.createElement('a');
      newSocialLink.href = socialLink.href;
      if (socialLink.target) newSocialLink.target = socialLink.target;
      if (socialLink.dataset.cmpClickable) newSocialLink.setAttribute('data-cmp-clickable', '');
      const socialImg = socialLink.querySelector('img');
      if (socialImg) {
        const optimizedPic = createOptimizedPicture(socialImg.src, socialImg.alt, false, [{ width: '24' }]); // Assuming a small icon size
        moveInstrumentation(socialImg, optimizedPic.querySelector('img'));
        newSocialLink.append(optimizedPic);
      }
      const srOnlySpan = socialLink.querySelector('span.cmp-link__screen-reader-only');
      if (srOnlySpan) {
        newSocialLink.append(srOnlySpan.cloneNode(true));
      }
      socialLi.append(newSocialLink);
      socialUl.append(socialLi);
      socialIconsWrapper.append(socialUl);
    }

    // Grievance Officer Details
    const h5 = cells[0]?.querySelector('h5.contact-details-title');
    if (h5 && !grievanceTitleAdded) {
      const newH5 = document.createElement('h5');
      newH5.classList.add('contact-details-title');
      newH5.textContent = h5.textContent.trim();
      contactDetails.append(newH5);

      const grievanceOfficerName = cells[1]?.textContent.trim();
      if (grievanceOfficerName) {
        const pName = document.createElement('p');
        pName.classList.add('contact-details-description');
        pName.textContent = grievanceOfficerName;
        contactDetails.append(pName);
      }

      const grievanceOfficerContact = cells[2]?.textContent.trim();
      if (grievanceOfficerContact) {
        const pContact = document.createElement('p');
        pContact.classList.add('contact-details-description');
        pContact.textContent = grievanceOfficerContact;
        contactDetails.append(pContact);
      }

      const grievanceOfficerWorkingDays = cells[3]?.textContent.trim();
      if (grievanceOfficerWorkingDays) {
        const pWorkingDays = document.createElement('p');
        pWorkingDays.classList.add('contact-details-description-working-days');
        pWorkingDays.textContent = grievanceOfficerWorkingDays;
        contactDetails.append(pWorkingDays);
      }
      grievanceTitleAdded = true;
    }

    // Copyright Text
    const copyrightSpan = cells[0]?.querySelector('span.footer-link');
    if (copyrightSpan && !copyrightTextAdded) {
      const newSpan = document.createElement('span');
      newSpan.classList.add('footer-link');
      newSpan.textContent = copyrightSpan.textContent.trim();
      colRightSocial.append(newSpan);
      copyrightTextAdded = true;
    }

    // Footer Secondary Links
    const secondaryLink = cells[0]?.querySelector('a.footer-links');
    if (secondaryLink) {
      const li = document.createElement('li');
      li.classList.add('footer-secondary-lists');
      moveInstrumentation(secondaryLink.closest('li'), li);
      const newLink = document.createElement('a');
      newLink.classList.add('footer-links');
      newLink.href = secondaryLink.href;
      if (secondaryLink.target) newLink.target = secondaryLink.target;
      const srOnlySpan = secondaryLink.querySelector('span.cmp-link__screen-reader-only');
      if (srOnlySpan) {
        newLink.append(srOnlySpan.cloneNode(true));
      }
      li.append(newLink);
      secondaryUl.append(li);
    }
  });

  // Append the main columns to the footer row
  footerRow.append(colLeft, colCenter, colRightLinks, colRightSocial);

  block.textContent = '';
  block.append(mainFooter, secondaryFooter);
}
