import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, ...sectionRows] = [...block.children];

  // Create the main footer wrapper
  const footerWrp = document.createElement('section');
  footerWrp.classList.add('footer-wrp');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  footerWrp.append(container);

  // Logo section
  const mobLogoWr = document.createElement('div');
  mobLogoWr.classList.add('mob-logo-wr');
  moveInstrumentation(logoRow, mobLogoWr);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      optimizedPic.querySelector('img').classList.add('img-fluid');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobLogoWr.append(optimizedPic);
    }
  }
  container.append(mobLogoWr);

  // Footer sections (f1 row)
  const f1Row = document.createElement('div');
  f1Row.classList.add('row', 'f1');
  container.append(f1Row);

  sectionRows.forEach((row) => {
    // Use content detection instead of index access for robustness
    const cells = [...row.children];
    const titleCell = cells.find(cell => !cell.querySelector('ul') && !cell.querySelector('a'));
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('a'));

    if (!titleCell || !sectionLinksCell) {
      // Skip if the row structure is unexpected
      return;
    }

    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3');
    moveInstrumentation(row, col);

    const titleText = titleCell.textContent.trim();
    const sectionLinksContent = sectionLinksCell.innerHTML;
    const sectionLinksUl = sectionLinksCell.querySelector('ul');

    if (sectionLinksUl) {
      // This is an accordion item
      const ttle = document.createElement('a');
      ttle.href = 'javascript:void(0)';
      ttle.classList.add('ttle', 'accordion_head2');
      ttle.textContent = titleText;

      const plusminus = document.createElement('span');
      plusminus.classList.add('plusminus2');
      plusminus.textContent = '+';
      ttle.append(plusminus);

      const ftrSubLinksCvr = document.createElement('div');
      ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');
      ftrSubLinksCvr.innerHTML = sectionLinksContent; // Append the raw HTML, including <ul>

      // Add click listener for accordion behavior
      ttle.addEventListener('click', () => {
        ftrSubLinksCvr.classList.toggle('active'); // Use 'active' for visibility
        ttle.classList.toggle('active'); // Use 'active' for trigger state
        plusminus.textContent = ftrSubLinksCvr.classList.contains('active') ? '-' : '+';
      });

      col.append(ttle, ftrSubLinksCvr);
    } else {
      // This is a simple link item (no sub-links, just a single link or plain text)
      const link = sectionLinksCell.querySelector('a');
      const ttle = document.createElement('a');
      if (link) {
        // If there's an anchor in sectionLinksCell, use its href and the titleText
        ttle.href = link.href;
        ttle.textContent = titleText;
      } else {
        // If no link, it's just a title, potentially with rich text content
        // As per the model, title is text, sectionLinks is richtext.
        // If sectionLinks has no UL and no A, it's just rich text content.
        // The original HTML suggests these are always links or accordions.
        // Fallback to a non-functional link if no actual link is found.
        ttle.href = '#';
        ttle.textContent = titleText;
      }
      ttle.classList.add('ttle');
      col.append(ttle);
    }
    f1Row.append(col);
  });

  // Placeholder for f2 and f3 rows based on the original HTML structure
  // These are not directly driven by the EDS block model, but are structural elements
  // from the original HTML that need to be replicated.
  // For this exercise, we'll create the structure as seen in the original HTML,
  // assuming these are fixed parts of the footer layout.

  // F2 row (Social Media)
  const f2Row = document.createElement('div');
  f2Row.classList.add('row', 'f2', 'justify-content-between');
  container.append(f2Row);

  const socialCol = document.createElement('div');
  socialCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');
  f2Row.append(socialCol);

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
  socialCol.append(socialLinksCvr);

  // Example social links (hardcoded as they are not in the EDS model)
  const socialLinks = [
    { href: 'https://www.facebook.com/TataMotorsGroup/', icon: 'fab fa-facebook-square' },
    { href: 'https://www.instagram.com/tatamotorsgroup/', icon: 'fab fa-instagram' },
    { href: 'https://twitter.com/TataMotors', icon: 'fa-brands fa-square-x-twitter' },
    { href: 'https://www.linkedin.com/company/tata-motors/', icon: 'fab fa-linkedin' },
    { href: 'https://www.youtube.com/user/TataMotorsGroup', icon: 'fab fa-youtube-square' },
  ];

  socialLinks.forEach(item => {
    const a = document.createElement('a');
    a.href = item.href;
    a.classList.add('ftr-link');
    a.target = '_blank';
    const i = document.createElement('i');
    i.classList.add(...item.icon.split(' '));
    a.append(i);
    socialLinksCvr.append(a);
  });

  // Add click listener for social media accordion
  socialTitle.addEventListener('click', () => {
    socialLinksCvr.classList.toggle('active');
    socialTitle.classList.toggle('active');
    socialPlusminus.textContent = socialLinksCvr.classList.contains('active') ? '-' : '+';
  });

  // F3 row (Legal and Copyright)
  const f3Row = document.createElement('div');
  f3Row.classList.add('row', 'mt25', 'f3');
  container.append(f3Row);

  const legalCol = document.createElement('div');
  legalCol.classList.add('col-12', 'col-md-6');
  f3Row.append(legalCol);

  const legalDisclaimer = document.createElement('a');
  legalDisclaimer.href = 'https://www.tatamotors.com/legal-disclaimer';
  legalDisclaimer.textContent = 'Legal Disclaimer';
  legalCol.append(legalDisclaimer);

  const openSource = document.createElement('a');
  openSource.href = 'https://www.tatamotors.com/open-source-license-disclosure';
  openSource.textContent = 'Open Source License Disclosure';
  legalCol.append(openSource);

  const copyrightCol = document.createElement('div');
  copyrightCol.classList.add('col-12', 'col-md-6');
  f3Row.append(copyrightCol);

  const copyrightText = document.createElement('p');
  copyrightText.classList.add('copy-txt', 'text-md-end');
  copyrightText.textContent = '© Copyright 2026. All rights reserved. Tata Motors Limited.';
  copyrightCol.append(copyrightText);

  block.textContent = '';
  block.append(footerWrp);
}
