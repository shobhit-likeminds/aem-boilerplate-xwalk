import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    importantLinksContainer,
    ourBrandsContainer,
    otherLinksContainer,
    contactListContainer,
    socialLinksContainer,
    footerLogoContainer,
    ...itemRows
  ] = [...block.children];

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('elementor-element', 'elementor-element-1ac4be3', 'e-flex', 'e-con-boxed', 'e-con', 'e-parent', 'e-lazyloaded');

  const innerContainer = document.createElement('div');
  innerContainer.classList.add('e-con-inner');
  mainContainer.append(innerContainer);

  // Important Links Section
  const importantLinksSection = document.createElement('div');
  importantLinksSection.classList.add('elementor-element', 'elementor-element-b2aa1e6', 'e-con-full', 'e-flex', 'e-con', 'e-child');
  innerContainer.append(importantLinksSection);

  const importantLinksHeadingWrapper = document.createElement('div');
  importantLinksHeadingWrapper.classList.add('elementor-element', 'elementor-element-e8bc58d', 'elementor-widget', 'elementor-widget-heading');
  const importantLinksHeading = document.createElement('h2');
  importantLinksHeading.classList.add('elementor-heading-title', 'elementor-size-default');
  moveInstrumentation(importantLinksContainer.firstElementChild, importantLinksHeading);
  importantLinksHeading.append(importantLinksContainer.firstElementChild.textContent);
  importantLinksHeadingWrapper.append(importantLinksHeading);
  importantLinksSection.append(importantLinksHeadingWrapper);

  const importantLinksListWrapper = document.createElement('div');
  importantLinksListWrapper.classList.add('elementor-element', 'elementor-element-d1d29a2', 'elementor-list-item-link-inline', 'elementor-mobile-align-left', 'elementor-icon-list--layout-traditional', 'elementor-widget', 'elementor-widget-icon-list');
  const importantLinksUl = document.createElement('ul');
  importantLinksUl.classList.add('elementor-icon-list-items');
  importantLinksListWrapper.append(importantLinksUl);
  importantLinksSection.append(importantLinksListWrapper);

  // Our Brands & Other Links Section
  const brandsOtherLinksSection = document.createElement('div');
  brandsOtherLinksSection.classList.add('elementor-element', 'elementor-element-4a0998d', 'e-con-full', 'e-flex', 'e-con', 'e-child');
  innerContainer.append(brandsOtherLinksSection);

  const ourBrandsHeadingWrapper = document.createElement('div');
  ourBrandsHeadingWrapper.classList.add('elementor-element', 'elementor-element-c9b3c39', 'elementor-widget', 'elementor-widget-heading');
  const ourBrandsHeading = document.createElement('h2');
  ourBrandsHeading.classList.add('elementor-heading-title', 'elementor-size-default');
  moveInstrumentation(ourBrandsContainer.firstElementChild, ourBrandsHeading);
  ourBrandsHeading.append(ourBrandsContainer.firstElementChild.textContent);
  ourBrandsHeadingWrapper.append(ourBrandsHeading);
  brandsOtherLinksSection.append(ourBrandsHeadingWrapper);

  const ourBrandsListWrapper = document.createElement('div');
  ourBrandsListWrapper.classList.add('elementor-element', 'elementor-element-bfef3fe', 'elementor-list-item-link-inline', 'elementor-icon-list--layout-traditional', 'elementor-widget', 'elementor-widget-icon-list');
  const ourBrandsUl = document.createElement('ul');
  ourBrandsUl.classList.add('elementor-icon-list-items');
  ourBrandsListWrapper.append(ourBrandsUl);
  brandsOtherLinksSection.append(ourBrandsListWrapper);

  const otherLinksHeadingWrapper = document.createElement('div');
  otherLinksHeadingWrapper.classList.add('elementor-element', 'elementor-element-10d2804', 'elementor-widget', 'elementor-widget-heading');
  const otherLinksHeading = document.createElement('h2');
  otherLinksHeading.classList.add('elementor-heading-title', 'elementor-size-default');
  moveInstrumentation(otherLinksContainer.firstElementChild, otherLinksHeading);
  otherLinksHeading.append(otherLinksContainer.firstElementChild.textContent);
  otherLinksHeadingWrapper.append(otherLinksHeading);
  brandsOtherLinksSection.append(otherLinksHeadingWrapper);

  const otherLinksListWrapper = document.createElement('div');
  otherLinksListWrapper.classList.add('elementor-element', 'elementor-element-a64f7f4', 'elementor-list-item-link-inline', 'elementor-mobile-align-left', 'elementor-icon-list--layout-traditional', 'elementor-widget', 'elementor-widget-icon-list');
  const otherLinksUl = document.createElement('ul');
  otherLinksUl.classList.add('elementor-icon-list-items');
  otherLinksListWrapper.append(otherLinksUl);
  brandsOtherLinksSection.append(otherLinksListWrapper);

  // Contact Us Section
  const contactUsSection = document.createElement('div');
  contactUsSection.classList.add('elementor-element', 'elementor-element-7a6c094', 'e-con-full', 'e-flex', 'e-con', 'e-child');
  innerContainer.append(contactUsSection);

  const contactDividerMobile = document.createElement('div');
  contactDividerMobile.classList.add('elementor-element', 'elementor-element-b64dfb0', 'elementor-widget-divider--view-line_text', 'elementor-hidden-desktop', 'elementor-hidden-tablet', 'elementor-widget-divider--element-align-center', 'elementor-widget', 'elementor-widget-divider');
  const dividerDiv = document.createElement('div');
  dividerDiv.classList.add('elementor-divider');
  const dividerSpan = document.createElement('span');
  dividerSpan.classList.add('elementor-divider-separator');
  const dividerText = document.createElement('span');
  dividerText.classList.add('elementor-divider__text', 'elementor-divider__element');
  moveInstrumentation(contactListContainer.firstElementChild, dividerText);
  dividerText.append(contactListContainer.firstElementChild.textContent);
  dividerSpan.append(dividerText);
  dividerDiv.append(dividerSpan);
  contactDividerMobile.append(dividerDiv);
  contactUsSection.append(contactDividerMobile);

  const contactUsHeadingWrapper = document.createElement('div');
  contactUsHeadingWrapper.classList.add('elementor-element', 'elementor-element-8d78cfe', 'elementor-hidden-mobile', 'elementor-widget', 'elementor-widget-heading');
  const contactUsHeading = document.createElement('h2');
  contactUsHeading.classList.add('elementor-heading-title', 'elementor-size-default');
  contactUsHeading.textContent = 'Contact Us'; // Hardcoded as per original HTML
  contactUsHeadingWrapper.append(contactUsHeading);
  contactUsSection.append(contactUsHeadingWrapper);

  const contactListWrapper = document.createElement('div');
  contactListWrapper.classList.add('elementor-element', 'elementor-element-650f1f0', 'elementor-mobile-align-center', 'elementor-icon-list--layout-traditional', 'elementor-list-item-link-full_width', 'elementor-widget', 'elementor-widget-icon-list');
  const contactUl = document.createElement('ul');
  contactUl.classList.add('elementor-icon-list-items');
  contactListWrapper.append(contactUl);
  contactUsSection.append(contactListWrapper);

  // Social Links & Footer Logo Section
  const socialLogoSection = document.createElement('div');
  socialLogoSection.classList.add('elementor-element', 'elementor-element-77ce862', 'e-con-full', 'e-flex', 'e-con', 'e-child');
  innerContainer.append(socialLogoSection);

  const followUsHeadingWrapper = document.createElement('div');
