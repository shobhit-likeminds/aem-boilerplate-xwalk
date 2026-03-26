import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
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

  const footerCustomSocialIcons = document.createElement('div');
  footerCustomSocialIcons.classList.add(
    'footer-custom_socialicons-AkO',
    'grid',
    'border-b',
    'pb-xs',
    'mb-xs',
  );

  const newsletterRoot = document.createElement('div');
  newsletterRoot.classList.add(
    'newsletter-root-vPn',
    'gap-none',
    'grid',
    'items-start',
    'relative',
  );

  const newsletterTitle = document.createElement('span');
  newsletterTitle.classList.add(
    'newsletter-title-3KR',
    'block',
    'text-colorDefault',
    'text-sm',
  );
  newsletterTitle.textContent = 'Sign up for The Circle Program';

  const newsletterText = document.createElement('p');
  newsletterText.classList.add('newsletter-newsletter_text-YrL');
  newsletterText.textContent =
    'Subscribe to receive updates, access to exclusive deals, and more.';

  const newsletterForm = document.createElement('form');
  newsletterForm.classList.add('newsletter-form-4nF', 'relative', 'grid');

  const fieldRoot = document.createElement('div');
  fieldRoot.classList.add(
    'field-root-HJ-',
    'content-start',
    'grid',
    'text-colorDefault',
  );

  const label = document.createElement('label');
  label.classList.add(
    'field-label-ZLF',
    'flex',
    'items-center',
    'justify-between',
    'leading-none',
    'px-0',
    'py-2.5',
    'pb-0',
  );
  label.setAttribute('for', 'email');
  label.textContent = 'Email';

  const fieldIconsRoot = document.createElement('span');
  fieldIconsRoot.classList.add(
    'fieldIcons-root-ecG',
    'grid-flow-col',
    'h-[2.5rem]',
    'inline-grid',
    'w-full',
  );
  fieldIconsRoot.style.setProperty('--iconsBefore', '0');
  fieldIconsRoot.style.setProperty('--iconsAfter', '0');

  const fieldIconsInput = document.createElement('span');
  fieldIconsInput.classList.add('fieldIcons-input-Ced', 'items-center', 'flex');

  const emailInput = document.createElement('input');
  emailInput.classList.add(
    'textInput-input-Jz0',
    'field-input-2Mu',
    'appearance-none',
    'bg-white',
    'border-2',
    'border-solid',
    'border-input',
    'flex-textInput',
    'h-[2.5rem]',
    'inline-flex',
    'm-0',
    'max-w-full',
    'rounded-input',
    'text-colorDefault',
    'w-full',
    'focus_outline-none',
    'focus_shadow-inputFocus',
    'disabled_text-subtle',
  );
  emailInput.setAttribute('autocomplete', 'email');
  emailInput.setAttribute('placeholder', 'you@email.com');
  emailInput.setAttribute('id', 'email');
  emailInput.setAttribute('name', 'email');
  emailInput.setAttribute('value', '');

  const fieldIconsBefore = document.createElement('span');
  fieldIconsBefore.classList.add(
    'fieldIcons-before-G3M',
    'flex',
    'items-center',
    'justify-center',
    'mx-0.5',
    'my-0',
    'pointer-events-none',
    'w-[2.5rem]',
    'z-foreground',
  );

  const fieldIconsAfter = document.createElement('span');
  fieldIconsAfter.classList.add(
    'fieldIcons-after-xwp',
    'flex',
    'items-center',
    'justify-center',
    'mx-0.5',
    'my-0',
    'pointer-events-none',
    'w-[2.5rem]',
    'z-foreground',
  );

  const messageRoot = document.createElement('p');
  messageRoot.classList.add(
    'message-root-B-9',
    'font-normal',
    'leading-none',
    'pb-0.5',
    'px-0.5',
    'text-colorDefault',
  );

  const subscribeButtonDesktop = document.createElement('button');
  subscribeButtonDesktop.classList.add(
    'newsletter-subscribe_link-Cwe',
    'hidden',
    'max-h-[100px]',
    'px-3',
    'py-0',
    'right-1',
    'text-colorDefault',
    'top-0',
    'underline',
    'md_inline-block',
    'text-white',
    'px-7',
    'whitespace-nowrap',
    'no-underline',
  );
  subscribeButtonDesktop.setAttribute('type', 'submit');
  subscribeButtonDesktop.setAttribute('tabindex', '0');
  const subscribeButtonDesktopSpan = document.createElement('span');
  subscribeButtonDesktopSpan.classList.add(
    'button-content-ouv',
    'gap-1.5',
    'grid-flow-col',
    'inline-grid',
    'items-center',
    'justify-center',
    'justify-items-center',
  );
  subscribeButtonDesktopSpan.textContent = 'Join Us';
  subscribeButtonDesktop.append(subscribeButtonDesktopSpan);

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add(
    'newsletter-buttonsContainer-DOG',
    'gap-sm',
    'grid',
    'grid-flow-row',
    'justify-center',
    'mt-xs',
    'w-full',
    'md_hidden',
  );

  const subscribeButtonMobile = document.createElement('button');
  subscribeButtonMobile.classList.add(
    'button-root_normalPriority-Z4b',
    'button-root-3iv',
    'border-[1px]',
    'border-solid',
    'cursor-pointer',
    'inline-flex',
    'items-center',
    'justify-center',
    'leading-tight',
    'max-w-full',
    'min-w-[10rem]',
    'outline-none',
    'pointer-events-auto',
    'px-sm',
    'text-center',
    'text-sm',
    'uppercase',
    'disabled_bg-gray-400',
    'disabled_border-gray-400',
    'disabled_opacity-50',
    'disabled_pointer-events-none',
    'disabled_text-white',
    'focus_shadow-inputFocus',
    'bg-blue-60',
    'border-blue-60',
    'text-white',
    'active_bg-blue-80',
    'active_border-blue-80',
    'active_text-white',
    'hover_bg-blue-80',
    'hover_border-blue-80',
    'hover_text-white',
    'min-w-[6.3rem]',
  );
  subscribeButtonMobile.setAttribute('type', 'submit');
  subscribeButtonMobile.setAttribute('tabindex', '0');
  const subscribeButtonMobileSpan = document.createElement('span');
  subscribeButtonMobileSpan.classList.add(
    'button-content-ouv',
    'gap-1.5',
    'grid-flow-col',
    'inline-grid',
    'items-center',
    'justify-center',
    'justify-items-center',
  );
  subscribeButtonMobileSpan.textContent = 'Join Us';
  subscribeButtonMobile.append(subscribeButtonMobileSpan);

  buttonsContainer.append(subscribeButtonMobile);

  fieldIconsInput.append(emailInput);
  fieldIconsRoot.append(fieldIconsInput, fieldIconsBefore, fieldIconsAfter);
  fieldRoot.append(label, fieldIconsRoot, messageRoot);
  newsletterForm.append(fieldRoot, subscribeButtonDesktop, buttonsContainer);
  newsletterRoot.append(newsletterTitle, newsletterText, newsletterForm);

  const socialLinksContainer = document.createElement('div');
  const socialLinksUl = document.createElement('ul');
  socialLinksUl.classList.add(
    'footer-socialLinks-Dfa',
    'gap-xs',
    'grid',
    'grid-flow-col',
    'justify-start',
    'py-5',
  );

  const socialLinks = [
    {
      href: 'https://www.facebook.com/wildcraft/',
      alt: 'facebook',
      src: '/content/dam/aemigrate/uploaded-folder/image/1774510727900.svg+xml',
    },
    {
      href: 'https://www.instagram.com/wildcraftin/',
      alt: 'instagram',
      src: '/content/dam/aemigrate/uploaded-folder/image/1774510728658.svg+xml',
      classes: ['footer-insta_footer_icon-yb-'],
    },
    {
      href: 'https://www.linkedin.com/company/wildcraft',
      alt: 'linkedin',
      src: '/content/dam/aemigrate/uploaded-folder/image/1774510728932.svg+xml',
    },
    {
      href: 'https://twitter.com/wildcrafttweet/',
      alt: 'twitter',
      src: '/content/dam/aemigrate/uploaded-folder/image/1774510729497.svg+xml',
    },
    {
      href: 'https://wa.me/9035313131',
      alt: 'whatsapp',
      src: '/content/dam/aemigrate/uploaded-folder/image/1774510729717.svg+xml',
    },
    {
      href: 'https://www.youtube.com/@WildcraftIn',
      alt: 'youtube',
      src: '/content/dam/aemigrate/uploaded-folder/image/1774510729819.svg+xml',
      classes: ['footer-youtube_footer_icon-hMU'],
    },
  ];

  socialLinks.forEach((linkData) => {
    const li = document.createElement('li');
    if (linkData.classes) {
      li.classList.add(...linkData.classes);
    }
    const a = document.createElement('a');
    a.href = linkData.href;
    a.target = '_blank';
    a.setAttribute('aria-label', linkData.alt);
    const img = document.createElement('img');
    img.alt = linkData.alt;
    img.src = linkData.src;
    a.append(img);
    li.append(a);
    socialLinksUl.append(li);
  });

  const appImageContainer = document.createElement('div');
  appImageContainer.classList.add('footer-app_image-y-E', 'flex');

  const appLinks = [
    {
      href: 'https://play.google.com/store/apps/details?id=com.omuni.wildcraft',
      alt: 'google play',
      src: '/content/dam/aemigrate/uploaded-folder/image/google-play-vft.png',
    },
    {
      href: 'https://apps.apple.com/in/app/wildcraft-online-shopping-app/id1453009632',
      alt: 'app store',
      src: '/content/dam/aemigrate/uploaded-folder/image/app-store-coo.png',
    },
  ];

  appLinks.forEach((linkData) => {
    const a = document.createElement('a');
    a.href = linkData.href;
    a.target = '_blank';
    a.setAttribute('aria-label', linkData.alt);
    const img = document.createElement('img');
    img.alt = linkData.alt;
    img.classList.add('footer-appIcon-S1J');
    img.width = '130';
    img.height = '50';
    img.src = linkData.src;
    a.append(img);
    appImageContainer.append(a);
  });

  socialLinksContainer.append(socialLinksUl, appImageContainer);
  footerCustomSocialIcons.append(newsletterRoot, socialLinksContainer);
  footerLinksCustom.append(footerCustomSocialIcons);

  const footerCmsLink = document.createElement('div');
  footerCmsLink.classList.add('footer-cms_footer_link-W9u');

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

  // Process item rows for footer-link-section
  // Each row represents a 'footer-link-section' item with one 'content' richtext cell
  [...block.children].forEach((row) => {
    // Ensure the row has at least one child (the content div)
    if (row.children.length > 0) {
      const contentDiv = row.children[0]; // Get the first cell which contains the richtext
      if (contentDiv.nodeType === Node.ELEMENT_NODE && contentDiv.tagName === 'DIV') {
        const ul = document.createElement('ul');
        ul.innerHTML = contentDiv.innerHTML; // Directly use the innerHTML of the richtext div
        footerLinkSec.append(ul);
        moveInstrumentation(row, ul); // Move instrumentation from the original row to the new ul
      }
    }
  });

  htmlRoot.append(footerLinkSec);
  richContent.append(htmlRoot);
  cmsBlockContent.append(richContent); // Add the first rich content block

  const richContent2 = document.createElement('div');
  richContent2.classList.add('richContent-root-Byp');
  cmsBlockContent.append(richContent2); // Add the second empty rich content block

  const richContent3 = document.createElement('div');
  richContent3.classList.add('richContent-root-Byp');
  const htmlRoot2 = document.createElement('div');
  htmlRoot2.classList.add('html-root-Uwa');
  htmlRoot2.setAttribute('role', 'presentation');
  const style = document.createElement('style');
  style.textContent = `.latest_stories_container_parent{
display:none;
}`;
  htmlRoot2.append(style);
  richContent3.append(htmlRoot2);
  cmsBlockContent.append(richContent3); // Add the third rich content block with style

  cmsBlockRoot.append(cmsBlockContent);
  footerCmsLink.append(cmsBlockRoot);
  footerLinksCustom.append(footerCmsLink);

  const cmsBlockRoot2 = document.createElement('div');
  cmsBlockRoot2.classList.add('cmsBlock-root-rsi');
  const cmsBlockContent2 = document.createElement('div');
  cmsBlockContent2.classList.add('cmsBlock-content-BTy');
  const richContent4 = document.createElement('div');
  richContent4.classList.add('richContent-root-Byp');
  const htmlRoot3 = document.createElement('div');
  htmlRoot3.classList.add('html-root-Uwa');
  htmlRoot3.setAttribute('role', 'presentation');
  htmlRoot3.innerHTML = `<p>POPULAR SEARCHES</p>
<p id="EH4CTM4"><a tabindex="0" href="https://wildcraft.com/men/clothing/sweatshirts-pullovers"> Men's Sweatshirts &amp; Pullovers </a> | <a tabindex="0" href="https://wildcraft.com/packs-luggage/wheelers-trolleys">Travel Cases</a> |&nbsp;<a tabindex="0" href="https://wildcraft.com/backpacks">Backpacks</a> | <a tabindex="0" href="https://wildcraft.com/men/clothing/jackets-cheaters-vests">Men's Jacket &amp; Cheater </a>| <a tabindex="0" href="https://wildcraft.com/packs-luggage/packs/laptop-backpacks">Laptop Backpacks</a> | <a tabindex="0" href="https://wildcraft.com/men/clothing/shirts-t-shirts">Men's Shirts &amp; T-shirt</a> | <a tabindex="0" href="https://wildcraft.com/packs-luggage/technical-gear/rucksacks">Rucksacks</a> | <a tabindex="0" href="https://wildcraft.com/packs-luggage/packs">Daypacks</a> | <a tabindex="0" href="https://wildcraft.com/men/clothing/tracksuits">Men's Tracksuits</a> | <a tabindex="0" href="https://wildcraft.com/men/footwear/shoes">Shoes</a> | <a tabindex="0" href="https://wildcraft.com/men/footwear/sandals">Sandals</a> | <a tabindex="0" href="https://wildcraft.com/packs-luggage/travel-gear/duffle-bags">Duffle Bags </a> | <a tabindex="0" href="https://wildcraft.com/packs-luggage/travel-gear/duffle-trolleys">Duffle Trolley</a> | <a tabindex="0" href="https://wildcraft.com/women/clothing/shirts-t-shirts">Women Shirts &amp; T-Shirt</a> | <a tabindex="0" href="https://wildcraft.com/corporate-gifting">Corporate Gifting &amp; Festive Gifting</a></p>`;
  richContent4.append(htmlRoot3);
  const richContent5 = document.createElement('div');
  richContent5.classList.add('richContent-root-Byp');
  cmsBlockContent2.append(richContent4, richContent5);
  cmsBlockRoot2.append(cmsBlockContent2);
  footerLinksCustom.append(cmsBlockRoot2);

  const footerBrandings = document.createElement('div');
  footerBrandings.classList.add('footer-brandings-I1l', 'py-5');

  const brandingContainer = document.createElement('div');
  brandingContainer.classList.add(
    'footer-branding_container-0It',
    'flex',
    'justify-between',
  );

  const copyright = document.createElement('p');
  copyright.classList.add('footer-copyright-dyU', 'text-center');
  copyright.textContent = '© 2025 Wildcraft. All Rights Reserved.';

  const cmsBlockRoot3 = document.createElement('div');
  cmsBlockRoot3.classList.add('cmsBlock-root-rsi');
  const cmsBlockContent3 = document.createElement('div');
  cmsBlockContent3.classList.add('cmsBlock-content-BTy');
  const richContent6 = document.createElement('div');
  richContent6.classList.add('richContent-root-Byp');
  const htmlRoot4 = document.createElement('div');
  htmlRoot4.classList.add('html-root-Uwa');
  htmlRoot4.setAttribute('role', 'presentation');
  htmlRoot4.innerHTML = `<ul class="footer_bottom_link">
<li><a tabindex="0" href="termsconditions">Terms &amp; Conditions</a></li>
<li style="padding: 0 2px;">/</li>
<li><a tabindex="0" href="/privacypolicy">Privacy Policy</a></li>
</ul>`;
  richContent6.append(htmlRoot4);
  const richContent7 = document.createElement('div');
  richContent7.classList.add('richContent-root-Byp');
  cmsBlockContent3.append(richContent6, richContent7);
  cmsBlockRoot3.append(cmsBlockContent3);

  const visaCard = document.createElement('div');
  visaCard.classList.add('footer-visa_card-V6y');
  const visaImg = document.createElement('img');
  visaImg.alt = 'visa card';
  visaImg.width = '185';
  visaImg.height = '25';
  visaImg.src =
    '/content/dam/aemigrate/uploaded-folder/image/visa-card-6uq.png';
  visaCard.append(visaImg);

  brandingContainer.append(copyright, cmsBlockRoot3, visaCard);
  footerBrandings.append(brandingContainer);

  footerRoot.append(footerLinksCustom, footerBrandings);

  footerRoot.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
      { width: '750' },
    ]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Add event listeners for accordion functionality
  footerRoot.querySelectorAll('.footer_link_sec input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const accordian = event.target.closest('li').querySelector('.footerAccordian');
      if (accordian) {
        if (event.target.checked) {
          accordian.style.display = 'block';
        } else {
          accordian.style.display = 'none';
        }
      }
    });
  });

  block.textContent = '';
  block.append(footerRoot);
}
