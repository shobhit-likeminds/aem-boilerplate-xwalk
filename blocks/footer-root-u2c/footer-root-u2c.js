import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    popularSearchesRow,
    copyrightRow,
    bottomLinksRow,
    visaCardImageRow,
    ...footerLinkSectionRows
  ] = [...block.children];

  block.textContent = '';

  const footerRoot = document.createElement('footer');
  footerRoot.classList.add(
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
  footerRoot.append(footerLinksCustom);

  // Placeholder for social icons and newsletter, not directly in EDS model
  // but present in original HTML, so we create a div for structure.
  const footerCustomSocialIcons = document.createElement('div');
  footerCustomSocialIcons.classList.add(
    'footer-custom_socialicons-AkO',
    'grid',
    'border-b',
    'pb-xs',
    'mb-xs',
  );
  footerLinksCustom.append(footerCustomSocialIcons);

  // Footer Link Sections
  const footerCmsFooterLink = document.createElement('div');
  footerCmsFooterLink.classList.add('footer-cms_footer_link-W9u');
  const cmsBlockRoot = document.createElement('div');
  cmsBlockRoot.classList.add('cmsBlock-root-rsi');
  const cmsBlockContent = document.createElement('div');
  cmsBlockContent.classList.add('cmsBlock-content-BTy');
  const richContent = document.createElement('div');
  richContent.classList.add('richContent-root-Byp');
  const htmlRoot = document.createElement('div');
  htmlRoot.classList.add('html-root-Uwa');
  htmlRoot.setAttribute('role', 'presentation');
  const footerLinkSec = document.createElement('div');
  footerLinkSec.classList.add('footer_link_sec');

  footerLinkSectionRows.forEach((row) => {
    const cells = [...row.children];
    const sectionTitleCell = cells.find(cell => !cell.querySelector('input') && !cell.querySelector('a'));
    const sectionItemsCell = cells.find(cell => cell.textContent.trim() === 'true'); // checkbox-group value

    if (sectionTitleCell && sectionItemsCell) {
      const ul = document.createElement('ul');
      const li = document.createElement('li');
      moveInstrumentation(row, li);

      const input = document.createElement('input');
      const inputId = sectionTitleCell.textContent.replace(/\s+/g, '');
      input.id = inputId;
      input.setAttribute('tabindex', '0');
      input.name = inputId;
      input.type = 'checkbox';
      input.value = inputId;
      input.setAttribute('aria-label', sectionTitleCell.textContent.toLowerCase().replace(/\s+/g, '-'));

      const span = document.createElement('span');
      span.classList.add('footerAccordianTitle');
      span.textContent = sectionTitleCell.textContent;

      li.append(input, span);

      // The actual nested links are not part of the EDS model for 'section-items'
      // but are expected by the original HTML structure.
      // Since the EDS model only has a checkbox-group for 'section-items',
      // we'll leave this part as a placeholder or assume it's handled by other blocks
      // if the original HTML had dynamic content here.
      // For now, we just append the title as per the EDS model.
      // To match the original HTML, we need to add a placeholder for the nested UL.
      // Since the EDS model doesn't provide this content, we'll create an empty one
      // and rely on potential client-side rendering or other blocks to populate it.
      const nestedUl = document.createElement('ul');
      nestedUl.classList.add('footerAccordian'); // Class from original HTML
      li.append(nestedUl);

      ul.append(li);
      footerLinkSec.append(ul);

      // Add event listener for accordion functionality
      input.addEventListener('change', () => {
        if (input.checked) {
          nestedUl.style.display = 'block';
        } else {
          nestedUl.style.display = 'none';
        }
      });
    }
  });

  htmlRoot.append(footerLinkSec);
  richContent.append(htmlRoot);
  cmsBlockContent.append(richContent);
  footerCmsFooterLink.append(cmsBlockRoot);
  cmsBlockRoot.append(cmsBlockContent);
  footerLinksCustom.append(footerCmsFooterLink);

  // Popular Searches
  const popularSearchesContainer = document.createElement('div');
  popularSearchesContainer.classList.add('cmsBlock-root-rsi');
  const popularSearchesContent = document.createElement('div');
  popularSearchesContent.classList.add('cmsBlock-content-BTy');
  const popularSearchesRichContent = document.createElement('div');
  popularSearchesRichContent.classList.add('richContent-root-Byp');
  const popularSearchesHtmlRoot = document.createElement('div');
  popularSearchesHtmlRoot.classList.add('html-root-Uwa');
  popularSearchesHtmlRoot.setAttribute('role', 'presentation');
  moveInstrumentation(popularSearchesRow, popularSearchesHtmlRoot);
  while (popularSearchesRow.firstChild) {
    popularSearchesHtmlRoot.append(popularSearchesRow.firstChild);
  }
  popularSearchesRichContent.append(popularSearchesHtmlRoot);
  popularSearchesContent.append(popularSearchesRichContent);
  popularSearchesContainer.append(popularSearchesContent);
  footerLinksCustom.append(popularSearchesContainer);

  // Footer Brandings (Copyright and Bottom Links)
  const footerBrandings = document.createElement('div');
  footerBrandings.classList.add('footer-brandings-I1l', 'py-5');
  const brandingContainer = document.createElement('div');
  brandingContainer.classList.add('footer-branding_container-0It', 'flex', 'justify-between');
  footerBrandings.append(brandingContainer);

  // Copyright
  const copyrightP = document.createElement('p');
  copyrightP.classList.add('footer-copyright-dyU', 'text-center');
  moveInstrumentation(copyrightRow, copyrightP);
  while (copyrightRow.firstChild) {
    copyrightP.append(copyrightRow.firstChild);
  }
  brandingContainer.append(copyrightP);

  // Bottom Links
  const bottomLinksCmsBlock = document.createElement('div');
  bottomLinksCmsBlock.classList.add('cmsBlock-root-rsi');
  const bottomLinksCmsContent = document.createElement('div');
  bottomLinksCmsContent.classList.add('cmsBlock-content-BTy');
  const bottomLinksRichContent = document.createElement('div');
  bottomLinksRichContent.classList.add('richContent-root-Byp');
  const bottomLinksHtmlRoot = document.createElement('div');
  bottomLinksHtmlRoot.classList.add('html-root-Uwa');
  bottomLinksHtmlRoot.setAttribute('role', 'presentation');

  const bottomLinksUl = document.createElement('ul');
  bottomLinksUl.classList.add('footer_bottom_link');

  // Use content detection for bottom links as well
  const bottomLinkCells = [...bottomLinksRow.children];
  bottomLinkCells.forEach(cell => {
    const link = cell.querySelector('a');
    if (link) {
      const li = document.createElement('li');
      moveInstrumentation(cell, li);
      li.append(link);
      bottomLinksUl.append(li);
    }
  });

  bottomLinksHtmlRoot.append(bottomLinksUl);
  bottomLinksRichContent.append(bottomLinksHtmlRoot);
  bottomLinksCmsContent.append(bottomLinksRichContent);
  bottomLinksCmsBlock.append(bottomLinksCmsContent);
  brandingContainer.append(bottomLinksCmsBlock);

  // Visa Card Image
  const visaCardDiv = document.createElement('div');
  visaCardDiv.classList.add('footer-visa_card-V6y');
  const visaCardPicture = visaCardImageRow.querySelector('picture');
  if (visaCardPicture) {
    const img = visaCardPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '185' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      visaCardDiv.append(optimizedPic);
    }
  }
  brandingContainer.append(visaCardDiv);

  block.append(footerRoot);

  // Add event listener for newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form-4nF');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailInput = newsletterForm.querySelector('#email');
      if (emailInput && emailInput.value) {
        // eslint-disable-next-line no-console
        console.log('Newsletter subscription submitted:', emailInput.value);
        // Here you would typically send the data to a backend service
        // For now, we'll just log it and clear the input
        emailInput.value = '';
        alert('Thank you for subscribing!');
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }
}
