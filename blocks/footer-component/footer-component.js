import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    keyLinksRow,
    addressRow,
    scannerImageRow,
    copyrightRow,
    ...sectionRows
  ] = [...block.children];

  // Main footer container
  const bhartiaxaFooterComponent = document.createElement('div');
  bhartiaxaFooterComponent.classList.add('bhartiaxa-footer-component');

  const bhartifooter = document.createElement('div');
  bhartifooter.classList.add('bhartifooter');
  bhartiaxaFooterComponent.append(bhartifooter);

  // Footer 1 - Social Icons, Contact Info (not in EDS model, hardcoded from original HTML)
  // This section is hardcoded as it's not present in the EDS model but exists in the original HTML.
  // In a real scenario, these would ideally be part of the EDS model.
  const footerSocialIcons = document.createElement('div');
  footerSocialIcons.classList.add('footer-social-icons');

  const footer1Box = document.createElement('div');
  footer1Box.classList.add('footer1-box');
  footerSocialIcons.append(footer1Box);

  const iconsBox = document.createElement('div');
  iconsBox.classList.add('icons-box');
  footer1Box.append(iconsBox);

  const socialLinks = [
    { href: 'https://www.facebook.com/BhartiAXALife', iconClass: 'icon-facebook' },
    { href: 'https://x.com/bhartiaxalife', iconClass: 'icon-twitter-x' },
    { href: 'https://www.linkedin.com/company/bharti-axa-life-insurance/?trk=top_nav_home', iconClass: 'icon-linkedin' },
    { href: 'https://www.youtube.com/c/bhartiaxalifeinsuranceindia', iconClass: 'icon-youtube' },
    { href: 'https://www.instagram.com/bhartiaxalife?utm_medium=copy_link', iconClass: 'icon-insta' },
  ];

  socialLinks.forEach((social) => {
    const a = document.createElement('a');
    a.href = social.href;
    a.target = '_blank';
    a.classList.add('footer-icons-section');
    const span = document.createElement('span');
    span.classList.add(social.iconClass, 'footer-icon');
    a.append(span);
    iconsBox.append(a);
  });

  const hr3 = document.createElement('hr');
  hr3.classList.add('footer-line3');
  footer1Box.append(hr3);

  const contactInfo = [
    { iconClass: 'icon-call-us', label: 'Call us', value: '1800-102-4444', href: 'tel:1800-102-4444', subText: 'Mon-Sat : 9 AM to 7 PM (IST)' },
    { iconClass: 'icon-email-us', label: 'Email us', value: 'service@bhartiaxa.com', href: 'mailTo:service@bhartiaxa.com' },
    { iconClass: 'icon-whatsapp-us', label: 'WhatsApp us', value: '02248815768', href: 'https://wa.me/+9102248815768', boxClass: 'footer-contact-box2' },
  ];

  contactInfo.forEach((info) => {
    const contactBox = document.createElement('div');
    contactBox.classList.add('footer-contact-box');
    if (info.boxClass) {
      const wrapperDiv = document.createElement('div');
      wrapperDiv.append(contactBox);
      contactBox.classList.add(info.boxClass);
    }

    const iconSpan = document.createElement('span');
    iconSpan.classList.add(info.iconClass, 'contact-icon');
    contactBox.append(iconSpan);

    const textDiv = document.createElement('div');
    const labelP = document.createElement('p');
    labelP.classList.add('MuiTypography-root', 'MuiTypography-body1', 'contact-text1', 'mui-fyswvn');
    labelP.textContent = info.label;
    textDiv.append(labelP);

    const valueLink = document.createElement('a');
    valueLink.classList.add('contact-text2');
    valueLink.href = info.href;
    if (info.href.startsWith('https://')) valueLink.target = '_blank';
    valueLink.textContent = info.value;
    textDiv.append(valueLink);

    if (info.subText) {
      const subTextP = document.createElement('p');
      subTextP.style.fontSize = '12px';
      subTextP.style.color = 'white';
      subTextP.textContent = info.subText;
      textDiv.append(subTextP);
    }
    contactBox.append(textDiv);
    if (info.boxClass) {
      footer1Box.append(contactBox.parentElement);
    } else {
      footer1Box.append(contactBox);
    }
  });

  block.append(footerSocialIcons);

  // Footer 2 - Sections
  const footer2Component = document.createElement('div');
  footer2Component.classList.add('footer2-component');
  bhartifooter.append(footer2Component);

  sectionRows.forEach((row) => {
    const cells = [...row.children];
    const titleCell = cells.find(cell => !cell.querySelector('ul')); // Find cell without a UL, assuming it's the title
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul')); // Find cell with a UL, assuming it's the links

    if (!titleCell || !sectionLinksCell) {
      // Handle cases where the structure might not match, though it should based on EDS model
      return;
    }

    const footerBox = document.createElement('div');
    footerBox.classList.add('footer-box');

    const title = document.createElement('h4');
    title.classList.add('footer-box-title');
    moveInstrumentation(titleCell, title);
    while (titleCell.firstChild) title.append(titleCell.firstChild);
    footerBox.append(title);

    const sectionLinksUl = sectionLinksCell.querySelector('ul');
    if (sectionLinksUl) {
      sectionLinksUl.classList.add('MuiList-root', 'MuiList-padding', 'footer-box-list', 'mui-1wduhak');
      [...sectionLinksUl.children].forEach((li) => {
        li.classList.add('MuiListItem-root', 'MuiListItem-gutters', 'MuiListItem-padding', 'footer-box-list-item', 'mui-146xefr');
        const link = li.querySelector('a');
        if (link) {
          link.classList.add('footer-listitem-link');
        }
      });
      moveInstrumentation(sectionLinksCell, sectionLinksUl);
      footerBox.append(sectionLinksUl);
    }
    footer2Component.append(footerBox);
  });

  // QR Scanner Image
  const scannerImageDiv = document.createElement('div');
  scannerImageDiv.classList.add('footer-box');
  const scannerTitle = document.createElement('h4');
  scannerTitle.classList.add('footer-box-title', 'text-center', 'mb-4');
  scannerTitle.textContent = 'Scan the QR to Download Bharti AXA Life Mobile App';
  scannerImageDiv.append(scannerTitle);

  const scannerImgContainer = document.createElement('div');
  scannerImgContainer.classList.add('footer-scanner-img');
  const scannerPicture = scannerImageRow.querySelector('picture');
  if (scannerPicture) {
    const img = scannerPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    scannerImgContainer.append(optimizedPic);
  }
  moveInstrumentation(scannerImageRow, scannerImgContainer);
  scannerImageDiv.append(scannerImgContainer);
  footer2Component.append(scannerImageDiv);

  const hr = document.createElement('hr');
  hr.classList.add('footer-line');
  bhartifooter.append(hr);

  // Footer 3 - Key Links
  const footer3Component = document.createElement('div');
  footer3Component.classList.add('footer3-component');
  bhartifooter.append(footer3Component);

  const footerKeylinks = document.createElement('div');
  footerKeylinks.classList.add('footer-keylinks');
  const keyLinksP = document.createElement('p');
  keyLinksP.classList.add('MuiTypography-root', 'MuiTypography-body1', 'footer-keylinks-text', 'mui-fyswvn');
  moveInstrumentation(keyLinksRow, keyLinksP);

  const keyLinksContent = keyLinksRow.querySelector('div').innerHTML;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = keyLinksContent;
  [...tempDiv.querySelectorAll('a')].forEach((link) => {
    link.classList.add('footer-keylinks-link');
  });
  keyLinksP.innerHTML = tempDiv.innerHTML;
  footerKeylinks.append(keyLinksP);
  footer3Component.append(footerKeylinks);

  const hr1 = document.createElement('hr');
  hr1.classList.add('footer-line');
  bhartifooter.append(hr1);

  // Footer 4 - Address
  const footer4Component = document.createElement('div');
  footer4Component.classList.add('footer4-component');
  bhartifooter.append(footer4Component);

  const bhartiaxaAddress = document.createElement('div');
  bhartiaxaAddress.classList.add('bhartiaxa-address');
  const footerAddress = document.createElement('div');
  footerAddress.classList.add('footer-address');
  moveInstrumentation(addressRow, footerAddress);

  const addressContentDiv = addressRow.querySelector('div');
  [...addressContentDiv.children].forEach((child) => {
    if (child.tagName === 'P') {
      if (child.textContent.includes('Regd. Address')) {
        child.classList.add('address-text1');
      } else if (child.textContent.includes('Bharti AXA Life Insurance Company Limited')) {
        child.classList.add('address-text1');
      } else if (child.textContent.includes('IRDAI Notice on Spurious Calls')) {
        child.classList.add('footer-irdai');
        const link = child.querySelector('a');
        if (link) link.classList.add('footer-keylinks-link'); // Reusing a similar link class
      } else if (child.textContent.includes('BEWARE OF SPURIOUS PHONE CALLS')) {
        child.classList.add('footer-address-text');
      } else if (child.textContent.includes('IRDAI is not involved')) {
        child.classList.add('footer-address-text2');
      } else {
        child.classList.add('address-text2');
      }
    }
    footerAddress.append(child);
  });
  bhartiaxaAddress.append(footerAddress);
  footer4Component.append(bhartiaxaAddress);

  const hr2 = document.createElement('hr');
  hr2.classList.add('footer-line2');
  bhartifooter.append(hr2);

  // Footer 5 - Copyright and Logo
  const footer5Component = document.createElement('div');
  footer5Component.classList.add('footer5-component');
  bhartifooter.append(footer5Component);

  const copyrightP = document.createElement('p');
  copyrightP.classList.add('MuiTypography-root', 'MuiTypography-body1', 'footer5-copyright', 'mui-fyswvn');
  moveInstrumentation(copyrightRow, copyrightP);
  while (copyrightRow.firstChild) copyrightP.append(copyrightRow.firstChild);
  footer5Component.append(copyrightP);

  const logoLink = document.createElement('a');
  logoLink.href = '/';
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '158' }]);
    optimizedPic.classList.add('footer5-img');
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
  }
  moveInstrumentation(logoRow, logoLink);
  footer5Component.append(logoLink);

  block.textContent = '';
  block.append(bhartiaxaFooterComponent);

  // Optimize all images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
