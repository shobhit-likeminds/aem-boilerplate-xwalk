import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const footerSiteFooter = document.createElement('footer');
  footerSiteFooter.classList.add('footer-site-footer');

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');
  footerSiteFooter.append(footerContainer);

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');
  footerContainer.append(footerRow);

  const footerColLeft = document.createElement('div');
  footerColLeft.classList.add('footer-col', 'footer-col-left');
  footerRow.append(footerColLeft);

  const footerColRight = document.createElement('div');
  footerColRight.classList.add('footer-col', 'footer-col-right');
  footerRow.append(footerColRight);

  // Brand Image and Brand Link (first two rows)
  const brandImageRow = children[0];
  const brandLinkRow = children[1];

  const footerSiteBranding = document.createElement('div');
  footerSiteBranding.classList.add('footer-site-branding');
  footerColLeft.append(footerSiteBranding);

  const brandLinkEl = document.createElement('a');
  const foundBrandLink = brandLinkRow.querySelector('a');
  if (foundBrandLink) {
    brandLinkEl.href = foundBrandLink.href;
  }
  moveInstrumentation(brandLinkRow, brandLinkEl);
  footerSiteBranding.append(brandLinkEl);

  const brandPicture = brandImageRow.querySelector('picture');
  if (brandPicture) {
    const img = brandPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      brandLinkEl.append(optimizedPic);
    }
  }
  moveInstrumentation(brandImageRow, brandLinkEl.querySelector('picture') || brandLinkEl);


  // Footer Menu (container at index 2)
  const footerMenuContainerEl = document.createElement('div');
  footerMenuContainerEl.classList.add('footer-menu-nav-footer-container');
  footerColRight.append(footerMenuContainerEl);

  const footerMenuUl = document.createElement('ul');
  footerMenuUl.id = 'footer-menu';
  footerMenuUl.classList.add('footer-menu');
  footerMenuContainerEl.append(footerMenuUl);

  // Footer Social Icons (container at index 3)
  const footerSocialIconsUl = document.createElement('ul');
  footerSocialIconsUl.classList.add('footer-social-icons');
  footerColRight.append(footerSocialIconsUl);

  // Footer Brands (container at index 4)
  const footerBrandsContainerEl = document.createElement('div');
  footerBrandsContainerEl.classList.add('footer-menu-nav-footer-brands-container');
  footerColRight.append(footerBrandsContainerEl);

  const footerBrandsUl = document.createElement('ul');
  footerBrandsUl.id = 'footer-brands-menu';
  footerBrandsUl.classList.add('footer-menu');
  footerBrandsContainerEl.append(footerBrandsUl);

  // Copyright (richtext at index 5)
  const copyrightRow = children[5];
  const footerCopyright = document.createElement('div');
  footerCopyright.classList.add('footer-copyright');
  moveInstrumentation(copyrightRow, footerCopyright);
  while (copyrightRow.firstChild) footerCopyright.append(copyrightRow.firstChild);
  footerColRight.append(footerCopyright);

  // Process item rows starting from index 6
  for (let i = 6; i < children.length; i += 1) {
    const row = children[i];
    const cells = [...row.children];

    if (cells.length === 2) { // footerMenuItem or footerBrandItem
      const labelCell = cells[0];
      const linkCell = cells[1];

      const linkEl = linkCell.querySelector('a');
      const labelText = labelCell.textContent.trim();

      if (linkEl && linkEl.href.includes('olddutchfoods.com/brand/')) {
        // This is a footerBrandItem
        const li = document.createElement('li');
        li.classList.add('footer-menu-item');
        moveInstrumentation(row, li);

        const a = document.createElement('a');
        a.href = linkEl.href;
        a.textContent = labelText;
        li.append(a);
        footerBrandsUl.append(li);
      } else {
        // This is a footerMenuItem
        const li = document.createElement('li');
        li.classList.add('footer-menu-item');
        moveInstrumentation(row, li);

        const a = document.createElement('a');
        if (linkEl) {
          a.href = linkEl.href;
        }
        a.textContent = labelText;
        li.append(a);
        footerMenuUl.append(li);
      }
    } else if (cells.length === 3) { // footerSocialIcon
      const iconImageCell = cells[0];
      const iconLinkCell = cells[1];
      const iconAltCell = cells[2];

      const li = document.createElement('li');
      moveInstrumentation(row, li);

      const a = document.createElement('a');
      const foundIconLink = iconLinkCell.querySelector('a');
      if (foundIconLink) {
        a.href = foundIconLink.href;
        a.target = '_blank'; // Assuming social links open in new tab
      }

      const picture = iconImageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        if (img) {
          const altText = iconAltCell.textContent.trim() || img.alt;
          const optimizedPic = createOptimizedPicture(img.src, altText, false, [{ width: '750' }]);
          optimizedPic.querySelector('img').classList.add('footer-svg');
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          a.append(optimizedPic);
        }
      }
      li.append(a);
      footerSocialIconsUl.append(li);
    }
  }

  // Final cleanup and append
  block.textContent = '';
  block.append(footerSiteFooter);
}
