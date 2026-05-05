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

  const header = document.createElement('div');
  header.classList.add('main-header');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('grid-x', 'padding-x', 'main-header--container', 'align-justify', 'align-middle');

  const navigationOverlay = document.createElement('div');
  navigationOverlay.classList.add('navigation-overlay');
  headerContainer.append(navigationOverlay);

  const mobileSearch = document.createElement('div');
  mobileSearch.classList.add('main-header--search-mobile', 'hide-for-large');
  const searchButtonMobile = document.createElement('button');
  searchButtonMobile.classList.add('button', 'brown', 'square-icon', 'corner-round', 'search-btn', 'sm-transparent', 'md-transparent');
  searchButtonMobile.setAttribute('aria-label', 'Search');
  searchButtonMobile.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6.5998" cy="6.63203" r="5.3" stroke="#ffffff" stroke-width="2"></circle><line x1="14.2855" y1="14.332" x2="10.7997" y2="10.8462" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line></svg>';
  mobileSearch.append(searchButtonMobile);
  headerContainer.append(mobileSearch);

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('main-header--left', 'logo');

  // Logo and Logo Link are the first two rows in the block
  const logoRow = children.find((row) => row.children.length === 1 && row.querySelector('picture'));
  const logoLinkRow = children.find((row) => row.children.length === 1 && row.querySelector('a') && !row.querySelector('picture'));

  if (logoRow && logoLinkRow) {
    const logoLink = document.createElement('a');
    logoLink.classList.add('logo-link');
    logoLink.href = logoLinkRow.querySelector('a').href;
    moveInstrumentation(logoLinkRow, logoLink);

    const logoPicture = logoRow.querySelector('picture');
    if (logoPicture) {
      const img = logoPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      optimizedPic.querySelector('img').classList.add('logo-img');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      logoLink.append(optimizedPic);
    }
    moveInstrumentation(logoRow, logoLink);
    logoWrapper.append(logoLink);
  }
  headerContainer.append(logoWrapper);

  const navWrapper = document.createElement('nav');
  navWrapper.classList.add('persistent-navigation--wrapper', 'js-persistent-nav');
  const navList = document.createElement('ul');
  navList.classList.add('persistent-navigation', 'grid-x');
  navWrapper.append(navList);

  // Filter rows by their structure based on BlockJson model
  const navigationGroupRows = children.filter((row) => row.children.length === 2 && row.querySelector('div:first-child')?.textContent.trim() && row.querySelector('div:last-child')?.querySelector('ul'));
  const navigationSubgroupRows = children.filter((row) => row.children.length === 1 && row.querySelector('div:first-child')?.textContent.trim() && !row.querySelector('ul'));
  const navigationLinkItemRows = children.filter((row) => row.children.length === 3 && row.querySelector('picture') && row.querySelector('a'));
  const navigationSubBannerRows = children.filter((row) => row.children.length === 2 && row.querySelector('picture') && row.querySelector('div:last-child')?.textContent.trim());
  const navigationSeeAllItemRows = children.filter((row) => row.children.length === 2 && row.querySelector('a') && row.querySelector('div:last-child')?.textContent.trim());
  const navigationBannerRows = children.filter((row) => row.children.length === 5 && row.querySelector('picture') && row.querySelector('p'));

  navigationGroupRows.forEach((row, i) => {
    const [groupTitleCell, hierarchyTreeCell] = [...row.children]; // Fixed: Destructuring for fixed schema
    const li = document.createElement('li');
    li.classList.add('persistent-navigation--list');

    const button = document.createElement('button');
    button.id = `nav-title-${i + 1}`;
    button.classList.add('persistent-navigation--link', 'persistent-nav--level1', 'level1', 'utilityTagLowCaps', 'bold-600');
    button.setAttribute('aria-label', groupTitleCell.textContent.trim());
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `level-${i + 1}`);
    button.setAttribute('data-nav-wrapper', `level-${i + 1}`);
    button.textContent = groupTitleCell.textContent.trim();
    moveInstrumentation(groupTitleCell, button);
    li.append(button);

    const menuWrapper = document.createElement('div');
    menuWrapper.classList.add('persistent-navigation--menu-wrapper');
    menuWrapper.id = `level-${i + 1}`;
    menuWrapper.setAttribute('aria-labelledby', `nav-title-${i + 1}`);

    const level2 = document.createElement('div');
    level2.classList.add('persistent-nav--level2', 'level2', 'grid-x');

    const level2Items = document.createElement('div');
    level2Items.classList.add('small-12', 'large-4', 'xlarge-3', 'persistent-nav--level2-items');

    const level2Close = document.createElement('div');
    level2Close.classList.add('persistent-nav--level2--close', 'hide-for-large');
    level2Close.innerHTML = `
      <button class="persistent-nav--control-prev persistent-nav--control js-persistent-nav-l1--close" aria-label="Back to previous navigation">
        <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 1L1 9L9 17" stroke="#302216" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
      <button class="persistent-nav--control-close persistent-nav--control js-persistent-nav-l1--close" aria-label="Close navigation">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L8.06066 7L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L7 8.06066L1.53033 13.5303C1.23744 13.8232 0.762563 13.8232 0.469669 13.5303C0.176777 13.2374 0.176777 12.7626 0.469669 12.4697L5.93934 7L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967Z" fill="#302216"></path>
        </svg>
      </button>
    `;
    level2Items.append(level2Close);

    const level2Title = document.createElement('p');
    level2Title.classList.add('persistent-nav--level2--title', 'headline-h2');
    level2Title.id = `persistent-nav--level2--title--${groupTitleCell.textContent.trim().replace(/\s/g, '-')}`;
    level2Title.textContent = groupTitleCell.textContent.trim();
    level2Items.append(level2Title);

    const level2List = document.createElement('ul');
    level2List.classList.add('persistent-nav--level2-list');
    level2List.setAttribute('aria-labelledby', level2Title.id);

    const hierarchyRoot = hierarchyTreeCell.querySelector('ul');
    if (hierarchyRoot) {
      moveInstrumentation(hierarchyTreeCell, hierarchyRoot); // Move instrumentation for the hierarchy tree
      hierarchyRoot.querySelectorAll('li').forEach((itemLi, itemIndex) => {
        const itemAnchor = itemLi.querySelector(':scope > a');
        const itemTextNode = [...itemLi.childNodes].find(
          (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
        );
        const nestedUl = itemLi.querySelector(':scope > ul');

        const itemWrapper = document.createElement('li');
        itemWrapper.classList.add('persistent-nav--level2-list-item', 'grid-x');
        moveInstrumentation(itemLi, itemWrapper); // Move instrumentation for each list item

        let linkOrButton;
        if (itemAnchor) {
          linkOrButton = document.createElement('a');
          linkOrButton.href = itemAnchor.href;
          linkOrButton.textContent = itemAnchor.textContent.trim();
          linkOrButton.classList.add('persistent-nav--level2-link', 'js-persistent-nav--level2-link', 'labelMediumRegular', 'text-left');
          if (!nestedUl) {
            linkOrButton.classList.add('no-submenu');
          } else {
            linkOrButton.setAttribute('aria-expanded', 'false');
            linkOrButton.setAttribute('aria-controls', `persistentNavLevel3List-level-${i + 1}-desktop-${itemIndex + 1}`);
            linkOrButton.setAttribute('aria-label', itemAnchor.textContent.trim());
          }
          moveInstrumentation(itemAnchor, linkOrButton); // Move instrumentation for the anchor
        } else if (itemTextNode) {
          linkOrButton = document.createElement('button');
          linkOrButton.textContent = itemTextNode.textContent.trim();
          linkOrButton.classList.add('persistent-nav--level2-link', 'js-persistent-nav--level2-link', 'labelMediumRegular', 'text-left');
          if (nestedUl) {
            linkOrButton.setAttribute('aria-expanded', 'false');
            linkOrButton.setAttribute('aria-controls', `persistentNavLevel3List-level-${i + 1}-desktop-${itemIndex + 1}`);
            linkOrButton.setAttribute('aria-label', itemTextNode.textContent.trim());
          } else {
            linkOrButton.classList.add('no-submenu');
          }
          // No direct instrumentation for text node, but its parent li is covered
        }

        if (linkOrButton) {
          itemWrapper.append(linkOrButton);
        }

        if (nestedUl) {
          const level3Wrapper = document.createElement('div');
          level3Wrapper.classList.add('small-12', 'large-8', 'xlarge-9', 'persistent-nav--level3-wrapper');
          level3Wrapper.id = `level-${i + 1}-${itemIndex + 1}`;

          const level3 = document.createElement('div');
          level3.classList.add('persistent-nav--level3', 'grid-x');
          level3.setAttribute('role', 'list');

          const level3Close = document.createElement('div');
          level3Close.classList.add('persistent-nav--level2--close', 'level3', 'hide-for-large');
          level3Close.setAttribute('role', 'listitem');
          level3Close.innerHTML = `
            <button class="persistent-nav--control-prev persistent-nav--control js-persistent-nav-l2--close" aria-label="Back to previous navigation">
              <svg role="presentation" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1L1 9L9 17" stroke="#302216" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <span class="persistent-nav--control-title utilityTagHighCaps js-persistent-nav-l2--close">${groupTitleCell.textContent.trim()}</span>
            <button class="persistent-nav--control-close persistent-nav--control js-persistent-nav-l1--close" aria-label="Close navigation">
              <svg role="presentation" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L8.06066 7L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L7 8.06066L1.53033 13.5303C1.23744 13.8232 0.762563 13.8232 0.469669 13.5303C0.176777 13.2374 0.176777 12.7626 0.469669 12.4697L5.93934 7L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967Z" fill="#302216"></path>
              </svg>
            </button>
          `;
          level3.append(level3Close);

          const level3Title = document.createElement('p');
          level3Title.classList.add('persistent-nav--level3--title', 'text-center', 'hide-for-large', 'headline-h2');
          level3Title.setAttribute('role', 'listitem');
          level3Title.textContent = linkOrButton.textContent;
          level3.append(level3Title);

          const level3List = document.createElement('div');
          level3List.classList.add('cell', 'small-12', 'large-12', 'xlarge-8', 'persistent-nav--level3-list');
          level3List.id = `persistentNavLevel3List-level-${i + 1}-desktop-${itemIndex + 1}`;

          nestedUl.querySelectorAll('li').forEach((subLi) => {
            const subLinkItem = document.createElement('div');
            subLinkItem.classList.add('persistent-nav--level3-list-item');
            subLinkItem.setAttribute('role', 'listitem');
            moveInstrumentation(subLi, subLinkItem); // Move instrumentation for sub-list item

            const subLinkAnchor = subLi.querySelector('a');
            const subLinkText = subLi.textContent.trim();

            if (subLinkAnchor) {
              const link = document.createElement('a');
              link.classList.add('persistent-nav--level3-link', 'grid-x', 'align-left', 'align-middle');
              link.href = subLinkAnchor.href;
              link.setAttribute('aria-label', subLinkAnchor.textContent.trim());
              link.setAttribute('title', subLinkAnchor.textContent.trim());
              moveInstrumentation(subLinkAnchor, link); // Move instrumentation for sub-link anchor

              // Find the corresponding navigationLinkItemRow by matching href
              const iconRow = navigationLinkItemRows.find((linkRow) => {
                const linkCell = linkRow.children[2]; // Fixed: Use index for fixed schema
                return linkCell?.querySelector('a')?.href === subLinkAnchor.href;
              });

              if (iconRow) {
                const [iconCell] = [...iconRow.children]; // Fixed: Destructuring for fixed schema
                const iconSpan = document.createElement('span');
                iconSpan.classList.add('persistent-nav--level3-icon');
                const iconImg = iconCell.querySelector('img');
                const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '80' }]);
                optimizedIconPic.querySelector('img').classList.add('persistent-nav--level3-icon-img', 'lazyload');
                iconSpan.append(optimizedIconPic);
                link.append(iconSpan);
                moveInstrumentation(iconCell, iconSpan); // Move instrumentation for icon cell
              } else {
                link.classList.add('no-icon');
              }

              const titleSpan = document.createElement('span');
              titleSpan.classList.add('persistent-nav--level3-title');
              titleSpan.textContent = subLinkAnchor.textContent.trim();
              link.append(titleSpan);
              subLinkItem.append(link);
            } else if (subLinkText) {
              const span = document.createElement('span');
              span.classList.add('persistent-nav--level3-title', 'no-icon');
              span.textContent = subLinkText;
              subLinkItem.append(span);
            }
            level3List.append(subLinkItem);
          });

          const seeAllItem = navigationSeeAllItemRows.find((seeAllRow) => {
            const [seeAllLinkCell, seeAllLabelCell] = [...seeAllRow.children]; // Fixed: Destructuring for fixed schema
            return seeAllLinkCell && seeAllLabelCell && seeAllLabelCell.textContent.trim() === 'See all ranges'; // Example check
          });

          if (seeAllItem) {
            const [seeAllLinkCell, seeAllLabelCell] = [...seeAllItem.children]; // Fixed: Destructuring for fixed schema
            const seeAllSpan = document.createElement('span');
            seeAllSpan.classList.add('persistent-nav--level3-see-all');
            seeAllSpan.setAttribute('role', 'listitem');
            moveInstrumentation(seeAllItem, seeAllSpan); // Move instrumentation for see all item

            const seeAllLinkEl = document.createElement('a');
            seeAllLinkEl.classList.add('link', 'black', 'labelSmallBold', 'persistent-nav--level3-see-all-link');
            seeAllLinkEl.href = seeAllLinkCell.querySelector('a').href;
            seeAllLinkEl.setAttribute('aria-label', seeAllLabelCell.textContent.trim());
            seeAllLinkEl.setAttribute('rel', 'follow');
            moveInstrumentation(seeAllLinkCell, seeAllLinkEl); // Move instrumentation for see all link cell

            const buttonTextSpan = document.createElement('span');
            buttonTextSpan.classList.add('button-text');
            buttonTextSpan.textContent = seeAllLabelCell.textContent.trim();
            seeAllLinkEl.append(buttonTextSpan);
            seeAllSpan.append(seeAllLinkEl);
            level3List.append(seeAllSpan);
            moveInstrumentation(seeAllLabelCell, buttonTextSpan); // Move instrumentation for see all label cell
          }

          level3.append(level3List);
          level3Wrapper.append(level3);
          itemWrapper.append(level3Wrapper);

          if (linkOrButton) {
            linkOrButton.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              level3Wrapper.classList.toggle('active');
              itemWrapper.classList.toggle('active');
              linkOrButton.classList.toggle('active');
            });
          }
        }
        level2List.append(itemWrapper);
      });
    }

    level2Items.append(level2List);
    level2.append(level2Items);

    const bannerRow = navigationBannerRows.find((bRow) => {
      const bannerHeadlineCell = bRow.children[3]; // Fixed: Use index for fixed schema
      return bannerHeadlineCell && bannerHeadlineCell.textContent.trim().includes('Welcome to the world of NESCAFÉ'); // Example: Match banner by headline text
    });

    if (bannerRow) {
      const [
        bannerImageDesktopCell,
        bannerImageTabletCell,
        bannerImageMobileCell,
        bannerHeadlineCell,
        bannerDescriptionCell,
      ] = [...bannerRow.children]; // Fixed: Destructuring for fixed schema

      const level2Banner = document.createElement('div');
      level2Banner.classList.add('small-12', 'large-8', 'xlarge-offset-1', 'xlarge-8', 'persistent-nav--level2-banner', 'show-for-large');
      moveInstrumentation(bannerRow, level2Banner); // Move instrumentation for the banner row

      const bannerPicture = document.createElement('picture');
      bannerPicture.classList.add('persistent-nav--level2-banner-picture');

      if (bannerImageDesktopCell) {
        const img = bannerImageDesktopCell.querySelector('img');
        const sourceDesktop = document.createElement('source');
        sourceDesktop.media = '(min-width: 1440px)';
        sourceDesktop.srcset = img.src;
        sourceDesktop.height = '640';
        bannerPicture.append(sourceDesktop);
        moveInstrumentation(bannerImageDesktopCell, sourceDesktop); // Move instrumentation for desktop image cell
      }
      if (bannerImageTabletCell) {
        const img = bannerImageTabletCell.querySelector('img');
        const sourceTablet = document.createElement('source');
        sourceTablet.media = '(min-width: 1024px)';
        sourceTablet.srcset = img.src;
        sourceTablet.height = '300';
        bannerPicture.append(sourceTablet);
        moveInstrumentation(bannerImageTabletCell, sourceTablet); // Move instrumentation for tablet image cell
      }
      if (bannerImageMobileCell) {
        const img = bannerImageMobileCell.querySelector('img');
        const sourceMobile = document.createElement('source');
        sourceMobile.media = '(min-width: 0px)';
        sourceMobile.srcset = img.src;
        sourceMobile.height = '640';
        bannerPicture.append(sourceMobile);
        moveInstrumentation(bannerImageMobileCell, sourceMobile); // Move instrumentation for mobile image cell
      }

      const img = bannerImageDesktopCell.querySelector('img'); // Assuming desktop image is primary for img tag
      const bannerImg = document.createElement('img');
      bannerImg.classList.add('persistent-nav--level2-banner-img', 'lazyload');
      bannerImg.src = img.src;
      bannerImg.alt = img.alt;
      bannerImg.height = '640';
      bannerPicture.append(bannerImg);
      level2Banner.append(bannerPicture);

      const bannerInfo = document.createElement('div');
      bannerInfo.classList.add('persistent-nav--level2-banner--info');

      if (bannerHeadlineCell) {
        const headline = document.createElement('p');
        headline.classList.add('headline-h4');
        headline.textContent = bannerHeadlineCell.textContent.trim();
        bannerInfo.append(headline);
        moveInstrumentation(bannerHeadlineCell, headline); // Move instrumentation for headline cell
      }

      if (bannerDescriptionCell) {
        const description = document.createElement('div');
        description.classList.add('bodyMediumRegular', 'persistent-nav--level2-banner-desc');
        description.innerHTML = bannerDescriptionCell.innerHTML;
        bannerInfo.append(description);
        moveInstrumentation(bannerDescriptionCell, description); // Move instrumentation for description cell
      }
      level2Banner.append(bannerInfo);
      level2.append(level2Banner);
    }

    menuWrapper.append(level2);
    li.append(menuWrapper);
    navList.append(li);
    moveInstrumentation(row, li); // Move instrumentation for the group row
  });

  headerContainer.append(navWrapper);

  const headerRight = document.createElement('div');
  headerRight.classList.add('main-header--right', 'grid-x', 'align-middle');

  const searchButtonDesktop = document.createElement('button');
  searchButtonDesktop.classList.add('button', 'brown', 'square-icon', 'corner-round', 'search-btn', 'show-for-large');
  searchButtonDesktop.setAttribute('aria-label', 'Search');
  searchButtonDesktop.innerHTML = '<svg aria-hidden="true" role="presentation" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6.5998" cy="6.63203" r="5.3" stroke="#ffffff" stroke-width="2"></circle><line x1="14.2855" y1="14.332" x2="10.7997" y2="10.8462" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line></svg>';
  headerRight.append(searchButtonDesktop);

  const burgerButton = document.createElement('button');
  burgerButton.classList.add('button', 'brown', 'square-icon', 'corner-round', 'burger-btn', 'sm-transparent', 'md-transparent', 'js-burger-menu');
  burgerButton.id = 'burger-nav';
  burgerButton.setAttribute('aria-label', 'Open Navigation');
  burgerButton.setAttribute('aria-expanded', 'false');
  burgerButton.setAttribute('aria-controls', 'burger-nav-wrapper');
  burgerButton.setAttribute('data-nav-wrapper', 'burger-nav-wrapper');
  burgerButton.innerHTML = '<svg aria-hidden="true" role="presentation" width="20" height="15" viewBox="0 0 20 15" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><rect y="0.332031" width="20" height="2" rx="1"></rect><rect y="6.33203" width="20" height="2" rx="1"></rect><rect y="12.332" width="20" height="2" rx="1"></rect></svg>';
  headerRight.append(burgerButton);

  headerContainer.append(headerRight);
  header.append(headerContainer);

  const section = document.createElement('section');
  section.classList.add('main-navigation', 'grid-container', 'js-navigation');
  section.setAttribute('aria-label', 'Main Navigation Section');
  section.append(header);

  block.replaceChildren(section);
}
