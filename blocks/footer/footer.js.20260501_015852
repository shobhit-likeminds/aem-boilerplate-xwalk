import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Root-level rows (order matters for logo and copyright, others are filtered)
  const logoRow = children.find(row => row.querySelector('picture'));
  const copyrightRow = children.find(row => row.children.length === 1 && !row.querySelector('picture') && !row.querySelector('a'));

  // Item rows (distinguished by cell count and content)
  const footerSectionItems = children.filter(row => row.children.length === 2 && !row.querySelector('a'));
  const socialLinkItems = children.filter(row => row.children.length === 1 && row.querySelector('a'));
  const footerLinkItems = children.filter(row => row.children.length === 2 && row.querySelector('a'));

  const section = document.createElement('section');
  section.classList.add('footer-wrp');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');

  // Mobile Logo Wrapper
  const mobLogoWr = document.createElement('div');
  mobLogoWr.classList.add('mob-logo-wr');
  if (logoRow) {
    const picture = logoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(logoRow, optimizedPic.querySelector('img'));
      mobLogoWr.append(optimizedPic);
    }
  }
  container.append(mobLogoWr);

  // Footer Sections (f1)
  const f1Row = document.createElement('div');
  f1Row.classList.add('row', 'f1');

  footerSectionItems.forEach((row) => {
    const [sectionTitleCell, sectionLinksCell] = [...row.children]; // FIXED: Destructuring for fixed schema
    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3');

    const titleLink = document.createElement('a');
    titleLink.classList.add('ttle', 'accordion_head2');
    titleLink.href = 'javascript:void(0)'; // As per original HTML
    titleLink.textContent = sectionTitleCell?.textContent.trim() || '';

    const plusMinus = document.createElement('span');
    plusMinus.classList.add('plusminus2');
    plusMinus.textContent = '+';
    titleLink.append(plusMinus);

    const subLinksCvr = document.createElement('div');
    subLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');
    subLinksCvr.innerHTML = sectionLinksCell?.innerHTML || ''; // richtext field, use innerHTML

    titleLink.addEventListener('click', () => {
      subLinksCvr.classList.toggle('active');
      plusMinus.textContent = subLinksCvr.classList.contains('active') ? '-' : '+';
    });

    moveInstrumentation(row, col);
    col.append(titleLink, subLinksCvr);
    f1Row.append(col);
  });
  container.append(f1Row);

  // Social Media Links (f2)
  if (socialLinkItems.length > 0) {
    const f2Row = document.createElement('div');
    f2Row.classList.add('row', 'f2', 'justify-content-between');

    const socialCol = document.createElement('div');
    socialCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');

    const socialTitle = document.createElement('p');
    socialTitle.classList.add('ttle', 'accordion_head2');
    socialTitle.textContent = 'Social Media'; // Hardcoded as per original HTML structure
    const socialPlusMinus = document.createElement('span');
    socialPlusMinus.classList.add('plusminus2');
    socialPlusMinus.textContent = '+';
    socialTitle.append(socialPlusMinus);

    const socialIconsCvr = document.createElement('div');
    socialIconsCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');

    socialLinkItems.forEach((row) => {
      const [linkCell] = [...row.children]; // FIXED: Destructuring for fixed schema
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) {
        const socialLink = document.createElement('a');
        socialLink.href = foundLink.href;
        socialLink.classList.add('ftr-link');
        socialLink.target = '_blank'; // As per original HTML

        // Add dummy icons as per rule 16. Original HTML uses font-awesome which is not available
        let iconClasses = ['fa-link']; // Default icon
        if (foundLink.href.includes('facebook')) iconClasses = ['fab', 'fa-facebook-square'];
        else if (foundLink.href.includes('instagram')) iconClasses = ['fab', 'fa-instagram'];
        else if (foundLink.href.includes('twitter')) iconClasses = ['fa-brands', 'fa-square-x-twitter'];
        else if (foundLink.href.includes('linkedin')) iconClasses = ['fab', 'fa-linkedin'];
        else if (foundLink.href.includes('youtube')) iconClasses = ['fab', 'fa-youtube-square'];

        const icon = document.createElement('i');
        icon.classList.add(...iconClasses); // FIXED: Corrected icon classes to match original HTML
        socialLink.append(icon);
        moveInstrumentation(row, socialLink);
        socialIconsCvr.append(socialLink);
      }
    });

    socialTitle.addEventListener('click', () => {
      socialIconsCvr.classList.toggle('active');
      socialPlusMinus.textContent = socialIconsCvr.classList.contains('active') ? '-' : '+';
    });

    socialCol.append(socialTitle, socialIconsCvr);
    f2Row.append(socialCol);
    container.append(f2Row);
  }

  // Footer Bottom Links & Copyright (f3)
  const f3Row = document.createElement('div');
  f3Row.classList.add('row', 'mt25', 'f3');

  const bottomLinksCol = document.createElement('div');
  bottomLinksCol.classList.add('col-12', 'col-md-6');

  footerLinkItems.forEach((row) => {
    const [linkCell, labelCell] = [...row.children]; // FIXED: Destructuring for fixed schema
    const link = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) link.href = foundLink.href;
    link.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, link);
    bottomLinksCol.append(link);
  });
  f3Row.append(bottomLinksCol);

  const copyrightCol = document.createElement('div');
  copyrightCol.classList.add('col-12', 'col-md-6');
  const copyrightP = document.createElement('p');
  copyrightP.classList.add('copy-txt', 'text-md-end');
  if (copyrightRow) {
    moveInstrumentation(copyrightRow, copyrightP);
    const [copyrightCell] = [...copyrightRow.children]; // FIXED: Destructuring for fixed schema
    copyrightP.innerHTML = copyrightCell?.innerHTML || ''; // richtext field, use innerHTML
  }
  copyrightCol.append(copyrightP);
  f3Row.append(copyrightCol);
  container.append(f3Row);

  section.append(container);
  block.replaceChildren(section);
}
