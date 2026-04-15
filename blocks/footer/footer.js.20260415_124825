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
  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      optimizedPic.querySelector('img').classList.add('img-fluid');
      mobLogoWr.append(optimizedPic);
    }
  }
  container.append(mobLogoWr);

  // First row of sections (f1)
  const row1 = document.createElement('div');
  row1.classList.add('row', 'f1');
  container.append(row1);

  const socialMediaItems = [];

  // Process section items
  sectionRows.forEach((row) => {
    const cells = [...row.children];
    // Determine which cell is the label and which is the links based on content
    const labelCell = cells.find(cell => !cell.querySelector('ul') && !cell.querySelector('a'));
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul') || cell.querySelector('a'));

    const labelText = labelCell ? labelCell.textContent.trim() : '';
    const subList = sectionLinksCell ? sectionLinksCell.querySelector('ul') : null;

    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3');
    moveInstrumentation(row, col);

    if (subList) {
      // Accordion item or social media
      if (subList.classList.contains('socialIcons')) {
        // Collect social media items to be moved to row2 later
        socialMediaItems.push({ col, labelText, subList, sectionLinksCell });
      } else {
        // Regular accordion item
        const ttle = document.createElement('a');
        ttle.href = 'javascript:void(0)';
        ttle.classList.add('ttle', 'accordion_head2');
        ttle.textContent = labelText;

        const plusminus = document.createElement('span');
        plusminus.classList.add('plusminus2');
        plusminus.textContent = '+';
        ttle.append(plusminus);

        const ftrSubLinksCvr = document.createElement('div');
        ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');
        ftrSubLinksCvr.append(subList);

        // For regular links, ensure they have ftr-link class
        [...subList.querySelectorAll('a')].forEach((link) => {
          link.classList.add('ftr-link');
        });

        // Toggle functionality for accordion
        ttle.addEventListener('click', (e) => {
          e.preventDefault();
          ftrSubLinksCvr.classList.toggle('active'); // Use 'active' for visibility
          ttle.classList.toggle('active');
          plusminus.textContent = ttle.classList.contains('active') ? '-' : '+';
        });

        col.append(ttle, ftrSubLinksCvr);
        row1.append(col);
      }
    } else if (sectionLinksCell) {
      // Simple link or text
      const link = sectionLinksCell.querySelector('a');
      if (link) {
        const ttle = document.createElement('a');
        ttle.href = link.href;
        ttle.classList.add('ttle');
        ttle.textContent = labelText;
        moveInstrumentation(sectionLinksCell, ttle);
        col.append(ttle);
      } else {
        // If it's just text or a paragraph, wrap it in a p with ttle class
        const p = document.createElement('p');
        p.classList.add('ttle');
        p.textContent = labelText;
        moveInstrumentation(labelCell, p);
        col.append(p);
      }
      row1.append(col);
    }
  });

  // Second row (f2) - for social media, if present
  if (socialMediaItems.length > 0) {
    const row2 = document.createElement('div');
    row2.classList.add('row', 'f2', 'justify-content-between');
    container.append(row2);

    socialMediaItems.forEach(({ col, labelText, subList, sectionLinksCell }) => {
      // Move social media column to row2 and adjust its class
      col.classList.remove('col-xl-3');
      col.classList.add('col-xl-2', 'ftr-drop-wrp');

      const ttle = document.createElement('p'); // Social media title is a p, not an a
      ttle.classList.add('ttle', 'accordion_head2');
      ttle.textContent = labelText;

      const plusminus = document.createElement('span');
      plusminus.classList.add('plusminus2');
      plusminus.textContent = '+';
      ttle.append(plusminus);

      const ftrSubLinksCvr = document.createElement('div');
      ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');
      ftrSubLinksCvr.append(subList);

      // Transform nested lists for social media icons
      [...subList.children].forEach((li) => {
        const link = li.querySelector('a');
        if (link) {
          link.classList.add('ftr-link');
          const icon = link.querySelector('i');
          if (icon) {
            link.innerHTML = ''; // Clear original content to append only icon
            link.append(icon);
          }
          // Move instrumentation from li to link
          moveInstrumentation(li, link);
          li.replaceWith(link);
        }
      });

      // Toggle functionality for accordion
      ttle.addEventListener('click', (e) => {
        e.preventDefault();
        ftrSubLinksCvr.classList.toggle('active'); // Use 'active' for visibility
        ttle.classList.toggle('active');
        plusminus.textContent = ttle.classList.contains('active') ? '-' : '+';
      });

      col.append(ttle, ftrSubLinksCvr);
      row2.append(col);
    });
  }

  // Third row (f3) - legal disclaimer and copyright
  const row3 = document.createElement('div');
  row3.classList.add('row', 'mt25', 'f3');
  container.append(row3);

  // Legal Disclaimer (hardcoded from original HTML, assuming it's static)
  const legalCol = document.createElement('div');
  legalCol.classList.add('col-12', 'col-md-6');
  const legalLink = document.createElement('a');
  legalLink.href = 'https://www.tatamotors.com/legal-disclaimer';
  legalLink.textContent = 'Legal Disclaimer';
  const openSourceLink = document.createElement('a');
  openSourceLink.href = 'https://www.tatamotors.com/open-source-license-disclosure';
  openSourceLink.textContent = 'Open Source License Disclosure';
  legalCol.append(legalLink, openSourceLink);
  row3.append(legalCol);

  // Copyright (hardcoded from original HTML, assuming year updates dynamically)
  const copyrightCol = document.createElement('div');
  copyrightCol.classList.add('col-12', 'col-md-6');
  const copyrightP = document.createElement('p');
  copyrightP.classList.add('copy-txt', 'text-md-end');
  copyrightP.textContent = `© Copyright ${new Date().getFullYear()}. All rights reserved. Tata Motors Limited.`;
  copyrightCol.append(copyrightP);
  row3.append(copyrightCol);

  // Optimize images
  sectionWrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(sectionWrapper);
}
