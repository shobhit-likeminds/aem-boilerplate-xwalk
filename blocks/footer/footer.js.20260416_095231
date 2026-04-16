import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, ...sectionRows] = [...block.children];

  const footerWrapper = document.createElement('section');
  footerWrapper.classList.add('footer-wrp');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  footerWrapper.append(container);

  // Logo
  if (logoRow) {
    const mobLogoWr = document.createElement('div');
    mobLogoWr.classList.add('mob-logo-wr');
    moveInstrumentation(logoRow, mobLogoWr);

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
    container.append(mobLogoWr);
  }

  const f1Row = document.createElement('div');
  f1Row.classList.add('row', 'f1');
  container.append(f1Row);

  // Sections
  sectionRows.forEach((row) => {
    // CRITICAL FIX: Replaced direct index access with content detection
    const cells = [...row.children];
    const labelCell = cells.find(cell => !cell.querySelector('ul') && !cell.querySelector('a'));
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('a'));

    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3');
    moveInstrumentation(row, col);

    const sectionLinksUl = sectionLinksCell ? sectionLinksCell.querySelector('ul') : null;

    if (sectionLinksUl) {
      // Accordion/dropdown item
      const ttle = document.createElement('a');
      ttle.href = 'javascript:void(0)';
      ttle.classList.add('ttle', 'accordion_head2');
      ttle.textContent = labelCell ? labelCell.textContent.trim() : '';

      const plusminus = document.createElement('span');
      plusminus.classList.add('plusminus2');
      plusminus.textContent = '+';
      ttle.append(plusminus);

      const ftrSubLinksCvr = document.createElement('div');
      ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');
      ftrSubLinksCvr.append(sectionLinksUl);

      // Transform nested lists into accordion structure
      function transformNestedLists(rootUl) {
        rootUl.querySelectorAll('li').forEach(li => {
          const nested = li.querySelector(':scope > ul');
          if (nested) {
            nested.remove();
            const subWrap = document.createElement('div');
            subWrap.classList.add('has-sub-child');
            subWrap.append(nested);
            li.append(subWrap);
            const trigger = li.querySelector(':scope > a') || li;
            trigger.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              li.classList.toggle('active');
              subWrap.classList.toggle('active');
            });
          }
        });
      }
      transformNestedLists(sectionLinksUl);

      ttle.addEventListener('click', () => {
        ftrSubLinksCvr.classList.toggle('accordion_body2'); // Toggle visibility
        ttle.classList.toggle('active'); // Add active state to header
        if (ttle.classList.contains('active')) {
          plusminus.textContent = '-';
        } else {
          plusminus.textContent = '+';
        }
      });

      // Apply ftr-link class to all direct links within the section
      [...ftrSubLinksCvr.querySelectorAll(':scope > ul > li > a')].forEach(link => {
        link.classList.add('ftr-link');
      });

      col.append(ttle, ftrSubLinksCvr);
    } else {
      // Simple link
      const ttle = document.createElement('a');
      const link = sectionLinksCell ? sectionLinksCell.querySelector('a') : null;
      if (link) {
        ttle.href = link.href;
      } else {
        ttle.href = 'javascript:void(0)'; // Fallback if no link in richtext
      }
      ttle.classList.add('ttle');
      ttle.textContent = labelCell ? labelCell.textContent.trim() : '';
      col.append(ttle);
    }
    f1Row.append(col);
  });

  // Social media section (hardcoded structure from original HTML as it's not in EDS model)
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

  const socialLinks = [
    { href: 'https://www.facebook.com/TataMotorsGroup/', iconClasses: ['fab', 'fa-facebook-square'] },
    { href: 'https://www.instagram.com/tatamotorsgroup/', iconClasses: ['fab', 'fa-instagram'] },
    { href: 'https://twitter.com/TataMotors', iconClasses: ['fa-brands', 'fa-square-x-twitter'] },
    { href: 'https://www.linkedin.com/company/tata-motors/', iconClasses: ['fab', 'fa-linkedin'] },
    { href: 'https://www.youtube.com/user/TataMotorsGroup', iconClasses: ['fab', 'fa-youtube-square'] },
  ];

  socialLinks.forEach(social => {
    const a = document.createElement('a');
    a.href = social.href;
    a.classList.add('ftr-link');
    a.target = '_blank';
    const i = document.createElement('i');
    i.classList.add(...social.iconClasses);
    a.append(i);
    socialLinksCvr.append(a);
  });

  socialTitle.addEventListener('click', () => {
    socialLinksCvr.classList.toggle('accordion_body2');
    socialTitle.classList.toggle('active');
    if (socialTitle.classList.contains('active')) {
      socialPlusminus.textContent = '-';
    } else {
      socialPlusminus.textContent = '+';
    }
  });


  // Legal and Copyright section (hardcoded structure from original HTML)
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
  block.append(footerWrapper);
}
