import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const level2BannerImageRow = children[0];
  const level2BannerHeadlineRow = children[1];

  const navItems = children.slice(2).filter(
    (row) => row.children.length === 3 && row.children[2].querySelector('ul'),
  );
  const multipleLinkItems = children.slice(2).filter(
    (row) => row.children.length === 2 && !row.querySelector('picture'),
  );
  const level3BannerItems = children.slice(2).filter(
    (row) => row.children.length === 5 && row.children[0].querySelector('picture'),
  );
  const level3SimpleLinkItems = children.slice(2).filter(
    (row) => row.children.length === 2 && !row.children[0].querySelector('picture'),
  );

  const root = document.createElement('nav');
  root.classList.add('persistent-navigation--wrapper', 'js-persistent-nav', 'burger-nav');
  moveInstrumentation(block, root);

  const ul = document.createElement('ul');
  ul.classList.add('persistent-navigation', 'grid-x');
  root.append(ul);

  const li = document.createElement('li');
  li.classList.add('persistent-navigation--list');
  ul.append(li);

  const menuWrapper = document.createElement('div');
  menuWrapper.classList.add('persistent-navigation--menu-wrapper', 'burger-nav');
  menuWrapper.id = 'burger-nav-wrapper';
  menuWrapper.setAttribute('aria-labelledby', 'burger-nav');
  li.append(menuWrapper);

  const level2Div = document.createElement('div');
  level2Div.classList.add('persistent-nav--level2', 'level2', 'grid-x');
  menuWrapper.append(level2Div);

  const level2ItemsDiv = document.createElement('div');
  level2ItemsDiv.classList.add('small-12', 'large-4', 'xlarge-3', 'persistent-nav--level2-items');
  level2Div.append(level2ItemsDiv);

  const level2CloseDiv = document.createElement('div');
  level2CloseDiv.classList.add('persistent-nav--level2--close', 'hide-for-large');
  level2ItemsDiv.append(level2CloseDiv);

  const prevControl = document.createElement('div');
  prevControl.classList.add('persistent-nav--control-prev', 'persistent-nav--control');
  level2CloseDiv.append(prevControl);

  const closeButton = document.createElement('button');
  closeButton.classList.add('persistent-nav--control-close', 'persistent-nav--control', 'js-persistent-nav-l1--close');
  closeButton.setAttribute('aria-label', 'Close navigation');
  closeButton.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L8.06066 7L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L7 8.06066L1.53033 13.5303C1.23744 13.8232 0.762563 13.8232 0.469669 13.5303C0.176777 13.2374 0.176777 12.7626 0.469669 12.4697L5.93934 7L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967Z" fill="#302216"></path>
    </svg>`;
  level2CloseDiv.append(closeButton);

  const level2List = document.createElement('ul');
  level2List.classList.add('persistent-nav--level2-list', 'burger-nav');
  level2List.setAttribute('aria-labelledby', 'persistent-nav--level2--title--');
  level2ItemsDiv.append(level2List);

  navItems.forEach((row, index) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
    const itemLi = document.createElement('li');
    itemLi.classList.add('persistent-nav--level2-list-item', 'grid-x', 'burger-nav');
    moveInstrumentation(row, itemLi);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    const linkElement = linkCell?.querySelector('a');

    let triggerElement;
    if (hierarchyRoot) {
      triggerElement = document.createElement('button');
      triggerElement.classList.add('persistent-nav--level2-link', 'labelMediumRegular', 'text-left', 'js-persistent-nav--level2-link');
      triggerElement.setAttribute('aria-expanded', 'false');
      triggerElement.setAttribute('aria-controls', `persistentNavLevel3List-burger-nav-wrapper-burger-${index + 1}`);
      triggerElement.textContent = labelCell.textContent.trim();
    } else if (multipleLinkItems.length > 0) {
      triggerElement = document.createElement('div');
      triggerElement.classList.add('multipleLinks');
      multipleLinkItems.forEach((multipleLinkRow) => {
        const [multipleLinkLabelCell, multipleLinkUrlCell] = [...multipleLinkRow.children];
        const multipleLinkAnchor = document.createElement('a');
        multipleLinkAnchor.href = multipleLinkUrlCell?.querySelector('a')?.href || '#';
        multipleLinkAnchor.textContent = multipleLinkLabelCell?.textContent.trim();
        multipleLinkAnchor.classList.add('persistent-nav--level2-link', 'js-persistent-nav--level2-link', 'labelMediumRegular', 'text-left', 'no-submenu');
        triggerElement.append(multipleLinkAnchor);
        const separator = document.createElement('span');
        separator.classList.add('multipleLinks--seperator');
        triggerElement.append(separator);
        moveInstrumentation(multipleLinkRow, multipleLinkAnchor);
      });
      if (triggerElement.lastChild && triggerElement.lastChild.classList.contains('multipleLinks--seperator')) {
        triggerElement.lastChild.remove();
      }
    } else {
      triggerElement = document.createElement('a');
      triggerElement.classList.add('persistent-nav--level2-link', 'js-persistent-nav--level2-link', 'labelMediumRegular', 'text-left');
      if (linkElement) {
        triggerElement.href = linkElement.href;
      }
      triggerElement.textContent = labelCell.textContent.trim();
    }

    itemLi.append(triggerElement);

    if (hierarchyRoot || level3BannerItems.length > 0 || level3SimpleLinkItems.length > 0) {
      const level3Wrapper = document.createElement('div');
      level3Wrapper.classList.add('small-12', 'large-8', 'xlarge-9', 'persistent-nav--level3-wrapper');
      level3Wrapper.id = `level-burger-nav-${index + 1}`;
      itemLi.append(level3Wrapper);

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
        </svg>`;
      level3CloseDiv.append(backButton);

      const controlTitle = document.createElement('span');
      controlTitle.classList.add('persistent-nav--control-title', 'utilityTagHighCaps', 'js-persistent-nav-l2--close');
      level3CloseDiv.append(controlTitle);

      const closeButton2 = document.createElement('button');
      closeButton2.classList.add('persistent-nav--control-close', 'persistent-nav--control', 'js-persistent-nav-l1--close');
      closeButton2.setAttribute('aria-label', 'Close navigation');
      closeButton2.innerHTML = `
        <svg role="presentation" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L8.06066 7L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L7 8.06066L1.53033 13.5303C1.23744 13.8232 0.762563 13.8232 0.469669 13.5303C0.176777 13.2374 0.176777 12.7626 0.469669 12.4697L5.93934 7L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967Z" fill="#302216"></path>
        </svg>`;
      level3CloseDiv.append(closeButton2);

      const level3Title = document.createElement('p');
      level3Title.classList.add('persistent-nav--level3--title', 'text-center', 'hide-for-large', 'headline-h2');
      level3Title.setAttribute('role', 'listitem');
      level3Title.textContent = labelCell.textContent.trim();
      level3Div.append(level3Title);

      if (hierarchyRoot) {
        const level3ListDiv = document.createElement('div');
        level3ListDiv.classList.add('cell', 'small-12', 'large-12', 'xlarge-8', 'persistent-nav--level3-list', 'burger-nav');
        level3ListDiv.id = `persistentNavLevel3List-burger-nav-wrapper-burger-${index + 1}`;
        level3ListDiv.append(hierarchyRoot);
        level3Div.append(level3ListDiv);

        transformNestedLists(hierarchyRoot);
      } else if (level3BannerItems.length > 0) {
        level3Div.classList.add('full-width');
        level3Div.setAttribute('data-full-banner', '1');

        level3BannerItems.forEach((bannerRow) => {
          const [bannerImageCell, bannerTitleCell, bannerDescCell, bannerCtaLinkCell, bannerCtaLabelCell] = [...bannerRow.children];
          const bannerItemDiv = document.createElement('div');
          bannerItemDiv.classList.add('cell', 'small-12', 'large-12', 'full-width', 'persistent-nav--level3', 'burger-nav');
          bannerItemDiv.setAttribute('role', 'listitem');
          moveInstrumentation(bannerRow, bannerItemDiv);

          const picture = bannerImageCell.querySelector('picture');
          if (picture) {
            const optimizedPic = createOptimizedPicture(picture.querySelector('img').src, picture.querySelector('img').alt, false, [{ width: '750' }]);
            optimizedPic.classList.add('persistent-nav--level3-banner-picture');
            bannerItemDiv.append(optimizedPic);
            moveInstrumentation(picture, optimizedPic.querySelector('img'));
          }

          const bannerDescDiv = document.createElement('div');
          bannerDescDiv.classList.add('persistent-nav--level3-banner-desc', 'grid-x', 'align-middle', 'full-width');
          bannerItemDiv.append(bannerDescDiv);

          const bannerTitle = document.createElement('div');
          bannerTitle.classList.add('bodyLargeBold');
          bannerTitle.textContent = bannerTitleCell.textContent.trim();
          bannerDescDiv.append(bannerTitle);

          const bannerDescription = document.createElement('div');
          bannerDescription.classList.add('bodySmallRegular');
          bannerDescription.innerHTML = bannerDescCell.innerHTML;
          bannerDescDiv.append(bannerDescription);

          const bannerCtaLink = document.createElement('a');
          bannerCtaLink.classList.add('labelMediumRegular', 'persistent-nav--level3-banner-desc-link');
          bannerCtaLink.href = bannerCtaLinkCell?.querySelector('a')?.href || '#';
          bannerCtaLink.textContent = bannerCtaLabelCell.textContent.trim();
          bannerDescDiv.append(bannerCtaLink);

          level3Div.append(bannerItemDiv);
        });
      } else if (level3SimpleLinkItems.length > 0) {
        const level3ListDiv = document.createElement('div');
        level3ListDiv.classList.add('cell', 'small-12', 'large-12', 'xlarge-8', 'persistent-nav--level3-list', 'burger-nav');
        level3ListDiv.id = `persistentNavLevel3List-burger-nav-wrapper-burger-${index + 1}`;
        level3Div.append(level3ListDiv);

        level3SimpleLinkItems.forEach((simpleLinkRow) => {
          const [simpleLinkLabelCell, simpleLinkUrlCell] = [...simpleLinkRow.children];
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('persistent-nav--level3-list-item');
          itemDiv.setAttribute('role', 'listitem');
          moveInstrumentation(simpleLinkRow, itemDiv);

          const anchor = document.createElement('a');
          anchor.classList.add('persistent-nav--level3-link', 'grid-x', 'align-left', 'align-middle');
          anchor.href = simpleLinkUrlCell?.querySelector('a')?.href || '#';
          anchor.setAttribute('aria-label', simpleLinkLabelCell.textContent.trim());
          anchor.setAttribute('title', simpleLinkLabelCell.textContent.trim());
          itemDiv.append(anchor);

          const span = document.createElement('span');
          span.classList.add('persistent-nav--level3-title', 'no-icon');
          span.textContent = simpleLinkLabelCell.textContent.trim();
          anchor.append(span);
          level3ListDiv.append(itemDiv);
        });
      }

      if (hierarchyRoot) {
        triggerElement.addEventListener('click', () => {
          level3Wrapper.classList.toggle('active');
          itemLi.classList.toggle('active');
          triggerElement.setAttribute('aria-expanded', level3Wrapper.classList.contains('active'));
        });

        backButton.addEventListener('click', () => {
          level3Wrapper.classList.remove('active');
          itemLi.classList.remove('active');
          triggerElement.setAttribute('aria-expanded', 'false');
        });
      }
    }
    level2List.append(itemLi);
  });

  const level2BannerDiv = document.createElement('div');
  level2BannerDiv.classList.add('small-12', 'large-8', 'xlarge-9', 'persistent-nav--level2-banner', 'show-for-large');
  level2Div.append(level2BannerDiv);

  const bannerPicture = level2BannerImageRow.querySelector('picture');
  if (bannerPicture) {
    const optimizedPic = createOptimizedPicture(bannerPicture.querySelector('img').src, bannerPicture.querySelector('img').alt, false, [{ width: '750' }]);
    optimizedPic.classList.add('persistent-nav--level2-banner-picture', 'burger-nav');
    level2BannerDiv.append(optimizedPic);
    moveInstrumentation(level2BannerImageRow, optimizedPic.querySelector('img'));
  }

  const bannerInfoDiv = document.createElement('div');
  bannerInfoDiv.classList.add('persistent-nav--level2-banner--info', 'burger-nav');
  level2BannerDiv.append(bannerInfoDiv);

  const bannerHeadline = document.createElement('p');
  bannerHeadline.classList.add('headline-h4');
  bannerHeadline.textContent = level2BannerHeadlineRow.textContent.trim();
  bannerInfoDiv.append(bannerHeadline);
  moveInstrumentation(level2BannerHeadlineRow, bannerHeadline);

  block.replaceChildren(root);

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
}
