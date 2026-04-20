import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];
  const headingRow = children.shift();
  const headingText = headingRow.textContent.trim();

  const section = document.createElement('section');
  section.classList.add('section', 'grey-bg', 'latest-stories', 'home-stories');
  moveInstrumentation(block, section);

  const sectionHeader = document.createElement('div');
  sectionHeader.classList.add('section-header', 'text-center');

  const heading = document.createElement('h2');
  heading.classList.add('heading', 'font-regular', 'aos-init', 'aos-animate');
  heading.textContent = headingText;
  sectionHeader.append(heading);
  section.append(sectionHeader);

  const container = document.createElement('div');
  container.classList.add('container', 'aos-init', 'aos-animate');

  const flickitySliderWrap = document.createElement('div');
  flickitySliderWrap.classList.add('flickity-slider-mobile-wrap', 'grid-layout');

  const twitterFeedSlides = document.createElement('div');
  twitterFeedSlides.classList.add('slides');

  const twitterFeedContainer = document.createElement('div');
  twitterFeedContainer.classList.add('elfsight-app-81878be6-2fc1-4ba6-b776-5fb962097235', 'eapps-twitter-feed', 'eapps-twitter-feed-source-user', 'eapps-twitter-feed-color-scheme--dark');

  const twitterFeedInner = document.createElement('div');
  twitterFeedInner.classList.add('eapps-twitter-feed-container', 'eapps-twitter-feed-post-x-icon-hide', 'eapps-twitter-feed-post-reply-hide', 'eapps-twitter-feed-post-repost-hide', 'eapps-twitter-feed-post-like-hide', 'eapps-twitter-feed-post-share-button-hide', 'eapps-twitter-feed-small', 'eapps-twitter-feed-hide-header');

  const twitterFeedPosts = document.createElement('div');
  twitterFeedPosts.classList.add('eapps-twitter-feed-posts');

  const twitterFeedPostsContainer = document.createElement('div');
  twitterFeedPostsContainer.classList.add('eapps-twitter-feed-posts-container');

  const twitterFeedPostsInner = document.createElement('div');
  twitterFeedPostsInner.classList.add('eapps-twitter-feed-posts-inner', 'shuffle');

  const storiesCardsSlides = document.createElement('div'); // Create slides div for stories cards once
  storiesCardsSlides.classList.add('slides');

  children.forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 11) { // Twitter Feed Item
      const [
        userImageCell,
        userNameCell,
        userScreenNameCell,
        userVerifiedCell,
        postDateCell,
        postTextCell,
        mediaImageCell,
        postLinkCell,
        replyCountCell,
        repostCountCell,
        likeCountCell,
      ] = cells;

      const postItem = document.createElement('div');
      postItem.classList.add('eapps-twitter-feed-posts-item', 'eapps-twitter-feed-posts-item-media-items-1', 'eapps-twitter-feed-posts-item-media-show', 'eapps-twitter-feed-posts-item-show', 'shuffle-item', 'shuffle-item--visible');

      const postItemInner = document.createElement('div');
      postItemInner.classList.add('eapps-twitter-feed-posts-item-inner');

      const userDiv = document.createElement('div');
      userDiv.classList.add('eapps-twitter-feed-posts-item-user');

      const userLink = document.createElement('a');
      userLink.rel = 'nofollow';
      userLink.target = '_blank';
      userLink.href = postLinkCell.querySelector('a')?.href || '#';

      const userImageContainer = document.createElement('div');
      userImageContainer.classList.add('eapps-twitter-feed-posts-item-user-image-container');

      const userImage = userImageCell.querySelector('picture');
      if (userImage) {
        const img = userImage.querySelector('img');
        const optimizedUserPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
        moveInstrumentation(userImage, optimizedUserPic.querySelector('img'));
        userImageContainer.append(optimizedUserPic);
      }
      userLink.append(userImageContainer);
      userDiv.append(userLink);

      const userNameDiv = document.createElement('div');
      userNameDiv.classList.add('eapps-twitter-feed-posts-item-user-name');

      const userNameLink = document.createElement('a');
      userNameLink.rel = 'nofollow';
      userNameLink.target = '_blank';
      userNameLink.href = postLinkCell.querySelector('a')?.href || '#';
      userNameLink.innerHTML = `<span>${userNameCell.textContent.trim()}</span>`;
      if (userVerifiedCell.textContent.trim() === 'true') {
        const verifiedSpan = document.createElement('span');
        verifiedSpan.classList.add('eapps-twitter-feed-posts-item-user-name-verified');
        verifiedSpan.title = 'Verified account';
        verifiedSpan.innerHTML = '<img alt="svg file" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'currentColor\'%3E%3Cpath d=\'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\'/%3E%3C/svg%3E"/>';
        userNameLink.append(verifiedSpan);
      }
      userNameDiv.append(userNameLink);

      const userScreenNameDiv = document.createElement('div');
      userScreenNameDiv.classList.add('eapps-twitter-feed-posts-item-user-screen-name');
      const screenNameLink = document.createElement('a');
      screenNameLink.rel = 'nofollow';
      screenNameLink.target = '_blank';
      screenNameLink.href = postLinkCell.querySelector('a')?.href || '#';
      screenNameLink.innerHTML = `<span>${userScreenNameCell.textContent.trim()}</span>`;
      const postDateSpan = document.createElement('span');
      postDateSpan.classList.add('eapps-twitter-feed-posts-item-user-date');
      postDateSpan.textContent = postDateCell.textContent.trim();
      screenNameLink.append(postDateSpan);
      userScreenNameDiv.append(screenNameLink);
      userNameDiv.append(userScreenNameDiv);
      userDiv.append(userNameDiv);

      const postTextDiv = document.createElement('div');
      postTextDiv.classList.add('eapps-twitter-feed-posts-item-text');
      postTextDiv.innerHTML = postTextCell.innerHTML;

      const mediaDiv = document.createElement('div');
      mediaDiv.classList.add('eapps-twitter-feed-posts-item-media', 'eapps-twitter-feed-posts-item-media-visible');
      const mediaItem = document.createElement('div');
      mediaItem.classList.add('eapps-twitter-feed-posts-item-media-item-type-image', 'eapps-twitter-feed-posts-item-media-item');

      const mediaImage = mediaImageCell.querySelector('picture');
      if (mediaImage) {
        const img = mediaImage.querySelector('img');
        const mediaLink = document.createElement('a');
        mediaLink.rel = 'nofollow';
        mediaLink.href = postLinkCell.querySelector('a')?.href || '#';
        mediaLink.target = '_blank';
        mediaLink.ariaLabel = `Watch ${userNameCell.textContent.trim()}'s video post on X`;

        const optimizedMediaPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedMediaPic.querySelector('img'));
        mediaLink.append(optimizedMediaPic);
        mediaLink.innerHTML += '<img alt="svg file" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'currentColor\'%3E%3Cpath d=\'M8 5v14l11-7z\'/%3E%3C/svg%3E"/>';
        mediaItem.append(mediaLink);
      }
      mediaDiv.append(mediaItem);

      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('eapps-twitter-feed-posts-item-actions');

      const replyLink = document.createElement('a');
      replyLink.rel = 'nofollow';
      replyLink.href = postLinkCell.querySelector('a')?.href || '#';
      replyLink.title = 'Reply';
      replyLink.classList.add('eapps-twitter-feed-posts-item-actions-item', 'eapps-twitter-feed-posts-item-actions-item-comments');
      replyLink.innerHTML = '<div class="eapps-twitter-feed-posts-item-actions-item-icon"><img alt="svg file" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'currentColor\'%3E%3Cpath d=\'M18 10h-4V6c0-1.1-.9-2-2-2s-2 .9-2 2v4H6c-1.1 0-2 .9-2 2s.9 2 2 2h4v4c0 1.1.9 2 2 2s2-.9 2-2v-4h4c1.1 0 2-.9 2-2s-.9-2-2-2z\'/%3E%3C/svg%3E"/></div>';
      actionsDiv.append(replyLink);

      const repostLink = document.createElement('a');
      repostLink.rel = 'nofollow';
      repostLink.href = postLinkCell.querySelector('a')?.href || '#';
      repostLink.title = 'Repost';
      repostLink.classList.add('eapps-twitter-feed-posts-item-actions-item', 'eapps-twitter-feed-posts-item-actions-item-repost');
      repostLink.innerHTML = `<div class="eapps-twitter-feed-posts-item-actions-item-icon"><img alt="svg file" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'currentColor\'%3E%3Cpath d=\'M17 12l-4-4v3H7v2h6v3l4-4zM7 16V8l-4 4 4 4zm10-4V8l4 4-4 4z\'/%3E%3C/svg%3E"/></div><div class="eapps-twitter-feed-posts-item-actions-item-text">${repostCountCell.textContent.trim()}</div>`;
      actionsDiv.append(repostLink);

      const likeLink = document.createElement('a');
      likeLink.rel = 'nofollow';
      likeLink.href = postLinkCell.querySelector('a')?.href || '#';
      likeLink.title = 'Like';
      likeLink.classList.add('eapps-twitter-feed-posts-item-actions-item', 'eapps-twitter-feed-posts-item-actions-item-likes');
      likeLink.innerHTML = `<div class="eapps-twitter-feed-posts-item-actions-item-icon"><img alt="svg file" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'currentColor\'%3E%3Cpath d=\'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\'/%3E%3C/svg%3E"/></div><div class="eapps-twitter-feed-posts-item-actions-item-text">${likeCountCell.textContent.trim()}</div>`;
      actionsDiv.append(likeLink);

      postItemInner.append(userDiv, postTextDiv, mediaDiv, actionsDiv);
      postItem.append(postItemInner);
      twitterFeedPostsInner.append(postItem);
    } else if (cells.length === 5) { // Stories Card
      const [imageCell, categoryCell, textCell, linkCell, dateCell] = cells;

      const wrap = document.createElement('div');
      wrap.classList.add('wrap');

      const imageWrap = document.createElement('div');
      imageWrap.classList.add('image-wrap');
      const picture = imageCell.querySelector('picture');
      if (picture) {
        const img = picture.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
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
      textDiv.textContent = textCell.textContent.trim();
      contentWrap.append(textDiv);

      const link = document.createElement('a');
      link.classList.add('btn', 'btn-link');
      link.href = linkCell.querySelector('a')?.href || '#';
      link.textContent = 'Read more';
      contentWrap.append(link);

      const dateDiv = document.createElement('div');
      dateDiv.classList.add('date');
      const time = document.createElement('time');
      time.datetime = dateCell.textContent.trim(); // Assuming dateCell content is a valid datetime string
      time.textContent = dateCell.textContent.trim();
      dateDiv.append(time);
      contentWrap.append(dateDiv);

      wrap.append(contentWrap);

      moveInstrumentation(row, wrap);
      storiesCardsSlides.append(wrap); // Append to the single storiesCardsSlides div
    }
  });

  twitterFeedPostsContainer.append(twitterFeedPostsInner);
  twitterFeedPosts.append(twitterFeedPostsContainer);
  twitterFeedInner.append(twitterFeedPosts);
  twitterFeedContainer.append(twitterFeedInner);
  twitterFeedSlides.append(twitterFeedContainer);
  flickitySliderWrap.prepend(twitterFeedSlides);
  flickitySliderWrap.append(storiesCardsSlides); // Append the stories cards slides after twitter feed
  container.append(flickitySliderWrap);
  section.append(container);

  block.replaceWith(section);
}
