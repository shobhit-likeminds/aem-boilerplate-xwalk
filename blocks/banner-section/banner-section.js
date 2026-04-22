import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundDesktopRow,
    backgroundMobileRow,
    ctaLinkRow,
    ctaLabelRow,
  ] = [...block.children];

  // Main wrapper
  const wrapper = document.createElement('div');
  wrapper.classList.add(
    'position-relative',
    'banner-section__wrapper',
    'asp-ratio-9x16',
    'asp-ratio-sm-16x9',
    'd-flex',
    'justify-content-center',
  );

  // Background Picture
  const picture = document.createElement('picture');
  picture.classList.add('d-block', 'w-100', 'h-100');

  const desktopPicture = backgroundDesktopRow.querySelector('picture');
  const mobilePicture = backgroundMobileRow.querySelector('picture');

  if (mobilePicture) {
    const mobileImg = mobilePicture.querySelector('img');
    const sourceMobile = document.createElement('source');
    sourceMobile.media = '(max-width:600px)';
    sourceMobile.srcset = mobileImg.src;
    picture.appendChild(sourceMobile);
    moveInstrumentation(mobilePicture, sourceMobile);
  }

  if (desktopPicture) {
    const desktopImg = desktopPicture.querySelector('img');
    const sourceDesktop = document.createElement('source');
    sourceDesktop.srcset = desktopImg.src;
    picture.appendChild(sourceDesktop);

    const img = document.createElement('img');
    img.src = desktopImg.src;
    img.alt = desktopImg.alt;
    img.loading = 'eager';
    img.fetchPriority = 'high';
    img.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
    picture.appendChild(img);
    moveInstrumentation(desktopPicture, img);
  }

  // Optimize images
  picture.querySelectorAll('img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  wrapper.appendChild(picture);

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapper.appendChild(overlayDiv);

  // Banner content
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

  const span = document.createElement('span');
  span.classList.add(
    'text-capitalize',
    'mt-6',
    'mt-md-3',
    'mt-lg-9',
    'mb-7',
  );

  const ctaLink = ctaLinkRow.querySelector('a');
  const ctaLabel = ctaLabelRow.textContent.trim();

  if (ctaLink && ctaLabel) {
    const anchor = document.createElement('a');
    anchor.classList.add(
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
    anchor.href = ctaLink.href;

    const ctaLabelSpan = document.createElement('span');
    ctaLabelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
    ctaLabelSpan.textContent = ctaLabel;
    anchor.appendChild(ctaLabelSpan);
    moveInstrumentation(ctaLinkRow, anchor);
    moveInstrumentation(ctaLabelRow, ctaLabelSpan);
    span.appendChild(anchor);
  }

  container.appendChild(span);
  bannerContent.appendChild(container);
  wrapper.appendChild(bannerContent);

  block.replaceChildren(wrapper);
}
