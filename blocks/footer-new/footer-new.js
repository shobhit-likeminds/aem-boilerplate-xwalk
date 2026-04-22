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
      subWrap.classList.add('nav-dropdown'); // Class from ORIGINAL HTML for dropdown wrapper
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

  // Destructure root fields based on BlockJson model
  const [
    backgroundImageDesktopRow,
    logoImageRow,
    logoLinkRow,
    itcPortalLinkRow,
    copyrightTextRow,
    ...itemRows
  ] = children;

  const footer = document.createElement('div');
  footer.classList.add('cmp-new-footer');
  moveInstrumentation(block, footer);

  // Top Content
  const topContent = document.createElement('div');
  topContent.classList.add('cmp-new-footer__top-content');

  const backgroundImageDesktop = backgroundImageDesktopRow.querySelector('picture');
  if (backgroundImageDesktop) {
    const img = backgroundImageDesktop.querySelector('img');
    if (img) {
      topContent.style.backgroundImage = `url(${img.src})`;
      moveInstrumentation(backgroundImageDesktopRow, backgroundImageDesktop);
    }
  }

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('cmp-image', 'cmp-new-footer__logo');

  const logoLink = document.createElement('a');
  logoLink.classList.add('cmp-image__link');
  const logoLinkAnchor = logoLinkRow.querySelector('a');
  if (logoLinkAnchor) {
    logoLink.href = logoLinkAnchor.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const logoPicture = logoImageRow.querySelector('picture');
  if (logoPicture) {
    const logoImg = logoPicture.querySelector('img');
    if (logoImg) {
      const optimizedPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '750' }]);
      moveInstrumentation(logoImg, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  logoDiv.append(logoLink);
  topContent.append(logoDiv);

  // Navigation and Social Links
  // Content detection for item rows:
  // footer-navigation-group: has a label cell and a richtext hierarchy-tree cell (contains <ul>)
  // footer-social-link: has an icon class text cell and an aem-content link cell
  const navigationGroups = itemRows.filter(
    (row) => {
      const cells = [...row.children];
      return cells.length === 2 && cells.some(cell => cell.querySelector('ul'));
    },
  );
  const socialLinks = itemRows.filter(
    (row) => {
      const cells = [...row.children];
      return cells.length === 2 && cells.some(cell => cell.textContent.trim().startsWith('icon-')) && cells.some(cell => cell.querySelector('a'));
    },
  );

  const navDiv = document.createElement('div');
  navDiv.classList.add('cmp-new-footer__nav', `cmp-new-footer__nav__count-${navigationGroups.length}`);

  navigationGroups.forEach((row) => {
    const cells = [...row.children];
    const labelCell = cells.find(c => !c.querySelector('ul'));
    const hierarchyCell = cells.find(c => c.querySelector('ul'));

    const navGroupUl = document.createElement('ul');
    navGroupUl.classList.add('cmp-new-footer__nav-group');

    if (hierarchyCell) {
      // Use innerHTML to preserve the nested structure of the richtext field
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      moveInstrumentation(hierarchyCell, tempDiv); // Move instrumentation from original cell to tempDiv

      tempDiv.querySelectorAll('li').forEach((li) => {
        const nestedLi = document.createElement('li');
        nestedLi.classList.add('cmp-new-footer__nav-item');

        const anchor = li.querySelector(':scope > a');
        let rootEl;
        if (anchor) {
          rootEl = document.createElement('a');
          rootEl.classList.add('cmp-new-footer__nav-link');
          rootEl.href = anchor.href;
          rootEl.textContent = anchor.textContent.trim();
        } else {
          rootEl = document.createElement('span');
          rootEl.textContent = li.firstChild?.textContent?.trim() || '';
        }
        // Instrumentation for the list item itself
        moveInstrumentation(li, nestedLi);
        nestedLi.appendChild(rootEl);

        const subList = li.querySelector(':scope > ul');
        if (subList) {
          const wrapper = document.createElement('div');
          wrapper.classList.add('nav-dropdown'); // Class from ORIGINAL HTML for dropdown wrapper
          wrapper.appendChild(subList);
          rootEl.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            wrapper.classList.toggle('active');
            nestedLi.classList.toggle('active');
          });
          nestedLi.appendChild(wrapper);
          transformNestedLists(subList); // Apply transformations to nested lists
        }
        navGroupUl.appendChild(nestedLi);
      });
    }
    moveInstrumentation(row, navGroupUl);
    navDiv.append(navGroupUl);
  });
  topContent.append(navDiv);
  footer.append(topContent);

  // Bottom Content
  const bottomContent = document.createElement('div');
  bottomContent.classList.add('cmp-new-footer__bottom-content');

  const container = document.createElement('div');
  container.classList.add('cmp-new-footer__container');

  const itcTitles = document.createElement('div');
  itcTitles.classList.add('cmp-new-footer__ITC-Titles');

  const itcPortalLink = document.createElement('a');
  itcPortalLink.classList.add('desc-1');
  const itcPortalAnchor = itcPortalLinkRow.querySelector('a');
  if (itcPortalAnchor) {
    itcPortalLink.href = itcPortalAnchor.href;
    itcPortalLink.textContent = 'ITC Portal'; // Hardcoded text from ORIGINAL HTML
  }
  moveInstrumentation(itcPortalLinkRow, itcPortalLink);
  itcTitles.append(itcPortalLink);

  const copyrightText = document.createElement('a'); // Original HTML uses <a> for copyright
  copyrightText.classList.add('desc-1');
  copyrightText.href = '/?'; // Default link from original HTML
  copyrightText.textContent = copyrightTextRow.textContent.trim();
  moveInstrumentation(copyrightTextRow, copyrightText);
  itcTitles.append(copyrightText);
  container.append(itcTitles);

  const socialMediaDiv = document.createElement('div');
  socialMediaDiv.classList.add('cmp-new-footer__social-media');

  socialLinks.forEach((row) => {
    const cells = [...row.children];
    const iconClassCell = cells.find(c => c.textContent.trim().startsWith('icon-'));
    const socialLinkCell = cells.find(c => c.querySelector('a'));

    if (iconClassCell && socialLinkCell) {
      const socialAnchor = document.createElement('a');
      socialAnchor.classList.add(iconClassCell.textContent.trim());
      const originalLink = socialLinkCell.querySelector('a');
      if (originalLink) {
        socialAnchor.href = originalLink.href;
      }
      moveInstrumentation(row, socialAnchor);
      socialMediaDiv.append(socialAnchor);
    }
  });

  container.append(socialMediaDiv);
  bottomContent.append(container);
  footer.append(bottomContent);

  block.replaceChildren(footer);

  // Re-optimize pictures after all elements are in place
  footer.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
