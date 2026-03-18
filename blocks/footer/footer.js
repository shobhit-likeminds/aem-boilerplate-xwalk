import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerSection = document.createElement('footer');
  footerSection.classList.add('footer-section');

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');
  footerSection.append(footerContainer);

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');
  footerContainer.append(footerRow);

  const footerColLeft = document.createElement('div');
  footerColLeft.classList.add('footer-col-left');
  footerRow.append(footerColLeft);

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-logos');
  footerColLeft.append(footerLogos);

  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.classList.add('footer-itc-logo');
  footerLogos.append(itcLogoDiv);

  const itcLogoImageDiv = document.createElement('div');
  itcLogoImageDiv.classList.add('logo-image');
  itcLogoDiv.append(itcLogoImageDiv);

  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.classList.add('footer-fssai-logo');
  footerLogos.append(fssaiLogoDiv);

  const fssaiLogoImageDiv = document.createElement('div');
  fssaiLogoImageDiv.classList.add('fssai-logo-image');
  fssaiLogoDiv.append(fssaiLogoImageDiv);

  const footerColCenter = document.createElement('div');
  footerColCenter.classList.add('footer-col-center', 'footer-page-links-wrapper');
  footerRow.append(footerColCenter);

  const footerListOne = document.createElement('div');
  footerListOne.classList.add('footer-list-one');
  footerColCenter.append(footerListOne);

  const footerListTwo = document.createElement('div');
  footerListTwo.classList.add('footer-list-two');
  footerColCenter.append(footerListTwo);

  const footerColLeftLinks = document.createElement('div');
  footerColLeftLinks.classList.add('footer-col-left-links');
  footerRow.append(footerColLeftLinks);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container');
  footerColLeftLinks.append(footerListsContainer);

  const footerListFour = document.createElement('div');
  footerListFour.classList.add('footer-list-four');
  footerListsContainer.append(footerListFour);
  const ulFour = document.createElement('ul');
  footerListFour.append(ulFour);

  const footerListThree = document.createElement('div');
  footerListThree.classList.add('footer-list-three');
  footerListsContainer.append(footerListThree);
  const ulThree = document.createElement('ul');
  ulThree.classList.add('cmp-list');
  footerListThree.append(ulThree);

  const footerContactDetails = document.createElement('div');
  footerContactDetails.classList.add('footer-contact-details');
  footerColLeftLinks.append(footerContactDetails);

  const footerColRightLinks = document.createElement('div');
  footerColRightLinks.classList.add('footer-col-right-links');
  footerRow.append(footerColRightLinks);

  const socialIconsContainer = document.createElement('div');
  footerColRightLinks.append(socialIconsContainer);

  const socialIconsUlOne = document.createElement('ul');
  socialIconsUlOne.classList.add('footer-social-icons');
  socialIconsContainer.append(socialIconsUlOne);

  const socialIconsUlTwo = document.createElement('ul');
  socialIconsUlTwo.classList.add('footer-social-icons');
  socialIconsContainer.append(socialIconsUlTwo);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-link');
  footerColRightLinks.append(copyrightSpan);

  const footerSectionSecondary = document.createElement('footer');
  footerSectionSecondary.classList.add('footer-section-secondary');

  const footerSecondaryUl = document.createElement('ul');
  footerSecondaryUl.classList.add('footer-secondary-container');
  footerSectionSecondary.append(footerSecondaryUl);

  [...block.children].forEach((row, rowIndex) => {
    if (rowIndex === 0) { // Main Footer Content
      [...row.children].forEach((cell, cellIndex) => {
        if (cellIndex === 0) { // ITC Logo
          const picture = cell.querySelector('picture');
          if (picture) {
            const img = picture.querySelector('img');
            const link = document.createElement('a');
            link.href = 'https://www.kitchensofindia.com/';
            link.classList.add('cmp-image__link');
            moveInstrumentation(cell, link);
            link.append(picture);
            itcLogoImageDiv.append(link);
          }
        } else if (cellIndex === 1) { // FSSAI Logo
          const picture = cell.querySelector('picture');
          if (picture) {
            moveInstrumentation(cell, picture);
            fssaiLogoImageDiv.append(picture);
          }
        }
      });
    } else if (rowIndex === 1) { // Footer Links (List One & Two)
      [...row.children].forEach((cell, cellIndex) => {
        const ul = cell.querySelector('ul');
        if (ul) {
          if (cellIndex === 0) {
            moveInstrumentation(cell, ul);
            footerListOne.append(ul);
          } else if (cellIndex === 1) {
            moveInstrumentation(cell, ul);
            footerListTwo.append(ul);
          }
        }
      });
    } else if (rowIndex === 2) { // Additional Footer Links and Grievance Officer
      [...row.children].forEach((cell, cellIndex) => {
        if (cellIndex === 0) { // Footer Links (List Four)
          const ul = cell.querySelector('ul');
          if (ul) {
            moveInstrumentation(cell, ul);
            ulFour.replaceWith(ul);
          }
        } else if (cellIndex === 1) { // Footer Links (List Three)
          const ul = cell.querySelector('ul');
          if (ul) {
            moveInstrumentation(cell, ul);
            ulThree.replaceWith(ul);
          }
        } else if (cellIndex === 2) { // Grievance Officer Title
          const h5 = document.createElement('h5');
          h5.classList.add('footer-contact-details__title');
          moveInstrumentation(cell, h5);
          h5.textContent = cell.textContent;
          footerContactDetails.append(h5);
        } else if (cellIndex === 3) { // Grievance Officer Name
          const p = document.createElement('p');
          p.classList.add('footer-contact-details__description');
          moveInstrumentation(cell, p);
          p.textContent = cell.textContent;
          footerContactDetails.append(p);
        } else if (cellIndex === 4) { // Grievance Officer Contact Info
          const p = document.createElement('p');
          p.classList.add('footer-contact-details__description');
          moveInstrumentation(cell, p);
          p.textContent = cell.textContent;
          footerContactDetails.append(p);
        } else if (cellIndex === 5) { // Grievance Officer Timings
          const p = document.createElement('p');
          p.classList.add('footer-contact-details__description');
          moveInstrumentation(cell, p);
          p.textContent = cell.textContent;
          footerContactDetails.append(p);
        }
      });
    } else if (rowIndex === 3) { // Social Icons and Copyright
      [...row.children].forEach((cell, cellIndex) => {
        if (cellIndex === 0) { // Social Icon 1
          const li = document.createElement('li');
          const link = cell.querySelector('a');
          if (link) {
            link.id = 'socialIcons';
            moveInstrumentation(cell, li);
            li.append(link);
            socialIconsUlOne.append(li);
          }
        } else if (cellIndex === 1) { // Social Icon 2
          const li = document.createElement('li');
          const link = cell.querySelector('a');
          if (link) {
            link.id = 'socialIcons';
            moveInstrumentation(cell, li);
            li.append(link);
            socialIconsUlTwo.append(li);
          }
        } else if (cellIndex === 2) { // Copyright
          moveInstrumentation(cell, copyrightSpan);
          copyrightSpan.textContent = cell.textContent;
        }
      });
    } else if (rowIndex === 4) { // Secondary Footer Links
      [...row.children].forEach((cell) => {
        const li = document.createElement('li');
        li.classList.add('footer-secondary-lists');
        const link = cell.querySelector('a');
        if (link) {
          link.classList.add('footer-links');
          moveInstrumentation(cell, li);
          li.append(link);
          footerSecondaryUl.append(li);
        }
      });
    }
  });

  block.textContent = '';
  block.append(footerSection, footerSectionSecondary);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
