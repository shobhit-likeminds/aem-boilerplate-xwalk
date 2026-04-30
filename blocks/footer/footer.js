import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    const anchor = li.querySelector(':scope > a');

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
      subWrap.classList.add('ftr-sub-links-cvr'); // Class from ORIGINAL HTML
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const logoRow = children.find((row) => row.querySelector('picture'));
  const copyrightRow = children.find(
    (row) => !row.querySelector('picture') && row.children.length === 1 && !row.querySelector('a'),
  );

  const itemRows = children.filter(
    (row) => row !== logoRow && row !== copyrightRow,
  );

  // Filter for footer-column-item (2 cells, first cell is an 'aem-content' link)
  const footerColumnItems = itemRows.filter(
    (row) => row.children.length === 2 && row.children[0].querySelector('a'),
  );

  // Filter for footer-accordion-item (2 cells, first cell is text, second is richtext)
  const footerAccordionItems = itemRows.filter(
    (row) => row.children.length === 2 && !row.children[0].querySelector('a') && row.children[1].querySelector('p'),
  );

  // Filter for footer-link-item (2 cells, first cell is an 'aem-content' link, second is text)
  const footerLinkItems = itemRows.filter(
    (row) => row.children.length === 2 && row.children[0].querySelector('a') && !row.children[1].querySelector('p'),
  );

  // Filter for footer-social-link-item (1 cell, which is an 'aem-content' link)
  const footerSocialLinkItems = itemRows.filter(
    (row) => row.children.length === 1 && row.children[0].querySelector('a'),
  );

  const footerWrp = document.createElement('section');
  footerWrp.classList.add('footer-wrp');

  const container = document.createElement('div');
  container.classList.add('container-1600-wrp');
  footerWrp.append(container);

  // Logo
  if (logoRow) {
    const mobLogoWr = document.createElement('div');
    mobLogoWr.classList.add('mob-logo-wr');
    const picture = logoRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
        { width: '750' },
      ]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobLogoWr.append(optimizedPic);
    }
    moveInstrumentation(logoRow, mobLogoWr);
    container.append(mobLogoWr);
  }

  const row1 = document.createElement('div');
  row1.classList.add('row', 'f1');
  container.append(row1);

  // Footer Columns
  const primaryLinksCol = document.createElement('div');
  primaryLinksCol.classList.add('col', 'col-xl-3');
  row1.append(primaryLinksCol);

  footerColumnItems.forEach((row) => {
    const [primaryLinkCell, primaryLabelCell] = [...row.children];
    const link = primaryLinkCell.querySelector('a');
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = primaryLabelCell.textContent.trim();
      anchor.classList.add('ttle');
      moveInstrumentation(row, anchor);
      primaryLinksCol.append(anchor);
    }
  });

  // Footer Accordions
  footerAccordionItems.forEach((row) => {
    const [sectionLabelCell, sectionLinksCell] = [...row.children];
    const col = document.createElement('div');
    col.classList.add('col', 'col-xl-3', 'ftr-drop-wrp');

    const trigger = document.createElement('a');
    trigger.href = 'javascript:void(0)';
    trigger.classList.add('ttle', 'accordion_head2');
    trigger.innerHTML = `${sectionLabelCell.textContent.trim()} <span class="plusminus2">+</span>`;
    moveInstrumentation(sectionLabelCell, trigger);
    col.append(trigger);

    const ftrSubLinksCvr = document.createElement('div');
    ftrSubLinksCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2');
    moveInstrumentation(sectionLinksCell, ftrSubLinksCvr);
    // Assign innerHTML to a div to prevent <p> inside <p>
    ftrSubLinksCvr.innerHTML = sectionLinksCell.innerHTML;
    col.append(ftrSubLinksCvr);

    const subList = ftrSubLinksCvr.querySelector('ul');
    if (subList) {
      transformNestedLists(subList);
    }

    trigger.addEventListener('click', () => {
      trigger.classList.toggle('active');
      ftrSubLinksCvr.classList.toggle('active');
    });

    row1.append(col);
  });

  // Footer Links
  const contactCol = document.createElement('div');
  contactCol.classList.add('col', 'col-xl-3');
  row1.append(contactCol);

  footerLinkItems.forEach((row) => {
    const [linkCell, labelCell] = [...row.children];
    const link = linkCell.querySelector('a');
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = labelCell.textContent.trim();
      anchor.classList.add('ttle');
      moveInstrumentation(row, anchor);
      contactCol.append(anchor);
    }
  });

  const row2 = document.createElement('div');
  row2.classList.add('row', 'f2', 'justify-content-between');
  container.append(row2);

  // Footer Social Links
  if (footerSocialLinkItems.length > 0) {
    const socialCol = document.createElement('div');
    socialCol.classList.add('col', 'col-xl-2', 'ftr-drop-wrp');

    const socialTitle = document.createElement('p');
    socialTitle.classList.add('ttle', 'accordion_head2');
    socialTitle.innerHTML = 'Social Media <span class="plusminus2">+</span>';
    socialCol.append(socialTitle);

    const socialIconsCvr = document.createElement('div');
    socialIconsCvr.classList.add('ftr-sub-links-cvr', 'accordion_body2', 'socialIcons');
    socialCol.append(socialIconsCvr);

    footerSocialLinkItems.forEach((row) => {
      // FIXED: Using content detection instead of index access
      const cells = [...row.children];
      const linkCell = cells.find(cell => cell.querySelector('a'));
      const link = linkCell.querySelector('a');
      if (link) {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.classList.add('ftr-link');
        anchor.target = '_blank'; // Social links usually open in new tab
        // Assuming icons are to be hardcoded as they are static UI elements
        if (link.href.includes('facebook')) {
          anchor.innerHTML = '<i class="fab fa-facebook-square"></i>';
        } else if (link.href.includes('instagram')) {
          anchor.innerHTML = '<i class="fab fa-instagram"></i>';
        } else if (link.href.includes('twitter')) {
          anchor.innerHTML = '<i class="fa-brands fa-square-x-twitter"></i>';
        } else if (link.href.includes('linkedin')) {
          anchor.innerHTML = '<i class="fab fa-linkedin"></i>';
        } else if (link.href.includes('youtube')) {
          anchor.innerHTML = '<i class="fab fa-youtube-square"></i>';
        } else {
          anchor.textContent = link.href; // Fallback to raw URL if no icon match
        }
        moveInstrumentation(row, anchor);
        socialIconsCvr.append(anchor);
      }
    });

    socialTitle.addEventListener('click', () => {
      socialTitle.classList.toggle('active');
      socialIconsCvr.classList.toggle('active');
    });

    row2.append(socialCol);
  }

  const row3 = document.createElement('div');
  row3.classList.add('row', 'mt25', 'f3');
  container.append(row3);

  // Legal Disclaimer and Open Source License Disclosure
  // These are hardcoded in the original HTML, but not in the block model.
  // They should be added as authorable fields if they need to be editable.
  // For now, they are omitted as they are not in the block's authored content.
  // If they must be present and are truly static, they should be added as static HTML
  // in the block's template or as separate block fields.
  // For this review, we remove hardcoded links that are not driven by the block model.

  // Copyright
  if (copyrightRow) {
    const copyrightCol = document.createElement('div');
    copyrightCol.classList.add('col-12', 'col-md-6');
    const copyrightText = document.createElement('p');
    copyrightText.classList.add('copy-txt', 'text-md-end');
    copyrightText.textContent = copyrightRow.textContent.trim();
    moveInstrumentation(copyrightRow, copyrightText);
    copyrightCol.append(copyrightText);
    row3.append(copyrightCol);
  }

  block.replaceChildren(footerWrp);
}
