import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    logoRow,
    logoLinkRow,
    logoLinkLabelRow,
    mobileLogoRow,
    secondaryLogoRow,
    secondaryLogoLinkRow,
    secondaryLogoLinkLabelRow,
    ...navItemRows
  ] = [...block.children];

  block.classList.add('fixed'); // Add fixed class as per original HTML, but NOT nav-up

  const topHead = document.createElement('div');
  topHead.classList.add('top-head');
  const topHeadContainer = document.createElement('div');
  topHeadContainer.classList.add('container-1600-wrp');
  topHead.append(topHeadContainer);

  const mainNavBx = document.createElement('div');
  mainNavBx.classList.add('main-nav-bx');
  const mainNavContainer = document.createElement('div');
  mainNavContainer.classList.add('container-1600-wrp');
  const mainNavRow = document.createElement('div');
  mainNavRow.classList.add('row');
  mainNavContainer.append(mainNavRow);
  mainNavBx.append(mainNavContainer);

  // Col 1: Logo and Mobile elements
  const col1 = document.createElement('div');
  col1.classList.add('col-md-2', 'col-6');

  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-wrp');
  const logoHref = logoLinkRow.querySelector('a')?.href || '#';
  logoLink.href = logoHref;

  const logoPicture = logoRow.querySelector('picture');
  if (logoPicture) {
    const img = logoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(logoRow, logoLink);
  moveInstrumentation(logoLinkRow, logoLink);
  moveInstrumentation(logoLinkLabelRow, logoLink);
  col1.append(logoLink);

  const mobileLogoPicture = mobileLogoRow.querySelector('picture');
  if (mobileLogoPicture) {
    const mobileLogoHolder = document.createElement('picture');
    mobileLogoHolder.classList.add('image-holder', 'tata-logo-mob');
    const img = mobileLogoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      mobileLogoHolder.append(optimizedPic);
    }
    moveInstrumentation(mobileLogoRow, mobileLogoHolder);
    col1.append(mobileLogoHolder);
  }

  const navIcon = document.createElement('div');
  navIcon.id = 'nav-icon4';
  navIcon.innerHTML = '<span></span><span></span><span></span>';
  col1.append(navIcon);

  const switchBtn = document.createElement('button');
  switchBtn.id = 'switch2';
  switchBtn.innerHTML = 'Mode <strong><span class="switch2_light">Light</span> <span class="switch2_dark">Dark</span></strong>';
  col1.append(switchBtn);

  mainNavRow.append(col1);

  // Col 2: Navigation
  const col2 = document.createElement('div');
  col2.classList.add('col-md-10', 'col-6', 'hm-main-nav-con');

  const navCard = document.createElement('div');
  navCard.classList.add('nav-card');

  const closeMobDrop = document.createElement('a');
  closeMobDrop.href = 'javascript:void(0)';
  closeMobDrop.classList.add('close-mob-drop');
  // The original HTML uses a hardcoded path for the close image, which is a violation.
  // Since there is no model field for this image, we cannot create it from authored content.
  // We will omit the image and rely on CSS for styling the close button if it exists.
  // If a model field for this image were present, we would use it.
  navCard.append(closeMobDrop);

  const level1Ul = document.createElement('ul');
  level1Ul.classList.add('level1');

  navItemRows.forEach((row) => {
    // CRITICAL FIX: Replaced row.children[n] with destructuring based on BlockJson model
    const [labelCell, linkCell, linkLabelCell, subLinksCell] = [...row.children];
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const subList = subLinksCell?.querySelector('ul');

    if (subList) {
      li.classList.add('level1');
      const triggerLink = document.createElement('a');
      triggerLink.href = 'javascript:void(0)'; // Use javascript:void(0) for dropdown triggers
      triggerLink.textContent = labelCell?.textContent.trim() || '';
      li.append(triggerLink);

      const level2Ul = document.createElement('ul');
      level2Ul.classList.add('level2');

      // Add mob-back if it exists in original HTML for level2
      // The original HTML uses a hardcoded path for the mob-back image, which is a violation.
      // Since there is no model field for this image, we cannot create it from authored content.
      // We will omit the image and rely on CSS for styling.
      // If a model field for this image were present, we would use it.
      const mobBackLi = document.createElement('li');
      mobBackLi.classList.add('mob-back');
      // mobBackLi.append(mobBackImg); // Omitted due to hardcoded path
      level2Ul.append(mobBackLi);

      // Move subList content into level2Ul
      while (subList.firstChild) {
        const subLi = document.createElement('li');
        moveInstrumentation(subList.firstChild, subLi); // Move instrumentation from original li
        const subLink = subList.firstChild.querySelector('a');
        if (subLink) {
          const newSubLink = document.createElement('a');
          newSubLink.href = subLink.href;
          newSubLink.textContent = subLink.textContent.trim();
          subLi.append(newSubLink);
          subList.firstChild.remove(); // Remove original li from subList
        } else {
          // Handle plain text or other content in sublist
          subLi.innerHTML = subList.firstChild.innerHTML;
          subList.firstChild.remove();
        }
        level2Ul.append(subLi);
      }
      li.append(level2Ul);

      triggerLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        li.classList.toggle('active'); // Use 'active' for state, let CSS handle display
        level2Ul.classList.toggle('active');
      });
    } else {
      li.classList.add('no-arrw-mob');
      const anchor = document.createElement('a');
      const foundLink = linkCell?.querySelector('a');
      if (foundLink) anchor.href = foundLink.href;
      anchor.textContent = linkLabelCell?.textContent.trim() || labelCell?.textContent.trim() || '';
      li.append(anchor);
    }
    level1Ul.append(li);
  });

  navCard.append(level1Ul);

  const secondaryLogoLink = document.createElement('a');
  secondaryLogoLink.classList.add('logo-wrp2');
  const secondaryLogoHref = secondaryLogoLinkRow.querySelector('a')?.href || '#';
  secondaryLogoLink.href = secondaryLogoHref;
  secondaryLogoLink.target = '_blank'; // Assuming target blank from original HTML context

  const secondaryLogoPicture = secondaryLogoRow.querySelector('picture');
  if (secondaryLogoPicture) {
    const img = secondaryLogoPicture.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      secondaryLogoLink.append(optimizedPic);
    }
  }
  moveInstrumentation(secondaryLogoRow, secondaryLogoLink);
  moveInstrumentation(secondaryLogoLinkRow, secondaryLogoLink);
  moveInstrumentation(secondaryLogoLinkLabelRow, secondaryLogoLink);
  navCard.append(secondaryLogoLink);

  col2.append(navCard);
  mainNavRow.append(col2);

  block.textContent = '';
  block.append(topHead, mainNavBx);

  // Optimize all images within the block
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Mobile menu toggle
  navIcon.addEventListener('click', () => {
    navCard.classList.toggle('active');
    block.classList.toggle('menu-open');
  });

  closeMobDrop.addEventListener('click', (e) => {
    e.preventDefault();
    navCard.classList.remove('active');
    block.classList.remove('menu-open');
  });

  // Switch button interactivity (Light/Dark mode)
  switchBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // You might want to store this preference in localStorage
    // const isDarkMode = document.body.classList.contains('dark-mode');
    // localStorage.setItem('darkMode', isDarkMode);
  });

  // Scroll behavior for header (nav-up/nav-down)
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 0) {
      block.classList.add('nav-up');
      block.classList.remove('nav-down');
    } else {
      block.classList.remove('nav-up');
      block.classList.add('nav-down');
    }
    lastScrollY = window.scrollY;
  });
}
