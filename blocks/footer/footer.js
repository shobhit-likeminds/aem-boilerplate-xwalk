import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Destructure the first two rows (logo and copyright)
  const [logoRow, copyrightRow, ...itemRows] = children;

  const sectionRows = [];
  const legalLinkRows = [];
  const socialLinkRows = [];

  // Separate item rows based on cell count and content
  itemRows.forEach((row) => {
    if (row.children.length === 3) {
      sectionRows.push(row);
    } else if (row.children.length === 2) {
      legalLinkRows.push(row);
    } else if (row.children.length === 1 && row.querySelector('a')) {
      socialLinkRows.push(row);
    }
  });

  const footerWrp = document.createElement('section');
  footerWrp.classList.add('footer-wrp');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  // Logo
  const mobLogoWr = document.createElement('div');
  mobLogoWr.classList.add('mob-logo-wr');
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    // moveInstrumentation for the img element inside the optimized picture
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    mobLogoWr.append(optimizedPic);
  }
  moveInstrumentation(logoRow, mobLogoWr);
  container.append(mobLogoWr);

  // Section Links (f1 row)
  const f1Row = document.createElement('div');
  f1Row.classList.add('row', 'f1');

  sectionRows.forEach((row) => {
    const [titleCell, linkCell, sectionLinksCell] = [...row.children];
    const subList = sectionLinksCell?.querySelector('ul');
    const directHref = linkCell?.querySelector('a')?.href;

    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3');

    if (subList) {
      const titleLink = document.createElement('a');
      titleLink.href = 'javascript:void(0)';
      titleLink.classList.add('ttle', 'accordion_head2');
      titleLink.textContent = titleCell.textContent.trim();

      const plusminusSpan = document.createElement('span');
      plusminusSpan.classList.add('plusminus2');
      plusminusSpan.textContent = '+';
      titleLink.append(plusminusSpan);

      const ftrSubLinksCvr = document.createElement('div');
      ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');

      [...subList.querySelectorAll('li')].forEach((li) => {
        const anchor = li.querySelector('a');
        if (anchor) {
          const link = document.createElement('a');
          link.href = anchor.href;
          link.textContent = anchor.textContent.trim();
          link.classList.add('ftr-link');
          ftrSubLinksCvr.append(link);
        }
      });

      titleLink.addEventListener('click', (e) => {
        e.preventDefault();
        col.classList.toggle('active');
        ftrSubLinksCvr.classList.toggle('active');
        plusminusSpan.textContent = ftrSubLinksCvr.classList.contains('active') ? '-' : '+';
      });

      moveInstrumentation(row, col);
      col.append(titleLink, ftrSubLinksCvr);
    } else {
      const anchor = document.createElement('a');
      if (directHref) anchor.href = directHref;
      anchor.textContent = titleCell.textContent.trim();
      anchor.classList.add('ttle');
      moveInstrumentation(row, anchor);
      col.append(anchor);
    }
    f1Row.append(col);
  });
  container.append(f1Row);

  // Social Links (f2 row)
  if (socialLinkRows.length > 0) {
    const f2Row = document.createElement('div');
    f2Row.classList.add('row', 'f2', 'justify-content-between');

    const socialCol = document.createElement('div');
    socialCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');

    // The "Social Media" title is not a separate row in the model, it's a hardcoded label.
    // If it were dynamic, it would be a text cell in a dedicated row.
    const socialTitle = document.createElement('p');
    socialTitle.classList.add('ttle', 'accordion_head2');
    socialTitle.textContent = 'Social Media'; // Hardcoded as per original HTML structure
    const socialPlusminusSpan = document.createElement('span');
    socialPlusminusSpan.classList.add('plusminus2');
    socialPlusminusSpan.textContent = '+';
    socialTitle.append(socialPlusminusSpan);

    const socialLinksCvr = document.createElement('div');
    socialLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');

    socialLinkRows.forEach((row) => {
      const [socialLinkCell] = [...row.children]; // Destructuring for fixed schema
      const foundLink = socialLinkCell?.querySelector('a');
      if (foundLink) {
        const link = document.createElement('a');
        link.href = foundLink.href;
        link.classList.add('ftr-link');
        link.target = '_blank'; // Assuming social links open in new tab
        // Add font awesome icons based on href or text content if available
        if (foundLink.href.includes('facebook')) {
          link.innerHTML = '<i class="fab fa-facebook-square"></i>';
        } else if (foundLink.href.includes('instagram')) {
          link.innerHTML = '<i class="fab fa-instagram"></i>';
        } else if (foundLink.href.includes('twitter')) {
          link.innerHTML = '<i class="fa-brands fa-square-x-twitter"></i>';
        } else if (foundLink.href.includes('linkedin')) {
          link.innerHTML = '<i class="fab fa-linkedin"></i>';
        } else if (foundLink.href.includes('youtube')) {
          link.innerHTML = '<i class="fab fa-youtube-square"></i>';
        } else {
          link.textContent = foundLink.href; // Fallback to URL if no icon match
        }
        moveInstrumentation(row, link);
        socialLinksCvr.append(link);
      }
    });

    socialTitle.addEventListener('click', (e) => {
      e.preventDefault();
      socialCol.classList.toggle('active');
      socialLinksCvr.classList.toggle('active');
      socialPlusminusSpan.textContent = socialLinksCvr.classList.contains('active') ? '-' : '+';
    });

    socialCol.append(socialTitle, socialLinksCvr);
    f2Row.append(socialCol);
    container.append(f2Row);
  }

  // Legal Links and Copyright (f3 row)
  const f3Row = document.createElement('div');
  f3Row.classList.add('row', 'mt25', 'f3');

  const legalCol = document.createElement('div');
  legalCol.classList.add('col-12', 'col-md-6');
  legalLinkRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children]; // Destructuring for fixed schema
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      const link = document.createElement('a');
      link.href = foundLink.href;
      link.textContent = labelCell.textContent.trim();
      moveInstrumentation(row, link);
      legalCol.append(link);
    }
  });

  const copyrightCol = document.createElement('div');
  copyrightCol.classList.add('col-12', 'col-md-6');
  const copyrightText = document.createElement('p');
  copyrightText.classList.add('copy-txt', 'text-md-end');
  // Access the first child (cell) of the copyrightRow
  copyrightText.innerHTML = copyrightRow.children[0]?.innerHTML || '';
  moveInstrumentation(copyrightRow, copyrightText);
  copyrightCol.append(copyrightText);

  f3Row.append(legalCol, copyrightCol);
  container.append(f3Row);

  footerWrp.append(container);
  block.replaceChildren(footerWrp);
}
