import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logosContainer,
    linksContainer,
    socialsContainer,
    copyrightRow,
    grievanceNameRow,
    grievanceContactRow,
    grievanceHoursRow,
    ...itemRows
  ] = [...block.children];

  // Filter item rows based on BlockJson structure
  // footer-logo: 3 children (image, link, alt text)
  const footerLogos = itemRows.filter(
    (row) => row.children.length === 3 && row.children[0].querySelector('picture') && row.children[1].querySelector('a')
  );
  // footer-link: 2 children (url, label)
  const footerLinks = itemRows.filter(
    (row) => row.children.length === 2 && row.children[0].querySelector('a') && !row.children[1].querySelector('picture')
  );
  // footer-social: 2 children (url, icon)
  const footerSocials = itemRows.filter(
    (row) => row.children.length === 2 && row.children[0].querySelector('a') && row.children[1].querySelector('picture')
  );

  const footerSection = document.createElement('footer');
  footerSection.classList.add('footer-itc-footer-section');

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');

  // Left column for logos
  const logoCol = document.createElement('div');
  logoCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-d-flex', 'footer-d-lg-block', 'footer-justify-content-center');

  const footerLogosWrapper = document.createElement('div');
  footerLogosWrapper.classList.add('footer-footer-logos');

  footerLogos.forEach((row) => {
    const logoDiv = document.createElement('div');
    logoDiv.classList.add('footer-footer-itc-logo'); // Reused for FSSAI too in original HTML

    const logoImageDiv = document.createElement('div');
    logoImageDiv.classList.add('footer-logo', 'footer-image');

    const linkEl = document.createElement('a');
    const originalLink = row.children[1].querySelector('a'); // Link is in the second cell
    if (originalLink) {
      linkEl.href = originalLink.href;
      linkEl.target = '_self'; // Default target from original HTML
    }

    const picture = row.children[0].querySelector('picture'); // Image is in the first cell
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '93' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        linkEl.append(optimizedPic);
      }
    }
    moveInstrumentation(row.children[0], linkEl); // Instrumentation for image cell
    moveInstrumentation(row.children[1], linkEl); // Instrumentation for link cell

    logoImageDiv.append(linkEl);
    logoDiv.append(logoImageDiv);
    footerLogosWrapper.append(logoDiv);
  });
  moveInstrumentation(logosContainer, footerLogosWrapper);
  logoCol.append(footerLogosWrapper);
  footerRow.append(logoCol);

  // Middle column for links
  const linksCol = document.createElement('div');
  linksCol.classList.add('footer-col-lg-3', 'footer-col-sm-12', 'footer-d-flex', 'footer-justify-content-xl-between', 'footer-footer-page-links-wrapper', 'footer-pt-md-0', 'footer-pt-4', 'footer-px-1');

  const linkList1 = document.createElement('div');
  linkList1.classList.add('footer-list-1', 'footer-list');
  const ul1 = document.createElement('ul');
  linkList1.append(ul1);

  const linkList2 = document.createElement('div');
  linkList2.classList.add('footer-list-2', 'footer-list');
  const ul2 = document.createElement('ul');
  linkList2.append(ul2);

  // Distribute links into two lists
  footerLinks.forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const link = row.children[0].querySelector('a'); // URL is in the first cell
    const label = row.children[1].textContent.trim(); // Label is in the second cell
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.append(label); // Use the label text
      li.append(newLink);
    }
    if (index % 2 === 0) {
      ul1.append(li);
    } else {
      ul2.append(li);
    }
  });

  linksCol.append(linkList1, linkList2);
  moveInstrumentation(linksContainer, linksCol);
  footerRow.append(linksCol);

  // Right column for copyright and grievance
  const rightCol = document.createElement('div');
  rightCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-itc-footer-link-left');

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-footer-lists-container', 'footer-d-flex');

  // List 3 (Privacy Policy, T&C, Talk To Us) - Hardcoded based on original HTML structure
  const list3 = document.createElement('div');
  list3.classList.add('footer-list-4', 'footer-list');
  const ul3 = document.createElement('ul');
  list3.append(ul3);

  const privacyPolicyLink = document.createElement('li');
  privacyPolicyLink.id = 'footerLinks-1';
  const privacyLinkA = document.createElement('a');
  privacyLinkA.target = '_blank';
  privacyLinkA.href = 'https://www.kitchensofindia.com/home/privacy-policy.html';
  privacyLinkA.textContent = 'Privacy Policy';
  privacyPolicyLink.append(privacyLinkA);
  ul3.append(privacyPolicyLink);

  const termsAndConditionsLink = document.createElement('li');
  termsAndConditionsLink.id = 'footerLinks-2';
  const termsLinkA = document.createElement('a');
  termsLinkA.target = '_blank';
  termsLinkA.href = 'https://www.kitchensofindia.com/home/terms-and-conditions.html';
  termsLinkA.textContent = 'Terms and Conditions';
  termsAndConditionsLink.append(termsLinkA);
  ul3.append(termsAndConditionsLink);

  const talkToUsLink = document.createElement('li');
  talkToUsLink.id = 'footerLinks-3';
  const talkLinkA = document.createElement('a');
  talkLinkA.target = '_blank';
  talkLinkA.href = 'https://www.kitchensofindia.com/home/contact-us.html';
  talkLinkA.textContent = 'Talk To Us';
  talkToUsLink.append(talkLinkA);
  ul3.append(talkToUsLink);

  // List 4 (Our Heritage, Shop) - Hardcoded based on original HTML structure
  const list4 = document.createElement('div');
  list4.classList.add('footer-list-3', 'footer-list');
  const ul4 = document.createElement('ul');
  list4.append(ul4);

  const ourHeritageLink = document.createElement('li');
  ourHeritageLink.classList.add('footer-cmp-list__item');
  const heritageLinkA = document.createElement('a');
  heritageLinkA.classList.add('footer-cmp-list__item-link');
  heritageLinkA.href = 'https://www.kitchensofindia.com/home/our-heritage.html';
  const heritageSpan = document.createElement('span');
  heritageSpan.classList.add('footer-cmp-list__item-title');
  heritageSpan.textContent = 'Our Heritage';
  heritageLinkA.append(heritageSpan);
  ourHeritageLink.append(heritageLinkA);
  ul4.append(ourHeritageLink);

  const shopLink = document.createElement('li');
  shopLink.classList.add('footer-cmp-list__item');
  const shopLinkA = document.createElement('a');
  shopLinkA.classList.add('footer-cmp-list__item-link');
  shopLinkA.href = 'https://www.kitchensofindia.com/home/shop.html';
  const shopSpan = document.createElement('span');
  shopSpan.classList.add('footer-cmp-list__item-title');
  shopSpan.textContent = 'Shop';
  shopLinkA.append(shopSpan);
  shopLink.append(shopLinkA);
  ul4.append(shopLink);

  footerListsContainer.append(list3, list4);
  rightCol.append(footerListsContainer);

  // Grievance contact details
  const contactDetails = document.createElement('div');
  contactDetails.classList.add('footer-contact-details');

  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('footer-contact-details__title', 'footer-mb-md-3', 'footer-mb-0');
  grievanceTitle.textContent = 'Grievance Officer:';
  contactDetails.append(grievanceTitle);

  const grievanceNameP = document.createElement('p');
  grievanceNameP.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceNameRow, grievanceNameP);
  grievanceNameP.textContent = `Name: ${grievanceNameRow.textContent.trim()}`;
  contactDetails.append(grievanceNameP);

  const grievanceContactP = document.createElement('p');
  grievanceContactP.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
  moveInstrumentation(grievanceContactRow, grievanceContactP);
  grievanceContactP.textContent = `Contact Info: ${grievanceContactRow.textContent.trim()}`;
  contactDetails.append(grievanceContactP);

  const grievanceHoursP = document.createElement('p');
  grievanceHoursP.classList.add('footer-contact-details__description', 'footer-mb-0');
  moveInstrumentation(grievanceHoursRow, grievanceHoursP);
  grievanceHoursP.textContent = `(${grievanceHoursRow.textContent.trim()})`;
  contactDetails.append(grievanceHoursP);

  rightCol.append(contactDetails);
  footerRow.append(rightCol);

  // Social links and copyright (rightmost)
  const socialCopyrightCol = document.createElement('div');
  socialCopyrightCol.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-align-items-md-end', 'footer-d-flex', 'footer-flex-column', 'footer-itc-footer-link-right');

  const socialLinksDiv = document.createElement('div');

  const socialUl = document.createElement('ul');
  socialUl.classList.add('footer-list-unstyled');

  footerSocials.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const link = row.children[0].querySelector('a'); // URL is in the first cell
    const picture = row.children[1].querySelector('picture'); // Icon is in the second cell
    if (link && picture) {
      const newLink = document.createElement('a');
      newLink.id = 'socialIcons';
      newLink.href = link.href;
      newLink.target = '_blank';

      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: 'auto' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
      }
      li.append(newLink);
    }
    socialUl.append(li);
  });
  moveInstrumentation(socialsContainer, socialUl);
  socialLinksDiv.append(socialUl);
  socialCopyrightCol.append(socialLinksDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-footer-link');
  moveInstrumentation(copyrightRow, copyrightSpan);
  copyrightSpan.textContent = copyrightRow.textContent.trim();
  socialCopyrightCol.append(copyrightSpan);

  footerRow.append(socialCopyrightCol);

  footerContainer.append(footerRow);
  footerSection.append(footerContainer);

  // Secondary footer (hardcoded based on original HTML structure)
  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add('footer-itc-footer-section', 'footer-itc-footer-secondary');
  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('footer-itc-footer-secondary-container');

  const secondaryLi1 = document.createElement('li');
  secondaryLi1.classList.add('footer-itc-footer-secondary-lists');
  const secondaryLink1 = document.createElement('a');
  secondaryLink1.classList.add('footer-footer-links');
  secondaryLink1.target = '_blank';
  secondaryLink1.innerHTML = '<span class="footer-cmp-link__screen-reader-only">opens in a new tab</span>';
  secondaryUl.append(secondaryLi1);

  const secondaryLi2 = document.createElement('li');
  secondaryLi2.classList.add('footer-itc-footer-secondary-lists');
  const secondaryLink2 = document.createElement('a');
  secondaryLink2.classList.add('footer-footer-links');
  secondaryLink2.target = '_blank';
  secondaryLink2.innerHTML = '<span class="footer-cmp-link__screen-reader-only">opens in a new tab</span>';
  secondaryUl.append(secondaryLi2);

  secondaryFooter.append(secondaryUl);

  block.textContent = '';
  block.append(footerSection, secondaryFooter);

  // Image optimization
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
