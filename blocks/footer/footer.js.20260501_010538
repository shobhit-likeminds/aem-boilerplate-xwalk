import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // The model has: logo, footerSections (container), footerSocialLinks (container), footerLegalLinks (container), copyright
  // So the first row is logo, the last is copyright. The middle rows are item rows.
  const logoRow = children[0];
  const copyrightRow = children[children.length - 1];
  const itemRows = children.slice(1, children.length - 1);

  // Distinguish item row types based on cell count and content
  const footerSections = itemRows.filter((row) => row.children.length === 2 && row.children[1].querySelector('ul'));
  const footerSocialLinks = itemRows.filter((row) => row.children.length === 1 && row.children[0].querySelector('a'));
  const footerLegalLinks = itemRows.filter((row) => row.children.length === 2 && !row.children[1].querySelector('ul'));

  const footerWrp = document.createElement('section');
  footerWrp.classList.add('footer-wrp'); // This is the block's outer wrapper, so it's fine.

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  footerWrp.append(container);

  // Mobile Logo
  const mobLogoWr = document.createElement('div');
  mobLogoWr.classList.add('mob-logo-wr');
  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    optimizedPic.querySelector('img').classList.add('img-fluid');
    mobLogoWr.append(optimizedPic);
  }
  moveInstrumentation(logoRow, mobLogoWr);
  container.append(mobLogoWr);

  // Footer Sections (f1)
  const rowF1 = document.createElement('div');
  rowF1.classList.add('row', 'f1');
  container.append(rowF1);

  footerSections.forEach((row) => {
    const [sectionTitleCell, sectionLinksCell] = [...row.children]; // Fixed schema, use destructuring
    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3');

    const titleEl = document.createElement('a');
    titleEl.classList.add('ttle', 'accordion_head2');
    titleEl.textContent = sectionTitleCell.textContent.trim();
    titleEl.href = 'javascript:void(0)'; // Placeholder for accordion trigger
    const plusMinusSpan = document.createElement('span');
    plusMinusSpan.classList.add('plusminus2');
    plusMinusSpan.textContent = '+';
    titleEl.append(plusMinusSpan);
    col.append(titleEl);

    const ftrSubLinksCvr = document.createElement('div');
    ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');

    // Handle richtext content for sectionLinks
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = sectionLinksCell.innerHTML;
    moveInstrumentation(sectionLinksCell, tempDiv); // Move instrumentation for the cell content

    const ul = tempDiv.querySelector('ul');
    if (ul) {
      const linksContainer = document.createElement('div');
      [...ul.children].forEach((li) => {
        const link = li.querySelector('a');
        if (link) {
          link.classList.add('ftr-link');
          linksContainer.append(link);
        } else {
          // Handle label-only nodes in rich text (e.g., plain text <li> without <a>)
          const textNode = [...li.childNodes].find(
            (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
          );
          if (textNode) {
            const span = document.createElement('span');
            span.textContent = textNode.textContent.trim();
            span.classList.add('ftr-link'); // Apply link styling to plain text
            linksContainer.append(span);
          }
        }
      });
      ftrSubLinksCvr.append(linksContainer);
    } else {
      // If no UL, just append raw HTML (e.g., <p> tags)
      while (tempDiv.firstChild) {
        ftrSubLinksCvr.append(tempDiv.firstChild);
      }
    }

    col.append(ftrSubLinksCvr);
    rowF1.append(col);
    moveInstrumentation(row, col); // Move instrumentation for the entire row

    titleEl.addEventListener('click', (e) => {
      e.preventDefault();
      ftrSubLinksCvr.classList.toggle('active');
      titleEl.classList.toggle('active');
      plusMinusSpan.textContent = ftrSubLinksCvr.classList.contains('active') ? '-' : '+';
    });
  });

  // Footer Social Links (f2)
  if (footerSocialLinks.length > 0) {
    const rowF2 = document.createElement('div');
    rowF2.classList.add('row', 'f2', 'justify-content-between');
    container.append(rowF2);

    const colSocial = document.createElement('div');
    colSocial.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');

    const socialTitle = document.createElement('p');
    socialTitle.classList.add('ttle', 'accordion_head2');
    socialTitle.textContent = 'Social Media'; // Hardcoded label, as per original HTML
    const socialPlusMinus = document.createElement('span');
    socialPlusMinus.classList.add('plusminus2');
    socialPlusMinus.textContent = '+';
    socialTitle.append(socialPlusMinus);
    colSocial.append(socialTitle);

    const socialLinksCvr = document.createElement('div');
    socialLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');

    footerSocialLinks.forEach((row) => {
      const [linkCell] = [...row.children]; // Fixed schema for social links, use destructuring
      const link = linkCell.querySelector('a');
      if (link) {
        const socialAnchor = document.createElement('a');
        socialAnchor.href = link.href;
        socialAnchor.classList.add('ftr-link');
        socialAnchor.target = '_blank';

        // Add appropriate social media icons based on href
        const url = link.href.toLowerCase();
        let iconClass = '';
        if (url.includes('facebook')) {
          iconClass = 'fab fa-facebook-square';
        } else if (url.includes('instagram')) {
          iconClass = 'fab fa-instagram';
        } else if (url.includes('twitter')) {
          iconClass = 'fa-brands fa-square-x-twitter';
        } else if (url.includes('linkedin')) {
          iconClass = 'fab fa-linkedin';
        } else if (url.includes('youtube')) {
          iconClass = 'fab fa-youtube-square';
        }

        if (iconClass) {
          const icon = document.createElement('i');
          icon.classList.add(...iconClass.split(' '));
          socialAnchor.append(icon);
        } else {
          socialAnchor.textContent = 'Link'; // Fallback text if no icon
        }
        socialLinksCvr.append(socialAnchor);
        moveInstrumentation(row, socialAnchor); // Move instrumentation for the social link row
      }
    });

    colSocial.append(socialLinksCvr);
    rowF2.append(colSocial);

    socialTitle.addEventListener('click', (e) => {
      e.preventDefault();
      socialLinksCvr.classList.toggle('active');
      socialTitle.classList.toggle('active');
      socialPlusMinus.textContent = socialLinksCvr.classList.contains('active') ? '-' : '+';
    });
  }

  // Footer Legal Links and Copyright (f3)
  const rowF3 = document.createElement('div');
  rowF3.classList.add('row', 'mt25', 'f3');
  container.append(rowF3);

  const legalCol = document.createElement('div');
  legalCol.classList.add('col-12', 'col-md-6');
  rowF3.append(legalCol);

  footerLegalLinks.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Fixed schema for legal links, use destructuring
    const link = linkCell.querySelector('a');
    if (link) {
      const legalAnchor = document.createElement('a');
      legalAnchor.href = link.href;
      legalAnchor.textContent = labelCell.textContent.trim();
      legalCol.append(legalAnchor);
      moveInstrumentation(row, legalAnchor); // Move instrumentation for the legal link row
    }
  });

  const copyrightCol = document.createElement('div');
  copyrightCol.classList.add('col-12', 'col-md-6');
  rowF3.append(copyrightCol);

  const copyrightP = document.createElement('p');
  copyrightP.classList.add('copy-txt', 'text-md-end');
  // copyrightRow.children[0] is correct here as it's the single cell of the copyright row
  copyrightP.textContent = copyrightRow.children[0].textContent.trim();
  moveInstrumentation(copyrightRow, copyrightP); // Move instrumentation for the copyright row
  copyrightCol.append(copyrightP);

  block.replaceChildren(footerWrp);
}
