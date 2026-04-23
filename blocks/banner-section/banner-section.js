import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const [
    backgroundDesktopRow,
    backgroundMobileRow,
    ...ctaRows
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

  // Background Images
  const desktopPictureElement = backgroundDesktopRow?.querySelector('picture');
  const mobilePictureElement = backgroundMobileRow?.querySelector('picture');

  if (desktopPictureElement || mobilePictureElement) {
    const pictureElement = document.createElement('picture');
    pictureElement.classList.add('d-block', 'w-100', 'h-100');

    if (mobilePictureElement) {
      const mobileImg = mobilePictureElement.querySelector('img');
      if (mobileImg) {
        const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, false, [{ media: '(max-width:600px)', width: '750' }]);
        const sourceMobile = optimizedMobilePic.querySelector('source');
        if (sourceMobile) {
          pictureElement.append(sourceMobile);
          moveInstrumentation(mobileImg, sourceMobile);
        }
      }
    }

    if (desktopPictureElement) {
      const desktopImg = desktopPictureElement.querySelector('img');
      if (desktopImg) {
        const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, false, [{ width: '1920' }]);
        const sourceDesktop = optimizedDesktopPic.querySelector('source');
        const img = optimizedDesktopPic.querySelector('img');

        if (sourceDesktop) {
          pictureElement.append(sourceDesktop);
          moveInstrumentation(desktopImg, sourceDesktop);
        }

        if (img) {
          img.loading = 'eager';
          img.fetchPriority = 'high';
          img.classList.add('w-100', 'h-100', 'object-fit-cover', 'banner-media', 'd-block');
          pictureElement.append(img);
          moveInstrumentation(desktopImg, img);
        }
      }
    }
    wrapper.append(pictureElement);
  }

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('position-absolute', 'start-0', 'bottom-0', 'w-100', 'h-100');
  wrapper.append(overlayDiv);

  const bannerContent = document.createElement('div');
  bannerContent.classList.add('position-absolute', 'banner-content');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add(
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

  const spanElement = document.createElement('span');
  spanElement.classList.add('text-capitalize', 'mt-6', 'mt-md-3', 'mt-lg-9', 'mb-7');

  ctaRows.forEach((row) => {
    const [ctaLabelCell, ctaLinkCell] = [...row.children];

    const ctaLink = ctaLinkCell?.querySelector('a');
    if (ctaLink) {
      const anchor = document.createElement('a');
      anchor.href = ctaLink.href;
      anchor.textContent = ctaLabelCell?.textContent.trim() || '';
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

      const labelSpan = document.createElement('span');
      labelSpan.classList.add('svasti-cta__label', 'fw-semibold', 'fs-default', 'leading-26');
      labelSpan.textContent = anchor.textContent;
      anchor.textContent = '';
      anchor.append(labelSpan);

      moveInstrumentation(row, anchor);
      spanElement.append(anchor);
    }
  });

  containerDiv.append(spanElement);
  bannerContent.append(containerDiv);
  wrapper.append(bannerContent);

  block.replaceChildren(wrapper);

  // The original code had a second createOptimizedPicture call here,
  // which is redundant and incorrect after applying it directly to
  // the source and img elements above. Removing it.
}
