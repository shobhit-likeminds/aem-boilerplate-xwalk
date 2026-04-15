import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, ...sectionRows] = [...block.children];

  // Main wrapper
  const sectionWrapper = document.createElement('section');
  sectionWrapper.classList.add('footer-wrp');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  sectionWrapper.append(container);

  // Mobile Logo
  const mobLogoWr = document.createElement('div');
  mobLogoWr.classList.add('mob-logo-wr');
  moveInstrumentation(logoRow, mobLogoWr);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    optimizedPic.querySelector('img').classList.add('img-fluid');
    mobLogoWr.append(optimizedPic);
  }
  container.append(mobLogoWr);

  // Footer sections row (f1)
  const f1Row = document.createElement('div');
  f1Row.classList.add('row', 'f1');
  container.append(f1Row);

  // Process footer sections (f1)
  sectionRows.forEach((row) => {
    // Check 0: CRITICAL - Replaced row.children[n] with content detection
    const cells = [...row.children];
    const headingCell = cells.find(cell => !cell.querySelector('ul') && !cell.querySelector('a')); // Find cell with plain text heading
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('p > a')); // Find cell with ul or p > a

    if (!headingCell || !sectionLinksCell) {
      // Skip if structure is unexpected
      return;
    }

    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3');
    moveInstrumentation(row, col);

    const headingText = headingCell.textContent.trim();
    const sectionLinksUl = sectionLinksCell.querySelector('ul');
    const singleLink = sectionLinksCell.querySelector('p > a');

    if (sectionLinksUl) {
      // Accordion item
      const accordionWrapper = document.createElement('div');
      accordionWrapper.classList.add('ftr-drop-wrp');

      const accordionHead = document.createElement('a');
      accordionHead.href = 'javascript:void(0)';
      accordionHead.classList.add('ttle', 'accordion_head2');
      accordionHead.textContent = headingText;

      const plusMinusSpan = document.createElement('span');
      plusMinusSpan.classList.add('plusminus2');
      plusMinusSpan.textContent = '+';
      accordionHead.append(plusMinusSpan);

      const accordionBody = document.createElement('div');
      accordionBody.classList.add('ftr-sub-links-cvr', 'accordion_body2');
      accordionBody.append(sectionLinksUl);

      // Add click listener for accordion behavior
      accordionHead.addEventListener('click', (e) => {
        e.preventDefault();
        accordionHead.classList.toggle('active');
        accordionBody.classList.toggle('active');
        plusMinusSpan.textContent = accordionHead.classList.contains('active') ? '-' : '+';
      });

      accordionWrapper.append(accordionHead, accordionBody);
      col.append(accordionWrapper);

      // Transform nested lists if any (e.g., social media icons)
      sectionLinksUl.querySelectorAll('li').forEach((li) => {
        const link = li.querySelector('a');
        if (link) {
          link.classList.add('ftr-link');
          // Check for social media icons
          const icon = link.querySelector('i');
          if (icon) {
            accordionBody.classList.add('socialIcons');
          }
        }
      });
    } else if (singleLink) {
      // Simple link item (no accordion, heading is a link)
      const link = document.createElement('a');
      link.classList.add('ttle');
      link.href = singleLink.href;
      link.textContent = headingText;
      col.append(link);
    } else {
      // Simple text item (heading is just text, no accordion, no link)
      const textElement = document.createElement('a'); // Use 'a' as per original HTML for consistency, even if not linked
      textElement.classList.add('ttle');
      textElement.href = 'javascript:void(0)'; // Default if no specific link
      textElement.textContent = headingText;
      col.append(textElement);
    }
    f1Row.append(col);
  });

  // Footer row 2 (f2) - Social Media section
  const f2Row = document.createElement('div');
  f2Row.classList.add('row', 'f2', 'justify-content-between');
  container.append(f2Row);

  // The original HTML shows social media as a separate accordion in f2.
  // This needs to be explicitly created if not coming from block content.
  // For now, assuming it's part of the block content if present, or hardcoded if not.
  // Based on the provided block structure, social media would be a 'footer-section' item.
  // If it's not in sectionRows, it implies it's hardcoded or a separate block.
  // Given the original HTML, it seems to be a hardcoded structure.
  // Let's create it based on the original HTML structure.
  const socialMediaCol = document.createElement('div');
  socialMediaCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp'); // Use col-xl-2 from original HTML
  f2Row.append(socialMediaCol);

  const socialMediaHead = document.createElement('p'); // Original HTML uses <p> for social media heading
  socialMediaHead.classList.add('ttle', 'accordion_head2');
  socialMediaHead.textContent = 'Social Media';

  const socialMediaPlusMinusSpan = document.createElement('span');
  socialMediaPlusMinusSpan.classList.add('plusminus2');
  socialMediaPlusMinusSpan.textContent = '+';
  socialMediaHead.append(socialMediaPlusMinusSpan);

  const socialMediaBody = document.createElement('div');
  socialMediaBody.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');

  // Hardcoded social media links from original HTML
  const socialLinks = [
    { href: 'https://www.facebook.com/TataMotorsGroup/', iconClass: 'fab fa-facebook-square' },
    { href: 'https://www.instagram.com/tatamotorsgroup/', iconClass: 'fab fa-instagram' },
    { href: 'https://twitter.com/TataMotors', iconClass: 'fa-brands fa-square-x-twitter' },
    { href: 'https://www.linkedin.com/company/tata-motors/', iconClass: 'fab fa-linkedin' },
    { href: 'https://www.youtube.com/user/TataMotorsGroup', iconClass: 'fab fa-youtube-square' },
  ];

  socialLinks.forEach(item => {
    const link = document.createElement('a');
    link.href = item.href;
    link.classList.add('ftr-link');
    link.target = '_blank';
    const icon = document.createElement('i');
    icon.className = item.iconClass; // Use className for multiple classes
    link.append(icon);
    socialMediaBody.append(link);
  });

  // Add click listener for social media accordion
  socialMediaHead.addEventListener('click', (e) => {
    e.preventDefault();
    socialMediaHead.classList.toggle('active');
    socialMediaBody.classList.toggle('active');
    socialMediaPlusMinusSpan.textContent = socialMediaHead.classList.contains('active') ? '-' : '+';
  });

  socialMediaCol.append(socialMediaHead, socialMediaBody);


  // Footer row 3 (f3) - Legal and Copyright
  const f3Row = document.createElement('div');
  f3Row.classList.add('row', 'mt25', 'f3');
  container.append(f3Row);

  const legalCol = document.createElement('div');
  legalCol.classList.add('col-12', 'col-md-6');
  f3Row.append(legalCol);

  // Hardcoded links from original HTML
  const legalDisclaimer = document.createElement('a');
  legalDisclaimer.href = 'https://www.tatamotors.com/legal-disclaimer';
  legalDisclaimer.textContent = 'Legal Disclaimer';
  legalCol.append(legalDisclaimer);

  const openSourceLink = document.createElement('a');
  openSourceLink.href = 'https://www.tatamotors.com/open-source-license-disclosure';
  openSourceLink.textContent = 'Open Source License Disclosure';
  legalCol.append(openSourceLink);

  const copyrightCol = document.createElement('div');
  copyrightCol.classList.add('col-12', 'col-md-6');
  f3Row.append(copyrightCol);

  const copyrightText = document.createElement('p');
  copyrightText.classList.add('copy-txt', 'text-md-end');
  copyrightText.textContent = '© Copyright 2026. All rights reserved. Tata Motors Limited.';
  copyrightCol.append(copyrightText);

  block.textContent = '';
  block.append(sectionWrapper);
}
