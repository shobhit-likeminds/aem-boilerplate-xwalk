import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];

  const sectionHeaderRow = children[0];
  const twitterFeedItemRows = children.filter((row) => row.children.length === 13);
  const storyItemRows = children.filter((row) => row.children.length === 8);

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories');

  // Section Header
  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');
  moveInstrumentation(sectionHeaderRow, sectionHeader);

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.setAttribute('data-aos', 'fade-up');
  heading.setAttribute('data-aos-offset', '100');
  heading.setAttribute('data-aos-duration', '650');
  heading.setAttribute('data-aos-easing', 'ease-in-out');
  heading.textContent = sectionHeaderRow.textContent.trim();
  sectionHeader.append(heading);
  section.append(sectionHeader);

  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');
  container.setAttribute('data-aos', 'fade-up');
  container.setAttribute('data-aos-offset', '100');
  container.setAttribute('data-aos-duration', '650');
  container.setAttribute('data-aos-easing', 'ease-in-out');

  const flickitySliderWrap = document.createElement('div');
  flickitySliderWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');
  flickitySliderWrap.setAttribute(
    'data-flickity',
    '{ "wrapAround": false, "lazyLoad": true, "pageDots": true, "prevNextButtons": false, "imagesLoaded": true, "cellAlign": "left", "watchCSS": true, "adaptiveHeight": true }',
  );

  const twitterSlides = document.createElement('div');
  twitterSlides.classList.add('slides');

  const elfsightApp = document.createElement('div');
  elfsightApp.classList.add(
    'elfsight-app-81878be6-2fc1-4ba6-b776-5fb962097235',
    'eapps-twitter-feed',
    'eapps-twitter-feed-source-user',
    'eapps-twitter-feed-color-scheme--dark',
  );
  elfsightApp.setAttribute('data-elfsight-app-lazy', '');
  elfsightApp.id = 'eapps-twitter-feed-1';

  const twitterFeedContainer = document.createElement('div');
  twitterFeedContainer.classList.add(
    'eapps-twitter-feed-container',
    'eapps-twitter-feed-post-x-icon-hide',
    'eapps-twitter-feed-post-reply-hide',
    'eapps-twitter-feed-post-repost-hide',
    'eapps-twitter-feed-post-like-hide',
    'eapps-twitter-feed-post-share-button-hide',
    'eapps-twitter-feed-small',
    'eapps-twitter-feed-hide-header',
  );
  twitterFeedContainer.setAttribute('eapps-link', 'app');

  const twitterFeedTitle = document.createElement('div');
  twitterFeedTitle.classList.add('eapps-twitter-feed-title');
  twitterFeedTitle.setAttribute('eapps-link', 'title');
  const euiWidgetTitle = document.createElement('div');
  euiWidgetTitle.classList.add('eui-widget-title', 'es-widget-title');
  euiWidgetTitle.style.display = 'none';
  twitterFeedTitle.append(euiWidgetTitle);
  twitterFeedContainer.append(twitterFeedTitle);

  const twitterFeedInner = document.createElement('div');
  twitterFeedInner.classList.add('eapps-twitter-feed-inner');

  const twitterFeedHeader = document.createElement('div');
  twitterFeedHeader.classList.add('eapps-twitter-feed-header', 'eapps-twitter-feed-header-show');
  twitterFeedHeader.setAttribute('eapps-link', 'header');

  const twitterFeedHeaderInner = document.createElement('div');
  twitterFeedHeaderInner.classList.add('eapps-twitter-feed-header-inner');

  // Twitter Feed Header Banner
  const twitterFeedHeaderBannerContainer = document.createElement('div');
  twitterFeedHeaderBannerContainer.classList.add('eapps-twitter-feed-header-banner-container');
  const bannerImg = document.createElement('img');
  bannerImg.classList.add('eapps-twitter-feed-header-banner');
  bannerImg.alt = 'profile banner';
  const firstTwitterItem = twitterFeedItemRows[0];
  if (firstTwitterItem) {
    const [bannerImageCell] = [...firstTwitterItem.children];
    const bannerPicture = bannerImageCell.querySelector('picture');
    if (bannerPicture) {
      const img = bannerPicture.querySelector('img');
      bannerImg.src = img.src;
      bannerImg.alt = img.alt;
    }
  }
  twitterFeedHeaderBannerContainer.append(bannerImg);
  twitterFeedHeaderInner.append(twitterFeedHeaderBannerContainer);

  const twitterFeedHeaderUser = document.createElement('div');
  twitterFeedHeaderUser.classList.add('eapps-twitter-feed-header-user');

  const twitterFeedHeaderUserImageContainer = document.createElement('a');
  twitterFeedHeaderUserImageContainer.classList.add('eapps-twitter-feed-header-user-image-container');
  twitterFeedHeaderUserImageContainer.rel = 'nofollow';
  twitterFeedHeaderUserImageContainer.target = '_blank';
  twitterFeedHeaderUserImageContainer.href = 'https://x.com/MahindraRise'; // Hardcoded, as per original HTML

  const profileImg = document.createElement('img');
  profileImg.classList.add('eapps-twitter-feed-header-user-image');
  if (firstTwitterItem) {
    const [, profileImageCell] = [...firstTwitterItem.children];
    const profilePicture = profileImageCell.querySelector('picture');
    if (profilePicture) {
      const img = profilePicture.querySelector('img');
      profileImg.src = img.src;
      profileImg.alt = img.alt;
    }
  }
  twitterFeedHeaderUserImageContainer.append(profileImg);
  twitterFeedHeaderUser.append(twitterFeedHeaderUserImageContainer);

  const twitterFeedHeaderUserInfo = document.createElement('div');
  twitterFeedHeaderUserInfo.classList.add('eapps-twitter-feed-header-user-info');

  const twitterFeedHeaderUserInfoNameWrapper = document.createElement('div');
  twitterFeedHeaderUserInfoNameWrapper.classList.add('eapps-twitter-feed-header-user-info-name-wrapper');

  const twitterFeedHeaderUserInfoName = document.createElement('div');
  twitterFeedHeaderUserInfoName.classList.add('eapps-twitter-feed-header-user-info-name');
  const authorNameLink = document.createElement('a');
  authorNameLink.rel = 'nofollow';
  authorNameLink.href = 'https://x.com/MahindraRise'; // Hardcoded, as per original HTML
  authorNameLink.title = 'Visit Mahindra Group on X (formerly Twitter)';
  authorNameLink.target = '_blank';
  const authorNameSpan = document.createElement('span');
  if (firstTwitterItem) {
    const [, , authorNameCell] = [...firstTwitterItem.children];
    authorNameSpan.textContent = authorNameCell.textContent.trim();
  }
  authorNameLink.append(authorNameSpan);

  const verifiedSpan = document.createElement('span');
  verifiedSpan.classList.add('eapps-twitter-feed-header-user-info-name-verified-container');
  verifiedSpan.title = 'Verified account';
  verifiedSpan.innerHTML = `
    <svg class="eapps-twitter-feed-header-user-info-name-verified" width="16" height="16" viewBox="0 0 20 20">
      <path style="fill:#1da1f2;fill-opacity:1" d="m 14.5436,18.0924 c -0.160467,0 -0.3878,-0.03 -0.682,-0.09 -0.2942,-0.06 -0.488133,-0.1102 -0.5818,-0.1506 -0.33428,0.669333 -0.78895,1.194767 -1.36401,1.5763 -0.57506,0.381533 -1.216987,0.5723 -1.92578,0.5723 -0.7087933,0 -1.3674367,-0.210833 -1.97593,-0.6325 -0.6084933,-0.421733 -1.0331,-0.9271 -1.27382,-1.5161 -0.4145733,0.160667 -0.8425233,0.241 -1.28385,0.241 -1.0030067,0 -1.8589067,-0.3782 -2.5677,-1.1346 -0.7087933,-0.756333 -1.0565033,-1.6499 -1.04313,-2.6807 -0.0134,-0.04 -0.0134,-0.08017 0,-0.1205 l 0,-0.1205 c -0.0134,-0.04013 -0.0134,-0.08028 0,-0.12044 0.0134,-0.04013 0.0134,-0.08029 0,-0.12048 C 1.27052,13.420747 0.81916333,12.942167 0.49151,12.35984 0.16383667,11.77724 0,11.147923 0,10.47189 0,9.79585 0.17719667,9.1398933 0.53159,8.50402 0.88599,7.86814 1.39084,7.3828633 2.04614,7.04819 L 1.96594,6.72691 C 1.8857,6.5261033 1.84558,6.2985267 1.84558,6.04418 1.8188467,5.93708 1.8188467,5.82329 1.84558,5.70281 1.83218,4.68541 2.1732033,3.7951833 2.86865,3.03213 3.56407,2.2690767 4.4266567,1.88755 5.45641,1.88755 c 0.4413267,0 0.8692767,0.08032 1.28385,0.24096 C 6.9943533,1.5261033 7.4156167,1.02075 8.00405,0.61245 8.5924567,0.20415 9.25443,0 9.98997,0 c 1.47108,0 2.56769,0.70950333 3.28983,2.12851 0.3544,-0.16064 0.775667,-0.24096 1.2638,-0.24096 1.003,0 1.855567,0.3748333 2.5577,1.1245 0.702133,0.7496667 1.066567,1.6465867 1.0933,2.69076 -0.01333,0.08032 -0.02,0.19411 -0.02,0.34137 l -0.1203,0.68273 c -0.02667,0.12048 -0.0668,0.2275733 -0.1204,0.32128 0.6018,0.2811267 1.089933,0.7195467 1.4644,1.31526 0.374467,0.59572 0.575067,1.2951867 0.6018,2.0984 -0.02667,0.749667 -0.2072,1.41901 -0.5416,2.00803 -0.334333,0.58902 -0.775667,1.030787 -1.324,1.3253 0.02667,0.05353 0.04,0.09369 0.04,0.12048 l 0.02,0.24094 c -0.02667,0.04 -0.02667,0.08017 0,0.1205 -0.02667,1.070933 -0.394433,1.974567 -1.1033,2.7109 -0.7088,0.736267 -1.558033,1.1044 -2.5477,1.1044"></path>
      <path style="fill:#ffffff;fill-opacity:1;" d="M 13.2598,6.58635 8.42528,11.40562 6.76028,9.71888 C 6.51956,9.5180733 6.28218,9.41767 6.04814,9.41767 5.8141067,9.41767 5.5633567,9.5180733 5.29589,9.71888 5.0952833,10 4.9983267,10.271083 5.00502,10.53213 c 0.00667,0.26104 0.11031,0.471883 0.31093,0.63253 l 2.38716,2.40964 c 0.24072,0.2008 0.5015033,0.3012 0.78235,0.3012 0.28084,0 0.5015,-0.1004 0.66198,-0.3012 l 0.0201,0 5.524341,-5.6675353 C 15.199662,7.3478056 14.827995,6.7252711 14.674931,6.5787563 14.521867,6.4322415 13.835901,6.0147732 13.2598,6.58635 z"></path>
    </svg>
  `;
  authorNameLink.append(verifiedSpan);
  twitterFeedHeaderUserInfoName.append(authorNameLink);

  const twitterFeedPostsItemUserScreenName = document.createElement('div');
  twitterFeedPostsItemUserScreenName.classList.add('eapps-twitter-feed-posts-item-user-screen-name');
  const handleLink = document.createElement('a');
  handleLink.rel = 'nofollow';
  handleLink.target = '_blank';
  handleLink.href = 'https://x.com/MahindraRise'; // Hardcoded, as per original HTML
  const handleSpan = document.createElement('span');
  if (firstTwitterItem) {
    const [, , , authorHandleCell] = [...firstTwitterItem.children];
    handleSpan.textContent = authorHandleCell.textContent.trim();
  }
  handleLink.append(handleSpan);
  twitterFeedPostsItemUserScreenName.append(handleLink);

  const dateSpan = document.createElement('span');
  dateSpan.classList.add('eapps-twitter-feed-posts-item-user-date');
  if (firstTwitterItem) {
    const [, , , , tweetDateCell] = [...firstTwitterItem.children];
    dateSpan.textContent = tweetDateCell.textContent.trim();
  }
  twitterFeedPostsItemUserScreenName.append(dateSpan);
  twitterFeedHeaderUserInfoName.append(twitterFeedPostsItemUserScreenName);

  twitterFeedHeaderUserInfoNameWrapper.append(twitterFeedHeaderUserInfoName);
  twitterFeedHeaderUserInfo.append(twitterFeedHeaderUserInfoNameWrapper);

  const twitterFeedPostsItemUserPost = document.createElement('div');
  twitterFeedPostsItemUserPost.classList.add('eapps-twitter-feed-posts-item-user-post');
  const tweetLink = document.createElement('a');
  tweetLink.rel = 'nofollow';
  tweetLink.target = '_blank';
  if (firstTwitterItem) {
    const [, , , , , , , , , tweetLinkCell] = [...firstTwitterItem.children];
    tweetLink.href = tweetLinkCell.querySelector('a')?.href || '#';
  }
  tweetLink.title = 'View on X';
  tweetLink.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.6424 0.269775H12.5847L8.34131 5.12425L13.3333 11.7301H9.42461L6.36319 7.72369L2.86023 11.7301H0.916753L5.45545 6.53769L0.666626 0.269775H4.67454L7.44179 3.93179L10.6424 0.269775ZM9.96068 10.5664H11.0369L4.08973 1.37232H2.9348L9.96068 10.5664Z"></path>
    </svg>
  `;
  twitterFeedPostsItemUserPost.append(tweetLink);
  twitterFeedHeaderUserInfo.append(twitterFeedPostsItemUserPost);

  twitterFeedHeaderUser.append(twitterFeedHeaderUserInfo);
  twitterFeedHeaderInner.append(twitterFeedHeaderUser);
  twitterFeedHeader.append(twitterFeedHeaderInner);
  twitterFeedInner.append(twitterFeedHeader);

  const twitterFeedPosts = document.createElement('div');
  twitterFeedPosts.classList.add('eapps-twitter-feed-posts');

  twitterFeedItemRows.forEach((row) => {
    const [
      bannerImageCell,
      profileImageCell,
      authorNameCell,
      authorHandleCell,
      tweetDateCell,
      tweetTextCell,
      tweetImage1Cell,
      tweetImage2Cell,
      tweetImage3Cell,
      tweetLinkCell,
      replyCountCell,
      repostCountCell,
      likeCountCell,
    ] = [...row.children];

    const itemDiv = document.createElement('div');
    itemDiv.classList.add(
      'eapps-twitter-feed-posts-item',
      'eapps-twitter-feed-posts-item-media-items-1',
      'eapps-twitter-feed-posts-item-media-show',
      'eapps-twitter-feed-posts-item-show',
      'shuffle-item',
      'shuffle-item--visible',
    );
    moveInstrumentation(row, itemDiv);

    const itemInner = document.createElement('div');
    itemInner.classList.add('eapps-twitter-feed-posts-item-inner');

    const itemUser = document.createElement('div');
    itemUser.classList.add('eapps-twitter-feed-posts-item-user');

    const userLink = document.createElement('a');
    userLink.rel = 'nofollow';
    userLink.target = '_blank';
    userLink.href = tweetLinkCell.querySelector('a')?.href || '#';

    const userImageContainer = document.createElement('div');
    userImageContainer.classList.add('eapps-twitter-feed-posts-item-user-image-container');
    const userImage = document.createElement('img');
    userImage.classList.add('eapps-twitter-feed-posts-item-user-image');
    const profilePicture = profileImageCell.querySelector('picture');
    if (profilePicture) {
      const img = profilePicture.querySelector('img');
      userImage.src = img.src;
      userImage.alt = img.alt;
    }
    userImageContainer.append(userImage);
    userLink.append(userImageContainer);
    itemUser.append(userLink);

    const userNameDiv = document.createElement('div');
    userNameDiv.classList.add('eapps-twitter-feed-posts-item-user-name');
    const userNameLink = document.createElement('a');
    userNameLink.rel = 'nofollow';
    userNameLink.target = '_blank';
    userNameLink.href = tweetLinkCell.querySelector('a')?.href || '#';
    const userNameSpan = document.createElement('span');
    userNameSpan.textContent = authorNameCell.textContent.trim();
    userNameLink.append(userNameSpan);
    userNameDiv.append(userNameLink);

    const userNameVerified = document.createElement('span');
    userNameVerified.classList.add('eapps-twitter-feed-posts-item-user-name-verified');
    userNameVerified.title = 'Verified account';
    userNameVerified.innerHTML = `
      <svg width="13" height="13" viewBox="0 0 20 20">
        <path style="fill:#1da1f2;fill-opacity:1" d="m 14.5436,18.0924 c -0.160467,0 -0.3878,-0.03 -0.682,-0.09 -0.2942,-0.06 -0.488133,-0.1102 -0.5818,-0.1506 -0.33428,0.669333 -0.78895,1.194767 -1.36401,1.5763 -0.57506,0.381533 -1.216987,0.5723 -1.92578,0.5723 -0.7087933,0 -1.3674367,-0.210833 -1.97593,-0.6325 -0.6084933,-0.421733 -1.0331,-0.9271 -1.27382,-1.5161 -0.4145733,0.160667 -0.8425233,0.241 -1.28385,0.241 -1.0030067,0 -1.8589067,-0.3782 -2.5677,-1.1346 -0.7087933,-0.756333 -1.0565033,-1.6499 -1.04313,-2.6807 -0.0134,-0.04 -0.0134,-0.08017 0,-0.1205 l 0,-0.1205 c -0.0134,-0.04013 -0.0134,-0.08028 0,-0.12044 0.0134,-0.04013 0.0134,-0.08029 0,-0.12048 C 1.27052,13.420747 0.81916333,12.942167 0.49151,12.35984 0.16383667,11.77724 0,11.147923 0,10.47189 0,9.79585 0.17719667,9.1398933 0.53159,8.50402 0.88599,7.86814 1.39084,7.3828633 2.04614,7.04819 L 1.96594,6.72691 C 1.8857,6.5261033 1.84558,6.2985267 1.84558,6.04418 1.8188467,5.93708 1.8188467,5.82329 1.84558,5.70281 1.83218,4.68541 2.1732033,3.7951833 2.86865,3.03213 3.56407,2.2690767 4.4266567,1.88755 5.45641,1.88755 c 0.4413267,0 0.8692767,0.08032 1.28385,0.24096 C 6.9943533,1.5261033 7.4156167,1.02075 8.00405,0.61245 8.5924567,0.20415 9.25443,0 9.98997,0 c 1.47108,0 2.56769,0.70950333 3.28983,2.12851 0.3544,-0.16064 0.775667,-0.24096 1.2638,-0.24096 1.003,0 1.855567,0.3748333 2.5577,1.1245 0.702133,0.7496667 1.066567,1.6465867 1.0933,2.69076 -0.01333,0.08032 -0.02,0.19411 -0.02,0.34137 l -0.1203,0.68273 c -0.02667,0.12048 -0.0668,0.2275733 -0.1204,0.32128 0.6018,0.2811267 1.089933,0.7195467 1.4644,1.31526 0.374467,0.59572 0.575067,1.2951867 0.6018,2.0984 -0.02667,0.749667 -0.2072,1.41901 -0.5416,2.00803 -0.334333,0.58902 -0.775667,1.030787 -1.324,1.3253 0.02667,0.05353 0.04,0.09369 0.04,0.12048 l 0.02,0.24094 c -0.02667,0.04 -0.02667,0.08017 0,0.1205 -0.02667,1.070933 -0.394433,1.974567 -1.1033,2.7109 -0.7088,0.736267 -1.558033,1.1044 -2.5477,1.1044"></path>
        <path style="fill:#ffffff;fill-opacity:1;" d="M 13.2598,6.58635 8.42528,11.40562 6.76028,9.71888 C 6.51956,9.5180733 6.28218,9.41767 6.04814,9.41767 5.8141067,9.41767 5.5633567,9.5180733 5.29589,9.71888 5.0952833,10 4.9983267,10.271083 5.00502,10.53213 c 0.00667,0.26104 0.11031,0.471883 0.31093,0.63253 l 2.38716,2.40964 c 0.24072,0.2008 0.5015033,0.3012 0.78235,0.3012 0.28084,0 0.5015,-0.1004 0.66198,-0.3012 l 0.0201,0 5.524341,-5.6675353 C 15.199662,7.3478056 14.827995,6.7252711 14.674931,6.5787563 14.521867,6.4322415 13.835901,6.0147732 13.2598,6.58635 z"></path>
      </svg>
    `;
    userNameDiv.append(userNameVerified);

    const userScreenNameDiv = document.createElement('div');
    userScreenNameDiv.classList.add('eapps-twitter-feed-posts-item-user-screen-name');
    const handleLink2 = document.createElement('a');
    handleLink2.rel = 'nofollow';
    handleLink2.target = '_blank';
    handleLink2.href = tweetLinkCell.querySelector('a')?.href || '#';
    const handleSpan2 = document.createElement('span');
    handleSpan2.textContent = authorHandleCell.textContent.trim();
    handleLink2.append(handleSpan2);
    userScreenNameDiv.append(handleLink2);

    const tweetDateSpan = document.createElement('span');
    tweetDateSpan.classList.add('eapps-twitter-feed-posts-item-user-date');
    tweetDateSpan.textContent = tweetDateCell.textContent.trim();
    userScreenNameDiv.append(tweetDateSpan);
    userNameDiv.append(userScreenNameDiv);
    itemUser.append(userNameDiv);

    const postLinkDiv = document.createElement('div');
    postLinkDiv.classList.add('eapps-twitter-feed-posts-item-user-post');
    const postLink = document.createElement('a');
    postLink.rel = 'nofollow';
    postLink.href = tweetLinkCell.querySelector('a')?.href || '#';
    postLink.target = '_blank';
    postLink.title = 'View on X';
    postLink.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.6424 0.269775H12.5847L8.34131 5.12425L13.3333 11.7301H9.42461L6.36319 7.72369L2.86023 11.7301H0.916753L5.45545 6.53769L0.666626 0.269775H4.67454L7.44179 3.93179L10.6424 0.269775ZM9.96068 10.5664H11.0369L4.08973 1.37232H2.9348L9.96068 10.5664Z"></path>
      </svg>
    `;
    postLinkDiv.append(postLink);
    itemUser.append(postLinkDiv);
    itemInner.append(itemUser);

    const tweetTextDiv = document.createElement('div');
    tweetTextDiv.classList.add('eapps-twitter-feed-posts-item-text');
    tweetTextDiv.innerHTML = tweetTextCell.innerHTML;
    itemInner.append(tweetTextDiv);

    const tweetMedia = document.createElement('div');
    tweetMedia.classList.add(
      'eapps-twitter-feed-posts-item-media',
      'eapps-twitter-feed-posts-item-media-visible',
    );
    tweetMedia.setAttribute('eapps-link', 'media');

    const mediaItems = [tweetImage1Cell, tweetImage2Cell, tweetImage3Cell].filter((cell) =>
      cell.querySelector('picture'),
    );
    if (mediaItems.length > 0) {
      tweetMedia.classList.remove('eapps-twitter-feed-posts-item-media-items-1');
      tweetMedia.classList.add(`eapps-twitter-feed-posts-item-media-items-${mediaItems.length}`);

      mediaItems.forEach((mediaCell) => {
        const mediaItemDiv = document.createElement('div');
        mediaItemDiv.classList.add(
          'eapps-twitter-feed-posts-item-media-item-type-image',
          'eapps-twitter-feed-posts-item-media-item',
        );

        const picture = mediaCell.querySelector('picture');
        if (picture) {
          const img = picture.querySelector('img');
          const mediaLink = document.createElement('a');
          mediaLink.rel = 'nofollow';
          mediaLink.href = tweetLinkCell.querySelector('a')?.href || '#';
          mediaLink.target = '_blank';
          mediaLink.ariaLabel = `Watch ${authorNameCell.textContent.trim()}'s video post on X`;

          const mediaImg = document.createElement('img');
          mediaImg.classList.add('eapps-twitter-feed-posts-item-media-item-image');
          mediaImg.src = img.src;
          mediaImg.alt = img.alt;
          mediaLink.append(mediaImg);

          if (/\.(mp4|webm|ogg|mov)$/i.test(img.src)) {
            const playIcon = document.createElement('svg');
            playIcon.classList.add('eapps-twitter-feed-posts-item-media-item-play-icon');
            playIcon.setAttribute('viewBox', '0 0 24 24');
            playIcon.innerHTML = `
              <g>
                <circle cx="12" cy="12" r="10"></circle>
                <path fill="#FFF" d="M16.036 11.58l-6-3.82a.5.5 0 0 0-.77.42v7.64a.498.498 0 0 0 .77.419l6-3.817c.145-.092.23-.25.23-.422s-.085-.33-.23-.42z"></path>
                <path fill="#FFF" d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path>
              </g>
            `;
            mediaLink.append(playIcon);
          }
          mediaItemDiv.append(mediaLink);
        }
        tweetMedia.append(mediaItemDiv);
      });
    }
    itemInner.append(tweetMedia);

    const tweetLinkDiv = document.createElement('div');
    tweetLinkDiv.classList.add('eapps-twitter-feed-posts-item-link', 'eapps-twitter-feed-posts-item-link-hide');
    tweetLinkDiv.setAttribute('eapps-link', 'link');
    const loaderContainer = document.createElement('div');
    loaderContainer.classList.add('eapps-twitter-feed-posts-item-link-loader-container');
    const loader = document.createElement('div');
    loader.classList.add('eapps-twitter-feed-posts-item-link-loader');
    const loaderInner = document.createElement('div');
    loaderInner.classList.add('eapps-twitter-feed-posts-item-link-loader-inner');
    loader.append(loaderInner);
    loaderContainer.append(loader);
    tweetLinkDiv.append(loaderContainer);
    itemInner.append(tweetLinkDiv);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('eapps-twitter-feed-posts-item-actions');

    const createActionItem = (title, count, iconPath, classes) => {
      const actionLink = document.createElement('a');
      actionLink.rel = 'nofollow';
      actionLink.href = tweetLinkCell.querySelector('a')?.href || '#';
      actionLink.title = title;
      actionLink.classList.add('eapps-twitter-feed-posts-item-actions-item', ...classes);

      const iconDiv = document.createElement('div');
      iconDiv.classList.add('eapps-twitter-feed-posts-item-actions-item-icon');
      const svg = document.createElement('svg');
      svg.setAttribute('width', '18');
      svg.setAttribute('height', '18');
      svg.setAttribute('viewBox', '0 0 18 18');
      svg.innerHTML = iconPath;
      iconDiv.append(svg);
      actionLink.append(iconDiv);

      if (count !== null) {
        const textDiv = document.createElement('div');
        textDiv.classList.add('eapps-twitter-feed-posts-item-actions-item-text');
        textDiv.textContent = count;
        actionLink.append(textDiv);
      }
      return actionLink;
    };

    actionsDiv.append(
      createActionItem(
        'Reply',
        replyCountCell.textContent.trim(),
        '<path d="M13.359 11.545c-.747.632-3.2 2.242-4.458 3.056v-2.098a.493.493 0 0 0-.493-.493H7.146c-2.41 0-4.159-1.63-4.159-3.874 0-2.327 1.822-4.148 4.147-4.148l3.729.006c2.326 0 4.147 1.821 4.149 4.144 0 1.257-.619 2.531-1.653 3.407zM7.136 3C4.255 3 2 5.256 2 8.136c0 2.685 2.079 4.727 4.877 4.851h1.037v2.52a.49.49 0 0 0 .759.416c.174-.111 4.261-2.725 5.324-3.625 1.252-1.06 2-2.612 2.003-4.154-.004-2.886-2.258-5.136-5.134-5.137L7.136 3z"></path>',
        ['eapps-twitter-feed-posts-item-actions-item-comments'],
      ),
    );
    actionsDiv.append(
      createActionItem(
        'Repost',
        repostCountCell.textContent.trim(),
        '<path d="M17.712 11.961a.493.493 0 0 1 0 .698l-2.518 2.517a.491.491 0 0 1-.698 0l-2.517-2.517a.493.493 0 1 1 .698-.698l1.675 1.674V6.468c0-.817-.665-1.481-1.481-1.481H8.494a.494.494 0 1 1 0-.987h4.377a2.471 2.471 0 0 1 2.468 2.468v7.168l1.675-1.675a.493.493 0 0 1 .698 0zm-8.348 2.373a.494.494 0 0 1 0 .988H4.986a2.471 2.471 0 0 1-2.468-2.47V5.686L.843 7.36a.493.493 0 1 1-.698-.698l2.518-2.518a.493.493 0 0 1 .698 0l2.517 2.518a.493.493 0 1 1-.698.698L3.505 5.685v7.168c0 .817.665 1.48 1.48 1.48h4.379z"></path>',
        ['eapps-twitter-feed-posts-item-actions-item-repost'],
      ),
    );
    actionsDiv.append(
      createActionItem(
        'Like',
        likeCountCell.textContent.trim(),
        '<path d="M5.556 4.988c-1.368 0-2.569 1.309-2.569 2.801 0 3.778 4.63 6.632 5.628 6.673.998-.041 5.628-2.895 5.628-6.673 0-1.492-1.201-2.801-2.57-2.801-1.665 0-2.593 1.932-2.602 1.951-.152.371-.761.371-.913 0-.008-.019-.937-1.951-2.602-1.951zM2 7.789C2 5.771 3.662 4 5.556 4c1.508 0 2.522 1.041 3.059 1.797C9.152 5.041 10.165 4 11.673 4c1.895 0 3.557 1.771 3.557 3.789 0 4.197-4.906 7.629-6.606 7.661C6.906 15.418 2 11.986 2 7.789z"></path>',
        ['eapps-twitter-feed-posts-item-actions-item-likes'],
      ),
    );

    const shareDiv = document.createElement('div');
    shareDiv.classList.add('eapps-twitter-feed-posts-item-actions-item', 'eapps-twitter-feed-posts-item-actions-item-share');
    shareDiv.setAttribute('eapps-link', 'share');
    shareDiv.innerHTML = `
      <span class="eapps-twitter-feed-posts-item-actions-item-icon">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path transform="rotate(-90 8.5 8.5)" d="M11.516 4.815l3.342 3.34a.486.486 0 0 1 0 .69l-3.341 3.34a.488.488 0 0 1-.689-.689l2.507-2.508H5.497a.487.487 0 1 1 0-.975h7.838l-2.508-2.508a.488.488 0 0 1 .69-.69zm-4.352 9.21a.488.488 0 0 1 0 .976H3.49A1.493 1.493 0 0 1 2 13.51V3.49C2 2.668 2.668 2 3.49 2h3.674a.488.488 0 0 1 0 .975H3.49a.515.515 0 0 0-.515.515v10.02c0 .285.23.515.515.515h3.674z"></path>
        </svg>
      </span>
      <span class="eapps-twitter-feed-posts-item-actions-item-text">Share</span>
      <div class="eui-popover eui-popover-left">
        <div class="eui-popover-content">
          <div class="eui-popover-content-inner">
            <div class="eui-popover-content-item">
              <div class="eui-popover-content-item-icon">
                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDx0aXRsZT5zb2NpYWwtbmV0d29ya3MvZmFjZWJvb2stbXVsdGljb2xvcjwvdGl0bGU+DQogICAgPGcgaWQ9InNvY2lhbC1uZXR3b3Jrcy9mYWNlYm9vay1tdWx0aWNvbG9yIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGNpcmNsZSBpZD0iaWNvbi1jb2xvciIgZmlsbD0iIzAwNzZGQiIgZmlsbC1ydWxlPSJub256ZXJvIiBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiPjwvY2lyY2xlPg0KICAgICAgICA8cGF0aCBkPSJNMTYuMTY2NjY2Nyw2LjE2NjY2NjY3IEwxNi4xNjY2NjY3LDguODA1NTYyMzUgTDE0LjMyNTA1OTQsOC44MDU1NjIzNSBDMTMuNzQ2MzM2LDguODA1NTYyMzUgMTMuMjc3MTU4MSw5LjI2NzI5MzU4IDEzLjI3NzE1ODEsOS44MzY4MzE0MyBMMTMuMjc3MTU4MSwxMS44NzY3MDU4IEwxNi4xMjA0MDAzLDExLjg3NjcwNTggTDE1LjcyNzQ0NzgsMTQuODExMzM0OSBMMTMuMjc3MTU4MSwxNC44MTEzMzQ5IEwxMy4yNzcyNzExLDIxLjg3Nzc2NzQgQzEyLjc1NjYyMywyMS45NTgyMzE5IDEyLjIyMjk5MjEsMjIgMTEuNjc5NDg3MiwyMiBDMTEuMjEwMDkzNCwyMiAxMC43NDgwNjQ0LDIxLjk2ODg0NjEgMTAuMjk1NDAyOCwyMS45MDg1MTcgTDEwLjI5NTE5OTksMTQuODExMjk0IEw3LjgzMzMzMzMzLDE0LjgyMTEyOTQgTDE3LjgzMzMzMzMzLDE0LjgyMTEyOTQgTDEwLjI5NTE5OTksOS40MTIwOTc1OCBDMTAuMjk1MTk5OSw3LjYxOTY4ODY1IDExLjc3MTY1Niw2LjE2NjY2NjY3IDEzLjU5Mjk3MjUsNi4xNjY2NjY2NyBMMTYuMTY2NjY2Nyw2LjE2NjY2NjY3IFoiIGlkPSJpY29uLWNvbG9yIiBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4NCiAgICA8L2c+DQo8L3N2Zz4=" alt="">
              </div>
              <div class="eui-popover-content-item-title">Share on Facebook</div>
            </div>
            <div class="eui-popover-content-item">
              <div class="eui-popover-content-item-icon">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHBhdGggZD0iTTE3LjQ2MzYgMy40MDQ3NUgyMC4zNzcxTDE0LjAxMiAxMC42ODY1TDIxLjUgMjAuNTk1MkgxNS42MzdMMT EuMDQ0OCAxNC41ODU2TDUuNzkwNDEgMjAuNTk1MkgyLjg3NTE5TDkuNjgzMjQgMTIuODA2NkwyLjUgMy40MDQ3NUg4LjUxMTg3TDEyLjY2MjggOC44OTc3N0wxNy40NjM2IDMuNDA0NzVaTTE2LjQ0MTEgMTguODQ5N0gxOC4wNTU1TDcuNjM0NjYgNS4wNTg1N0g1LjkwMjI2TDE2LjQ0MTEgMTguODQ5N1oiIGZpbGw9ImJsYWNrIi8+DQo8L3N2Zz4NCg==" alt="">
              </div>
              <div class="eui-popover-content-item-title">Share on X</div>
            </div>
          </div>
        </div>
      </div>
    `;
    actionsDiv.append(shareDiv);
    itemInner.append(actionsDiv);

    const itemDate = document.createElement('div');
    itemDate.classList.add('eapps-twitter-feed-posts-item-date');
    itemDate.textContent = tweetDateCell.textContent.trim();
    itemInner.append(itemDate);

    itemDiv.append(itemInner);
    twitterFeedPosts.append(itemDiv);
  });

  twitterFeedInner.append(twitterFeedPosts);

  const twitterFeedPostsShowMore = document.createElement('div');
  twitterFeedPostsShowMore.classList.add('eapps-twitter-feed-posts-show-more', 'eapps-twitter-feed-posts-show-more-hide');
  twitterFeedPostsShowMore.setAttribute('eapps-link', 'more');
  twitterFeedPostsShowMore.textContent = 'Load more Posts';

  const showMoreLoaderContainer = document.createElement('div');
  showMoreLoaderContainer.classList.add('eapps-twitter-feed-posts-show-more-loader-container');
  const showMoreLoader = document.createElement('div');
  showMoreLoader.classList.add('eapps-twitter-feed-posts-show-more-loader');
  const showMoreLoaderInner = document.createElement('div');
  showMoreLoaderInner.classList.add('eapps-twitter-feed-posts-show-more-loader-inner');
  showMoreLoader.append(showMoreLoaderInner);
  showMoreLoaderContainer.append(showMoreLoader);
  twitterFeedPostsShowMore.append(showMoreLoaderContainer);
  twitterFeedInner.append(twitterFeedPostsShowMore);

  const twitterFeedError = document.createElement('div');
  twitterFeedError.classList.add('eapps-twitter-feed-error');
  twitterFeedError.setAttribute('eapps-link', 'error');
  twitterFeedInner.append(twitterFeedError);

  const twitterFeedLoaderContainer = document.createElement('div');
  twitterFeedLoaderContainer.classList.add('eapps-twitter-feed-loader-container', 'eapps-loader-container', 'eapps-loader-hide');
  twitterFeedLoaderContainer.setAttribute('eapps-link', 'loader');
  const twitterFeedLoader = document.createElement('div');
  twitterFeedLoader.classList.add('eapps-loader');
  const twitterFeedLoaderInner = document.createElement('div');
  twitterFeedLoaderInner.classList.add('eapps-loader-inner');
  twitterFeedLoader.append(twitterFeedLoaderInner);
  twitterFeedLoaderContainer.append(twitterFeedLoader);
  twitterFeedInner.append(twitterFeedLoaderContainer);

  elfsightApp.append(twitterFeedInner);
  twitterSlides.append(elfsightApp);
  flickitySliderWrap.append(twitterSlides);

  const storySlides = document.createElement('div');
  storySlides.classList.add('slides');

  storyItemRows.forEach((row) => {
    const [
      imageCell,
      imageHorizontalCell,
      imageVerticalCell,
      categoryCell,
      summaryCell,
      linkCell,
      linkLabelCell,
      dateCell,
    ] = [...row.children];

    const wrapDiv = document.createElement('div');
    wrapDiv.classList.add('wrap');
    moveInstrumentation(row, wrapDiv);

    const imageWrap = document.createElement('div');
    imageWrap.classList.add('image-wrap');
    const img = document.createElement('img');
    img.classList.add('thumb-img', 'img-fluid');
    img.loading = 'lazy';

    const picture = imageCell.querySelector('picture');
    if (picture) {
      const sourceImg = picture.querySelector('img');
      img.src = sourceImg.src;
      img.alt = sourceImg.alt;
    }

    const horizontalPicture = imageHorizontalCell.querySelector('picture');
    if (horizontalPicture) {
      const sourceImg = horizontalPicture.querySelector('img');
      img.setAttribute('data-img-horizontal', sourceImg.src);
    }

    const verticalPicture = imageVerticalCell.querySelector('picture');
    if (verticalPicture) {
      const sourceImg = verticalPicture.querySelector('img');
      img.setAttribute('data-img-vertical', sourceImg.src);
    }

    imageWrap.append(img);
    wrapDiv.append(imageWrap);

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('content-wrap');

    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    categoryDiv.textContent = categoryCell.textContent.trim();
    contentWrap.append(categoryDiv);

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');
    textDiv.textContent = summaryCell.textContent.trim();
    contentWrap.append(textDiv);

    const linkAnchor = document.createElement('a');
    linkAnchor.classList.add('btn', 'btn-link');
    linkAnchor.href = linkCell.querySelector('a')?.href || '#';
    linkAnchor.textContent = linkLabelCell.textContent.trim();
    contentWrap.append(linkAnchor);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date');
    const time = document.createElement('time');
    time.setAttribute('datetime', '2026-04-27T12:00:00Z'); // Placeholder, actual date from model
    time.textContent = dateCell.textContent.trim();
    dateDiv.append(time);
    contentWrap.append(dateDiv);

    wrapDiv.append(contentWrap);
    storySlides.append(wrapDiv);
  });

  flickitySliderWrap.append(storySlides);
  container.append(flickitySliderWrap);
  section.append(container);

  block.replaceChildren(section);

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Swiper initialization (assuming flickity-slider-mobile-wrap implies Swiper)
  // Check if flickity-slider-mobile-wrap is meant to be a Swiper container
  const swiperEl = block.querySelector('.flickity-slider-mobile-wrap');
  if (swiperEl) {
    await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
    await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

    // Create navigation and pagination elements if they don't exist
    let prevBtn = swiperEl.querySelector('.swiper-button-prev');
    let nextBtn = swiperEl.querySelector('.swiper-button-next');
    let paginationEl = swiperEl.querySelector('.swiper-pagination');

    if (!prevBtn) {
      prevBtn = document.createElement('div');
      prevBtn.classList.add('swiper-button-prev');
      swiperEl.append(prevBtn);
    }
    if (!nextBtn) {
      nextBtn = document.createElement('div');
      nextBtn.classList.add('swiper-button-next');
      swiperEl.append(nextBtn);
    }
    if (!paginationEl) {
      paginationEl = document.createElement('div');
      paginationEl.classList.add('swiper-pagination');
      swiperEl.append(paginationEl);
    }

    // eslint-disable-next-line no-undef
    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      loop: swiperEl.dataset.flickity?.includes('"wrapAround": true') || false, // Derive from data-flickity
      navigation: { prevEl: prevBtn, nextEl: nextBtn },
      pagination: { el: paginationEl, clickable: true },
    });
  }
}
