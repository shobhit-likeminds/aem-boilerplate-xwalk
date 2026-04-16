import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, ...sectionRows] = [...block.children];

  const footerWrp = document.createElement('section');
  footerWrp.classList.add('footer-wrp');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  // Mobile Logo Wrapper
  const mobLogoWr = document.createElement('div');
  mobLogoWr.classList.add('mob-logo-wr');
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('img-fluid');
      mobLogoWr.append(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, mobLogoWr);
  container.append(mobLogoWr);

  // Main Footer Sections (f1)
  const f1Row = document.createElement('div');
  f1Row.classList.add('row', 'f1');

  sectionRows.forEach((row) => {
    // CRITICAL FIX: Replaced index access with content detection
    const cells = [...row.children];
    const headingCell = cells.find(cell => !cell.querySelector('ul') && !cell.querySelector('p') && !cell.querySelector('a'));
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p') || cell.querySelector('a'));

    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3');
    moveInstrumentation(row, col);

    const headingText = headingCell ? headingCell.textContent.trim() : '';
    const sectionLinksUl = sectionLinksCell ? sectionLinksCell.querySelector('ul') : null;
    const sectionLinksP = sectionLinksCell ? sectionLinksCell.querySelector('p') : null;
    const sectionLinksA = sectionLinksCell ? sectionLinksCell.querySelector('a') : null; // Check for direct link

    if (sectionLinksUl) {
      // Accordion / Dropdown
      const ttle = document.createElement('a');
      ttle.href = 'javascript:void(0)';
      ttle.classList.add('ttle', 'accordion_head2');
      ttle.textContent = headingText;
      const plusminus = document.createElement('span');
      plusminus.classList.add('plusminus2');
      plusminus.textContent = '+';
      ttle.append(plusminus);

      const ftrSubLinksCvr = document.createElement('div');
      ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');
      ftrSubLinksCvr.append(sectionLinksUl); // Move the authored UL here

      ttle.addEventListener('click', () => {
        ftrSubLinksCvr.classList.toggle('active');
        ttle.classList.toggle('active'); // Add active class to heading as well
        plusminus.textContent = ttle.classList.contains('active') ? '-' : '+';
      });

      col.append(ttle, ftrSubLinksCvr);
    } else if (sectionLinksA) {
      // Simple link if a single <a> is found in the richtext cell
      const ttle = document.createElement('a');
      ttle.href = sectionLinksA.href;
      ttle.classList.add('ttle');
      ttle.textContent = headingText;
      col.append(ttle);
    } else if (sectionLinksP) {
      // If it's just a paragraph, render heading as a paragraph
      const ttle = document.createElement('p');
      ttle.classList.add('ttle');
      ttle.textContent = headingText;
      col.append(ttle);
    } else {
      // Fallback: render heading as a simple text if no links or lists
      const ttle = document.createElement('p');
      ttle.classList.add('ttle');
      ttle.textContent = headingText;
      col.append(ttle);
    }

    f1Row.append(col);
  });
  container.append(f1Row);

  // Social Media (f2) - Assuming this is a fixed structure or a specific item type
  // This part is derived from the ORIGINAL HTML structure, not directly from block.children,
  // as the block model does not explicitly define a separate social media section.
  // If social media links were part of a 'footer-section' item, they would be handled above.
  // For now, we'll create a placeholder based on the original HTML.
  const f2Row = document.createElement('div');
  f2Row.classList.add('row', 'f2', 'justify-content-between');

  const socialCol = document.createElement('div');
  socialCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');
  const socialTitle = document.createElement('p');
  socialTitle.classList.add('ttle', 'accordion_head2');
  socialTitle.textContent = 'Social Media ';
  const socialPlusminus = document.createElement('span');
  socialPlusminus.classList.add('plusminus2');
  socialPlusminus.textContent = '+';
  socialTitle.append(socialPlusminus);

  const socialLinksCvr = document.createElement('div');
  socialLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');

  // Hardcoding social links based on ORIGINAL HTML as the block model doesn't provide them.
  // In a real scenario, these would come from the block model if they were editable.
  const socialLinks = [
    { href: 'https://www.facebook.com/TataMotorsGroup/', iconClasses: ['fab', 'fa-facebook-square'] },
    { href: 'https://www.instagram.com/tatamotorsgroup/', iconClasses: ['fab', 'fa-instagram'] },
    { href: 'https://twitter.com/TataMotors', iconClasses: ['fa-brands', 'fa-square-x-twitter'] },
    { href: 'https://www.linkedin.com/company/tata-motors/', iconClasses: ['fab', 'fa-linkedin'] },
    { href: 'https://www.youtube.com/user/TataMotorsGroup', iconClasses: ['fab', 'fa-youtube-square'] },
  ];

  socialLinks.forEach(linkData => {
    const a = document.createElement('a');
    a.href = linkData.href;
    a.classList.add('ftr-link');
    a.target = '_blank';
    const i = document.createElement('i');
    i.classList.add(...linkData.iconClasses);
    a.append(i);
    socialLinksCvr.append(a);
  });

  socialTitle.addEventListener('click', () => {
    socialLinksCvr.classList.toggle('active');
    socialTitle.classList.toggle('active');
    socialPlusminus.textContent = socialTitle.classList.contains('active') ? '-' : '+';
  });

  socialCol.append(socialTitle, socialLinksCvr);
  f2Row.append(socialCol);
  container.append(f2Row);

  // Legal and Copyright (f3)
  const f3Row = document.createElement('div');
  f3Row.classList.add('row', 'mt25', 'f3');

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
  const copyrightP = document.createElement('p');
  copyrightP.classList.add('copy-txt', 'text-md-end');
  copyrightP.textContent = '© Copyright 2026. All rights reserved. Tata Motors Limited.';
  copyrightCol.append(copyrightP);

  f3Row.append(legalCol, copyrightCol);
  container.append(f3Row);

  footerWrp.append(container);

  block.textContent = '';
  block.append(footerWrp);
}
