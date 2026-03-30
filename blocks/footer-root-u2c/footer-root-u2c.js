import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  // Destructure the known single-row fields first
  const [
    popularSearchesRow,
    copyrightRow,
    visaImageRow,
    ...remainingRows
  ] = children;

  // Filter item rows from the remainingRows
  const socialLinks = remainingRows.filter(
    (row) => row.children.length === 2 && row.querySelector('a') && row.querySelector('picture'),
  );
  const appLinks = remainingRows.filter(
    (row) => row.children.length === 2 && row.querySelector('a') && row.querySelector('picture') && socialLinks.indexOf(row) === -1,
  );
  const accordions = remainingRows.filter(
    (row) => row.children.length === 2 && !row.querySelector('a') && !row.querySelector('picture'),
  );
  const bottomLinks = remainingRows.filter((row) => row.children.length === 1 && row.querySelector('a'));

  block.textContent = '';
  block.classList.add(
    'footer-root-u2C',
    'border-t-2',
    'border-solid',
    'border-light',
    'gap-y-4',
    'grid',
    'leading-normal',
    'mx-auto',
    'pt-8',
    'text-sm',
    'text-subtle',
    'w-full',
  );

  const footerLinksCustom = document.createElement('div');
  footerLinksCustom.classList.add('footer-links_custom-hGP', 'grid');

  const footerCustomSocialIcons = document.createElement('div');
  footerCustomSocialIcons.classList.add('footer-custom_socialicons-AkO', 'grid', 'border-b', 'pb-xs', 'mb-xs');

  // Newsletter section (hardcoded as per original HTML structure)
  const newsletterRoot = document.createElement('div');
  newsletterRoot.classList.add('newsletter-root-vPn', 'gap-none', 'grid', 'items-start', 'relative');

  const newsletterTitle = document.createElement('span');
  newsletterTitle.classList.add('newsletter-title-3KR', 'block', 'text-colorDefault', 'text-sm');
  newsletterTitle.textContent = 'Sign up for The Circle Program';

  const newsletterText = document.createElement('p');
  newsletterText.classList.add('newsletter-newsletter_text-YrL');
  newsletterText.textContent = 'Subscribe to receive updates, access to exclusive deals, and more.';

  const newsletterForm = document.createElement('form');
  newsletterForm.classList.add('newsletter-form-4nF', 'relative', 'grid');

  const fieldRoot = document.createElement('div');
  fieldRoot.classList.add('field-root-HJ-', 'content-start', 'grid', 'text-colorDefault');

  const fieldLabel = document.createElement('label');
  fieldLabel.classList.add('field-label-ZLF', 'flex', 'items-center', 'justify-between', 'leading-none', 'px-0', 'py-2.5', 'pb-0');
  fieldLabel.setAttribute('for', 'email');
  fieldLabel.textContent = 'Email';

  const fieldIconsRoot = document.createElement('span');
  fieldIconsRoot.classList.add('fieldIcons-root-ecG', 'grid-flow-col', 'h-[2.5rem]', 'inline-grid', 'w-full');
  fieldIconsRoot.style.setProperty('--iconsBefore', '0');
  fieldIconsRoot.style.setProperty('--iconsAfter', '0');

  const fieldIconsInput = document.createElement('span');
  fieldIconsInput.classList.add('fieldIcons-input-Ced', 'items-center', 'flex');

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

  const fieldIconsAfter = document.createElement('span');
  fieldIconsAfter.classList.add('fieldIcons-after-xwp', 'flex', 'items-center', 'justify-center', 'mx-0.5', 'my-0', 'pointer-events-none', 'w-[2.5rem]', 'z-foreground');

  fieldIconsRoot.append(fieldIconsInput, fieldIconsBefore, fieldIconsAfter);

  const messageRoot = document.createElement('p');
  messageRoot.classList.add('message-root-B-9', 'font-normal', 'leading-none', 'pb-0.5', 'px-0.5', 'text-colorDefault');

  fieldRoot.append(fieldLabel, fieldIconsRoot, messageRoot);

  const subscribeLink = document.createElement('button');
  subscribeLink.classList.add('newsletter-subscribe_link-Cwe', 'hidden', 'max-h-[100px]', 'px-3', 'py-0', 'right-1', 'text-colorDefault', 'top-0', 'underline', 'md_inline-block', 'text-white', 'px-7', 'whitespace-nowrap', 'no-underline');
  subscribeLink.setAttribute('type', 'submit');
  subscribeLink.setAttribute('tabindex', '0');
  const subscribeLinkContent = document.createElement('span');
  subscribeLinkContent.classList.add('button-content-ouv', 'gap-1.5', 'grid-flow-col', 'inline-grid', 'items-center', 'justify-center', 'justify-items-center');
  subscribeLinkContent.textContent = 'Join Us';
  subscribeLink.append(subscribeLinkContent);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('newsletter-buttonsContainer-DOG', 'gap-sm', 'grid', 'grid-flow-row', 'justify-center', 'mt-xs', 'w-full', 'md_hidden');
  const joinUsButton = document.createElement('button');
  joinUsButton.classList.add('button-root_normalPriority-Z4b', 'button-root-3iv', 'border-[1px]', 'border-solid', 'cursor-pointer', 'inline-flex', 'items-center', 'justify-center', 'leading-tight', 'max-w-full', 'min-w-[10rem]', 'outline-none', 'pointer-events-auto', 'px-sm', 'text-center', 'text-sm', 'uppercase', 'disabled_bg-gray-400', 'disabled_border-gray-400', 'disabled_opacity-50', 'disabled_pointer-events-none', 'disabled_text-white', 'focus_shadow-inputFocus', 'bg-blue-60', 'border-blue-60', 'text-white', 'active_bg-blue-80', 'active_border-blue-80', 'active_text-white', 'hover_bg-blue-80', 'hover_border-blue-80', 'hover_text-white', 'min-w-[6.3rem]');
  joinUsButton.setAttribute('type', 'submit');
  joinUsButton.setAttribute('tabindex', '0');
  const joinUsButtonContent = document.createElement('span');
  joinUsButtonContent.classList.add('button-content-ouv', 'gap-1.5', 'grid-flow-col', 'inline-grid', 'items-center', 'justify-center', 'justify-items-center');
  joinUsButtonContent.textContent = 'Join Us';
  joinUsButton.append(joinUsButtonContent);
  buttonsContainer.append(joinUsButton);

  newsletterForm.append(fieldRoot, subscribeLink, buttonsContainer);
  newsletterRoot.append(newsletterTitle, newsletterText, newsletterForm);
  footerCustomSocialIcons.append(newsletterRoot);

  const socialAppContainer = document.createElement('div');

  const socialLinksUl = document.createElement('ul');
  socialLinksUl.classList.add('footer-socialLinks-Dfa', 'gap-xs', 'grid', 'grid-flow-col', 'justify-start', 'py-5');

  socialLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const linkCell = row.children[0]; // Link is in the first cell
    const iconCell = row.children[1]; // Icon is in the second cell

    if (linkCell && iconCell) {
      const link = document.createElement('a');
      link.href = linkCell.querySelector('a')?.href || '#';
      link.target = '_blank';
      link.setAttribute('aria-label', linkCell.textContent.trim().toLowerCase());

      const img = iconCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        link.append(optimizedPic);
      }
      li.append(link);
    }
    socialLinksUl.append(li);
  });
  socialAppContainer.append(socialLinksUl);

  const appImageDiv = document.createElement('div');
  appImageDiv.classList.add('footer-app_image-y-E', 'flex');

  appLinks.forEach((row) => {
    const linkCell = row.children[0]; // Link is in the first cell
    const imageCell = row.children[1]; // Image is in the second cell

    if (linkCell && imageCell) {
      const link = document.createElement('a');
      link.href = linkCell.querySelector('a')?.href || '#';
      link.target = '_blank';
      link.setAttribute('aria-label', linkCell.textContent.trim().toLowerCase());

      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '130' }]);
        optimizedPic.querySelector('img').classList.add('footer-appIcon-S1J');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        link.append(optimizedPic);
      }
      appImageDiv.append(link);
    }
  });
  socialAppContainer.append(appImageDiv);
  footerCustomSocialIcons.append(socialAppContainer);
  footerLinksCustom.append(footerCustomSocialIcons);

  const cmsFooterLink = document.createElement('div');
  cmsFooterLink.classList.add('footer-cms_footer_link-W9u');

  const cmsBlockRoot = document.createElement('div');
  cmsBlockRoot.classList.add('cmsBlock-root-rsi');

  const cmsBlockContent = document.createElement('div');
  cmsBlockContent.classList.add('cmsBlock-content-BTy');

  const richContentRoot = document.createElement('div');
  richContentRoot.classList.add('richContent-root-Byp');

  const htmlRoot = document.createElement('div');
  htmlRoot.classList.add('html-root-Uwa');
  htmlRoot.setAttribute('role', 'presentation');

  const footerLinkSec = document.createElement('div');
  footerLinkSec.classList.add('footer_link_sec');

  const accordionsUl = document.createElement('ul');
  accordions.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const titleCell = row.children[0];
    const linksCell = row.children[1];

    const input = document.createElement('input');
    const id = titleCell.textContent.trim().replace(/\s/g, '');
    input.setAttribute('id', id);
    input.setAttribute('tabindex', '0');
    input.setAttribute('name', id);
    input.setAttribute('type', 'checkbox');
    input.setAttribute('value', id);
    input.setAttribute('aria-label', titleCell.textContent.trim().toLowerCase());

    const titleSpan = document.createElement('span');
    titleSpan.classList.add('footerAccordianTitle');
    titleSpan.textContent = titleCell.textContent.trim();

    // Add event listener for accordion toggle
    titleSpan.addEventListener('click', () => {
      input.checked = !input.checked;
    });
    input.addEventListener('change', () => {
      // This listener ensures the state is correctly reflected if changed by other means
    });

    li.append(input, titleSpan);

    const linksUl = document.createElement('ul');
    linksUl.classList.add('footerAccordian');
    // The links cell contains nested <ul> structures, so we need to iterate through its children
    // and then find 'a' tags within those children.
    [...linksCell.children].forEach((linkContainer) => {
      // linkContainer could be a <ul> or <li> directly containing <a> or more <ul>
      const nestedLinks = linkContainer.querySelectorAll('a');
      nestedLinks.forEach((linkA) => {
        const linkLi = document.createElement('li');
        moveInstrumentation(linkA.closest('li') || linkContainer, linkLi); // Use closest li for instrumentation if available
        const newLink = document.createElement('a');
        newLink.href = linkA.href;
        newLink.textContent = linkA.textContent;
        newLink.setAttribute('tabindex', '0');
        newLink.setAttribute('aria-label', linkA.textContent.trim().toLowerCase());
        linkLi.append(newLink);
        linksUl.append(linkLi);
      });
    });
    li.append(linksUl);
    accordionsUl.append(li);
  });
  footerLinkSec.append(accordionsUl);

  htmlRoot.append(footerLinkSec);
  richContentRoot.append(htmlRoot);
  cmsBlockContent.append(richContentRoot);
  cmsBlockRoot.append(cmsBlockContent);
  cmsFooterLink.append(cmsBlockRoot);
  footerLinksCustom.append(cmsFooterLink);

  const popularSearchesCmsBlock = document.createElement('div');
  popularSearchesCmsBlock.classList.add('cmsBlock-root-rsi');
  const popularSearchesCmsBlockContent = document.createElement('div');
  popularSearchesCmsBlockContent.classList.add('cmsBlock-content-BTy');
  const popularSearchesRichContent = document.createElement('div');
  popularSearchesRichContent.classList.add('richContent-root-Byp');
  const popularSearchesHtmlRoot = document.createElement('div');
  popularSearchesHtmlRoot.classList.add('html-root-Uwa');
  popularSearchesHtmlRoot.setAttribute('role', 'presentation');
  moveInstrumentation(popularSearchesRow, popularSearchesHtmlRoot);
  // Ensure we append the content of the first cell of popularSearchesRow
  if (popularSearchesRow && popularSearchesRow.children[0]) {
    while (popularSearchesRow.children[0].firstChild) {
      popularSearchesHtmlRoot.append(popularSearchesRow.children[0].firstChild);
    }
  }
  popularSearchesRichContent.append(popularSearchesHtmlRoot);
  popularSearchesCmsBlockContent.append(popularSearchesRichContent);
  popularSearchesCmsBlock.append(popularSearchesCmsBlockContent);

  const footerBrandings = document.createElement('div');
  footerBrandings.classList.add('footer-brandings-I1l', 'py-5');

  const brandingContainer = document.createElement('div');
  brandingContainer.classList.add('footer-branding_container-0It', 'flex', 'justify-between');

  const copyrightP = document.createElement('p');
  copyrightP.classList.add('footer-copyright-dyU', 'text-center');
  moveInstrumentation(copyrightRow, copyrightP);
  // Ensure we append the content of the first cell of copyrightRow
  if (copyrightRow && copyrightRow.children[0]) {
    while (copyrightRow.children[0].firstChild) {
      copyrightP.append(copyrightRow.children[0].firstChild);
    }
  }

  const bottomLinksCmsBlock = document.createElement('div');
  bottomLinksCmsBlock.classList.add('cmsBlock-root-rsi');
  const bottomLinksCmsBlockContent = document.createElement('div');
  bottomLinksCmsBlockContent.classList.add('cmsBlock-content-BTy');
  const bottomLinksRichContent = document.createElement('div');
  bottomLinksRichContent.classList.add('richContent-root-Byp');
  const bottomLinksHtmlRoot = document.createElement('div');
  bottomLinksHtmlRoot.classList.add('html-root-Uwa');
  bottomLinksHtmlRoot.setAttribute('role', 'presentation');

  const bottomLinksUl = document.createElement('ul');
  bottomLinksUl.classList.add('footer_bottom_link');
  bottomLinks.forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const link = row.querySelector('a'); // Link is in the first cell
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      newLink.setAttribute('tabindex', '0');
      li.append(newLink);
    }
    bottomLinksUl.append(li);
    if (index < bottomLinks.length - 1) {
      const separator = document.createElement('li');
      separator.style.padding = '0 2px';
      separator.textContent = '/';
      bottomLinksUl.append(separator);
    }
  });
  bottomLinksHtmlRoot.append(bottomLinksUl);
  bottomLinksRichContent.append(bottomLinksHtmlRoot);
  bottomLinksCmsBlockContent.append(bottomLinksRichContent);
  bottomLinksCmsBlock.append(bottomLinksCmsBlockContent);

  const visaCardDiv = document.createElement('div');
  visaCardDiv.classList.add('footer-visa_card-V6y');
  // Visa image is in the first cell of visaImageRow
  const visaImg = visaImageRow?.children[0]?.querySelector('img');
  if (visaImg) {
    const optimizedPic = createOptimizedPicture(visaImg.src, visaImg.alt, false, [{ width: '185' }]);
    optimizedPic.querySelector('img').width = '185';
    optimizedPic.querySelector('img').height = '25';
    moveInstrumentation(visaImg, optimizedPic.querySelector('img'));
    visaCardDiv.append(optimizedPic);
  }

  brandingContainer.append(copyrightP, bottomLinksCmsBlock, visaCardDiv);
  footerBrandings.append(brandingContainer);

  block.append(footerLinksCustom, popularSearchesCmsBlock, footerBrandings);

  block.querySelectorAll('picture > img').forEach((img) => {
    if (!img.closest('.footer-app_image-y-E') && !img.closest('.footer-visa_card-V6y')) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      img.closest('picture').replaceWith(optimizedPic);
    }
  });
}
