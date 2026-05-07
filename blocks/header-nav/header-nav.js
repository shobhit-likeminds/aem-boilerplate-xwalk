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
        // moveInstrumentation for the newly created span
        moveInstrumentation(li, span);
      }
    }

    if (nested) {
      nested.remove();
      const subWrap = document.createElement('div');
      subWrap.classList.add('elementor-nav-menu--dropdown');
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        trigger.classList.add('elementor-item', 'elementor-item-anchor', 'has-submenu');
        const subArrow = document.createElement('span');
        subArrow.classList.add('sub-arrow');
        subArrow.innerHTML = '<svg class="e-font-icon-svg e-fas-caret-down" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>';
        trigger.append(subArrow);

        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('elementor-active');
          subWrap.classList.toggle('elementor-active');
          trigger.setAttribute('aria-expanded', subWrap.classList.contains('elementor-active'));
        });
      }
    } else if (anchor) {
      anchor.classList.add('elementor-sub-item');
    }
  });
}

export default function decorate(block) {
  const [logoRow, logoLinkRow, ...itemRows] = [...block.children];

  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('elementor-element', 'elementor-element-7910b0b', 'e-con-full', 'e-flex', 'e-con', 'e-parent', 'e-lazyloaded', 'elementor-sticky', 'elementor-sticky--active', 'elementor-section--handles-inside', 'elementor-sticky--effects');

  const mainHeaderContainer = document.createElement('div');
  mainHeaderContainer.classList.add('elementor-element', 'elementor-element-2dcde62', 'e-flex', 'e-con-boxed', 'e-con', 'e-child');
  headerWrapper.append(mainHeaderContainer);

  const mainHeaderInner = document.createElement('div');
  mainHeaderInner.classList.add('e-con-inner');
  mainHeaderContainer.append(mainHeaderInner);

  // Logo
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('elementor-element', 'elementor-element-5fef5c1', 'elementor-widget__width-initial', 'elementor-widget', 'elementor-widget-theme-site-logo', 'elementor-widget-image');
  mainHeaderInner.append(logoWrapper);

  const logoWidgetContainer = document.createElement('div');
  logoWidgetContainer.classList.add('elementor-widget-container');
  logoWrapper.append(logoWidgetContainer);

  const logoLink = document.createElement('a');
  const foundLogoLink = logoLinkRow.querySelector('a');
  if (foundLogoLink) {
    logoLink.href = foundLogoLink.href;
  }
  moveInstrumentation(logoLinkRow, logoLink);

  const picture = logoRow.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '503' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, logoLink);
  logoWidgetContainer.append(logoLink);

  // Navigation Menu
  const navMenuWrapper = document.createElement('div');
  navMenuWrapper.classList.add('elementor-element', 'elementor-element-f6dc590', 'elementor-widget__width-initial', 'elementor-nav-menu--stretch', 'elementor-nav-menu__text-align-center', 'elementor-nav-menu__align-end', 'elementor-nav-menu--dropdown-tablet', 'elementor-nav-menu--toggle', 'elementor-nav-menu--burger', 'elementor-widget', 'elementor-widget-nav-menu');
  mainHeaderInner.append(navMenuWrapper);

  const navWidgetContainer = document.createElement('div');
  navWidgetContainer.classList.add('elementor-widget-container');
  navMenuWrapper.append(navWidgetContainer);

  const nav = document.createElement('nav');
  nav.classList.add('elementor-nav-menu--main', 'elementor-nav-menu__container', 'elementor-nav-menu--layout-horizontal', 'e--pointer-underline', 'e--animation-fade');
  nav.setAttribute('aria-label', 'Menu');
  navWidgetContainer.append(nav);

  const ul = document.createElement('ul');
  ul.classList.add('elementor-nav-menu');
  nav.append(ul);

  const navigationItems = itemRows.filter((row) => row.children.length === 3);
  const segmentLinkItems = itemRows.filter((row) => row.children.length === 2);

  navigationItems.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('menu-item', 'menu-item-type-custom', 'menu-item-object-custom', 'menu-item-has-children');

    const foundLink = linkCell.querySelector('a');
    let rootEl;
    if (foundLink) {
      rootEl = document.createElement('a');
      rootEl.href = foundLink.href;
    } else {
      rootEl = document.createElement('span');
    }
    rootEl.textContent = labelCell.textContent.trim();
    rootEl.classList.add('elementor-item');
    moveInstrumentation(row, rootEl); // Move instrumentation from the row to the root element
    li.appendChild(rootEl);

    const hierarchyRootContainer = document.createElement('div');
    hierarchyRootContainer.innerHTML = hierarchyCell?.innerHTML || '';
    const hierarchyRoot = hierarchyRootContainer.querySelector('ul');

    if (hierarchyRoot) {
      // Apply classes to nested elements from ORIGINAL HTML
      hierarchyRoot.classList.add('sub-menu'); // from ORIGINAL HTML
      hierarchyRoot.querySelectorAll('li').forEach(itemLi => {
        itemLi.classList.add('menu-item', 'menu-item-type-custom', 'menu-item-object-custom');
      });
      hierarchyRoot.querySelectorAll('a').forEach(itemA => {
        itemA.classList.add('elementor-sub-item');
      });

      const wrapper = document.createElement('div');
      wrapper.classList.add('elementor-nav-menu--dropdown');
      // Move instrumentation from hierarchyCell to the wrapper before appending children
      moveInstrumentation(hierarchyCell, wrapper);
      while (hierarchyRoot.firstChild) {
        wrapper.append(hierarchyRoot.firstChild);
      }
      wrapper.prepend(hierarchyRoot); // Re-add the ul itself

      rootEl.classList.add('elementor-item-anchor', 'has-submenu');
      const subArrow = document.createElement('span');
      subArrow.classList.add('sub-arrow');
      subArrow.innerHTML = '<svg class="e-font-icon-svg e-fas-caret-down" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>';
      rootEl.append(subArrow);

      rootEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('elementor-active');
        wrapper.classList.toggle('elementor-active');
        rootEl.setAttribute('aria-expanded', wrapper.classList.contains('elementor-active'));
      });
      li.appendChild(wrapper);
      transformNestedLists(hierarchyRoot);
    }
    ul.appendChild(li);
  });

  // Segment Links
  const segmentLinksContainer = document.createElement('div');
  segmentLinksContainer.classList.add('elementor-element', 'elementor-element-ff0ccea', 'elementor-hidden-mobile', 'e-flex', 'e-con-boxed', 'e-con', 'e-child');
  headerWrapper.append(segmentLinksContainer);

  const segmentLinksInner = document.createElement('div');
  segmentLinksInner.classList.add('e-con-inner');
  segmentLinksContainer.append(segmentLinksInner);

  const segmentListWrapper = document.createElement('div');
  segmentListWrapper.classList.add('elementor-element', 'elementor-element-8b8d930', 'elementor-icon-list--layout-inline', 'elementor-align-center', 'elementor-list-item-link-full_width', 'elementor-widget', 'elementor-widget-icon-list');
  segmentLinksInner.append(segmentListWrapper);

  const segmentWidgetContainer = document.createElement('div');
  segmentWidgetContainer.classList.add('elementor-widget-container');
  segmentListWrapper.append(segmentWidgetContainer);

  const segmentUl = document.createElement('ul');
  segmentUl.classList.add('elementor-icon-list-items', 'elementor-inline-items');
  segmentWidgetContainer.append(segmentUl);

  segmentLinkItems.forEach((row) => {
    const [labelCell, linkCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('elementor-icon-list-item', 'elementor-inline-item');

    const anchor = document.createElement('a');
    const foundLink = linkCell.querySelector('a');
    if (foundLink) {
      anchor.href = foundLink.href;
    }
    moveInstrumentation(row, anchor);

    const span = document.createElement('span');
    span.classList.add('elementor-icon-list-text');
    span.textContent = labelCell.textContent.trim();
    anchor.append(span);
    li.append(anchor);
    segmentUl.append(li);
  });

  block.replaceChildren(headerWrapper);
}
