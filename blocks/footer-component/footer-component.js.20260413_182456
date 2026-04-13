import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const footerAddressRow = children[0];
  const footerLogoRow = children[1];
  const footerCopyrightRow = children[2];
  const footerScannerImageRow = children[3];

  const itemRows = children.slice(4);

  // Use content detection instead of direct index access for item rows
  const socialIconRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[0].querySelector('a') && cells[1].querySelector('a') && cells[2].textContent;
  });
  const contactMethodRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 4 && cells[0].textContent && cells[1].querySelector('a') && cells[2].querySelector('a') && cells[3].textContent;
  });
  const sectionRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 4 && cells[0].textContent && cells[1].querySelector('a') && cells[2].querySelector('a') && cells[3].querySelector('ul');
  });
  const keyLinkRows = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && cells[0].querySelector('a') && cells[1].querySelector('a');
  });

  block.textContent = '';

  const footerSocialIcons = document.createElement('div');
  footerSocialIcons.classList.add('footer-social-icons');
  const footer1Box = document.createElement('div');
  footer1Box.classList.add('footer1-box');
  const iconsBox = document.createElement('div');
  iconsBox.classList.add('icons-box');

  socialIconRows.forEach((row) => {
    const cells = [...row.children];
    const iconLinkCell = cells.find(cell => cell.querySelector('a'));
    const iconLinkLabelCell = cells.find(cell => cell !== iconLinkCell && cell.querySelector('a')); // Assuming label is also a link
    const iconTypeCell = cells.find(cell => cell !== iconLinkCell && cell !== iconLinkLabelCell && cell.textContent);

    const anchor = document.createElement('a');
    anchor.classList.add('footer-icons-section');
    const foundLink = iconLinkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.target = '_blank'; // Assuming social links open in new tab
    }
    const span = document.createElement('span');
    span.classList.add(`icon-${iconTypeCell.textContent.trim().toLowerCase()}`, 'footer-icon');
    anchor.append(span);
    moveInstrumentation(row, anchor);
    iconsBox.append(anchor);
  });
  footer1Box.append(iconsBox);

  const footerLine3 = document.createElement('hr');
  footerLine3.classList.add('footer-line3');
  footer1Box.append(footerLine3);

  const contactMethodContainers = document.createElement('div'); // A container for contact methods

  contactMethodRows.forEach((row) => {
    const cells = [...row.children];
    const contactTypeCell = cells.find(cell => cell.textContent && !cell.querySelector('a'));
    const contactLinkCell = cells.find(cell => cell.querySelector('a'));
    const contactLinkLabelCell = cells.find(cell => cell !== contactTypeCell && cell !== contactLinkCell && cell.querySelector('a'));
    const contactTextCell = cells.find(cell => cell !== contactTypeCell && cell !== contactLinkCell && cell !== contactLinkLabelCell && cell.textContent);

    const footerContactBox = document.createElement('div');
    footerContactBox.classList.add('footer-contact-box');
    const span = document.createElement('span');
    span.classList.add(`icon-${contactTypeCell.textContent.trim().toLowerCase()}`, 'contact-icon');
    footerContactBox.append(span);

    const textContentDiv = document.createElement('div');
    const p1 = document.createElement('p');
    p1.classList.add('MuiTypography-root', 'MuiTypography-body1', 'contact-text1', 'mui-fyswvn');
    p1.textContent = contactTypeCell.textContent.trim();
    textContentDiv.append(p1);

    const anchor = document.createElement('a');
    anchor.classList.add('contact-text2');
    const foundLink = contactLinkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.textContent = contactLinkLabelCell.textContent.trim();
      if (contactTypeCell.textContent.trim().toLowerCase() === 'whatsapp us') {
        footerContactBox.classList.add('footer-contact-box2');
        anchor.target = '_blank';
      }
    }
    textContentDiv.append(anchor);

    if (contactTextCell && contactTextCell.textContent.trim()) {
      const p2 = document.createElement('p');
      p2.style.fontSize = '12px'; // Directly from original HTML, no class
      p2.style.color = 'white'; // Directly from original HTML, no class
      p2.textContent = contactTextCell.textContent.trim();
      textContentDiv.append(p2);
    }
    footerContactBox.append(textContentDiv);
    moveInstrumentation(row, footerContactBox);
    contactMethodContainers.append(footerContactBox);
  });
  footer1Box.append(contactMethodContainers);
  footerSocialIcons.append(footer1Box);
  block.append(footerSocialIcons);

  const bhartiaxaFooterComponent = document.createElement('div');
  bhartiaxaFooterComponent.classList.add('bhartiaxa-footer-component');
  const bhartifooter = document.createElement('div');
  bhartifooter.classList.add('bhartifooter');
  const footer2Component = document.createElement('div');
  footer2Component.classList.add('footer2-component');

  sectionRows.forEach((row) => {
    const cells = [...row.children];
    const sectionTitleCell = cells.find(cell => cell.textContent && !cell.querySelector('a'));
    const sectionTitleLinkCell = cells.find(cell => cell.querySelector('a'));
    const sectionTitleLinkLabelCell = cells.find(cell => cell !== sectionTitleCell && cell !== sectionTitleLinkCell && cell.querySelector('a'));
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul'));

    const footerBox = document.createElement('div');
    footerBox.classList.add('footer-box');

    const h4 = document.createElement('h4');
    h4.classList.add('footer-box-title');
    const sectionTitleLink = sectionTitleLinkCell.querySelector('a');
    if (sectionTitleLink) {
      const titleAnchor = document.createElement('a');
      titleAnchor.href = sectionTitleLink.href;
      titleAnchor.style.color = 'white';
      titleAnchor.style.textDecoration = 'none';
      titleAnchor.textContent = sectionTitleLinkLabelCell.textContent.trim();
      h4.append(titleAnchor);
    } else {
      h4.textContent = sectionTitleCell.textContent.trim();
    }
    footerBox.append(h4);

    const ul = sectionLinksCell.querySelector('ul');
    if (ul) {
      ul.classList.add('MuiList-root', 'MuiList-padding', 'footer-box-list', 'mui-1wduhak');
      [...ul.children].forEach((li) => {
        li.classList.add('MuiListItem-root', 'MuiListItem-gutters', 'MuiListItem-padding', 'footer-box-list-item', 'mui-146xefr');
        const link = li.querySelector('a');
        if (link) {
          link.classList.add('footer-listitem-link');
          link.target = '_self'; // Default target
        }
      });
      footerBox.append(ul);
    }
    moveInstrumentation(row, footerBox);
    footer2Component.append(footerBox);
  });

  const scannerBox = document.createElement('div');
  scannerBox.classList.add('footer-box');
  const scannerH4 = document.createElement('h4');
  scannerH4.classList.add('footer-box-title', 'text-center', 'mb-4');
  scannerH4.textContent = 'Scan the QR to Download Bharti AXA Life Mobile App';
  scannerBox.append(scannerH4);

  const footerScannerImgDiv = document.createElement('div');
  footerScannerImgDiv.classList.add('footer-scanner-img');
  const scannerPicture = footerScannerImageRow.querySelector('picture');
  if (scannerPicture) {
    const img = scannerPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    footerScannerImgDiv.append(optimizedPic);
  }
  scannerBox.append(footerScannerImgDiv);
  moveInstrumentation(footerScannerImageRow, scannerBox);
  footer2Component.append(scannerBox);

  bhartifooter.append(footer2Component);

  const footerLine = document.createElement('hr');
  footerLine.classList.add('footer-line');
  bhartifooter.append(footerLine);

  const footer3Component = document.createElement('div');
  footer3Component.classList.add('footer3-component');
  const footerKeylinks = document.createElement('div');
  footerKeylinks.classList.add('footer-keylinks');
  const keyLinksP = document.createElement('p');
  keyLinksP.classList.add('MuiTypography-root', 'MuiTypography-body1', 'footer-keylinks-text', 'mui-fyswvn');

  keyLinkRows.forEach((row, index) => {
    const cells = [...row.children];
    const keyLinkCell = cells.find(cell => cell.querySelector('a'));
    const keyLinkLabelCell = cells.find(cell => cell !== keyLinkCell && cell.querySelector('a'));

    const span = document.createElement('span');
    const anchor = document.createElement('a');
    anchor.classList.add('footer-keylinks-link');
    const foundLink = keyLinkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
      anchor.textContent = keyLinkLabelCell.textContent.trim();
    }
    span.append(anchor);
    if (index < keyLinkRows.length - 1) {
      const spaceSpan = document.createElement('span');
      spaceSpan.classList.add('footer-keylinks-space');
      spaceSpan.textContent = '|';
      span.append(spaceSpan);
    }
    moveInstrumentation(row, span);
    keyLinksP.append(span);
  });
  footerKeylinks.append(keyLinksP);
  footer3Component.append(footerKeylinks);
  bhartifooter.append(footer3Component);

  const footerLine4 = document.createElement('hr');
  footerLine4.classList.add('footer-line');
  bhartifooter.append(footerLine4);

  const footer4Component = document.createElement('div');
  footer4Component.classList.add('footer4-component');
  const bhartiaxaAddress = document.createElement('div');
  bhartiaxaAddress.classList.add('bhartiaxa-address');
  const footerAddressDiv = document.createElement('div');
  footerAddressDiv.classList.add('footer-address');
  moveInstrumentation(footerAddressRow, footerAddressDiv);
  while (footerAddressRow.firstChild) {
    const child = footerAddressRow.firstChild;
    if (child.tagName === 'P') {
      if (child.textContent.includes('Regd. Address')) {
        child.classList.add('address-text1');
      } else if (child.textContent.includes('Bharti AXA Life Insurance Company Limited')) {
        child.classList.add('address-text1');
      } else if (child.textContent.includes('IRDA Reg. No.') || child.textContent.includes('CIN -') || child.textContent.includes('PAN:') || child.textContent.includes('GST No.:') || child.textContent.includes('For further details') || child.textContent.includes('*Source:') || child.textContent.includes('Bharti AXA Life has partnered')) {
        child.classList.add('address-text2');
      } else if (child.textContent.includes('IRDAI Notice on Spurious Calls')) {
        child.classList.add('footer-irdai');
      } else if (child.textContent.includes('BEWARE OF SPURIOUS PHONE CALLS')) {
        child.classList.add('footer-address-text');
      } else if (child.textContent.includes('IRDAI is not involved')) {
        child.classList.add('footer-address-text2');
      }
    }
    footerAddressDiv.append(child);
  }

  // Add the hardcoded image elements for Bharti and AXA logos as per original HTML
  const pWithImages = document.createElement('p');
  pWithImages.classList.add('address-text2');
  pWithImages.innerHTML = `Trade Logos <img class="bharti-img-footer" alt="Bharti AXA Life Insurance Company Ltd." height="21" loading="lazy" src="/content/dam/aemigrate/uploaded-folder/image/bharati-small-logo.png" title="Bharti AXA Life Insurance Logo" width="34"> and <img class="bharti-img-footer" alt="Bharti AXA Life Insurance" height="21" loading="lazy" src="/content/dam/aemigrate/uploaded-folder/image/axa-small-logo.png" title="AXA Logo" width="21"> used belong to the Bharti Enterprises (Holdings) Private Ltd. and AXA SA respectively and are used by Bharti AXA Life Insurance under license.`;
  footerAddressDiv.append(pWithImages);

  bhartiaxaAddress.append(footerAddressDiv);
  footer4Component.append(bhartiaxaAddress);
  bhartifooter.append(footer4Component);

  const footerLine2 = document.createElement('hr');
  footerLine2.classList.add('footer-line2');
  bhartifooter.append(footerLine2);

  const footer5Component = document.createElement('div');
  footer5Component.classList.add('footer5-component');

  const copyrightP = document.createElement('p');
  copyrightP.classList.add('MuiTypography-root', 'MuiTypography-body1', 'footer5-copyright', 'mui-fyswvn');
  moveInstrumentation(footerCopyrightRow, copyrightP);
  copyrightP.textContent = footerCopyrightRow.textContent.trim();
  footer5Component.append(copyrightP);

  const logoAnchor = document.createElement('a');
  logoAnchor.href = '/';
  const logoPicture = footerLogoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '158' }]);
    const optimizedImg = optimizedPic.querySelector('img');
    optimizedImg.classList.add('footer5-img');
    optimizedImg.title = 'Bharti AXA Life Insurance Logo'; // From original HTML
    optimizedImg.width = '158'; // From original HTML
    optimizedImg.height = '59'; // From original HTML
    moveInstrumentation(img, optimizedImg);
    logoAnchor.append(optimizedPic);
  }
  moveInstrumentation(footerLogoRow, logoAnchor);
  footer5Component.append(logoAnchor);
  bhartifooter.append(footer5Component);

  bhartiaxaFooterComponent.append(bhartifooter);
  block.append(bhartiaxaFooterComponent);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
