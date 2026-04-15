import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, ...sectionRows] = [...block.children];

  block.textContent = '';

  const footerWrapper = document.createElement('section');
  footerWrapper.classList.add('footer-wrp');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  // Mobile Logo Wrapper
  const mobLogoWr = document.createElement('div');
  mobLogoWr.classList.add('mob-logo-wr');
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    mobLogoWr.append(optimizedPic);
  }
  moveInstrumentation(logoRow, mobLogoWr);
  container.append(mobLogoWr);

  // Main footer sections
  const row1 = document.createElement('div');
  row1.classList.add('row', 'f1');

  sectionRows.forEach((row) => {
    // Use content detection instead of direct index access for robustness
    const cells = [...row.children];
    const titleCell = cells.find(cell => !cell.querySelector('ul') && !cell.querySelector('a')); // Assuming title is plain text
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p') || cell.querySelector('a')); // Section links can be ul, p, or direct link

    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3');
    moveInstrumentation(row, col);

    const sectionLinksUl = sectionLinksCell?.querySelector('ul');
    const titleText = titleCell?.textContent.trim() || '';

    if (sectionLinksUl) {
      // This is an accordion/dropdown section
      const accordionHead = document.createElement('a');
      accordionHead.href = 'javascript:void(0)';
      accordionHead.classList.add('ttle', 'accordion_head2');
      accordionHead.textContent = titleText;

      const plusMinusSpan = document.createElement('span');
      plusMinusSpan.classList.add('plusminus2');
      plusMinusSpan.textContent = '+';
      accordionHead.append(plusMinusSpan);

      const ftrSubLinksCvr = document.createElement('div');
      ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');
      ftrSubLinksCvr.append(sectionLinksUl);

      // Add event listener for accordion behavior
      accordionHead.addEventListener('click', (e) => {
        e.preventDefault();
        accordionHead.classList.toggle('active');
        ftrSubLinksCvr.classList.toggle('active');
        plusMinusSpan.textContent = ftrSubLinksCvr.classList.contains('active') ? '-' : '+';
      });

      col.append(accordionHead, ftrSubLinksCvr);
    } else {
      // This is a simple link section (no dropdown) or a flat title
      const linkInTitleCell = titleCell?.querySelector('a');
      const linkInSectionLinksCell = sectionLinksCell?.querySelector('a');
      const ttle = document.createElement('a');
      ttle.classList.add('ttle');

      if (linkInTitleCell) {
        ttle.href = linkInTitleCell.href;
        ttle.textContent = linkInTitleCell.textContent.trim();
      } else if (linkInSectionLinksCell) {
        // If sectionLinksCell contains a single link directly, use that.
        ttle.href = linkInSectionLinksCell.href;
        ttle.textContent = titleText || linkInSectionLinksCell.textContent.trim();
      } else {
        // If title cell is just text, and no link in sectionLinks, it's a flat title.
        // The original HTML suggests these are also links, so we'll make it a dummy link.
        ttle.href = '#'; // Fallback if no link is found
        ttle.textContent = titleText;
      }
      col.append(ttle);
    }
    row1.append(col);
  });
  container.append(row1);

  // Hardcoded Social Media and Copyright sections from original HTML
  // These are not dynamic in the EDS model, so they are reproduced directly.
  const row2 = document.createElement('div');
  row2.classList.add('row', 'f2', 'justify-content-between');

  const socialCol = document.createElement('div');
  socialCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');
  const socialTitle = document.createElement('p');
  socialTitle.classList.add('ttle', 'accordion_head2');
  socialTitle.textContent = 'Social Media ';
  const socialPlusMinus = document.createElement('span');
  socialPlusMinus.classList.add('plusminus2');
  socialPlusMinus.textContent = '+';
  socialTitle.append(socialPlusMinus);

  const socialLinksCvr = document.createElement('div');
  socialLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');

  const socialLinks = [
    { href: 'https://www.facebook.com/TataMotorsGroup/', iconClass: 'fab fa-facebook-square' },
    { href: 'https://www.instagram.com/tatamotorsgroup/', iconClass: 'fab fa-instagram' },
    { href: 'https://twitter.com/TataMotors', iconClass: 'fa-brands fa-square-x-twitter' },
    { href: 'https://www.linkedin.com/company/tata-motors/', iconClass: 'fab fa-linkedin' },
    { href: 'https://www.youtube.com/user/TataMotorsGroup', iconClass: 'fab fa-youtube-square' },
  ];

  socialLinks.forEach(item => {
    const a = document.createElement('a');
    a.href = item.href;
    a.classList.add('ftr-link');
    a.target = '_blank';
    const i = document.createElement('i');
    i.classList.add(...item.iconClass.split(' '));
    a.append(i);
    socialLinksCvr.append(a);
  });

  socialTitle.addEventListener('click', (e) => {
    e.preventDefault();
    socialTitle.classList.toggle('active');
    socialLinksCvr.classList.toggle('active');
    socialPlusMinus.textContent = socialLinksCvr.classList.contains('active') ? '-' : '+';
  });

  socialCol.append(socialTitle, socialLinksCvr);
  row2.append(socialCol);
  container.append(row2);


  const row3 = document.createElement('div');
  row3.classList.add('row', 'mt25', 'f3');

  const legalCol = document.createElement('div');
  legalCol.classList.add('col-12', 'col-md-6');
  const legalDisclaimer = document.createElement('a');
  legalDisclaimer.href = 'https://www.tatamotors.com/legal-disclaimer';
  legalDisclaimer.textContent = 'Legal Disclaimer';
  const openSource = document.createElement('a');
  openSource.href = 'https://www.tatamotors.com/open-source-license-disclosure';
  openSource.textContent = 'Open Source License Disclosure';
  legalCol.append(legalDisclaimer, openSource);

  const copyrightCol = document.createElement('div');
  copyrightCol.classList.add('col-12', 'col-md-6');
  const copyrightText = document.createElement('p');
  copyrightText.classList.add('copy-txt', 'text-md-end');
  copyrightText.textContent = ' © Copyright 2026. All rights reserved. Tata Motors Limited.';
  copyrightCol.append(copyrightText);

  row3.append(legalCol, copyrightCol);
  container.append(row3);

  footerWrapper.append(container);
  block.append(footerWrapper);
}
