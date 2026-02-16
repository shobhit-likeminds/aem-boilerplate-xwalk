import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('footer-brand-primary-content');

  const footerBrandLeftPrimary = document.createElement('section');
  footerBrandLeftPrimary.classList.add('footer-brand-left');

  const footerBrandRightPrimary = document.createElement('section');
  footerBrandRightPrimary.classList.add('footer-brand-right');

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar-left');

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar-right');

  let navListCount = 0;

  [...block.children].forEach((row) => {
    moveInstrumentation(row, row);
    const cells = [...row.children];

    const type = row.dataset.blocknode; // Assuming blocknode attribute is used for type

    if (type === 'footerBrand') {
      const logoLink = cells[0].querySelector('a');
      const logoImg = cells[0].querySelector('img');
      const secondaryLogoImg = cells[1].querySelector('img');

      if (logoLink && logoImg) {
        const newLogoLink = document.createElement('a');
        moveInstrumentation(logoLink, newLogoLink);
        newLogoLink.href = logoLink.href;
        newLogoLink.target = '_blank';
        newLogoLink.classList.add('footer-brand-logo', 'analytics_cta_click');
        newLogoLink.setAttribute('data-cta-region', 'Footer');
        newLogoLink.setAttribute('aria-label', logoLink.getAttribute('aria-label') || 'ITC Logo');

        const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
        moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
        optimizedLogoPic.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
        optimizedLogoPic.querySelector('img').setAttribute('loading', 'lazy');
        newLogoLink.append(optimizedLogoPic);
        footerBrandLeftPrimary.append(newLogoLink);
      }

      if (secondaryLogoImg) {
        const footerBrandSecondaryLogo = document.createElement('div');
        footerBrandSecondaryLogo.classList.add('footer-brand-secondary-logo');

        const optimizedSecondaryLogoPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
        moveInstrumentation(secondaryLogoImg, optimizedSecondaryLogoPic.querySelector('img'));
        optimizedSecondaryLogoPic.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-no-rendition');
        optimizedSecondaryLogoPic.querySelector('img').setAttribute('loading', 'lazy');
        footerBrandSecondaryLogo.append(optimizedSecondaryLogoPic);
        footerBrandLeftPrimary.append(footerBrandSecondaryLogo);
      }

      // ITC Portal Link and Copyright Text for the secondary footer
      const itcPortalLinkCell = cells[3]; // Assuming ITC Portal Link is the 4th cell (index 3)
      const copyrightTextCell = cells[4]; // Assuming Copyright Text is the 5th cell (index 4)

      const footerBrandSecondary = document.createElement('section');
      footerBrandSecondary.classList.add('footer-brand-secondary');

      const footerSecondaryContainer = document.createElement('div');
      footerSecondaryContainer.classList.add('footer-container');

      const footerBrandSecondaryContent = document.createElement('div');
      footerBrandSecondaryContent.classList.add('footer-brand-secondary-content');

      const footerBrandRightSecondary = document.createElement('section');
      footerBrandRightSecondary.classList.add('footer-brand-right');

      const footerBrandLeftSecondary = document.createElement('section');
      footerBrandLeftSecondary.classList.add('footer-brand-left');

      if (itcPortalLinkCell) {
        const itcLink = itcPortalLinkCell.querySelector('a');
        if (itcLink) {
          const footerBrandLeftList = document.createElement('ul');
          footerBrandLeftList.classList.add('footer-brand-left-list');

          const footerBrandLeftItem = document.createElement('li');
          footerBrandLeftItem.classList.add('footer-brand-left-item', 'footer-foot-link');

          const newItcLink = document.createElement('a');
          moveInstrumentation(itcLink, newItcLink);
          newItcLink.href = itcLink.href;
          newItcLink.target = '_blank';
          newItcLink.classList.add('footer-brand-left-link', 'analytics_cta_click');
          newItcLink.setAttribute('data-cta-region', 'Footer');
          newItcLink.textContent = itcLink.textContent.trim();

          footerBrandLeftItem.append(newItcLink);
          footerBrandLeftList.append(footerBrandLeftItem);
          footerBrandLeftSecondary.append(footerBrandLeftList);
        }
      }

      if (copyrightTextCell) {
        const copyrightDiv = document.createElement('div');
        copyrightDiv.classList.add('footer-brand-left-copyright');

        const copyrightSpan = document.createElement('span');
        copyrightSpan.classList.add('footer-brand-left-text', 'footer-text-white');
        copyrightSpan.textContent = copyrightTextCell.textContent.trim();
        copyrightDiv.append(copyrightSpan);
        footerBrandLeftSecondary.append(copyrightDiv);
      }

      footerBrandSecondaryContent.append(footerBrandRightSecondary, footerBrandLeftSecondary);
      footerSecondaryContainer.append(footerBrandSecondaryContent);
      footerBrandSecondary.append(footerSecondaryContainer);
      block.append(footerBrandSecondary);

    } else if (type === 'footerNavList') {
      const link = cells[0].querySelector('a');
      if (link) {
        let targetNavbarDiv;
        if (navListCount % 2 === 0) {
          targetNavbarDiv = footerBrandNavbarLeft;
        } else {
          targetNavbarDiv = footerBrandNavbarRight;
        }

        let listContainer = targetNavbarDiv.lastElementChild;
        if (!listContainer || listContainer.tagName !== 'DIV' || !listContainer.classList.contains('footer-list-container')) {
          listContainer = document.createElement('div');
          listContainer.classList.add('footer-list-container');
          targetNavbarDiv.append(listContainer);
        }

        let ul = listContainer.querySelector('ul.footer-list');
        if (!ul) {
          ul = document.createElement('ul');
          ul.classList.add('footer-list');
          listContainer.append(ul);
        }

        const li = document.createElement('li');
        li.classList.add('footer-list-item');

        const newLink = document.createElement('a');
        moveInstrumentation(link, newLink);
        newLink.href = link.href;
        newLink.textContent = link.textContent.trim();
        newLink.classList.add('footer-cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) {
          newLink.target = link.target;
        }

        li.append(newLink);
        ul.append(li);
      }
      navListCount++;

    } else if (type === 'footerSocialLink') {
      const iconImg = cells[0].querySelector('img');
      const socialLink = cells[1].querySelector('a');

      let socialMediaTitle = footerBrandRightPrimary.querySelector('.footer-social-media-title');
      if (!socialMediaTitle) {
        socialMediaTitle = document.createElement('h3');
        socialMediaTitle.classList.add('footer-social-media-title');
        socialMediaTitle.textContent = 'Follow Us On';
        footerBrandRightPrimary.append(socialMediaTitle);
      }

      let socialList = footerBrandRightPrimary.querySelector('ul.footer-brand-right-list');
      if (!socialList) {
        socialList = document.createElement('ul');
        socialList.classList.add('footer-brand-right-list');
        footerBrandRightPrimary.append(socialList);
      }

      if (iconImg && socialLink) {
        const li = document.createElement('li');
        li.classList.add('footer-brand-right-item');

        const newSocialLink = document.createElement('a');
        moveInstrumentation(socialLink, newSocialLink);
        newSocialLink.href = socialLink.href;
        newSocialLink.classList.add('footer-brand-right-link', 'analytics_cta_click');
        newSocialLink.setAttribute('data-cta-region', 'Footer');
        newSocialLink.setAttribute('data-cta-label', `footer-${iconImg.alt.toLowerCase()}`);
        newSocialLink.target = '_blank';
        newSocialLink.setAttribute('data-platform-name', iconImg.alt.toLowerCase());
        newSocialLink.setAttribute('data-social-linktype', 'follow');

        const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt);
        moveInstrumentation(iconImg, optimizedIconPic.querySelector('img'));
        optimizedIconPic.querySelector('img').setAttribute('aria-label', iconImg.alt.toLowerCase());
        optimizedIconPic.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
        optimizedIconPic.querySelector('img').setAttribute('alt', socialLink.href); // Using link href as alt as in original HTML
        optimizedIconPic.querySelector('img').setAttribute('loading', 'lazy');

        newSocialLink.append(optimizedIconPic);
        li.append(newSocialLink);
        socialList.append(li);
      }
    }
  });

  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRightPrimary.append(footerBrandNavbar);

  footerBrandPrimaryContent.append(footerBrandLeftPrimary, footerBrandRightPrimary);

  const footerBrandPrimarySection = document.createElement('section');
  footerBrandPrimarySection.classList.add('footer-brand-primary');
  footerBrandPrimarySection.append(footerContainer);
  footerContainer.append(footerBrandPrimaryContent);

  block.textContent = '';
  block.append(footerBrandPrimarySection);
}
