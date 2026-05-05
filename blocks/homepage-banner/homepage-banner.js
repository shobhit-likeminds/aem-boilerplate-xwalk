import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  const section = document.createElement('section');
  section.classList.add('grid-container', 'homepage-banner-wrapper', 'variation--banner', 'bg--paper-white');
  section.setAttribute('data-is-banner', 'true');

  const homepageBanner = document.createElement('div');
  homepageBanner.classList.add('homepage-banner', 'reveal-effect-container');
  moveInstrumentation(block, homepageBanner);

  const mediaContainer = document.createElement('div');
  mediaContainer.classList.add('media-container');

  // All rows in this block have a single cell, so firstElementChild is appropriate.
  // Using array destructuring for clarity and to avoid direct bracket access on `rows` array.
  const [
    videoLargePosterRow,
    videoLargeSourceRow,
    videoSmallPosterRow,
    videoSmallSourceRow,
    primaryTitleRow,
    primaryCtaLabelRow,
    primaryCtaLinkRow,
    secondaryTitleRow,
    secondaryCtaLabelRow,
    secondaryCtaLinkRow,
    greetingMorningRow,
    greetingAfternoonRow,
    greetingEveningRow,
    greetingNightRow,
  ] = rows;

  const videoLargePosterCell = videoLargePosterRow.firstElementChild;
  const videoLargeSourceCell = videoLargeSourceRow.firstElementChild;
  const videoSmallPosterCell = videoSmallPosterRow.firstElementChild;
  const videoSmallSourceCell = videoSmallSourceRow.firstElementChild;

  const primaryTitleCell = primaryTitleRow.firstElementChild;
  const primaryCtaLabelCell = primaryCtaLabelRow.firstElementChild;
  const primaryCtaLinkCell = primaryCtaLinkRow.firstElementChild;

  const secondaryTitleCell = secondaryTitleRow.firstElementChild;
  const secondaryCtaLabelCell = secondaryCtaLabelRow.firstElementChild;
  const secondaryCtaLinkCell = secondaryCtaLinkRow.firstElementChild;

  const greetingMorningCell = greetingMorningRow.firstElementChild;
  const greetingAfternoonCell = greetingAfternoonRow.firstElementChild;
  const greetingEveningCell = greetingEveningRow.firstElementChild;
  const greetingNightCell = greetingNightRow.firstElementChild;

  // Large Video
  const videoLarge = document.createElement('video');
  videoLarge.muted = true;
  videoLarge.classList.add('video--large', 'show-for-large');
  videoLarge.playsInline = true;
  videoLarge.preload = 'none';

  const largePosterImg = videoLargePosterCell?.querySelector('img');
  if (largePosterImg) {
    videoLarge.poster = largePosterImg.src;
    videoLarge.setAttribute('data-poster', largePosterImg.src);
  }

  const largeSourceLink = videoLargeSourceCell?.querySelector('a');
  if (largeSourceLink) {
    const sourceLarge = document.createElement('source');
    sourceLarge.src = largeSourceLink.href;
    sourceLarge.setAttribute('data-src', largeSourceLink.href);
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

  const smallPosterImg = videoSmallPosterCell?.querySelector('img');
  if (smallPosterImg) {
    videoSmall.poster = smallPosterImg.src;
    videoSmall.setAttribute('data-poster', smallPosterImg.src);
  }

  const smallSourceLink = videoSmallSourceCell?.querySelector('a');
  if (smallSourceLink) {
    const sourceSmall = document.createElement('source');
    sourceSmall.src = smallSourceLink.href;
    sourceSmall.setAttribute('data-src', smallSourceLink.href);
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
  primaryTitle.textContent = primaryTitleCell?.textContent.trim() || '';
  moveInstrumentation(primaryTitleRow, primaryTitle); // Move instrumentation from the row
  contentWrapper.append(primaryTitle);

  // Primary CTA
  const primaryCtaContainer = document.createElement('div');
  primaryCtaContainer.classList.add('cta-container', 'primary-title-cta-container');
  const primaryCtaLink = document.createElement('a');
  primaryCtaLink.classList.add('button', 'red');
  primaryCtaLink.rel = 'follow';
  primaryCtaLink.textContent = primaryCtaLabelCell?.textContent.trim() || '';
  const primaryLinkHref = primaryCtaLinkCell?.querySelector('a')?.href;
  if (primaryLinkHref) {
    primaryCtaLink.href = primaryLinkHref;
  }
  moveInstrumentation(primaryCtaLinkRow, primaryCtaLink); // Move instrumentation from the row
  primaryCtaContainer.append(primaryCtaLink);
  contentWrapper.append(primaryCtaContainer);

  // Secondary Title
  const secondaryTitleDiv = document.createElement('div');
  secondaryTitleDiv.classList.add('secondary-title');
  const secondaryHeadline = document.createElement('div');
  secondaryHeadline.classList.add('headline-h1', 'font-weight-bold');
  secondaryHeadline.textContent = secondaryTitleCell?.textContent.trim() || '';
  moveInstrumentation(secondaryTitleRow, secondaryHeadline); // Move instrumentation from the row
  secondaryTitleDiv.append(secondaryHeadline);

  // Secondary CTA
  const secondaryCtaContainer = document.createElement('div');
  secondaryCtaContainer.classList.add('cta-container');
  const secondaryCtaLink = document.createElement('a');
  secondaryCtaLink.classList.add('button', 'red');
  secondaryCtaLink.rel = 'follow';
  secondaryCtaLink.textContent = secondaryCtaLabelCell?.textContent.trim() || '';
  const secondaryLinkHref = secondaryCtaLinkCell?.querySelector('a')?.href;
  if (secondaryLinkHref) {
    secondaryCtaLink.href = secondaryLinkHref;
  }
  moveInstrumentation(secondaryCtaLinkRow, secondaryCtaLink); // Move instrumentation from the row
  secondaryCtaContainer.append(secondaryCtaLink);
  secondaryTitleDiv.append(secondaryCtaContainer);
  contentWrapper.append(secondaryTitleDiv);

  maxWidthContainer.append(contentWrapper);
  contentContainer.append(maxWidthContainer);
  homepageBanner.append(contentContainer);

  // Greetings
  const greetingContainer = document.createElement('div');
  greetingContainer.classList.add('greeting-container', 'bodyLargeRegular');
  const greetingWrapper = document.createElement('div');
  greetingWrapper.classList.add('greeting-wrapper', 'animate');

  const greetingMorning = document.createElement('span');
  greetingMorning.classList.add('greeting', 'greeting--morning');
  greetingMorning.textContent = greetingMorningCell?.textContent.trim() || '';
  moveInstrumentation(greetingMorningRow, greetingMorning); // Move instrumentation from the row
  greetingWrapper.append(greetingMorning);

  const greetingAfternoon = document.createElement('span');
  greetingAfternoon.classList.add('greeting', 'greeting--afternoon');
  greetingAfternoon.textContent = greetingAfternoonCell?.textContent.trim() || '';
  moveInstrumentation(greetingAfternoonRow, greetingAfternoon); // Move instrumentation from the row
  greetingWrapper.append(greetingAfternoon);

  const greetingEvening = document.createElement('span');
  greetingEvening.classList.add('greeting', 'greeting--evening');
  greetingEvening.textContent = greetingEveningCell?.textContent.trim() || '';
  moveInstrumentation(greetingEveningRow, greetingEvening); // Move instrumentation from the row
  greetingWrapper.append(greetingEvening);

  const greetingNight = document.createElement('span');
  greetingNight.classList.add('greeting', 'greeting--night');
  greetingNight.textContent = greetingNightCell?.textContent.trim() || '';
  moveInstrumentation(greetingNightRow, greetingNight); // Move instrumentation from the row
  greetingWrapper.append(greetingNight);

  greetingContainer.append(greetingWrapper);
  section.append(homepageBanner, greetingContainer);

  block.replaceChildren(section);

  // Image optimization
  section.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Set initial greeting based on time of day
  const setGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    const greetings = greetingWrapper.querySelectorAll('.greeting');
    greetings.forEach((greeting) => {
      greeting.style.display = 'none';
    });

    if (hour >= 5 && hour < 12) {
      greetingMorning.style.display = 'block';
    } else if (hour >= 12 && hour < 17) {
      greetingAfternoon.style.display = 'block';
    } else if (hour >= 17 && hour < 21) {
      greetingEvening.style.display = 'block';
    } else {
      greetingNight.style.display = 'block';
    }
  };

  setGreeting();
  setInterval(setGreeting, 60 * 1000); // Update greeting every minute
}
