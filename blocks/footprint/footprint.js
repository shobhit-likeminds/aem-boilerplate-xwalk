import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [titleRow, ...itemRows] = [...block.children];

  const cmpOurFootPrint = document.createElement('div');
  cmpOurFootPrint.classList.add('cmp-our-foot-print');

  // Title
  if (titleRow) {
    const cmpOurFootPrintHeader = document.createElement('div');
    cmpOurFootPrintHeader.classList.add('cmp-our-foot-print__header');
    const title = document.createElement('h2');
    title.classList.add('cmp-our-foot-print__title');
    moveInstrumentation(titleRow.firstElementChild, title);
    title.append(...titleRow.firstElementChild.childNodes);
    cmpOurFootPrintHeader.append(title);
    cmpOurFootPrint.append(cmpOurFootPrintHeader);
  }

  // Content for items
  const cmpOurFootPrintContent = document.createElement('div');
  cmpOurFootPrintContent.classList.add('cmp-our-foot-print__content');

  const cmpCarousel = document.createElement('div');
  cmpCarousel.classList.add('cmp-carousel');
  cmpCarousel.setAttribute('data-component', 'carousel');
  cmpCarousel.setAttribute('data-show-infinite-scroll', 'false');
  cmpCarousel.setAttribute('data-show-arrows', 'false');
  cmpCarousel.setAttribute('data-show-dots', 'true');
  cmpCarousel.setAttribute('data-item-count-per-slide', '1');
  cmpCarousel.setAttribute('data-auto-play-is-enabled', 'false');
  cmpCarousel.setAttribute('data-auto-play-speed-in-ms', '500');
  cmpCarousel.setAttribute('data-reveal-next-item-partially', 'false');
  cmpCarousel.setAttribute('data-show-center-zoom', 'false');
  cmpCarousel.setAttribute('data-slides-to-scroll', '1');
  cmpCarousel.setAttribute('data-initialized', 'true');


  const cmpCarouselContainer = document.createElement('div');
  cmpCarouselContainer.classList.add('cmp-carousel__container', 'slick-initialized', 'slick-slider');

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.style.opacity = '1';
  slickTrack.style.width = `${itemRows.length * 100}%`; // Adjust width dynamically
  slickTrack.style.transform = 'translate3d(0px, 0px, 0px)';

  itemRows.forEach((row, index) => {
    const item = document.createElement('div');
    item.classList.add('cmp-our-foot-print__carousel-item', 'cmp-carousel__item', `cmp-our-foot-print-carouselcard-index-${index}`, 'slick-slide');
    item.setAttribute('data-slick-index', index);
    item.setAttribute('aria-hidden', index !== 0);
    item.setAttribute('tabindex', index === 0 ? '0' : '-1');
    item.style.width = `${100 / itemRows.length}%`; // Distribute width equally
    if (index === 0) {
      item.classList.add('slick-current', 'slick-active');
    }
    moveInstrumentation(row, item);

    const cardWrapper = document.createElement('div');
    cardWrapper.classList.add('item');

    const card = document.createElement('div');
    card.classList.add('card', 'cmp-card--foot-print');
    // Apply background color based on index or content if needed, for now use default/highlighted
    if (index === 0) {
      card.classList.add('cmp-card--foot-print-highlighted', 'color-background-background-2');
    } else if (index === 1) {
      card.classList.add('cmp-card--foot-print-default', 'color-background-primary-6');
    } else {
      card.classList.add('cmp-card--foot-print-default', 'color-background-background-3');
    }

    const cmpCard = document.createElement('div');
    cmpCard.classList.add('cmp-card');

    const cmpCardContent = document.createElement('div');
    cmpCardContent.classList.add('cmp-card__content');

    // Content detection for cells
    const cells = [...row.children];
    const headingCell = cells.find(cell => !cell.querySelector('p') && !cell.querySelector('a'));
    const descriptionCell = cells.find(cell => cell.querySelector('p'));
    const videoUrlCell = cells.find(cell => cell.querySelector('a') && cell.textContent.includes('youtube.com/embed'));

    if (videoUrlCell) {
      const cmpCardMedia = document.createElement('div');
      cmpCardMedia.classList.add('cmp-card__media');

      const cmpCardImage = document.createElement('div');
      cmpCardImage.classList.add('cmp-card__image');

      const video = document.createElement('div');
      video.classList.add('video', 'cmp-video--foot-print-card');

      const cmpVideo = document.createElement('div');
      cmpVideo.classList.add('cmp-video');

      const cmpVideoYoutubeWrapper = document.createElement('div');
      cmpVideoYoutubeWrapper.classList.add('cmp-video__youtube-wrapper');
      cmpVideoYoutubeWrapper.style.minHeight = '200px'; // Added from original HTML

      const cmpVideoIframeWrapper = document.createElement('div');
      cmpVideoIframeWrapper.classList.add('cmp-video__iframe-wrapper');

      const iframe = document.createElement('iframe');
      iframe.classList.add('cmp-video__iframe');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('width', '640'); // Added from original HTML
      iframe.setAttribute('height', '360'); // Added from original HTML

      const foundLink = videoUrlCell.querySelector('a');
      if (foundLink) {
        const url = new URL(foundLink.href);
        // Extract video ID from YouTube URL (e.g., watch?v=VIDEO_ID or embed/VIDEO_ID)
        let videoId = url.searchParams.get('v');
        if (!videoId && url.pathname.includes('/embed/')) {
          videoId = url.pathname.split('/embed/')[1];
        }
        if (videoId) {
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&showinfo=0&modestbranding=1&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=0&rel=0&enablejsapi=1&origin=${window.location.origin}&widgetid=1&forigin=${window.location.origin}/&aoriginsup=1&vf=6`;
          iframe.title = headingCell ? headingCell.textContent : 'YouTube video player';
          iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-presentation');
        }
      }
      moveInstrumentation(videoUrlCell, iframe);

      cmpVideoIframeWrapper.append(iframe);
      cmpVideoYoutubeWrapper.append(cmpVideoIframeWrapper);
      cmpVideo.append(cmpVideoYoutubeWrapper);
      video.append(cmpVideo);
      cmpCardImage.append(video);
      cmpCardMedia.append(cmpCardImage);
      cmpCardContent.append(cmpCardMedia);
    }

    const cmpCardInfo = document.createElement('div');
    cmpCardInfo.classList.add('cmp-card__info');

    if (headingCell) {
      const cmpCardTitle = document.createElement('div');
      cmpCardTitle.classList.add('cmp-card__title');
      moveInstrumentation(headingCell, cmpCardTitle);
      cmpCardTitle.append(...headingCell.childNodes);
      cmpCardInfo.append(cmpCardTitle);
    }

    if (descriptionCell) {
      const cmpCardDesc = document.createElement('div');
      cmpCardDesc.classList.add('cmp-card__desc');
      moveInstrumentation(descriptionCell, cmpCardDesc);
      cmpCardDesc.append(...descriptionCell.childNodes);
      cmpCardInfo.append(cmpCardDesc);
    }

    cmpCardContent.append(cmpCardInfo);
    cmpCard.append(cmpCardContent);
    cardWrapper.append(card);
    item.append(cardWrapper);
    slickTrack.append(item);
  });

  slickList.append(slickTrack);
  cmpCarouselContainer.append(slickList);
  cmpCarousel.append(cmpCarouselContainer);
  cmpOurFootPrintContent.append(cmpCarousel);
  cmpOurFootPrint.append(cmpOurFootPrintContent);

  // Clear block and append new structure
  block.textContent = '';
  block.append(cmpOurFootPrint);

  // Image optimization (if any images were present, though not in this specific model)
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Interactivity: Carousel navigation (simplified for demonstration, a real carousel would need more logic)
  let currentIndex = 0;
  const totalItems = itemRows.length;

  const updateCarousel = () => {
    const offset = -currentIndex * 100;
    slickTrack.style.transform = `translate3d(${offset}%, 0px, 0px)`;

    block.querySelectorAll('.cmp-our-foot-print__carousel-item').forEach((item, i) => {
      if (i === currentIndex) {
        item.classList.add('slick-current', 'slick-active');
        item.setAttribute('aria-hidden', 'false');
        item.setAttribute('tabindex', '0');
      } else {
        item.classList.remove('slick-current', 'slick-active');
        item.setAttribute('aria-hidden', 'true');
        item.setAttribute('tabindex', '-1');
      }
    });
  };

  // Example: Add basic navigation if arrows were present (not in this HTML, but for completeness)
  // If there were actual navigation buttons in the HTML, you'd add listeners to them.
  // For now, simulating a simple next/prev or dot navigation if it were to be added.
  // The original HTML implies a slick carousel, which would handle its own events.
  // Since we're recreating it, we need to add basic event handling if it's not a library.

  // If dots were to be added:
  const dotsContainer = document.createElement('ul');
  dotsContainer.classList.add('slick-dots');
  dotsContainer.setAttribute('role', 'tablist');
  for (let i = 0; i < totalItems; i += 1) {
    const dot = document.createElement('li');
    dot.setAttribute('role', 'presentation');
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('role', 'tab');
    button.setAttribute('id', `slick-slide-control${i}`);
    button.setAttribute('aria-controls', `slick-slide${i}`);
    button.setAttribute('aria-label', `${i + 1} of ${totalItems}`);
    button.setAttribute('tabindex', '-1');
    button.textContent = i + 1;
    if (i === 0) {
      dot.classList.add('slick-active');
      button.setAttribute('aria-selected', 'true');
      button.setAttribute('tabindex', '0');
    } else {
      button.setAttribute('aria-selected', 'false');
    }
    dot.append(button);
    dotsContainer.append(dot);

    button.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
      dotsContainer.querySelectorAll('li').forEach((d, idx) => {
        if (idx === currentIndex) {
          d.classList.add('slick-active');
          d.querySelector('button').setAttribute('aria-selected', 'true');
          d.querySelector('button').setAttribute('tabindex', '0');
        } else {
          d.classList.remove('slick-active');
          d.querySelector('button').setAttribute('aria-selected', 'false');
          d.querySelector('button').setAttribute('tabindex', '-1');
        }
      });
    });
  }
  cmpCarouselContainer.append(dotsContainer);
}
