import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function transformNestedLists(rootUl, mobBackImageSrc) {
  rootUl.querySelectorAll('li').forEach((li) => {
    const nested = li.querySelector(':scope > ul');
    // Handle label-only nodes or nodes with only text content
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
      subWrap.classList.add('level2'); // Use class from ORIGINAL HTML
      const mobBack = document.createElement('li');
      mobBack.classList.add('mob-back');
      // Use the image source passed from the closeIconRow
      mobBack.innerHTML = `<img src="${mobBackImageSrc}" alt=""/>`;
      subWrap.prepend(mobBack);
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
      transformNestedLists(nested, mobBackImageSrc); // Recursively transform nested lists
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [
    desktopLogoRow,
    desktopLogoLinkRow,
    mobileLogoRow,
    closeIconRow,
    logo2Row,
    logo2LinkRow,
    modeButtonLabelRow,
    modeLightLabelRow,
    modeDarkLabelRow,
    ...navigationItemRows
  ] = children;

  const headerFullWrp = document.createElement('section');
  headerFullWrp.classList.add('header-full-wrp', 'fixed'); // nav-up is a scroll state class, do not add initially

  const topHead = document.createElement('div');
  topHead.classList.add('top-head');
  const topHeadContainer = document.createElement('div');
  topHeadContainer.classList.add('container-1600-wrp');
  topHeadContainer.append(document.createElement('ul')); // Empty ul as per original HTML
  topHead.append(topHeadContainer);
  headerFullWrp.append(topHead);

  const mainNavBx = document.createElement('div');
  mainNavBx.classList.add('main-nav-bx');
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('container-1600-wrp');
  const mainNavRow = document.createElement('div');
  mainNavRow.classList.add('row');

  const colLeft = document.createElement('div');
  colLeft.classList.add('col-md-2', 'col-6');

  const desktopLogoLink = document.createElement('a');
  desktopLogoLink.classList.add('logo-wrp');
  desktopLogoLink.href = desktopLogoLinkRow?.querySelector('a')?.href || '#';
  const desktopLogoPicture = desktopLogoRow?.querySelector('picture');
  if (desktopLogoPicture) {
    const desktopLogoImg = desktopLogoPicture.querySelector('img');
    const optimizedDesktopPic = createOptimizedPicture(
      desktopLogoImg.src,
      desktopLogoImg.alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(desktopLogoRow, optimizedDesktopPic.querySelector('img'));
    desktopLogoLink.append(optimizedDesktopPic);
  }
  moveInstrumentation(desktopLogoLinkRow, desktopLogoLink);
  colLeft.append(desktopLogoLink);

  const mobileLogoPicture = mobileLogoRow?.querySelector('picture');
  if (mobileLogoPicture) {
    const mobileLogoImg = mobileLogoPicture.querySelector('img');
    const optimizedMobilePic = createOptimizedPicture(
      mobileLogoImg.src,
      mobileLogoImg.alt,
      false,
      [{ width: '750' }],
    );
    optimizedMobilePic.classList.add('image-holder', 'tata-logo-mob');
    moveInstrumentation(mobileLogoRow, optimizedMobilePic.querySelector('img'));
    colLeft.append(optimizedMobilePic);
  }

  const navIcon = document.createElement('div');
  navIcon.id = 'nav-icon4';
  navIcon.innerHTML = '<span></span><span></span><span></span>';
  colLeft.append(navIcon);

  const modeButton = document.createElement('button');
  modeButton.id = 'switch2';
  modeButton.textContent = modeButtonLabelRow?.textContent.trim() || 'Mode';
  const strong = document.createElement('strong');
  const lightSpan = document.createElement('span');
  lightSpan.classList.add('switch2_light');
  lightSpan.textContent = modeLightLabelRow?.textContent.trim() || 'Light';
  const darkSpan = document.createElement('span');
  darkSpan.classList.add('switch2_dark');
  darkSpan.textContent = modeDarkLabelRow?.textContent.trim() || 'Dark';
  strong.append(lightSpan, darkSpan);
  modeButton.append(strong);
  moveInstrumentation(modeButtonLabelRow, modeButton);
  moveInstrumentation(modeLightLabelRow, lightSpan);
  moveInstrumentation(modeDarkLabelRow, darkSpan);
  colLeft.append(modeButton);

  mainNavRow.append(colLeft);

  const colRight = document.createElement('div');
  colRight.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');
  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');

  const closeMobDrop = document.createElement('a');
  closeMobDrop.href = 'javascript:void(0)';
  closeMobDrop.classList.add('close-mob-drop');
  let closeIconSrc = '';
  const closeIconPicture = closeIconRow?.querySelector('picture');
  if (closeIconPicture) {
    const closeIconImg = closeIconPicture.querySelector('img');
    closeIconSrc = closeIconImg.src; // Store src for mob-back
    const optimizedClosePic = createOptimizedPicture(
      closeIconImg.src,
      closeIconImg.alt,
      false,
      [{ width: '750' }],
    );
    moveInstrumentation(closeIconRow, optimizedClosePic.querySelector('img'));
    closeMobDrop.append(optimizedClosePic);
  }
  navCard.append(closeMobDrop);

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');

  navigationItemRows.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('level1'); // Default class for menu items

    const foundLink = linkCell?.querySelector('a');
    let rootEl;
    if (foundLink) {
      rootEl = document.createElement('a');
      rootEl.href = foundLink.href;
    } else {
      rootEl = document.createElement('span');
    }
    rootEl.textContent = labelCell?.textContent.trim() || '';
    moveInstrumentation(row, rootEl); // Move instrumentation from the row to the root element

    li.appendChild(rootEl);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      // If there's a hierarchy, this is a dropdown item
      rootEl.href = 'javascript:void(0)'; // Set href to void for dropdown triggers
      // Apply classes to nested elements before transformation
      hierarchyRoot.querySelectorAll('ul').forEach((ul) => ul.classList.add('level2'));
      hierarchyRoot.querySelectorAll('li').forEach((item) => item.classList.add('level1'));
      hierarchyRoot.querySelectorAll('a').forEach((a) => {
        // Ensure anchors in nested lists don't have href='javascript:void(0)' unless they are triggers
        if (!a.closest('li.mob-back')) { // Exclude mob-back links
          const parentLi = a.closest('li');
          if (parentLi && parentLi.querySelector(':scope > ul')) {
            a.href = 'javascript:void(0)'; // If it has a nested UL, it's a trigger
          }
        }
      });

      // Create a temporary div to hold the hierarchy content and move instrumentation
      const tempDiv = document.createElement('div');
      moveInstrumentation(hierarchyCell, tempDiv);
      tempDiv.innerHTML = hierarchyCell.innerHTML; // Preserve full HTML structure

      const transformedHierarchy = tempDiv.querySelector('ul');
      if (transformedHierarchy) {
        transformNestedLists(transformedHierarchy, closeIconSrc); // Transform the nested list
        li.appendChild(transformedHierarchy); // Append the transformed hierarchy
      }
    } else {
      // If no hierarchy, it's a simple link
      li.classList.add('no-arrw-mob');
    }
    level1Ul.append(li);
  });

  navCard.append(level1Ul);

  const logoWrp2 = document.createElement('a');
  logoWrp2.classList.add('logo-wrp2');
  logoWrp2.target = '_blank';
  logoWrp2.href = logo2LinkRow?.querySelector('a')?.href || '#';
  const logo2Picture = logo2Row?.querySelector('picture');
  if (logo2Picture) {
    const svgElement = logo2Picture.querySelector('img');
    if (svgElement && svgElement.src.endsWith('.svg')) {
      fetch(svgElement.src)
        .then((response) => response.text())
        .then((svgText) => {
          const parser = new DOMParser();
          const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
          const svg = svgDoc.querySelector('svg');
          if (svg) {
            // Apply attributes from original HTML if necessary, or ensure they are present
            svg.setAttribute('width', '136');
            svg.setAttribute('height', '29');
            svg.setAttribute('viewBox', '0 0 132 29');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            logoWrp2.append(svg);
          }
        })
        .catch((e) => console.error('Failed to load SVG:', e));
    }
    moveInstrumentation(logo2Row, logoWrp2);
    moveInstrumentation(logo2LinkRow, logoWrp2);
  }
  navCard.append(logoWrp2);

  colRight.append(navCard);
  mainNavRow.append(colRight);
  mainNavContainer.append(mainNavRow);
  mainNavBx.append(mainNavContainer);
  headerFullWrp.append(mainNavBx);

  // Search section
  const cdSearch = document.createElement('div');
  cdSearch.classList.add('cd-search');
  cdSearch.style.display = 'none'; // Initially hidden as per original HTML
  const searchContainer = document.createElement('div');
  searchContainer.classList.add('container');
  const inputGroup = document.createElement('div');
  inputGroup.classList.add('input-group');
  inputGroup.innerHTML = `
    <input class="form-control border-end-0 border" type="search" value="search" id="example-search-input"/>
    <span class="input-group-append">
      <button class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5" type="button">
        <i class="fa fa-search"></i>
      </button>
    </span>
  `;
  searchContainer.append(inputGroup);
  cdSearch.append(searchContainer);
  headerFullWrp.append(cdSearch);

  // Event listeners for mobile navigation toggle
  navIcon.addEventListener('click', () => {
    navIcon.classList.toggle('open');
    navCard.classList.toggle('open');
    document.body.classList.toggle('overflow-hidden');
  });

  closeMobDrop.addEventListener('click', (e) => {
    e.preventDefault();
    navIcon.classList.remove('open');
    navCard.classList.remove('open');
    document.body.classList.remove('overflow-hidden');
  });

  block.replaceChildren(headerFullWrp);
}
