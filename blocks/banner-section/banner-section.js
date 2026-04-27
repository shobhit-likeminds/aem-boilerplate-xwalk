import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundImageDesktopRow,
    backgroundImageMobileRow,
    ctaLinkRow,
    ctaLabelRow,
  ] = [...block.children];

  const wrapper = document.createElement('div');
  wrapper.classList.add(
    'position-relative',
    'banner-section__wrapper',
    'asp-ratio-9x16',
    'asp-ratio-sm-16x9',
    'd-flex',
    'justify-content-center',
  );
  moveInstrumentation(backgroundImageDesktopRow, wrapper); // Move instrumentation from first row

  const desktopPictureElement = backgroundImageDesktopRow.querySelector('picture');
  const mobilePictureElement = backgroundImageMobileRow.querySelector('picture');

  if (desktopPictureElement || mobilePictureElement) {
    const picture = document.createElement('picture');
    picture.classList.add('d-block', 'w-100', 'h-100');

    if (mobilePictureElement) {
      const mobileImg = mobilePictureElement.querySelector('img');
      const sourceMobile = document.createElement('source');
      sourceMobile.media = '(max-width:600px)';
      sourceMobile.srcset = mobileImg.src;
      picture.append(sourceMobile);
      moveInstrumentation(backgroundImageMobileRow, sourceMobile); // Move instrumentation from mobile row
    }

    if (desktopPictureElement) {
      const desktopImg = desktopPictureElement.querySelector('img');
      const sourceDesktop = document.createElement('source');
      sourceDesktop.srcset = desktopImg.src;
      picture.append(sourceDesktop);

      const img = document.createElement('img');
      img.src = desktopImg.src;
      img.loading = 'eager';
      img.fetchPriority = 'high';
      img.alt = desktopImg.alt || '';
      img.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
      picture.append(img);
    }
    wrapper.append(picture);
  }

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapper.append(overlayDiv);

  const bannerContent = document.createElement('div');
  bannerContent.classList.add('position-absolute', 'banner-content');

  const container = document.createElement('div');
  container.classList.add(
    'container',
    'sticky-element',
    'gx-8',
    'gx-lg-0',
    'd-flex',
    'justify-content-center',
    'align-items-center',
    'flex-column',
    'start-0',
    'end-0',
    'bottom-0',
  );

  const ctaSpan = document.createElement('span');
  ctaSpan.classList.add(
    'text-capitalize',
    'mt-6',
    'mt-md-3',
    'mt-lg-9',
    'mb-7',
  );

  const ctaLink = document.createElement('a');
  ctaLink.classList.add(
    'svasti-cta',
    'cta-analytics',
    'w-fit',
    'text-decoration-none',
    'd-flex',
    'align-items-center',
    'primary',
    'px-8',
    'pb-3',
    'text-cream-100',
    'border',
    'border-2',
    'border-red-100',
    'border-maroon-100-hover',
    'border-red-300-active',
    'bg-red-100',
    'bg-maroon-100-hover',
    'bg-red-300-active',
  );

  const foundLink = ctaLinkRow.querySelector('a');
  if (foundLink) {
    ctaLink.href = foundLink.href;
  }
  moveInstrumentation(ctaLinkRow, ctaLink);

  const ctaLabelSpan = document.createElement('span');
  ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
  ctaLabelSpan.textContent = ctaLabelRow.textContent.trim();
  moveInstrumentation(ctaLabelRow, ctaLabelSpan);

  ctaLink.append(ctaLabelSpan);
  ctaSpan.append(ctaLink);
  container.append(ctaSpan);
  bannerContent.append(container);
  wrapper.append(bannerContent);

  block.replaceChildren(wrapper);

  // The createOptimizedPicture call at the end of the original JS was problematic.
  // It would replace the already constructed picture element, potentially losing
  // instrumentation and causing issues with the mobile/desktop source elements.
  // The images are already optimized by AEM's default image handling for the
  // picture element, so this explicit call is not needed and can cause issues.
  // Removing it to ensure proper rendering and instrumentation.
}
