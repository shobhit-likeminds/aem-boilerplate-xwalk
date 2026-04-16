import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, ...contentRows] = [...block.children];

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

  const f1Row = document.createElement('div');
  f1Row.classList.add('row', 'f1');
  container.append(f1Row);

  const f2Row = document.createElement('div');
  f2Row.classList.add('row', 'f2', 'justify-content-between');
  container.append(f2Row);

  const f3Row = document.createElement('div');
  f3Row.classList.add('row', 'mt25', 'f3');
  container.append(f3Row);

  contentRows.forEach((row) => {
    const cells = [...row.children];

    // Detect if this is a "Social Media" row or a regular "Footer Section" row
    // A social media row will have a title and then a list of social links (likely <a> tags with <i> for icons)
    // A regular footer section row has a title and then a richtext cell which may contain a UL or just links/text.
    const isSocialMediaRow = cells.length === 2 && cells[1].querySelector('a i');

    if (isSocialMediaRow) {
      const [titleCell, socialLinksCell] = cells;

      const socialCol = document.createElement('div');
      socialCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');
      moveInstrumentation(row, socialCol);

      const socialTitle = document.createElement('p');
      socialTitle.classList.add('ttle', 'accordion_head2');
      socialTitle.textContent = titleCell?.textContent.trim() || '';
      const socialPlusMinus = document.createElement('span');
      socialPlusMinus.classList.add('plusminus2');
      socialPlusMinus.textContent = '+';
      socialTitle.append(socialPlusMinus);
      socialCol.append(socialTitle);

      const socialLinksCvr = document.createElement('div');
      socialLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');
      socialLinksCvr.append(...socialLinksCell.children); // Append all social links directly
      socialCol.append(socialLinksCvr);

      socialTitle.addEventListener('click', () => {
        socialLinksCvr.classList.toggle('active');
        socialTitle.classList.toggle('active');
        socialPlusMinus.textContent = socialTitle.classList.contains('active') ? '-' : '+';
      });
      f2Row.append(socialCol);
    } else {
      // This is a regular footer-section item row
      const [titleCell, sectionLinksCell] = cells;

      const col = document.createElement('div');
      col.classList.add('col', 'col-xl-3');
      moveInstrumentation(row, col);

      const sectionLinksContent = sectionLinksCell?.innerHTML.trim();
      const hasUl = sectionLinksCell?.querySelector('ul');

      if (hasUl) {
        const ttle = document.createElement('a');
        ttle.href = 'javascript:void(0)';
        ttle.classList.add('ttle', 'accordion_head2');
        ttle.textContent = titleCell?.textContent.trim() || '';

        const plusminus = document.createElement('span');
        plusminus.classList.add('plusminus2');
        plusminus.textContent = '+';
        ttle.append(plusminus);

        const ftrSubLinksCvr = document.createElement('div');
        ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');
        ftrSubLinksCvr.append(hasUl); // Move the UL into the wrapper

        ttle.addEventListener('click', () => {
          ftrSubLinksCvr.classList.toggle('active'); // Use 'active' for state
          ttle.classList.toggle('active');
          plusminus.textContent = ttle.classList.contains('active') ? '-' : '+';
        });

        // Transform nested lists if any
        hasUl.querySelectorAll('li').forEach(li => {
          const nestedUl = li.querySelector(':scope > ul');
          if (nestedUl) {
            nestedUl.remove(); // Remove to re-wrap
            const subWrap = document.createElement('div');
            subWrap.classList.add('has-sub-child'); // Use class from original site CSS
            subWrap.append(nestedUl);
            li.append(subWrap);

            const trigger = li.querySelector(':scope > a') || li;
            trigger.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation(); // Prevents parent accordion from toggling
              li.classList.toggle('active');
              subWrap.classList.toggle('active');
            });
          }
        });

        col.append(ttle, ftrSubLinksCvr);
      } else if (sectionLinksContent) {
        // If it's just a <p> or plain text, treat it as a single link or text
        const anchor = document.createElement('a');
        anchor.classList.add('ttle');
        const foundLink = sectionLinksCell.querySelector('a');
        if (foundLink) {
          anchor.href = foundLink.href;
          anchor.textContent = titleCell?.textContent.trim() || foundLink.textContent.trim();
        } else {
          anchor.href = '#'; // Fallback if no link in rich text
          anchor.textContent = titleCell?.textContent.trim() || sectionLinksContent;
        }
        col.append(anchor);
      } else {
        // If only title and no section links (e.g., "Contact" in original HTML)
        const ttle = document.createElement('a');
        ttle.classList.add('ttle');
        const foundLink = titleCell.querySelector('a');
        if (foundLink) {
          ttle.href = foundLink.href;
          ttle.textContent = foundLink.textContent.trim();
        } else {
          // If title cell is just text, and no link was found
          ttle.href = '#'; // Default or if no specific link
          ttle.textContent = titleCell?.textContent.trim() || '';
        }
        col.append(ttle);
      }
      f1Row.append(col);
    }
  });

  // Legal and Copyright section (These are hardcoded as they are not part of the EDS model)
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

  const copyrightP = document.createElement('p');
  copyrightP.classList.add('copy-txt', 'text-md-end');
  copyrightP.textContent = ' © Copyright 2026. All rights reserved. Tata Motors Limited.';
  copyrightCol.append(copyrightP);

  block.textContent = '';
  block.append(footerWrp);
}
