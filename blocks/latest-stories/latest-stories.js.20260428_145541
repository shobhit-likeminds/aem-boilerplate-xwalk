import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];
  const [sectionHeadingRow, ...itemRows] = children;

  const root = document.createElement('section');
  root.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories'); // Corrected root classes

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(sectionHeadingRow, heading);
  heading.textContent = sectionHeadingRow.textContent.trim();
  sectionHeader.append(heading);
  root.append(sectionHeader);

  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');

  const flickitySliderMobileWrap = document.createElement('div');
  flickitySliderMobileWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  flickitySliderMobileWrap.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('slides');

  const storyItems = itemRows.filter((row) => row.children.length === 8);
  const socialFeedItems = itemRows.filter((row) => row.children.length === 11);

  // Social Feed Items
  socialFeedItems.forEach((row) => {
    const [
      profileBannerCell,
      profileImageCell,
      profileNameCell,
      profileScreenNameCell,
      profileLinkCell,
      profileStatsPostsCell,
      profileStatsFollowingCell,
      profileStatsFollowersCell,
      followLabelCell,
      followLinkCell,
      postsCell, // This is a container field, its items are not directly in this row
    ] = [...row.children];

    const socialFeedWrapper = document.createElement('div');
    socialFeedWrapper.classList.add(
      'elfsight-app-81878be6-2fc1-4ba6-b776-5fb962097235',
      'eapps-twitter-feed',
      'eapps-twitter-feed-source-user',
      'eapps-twitter-feed-color-scheme--dark',
    );
    socialFeedWrapper.setAttribute('data-elfsight-app-lazy', '');
    socialFeedWrapper.id = 'eapps-twitter-feed-1';

    const feedContainer = document.createElement('div');
    feedContainer.classList.add(
      'eapps-twitter-feed-container',
      'eapps-twitter-feed-post-x-icon-hide',
      'eapps-twitter-feed-post-reply-hide',
      'eapps-twitter-feed-post-repost-hide',
      'eapps-twitter-feed-post-like-hide',
      'eapps-twitter-feed-post-share-button-hide',
      'eapps-twitter-feed-small',
      'eapps-twitter-feed-hide-header',
    );
    moveInstrumentation(row, feedContainer);

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('eapps-twitter-feed-title');
    titleDiv.setAttribute('eapps-link', 'title');
    const widgetTitle = document.createElement('div');
    widgetTitle.classList.add('eui-widget-title', 'es-widget-title');
    widgetTitle.style.display = 'none';
    titleDiv.append(widgetTitle);
    feedContainer.append(titleDiv);

    const innerDiv = document.createElement('div');
    innerDiv.classList.add('eapps-twitter-feed-inner');

    const header = document.createElement('div');
    header.classList.add('eapps-twitter-feed-header', 'eapps-twitter-feed-header-show');
    header.setAttribute('eapps-link', 'header');
    const headerInner = document.createElement('div');
    headerInner.classList.add('eapps-twitter-feed-header-inner');

    const bannerContainer = document.createElement('div');
    bannerContainer.classList.add('eapps-twitter-feed-header-banner-container');
    const bannerImg = profileBannerCell.querySelector('picture') || document.createElement('img');
    bannerImg.classList.add('eapps-twitter-feed-header-banner');
    if (bannerImg.tagName === 'PICTURE') {
      const img = bannerImg.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        bannerContainer.append(optimizedPic);
      }
    } else {
      bannerContainer.append(bannerImg);
    }
    headerInner.append(bannerContainer);

    const userDiv = document.createElement('div');
    userDiv.classList.add('eapps-twitter-feed-header-user');
    const userLink = document.createElement('a');
    userLink.rel = 'nofollow';
    userLink.target = '_blank';
    userLink.href = profileLinkCell.querySelector('a')?.href || '#';
    const userImageContainer = document.createElement('div');
    userImageContainer.classList.add('eapps-twitter-feed-header-user-image-container');
    const userImage = profileImageCell.querySelector('picture') || document.createElement('img');
    userImage.classList.add('eapps-twitter-feed-header-user-image');
    if (userImage.tagName === 'PICTURE') {
      const img = userImage.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        userImageContainer.append(optimizedPic);
      }
    } else {
      userImageContainer.append(userImage);
    }
    userLink.append(userImageContainer);
    userDiv.append(userLink);

    const userInfo = document.createElement('div');
    userInfo.classList.add('eapps-twitter-feed-header-user-info');
    const userInfoNameWrapper = document.createElement('div');
    userInfoNameWrapper.classList.add('eapps-twitter-feed-header-user-info-name-wrapper');
    const userInfoName = document.createElement('div');
    userInfoName.classList.add('eapps-twitter-feed-header-user-info-name');
    const nameLink = document.createElement('a');
    nameLink.rel = 'nofollow';
    nameLink.href = profileLinkCell.querySelector('a')?.href || '#';
    nameLink.target = '_blank';
    nameLink.textContent = profileNameCell.textContent.trim();
    userInfoName.append(nameLink);
    userInfoNameWrapper.append(userInfoName);

    const userInfoScreenName = document.createElement('div');
    userInfoScreenName.classList.add('eapps-twitter-feed-header-user-info-screen-name');
    const screenNameLink = document.createElement('a');
    screenNameLink.rel = 'nofollow';
    screenNameLink.href = profileLinkCell.querySelector('a')?.href || '#';
    screenNameLink.target = '_blank';
    screenNameLink.textContent = profileScreenNameCell.textContent.trim();
    userInfoScreenName.append(screenNameLink);
    userInfoNameWrapper.append(userInfoScreenName);
    userInfo.append(userInfoNameWrapper);

    const followLink = document.createElement('a');
    followLink.rel = 'nofollow';
    followLink.href = followLinkCell.querySelector('a')?.href || '#';
    followLink.target = '_blank';
    followLink.classList.add('eapps-twitter-feed-header-user-info-follow');
    followLink.setAttribute('eapps-link', 'follow');
    const followLabel = document.createElement('span');
    followLabel.classList.add('eapps-twitter-feed-header-user-info-follow-label');
    followLabel.textContent = followLabelCell.textContent.trim();
    followLink.append(followLabel);
    userInfo.append(followLink);
    userDiv.append(userInfo);
    headerInner.append(userDiv);

    const statistics = document.createElement('div');
    statistics.classList.add('eapps-twitter-feed-header-statistics');

    const createStatItem = (name, data) => {
      const item = document.createElement('div');
      item.classList.add('eapps-twitter-feed-header-statistics-item');
      const itemName = document.createElement('div');
      itemName.classList.add('eapps-twitter-feed-header-statistics-item-name');
      itemName.textContent = name;
      const itemData = document.createElement('div');
      itemData.classList.add('eapps-twitter-feed-header-statistics-item-data');
      itemData.textContent = data;
      item.append(itemName, itemData);
      return item;
    };

    statistics.append(
      createStatItem('Posts', profileStatsPostsCell.textContent.trim()),
      createStatItem('Following', profileStatsFollowingCell.textContent.trim()),
      createStatItem('Followers', profileStatsFollowersCell.textContent.trim()),
    );
    headerInner.append(statistics);
    header.append(headerInner);
    innerDiv.append(header);

    const postsDiv = document.createElement('div');
    postsDiv.classList.add('eapps-twitter-feed-posts');
    postsDiv.setAttribute('eapps-link', 'posts');
    postsDiv.style.maxHeight = 'none';

    const postsContainer = document.createElement('div');
    postsContainer.classList.add('eapps-twitter-feed-posts-container');
    postsContainer.setAttribute('eapps-link', 'postsContainer');
    postsContainer.style.maxHeight = 'none';

    const postsInner = document.createElement('div');
    postsInner.classList.add('eapps-twitter-feed-posts-inner', 'shuffle');
    postsInner.setAttribute('eapps-link', 'posts');
    postsInner.style.cssText = 'position: relative; overflow: hidden; height: auto; transition: height 100ms cubic-bezier(0.4, 0, 0.2, 1);';

    // The actual social feed posts are not directly in the block children,
    // they would be nested within the 'posts' container field if authored.
    // Since the provided EDS structure only shows a placeholder for 'posts'
    // and the original HTML has hardcoded Elfsight app, we'll create a placeholder
    // for the posts section as per the original HTML structure.
    // If 'social-feed-post-item' rows were provided, we would iterate and create them here.

    // Placeholder for posts based on original HTML structure
    const postItemPlaceholder = document.createElement('div');
    postItemPlaceholder.classList.add('eapps-twitter-feed-posts-item', 'eapps-twitter-feed-posts-item-media-items-1', 'eapps-twitter-feed-posts-item-media-show', 'eapps-twitter-feed-posts-item-show', 'shuffle-item', 'shuffle-item--visible');
    postItemPlaceholder.style.cssText = 'position: absolute; top: 0px; visibility: visible; will-change: transform; left: 0px; opacity: 1; transition-duration: 100ms; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-property: transform, opacity;';
    const postItemInner = document.createElement('div');
    postItemInner.classList.add('eapps-twitter-feed-posts-item-inner');
    postItemPlaceholder.append(postItemInner);
    postsInner.append(postItemPlaceholder); // Add one placeholder for structure

    postsContainer.append(postsInner);
    postsDiv.append(postsContainer);
    innerDiv.append(postsDiv);

    const errorDiv = document.createElement('div');
    errorDiv.classList.add('eapps-twitter-feed-error');
    errorDiv.setAttribute('eapps-link', 'error');
    innerDiv.append(errorDiv);

    const loaderContainer = document.createElement('div');
    loaderContainer.classList.add('eapps-twitter-feed-loader-container', 'eapps-loader-container', 'eapps-loader-hide');
    loaderContainer.setAttribute('eapps-link', 'loader');
    const loader = document.createElement('div');
    loader.classList.add('eapps-loader');
    const loaderInner = document.createElement('div');
    loaderInner.classList.add('eapps-loader-inner');
    loader.append(loaderInner);
    loaderContainer.append(loader);
    innerDiv.append(loaderContainer);

    feedContainer.append(innerDiv);
    socialFeedWrapper.append(feedContainer);
    slidesContainer.append(socialFeedWrapper);
  });

  // Story Items
  storyItems.forEach((row) => {
    const [
      thumbImageCell,
      horizontalImageCell,
      verticalImageCell,
      categoryCell,
      storyTextCell,
      ctaLinkCell,
      ctaLabelCell,
      dateCell,
    ] = [...row.children];

    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slides'); // Corrected class name to match ORIGINAL HTML
    moveInstrumentation(row, slideDiv);

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');

    const thumbPicture = thumbImageCell.querySelector('picture');
    if (thumbPicture) {
      const img = thumbPicture.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrap.append(optimizedPic);
      }
    }

    const horizontalImg = horizontalImageCell.querySelector('img');
    if (horizontalImg) {
      // Ensure imageWrap.querySelector('img') exists before setting attribute
      const existingImg = imageWrap.querySelector('img');
      if (existingImg) {
        existingImg.setAttribute('data-img-horizontal', horizontalImg.src);
      }
    }

    const verticalImg = verticalImageCell.querySelector('img');
    if (verticalImg) {
      // Ensure imageWrap.querySelector('img') exists before setting attribute
      const existingImg = imageWrap.querySelector('img');
      if (existingImg) {
        existingImg.setAttribute('data-img-vertical', verticalImg.src);
      }
    }

    // Ensure imageWrap.querySelector('img') exists before adding classes and setting loading
    const existingImg = imageWrap.querySelector('img');
    if (existingImg) {
      existingImg.classList.add('thumb-img', 'img-fluid');
      existingImg.loading = 'lazy';
    }


    wrapDiv.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    categoryDiv.textContent = categoryCell.textContent.trim();
    contentWrap.append(categoryDiv);

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    textDiv.textContent = storyTextCell.textContent.trim();
    contentWrap.append(textDiv);

    const ctaLink = document.createElement('a');
    ctaLink.classList.add('btn', 'btn-link');
    ctaLink.href = ctaLinkCell.querySelector('a')?.href || '#';
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    contentWrap.append(ctaLink);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    const timeElement = document.createElement('time');
    timeElement.setAttribute('datetime', dateCell.textContent.trim()); // Assuming date cell contains valid datetime string
    timeElement.textContent = dateCell.textContent.trim();
    dateDiv.append(timeElement);
    contentWrap.append(dateDiv);

    wrapDiv.append(contentWrap);
    slideDiv.append(wrapDiv);
    slidesContainer.append(slideDiv);
  });

  flickitySliderMobileWrap.append(slidesContainer);
  container.append(flickitySliderMobileWrap);
  root.append(container);

  block.replaceChildren(root);
}
