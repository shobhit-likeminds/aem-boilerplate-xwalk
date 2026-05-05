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
  const [
    level2BannerImageDesktopRow,
    level2BannerImage1024Row,
    level2BannerImage768Row,
    level2BannerImageMobileRow,
    level2BannerHeadlineRow,
    ...menuItemRows
  ] = [...block.children];

  const navSection = document.createElement('section');
  navSection.classList.add('burger-navigation', 'grid-container', 'js-burger-navigation');
  navSection.setAttribute('aria-label', 'Burger Navigation Section');

  const navWrapper = document.createElement('nav');
  navWrapper.classList.add('persistent-navigation--wrapper', 'js-persistent-nav', 'burger-nav');
  navSection.append(navWrapper);

  const persistentNavUl = document.createElement('ul');
  persistentNavUl.classList.add('persistent-navigation', 'grid-x');
  navWrapper.append(persistentNavUl);

  const persistentNavLi = document.createElement('li');
  persistentNavLi.classList.add('persistent-navigation--list');
  persistentNavUl.append(persistentNavLi);

  const menuWrapper = document.createElement('div');
  menuWrapper.classList.add('persistent-navigation--menu-wrapper', 'burger-nav');
  menuWrapper.id = 'burger-nav-wrapper';
  menuWrapper.setAttribute('aria-labelledby', 'burger-nav');
  persistentNavLi.append(menuWrapper);

  const level2Div = document.createElement('div');
  level2Div.classList.add('persistent-nav--level2', 'level2', 'grid-x');
  menuWrapper.append(level2Div);

  const level2ItemsDiv = document.createElement('div');
  level2ItemsDiv.classList.add('small-12', 'large-4', 'xlarge-3', 'persistent-nav--level2-items');
  level2Div.append(level2ItemsDiv);

  const level2CloseDiv = document.createElement('div');
  level2CloseDiv.classList.add('persistent-nav--level2--close', 'hide-for-large');
  level2ItemsDiv.append(level2CloseDiv);

  const controlPrevDiv = document.createElement('div');
  controlPrevDiv.classList.add('persistent-nav--control-prev', 'persistent-nav--control');
  level2CloseDiv.append(controlPrevDiv);

  const closeButton = document.createElement('button');
  closeButton.classList.add('persistent-nav--control-close', 'persistent-nav--control', 'js-persistent-nav-l1--close');
  closeButton.setAttribute('aria-label', 'Close navigation');
  closeButton.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L8.06066 7L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L7 8.06066L1.53033 13.5303C1.23744 13.8232 0.762563 13.8232 0.469669 13.5303C0.176777 13.2374 0.176777 12.7626 0.469669 12.4697L5.93934 7L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967Z" fill="#302216"></path>
    </svg>
  `;
  level2CloseDiv.append(closeButton);

  const level2ListUl = document.createElement('ul');
  level2ListUl.classList.add('persistent-nav--level2-list', 'burger-nav');
  level2ListUl.setAttribute('aria-labelledby', 'persistent-nav--level2--title--');
  level2ItemsDiv.append(level2ListUl);

  menuItemRows.forEach((row, i) => {
    const cells = [...row.children];
    const li = document.createElement('li');
    li.classList.add('persistent-nav--level2-list-item', 'grid-x', 'burger-nav');
    moveInstrumentation(row, li);

    if (cells.length === 11) { // burger-level2-menu-item
      const [
        labelCell,
        linkCell,
        _multipleLinks, // container field, no direct cell
        level3BannerImageDesktop,
        level3BannerImage1024,
        level3BannerImage768,
        level3BannerImageMobile,
        level3BannerHeadline,
        level3BannerDescription,
        level3BannerCtaLink,
        level3BannerCtaLabel,
        _level3Links, // container field, no direct cell
        hierarchyTreeCell,
      ] = cells;

      const hierarchyRoot = hierarchyTreeCell?.querySelector('ul');
      const directLink = linkCell?.querySelector('a')?.href;
      const labelText = labelCell?.textContent.trim();

      if (hierarchyRoot) {
        const button = document.createElement('button');
        button.classList.add('persistent-nav--level2-link', 'labelMediumRegular', 'text-left', 'js-persistent-nav--level2-link');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', `persistentNavLevel3List-burger-nav-wrapper-burger-${i + 1}`);
        button.textContent = labelText;
        li.append(button);

        const level3Wrapper = document.createElement('div');
        level3Wrapper.classList.add('small-12', 'large-8', 'xlarge-9', 'persistent-nav--level3-wrapper');
        level3Wrapper.id = `level-burger-nav-${i + 1}`;
        li.append(level3Wrapper);

        const level3Div = document.createElement('div');
        level3Div.classList.add('persistent-nav--level3', 'grid-x', 'burger-nav');
        level3Div.setAttribute('role', 'list');
        level3Wrapper.append(level3Div);

        const level3CloseDiv = document.createElement('div');
        level3CloseDiv.classList.add('persistent-nav--level2--close', 'level3', 'hide-for-large');
        level3CloseDiv.setAttribute('role', 'listitem');
        level3Div.append(level3CloseDiv);

        const backButton = document.createElement('button');
        backButton.classList.add('persistent-nav--control-prev', 'persistent-nav--control', 'js-persistent-nav-l2--close');
        backButton.setAttribute('aria-label', 'Back to previous navigation');
        backButton.innerHTML = `
          <svg role="presentation" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1L1 9L9 17" stroke="#302216" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        `;
        level3CloseDiv.append(backButton);

        const titleSpan = document.createElement('span');
        titleSpan.classList.add('persistent-nav--control-title', 'utilityTagHighCaps', 'js-persistent-nav-l2--close');
        level3CloseDiv.append(titleSpan);

        const closeButtonL3 = document.createElement('button');
        closeButtonL3.classList.add('persistent-nav--control-close', 'persistent-nav--control', 'js-persistent-nav-l1--close');
        closeButtonL3.setAttribute('aria-label', 'Close navigation');
        closeButtonL3.innerHTML = `
          <svg role="presentation" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L8.06066 7L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L7 8.06066L1.53033 13.5303C1.23744 13.8232 0.762563 13.8232 0.469669 13.5303C0.176777 13.2374 0.176777 12.7626 0.469669 12.4697L5.93934 7L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967Z" fill="#302216"></path>
          </svg>
        `;
        level3CloseDiv.append(closeButtonL3);

        const level3Title = document.createElement('p');
        level3Title.classList.add('persistent-nav--level3--title', 'text-center', 'hide-for-large', 'headline-h2');
        level3Title.setAttribute('role', 'listitem');
        level3Title.textContent = labelText;
        level3Div.append(level3Title);

        const level3ListDiv = document.createElement('div');
        level3ListDiv.classList.add('cell', 'small-12', 'large-12', 'xlarge-8', 'persistent-nav--level3-list', 'burger-nav');
        level3ListDiv.id = `persistentNavLevel3List-burger-nav-wrapper-burger-${i + 1}`;
        level3Div.append(level3ListDiv);

        const clonedHierarchyRoot = hierarchyRoot.cloneNode(true);
        transformNestedLists(clonedHierarchyRoot);
        level3ListDiv.append(clonedHierarchyRoot);

        button.addEventListener('click', () => {
          level3Wrapper.classList.toggle('active');
          level2ItemsDiv.classList.toggle('active');
          button.setAttribute('aria-expanded', level3Wrapper.classList.contains('active'));
        });
        backButton.addEventListener('click', () => {
          level3Wrapper.classList.remove('active');
          level2ItemsDiv.classList.remove('active');
          button.setAttribute('aria-expanded', 'false');
        });

      } else {
        const anchor = document.createElement('a');
        anchor.classList.add('persistent-nav--level2-link', 'js-persistent-nav--level2-link', 'labelMediumRegular', 'text-left');
        if (directLink) anchor.href = directLink;
        anchor.textContent = labelText;
        li.append(anchor);

        if (level3BannerImageDesktop?.querySelector('picture') || level3BannerHeadline?.textContent.trim() || level3BannerDescription?.innerHTML || level3BannerCtaLink?.querySelector('a')) {
          const level3Wrapper = document.createElement('div');
          level3Wrapper.classList.add('small-12', 'large-8', 'xlarge-9', 'persistent-nav--level3-wrapper');
          level3Wrapper.id = `level-burger-nav-${i + 1}`;
          li.append(level3Wrapper);

          const level3Div = document.createElement('div');
          level3Div.classList.add('persistent-nav--level3', 'grid-x', 'burger-nav', 'full-width');
          level3Div.setAttribute('role', 'list');
          level3Div.setAttribute('data-full-banner', '1');
          level3Wrapper.append(level3Div);

          const level3CloseDiv = document.createElement('div');
          level3CloseDiv.classList.add('persistent-nav--level2--close', 'level3', 'hide-for-large');
          level3CloseDiv.setAttribute('role', 'listitem');
          level3Div.append(level3CloseDiv);

          const backButton = document.createElement('button');
          backButton.classList.add('persistent-nav--control-prev', 'persistent-nav--control', 'js-persistent-nav-l2--close');
          backButton.setAttribute('aria-label', 'Back to previous navigation');
          backButton.innerHTML = `
            <svg role="presentation" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 1L1 9L9 17" stroke="#302216" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          `;
          level3CloseDiv.append(backButton);

          const titleSpan = document.createElement('span');
          titleSpan.classList.add('persistent-nav--control-title', 'utilityTagHighCaps', 'js-persistent-nav-l2--close');
          level3CloseDiv.append(titleSpan);

          const closeButtonL3 = document.createElement('button');
          closeButtonL3.classList.add('persistent-nav--control-close', 'persistent-nav--control', 'js-persistent-nav-l1--close');
          closeButtonL3.setAttribute('aria-label', 'Close navigation');
          closeButtonL3.innerHTML = `
            <svg role="presentation" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L8.06066 7L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L7 8.06066L1.53033 13.5303C1.23744 13.8232 0.762563 13.8232 0.469669 13.5303C0.176777 13.2374 0.176777 12.7626 0.469669 12.4697L5.93934 7L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967Z" fill="#302216"></path>
            </svg>
          `;
          level3CloseDiv.append(closeButtonL3);

          const level3Title = document.createElement('p');
          level3Title.classList.add('persistent-nav--level3--title', 'text-center', 'hide-for-large', 'headline-h2');
          level3Title.setAttribute('role', 'listitem');
          level3Title.textContent = labelText;
          level3Div.append(level3Title);

          const level3ContentDiv = document.createElement('div');
          level3ContentDiv.classList.add('cell', 'small-12', 'large-12', 'full-width', 'persistent-nav--level3-content', 'burger-nav');
          level3ContentDiv.setAttribute('role', 'listitem');
          level3Div.append(level3ContentDiv);

          const picture = level3BannerImageDesktop?.querySelector('picture');
          if (picture) {
            const bannerPicture = document.createElement('picture');
            bannerPicture.classList.add('persistent-nav--level3-banner-picture');
            const img = picture.querySelector('img');
            if (img) {
              const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 1440px)', width: '1440' }, { media: '(min-width: 1024px)', width: '1024' }, { media: '(min-width: 768px)', width: '768' }, { width: '750' }]);
              moveInstrumentation(img, optimizedPic.querySelector('img'));
              bannerPicture.replaceWith(optimizedPic);
              optimizedPic.classList.add('persistent-nav--level3-banner-img', 'show-for-large', 'lazyload');
              level3ContentDiv.append(optimizedPic);
            }
          }

          const bannerDescDiv = document.createElement('div');
          bannerDescDiv.classList.add('persistent-nav--level3-banner-desc', 'grid-x', 'align-middle', 'full-width');
          level3ContentDiv.append(bannerDescDiv);

          if (level3BannerHeadline?.textContent.trim()) {
            const headline = document.createElement('div');
            headline.classList.add('bodyLargeBold');
            headline.textContent = level3BannerHeadline.textContent.trim();
            bannerDescDiv.append(headline);
          }

          if (level3BannerDescription?.innerHTML) {
            const description = document.createElement('div');
            description.classList.add('bodySmallRegular');
            description.innerHTML = level3BannerDescription.innerHTML;
            bannerDescDiv.append(description);
          }

          const ctaLink = level3BannerCtaLink?.querySelector('a');
          const ctaLabel = level3BannerCtaLabel?.textContent.trim();
          if (ctaLink && ctaLabel) {
            const ctaAnchor = document.createElement('a');
            ctaAnchor.href = ctaLink.href;
            ctaAnchor.classList.add('labelMediumRegular', 'persistent-nav--level3-banner-desc-link');
            ctaAnchor.textContent = ctaLabel;
            bannerDescDiv.append(ctaAnchor);
          }

          anchor.addEventListener('click', () => {
            level3Wrapper.classList.toggle('active');
            level2ItemsDiv.classList.toggle('active');
          });
          backButton.addEventListener('click', () => {
            level3Wrapper.classList.remove('active');
            level2ItemsDiv.classList.remove('active');
          });
        }
      }
    } else if (cells.length === 2) { // burger-multiple-link-item or burger-level3-link-item
      const [labelCell, linkCell] = cells;
      const labelText = labelCell?.textContent.trim();
      const directLink = linkCell?.querySelector('a')?.href;

      const multipleLinksDiv = document.createElement('div');
      multipleLinksDiv.classList.add('multipleLinks');
      li.append(multipleLinksDiv);

      const anchor = document.createElement('a');
      anchor.classList.add('persistent-nav--level2-link', 'js-persistent-nav--level2-link', 'labelMediumRegular', 'text-left', 'no-submenu');
      if (directLink) anchor.href = directLink;
      anchor.textContent = labelText;
      multipleLinksDiv.append(anchor);
      multipleLinksDiv.append(document.createElement('span')).classList.add('multipleLinks--seperator');
    }
    level2ListUl.append(li);
  });

  const level2BannerDiv = document.createElement('div');
  level2BannerDiv.classList.add('small-12', 'large-8', 'xlarge-9', 'persistent-nav--level2-banner', 'show-for-large');
  level2Div.append(level2BannerDiv);

  const desktopPicture = level2BannerImageDesktopRow?.querySelector('picture');
  if (desktopPicture) {
    const bannerPicture = document.createElement('picture');
    bannerPicture.classList.add('persistent-nav--level2-banner-picture', 'burger-nav');
    const img = desktopPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 1440px)', width: '1440' }, { media: '(min-width: 1024px)', width: '1024' }, { media: '(min-width: 768px)', width: '768' }, { width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      bannerPicture.replaceWith(optimizedPic);
      optimizedPic.classList.add('persistent-nav--level2-banner-img', 'lazyload');
      level2BannerDiv.append(optimizedPic);
    }
  }

  if (level2BannerHeadlineRow?.textContent.trim()) {
    const bannerInfoDiv = document.createElement('div');
    bannerInfoDiv.classList.add('persistent-nav--level2-banner--info', 'burger-nav');
    const headline = document.createElement('p');
    headline.classList.add('headline-h4');
    headline.textContent = level2BannerHeadlineRow.textContent.trim();
    moveInstrumentation(level2BannerHeadlineRow, headline);
    bannerInfoDiv.append(headline);
    level2BannerDiv.append(bannerInfoDiv);
  }

  block.replaceChildren(navSection);
}
