import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const homeSliderContainer = document.createElement('section');
  homeSliderContainer.classList.add('home-slider-container');

  const homeSliderDiv = document.createElement('div');
  // The original HTML does not have 'slick-initialized', 'slick-slider', 'slick-dotted' on the initial div.
  // These are added by the Slick library itself. For a custom implementation, we should only add 'home-slider'.
  homeSliderDiv.classList.add('home-slider');

  const slickList = document.createElement('div');
  slickList.classList.add('slick-list', 'draggable');

  const slickTrack = document.createElement('div');
  slickTrack.classList.add('slick-track');
  slickTrack.style.opacity = '1';

  const slickDots = document.createElement('ul');
  slickDots.classList.add('slick-dots');
  slickDots.setAttribute('role', 'tablist');

  [...block.children].forEach((row, index) => {
    // CRITICAL FIX: Replaced direct index access with content detection for robustness.
    // The BlockJson defines 5 fields per item row.
    const cells = [...row.children];
    const desktopImageCell = cells[0];
    const mobilePortraitImageCell = cells[1];
    const mobileLandscapeImageCell = cells[2];
    const slideLinkCell = cells[3];
    const slideLinkLabelCell = cells[4];

    const slickSlide = document.createElement('div');
    slickSlide.classList.add('slick-slide');
    slickSlide.setAttribute('data-slick-index', index);
    slickSlide.setAttribute('role', 'tabpanel');
    slickSlide.id = `slick-slide6${index}`;
    slickSlide.setAttribute('aria-describedby', `slick-slide-control6${index}`);

    const slideContentWrapper = document.createElement('div');
    const innerContentDiv = document.createElement('div');
    innerContentDiv.style.width = '100%';
    innerContentDiv.style.display = 'inline-block';

    const slideLink = document.createElement('a');
    const originalSlideLink = slideLinkCell.querySelector('a');
    if (originalSlideLink) {
      slideLink.href = originalSlideLink.href;
      slideLink.title = originalSlideLink.title || '';
      slideLink.target = originalSlideLink.target || '_blank';
      // Ensure slideLinkLabelCell exists before accessing textContent
      slideLink.textContent = slideLinkLabelCell ? slideLinkLabelCell.textContent.trim() : '';
    }

    const desktopImageContainer = document.createElement('div');
    desktopImageContainer.classList.add('slider-image-desktop-container', 'home-slider-item');
    const desktopPicture = desktopImageCell.querySelector('picture');
    if (desktopPicture) {
      const desktopImg = desktopPicture.querySelector('img');
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1920' }]);
      moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
      desktopImageContainer.append(optimizedDesktopPic);
    }

    const mobilePortraitImageContainer = document.createElement('div');
    mobilePortraitImageContainer.classList.add('slider-image-mobile-portrait-container', 'home-slider-item');
    const mobilePortraitPicture = mobilePortraitImageCell.querySelector('picture');
    if (mobilePortraitPicture) {
      const mobilePortraitImg = mobilePortraitPicture.querySelector('img');
      const optimizedMobilePortraitPic = createOptimizedPicture(mobilePortraitImg.src, mobilePortraitImg.alt, false, [{ width: '600' }]);
      moveInstrumentation(mobilePortraitImg, optimizedMobilePortraitPic.querySelector('img'));
      mobilePortraitImageContainer.append(optimizedMobilePortraitPic);
    }

    const mobileLandscapeImageContainer = document.createElement('div');
    mobileLandscapeImageContainer.classList.add('slider-image-mobile-landscape-container', 'home-slider-item');
    const mobileLandscapePicture = mobileLandscapeImageCell.querySelector('picture');
    if (mobileLandscapePicture) {
      const mobileLandscapeImg = mobileLandscapePicture.querySelector('img');
      const optimizedMobileLandscapePic = createOptimizedPicture(mobileLandscapeImg.src, mobileLandscapeImg.alt, false, [{ width: '600' }]);
      moveInstrumentation(mobileLandscapeImg, optimizedMobileLandscapePic.querySelector('img'));
      mobileLandscapeImageContainer.append(optimizedMobileLandscapePic);
    }

    slideLink.append(desktopImageContainer, mobilePortraitImageContainer, mobileLandscapeImageContainer);
    innerContentDiv.append(slideLink);
    slideContentWrapper.append(innerContentDiv);
    slickSlide.append(slideContentWrapper);
    slickTrack.append(slickSlide);

    const dotLi = document.createElement('li');
    dotLi.setAttribute('role', 'presentation');
    const dotButton = document.createElement('button');
    dotButton.setAttribute('type', 'button');
    dotButton.setAttribute('role', 'tab');
    dotButton.id = `slick-slide-control6${index}`;
    dotButton.setAttribute('aria-controls', `slick-slide6${index}`);
    dotButton.setAttribute('aria-label', `${index + 1} of ${block.children.length}`);
    dotButton.textContent = index + 1;
    dotLi.append(dotButton);
    slickDots.append(dotLi);
  });

  slickList.append(slickTrack);
  homeSliderDiv.append(slickList, slickDots);
  homeSliderContainer.append(homeSliderDiv);

  block.textContent = '';
  block.append(homeSliderContainer);

  // Simple Slick-like slider functionality (no external Slick library)
  let currentSlideIndex = 0;
  const slides = [...slickTrack.children];
  const dots = [...slickDots.children];

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('slick-current', 'slick-active');
        slide.style.width = '100%';
        slide.setAttribute('aria-hidden', 'false');
        // Ensure the link exists before setting tabindex
        const link = slide.querySelector('a');
        if (link) link.setAttribute('tabindex', '0');
      } else {
        slide.classList.remove('slick-current', 'slick-active');
        slide.style.width = '100%'; // Ensure all slides have width for layout
        slide.setAttribute('aria-hidden', 'true');
        // Ensure the link exists before setting tabindex
        const link = slide.querySelector('a');
        if (link) link.setAttribute('tabindex', '-1');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('slick-active');
        // Ensure the button exists before setting attributes
        const button = dot.querySelector('button');
        if (button) {
          button.setAttribute('tabindex', '0');
          button.setAttribute('aria-selected', 'true');
        }
      } else {
        dot.classList.remove('slick-active');
        // Ensure the button exists before setting attributes
        const button = dot.querySelector('button');
        if (button) {
          button.setAttribute('tabindex', '-1');
          button.setAttribute('aria-selected', 'false');
        }
      }
    });

    slickTrack.style.transform = `translate3d(-${index * 100}%, 0px, 0px)`;
  };

  // Initialize first slide
  if (slides.length > 0) {
    showSlide(0);
  }

  // Add event listeners to dots
  dots.forEach((dot, index) => {
    const button = dot.querySelector('button');
    if (button) { // Ensure button exists before adding listener
      button.addEventListener('click', () => {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
      });
    }
  });

  // Optional: Auto-play (if needed) - commented out as per original
  // setInterval(nextSlide, 5000);
}
