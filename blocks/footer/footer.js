import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrp = document.createElement('section');
  footerWrp.classList.add('footer-wrp');

  const containerWrp = document.createElement('div');
  containerWrp.classList.add('container-1600-wrp');
  footerWrp.append(containerWrp);

  const blockChildren = [...block.children];
  const logoRow = blockChildren[0];
  const sectionRows = blockChildren.slice(1);

  // Logo
  const mobLogoWr = document.createElement('div');
  mobLogoWr.classList.add('mob-logo-wr');
  moveInstrumentation(logoRow, mobLogoWr);
  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('img-fluid');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobLogoWr.append(optimizedPic);
    }
  }
  containerWrp.append(mobLogoWr);

  // Footer Sections
  const row1 = document.createElement('div');
  row1.classList.add('row', 'f1');
  containerWrp.append(row1);

  const socialMediaLinks = [];
  const legalLinks = [];
  let copyrightTextContent = '';

  sectionRows.forEach((row) => {
    const cells = [...row.children];
    // Check if it's a social media section (contains only links with icons)
    const isSocialMediaSection = cells.some(cell => cell.querySelector('a i'));
    // Check if it's a legal/copyright section (contains plain links or text, usually at the end)
    const isLegalOrCopyrightSection = cells.some(cell => {
      const textContent = cell.textContent.trim();
      return textContent.includes('Legal Disclaimer') || textContent.includes('Open Source License Disclosure') || textContent.includes('© Copyright');
    });

    if (isSocialMediaSection) {
      cells.forEach(cell => {
        [...cell.querySelectorAll('a')].forEach(link => {
          const icon = link.querySelector('i');
          if (icon) {
            socialMediaLinks.push({
              href: link.href,
              iconClasses: [...icon.classList],
              target: link.target,
            });
          }
        });
      });
    } else if (isLegalOrCopyrightSection) {
      cells.forEach(cell => {
        [...cell.querySelectorAll('a')].forEach(link => {
          legalLinks.push({
            href: link.href,
            textContent: link.textContent.trim(),
          });
        });
        if (cell.textContent.trim().includes('© Copyright')) {
          copyrightTextContent = cell.textContent.trim();
        }
      });
    } else {
      // Regular footer sections (accordion or simple links)
      const titleCell = cells[0];
      const sectionLinksCell = cells[1];

      const col = document.createElement('div');
      col.classList.add('col', 'col-xl-3');
      moveInstrumentation(row, col);

      const sectionLinksUl = sectionLinksCell.querySelector('ul');
      if (sectionLinksUl) {
        // This is an accordion/dropdown section
        const ttle = document.createElement('a');
        ttle.href = 'javascript:void(0)';
        ttle.classList.add('ttle', 'accordion_head2');
        ttle.textContent = titleCell.textContent.trim();

        const plusminus = document.createElement('span');
        plusminus.classList.add('plusminus2');
        plusminus.textContent = '+';
        ttle.append(plusminus);

        const ftrSubLinksCvr = document.createElement('div');
        ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');
        
        [...sectionLinksUl.children].forEach((li) => {
          const link = li.querySelector('a');
          if (link) {
            const ftrLink = document.createElement('a');
            ftrLink.href = link.href;
            ftrLink.textContent = link.textContent.trim();
            ftrLink.classList.add('ftr-link');
            moveInstrumentation(li, ftrLink);
            ftrSubLinksCvr.append(ftrLink);
          }
        });

        ttle.addEventListener('click', () => {
          ftrSubLinksCvr.classList.toggle('accordion_body2');
          plusminus.textContent = ftrSubLinksCvr.classList.contains('accordion_body2') ? '+' : '-';
        });

        col.append(ttle, ftrSubLinksCvr);
      } else {
        // This is a simple link section
        const ttle = document.createElement('a');
        const link = sectionLinksCell.querySelector('a');
        if (link) {
          ttle.href = link.href;
          ttle.textContent = titleCell.textContent.trim();
        } else {
          // Fallback if no link in richtext, but title cell has a link
          const titleLink = titleCell.querySelector('a');
          if (titleLink) {
            ttle.href = titleLink.href;
            ttle.textContent = titleLink.textContent.trim();
          } else {
            ttle.href = '#'; // Fallback if no link at all
            ttle.textContent = titleCell.textContent.trim();
          }
        }
        ttle.classList.add('ttle');
        col.append(ttle);
      }
      row1.append(col);
    }
  });

  // Social Media section
  if (socialMediaLinks.length > 0) {
    const row2 = document.createElement('div');
    row2.classList.add('row', 'f2', 'justify-content-between');
    containerWrp.append(row2);

    const socialCol = document.createElement('div');
    socialCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');
    row2.append(socialCol);

    const socialTitle = document.createElement('p');
    socialTitle.classList.add('ttle', 'accordion_head2');
    socialTitle.textContent = 'Social Media ';
    const socialPlusMinus = document.createElement('span');
    socialPlusMinus.classList.add('plusminus2');
    socialPlusMinus.textContent = '+';
    socialTitle.append(socialPlusMinus);
    socialCol.append(socialTitle);

    const socialLinksCvr = document.createElement('div');
    socialLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');
    socialCol.append(socialLinksCvr);

    socialMediaLinks.forEach(data => {
      const socialLink = document.createElement('a');
      socialLink.href = data.href;
      socialLink.classList.add('ftr-link');
      if (data.target) {
        socialLink.target = data.target;
      } else {
        socialLink.target = '_blank'; // Default to blank if not specified
      }
      const icon = document.createElement('i');
      icon.classList.add(...data.iconClasses);
      socialLink.append(icon);
      socialLinksCvr.append(socialLink);
    });

    socialTitle.addEventListener('click', () => {
      socialLinksCvr.classList.toggle('accordion_body2');
      socialPlusMinus.textContent = socialLinksCvr.classList.contains('accordion_body2') ? '+' : '-';
    });
  }

  // Legal and Copyright section
  if (legalLinks.length > 0 || copyrightTextContent) {
    const row3 = document.createElement('div');
    row3.classList.add('row', 'mt25', 'f3');
    containerWrp.append(row3);

    const legalCol = document.createElement('div');
    legalCol.classList.add('col-12', 'col-md-6');
    row3.append(legalCol);

    legalLinks.forEach(linkData => {
      const legalLink = document.createElement('a');
      legalLink.href = linkData.href;
      legalLink.textContent = linkData.textContent;
      legalCol.append(legalLink);
    });

    const copyrightCol = document.createElement('div');
    copyrightCol.classList.add('col-12', 'col-md-6');
    row3.append(copyrightCol);

    if (copyrightTextContent) {
      const copyrightText = document.createElement('p');
      copyrightText.classList.add('copy-txt', 'text-md-end');
      copyrightText.textContent = copyrightTextContent;
      copyrightCol.append(copyrightText);
    }
  }

  block.textContent = '';
  block.append(footerWrp);
}
