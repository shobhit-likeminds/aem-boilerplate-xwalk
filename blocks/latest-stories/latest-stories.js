import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const [sectionHeadingRow, ...itemRows] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories');

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  moveInstrumentation(sectionHeadingRow, heading);
  heading.textContent = sectionHeadingRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');

  const flickityWrap = document.createElement('div');
  flickityWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  flickityWrap.setAttribute('data-flickity', '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }');

  const slidesWrapper = document.createElement('div');
  slidesWrapper.classList.add('slides');

  const twitterFeedItems = itemRows.filter((row) => row.children.length === 12);
  const storyItems = itemRows.filter((row) => row.children.length === 8);

  twitterFeedItems.forEach((row) => {
    const [
      bannerImageCell,
      profileImageCell,
      profileNameCell,
      profileScreenNameCell,
      profileLinkCell,
      verifiedIconCell,
      followLinkCell,
      followLabelCell,
      postsCountCell,
      followingCountCell,
      followersCountCell,
      postsCell, // This is a container field, its items are not directly here
    ] = [...row.children];

    const twitterSlide = document.createElement('div');
    twitterSlide.classList.add('elfsight-app-81878be6-2fc1-4ba6-b776-5fb962097235', 'eapps-twitter-feed', 'eapps-twitter-feed-source-user', 'eapps-twitter-feed-color-scheme--dark');
    twitterSlide.setAttribute('data-elfsight-app-lazy', '');
    twitterSlide.id = 'eapps-twitter-feed-1'; // Re-using ID from original HTML, assuming single instance

    const twitterFeedContainer = document.createElement('div');
    twitterFeedContainer.classList.add('eapps-twitter-feed-container', 'eapps-twitter-feed-post-x-icon-hide', 'eapps-twitter-feed-post-reply-hide', 'eapps-twitter-feed-post-repost-hide', 'eapps-twitter-feed-post-like-hide', 'eapps-twitter-feed-post-share-button-hide', 'eapps-twitter-feed-small', 'eapps-twitter-feed-hide-header');
    twitterFeedContainer.setAttribute('eapps-link', 'app');

    const twitterFeedInner = document.createElement('div');
    twitterFeedInner.classList.add('eapps-twitter-feed-inner');

    const header = document.createElement('div');
    header.classList.add('eapps-twitter-feed-header', 'eapps-twitter-feed-header-show');
    header.setAttribute('eapps-link', 'header');

    const headerInner = document.createElement('div');
    headerInner.classList.add('eapps-twitter-feed-header-inner');

    const bannerContainer = document.createElement('div');
    bannerContainer.classList.add('eapps-twitter-feed-header-banner-container');
    const bannerPicture = bannerImageCell.querySelector('picture');
    if (bannerPicture) {
      const bannerImg = createOptimizedPicture(bannerPicture.querySelector('img').src, bannerPicture.querySelector('img').alt, false, [{ width: '750' }]);
      moveInstrumentation(bannerImageCell, bannerImg.querySelector('img'));
      bannerContainer.append(bannerImg);
    }
    headerInner.append(bannerContainer);

    const userDiv = document.createElement('div');
    userDiv.classList.add('eapps-twitter-feed-header-user');
    const profileLink = document.createElement('a');
    profileLink.setAttribute('rel', 'nofollow');
    profileLink.setAttribute('target', '_blank');
    profileLink.href = profileLinkCell.querySelector('a')?.href || '#';
    profileLink.classList.add('eapps-twitter-feed-header-user-image-container');

    const profilePicture = profileImageCell.querySelector('picture');
    if (profilePicture) {
      const profileImg = createOptimizedPicture(profilePicture.querySelector('img').src, profilePicture.querySelector('img').alt, false, [{ width: '750' }]);
      profileLink.append(profileImg);
      moveInstrumentation(profileImageCell, profileImg.querySelector('img'));
    }
    userDiv.append(profileLink);

    const userInfo = document.createElement('div');
    userInfo.classList.add('eapps-twitter-feed-header-user-info');

    const userInfoNameWrapper = document.createElement('div');
    userInfoNameWrapper.classList.add('eapps-twitter-feed-header-user-info-name-wrapper');

    const userInfoName = document.createElement('div');
    userInfoName.classList.add('eapps-twitter-feed-header-user-info-name');
    const nameLink = document.createElement('a');
    nameLink.setAttribute('rel', 'nofollow');
    nameLink.setAttribute('target', '_blank');
    nameLink.href = profileLinkCell.querySelector('a')?.href || '#';
    nameLink.textContent = profileNameCell.textContent.trim();
    userInfoName.append(nameLink);

    const verifiedIconPicture = verifiedIconCell.querySelector('picture');
    if (verifiedIconPicture) {
      const verifiedSpan = document.createElement('span');
      verifiedSpan.classList.add('eapps-twitter-feed-header-user-info-name-verified-container');
      verifiedSpan.setAttribute('title', 'Verified account');
      const verifiedImg = createOptimizedPicture(verifiedIconPicture.querySelector('img').src, verifiedIconPicture.querySelector('img').alt, false, [{ width: '750' }]);
      verifiedSpan.append(verifiedImg);
      moveInstrumentation(verifiedIconCell, verifiedImg.querySelector('img'));
      userInfoName.append(verifiedSpan);
    }
    userInfoNameWrapper.append(userInfoName);

    const userInfoScreenName = document.createElement('div');
    userInfoScreenName.classList.add('eapps-twitter-feed-header-user-info-screen-name');
    const screenNameLink = document.createElement('a');
    screenNameLink.setAttribute('rel', 'nofollow');
    screenNameLink.setAttribute('target', '_blank');
    screenNameLink.href = profileLinkCell.querySelector('a')?.href || '#';
    screenNameLink.textContent = profileScreenNameCell.textContent.trim();
    userInfoScreenName.append(screenNameLink);
    userInfoNameWrapper.append(userInfoScreenName);
    userInfo.append(userInfoNameWrapper);

    const followLink = document.createElement('a');
    followLink.setAttribute('rel', 'nofollow');
    followLink.setAttribute('target', '_blank');
    followLink.href = followLinkCell.querySelector('a')?.href || '#';
    followLink.setAttribute('eapps-link', 'follow');
    followLink.classList.add('eapps-twitter-feed-header-user-info-follow');
    const followLabelSpan = document.createElement('span');
    followLabelSpan.classList.add('eapps-twitter-feed-header-user-info-follow-label');
    followLabelSpan.textContent = followLabelCell.textContent.trim();
    followLink.append(followLabelSpan);
    userInfo.append(followLink);
    userDiv.append(userInfo);
    headerInner.append(userDiv);

    const statistics = document.createElement('div');
    statistics.classList.add('eapps-twitter-feed-header-statistics');

    const createStatItem = (name, data) => {
      const item = document.createElement('div');
      item.classList.add(`eapps-twitter-feed-header-statistics-${name.toLowerCase()}`, 'eapps-twitter-feed-header-statistics-item');
      const nameDiv = document.createElement('div');
      nameDiv.classList.add('eapps-twitter-feed-header-statistics-item-name');
      nameDiv.textContent = name;
      const dataDiv = document.createElement('div');
      dataDiv.classList.add('eapps-twitter-feed-header-statistics-item-data');
      dataDiv.textContent = data;
      item.append(nameDiv, dataDiv);
      return item;
    };

    statistics.append(
      createStatItem('Posts', postsCountCell.textContent.trim()),
      createStatItem('Following', followingCountCell.textContent.trim()),
      createStatItem('Followers', followersCountCell.textContent.trim()),
    );
    headerInner.append(statistics);
    header.append(headerInner);
    twitterFeedInner.append(header);

    const postsDiv = document.createElement('div');
    postsDiv.classList.add('eapps-twitter-feed-posts');
    postsDiv.setAttribute('eapps-link', 'posts');
    postsDiv.style.maxHeight = 'none'; // Match original HTML style

    const postsContainer = document.createElement('div');
    postsContainer.classList.add('eapps-twitter-feed-posts-container');
    postsContainer.setAttribute('eapps-link', 'postsContainer');
    postsContainer.style.maxHeight = 'none'; // Match original HTML style

    const postsInner = document.createElement('div');
    postsInner.classList.add('eapps-twitter-feed-posts-inner', 'shuffle');
    postsInner.setAttribute('eapps-link', 'posts');

    postsContainer.append(postsInner);
    postsDiv.append(postsContainer);
    twitterFeedInner.append(postsDiv);

    const errorDiv = document.createElement('div');
    errorDiv.classList.add('eapps-twitter-feed-error');
    errorDiv.setAttribute('eapps-link', 'error');
    twitterFeedInner.append(errorDiv);

    const loaderContainer = document.createElement('div');
    loaderContainer.classList.add('eapps-twitter-feed-loader-container', 'eapps-loader-container', 'eapps-loader-hide');
    loaderContainer.setAttribute('eapps-link', 'loader');
    const loader = document.createElement('div');
    loader.classList.add('eapps-loader');
    const loaderInner = document.createElement('div');
    loaderInner.classList.add('eapps-loader-inner');
    loader.append(loaderInner);
    loaderContainer.append(loader);
    twitterFeedInner.append(loaderContainer);

    twitterFeedContainer.append(twitterFeedInner);
    twitterSlide.append(twitterFeedContainer);
    moveInstrumentation(row, twitterSlide); // Move instrumentation from the twitter-feed row
    slidesWrapper.append(twitterSlide);
  });

  storyItems.forEach((row) => {
    const [
      thumbnailImageCell,
      horizontalImageCell,
      verticalImageCell,
      categoryCell,
      storyTextCell,
      readMoreLinkCell,
      readMoreLabelCell,
      dateCell,
    ] = [...row.children];

    const slide = document.createElement('div');
    slide.classList.add('slides');

    const wrap = document.createElement('div');
    wrap.classList.add('wrap');

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');
    const thumbnailPicture = thumbnailImageCell.querySelector('picture');
    if (thumbnailPicture) {
      const img = thumbnailPicture.querySelector('img');
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      const optimizedImg = optimizedPic.querySelector('img');
      optimizedImg.classList.add('thumb-img', 'img-fluid');
      optimizedImg.setAttribute('loading', 'lazy');

      const horizontalImgSrc = horizontalImageCell.querySelector('img')?.src;
      const verticalImgSrc = verticalImageCell.querySelector('img')?.src;
      if (horizontalImgSrc) optimizedImg.setAttribute('data-img-horizontal', horizontalImgSrc);
      if (verticalImgSrc) optimizedImg.setAttribute('data-img-vertical', verticalImgSrc);

      moveInstrumentation(thumbnailImageCell, optimizedImg);
      imageWrap.append(optimizedPic);
    }
    wrap.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    categoryDiv.textContent = categoryCell.textContent.trim();
    contentWrap.append(categoryDiv);

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    textDiv.innerHTML = storyTextCell.innerHTML;
    contentWrap.append(textDiv);

    const readMoreLink = document.createElement('a');
    readMoreLink.classList.add('btn', 'btn-link');
    readMoreLink.href = readMoreLinkCell.querySelector('a')?.href || '#';
    readMoreLink.textContent = readMoreLabelCell.textContent.trim();
    contentWrap.append(readMoreLink);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    const timeElement = document.createElement('time');
    timeElement.setAttribute('datetime', dateCell.textContent.trim()); // Assuming date is ISO format
    timeElement.textContent = dateCell.textContent.trim();
    dateDiv.append(timeElement);
    contentWrap.append(dateDiv);

    wrap.append(contentWrap);
    slide.append(wrap);
    moveInstrumentation(row, slide); // Move instrumentation from the story-item row
    slidesWrapper.append(slide);
  });

  flickityWrap.append(slidesWrapper);
  container.append(flickityWrap);
  section.append(container);

  block.replaceChildren(section);

  // Load Flickity (Swiper equivalent)
  await loadCSS('/libs/flickity/flickity.min.css'); // Assuming Flickity CSS is available in libs
  await loadScript('/libs/flickity/flickity.pkgd.min.js'); // Assuming Flickity JS is available in libs

  // Initialize Flickity
  // eslint-disable-next-line no-undef
  if (typeof Flickity !== 'undefined') {
    // eslint-disable-next-line no-new, no-undef
    new Flickity(flickityWrap, {
      wrapAround: flickityWrap.dataset.flickity.includes('"wrapAround": true'),
      lazyLoad: flickityWrap.dataset.flickity.includes('"lazyLoad": true'),
      pageDots: flickityWrap.dataset.flickity.includes('"pageDots": true'),
      prevNextButtons: flickityWrap.dataset.flickity.includes('"prevNextButtons": true'),
      imagesLoaded: flickityWrap.dataset.flickity.includes('"imagesLoaded": true'),
      cellAlign: flickityWrap.dataset.flickity.includes('"cellAlign": "right"') ? 'right' : 'left',
      watchCSS: flickityWrap.dataset.flickity.includes('"watchCSS": true'),
      adaptiveHeight: flickityWrap.dataset.flickity.includes('"adaptiveHeight": true'),
    });
  }
}
