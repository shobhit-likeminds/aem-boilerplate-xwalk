import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, ...sectionRows] = [...block.children];

  // Main wrapper
  const footerWrp = document.createElement('section');
  footerWrp.classList.add('footer-wrp');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  footerWrp.append(container);

  // Logo
  if (logoRow) {
    const mobLogoWr = document.createElement('div');
    mobLogoWr.classList.add('mob-logo-wr');
    const picture = logoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        mobLogoWr.append(optimizedPic);
        optimizedPic.querySelector('img').classList.add('img-fluid');
      }
    }
    moveInstrumentation(logoRow, mobLogoWr);
    container.append(mobLogoWr);
  }

  // Sections
  const row1 = document.createElement('div');
  row1.classList.add('row', 'f1');
  container.append(row1);

  sectionRows.forEach((row) => {
    // Use content detection instead of index access for robustness
    const cells = [...row.children];
    const headingCell = cells.find(cell => !cell.querySelector('ul') && !cell.querySelector('a'));
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p') || cell.querySelector('a'));

    if (!headingCell || !sectionLinksCell) {
      // Skip if cells are not found as expected
      return;
    }

    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3');
    moveInstrumentation(row, col);

    const headingText = headingCell.textContent.trim();
    const sectionLinksContent = sectionLinksCell.innerHTML;
    const hasUl = sectionLinksCell.querySelector('ul');

    if (hasUl) {
      // Accordion item
      const ttle = document.createElement('a');
      ttle.href = 'javascript:void(0)';
      ttle.classList.add('ttle', 'accordion_head2');
      ttle.textContent = headingText;

      const plusminus = document.createElement('span');
      plusminus.classList.add('plusminus2');
      plusminus.textContent = '+';
      ttle.append(plusminus);

      const ftrDropWrp = document.createElement('div');
      ftrDropWrp.classList.add('ftr-drop-wrp');
      ftrDropWrp.append(ttle);

      const ftrSubLinksCvr = document.createElement('div');
      ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');
      ftrSubLinksCvr.innerHTML = sectionLinksContent;

      // Add event listener for accordion behavior
      ttle.addEventListener('click', () => {
        ftrSubLinksCvr.classList.toggle('active');
        plusminus.textContent = ftrSubLinksCvr.classList.contains('active') ? '-' : '+';
      });

      // Ensure all links inside the accordion body have 'ftr-link' class
      ftrSubLinksCvr.querySelectorAll('a').forEach((link) => {
        link.classList.add('ftr-link');
      });

      ftrDropWrp.append(ftrSubLinksCvr);
      col.append(ftrDropWrp);
    } else {
      // Simple link or text
      const link = sectionLinksCell.querySelector('a');
      if (link) {
        const ttle = document.createElement('a');
        ttle.href = link.href;
        ttle.classList.add('ttle');
        ttle.textContent = headingText;
        col.append(ttle);
      } else {
        const ttle = document.createElement('p'); // Use p for plain text headings without links
        ttle.classList.add('ttle');
        ttle.textContent = headingText;
        col.append(ttle);
      }
    }
    row1.append(col);
  });

  // Add the row f2 and f3 for social media and legal links/copyright if they exist in the original HTML
  // (These are not part of the EDS model for this block, but are static elements in the original HTML)
  // For this exercise, we will assume these are not dynamic and only focus on the block's model.
  // If these were dynamic, they would need to be part of the EDS model.

  // Example of how to add fixed elements from original HTML if they were hardcoded in decorate:
  const row2 = document.createElement('div');
  row2.classList.add('row', 'f2', 'justify-content-between');
  container.append(row2);

  const socialCol = document.createElement('div');
  socialCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');
  const socialTitle = document.createElement('p');
  socialTitle.classList.add('ttle', 'accordion_head2');
  socialTitle.textContent = 'Social Media ';
  const socialPlusminus = document.createElement('span');
  socialPlusminus.classList.add('plusminus2');
  socialPlusminus.textContent = '+';
  socialTitle.append(socialPlusminus);
  socialCol.append(socialTitle);

  const socialLinksCvr = document.createElement('div');
  socialLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');
  socialLinksCvr.innerHTML = `
    <a href="https://www.facebook.com/TataMotorsGroup/" class="ftr-link" target="_blank"><i class="fab fa-facebook-square"></i></a>
    <a href="https://www.instagram.com/tatamotorsgroup/" class="ftr-link" target="_blank"><i class="fab fa-instagram"></i></a>
    <a href="https://twitter.com/TataMotors" class="ftr-link" target="_blank"><i class="fa-brands fa-square-x-twitter"></i></a>
    <a href="https://www.linkedin.com/company/tata-motors/" class="ftr-link" target="_blank"><i class="fab fa-linkedin"></i></a>
    <a href="https://www.youtube.com/user/TataMotorsGroup" class="ftr-link" target="_blank"><i class="fab fa-youtube-square"></i></a>
  `;
  socialCol.append(socialLinksCvr);
  socialTitle.addEventListener('click', () => {
    socialLinksCvr.classList.toggle('active');
    socialPlusminus.textContent = socialLinksCvr.classList.contains('active') ? '-' : '+';
  });
  row2.append(socialCol);

  const row3 = document.createElement('div');
  row3.classList.add('row', 'mt25', 'f3');
  container.append(row3);

  const legalCol = document.createElement('div');
  legalCol.classList.add('col-12', 'col-md-6');
  legalCol.innerHTML = `
    <a href="https://www.tatamotors.com/legal-disclaimer">Legal Disclaimer</a>
    <a href="https://www.tatamotors.com/open-source-license-disclosure">Open Source License Disclosure</a>
  `;
  row3.append(legalCol);

  const copyrightCol = document.createElement('div');
  copyrightCol.classList.add('col-12', 'col-md-6');
  copyrightCol.innerHTML = `
    <p class="copy-txt text-md-end"> © Copyright 2026. All rights reserved. Tata Motors Limited.</p>
  `;
  row3.append(copyrightCol);

  block.textContent = '';
  block.append(footerWrp);
}
