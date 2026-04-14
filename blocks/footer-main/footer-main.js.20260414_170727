import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [logoRow, logoLinkRow, logoLinkLabelRow, ...footerSectionRows] = [...block.children];

  block.innerHTML = ''; // Clear the block content

  const container = document.createElement('div');
  container.classList.add('container');

  // Footer Header Section
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');

  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');

  const logoLink = document.createElement('a');
  // Use querySelector to find the link, more robust than children[0]
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
    const optimizedImg = optimizedPic.querySelector('img');
    optimizedImg.classList.add('hiddenlogo1');
    optimizedImg.alt = img.alt;
    optimizedImg.title = img.title || img.alt;
    optimizedImg.loading = 'lazy';
    moveInstrumentation(img, optimizedImg);
    logoLink.append(optimizedPic);
  }
  logoDiv.append(logoLink);
  logoCol.append(logoDiv);
  footerHeader.append(logoCol);

  // Social Wrap
  const socialCol = document.createElement('div');
  socialCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');

  const socialUl = document.createElement('ul');
  socialUl.classList.add('social-wrap');

  const socialLinks = [
    { class: 'fb', href: 'https://www.facebook.com/mahindrarise', img: '/content/dam/aemigrate/uploaded-folder/image/1776164450908.svg+xml', alt: 'svg file' },
    { class: 'tw', href: 'https://twitter.com/mahindrarise', img: '/content/dam/aemigrate/uploaded-folder/image/1776164450962.svg+xml', alt: 'svg file' },
    { class: 'inst', href: 'https://instagram.com/mahindrarise', img: '/content/dam/aemigrate/uploaded-folder/image/1776164451330.svg+xml', alt: 'svg file' },
    { class: 'yt', href: 'https://youtube.com/c/MahindraRise', img: '/content/dam/aemigrate/uploaded-folder/image/1776164451400.svg+xml', alt: 'svg file' },
    { class: 'in', href: 'https://www.linkedin.com/company/mahindragroup/', img: '/content/dam/aemigrate/uploaded-folder/image/1776164451444.svg+xml', alt: 'svg file' },
  ];

  socialLinks.forEach(linkData => {
    const li = document.createElement('li');
    li.classList.add(linkData.class);
    const a = document.createElement('a');
    a.href = linkData.href;
    a.target = '_blank';
    const img = document.createElement('img');
    img.alt = linkData.alt;
    img.src = linkData.img;
    a.append(img);
    li.append(a);
    socialUl.append(li);
  });
  socialCol.append(socialUl);
  footerHeader.append(socialCol);

  container.append(footerHeader);

  // Footer Menu Box Section
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  const menuCol = document.createElement('div');
  menuCol.classList.add('col');
  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');

  footerSectionRows.forEach((row) => {
    const cells = [...row.children];
    const headingCell = cells.find(cell => !cell.querySelector('ul')); // Find cell without a UL
    const sectionLinksCell = cells.find(cell => cell.querySelector('ul')); // Find cell with a UL

    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');

    const span = document.createElement('span');
    const headingLink = document.createElement('a');
    const existingLink = headingCell?.querySelector('a');
    if (existingLink) {
      headingLink.href = existingLink.href;
      headingLink.textContent = existingLink.textContent.trim();
      moveInstrumentation(existingLink, headingLink);
    } else if (headingCell) {
      headingLink.href = '#'; // Default href if not provided
      headingLink.textContent = headingCell.textContent.trim();
      moveInstrumentation(headingCell, headingLink);
    }
    span.append(headingLink);

    const small = document.createElement('small');
    span.append(small); // small element is empty in original HTML, used for JS behavior
    headDiv.append(span);

    const sectionLinksUl = sectionLinksCell?.querySelector('ul');
    if (sectionLinksUl) {
      sectionLinksUl.classList.add('footer-inner-list');
      // Transform nested lists for accordion behavior
      transformNestedLists(sectionLinksUl);
      headDiv.append(sectionLinksUl);

      // Add click listener for top-level accordion behavior
      span.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        headDiv.classList.toggle('active'); // Toggle 'active' class on headDiv for accordion
        sectionLinksUl.classList.toggle('active'); // Toggle 'active' class on ul for visibility
      });
    }

    linkBlocks.append(headDiv);
    footerMenu.append(linkBlocks);
  });

  menuCol.append(footerMenu);
  footerMenuBox.append(menuCol);
  container.append(footerMenuBox);

  // Copyright Section
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');

  const secondaryNavUl = document.createElement('ul');
  secondaryNavUl.classList.add('secondary-nav');
  // Placeholder for secondary navigation links, as they are not in the block model
  // Add example links based on original HTML
  const secondaryLinks = [
    { text: 'Terms of use', href: 'https://www.mahindra.com/terms-of-use' },
    { text: 'Disclaimer', href: 'https://www.mahindra.com/disclaimer' },
    { text: 'Privacy Policy', href: 'https://www.mahindra.com/privacy-policy' },
    { text: 'Sitemap', href: 'https://www.mahindra.com/sitemap' },
    { text: 'Contact Us', href: 'https://www.mahindra.com/contact-us' },
  ];
  secondaryLinks.forEach(linkData => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = linkData.href;
    a.textContent = linkData.text;
    li.append(a);
    secondaryNavUl.append(li);
  });
  secondaryNavCol.append(secondaryNavUl);
  copyrightWrap.append(secondaryNavCol);

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  copyrightTextCol.textContent = 'Copyright© 2026 Mahindra&Mahindra Ltd. All Rights Reserved.';
  copyrightWrap.append(copyrightTextCol);

  container.append(copyrightWrap);
  block.append(container);

  // Image optimization for all pictures in the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach(li => {
    const nestedUl = li.querySelector(':scope > ul');
    if (nestedUl) {
      nestedUl.remove(); // Remove the nested ul from its original position

      const subWrap = document.createElement('div');
      subWrap.classList.add('has-footer-sub-child'); // Use class from original HTML
      subWrap.append(nestedUl);
      li.append(subWrap);

      // Create a trigger for the nested accordion
      // The trigger can be the direct <a> child of the li, or the li itself if no direct link
      const trigger = li.querySelector(':scope > a') || li;

      // Add a span with an image for visual accordion toggle, if not already present
      if (!li.querySelector(':scope > span[data-once="footerClickEvent"]')) {
        const toggleSpan = document.createElement('span');
        toggleSpan.setAttribute('data-once', 'footerClickEvent');
        const toggleImg = document.createElement('img');
        toggleImg.alt = 'svg file';
        toggleImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776164448796.svg+xml'; // Example SVG
        toggleSpan.append(toggleImg);
        // Insert the toggle span after the direct link or at the beginning of the li content
        if (li.querySelector(':scope > a')) {
          li.querySelector(':scope > a').after(toggleSpan);
        } else {
          li.prepend(toggleSpan);
        }
      }

      // Add click listener for the nested accordion
      // This listener should be on the trigger (link or li) or the newly added toggle span
      const actualTrigger = li.querySelector(':scope > span[data-once="footerClickEvent"]') || trigger;
      actualTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevents parent accordion from also toggling
        li.classList.toggle('active');
        subWrap.classList.toggle('active');

        // Handle deeper nesting for 'has-footer-inner-sub-child'
        subWrap.querySelectorAll('li').forEach(innerLi => {
          const innerNestedUl = innerLi.querySelector(':scope > ul');
          if (innerNestedUl) {
            const innerSubWrap = document.createElement('div');
            innerSubWrap.classList.add('has-footer-inner-sub-child');
            innerSubWrap.append(innerNestedUl);
            innerLi.append(innerSubWrap);

            // Add inner toggle span if not present
            if (!innerLi.querySelector(':scope > span[data-once="footerClickEvent"]')) {
              const innerToggleSpan = document.createElement('span');
              innerToggleSpan.setAttribute('data-once', 'footerClickEvent innerFooterClickEvent');
              const innerToggleImg = document.createElement('img');
              innerToggleImg.alt = 'svg file';
              innerToggleImg.src = '/content/dam/aemigrate/uploaded-folder/image/1776164448796.svg+xml';
              innerToggleSpan.append(innerToggleImg);
              if (innerLi.querySelector(':scope > a')) {
                innerLi.querySelector(':scope > a').after(innerToggleSpan);
              } else {
                innerLi.prepend(innerToggleSpan);
              }
            }

            const innerActualTrigger = innerLi.querySelector(':scope > span[data-once="footerClickEvent"]') || innerLi.querySelector(':scope > a') || innerLi;
            innerActualTrigger.addEventListener('click', (e2) => {
              e2.preventDefault();
              e2.stopPropagation();
              innerLi.classList.toggle('active');
              innerSubWrap.classList.toggle('active');
            });
          }
        });
      });
    }
  });
}
