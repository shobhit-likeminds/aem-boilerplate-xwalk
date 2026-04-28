import { createOptimizedPicture, loadScript, loadCSS } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const children = [...block.children];
  const sectionHeadingRow = children[0];
  const itemRows = children.slice(1);

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

  // Flickity is not supported, replacing with Swiper.js
  // The original HTML uses 'flickity-slider-mobile-wrap' and 'slides' for the main container and items.
  // We will map these to Swiper's structure.
  const swiperContainer = document.createElement('div');
  swiperContainer.classList.add('flickity-slider-mobile-wrap', 'grid-layout', 'swiper'); // Add 'swiper' class
  // The data-flickity attribute is replaced by Swiper initialization
  // We will extract data-aos attributes from the original block if present
  if (block.dataset.aos) swiperContainer.dataset.aos = block.dataset.aos;
  if (block.dataset.aosOffset) swiperContainer.dataset.aosOffset = block.dataset.aosOffset;
  if (block.dataset.aosDuration) swiperContainer.dataset.aosDuration = block.dataset.aosDuration;
  if (block.dataset.aosEasing) swiperContainer.dataset.aosEasing = block.dataset.aosEasing;


  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('slides', 'swiper-wrapper'); // Map 'slides' to 'swiper-wrapper'

  // Swiper navigation and pagination elements
  const swiperPrevButton = document.createElement('div');
  swiperPrevButton.classList.add('swiper-button-prev');
  const swiperNextButton = document.createElement('div');
  swiperNextButton.classList.add('swiper-button-next');
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination');

  itemRows.forEach((row) => {
    const cells = [...row.children];
    // Determine item type based on cell count as per BlockJson
    const isTweetItem = cells.length === 16;
    const isNewsStoryItem = cells.length === 8;

    if (isTweetItem) {
      const tweetWrapper = document.createElement('div');
      tweetWrapper.classList.add('elfsight-app-81878be6-2fc1-4ba6-b776-5fb962097235', 'eapps-twitter-feed', 'eapps-twitter-feed-source-user', 'eapps-twitter-feed-color-scheme--dark', 'swiper-slide'); // Add swiper-slide
      tweetWrapper.setAttribute('data-elfsight-app-lazy', '');
      tweetWrapper.id = 'eapps-twitter-feed-1';
      moveInstrumentation(row, tweetWrapper);

      const [
        profileBannerCell,
        profileImageCell,
        profileNameCell,
        profileScreenNameCell,
        profileLinkCell,
        verifiedIconCell,
        followIconCell,
        followLabelCell,
        followLinkCell,
        postsLabelCell,
        postsCountCell,
        followingLabelCell,
        followingCountCell,
        followersLabelCell,
        followersCountCell,
        tweetPostsContainerCell, // This cell is a container for tweet-post-item rows
      ] = cells;

      const eappsTwitterFeedContainer = document.createElement('div');
      eappsTwitterFeedContainer.classList.add('eapps-twitter-feed-container', 'eapps-twitter-feed-post-x-icon-hide', 'eapps-twitter-feed-post-reply-hide', 'eapps-twitter-feed-post-repost-hide', 'eapps-twitter-feed-post-like-hide', 'eapps-twitter-feed-post-share-button-hide', 'eapps-twitter-feed-small', 'eapps-twitter-feed-hide-header');
      eappsTwitterFeedContainer.setAttribute('eapps-link', 'app');

      const eappsTwitterFeedTitle = document.createElement('div');
      eappsTwitterFeedTitle.classList.add('eapps-twitter-feed-title');
      eappsTwitterFeedTitle.setAttribute('eapps-link', 'title');
      eappsTwitterFeedTitle.innerHTML = '<div class="eui-widget-title es-widget-title" style="display: none;"></div>';
      eappsTwitterFeedContainer.append(eappsTwitterFeedTitle);

      const eappsTwitterFeedInner = document.createElement('div');
      eappsTwitterFeedInner.classList.add('eapps-twitter-feed-inner');

      const eappsTwitterFeedHeader = document.createElement('div');
      eappsTwitterFeedHeader.classList.add('eapps-twitter-feed-header', 'eapps-twitter-feed-header-show');
      eappsTwitterFeedHeader.setAttribute('eapps-link', 'header');
      const eappsTwitterFeedHeaderInner = document.createElement('div');
      eappsTwitterFeedHeaderInner.classList.add('eapps-twitter-feed-header-inner');

      const bannerContainer = document.createElement('div');
      bannerContainer.classList.add('eapps-twitter-feed-header-banner-container');
      const profileBannerImg = profileBannerCell.querySelector('picture');
      if (profileBannerImg) {
        const optimizedPic = createOptimizedPicture(profileBannerImg.querySelector('img').src, profileBannerImg.querySelector('img').alt, false, [{ width: '750' }]);
        moveInstrumentation(profileBannerImg, optimizedPic.querySelector('img'));
        bannerContainer.append(optimizedPic);
      }
      eappsTwitterFeedHeaderInner.append(bannerContainer);

      const userHeader = document.createElement('div');
      userHeader.classList.add('eapps-twitter-feed-header-user');

      const profileLink = document.createElement('a');
      profileLink.rel = 'nofollow';
      profileLink.target = '_blank';
      profileLink.classList.add('eapps-twitter-feed-header-user-image-container');
      const profileLinkHref = profileLinkCell.querySelector('a')?.href;
      if (profileLinkHref) profileLink.href = profileLinkHref;

      const profileImage = profileImageCell.querySelector('picture');
      if (profileImage) {
        const optimizedPic = createOptimizedPicture(profileImage.querySelector('img').src, profileImage.querySelector('img').alt, false, [{ width: '768' }]);
        moveInstrumentation(profileImage, optimizedPic.querySelector('img'));
        profileLink.append(optimizedPic);
      }
      userHeader.append(profileLink);

      const userInfo = document.createElement('div');
      userInfo.classList.add('eapps-twitter-feed-header-user-info');

      const userInfoNameWrapper = document.createElement('div');
      userInfoNameWrapper.classList.add('eapps-twitter-feed-header-user-info-name-wrapper');

      const userInfoName = document.createElement('div');
      userInfoName.classList.add('eapps-twitter-feed-header-user-info-name');
      const profileNameLink = document.createElement('a');
      profileNameLink.rel = 'nofollow';
      profileNameLink.target = '_blank';
      if (profileLinkHref) profileNameLink.href = profileLinkHref;
      profileNameLink.textContent = profileNameCell.textContent.trim();

      const verifiedIcon = verifiedIconCell.querySelector('picture');
      if (verifiedIcon) {
        const span = document.createElement('span');
        span.classList.add('eapps-twitter-feed-header-user-info-name-verified-container');
        span.title = 'Verified account';
        const optimizedPic = createOptimizedPicture(verifiedIcon.querySelector('img').src, verifiedIcon.querySelector('img').alt, false, [{ width: '24' }]);
        moveInstrumentation(verifiedIcon, optimizedPic.querySelector('img'));
        span.append(optimizedPic);
        profileNameLink.append(span);
      }
      userInfoName.append(profileNameLink);
      userInfoNameWrapper.append(userInfoName);

      const userInfoScreenName = document.createElement('div');
      userInfoScreenName.classList.add('eapps-twitter-feed-header-user-info-screen-name');
      const screenNameLink = document.createElement('a');
      screenNameLink.rel = 'nofollow';
      screenNameLink.target = '_blank';
      if (profileLinkHref) screenNameLink.href = profileLinkHref;
      screenNameLink.textContent = profileScreenNameCell.textContent.trim();
      userInfoScreenName.append(screenNameLink);
      userInfoNameWrapper.append(userInfoScreenName);
      userInfo.append(userInfoNameWrapper);

      const followLink = document.createElement('a');
      followLink.rel = 'nofollow';
      followLink.target = '_blank';
      followLink.setAttribute('eapps-link', 'follow');
      followLink.classList.add('eapps-twitter-feed-header-user-info-follow');
      const followLinkHref = followLinkCell.querySelector('a')?.href;
      if (followLinkHref) followLink.href = followLinkHref;

      const followIcon = followIconCell.querySelector('picture');
      if (followIcon) {
        const optimizedPic = createOptimizedPicture(followIcon.querySelector('img').src, followIcon.querySelector('img').alt, false, [{ width: '24' }]);
        moveInstrumentation(followIcon, optimizedPic.querySelector('img'));
        followLink.append(optimizedPic);
      }

      const followLabel = document.createElement('span');
      followLabel.classList.add('eapps-twitter-feed-header-user-info-follow-label');
      followLabel.textContent = followLabelCell.textContent.trim();
      followLink.append(followLabel);
      userInfo.append(followLink);
      userHeader.append(userInfo);
      eappsTwitterFeedHeaderInner.append(userHeader);

      const statistics = document.createElement('div');
      statistics.classList.add('eapps-twitter-feed-header-statistics');

      const createStatItem = (labelCell, countCell, className) => {
        const item = document.createElement('div');
        item.classList.add(className, 'eapps-twitter-feed-header-statistics-item');
        const name = document.createElement('div');
        name.classList.add('eapps-twitter-feed-header-statistics-item-name');
        name.textContent = labelCell.textContent.trim();
        const data = document.createElement('div');
        data.classList.add('eapps-twitter-feed-header-statistics-item-data');
        data.textContent = countCell.textContent.trim();
        item.append(name, data);
        return item;
      };

      statistics.append(createStatItem(postsLabelCell, postsCountCell, 'eapps-twitter-feed-header-statistics-posts'));
      statistics.append(createStatItem(followingLabelCell, followingCountCell, 'eapps-twitter-feed-header-statistics-following'));
      statistics.append(createStatItem(followersLabelCell, followersCountCell, 'eapps-twitter-feed-header-statistics-followers'));
      eappsTwitterFeedHeaderInner.append(statistics);
      eappsTwitterFeedHeader.append(eappsTwitterFeedHeaderInner);
      eappsTwitterFeedInner.append(eappsTwitterFeedHeader);

      const tweetPosts = document.createElement('div');
      tweetPosts.classList.add('eapps-twitter-feed-posts');
      tweetPosts.setAttribute('eapps-link', 'posts');
      tweetPosts.style.maxHeight = 'none';

      const tweetPostsContainer = document.createElement('div');
      tweetPostsContainer.classList.add('eapps-twitter-feed-posts-container');
      tweetPostsContainer.setAttribute('eapps-link', 'postsContainer');
      tweetPostsContainer.style.maxHeight = 'none';

      const tweetPostsInner = document.createElement('div');
      tweetPostsInner.classList.add('eapps-twitter-feed-posts-inner', 'shuffle');
      tweetPostsInner.setAttribute('eapps-link', 'posts');
      tweetPostsInner.style.cssText = 'position: relative; overflow: hidden; height: auto; transition: height 100ms cubic-bezier(0.4, 0, 0.2, 1); transition-property: transform, opacity;';

      // The `tweetPostsContainerCell` is a container field for `tweet-post-item`s.
      // We need to iterate over subsequent rows in `block.children` that correspond to `tweet-post-item`.
      // The current logic assumes `tweetPostsContainerCell` itself contains the content, which is incorrect.
      // We need to find the actual `tweet-post-item` rows.
      // For this block, the `tweet-item` rows are followed by other `tweet-item` or `news-story-item` rows.
      // The BlockJson indicates `tweetPosts` is a container of `tweet-post-item`.
      // This means individual tweet posts should be separate rows in the block.children,
      // but the provided EDS BLOCK STRUCTURE does not show them.
      // Given the original HTML has hardcoded tweet structures, and the BlockJson implies
      // `tweet-post-item`s are separate, we must assume they are part of `itemRows`
      // and need to be distinguished.
      // For now, we'll use the `tweetPostsContainerCell` as a placeholder for the content
      // if it were a richtext field, but since it's a container, it should be empty.
      // The original HTML shows multiple `.eapps-twitter-feed-posts-item` divs.
      // Since the block structure doesn't provide `tweet-post-item` rows, we cannot
      // dynamically generate them from block data. We will create a placeholder.

      // If the `tweetPostsContainerCell` contained actual HTML for tweets, we would use innerHTML.
      // As it is, it's just a placeholder text "Tweet Posts value".
      // We will add a placeholder div for where individual tweet posts would go.
      const tweetPostsPlaceholder = document.createElement('div');
      tweetPostsPlaceholder.classList.add('tweet-posts-placeholder');
      tweetPostsPlaceholder.textContent = tweetPostsContainerCell.textContent.trim(); // Use the placeholder text
      tweetPostsInner.append(tweetPostsPlaceholder);

      tweetPostsContainer.append(tweetPostsInner);
      tweetPosts.append(tweetPostsContainer);
      eappsTwitterFeedInner.append(tweetPosts);

      const errorDiv = document.createElement('div');
      errorDiv.classList.add('eapps-twitter-feed-error');
      errorDiv.setAttribute('eapps-link', 'error');
      eappsTwitterFeedInner.append(errorDiv);

      const loaderContainer = document.createElement('div');
      loaderContainer.classList.add('eapps-twitter-feed-loader-container', 'eapps-loader-container', 'eapps-loader-hide');
      loaderContainer.setAttribute('eapps-link', 'loader');
      loaderContainer.innerHTML = '<div class="eapps-loader"><div class="eapps-loader-inner"></div></div>';
      eappsTwitterFeedInner.append(loaderContainer);

      eappsTwitterFeedContainer.append(eappsTwitterFeedInner);
      tweetWrapper.append(eappsTwitterFeedContainer);
      swiperWrapper.append(tweetWrapper); // Append to swiperWrapper
    } else if (isNewsStoryItem) {
      const [
        imageCell,
        imageHorizontalCell,
        imageVerticalCell,
        categoryCell,
        storyTextCell,
        storyLinkCell,
        storyLinkLabelCell,
        storyDateCell,
      ] = cells;

      const slideDiv = document.createElement('div');
      slideDiv.classList.add('slides', 'swiper-slide'); // Add swiper-slide
      moveInstrumentation(row, slideDiv);

      const wrapDiv = document.createElement('div');
      wrapDiv.classList.add('wrap');

      const imageWrap = document.createElement('div');
      imageWrap.classList.add('image-wrap');
      const imagePicture = imageCell.querySelector('picture');
      if (imagePicture) {
        const img = imagePicture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('thumb-img', 'img-fluid');
        optimizedPic.querySelector('img').setAttribute('data-img-horizontal', imageHorizontalCell.querySelector('picture')?.querySelector('img')?.src || '');
        optimizedPic.querySelector('img').setAttribute('data-img-vertical', imageVerticalCell.querySelector('picture')?.querySelector('img')?.src || '');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrap.append(optimizedPic);
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

      const link = document.createElement('a');
      link.classList.add('btn', 'btn-link');
      const storyLinkHref = storyLinkCell.querySelector('a')?.href;
      if (storyLinkHref) {
        link.href = storyLinkHref;
      }
      link.textContent = storyLinkLabelCell.textContent.trim();
      contentWrap.append(link);

      const dateDiv = document.createElement('div');
      dateDiv.classList.add('date');
      const time = document.createElement('time');
      time.datetime = storyDateCell.textContent.trim(); // Assuming date is in a parseable format
      time.textContent = storyDateCell.textContent.trim();
      dateDiv.append(time);
      contentWrap.append(dateDiv);

      wrapDiv.append(contentWrap);
      slideDiv.append(wrapDiv);
      swiperWrapper.append(slideDiv); // Append to swiperWrapper
    }
  });

  swiperContainer.append(swiperWrapper);
  swiperContainer.append(swiperPagination); // Add pagination
  swiperContainer.append(swiperPrevButton); // Add prev button
  swiperContainer.append(swiperNextButton); // Add next button

  container.append(swiperContainer);
  section.append(container);

  block.replaceChildren(section);

  // Load Swiper.js CSS and JS
  await loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');
  await loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');

  // Initialize Swiper
  // eslint-disable-next-line no-undef
  new Swiper(swiperContainer, {
    slidesPerView: 'auto',
    loop: false, // data-flickity="wrapAround": false
    navigation: {
      prevEl: swiperPrevButton,
      nextEl: swiperNextButton,
    },
    pagination: {
      el: swiperPagination,
      clickable: true, // data-flickity="pageDots": true
    },
    // Other Flickity options mapped to Swiper:
    // lazyLoad: true -> handled by Swiper's lazy loading if img has data-src
    // imagesLoaded: true -> Swiper handles this internally
    // cellAlign: 'left' -> default for Swiper slidesPerView: 'auto'
    // watchCSS: true -> Swiper's default responsive behavior
    // adaptiveHeight: true -> Swiper has autoHeight: true
    autoHeight: true,
  });

  // Image optimization - this part is already correct, but ensure it runs after Swiper init if needed
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
