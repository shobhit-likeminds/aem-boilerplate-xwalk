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
      subWrap.classList.add('has-footer-sub-child');
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

      // Check for inner sub-children
      nested.querySelectorAll('li').forEach((innerLi) => {
        const innerNested = innerLi.querySelector(':scope > ul');
        if (innerNested) {
          innerNested.remove();
          const innerSubWrap = document.createElement('div');
          innerSubWrap.classList.add('has-footer-inner-sub-child');
          innerSubWrap.append(innerNested);
          innerLi.append(innerSubWrap);

          const innerTrigger = innerLi.querySelector(':scope > a, :scope > span');
          if (innerTrigger) {
            innerTrigger.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              innerLi.classList.toggle('active');
              innerSubWrap.classList.toggle('active');
            });
          }
        }
      });
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  // Destructure the known root fields
  const logoRow = children[0];
  const logoLinkRow = children[1];
  const copyrightTextRow = children[2];
  const itemRows = children.slice(3); // All remaining rows are item rows

  block.innerHTML = '';
  const container = document.createElement('div');
  container.classList.add('container');
  block.append(container);

  // Footer Header Section
  const footerHeader = document.createElement('div');
  footerHeader.classList.add('row', 'footer-header');
  container.append(footerHeader);

  // Logo
  const logoCol = document.createElement('div');
  logoCol.classList.add('col-md-6', 'col-12', 'justify-content-between', 'd-flex');
  footerHeader.append(logoCol);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('logo');
  logoCol.append(logoDiv);

  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  } else {
    logoLink.href = '#';
  }
  moveInstrumentation(logoLinkRow, logoLink);
  logoDiv.append(logoLink);

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
      optimizedPic.querySelector('img').classList.add('hiddenlogo1');
    }
  }

  // Social Links
  const socialLinksCol = document.createElement('div');
  socialLinksCol.classList.add('col-md-6', 'col-12', 'footer-social-wrap-center');
  footerHeader.append(socialLinksCol);

  const socialWrap = document.createElement('ul');
  socialWrap.classList.add('social-wrap');
  socialLinksCol.append(socialWrap);

  // Filter item rows based on their structure
  const socialLinkItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && cells[0].querySelector('picture') && cells[1].querySelector('a') && cells[2].querySelector('ul');
  });
  const footerLinkBlocks = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 3 && !cells[0].querySelector('picture') && cells[1].querySelector('a') && !cells[2].querySelector('ul');
  });
  const footerLinkItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 4 && !cells[0].querySelector('picture') && cells[1].querySelector('a') && cells[2].querySelector('picture') && cells[3].querySelector('ul');
  });
  const secondaryLinkItems = itemRows.filter((row) => {
    const cells = [...row.children];
    return cells.length === 2 && !cells[0].querySelector('picture') && cells[1].querySelector('a');
  });

  socialLinkItems.forEach((row) => {
    const cells = [...row.children];
    const iconCell = cells.find(c => c.querySelector('picture'));
    const linkCell = cells.find(c => c.querySelector('a'));
    const hierarchyCell = cells.find(c => c.querySelector('ul')); // This is the hierarchy-tree field

    const li = document.createElement('li');
    const socialAnchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      socialAnchor.href = foundLink.href;
      socialAnchor.target = '_blank';
    }
    moveInstrumentation(linkCell, socialAnchor);

    const iconPicture = iconCell?.querySelector('picture');
    if (iconPicture) {
      const img = iconPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        socialAnchor.append(optimizedPic);
      }
    }
    li.append(socialAnchor);
    socialWrap.append(li);
    // The hierarchy-tree field for social links is not rendered in the original HTML, so we skip it here.
  });

  // Footer Menu Box
  const footerMenuBox = document.createElement('div');
  footerMenuBox.classList.add('row', 'footer-menu-box');
  container.append(footerMenuBox);

  const menuCol = document.createElement('div');
  menuCol.classList.add('col');
  footerMenuBox.append(menuCol);

  const footerMenu = document.createElement('div');
  footerMenu.classList.add('footer-menu');
  menuCol.append(footerMenu);

  footerLinkBlocks.forEach((row) => {
    const cells = [...row.children];
    const blockTitleCell = cells.find(c => !c.querySelector('a') && !c.querySelector('picture') && !c.querySelector('ul'));
    const blockTitleLinkCell = cells.find(c => c.querySelector('a'));
    // The third cell is a container for footer-link-item, but they are flat in the block structure.

    const linkBlocks = document.createElement('div');
    linkBlocks.classList.add('link-blocks');
    footerMenu.append(linkBlocks);

    const headDiv = document.createElement('div');
    headDiv.classList.add('head');
    linkBlocks.append(headDiv);

    const span = document.createElement('span');
    headDiv.append(span);

    const blockTitleLink = document.createElement('a');
    const foundBlockTitleLink = blockTitleLinkCell?.querySelector('a');
    if (foundBlockTitleLink) {
      blockTitleLink.href = foundBlockTitleLink.href;
    } else {
      blockTitleLink.href = '#';
    }
    blockTitleLink.textContent = blockTitleCell?.textContent.trim() || '';
    moveInstrumentation(blockTitleLinkCell, blockTitleLink);
    span.append(blockTitleLink);

    const small = document.createElement('small');
    span.append(small);

    const footerInnerList = document.createElement('ul');
    footerInnerList.classList.add('footer-inner-list');
    headDiv.append(footerInnerList);

    // This is where footerLinkItems should be associated.
    // Given the flat structure, we will append all footerLinkItems to the first footerInnerList
    // as a simplification, or if the model implies a single global list.
    // A more robust solution would require a field in footer-link-block to contain footer-link-item.
  });

  // Process all footerLinkItems and append them to the first footer-inner-list found
  const firstFooterInnerList = block.querySelector('.footer-inner-list');
  if (firstFooterInnerList) {
    footerLinkItems.forEach((row) => {
      const cells = [...row.children];
      const labelCell = cells.find(c => !c.querySelector('a') && !c.querySelector('picture') && !c.querySelector('ul'));
      const linkCell = cells.find(c => c.querySelector('a'));
      const iconCell = cells.find(c => c.querySelector('picture'));
      const hierarchyCell = cells.find(c => c.querySelector('ul'));

      const li = document.createElement('li');
      const foundLink = linkCell?.querySelector('a');
      let rootEl;

      if (foundLink) {
        rootEl = document.createElement('a');
        rootEl.href = foundLink.href;
      } else {
        rootEl = document.createElement('span');
      }
      rootEl.textContent = labelCell?.textContent.trim() || '';
      moveInstrumentation(row, rootEl);
      li.appendChild(rootEl);

      const iconPicture = iconCell?.querySelector('picture');
      if (iconPicture) {
        const img = iconPicture.querySelector('img');
        if (img) {
          const iconSpan = document.createElement('span');
          const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '16' }]);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          iconSpan.append(optimizedPic);
          li.append(iconSpan);
        }
      }

      const hierarchyRoot = hierarchyCell?.querySelector('ul');
      if (hierarchyRoot) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('has-footer-sub-child');
        // Move instrumentation from the original hierarchyCell to the new wrapper
        moveInstrumentation(hierarchyCell, wrapper);
        // Append the innerHTML of the hierarchyCell to the wrapper
        wrapper.innerHTML = hierarchyCell.innerHTML;

        // Apply classes and event listeners to the nested elements within the hierarchy
        wrapper.querySelectorAll('ul').forEach(ul => ul.classList.add('footer-inner-list')); // Example class from original HTML
        wrapper.querySelectorAll('li').forEach(liItem => {
          liItem.classList.add('list-item'); // Example class from original HTML
          const trigger = liItem.querySelector(':scope > a, :scope > span');
          if (trigger) {
            trigger.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              liItem.classList.toggle('active');
              liItem.querySelector(':scope > .has-footer-sub-child, :scope > .has-footer-inner-sub-child')?.classList.toggle('active');
            });
          }
        });
        wrapper.querySelectorAll('a').forEach(a => a.classList.add('nav-link')); // Example class from original HTML

        rootEl.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          wrapper.classList.toggle('active');
          li.classList.toggle('active');
        });
        li.appendChild(wrapper);
        transformNestedLists(wrapper); // Apply the transformation to the newly added hierarchy
      }
      firstFooterInnerList.appendChild(li);
    });
  }

  // Copyright and Secondary Nav
  const copyrightWrap = document.createElement('div');
  copyrightWrap.classList.add('row', 'align-items-lg-end', 'copyright-wrap');
  container.append(copyrightWrap);

  const secondaryNavCol = document.createElement('div');
  secondaryNavCol.classList.add('col-12', 'col-lg-6');
  copyrightWrap.append(secondaryNavCol);

  const secondaryNav = document.createElement('ul');
  secondaryNav.classList.add('secondary-nav');
  secondaryNavCol.append(secondaryNav);

  secondaryLinkItems.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('a'));
    const linkCell = cells.find(c => c.querySelector('a'));

    const li = document.createElement('li');
    const anchor = document.createElement('a');
    const foundLink = linkCell?.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    } else {
      anchor.href = '#';
    }
    anchor.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(linkCell, anchor);
    li.append(anchor);
    secondaryNav.append(li);
  });

  const copyrightTextCol = document.createElement('div');
  copyrightTextCol.classList.add('col-12', 'col-lg-6', 'copyright-text');
  moveInstrumentation(copyrightTextRow, copyrightTextCol);
  copyrightTextCol.innerHTML = copyrightTextRow.innerHTML;
  copyrightWrap.append(copyrightTextCol);

  // Optimize all images
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
