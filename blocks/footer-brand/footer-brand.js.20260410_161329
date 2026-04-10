import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const sectionContainer = document.createElement('section');
  sectionContainer.classList.add('container-hd', 'p-0');

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.classList.add('footer-brand', 'w-100', 'bg-boing-neutral-gray-600');
  sectionContainer.append(footerBrandDiv);

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');
  footerBrandDiv.append(primarySection);

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  primaryContainer.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');
  primaryContent.append(footerBrandLeft);

  // Logo - Find the row containing the logo picture
  const logoRow = children.find((row) => row.querySelector('.footer-brand__logo') || (row.children.length === 1 && row.querySelector('picture') && row.querySelector('a')));
  const logoCell = logoRow ? logoRow.querySelector('picture') : null;
  if (logoCell) {
    const logoLink = document.createElement('a');
    logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
    logoLink.setAttribute('data-cta-region', 'Footer');
    logoLink.setAttribute('aria-label', 'ITC Logo');
    const img = logoCell.querySelector('img');
    if (img) {
      logoLink.href = img.closest('a') ? img.closest('a').href : '#';
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      moveInstrumentation(img.closest('picture'), optimizedPic);
      logoLink.append(optimizedPic);
    }
    moveInstrumentation(logoRow, logoLink);
    footerBrandLeft.append(logoLink);
  }

  // Secondary Logo - Find the row containing the secondary logo picture
  const secondaryLogoRow = children.find((row) => row.querySelector('.footer-brand__secondary--logo') || (row.children.length === 1 && row.querySelector('picture') && !logoRow.contains(row)));
  const secondaryLogoCell = secondaryLogoRow ? secondaryLogoRow.querySelector('picture') : null;
  if (secondaryLogoCell) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'd-inline-block');
    const img = secondaryLogoCell.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'no-rendition');
      moveInstrumentation(img.closest('picture'), optimizedPic);
      secondaryLogoDiv.append(optimizedPic);
    }
    moveInstrumentation(secondaryLogoRow, secondaryLogoDiv);
    footerBrandLeft.append(secondaryLogoDiv);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');
  primaryContent.append(footerBrandRight);

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(nav);

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navRight);

  // Filter rows based on content to match BlockJson structure
  const footerLinks = children.filter((row) => row.children.length === 2 && row.querySelector('a') && !row.querySelector('picture') && !row.textContent.trim().startsWith('Copyright'));
  const footerSocialLinks = children.filter((row) => row.children.length === 3 && row.querySelector('a') && row.querySelector('picture'));
  const footerSmallLinks = children.filter((row) => row.children.length === 2 && row.querySelector('a') && !row.querySelector('picture') && !row.textContent.trim().startsWith('Copyright') && !footerLinks.includes(row));

  const copyrightRow = children.find((row) => row.children.length === 1 && row.textContent.trim().startsWith('©')); // Adjusted to match original HTML

  // Group footer links into lists (up to 4 lists based on original HTML)
  const linkLists = [[], [], [], []];
  footerLinks.forEach((linkRow, index) => {
    linkLists[index % 4].push(linkRow);
  });

  linkLists.forEach((listItems, listIndex) => {
    if (listItems.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.classList.add('footerList');
      const ul = document.createElement('ul');
      ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
      footerListDiv.append(ul);

      listItems.forEach((row) => {
        const li = document.createElement('li');
        li.classList.add('footer-list__item');
        moveInstrumentation(row, li);

        const cells = [...row.children];
        const linkCell = cells.find(cell => cell.querySelector('a'));
        const labelCell = cells.find(cell => cell !== linkCell);

        if (linkCell && labelCell) {
          const anchor = document.createElement('a');
          anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block'); // Corrected class name
          anchor.setAttribute('data-link-region', 'Footer List');
          anchor.href = linkCell.querySelector('a')?.href || '#';
          anchor.textContent = labelCell.textContent.trim();
          li.append(anchor);
        }
        ul.append(li);
      });
      if (listIndex < 2) {
        navLeft.append(footerListDiv);
      } else {
        navRight.append(footerListDiv);
      }
    }
  });

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');
  footerBrandDiv.append(secondarySection);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');
  secondaryContainer.append(secondaryContent);

  const socialMediaRight = document.createElement('section');
  socialMediaRight.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');
  secondaryContent.append(socialMediaRight);

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('social_media--title');
  socialTitle.textContent = 'Follow Us On';
  socialMediaRight.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
  socialMediaRight.append(socialList);

  footerSocialLinks.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const socialLinkCell = cells.find(cell => cell.querySelector('a'));
    const iconCell = cells.find(cell => cell.querySelector('picture'));
    const socialLinkLabelCell = cells.find(cell => cell !== socialLinkCell && cell !== iconCell);

    if (socialLinkCell && iconCell) {
      const anchor = document.createElement('a');
      anchor.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click'); // Corrected class name
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.href = socialLinkCell.querySelector('a')?.href || '#';
      if (socialLinkLabelCell) {
        anchor.setAttribute('data-cta-label', `footer-${socialLinkLabelCell.textContent.trim().toLowerCase()}`);
        anchor.setAttribute('aria-label', socialLinkLabelCell.textContent.trim());
      }
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', socialLinkLabelCell ? socialLinkLabelCell.textContent.trim().toLowerCase() : '');
      anchor.setAttribute('data-social-linktype', 'follow');

      const img = iconCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
        moveInstrumentation(img.closest('picture'), optimizedPic);
        anchor.append(optimizedPic);
      }
      li.append(anchor);
    }
    socialList.append(li);
  });

  const smallLinksLeft = document.createElement('section');
  smallLinksLeft.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  secondaryContent.append(smallLinksLeft);

  const smallLinksList = document.createElement('ul');
  smallLinksList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  smallLinksLeft.append(smallLinksList);

  footerSmallLinks.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item', 'foot_link');
    moveInstrumentation(row, li);

    const cells = [...row.children];
    const smallLinkCell = cells.find(cell => cell.querySelector('a'));
    const smallLinkLabelCell = cells.find(cell => cell !== smallLinkCell);

    if (smallLinkCell && smallLinkLabelCell) {
      const anchor = document.createElement('a');
      anchor.classList.add('footer-brand__left--link', 'analytics_cta_click');
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.href = smallLinkCell.querySelector('a')?.href || '#';
      anchor.textContent = smallLinkLabelCell.textContent.trim();
      anchor.target = '_blank';
      li.append(anchor);
    }
    smallLinksList.append(li);
  });

  // Copyright
  if (copyrightRow) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
    moveInstrumentation(copyrightRow, copyrightDiv);

    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand__left--text', 'text-white');
    copyrightSpan.textContent = copyrightRow.textContent.trim();
    copyrightDiv.append(copyrightSpan);
    smallLinksLeft.append(copyrightDiv);
  }

  // Optimize all images
  footerBrandDiv.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(sectionContainer);
}
