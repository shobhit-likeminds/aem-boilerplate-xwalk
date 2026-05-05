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

export default async function decorate(block) {
  const children = [...block.children];

  const [logoRow, logoLinkRow, ...itemRows] = children;

  const mainNavigation = document.createElement('section');
  mainNavigation.classList.add('main-navigation', 'grid-container', 'js-navigation');
  mainNavigation.setAttribute('aria-label', 'Main Navigation Section');

  const mainHeader = document.createElement('div');
  mainHeader.classList.add('main-header');
  mainNavigation.append(mainHeader);

  const mainHeaderContainer = document.createElement('div');
  mainHeaderContainer.classList.add('grid-x', 'padding-x', 'main-header--container', 'align-justify', 'align-middle');
  mainHeader.append(mainHeaderContainer);

  const navigationOverlay = document.createElement('div');
  navigationOverlay.classList.add('navigation-overlay');
  mainHeaderContainer.append(navigationOverlay);

  const mobileSearch = document.createElement('div');
  mobileSearch.classList.add('main-header--search-mobile', 'hide-for-large');
  const searchButtonMobile = document.createElement('button');
  searchButtonMobile.classList.add('button', 'brown', 'square-icon', 'corner-round', 'search-btn', 'sm-transparent', 'md-transparent');
  searchButtonMobile.setAttribute('aria-label', 'Search');
  searchButtonMobile.innerHTML = `
    <svg aria-hidden="true" role="presentation" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6.5998" cy="6.63203" r="5.3" stroke="#ffffff" stroke-width="2"></circle>
      <line x1="14.2855" y1="14.332" x2="10.7997" y2="10.8462" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
    </svg>
  `;
  mobileSearch.append(searchButtonMobile);
  mainHeaderContainer.append(mobileSearch);

  const mainHeaderLeft = document.createElement('div');
  mainHeaderLeft.classList.add('main-header--left', 'logo');
  const logoLink = document.createElement('a');
  logoLink.classList.add('logo-link');
  const logoHref = logoLinkRow?.querySelector('a')?.href || '#';
  logoLink.href = logoHref;
  logoLink.setAttribute('title', 'Nescafe Logo');
  const logoPicture = logoRow?.querySelector('picture');
  if (logoPicture) {
    const optimizedLogo = createOptimizedPicture(logoPicture.querySelector('img').src, logoPicture.querySelector('img').alt, false, [{ width: 'auto' }]);
    moveInstrumentation(logoRow, logoLink); // Move instrumentation from logoRow to logoLink
    logoLink.append(optimizedLogo);
    optimizedLogo.querySelector('img').classList.add('logo-img');
  }
  mainHeaderLeft.append(logoLink);
  mainHeaderContainer.append(mainHeaderLeft);

  const navWrapper = document.createElement('nav');
  navWrapper.classList.add('persistent-navigation--wrapper', 'js-persistent-nav');
  navWrapper.style.marginLeft = '27px';
  navWrapper.style.opacity = '1';
  mainHeaderContainer.append(navWrapper);

  const navList = document.createElement('ul');
  navList.classList.add('persistent-navigation', 'grid-x');
  navWrapper.append(navList);

  // Item type detection based on cell count and content
  const navigationItems = itemRows.filter((row) => row.children.length === 3 && row.children[2].querySelector('ul'));
  const level3Items = itemRows.filter((row) => row.children.length === 3 && row.children[0].querySelector('picture'));
  const level3Banners = itemRows.filter((row) => row.children.length === 2 && row.children[0].querySelector('picture'));
  const level3SeeAllItems = itemRows.filter((row) => row.children.length === 2 && !row.children[0].querySelector('picture'));
  const level2Banners = itemRows.filter((row) => row.children.length === 5);

  navigationItems.forEach((row, i) => {
    const [labelCell, isActiveCell, hierarchyCell] = [...row.children];
    const li = document.createElement('li');
    li.classList.add('persistent-navigation--list');
    if (isActiveCell.textContent.trim() === 'true') {
      li.classList.add('active');
    }

    const button = document.createElement('button');
    button.id = `nav-title-${i + 1}`;
    button.classList.add('persistent-navigation--link', 'persistent-nav--level1', 'level1', 'utilityTagLowCaps', 'bold-600');
    button.setAttribute('aria-label', labelCell.textContent.trim());
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `level-${i + 1}`);
    button.setAttribute('data-nav-wrapper', `level-${i + 1}`);
    button.textContent = labelCell.textContent.trim();
    moveInstrumentation(labelCell, button);
    li.append(button);

    const menuWrapper = document.createElement('div');
    menuWrapper.classList.add('persistent-navigation--menu-wrapper');
    menuWrapper.id = `level-${i + 1}`;
    menuWrapper.setAttribute('aria-labelledby', `nav-title-${i + 1}`);
    li.append(menuWrapper);

    const level2Div = document.createElement('div');
    level2Div.classList.add('persistent-nav--level2', 'level2', 'grid-x');
    menuWrapper.append(level2Div);

    const level2ItemsContainer = document.createElement('div');
    level2ItemsContainer.classList.add('small-12', 'large-4', 'xlarge-3', 'persistent-nav--level2-items');
    level2Div.append(level2ItemsContainer);

    const level2CloseMobile = document.createElement('div');
    level2CloseMobile.classList.add('persistent-nav--level2--close', 'hide-for-large');
    level2CloseMobile.innerHTML = `
      <button class="persistent-nav--control-prev persistent-nav--control js-persistent-nav-l1--close" aria-label="Back to previous navigation">
        <svg aria-hidden="true" role="presentation" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 1L1 9L9 17" stroke="#302216" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
      <button class="persistent-nav--control-close persistent-nav--control js-persistent-nav-l1--close" aria-label="Close navigation">
        <svg aria-hidden="true" role="presentation" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L8.06066 7L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L7 8.06066L1.53033 13.5303C1.23744 13.8232 0.762563 13.8232 0.469669 13.5303C0.176777 13.2374 0.176777 12.7626 0.469669 12.4697L5.93934 7L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967Z" fill="#302216"></path>
        </svg>
      </button>
    `;
    level2ItemsContainer.append(level2CloseMobile);

    const level2Title = document.createElement('p');
    level2Title.classList.add('persistent-nav--level2--title', 'headline-h2');
    level2Title.id = `persistent-nav--level2--title--${labelCell.textContent.trim().replace(/\s/g, '-')}`;
    level2Title.textContent = labelCell.textContent.trim();
    level2ItemsContainer.append(level2Title);

    const level2List = document.createElement('ul');
    level2List.classList.add('persistent-nav--level2-list');
    level2List.setAttribute('aria-labelledby', level2Title.id);
    level2ItemsContainer.append(level2List);

    const hierarchyRoot = hierarchyCell?.querySelector('ul');
    if (hierarchyRoot) {
      [...hierarchyRoot.children].forEach((hierarchyLi, j) => {
        const level2ListItem = document.createElement('li');
        level2ListItem.classList.add('persistent-nav--level2-list-item', 'grid-x');
        level2List.append(level2ListItem);

        const hierarchyAnchor = hierarchyLi.querySelector(':scope > a');
        const hierarchySpan = hierarchyLi.querySelector(':scope > span');
        const hasNestedUl = hierarchyLi.querySelector(':scope > ul');

        if (hasNestedUl) {
          const level2LinkButton = document.createElement('button');
          level2LinkButton.classList.add('persistent-nav--level2-link', 'labelMediumRegular', 'text-left', 'js-persistent-nav--level2-link');
          level2LinkButton.setAttribute('aria-expanded', 'false');
          level2LinkButton.setAttribute('aria-controls', `persistentNavLevel3List-level-${i + 1}-desktop-${j + 1}`);
          level2LinkButton.setAttribute('aria-label', hierarchyAnchor?.textContent.trim() || hierarchySpan?.textContent.trim() || '');
          level2LinkButton.textContent = hierarchyAnchor?.textContent.trim() || hierarchySpan?.textContent.trim() || '';
          moveInstrumentation(hierarchyLi, level2LinkButton); // Move instrumentation from hierarchyLi to level2LinkButton
          level2ListItem.append(level2LinkButton);

          const level3Wrapper = document.createElement('div');
          level3Wrapper.classList.add('small-12', 'large-8', 'xlarge-9', 'persistent-nav--level3-wrapper');
          level3Wrapper.id = `level-${i + 1}-${j + 1}`;
          level2ListItem.append(level3Wrapper);

          const level3Div = document.createElement('div');
          level3Div.classList.add('persistent-nav--level3', 'grid-x');
          level3Div.setAttribute('role', 'list');
          level3Div.setAttribute('data-full-banner', '');
          level3Wrapper.append(level3Div);

          const level3CloseMobile = document.createElement('div');
          level3CloseMobile.classList.add('persistent-nav--level2--close', 'level3', 'hide-for-large');
          level3CloseMobile.setAttribute('role', 'listitem');
          level3CloseMobile.innerHTML = `
            <button class="persistent-nav--control-prev persistent-nav--control js-persistent-nav-l2--close" aria-label="Back to previous navigation">
              <svg role="presentation" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1L1 9L9 17" stroke="#302216" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <span class="persistent-nav--control-title utilityTagHighCaps js-persistent-nav-l2--close">${labelCell.textContent.trim()}</span>
            <button class="persistent-nav--control-close persistent-nav--control js-persistent-nav-l1--close" aria-label="Close navigation">
              <svg role="presentation" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L8.06066 7L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L7 8.06066L1.53033 13.5303C1.23744 13.8232 0.762563 13.8232 0.469669 13.5303C0.176777 13.2374 0.176777 12.7626 0.469669 12.4697L5.93934 7L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967Z" fill="#302216"></path>
              </svg>
            </button>
          `;
          level3Div.append(level3CloseMobile);

          const level3TitleMobile = document.createElement('p');
          level3TitleMobile.classList.add('persistent-nav--level3--title', 'text-center', 'hide-for-large', 'headline-h2');
          level3TitleMobile.setAttribute('role', 'listitem');
          level3TitleMobile.textContent = hierarchyAnchor?.textContent.trim() || hierarchySpan?.textContent.trim() || '';
          level3Div.append(level3TitleMobile);

          const level3ListContainer = document.createElement('div');
          level3ListContainer.classList.add('cell', 'small-12', 'large-12', 'xlarge-8', 'persistent-nav--level3-list');
          level3ListContainer.id = `persistentNavLevel3List-level-${i + 1}-desktop-${j + 1}`;
          level3Div.append(level3ListContainer);

          const nestedUl = hierarchyLi.querySelector(':scope > ul');
          if (nestedUl) {
            [...nestedUl.children].forEach((nestedLi) => {
              const level3ListItem = document.createElement('div');
              level3ListItem.classList.add('persistent-nav--level3-list-item');
              level3ListItem.setAttribute('role', 'listitem');
              level3ListContainer.append(level3ListItem);

              const nestedAnchor = nestedLi.querySelector(':scope > a');
              const nestedSpan = nestedLi.querySelector(':scope > span');
              const nestedTextContent = nestedAnchor?.textContent.trim() || nestedSpan?.textContent.trim() || '';

              const level3Link = document.createElement('a');
              level3Link.classList.add('persistent-nav--level3-link', 'grid-x', 'align-left', 'align-middle');
              level3Link.href = nestedAnchor?.href || '#';
              level3Link.setAttribute('aria-label', nestedTextContent);
              level3Link.setAttribute('title', nestedTextContent);

              const matchingLevel3Item = level3Items.find(
                (item) => item.children[1].textContent.trim() === nestedTextContent,
              );

              if (matchingLevel3Item) {
                const [iconCell, , linkCell] = [...matchingLevel3Item.children];
                const iconPicture = iconCell?.querySelector('picture');
                if (iconPicture) {
                  const iconSpan = document.createElement('span');
                  iconSpan.classList.add('persistent-nav--level3-icon');
                  const optimizedIcon = createOptimizedPicture(iconPicture.querySelector('img').src, iconPicture.querySelector('img').alt, false, [{ width: 'auto' }]);
                  iconSpan.append(optimizedIcon);
                  optimizedIcon.querySelector('img').classList.add('persistent-nav--level3-icon-img', 'lazyload');
                  level3Link.append(iconSpan);
                }
                level3Link.href = linkCell?.querySelector('a')?.href || '#';
                moveInstrumentation(matchingLevel3Item, level3Link);
              } else {
                level3Link.classList.add('no-icon');
              }

              const titleSpan = document.createElement('span');
              titleSpan.classList.add('persistent-nav--level3-title');
              if (!matchingLevel3Item || !matchingLevel3Item.children[0].querySelector('picture')) {
                titleSpan.classList.add('no-icon');
              }
              titleSpan.textContent = nestedTextContent;
              level3Link.append(titleSpan);
              level3ListItem.append(level3Link);

              const matchingBanner = level3Banners.find(
                (bannerRow) => {
                  const [, bannerDescriptionCell] = [...bannerRow.children];
                  return bannerDescriptionCell.textContent.trim().includes(nestedTextContent);
                },
              );

              if (matchingBanner) {
                const [bannerImageCell, bannerDescriptionCell] = [...matchingBanner.children];
                const bannerImage = bannerImageCell?.querySelector('picture');
                if (bannerImage) {
                  const bannerDiv = document.createElement('div');
                  bannerDiv.classList.add('cell', 'small-12', 'xlarge-4', 'show-for-xlarge', 'persistent-nav--level3', 'sub-banner');
                  const bannerPicture = document.createElement('picture');
                  bannerPicture.classList.add('persistent-nav--level3-banner-picture');
                  const optimizedBanner = createOptimizedPicture(bannerImage.querySelector('img').src, bannerImage.querySelector('img').alt, false, [{ width: 'auto' }]);
                  bannerPicture.append(optimizedBanner);
                  optimizedBanner.querySelector('img').classList.add('persistent-nav--level3-banner-img', 'lazyload');
                  bannerDiv.append(bannerPicture);

                  const bannerDescDiv = document.createElement('div');
                  bannerDescDiv.classList.add('persistent-nav--level3-banner-desc', 'grid-x', 'align-middle');
                  bannerDescDiv.innerHTML = bannerDescriptionCell?.innerHTML || '';
                  bannerDiv.append(bannerDescDiv);
                  level3ListItem.append(bannerDiv);
                  moveInstrumentation(matchingBanner, bannerDiv); // Move instrumentation from banner row
                }
              }
            });

            const matchingSeeAllItem = level3SeeAllItems.find(
              (seeAllRow) => {
                const [seeAllLabelCell] = [...seeAllRow.children];
                return seeAllLabelCell.textContent.trim().includes(hierarchyAnchor?.textContent.trim() || hierarchySpan?.textContent.trim());
              },
            );

            if (matchingSeeAllItem) {
              const [seeAllLabelCell, seeAllLinkCell] = [...matchingSeeAllItem.children];
              const seeAllSpan = document.createElement('span');
              seeAllSpan.classList.add('persistent-nav--level3-see-all');
              seeAllSpan.setAttribute('role', 'listitem');
              const seeAllLink = document.createElement('a');
              seeAllLink.href = seeAllLinkCell?.querySelector('a')?.href || '#';
              seeAllLink.classList.add('link', 'black', 'labelSmallBold', 'persistent-nav--level3-see-all-link');
              seeAllLink.setAttribute('aria-label', seeAllLabelCell.textContent.trim());
              seeAllLink.setAttribute('rel', 'follow');
              const buttonTextSpan = document.createElement('span');
              buttonTextSpan.classList.add('button-text');
              buttonTextSpan.textContent = seeAllLabelCell.textContent.trim();
              seeAllLink.append(buttonTextSpan);
              seeAllSpan.append(seeAllLink);
              level3ListContainer.append(seeAllSpan);
              moveInstrumentation(matchingSeeAllItem, seeAllSpan); // Move instrumentation from seeAllItem row
            }
          }
        } else {
          const level2Link = document.createElement('a');
          level2Link.classList.add('persistent-nav--level2-link', 'js-persistent-nav--level2-link', 'labelMediumRegular', 'text-left', 'no-submenu');
          level2Link.href = hierarchyAnchor?.href || '#';
          level2Link.setAttribute('aria-label', hierarchyAnchor?.textContent.trim() || hierarchySpan?.textContent.trim() || '');
          level2Link.textContent = hierarchyAnchor?.textContent.trim() || hierarchySpan?.textContent.trim() || '';
          moveInstrumentation(hierarchyLi, level2Link); // Move instrumentation from hierarchyLi to level2Link
          level2ListItem.append(level2Link);

          const level3Wrapper = document.createElement('div');
          level3Wrapper.classList.add('small-12', 'large-8', 'xlarge-9', 'persistent-nav--level3-wrapper');
          level3Wrapper.id = `level-${i + 1}-${j + 1}`;
          level2ListItem.append(level3Wrapper);

          const level3Div = document.createElement('div');
          level3Div.classList.add('persistent-nav--level3', 'grid-x');
          level3Div.setAttribute('role', 'list');
          level3Div.setAttribute('data-full-banner', '');
          level3Wrapper.append(level3Div);

          const level3CloseMobile = document.createElement('div');
          level3CloseMobile.classList.add('persistent-nav--level2--close', 'level3', 'hide-for-large');
          level3CloseMobile.setAttribute('role', 'listitem');
          level3CloseMobile.innerHTML = `
            <button class="persistent-nav--control-prev persistent-nav--control js-persistent-nav-l2--close" aria-label="Back to previous navigation">
              <svg role="presentation" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1L1 9L9 17" stroke="#302216" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <span class="persistent-nav--control-title utilityTagHighCaps js-persistent-nav-l2--close">${labelCell.textContent.trim()}</span>
            <button class="persistent-nav--control-close persistent-nav--control js-persistent-nav-l1--close" aria-label="Close navigation">
              <svg role="presentation" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 0.46967C12.7626 0.176777 13.2374 0.176777 13.5303 0.46967C13.8232 0.762563 13.8232 1.23744 13.5303 1.53033L8.06066 7L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L7 8.06066L1.53033 13.5303C1.23744 13.8232 0.762563 13.8232 0.469669 13.5303C0.176777 13.2374 0.176777 12.7626 0.469669 12.4697L5.93934 7L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L7 5.93934L12.4697 0.46967Z" fill="#302216"></path>
              </svg>
            </button>
          `;
          level3Div.append(level3CloseMobile);

          const level3TitleMobileNoSub = document.createElement('p');
          level3TitleMobileNoSub.classList.add('persistent-nav--level3--title', 'text-center', 'hide-for-large', 'headline-h2');
          level3TitleMobileNoSub.setAttribute('role', 'listitem');
          level3TitleMobileNoSub.textContent = hierarchyAnchor?.textContent.trim() || hierarchySpan?.textContent.trim() || '';
          level3Div.append(level3TitleMobileNoSub);

          const level3ListContainerNoSub = document.createElement('div');
          level3ListContainerNoSub.classList.add('cell', 'small-12', 'large-12', 'xlarge-8', 'persistent-nav--level3-list');
          level3ListContainerNoSub.id = `persistentNavLevel3List-level-${i + 1}-desktop-${j + 1}`;
          level3Div.append(level3ListContainerNoSub);
        }
      });
    }

    const matchingLevel2Banner = level2Banners.find(
      (bannerRow) => {
        const [, , , , headlineCell] = [...bannerRow.children];
        return headlineCell.textContent.trim().includes(labelCell.textContent.trim());
      },
    );

    if (matchingLevel2Banner) {
      const [desktopCell, tabletCell, mobileCell, descriptionCell, headlineCell] = [...matchingLevel2Banner.children];
      const bannerDiv = document.createElement('div');
      bannerDiv.classList.add('small-12', 'large-8', 'xlarge-offset-1', 'xlarge-8', 'persistent-nav--level2-banner', 'show-for-large');
      const picture = document.createElement('picture');
      picture.classList.add('persistent-nav--level2-banner-picture');

      const desktopImg = desktopCell?.querySelector('picture > img');
      const tabletImg = tabletCell?.querySelector('picture > img');
      const mobileImg = mobileCell?.querySelector('picture > img');

      if (desktopImg) {
        const sourceDesktop = document.createElement('source');
        sourceDesktop.media = '(min-width: 1440px)';
        sourceDesktop.srcset = desktopImg.src;
        sourceDesktop.setAttribute('height', '640');
        picture.append(sourceDesktop);
      }
      if (tabletImg) {
        const sourceTablet = document.createElement('source');
        sourceTablet.media = '(min-width: 1024px)';
        sourceTablet.srcset = tabletImg.src;
        sourceTablet.setAttribute('height', '300');
        picture.append(sourceTablet);
      }
      if (mobileImg) {
        const sourceMobile = document.createElement('source');
        sourceMobile.media = '(min-width: 768px)';
        sourceMobile.srcset = mobileImg.src;
        sourceMobile.setAttribute('height', '640');
        picture.append(sourceMobile);
      }
      if (desktopImg) {
        const img = document.createElement('img');
        img.classList.add('persistent-nav--level2-banner-img', 'lazyload');
        img.src = desktopImg.src;
        img.alt = desktopImg.alt;
        img.setAttribute('height', '640');
        picture.append(img);
      }
      bannerDiv.append(picture);

      const infoDiv = document.createElement('div');
      infoDiv.classList.add('persistent-nav--level2-banner--info');
      const headline = document.createElement('p');
      headline.classList.add('headline-h4');
      headline.textContent = headlineCell.textContent.trim();
      infoDiv.append(headline);
      const desc = document.createElement('div');
      desc.classList.add('bodyMediumRegular', 'persistent-nav--level2-banner-desc');
      desc.innerHTML = descriptionCell?.innerHTML || '';
      infoDiv.append(desc);
      bannerDiv.append(infoDiv);
      level2Div.append(bannerDiv);
      moveInstrumentation(matchingLevel2Banner, bannerDiv); // Move instrumentation from level2Banner row
    }

    navList.append(li);
  });

  const mainHeaderRight = document.createElement('div');
  mainHeaderRight.classList.add('main-header--right', 'grid-x', 'align-middle');
  mainHeaderContainer.append(mainHeaderRight);

  const searchButtonDesktop = document.createElement('button');
  searchButtonDesktop.classList.add('button', 'brown', 'square-icon', 'corner-round', 'search-btn', 'show-for-large');
  searchButtonDesktop.setAttribute('aria-label', 'Search');
  searchButtonDesktop.innerHTML = `
    <svg aria-hidden="true" role="presentation" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6.5998" cy="6.63203" r="5.3" stroke="#ffffff" stroke-width="2"></circle>
      <line x1="14.2855" y1="14.332" x2="10.7997" y2="10.8462" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
    </svg>
  `;
  mainHeaderRight.append(searchButtonDesktop);

  const burgerButton = document.createElement('button');
  burgerButton.classList.add('button', 'brown', 'square-icon', 'corner-round', 'burger-btn', 'sm-transparent', 'md-transparent', 'js-burger-menu');
  burgerButton.id = 'burger-nav';
  burgerButton.setAttribute('aria-label', 'Open Navigation');
  burgerButton.setAttribute('aria-expanded', 'false');
  burgerButton.setAttribute('aria-controls', 'burger-nav-wrapper');
  burgerButton.setAttribute('data-nav-wrapper', 'burger-nav-wrapper');
  burgerButton.innerHTML = `
    <svg aria-hidden="true" role="presentation" width="20" height="15" viewBox="0 0 20 15" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
      <rect y="0.332031" width="20" height="2" rx="1"></rect>
      <rect y="6.33203" width="20" height="2" rx="1"></rect>
      <rect y="12.332" width="20" height="2" rx="1"></rect>
    </svg>
  `;
  mainHeaderRight.append(burgerButton);

  block.replaceChildren(mainNavigation);

  // Add event listeners for navigation toggling
  mainNavigation.querySelectorAll('.persistent-navigation--link').forEach((button) => {
    button.addEventListener('click', () => {
      const menuWrapper = mainNavigation.querySelector(`#${button.dataset.navWrapper}`);
      if (menuWrapper) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        menuWrapper.classList.toggle('active', !isExpanded);
        button.closest('.persistent-navigation--list').classList.toggle('active', !isExpanded);
      }
    });
  });

  mainNavigation.querySelectorAll('.js-persistent-nav-l1--close').forEach((button) => {
    button.addEventListener('click', () => {
      const menuWrapper = button.closest('.persistent-navigation--menu-wrapper');
      const parentLi = button.closest('.persistent-navigation--list');
      const parentButton = parentLi.querySelector('.persistent-navigation--link');
      if (menuWrapper && parentButton) {
        menuWrapper.classList.remove('active');
        parentLi.classList.remove('active');
        parentButton.setAttribute('aria-expanded', 'false');
      }
    });
  });

  mainNavigation.querySelectorAll('.js-persistent-nav--level2-link').forEach((button) => {
    button.addEventListener('click', () => {
      const level3Wrapper = button.closest('.persistent-nav--level2-list-item').querySelector('.persistent-nav--level3-wrapper');
      if (level3Wrapper) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        level3Wrapper.classList.toggle('active', !isExpanded);
      }
    });
  });

  mainNavigation.querySelectorAll('.js-persistent-nav-l2--close').forEach((button) => {
    button.addEventListener('click', () => {
      const level3Wrapper = button.closest('.persistent-nav--level3-wrapper');
      const level2ListItem = button.closest('.persistent-nav--level2-list-item');
      const level2LinkButton = level2ListItem.querySelector('.js-persistent-nav--level2-link');
      if (level3Wrapper && level2LinkButton) {
        level3Wrapper.classList.remove('active');
        level2LinkButton.setAttribute('aria-expanded', 'false');
      }
    });
  });

  mainNavigation.querySelectorAll('.persistent-nav--level2-list ul').forEach((ul) => {
    transformNestedLists(ul);
  });
}
