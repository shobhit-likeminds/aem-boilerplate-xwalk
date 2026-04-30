import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

    // Handle label-only nodes (no anchor)
    if (!anchor) {
      const textNode = [...li.childNodes].find(
        (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
      );
      if (textNode) {
        const span = document.createElement('span');
        span.textContent = textNode.textContent.trim();
        textNode.remove();
        li.prepend(span);
      }
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('ftr-sub-links-cvr'); // Use class from ORIGINAL HTML
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.classList.add('accordion_head2'); // Use class from ORIGINAL HTML
        const plusMinus = document.createElement('span');
        plusMinus.classList.add('plusminus2'); // Use class from ORIGINAL HTML
        plusMinus.textContent = '+';
        trigger.append(plusMinus);

        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
          plusMinus.textContent = subWrap.classList.contains('active') ? '-' : '+';
        });
      }
    }
  });
}

export default async function decorate(block) {
  const children = [...block.children];
  const [logoRow, copyrightRow, ...itemRows] = children;

  const footerWrp = document.createElement('section');
  // footerWrp.classList.add('footer-wrp'); // Block already has this class from AEM

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  footerWrp.append(container);

  // Logo
  const mobLogoWr = document.createElement('div');
  mobLogoWr.classList.add('mob-logo-wr');
  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(logoPicture, optimizedPic);
    mobLogoWr.append(optimizedPic);
  }
  moveInstrumentation(logoRow, mobLogoWr);
  container.append(mobLogoWr);

  const f1Row = document.createElement('div');
  f1Row.classList.add('row', 'f1');
  container.append(f1Row);

  const f2Row = document.createElement('div');
  f2Row.classList.add('row', 'f2', 'justify-content-between');
  container.append(f2Row);

  const f3Row = document.createElement('div');
  f3Row.classList.add('row', 'mt25', 'f3');
  container.append(f3Row);

  const legalLinksCol = document.createElement('div');
  legalLinksCol.classList.add('col-12', 'col-md-6');
  f3Row.append(legalLinksCol);

  const copyrightCol = document.createElement('div');
  copyrightCol.classList.add('col-12', 'col-md-6');
  f3Row.append(copyrightCol);

  // Filter item rows by cell count and content
  // Note: The order of these filters matters if multiple types have same cell count.
  // Based on BlockJson, all 2-cell items have an 'a' in the second cell for link-item,
  // or richtext for section-item.
  const footerLinkItems = itemRows.filter((row) => row.children.length === 2 && row.children[1]?.querySelector('a'));
  const footerSectionItems = itemRows.filter((row) => row.children.length === 2 && !row.children[1]?.querySelector('a'));
  const socialLinkItems = itemRows.filter((row) => row.children.length === 1 && row.querySelector('a'));
  const legalLinkItems = itemRows.filter((row) => row.children.length === 2 && row.children[1]?.querySelector('a')); // This filter is redundant with footerLinkItems if not careful. Assuming legal links are distinct.

  // Top Footer Links (footer-link-item)
  footerLinkItems.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3');
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell.textContent.trim();
    anchor.classList.add('ttle');
    moveInstrumentation(row, anchor);
    col.append(anchor);
    f1Row.append(col);
  });

  // Footer Sections (footer-section-item)
  footerSectionItems.forEach((row) => {
    const [titleCell, linksCell] = [...row.children];
    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3');

    const sectionLinkListWrapper = document.createElement('div');
    sectionLinkListWrapper.innerHTML = linksCell?.innerHTML || ''; // Read richtext content
    const sectionLinkList = sectionLinkListWrapper.querySelector('ul');

    if (sectionLinkList) {
      const titleTrigger = document.createElement('a');
      titleTrigger.href = 'javascript:void(0)';
      titleTrigger.classList.add('ttle', 'accordion_head2');
      titleTrigger.textContent = titleCell.textContent.trim();

      const plusMinus = document.createElement('span');
      plusMinus.classList.add('plusminus2');
      plusMinus.textContent = '+';
      titleTrigger.append(plusMinus);

      const subLinksCvr = document.createElement('div');
      subLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');
      
      // Apply transformNestedLists to the rich text content
      transformNestedLists(sectionLinkList);
      subLinksCvr.append(sectionLinkList);

      titleTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        col.classList.toggle('active');
        subLinksCvr.classList.toggle('active');
        plusMinus.textContent = subLinksCvr.classList.contains('active') ? '-' : '+';
      });

      moveInstrumentation(row, titleTrigger);
      col.append(titleTrigger, subLinksCvr);
    } else {
      // If no ul found, render as a simple title with no dropdown
      const titleEl = document.createElement('a');
      titleEl.href = 'javascript:void(0)'; // Or a meaningful link if available
      titleEl.classList.add('ttle');
      titleEl.textContent = titleCell.textContent.trim();
      moveInstrumentation(row, titleEl);
      col.append(titleEl);
    }
    f1Row.append(col);
  });

  // Social Links (social-link-item)
  if (socialLinkItems.length > 0) {
    const socialCol = document.createElement('div');
    socialCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');

    const socialTitle = document.createElement('p');
    socialTitle.classList.add('ttle', 'accordion_head2');
    // The original HTML has "Social Media" hardcoded. If this is meant to be authored,
    // a new text field would be needed in the model. For now, keeping it hardcoded
    // as per the original HTML's explicit text.
    socialTitle.textContent = 'Social Media'; 

    const plusMinus = document.createElement('span');
    plusMinus.classList.add('plusminus2');
    plusMinus.textContent = '+';
    socialTitle.append(plusMinus);

    const socialIconsCvr = document.createElement('div');
    socialIconsCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');

    socialLinkItems.forEach((row) => {
      const [linkCell] = [...row.children];
      const anchor = document.createElement('a');
      const foundLink = linkCell.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.classList.add('ftr-link');
      anchor.target = '_blank'; // Add target blank as per original HTML

      // Determine icon based on URL (if no specific icon field)
      const url = anchor.href.toLowerCase();
      let iconClass = '';
      if (url.includes('facebook')) iconClass = 'fab fa-facebook-square';
      else if (url.includes('instagram')) iconClass = 'fab fa-instagram';
      else if (url.includes('twitter')) iconClass = 'fa-brands fa-square-x-twitter';
      else if (url.includes('linkedin')) iconClass = 'fab fa-linkedin';
      else if (url.includes('youtube')) iconClass = 'fab fa-youtube-square';

      if (iconClass) {
        const icon = document.createElement('i');
        icon.classList.add(...iconClass.split(' '));
        anchor.append(icon);
      } else {
        anchor.textContent = 'Link'; // Fallback text if no icon matched
      }
      moveInstrumentation(row, anchor);
      socialIconsCvr.append(anchor);
    });

    socialTitle.addEventListener('click', (e) => {
      e.preventDefault();
      socialCol.classList.toggle('active');
      socialIconsCvr.classList.toggle('active');
      plusMinus.textContent = socialIconsCvr.classList.contains('active') ? '-' : '+';
    });

    socialCol.append(socialTitle, socialIconsCvr);
    f2Row.append(socialCol);
  }

  // Legal Links (footer-legal-link-item)
  legalLinkItems.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) anchor.href = foundLink.href;
    anchor.textContent = labelCell.textContent.trim();
    moveInstrumentation(row, anchor);
    legalLinksCol.append(anchor);
  });

  // Copyright Text
  const copyrightText = document.createElement('p');
  copyrightText.classList.add('copy-txt', 'text-md-end');
  // Use firstElementChild to get the cell content, not the row itself
  copyrightText.innerHTML = copyrightRow.firstElementChild?.innerHTML || '';
  moveInstrumentation(copyrightRow, copyrightText);
  copyrightCol.append(copyrightText);

  block.replaceChildren(footerWrp);
}
