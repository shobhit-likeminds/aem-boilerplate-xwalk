import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    videoLargeMp4Cell,
    videoLargePosterCell,
    videoSmallMp4Cell,
    videoSmallPosterCell,
    primaryTitleCell,
    primaryCtaLinkCell,
    primaryCtaLabelCell,
    secondaryTitleCell,
    secondaryCtaLinkCell,
    secondaryCtaLabelCell,
    greetingMorningCell,
    greetingAfternoonCell,
    greetingEveningCell,
    greetingNightCell,
  ] = [...block.children];

  const sectionWrapper = document.createElement('section');
  sectionWrapper.classList.add('grid-container', 'homepage-banner-wrapper', 'variation--banner', 'bg--paper-white');
  sectionWrapper.setAttribute('data-is-banner', 'true');
  moveInstrumentation(block, sectionWrapper); // Move instrumentation from block to the new root

  const homepageBanner = document.createElement('div');
  homepageBanner.classList.add('homepage-banner', 'reveal-effect-container');
  // Initial styles are handled by CSS, avoid setting inline styles that conflict with animations
  // homepageBanner.style.opacity = '1';
  // homepageBanner.style.clipPath = 'unset';
  // homepageBanner.style.transform = 'scale(1)';
  // moveInstrumentation(block, homepageBanner); // Instrumentation moved to sectionWrapper

  const mediaContainer = document.createElement('div');
  mediaContainer.classList.add('media-container');

  // Large Video
  const videoLarge = document.createElement('video');
  videoLarge.muted = true;
  videoLarge.classList.add('video--large', 'show-for-large');
  videoLarge.playsInline = true;
  videoLarge.preload = 'none';

  const largePosterImg = videoLargePosterCell.querySelector('picture > img');
  if (largePosterImg) {
    videoLarge.poster = largePosterImg.src;
    videoLarge.setAttribute('data-poster', largePosterImg.src);
  }

  const largeMp4Link = videoLargeMp4Cell.querySelector('picture > img');
  if (largeMp4Link) {
    const sourceLarge = document.createElement('source');
    sourceLarge.src = largeMp4Link.src;
    sourceLarge.setAttribute('data-src', largeMp4Link.src);
    sourceLarge.type = 'video/mp4';
    videoLarge.append(sourceLarge);
  }
  mediaContainer.append(videoLarge);

  // Small Video
  const videoSmall = document.createElement('video');
  videoSmall.muted = true;
  videoSmall.classList.add('video--small', 'hide-for-large');
  videoSmall.playsInline = true;
  videoSmall.preload = 'none';

  const smallPosterImg = smallVideoPosterCell.querySelector('picture > img');
  if (smallPosterImg) {
    videoSmall.poster = smallPosterImg.src;
    videoSmall.setAttribute('data-poster', smallPosterImg.src);
  }

  const smallMp4Link = videoSmallMp4Cell.querySelector('picture > img');
  if (smallMp4Link) {
    const sourceSmall = document.createElement('source');
    sourceSmall.src = smallMp4Link.src;
    sourceSmall.setAttribute('data-src', smallMp4Link.src);
    sourceSmall.type = 'video/mp4';
    videoSmall.append(sourceSmall);
  }
  mediaContainer.append(videoSmall);
  homepageBanner.append(mediaContainer);

  const contentContainer = document.createElement('div');
  contentContainer.classList.add('content-container', 'animate-enter', 'in-view');

  const maxWidthContainer = document.createElement('div');
  maxWidthContainer.classList.add('max-width-container');

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('content-wrapper');

  // Primary Title
  const primaryTitle = document.createElement('h1');
  primaryTitle.classList.add('primary-title');
  primaryTitle.textContent = primaryTitleCell.textContent.trim();
  moveInstrumentation(primaryTitleCell, primaryTitle);
  contentWrapper.append(primaryTitle);

  // Primary CTA
  const primaryCtaContainer = document.createElement('div');
  primaryCtaContainer.classList.add('cta-container', 'primary-title-cta-container');
  const primaryCtaLink = document.createElement('a');
  primaryCtaLink.classList.add('button', 'red');
  const primaryLinkHref = primaryCtaLinkCell.querySelector('a')?.href;
  if (primaryLinkHref) {
    primaryCtaLink.href = primaryLinkHref;
  }
  primaryCtaLink.textContent = primaryCtaLabelCell.textContent.trim();
  moveInstrumentation(primaryCtaLinkCell, primaryCtaLink);
  moveInstrumentation(primaryCtaLabelCell, primaryCtaLink); // Move label cell instrumentation too
  primaryCtaContainer.append(primaryCtaLink);
  contentWrapper.append(primaryCtaContainer);

  // Secondary Title and CTA
  const secondaryTitleDiv = document.createElement('div');
  secondaryTitleDiv.classList.add('secondary-title');
  // secondaryTitleDiv.style.display = 'none'; // Initial state for animation

  const secondaryHeadline = document.createElement('div'); // Changed from 'div' to 'p' to match original HTML
  secondaryHeadline.classList.add('headline-h1', 'font-weight-bold');
  secondaryHeadline.innerHTML = secondaryTitleCell.innerHTML; // Use innerHTML for richtext
  moveInstrumentation(secondaryTitleCell, secondaryHeadline);
  secondaryTitleDiv.append(secondaryHeadline);

  const secondaryCtaContainer = document.createElement('div');
  secondaryCtaContainer.classList.add('cta-container');
  const secondaryCtaLink = document.createElement('a');
  secondaryCtaLink.classList.add('button', 'red');
  const secondaryLinkHref = secondaryCtaLinkCell.querySelector('a')?.href;
  if (secondaryLinkHref) {
    secondaryCtaLink.href = secondaryLinkHref;
  }
  secondaryCtaLink.textContent = secondaryCtaLabelCell.textContent.trim();
  moveInstrumentation(secondaryCtaLinkCell, secondaryCtaLink);
  moveInstrumentation(secondaryCtaLabelCell, secondaryCtaLink); // Move label cell instrumentation too
  secondaryCtaContainer.append(secondaryCtaLink);
  secondaryTitleDiv.append(secondaryCtaContainer);
  contentWrapper.append(secondaryTitleDiv);

  maxWidthContainer.append(contentWrapper);
  contentContainer.append(maxWidthContainer);
  homepageBanner.append(contentContainer);

  // Greeting Container
  const greetingContainer = document.createElement('div');
  greetingContainer.classList.add('greeting-container', 'bodyLargeRegular');
  // greetingContainer.style.opacity = '0'; // Initial state for animation
  // greetingContainer.style.transform = 'translate(0px, 250px)';
  moveInstrumentation(greetingMorningCell, greetingContainer); // Move instrumentation from first greeting cell to container
  moveInstrumentation(greetingAfternoonCell, greetingContainer);
  moveInstrumentation(greetingEveningCell, greetingContainer);
  moveInstrumentation(greetingNightCell, greetingContainer);


  const greetingWrapper = document.createElement('div');
  greetingWrapper.classList.add('greeting-wrapper', 'animate');
  // moveInstrumentation(greetingMorningCell, greetingWrapper); // Instrumentation moved to greetingContainer

  const createGreetingSpan = (className, textContent, originalCell) => {
    const span = document.createElement('span');
    span.classList.add('greeting', `greeting--${className}`);
    span.textContent = textContent;
    // moveInstrumentation(originalCell, span); // Instrumentation moved to greetingContainer
    return span;
  };

  greetingWrapper.append(createGreetingSpan('morning', greetingMorningCell.textContent.trim(), greetingMorningCell));
  greetingWrapper.append(createGreetingSpan('afternoon', greetingAfternoonCell.textContent.trim(), greetingAfternoonCell));
  greetingWrapper.append(createGreetingSpan('evening', greetingEveningCell.textContent.trim(), greetingEveningCell));
  greetingWrapper.append(createGreetingSpan('night', greetingNightCell.textContent.trim(), greetingNightCell));

  greetingContainer.append(greetingWrapper);

  sectionWrapper.append(homepageBanner);
  sectionWrapper.append(greetingContainer);

  block.replaceChildren(sectionWrapper);

  // Optimize images
  sectionWrapper.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
