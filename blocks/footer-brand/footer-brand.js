import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoImageRow,
    logoLinkRow,
    logoLinkLabelRow,
    secondaryLogoImageRow,
    leftLinkRow,
    leftLinkLabelRow,
    copyrightTextRow,
    ...itemRows
  ] = [...block.children];

  block.textContent = '';

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');
  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');
  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  // Logo Image and Link
  const logoLink = document.createElement('a');
  logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
  moveInstrumentation(logoLinkRow, logoLink);
  const logoLinkFound = logoLinkRow.querySelector('a');
  if (logoLinkFound) {
    logoLink.href = logoLinkFound.href;
    // Use logoLinkLabelRow for aria-label as per model, not logoLinkFound.textContent
    logoLink.setAttribute('aria-label', logoLinkLabelRow.textContent.trim());
  }

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    logoLink.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
  }
  footerBrandLeft.append(logoLink);

  // Secondary Logo Image
  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const secondaryLogoPicture = secondaryLogoImageRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    secondaryLogoDiv.append(optimizedPic);
    optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'no-rendition');
  }
  footerBrandLeft.append(secondaryLogoDiv);
  primaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  // Filter item rows based on the number of children (cells)
  // footer-link has 2 cells: [link, linkLabel]
  // footer-social-link has 3 cells: [socialLink, socialLinkLabel, socialIcon]
  const footerLinks = itemRows.filter((row) => [...row.children].length === 2);
  const footerSocialLinks = itemRows.filter((row) => [...row.children].length === 3);

  // Group footer links into columns (assuming 2 columns as per original HTML structure)
  const numColumns = 2; // Adjust if more columns are needed
  const linksPerColumn = Math.ceil(footerLinks.length / numColumns);

  for (let i = 0; i < numColumns; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    const startIndex = i * linksPerColumn;
    const endIndex = Math.min(startIndex + linksPerColumn, footerLinks.length);

    for (let j = startIndex; j < endIndex; j += 1) {
      const row = footerLinks[j];
      const cells = [...row.children]; // Get all cells for the current row
      const li = document.createElement('li');
      li.classList.add('footer-list__item');
      moveInstrumentation(row, li);

      // Content detection for cells: link is the first div, label is the second
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const labelCell = cells.find(cell => !cell.querySelector('a')); // Assuming label cell doesn't contain an 'a' tag directly

      const link = document.createElement('a');
      link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');

      const foundLink = linkCell ? linkCell.querySelector('a') : null;
      if (foundLink) {
        link.href = foundLink.href;
        link.textContent = labelCell ? labelCell.textContent.trim() : '';
        if (foundLink.target) link.target = foundLink.target;
      } else if (labelCell) {
        link.textContent = labelCell.textContent.trim();
      }
      li.append(link);
      ul.append(li);
    }
    footerListDiv.append(ul);
    footerBrandNavbarLeft.append(footerListDiv);
  }
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');

  // Group remaining footer links into columns
  const remainingLinks = footerLinks.slice(numColumns * linksPerColumn);
  const numRemainingColumns = 2; // Adjust if more columns are needed
  const linksPerRemainingColumn = Math.ceil(remainingLinks.length / numRemainingColumns);

  for (let i = 0; i < numRemainingColumns; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    const startIndex = i * linksPerRemainingColumn;
    const endIndex = Math.min(startIndex + linksPerRemainingColumn, remainingLinks.length);

    for (let j = startIndex; j < endIndex; j += 1) {
      const row = remainingLinks[j];
      const cells = [...row.children]; // Get all cells for the current row
      const li = document.createElement('li');
      li.classList.add('footer-list__item');
      moveInstrumentation(row, li);

      // Content detection for cells: link is the first div, label is the second
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const labelCell = cells.find(cell => !cell.querySelector('a'));

      const link = document.createElement('a');
      link.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');

      const foundLink = linkCell ? linkCell.querySelector('a') : null;
      if (foundLink) {
        link.href = foundLink.href;
        link.textContent = labelCell ? labelCell.textContent.trim() : '';
        if (foundLink.target) link.target = foundLink.target;
      } else if (labelCell) {
        link.textContent = labelCell.textContent.trim();
      }
      li.append(link);
      ul.append(li);
    }
    footerListDiv.append(ul);
    footerBrandNavbarRight.append(footerListDiv);
  }
  footerBrandNavbar.append(footerBrandNavbarRight);
  footerBrandRight.append(footerBrandNavbar);
  primaryContent.append(footerBrandRight);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);
  block.append(primarySection);

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');
  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const socialMediaRight = document.createElement('section');
  socialMediaRight.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaRight.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  footerSocialLinks.forEach((row) => {
    const cells = [...row.children]; // Get all cells for the current row
    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');
    moveInstrumentation(row, li);

    // Content detection for social link cells
    const socialLinkCell = cells.find(cell => cell.querySelector('a'));
    const socialIconCell = cells.find(cell => cell.querySelector('picture'));
    const socialLinkLabelCell = cells.find(cell => !cell.querySelector('a') && !cell.querySelector('picture'));

    const socialLink = document.createElement('a');
    socialLink.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');

    const foundSocialLink = socialLinkCell ? socialLinkCell.querySelector('a') : null;
    if (foundSocialLink) {
      socialLink.href = foundSocialLink.href;
      socialLink.setAttribute('aria-label', socialLinkLabelCell ? socialLinkLabelCell.textContent.trim() : '');
      socialLink.target = '_blank';
      socialLink.setAttribute('data-cta-region', 'Footer');
      socialLink.setAttribute('data-cta-label', `footer-${socialLinkLabelCell ? socialLinkLabelCell.textContent.trim().toLowerCase() : ''}`);
      socialLink.setAttribute('data-platform-name', socialLinkLabelCell ? socialLinkLabelCell.textContent.trim().toLowerCase() : '');
      socialLink.setAttribute('data-social-linktype', 'follow');
    }

    const socialIconPicture = socialIconCell ? socialIconCell.querySelector('picture') : null;
    if (socialIconPicture) {
      const img = socialIconPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      socialLink.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
    }
    li.append(socialLink);
    socialMediaList.append(li);
  });
  socialMediaRight.append(socialMediaList);
  secondaryContent.append(socialMediaRight);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  const leftLinkLi = document.createElement('li');
  leftLinkLi.classList.add('footer-brand__left--item', 'foot_link');
  moveInstrumentation(leftLinkRow, leftLinkLi);

  const leftLinkA = document.createElement('a');
  leftLinkA.classList.add('footer-brand__left--link', 'analytics_cta_click');
  const foundLeftLink = leftLinkRow.querySelector('a');
  if (foundLeftLink) {
    leftLinkA.href = foundLeftLink.href;
    leftLinkA.textContent = leftLinkLabelRow.textContent.trim();
    leftLinkA.target = '_blank';
    leftLinkA.setAttribute('data-cta-region', 'Footer');
  }
  leftLinkLi.append(leftLinkA);
  footerBrandLeftList.append(leftLinkLi);
  footerBrandLeftSecondary.append(footerBrandLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
  moveInstrumentation(copyrightTextRow, copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text', 'text-white');
  copyrightSpan.textContent = copyrightTextRow.textContent.trim();
  copyrightDiv.append(copyrightSpan);
  footerBrandLeftSecondary.append(copyrightDiv);
  secondaryContent.append(footerBrandLeftSecondary);

  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);
  block.append(secondarySection);

  block.classList.add('w-100', 'bg-boing-neutral-gray-600');

  // This part seems to be a generic image optimization, not specific to footer-brand block structure.
  // It's good practice to keep it if it's intended to optimize all images within the block.
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
