import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainFooter = document.createElement('footer');
  mainFooter.classList.add('footer-section');
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('container');
  const mainRow = document.createElement('div');
  mainRow.classList.add('footer-section-row');

  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add('footer-section-secondary');
  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('footer-secondary-container');

  const [logoSection, linksSection, socialSection, secondaryLinksSection, copyrightSection, grievanceNameSection, grievanceContactSection, grievanceTimingsSection] = block.children;

  // Process Logos
  const footerColLeft = document.createElement('div');
  footerColLeft.classList.add('footer-section-col-left');
  const footerLogosDiv = document.createElement('div');
  footerLogosDiv.classList.add('footer-logos');
  moveInstrumentation(logoSection, footerColLeft);

  [...logoSection.children].forEach((row) => {
    const logoDiv = document.createElement('div');
    const img = row.querySelector('img');
    const link = row.querySelector('a');

    if (img) {
      if (img.alt.includes('ITC')) {
        logoDiv.classList.add('footer-itc-logo');
      } else if (img.alt.includes('Fssai')) {
        logoDiv.classList.add('footer-fssai-logo');
      }
      const logoImageDiv = document.createElement('div');
      logoImageDiv.classList.add('logo-image');
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));

      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.append(optimizedPic);
        logoImageDiv.append(newLink);
      } else {
        logoImageDiv.append(optimizedPic);
      }
      logoDiv.append(logoImageDiv);
      footerLogosDiv.append(logoDiv);
    }
  });
  footerColLeft.append(footerLogosDiv);
  mainRow.append(footerColLeft);

  // Process Links
  const footerColCenter = document.createElement('div');
  footerColCenter.classList.add('footer-section-col-center', 'footer-page-links-wrapper');
  moveInstrumentation(linksSection, footerColCenter);

  const list1Div = document.createElement('div');
  list1Div.classList.add('list-1-list');
  const list2Div = document.createElement('div');
  list2Div.classList.add('list-2-list');
  const list3Div = document.createElement('div');
  list3Div.classList.add('list-3-list');
  const list4Div = document.createElement('div');
  list4Div.classList.add('list-4-list');

  const ul1 = document.createElement('ul');
  const ul2 = document.createElement('ul');
  const ul3 = document.createElement('ul');
  const ul4 = document.createElement('ul');

  [...linksSection.children].forEach((row, index) => {
    const link = row.querySelector('a');
    if (link) {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      newLink.target = '_blank';
      const span = document.createElement('span');
      span.classList.add('cmp-link__screen-reader-only');
      span.textContent = 'opens in a new tab';
      newLink.append(span);
      li.append(newLink);

      if (index < 3) {
        ul4.append(li);
      } else if (index < 5) {
        ul3.append(li);
      } else if (index < 8) {
        ul1.append(li);
      } else {
        ul2.append(li);
      }
    }
  });

  list1Div.append(ul1);
  list2Div.append(ul2);
  list3Div.append(ul3);
  list4Div.append(ul4);

  footerColCenter.append(list1Div, list2Div);

  const footerColRight = document.createElement('div');
  footerColRight.classList.add('footer-section-col-right', 'itc-footer-link-left');
  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container');
  footerListsContainer.append(list4Div, list3Div);
  footerColRight.append(footerListsContainer);

  // Grievance Details
  const contactDetailsDiv = document.createElement('div');
  contactDetailsDiv.classList.add('contact-details');
  const grievanceTitle = document.createElement('h5');
  grievanceTitle.classList.add('contact-details__title');
  grievanceTitle.textContent = 'Grievance Officer:';
  contactDetailsDiv.append(grievanceTitle);

  const grievanceName = document.createElement('p');
  grievanceName.classList.add('contact-details__description');
  grievanceName.textContent = `Name: ${grievanceNameSection.textContent.trim()}`;
  moveInstrumentation(grievanceNameSection, grievanceName);
  contactDetailsDiv.append(grievanceName);

  const grievanceContact = document.createElement('p');
  grievanceContact.classList.add('contact-details__description');
  grievanceContact.textContent = `Contact Info: ${grievanceContactSection.textContent.trim()}`;
  moveInstrumentation(grievanceContactSection, grievanceContact);
  contactDetailsDiv.append(grievanceContact);

  const grievanceTimings = document.createElement('p');
  grievanceTimings.classList.add('contact-details__description');
  grievanceTimings.textContent = `(${grievanceTimingsSection.textContent.trim()})`;
  moveInstrumentation(grievanceTimingsSection, grievanceTimings);
  contactDetailsDiv.append(grievanceTimings);

  footerColRight.append(contactDetailsDiv);
  mainRow.append(footerColCenter, footerColRight);

  // Process Social Links
  const footerColEnd = document.createElement('div');
  footerColEnd.classList.add('footer-section-col-end', 'footer-link-right');
  moveInstrumentation(socialSection, footerColEnd);

  const socialLinksDiv = document.createElement('div');
  [...socialSection.children].forEach((row) => {
    const link = row.querySelector('a');
    const img = row.querySelector('img');
    if (link && img) {
      const socialUl = document.createElement('ul');
      socialUl.classList.add('list-unstyled');
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      const newLink = document.createElement('a');
      newLink.id = 'socialIcons';
      newLink.href = link.href;
      newLink.target = '_blank';
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      newLink.append(optimizedPic);
      const span = document.createElement('span');
      span.classList.add('cmp-link__screen-reader-only');
      span.textContent = 'opens in a new tab';
      newLink.append(span);
      li.append(newLink);
      socialUl.append(li);
      socialLinksDiv.append(socialUl);
    }
  });
  footerColEnd.append(socialLinksDiv);

  // Copyright
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-link');
  copyrightSpan.textContent = copyrightSection.textContent.trim();
  moveInstrumentation(copyrightSection, copyrightSpan);
  footerColEnd.append(copyrightSpan);
  mainRow.append(footerColEnd);

  mainContainer.append(mainRow);
  mainFooter.append(mainContainer);

  // Process Secondary Links
  moveInstrumentation(secondaryLinksSection, secondaryFooter);
  [...secondaryLinksSection.children].forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      const li = document.createElement('li');
      li.classList.add('footer-secondary-lists');
      moveInstrumentation(row, li);
      const newLink = document.createElement('a');
      newLink.classList.add('footer-links');
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.textContent = link.textContent;
      const span = document.createElement('span');
      span.classList.add('cmp-link__screen-reader-only');
      span.textContent = 'opens in a new tab';
      newLink.append(span);
      li.append(newLink);
      secondaryUl.append(li);
    }
  });
  secondaryFooter.append(secondaryUl);

  block.textContent = '';
  block.append(mainFooter, secondaryFooter);
}
