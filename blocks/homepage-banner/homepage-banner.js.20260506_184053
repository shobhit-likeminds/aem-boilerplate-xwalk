import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const children = [...block.children];

  const [
    videoLargeRow,
    videoLargePosterRow,
    videoSmallRow,
    videoSmallPosterRow,
    primaryTitleRow,
    primaryCtaLinkRow,
    primaryCtaLabelRow,
    secondaryTitleRow,
    secondaryCtaLinkRow,
    secondaryCtaLabelRow,
    greetingMorningRow,
    greetingAfternoonRow,
    greetingEveningRow,
    greetingNightRow,
  ] = children;

  const sectionWrapper = document.createElement('section');
  sectionWrapper.classList.add('grid-container', 'homepage-banner-wrapper', 'variation--banner', 'bg--paper-white');
  sectionWrapper.setAttribute('data-is-banner', 'true');

  const homepageBannerDiv = document.createElement('div');
  homepageBannerDiv.classList.add('homepage-banner', 'reveal-effect-container');

  const mediaContainer = document.createElement('div');
  mediaContainer.classList.add('media-container');

  // Large Video (Desktop)
  const videoLarge = document.createElement('video');
  videoLarge.muted = true;
  videoLarge.classList.add('video--large', 'show-for-large');
  videoLarge.playsInline = true;
  videoLarge.preload = 'none';

  const largeVideoSrc = videoLargeRow.querySelector('img')?.src;
  const largeVideoPosterSrc = videoLargePosterRow.querySelector('img')?.src;

  if (largeVideoSrc) {
    videoLarge.setAttribute('data-poster', largeVideoPosterSrc || '');
    videoLarge.poster = largeVideoPosterSrc || '';
    const sourceLarge = document.createElement('source');
    sourceLarge.setAttribute('data-src', largeVideoSrc);
    sourceLarge.type = 'video/mp4';
    sourceLarge.src = largeVideoSrc;
    videoLarge.append(sourceLarge);
  }
  moveInstrumentation(videoLargeRow, videoLarge);
  moveInstrumentation(videoLargePosterRow, videoLarge);
  mediaContainer.append(videoLarge);

  // Small Video (Mobile)
  const videoSmall = document.createElement('video');
  videoSmall.muted = true;
  videoSmall.classList.add('video--small', 'hide-for-large');
  videoSmall.playsInline = true;
  videoSmall.preload = 'none';

  const smallVideoSrc = videoSmallRow.querySelector('img')?.src;
  const smallVideoPosterSrc = videoSmallPosterRow.querySelector('img')?.src;

  if (smallVideoSrc) {
    videoSmall.setAttribute('data-poster', smallVideoPosterSrc || '');
    videoSmall.poster = smallVideoPosterSrc || '';
    const sourceSmall = document.createElement('source');
    sourceSmall.setAttribute('data-src', smallVideoSrc);
    sourceSmall.type = 'video/mp4';
    sourceSmall.src = smallVideoSrc;
    videoSmall.append(sourceSmall);
  }
  moveInstrumentation(videoSmallRow, videoSmall);
  moveInstrumentation(videoSmallPosterRow, videoSmall);
  mediaContainer.append(videoSmall);

  homepageBannerDiv.append(mediaContainer);

  const contentContainer = document.createElement('div');
  contentContainer.classList.add('content-container', 'animate-enter', 'in-view');

  const maxWidthContainer = document.createElement('div');
  maxWidthContainer.classList.add('max-width-container');

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('content-wrapper');

  // Primary Title
  const primaryTitle = document.createElement('h1');
  primaryTitle.classList.add('primary-title');
  primaryTitle.textContent = primaryTitleRow.textContent.trim();
  moveInstrumentation(primaryTitleRow, primaryTitle);
  contentWrapper.append(primaryTitle);

  // Primary CTA
  const primaryCtaContainer = document.createElement('div');
  primaryCtaContainer.classList.add('cta-container', 'primary-title-cta-container');
  const primaryCtaLink = document.createElement('a');
  primaryCtaLink.classList.add('button', 'red');
  const primaryLinkHref = primaryCtaLinkRow.querySelector('a')?.href;
  if (primaryLinkHref) {
    primaryCtaLink.href = primaryLinkHref;
  }
  primaryCtaLink.setAttribute('aria-label', '');
  primaryCtaLink.setAttribute('rel', 'follow');
  const primaryCtaSpan = document.createElement('span');
  primaryCtaSpan.classList.add('button-text');
  primaryCtaSpan.textContent = primaryCtaLabelRow.textContent.trim();
  primaryCtaLink.append(primaryCtaSpan);
  moveInstrumentation(primaryCtaLinkRow, primaryCtaLink);
  moveInstrumentation(primaryCtaLabelRow, primaryCtaLink);
  primaryCtaContainer.append(primaryCtaLink);
  contentWrapper.append(primaryCtaContainer);

  // Secondary Title and CTA
  const secondaryTitleDiv = document.createElement('div');
  secondaryTitleDiv.classList.add('secondary-title');
  const secondaryHeadline = document.createElement('div');
  secondaryHeadline.classList.add('headline-h1', 'font-weight-bold');
  secondaryHeadline.textContent = secondaryTitleRow.textContent.trim();
  moveInstrumentation(secondaryTitleRow, secondaryHeadline);
  secondaryTitleDiv.append(secondaryHeadline);

  const secondaryCtaContainer = document.createElement('div');
  secondaryCtaContainer.classList.add('cta-container');
  const secondaryCtaLink = document.createElement('a');
  secondaryCtaLink.classList.add('button', 'red');
  const secondaryLinkHref = secondaryCtaLinkRow.querySelector('a')?.href;
  if (secondaryLinkHref) {
    secondaryCtaLink.href = secondaryLinkHref;
  }
  secondaryCtaLink.setAttribute('aria-label', '');
  secondaryCtaLink.setAttribute('rel', 'follow');
  const secondaryCtaSpan = document.createElement('span');
  secondaryCtaSpan.classList.add('button-text');
  secondaryCtaSpan.textContent = secondaryCtaLabelRow.textContent.trim();
  secondaryCtaLink.append(secondaryCtaSpan);
  moveInstrumentation(secondaryCtaLinkRow, secondaryCtaLink);
  moveInstrumentation(secondaryCtaLabelRow, secondaryCtaLink);
  secondaryCtaContainer.append(secondaryCtaLink);
  secondaryTitleDiv.append(secondaryCtaContainer);
  contentWrapper.append(secondaryTitleDiv);

  maxWidthContainer.append(contentWrapper);
  contentContainer.append(maxWidthContainer);
  homepageBannerDiv.append(contentContainer);
  sectionWrapper.append(homepageBannerDiv);

  // Greeting Container
  const greetingContainer = document.createElement('div');
  greetingContainer.classList.add('greeting-container', 'bodyLargeRegular');
  const greetingWrapper = document.createElement('div');
  greetingWrapper.classList.add('greeting-wrapper', 'animate');

  const greetingMorning = document.createElement('span');
  greetingMorning.classList.add('greeting', 'greeting--morning');
  greetingMorning.textContent = greetingMorningRow.textContent.trim();
  moveInstrumentation(greetingMorningRow, greetingMorning);
  greetingWrapper.append(greetingMorning);

  const greetingAfternoon = document.createElement('span');
  greetingAfternoon.classList.add('greeting', 'greeting--afternoon');
  greetingAfternoon.textContent = greetingAfternoonRow.textContent.trim();
  moveInstrumentation(greetingAfternoonRow, greetingAfternoon);
  greetingWrapper.append(greetingAfternoon);

  const greetingEvening = document.createElement('span');
  greetingEvening.classList.add('greeting', 'greeting--evening');
  greetingEvening.textContent = greetingEveningRow.textContent.trim();
  moveInstrumentation(greetingEveningRow, greetingEvening);
  greetingWrapper.append(greetingEvening);

  const greetingNight = document.createElement('span');
  greetingNight.classList.add('greeting', 'greeting--night');
  greetingNight.textContent = greetingNightRow.textContent.trim();
  moveInstrumentation(greetingNightRow, greetingNight);
  greetingWrapper.append(greetingNight);

  greetingContainer.append(greetingWrapper);
  sectionWrapper.append(greetingContainer);

  block.replaceChildren(sectionWrapper);

  // Optimize pictures
  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
}
