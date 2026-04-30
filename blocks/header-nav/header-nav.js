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
      subWrap.classList.add('level2');
      subWrap.append(nested);
      li.append(subWrap);

      const trigger = li.querySelector(':scope > a, :scope > span');
      if (trigger) {
        li.classList.add('level1');
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          li.classList.toggle('active');
          subWrap.classList.toggle('active');
        });
      }
    } else {
      li.classList.add('no-arrw-mob');
    }
  });
}

export default function decorate(block) {
  const children = [...block.children];

  const [
    logoDesktopRow,
    logoDesktopLinkRow,
    logoMobileRow,
    secondaryLogoRow,
    secondaryLogoLinkRow,
    closeMenuIconRow,
    modeButtonLabelRow,
    modeLightLabelRow,
    modeDarkLabelRow,
    ...navigationMenuRows
  ] = children;

  const headerFullWrp = document.createElement('section');
  headerFullWrp.classList.add('header-full-wrp', 'fixed'); // nav-up is a scroll state class, not initial

  const topHead = document.createElement('div');
  topHead.classList.add('top-head');
  const topHeadContainer = document.createElement('div');
  topHeadContainer.classList.add('container-1600-wrp');
  topHead.append(topHeadContainer);
  headerFullWrp.append(topHead);

  const mainNavBx = document.createElement('div');
  mainNavBx.classList.add('main-nav-bx');
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('container-1600-wrp');
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');

  const colMd2 = document.createElement('div');
  colMd2.classList.add('col-md-2', 'col-6');

  const logoWrp = document.createElement('a');
  logoWrp.classList.add('logo-wrp');
  const logoDesktopLink = logoDesktopLinkRow.querySelector('a');
  if (logoDesktopLink) {
    logoWrp.href = logoDesktopLink.href;
  }
  const logoDesktopPicture = logoDesktopRow.querySelector('picture');
  if (logoDesktopPicture) {
    const optimizedLogoDesktop = createOptimizedPicture(
      logoDesktopPicture.querySelector('img').src,
      logoDesktopPicture.querySelector('img').alt,
      false,
      [{ width: '200' }],
    );
    moveInstrumentation(logoDesktopRow, optimizedLogoDesktop.querySelector('img'));
    logoWrp.append(optimizedLogoDesktop);
  }
  colMd2.append(logoWrp);

  const tataLogoMobPicture = logoMobileRow.querySelector('picture');
  if (tataLogoMobPicture) {
    const optimizedTataLogoMob = createOptimizedPicture(
      tataLogoMobPicture.querySelector('img').src,
      tataLogoMobPicture.querySelector('img').alt,
      false,
      [{ width: '100' }],
    );
    optimizedTataLogoMob.classList.add('image-holder', 'tata-logo-mob');
    moveInstrumentation(logoMobileRow, optimizedTataLogoMob.querySelector('img'));
    colMd2.append(optimizedTataLogoMob);
  }

  const navIcon4 = document.createElement('div');
  navIcon4.id = 'nav-icon4';
  navIcon4.innerHTML = '<span></span><span></span><span></span>';
  colMd2.append(navIcon4);

  const switchButton = document.createElement('button');
  switchButton.id = 'switch2';
  moveInstrumentation(modeButtonLabelRow, switchButton); // Move instrumentation for the button label
  switchButton.textContent = modeButtonLabelRow.textContent.trim();
  const strong = document.createElement('strong');
  const switchLight = document.createElement('span');
  switchLight.classList.add('switch2_light');
  moveInstrumentation(modeLightLabelRow, switchLight); // Move instrumentation for the light label
  switchLight.textContent = modeLightLabelRow.textContent.trim();
  const switchDark = document.createElement('span');
  switchDark.classList.add('switch2_dark');
  moveInstrumentation(modeDarkLabelRow, switchDark); // Move instrumentation for the dark label
  switchDark.textContent = modeDarkLabelRow.textContent.trim();
  strong.append(switchLight, switchDark);
  switchButton.append(strong);
  colMd2.append(switchButton);

  rowDiv.append(colMd2);

  const colMd10 = document.createElement('div');
  colMd10.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');

  const closeMobDrop = document.createElement('a');
  closeMobDrop.href = 'javascript:void(0)';
  closeMobDrop.classList.add('close-mob-drop');
  const closeMenuIconPicture = closeMenuIconRow.querySelector('picture');
  if (closeMenuIconPicture) {
    const optimizedCloseMenuIcon = createOptimizedPicture(
      closeMenuIconPicture.querySelector('img').src,
      closeMenuIconPicture.querySelector('img').alt,
      false,
      [{ width: '24' }],
    );
    optimizedCloseMenuIcon.querySelector('img').classList.add('img-fluid');
    moveInstrumentation(closeMenuIconRow, optimizedCloseMenuIcon.querySelector('img'));
    closeMobDrop.append(optimizedCloseMenuIcon);
  }
  navCard.append(closeMobDrop);

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');

  navigationMenuRows.forEach((row) => {
    const [labelCell, linkCell, hierarchyCell] = [...row.children];
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
    moveInstrumentation(row, rootEl); // Move instrumentation for the navigation item row
    li.appendChild(rootEl);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      const mobBackLi = document.createElement('li');
      mobBackLi.classList.add('mob-back');
      // Placeholder for the back arrow icon, as per Rule 16 and 4.
      // Assuming a simple text arrow or an inline SVG.
      mobBackLi.innerHTML = '&#8592;'; // Left arrow
      const wrapper = document.createElement('ul');
      wrapper.classList.add('level2');
      wrapper.appendChild(mobBackLi);

      // Move instrumentation for the hierarchyCell content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = hierarchyCell.innerHTML;
      moveInstrumentation(hierarchyCell, tempDiv);

      while (tempDiv.firstChild) {
        wrapper.append(tempDiv.firstChild);
      }
      rootEl.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active');
        wrapper.classList.toggle('active');
      });
      li.appendChild(wrapper);
      transformNestedLists(wrapper);
    } else {
      li.classList.add('no-arrw-mob');
    }
    level1Ul.appendChild(li);
  });

  navCard.append(level1Ul);

  const logoWrp2 = document.createElement('a');
  logoWrp2.href = secondaryLogoLinkRow.querySelector('a')?.href || '#';
  logoWrp2.classList.add('logo-wrp2');
  logoWrp2.target = '_blank';
  const secondaryLogoPictureContent = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPictureContent) {
    // Instead of hardcoding SVG, use the innerHTML of the picture element if it contains SVG
    // Or, if it's an <img>, create an optimized picture.
    // Assuming the model specifies 'reference' which typically means <picture><img>.
    // If the original HTML has inline SVG, we need to extract that.
    // For now, if it's a picture, we'll try to get the SVG content if available,
    // otherwise, create an optimized picture.
    const svgImg = secondaryLogoPictureContent.querySelector('img[src$=".svg"]');
    if (svgImg) {
      // If the image is an SVG, we might want to fetch its content or embed it.
      // For now, we'll just use the picture element itself.
      // A more robust solution might involve fetching the SVG content via XHR.
      const optimizedSecondaryLogo = createOptimizedPicture(
        svgImg.src,
        svgImg.alt,
        false,
        [{ width: '136' }],
      );
      logoWrp2.append(optimizedSecondaryLogo);
    } else {
      // Fallback for non-SVG pictures
      const optimizedSecondaryLogo = createOptimizedPicture(
        secondaryLogoPictureContent.querySelector('img').src,
        secondaryLogoPictureContent.querySelector('img').alt,
        false,
        [{ width: '136' }],
      );
      logoWrp2.append(optimizedSecondaryLogo);
    }
    moveInstrumentation(secondaryLogoRow, logoWrp2);
  }
  navCard.append(logoWrp2);

  colMd10.append(navCard);
  rowDiv.append(colMd10);
  mainNavContainer.append(rowDiv);
  mainNavBx.append(mainNavContainer);
  headerFullWrp.append(mainNavBx);

  block.replaceChildren(headerFullWrp);

  // Add event listeners for mobile menu toggle
  const navIcon = document.getElementById('nav-icon4');
  if (navIcon) {
    navIcon.addEventListener('click', () => {
      navIcon.classList.toggle('open');
      navCard.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });
  }

  if (closeMobDrop) {
    closeMobDrop.addEventListener('click', (e) => {
      e.preventDefault();
      navIcon.classList.remove('open');
      navCard.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  }

  // Back button functionality for mobile
  navCard.querySelectorAll('.mob-back').forEach((backBtn) => {
    backBtn.addEventListener('click', () => {
      const parentUl = backBtn.closest('ul.level2');
      if (parentUl) {
        const parentLi = parentUl.closest('li.level1');
        if (parentLi) {
          parentLi.classList.remove('active');
          parentUl.classList.remove('active');
        }
      }
    });
  });

  // Dark/Light mode switch functionality
  const modeSwitch = document.getElementById('switch2');
  if (modeSwitch) {
    modeSwitch.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  }

  // Scroll behavior for header (Rule 19)
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 0) {
      headerFullWrp.classList.add('nav-up');
    } else {
      headerFullWrp.classList.remove('nav-up');
    }
    lastScrollY = window.scrollY;
  });
}
