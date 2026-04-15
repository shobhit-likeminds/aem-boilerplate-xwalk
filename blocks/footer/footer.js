import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrp = document.createElement('section');
  footerWrp.classList.add('footer-wrp');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  footerWrp.append(container);

  const [logoRow, ...sectionRows] = [...block.children];

  // Logo
  const mobLogoWr = document.createElement('div');
  mobLogoWr.classList.add('mob-logo-wr');
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobLogoWr.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('img-fluid');
    }
  }
  moveInstrumentation(logoRow, mobLogoWr);
  container.append(mobLogoWr);

  // Section Links
  const f1Row = document.createElement('div');
  f1Row.classList.add('row', 'f1');
  container.append(f1Row);

  sectionRows.forEach((row) => {
    // CRITICAL FIX: Replaced row.children[0] with row.querySelector('div')
    const sectionLinksCell = row.querySelector('div'); // Only one cell per row for sectionLinks
    if (sectionLinksCell) {
      const col = document.createElement('div');
      col.classList.add('col', 'col-xl-3');
      moveInstrumentation(row, col);

      const ul = sectionLinksCell.querySelector('ul');
      if (ul) {
        // This is an accordion / dropdown section
        const titleLink = ul.previousElementSibling; // Assuming title is a sibling <p> or <a> before <ul>
        const titleText = titleLink ? titleLink.textContent.trim() : 'Section Title';

        const ttle = document.createElement('a');
        ttle.href = 'javascript:void(0)';
        ttle.classList.add('ttle', 'accordion_head2');
        ttle.innerHTML = `${titleText} <span class="plusminus2">+</span>`;
        col.append(ttle);

        const ftrSubLinksCvr = document.createElement('div');
        ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');
        ftrSubLinksCvr.append(ul); // Move the authored ul into the new wrapper
        col.append(ftrSubLinksCvr);

        // Add accordion functionality
        ttle.addEventListener('click', (e) => {
          e.preventDefault();
          ftrSubLinksCvr.classList.toggle('active'); // Use 'active' class for toggling
          ttle.classList.toggle('active');
          const plusminus = ttle.querySelector('.plusminus2');
          if (plusminus) {
            plusminus.textContent = ftrSubLinksCvr.classList.contains('active') ? '-' : '+';
          }
        });

        // Transform nested lists within this section
        ul.querySelectorAll('li').forEach(li => {
          const nestedUl = li.querySelector(':scope > ul');
          if (nestedUl) {
            nestedUl.remove();
            const subWrap = document.createElement('div');
            subWrap.classList.add('has-sub-child'); // Class from original HTML if available, otherwise generic
            subWrap.append(nestedUl);
            li.append(subWrap);

            const trigger = li.querySelector(':scope > a') || li;
            trigger.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation(); // Prevents parent accordion from also toggling
              li.classList.toggle('active');
              subWrap.classList.toggle('active');
            });
          }
        });

        // Apply ftr-link class to all direct <a> children of the ul
        ul.querySelectorAll(':scope > li > a').forEach(a => {
          a.classList.add('ftr-link');
        });

      } else {
        // Simple links (no dropdown)
        const links = sectionLinksCell.querySelectorAll('a');
        links.forEach(link => {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent.trim();
          newLink.classList.add('ttle'); // Apply ttle class for simple links
          col.append(newLink);
        });
      }
      f1Row.append(col);
    }
  });

  // Social Media Section (hardcoded as per original HTML structure, assuming no model field for this)
  const f2Row = document.createElement('div');
  f2Row.classList.add('row', 'f2', 'justify-content-between');
  container.append(f2Row);

  const socialCol = document.createElement('div');
  socialCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');
  f2Row.append(socialCol);

  const socialTitle = document.createElement('p');
  socialTitle.classList.add('ttle', 'accordion_head2');
  socialTitle.innerHTML = 'Social Media <span class="plusminus2">+</span>';
  socialCol.append(socialTitle);

  const socialLinksCvr = document.createElement('div');
  socialLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');
  socialCol.append(socialLinksCvr);

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

  // Add accordion functionality for social media
  socialTitle.addEventListener('click', (e) => {
    e.preventDefault();
    socialLinksCvr.classList.toggle('active');
    socialTitle.classList.toggle('active');
    const plusminus = socialTitle.querySelector('.plusminus2');
    if (plusminus) {
      plusminus.textContent = socialLinksCvr.classList.contains('active') ? '-' : '+';
    }
  });


  // Legal Disclaimer and Copyright Section
  const f3Row = document.createElement('div');
  f3Row.classList.add('row', 'mt25', 'f3');
  container.append(f3Row);

  const legalCol = document.createElement('div');
  legalCol.classList.add('col-12', 'col-md-6');
  f3Row.append(legalCol);

  const legalDisclaimerLink = document.createElement('a');
  legalDisclaimerLink.href = 'https://www.tatamotors.com/legal-disclaimer';
  legalDisclaimerLink.textContent = 'Legal Disclaimer';
  legalCol.append(legalDisclaimerLink);

  const openSourceLink = document.createElement('a');
  openSourceLink.href = 'https://www.tatamotors.com/open-source-license-disclosure';
  openSourceLink.textContent = 'Open Source License Disclosure';
  legalCol.append(openSourceLink);

  const copyrightCol = document.createElement('div');
  copyrightCol.classList.add('col-12', 'col-md-6');
  f3Row.append(copyrightCol);

  const copyrightP = document.createElement('p');
  copyrightP.classList.add('copy-txt', 'text-md-end');
  copyrightP.innerHTML = '© Copyright 2026. All rights reserved. Tata Motors Limited.';
  copyrightCol.append(copyrightP);

  block.textContent = '';
  block.append(footerWrp);
}
