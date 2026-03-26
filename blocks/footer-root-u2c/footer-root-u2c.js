import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    footerSocialLinksContainer, // block.children[0]
    footerAppLinksContainer,    // block.children[1]
    footerLinkSectionsContainer, // block.children[2]
    footerBottomLinksContainer, // block.children[3]
    copyrightRow,               // block.children[4]
    ...itemRows                 // All subsequent rows are item rows
  ] = [...block.children];

  block.textContent = '';
  block.classList.add('border-t-2', 'border-solid', 'border-light', 'gap-y-4', 'grid', 'leading-normal', 'mx-auto', 'pt-8', 'text-sm', 'text-subtle', 'w-full');

  const footerLinksCustom = document.createElement('div');
  footerLinksCustom.classList.add('footer-links_custom-hGP', 'grid');
  block.append(footerLinksCustom);

  const socialAppWrapper = document.createElement('div');
  socialAppWrapper.classList.add('footer-custom_socialicons-AkO', 'grid', 'border-b', 'pb-xs', 'mb-xs');
  footerLinksCustom.append(socialAppWrapper);

  // Newsletter section (hardcoded as per original HTML structure, not from EDS model)
  const newsletterRoot = document.createElement('div');
  newsletterRoot.classList.add('newsletter-root-vPn', 'gap-none', 'grid', 'items-start', 'relative');
  socialAppWrapper.append(newsletterRoot);

  const newsletterTitle = document.createElement('span');
  newsletterTitle.classList.add('newsletter-title-3KR', 'block', 'text-colorDefault', 'text-sm');
  newsletterTitle.textContent = 'Sign up for The Circle Program';
  newsletterRoot.append(newsletterTitle);

  const newsletterText = document.createElement('p');
  newsletterText.classList.add('newsletter-newsletter_text-YrL');
  newsletterText.textContent = 'Subscribe to receive updates, access to exclusive deals, and more.';
  newsletterRoot.append(newsletterText);

  const newsletterForm = document.createElement('form');
  newsletterForm.classList.add('newsletter-form-4nF', 'relative', 'grid');
  newsletterRoot.append(newsletterForm);

  const fieldRoot = document.createElement('div');
  fieldRoot.classList.add('field-root-HJ-', 'content-start', 'grid', 'text-colorDefault');
  newsletterForm.append(fieldRoot);

  const emailLabel = document.createElement('label');
  emailLabel.classList.add('field-label-ZLF', 'flex', 'items-center', 'justify-between', 'leading-none', 'px-0', 'py-2.5', 'pb-0');
  emailLabel.setAttribute('for', 'email');
  emailLabel.textContent = 'Email';
  fieldRoot.append(emailLabel);

  const fieldIconsRoot = document.createElement('span');
  fieldIconsRoot.classList.add('fieldIcons-root-ecG', 'grid-flow-col', 'h-[2.5rem]', 'inline-grid', 'w-full');
  fieldIconsRoot.style.setProperty('--iconsBefore', '0');
  fieldIconsRoot.style.setProperty('--iconsAfter', '0');
  fieldRoot.append(fieldIconsRoot);

  const fieldIconsInput = document.createElement('span');
  fieldIconsInput.classList.add('fieldIcons-input-Ced', 'items-center', 'flex');
  fieldIconsRoot.append(fieldIconsInput);

  const emailInput = document.createElement('input');
  emailInput.classList.add('textInput-input-Jz0', 'field-input-2Mu', 'appearance-none', 'bg-white', 'border-2', 'border-solid', 'border-input', 'flex-textInput', 'h-[2.5rem]', 'inline-flex', 'm-0', 'max-w-full', 'rounded-input', 'text-colorDefault', 'w-full', 'focus_outline-none', 'focus_shadow-inputFocus', 'disabled_text-subtle');
  emailInput.setAttribute('autocomplete', 'email');
  emailInput.setAttribute('placeholder', 'you@email.com');
  emailInput.setAttribute('id', 'email');
  emailInput.setAttribute('name', 'email');
  emailInput.setAttribute('value', '');
  fieldIconsInput.append(emailInput);

  const fieldIconsBefore = document.createElement('span');
  fieldIconsBefore.classList.add('fieldIcons-before-G3M', 'flex', 'items-center', 'justify-center', 'mx-0.5', 'my-0', 'pointer-events-none', 'w-[2.5rem]', 'z-foreground');
  fieldIconsRoot.append(fieldIconsBefore);

  const fieldIconsAfter = document.createElement('span');
  fieldIconsAfter.classList.add('fieldIcons-after-xwp', 'flex', 'items-center', 'justify-center', 'mx-0.5', 'my-0', 'pointer-events-none', 'w-[2.5rem]', 'z-foreground');
  fieldIconsRoot.append(fieldIconsAfter);

  const messageRoot = document.createElement('p');
  messageRoot.classList.add('message-root-B-9', 'font-normal', 'leading-none', 'pb-0.5', 'px-0.5', 'text-colorDefault');
  fieldRoot.append(messageRoot);

  const subscribeLink = document.createElement('button');
  subscribeLink.classList.add('newsletter-subscribe_link-Cwe', 'hidden', 'max-h-[100px]', 'px-3', 'py-0', 'right-1', 'text-colorDefault', 'top-0', 'underline', 'md_inline-block', 'text-white', 'px-7', 'whitespace-nowrap', 'no-underline');
  subscribeLink.setAttribute('type', 'submit');
  subscribeLink.setAttribute('tabindex', '0');
  const subscribeLinkContent = document.createElement('span');
  subscribeLinkContent.classList.add('button-content-ouv', 'gap-1.5', 'grid-flow-col', 'inline-grid', 'items-center', 'justify-center', 'justify-items-center');
  subscribeLinkContent.textContent = 'Join Us';
  subscribeLink.append(subscribeLinkContent);
  newsletterForm.append(subscribeLink);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('newsletter-buttonsContainer-DOG', 'gap-sm', 'grid', 'grid-flow-row', 'justify-center', 'mt-xs', 'w-full', 'md_hidden');
  newsletterForm.append(buttonsContainer);

  const joinUsButton = document.createElement('button');
  joinUsButton.classList.add('button-root_normalPriority-Z4b', 'button-root-3iv', 'border-[1px]', 'border-solid', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-tight', 'max-w-full', 'min-w-[10rem]', 'outline-none', 'pointer-events-auto', 'px-sm', 'text-center', 'text-sm', 'uppercase', 'disabled_bg-gray-400', 'disabled_border-gray-400', 'disabled_opacity-50', 'disabled_pointer-events-none', 'disabled_text-white', 'focus_shadow-inputFocus', 'bg-blue-60', 'border-blue-60', 'text-white', 'active_bg-blue-80', 'active_border-blue-80', 'active_text-white', 'hover_bg-blue-80', 'hover_border-blue-80', 'hover_text-white', 'min-w-[6.3rem]');
  joinUsButton.setAttribute('type', 'submit');
  joinUsButton.setAttribute('tabindex', '0');
  const joinUsButtonContent = document.createElement('span');
  joinUsButtonContent.classList.add('button-content-ouv', 'gap-1.5', 'grid-flow-col', 'inline-grid', 'items-center', 'justify-center', 'justify-items-center');
  joinUsButtonContent.textContent = 'Join Us';
  joinUsButton.append(joinUsButtonContent);
  buttonsContainer.append(joinUsButton);

  const socialAppDiv = document.createElement('div');
  socialAppWrapper.append(socialAppDiv);

  // Footer Social Links
  const socialLinksUl = document.createElement('ul');
  socialLinksUl.classList.add('footer-socialLinks-Dfa', 'gap-xs', 'grid', 'grid-flow-col', 'justify-start', 'py-5');
  socialAppDiv.append(socialLinksUl);

  // Filter itemRows for footer-social-link (2 cells: url, icon)
  const socialLinkItems = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a') && row.children[1].querySelector('picture'));
  socialLinkItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const link = row.children[0].querySelector('a');
    const picture = row.children[1].querySelector('picture');
    const img = picture ? picture.querySelector('img') : null;

    if (link && img) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.setAttribute('aria-label', link.textContent.trim().toLowerCase());

      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      newLink.append(optimizedPic);
      li.append(newLink);
      socialLinksUl.append(li);
    }
  });

  // Footer App Links
  const appImageDiv = document.createElement('div');
  appImageDiv.classList.add('footer-app_image-y-E', 'flex');
  socialAppDiv.append(appImageDiv);

  // Filter itemRows for footer-app-link (2 cells: url, icon)
  const appLinkItems = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a') && row.children[1].querySelector('picture'));
  appLinkItems.forEach((row) => {
    const link = row.children[0].querySelector('a');
    const picture = row.children[1].querySelector('picture');
    const img = picture ? picture.querySelector('img') : null;

    if (link && img) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.setAttribute('aria-label', link.textContent.trim().toLowerCase());

      const newImg = document.createElement('img');
      newImg.classList.add('footer-appIcon-S1J');
      newImg.alt = img.alt;
      newImg.src = img.src;
      newImg.width = 130;
      newImg.height = 50;
      newLink.append(newImg);
      appImageDiv.append(newLink);
    }
  });

  // Footer Link Sections (CMS Block content)
  const cmsFooterLink = document.createElement('div');
  cmsFooterLink.classList.add('footer-cms_footer_link-W9u');
  footerLinksCustom.append(cmsFooterLink);

  const cmsBlockRoot = document.createElement('div');
  cmsBlockRoot.classList.add('cmsBlock-root-rsi');
  cmsFooterLink.append(cmsBlockRoot);

  const cmsBlockContent = document.createElement('div');
  cmsBlockContent.classList.add('cmsBlock-content-BTy');
  cmsBlockRoot.append(cmsBlockContent);

  const richContent = document.createElement('div');
  richContent.classList.add('richContent-root-Byp');
  cmsBlockContent.append(richContent);

  const htmlRoot = document.createElement('div');
  htmlRoot.classList.add('html-root-Uwa');
  htmlRoot.setAttribute('role', 'presentation');
  richContent.append(htmlRoot);

  const footerLinkSec = document.createElement('div');
  footerLinkSec.classList.add('footer_link_sec');
  htmlRoot.append(footerLinkSec);

  // Move content from footerLinkSectionsContainer directly into footerLinkSec
  moveInstrumentation(footerLinkSectionsContainer, footerLinkSec);
  while (footerLinkSectionsContainer.firstChild) {
    footerLinkSec.append(footerLinkSectionsContainer.firstChild);
  }

  // Add event listeners for accordion functionality in footerLinkSec
  footerLinkSec.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const parentLi = event.target.closest('li');
      if (parentLi) {
        parentLi.querySelectorAll('.footerAccordian').forEach((accordion) => {
          if (event.target.checked) {
            accordion.style.display = 'block';
          } else {
            accordion.style.display = 'none';
          }
        });
      }
    });
  });

  // Footer Brandings
  const footerBrandings = document.createElement('div');
  footerBrandings.classList.add('footer-brandings-I1l', 'py-5');
  block.append(footerBrandings);

  const brandingContainer = document.createElement('div');
  brandingContainer.classList.add('footer-branding_container-0It', 'flex', 'justify-between');
  footerBrandings.append(brandingContainer);

  const copyrightP = document.createElement('p');
  copyrightP.classList.add('footer-copyright-dyU', 'text-center');
  moveInstrumentation(copyrightRow, copyrightP);
  while (copyrightRow.firstChild) {
    copyrightP.append(copyrightRow.firstChild);
  }
  brandingContainer.append(copyrightP);

  const cmsBlockRootBottom = document.createElement('div');
  cmsBlockRootBottom.classList.add('cmsBlock-root-rsi');
  brandingContainer.append(cmsBlockRootBottom);

  const cmsBlockContentBottom = document.createElement('div');
  cmsBlockContentBottom.classList.add('cmsBlock-content-BTy');
  cmsBlockRootBottom.append(cmsBlockContentBottom);

  const richContentBottom = document.createElement('div');
  richContentBottom.classList.add('richContent-root-Byp');
  cmsBlockContentBottom.append(richContentBottom);

  const htmlRootBottom = document.createElement('div');
  htmlRootBottom.classList.add('html-root-Uwa');
  htmlRootBottom.setAttribute('role', 'presentation');
  richContentBottom.append(htmlRootBottom);

  const footerBottomLinkUl = document.createElement('ul');
  footerBottomLinkUl.classList.add('footer_bottom_link');
  htmlRootBottom.append(footerBottomLinkUl);

  // Filter itemRows for footer-bottom-link (2 cells: url, label)
  const bottomLinkItems = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('a') && row.children[1].textContent.trim());
  bottomLinkItems.forEach((row, index) => {
    const linkCell = row.children[0].querySelector('a');
    const labelCell = row.children[1].textContent.trim();

    if (linkCell && labelCell) {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      const link = document.createElement('a');
      link.href = linkCell.href;
      link.textContent = labelCell;
      link.setAttribute('tabindex', '0');
      li.append(link);
      footerBottomLinkUl.append(li);

      if (index < bottomLinkItems.length - 1) {
        const divider = document.createElement('li');
        divider.style.padding = '0 2px';
        divider.textContent = '/';
        footerBottomLinkUl.append(divider);
      }
    }
  });

  const visaCardDiv = document.createElement('div');
  visaCardDiv.classList.add('footer-visa_card-V6y');
  brandingContainer.append(visaCardDiv);

  const visaImg = document.createElement('img');
  visaImg.alt = 'visa card';
  visaImg.width = '185';
  visaImg.height = '25';
  visaImg.src = '/content/dam/aemigrate/uploaded-folder/image/visa-card-6uq.png';
  visaCardDiv.append(visaImg);
}
