import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    videoLargeCell,
    videoLargePosterCell,
    videoSmallCell,
    videoSmallPosterCell,
    primaryTitleCell,
    ctaLabelCell,
    ctaLinkCell,
    secondaryTitleCell,
    secondaryHeadlineCell,
    secondaryCtaLabelCell,
    secondaryCtaLinkCell,
    greetingMorningCell,
    greetingAfternoonCell,
    greetingEveningCell,
    greetingNightCell,
  ] = [...block.children];

  const section = document.createElement('section');
  section.classList.add('grid-container', 'homepage-banner-wrapper', 'variation--banner', 'bg--paper-white');
  section.setAttribute('data-is-banner', 'true');

  const homepageBannerDiv = document.createElement('div');
  homepageBannerDiv.classList.add('homepage-banner', 'reveal-effect-container');
  section.append(homepageBannerDiv);

  const mediaContainer = document.createElement('div');
  mediaContainer.classList.add('media-container');
  homepageBannerDiv.append(mediaContainer);

  // Large Video
  const videoLarge = document.createElement('video');
  videoLarge.muted = true;
  videoLarge.classList.add('video--large', 'show-for-large');
  videoLarge.playsInline = true;
  videoLarge.preload = 'none';
  const largeVideoSource = videoLargeCell?.querySelector('picture')?.querySelector('img')?.src;
  const largeVideoPoster = videoLargePosterCell?.querySelector('picture')?.querySelector('img')?.src;
  if (largeVideoSource) {
    videoLarge.poster = largeVideoPoster || '';
    videoLarge.setAttribute('data-poster', largeVideoPoster || '');
    const sourceLarge = document.createElement('source');
    sourceLarge.src = largeVideoSource;
    sourceLarge.type = 'video/mp4';
    sourceLarge.setAttribute('data-src', largeVideoSource);
    videoLarge.append(sourceLarge);
  }
  moveInstrumentation(videoLargeCell, videoLarge);
  moveInstrumentation(videoLargePosterCell, videoLarge);
  mediaContainer.append(videoLarge);

  // Small Video
  const videoSmall = document.createElement('video');
  videoSmall.muted = true;
  videoSmall.classList.add('video--small', 'hide-for-large');
  videoSmall.playsInline = true;
  videoSmall.preload = 'none';
  const smallVideoSource = videoSmallCell?.querySelector('picture')?.querySelector('img')?.src;
  const smallVideoPoster = videoSmallPosterCell?.querySelector('picture')?.querySelector('img')?.src;
  if (smallVideoSource) {
    videoSmall.poster = smallVideoPoster || '';
    videoSmall.setAttribute('data-poster', smallVideoPoster || '');
    const sourceSmall = document.createElement('source');
    sourceSmall.src = smallVideoSource;
    sourceSmall.type = 'video/mp4';
    sourceSmall.setAttribute('data-src', smallVideoSource);
    videoSmall.append(sourceSmall);
  }
  moveInstrumentation(videoSmallCell, videoSmall);
  moveInstrumentation(videoSmallPosterCell, videoSmall);
  mediaContainer.append(videoSmall);

  const contentContainer = document.createElement('div');
  contentContainer.classList.add('content-container', 'animate-enter', 'in-view');
  homepageBannerDiv.append(contentContainer);

  const maxWidthContainer = document.createElement('div');
  maxWidthContainer.classList.add('max-width-container');
  contentContainer.append(maxWidthContainer);

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('content-wrapper');
  maxWidthContainer.append(contentWrapper);

  // Primary Title
  const primaryTitle = document.createElement('h1');
  primaryTitle.classList.add('primary-title');
  primaryTitle.textContent = primaryTitleCell?.textContent.trim() || '';
  moveInstrumentation(primaryTitleCell, primaryTitle);
  contentWrapper.append(primaryTitle);

  // Primary CTA
  const primaryCtaContainer = document.createElement('div');
  primaryCtaContainer.classList.add('cta-container', 'primary-title-cta-container');
  const primaryCtaLink = document.createElement('a');
  primaryCtaLink.classList.add('button', 'red');
  primaryCtaLink.href = ctaLinkCell?.querySelector('a')?.href || '#';
  primaryCtaLink.setAttribute('aria-label', '');
  primaryCtaLink.setAttribute('rel', 'follow');
  const primaryCtaSpan = document.createElement('span');
  primaryCtaSpan.classList.add('button-text');
  primaryCtaSpan.textContent = ctaLabelCell?.textContent.trim() || '';
  primaryCtaLink.append(primaryCtaSpan);
  primaryCtaContainer.append(primaryCtaLink);
  moveInstrumentation(ctaLabelCell, primaryCtaLink);
  moveInstrumentation(ctaLinkCell, primaryCtaLink);
  contentWrapper.append(primaryCtaContainer);

  // Secondary Title and Headline
  const secondaryTitleDiv = document.createElement('div');
  secondaryTitleDiv.classList.add('secondary-title');
  const secondaryHeadline = document.createElement('div');
  secondaryHeadline.classList.add('headline-h1', 'font-weight-bold');
  secondaryHeadline.textContent = secondaryHeadlineCell?.textContent.trim() || '';
  secondaryTitleDiv.append(secondaryHeadline);
  moveInstrumentation(secondaryTitleCell, secondaryTitleDiv);
  moveInstrumentation(secondaryHeadlineCell, secondaryHeadline);

  // Secondary CTA
  const secondaryCtaContainer = document.createElement('div');
  secondaryCtaContainer.classList.add('cta-container');
  const secondaryCtaLink = document.createElement('a');
  secondaryCtaLink.classList.add('button', 'red');
  secondaryCtaLink.href = secondaryCtaLinkCell?.querySelector('a')?.href || '#';
  secondaryCtaLink.setAttribute('aria-label', '');
  secondaryCtaLink.setAttribute('rel', 'follow');
  const secondaryCtaSpan = document.createElement('span');
  secondaryCtaSpan.classList.add('button-text');
  secondaryCtaSpan.textContent = secondaryCtaLabelCell?.textContent.trim() || '';
  secondaryCtaLink.append(secondaryCtaSpan);
  secondaryCtaContainer.append(secondaryCtaLink);
  secondaryTitleDiv.append(secondaryCtaContainer);
  moveInstrumentation(secondaryCtaLabelCell, secondaryCtaLink);
  moveInstrumentation(secondaryCtaLinkCell, secondaryCtaLink);
  contentWrapper.append(secondaryTitleDiv);

  // Greeting Container
  const greetingContainer = document.createElement('div');
  greetingContainer.classList.add('greeting-container', 'bodyLargeRegular');
  const greetingWrapper = document.createElement('div');
  greetingWrapper.classList.add('greeting-wrapper', 'animate');
  greetingContainer.append(greetingWrapper);

  const greetings = [
    { cell: greetingMorningCell, className: 'greeting--morning' },
    { cell: greetingAfternoonCell, className: 'greeting--afternoon' },
    { cell: greetingEveningCell, className: 'greeting--evening' },
    { cell: greetingNightCell, className: 'greeting--night' },
  ];

  greetings.forEach(({ cell, className }) => {
    const span = document.createElement('span');
    span.classList.add('greeting', className);
    span.textContent = cell?.textContent.trim() || '';
    moveInstrumentation(cell, span);
    greetingWrapper.append(span);
  });
  section.append(greetingContainer);

  // Optimize images
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.replaceChildren(section);
}
