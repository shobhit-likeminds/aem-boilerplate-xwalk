import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...footerSectionRows] = [...block.children];

  block.classList.add('hidden-xs');

  const footerTop = document.createElement('div');
  footerTop.classList.add('footer-top');

  const container = document.createElement('div');
  container.classList.add('container');

  const column = document.createElement('div');
  column.classList.add('column');

  // Logo section
  const logoColumElement = document.createElement('div');
  logoColumElement.classList.add('colum-element');

  const logoLink = document.createElement('a');
  logoLink.classList.add('logo');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  logoLink.rel = 'home';

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '94' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('lazyloaded');
      logoLink.appendChild(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, logoLink);
  moveInstrumentation(logoLinkRow, logoLink);
  moveInstrumentation(logoLinkLabelRow, logoLink); // Logo Link Label is not used in original HTML, but instrumented.

  logoColumElement.appendChild(logoLink);
  column.appendChild(logoColumElement);

  // Footer sections
  const footerSections = [];
  let currentSection = [];
  footerSectionRows.forEach((row) => {
    // Use content detection instead of index access for flexibility
    const cells = [...row.children];
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul')); // Find cell with UL for section links
    const titleCell = cells.find(cell => !cell.querySelector('ul') && cell.textContent.trim()); // Find cell with plain text title

    if (sectionLinksCell) {
      // This is a section with a list of links
      if (currentSection.length > 0) {
        footerSections.push(currentSection);
        currentSection = [];
      }
      currentSection.push(row);
    } else {
      // This is a plain title or a single link, group it with previous section if it exists
      currentSection.push(row);
    }
  });
  if (currentSection.length > 0) {
    footerSections.push(currentSection);
  }

  footerSections.forEach((sectionRows) => {
    const sectionColumElement = document.createElement('div');
    sectionColumElement.classList.add('colum-element');

    sectionRows.forEach((row) => {
      // Use content detection for cells within each section row
      const cells = [...row.children];
      const sectionLinksCell = cells.find(cell => cell.querySelector('ul'));
      const titleCell = cells.find(cell => !cell.querySelector('ul') && cell.textContent.trim());
      const singleLinkCell = cells.find(cell => cell.querySelector('a') && !cell.querySelector('ul'));

      if (sectionLinksCell) {
        const sectionLinksUl = sectionLinksCell.querySelector('ul');
        const ul = document.createElement('ul');
        const titleLi = document.createElement('li');
        titleLi.classList.add('title');
        titleLi.textContent = titleCell ? titleCell.textContent.trim() : ''; // Ensure titleCell exists
        ul.appendChild(titleLi);

        [...sectionLinksUl.children].forEach((li) => {
          const a = li.querySelector('a');
          if (a) {
            const newLi = document.createElement('li');
            const newA = document.createElement('a');
            newA.href = a.href;
            newA.textContent = a.textContent.trim();
            // Check for target="_blank" from original HTML, if any
            if (a.target) newA.target = a.target;
            newLi.appendChild(newA);
            ul.appendChild(newLi);
          } else {
            // Handle plain text li elements
            const newLi = document.createElement('li');
            newLi.innerHTML = li.innerHTML;
            ul.appendChild(newLi);
          }
        });
        moveInstrumentation(row, ul);
        sectionColumElement.appendChild(ul);
      } else if (singleLinkCell) {
        // This is a single link, possibly styled as a title
        const div = document.createElement('div');
        div.classList.add('title');
        const a = document.createElement('a');
        a.href = singleLinkCell.querySelector('a').href;
        a.textContent = titleCell ? titleCell.textContent.trim() : singleLinkCell.querySelector('a').textContent.trim();
        if (singleLinkCell.querySelector('a').target) a.target = singleLinkCell.querySelector('a').target;
        div.appendChild(a);
        moveInstrumentation(row, div);
        sectionColumElement.appendChild(div);
      } else if (titleCell) {
        // This is a plain title
        const div = document.createElement('div');
        div.classList.add('title');
        div.textContent = titleCell.textContent.trim();
        moveInstrumentation(row, div);
        sectionColumElement.appendChild(div);
      }
    });
    column.appendChild(sectionColumElement);
  });

  // Follow Us section (hardcoded based on original HTML structure for classes)
  const followUsColumElement = document.createElement('div');
  followUsColumElement.classList.add('colum-element');

  const contactUsDiv = document.createElement('div');
  contactUsDiv.classList.add('title');
  const contactUsLink = document.createElement('a');
  contactUsLink.href = 'https://www.jsw.in/groups/contact-us';
  contactUsLink.target = '_blank';
  contactUsLink.textContent = 'CONTACT US';
  contactUsDiv.appendChild(contactUsLink);
  followUsColumElement.appendChild(contactUsDiv);

  const followUsDiv = document.createElement('div');
  followUsDiv.classList.add('follow-us');
  const followUsP = document.createElement('p');
  followUsP.textContent = 'Follow Us';
  followUsDiv.appendChild(followUsP);

  const linkSocialDiv = document.createElement('div');
  linkSocialDiv.classList.add('link-social');

  const twitterLink = document.createElement('a');
  twitterLink.href = 'https://twitter.com/jswsteel';
  twitterLink.target = '_blank';
  const twitterImg = document.createElement('img');
  twitterImg.alt = 'twitter';
  // Use a placeholder for the image src and let CSS handle sizing
  twitterImg.src = '/icons/twitter.svg'; // Placeholder, assuming an SVG icon
  twitterLink.appendChild(twitterImg);
  linkSocialDiv.appendChild(twitterLink);

  const facebookLink = document.createElement('a');
  facebookLink.href = 'https://www.facebook.com/JSWSteelOfficial';
  facebookLink.target = '_blank';
  const facebookIcon = document.createElement('i');
  facebookIcon.classList.add('fa', 'fa-facebook');
  facebookIcon.innerHTML = '&nbsp;';
  facebookLink.appendChild(facebookIcon);
  linkSocialDiv.appendChild(facebookLink);

  const linkedinLink = document.createElement('a');
  linkedinLink.href = 'https://www.linkedin.com/company/jsw';
  linkedinLink.target = '_blank';
  const linkedinIcon = document.createElement('i');
  linkedinIcon.classList.add('fa', 'fa-linkedin');
  linkedinIcon.innerHTML = '&nbsp;';
  linkedinLink.appendChild(linkedinIcon);
  linkSocialDiv.appendChild(linkedinLink);

  followUsDiv.appendChild(linkSocialDiv);

  const responsibleSteelP = document.createElement('p');
  responsibleSteelP.innerHTML = '&nbsp;'; // From original HTML
  const responsibleSteelImg = document.createElement('img');
  responsibleSteelImg.alt = 'ResponsibleSteel Core Site Certification';
  // Use a placeholder for the image src and let CSS handle sizing
  responsibleSteelImg.src = '/icons/responsiblesteel-member.png'; // Placeholder
  responsibleSteelP.appendChild(responsibleSteelImg);
  followUsDiv.appendChild(responsibleSteelP);

  followUsColumElement.appendChild(followUsDiv);
  column.appendChild(followUsColumElement);

  container.appendChild(column);
  footerTop.appendChild(container);
  block.appendChild(footerTop);

  // Footer bottom
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-bottom');

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('txt-copyright');
  copyrightDiv.textContent = 'Copyright © JSW ';
  const cyearSpan = document.createElement('span');
  cyearSpan.id = 'cyear';
  cyearSpan.textContent = new Date().getFullYear().toString(); // Dynamically set year
  copyrightDiv.appendChild(cyearSpan);
  copyrightDiv.innerHTML += ' All rights reserved';
  footerBottom.appendChild(copyrightDiv);

  const termsDiv = document.createElement('div');
  termsDiv.classList.add('txt-terms');
  const privacyLink = document.createElement('a');
  privacyLink.href = 'https://www.jsw.in/groups/privacy-policy';
  privacyLink.target = '_blank';
  privacyLink.textContent = 'Privacy Policy';
  termsDiv.appendChild(privacyLink);
  footerBottom.appendChild(termsDiv);

  block.appendChild(footerBottom);

  // Mobile footer (visible-xs)
  const footerMobile = document.createElement('div');
  footerMobile.classList.add('footer-mobile', 'visible-xs');

  const mobileContainer = document.createElement('div');
  mobileContainer.classList.add('container');

  const mobileSocialDiv = document.createElement('div');
  mobileSocialDiv.classList.add('link-social');
  const mobileSocialTitle = document.createElement('div');
  mobileSocialTitle.classList.add('title-social');
  mobileSocialTitle.textContent = 'Follow Us';
  mobileSocialDiv.appendChild(mobileSocialTitle);

  const mobileSocialP = document.createElement('p');
  const mobileTwitterLink = document.createElement('a');
  mobileTwitterLink.href = 'https://twitter.com/jswsteel';
  const mobileTwitterIcon = document.createElement('i');
  mobileTwitterIcon.classList.add('fa', 'fa-twitter');
  mobileTwitterIcon.innerHTML = '&nbsp;';
  mobileTwitterLink.appendChild(mobileTwitterIcon);
  mobileSocialP.appendChild(mobileTwitterLink);

  const mobileFacebookLink = document.createElement('a');
  mobileFacebookLink.href = 'https://www.facebook.com/JSWSteelOfficial';
  const mobileFacebookIcon = document.createElement('i');
  mobileFacebookIcon.classList.add('fa', 'fa-facebook');
  mobileFacebookIcon.innerHTML = '&nbsp;';
  mobileFacebookLink.appendChild(mobileFacebookIcon);
  mobileSocialP.appendChild(mobileFacebookLink);

  const mobileLinkedinLink = document.createElement('a');
  mobileLinkedinLink.href = 'https://www.linkedin.com/company/jsw';
  const mobileLinkedinIcon = document.createElement('i');
  mobileLinkedinIcon.classList.add('fa', 'fa-linkedin');
  mobileLinkedinIcon.innerHTML = '&nbsp;';
  mobileLinkedinLink.appendChild(mobileLinkedinIcon);
  mobileSocialP.appendChild(mobileLinkedinLink);

  mobileSocialDiv.appendChild(mobileSocialP);
  mobileContainer.appendChild(mobileSocialDiv);

  const mobileLinkFooter = document.createElement('div');
  mobileLinkFooter.classList.add('link-footer', 'clearfix');

  // For simplicity, we'll recreate the two ULs as per original mobile HTML
  const mobileUl1 = document.createElement('ul');
  mobileUl1.classList.add('text-footer');
  const mobileLinks1 = [
    { text: 'About Us', href: 'https://www.jswsteel.in/about-us' },
    { text: 'Our Leadership', href: 'https://www.jswsteel.in/jsw-steel-board-directors' },
    { text: 'Our Partnership Project', href: 'https://www.jswsteel.in/jsw-eklavya-skill-academy' },
    { text: 'Products', href: 'https://www.jswsteel.in/flats-products' },
    { text: 'Brands', href: 'https://www.jswsteel.in/brands' },
    { text: 'Applications', href: 'https://www.jswsteel.in/applications' },
    { text: 'Facilities', href: 'https://www.jswsteel.in/jsw-steel-facilities' },
    { text: 'Projects', href: 'https://www.jswsteel.in/jsw-steel-projects' },
  ];
  mobileLinks1.forEach(linkData => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = linkData.href;
    a.textContent = linkData.text;
    li.appendChild(a);
    mobileUl1.appendChild(li);
  });
  mobileLinkFooter.appendChild(mobileUl1);

  const mobileUl2 = document.createElement('ul');
  mobileUl2.classList.add('text-footer');
  const mobileLinks2 = [
    { text: 'JSW Shoppe', href: 'https://www.jswsteel.in/jsw-shoppe' },
    { text: 'Corex Technology', href: 'https://www.jswsteel.in/corex' },
    { text: 'Case Studies', href: 'https://www.jswsteel.in/harvard-case-study' },
    { text: 'Investors', href: 'https://www.jswsteel.in/investors' },
    { text: 'Media', href: 'https://www.jswsteel.in/jsw-steel-news' },
    { text: 'CSR', href: 'https://www.jsw.in/foundation' },
    { text: 'JSW One MSME', href: 'https://www.jswonemsme.com/' },
    { text: 'JSW One Homes', href: 'https://www.jswonehomes.com/' },
  ];
  mobileLinks2.forEach(linkData => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = linkData.href;
    a.textContent = linkData.text;
    li.appendChild(a);
    mobileUl2.appendChild(li);
  });
  mobileLinkFooter.appendChild(mobileUl2);

  mobileContainer.appendChild(mobileLinkFooter);
  footerMobile.appendChild(mobileContainer);

  const mobileFooterBottom = document.createElement('div');
  mobileFooterBottom.classList.add('footer-bottom');

  const mobileCopyrightDiv = document.createElement('div');
  mobileCopyrightDiv.classList.add('copyright');
  mobileCopyrightDiv.textContent = 'Copyright © JSW Steel ';
  const mobileCyearSpan = document.createElement('span');
  mobileCyearSpan.id = 'cyear';
  mobileCyearSpan.textContent = new Date().getFullYear().toString();
  mobileCopyrightDiv.appendChild(mobileCyearSpan);
  mobileCopyrightDiv.innerHTML += ' All rights reserved';
  mobileFooterBottom.appendChild(mobileCopyrightDiv);

  const mobileTermsDiv = document.createElement('div');
  mobileTermsDiv.classList.add('link-term');
  const mobilePrivacyLink = document.createElement('a');
  mobilePrivacyLink.href = 'https://www.jsw.in/groups/privacy-policy';
  mobilePrivacyLink.textContent = 'Privacy Policy';
  mobileTermsDiv.appendChild(mobilePrivacyLink);
  mobileFooterBottom.appendChild(mobileTermsDiv);

  footerMobile.appendChild(mobileFooterBottom);
  block.appendChild(footerMobile);

  // Clear original block content
  block.innerHTML = '';
  block.appendChild(footerTop);
  block.appendChild(footerBottom);
  block.appendChild(footerMobile);
}
