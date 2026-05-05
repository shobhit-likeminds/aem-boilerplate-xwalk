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
      subWrap.classList.add('has-sub-child');
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

  // Filter rows based on cell count and content to match BlockJson structure
  // Order matters for type detection when cell counts are similar
  const navItems = children.filter((row) => row.children.length === 3); // level2-list-item
  const level2Banners = children.filter((row) => row.children.length === 4); // level2-banner
  const multipleLinks = children.filter((row) => row.children.length === 2 && !row.querySelector('picture') && !row.querySelector('ul')); // multiple-links-item (no picture, no hierarchy-tree)
  const level3Banners = children.filter((row) => row.children.length === 7); // level3-banner-item
  const level3Links = children.filter((row) => row.children.length === 2 && !row.querySelector('picture') && row.querySelector('a') && !multipleLinks.includes(row)); // level3-link-item (has link, no picture, not multipleLinks)

  const section = document.createElement('section');
  section.classList.add('burger-navigation', 'grid-container', 'js-burger-navigation');
  section.setAttribute('aria-label', 'Burger Navigation Section');

  const navWrapper = document.createElement('nav');
  navWrapper.classList.add('persistent-navigation--wrapper', 'js-persistent-nav', 'burger-nav');

  const persistentNavUl = document.createElement('ul');
  persistentNavUl.classList.add('persistent-navigation', 'grid-x');

  const persistentNavLi = document.createElement('li');
  persistentNavLi.classList.add('persistent-navigation--list');

  const menuWrapper = document.createElement('div');
  menuWrapper.classList.add('persistent-navigation--menu-wrapper', 'burger-nav');
  menuWrapper.id = 'burger-nav-wrapper';
  menuWrapper.setAttribute('aria-labelledby', 'burger-nav');

  const level2Div = document.createElement('div');
  level2Div.classList.add('persistent-nav--level2', 'level2', 'grid-x');

  const level2Items = document.createElement('div');
  level2Items.classList.add('small-12', 'large-4', 'xlarge-3', 'persistent-nav--level2-items');

  const level2Close = document.createElement('div');
  level2Close.classList.add('persistent-nav--level2--close', 'hide-for-large');

  const prevControl = document.createElement('div');
  prevControl.classList.add('persistent-nav--control-prev', 'persistent-nav--control');

  const closeButton = document.createElement('button');
  closeButton.classList.add('persistent-nav--control-close', 'persistent-nav--control', 'js-persistent-nav-l1--close');
  closeButton.setAttribute('aria-label', 'Close navigation');
  closeButton.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L8.06066 7L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L7 8.06066L1.53033 13.5303C1.23744 13.8232 0.762563 13.8232 0.469669 13.5303C0.176777 13.2374 0.176777 12.7626 0.469669 12.4697L5.93934 7L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967Z" fill="#302216"></path>
    </svg>
  `;
  level2Close.append(prevControl, closeButton);
  level2Items.append(level2Close);

  const level2ListUl = document.createElement('ul');
  level2ListUl.classList.add('persistent-nav--level2-list', 'burger-nav');

  navItems.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('persistent-nav--level2-list-item', 'grid-x', 'burger-nav');
    moveInstrumentation(row, li);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    const linkHref = linkCell?.querySelector('a')?.href;
    const labelText = labelCell?.textContent.trim();

    if (hierarchyRoot) {
      const trigger = document.createElement('button');
      trigger.classList.add('persistent-nav--level2-link', 'labelMediumRegular', 'text-left', 'js-persistent-nav--level2-link');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-controls', `level-burger-nav-${children.indexOf(row) + 1}`);
      trigger.textContent = labelText;

      const level3Wrapper = document.createElement('div');
      level3Wrapper.classList.add('small-12', 'large-8', 'xlarge-9', 'persistent-nav--level3-wrapper');
      level3Wrapper.id = `level-burger-nav-${children.indexOf(row) + 1}`;

      const level3Div = document.createElement('div');
      level3Div.classList.add('persistent-nav--level3', 'grid-x', 'burger-nav');
      level3Div.setAttribute('role', 'list');

      const level3Close = document.createElement('div');
      level3Close.classList.add('persistent-nav--level2--close', 'level3', 'hide-for-large');
      level3Close.setAttribute('role', 'listitem');

      const level3PrevBtn = document.createElement('button');
      level3PrevBtn.classList.add('persistent-nav--control-prev', 'persistent-nav--control', 'js-persistent-nav-l2--close');
      level3PrevBtn.setAttribute('aria-label', 'Back to previous navigation');
      level3PrevBtn.innerHTML = `
        <svg role="presentation" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 1L1 9L9 17" stroke="#302216" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      `;

      const level3TitleSpan = document.createElement('span');
      level3TitleSpan.classList.add('persistent-nav--control-title', 'utilityTagHighCaps', 'js-persistent-nav-l2--close');
      level3TitleSpan.textContent = labelText;

      const level3CloseBtn = document.createElement('button');
      level3CloseBtn.classList.add('persistent-nav--control-close', 'persistent-nav--control', 'js-persistent-nav-l1--close');
      level3CloseBtn.setAttribute('aria-label', 'Close navigation');
      level3CloseBtn.innerHTML = `
        <svg role="presentation" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L8.06066 7L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L7 8.06066L1.53033 13.5303C1.23744 13.8232 0.762563 13.8232 0.469669 13.5303C0.176777 13.2374 0.176777 12.7626 0.469669 12.4697L5.93934 7L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967Z" fill="#302216"></path>
        </svg>
      `;
      level3Close.append(level3PrevBtn, level3TitleSpan, level3CloseBtn);
      level3Div.append(level3Close);

      const level3TitleP = document.createElement('p');
      level3TitleP.classList.add('persistent-nav--level3--title', 'text-center', 'hide-for-large', 'headline-h2');
      level3TitleP.setAttribute('role', 'listitem');
      level3TitleP.textContent = labelText;
      level3Div.append(level3TitleP);

      const level3List = document.createElement('div');
      level3List.classList.add('cell', 'small-12', 'large-12', 'xlarge-8', 'persistent-nav--level3-list', 'burger-nav');
      level3List.id = `persistentNavLevel3List-burger-nav-wrapper-burger-${children.indexOf(row) + 1}`;

      transformNestedLists(hierarchyRoot);
      level3List.append(hierarchyRoot);
      level3Div.append(level3List);
      level3Wrapper.append(level3Div);

      li.append(trigger, level3Wrapper);

      trigger.addEventListener('click', () => {
        level3Wrapper.classList.toggle('active');
        trigger.classList.toggle('active');
      });
      level3PrevBtn.addEventListener('click', () => {
        level3Wrapper.classList.remove('active');
        trigger.classList.remove('active');
      });
    } else {
      const anchor = document.createElement('a');
      if (linkHref) anchor.href = linkHref;
      anchor.textContent = labelText;
      anchor.classList.add('persistent-nav--level2-link', 'js-persistent-nav--level2-link', 'labelMediumRegular', 'text-left');
      li.append(anchor);
    }
    level2ListUl.append(li);
  });

  // Handle multiple-links-item rows separately
  // The original HTML shows multipleLinks as a div inside a persistent-nav--level2-list-item.
  // This implies that `multiple-links-item` rows are *children* of a `level2-list-item` in the HTML structure,
  // but they are siblings in the block.children array.
  // The current logic groups two `multiple-links-item` rows together.
  // This needs to be done carefully to match the HTML structure.
  // The original HTML has a specific `li` that contains a `multipleLinks` div.
  // This means we need to find the `level2-list-item` that *contains* the `multipleLinks` field.
  // Based on the BlockJson, `multipleLinks` is a container field *within* `level2-list-item`.
  // This means the `multiple-links-item` rows should be processed as part of their parent `level2-list-item`.
  // The current filtering separates them, which is a mismatch.

  // Re-evaluating based on BlockJson: `level2-list-item` has `multipleLinks` as a container field.
  // This means if a `level2-list-item` has `multipleLinks`, those `multiple-links-item` rows
  // should be processed *within* the loop for `level2-list-item` if they are logically nested.
  // However, the EDS structure shows `multiple-links-item` as a top-level item in `block.children`.
  // This is a common flattening pattern.
  // The original HTML shows a `li` with `multipleLinks` div directly inside it,
  // and that `li` is a `persistent-nav--level2-list-item`.
  // This suggests that a `level2-list-item` can *be* a `multipleLinks` container.

  // Let's adjust the logic to create a dedicated `li` for `multipleLinks` items,
  // and group them as per the original HTML if they appear consecutively.
  // This requires iterating through `children` directly and consuming rows.
  const processedRows = new Set();
  children.forEach((row, index) => {
    if (processedRows.has(row)) return;

    if (multipleLinks.includes(row)) {
      const [link1LabelCell, link1Cell] = [...row.children];
      const li = document.createElement('li');
      li.classList.add('persistent-nav--level2-list-item', 'grid-x', 'burger-nav');
      moveInstrumentation(row, li);
      processedRows.add(row);

      const multipleLinksDiv = document.createElement('div');
      multipleLinksDiv.classList.add('multipleLinks');

      const link1 = document.createElement('a');
      link1.href = link1Cell?.querySelector('a')?.href || '#';
      link1.textContent = link1LabelCell?.textContent.trim();
      link1.classList.add('persistent-nav--level2-link', 'js-persistent-nav--level2-link', 'labelMediumRegular', 'text-left', 'no-submenu');
      link1.setAttribute('aria-label', link1LabelCell?.textContent.trim());
      multipleLinksDiv.append(link1);

      // Check for a second multiple-links-item immediately following
      const nextRowIndex = index + 1;
      if (nextRowIndex < children.length) {
        const nextRow = children[nextRowIndex];
        // Ensure nextRow is also a multiple-links-item and hasn't been processed
        if (multipleLinks.includes(nextRow) && !processedRows.has(nextRow)) {
          const [nextLabelCell, nextLinkCell] = [...nextRow.children];
          const separator = document.createElement('span');
          separator.classList.add('multipleLinks--seperator');
          multipleLinksDiv.append(separator);

          const nextLink = document.createElement('a');
          nextLink.href = nextLinkCell?.querySelector('a')?.href || '#';
          nextLink.textContent = nextLabelCell?.textContent.trim();
          nextLink.classList.add('persistent-nav--level2-link', 'js-persistent-nav--level2-link', 'labelMediumRegular', 'text-left', 'no-submenu');
          nextLink.setAttribute('aria-label', nextLabelCell?.textContent.trim());
          multipleLinksDiv.append(nextLink);
          moveInstrumentation(nextRow, multipleLinksDiv); // Move instrumentation for the second link
          processedRows.add(nextRow);
        }
      }
      li.append(multipleLinksDiv);
      level2ListUl.append(li);
    }
  });

  level2Items.append(level2ListUl);
  level2Div.append(level2Items);

  if (level2Banners.length > 0) {
    const bannerRow = level2Banners[0]; // Assuming only one level2 banner
    const [desktopPicCell, tabletPicCell, mobilePicCell, titleCell] = [...bannerRow.children];

    const level2BannerDiv = document.createElement('div');
    level2BannerDiv.classList.add('small-12', 'large-8', 'xlarge-9', 'persistent-nav--level2-banner', 'show-for-large');
    moveInstrumentation(bannerRow, level2BannerDiv);

    const picture = document.createElement('picture');
    picture.classList.add('persistent-nav--level2-banner-picture', 'burger-nav');

    const desktopImg = desktopPicCell?.querySelector('img');
    const tabletImg = tabletPicCell?.querySelector('img');
    const mobileImg = mobilePicCell?.querySelector('img');

    if (desktopImg) {
      const sourceDesktop = document.createElement('source');
      sourceDesktop.media = '(min-width: 1440px)';
      sourceDesktop.srcset = desktopImg.src;
      picture.append(sourceDesktop);
    }
    if (tabletImg) {
      const sourceTablet = document.createElement('source');
      sourceTablet.media = '(min-width: 1024px)';
      sourceTablet.srcset = tabletImg.src;
      picture.append(sourceTablet);
    }
    if (mobileImg) {
      const sourceMobile = document.createElement('source');
      sourceMobile.media = '(min-width: 768px)';
      sourceMobile.srcset = mobileImg.src;
      picture.append(sourceMobile);
    }

    const img = document.createElement('img');
    img.classList.add('persistent-nav--level2-banner-img', 'lazyload');
    img.src = desktopImg?.src || '';
    img.alt = desktopImg?.alt || '';
    picture.append(img);

    // createOptimizedPicture expects an img src, not a picture element.
    // It will create a new picture element. We need to append its children.
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    // The original code was replacing `img.closest('picture')` which might be null or wrong.
    // Instead, we should append the sources and img from optimizedPic to our `picture` element.
    while (optimizedPic.firstElementChild) {
      picture.append(optimizedPic.firstElementChild);
    }

    const bannerInfo = document.createElement('div');
    bannerInfo.classList.add('persistent-nav--level2-banner--info', 'burger-nav');
    const bannerTitle = document.createElement('p');
    bannerTitle.classList.add('headline-h4');
    bannerTitle.textContent = titleCell?.textContent.trim();
    bannerInfo.append(bannerTitle);

    level2BannerDiv.append(picture, bannerInfo);
    level2Div.append(level2BannerDiv);
  }

  menuWrapper.append(level2Div);
  persistentNavLi.append(menuWrapper);
  persistentNavUl.append(persistentNavLi);
  navWrapper.append(persistentNavUl);
  section.append(navWrapper);

  block.replaceChildren(section);
}