followUsHeadingWrapper.classList.add('elementor-element', 'elementor-element-0e0f243', 'elementor-widget', 'elementor-widget-heading');
  const followUsHeading = document.createElement('h2');
  followUsHeading.classList.add('elementor-heading-title', 'elementor-size-default');
  moveInstrumentation(socialLinksContainer.firstElementChild, followUsHeading);
  followUsHeading.append(socialLinksContainer.firstElementChild.textContent);
  followUsHeadingWrapper.append(followUsHeading);
  socialLogoSection.append(followUsHeadingWrapper);

  const socialIconsWrapper = document.createElement('div');
  socialIconsWrapper.classList.add('elementor-element', 'elementor-element-ba3c7fc', 'e-grid-align-left', 'elementor-shape-rounded', 'elementor-grid-0', 'elementor-widget', 'elementor-widget-social-icons');
  const socialGrid = document.createElement('div');
  socialGrid.classList.add('elementor-social-icons-wrapper', 'elementor-grid');
  socialIconsWrapper.append(socialGrid);
  socialLogoSection.append(socialIconsWrapper);

  const dividerMobile = document.createElement('div');
  dividerMobile.classList.add('elementor-element', 'elementor-element-4aedeb2', 'elementor-hidden-desktop', 'elementor-hidden-tablet', 'elementor-widget-divider--view-line', 'elementor-widget', 'elementor-widget-divider');
  const dividerDiv2 = document.createElement('div');
  dividerDiv2.classList.add('elementor-divider');
  const dividerSpan2 = document.createElement('span');
  dividerSpan2.classList.add('elementor-divider-separator');
  dividerDiv2.append(dividerSpan2);
  dividerMobile.append(dividerDiv2);
  socialLogoSection.append(dividerMobile);

  const footerLogoWrapper = document.createElement('div');
  footerLogoWrapper.classList.add('elementor-element', 'elementor-element-4b5bd5a', 'elementor-widget', 'elementor-widget-theme-site-logo', 'elementor-widget-image');
  socialLogoSection.append(footerLogoWrapper);

  // Process item rows
  itemRows.forEach((row) => {
    const cells = [...row.children];
    const firstCellHasPicture = cells[0].querySelector('picture');
    const firstCellHasLink = cells[0].querySelector('a');
    const firstCellHasRichText = cells[0].querySelector('p');
    const secondCellHasLink = cells[1] ? cells[1].querySelector('a') : null;
    const secondCellHasPicture = cells[1] ? cells[1].querySelector('picture') : null;

    if (cells.length === 2 && !firstCellHasPicture && secondCellHasLink && !firstCellHasRichText) { // footer-link-list or footer-other-link-list
      const text = cells[0].textContent.trim();
      const linkEl = cells[1].querySelector('a');

      const li = document.createElement('li');
      li.classList.add('elementor-icon-list-item');
      moveInstrumentation(row, li);

      const a = document.createElement('a');
      a.href = linkEl.href;
      if (linkEl.target) a.target = linkEl.target;

      const span = document.createElement('span');
      span.classList.add('elementor-icon-list-text');
      span.textContent = text;
      a.append(span);
      li.append(a);

      // Distinguish between important-links and other-links based on content
      if (['About Us', 'Our Brands', 'ESG', 'Media & News', 'Careers'].includes(text)) {
        importantLinksUl.append(li);
      } else if (['Privacy Policy', 'POSH Policy', 'Whistleblower Policy', 'Code of Conduct'].includes(text)) {
        otherLinksUl.append(li);
      }
    } else if (cells.length === 1) { // footer-brand-list
      const brandText = cells[0].textContent.trim();
      const li = document.createElement('li');
      li.classList.add('elementor-icon-list-item');
      moveInstrumentation(row, li);
      const span = document.createElement('span');
      span.classList.add('elementor-icon-list-text');
      span.textContent = brandText;
      li.append(span);
      ourBrandsUl.append(li);
    } else if (cells.length === 2 && firstCellHasRichText && secondCellHasLink) { // footer-contact-list with link
      const textContent = cells[0].innerHTML;
      const linkEl = cells[1].querySelector('a');

      const li = document.createElement('li');
      li.classList.add('elementor-icon-list-item');
      moveInstrumentation(row, li);

      const a = document.createElement('a');
      a.href = linkEl.href;
      if (linkEl.target) a.target = linkEl.target;

      const span = document.createElement('span');
      span.classList.add('elementor-icon-list-text');
      span.innerHTML = textContent;
      a.append(span);
      li.append(a);
      contactUl.append(li);
    } else if (cells.length === 1 && firstCellHasRichText && !firstCellHasLink) { // footer-contact-list without link
      const textContent = cells[0].innerHTML;

      const li = document.createElement('li');
      li.classList.add('elementor-icon-list-item');
      moveInstrumentation(row, li);

      const span = document.createElement('span');
      span.classList.add('elementor-icon-list-text');
      span.innerHTML = textContent;
      li.append(span);
      contactUl.append(li);
    } else if (cells.length === 2 && firstCellHasLink && secondCellHasPicture) { // footer-social-link
      const linkEl = cells[0].querySelector('a');
      const picture = cells[1].querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;

      if (linkEl && img) {
        const spanGridItem = document.createElement('span');
        spanGridItem.classList.add('elementor-grid-item');
        moveInstrumentation(row, spanGridItem);

        const a = document.createElement('a');
        a.classList.add('elementor-icon', 'elementor-social-icon', 'elementor-social-icon-linkedin', 'elementor-repeater-item-52dfe65'); // Add specific social icon class if needed
        a.href = linkEl.href;
        a.target = '_blank'; // Social links typically open in new tab

        const screenOnlySpan = document.createElement('span');
        screenOnlySpan.classList.add('elementor-screen-only');
        screenOnlySpan.textContent = img.alt || 'Social Icon';
        a.append(screenOnlySpan);

        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]); // Adjust width as needed
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        a.append(optimizedPic);
        spanGridItem.append(a);
        socialGrid.append(spanGridItem);
      }
    } else if (cells.length === 2 && firstCellHasPicture && secondCellHasLink) { // footer-logo
      const picture = cells[0].querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;
      const linkEl = cells[1].querySelector('a');

      if (img && linkEl) {
        const a = document.createElement('a');
        a.href = linkEl.href;
        moveInstrumentation(row, a);

        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '1897' }]); // Use original width
        optimizedPic.querySelector('img').classList.add('attachment-full', 'size-full', 'wp-image-75');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        a.append(optimizedPic);
        footerLogoWrapper.append(a);
      }
    }
  });

  block.textContent = '';
  block.append(mainContainer);
}
