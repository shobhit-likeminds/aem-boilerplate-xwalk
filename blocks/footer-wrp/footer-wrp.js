import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Cell-count-based categorization — each item type has a distinct cell count:
  //   1-cell picture        → logo (root field)
  //   1-cell © text         → copyright (root field)
  //   1-cell anchor         → footer-social-item (1 field)
  //   3-cell                → footer-section-item: title | directLink | sectionLinks(richtext)
  //   2-cell                → footer-link-item: label | link (legal links)
  let logoRow = null;
  let copyrightRow = null;
  const navSectionRows = [];
  const socialLinkRows = [];
  const legalLinkRows = [];

  children.forEach((row) => {
    if (!logoRow && row.children.length === 1 && row.querySelector('picture')) {
      logoRow = row;
      return;
    }
    if (
      row.children.length === 1
      && !row.querySelector('a')
      && !row.querySelector('picture')
      && row.textContent.trim().startsWith('©')
    ) {
      copyrightRow = row;
      return;
    }
    if (row.children.length === 1 && row.querySelector('a') && !row.querySelector('picture')) {
      socialLinkRows.push(row);
      return;
    }
    if (row.children.length >= 3) {
      navSectionRows.push(row);
      return;
    }
    if (row.children.length === 2) {
      legalLinkRows.push(row);
    }
  });

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  const mobLogoWr = document.createElement('div');
  mobLogoWr.classList.add('mob-logo-wr');
  if (logoRow) {
    const picture = logoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobLogoWr.append(optimizedPic);
    }
    moveInstrumentation(logoRow, mobLogoWr);
  }
  container.append(mobLogoWr);

  const row1 = document.createElement('div');
  row1.classList.add('row', 'f1');

  navSectionRows.forEach((row) => {
    const [titleCell, linkCell, sectionLinksCell] = [...row.children];
    const titleText = titleCell.textContent.trim();
    const subList = sectionLinksCell?.querySelector('ul');
    const directHref = linkCell?.querySelector('a')?.href;

    const sectionCol = document.createElement('div');
    sectionCol.classList.add('col', 'col-xl-3');

    if (subList) {
      // Dropdown accordion section — sectionLinks richtext contains sub-links
      const titleLink = document.createElement('a');
      titleLink.href = 'javascript:void(0)';
      titleLink.classList.add('ttle', 'accordion_head2');
      titleLink.textContent = titleText;
      const plusMinus = document.createElement('span');
      plusMinus.classList.add('plusminus2');
      plusMinus.textContent = '+';
      titleLink.append(plusMinus);

      const subLinksCvr = document.createElement('div');
      subLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');

      [...subList.querySelectorAll('a')].forEach((anchor) => {
        const link = document.createElement('a');
        link.href = anchor.href;
        link.textContent = anchor.textContent.trim();
        link.classList.add('ftr-link');
        subLinksCvr.append(link);
      });

      sectionCol.append(titleLink, subLinksCvr);
      titleLink.addEventListener('click', () => {
        subLinksCvr.classList.toggle('accordion_body2');
        plusMinus.textContent = subLinksCvr.classList.contains('accordion_body2') ? '+' : '-';
      });
    } else {
      // Simple top-level link — no sub-links, directLink cell has the URL
      const link = document.createElement('a');
      if (directHref) link.href = directHref;
      link.textContent = titleText;
      link.classList.add('ttle');
      sectionCol.append(link);
    }

    moveInstrumentation(row, sectionCol);
    row1.append(sectionCol);
  });

  container.append(row1);

  const row2 = document.createElement('div');
  row2.classList.add('row', 'f2', 'justify-content-between');

  const socialCol = document.createElement('div');
  socialCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');

  const socialTitle = document.createElement('p');
  socialTitle.classList.add('ttle', 'accordion_head2');
  socialTitle.textContent = 'Social Media';
  const socialPlusMinus = document.createElement('span');
  socialPlusMinus.classList.add('plusminus2');
  socialPlusMinus.textContent = '+';
  socialTitle.append(socialPlusMinus);

  const socialLinksCvr = document.createElement('div');
  socialLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');

  socialLinkRows.forEach((row) => {
    const [socialLinkCell] = [...row.children];
    const link = document.createElement('a');
    const foundLink = socialLinkCell.querySelector('a');
    if (foundLink) {
      link.href = foundLink.href;
      link.target = '_blank';
    }
    const icon = document.createElement('i');
    if (link.href.includes('facebook')) icon.classList.add('fab', 'fa-facebook-square');
    else if (link.href.includes('instagram')) icon.classList.add('fab', 'fa-instagram');
    else if (link.href.includes('twitter')) icon.classList.add('fa-brands', 'fa-square-x-twitter');
    else if (link.href.includes('linkedin')) icon.classList.add('fab', 'fa-linkedin');
    else if (link.href.includes('youtube')) icon.classList.add('fab', 'fa-youtube-square');
    link.append(icon);
    link.classList.add('ftr-link');
    moveInstrumentation(row, link);
    socialLinksCvr.append(link);
  });

  socialCol.append(socialTitle, socialLinksCvr);
  row2.append(socialCol);

  socialTitle.addEventListener('click', () => {
    socialLinksCvr.classList.toggle('accordion_body2');
    socialPlusMinus.textContent = socialLinksCvr.classList.contains('accordion_body2') ? '+' : '-';
  });

  container.append(row2);

  const row3 = document.createElement('div');
  row3.classList.add('row', 'mt25', 'f3');

  const legalCol = document.createElement('div');
  legalCol.classList.add('col-12', 'col-md-6');
  legalLinkRows.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const link = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) link.href = foundLink.href;
    link.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, link);
    legalCol.append(link);
  });
  row3.append(legalCol);

  const copyrightCol = document.createElement('div');
  copyrightCol.classList.add('col-12', 'col-md-6');
  const copyrightP = document.createElement('p');
  copyrightP.classList.add('copy-txt', 'text-md-end');
  if (copyrightRow) {
    const [copyrightCell] = [...copyrightRow.children];
    copyrightP.textContent = copyrightCell.textContent.trim();
    moveInstrumentation(copyrightRow, copyrightP);
  }
  copyrightCol.append(copyrightP);
  row3.append(copyrightCol);

  container.append(row3);

  block.replaceChildren(container);
}
